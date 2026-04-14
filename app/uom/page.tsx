import { pool } from '../lib/db';
import { deleteUom, createUom } from '../lib/actions'; 
import DeleteButton from '../components/DeleteButton';
import ExportButton from '../components/ExportButton';

export const dynamic = 'force-dynamic'; 

export default async function UOMPage() {
  const { rows: uoms } = await pool.query('SELECT * FROM uom ORDER BY id DESC;');

  return (
    <main className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Units of Measure (UOM)</h1>

      <section className="mb-8 p-5 bg-blue-50 border border-blue-100 rounded-xl shadow-sm">
        <h2 className="text-sm font-bold mb-3 text-blue-700 uppercase tracking-tight">Add New Unit</h2>
        <form action={createUom} className="flex flex-col md:flex-row gap-3">
          <input 
            name="name" 
            placeholder="Unit Name (e.g., mg/dL)" 
            required 
            className="flex-1 p-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
          />
          <input 
            name="description" 
            placeholder="Full Description" 
            className="flex-[2] p-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
          />
          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg text-sm font-bold transition-all shadow-md active:scale-95"
          >
            Add Unit
          </button>
          <ExportButton tableName="uom" />
        </form>
      </section>
      
      <div className="overflow-x-auto shadow-lg border border-gray-200 rounded-xl">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase border-b">ID</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase border-b">Name</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase border-b">Description</th>
              <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase border-b">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {uoms.map((uom) => (
              <tr key={uom.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-400">{uom.id}</td>
                <td className="px-6 py-4 text-sm font-bold text-gray-800">{uom.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{uom.description}</td>
                <td className="px-6 py-4 text-center">
                  <DeleteButton id={uom.id} onDelete={deleteUom} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}