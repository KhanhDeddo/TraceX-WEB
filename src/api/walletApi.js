import axiosClient from "./axiosClient";

const walletApi = {
  getByAddress: (address) => axiosClient.get(`/wallet/${address}`),
  getTxHistory: (address) => axiosClient.get(`/wallet/${address}/txs`),
};

export default walletApi;
