import { useState, useEffect } from 'react'
import AttendanceTab from './tabs/AttendanceTab';


export default function DashboardPage() {

    //const CATEGORIAS = ['Oficiales', 'Cadetes', 'Aspirantes', 'Reclutas'];
    //const DEFAULT_MEMBERS = {
    //    'Oficiales': ['[GRL.D] Pegaso', '[V. Comodoro] Eban', '[T.Coronel] Lucho', '[MY] Venom', '[MY] Gonxol'],
    //    'Cadetes': ['[CDTE] Gestgu', '[CDTE] Pepos', '[CDTE] Necros', '[CDTE] Daniel'],
    //    'Aspirantes': ['[ASP] Butin', '[ASP] Carcho', '[ASP] Fredy', '[ASP] Panamasado', '[ASP] Calaca', '[ASP] Elbno', '[ASP] Carrera', '[ASP] Caracol', '[ASP] Ncu', '[ASP] Mitzio', '[ASP] Sonidero', '[ASP] Hunter', '[ASP] Marucha', '[ASP] Miyamas', '[ASP] Tengu', '[ASP] HardB'],
    //    'Reclutas': ['[RCT] Abaddon', '[RCT] Angel "Artemiza"', '[RCT] Cerec', '[RCT] Daniel Villalba', '[RCT] Di Campino', '[RCT] Esteban', '[RCT] GuilletreX', '[RCT] Hunter', '[RCT] Janovich', '[RCT] JBMatias', '[RCT] NCU', '[RCT] NejiiDark', '[RCT] Parasyte', '[RCT] Relan', '[RCT] Samurai', '[RCT] strack3322', '[RCT] Tear', '[RCT] Uriel.R', '[RCT] ASUS', '[RCT] Boloncho', '[RCT] Facun', '[RCT] GuardiaN', '[RCT] Tafu', '[RCT] TomiCheddar', '[RCT] sscug']
    //};
    //let appData = {
    //    CATEGORIAS,
    //    miembros: JSON.parse(JSON.stringify(DEFAULT_MEMBERS)),
    //    asistencias: {}, // "FECHA": { "NOMBRE": { estado: 'P', comentario: '' } }
    //    observaciones: {}, // "NOMBRE": "texto"
    //    historicos: [] // Array de { id: 'Mes 2/26', fechaCierre: '...', html: '...' }
    //};

    const [activeTab, setActiveTab] = useState('registro');
    const [dashboardData, setDashboardData] = useState(null);
    const [isLoding, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    const formatData= (newData) => {
        const data = {
            ranks: newData.ranks ? newData.ranks : [],  // ['Oficiales', 'Cadetes', 'Aspirantes', 'Reclutas']
            members: newData.members ? newData.members : [], // [{ name: 'Pegaso', rank: 'Oficiales' }, ...]
            membersByRank: newData.membersForRank ? newData.membersForRank : {}, // { 'Oficiales': [{name: 'Pegaso', ...}], 'Cadetes': [...], ... }
            attendances: newData.attendances ? newData.attendances : {}, // idEvento: { memberName: { estado: 'P', comentario: '...' }, ... }
            events: newData.events ? newData.events : [] // [{ id: 'idEvento', date: "2025-01-01T03:00:00.000Z", name: 'Evento 1' }, ...]

        };
        console.log("data formateada:", data);  
        return data;
    }

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
            setDashboardData(formattedData);
        
        } catch (err) {
          console.error(err);
        }
    };

  fetchData();
}, []);

    return (
    <>
        <div className="tabs">
            <button className={`tab-btn ${activeTab === 'registro' ? 'active' : ''}`} onClick={() => setActiveTab('registro')}>Registro Diario</button>
            <button className={`tab-btn ${activeTab === 'estadisticas' ? 'active' : ''}`} onClick={() => setActiveTab('estadisticas')}>Estadísticas</button>
            <button className={`tab-btn ${activeTab === 'meses' ? 'active' : ''}`} onClick={() => setActiveTab('meses')}>Meses</button>
            <button className={`tab-btn ${activeTab === 'miembros' ? 'active' : ''}`} onClick={() => setActiveTab('miembros')}>Gestionar Miembros</button>
        
        </div>


        {activeTab === 'registro' && <AttendanceTab dashboardData={dashboardData} setDashboardData={setDashboardData}/>}
    </>
    );
} 