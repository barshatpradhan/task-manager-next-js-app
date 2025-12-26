import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { CreateTaskDTO, UpdateTaskDTO } from '../types';
import * as taskService from '../services/taskService';

export const getTasks = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId;
    
    if (!userId) {
      res.status(401).json({ error: 'User not authenticated' });
      return;
    }

    console.log('Fetching tasks for user:', userId);

    const completed = req.query.completed === 'true' ? true : 
                     req.query.completed === 'false' ? false : undefined;

    const tasks = await taskService.getUserTasks(userId, completed);
    res.json(tasks);
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

export const createTask = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId;
    
    if (!userId) {
      res.status(401).json({ error: 'User not authenticated' });
      return;
    }

    const data: CreateTaskDTO = req.body;

    console.log('Creating task for user:', userId, 'with data:', data);

    if (!data.title) {
      res.status(400).json({ error: 'Title is required' });
      return;
    }

    const task = await taskService.createTask(userId, data);
    res.status(201).json(task);
  } catch (error) {
    console.error('Create task error:', error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to create task' });
    }
  }
};

export const updateTask = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId;
    
    if (!userId) {
      res.status(401).json({ error: 'User not authenticated' });
      return;
    }

    const taskId = parseInt(req.params.id);
    const data: UpdateTaskDTO = req.body;

    console.log('Updating task:', taskId, 'for user:', userId);

    const task = await taskService.updateTask(taskId, userId, data);
    res.json(task);
  } catch (error) {
    console.error('Update task error:', error);
    if (error instanceof Error && error.message === 'Task not found') {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to update task' });
    }
  }
};

export const deleteTask = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId;
    
    if (!userId) {
      res.status(401).json({ error: 'User not authenticated' });
      return;
    }

    const taskId = parseInt(req.params.id);

    console.log('Deleting task:', taskId, 'for user:', userId);

    await taskService.deleteTask(taskId, userId);
    res.status(204).send();
  } catch (error) {
    console.error('Delete task error:', error);
    if (error instanceof Error && error.message === 'Task not found') {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to delete task' });
    }
  }
};