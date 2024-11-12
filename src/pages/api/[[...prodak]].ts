import type { NextApiRequest, NextApiResponse } from "next";
import { retrieveDataByCollection, retrieveDataById } from "@/lib/firebase/servis";

type Data = {
  status: boolean;
  statusCode: number;
  data: unknown;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Validasi method HTTP
  if (req.method !== 'GET') {
    return res.status(405).json({
      status: false,
      statusCode: 405,
      data: null,
      message: 'Method Not Allowed'
    });
  }

  try {
    // Validasi dan ekstraksi query parameter dengan lebih aman
    const prodakId = Array.isArray(req.query.prodak) 
      ? req.query.prodak[1] 
      : req.query.prodak;

    // Cek apakah prodakId ada dan valid
    if (prodakId && typeof prodakId === 'string') {
      const data = await retrieveDataById("prodak", prodakId);
      
      // Cek apakah data ditemukan
      if (!data) {
        return res.status(404).json({
          status: false,
          statusCode: 404,
          data: null,
          message: `Product with ID ${prodakId} not found`
        });
      }

      return res.status(200).json({
        status: true,
        statusCode: 200,
        data,
        message: 'Product retrieved successfully'
      });
    } else {
      // Mengambil semua data produk
      const data = await retrieveDataByCollection("prodak");
      
      return res.status(200).json({
        status: true,
        statusCode: 200,
        data,
        message: 'Products retrieved successfully'
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    
    return res.status(500).json({
      status: false,
      statusCode: 500,
      data: null, // Lebih baik null daripada array kosong untuk error
      message: 'Internal Server Error occurred while retrieving data'
    });
  }
}