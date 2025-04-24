
import { useState } from "react";
import * as XLSX from "xlsx";
import { Card, CardContent } from "../components/ui/card";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "../components/ui/table";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function DashboardUpload() {
  const [data, setData] = useState<any[]>([]);
  const [filtroProjeto, setFiltroProjeto] = useState<string>("Todos");

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

  const dadosFiltrados = filtroProjeto === "Todos"
    ? data
    : data.filter((item) => item["Projeto"] === filtroProjeto);

  const dadosGrafico = projetos.map((projeto) => {
    const chamados = data.filter((d) => d["Projeto"] === projeto);
    const violados = chamados.filter((d) => String(d["SLA"] || "").toLowerCase() === "violado");
    return {
      name: projeto,
      total: chamados.length,
      violado: violados.length,
      percentual: Number(((violados.length / chamados.length) * 100).toFixed(1))
    };
  });

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard com Upload e Gráficos</h1>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} className="mb-4" />

      {data.length > 0 && (
        <>
          <div className="mb-4">
            <label className="mr-2">Filtrar por projeto:</label>
            <select
              className="border rounded px-2 py-1"
              value={filtroProjeto}
              onChange={(e) => setFiltroProjeto(e.target.value)}
            >
              <option value="Todos">Todos</option>
              {projetos.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>

          <Card>
            <CardContent>
              <h2 className="text-lg font-semibold mb-2">SLA por Projeto</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dadosGrafico}>
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
