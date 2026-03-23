import { pool } from '../lib/db';

// Forces Next.js to fetch fresh data on every page load
export const dynamic = 'force-dynamic'; 

export default async function UOMPage() {
  // Simple query to get all Units of Measure
  const { rows: uoms } = await pool.query('SELECT * FROM uom ORDER BY id;');

  return (
    <main className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Units of Measure (UOM)</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {uoms.map((uom, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{uom.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{uom.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{uom.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}