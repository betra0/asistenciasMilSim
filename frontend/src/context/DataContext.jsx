import { createContext, useContext, useState, useEffect } from "react";



// Crear el contexto
const DataContext = createContext();

// Provider
export function DataProvider({ children }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

	
  const value = {
    dashboardData: data,
    setDashboardData: setData,
    isLoading,
    setIsLoading,
    error,
    setError
  };


  useEffect(() => {
    const fetchData = async () => {
      console.log("hola  ");
      try {
          const res = await fetch("http://127.0.0.1:3000/app/bootstrap");
      
        if (!res.ok) {
          throw new Error("Error en la petición");
        }
    
        const data = await res.json();
        console.log("data recibida:", data);
      
        // setState aquí
        // setAppData(data);
        const formattedData = formatData(data);
      setData(formattedData);
      
      } catch (err) {
        console.error(err);
      }
  	};

		  fetchData();
		}, []);



  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

// Hook 
export function useDashboardData() {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("useDashboardData debe usarse dentro de DataContextProvider");
  }

  return context;
}



const formatData= (newData) => {
    const data = {
        ranks: newData.ranks ? newData.ranks : [],  // ['Oficiales', 'Cadetes', 'Aspirantes', 'Reclutas']
        members: newData.members ? newData.members : [], // [{ name: 'Pegaso', rank: 'Oficiales' }, ...]
        membersByRank: newData.membersForRank ? newData.membersForRank : {}, // { 'Oficiales': [{name: 'Pegaso', ...}], 'Cadetes': [...], ... }
        attendances: newData.attendances ? newData.attendances : {}, // idEvento: { memberName: { estado: 'P', comentario: '...' }, ... }
        events: newData.events ? newData.events : [] // [{ id: 'idEvento', date: "2025-01-01T03:00:00.000Z", name: 'Evento 1' }, ...]
    };
	return data;
}