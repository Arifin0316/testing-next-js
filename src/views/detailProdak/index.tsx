import Image from "next/image";

interface ProdakProps {
  prodak: {
    image: string;
    nama: string;
    price: number;
    type: string;
  };
}

function ProdakDetail({ prodak }: ProdakProps) {
  return (
    <div className="bg-blue-300 w-64 shadow-md rounded-lg p-6 flex flex-col items-center text-center">
      <Image src={prodak.image} alt={prodak.nama} width={500} height={500} className="w-40 h-40 object-cover rounded-lg mb-4" />
      <h3 className="text-xl font-semibold text-gray-900">{prodak.nama}</h3>
      <p className="text-gray-700 mt-2">Rp {prodak.price}</p>
      <p className="text-gray-500">{prodak.type}</p>
    </div>
  );
}

export default ProdakDetail;
