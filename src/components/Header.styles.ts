import styled from "styled-components";

export const HeaderContainer = styled.header`
  height: 64px;
  background: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
`;

export const NavLinks = styled.nav`
  display: flex;
  gap: 2rem;
`;

export const NavLink = styled.a`
  font-size: 0.95rem;
  font-weight: 500;
  color: #4b5563;
  text-decoration: none;

  &:hover {
    color: #2563eb;
  }
`;

export const IconsRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  color: #374151;
`;

export const ProfileInfo = styled.div`
  text-align: right;
  font-size: 0.85rem;
  font-weight: 500;

  span {
    display: block;
    font-size: 0.7rem;
    color: #6b7280;
  }
`;
