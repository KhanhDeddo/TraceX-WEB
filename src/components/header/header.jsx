import {
  Box,
  Typography,
  Stack,
  TextField,
  InputAdornment,
} from "@mui/material";
import logo from "../../assets/blockchain.png";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
const Header = () => {
  const navigate = useNavigate();
  const { address, txhash, block } = useParams();
  const [search, setSearch] = useState("");
  useEffect(()=>{setSearch("")},[address])

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
          pl: 5,
          pr: 5,
        }}
      >
        <Box
          sx={{ display: "flex", gap: 1, alignItems: "center" }}
          onClick={() => {
            navigate("/");
          }}
        >
          <Box
            component={"img"}
            src={logo}
            sx={{ width: 40, height: 40, cursor: "pointer" }}
          />
          <Typography
            sx={{ fontSize: 26, fontWeight: "bold", cursor: "pointer" }}
            onClick={() => {
              navigate("/");
            }}
          >
            TraceX
          </Typography>
          <Typography>(Mạng thử nghiệm Sepolia)</Typography>
        </Box>
        {/* Navigation */}
        <Stack
          direction="row"
          spacing={3}
          alignItems="center"
          sx={{
            ...((address || txhash || block) && { minWidth: "50%" }),
          }}
        >
          {(address || txhash || block) && (
            <TextField
              placeholder="Tìm kiếm địa chỉ ví, giao dịch, token..."
              variant="standard"
              fullWidth
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  search!=="" && navigate(`/address/${search}`);
                }
              }}
              sx={{
                maxWidth: 400,
                backgroundColor: "white",
                borderRadius: 6,
                boxShadow: 2,
                padding: 1,
                "&:hover": {
                  color: "#1976d2",
                  transform: "translateY(-1px)",
                },
              }}
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          )}
          {["Trang chủ", "Giới thiệu", "Bài viết"].map((item) => (
            <Typography
              key={item}
              onClick={() => {
                navigate("/");
              }}
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
