import { Box, Container, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";

const About = () => {
  const theme = useTheme();

  return (
    <Box sx={{ py: 10, backgroundColor: theme.palette.background.default }}>
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Typography variant="h4" color="primary" gutterBottom>
            Sobre o Espaço Folia
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            O Espaço Folia é o camarote oficial da Polícia Militar e do Corpo de Bombeiros da Bahia. Um ambiente planejado para oferecer o melhor do Carnaval de Salvador, com conforto, segurança, acesso exclusivo e atrações inesquecíveis.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            Pensado para quem protege, o nosso espaço celebra a cultura e o merecido lazer dos nossos heróis.
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
};

export default About;