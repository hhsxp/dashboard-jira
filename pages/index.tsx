
import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "../components/ui/table";

const dadosProjetos = [
  {
    "Projeto": "SEB - Suporte",
    "tickets": 200,
    "melhorias": 64,
    "violacoes": 7,
    "violados": 57,
    "percentual_violado": 62.64
  },
  {
    "Projeto": "Continental - Suporte",
    "tickets": 127,
    "melhorias": 67,
    "violacoes": 6,
    "violados": 16,
    "percentual_violado": 34.78
  },
  {
    "Projeto": "Galvani - Suporte",
    "tickets": 125,
    "melhorias": 38,
    "violacoes": 12,
    "violados": 29,
    "percentual_violado": 39.19
  },
  {
    "Projeto": "Croda - Suporte - PIP489",
    "tickets": 115,
    "melhorias": 12,
    "violacoes": 5,
    "violados": 75,
    "percentual_violado": 80.65
  },
  {
    "Projeto": "Yara - Suporte",
    "tickets": 75,
    "melhorias": 22,
    "violacoes": 14,
    "violados": 39,
    "percentual_violado": 72.22
  }
];

export default function DashboardJira() {
  const [abaAtiva, setAbaAtiva] = useState("geral");

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Dashboard Jira - Dados Reais</h1>
      <Tabs defaultValue="geral">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="geral" onClick={() => setAbaAtiva("geral")}>Consolidado</TabsTrigger>
          <TabsTrigger value="projeto" onClick={() => setAbaAtiva("projeto")}>Por Projeto</TabsTrigger>
          <TabsTrigger value="tribo" onClick={() => setAbaAtiva("tribo")}>Por Tribo</TabsTrigger>
          <TabsTrigger value="itens" onClick={() => setAbaAtiva("itens")}>Chamados</TabsTrigger>
        </TabsList>

        <TabsContent value="geral">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-4">Tickets x Melhorias</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dadosProjetos}>
                  <XAxis dataKey="Projeto" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="tickets" fill="#8884d8" />
                  <Bar dataKey="melhorias" fill="#82ca9d" />
                  <Bar dataKey="violados" fill="#ff6961" name="SLA Violado" />
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
                  <XAxis dataKey="Projeto" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="percentual_violado" fill="#ff6961" name="% SLA Violado" />
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
                    <TableCell>Projeto</TableCell>
                    <TableCell>Tickets</TableCell>
                    <TableCell>Melhorias</TableCell>
                    <TableCell>Violados</TableCell>
                    <TableCell>% SLA Violado</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dadosProjetos.map((item) => (
                    <TableRow key={item.Projeto} className={item.percentual_violado > 50 ? "bg-red-100" : ""}>
                      <TableCell>{item.Projeto}</TableCell>
                      <TableCell>{item.tickets}</TableCell>
                      <TableCell>{item.melhorias}</TableCell>
                      <TableCell>{item.violados}</TableCell>
                      <TableCell>{item.percentual_violado}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tribo">
          <Card><CardContent className="p-4">[Em construção]</CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
