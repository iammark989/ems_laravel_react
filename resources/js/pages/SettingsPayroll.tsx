import { router, usePage } from "@inertiajs/react";
import { useState } from "react";
import Swal from "sweetalert2";

const SettingsPayroll = () => {

  const { departments, positions } = usePage().props as any;

  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");

  const [editDepartmentId, setEditDepartmentId] = useState<number | null>(null);
  const [editPositionId, setEditPositionId] = useState<number | null>(null);

  /* ---------------- ADD / UPDATE DEPARTMENT ---------------- */

  const handleDepartmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const exists = departments.some(
      (d: any) => d.department.toLowerCase() === department.toLowerCase()
    );

    if (exists && !editDepartmentId) {
      Swal.fire("Duplicate", "Department already exists", "warning");
      return;
    }

    router.post(
      "/settings/department",
      {
        id: editDepartmentId,
        department,
      },
      {
        preserveScroll: true,
        onSuccess: () => {
          setDepartment("");
          setEditDepartmentId(null);
        },
      }
    );
  };

  /* ---------------- ADD / UPDATE POSITION ---------------- */

  const handlePositionSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const exists = positions.some(
      (p: any) => p.position.toLowerCase() === position.toLowerCase()
    );

    if (exists && !editPositionId) {
      Swal.fire("Duplicate", "Position already exists", "warning");
      return;
    }

    router.post(
      "/settings/position",
      {
        id: editPositionId,
        position,
      },
      {
        preserveScroll: true,
        onSuccess: () => {
          setPosition("");
          setEditPositionId(null);
        },
      }
    );
  };

  /* ---------------- DELETE ---------------- */

  const deleteDepartment = (id: number) => {
    Swal.fire({
      title: "Delete Department?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(`/settings/department/${id}`);
      }
    });
  };

  const deletePosition = (id: number) => {
    Swal.fire({
      title: "Delete Position?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(`/settings/position/${id}`);
      }
    });
  };

  /* ---------------- EDIT ---------------- */

  const editDepartment = (dept: any) => {
    setDepartment(dept.department);
    setEditDepartmentId(dept.id);
  };

  const editPosition = (pos: any) => {
    setPosition(pos.position);
    setEditPositionId(pos.id);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-semibold mb-6">
        Payroll Settings
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        {/* DEPARTMENT CARD */}

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-lg font-semibold mb-4">
            Department Settings
          </h2>

          <form onSubmit={handleDepartmentSubmit} className="flex gap-2 mb-4">

            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="Department name"
              className="border px-3 py-2 rounded w-full"
            />

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 rounded"
            >
              {editDepartmentId ? "Update" : "Save"}
            </button>

          </form>

          {/* TABLE */}

          <table className="w-full text-sm border">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border text-left">Department</th>
                <th className="p-2 border w-28">Actions</th>
              </tr>
            </thead>

            <tbody>

              {departments.map((dept: any) => (
                <tr key={dept.id}>

                  <td className="p-2 border">
                    {dept.department}
                  </td>

                  <td className="p-2 border flex gap-2">

                    <button
                      onClick={() => editDepartment(dept)}
                      className="text-blue-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteDepartment(dept.id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

        {/* POSITION CARD */}

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-lg font-semibold mb-4">
            Position Settings
          </h2>

          <form onSubmit={handlePositionSubmit} className="flex gap-2 mb-4">

            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="Position name"
              className="border px-3 py-2 rounded w-full"
            />

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 rounded"
            >
              {editPositionId ? "Update" : "Save"}
            </button>

          </form>

          <table className="w-full text-sm border">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border text-left">Position</th>
                <th className="p-2 border w-28">Actions</th>
              </tr>
            </thead>

            <tbody>

              {positions.map((pos: any) => (
                <tr key={pos.id}>

                  <td className="p-2 border">
                    {pos.position}
                  </td>

                  <td className="p-2 border flex gap-2">

                    <button
                      onClick={() => editPosition(pos)}
                      className="text-blue-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deletePosition(pos.id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>

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

export default SettingsPayroll;