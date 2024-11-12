import ProdukViews from "@/views/prodak/main"
import { produkType } from "@/types/prodak.type";

function ProdakPage(props : {prodak : produkType[]}) {
    const {prodak} = props
 
  return (
    <div>
      <ProdukViews prodak={prodak}/>
    </div>
  )
}

export default ProdakPage

export async function getStaticProps() {
    const res = await fetch("http://localhost:3000/api/prodak");
    const respons = await res.json();
  
    return {
      props: {
          prodak: respons.data
      }
    }
}