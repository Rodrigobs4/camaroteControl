import { Box, Typography, Button, useTheme } from "@mui/material";
import { motion } from "framer-motion";

const Hero = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
        color: theme.palette.text.primary,
        px: 3,
      }}
    >
      <Box maxWidth="800px">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h2" fontWeight={700} gutterBottom>
            Viva o melhor do Carnaval no Espaço Folia
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Estrutura premium, atrações exclusivas, segurança e conforto para PMs e BMs da Bahia.
          </Typography>
          <Button
            variant="contained"
            size="large"
            color="primary"
            href="#ingressos"
            sx={{ mt: 3, borderRadius: 10, px: 5, py: 1.5 }}
          >
            Garanta seu lugar
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
};

export default Hero;