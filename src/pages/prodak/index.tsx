import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Produk from "@/views/prodak/main/index";

function ProdakPage() {
  const [prodak, setProdak] = useState([]);
  const [isLogin, setIsLogin] = useState(true);
  const { push } = useRouter();

  useEffect(() => {
    fetch('/api/prodak') // pastikan menggunakan URL absolut untuk API
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
  }, []); // Tambahkan dependensi kosong agar useEffect hanya berjalan sekali

  useEffect(() => {
    if (!isLogin) {
      push('./auth/login');
    }
  }, [isLogin, push]); // Tambahkan dependensi yang relevan untuk efektivitas

  return (
    <>
      <Head>
        <title>prodak</title>
      </Head> 
      <button onClick={() => setIsLogin(false)}>k</button>
      <Produk prodak={prodak}/>
    </>
  );
}

export default ProdakPage;
