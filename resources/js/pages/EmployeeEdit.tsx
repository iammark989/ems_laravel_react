import React, { useState,useEffect,useRef } from "react";
import { Save } from "lucide-react";
import { router,useForm,usePage } from "@inertiajs/react";
import Swal from "sweetalert2";


const EmployeeEdit = () => {
const { employeeDetails,departments,positions } =  usePage().props as any;
 const { data, setData, put } = useForm({
    employeeID: employeeDetails.employeeID || "",
    email: employeeDetails.email || "",
    status: employeeDetails.status || "",
    first_name: employeeDetails.first_name || "",
    middle_name: employeeDetails.middle_name || "",
    last_name: employeeDetails.last_name || "",
    suffix: employeeDetails.suffix || "",
    address: employeeDetails.address || "",
    position_id: employeeDetails.position_id || "",
    department_id: employeeDetails.department_id || "",
    date_hired: employeeDetails.date_hired || "",
    daily_rate: employeeDetails.daily_rate || "",
    allowance: employeeDetails.allowance || "",
    leave_bal_VL: employeeDetails.leave_bal_VL || "",
    leave_bal_SIL: employeeDetails.leave_bal_SIL || "",
    sss: employeeDetails.sss || "",
    pagibig: employeeDetails.pagibig || "",
    philhealth: employeeDetails.philhealth || "",
    tin: employeeDetails.tin || "", 
    images: null as File | null, 
  });

  const [form, setForm] = useState({
   
  });
    // for modals
        const [isRFIDModalOpen, setRFIDModalOpen] = useState(false);
        useEffect(() => {
          const keepFocus = () => rfidInputRef.current?.focus();
          window.addEventListener("click", keepFocus);

          return () => window.removeEventListener("click", keepFocus);
        }, []);

        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          handleRFIDScan(e as any);
        }
      };

        const [isFingerprintModalOpen, setFingerprintModalOpen] = useState(false);
        const rfidInputRef = useRef<HTMLInputElement>(null);
        const [rfidStatus, setRfidStatus] = useState<string | null>(null);
        const [isProcessing, setIsProcessing] = useState(false);
        useEffect(() => {
      if (isRFIDModalOpen) {
        setTimeout(() => {
          rfidInputRef.current?.focus();
        }, 100);
      }
      }, [isRFIDModalOpen]);           
              
          const handleRFIDScan = (e: React.ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value.trim();

          if (!value) return;

          setIsProcessing(true);
          setRfidStatus(null);

          router.post(
            "/rfid/register", // your backend route
            {
              rfid: value,
              employeeID: data.employeeID,
            },
            {
              onSuccess: (page: any) => {

                if (page.props.flash.success) {setRfidStatus("✅ RFID registered successfully");
                              setTimeout(() => {
                  setRFIDModalOpen(false);
                }, 2000);
              }
              },
              onError: (errors) => {
                setRfidStatus("❌ RFID already in use or invalid");
              },
              onFinish: () => {
                setIsProcessing(false);

                // clear + refocus for next scan
                if (rfidInputRef.current) {
                  rfidInputRef.current.value = "";
                  rfidInputRef.current.focus();
                }
              },
            }
          );
        };


  type PageProps = {
    flash: {
      success?: string;
      message?: string;
    };
  };
    const { flash } = usePage<PageProps>().props;
  
  //useEffect(() => {
 //   if (flash.success) {
 //     Swal.fire({
 //   icon: "success",
 //   title: "RFID Saved",
 //   text: flash.message,
 //   timer: 2000,
 //   showConfirmButton: false,
//  });
 //   }
  
//    if (!flash.success) {
  //    Swal.fire({
  ///  icon: "error",
 //   title: "Update Error",
 //   text: flash.message,
 //   timer: 2000,
//    showConfirmButton: false,
//  });
//    }
//  }, [flash]);

  const [preview, setPreview] = useState<string | null>(`/images/${employeeDetails.images}`);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type, value, checked } = e.target as HTMLInputElement;
    setData({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setData({ ...data, images: file });

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const govFields: (keyof typeof data)[] = [
  "sss",
  "pagibig",
  "philhealth",
  "tin",
];

const employmentFields = [
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
    
      router.post("/employees/savechanges", data, {
        forceFormData: true,
        onFinish: () => setIsLoading(false),
        onError: (errors) => {
          console.error(errors);
        },
        onSuccess: () => {
          //console.log("Employee details update successfully");
        },
      });
    
  };

  return (
    <div className="min-h-screen bg-blue-50/40 p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Employee Details Update
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
                name="images"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Employee ID
                </label>
                <input
                  name="employeeID"
                  value={data.employeeID}
                  onChange={(e) => setData("employeeID", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-800 
focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition shadow-sm"
                maxLength={3} disabled/>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                disabled
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={(e) => setData("email", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-800 
focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition shadow-sm"
                />
              </div>

              <div className="flex items-center gap-2 mt-6">
                <input
                  type="checkbox"
                  name="status"
                  checked={data.status}
                  onChange={(e) => setData("status", e.target.checked)}
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
        First Name
      </label>
      <input
        name="first_name"
        value={data.first_name}
        onChange={(e) => setData("first_name", e.target.value)}
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
        value={data.middle_name}
        onChange={(e) => setData("middle_name", e.target.value)}
        className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-800 
focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition shadow-sm"
      />
    </div>

    <div>
      <label className="text-sm font-medium text-gray-700">
        Last Name
      </label>
      <input
        name="last_name"
        value={data.last_name}
        onChange={(e) => setData("last_name", e.target.value)}
        className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-800 
focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition shadow-sm"
      />
    </div>

    <div>
      <label className="text-sm font-medium text-gray-700">
        Suffix
      </label>
      <input
        name="suffix"
        value={data.suffix}
        onChange={(e) => setData("suffix", e.target.value)}
        className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-800 
focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition shadow-sm"
      />
    </div>
  </div>

  {/* Address Field */}
  <div className="mt-4">
    <label className="text-sm font-medium text-gray-700">
      Address
    </label>
    <input
      name="address"
      value={data.address}
      onChange={(e) => setData("address", e.target.value)}
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
                  value={data.department_id}
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
              value={data.position_id}
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
                     {name.replace(/_/g, " ")}
                  </label>
                                    <input
                              type={type}
                              step={step}
                              name={name}
                              value={data[name]}
                              onChange={(e) =>
                                setData(
                                  name,
                                  type === "number" ? Number(e.target.value) : e.target.value
                                )
                              }
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
              {govFields.map((field) => (
                <div key={field}>
                  <label className="text-sm font-medium text-gray-700 uppercase">
                    {field}
                  </label>
                  <input
                    key={field}
                    name={field}
                    value={data[field]}
                    onChange={(e) => setData(field, e.target.value)}
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
            Save
          </button>
          
        </form>
            {/* Buttons */}
      <div className="flex gap-4 mb-6 mt-5">
        <button
          onClick={() => setRFIDModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Register RFID
        </button>
        <button
          onClick={() => setFingerprintModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Register Fingerprint
        </button>
      </div>
      </div>
       {/* RFID Modal */}
              {isRFIDModalOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md text-center">
              
              <h2 className="text-lg font-semibold mb-2">
                Scan RFID Card
              </h2>

              <p className="text-gray-500 mb-4">
                Please tap the RFID card on the scanner...
              </p>

              {/* Hidden Input */}
              <input
                ref={rfidInputRef}
                type="text"
                onKeyDown={handleKeyDown}
                className="opacity-0 absolute"
                autoFocus
              />

              {/* Loading */}
              {isProcessing && (
                <p className="text-blue-500 animate-pulse">
                  Processing...
                </p>
              )}

              {/* Result Message */}
              {rfidStatus && (
                <p className="mt-3 font-medium">
                  {rfidStatus}
                </p>
              )}

              {/* Close Button */}
              <button
                onClick={() => setRFIDModalOpen(false)}
                className="mt-6 px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        )}

      {/* Fingerprint Modal */}
      {isFingerprintModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
            <h2 className="text-lg font-semibold mb-4">Register Fingerprint</h2>
            <p className="mb-4 text-gray-600">
              Place finger on scanner or enter fingerprint ID
            </p>
            <input
              type="text"
              placeholder="Fingerprint ID"
              className="w-full border rounded-lg p-2 mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setFingerprintModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

      


  );

 
};

export default EmployeeEdit;