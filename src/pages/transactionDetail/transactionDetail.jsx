import React, { useEffect, useState } from "react";
import Loading from "../../components/loading";
import { Box, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import walletApi from "../../api/walletApi";
import { Tooltip, styled } from "@mui/material";
import { MdOutlineHelpOutline } from "react-icons/md";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";

dayjs.extend(relativeTime);
dayjs.locale("vi"); // 🔥 đặt ngôn ngữ sang tiếng Việt


// Tùy chỉnh Tooltip
const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: "#ffffff",
    color: "gray",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)", // Đổ bóng nhẹ
    border: "1px solid #ddd", // Viền nhẹ
    fontSize: 13,
  },
  [`& .MuiTooltip-arrow`]: {
    color: "#ffffff", // Màu của mũi tên phải khớp với nền
  },
}));

const TransactionDetail = () => {
  const { txhash } = useParams();
  const [txData, setTxData] = useState();
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    const getDataTransaction = async () => {
      try {
        setIsLoad(true);
        const res = await walletApi.getTransaction(txhash);
        setTxData(res.data.transaction);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoad(false);
      }
    };
    getDataTransaction();
  }, [txhash]);
  console.log(txData);
  if (isLoad) return <Loading />;
  return (
    <Stack minHeight={"80vh"} width={"100%"} gap={1}>
      <Box flex={0.5}>
        <Typography fontSize={19} fontWeight={"bold"}>
          Chi tiết giao dịch
        </Typography>
      </Box>
      <Stack
        flex={0.5}
        sx={{ padding: 2, boxShadow: 1, borderRadius: 3, gap: 1 }}
      >
        <Typography variant="body2" fontWeight={"bold"} fontSize={14}>
          Hành động giao dịch:
        </Typography>
        <Stack direction={"row"} gap={1}>
          <Typography color="gray" fontSize={14}>
            Chuyển
          </Typography>
          <Typography fontSize={14}>
            {`${(Number(txData?.value) / 1e18)} ETH`}
          </Typography>
          <Typography fontSize={14} color="gray">
            đến
          </Typography>
          <Typography fontSize={14} color="#0784c3">
            {txData?.to}
          </Typography>
        </Stack>
      </Stack>
      <Stack
        flex={19}
        sx={{ padding: 2, boxShadow: 1, borderRadius: 3, gap: 2 }}
      >
        <Typography
          variant="body1"
          sx={{ color: "red", borderBottom: "1px solid lightgray", pb: 2 }}
        >
          {`[Đây chỉ là giao dịch Sepolia Testnet]`}
        </Typography>
        <Stack direction={"row"} gap={1} alignItems={"center"}>
          <CustomTooltip
            title="TxHash hoặc hàm băm giao dịch là mã định danh
            66 ký tự duy nhất được tạo bất cứ khi nào giao dịch được thực thi"
            arrow
            placement="right"
          >
            <MdOutlineHelpOutline color="gray" />
          </CustomTooltip>
          <Typography variant="body1" color="gray" minWidth={270}>
            Hàm băm giao dịch:
          </Typography>
          <Typography variant="body1" color="#0784c3" minWidth={270}>
            {txhash}
          </Typography>
        </Stack>
        <Stack direction={"row"} gap={1} alignItems={"center"}>
          <CustomTooltip
            title="Trạng thái giao dịch"
            arrow
            placement="top-start"
          >
            <MdOutlineHelpOutline color="gray" />
          </CustomTooltip>
          <Typography variant="body1" color="gray" minWidth={270}>
            Tình trạng:
          </Typography>
          <Typography variant="body1" color="green" minWidth={270}>
            Thành công
          </Typography>
        </Stack>
        <Stack direction={"row"} gap={1} alignItems={"center"}>
          <CustomTooltip
            title="Trạng thái giao dịch"
            arrow
            placement="top-start"
          >
            <MdOutlineHelpOutline color="gray" />
          </CustomTooltip>
          <Typography variant="body1" color="gray" minWidth={270}>
            Khối:
          </Typography>
          <Typography variant="body1" color="#0784c3">
            {txData.blockNumber}
          </Typography>
          <Typography variant="body2" color="gray" fontSize={14}>
            {`( ${txData?.confirmations} Xác nhận khối )`}
          </Typography>
        </Stack>
        <Stack direction={"row"} gap={1} alignItems={"center"} borderBottom={'1px solid lightgray'} pb={2}>
          <CustomTooltip
            title="Ngày tạo giao dịch"
            arrow
            placement="top-start"
          >
            <MdOutlineHelpOutline color="gray" />
          </CustomTooltip>
          <Typography variant="body1" color="gray" minWidth={270}>
            Ngày tạo:
          </Typography>
          <Typography variant="body1" color="#0784c3">
            {dayjs.unix(Number(txData?.timestamp)).fromNow()}
          </Typography>
          <Typography variant="body2" color="gray" fontSize={14}>
            {`( ${txData?.datetime} )`}
          </Typography>
        </Stack>
        <Stack direction={"row"} gap={1} alignItems={"center"}>
          <CustomTooltip
            title="Bên gửi giao dịch"
            arrow
            placement="top-start"
          >
            <MdOutlineHelpOutline color="gray" />
          </CustomTooltip>
          <Typography variant="body1" color="gray" minWidth={270}>
            Từ:
          </Typography>
          <Typography variant="body1" color="#0784c3">
            {txData.from}
          </Typography>
        </Stack>
        <Stack direction={"row"} gap={1} alignItems={"center"} borderBottom={'1px solid lightgray'} pb={2}>
          <CustomTooltip
            title="Bên nhận giao dịch (có thể chỉ là hợp đồng)"
            arrow
            placement="top-start"
          >
            <MdOutlineHelpOutline color="gray" />
          </CustomTooltip>
          <Typography variant="body1" color="gray" minWidth={270}>
            Giá trị:
          </Typography>
          <Typography variant="body1" color="#0784c3">
            {txData.to}
          </Typography>
        </Stack>
        <Stack direction={"row"} gap={1} alignItems={"center"}>
          <CustomTooltip
            title="Bên nhận giao dịch (có thể chỉ là hợp đồng)"
            arrow
            placement="top-start"
          >
            <MdOutlineHelpOutline color="gray" />
          </CustomTooltip>
          <Typography variant="body1" color="gray" minWidth={270}>
            Giá trị:
          </Typography>
          <Typography variant="body1">
            {`${(Number(txData?.value) / 1e18)} ETH`}
          </Typography>
        </Stack>
        <Stack direction={"row"} gap={1} alignItems={"center"}>
          <CustomTooltip
            title="Bên nhận giao dịch (có thể chỉ là hợp đồng)"
            arrow
            placement="top-start"
          >
            <MdOutlineHelpOutline color="gray" />
          </CustomTooltip>
          <Typography variant="body1" color="gray" minWidth={270}>
            Phí giao dịch:
          </Typography>
          <Typography variant="body1">
            {`${txData.feeEth} ETH`}
          </Typography>
        </Stack>
        <Stack direction={"row"} gap={1} alignItems={"center"}>
          <CustomTooltip
            title="Bên nhận giao dịch (có thể chỉ là hợp đồng)"
            arrow
            placement="top-start"
          >
            <MdOutlineHelpOutline color="gray" />
          </CustomTooltip>
          <Typography variant="body1" color="gray" minWidth={270}>
            Phí gas:
          </Typography>
          <Typography variant="body1" color="#0784c3">

          </Typography>
        </Stack>
      </Stack>
      <Stack sx={{
        boxShadow:1,
        borderRadius:3,
        padding:2
      }}>
        <Stack direction={"row"} gap={1} alignItems={"center"}>
          <Typography variant="body1" color="gray" minWidth={300}>
            Thêm chi tiết:
          </Typography>
          <Typography variant="body1" color="#0784c3" sx={{cursor:'pointer'}}>
            {`+ Nhấp để hiện thị thêm`}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default TransactionDetail;
