import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks/tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Tasks } from './tasks/entity/tasks.entity';
import { Repository } from 'typeorm';
import { TasksDto } from './tasks/dto/tasks.dto';
import { UpdateTaskDto } from './tasks/dto/update-task.dto';


describe('TasksService', () => {
    let service: TasksService;
    let repository: Repository<Tasks>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TasksService,
                {
                    provide: getRepositoryToken(Tasks),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<TasksService>(TasksService);
        repository = module.get<Repository<Tasks>>(getRepositoryToken(Tasks));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('find_tasks', () => {
        it('should return all tasks', async () => {
            const result = [
                {
                    id: 1,
                    title: 'Test Task',
                    status: 'ToDo',
                    praio: 'Low',
                    disc: 'Test description',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ];
            jest.spyOn(repository, 'find').mockResolvedValue(result);

            expect(await service.find_tasks()).toBe(result);
        });
    });

    describe('find_one_tasks', () => {
        it('should return a task by id', async () => {
            const result = {
                id: 1,
                title: 'Test Task',
                status: 'ToDo',
                praio: 'Low',
                disc: 'Test description',
                created_at: new Date(),
                updated_at: new Date(),
            };
            jest.spyOn(repository, 'findOne').mockResolvedValue(result);

            expect(await service.find_one_tasks(1)).toBe(result);
        });

        it('should return null if task does not exist', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(null);

            expect(await service.find_one_tasks(999)).toBeNull();
        });
    });

    describe('create_todo', () => {
        it('should create a new task', async () => {
            const tasksDto: TasksDto = {
                title: 'Test Task',
                status: 'ToDo',
                praio: 'Low',
                disc: 'Test description',
            };
            const result = {
                id: 1,
                ...tasksDto,
                created_at: new Date(),
                updated_at: new Date(),
            };
        });

        it('should throw BadRequestException if task already exists', async () => {
            const tasksDto: TasksDto = {
                title: 'Test Task',
                status: 'ToDo',
                praio: 'Low',
                disc: 'Test description',
            };
            const existingTask = {
                id: 1,
                title: 'Test Task',
                status: 'ToDo',
                praio: 'Low',
                disc: 'Test description',
                created_at: new Date(),
                updated_at: new Date(),
            };

            jest.spyOn(repository, 'findOne').mockResolvedValue(existingTask);

            await expect(service.create_todo(tasksDto)).rejects.toThrowError(

            );
        });
    });

    describe('update_todo', () => {
        it('should update an existing task', async () => {
            const updateTaskDtos: UpdateTaskDto = { title: 'Updated Task', status: 'Completed', praio: 'High', disc: "Test descriptions" };
            const task = {
                id: 1,
                title: 'Test Task',
                status: 'ToDo',
                praio: 'Low',
                disc: 'Test description',
                created_at: new Date(),
                updated_at: new Date(),
            };
            const updatedTask = {
                ...task,
                ...updateTaskDtos,
                updated_at: new Date(),
            };

            jest.spyOn(repository, 'findOne').mockResolvedValue(task);
            jest.spyOn(repository, 'save').mockResolvedValue(updatedTask);
            jest.spyOn(repository, 'findOne').mockResolvedValue(null);
            expect(await service.update_todo(1, updateTaskDtos));
        });
    });
});
