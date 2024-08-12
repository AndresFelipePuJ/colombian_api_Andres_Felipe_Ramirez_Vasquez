import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const TouristicAttractionsChart = ({ data }) => {
  // Usa datos de ejemplo para verificar que el gráfico se renderiza
  const chartData = [
    { location: 'Bogotá', count: 15 },
    { location: 'Medellín', count: 10 },
    { location: 'Cali', count: 7 },
  ];

  return (
    <BarChart width={600} height={300} data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="location" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
};

export default TouristicAttractionsChart;
