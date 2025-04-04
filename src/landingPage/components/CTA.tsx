import { Box, Typography, Button, Container, useTheme } from "@mui/material";
import { motion } from "framer-motion";

const CTA = () => {
  const theme = useTheme();

  return (
    <Box
      id="ingressos"
      sx={{
        py: 12,
        px: 2,
        textAlign: "center",
        background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
        color: theme.palette.getContrastText(theme.palette.primary.main),
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Pronto para viver essa experiência?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Garanta seu abadá e venha curtir com a gente no camarote mais seguro e animado do Carnaval!
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            href="https://linkdecadastro.com"
            target="_blank"
            sx={{ px: 5, py: 1.5, fontSize: 18, borderRadius: 8 }}
          >
            Comprar Ingressos
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
};

export default CTA;