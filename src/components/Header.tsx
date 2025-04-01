import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import {
  HeaderContainer,
  NavLinks,
  NavLink,
  IconsRight,
  ProfileInfo,
} from "./Header.styles";

import { FaUserCircle, FaCog, FaBell } from "react-icons/fa";

export default function Header() {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento

  useEffect(() => {
    const fetchUserData = async () => {
      // Pega o auth_user_id do usuário logado
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Erro ao obter usuário:", error);
        setLoading(false);
        return;
      }

      if (user && user.id) {
        // Consulta na tabela pessoas usando o auth_user_id
        const { data, error: pessoaError } = await supabase
          .from("pessoas")
          .select(
            "nome, posto_graduacao, instituicao, nome_guerra, tipo_usuario"
          )
          .eq("auth_user_id", user.id) // Agora conseguimos acessar user.id sem problemas
          .single();

        if (pessoaError) {
          console.error(
            "Erro ao buscar dados do usuário na tabela pessoas:",
            pessoaError
          );
        } else {
          setNomeUsuario(
            `${data?.posto_graduacao} ${data?.instituicao} ${
              data?.nome_guerra || "Usuário"
            }`
          );

          setTipoUsuario(`${data?.tipo_usuario}`);
        }
      } else {
        console.error("Usuário não logado ou sem auth_user_id.");
      }

      setLoading(false);
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Carregando...</div>; // Exibe enquanto o nome não é carregado
  }

  return (
    <HeaderContainer>
      <NavLinks>
        <NavLink href="#">Camisas</NavLink>
        <NavLink href="#">Sorteio</NavLink>
        <NavLink href="#">Site</NavLink>
      </NavLinks>

      <IconsRight>
        <FaUserCircle size={18} />
        <FaCog size={18} />
        <FaBell size={18} />
        <ProfileInfo>
          {nomeUsuario} {/* Aqui você mostra o nome do usuário */}
          <span>{tipoUsuario}</span>{" "}
          {/* Substitua por dados dinâmicos, se necessário */}
        </ProfileInfo>
      </IconsRight>
    </HeaderContainer>
  );
}
