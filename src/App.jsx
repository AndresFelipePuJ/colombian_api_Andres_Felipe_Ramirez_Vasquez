import './App.css';
import React, { useEffect, useState } from 'react';
import Tabs from './colombia_dash/tabs';
import { fetchPresidents, fetchTouristicAttractions, fetchAirports, fetchAirports2 } from './Services/ApiColombiaService';
import { groupPresidentsByParty, groupTouristicAttractionsByLocation, groupAirportsByLocation, groupAirportsByRegionDepartmentCityType } from './Services/ApiColombiaService';

const App = () => {
  const [activeTab, setActiveTab] = useState('presidents');
  const [data, setData] = useState({});
  const [info, setInfo] = useState({
    count: 0,
    responseTime: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const startTime = Date.now();
      let fetchedData;
      switch (activeTab) {
        case 'presidents':
          fetchedData = await fetchPresidents();
          setData(groupPresidentsByParty(fetchedData));
          break;
        case 'touristicAttractions':
          fetchedData = await fetchTouristicAttractions();
          setData(groupTouristicAttractionsByLocation(fetchedData));
          break;
        case 'airports':
          fetchedData = await fetchAirports();
          setData(groupAirportsByLocation(fetchedData));
          break;
        case 'airports2':
          fetchedData = await fetchAirports2();
          setData(groupAirportsByRegionDepartmentCityType(fetchedData));
          break;
        default:
          break;
      }
      const endTime = Date.now();
      setInfo({
        count: fetchedData ? fetchedData.length : 0,
        responseTime: endTime - startTime,
      });
    };

    fetchData();
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'presidents':
        return <PreformattedDataView title="Presidentes" data={data} info={info} />;
      case 'touristicAttractions':
        return <PreformattedDataView title="Atracciones Turísticas" data={data} info={info} />;
      case 'airports':
        return <PreformattedDataView title="Aeropuertos" data={data} info={info} />;
      case 'airports2':
        return <PreformattedDataView title="Aeropuertos por Región, Departamento, Ciudad y Tipo" data={data} info={info} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Tabs 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        tabs={[
          { id: 'presidents', label: 'Presidentes' },
          { id: 'touristicAttractions', label: 'Atracciones Turísticas' },
          { id: 'airports', label: 'Aeropuertos' },
          { id: 'airports2', label: 'Aeropuertos por Región, Departamento, Ciudad y Tipo' }
        ]}
      />
      {renderContent()}
    </div>
  );
};

const PreformattedDataView = ({ title, data, info }) => (
  <div>
    <h2>{title}</h2>
    <div>
      <p><strong>Número de Registros:</strong> {info.count}</p>
      <p><strong>Tiempo de Respuesta:</strong> {info.responseTime} ms</p>
    </div>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>
);

export default App;