const API_BASE_URL = 'https://api-colombia.com/api/v1';

// Funciones para obtener datos de la API
export const fetchPresidents = async () => {
  const response = await fetch(`${API_BASE_URL}/President`);
  const data = await response.json();
  return data;
};

export const fetchDepartments = async () => {
  const response = await fetch(`${API_BASE_URL}/Department`);
  const data = await response.json();
  return data;
};

export const fetchTouristicAttractions = async () => {
  const response = await fetch(`${API_BASE_URL}/TouristicAttraction`);
  const data = await response.json();
  return data;
};

export const fetchAirports = async () => {
  const response = await fetch(`${API_BASE_URL}/Airport`);
  const data = await response.json();
  return data;
};

export const fetchAirports2 = async () => {
  const response = await fetch(`${API_BASE_URL}/Airport`);
  const data = await response.json();
  return data;
};



// Agrupamiento de Presidentes por Partido Político
export const groupPresidentsByParty = (presidents) => {
  const grouped = presidents.reduce((acc, president) => {
    const party = president.politicalParty || 'Unknown';
    const fullName = `${president.name} ${president.lastName}`; 

    if (!acc[party]) {
      acc[party] = [];
    }
    acc[party].push(fullName); 
    return acc;
  }, {});


  const result = Object.keys(grouped).map(party => ({
    party,
    names: grouped[party], 
    count: grouped[party].length 
  }));

  return result.sort((a, b) => b.count - a.count);
};


// Agrupamiento de Atracciones Turísticas por Departamento y Ciudad
export const groupTouristicAttractionsByLocation = (attractions) => {
  const grouped = attractions.reduce((acc, attraction) => {
    const department = attraction.city.departmentId || 'Unknown';
    const city = attraction.city.name || 'Unknown';
    const attractionName = attraction.name || 'Unknown Attraction';

    if (!acc[department]) {
      acc[department] = {
        cities: {},
        count: 0,
      };
    }

    if (!acc[department].cities[city]) {
      acc[department].cities[city] = [];
    }
    
   
    acc[department].cities[city].push(attractionName);
    acc[department].count++;

    return acc;
  }, {});

  return grouped;
};

// Agrupamiento de Aeropuertos por Departamento y Ciudad
export const groupAirportsByLocation = (airports) => {
  const grouped = airports.reduce((acc, airport) => {
    const department = airport.department?.name || 'Unknown';
    const city = airport.city?.name || 'Unknown';
    const airportName = airport.name || 'Unknown Airport';

    if (!acc[department]) {
      acc[department] = {
        cities: {},
        count: 0,
      };
    }

    if (!acc[department].cities[city]) {
      acc[department].cities[city] = [];
    }

    
    acc[department].cities[city].push(airportName);
    acc[department].count++;

    return acc;
  }, {});

  return grouped;
};


// Agrupamiento de Aeropuertos por Región, Departamento, Ciudad y Tipo
export const groupAirportsByRegionDepartmentCityType = (airports) => {
  const grouped = airports.reduce((acc, airport) => {
    const department = airport.department?.name || 'Unknown';
    const city = airport.city?.name || 'Unknown';
    const airportName = airport.name || 'Unknown Airport';
    const airportType = airport.type || 'Unknown Type';

    if (!acc[department]) {
      acc[department] = {
        cities: {},
        count: 0,
      };
    }

    if (!acc[department].cities[city]) {
      acc[department].cities[city] = [];
    }

    acc[department].cities[city].push({ name: airportName, type: airportType });
    acc[department].count++;

    return acc;
  }, {});

  return grouped;
};
