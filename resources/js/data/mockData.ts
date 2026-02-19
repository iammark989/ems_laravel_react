// Mock data for HR Dashboard

export interface Employee {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
  dateHired: string;
  status: "Active" | "Inactive";
  salary: number;
  avatar?: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  timeIn: string;
  timeOut: string;
  status: "IN" | "OUT" | "Late" | "Absent";
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  basicSalary: number;
  overtime: number;
  deductions: number;
  netPay: number;
  cutoff: string;
  month: string;
  year: number;
  status: "Processed" | "Pending" | "Paid";
}

export const employees: Employee[] = [
  { id: "1", employeeId: "EMP-001", firstName: "Juan", lastName: "Dela Cruz", email: "juan@company.com", department: "Engineering", position: "Senior Developer", dateHired: "2021-03-15", status: "Active", salary: 45000 },
  { id: "2", employeeId: "EMP-002", firstName: "Maria", lastName: "Santos", email: "maria@company.com", department: "HR", position: "HR Manager", dateHired: "2020-01-10", status: "Active", salary: 50000 },
  { id: "3", employeeId: "EMP-003", firstName: "Pedro", lastName: "Reyes", email: "pedro@company.com", department: "Finance", position: "Accountant", dateHired: "2022-06-20", status: "Active", salary: 38000 },
  { id: "4", employeeId: "EMP-004", firstName: "Ana", lastName: "Garcia", email: "ana@company.com", department: "Marketing", position: "Marketing Lead", dateHired: "2021-09-01", status: "Active", salary: 42000 },
  { id: "5", employeeId: "EMP-005", firstName: "Carlos", lastName: "Lopez", email: "carlos@company.com", department: "Engineering", position: "Junior Developer", dateHired: "2023-01-15", status: "Active", salary: 30000 },
  { id: "6", employeeId: "EMP-006", firstName: "Rosa", lastName: "Mendoza", email: "rosa@company.com", department: "Operations", position: "Operations Manager", dateHired: "2019-11-05", status: "Active", salary: 48000 },
  { id: "7", employeeId: "EMP-007", firstName: "Luis", lastName: "Torres", email: "luis@company.com", department: "Finance", position: "Finance Analyst", dateHired: "2022-03-22", status: "Inactive", salary: 35000 },
  { id: "8", employeeId: "EMP-008", firstName: "Elena", lastName: "Ramos", email: "elena@company.com", department: "Engineering", position: "QA Engineer", dateHired: "2023-05-10", status: "Active", salary: 33000 },
];

export const attendanceRecords: AttendanceRecord[] = [
  { id: "1", employeeId: "EMP-001", employeeName: "Juan Dela Cruz", date: "2024-01-15", timeIn: "08:00", timeOut: "17:00", status: "IN" },
  { id: "2", employeeId: "EMP-002", employeeName: "Maria Santos", date: "2024-01-15", timeIn: "08:15", timeOut: "17:30", status: "Late" },
  { id: "3", employeeId: "EMP-003", employeeName: "Pedro Reyes", date: "2024-01-15", timeIn: "07:55", timeOut: "17:00", status: "IN" },
  { id: "4", employeeId: "EMP-004", employeeName: "Ana Garcia", date: "2024-01-15", timeIn: "", timeOut: "", status: "Absent" },
  { id: "5", employeeId: "EMP-005", employeeName: "Carlos Lopez", date: "2024-01-15", timeIn: "08:00", timeOut: "17:00", status: "IN" },
  { id: "6", employeeId: "EMP-006", employeeName: "Rosa Mendoza", date: "2024-01-15", timeIn: "08:05", timeOut: "18:00", status: "IN" },
  { id: "7", employeeId: "EMP-001", employeeName: "Juan Dela Cruz", date: "2024-01-16", timeIn: "08:00", timeOut: "17:00", status: "IN" },
  { id: "8", employeeId: "EMP-002", employeeName: "Maria Santos", date: "2024-01-16", timeIn: "08:00", timeOut: "17:00", status: "IN" },
];

export const payrollRecords: PayrollRecord[] = [
  { id: "1", employeeId: "EMP-001", employeeName: "Juan Dela Cruz", department: "Engineering", basicSalary: 45000, overtime: 5000, deductions: 3500, netPay: 46500, cutoff: "Jan 1-15", month: "January", year: 2024, status: "Paid" },
  { id: "2", employeeId: "EMP-002", employeeName: "Maria Santos", department: "HR", basicSalary: 50000, overtime: 2000, deductions: 4000, netPay: 48000, cutoff: "Jan 1-15", month: "January", year: 2024, status: "Paid" },
  { id: "3", employeeId: "EMP-003", employeeName: "Pedro Reyes", department: "Finance", basicSalary: 38000, overtime: 3000, deductions: 2800, netPay: 38200, cutoff: "Jan 1-15", month: "January", year: 2024, status: "Processed" },
  { id: "4", employeeId: "EMP-004", employeeName: "Ana Garcia", department: "Marketing", basicSalary: 42000, overtime: 0, deductions: 3200, netPay: 38800, cutoff: "Jan 1-15", month: "January", year: 2024, status: "Pending" },
  { id: "5", employeeId: "EMP-005", employeeName: "Carlos Lopez", department: "Engineering", basicSalary: 30000, overtime: 4000, deductions: 2200, netPay: 31800, cutoff: "Jan 1-15", month: "January", year: 2024, status: "Paid" },
  { id: "6", employeeId: "EMP-006", employeeName: "Rosa Mendoza", department: "Operations", basicSalary: 48000, overtime: 1500, deductions: 3800, netPay: 45700, cutoff: "Jan 16-31", month: "January", year: 2024, status: "Pending" },
];

export const dashboardStats = {
  totalEmployees: 8,
  presentToday: 6,
  absentToday: 2,
  monthlyPayroll: 249000,
  pendingPayroll: 84500,
};

export const attendanceTrendData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  present: [7, 8, 6, 8, 7, 3],
  absent: [1, 0, 2, 0, 1, 5],
};

export const payrollByDepartment = {
  labels: ["Engineering", "HR", "Finance", "Marketing", "Operations"],
  amounts: [108000, 50000, 73200, 38800, 45700],
};

export const overtimeData = {
  labels: ["Engineering", "HR", "Finance", "Marketing", "Operations"],
  hours: [9000, 2000, 3000, 0, 1500],
};

export const monthlyPayrollCost = {
  labels: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
  costs: [230000, 235000, 240000, 242000, 245000, 249000],
};
