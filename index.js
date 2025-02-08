import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => [...prevData.slice(-20), {
        time: new Date().toLocaleTimeString(),
        temperatura: Math.floor(Math.random() * (30 - 18 + 1) + 18),
        humedad: Math.floor(Math.random() * (80 - 50 + 1) + 50)
      }]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-green-700 mb-4">Dashboard Invernadero</h1>
      <Card className="w-96 text-center shadow-lg rounded-lg bg-white p-4">
        <CardContent>
          <p className="text-xl font-semibold text-gray-700">Temperatura: {data.length > 0 ? data[data.length - 1].temperatura : "Cargando..."} °C</p>
          <p className="text-xl font-semibold text-gray-700">Humedad: {data.length > 0 ? data[data.length - 1].humedad : "Cargando..."} %</p>
          <Button className="mt-4 bg-green-500 hover:bg-green-700 text-white">Activar Riego</Button>
        </CardContent>
      </Card>
      <div className="w-full max-w-2xl mt-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Historial de Datos</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="temperatura" stroke="#FF4500" strokeWidth={2} />
            <Line type="monotone" dataKey="humedad" stroke="#1E90FF" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
