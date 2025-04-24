
import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "../components/ui/table";

const dadosProjetos = [
  { name: "Projeto A", tickets: 120, melhorias: 45, violacoes: 10 },
  { name: "Projeto B", tickets: 90, melhorias: 60, violacoes: 30 },
  { name: "Projeto C", tickets: 150, melhorias: 30, violacoes: 0 },
];

const dadosTribos = [
  { name: "Tribo 1", tickets: 200, violacoes: 40 },
  { name: "Tribo 2", tickets: 160, violacoes: 20 },
];

const chamados = [
  { chave: "SUPY-1821", projeto: "Yara - Suporte", prioridade: "High", resolvido: true, violou: true },
  { chave: "SUPY-1822", projeto: "Yara - Suporte", prioridade: "Highest", resolvido: false, violou: false },
  { chave: "SUPY-1823", projeto: "CN - Táxi", prioridade: "Medium", resolvido: true, violou: true },
];

export default function DashboardJira() {
  const [projetoSelecionado, setProjetoSelecionado] = useState("Todos");

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Dashboard Jira - Visão Navegável</h1>
      <Tabs defaultValue="geral" className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="geral">Consolidado</TabsTrigger>
          <TabsTrigger value="projeto">Por Projeto</TabsTrigger>
          <TabsTrigger value="tribo">Por Tribo</TabsTrigger>
          <TabsTrigger value="itens">Chamados</TabsTrigger>
        </TabsList>

        <TabsContent value="geral">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-4">Tickets x Melhorias</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dadosProjetos}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="tickets" fill="#8884d8" />
                  <Bar dataKey="melhorias" fill="#82ca9d" />
                  <Bar dataKey="violacoes" fill="#ff6961" name="SLA Violado" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projeto">
          <Card>
            <CardContent className="p-4 space-y-4">
              <h2 className="text-xl font-semibold">Violação de SLA por Projeto</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dadosProjetos}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="violacoes" fill="#ff6961" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tribo">
          <Card>
            <CardContent className="p-4 space-y-4">
              <h2 className="text-xl font-semibold">Violação de SLA por Tribo</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dadosTribos}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="violacoes" fill="#ff6961" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="itens">
          <Card>
            <CardContent className="p-4 space-y-2">
              <h2 className="text-xl font-semibold">Chamados Detalhados</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell>Chave</TableCell>
                    <TableCell>Projeto</TableCell>
                    <TableCell>Prioridade</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {chamados.map((c) => (
                    <TableRow key={c.chave} className={c.violou ? "bg-red-100" : ""}>
                      <TableCell>{c.chave}</TableCell>
                      <TableCell>{c.projeto}</TableCell>
                      <TableCell>{c.prioridade}</TableCell>
                      <TableCell>{c.violou ? "SLA Violado" : "Dentro do SLA"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
