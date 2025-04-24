
import { useState } from "react";
import * as XLSX from "xlsx";
import { format, parseISO } from "date-fns";
import { Card, CardContent } from "../components/ui/card";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "../components/ui/table";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function DashboardUpload() {
  const [data, setData] = useState<any[]>([]);
  const [filtroProjeto, setFiltroProjeto] = useState("Todos");
  const [filtroAno, setFiltroAno] = useState("Todos");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryStr = event.target?.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
    };
    reader.readAsBinaryString(file);
  };

  const projetos = Array.from(new Set(data.map((d) => d["Projeto"]))).filter(Boolean);
  const anos = Array.from(
    new Set(
      data
        .map((d) => {
          const date = d["Data de Criação"] || d["Data"];
          if (!date) return null;
          const parsed = new Date(date);
          return parsed.getFullYear();
        })
        .filter(Boolean)
    )
  ).sort();

  const dadosFiltrados = data.filter((item) => {
    const passaProjeto = filtroProjeto === "Todos" || item["Projeto"] === filtroProjeto;
    const dataCriacao = item["Data de Criação"] || item["Data"];
    const passaAno =
      filtroAno === "Todos" ||
      (dataCriacao && new Date(dataCriacao).getFullYear().toString() === filtroAno);
    return passaProjeto && passaAno;
  });

  const graficoSLA = projetos.map((projeto) => {
    const chamados = data.filter((d) => d["Projeto"] === projeto);
    const violados = chamados.filter(
      (d) => String(d["SLA"] || "").toLowerCase() === "violado"
    );
    return {
      name: projeto,
      total: chamados.length,
      violado: violados.length,
      percentual: Number(((violados.length / chamados.length) * 100).toFixed(1)),
    };
  });

  const slaGlobal =
    data.length > 0
      ? (
          (data.filter((d) => String(d["SLA"] || "").toLowerCase() === "violado").length /
            data.length) *
          100
        ).toFixed(1)
      : "0.0";

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Completo com Dados Reais</h1>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} className="mb-4" />

      {data.length > 0 && (
        <>
          <div className="flex gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Filtrar por Projeto</label>
              <select
                className="border px-2 py-1 rounded"
                value={filtroProjeto}
                onChange={(e) => setFiltroProjeto(e.target.value)}
              >
                <option value="Todos">Todos</option>
                {projetos.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Filtrar por Ano</label>
              <select
                className="border px-2 py-1 rounded"
                value={filtroAno}
                onChange={(e) => setFiltroAno(e.target.value)}
              >
                <option value="Todos">Todos</option>
                {anos.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
            </div>
          </div>

          <Card>
            <CardContent className="text-xl font-bold text-green-600">
              SLA Geral da Empresa: {slaGlobal}%
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h2 className="text-lg font-semibold mb-2">SLA por Projeto</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={graficoSLA}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" fill="#8884d8" name="Total" />
                  <Bar dataKey="violado" fill="#ff6961" name="Violado" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h2 className="text-lg font-semibold mb-2 mt-4">Chamados Detalhados</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    {Object.keys(dadosFiltrados[0]).map((key) => (
                      <TableCell key={key}>{key}</TableCell>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dadosFiltrados.map((row, idx) => (
                    <TableRow key={idx}>
                      {Object.values(row).map((value, i) => (
                        <TableCell key={i}>{String(value)}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
