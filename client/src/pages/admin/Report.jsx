import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

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

  const pieData = [
    { name: 'Colombo', value: 400 },
    { name: 'Kandy', value: 300 },
    { name: 'Matara', value: 300 },
    { name: 'Ella', value: 200 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const downloadReportData = (reportType) => {
    let csvRows;
    if (reportType === 'bar' || reportType === 'line') {
      csvRows = [
        ['Month', 'Income', 'Expenses'],
        ...data.map(row => [row.name, row.income, row.expenses]),
      ];
    } else if (reportType === 'pie') {
      csvRows = [
        ['Location', 'Value'],
        ...pieData.map(row => [row.name, row.value]),
      ];
    }

    const csvString = csvRows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportType}_report_data.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="p-5 text-gray-900 bg-gray-100 min-h-screen">
      <h3 className="text-4xl font-bold py-4 text-left">Reports</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10">
        <div className="bg-white shadow-md p-5 rounded-md">
          <h3 className="text-xl font-bold py-4 text-center">Monthly Income (Bar Chart)</h3>
          <ResponsiveContainer width="100%" height={250}>
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
          <div className="text-center">
            <button 
              onClick={() => downloadReportData('bar')}
              className="mt-5 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Download Bar Chart Data
            </button>
          </div>
        </div>

        <div className="bg-white shadow-md p-5 rounded-md">
          <h3 className="text-xl font-bold py-4 text-center">Monthly Income (Line Chart)</h3>
          <ResponsiveContainer width="100%" height={250}>
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
          <div className="text-center">
            <button 
              onClick={() => downloadReportData('line')}
              className="mt-5 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Download Line Chart Data
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 bg-white shadow-md p-5 rounded-md">
        <h3 className="text-xl font-bold py-4 text-center">Location-based Properties</h3>
        <div className="flex">
          <ResponsiveContainer width="70%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="75%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="w-1/3 flex flex-col justify-center items-center">
            {pieData.map((entry, index) => (
              <div key={`legend-${index}`} className="flex items-center mb-2">
                <div
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  className="w-4 h-4 mr-2 rounded-full"
                ></div>
                <span className="ml-2 text-sm font-medium">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center">
          <button 
            onClick={() => downloadReportData('pie')}
            className="mt-5 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Download Pie Chart Data
          </button>
        </div>
      </div>
    </main>
  );
}

export default Report;
