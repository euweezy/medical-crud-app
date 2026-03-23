import { pool } from '../lib/db';

// This forces Next.js to dynamically render the page so it shows fresh DB data
export const dynamic = 'force-dynamic'; 

export default async function MedicalTestsPage() {
  // Execute the exact raw SQL JOIN query required by the assignment
  const { rows: tests } = await pool.query(`
    SELECT mt.name, tc.name AS category, u.name AS unit, mt.normalmin, mt.normalmax
    FROM medicaltests mt
    JOIN testcategories tc ON mt.idcategory = tc.id
    JOIN uom u ON mt.iduom = u.id;
  `);

  return (
    <main className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Medical Tests</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Test Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Unit</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Min</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Max</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tests.map((test, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{test.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{test.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{test.unit}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{test.normalmin}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{test.normalmax}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}