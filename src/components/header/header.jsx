import { Box, Typography, Stack, Button } from "@mui/material";
import logo from "../../assets/blockchain.png";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate()
  return (
    <Box>
      <Typography
        sx={{
          width: "100%",
          display: "flex",
          borderBottom: "1px solid lightgray",
          pb: 0.5,
          color: "gray",
          fontWeight: 500,
          fontSize: 13,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Một ví, một click – Lịch sử phơi bày, dòng tiền hiện hình.
      </Typography>
      <Box
        sx={{
          height: "64px",
          overflow: "hidden",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pl: 2,
          pr: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }} onClick={() => { navigate('/') }}>
          <Box
            component={"img"}
            src={logo}
            sx={{ width: 40, height: 40, cursor: "pointer" }}
          />
          <Typography
            sx={{ fontSize: 26, fontWeight: "bold", cursor: "pointer" }}
            onClick={() => { navigate('/') }}
          >
            TraceX
          </Typography>
          <Typography>(Mạng thử nghiệm Sepolia)</Typography>
        </Box>
        {/* Navigation */}
        <Stack direction="row" spacing={3} alignItems="center">
          {["Trang chủ", "Giới thiệu", "Bài viết"].map((item) => (
            <Typography
              key={item}
              sx={{
                fontSize: 15,
                fontWeight: 500,
                cursor: "pointer",
                color: "text.primary",
                transition: "0.3s",
                "&:hover": {
                  color: "#1976d2",
                  transform: "translateY(-1px)",
                },
              }}
            >
              {item}
            </Typography>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default Header;
