// LandingPage.styles.ts
import styled from "styled-components";

export const Container = styled.div`
  font-family: "Poppins", sans-serif;
  background: #fdfdfd;
  color: #333;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background-color: #004d40;
  color: white;
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    height: 40px;
  }

  span {
    font-size: 20px;
    font-weight: bold;
  }
`;

export const Hero = styled.section`
  background-color: #004d40;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px 20px;
`;

export const HeroText = styled.div`
  color: white;
  max-width: 800px;

  h1 {
    font-size: 36px;
    margin-bottom: 12px;
  }

  p {
    font-size: 18px;
  }
`;

export const HeroButton = styled.button`
  background-color: #00bfa5;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #00897b;
  }
`;

export const Section = styled.section`
  padding: 64px 32px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const SectionTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 16px;
  color: #004d40;
`;

export const SectionContent = styled.div`
  font-size: 16px;
  line-height: 1.6;
`;

export const LineupGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin-top: 16px;
`;

export const ArtistCard = styled.div`
  background-color: #e0f2f1;
  padding: 16px;
  border-radius: 12px;
  text-align: center;
  font-weight: bold;
  color: #00695c;
`;

export const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
`;

export const GalleryImage = styled.img`
  width: 100%;
  border-radius: 12px;
`;

export const Footer = styled.footer`
  background-color: #004d40;
  color: white;
  text-align: center;
  padding: 24px;
  margin-top: 64px;
`;

export const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  background-color: #ccc;
`;

export const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;
