import React, { useRef, useState,useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { usePage, router, useForm } from "@inertiajs/react";

type PayslipData = {
  employeeID: string;
  name: string;
  position: string;
  cutoff: string;

  basicPay: number;
  allowance: number;
  adjustment: number;
  commission: number;
  overtime: number;
  leave: number;
  holiday1: number;
  holiday2: number;
  holiday3: number;

  sss: number;
  philhealth: number;
  pagibig: number;
  sssLoan: number;
  pagibigLoan: number;
  late: number;
  undertime: number;
  cashAdvance: number;
  otherDeductions: number;

  totalPayment: number;
  totalDeductions: number;
  netPay: number;
};

const PayslipViewer: React.FC = () => {
    const { payrollDetails,auth,company } = usePage().props as any;
    const [isLoading, setIsLoading] = useState(false);
    const[view,setView] = useState("");
  

   useEffect(() => {
  if (payrollDetails) {
    setData((prev) => ({
      ...prev, // ✅ KEEP existing values (month, year, cutoff)

      name: payrollDetails.name,
      employeeID: payrollDetails.employeeID,
      position: payrollDetails.position,
      cutoff: payrollDetails.cutoff,

      basicPay: payrollDetails.total_basic_salary,
      allowance: payrollDetails.allowance,
      adjustment: payrollDetails.adjustment,
      commission: payrollDetails.commission,
      overtime: payrollDetails.ot_pay,
      leave: payrollDetails.total_used_leave,
      holiday1: payrollDetails.holiday1,
      holiday2: payrollDetails.holiday2,
      holiday3: payrollDetails.holiday3,

      sss: payrollDetails.sss,
      philhealth: payrollDetails.philhealth,
      pagibig: payrollDetails.pagibig,
      sssLoan: payrollDetails.sss_loan,
      pagibigLoan: payrollDetails.hdmf_loan,
      late: payrollDetails.late_deduction,
      undertime: payrollDetails.ut_deduction,
      cashAdvance: payrollDetails.cash_advance,
      otherDeductions: payrollDetails.other_deduction,

      totalPayment: payrollDetails.total_salary,
      totalDeductions: payrollDetails.total_deductions,
      netPay: payrollDetails.net_pay,
    }));
  }
}, [payrollDetails]);


  const { data, setData } = useForm({
      month: "",
      year: "",
      cutoff:"",
    
      employeeID:  "",
      name: "",
      position: "", 
      
      basicPay: "0",
      allowance: "0",
      adjustment: "0",
      commission: "0",
      overtime: "0",
      leave: "0",
      holiday1: "0",
      holiday2: "0",
      holiday3: "0",

      sss: "0",
      philhealth: "0",
      pagibig: "0",
      sssLoan: "0",
      pagibigLoan: "0",
      late: "0",
      undertime: "0",
      cashAdvance: "0",
      otherDeductions: "0",

      totalPayment: "0",
      totalDeductions: "0",
      netPay: "0",
  });



  const payslipRef = useRef<HTMLDivElement>(null);


    const handleView = (e: React.FormEvent) => {
   
      e.preventDefault();
    setIsLoading(true);
    router.get("/viewpayslip", {
  month: data.month,
  year: data.year,
  cutoff: data.cutoff,
}, {
  preserveState: true,
  replace: true,
});
};

  const generatePDF = async () => {
    if (!payslipRef.current) return;

    const canvas = await html2canvas(payslipRef.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save("payslip.pdf");
  };

  const Input = ({ value }: { value: string | number }) => (
    <input
      value={value}
      readOnly
      className="border p-1 w-full bg-gray-100"
    />
  );

  const handlePrint = () => {
  window.print();
};

  return (
    <div className="p-6 max-w-5xl mx-auto">

      {/* FILTER */}
      <div className="border p-4 mb-4 shadow rounded">
        <div className="grid grid-cols-4 gap-3">
          
            <select name='month' value={data.month} onChange={(e) => setData('month',e.target.value)} className="border p-2">
            <option value="">-- Select Month --</option>
            <option value="JANUARY">JANUARY</option>
            <option value="FEBRUARY">FEBRUARY</option>
            <option value="MARCH">MARCH</option>
            <option value="APRIL">APRIL</option>
            <option value="MAY">MAY</option>
            <option value="JUNE">JUNE</option>
            <option value="JULY">JULY</option>
            <option value="AUGUST">AUGUST</option>
            <option value="SEPTEMBER">SEPTEMBER</option>
            <option value="OCTOBER">OCTOBER</option>
            <option value="NOVEMBER">NOVEMBER</option>
            <option value="DECEMBER">DECEMBER</option>
            </select>
          
            <select name='year' value={data.year} onChange={(e) => setData('year',e.target.value)} className="border p-2">
            <option value="">-- Select Year --</option>
            <option value="2026">2026</option>
            </select>
         
  
          <select name='cutoff' value={data.cutoff} onChange={(e) => setData('cutoff',e.target.value)} className="border p-2">
            <option value="">Cutoff</option>
            <option value="1">1 - 15</option>
            <option value="2">16 - 30</option>
          </select>
          <button 
          type='button'
          onClick={handleView}
          className="bg-blue-500 text-white">
            View
            </button>
        </div>

{!payrollDetails && data.month && data.year && data.cutoff && (
  <div className="text-center text-red-500 mt-4">
    No payslip found for selected period.
  </div>
)}

      </div>

      {/* PAYSLIP DISPLAY */}
      {payrollDetails && (
        <>
          <div ref={payslipRef} className="border p-4 shadow rounded bg-white print:shadow-none print:border-none print:p-0">

            {/* 🏢 COMPANY HEADER */}
            <div className="flex items-center gap-4 mb-4 border-b pb-3">
              <img
                src={`/storage/images/${company.logo}`}
                alt="Company Logo"
                className="w-16 h-16 object-contain"
              />
              <div>
                <h1 className="text-xl font-bold">{company.company_name}</h1>
                <p className="text-sm">Payslip</p>
              </div>
            </div>

            {/* EMPLOYEE INFO */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 w-full">
              
              <input value={data.name} className="w-full px-3 py-2.5 mb-2 rounded-xl border border-gray-300 bg-white text-sm text-gray-800 
                    :outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition shadow-sm place-items-center" 
                />  
            
              <input value={data.employeeID} className="w-full px-3 py-2.5 mb-2 rounded-xl border border-gray-300 bg-white text-sm text-gray-800 
                    :outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition shadow-sm place-items-center" 
                />
            
              <input value={data.position} className="w-full px-3 py-2.5 mb-2 rounded-xl border border-gray-300 bg-white text-sm text-gray-800 
                    :outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition shadow-sm place-items-center" 
                />
              <input value= { data.cutoff == '1' ? "First Cutoff" : "2nd Cutoff"} className="w-full px-3 py-2.5 mb-2 rounded-xl border border-gray-300 bg-white text-sm text-gray-800 
                    :outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition shadow-sm place-items-center" 
                />
                
            </div>
           

            {/* EARNINGS & DEDUCTIONS */}
            <div className="grid grid-cols-2 gap-4">

              <div>
                <h3 className="font-bold text-center border p-1">EARNINGS</h3>
                <div className="grid grid-cols-2 gap-1">
                  <span>BASIC PAY</span><Input value={data.basicPay}/>
                  <span>ALLOWANCE</span><Input value={data.allowance}/>
                  <span>ADJUSTMENT</span><Input value={data.adjustment}/>
                  <span>COMMISSION</span><Input value={data.commission}/>
                  <span>OVERTIME</span><Input value={data.overtime}/>
                  <span>LEAVE SL/VL</span><Input value={data.leave}/>
                  <span>HOLIDAY</span><Input value={data.holiday1}/>
                  <span>HOLIDAY</span><Input value={data.holiday2}/>
                  <span>HOLIDAY</span><Input value={data.holiday3}/>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-center border p-1">DEDUCTIONS</h3>
                <div className="grid grid-cols-2 gap-1">
                  <span>SSS</span><Input value={data.sss}/>
                  <span>PHILHEALTH</span><Input value={data.philhealth}/>
                  <span>PAGIBIG</span><Input value={data.pagibig}/>
                  <span>SSS LOAN</span><Input value={data.sssLoan}/>
                  <span>PAGIBIG LOAN</span><Input value={data.pagibigLoan}/>
                  <span>LATE</span><Input value={data.late}/>
                  <span>UNDERTIME</span><Input value={data.undertime}/>
                  <span>CASH ADVANCE</span><Input value={data.cashAdvance}/>
                  <span>OTHER DEDUCTIONS</span><Input value={data.otherDeductions}/>
                </div>
              </div>
            </div>

            {/* TOTALS */}
            <div className="grid grid-cols-3 gap-2 mt-4 font-bold">
              <div>
                <span>TOTAL PAYMENT</span>
                <Input value={data.totalPayment}/>
              </div>
              <div>
                <span>TOTAL DEDUCTIONS</span>
                <Input value={data.totalDeductions}/>
              </div>
              <div>
                <span>NET PAY</span>
                <Input value={data.netPay}/>
              </div>
            </div>
          </div>

          {/* 📄 PDF BUTTON */}
                        <div className="mt-4 flex justify-end gap-2 print:hidden">
                <button
                    onClick={handlePrint}
                    className="bg-gray-700 text-white px-4 py-2 rounded"
                >
                    Print
                </button>

                <button
                    onClick={generatePDF}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Download PDF
                </button>
                </div>
        </>
      )}
    </div>
  );
};

export default PayslipViewer;