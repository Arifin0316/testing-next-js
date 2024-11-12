import ProdukViews from "@/views/prodak/main";
import { produkType } from "@/types/prodak.type";

function ProdakPage(props: { prodak: produkType[] }) { // Perhatikan tipe prodak di sini
  const { prodak } = props;
  return (
    <div>
      <ProdukViews prodak={prodak} />
    </div>
  );
}

export default ProdakPage;

// Dipanggil setiap melakukan request
export async function getServerSideProps() {
  try {
    // Fetch API
    const res = await fetch("http://localhost:3000/api/prodak");
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const respons = await res.json();

    return {
      props: {
        prodak: respons.data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        prodak: [], // Return an empty array as a fallback
      },
    };
  }
}
