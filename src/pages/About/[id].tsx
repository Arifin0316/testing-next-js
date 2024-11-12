import { useParams } from "next/navigation";

function DetailProduk() {
    const params = useParams();
    const id = params ? params.id : null;

    return (
        <div>
            <h1>detail produk</h1>
            {id ? <p>nama: {id}</p> : <p>ID produk tidak tersedia</p>}
        </div>
    );
}

export default DetailProduk;
