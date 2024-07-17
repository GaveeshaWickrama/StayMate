import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

function Report() {
  const data = [
    { name: 'January', income: 4000, expenses: 2400 },
    { name: 'February', income: 3000, expenses: 1398 },
    { name: 'March', income: 2000, expenses: 9800 },
    { name: 'April', income: 2780, expenses: 3908 },
    { name: 'May', income: 1890, expenses: 4800 },
    { name: 'June', income: 2390, expenses: 3800 },
    { name: 'July', income: 3490, expenses: 4300 },
  ];

  const downloadReportData = () => {
    const csvRows = [
      ['Month', 'Income', 'Expenses'],
      ...data.map(row => [row.name, row.income, row.expenses]),
    ];
    const csvString = csvRows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'report_data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="p-5 text-gray-900 bg-gray-100 min-h-screen">
      <h3 className="text-2xl font-bold py-4">Monthly Income Report</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-20 h-96">
        <div className="bg-white shadow-md p-5 rounded-md">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#8884d8" />
              <Bar dataKey="expenses" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow-md p-5 rounded-md">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="expenses" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <button 
        onClick={downloadReportData}
        className="mt-5 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Download Report Data
      </button>
    </main>
  );
}

export default Report;
