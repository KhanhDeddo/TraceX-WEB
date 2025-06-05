import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate, useParams } from "react-router-dom";
import walletApi from "../../api/walletApi";
import Loading from "../../components/loading";
import { FaAddressBook } from "react-icons/fa6";
import { ImDiamonds } from "react-icons/im";
import { PiArrowUpRightBold } from "react-icons/pi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useRef } from "react";
import { Popper } from "@mui/material";


import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";

dayjs.extend(relativeTime);
dayjs.locale("vi"); // 🔥 đặt ngôn ngữ sang tiếng Việt

const Address = () => {
  const { address } = useParams();
  const [data, setData] = useState(null);
  const [txs, setTxs] = useState(null);
  const [isload, setIsLoad] = useState(true);
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const iconRef = useRef(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const handleClick = (event, row) => {
    if (anchorEl && anchorEl === event.currentTarget) {
      // Nếu bấm lại chính icon đã mở => đóng Popper
      setAnchorEl(null);
      setSelectedRow(null);
    } else {
      // Nếu bấm icon khác => mở Popper với anchor mới
      setAnchorEl(event.currentTarget);
      setSelectedRow(row);
    }
  };

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        setIsLoad(true);
        const res = await walletApi.getByAddress(address);
        const resTxs = await walletApi.getTxHistory(address);
        setData(res?.data);
        setTxs(resTxs?.data?.transactions);
      } catch (err) {
        console.log(err?.response?.data);
        setData(err?.response?.data);
        setTxs([]);
      } finally {
        setIsLoad(false);
      }
    };

    if (address) fetchWallet();
  }, [address]);
  console.log(txs);

  const rows = txs?.map((tx) => ({
    id: tx.hash,
    age: dayjs.unix(Number(tx.timeStamp)).fromNow(),
    ...tx,
  }));

  const columns = [
    {
      field: "id",
      headerName: "Hàm băm giao dịch",
      width: 190,
      renderHeader: () => (
        <strong style={{ fontWeight: "bold" }}>Hàm băm giao dịch</strong>
      ),
      renderCell: (params) => {
        return (
          <Typography component={'span'}
            onClick={()=>{navigate(`/tx/${params.id}`)}}
            sx={{
              cursor:'pointer',
              textDecoration: "none",
              color: "#0784c3",
            }}
          >
            {params.id}
          </Typography>
        );
      },
    },
    {
      field: "method",
      headerName: "Hành động",
      renderHeader: () => (
        <strong style={{ fontWeight: "bold" }}>Hành động</strong>
      ),
      renderCell: (params) => {
        return params.row.input === "0x"
          ? "Chuyển ETH"
          : params.row.functionName || "Không rõ";
      },
    },
    {
      field: "blockNumber",
      headerName: "Khối",
      width: 110,
      editable: true,
      renderHeader: () => <strong style={{ fontWeight: "bold" }}>Khối</strong>,
      renderCell: (params) => {
        return (
          <Typography component={'span'}
            onClick={()=>{navigate(`/block/${params.value}`)}}
            sx={{
              cursor:'pointer',
              textDecoration: "none",
              color: "#0784c3",
            }}
          >
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: "age",
      headerName: "Tuổi",
      type: "number",
      width: 150,
      editable: true,
      headerAlign: "left",
      align: "left",
      renderHeader: () => (
        <strong style={{ fontWeight: "bold", color: "#0784c3" }}>Tuổi</strong>
      ),
    },
    {
      field: "from",
      headerName: "Từ",
      width: 250,
      renderHeader: () => <strong style={{ fontWeight: "bold" }}>Từ</strong>,
      renderCell: (params) => {
        return (
          <Typography component={'span'}
            onClick={()=>{navigate(`/address/${params.value}`)}}
            sx={{
              cursor:'pointer',
              textDecoration: "none",
              color: "#0784c3",
            }}
          >
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: "direction",
      headerName: "Loại",
      width: 80,
      sortable: false,
      display: "flex",
      justifyContent: "center",
      align: "center",
      headerAlign: "center",
      renderHeader: () => <strong style={{ fontWeight: "bold" }}>Loại</strong>,
      renderCell: (params) => {
        const myAddress = address.toLowerCase();
        const from = params.row.from?.toLowerCase() || "";
        const to = params.row.to?.toLowerCase() || "";

        let label = "";
        let bgColor = "";
        let textColor = "";
        let boderColor = "";

        if (from === myAddress) {
          label = "RA";
          bgColor = "#fff6da";
          textColor = "#d0a218";
          boderColor = "#ffe9a6";
        } else if (to === myAddress) {
          label = "VÀO";
          bgColor = "#e5f5f3";
          textColor = "#13a88f";
          boderColor = "#ace0d8";
        } else {
          label = "KHÁC";
          bgColor = "#eceff1";
          textColor = "#607d8b";
        }

        return (
          <Box
            sx={{
              color: textColor,
              backgroundColor: bgColor,
              border: `1px solid ${boderColor}`,
              borderRadius: 3,
              boxShadow: 0,
              width: "90%",
              height: "60%",
              fontWeight: "bold",
              fontSize: 14,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {label}
          </Box>
        );
      },
    },
    {
      field: "to",
      headerName: "Đến",
      width: 250,
      renderHeader: () => <strong style={{ fontWeight: "bold" }}>Đến</strong>,
      renderCell: (params) => {
        return (
          <Typography component={'span'}
            onClick={()=>{navigate(`/address/${params.value}`)}}
            sx={{
              cursor:'pointer',
              textDecoration: "none",
              color: "#0784c3",
            }}
          >
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: "value",
      headerName: "Số lượng",
      type: "number",
      width: 110,
      editable: true,
      headerAlign: "left",
      align: "left",
      renderHeader: () => (
        <strong style={{ fontWeight: "bold", fontSize: 16, color: "#0784c3" }}>
          Số lượng
        </strong>
      ),
      renderCell: (params) => {
        const eth = Number(params.value) / 1e18;
        return <span>{eth.toFixed(2)} ETH</span>;
      },
    },
    {
      field: "txnfee",
      headerName: "Phí giao dịch",
      type: "number",
      width: 110,
      editable: true,
      headerAlign: "left",
      align: "left",
      renderHeader: () => (
        <strong style={{ fontWeight: "bold", color: "#0784c3" }}>
          Phí giao dịch
        </strong>
      ),
      renderCell: (params) => {
        const gasUsed = Number(params.row.gasUsed);
        const gasPrice = Number(params.row.gasPrice);
        const txFeeEth = (gasUsed * gasPrice) / 1e18;
        return <span style={{ color: "gray" }}>{txFeeEth.toFixed(8)}</span>;
      },
    },
    {
      field: "operater",
      headerName: "Thao tác",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderHeader: () => (
        <strong style={{ fontWeight: "bold" }}>Thao tác</strong>
      ),
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <Box
              ref={iconRef}
              onClick={(e) => handleClick(e, params.row)}
              sx={{
                cursor: "pointer",
                borderRadius: 2,
                boxShadow: 4,
                height: "50%",
                width: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transition: "transform 0.1s ease-in-out", // chuyển động mượt
                "&:hover": {
                  transform: "scale(1.1)",
                },
                "&:active": {
                  transform: "scale(0.95)", // khi click giữ chuột
                },
              }}
            >
              <MdOutlineRemoveRedEye />
            </Box>
            <Popper
              id={id}
              open={open}
              anchorEl={anchorEl}
              placement="right"
              modifiers={[
                {
                  name: "arrow",
                  enabled: true,
                  options: {
                    element: "[data-popper-arrow]",
                  },
                },
              ]}
              sx={{ zIndex: 1300 }}
            >
              <ClickAwayListener
                onClickAway={() => {
                  setAnchorEl(null);
                  setSelectedRow(null);
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    width: 320,
                    height: 490,
                    p: 2,
                    borderRadius: 2,
                    position: "relative",
                    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.08)",
                    border: "0.2px solid white",
                  }}
                >
                  {/* Mũi tên tam giác nằm bên trái popup */}
                  <Box
                    data-popper-arrow
                    sx={{
                      position: "absolute",
                      top: "calc(50% - 10px)",
                      right: -15,
                      width: 0,
                      height: 0,
                      borderTop: "10px solid transparent",
                      borderBottom: "10px solid transparent",
                      borderLeft: "15px solid white",
                    }}
                  />

                  {/* Nội dung bên trong popup */}
                  <Typography fontWeight="bold" fontSize={16} pb={3}>
                    Thông tin thêm
                  </Typography>
                  <Stack
                    gap={1}
                    sx={{ borderBottom: "1px solid lightgray", pb: 2 }}
                  >
                    <Typography
                      variant="body2"
                      fontWeight={"bold"}
                      fontSize={14}
                    >
                      Tình trạng:
                    </Typography>
                    <Stack direction={"row"} gap={1}>
                      <Typography variant="body2" color="green" fontSize={14}>
                        Thành công
                      </Typography>
                      <Typography
                        variant="body2"
                        color="gray"
                        fontSize={14}
                      >{`( ${selectedRow?.confirmations} Xác nhận khối )`}</Typography>
                    </Stack>
                  </Stack>
                  <Stack
                    gap={1}
                    sx={{ borderBottom: "1px solid lightgray", pb: 2, pt: 2 }}
                  >
                    <Typography
                      variant="body2"
                      fontWeight={"bold"}
                      fontSize={14}
                    >
                      Hành động giao dịch:
                    </Typography>
                    <Stack direction={"row"} gap={1}>
                      <Typography color="gray" fontSize={14}>
                        Chuyển
                      </Typography>
                      <Typography fontSize={14}>{`${(
                        Number(selectedRow?.value) / 1e18
                      ).toFixed(2)} ETH`}</Typography>
                      <Typography fontSize={14} color="gray">
                        đến
                      </Typography>
                      <Typography
                        fontSize={14}
                        color="#0784c3"
                      >{`${selectedRow?.to.slice(
                        0,
                        10
                      )}...${selectedRow?.to.slice(-9)}`}</Typography>
                    </Stack>
                  </Stack>
                  <Stack
                    gap={1}
                    sx={{ borderBottom: "1px solid lightgray", pb: 2, pt: 2 }}
                  >
                    <Typography
                      variant="body2"
                      fontWeight={"bold"}
                      fontSize={14}
                    >
                      Phí giao dịch:
                    </Typography>
                    <Stack direction={"row"} gap={1}>
                      <Typography fontSize={14}>
                        {`${
                          (selectedRow?.gasUsed * selectedRow?.gasPrice) / 1e18
                        } ETH`}
                      </Typography>
                      <Typography fontSize={14} color="gray">
                        {`($0,00)`}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack
                    gap={1}
                    sx={{ borderBottom: "1px solid lightgray", pb: 2, pt: 2 }}
                  >
                    <Typography
                      variant="body2"
                      fontWeight={"bold"}
                      fontSize={14}
                    >
                      Thông tin khí đốt:
                    </Typography>
                    <Stack gap={0.5}>
                      <Typography variant="body2">
                        {`${selectedRow?.gasUsed?.toLocaleString()} 
                      gas được sử dụng từ giới hạn ${selectedRow?.gas?.toLocaleString()}`}
                      </Typography>
                      <Typography color="gray" fontSize={12}>
                        {`@ ${(Number(selectedRow?.gasPrice) / 1e18).toFixed(
                          18
                        )} ETH (${(Number(selectedRow?.gasPrice) / 1e9).toFixed(
                          9
                        )} Gwei)`}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack
                    gap={1}
                    sx={{ borderBottom: "1px solid lightgray", pb: 2, pt: 2 }}
                  >
                    <Typography
                      variant="body2"
                      fontWeight={"bold"}
                      fontSize={14}
                    >
                      Nonce:
                    </Typography>
                    <Stack direction={"row"} gap={1}>
                      <Typography fontSize={14}>
                        {selectedRow?.nonce}
                      </Typography>
                      <Typography fontSize={14} color="gray">
                        {`(vị trí khối ${selectedRow?.transactionIndex} )`}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack
                    direction={"row"}
                    gap={1}
                    sx={{ pt: 2, cursor: "pointer" }}
                    alignItems={"center"}
                    onClick={() => {
                      navigate(`/tx/${selectedRow.id}`);
                    }}
                  >
                    <Typography variant="body2" fontSize={15} color="#0784c3">
                      Xem thêm chi tiết
                    </Typography>
                    <PiArrowUpRightBold style={{ color: "#0784c3" }} />
                  </Stack>
                </Paper>
              </ClickAwayListener>
            </Popper>
          </Box>
        );
      },
    },
  ];

  if (isload) return <Loading />;
  return (
    <Stack spacing={1} height={"100%"}>
      <Stack
        flex={2}
        direction={"row"}
        spacing={1}
        alignItems={"center"}
        borderBottom={"1px solid lightgray"}
        pb={2}
      >
        <FaAddressBook style={{ width: 25, height: 25 }} />
        <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
          Địa chỉ
        </Typography>
        <Typography color="#0784c3">
          {data?.address || `(${data?.error? data.error : `Server mất kết nối, vui lòng thử lại sau ít phút`})`}
        </Typography>
      </Stack>
      <Stack
        flex={4}
        direction={"row"}
        alignItems={"center"}
        flexWrap={"wrap"}
        gap={2}
        justifyContent={"center"}
      >
        <Paper
          sx={{
            height: "90%",
            width: "30%",
            minWidth: 300,
            padding: 2,
            gap: 1,
            boxShadow: 4,
            borderRadius: 3,
            transition: "0.3s",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: 6,
            },
          }}
        >
          <Typography pb={3} fontWeight={"bold"} fontSize={16}>
            Tổng quan
          </Typography>
          <Typography color="gray" fontSize={15}>
            Số dư ETH
          </Typography>
          <Stack direction={"row"} gap={0.8} alignItems={"center"} pb={2}>
            <ImDiamonds />
            <Typography fontSize={15}>{`${data?.balance || 0} ETH`}</Typography>
          </Stack>
          <Typography color="gray" fontSize={15}>
            Nonce
          </Typography>
          <Typography fontSize={15}>{data?.nonce || 0}</Typography>
        </Paper>
        <Paper
          sx={{
            height: "90%",
            width: "30%",
            minWidth: 300,
            padding: 2,
            gap: 1,
            boxShadow: 4,
            borderRadius: 3,
            transition: "0.3s",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: 6,
            },
          }}
        >
          <Typography pb={3} fontWeight={"bold"} fontSize={16}>
            Thêm thông tin
          </Typography>
          <Typography color="gray" fontSize={15}>
            GIAO DỊCH ĐƯỢC GỬI
          </Typography>
          <Stack direction={"row"} gap={0.8} alignItems={"center"} pb={2}>
            <Typography fontSize={15} color="gray">
              {`Mới nhất:`}
            </Typography>
            <Typography
                fontSize={15}
                sx={{ cursor: "pointer", '&:hover':{color:'#0784c3'}}}
                onClick={() => {
                  navigate(`/tx/${rows[0]?.hash}`);
                }}
              >
                {rows[0]?.age}
              </Typography>
            <Typography fontSize={15} color="gray" pl={3}>
              {`Đầu tiên:`}
            </Typography>
            <Typography
                fontSize={15}
                sx={{ cursor: "pointer", '&:hover':{color:'#0784c3'}}}
                onClick={() => {
                  navigate(`/tx/${rows[rows.length - 1]?.hash}`);
                }}
              >
                {rows[rows.length - 1]?.age}
              </Typography>
          </Stack>
          <Typography color="gray" fontSize={15}>
            ĐƯỢC TÀI TRỢ BỞI
          </Typography>
          {rows.length > 0 ? (
            <Stack direction={"row"} gap={1} alignItems={"center"}>
              <Typography
                color="#0784c3"
                fontSize={15}
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  navigate(`/address/${rows[rows.length - 1]?.from}`);
                }}
              >
                {`${rows[rows?.length - 1]?.from.slice(0, 10)}...${rows[
                  rows?.length - 1
                ]?.from.slice(-10)}`}
              </Typography>
              <Typography fontSize={20} color="lightgray">
                |
              </Typography>
              <Typography
                color="#0784c3"
                fontSize={15}
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  navigate(`/tx/${rows[rows.length - 1]?.hash}`);
                }}
              >
                {rows[rows.length - 1]?.age}
              </Typography>
            </Stack>
          ) : (
            "0"
          )}
        </Paper>
        <Paper
          sx={{
            height: "90%",
            width: "30%",
            minWidth: 300,
            padding: 2,
            gap: 1,
            boxShadow: 4,
            borderRadius: 3,
            transition: "0.3s",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: 6,
            },
          }}
        >
          <Typography pb={3} fontWeight={"bold"} fontSize={16}>
            Biểu đồ luồng giao dịch
          </Typography>
          <Typography color="gray" fontSize={15}>
            SỐ LƯỢNG GIAO DỊCH
          </Typography>
          <Stack direction={"row"} gap={0.8} alignItems={"center"} pb={2}>
            <Typography
              fontSize={15}
            >{txs?.length}</Typography>
          </Stack>
          <Typography color="gray" fontSize={15}>
            CHI TIẾT BIỂU ĐỒ
          </Typography>
          <Stack
                    direction={"row"}
                    gap={1}
                    sx={{ cursor: "pointer" }}
                    alignItems={"center"}
                    onClick={() => {
                      navigate(`/tx-graph/${address}`);
                    }}
                  >
                    <Typography variant="body2" fontSize={15} color="#0784c3">
                      Xem thêm chi tiết
                    </Typography>
                    <PiArrowUpRightBold style={{ color: "#0784c3" }} />
                  </Stack>
        </Paper>
      </Stack>
      <Stack flex={10}>
        <Stack flex={1} direction={"row"} gap={2} py={2}>
          <Button
            variant="outlined"
            sx={{ width: 120, borderRadius: 10, boxShadow: 3 }}
          >
            Giao dịch
          </Button>
          <Button
            variant="outlined"
            sx={{ width: 120, borderRadius: 10, boxShadow: 3 }}
          >
            Token
          </Button>
        </Stack>
        <Stack flex={9}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
            // checkboxSelection
            disableRowSelectionOnClick
            disableSelectionOnClick
            sx={{
              boxShadow: 1,
              borderRadius: 3,
              "& .MuiDataGrid-cell:focus": {
                outline: "none",
              },
              "& .MuiDataGrid-row:focus": {
                outline: "none",
              },
              "& .MuiDataGrid-row:focus-within": {
                outline: "none",
              },
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Address;
