import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { FaBox, FaBell, FaClipboardList } from "react-icons/fa";

import {
  Container,
  Content,
  CardGrid,
  Card,
  CardLabel,
  CardValue,
  ChartContainer,
  CardIcon,
  CardPercentage,
  CardLabelAndIcon,
  CardValueAndPercentage,
} from "./Painel.styles";

import { Bar } from "react-chartjs-2"; // Importando o gráfico de barras
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Registrando os componentes do Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Painel() {
  const [, setPlanejado] = useState(0);
  const [distribuidos, setDistribuidos] = useState(0);
  const [disponiveis, setDisponiveis] = useState(0);
  const [totalPessoas, setTotalPessoas] = useState(0);
  const [barraData, setBarraData] = useState<number[]>([0, 0, 0, 0]); // Dados para o gráfico do Circuito Barra
  const [campoGrandeData, setCampoGrandeData] = useState<number[]>([
    0, 0, 0, 0,
  ]); // Dados para o gráfico do Circuito Campo Grande

  // Hook de efeito para buscar dados
  useEffect(() => {
    buscarDados();
  }, []);

  // Função para buscar dados do Supabase
  const buscarDados = async () => {
    // Total planejado
    const { data: planejadoData } = await supabase
      .from("abadas_planejamento")
      .select("quantidade_total");

    if (planejadoData) {
      const total = planejadoData.reduce(
        (acc, curr) => acc + (curr.quantidade_total || 0),
        0
      );
      setPlanejado(total);
    }

    // Total distribuídos
    const { count: countDistribuidos } = await supabase
      .from("abadas_distribuidos")
      .select("*", { count: "exact", head: true });

    if (typeof countDistribuidos === "number") {
      setDistribuidos(countDistribuidos);
    }

    // Total disponíveis
    const { data: disponiveisData } = await supabase
      .from("abadas_planejamento")
      .select("quantidade_disponivel");

    if (disponiveisData) {
      const total = disponiveisData.reduce(
        (acc, curr) => acc + (curr.quantidade_disponivel || 0),
        0
      );
      setDisponiveis(total);
    }

    // Total pessoas
    const { count: countPessoas } = await supabase
      .from("pessoas")
      .select("*", { count: "exact", head: true });

    if (typeof countPessoas === "number") {
      setTotalPessoas(countPessoas);
    }

    // Dados para o gráfico do circuito Barra e Campo Grande
    const barraDistribuidos = [45, 68, 39, 51, 45, 52]; // Exemplo de dados
    const campoGrandeDistribuidos = [30, 55, 40, 60]; // Exemplo de dados

    setBarraData(barraDistribuidos); // Definir dados para o Barra
    setCampoGrandeData(campoGrandeDistribuidos); // Definir dados para o Campo Grande
  };

  return (
    <Container>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Header />
        <Content>
          <CardGrid>
            {/* Card Distribuídos */}
            <Card>
              <CardLabelAndIcon>
                <CardIcon>
                  <FaBox size={24} />
                </CardIcon>
                <CardLabel>Distribuídos</CardLabel>
              </CardLabelAndIcon>
              <CardValueAndPercentage>
                <CardValue>{distribuidos}</CardValue>
                <CardPercentage percentage={-12.6}>
                  <span>-12.6%</span>
                </CardPercentage>
              </CardValueAndPercentage>
            </Card>

            {/* Card Disponíveis */}
            <Card>
              <CardLabelAndIcon>
                <CardIcon>
                  <FaClipboardList size={24} />
                </CardIcon>
                <CardLabel>Disponíveis</CardLabel>
              </CardLabelAndIcon>
              <CardValueAndPercentage>
                <CardValue>{disponiveis}</CardValue>
                <CardPercentage percentage={5.4}>
                  <span>5.4%</span>
                </CardPercentage>
              </CardValueAndPercentage>
            </Card>

            {/* Card Total de Pessoas */}
            <Card>
              <CardLabelAndIcon>
                <CardIcon>
                  <FaBell size={24} />
                </CardIcon>
                <CardLabel>Total de Pessoas</CardLabel>
              </CardLabelAndIcon>
              <CardValueAndPercentage>
                <CardValue>{totalPessoas}</CardValue>
                <CardPercentage percentage={7.2}>
                  <span>7.2%</span>
                </CardPercentage>
              </CardValueAndPercentage>
            </Card>
          </CardGrid>

          {/* Gráficos de Barra */}
          <ChartContainer>
            <h2>Distribuição por dia - Circuito Barra</h2>
            <Bar
              data={{
                labels: ["Quin", "Sex", "Sáb", "Dom", "Seg", "Ter"], // Dias da semana
                datasets: [
                  {
                    label: "Abadás Distribuídos (Barra)",
                    data: barraData, // Dados do circuito Barra
                    backgroundColor: "rgba(37,99,235,0.2)",
                    borderColor: "#2563eb",
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      color: "#6b7280",
                    },
                  },
                  x: {
                    ticks: {
                      color: "#6b7280",
                    },
                  },
                },
              }}
            />

            <h2>Distribuição por dia - Circuito Campo Grande</h2>
            <Bar
              data={{
                labels: ["Sáb", "Dom", "Seg", "Ter"], // Dias da semana
                datasets: [
                  {
                    label: "Abadás Distribuídos (Campo Grande)",
                    data: campoGrandeData, // Dados do circuito Campo Grande
                    backgroundColor: "rgba(234, 87, 45, 0.2)", // Cor diferente para o Campo Grande
                    borderColor: "#ea572d",
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      color: "#6b7280",
                    },
                  },
                  x: {
                    ticks: {
                      color: "#6b7280",
                    },
                  },
                },
              }}
            />
          </ChartContainer>
        </Content>
      </div>
    </Container>
  );
}
