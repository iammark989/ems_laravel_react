import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { Users, UserCheck, UserX, DollarSign, Clock } from "lucide-react";
import { dashboardStats, attendanceTrendData, payrollByDepartment, overtimeData, monthlyPayrollCost } from "@/data/mockData";
import { usePage } from "@inertiajs/react";

Chart.register(...registerables);

const StatCard = ({ icon: Icon, label, value, color }: { icon: any; label: string; value: string | number; color: string }) => (
  <div className="bg-card rounded-xl shadow-sm border border-border p-5 flex items-center gap-4">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-2xl font-bold text-card-foreground">{value}</p>
    </div>
  </div>
);

const ChartCard = ({ title, canvasId }: { title: string; canvasId: string }) => (
  <div className="bg-card rounded-xl shadow-sm border border-border p-5">
    <h3 className="text-sm font-semibold text-card-foreground mb-4">{title}</h3>
    <div className="relative h-64">
      <canvas id={canvasId} />
    </div>
  </div>
);

const Dashboard = () => {
  const chartsRef = useRef<Chart[]>([]);
  const { auth } = usePage().props as any;

  useEffect(() => {
     
   
    // Destroy previous charts
    chartsRef.current.forEach((c) => c.destroy());
    chartsRef.current = [];

    const primary = "hsl(213, 80%, 55%)";
    const primaryLight = "hsla(213, 80%, 55%, 0.2)";
    const danger = "hsl(0, 65%, 55%)";
    const dangerLight = "hsla(0, 65%, 55%, 0.2)";
    const colors = ["hsl(213,80%,55%)", "hsl(142,60%,45%)", "hsl(38,92%,50%)", "hsl(200,80%,50%)", "hsl(280,60%,55%)"];

    // Attendance Trend
    const ctx1 = (document.getElementById("attendanceTrend") as HTMLCanvasElement)?.getContext("2d");
    if (ctx1) {
      chartsRef.current.push(new Chart(ctx1, {
        type: "line",
        data: {
          labels: attendanceTrendData.labels,
          datasets: [
            { label: "Present", data: attendanceTrendData.present, borderColor: primary, backgroundColor: primaryLight, fill: true, tension: 0.4 },
            { label: "Absent", data: attendanceTrendData.absent, borderColor: danger, backgroundColor: dangerLight, fill: true, tension: 0.4 },
          ],
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom" } } },
      }));
    }

    // Payroll by Department
    const ctx2 = (document.getElementById("payrollDept") as HTMLCanvasElement)?.getContext("2d");
    if (ctx2) {
      chartsRef.current.push(new Chart(ctx2, {
        type: "bar",
        data: {
          labels: payrollByDepartment.labels,
          datasets: [{ label: "Payroll (₱)", data: payrollByDepartment.amounts, backgroundColor: colors }],
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } },
      }));
    }

    // Overtime
    const ctx3 = (document.getElementById("overtimeChart") as HTMLCanvasElement)?.getContext("2d");
    if (ctx3) {
      chartsRef.current.push(new Chart(ctx3, {
        type: "pie",
        data: {
          labels: overtimeData.labels,
          datasets: [{ data: overtimeData.hours, backgroundColor: colors }],
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom" } } },
      }));
    }

    // Monthly Payroll Cost
    const ctx4 = (document.getElementById("monthlyPayroll") as HTMLCanvasElement)?.getContext("2d");
    if (ctx4) {
      chartsRef.current.push(new Chart(ctx4, {
        type: "bar",
        data: {
          labels: monthlyPayrollCost.labels,
          datasets: [{ label: "Total Cost (₱)", data: monthlyPayrollCost.costs, backgroundColor: primary, borderRadius: 6 }],
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } },
      }));
    }

    return () => { chartsRef.current.forEach((c) => c.destroy()); };
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 mb-8">
        <StatCard icon={Users} label="Total Employees" value={dashboardStats.totalEmployees} color="bg-primary/10 text-primary" />
        <StatCard icon={UserCheck} label="Present Today" value={dashboardStats.presentToday} color="bg-success/10 text-success" />
        <StatCard icon={UserX} label="Absent Today" value={dashboardStats.absentToday} color="bg-destructive/10 text-destructive" />
        <StatCard icon={DollarSign} label="Monthly Payroll" value={`₱${dashboardStats.monthlyPayroll.toLocaleString()}`} color="bg-info/10 text-info" />
        <StatCard icon={Clock} label="Pending Payroll" value={`₱${dashboardStats.pendingPayroll.toLocaleString()}`} color="bg-warning/10 text-warning" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Attendance Trend" canvasId="attendanceTrend" />
        <ChartCard title="Payroll Distribution by Department" canvasId="payrollDept" />
        <ChartCard title="Overtime Summary" canvasId="overtimeChart" />
        <ChartCard title="Monthly Payroll Cost" canvasId="monthlyPayroll" />
      </div>
    </div>
  );
};

export default Dashboard;
