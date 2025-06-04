import { Box, Typography, Stack, Link } from '@mui/material';
import { SiBlockchaindotcom } from "react-icons/si";
import { FaFacebookF, FaTwitter, FaTelegramPlane } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#f4f6f8', py: 4, mt: 10, borderTop: '1px solid #ddd' }}>
      {/* Info Row */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={3}
        justifyContent="space-between"
        alignItems="center"
        sx={{ px: { xs: 2, md: 6 } }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <SiBlockchaindotcom size={24} />
          <Typography fontSize={14}>
            Website cho phép bạn truy vết, phân tích, trực quan hóa địa chỉ ví on-chain của bạn.
          </Typography>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Link href="#" underline="hover" fontSize={14} color="text.primary">
            Điều khoản & Quyền riêng tư
          </Link>
          <Link href="#" underline="hover" fontSize={14} color="text.primary">
            Liên hệ
          </Link>
          <Link href="#" underline="hover" fontSize={14} color="text.primary">
            Trạng thái mạng
          </Link>
        </Stack>
      </Stack>

      {/* Bottom Row */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ mt: 3, px: { xs: 2, md: 6 } }}
      >
        <Typography fontSize={13} color="text.secondary">
          © 2025 TraceX (Sepolia)
        </Typography>

        <Stack direction="row" spacing={2}>
          <Link href="#" color="inherit" sx={{ transition: '0.3s', '&:hover': { color: '#1976d2' } }}>
            <FaFacebookF size={18} />
          </Link>
          <Link href="#" color="inherit" sx={{ transition: '0.3s', '&:hover': { color: '#1da1f2' } }}>
            <FaTwitter size={18} />
          </Link>
          <Link href="#" color="inherit" sx={{ transition: '0.3s', '&:hover': { color: '#0088cc' } }}>
            <FaTelegramPlane size={18} />
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Footer;
