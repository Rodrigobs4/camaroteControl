import { Box, Container, Typography, Link, useTheme } from "@mui/material";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
        py: 6,
        textAlign: "center",
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="md">
        <Typography variant="body2" gutterBottom>
          © {new Date().getFullYear()} Espaço Folia. Todos os direitos reservados.
        </Typography>
        <Typography variant="body2">
          Desenvolvido com ♥ por{" "}
          <Link href="https://espacofolia.com.br" target="_blank" color="secondary">
            Equipe Folia
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;