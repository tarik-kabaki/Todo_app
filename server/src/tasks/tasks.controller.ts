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

@Controller('tasks')
export class TasksController {
  constructor(private mtasksService: TasksService) { }

  @Get()
  findAll() {
    return this.mtasksService.find_tasks();
  }

  @Post()
  createTask(@Body() tasksDto: TasksDto) {
    return this.mtasksService.create_todo(tasksDto);
  }


  @Post('update/:id')
  updateTask(@Param('id') id: number, @Body('status') status: string, @Body('praio') praio: string) {
    return this.mtasksService.update_todo(id, status, praio);
  }

  @Delete('remove/:id')
  removeTask(@Param('id') id: number) {
    return this.mtasksService.remove_todo(id);
  }

}