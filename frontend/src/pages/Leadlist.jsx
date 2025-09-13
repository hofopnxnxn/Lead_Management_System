import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

export default function LeadsList() {
  const [rowData, setRowData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const fetchLeads = async () => {
    try {
      const res = await api.get(
        `/leads?page=${page}&limit=${limit}&city=${city}&status=${status}`
      );
      setRowData(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching leads:", err);
      setRowData([]);
    }
  };

  useEffect(() => {
    fetchLeads();
    // eslint-disable-next-line
  }, [page, limit, city, status]);

  // Delete Lead
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this lead?")) return;
    try {
      await api.delete(`/leads/${id}`);
      toast.success("Lead deleted successfully");
      fetchLeads();
    } catch (err) {
      toast.error("Failed to delete lead");
    }
  };

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const colDefs = [
    { field: "first_name", flex: 1 },
    { field: "last_name", flex: 1 },
    { field: "email", flex: 2 },
    { field: "city", flex: 1 },
    { field: "status", flex: 1 },
    {
      headerName: "Actions",
      cellRenderer: (params) => (
        <div className="flex justify-center gap-2">
          <button
            className="bg-yellow-500 text-white px-4 py-1 rounded text-xs"
            onClick={() => navigate(`/leads/edit/${params.data._id}`)}
          >
            ✏️ Edit
          </button>
          <button
            className="bg-red-500 text-white px-4 py-1 rounded text-xs"
            onClick={() => handleDelete(params.data._id)}
          >
            🗑 Delete
          </button>
        </div>
      ),
      width: 270,
      cellClass: "flex justify-center items-center",
      suppressSizeToFit: true,
    },
  ];

  return (
    <div className="p-1 sm:p-3 max-w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
        <h2 className="text-xl sm:text-2xl font-bold text-center flex-1">
          📋 Lead Management System
        </h2>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition w-full sm:w-auto"
        >
          🚪 Logout
        </button>
      </div>
      {/* Top actions */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
        <button
          onClick={() => navigate("/leads/new")}
          className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition w-full sm:w-auto"
        >
          ➕ Add Lead
        </button>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Filter by City"
            className="border rounded px-2 py-1 w-full sm:w-auto text-sm"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded px-2 py-1 w-full sm:w-auto text-sm"
          >
            <option value="">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="lost">Lost</option>
            <option value="won">Won</option>
          </select>
        </div>
      </div>

      {/* AG Grid */}
      <div
        className="ag-theme-alpine w-full overflow-x-auto"
        style={{ height: 472 }}
      >
        <div className="min-w-[600px]">
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            pagination={false}
            domLayout="autoHeight"
            suppressCellFocus={true}
            suppressColumnVirtualisation={true}
            suppressDragLeaveHidesColumns={true}
          />
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-center items-center mt-4 gap-2 sm:gap-4">
        <button
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50 w-full sm:w-auto"
        >
          Prev
        </button>

        <span className="font-medium text-sm">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
          className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50 w-full sm:w-auto"
        >
          Next
        </button>

        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="border rounded px-2 py-1 text-sm w-full sm:w-auto"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
    </div>
  );
}
