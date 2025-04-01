// LandingPage.tsx
import { useState } from "react";
import {
  Container,
  Header,
  Logo,
  Hero,
  HeroText,
  HeroButton,
  Section,
  SectionTitle,
  SectionContent,
  LineupGrid,
  ArtistCard,
  GalleryGrid,
  GalleryImage,
  Footer,
  SliderContainer,
  SlideImage,
} from "./LandingPage.styles";

const images = [
  "https://source.unsplash.com/random/1200x500?carnaval",
  "https://source.unsplash.com/random/1200x500?music",
  "https://source.unsplash.com/random/1200x500?party",
];

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Container>
      <Header>
        <Logo>
          <img
            src="https://cvagxxiofiuctyxrtstg.supabase.co/storage/v1/object/public/logomarcas//logo-camarote-control-verde-s-nome.png"
            alt="Logo"
          />
          <span>Espaço Folia</span>
        </Logo>
        <HeroButton
          onClick={() => window.open("https://linkdecadastro.com", "_blank")}
        >
          Ingressos
        </HeroButton>
      </Header>

      <SliderContainer>
        <SlideImage src={images[currentSlide]} alt="Slide" />
        <HeroButton
          onClick={prevSlide}
          style={{ position: "absolute", left: 20, top: "50%" }}
        >
          ❮
        </HeroButton>
        <HeroButton
          onClick={nextSlide}
          style={{ position: "absolute", right: 20, top: "50%" }}
        >
          ❯
        </HeroButton>
      </SliderContainer>

      <Hero>
        <HeroText>
          <h1>O melhor do Carnaval no Espaço Folia</h1>
          <p>Conforto, segurança e muita diversão para PMs e BMs da Bahia!</p>
        </HeroText>
      </Hero>

      <Section>
        <SectionTitle>Sobre o Espaço</SectionTitle>
        <SectionContent>
          O Espaço Folia é o camarote exclusivo da Polícia Militar e Bombeiros
          da Bahia no Carnaval de Salvador. Estrutura premium, open bar,
          segurança, atrações incríveis, vista privilegiada e muito mais.
        </SectionContent>
      </Section>

      <Section>
        <SectionTitle>Line-up</SectionTitle>
        <LineupGrid>
          <ArtistCard>Parangolé</ArtistCard>
          <ArtistCard>La Fúria</ArtistCard>
          <ArtistCard>Psirico</ArtistCard>
          <ArtistCard>Igor Kannário</ArtistCard>
          <ArtistCard>Timbalada</ArtistCard>
          <ArtistCard>Filhos de Jorge</ArtistCard>
        </LineupGrid>
      </Section>

      <Section>
        <SectionTitle>Galeria</SectionTitle>
        <GalleryGrid>
          <GalleryImage
            src="https://source.unsplash.com/random/300x200?carnaval"
            alt="Galeria 1"
          />
          <GalleryImage
            src="https://source.unsplash.com/random/300x200?music"
            alt="Galeria 2"
          />
          <GalleryImage
            src="https://source.unsplash.com/random/300x200?party"
            alt="Galeria 3"
          />
          <GalleryImage
            src="https://source.unsplash.com/random/300x200?crowd"
            alt="Galeria 4"
          />
          <GalleryImage
            src="https://source.unsplash.com/random/300x200?drinks"
            alt="Galeria 5"
          />
          <GalleryImage
            src="https://source.unsplash.com/random/300x200?stage"
            alt="Galeria 6"
          />
        </GalleryGrid>
      </Section>

      <Section>
        <SectionTitle>Localização</SectionTitle>
        <SectionContent>
          Nosso camarote está localizado no circuito Barra-Ondina, com acesso
          exclusivo e estratégico para garantir conforto e segurança.
        </SectionContent>
        <img
          src="https://source.unsplash.com/random/600x300?map"
          alt="Mapa"
          style={{ width: "100%", borderRadius: 12, marginTop: 16 }}
        />
      </Section>

      <Section>
        <SectionTitle>Perguntas Frequentes</SectionTitle>
        <SectionContent>
          <p>
            <strong>Quem pode participar?</strong> Exclusivo para PMs, BMs da
            Bahia e seus convidados.
          </p>
          <p>
            <strong>Como retiro meu abadá?</strong> Através do nosso sistema de
            controle online, fácil e prático.
          </p>
          <p>
            <strong>Tem alimentação e bebida inclusas?</strong> Sim! Open bar e
            buffet liberado durante todo o evento.
          </p>
          <p>
            <strong>Há estacionamento?</strong> Sim, com acesso controlado e
            segurança reforçada.
          </p>
        </SectionContent>
      </Section>

      <Footer>
        <p>
          © {new Date().getFullYear()} Espaço Folia. Todos os direitos
          reservados.
        </p>
      </Footer>
    </Container>
  );
};

export default LandingPage;
