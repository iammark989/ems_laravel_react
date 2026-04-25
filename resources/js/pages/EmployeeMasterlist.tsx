import { useState,useEffect  } from "react";
//import { employees, Employee } from "@/data/mockData";
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";
import { usePage,router } from "@inertiajs/react";
import Swal from "sweetalert2";


const EmployeeMasterlist = () => {
  const [search, setSearch] = useState("");
  //const [data] = useState<Employee[]>(employees);
    const { employees } =  usePage().props as any;

  //const filtered = data.filter((e) =>
  //  `${e.firstName} ${e.lastName} ${e.employeeId} ${e.department}`.toLowerCase().includes(search.toLowerCase())
 // );
   
 // sweetalert
 type PageProps = {
  flash: {
    success?: string;
    error?: string;
  };
};
 const { flash } = usePage<PageProps>().props;

  useEffect(() => {
    if (flash?.success) {
      Swal.fire({
        icon: "success",
        title: flash.success,
      // text: flash.success,
        timer: 2000,
        showConfirmButton: false,
      });
    }
    

    if (flash?.error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: flash.error,
      });
    }
  }, [flash]);



  const goToRegister = () => {
  router.visit("/employees/register");
  };
  const employeeEdit = (employeeID: string) => {
  router.visit(`/employees/${employeeID}/edit`);
  };
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-foreground">Employee Masterlist</h1>
        <button onClick={goToRegister} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" /> Add Employee
        </button>
      </div>

      {/* Search 
      <div className="relative mb-4 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search employees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-card text-card-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
*/}
     



      {/* Table */}
      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground">ID</th>
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Name</th>
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground hidden md:table-cell">Department</th>
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground hidden lg:table-cell">Position</th>
                <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Status</th>
                <th className="text-center px-4 py-3 font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp: any) => (
                <tr key={emp.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium">{emp.employeeID}</td>
                  
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3"><img src={`/images/${emp.images}`} alt={`${emp.first_name} ${emp.last_name}`} onError={(e) => (e.currentTarget.src = "/images/fallback-image.jpg")} className="w-10 h-10 rounded-full object-cover border"/> {emp.first_name} {emp.last_name} {emp.suffix}</div></td>
                  <td className="px-4 py-3 hidden md:table-cell">{emp.department?.department}</td>
                  <td className="px-4 py-3 hidden lg:table-cell">{emp.position?.position}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      emp.status == "1" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"
                    }`}>
                      { emp.status == "1" ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <button className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors"><Eye className="w-4 h-4" /></button>
                      <button onClick={ () => employeeEdit(emp.employeeID) } className="p-2 rounded-lg hover:bg-warning/10 text-warning transition-colors cursor-pointer"><Edit className="w-4 h-4" /></button>
                      <button className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeMasterlist;
