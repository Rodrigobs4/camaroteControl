import { Box, Container, Typography, ImageList, ImageListItem, useTheme } from "@mui/material";
import { motion } from "framer-motion";

const images = [
  "https://source.unsplash.com/random/600x400?carnaval",
  "https://source.unsplash.com/random/600x400?music",
  "https://source.unsplash.com/random/600x400?party",
  "https://source.unsplash.com/random/600x400?crowd",
  "https://source.unsplash.com/random/600x400?concert",
  "https://source.unsplash.com/random/600x400?drinks",
];

const Gallery = () => {
  const theme = useTheme();

  return (
    <Box sx={{ py: 10, backgroundColor: theme.palette.background.default }}>
      <Container maxWidth="lg">
        <Typography variant="h4" color="primary" gutterBottom align="center">
          Galeria de Momentos
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
          Veja um pouco da energia e alegria que rolam no Espaço Folia.
        </Typography>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <ImageList variant="masonry" cols={3} gap={12}>
            {images.map((img, idx) => (
              <ImageListItem key={idx}>
                <img
                  src={`${img}`}
                  alt={`foto-${idx}`}
                  loading="lazy"
                  style={{ borderRadius: 12, width: "100%" }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Gallery;