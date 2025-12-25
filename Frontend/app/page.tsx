import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Navbar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            TaskManager
          </Link>
          <div className="flex gap-4">
            <Link
              href="/login"
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to Task Manager
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Organize your tasks efficiently with our simple and powerful task management system.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/register"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium"
            >
              Login
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-semibold mb-2">Easy Task Management</h3>
              <p className="text-gray-600">Create, edit, and organize your tasks with ease</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Secure Authentication</h3>
              <p className="text-gray-600">Your data is protected with JWT authentication</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">Responsive Design</h3>
              <p className="text-gray-600">Access your tasks from any device</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}