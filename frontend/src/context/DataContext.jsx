import { createContext, useContext, useState, useEffect } from "react";



// Crear el contexto
const DataContext = createContext();

// Provider
export function DataProvider({ children }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

	const loadAttendancebyId = async (eventId) => {
    try {
      const res = await fetch(`http://127.0.0.1:3000/events/${eventId}/attendance`)
      if (!res.ok) {
        throw new Error("Error fetching attendance data");
      }
      const body = await res.json();
      console.log('NOWbody recibido de api', body);
      const newData = formatAttendanceInData(data, body.data, eventId);
      console.log("New data with attendance loaded:", newData);
      setData(newData);
      return newData.attendances[eventId];
      
    } catch (err) {
      console.error("Error loading attendance:", err);
      throw err;
    }
  };

  const saveNewEventAndAttendace = async (eventData) => {
    try {
      const res = await fetch("http://127.0.0.1:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(eventData)

      });

      if (!res.ok) {
        throw new Error("Error en la petición", await res.text());
      }
      
      const result = await res.json();
      console.log("Evento guardado:", result);

    }catch (err) {
      console.error("Error saving attendance:", err);
    }

  }



  const value = {
    dashboardData: data,
    setDashboardData: setData,
    isLoading,
    setIsLoading,
    error,
    setError,
    loadAttendancebyId,
    saveNewEventAndAttendace,
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
        attendances: newData.attendances ? newData.attendances : {}, // idEvento: { member_id: { estado: 'P', comentario: '...' }, ... }
        events: newData.events ? newData.events : [] // [{ id: 'idEvento', date: "2025-01-01T03:00:00.000Z", name: 'Evento 1' }, ...]
    };
	return data;
}

function formatAttendanceInData(data, newAttendance, eventId) {
  return {
    ...data,
    attendances: {
      ...data.attendances,
      [eventId]: newAttendance
    }
  };
}