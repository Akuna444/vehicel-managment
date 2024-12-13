import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { CloudDownload } from 'lucide-react';
import jsPDF from 'jspdf';
import { applyPlugin } from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { getCurrentDate } from '@/lib/utils';

applyPlugin(jsPDF);

interface ExportButtonProps {
  data: any[];
  columns: string[];
  filename: string;
}

const exportAsPDF = (data: any[], columns: string[], filename: string) => {
  const doc = new jsPDF();
  const newColumns = columns.filter(
    (col) => col !== 'select' && col !== 'actions'
  );

  const rows = data.map((item) => newColumns.map((col) => item[col] || ''));
  console.log(rows, 'd');
  doc.setFontSize(18);
  doc.text('Exported Data', 14, 22);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  doc.autoTable({
    head: [newColumns],
    body: rows,
    startY: 30
  });
  doc.save(`${filename}.pdf`);
};

const exportAsXLSX = (data: any[], columns: string[], filename: string) => {
  const ws = XLSX.utils.json_to_sheet(data, { header: columns });
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, `${filename}.xlsx`);
};

const exportAsCSV = (data: any[], columns: string[], filename: string) => {
  const csvContent = [
    columns.join(','),
    ...data.map((row) => columns.map((col) => row[col]).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.click();
};

const ExportButton: React.FC<ExportButtonProps> = ({
  data,
  columns,
  filename
}) => {
  const date = getCurrentDate();
  const formattedFileName = `${filename}-${date}`;
  const handleExport = (format: 'pdf' | 'xlsx' | 'csv') => {
    switch (format) {
      case 'pdf':
        exportAsPDF(data, columns, formattedFileName);
        break;
      case 'xlsx':
        exportAsXLSX(data, columns, formattedFileName);
        break;
      case 'csv':
        exportAsCSV(data, columns, formattedFileName);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="dark:text-white md:text-base" variant="outline">
            <CloudDownload className="mr-2 h-4 w-4" /> Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleExport('pdf')}>
            Export as PDF
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport('xlsx')}>
            Export as Excel (XLSX)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport('csv')}>
            Export as CSV
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ExportButton;
