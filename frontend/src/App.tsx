import { PostForm } from './components/PostForm';
import { PostList } from './components/PostList';
import { PostFilter } from './components/PostFilter';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-normal text-gray-900">
            Propuesta visual
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-5xl mx-auto px-4 py-8 flex flex-col items-center">

        {/* Top: Filter */}
        <section className="w-full max-w-4xl mb-8">
          <PostFilter />
        </section>

        {/* Middle: Table */}
        <section className="w-full max-w-4xl mb-8">
          <PostList />
        </section>

        {/* Bottom: Form */}
        <section className="w-full max-w-4xl">
          <PostForm />
        </section>

      </main>
    </div>
  );
}

export default App;
