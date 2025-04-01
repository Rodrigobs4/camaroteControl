import { useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaQuestionCircle,
  FaCog,
  FaUser,
  FaSignInAlt,
  FaUserPlus,
  FaTable,
} from "react-icons/fa";
import {
  SidebarContainer,
  Logo,
  MenuSection,
  MenuTitle,
  MenuItem,
} from "./Sidebar.styles";

export default function Sidebar() {
  const location = useLocation();

  return (
    <SidebarContainer>
      <Logo>
        <img
          src="https://cvagxxiofiuctyxrtstg.supabase.co/storage/v1/object/public/logomarcas//logo-camarote-control-verde-s-nome.png"
          alt="Logo camarote"
        />
        <span>CamaroteControl</span>
      </Logo>

      <MenuSection>
        <MenuTitle>MENU</MenuTitle>
        <MenuItem to="/painel" $active={location.pathname === "/painel"}>
          <FaTachometerAlt />
          Dashboard
        </MenuItem>
        <MenuItem
          to="/planejamento"
          $active={location.pathname === "/planejamento"}
        >
          <FaTable />
          Controle
        </MenuItem>
        <MenuItem
          to="/cadastro-usuario"
          $active={location.pathname === "/cadastro-usuario"}
        >
          <FaUserPlus />
          Usuários
        </MenuItem>
        <MenuItem to="/ajuda" $active={location.pathname === "/ajuda"}>
          <FaQuestionCircle />
          Ajuda
        </MenuItem>
        <MenuItem to="/config" $active={location.pathname === "/config"}>
          <FaCog />
          Configurações
        </MenuItem>
      </MenuSection>

      <MenuSection>
        <MenuTitle>ACCOUNT PAGES</MenuTitle>
        <MenuItem to="/perfil" $active={location.pathname === "/perfil"}>
          <FaUser />
          Perfil
        </MenuItem>
        <MenuItem to="/" $active={location.pathname === "/login"}>
          <FaSignInAlt />
          Sair
        </MenuItem>
      </MenuSection>
    </SidebarContainer>
  );
}
