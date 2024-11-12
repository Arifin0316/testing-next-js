import { useState, useEffect } from 'react';
import Scaleton from './scaleton';
import { produkType } from '@/types/prodak.type';
import Link from 'next/link';
import Image from 'next/image';

function ProdukViews({ prodak }: { prodak: produkType[] }) {
  const [isLoading, setIsLoading] = useState(true);

  // Mengatur loading selesai saat data tersedia
  useEffect(() => {
    if (prodak.length > 0) {
      setIsLoading(false);
    }
  }, [prodak]);

  return (
    <>
      <div className="flex flex-col items-center p-12 gap-8">
        <h1 className="text-5xl font-extrabold text-gray-800">Prodak</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {isLoading
            ? // Skeleton loading
              Array.from({ length: 6 }).map((_, index) => (
                <Scaleton key={index}  />
              ))
            : // Konten produk
              prodak.map((prodak: produkType) => (
                <Link href={`/prodak/${prodak.id}`} key={prodak.id} className="bg-blue-300 shadow-md rounded-lg p-6 flex flex-col items-center text-center">
                  <Image src={prodak.image} alt={prodak.nama} width={500} height={500} className="w-40 h-40 object-cover rounded-lg mb-4"/>
                  <h3 className="text-xl font-semibold text-gray-900">{prodak.nama}</h3>
                  <p className="text-gray-700 mt-2">Rp {prodak.price}</p>
                  <p className="text-gray-500">{prodak.type}</p>
                </Link>
              ))}
        </div>
        <button className="px-8 py-3 mt-6 bg-blue-500 text-white rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">Home</button>
      </div>
    </>
  );
}

export default ProdukViews;
