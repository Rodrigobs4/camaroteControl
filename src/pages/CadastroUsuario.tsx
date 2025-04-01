/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { FaUserPlus } from "react-icons/fa";
import { Table, Drawer, Form, Input, Select, Checkbox } from "antd";
import {
  Container,
  Title,
  TableWrapper,
  ButtonSubmit,
  Error,
  Success,
  ButtonNewUser,
} from "./CadastroUsuario.styles";
import LoadingModal from "../components/LoadingModal"; // Importando o componente de Modal

const { Option } = Select;

interface Usuario {
  id: string;
  nome: string;
  nome_guerra: string;
  cpf: string;
  email: string;
  tipo_usuario: string;
  status: string;
  auth_user_id: string | null;
  posto_graduacao: string;
  instituicao: string;
  telefone: string;
  cadastrado_na_plataforma: boolean;
}

interface FormValues {
  nome: string;
  nomeGuerra: string;
  cpf: string;
  telefone: string;
  email: string;
  senha: string;
  tipoUsuario: string;
  posto: string;
  instituicao: string;
  cadastrado_na_plataforma: boolean;
}

const columns = [
  {
    title: "Identificação",
    key: "posto_instituicao_nomeGuerra",
    render: (_text: string, record: Usuario) => {
      const posto = record.posto_graduacao || "";
      const instituicao = record.instituicao || "";
      const nomeGuerra = record.nome_guerra || "";
      return `${posto} ${instituicao} ${nomeGuerra}`;
    },
  },
  {
    title: "CPF",
    dataIndex: "cpf",
    key: "cpf",
  },
  {
    title: "Telefone",
    dataIndex: "telefone",
    key: "telefone",
  },
  {
    title: "Tipo de Usuário",
    dataIndex: "tipo_usuario",
    key: "tipo_usuario",
  },
  {
    title: "Policial Militar",
    dataIndex: "cadastrado_na_plataforma",
    key: "cadastrado_na_plataforma",
    render: (value: boolean) => (value ? "Sim" : "Não"),
  },
];

const CadastroUsuario = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [erro, setErro] = useState<string>("");
  const [sucesso, setSucesso] = useState<string>("");
  const [form] = Form.useForm();
  const [drawerAberto, setDrawerAberto] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Inicializa como false
  const [loadingMessage] = useState<string>("");

  const fetchUsuarios = async () => {
    let query = supabase.from("pessoas").select("*");

    if (filtroTipo !== "todos") {
      query = query.eq("tipo_usuario", filtroTipo);
    }

    if (filtroStatus !== "todos") {
      query = query.eq(
        "auth_user_id",
        filtroStatus === "autenticado" ? "not.is.null" : "is.null"
      );
    }

    const { data, error } = await query;

    if (error) {
      setErro(error.message);
    } else {
      setUsuarios(data);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, [filtroTipo, filtroStatus]);

  const handleSubmit = async (values: FormValues) => {
    setErro(""); // Limpar mensagens de erro
    setSucesso(""); // Limpar mensagens de sucesso
    setIsLoading(true); // Ativando o loading

    const { data: signupData, error: signupError } = await supabase.auth.signUp(
      {
        email: values.email,
        password: values.senha,
      }
    );

    if (signupError) {
      setErro(`Erro ao criar conta: ${signupError.message}`);
      setIsLoading(false); // Desativa o loading
      return;
    }

    const userId = signupData?.user?.id;
    if (!userId) {
      setErro("Erro ao recuperar ID do usuário.");
      setIsLoading(false); // Desativa o loading
      return;
    }

    // Cadastrando a pessoa na tabela 'pessoas'
    const { error: insertError } = await supabase.from("pessoas").insert([
      {
        nome: values.nome,
        nome_guerra: values.nomeGuerra,
        cpf: values.cpf,
        telefone: values.telefone,
        email: values.email,
        tipo_usuario: values.tipoUsuario,
        posto_graduacao: values.posto,
        instituicao: values.instituicao,
        auth_user_id: userId,
        cadastrado_na_plataforma: values.cadastrado_na_plataforma,
      },
    ]);

    if (insertError) {
      setErro(`Erro ao salvar os dados: ${insertError.message}`);
    } else {
      setSucesso("Usuário cadastrado com sucesso!");
      setDrawerAberto(false);
      form.resetFields();
      // Dá um refresh na página
      window.location.reload();
    }
    setIsLoading(false); // Desativa o loading
  };

  return (
    <Container>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Header />
        <Title>Gerenciar Usuários</Title>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <label style={{ marginRight: "10px" }}>
              Filtrar Tipo de Usuário:
            </label>
            <Select
              value={filtroTipo}
              onChange={setFiltroTipo}
              style={{ width: 200, marginRight: "1rem" }}
            >
              <Option value="todos">Todos</Option>
              <Option value="admin">Admin</Option>
              <Option value="policial_ativa">Policial Ativa</Option>
              <Option value="policial_reserva">Policial Reserva</Option>
              <Option value="convidado">Convidado</Option>
            </Select>

            <label style={{ marginRight: "10px" }}>Filtrar Status:</label>
            <Select
              value={filtroStatus}
              onChange={setFiltroStatus}
              style={{ width: 200 }}
            >
              <Option value="todos">Todos</Option>
              <Option value="autenticado">Autenticado</Option>
              <Option value="publico">Público</Option>
            </Select>
          </div>

          <ButtonNewUser
            onClick={() => setDrawerAberto(true)}
            style={{ marginLeft: "20px" }}
          >
            <FaUserPlus style={{ marginRight: "8px" }} /> Novo Usuário
          </ButtonNewUser>
        </div>

        <TableWrapper>
          <Table columns={columns} dataSource={usuarios} rowKey="id" />
        </TableWrapper>

        <Drawer
          title="Cadastrar Usuário"
          placement="right"
          width={400}
          onClose={() => setDrawerAberto(false)}
          visible={drawerAberto}
        >
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            {erro && <Error>{erro}</Error>}
            {sucesso && <Success>{sucesso}</Success>}

            <Form.Item
              label=""
              name="cadastrado_na_plataforma"
              valuePropName="checked"
              initialValue={false}
            >
              <Checkbox>Usuário Externo</Checkbox>
            </Form.Item>

            <Form.Item
              label="Nome"
              name="nome"
              rules={[{ required: true, message: "Por favor, insira o nome!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Nome de Guerra"
              name="nomeGuerra"
              rules={[
                {
                  required: true,
                  message: "Por favor, insira o nome de guerra!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="CPF"
              name="cpf"
              rules={[{ required: true, message: "Por favor, insira o CPF!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Por favor, insira o email!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Senha"
              name="senha"
              rules={[
                { required: true, message: "Por favor, insira a senha!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Telefone"
              name="telefone"
              rules={[
                { required: true, message: "Por favor, insira o telefone!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Tipo de Usuário"
              name="tipoUsuario"
              rules={[
                {
                  required: true,
                  message: "Por favor, selecione o tipo de usuário!",
                },
              ]}
            >
              <Select placeholder="Selecione o tipo de usuário">
                <Option value="admin">Admin</Option>
                <Option value="policial_ativa">Policial Ativa</Option>
                <Option value="policial_reserva">Policial Reserva</Option>
                <Option value="convidado">Convidado</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Posto / Graduação"
              name="posto"
              rules={[
                {
                  required: true,
                  message: "Por favor, selecione o posto/graduação!",
                },
              ]}
            >
              <Select placeholder="Selecione o posto/graduação">
                <Option value="SD">SD</Option>
                <Option value="CB">CB</Option>
                <Option value="3SG">3SG</Option>
                <Option value="2SG">2SG</Option>
                <Option value="1SG">1SG</Option>
                <Option value="ST">ST</Option>
                <Option value="ASP">ASP</Option>
                <Option value="2TEN">2TEN</Option>
                <Option value="1TEN">1TEN</Option>
                <Option value="CAP">CAP</Option>
                <Option value="MAJ">MAJ</Option>
                <Option value="TC">TC</Option>
                <Option value="CEL">CEL</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Instituição"
              name="instituicao"
              rules={[
                {
                  required: true,
                  message: "Por favor, selecione a instituição!",
                },
              ]}
            >
              <Select placeholder="Selecione a instituição">
                <Option value="PM">PM</Option>
                <Option value="BM">BM</Option>
              </Select>
            </Form.Item>

            <ButtonSubmit type="submit">Cadastrar</ButtonSubmit>
          </Form>
        </Drawer>

        {/* Modal de Carregamento */}
        <LoadingModal visible={isLoading} title={loadingMessage} />
      </div>
    </Container>
  );
};

export default CadastroUsuario;
