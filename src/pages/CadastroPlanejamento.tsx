import { useEffect, useState, useCallback } from "react";
import { supabase } from "../supabaseClient";
import {
  Table,
  Select,
  Button,
  Menu,
  Dropdown,
  Drawer,
  Form,
  Input,
  Radio,
} from "antd";
import { FaEllipsisH } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { FaPlus } from "react-icons/fa";
import { DatePicker } from "antd";

import {
  ButtonNewShirt,
  Container,
  TableWrapper,
  Title,
  ContainerFiltro,
} from "./CadastroPlanejamento.styles";

const { Option } = Select;

interface Planejado {
  id: string;
  circuito: string;
  data_evento: string;
  tamanho: string;
  quantidade_total: number;
  quantidade_disponivel: number;
}

interface Distribuido {
  id: string;
  circuito: string;
  data_evento: string;
  tamanho: string;
  quantidade_retirada: number;
  destino_interno_id?: string;
  destino_externo?: string;
  pessoas?: { nome: string };
}

// Tipagem para os valores do formulário de transferência
interface TransferFormValues {
  destino_interno_id?: string;
  destino_externo?: string;
  quantidade_retirada: string;
}

const ConsultaAbadas = () => {
  const [drawerAberto, setDrawerAberto] = useState(false);
  // eslint-disable-next-line no-empty-pattern
  const [] = Form.useForm();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmitNovoPlanejamento = async (values: any) => {
    const { circuito, data_evento, tamanho, quantidade_total } = values;
    const { error } = await supabase.from("abadas_planejamento").insert([
      {
        circuito,
        data_evento: data_evento.format("YYYY-MM-DD"),
        tamanho,
        quantidade_total: Number(quantidade_total),
        quantidade_disponivel: Number(quantidade_total),
      },
    ]);
    if (!error) {
      form.resetFields();
      setDrawerAberto(false);
      fetchPlanejados();
    } else {
      console.error("Erro ao cadastrar:", error.message);
    }
  };

  const [circuitoFiltro, setCircuitoFiltro] = useState("todos");
  const [pessoaLogadaId, setPessoaLogadaId] = useState<string | null>(null);
  const [planejados, setPlanejados] = useState<Planejado[]>([]);
  const [distribuidos, setDistribuidos] = useState<Distribuido[]>([]);
  const [drawerDetalhes, setDrawerDetalhes] = useState(false);
  const [drawerTransferir, setDrawerTransferir] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState<
    Planejado | Distribuido | null
  >(null);

  const [form] = Form.useForm();
  const [destinoTipo, setDestinoTipo] = useState<"interno" | "externo">(
    "interno"
  );
  /* const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");*/

  const fetchPlanejados = useCallback(async () => {
    let query = supabase.from("abadas_planejamento").select("*");
    if (circuitoFiltro !== "todos")
      query = query.eq("circuito", circuitoFiltro);
    const { data } = await query;
    setPlanejados(data || []);
  }, [circuitoFiltro]);

  const fetchDistribuidos = useCallback(async () => {
    let query = supabase
      .from("abadas_distribuidos")
      .select("*, pessoas:destino_interno_id(nome)");
    if (circuitoFiltro !== "todos")
      query = query.eq("circuito", circuitoFiltro);
    const { data } = await query;
    setDistribuidos(data || []);
  }, [circuitoFiltro]);

  const [pessoas, setPessoas] = useState<{ id: string; nome: string }[]>([]);

  const fetchPessoas = async () => {
    const { data, error } = await supabase.from("pessoas").select("id, nome"); // apenas os campos que precisamos
    if (!error) {
      setPessoas(data || []);
    } else {
      console.error("Erro ao buscar pessoas:", error.message);
    }
  };

  useEffect(() => {
    const fetchPessoaLogada = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const authUserId = session?.user?.id;

      if (authUserId) {
        const { data, error } = await supabase
          .from("pessoas")
          .select("id")
          .eq("auth_user_id", authUserId)
          .single();

        if (!error && data) {
          setPessoaLogadaId(data.id);
        } else {
          console.error("Erro ao buscar pessoa logada:", error?.message);
        }
      }
    };

    fetchPessoaLogada();
  }, []);

  useEffect(() => {
    fetchPlanejados();
    const fetchUsuarios = async () => {
      const { data } = await supabase.from("pessoas").select("id, nome");
      if (data) setPessoas(data); // agora salva no estado correto
    };
    fetchUsuarios();
    fetchDistribuidos();
    fetchPessoas();
  }, [fetchPlanejados, fetchDistribuidos]);

  const columnsPlanejados = [
    { title: "Circuito", dataIndex: "circuito" },
    {
      title: "Data",
      dataIndex: "data_evento",
      render: (text: string) => new Date(text).toLocaleDateString(),
    },
    { title: "Tamanho", dataIndex: "tamanho" },
    { title: "Total", dataIndex: "quantidade_total" },
    { title: "Disponível", dataIndex: "quantidade_disponivel" },
    {
      title: "Ações",
      render: (_: unknown, record: Planejado) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                onClick={() => {
                  setItemSelecionado(record);
                  setDrawerTransferir(true);
                  form.resetFields();
                }}
              >
                Transferir Camisas
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  setItemSelecionado(record);
                  setDrawerDetalhes(true);
                }}
              >
                Ver Detalhes
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button type="text" icon={<FaEllipsisH />} />
        </Dropdown>
      ),
    },
  ];

  const columnsDistribuidos = [
    { title: "Circuito", dataIndex: "circuito" },
    {
      title: "Data",
      dataIndex: "data_evento",
      render: (text: string) => new Date(text).toLocaleDateString(),
    },
    { title: "Tamanho", dataIndex: "tamanho" },
    { title: "Retirado", dataIndex: "quantidade_retirada" },
    {
      title: "Destino",
      render: (record: Distribuido) =>
        record.destino_externo || record.pessoas?.nome || "-",
    },
    {
      title: "Ações",
      render: (_: unknown, record: Distribuido) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                onClick={() => {
                  setItemSelecionado(record);
                  setDrawerDetalhes(true);
                }}
              >
                Ver Detalhes
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button type="text" icon={<FaEllipsisH />} />
        </Dropdown>
      ),
    },
  ];

  const handleTransfer = async (values: TransferFormValues) => {
    const transferidor_id = pessoaLogadaId;

    if (!transferidor_id || !itemSelecionado) return;

    const quantidade = Number(values.quantidade_retirada);

    const insertData = {
      destino_interno_id:
        destinoTipo === "interno" ? values.destino_interno_id : null,
      destino_externo:
        destinoTipo === "externo" ? values.destino_externo : null,
      transferidor_id,
      circuito: itemSelecionado.circuito,
      data_evento: itemSelecionado.data_evento,
      tamanho: itemSelecionado.tamanho,
      quantidade_retirada: Number(values.quantidade_retirada),
    };

    await supabase.from("abadas_distribuidos").insert([insertData]);

    if ("quantidade_disponivel" in itemSelecionado) {
      await supabase
        .from("abadas_planejamento")
        .update({
          quantidade_disponivel:
            (itemSelecionado as Planejado).quantidade_disponivel - quantidade,
        })
        .eq("id", itemSelecionado.id);
    }

    setDrawerTransferir(false);
    fetchPlanejados();
    fetchDistribuidos();
  };

  return (
    <Container>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Header />
        <Title>Controle de camisas</Title>

        {/* Filtro */}
        <ContainerFiltro>
          <div>
            <label style={{ marginRight: 10 }}>Circuito:</label>
            <Select
              value={circuitoFiltro}
              onChange={setCircuitoFiltro}
              style={{ width: 200 }}
            >
              <Option value="todos">Todos</Option>
              <Option value="Barra">Barra</Option>
              <Option value="Campo Grande">Campo Grande</Option>
            </Select>
          </div>

          <ButtonNewShirt onClick={() => setDrawerAberto(true)}>
            <FaPlus style={{ marginRight: "8px" }} />
            Adicionar Camisas
          </ButtonNewShirt>
        </ContainerFiltro>

        <TableWrapper>
          <h2>Em estoque</h2>
          <Table
            columns={columnsPlanejados}
            dataSource={planejados}
            rowKey="id"
            pagination={false}
          />
        </TableWrapper>

        <TableWrapper>
          <h2>Distribuídos</h2>
          <Table
            columns={columnsDistribuidos}
            dataSource={distribuidos}
            rowKey="id"
            pagination={false}
          />
        </TableWrapper>

        {/* Drawer de Detalhes */}
        <Drawer
          title="Detalhes"
          open={drawerDetalhes}
          onClose={() => setDrawerDetalhes(false)}
          width={400}
        >
          {itemSelecionado && (
            <div>
              <p>
                <strong>Circuito:</strong> {itemSelecionado.circuito}
              </p>
              <p>
                <strong>Data:</strong>{" "}
                {new Date(itemSelecionado.data_evento).toLocaleDateString()}
              </p>
              <p>
                <strong>Tamanho:</strong> {itemSelecionado.tamanho}
              </p>
              {"quantidade_total" in itemSelecionado ? (
                <>
                  <p>
                    <strong>Total:</strong> {itemSelecionado.quantidade_total}
                  </p>
                  <p>
                    <strong>Disponível:</strong>{" "}
                    {itemSelecionado.quantidade_disponivel}
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>Retirada:</strong>{" "}
                    {itemSelecionado.quantidade_retirada}
                  </p>
                  <p>
                    <strong>Destino:</strong>{" "}
                    {itemSelecionado.destino_externo ||
                      itemSelecionado.pessoas?.nome ||
                      "-"}
                  </p>
                </>
              )}
            </div>
          )}
        </Drawer>

        {/* Drawer de Transferência */}
        <Drawer
          title="Transferir Camisas"
          open={drawerTransferir}
          onClose={() => setDrawerTransferir(false)}
          width={400}
        >
          <Form layout="vertical" form={form} onFinish={handleTransfer}>
            {/* Seletor de tipo de destino */}
            <Form.Item label="Tipo de Destino">
              <Radio.Group
                onChange={(e) => setDestinoTipo(e.target.value)}
                value={destinoTipo}
              >
                <Radio value="interno">Interno</Radio>
                <Radio value="externo">Externo</Radio>
              </Radio.Group>
            </Form.Item>

            {/* Campo para destino interno */}
            {destinoTipo === "interno" && (
              <Form.Item
                label="Destino Interno"
                name="destino_interno_id"
                rules={[{ required: true, message: "Selecione um usuário" }]}
              >
                <Select placeholder="Selecione uma pessoa">
                  {pessoas.map((usuario: { id: string; nome: string }) => (
                    <Select.Option key={usuario.id} value={usuario.id}>
                      {usuario.nome}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            )}

            {/* Campo para destino externo */}
            {destinoTipo === "externo" && (
              <Form.Item
                name="destino_externo"
                label="Destino Externo"
                rules={[
                  { required: true, message: "Informe o destino externo" },
                ]}
              >
                <Input />
              </Form.Item>
            )}

            {/* Campo de quantidade */}
            <Form.Item
              name="quantidade_retirada"
              label="Quantidade"
              rules={[{ required: true, message: "Informe a quantidade" }]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Confirmar Transferência
              </Button>
            </Form.Item>
          </Form>
        </Drawer>

        <Drawer
          title="Cadastrar Planejamento"
          placement="right"
          width={400}
          onClose={() => setDrawerAberto(false)}
          visible={drawerAberto}
        >
          <Form
            layout="vertical"
            form={form}
            onFinish={handleSubmitNovoPlanejamento}
          >
            <Form.Item
              label="Circuito"
              name="circuito"
              rules={[{ required: true, message: "Selecione o circuito!" }]}
            >
              <Select placeholder="Selecione">
                <Option value="Barra">Barra</Option>
                <Option value="Campo Grande">Campo Grande</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Data do Evento"
              name="data_evento"
              rules={[{ required: true, message: "Informe a data do evento!" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="Tamanho"
              name="tamanho"
              rules={[{ required: true, message: "Selecione o tamanho!" }]}
            >
              <Select placeholder="Selecione">
                <Option value="P">P</Option>
                <Option value="M">M</Option>
                <Option value="G">G</Option>
                <Option value="GG">GG</Option>
                <Option value="XG">XG</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Quantidade Total"
              name="quantidade_total"
              rules={[{ required: true, message: "Informe a quantidade!" }]}
            >
              <Input type="number" min={1} />
            </Form.Item>

            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Cadastrar
            </Button>
          </Form>
        </Drawer>
      </div>
    </Container>
  );
};

export default ConsultaAbadas;
