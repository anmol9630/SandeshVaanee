import React, { useState, useRef } from 'react';
import { useTable } from 'react-table';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

// Dummy data for demonstration purposes
const initialData = [
  { name: 'John Doe', age: 28, city: 'New York' },
  { name: 'Jane Smith', age: 32, city: 'San Francisco' },
  { name: 'Alice Johnson', age: 45, city: 'Chicago' },
  { name: 'Bob Brown', age: 31, city: 'Austin' },
  { name: 'Charlie Davis', age: 22, city: 'Seattle' },
  { name: 'Daisy Miller', age: 38, city: 'Miami' },
  { name: 'Ethan Wilson', age: 29, city: 'Boston' },
  { name: 'Fiona Clark', age: 27, city: 'Denver' },
  { name: 'George Hall', age: 39, city: 'Portland' },
  { name: 'Hannah King', age: 34, city: 'Atlanta' },
];

const DynamicReportTable = () => {
  const [data, setData] = useState(initialData);
  const [viewMode, setViewMode] = useState('table');
  const tableRef = useRef();

  // Create columns based on the data keys
  const columns = React.useMemo(() => {
    if (!data || data.length === 0) return [];
    return Object.keys(data[0]).map(key => ({
      Header: key,
      accessor: key,
    }));
  }, [data]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });

  const handleExportPdf = () => {
    const doc = new jsPDF();
    const tableColumn = columns.map(col => col.Header);
    const tableRows = rows.map(row => row.cells.map(cell => cell.value));

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });

    doc.save('report.pdf');
  };

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Report');
    XLSX.writeFile(wb, 'report.xlsx');
  };

  const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const handleEdit = (index, key, value) => {
    const newData = [...data];
    newData[index][key] = value;
    setData(newData);
  };

  const renderTableView = () => (
    <table {...getTableProps()} ref={tableRef} style={styles.table}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} style={styles.th}>{column.render('Header')}</th>
            ))}
            <th style={styles.th}>Actions</th>
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, rowIndex) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} style={row.index % 2 === 0 ? styles.trEven : styles.trOdd}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()} style={styles.td}>{cell.render('Cell')}</td>
              ))}
              <td style={styles.td}>
                <button onClick={() => handleDelete(rowIndex)} style={styles.actionButton}>Delete</button>
                <button onClick={() => handleEdit(rowIndex, 'name', prompt('Enter new name'))} style={styles.actionButton}>Edit</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  const renderGridView = () => (
    <div style={styles.grid}>
      {data.map((item, index) => (
        <div key={index} style={styles.gridItem}>
          {Object.keys(item).map((key, idx) => (
            <div key={idx} style={styles.gridItemContent}>
              <strong>{key}:</strong> {item[key]}
            </div>
          ))}
          <button onClick={() => handleDelete(index)} style={styles.actionButton}>Delete</button>
          <button onClick={() => handleEdit(index, 'name', prompt('Enter new name'))} style={styles.actionButton}>Edit</button>
        </div>
      ))}
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => setViewMode('table')}>Table View</button>
        <button style={styles.button} onClick={() => setViewMode('grid')}>Grid View</button>
        <button style={styles.button} onClick={handlePrint}>Print</button>
        <button style={styles.button} onClick={handleExportPdf}>Export to PDF</button>
        <button style={styles.button} onClick={handleExportExcel}>Export to Excel</button>
      </div>

      {viewMode === 'table' ? renderTableView() : renderGridView()}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#FFF',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    borderBottom: '2px solid #ddd',
    padding: '8px',
    backgroundColor: '#f2f2f2',
    textAlign: 'left',
  },
  td: {
    borderBottom: '1px solid #ddd',
    padding: '8px',
  },
  trEven: {
    backgroundColor: '#f9f9f9',
  },
  trOdd: {
    backgroundColor: '#ffffff',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
  },
  gridItem: {
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '10px',
    backgroundColor: '#fff',
  },
  gridItemContent: {
    marginBottom: '10px',
  },
  actionButton: {
    padding: '5px 10px',
    margin: '5px',
    backgroundColor: '#28a745',
    color: '#FFF',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default DynamicReportTable;
