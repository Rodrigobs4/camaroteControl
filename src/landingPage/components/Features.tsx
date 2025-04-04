import { Box, Container, Typography, Grid, Paper, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import CelebrationIcon from "@mui/icons-material/Celebration";
import SecurityIcon from "@mui/icons-material/Security";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import GroupsIcon from "@mui/icons-material/Groups";

const features = [
  {
    title: "Atrações Incríveis",
    icon: <CelebrationIcon fontSize="large" />,
    description: "Shows exclusivos com bandas de axé, pagode e muito mais.",
  },
  {
    title: "Segurança Reforçada",
    icon: <SecurityIcon fontSize="large" />,
    description: "Ambiente controlado com efetivo especializado e monitoramento.",
  },
  {
    title: "Open Bar Premium",
    icon: <LocalBarIcon fontSize="large" />,
    description: "Bebidas selecionadas para curtir todos os dias do Carnaval.",
  },
  {
    title: "Ambiente Familiar",
    icon: <GroupsIcon fontSize="large" />,
    description: "Conforto e estrutura para toda a família PM e BM.",
  },
];

const Features = () => {
  const theme = useTheme();

  return (
    <Box sx={{ py: 10, backgroundColor: theme.palette.background.default }}>
      <Container maxWidth="lg">
        <Typography variant="h4" color="primary" gutterBottom align="center">
          O que você encontra no Espaço Folia
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {features.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    textAlign: "center",
                    height: "100%",
                    borderRadius: 3,
                    backgroundColor: theme.palette.background.paper,
                  }}
                >
                  <Box color="primary.main" mb={1}>{item.icon}</Box>
                  <Typography variant="h6" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Features;