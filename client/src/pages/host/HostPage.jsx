// import React, { useState } from "react";
// import {
//   FaMoneyBillWave,
//   FaHome,
// } from "react-icons/fa";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// // GreetingBox Component
// function GreetingBox({ name }) {
//   return (
//     <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg mb-8">
//       <h1 className="text-4xl font-bold text-gray-800">Hello, {name}!</h1>
//     </div>
//   );
// }

// function HostPage() {
//   // Simulated data
//   const [totalRevenue] = useState(65000);
//   const [totalBookedProperties] = useState(100);
//   const [totalProperties] = useState(120); // Ensure this number is greater than totalBookedProperties
//   const [incomeExpensesDataMonthly] = useState([
//     { month: "January", income: 5000, expenses: 2000 },
//     { month: "February", income: 5500, expenses: 1800 },
//     { month: "March", income: 6000, expenses: 2200 },
//     { month: "April", income: 6500, expenses: 2100 },
//     { month: "May", income: 7000, expenses: 2500 },
//     { month: "June", income: 7500, expenses: 2300 },
//     { month: "July", income: 8000, expenses: 2400 },
//     { month: "August", income: 8200, expenses: 2500 },
//     { month: "September", income: 8300, expenses: 2600 },
//     { month: "October", income: 8500, expenses: 2700 },
//     { month: "November", income: 8700, expenses: 2800 },
//     { month: "December", income: 9000, expenses: 2900 },
//   ]);

//   const [incomeExpensesDataYearly] = useState([
//     { year: "2020", income: 60000, expenses: 25000 },
//     { year: "2021", income: 65000, expenses: 26000 },
//     { year: "2022", income: 70000, expenses: 27000 },
//     { year: "2023", income: 75000, expenses: 28000 },
//   ]);

//   const [propertyData] = useState([
//     { property: "Beachside Villa", bookings: 25, endDate: "2024-07-31", startDate: "2024-01-15", persons: 4, revenue: 12500 },
//     { property: "Mountain Lodge", bookings: 18, endDate: "2024-07-15", startDate: "2024-03-10", persons: 6, revenue: 9000 },
//     { property: "City Apartment", bookings: 20, endDate: "2024-08-05", startDate: "2024-02-20", persons: 2, revenue: 10000 },
//     { property: "Countryside Cabin", bookings: 15, endDate: "2024-09-10", startDate: "2024-04-15", persons: 3, revenue: 7500 },
//     { property: "Lake House", bookings: 22, endDate: "2024-10-01", startDate: "2024-05-25", persons: 5, revenue: 11000 },
//   ]);

//   const [view, setView] = useState("monthly");

//   const data = view === "monthly" ? incomeExpensesDataMonthly : incomeExpensesDataYearly;
//   const dataKey = view === "monthly" ? "month" : "year";

//   const downloadCSV = (data, filename) => {
//     const csvRows = [];
//     // Get headers
//     const headers = Object.keys(data[0]);
//     csvRows.push(headers.join(','));

//     // Format data
//     for (const row of data) {
//       const values = headers.map(header => row[header]);
//       csvRows.push(values.join(','));
//     }

//     // Create a CSV blob and download it
//     const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = filename;
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <main className="p-6 min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
//       <GreetingBox name="Sachin Elvitigala" />

//       <h3 className="text-4xl font-bold text-gray-800 mb-8">Dashboard</h3>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
//         <div className="bg-white shadow-xl p-6 rounded-lg flex flex-col items-center transform transition duration-300 hover:scale-105">
//           <FaMoneyBillWave className="text-5xl text-green-600 mb-3 animate-pulse" />
//           <h3 className="text-xl font-semibold text-gray-700">Total Revenue</h3>
//           <p className="text-2xl font-bold text-gray-900">
//             LKR {totalRevenue.toLocaleString()}
//           </p>
//         </div>
//         <div className="bg-white shadow-xl p-6 rounded-lg flex flex-col items-center transform transition duration-300 hover:scale-105">
//           <FaHome className="text-5xl text-purple-600 mb-3 animate-pulse" />
//           <h3 className="text-xl font-semibold text-gray-700">Total Booked Properties</h3>
//           <p className="text-2xl font-bold text-gray-900">
//             {totalBookedProperties}
//           </p>
//         </div>
//         <div className="bg-white shadow-xl p-6 rounded-lg flex flex-col items-center transform transition duration-300 hover:scale-105">
//           <FaHome className="text-5xl text-blue-600 mb-3 animate-pulse" />
//           <h3 className="text-xl font-semibold text-gray-700">Total Properties</h3>
//           <p className="text-2xl font-bold text-gray-900">
//             {totalProperties}
//           </p>
//         </div>
//       </div>

//       <div className="flex justify-end mb-8">
//         <div className="flex space-x-4">
//           <button
//             onClick={() => setView("monthly")}
//             className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${view === "monthly" ? "bg-blue-600 text-white" : "bg-white text-blue-600 border border-blue-600"} hover:bg-blue-700 hover:text-white shadow-md`}
//           >
//             Monthly
//           </button>
//           <button
//             onClick={() => setView("yearly")}
//             className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${view === "yearly" ? "bg-blue-600 text-white" : "bg-white text-blue-600 border border-blue-600"} hover:bg-blue-700 hover:text-white shadow-md`}
//           >
//             Yearly
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <div className="bg-white shadow-xl p-6 rounded-lg transform transition duration-300 hover:scale-105">
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">Property Analysis</h3>
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. of Persons</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {propertyData.map((property, index) => (
//                   <tr key={index} className="hover:bg-gray-100">
//                     <td className="px-6 py-4 whitespace-nowrap">{property.property}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">{property.startDate}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">{property.endDate}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">{property.persons}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">LKR {property.revenue.toLocaleString()}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         <div className="bg-white shadow-xl p-6 rounded-lg transform transition duration-300 hover:scale-105">
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">Income & Expenses</h3>
//           <ResponsiveContainer width="100%" height={400}>
//             <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey={dataKey} />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="income" stroke="#8884d8" strokeWidth={3} />
//               <Line type="monotone" dataKey="expenses" stroke="#82ca9d" strokeWidth={3} />
//             </LineChart>
//           </ResponsiveContainer>
//           <div className="flex justify-end mt-4">
//             <button
//               onClick={() => downloadCSV(data, 'income_expenses_data.csv')}
//               className="px-6 py-3 rounded-lg font-semibold bg-blue-600 text-white transition-colors duration-300 hover:bg-blue-700 shadow-md"
//             >
//               Download Data
//             </button>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// export default HostPage;



import React, { useEffect, useState } from "react";
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
} from "recharts";
import { useStore } from "../../context/StoreContext";
import { FaMoneyBillWave, FaCalendarCheck, FaHome } from "react-icons/fa";

// Helper function to generate random values
const generateRandomValue = (baseValue, variance) =>
  Math.max(0, baseValue + Math.floor(Math.random() * variance * 2) - variance);

const getOrCreateRandomData = (key, length, baseValue, variance) => {
  const storedData = localStorage.getItem(key);
  if (storedData) {
    return JSON.parse(storedData);
  }

  const newData = Array.from({ length }, (_, index) => ({
    name:
      key === "quarterly"
        ? `Q${index + 1}`
        : new Date(2020, index).toLocaleString("default", { month: "short" }),
    revenue: generateRandomValue(baseValue / length, variance),
  }));

  localStorage.setItem(key, JSON.stringify(newData));
  return newData;
};

function HostPage() {
  const { userReservations } = useStore();
  const [totalHostRevenue, setTotalHostRevenue] = useState(0);
  const [revenueData, setRevenueData] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [uniqueProperties, setUniqueProperties] = useState(0);

  useEffect(() => {
    const calculateHostRevenue = () => {
      let totalRevenue = 0;
      const propertySet = new Set();

      userReservations.forEach((reservation) => {
        totalRevenue += reservation.totalPrice * 0.9; // Host receives 90% of the total price
        propertySet.add(reservation.property.title); // Assuming property title is unique
      });

      setTotalHostRevenue(totalRevenue);
      setUniqueProperties(propertySet.size);
    };

    calculateHostRevenue();
  }, [userReservations]);

  useEffect(() => {
    if (totalHostRevenue > 0) {
      const quarterlyVariance = totalHostRevenue / 8; // Adjust variance as needed
      const monthlyVariance = totalHostRevenue / 15; // Adjust variance as needed

      const newRevenueData = getOrCreateRandomData(
        "quarterly",
        4,
        totalHostRevenue,
        quarterlyVariance
      );

      const newTrendData = getOrCreateRandomData(
        "monthly",
        12,
        totalHostRevenue,
        monthlyVariance
      );

      setRevenueData(newRevenueData);
      setTrendData(newTrendData);
    }
  }, [totalHostRevenue]);

  return (
    <main className="p-5 text-gray-900 bg-gray-100 min-h-screen">
      <h3 className="text-3xl font-bold py-8">Host Dashboard</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 my-5">
        <div className="bg-white shadow-md p-5 rounded-md flex flex-col items-center">
          <FaMoneyBillWave className="text-4xl text-green-500 mb-2" />
          <h3 className="text-lg font-medium ">Total Revenue</h3>
          <h1 className="text-2xl font-bold">
            LKR {totalHostRevenue.toLocaleString()}
          </h1>
        </div>
        <div className="bg-white shadow-md p-5 rounded-md flex flex-col items-center">
          <FaCalendarCheck className="text-4xl text-orange-500 mb-2" />
          <h3 className="text-lg font-medium">Upcoming Bookings</h3>
          <h1 className="text-2xl font-bold">
            {userReservations.filter((res) => res.status === "upcoming").length}
          </h1>
        </div>
        <div className="bg-white shadow-md p-5 rounded-md flex flex-col items-center">
          <FaHome className="text-4xl text-blue-500 mb-2" />
          <h3 className="text-lg font-medium">Number of Properties</h3>
          <h1 className="text-2xl font-bold">{uniqueProperties}</h1>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={revenueData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={trendData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}

export default HostPage;
