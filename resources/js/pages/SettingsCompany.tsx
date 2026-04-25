import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { router, useForm, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";

const CompanySettings = () => {
  const { flash,settings,errors } = usePage().props as any;

  const { data, setData } = useForm({
    logo: null as File | null,
    company_name: settings.company_name || "",
    trade_name: settings.trade_name || "",
    email: settings.email || "",
    contact_number: settings.contact_number || "",
    address1: settings.address1 || "",
    address2: settings.address2 || "",
    city: settings.city || "",
    province: settings.province || "",
    zip_code: settings.zip_code || "",
    country: settings.country || "",
    tin: settings.tin || "",
    rdo: settings.rdo || "",
    sss: settings.sss || "",
    philhealth: settings.philhealth || "",
    pagibig: settings.pagibig || "",
    business_reg_no: settings.business_reg_no || "",
    vat_registered: settings.vat_registered || "1",
    tax_type: settings.tax_type || "1",
  });

  const [preview, setPreview] = useState<string | null>(`/images/${settings.logo}`);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (flash?.success) {
      Swal.fire({
        icon: "success",
        title: "Settings Saved",
        text: flash.success,
        timer: 2000,
        showConfirmButton: false,
      });
    }

    if (flash?.error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: flash.error,
        timer: 2000,
        showConfirmButton: false,
      });
    }
  }, [flash]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setData("logo", file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    router.post("/settings/save", data, {
      forceFormData: true,
      onFinish: () => setIsLoading(false),
              onError: (errors) => {
          console.error(errors);
           },
        onSuccess: () => {
          console.log("Employee details update successfully");
        },
    });
  };

  return (
    <div className="min-h-screen bg-blue-50/40 p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
        Company Settings
      </h1>

      <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-4 sm:p-8 max-w-6xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Logo + Basic Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex flex-col items-center sm:items-start">
              <div className="w-24 h-24 rounded-xl bg-gray-100 border overflow-hidden flex items-center justify-center">
                {preview ? (
                  <img src={preview} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs text-gray-400">Logo</span>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2 text-sm text-center sm:text-left"
              />
              {errors.logo && (
          <div className="text-red-500 text-sm mt-1">
            {errors.logo}
          </div>
        )}
            </div>
            

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 w-full">
             
              
            
                <div>
                <label className="text-sm font-medium text-gray-700">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="company_name"
                  value={data.company_name}
                  onChange={(e) => setData("company_name", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-800 
                    :outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition shadow-sm" 
                  maxLength={50} required/>
                </div>

                <div>
                <label className="text-sm font-medium text-gray-700">
                  Trade Name 
                </label>
                <input
                  name="trade_name"
                  value={data.trade_name}
                  onChange={(e) => setData("trade_name", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-800 
                    :outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition shadow-sm" 
                  maxLength={50}/>
                </div>

                <div>
                <label className="text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  name="email"
                  value={data.email}
                  onChange={(e) => setData("email", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-800 
                    :outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition shadow-sm" 
                  maxLength={50} required/>
                </div>

                <div>
                <label className="text-sm font-medium text-gray-700">
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <input
                  name="contact_number"
                  value={data.contact_number}
                  onChange={(e) => setData("contact_number", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-800 
                    :outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition shadow-sm"
                  maxLength={11} required/>
                </div>       

            </div>
          </div>

          {/* Address */}
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-blue-700 mb-4">
              Address Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Address Line 1 <span className="text-red-500">*</span>
                </label>
                <input
                  name="address1"
                  value={data.address1}
                  onChange={(e) => setData("address1", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-800 
                    :outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition shadow-sm"
                  maxLength={100} required/>
                </div>       
              
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Address Line 2
                </label>
                <input
                  name="address2"
                  value={data.address2}
                  onChange={(e) => setData("address2", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-800 
                    :outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition shadow-sm"
                  maxLength={100} />
                </div>  

              <div>
                <label className="text-sm font-medium text-gray-700">
                  City / Municipality <span className="text-red-500">*</span>
                </label>
                <input
                  name="city"
                  value={data.city}
                  onChange={(e) => setData("city", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-800 
                    :outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition shadow-sm"
                  maxLength={30} required/>
              </div>    
              
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Provice <span className="text-red-500">*</span>
                </label>
                <input
                  name="province"
                  value={data.province}
                  onChange={(e) => setData("province", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-800 
                    :outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition shadow-sm"
                  maxLength={30} required/>
                </div>  

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Zip Code <span className="text-red-500">*</span>
                </label>
                <input
                  name="zip_code"
                  value={data.zip_code}
                  onChange={(e) => setData("zip_code", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-800 
                    :outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition shadow-sm"
                  maxLength={15} required/>
                </div>  
              
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Country <span className="text-red-500">*</span>
                </label>
                <input
                  name="country"
                  value={data.country}
                  onChange={(e) => setData("country", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-800 
                    :outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition shadow-sm"
                  maxLength={50} required/>
                </div>  
              
            </div>
          </div>

          {/* Government */}
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-blue-700 mb-4">
              Government Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

              <div>
                <label className="text-sm font-medium text-gray-700">
                  TIN Number <span className="text-red-500">*</span>
                </label>
                <input
                  name="tin"
                  value={data.tin}
                  onChange={(e) => setData("tin", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-800 
                    :outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition shadow-sm"
                  maxLength={25} required/>
                </div>  

                <div>
                <label className="text-sm font-medium text-gray-700">
                  RDO Code <span className="text-red-500">*</span>
                </label>
                <input
                  name="rdo"
                  value={data.rdo}
                  onChange={(e) => setData("rdo", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-800 
                    :outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition shadow-sm"
                  maxLength={25} required/>
                </div>
                
                <div>
                <label className="text-sm font-medium text-gray-700">
                  SSS Number <span className="text-red-500">*</span>
                </label>
                <input
                  name="sss"
                  value={data.sss}
                  onChange={(e) => setData("sss", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-800 
                    :outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition shadow-sm"
                  maxLength={25} required/>
                </div>

                <div>
                <label className="text-sm font-medium text-gray-700">
                  PhilHealth Number <span className="text-red-500">*</span>
                </label>
                <input
                  name="philhealth"
                  value={data.philhealth}
                  onChange={(e) => setData("philhealth", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-800 
                    :outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition shadow-sm"
                  maxLength={25} required/>
                </div>

                <div>
                <label className="text-sm font-medium text-gray-700">
                  Pag-IBIG Number <span className="text-red-500">*</span>
                </label>
                <input
                  name="pagibig"
                  value={data.pagibig}
                  onChange={(e) => setData("pagibig", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-800 
                    :outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition shadow-sm"
                  maxLength={25} required/>
                </div>

                <div>
                <label className="text-sm font-medium text-gray-700">
                  Business Reg. No. <span className="text-red-500">*</span>
                </label>
                <input
                  name="business_reg_no"
                  value={data.business_reg_no}
                  onChange={(e) => setData("business_reg_no", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-800 
                    :outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition shadow-sm"
                  maxLength={30} required/>
                </div>        
              
            </div>
          </div>

          {/* Tax */}
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-blue-700 mb-4">
              Tax Settings
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">VAT Registered</label>
                <select
                  name="vat_registered"
                  value={data.vat_registered}
                  onChange={(e) => setData("vat_registered", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm focus:ring-2 focus:ring-blue-300"
                >
                  <option value="1">Yes</option>
                  <option value="2">No</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Tax Type</label>
                <select
                  name="tax_type"
                  value={data.tax_type}
                  onChange={(e) => setData("tax_type", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm focus:ring-2 focus:ring-blue-300"
                >
                  <option value="1">VAT</option>
                  <option value="2">Non-VAT</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-blue-600 transition"
            >
              <Save className="w-4 h-4" />
              {isLoading ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySettings;
{/**
function Input({ label, value, onChange }: any) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-800 
focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition shadow-sm"
      />
    </div>
  );
}
**/}