import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import walletApi from "../../api/walletApi";

const Address = () => {
  const { address } = useParams()
  const [data, setData] = useState(null)
  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const res = await walletApi.getByAddress(address); // Gọi API
        setData(res.data); // Hoặc res tùy axiosClient
      } catch (err) {
        console.error(err)
      }
    };

    if (address) fetchWallet()
  }, [address]);

  return (
    <div>
      <h2>Ví: {address}</h2>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : "Đang tải..."}
    </div>
  );
};

export default Address
