import prisma from '../config/database.js';
import { CreateTaskDTO, UpdateTaskDTO } from '../types/index.js';

export const getUserTasks = async (userId: number, completed?: boolean) => {
  try {
    console.log('Getting tasks for user:', userId, 'completed filter:', completed);
    
    return await prisma.task.findMany({
      where: {
        userId,
        ...(completed !== undefined && { completed }),
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  } catch (error) {
    console.error('Error in getUserTasks:', error);
    throw error;
  }
};

export const createTask = async (userId: number, data: CreateTaskDTO) => {
  try {
    console.log('Creating task:', { userId, ...data });
    
    return await prisma.task.create({
      data: {
        userId,
        title: data.title,
        description: data.description || null,
      },
    });
  } catch (error) {
    console.error('Error in createTask:', error);
    throw error;
  }
};

export const updateTask = async (
  taskId: number,
  userId: number,
  data: UpdateTaskDTO
) => {
  try {
    // First check if task exists and belongs to user
    const task = await prisma.task.findFirst({
      where: { id: taskId, userId },
    });

    if (!task) {
      throw new Error('Task not found');
    }

    console.log('Updating task:', taskId, 'with data:', data);

    return await prisma.task.update({
      where: { id: taskId },
      data,
    });
  } catch (error) {
    console.error('Error in updateTask:', error);
    throw error;
  }
};

export const deleteTask = async (taskId: number, userId: number) => {
  try {
    // First check if task exists and belongs to user
    const task = await prisma.task.findFirst({
      where: { id: taskId, userId },
    });

    if (!task) {
      throw new Error('Task not found');
    }

    console.log('Deleting task:', taskId);

    await prisma.task.delete({
      where: { id: taskId },
    });
  } catch (error) {
    console.error('Error in deleteTask:', error);
    throw error;
  }
};