'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthToken, removeAuthToken } from '@/lib/auth';
import api from '@/lib/api';

interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const token = getAuthToken();
    console.log('Dashboard mounted. Token:', token ? 'EXISTS' : 'MISSING');

    if (!token) {
      console.log('No token, redirecting to login');
      router.push('/login');
      return;
    }

    // Fetch tasks
    fetchTasks();
  }, []); // Remove router from dependencies

  const fetchTasks = async () => {
    try {
      console.log('Fetching tasks...');
      const response = await api.get('/tasks');
      console.log('Tasks received:', response.data);
      setTasks(response.data);
      setError('');
    } catch (err: any) {
      console.error('Failed to fetch tasks:', err);
      if (err.response?.status === 401) {
        // Token expired or invalid
        removeAuthToken();
        router.push('/login');
      } else {
        setError('Failed to load tasks');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }

    setError('');

    try {
      console.log('Creating task:', { title, description });
      const response = await api.post('/tasks', { 
        title: title.trim(), 
        description: description.trim() || undefined 
      });
      console.log('Task created:', response.data);
      
      setTasks([response.data, ...tasks]);
      setTitle('');
      setDescription('');
    } catch (err: any) {
      console.error('Failed to create task:', err);
      setError(err.response?.data?.error || 'Failed to create task');
    }
  };

  const handleToggleComplete = async (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    try {
      console.log('Toggling task completion:', id);
      const response = await api.put(`/tasks/${id}`, { completed: !task.completed });
      setTasks(tasks.map(t => t.id === id ? response.data : t));
      setError('');
    } catch (err: any) {
      console.error('Failed to update task:', err);
      setError('Failed to update task');
    }
  };

  const handleDeleteTask = async (id: number) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    try {
      console.log('Deleting task:', id);
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t.id !== id));
      setError('');
    } catch (err: any) {
      console.error('Failed to delete task:', err);
      setError('Failed to delete task');
    }
  };

  const handleLogout = () => {
    console.log('Logging out...');
    removeAuthToken();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md mb-8">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Task Manager</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">My Tasks</h2>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Create Task Form */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">Create New Task</h3>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Task title *"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Task description (optional)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
              >
                Add Task
              </button>
            </form>
          </div>

          {/* Task List */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Your Tasks ({tasks.length})
              </h3>
            </div>

            <div className="space-y-4">
              {tasks.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-md">
                  <div className="text-6xl mb-4">📝</div>
                  <p className="text-gray-500 text-lg font-medium">No tasks yet</p>
                  <p className="text-gray-400 text-sm mt-2">Create your first task to get started!</p>
                </div>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggleComplete(task.id)}
                        className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                      <div className="flex-1 min-w-0">
                        <h4
                          className={`text-lg font-medium break-words ${
                            task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                          }`}
                        >
                          {task.title}
                        </h4>
                        {task.description && (
                          <p className={`mt-1 text-sm break-words ${
                            task.completed ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {task.description}
                          </p>
                        )}
                        {task.createdAt && (
                          <p className="mt-2 text-xs text-gray-400">
                            Created: {new Date(task.createdAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-red-600 hover:text-red-800 font-medium text-sm px-3 py-1 rounded hover:bg-red-50 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}