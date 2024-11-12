import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProdakDetail from "@/views/detailProdak";
import ProdakDetailSkeleton from "@/views/detailProdak/scalaton";

function DetailProduk() {
  const [prodak, setProdak] = useState(null);
  const params = useParams();
  const id = params ? params.prodak : null;

  useEffect(() => {
    if (id) {
      fetch(`/api/prodak/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((response) => {
          setProdak(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [id]);

  return (
    <div className="flex flex-col justify-center items-center mt-6">
      <h1 className="text-3xl font-bold my-6">Detail Produk</h1>
      {prodak ? (
        <ProdakDetail prodak={prodak} />
      ) : (
        <ProdakDetailSkeleton />
      )}
    </div>
  );
}

export default DetailProduk;
