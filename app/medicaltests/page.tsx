import { pool } from '../lib/db';
import { deleteMedicalTest, createMedicalTest } from '../lib/actions'; 
import DeleteButton from '@/app/components/DeleteButton';
import ExportButton from '../components/ExportButton';
import SubmitButton from '../components/SubmitButton';

export const dynamic = 'force-dynamic'; 

export default async function MedicalTestsPage() {
  const { rows: tests } = await pool.query(`
    SELECT mt.id, mt.name, tc.name AS category, u.name AS unit, mt.normalmin, mt.normalmax
    FROM medicaltests mt
    JOIN testcategories tc ON mt.idcategory = tc.id
    JOIN uom u ON mt.iduom = u.id
    ORDER BY mt.id DESC;
  `);

  const { rows: categories } = await pool.query('SELECT id, name FROM testcategories ORDER BY name;');
  const { rows: uoms } = await pool.query('SELECT id, name FROM uom ORDER BY name;');

  return (
    <main className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Medical Tests</h1>

      <section className="mb-10 p-6 bg-gray-50 rounded-xl border border-gray-200">
        <h2 className="text-sm font-semibold mb-4 text-gray-600 uppercase">Add New Test</h2>
        <form action={createMedicalTest} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input 
            name="name" 
            placeholder="Test Name" 
            required 
            className="p-2 border rounded bg-white" 
          />
          
          <select name="idcategory" required className="p-2 border rounded bg-white">
            <option value="">Select Category</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>

          <select name="iduom" required className="p-2 border rounded bg-white">
            <option value="">Select Unit</option>
            {uoms.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>

          <input name="normalmin" type="number" step="0.01" placeholder="Min Value" className="p-2 border rounded bg-white" />
          <input name="normalmax" type="number" step="0.01" placeholder="Max Value" className="p-2 border rounded bg-white" />
          
          <SubmitButton label="Add Test" />
          <ExportButton tableName="medicaltests" />
        </form>
      </section>
      
      <div className="overflow-x-auto shadow-sm border border-gray-200 rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border-b">Test Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border-b">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border-b">Unit</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border-b">Min</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border-b">Max</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase border-b">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tests.map((test) => (
              <tr key={test.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{test.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{test.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{test.unit}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{test.normalmin}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{test.normalmax}</td>
                <td className="px-6 py-4 text-center">
                  <DeleteButton id={test.id} onDelete={deleteMedicalTest} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}