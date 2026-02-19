
import { useState } from 'react'

export default function AttendanceTab({
    dashboardData,
    setDashboardData
}) {

  const [commentsVisible, setCommentsVisible] = useState({});   
  const [currentDate, setCurrentDate] = useState(Date.now());

    const toggleComment = (member, estado) => {
    setCommentsVisible(prev => ({
      ...prev,
      [member]: estado === "J"
    }));

    onChange(member, estado);
  };

    const loadAttendanceForDate = (e) => {
        // pass
    };

    const saveAttendance = () => {
        // pass
    };


    const currentData = dashboardData.asistencias[currentDate] || {};

    return (
        <>
        {/* TAB: REGISTRO DIARIO */}
    <div id="registro" className="tab-content active">
        <div className="section-card">
            <div className="date-container">
                <label>📅 FECHA DE ENTRENAMIENTO:</label>
                <input
                    type="date"
                    id="dateSelector"
                    onChange={loadAttendanceForDate}
                    style={{ maxWidth: "250px" }}
                />
            </div>

            <div id="attendanceFormsContainer">
                {/* Se llenará dinámicamente */}

                {dashboardData.CATEGORIAS.map(cat => {
                  const listaMemberInCat = dashboardData.miembros[cat] || [];
                  if (listaMemberInCat.length === 0) return null;
                                
                  return (
                    <div key={cat} style={{ marginBottom: 25 }}>
                      <h4 style={{ background: "#333", padding: "5px 10px", borderLeft: "4px solid var(--accent-color)" }}>
                        {cat}
                      </h4>
                
                      {listaMemberInCat.map(m => {
                        const entry = currentData[m] || { estado: "", comentario: "" };
                        const visible = commentsVisible[m] ?? entry.estado === "J";
                    
                        return (
                          <div className="attendance-row" key={m}>
                            <div className="attendance-main">
                              <div className="member-name">{m}</div>
                        
                              <div className="attendance-options">
                                {["P", "A", "J"].map(val => (
                                  <label key={val} className="option-label">
                                    <input
                                      type="radio"
                                      name={`att_${m}`}
                                      value={val}
                                      checked={entry.estado === val}
                                      onChange={() => toggleComment(m, val)}
                                    />
                                    {val === "J" ? "Aviso" : val}
                                  </label>
                                ))}
                              </div>
                            </div>
                            
                            {visible && (
                              <div className="comment-box visible">
                                <textarea
                                  value={entry.comentario || ""}
                                  onChange={e => onChange(m, entry.estado, e.target.value)}
                                  placeholder="Escribe el motivo del aviso..."
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}

            </div>

            <div style={{ marginTop: "20px", textAlign: "right" }}>
                <button className="btn-primary" onClick={saveAttendance}>
                    Guardar Registro del Día
                </button>
            </div>
        </div>
    </div>  
        </>
    )
}
