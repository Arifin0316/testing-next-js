

function ProdakDetailSkeleton() {
  return (
    <div className="bg-blue-300 w-64 shadow-md rounded-lg p-6 flex flex-col items-center text-center animate-pulse">
    <div className="w-40 h-40 bg-gray-300 rounded-lg mb-4"></div> {/* Placeholder untuk gambar */}
    <div className="w-24 h-6 bg-gray-300 rounded mb-2"></div>    {/* Placeholder untuk nama produk */}
    <div className="w-20 h-4 bg-gray-300 rounded mb-2"></div>    {/* Placeholder untuk harga */}
    <div className="w-16 h-4 bg-gray-300 rounded"></div>         {/* Placeholder untuk tipe produk */}
  </div>
  )
}

export default ProdakDetailSkeleton