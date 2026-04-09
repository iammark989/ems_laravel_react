import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

interface EmployeeInfo {
  employeeID: string;
  employee_name: string;
  status: string;
  image?: string | null;
}

const AttendanceLogin: React.FC = () => {
  const [employee, setEmployee] = useState<EmployeeInfo | null>(null);
  const scanInputRef = useRef<HTMLInputElement>(null);
  const [clock, setClock] = useState<string>("");

  const [isRFIDModalOpen, setRFIDModalOpen] = useState(false);
  const [isFingerprintModalOpen, setFingerprintModalOpen] = useState(false);

  // Focus the hidden input
  const focusInput = () => scanInputRef.current?.focus();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      const weekDays = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
      ];
      const hour = String(now.getHours()).padStart(2, "0");
      const minute = String(now.getMinutes()).padStart(2, "0");
      const second = String(now.getSeconds()).padStart(2, "0");
      setClock(
        `${weekDays[now.getDay()]} - ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()} - ${hour}:${minute}:${second}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    focusInput();
    window.addEventListener("click", focusInput);
    return () => window.removeEventListener("click", focusInput);
  }, []);

  const handleScan = async () => {
    const scannedValue = scanInputRef.current?.value.trim();
    if (!scannedValue) return;

    try {
      const response = await fetch("/attendance/log/rfid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": (document.querySelector(
            'meta[name="csrf-token"]'
          ) as HTMLMetaElement)?.content || "",
        },
        body: JSON.stringify({ rfid: scannedValue }),
      });

      const result = await response.json();

      if (result.success) {
        setEmployee({
          employeeID: result.employeeID,
          employee_name: result.employee_name.toUpperCase(),
          status: result.status,
          image: result.image,
        });

        setTimeout(() => window.location.reload(), 5000);
      } else {
        Swal.fire("Error", "Invalid RFID or employee not found.", "error");
      }
    } catch (error) {
      console.error("Scan error:", error);
    } finally {
      if (scanInputRef.current) {
        scanInputRef.current.value = "";
        scanInputRef.current.focus();
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      {/* Hidden RFID input */}
      <input
        ref={scanInputRef}
        type="text"
        autoFocus
        autoComplete="off"
        className="opacity-0 absolute"
        onChange={handleScan}
      />

      {/* Clock */}
      <div className="text-green-600 font-semibold text-lg md:text-xl mb-4">{clock}</div>

      {/* Buttons */}
      <div className="flex gap-4 mb-6">
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

      {/* Employee Info */}
      {employee && (
        <div className="flex flex-col md:flex-row items-center gap-6 w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6">
          <div className="bg-gray-50 border rounded-xl p-3 flex-shrink-0">
            <img
              src={employee.image ?? "/fallback-image.jpg"}
              alt="Employee"
              className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-lg"
            />
          </div>
          <div className="flex-1 w-full space-y-3">
            <div>
              <p className="text-sm text-gray-500">Employee ID</p>
              <div className="bg-gray-100 rounded-lg p-2 text-center font-semibold">
                {employee.employeeID}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <div className="bg-gray-100 rounded-lg p-2 text-center font-semibold">
                {employee.employee_name}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <div className="bg-gray-100 rounded-lg p-2 text-center font-semibold">
                {employee.status}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RFID Modal */}
      {isRFIDModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
            <h2 className="text-lg font-semibold mb-4">Register RFID Card</h2>
            <input
              type="text"
              placeholder="Scan or enter RFID"
              className="w-full border rounded-lg p-2 mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setRFIDModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Save
              </button>
            </div>
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

export default AttendanceLogin;