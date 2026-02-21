
import { useState } from 'react'
import { useDashboardData } from '../../context/DataContext';

export default function AttendanceTab({

}) {

  const [commentsVisible, setCommentsVisible] = useState({});   
  
  const [currentEvent, setCurrentEvent] = useState(
    {
      isNew: true,
      date: Date.now(),
      attendance: {}, // "NOMBRE": { estado: 'P', comentario: '' }
      internalId: null, // solo para eventos existentes, no para nuevos
      name: "nuevo_evento" ,
      description: ""
    
    }
  
    );

  const toggleMemberAttendance = (member, estado) => {
    // Si el estado es "J", mostrar el textarea de comentarios, sino ocultarlo
    setCommentsVisible(prev => ({
      ...prev,
      [member.nickname]: estado === "J"
    }));

    // Actualizar el estado de asistencia del miembro
    setCurrentEvent(prev => ({
      ...prev,
      attendance: {
        ...prev.attendance,
        [member.nickname]: {
          ...prev.attendance[member.nickname],
          estado
        }
      }
    }));
  };

  const textInputHandler = (member, estado, comentario) => {
    setCurrentEvent(prev => ({
      ...prev,
      attendance: {
        ...prev.attendance,
        [member.nickname]: {
          estado,
          comentario
        }
      }
    }));
  }

  const loadAttendanceForDate = (e) => {
      // pass
  };
  const saveAttendance = () => {
      // pass
  };
  const { dashboardData, isLoading, error } = useDashboardData();


  return (
    <>
        {/* TAB: REGISTRO DIARIO */}
    <div id="registro" className="tab-content active">
        <div className="section-card">
          <div className="date-container">
                <label>Crear nueva asistencia</label>

            </div>
            <div className="date-container">
                <label>📅 FECHA DE ENTRENAMIENTO:</label>
                <input
                    type="date"
                    id="dateSelector"
                    onChange={loadAttendanceForDate}
                    style={{ maxWidth: "250px" }}
                />
            </div>
            <div className="date-container">
                <label>Nombre del evento</label>
                <input
                    type="text"
                    id="eventName"
                    value={currentEvent.name}
                    onChange={e => setCurrentEvent(prev => ({ ...prev, name: e.target.value }))}
                />

            </div>

            <div id="attendanceFormsContainer">
                {/* Se llenará dinámicamente */}

                {dashboardData?.ranks?.map(cat => {
                  const listaMemberInCat = dashboardData.membersByRank[cat] || [];
                  if (listaMemberInCat.length === 0) return null;
                  return (
                    <div key={cat} style={{ marginBottom: 25 }}>
                      <h4 style={{ background: "#333", padding: "5px 10px", borderLeft: "4px solid var(--accent-color)" }}>
                        {cat}
                      </h4>
                
                      {listaMemberInCat.map(m => {
                        const entry = currentEvent.attendance[m.nickname] || { estado: "", comentario: "" };
                        const visible = commentsVisible[m.nickname] ?? entry.estado === "J";
                    
                        return (
                          <div className="attendance-row" key={m.nickname}>
                            <div className="attendance-main">
                              <div className="member-name">{m.nickname}</div>
                        
                              <div className="attendance-options">
                                {["P", "A", "J"].map(val => (
                                  <label key={val} className="option-label">
                                    <input
                                      type="radio"
                                      name={`att_${m.nickname}`}
                                      value={val}
                                      checked={entry.estado === val}
                                      onChange={() => toggleMemberAttendance(m, val)}
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
                                  onChange={e => textInputHandler(m, entry.estado, e.target.value)}
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
