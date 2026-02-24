
import { useEffect, useState } from 'react'
import { useDashboardData } from '../../context/DataContext';



export default function StatsTab({}) {

  const { dashboardData, isLoading, error, saveNewEventAndAttendace, loadAttendancebyId, reloadData } = useDashboardData();
  

    
  console.log("hola mundo desde stats");
  



  return (
  <>
    {/* TAB: ESTADÍSTICAS */}
    <div id="estadisticas" className="tab-content active">
        <div className="section-card">
            <h3>📊 Resumen de Rendimiento</h3>
            <p style={{ fontSize: "0.8em", color: "#888", marginBottom: "20px" }}>
                * Haz clic en el nombre de un integrante para ver su historial y observaciones.
            </p>
            <div id="statsContainer">
                {/* Tablas generadas con JS */}
            </div>
        </div>
    </div>


  </>
  )
}
