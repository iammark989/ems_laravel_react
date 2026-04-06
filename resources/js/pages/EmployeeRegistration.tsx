import { useState,useEffect  } from "react";
import { Save } from "lucide-react";
import { router, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";

const EmployeeRegistration = () => {
  const { departments, positions } = usePage().props as any; 
  const [form, setForm] = useState({
    employeeID: "",
    email: "",
    status: true,
    first_name: "",
    middle_name: "",
    last_name: "",
    suffix: "",
    address: "",
    position_id: "",
    department_id: "",
    date_hired: "",
    daily_rate: null as number | null,
    allowance: null as number | null,
    leave_bal_VL: null as number | null,
    leave_bal_SIL: null as number | null,
    sss: "",
    pagibig: "",
    philhealth: "",
    tin: "",
    images: null as File | null,
  });
  
  



type PageProps = {
  flash: {
    success?: string;
    error?: string;
  };
};
  const { flash } = usePage<PageProps>().props;

useEffect(() => {
  if (flash.success) {
    Swal.fire({
  icon: "success",
  title: "Employee Registered",
  text: flash.success,
  timer: 2000,
  showConfirmButton: false,
});
  }

  if (flash.error) {
    Swal.fire({
  icon: "error",
  title: "Registration Error",
  text: flash.error,
  timer: 2000,
  showConfirmButton: false,
});
  }
}, [flash]);

  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, type, value, checked } = e.target as HTMLInputElement;

  setForm((prev) => ({
    ...prev,
    [name]:
      type === "checkbox"
        ? checked
        : type === "number"
        ? value === "" ? null : Number(value)
        : value,
  }));
};

      const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (!file) return;

      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Only image files are allowed.");
        e.target.value = "";
        return;
      }

      // Validate file size (2MB limit)
      if (file.size > 2 * 1024 * 1024) {
        alert("Image must be less than 2MB.");
        e.target.value = "";
        return;
      }

      setForm((prev) => ({
        ...prev,
        images: file,
      }));

      // Clean previous preview if exists
      if (preview) {
        URL.revokeObjectURL(preview);
      }

      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    };

          useEffect(() => {
        return () => {
          if (preview) {
            URL.revokeObjectURL(preview);
          }
        };
      }, [preview]);

      type EmploymentField = {
  name: keyof typeof form;
  type: "text" | "number" | "date";
  step?: string;
};
  const employmentFields: EmploymentField[] = [
  { name: "date_hired", type: "date" },
  { name: "daily_rate", type: "number", step: "0.01" },
  { name: "allowance", type: "number", step: "0.01" },
  { name: "leave_bal_VL", type: "number", step: "0.01" },
  { name: "leave_bal_SIL", type: "number", step: "0.01" },
] as const;

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  router.post("/register", form, {
    forceFormData: true,
    onFinish: () => setIsLoading(false),
    onError: (errors) => {
      console.error(errors);
    },
    onSuccess: () => {
      console.log("Employee registered successfully");
    },
  });
};

  return (
    <div className="min-h-screen bg-blue-50/40 p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Employee Registration
      </h1>

      <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-8 max-w-5xl">
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Profile Section */}
          <div className="flex items-center gap-6">
            <div>
              <div className="w-24 h-24 rounded-full bg-gray-100 border overflow-hidden">
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2 text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Employee ID 
                </label>
                <input
                  name="employeeID"
                  value={form.employeeID}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-800 
focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition shadow-sm"
                maxLength={3}/>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-800 
focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition shadow-sm"
                />
              </div>

              <div className="flex items-center gap-2 mt-6">
                <input
                  type="checkbox"
                  name="status"
                  checked={form.status}
                  onChange={handleChange}
                />
                <label className="text-sm text-gray-700">
                  Active Status
                </label>
              </div>
            </div>
          </div>

          {/* Personal Info */}
<div>
  <h2 className="text-lg font-semibold text-blue-700 mb-4">
    Personal Information
  </h2>

  {/* Name Fields */}
  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
    <div>
      <label className="text-sm font-medium text-gray-700">
        First Name <span className="text-red-500">*</span>
      </label>
      <input
        name="first_name"
        value={form.first_name}
        onChange={handleChange}
        className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-800 
focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition shadow-sm"
      />
    </div>

    <div>
      <label className="text-sm font-medium text-gray-700">
        Middle Name
      </label>
      <input
        name="middle_name"
        value={form.middle_name}
        onChange={handleChange}
        className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-800 
focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition shadow-sm"
      />
    </div>

    <div>
      <label className="text-sm font-medium text-gray-700">
        Last Name <span className="text-red-500">*</span>
      </label>
      <input
        name="last_name"
        value={form.last_name}
        onChange={handleChange}
        className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-800 
focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition shadow-sm"
      />
    </div>

    <div>
      <label className="text-sm font-medium text-gray-700">
        Suffix
      </label>
      <select
    name="suffix"
    value={form.suffix}
    onChange={handleChange}
        className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-800 
focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition shadow-sm"
      >
    <option value="">N/A</option>
    <option value="Sr">Sr</option>
    <option value="Jr">Jr</option>
    <option value="III">III</option>
  </select>
    </div>
  </div>

  {/* Address Field */}
  <div className="mt-4">
    <label className="text-sm font-medium text-gray-700">
      Address <span className="text-red-500">*</span>
    </label>
    <input
      name="address"
      value={form.address}
      onChange={handleChange}
      className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-800 
focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition shadow-sm"
    />
  </div>
</div>

          {/* Employment Details */}
          <div>
            <h2 className="text-lg font-semibold text-blue-700 mb-4">
              Employment Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <div>
        <label className="text-sm font-medium text-gray-700">
        Department <span className="text-red-500">*</span>
      </label>
      <select
          name="department_id"
          value={form.department_id}
          onChange={handleChange}
          required
          className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-800 
          focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition shadow-sm"
        >
          <option value="">-- Select Department --</option>
          {departments.map((dept: any) => (
            <option key={dept.id} value={dept.id}>
              {dept.department}
            </option>
          ))}
        </select>
    </div>

          <div>
        <label className="text-sm font-medium text-gray-700">
        Position <span className="text-red-500">*</span>
      </label>
      <select
          name="position_id"
          value={form.position_id}
          onChange={handleChange}
          required
          className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-800 
          focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition shadow-sm"
        >
          <option value="">-- Select Position --</option>
          {positions.map((pos: any) => (
            <option key={pos.id} value={pos.id}>
              {pos.position}
            </option>
          ))}
        </select>
       </div>

                          {employmentFields.map(({ name, type, step }) => (
                <div key={name}>
                  <label className="text-sm font-medium text-gray-700 capitalize">
                    {name.replace(/_/g, " ")} <span className="text-red-500">*</span>
                  </label>

                  <input
                  type={type}
                  step={step}
                  name={name}
                  value={String(form[name] ?? "")}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-800 
                  focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition shadow-sm"
                />
                </div>
              ))}
            </div>
          </div>

          {/* Government Details */}
          <div>
            <h2 className="text-lg font-semibold text-blue-700 mb-4">
              Government Numbers
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            
              {["sss", "pagibig", "philhealth", "tin"].map((field) => (
                <div key={field}>
                  <label className="text-sm font-medium text-gray-700 uppercase">
                    {field} <span className="text-red-500">*</span>
                  </label>
                  <input
                    name={field}
                    value={(form as any)[field]}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-800 
focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition shadow-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-600 transition"
          >
            <Save className="w-4 h-4" />
            Register Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeRegistration;