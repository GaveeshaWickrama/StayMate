import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { StarRating } from "../host/components/StarRating";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import {
  BarChart,
  PieChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
  Pie,
} from "recharts";
import { FaClock } from "react-icons/fa";

function AdminDashboard() {
  const { currentUser, loading } = useAuth();
  const [noOfJobs, setNoOfJobs] = useState(null); //no of completed jobs
  const [technician, setTechnician] = useState({});
  const [error, setError] = useState(null);
  const [allJobs, setAllJobs] = useState([]); //list of all the jobs
  const [completedJobs, setCompletedJobs] = useState([]); //filtered list of completed jobs from all the jobs
  const [jobsPerMonth, setJobsPerMonth] = useState({});
  const [chartData, setChartData] = useState([]);

  //to get noofjobscompleted
  useEffect(() => {
    console.log("entered useeffect");
    const fetchNoOfJobs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/technicians/${
            currentUser.id
          }/noOfJobsCompleted`
        );
        console.log("response", response.data);
        setNoOfJobs(response.data);
      } catch (err) {
        console.error("Error fetching reviews", err);
        setError("Failed to load reviews");
      }
    };

    if (currentUser?.id) {
      fetchNoOfJobs();
    }
  }, [currentUser]);

  console.log(`${import.meta.env.VITE_API_URL}/technicians/${currentUser.id}`);

  //to get the technician details
  useEffect(() => {
    console.log("entered useeffect 2");
    const fetchTechnician = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/technicians/${currentUser.id}`
        );
        console.log("technician response ", response.data);
        setTechnician(response.data);
      } catch (err) {
        console.error("Error fetching technician details", err);
        setError("Failed to load techician details");
      }
    };

    if (currentUser?.id) {
      fetchTechnician();
    }
  }, [currentUser]);

  //toget job details by technician id
  useEffect(() => {
    console.log("entered useeffect 3");
    const fetchTechnician = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/technicians/${currentUser.id}/jobs`
        );
        console.log("job list ", response.data);
        setAllJobs(response.data);
      } catch (err) {
        console.error("Error fetching job list", err);
        setError("Failed to load job list");
      }
    };

    if (currentUser?.id) {
      fetchTechnician();
    }
  }, []);

  useEffect(() => {
    // Only filter if allJobs has been populated
    if (allJobs.length > 0) {
      const filtered = allJobs.filter((job) => job.status === "jobCompleted");
      setCompletedJobs(filtered);
    }
  }, [allJobs]); // Run filter whenever allJobs changes

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("completed jobs", completedJobs);

  console.log("this is the technician info", technician);

  // Function to count jobs by month and year
  // function countJobsByMonth(jobs) {
  //   const jobCounts = {};

  //   completedJobs?.forEach((job) => {
  //     // Extract the month and year from the taskCompletedDate
  //     const taskDate = new Date(job.taskCompletedDate);
  //     const monthYear = `${taskDate.getFullYear()}-${taskDate.getMonth() + 1}`; // Format: "YYYY-MM"

  //     // Increment the count for this month-year
  //     if (jobCounts[monthYear]) {
  //       jobCounts[monthYear]++;
  //     } else {
  //       jobCounts[monthYear] = 1;
  //     }
  //   });

  //   return jobCounts;
  // }

  //  // After jobs are fetched, calculate jobs per month
  //  useEffect(() => {
  //   if (completedJobs.length > 0) {
  //     const monthlyJobCounts = countJobsByMonth(completedJobs);
  //     console.log("monthly job counts",monthlyJobCounts);
  //     setJobsPerMonth(monthlyJobCounts);
  //   }
  // }, [allJobs]); // Recalculate whenever allJobs state changes

  // console.log("jobs per month",jobsPerMonth);

  // Count jobs by month and transform for Recharts
  useEffect(() => {
    const countJobsByMonth = (completedJobs) => {
      const jobCounts = {};
      completedJobs?.forEach((job) => {
        const taskDate = new Date(job.taskCompletedDate);
        const monthYear = `${taskDate.getFullYear()}-${
          taskDate.getMonth() + 1
        }`;

        console.log("month year", monthYear);
        jobCounts[monthYear] = (jobCounts[monthYear] || 0) + 1;
      });
      return jobCounts;
    };

    const counts = countJobsByMonth(completedJobs);

    const fixedMonths = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Transform to match fixed months
    const year = new Date().getFullYear();
    const formattedData = fixedMonths.map((month, index) => {
      const monthYear = `${year}-${index + 1}`;
      return {
        month, // Just the month name
        jobsCompleted: counts[monthYear] || 0, // Use `null` for missing months
      };
    });

    setChartData(formattedData);
  }, [completedJobs]);

  console.log("formatted data", chartData);
  const data = [
    { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
    { name: "March", uv: 2000, pv: 9800, amt: 2290 },
    { name: "April", uv: 2780, pv: 3908, amt: 2000 },
    { name: "May", uv: 1890, pv: 4800, amt: 2181 },
    { name: "June", uv: 2390, pv: 3800, amt: 2500 },
    { name: "July", uv: 3490, pv: 4300, amt: 2100 },
    { name: "August", uv: 3490, pv: 4300, amt: 2100 },
    { name: "September", uv: 3490, pv: 4300, amt: 2100 },
    { name: "October", uv: 3490, pv: 4300, amt: 2100 },
    { name: "November", uv: 3490, pv: 4300, amt: 2100 },
    { name: "December", uv: 3490, pv: 4300, amt: 2100 },
  ];

  console.log("techician rating", technician?.rating);
  const categorizePerformance = (rating) => {
    if (rating >= 4.5) {
      return "Excellent";
    } else if (rating >= 3.5) {
      return "Good";
    } else if (rating >= 2.5) {
      return "Average";
    } else if (rating >= 1.5) {
      return "Below Average";
    } else {
      return "Poor";
    }
  };

  const performanceCategory = categorizePerformance(technician?.rating);

  console.log(`Technician Performance: ${performanceCategory}`);

  const activeJobs = allJobs.filter(
    (job) =>
      job.status === "active" ||
      job.status === "technicianCompleted" ||
      job.status === "jobCompleted"
  );
  const totalJobs = allJobs.length; // Assuming this is the total assigned jobs, including Pending and Completed

  // Calculate Job Acceptance Rate
  const jobAcceptanceRate =
    totalJobs > 0 ? (activeJobs.length / totalJobs) * 100 : 0;

  console.log("Job Acceptance Rate: ", jobAcceptanceRate.toFixed(2), "%");

  const averageCompletionTime =
    allJobs
      .filter((job) => job.status === "jobCompleted")
      .reduce((acc, job) => {
        const startDate = new Date(job.assignedDate);
        console.log("start date", startDate);
        const endDate = new Date(job.taskCompletedDate);
        console.log("end date", endDate);
        const timeTaken = (endDate - startDate) / (1000 * 3600 * 24); // Time in days
        return acc + timeTaken;
      }, 0) / noOfJobs;

  const statusColors = {
    pendingTechnicianApproval: "#ffcc00", // Yellow for Pending
    active: "#0088FE", // Blue for In Progress
    technicianCompleted: "red",
    jobCompleted: "#00C49F", // Green for Completed
  };
  const desiredStatuses = [
    "PendingTechnicianApproval",
    "active",
    "technicianCompleted",
    "jobCompleted",
  ]; // Specify the statuses you want to include

  const jobStatusCounts = allJobs.reduce((acc, job) => {
    if (desiredStatuses.includes(job.status)) {
      acc[job.status] = (acc[job.status] || 0) + 1;
    }
    return acc;
  }, {});

  const chartStatusData = Object.entries(jobStatusCounts).map(
    ([status, count]) => ({
      name: status,
      value: count,
    })
  );

  console.log("job status counts", jobStatusCounts);

  return (
    <main className="main-container p-5 text-gray-900 bg-gray-100 min-h-screen">
      <div className="main-title flex justify-between">
        <h3 className="text-3xl font-bold py-8">DASHBOARD</h3>
      </div>

      <div className="main-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-5">
        <div className="card bg-white shadow-md p-5 rounded-md flex flex-col justify-around">
          <div className="card-inner flex items-center justify-between">
            <h3 className="text-lg font-medium">Jobs done</h3>
            <BsFillArchiveFill className="card_icon text-2xl" />
          </div>
          <h1 className="text-3xl font-bold">
            {noOfJobs !== null ? noOfJobs : 0}
          </h1>
        </div>
        <div className="card bg-white shadow-md p-5 rounded-md flex flex-col justify-around">
          <div className="card-inner flex items-center justify-between">
            <h3 className="text-lg font-medium">Rating</h3>
            <BsFillGrid3X3GapFill className="card_icon text-2xl" />
          </div>
          <h1 className="text-3xl font-bold">
            {parseFloat(technician?.rating || 0).toFixed(1)}
          </h1>

          <p className="text-sm text-gray-500">
            <div className="rating w-3/5">
              {[1, 2, 3, 4, 5].map((star) => (
                <input
                  key={star}
                  type="radio"
                  name="rating"
                  className={`mask mask-star ${
                    star <= technician?.rating ? "bg-yellow-500" : "bg-gray-600"
                  }`}
                  disabled
                  checked={
                    star <=
                    Math.floor(parseFloat(technician?.rating || 0).toFixed(1))
                  } //fill up to the whole number part
                ></input>
              ))}
              {/* {technician?.rating % 1 >= 0.5 && (
                        <input
                        type="radio"
                        name="rating"
                        className='mask mask-star-half bg-yellow-500'
                        disabled
                        checked
                        >
                        </input>
                       )} */}
            </div>
          </p>
          <span>{performanceCategory}</span>
        </div>
        <div className="card bg-white shadow-md p-5 rounded-md flex flex-col justify-around">
          <div className="card-inner flex items-center justify-between">
            <h3 className="text-lg font-medium">Job Acceptance Rate</h3>
            <BsPeopleFill className="card_icon text-2xl" />
          </div>
          <h1 className="text-3xl font-bold">
            {jobAcceptanceRate.toFixed(2)}%
          </h1>
        </div>
        {typeof averageCompletionTime === "number" &&
          !isNaN(averageCompletionTime) &&
          averageCompletionTime !== null && (
            <div className="card bg-white shadow-md p-5 rounded-md flex flex-col justify-around">
              <div className="card-inner flex items-center justify-between">
                <h3 className="text-lg font-medium">Average Completed Time</h3>
                <FaClock className="card_icon text-2xl" />
              </div>
              <h1 className="text-3xl font-bold">
                {averageCompletionTime} days
              </h1>
            </div>
          )}
      </div>

      <div className="charts grid grid-cols-1 lg:grid-cols-2 gap-5 mt-20 h-auto rounded-md">
        {/* Activity Chart */}
        <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-md p-5">
          <h3 className="text-lg font-semibold text-black mb-4">Activity</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />

              {/* X-Axis with Label */}
              <XAxis dataKey="month">
                <Label value="Months" offset={-5} position="insideBottom" />
              </XAxis>

              {/* Y-Axis with Label */}
              <YAxis>
                <Label
                  value="Jobs Completed"
                  angle={-90}
                  position="insideLeft"
                  style={{ textAnchor: "middle" }}
                />
              </YAxis>

              <Tooltip />
              <Line
                type="monotone"
                dataKey="jobsCompleted"
                stroke="#8884d8"
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Jobs Section */}
        <div className="recent-activity bg-white shadow-lg rounded-md p-5">
          <h3 className="text-xl font-semibold py-3">Recent Jobs</h3>
          <ul className="space-y-3">
            {allJobs.slice(0, 5).map((job) => (
              <li
                key={job._id}
                className="flex justify-between items-center p-3 border-b"
              >
                <div className="flex-1">
                  <strong>{job.title}</strong>
                </div>
                <span
                  className={`inline-block px-3 py-1 text-sm font-semibold rounded-full 
              ${
                job.status === "Completed"
                  ? "bg-green-500 text-white"
                  : job.status === "In Progress"
                  ? "bg-blue-500 text-white"
                  : job.status === "Pending"
                  ? "bg-yellow-500 text-black"
                  : "bg-gray-500 text-white"
              }
            `}
                >
                  {job.status}
                </span>
                <div className="ml-2 text-gray-500">
                  {job.taskCompletedDate ? (
                    <div>
                      Completed:{" "}
                      {new Date(job.taskCompletedDate).toLocaleDateString()}
                    </div>
                  ) : job.assignedDate ? (
                    <div>
                      Assigned:{" "}
                      {new Date(job.assignedDate).toLocaleDateString()}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Job Status Distribution */}
        <div className="my-10 bg-white shadow-lg rounded-md p-5">
          <h3 className="text-lg font-medium mb-4">Job Status Distribution</h3>
          <PieChart width={400} height={400}>
            <Pie
              data={chartStatusData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {chartStatusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={statusColors[entry.name]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
          <div className="text-gray-600 mt-4">
            <p>Pending: {jobStatusCounts["pendingTechnicianApproval"] || 0}</p>
            <p>In Progress: {jobStatusCounts["active"] || 0}</p>
            <p>
              Pending Approval: {jobStatusCounts["technicianCompleted"] || 0}
            </p>
            <p>Completed: {jobStatusCounts["jobCompleted"] || 0}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminDashboard;
