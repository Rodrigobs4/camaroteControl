import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar
      position="sticky"
      sx={{
        background: theme.palette.background.paper,
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${theme.palette.divider}`,
        boxShadow: `0 0 12px ${theme.palette.primary.main}33`, // leve sombra do primary
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <img
              src="https://cvagxxiofiuctyxrtstg.supabase.co/storage/v1/object/public/logomarcas/logo-camarote-control-verde-s-nome.png"
              alt="Logo"
              height={40}
            />
            <Typography variant="h6" fontWeight="bold" color="text.primary">
              Espaço Folia
            </Typography>
          </Box>
        </motion.div>

        {isMobile ? (
          <IconButton edge="end" color="inherit">
            <MenuIcon />
          </IconButton>
        ) : (
          <Box display="flex" gap={2}>
            <Button color="inherit">Sobre</Button>
            <Button color="inherit">Line-up</Button>
            <Button color="inherit">Galeria</Button>
            <Button
              variant="contained"
              color="secondary"
              href="#ingressos"
              sx={{ fontWeight: 600 }}
            >
              Ingressos
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
