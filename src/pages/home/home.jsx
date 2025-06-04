import {
  Box,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InsightsIcon from "@mui/icons-material/Insights";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: (
      <AccountBalanceWalletIcon sx={{ fontSize: 40, color: "primary.main" }} />
    ),
    title: "Truy vết địa chỉ ví",
    desc: "Xem lịch sử giao dịch, kiểm tra dòng tiền của bất kỳ ví Ethereum nào.",
  },
  {
    icon: <TravelExploreIcon sx={{ fontSize: 40, color: "primary.main" }} />,
    title: "Khám phá giao dịch",
    desc: "Phân tích chi tiết từng giao dịch, token, smart contract trong thời gian thực.",
  },
  {
    icon: <InsightsIcon sx={{ fontSize: 40, color: "primary.main" }} />,
    title: "Phân tích hành vi",
    desc: "Phát hiện ví rủi ro cao, dấu hiệu scam, whale hoặc bot thông qua dữ liệu on-chain.",
  },
];

const Home = () => {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  return (
    <Box sx={{ width: "100%", py: 5}}>
      {/* Hero Section */}
      <Stack spacing={3} alignItems="center" textAlign="center">
        <Typography variant="h3" fontWeight="bold" color="primary">
          Trình khám phá Blockchain Ethereum
        </Typography>

        <Typography
          variant="body1"
          sx={{ color: "text.secondary", maxWidth: 600 }}
        >
          Một ví, một click – Theo dõi, truy vết, phân tích dữ liệu blockchain
          Ethereum một cách trực quan và thông minh.
        </Typography>

        <TextField
          placeholder="Tìm kiếm địa chỉ ví, giao dịch, token..."
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => { setSearch(e.target.value) }}
          sx={{
            maxWidth: 500,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 1,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        <Button variant="contained" color="primary" size="large" sx={{ mt: 1 }} onClick={() => {search===''? null:navigate(`/${search}`) }}>
          Khám phá ngay
        </Button>
      </Stack>

      {/* Feature Highlights with Flex */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        mt={8}
        justifyContent="center"
        alignItems="stretch"
        flexWrap="wrap"
      >
        {features.map((feature, index) => (
          <Box
            key={index}
            sx={{
              flex: "1 1 30%",
              minWidth: 250,
              maxWidth: 350,
              p: 3,
              m: 1,
              borderRadius: 3,
              bgcolor: "white",
              boxShadow: 3,
              textAlign: "center",
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 6,
              },
            }}
          >
            <Box>{feature.icon}</Box>
            <Typography variant="h6" fontWeight="bold" mt={2}>
              {feature.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              {feature.desc}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Home;
