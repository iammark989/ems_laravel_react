import React, { useState } from "react";
import { router, usePage } from "@inertiajs/react";

// must be installed composer require maatwebsite/excel


type Attendance = {
  employeeID: string;
  name: string;
  date: string;
  timeIn: string;
  timeOut: string;
  remarks: string;
};

type PageProps = {
  attendance?: Attendance[];
  filters?: {
    dateFrom?: string;
    dateTo?: string;
  };
};

export default function EmployeeViewAttendance() {
  const { props } = usePage<PageProps>();

  const attendance = props.attendance ?? [];

  const [dateFrom, setDateFrom] = useState(props.filters?.dateFrom || "");
  const [dateTo, setDateTo] = useState(props.filters?.dateTo || "");
  const [loading, setLoading] = useState(false);

  const handleView = () => {
    if (!dateFrom || !dateTo) return;

    setLoading(true);

    router.get(
      "/employees/attendance/view",
      { dateFrom, dateTo },
      {
        preserveState: true,
        replace: true,
        onFinish: () => setLoading(false),
      }
    );
  };

  const handleExport = () => {
    if (!dateFrom || !dateTo) return;

    // Redirect to Laravel export route 
    window.location.href = `/employees/attendance/export?dateFrom=${dateFrom}&dateTo=${dateTo}`;
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-semibold mb-4">View Attendance</h1>

      <div className="bg-white shadow rounded-2xl p-4">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="text-sm">Date From</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="text-sm">Date To</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={handleView}
              className="w-full bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-700"
            >
              View
            </button>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleExport}
              className="w-full bg-green-600 text-white rounded-lg p-2 hover:bg-green-700"
            >
              Export Excel
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-gray-50 rounded-2xl p-4">
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin h-10 w-10 border-b-2 border-blue-600 rounded-full"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="p-2">Employee ID</th>
                    <th className="p-2">Name</th>
                    <th className="p-2">Date</th>
                    <th className="p-2">Time In</th>
                    <th className="p-2">Time Out</th>
                    <th className="p-2">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.length > 0 ? (
                    attendance.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2">{item.employeeID}</td>
                        <td className="p-2">{item.name}</td>
                        <td className="p-2">{item.date}</td>
                        <td className="p-2">{item.timeIn}</td>
                        <td className="p-2">{item.timeOut}</td>
                        <td className="p-2">{item.remarks}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center p-4 text-gray-500">
                        No data found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}