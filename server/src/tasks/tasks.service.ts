import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tasks } from './entity/tasks.entity';
import { TasksDto } from './dto/tasks.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { error } from 'console';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks) private tasksRepo: Repository<Tasks>,
  ) { }

  async find_tasks() {
    return await this.tasksRepo.find()
  }

  async find_one_tasks(id: number) {
    const task = await this.tasksRepo.findOne({
      where: { id: id }
    });

    return task;
  }

  async create_todo(tasksDto: TasksDto) {
    const task = this.tasksRepo.create(tasksDto);
    const findExistedTask = await this.tasksRepo.findOne({
      where: {
        title: tasksDto.title
      }
    });

    if (findExistedTask?.title === task?.title) {
      throw new BadRequestException('This task is already exist');
    }

    return await this.tasksRepo.save(task);
  }

  async update_todo(task_id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.tasksRepo.findOne({
      where: { id: task_id },
    });

    const findExistedTask = await this.tasksRepo.findOne({
      where: {
        title: updateTaskDto.title
      }
    });

    if (findExistedTask?.title === updateTaskDto?.title) {
      throw new BadRequestException('This task is already exist');
    }

    if (task) {
      task.status = updateTaskDto.status ? updateTaskDto.status : task.status;
      task.praio = updateTaskDto.praio ? updateTaskDto.praio : task.praio;
      task.title = updateTaskDto.title ? updateTaskDto.title : task.title;
      task.disc = updateTaskDto.disc ? updateTaskDto.disc : task.disc;

      return await this.tasksRepo.save(task);
    }


  }

  async remove_todo(task_id: number) {
    const message = await this.tasksRepo.findOne({
      where: { id: task_id },
    });

    if (!message) {
      throw new NotFoundException();
    }

    this.tasksRepo.remove(message);

    return task_id;
  }
}