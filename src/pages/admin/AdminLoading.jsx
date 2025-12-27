// src/components/admin/AdminLoading.jsx
const AdminLoading = () => {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mb-4"></div>
        <p className="text-gray-400">Cargando contenido...</p>
      </div>
    </div>
  );
};

export default AdminLoading;