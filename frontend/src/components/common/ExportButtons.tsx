import { Button, HStack } from '@chakra-ui/react';
import { FaFileExcel, FaFilePdf } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface Column {
    header: string;
    key: string; // Key path like 'user.name' is not supported by simple access, so assuming flat or simple keys. For nested, we might need a getter.
    // Let's support nested keys via a simple accessor function if needed, but 'key' for simple cases is fine.
    // If we use a formatter passed from parent, we can handle complex logic there.
    formatter?: (value: any, item?: any) => string;
}

interface ExportButtonsProps {
    data: any[];
    columns: Column[];
    fileName: string;
    title: string;
}

const ExportButtons = ({ data, columns, fileName, title }: ExportButtonsProps) => {
    const exportExcel = () => {
        const excelData = data.map(item => {
            const row: any = {};
            columns.forEach(col => {
                // If key has dots, we might want to resolve it, but for now assuming direct access or using formatter for complex access
                // Actually, let's keep it simple. The caller should prepare flat data or use formatter.
                // Wait, if formatter uses 'value', we need to extract it.
                // Let's modify to allow accessing the whole item in formatter.

                let value = item[col.key];
                // Simple dot notation support?
                if (col.key.includes('.')) {
                    const keys = col.key.split('.');
                    value = item;
                    for (const k of keys) {
                        value = value?.[k];
                    }
                }

                row[col.header] = col.formatter ? col.formatter(value, item) : (value ?? '');
            });
            return row;
        });

        const ws = XLSX.utils.json_to_sheet(excelData);
        // Set column widths? Auto-width is nice but extra code. json_to_sheet does ok.

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, `${fileName}.xlsx`);
    };

    const exportPDF = () => {
        const doc = new jsPDF();

        // Add title
        doc.setFontSize(18);
        doc.text(title, 14, 22);

        // Add date
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 30);

        const tableColumn = columns.map(col => col.header);
        const tableRows = data.map(item => {
            return columns.map(col => {
                let value = item[col.key];
                if (col.key.includes('.')) {
                    const keys = col.key.split('.');
                    value = item;
                    for (const k of keys) {
                        value = value?.[k];
                    }
                }
                return col.formatter ? col.formatter(value, item) : (value ?? '');
            });
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 40,
            theme: 'grid',
            styles: { fontSize: 8 },
            headStyles: { fillColor: [66, 153, 225] },
        });

        doc.save(`${fileName}.pdf`);
    };

    return (
        <HStack spacing={2}>
            <Button
                leftIcon={<FaFileExcel />}
                colorScheme="brand"
                size="sm"
                onClick={exportExcel}
                isDisabled={data.length === 0}
            >
                Excel
            </Button>
            <Button
                leftIcon={<FaFilePdf />}
                colorScheme="red"
                size="sm"
                onClick={exportPDF}
                isDisabled={data.length === 0}
            >
                PDF
            </Button>
        </HStack>
    );
};

export default ExportButtons;
