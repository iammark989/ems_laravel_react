import { useState } from "react";
import { router } from "@inertiajs/react";

const PayrollUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    router.post("/payroll/upload", formData, {
      forceFormData: true, // Required for file uploads
      onStart: () => setLoading(true),
      onFinish: () => setLoading(false),
      onError: (errors) => {
        // Laravel validation errors
        console.error(errors);
        alert(Object.values(errors).flat().join("\n"));
      },
      onSuccess: () => {
        alert("Payroll uploaded successfully!");
        setFile(null);
      },
    });
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="border p-6 shadow rounded bg-white">
        <h2 className="text-xl font-bold mb-4">Upload Payroll</h2>

        <input
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleFileChange}
          className="mb-3"
        />

        {file && (
          <p className="text-sm mb-3">
            Selected: <strong>{file.name}</strong>
          </p>
        )}

        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Uploading..." : "Upload Payroll"}
        </button>
      </div>
    </div>
  );
};

export default PayrollUpload;