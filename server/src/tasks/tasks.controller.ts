import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksDto } from './dto/tasks.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private mtasksService: TasksService) { }

  @Get()
  findAll() {
    return this.mtasksService.find_tasks();
  }

  @Get(':id')
  find_one(@Param('id') id: number) {
    return this.mtasksService.find_one_tasks(id);
  }

  @Post('create')
  createTask(@Body() tasksDto: TasksDto) {
    return this.mtasksService.create_todo(tasksDto);
  }


  @Patch('update/:id')
  updateTask(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.mtasksService.update_todo(id, updateTaskDto);
  }

  @Delete('remove/:id')
  removeTask(@Param('id') id: number) {
    return this.mtasksService.remove_todo(id);
  }

}