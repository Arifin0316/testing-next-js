import { useParams } from "next/navigation";


function ShopDetailProduk() {
    const params = useParams();
    const slug = params ? params.slug : null;

    return (
        <div>
            <h1>Shop detail produk</h1>
            <p>nama: {`${slug ? slug[0] + '-' + slug[1]: ''}`}</p>
        
        </div>
    );
}

export default ShopDetailProduk;
