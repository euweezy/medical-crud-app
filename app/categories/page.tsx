import { pool } from '../lib/db';
import { deleteCategory, createCategory } from '../lib/actions';
import DeleteButton from '@/app/components/DeleteButton';
import ExportButton from '../components/ExportButton';
import SubmitButton from '../components/SubmitButton';

export const dynamic = 'force-dynamic'; 

export default async function CategoriesPage() {
  const { rows: categories } = await pool.query('SELECT * FROM testcategories ORDER BY id DESC;');

  return (
    <main className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Test Categories</h1>
      
      <section className="mb-8 p-4 bg-gray-50 border rounded-lg">
        <h2 className="text-sm font-semibold mb-3 text-gray-600 uppercase tracking-wider">Add New Category</h2>
        <form action={createCategory} className="flex flex-col md:flex-row gap-3">
          <input 
            name="name" 
            placeholder="Category Name" 
            required 
            className="flex-1 p-2 border rounded text-sm" 
          />
          <input 
            name="description" 
            placeholder="Description (Optional)" 
            className="flex-[2] p-2 border rounded text-sm" 
          />
          <SubmitButton label="Add Category" />
          <ExportButton tableName="testcategories" />
        </form>
      </section>
      
      {/* TABLE */}
      <div className="overflow-x-auto shadow-sm border border-gray-200 rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border-b">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border-b">Category Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border-b">Description</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase border-b">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-500">{category.id}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{category.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{category.description}</td>
                <td className="px-6 py-4 text-center">
                  <DeleteButton id={category.id} onDelete={deleteCategory} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}