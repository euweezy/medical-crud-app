'use client';

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function ExportButton({ tableName }: { tableName: string }) {
  const [isExporting, setIsExporting] = useState(false);

  const fetchTableData = async () => {
    const { data, error } = await supabase.from(tableName).select("*");
    if (error) {
      console.error("Error fetching data:", error);
      return [];
    }
    return data || [];
  }

  const handleDownloadExcel = async () => {
    setIsExporting(true);
    const data = await fetchTableData();
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, `${tableName}.xlsx`);
    setIsExporting(false);
  }

  const handleDownloadPDF = async () => {
    setIsExporting(true);
    const data = await fetchTableData();
    if (!data || data.length === 0) {
        alert(`No data found in ${tableName} to export.`);
        return;
      }
    const headers = Object.keys(data[0]);
    const rows = data.map((row) => headers.map((header) => row[header]));
    const doc = new jsPDF();
    autoTable(doc, {
        head: [headers],
        body: rows,
        theme: 'grid',
        styles: { fontSize: 8 },
        headStyles: { fillColor: [41, 128, 185] }, 
      });
    doc.save(`${tableName}.pdf`);
    setIsExporting(false);
  }

  return (
    <div className="flex gap-4">
      <button 
        onClick={handleDownloadExcel} 
        disabled={isExporting}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50 transition-colors"
      >
        Export Excel
      </button>
      <button 
        onClick={handleDownloadPDF} 
        disabled={isExporting}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded disabled:opacity-50 transition-colors"
      >
        Export PDF
      </button>
    </div>
  );
}