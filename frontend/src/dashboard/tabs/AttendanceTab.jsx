
import { useEffect, useState } from 'react'
import { useDashboardData } from '../../context/DataContext';

const newDefEvent ={
      isNew: true,
      date: new Date().toISOString().split("T")[0], // formato YYYY-MM-DD
      attendance: {}, // "member_id": { estado: 'P', comentario: '' }
      internalId: null, // solo para eventos existentes, no para nuevos
      name: "nuevo_evento" ,
      description: ""
    
    }

export default function AttendanceTab({


}) {

  const [commentsVisible, setCommentsVisible] = useState({});   
  const [AllSelector, setAllSelector] = useState("A"); // "P", "A", "C"
  const { dashboardData, isLoading, error, saveNewEventAndAttendace, loadAttendancebyId, reloadData } = useDashboardData();
  
  const [currentEvent, setCurrentEvent] = useState(newDefEvent);
  const [selectCurrentEvent, setSelectCurrentEvent] = useState('new');
    
  


  // useefect vacio 
  useEffect(() => {
    console.log("curren event changed:", currentEvent);
  }, [currentEvent]);

  useEffect(() => {

    const func = () => {
      if (!currentEvent.isNew) return; // solo aplica a eventos nuevos, no a los existentes(sino causa un bug muy raro)
      const estado = AllSelector
      let attendance = currentEvent.attendance;
      dashboardData?.members?.forEach(m => {
        attendance[m.id] = {
          estado,
          comentario: attendance[m.id]?.comentario || ""
        };
      });
      setCurrentEvent(prev => ({
        ...prev,
        attendance
      }));
    }; 
    func();

  }, [AllSelector, dashboardData]);

  
  const toggleMemberAttendance = (member, estado, comentario) => {
    // Si el estado es "J", mostrar el textarea de comentarios, sino ocultarlo

    setCommentsVisible(prev => ({
      ...prev,
      [member.id]: estado === "J"
    }));

    // Actualizar el estado de asistencia del miembro
    setCurrentEvent(prev => ({
      ...prev,
      attendance: {
        ...prev.attendance,
        [member.id]: {
          estado,
          comentario: comentario || prev.attendance[member.id].comentario
        }
      }
    }));
  };



  const loadAttendanceForDate = (e) => {
    const selectedDate = e.target.value;
    setCurrentEvent(prev => ({
      ...prev,
      date: selectedDate
    }));

  };
  const saveAttendanceHandler = async () => {
      if (!currentEvent.isNew) {
        alert("Solo se pueden guardar nuevos eventos, la funcionalidad de edición de eventos existentes aún no está implementada.");
        return;
      }
      const id =await saveNewEventAndAttendace(currentEvent);
      if (id && id !== "error") {
        setSelectCurrentEvent(`${id}`);
      }



  };

  useEffect(() => {
    const logicselect= async () => {
      
      const eventId = selectCurrentEvent;
      if (eventId === "new") {
        setCurrentEvent(newDefEvent);
        return;
      }


      let attendance = dashboardData.attendances[eventId] || null;

      if (attendance===null) {
        attendance = await loadAttendancebyId(eventId);
      }

      setCurrentEvent({
        isNew: false,
        date: dashboardData.events.find(ev => ev.id === parseInt(eventId))?.event_date.split("T")[0] || new Date().toISOString().split("T")[0],
        attendance: attendance || {},
        internalId: eventId,
        name: dashboardData.events.find(ev => ev.id === parseInt(eventId))?.name || "evento_desconocido",
        description: dashboardData.events.find(ev => ev.id === parseInt(eventId))?.description || ""
      });
    }

    logicselect();
  }, [selectCurrentEvent]);

  const textSumit = currentEvent.isNew ? "Guardar Nuevo Evento" : "Actualizar Evento Existente";

  const setCurrentEventHandler = async (eventId) => {
    setSelectCurrentEvent(eventId);
  }


  return (
    <>
        {/* TAB: REGISTRO DIARIO */}
    <div id="registro" className="tab-content active">
        <div className="section-card">
          <div className="date-container">
                <label>Crear nuevo evento o editar uno existente</label>
                <select
                  value={selectCurrentEvent}
                  style={{ width: 200, background: "#271a1a", color: "#fff", border: "1px solid #555" }}
                  onChange={(e) => setCurrentEventHandler(e.target.value)}
                >
                  {dashboardData?.events?.map(ev => (
                    <option key={'options'+ev.id} value={ev.id}>
                      {ev.name} - {ev.event_date.split("T")[0]}
                    </option>
                  ))}
                
                  <option value="new">Nuevo Evento</option>
                </select>

            </div>
            <div className="date-container">
                <label>📅 Fecha del Evento:</label>
                <input
                    type="date"
                    id="dateSelector"
                    onChange={loadAttendanceForDate}
                    value={currentEvent.date}
                    style={{ maxWidth: "250px" }}
                    readOnly={!currentEvent.isNew} // solo editable para nuevos eventos
                />
            </div>
            <div className="date-container">
                <label>Nombre Del Evento:</label>
                <input
                    type="text"
                    id="eventName"
                    value={currentEvent.name}
                    onChange={e => setCurrentEvent(prev => ({ ...prev, name: e.target.value }))}
                    style={{maxWidth:"350px"}}
                    readOnly={!currentEvent.isNew} // solo editable para nuevos eventos
                />

            </div>
            {/* All selector */}
            {
              currentEvent.isNew && (
                            <div className="attendance-row" >
              <div className="attendance-main">
                <div className="member-name"></div>
          
                <div className="attendance-options">
                  {["P", "A", "C"].map(val => (
                    <label key={val} className="option-label" style={val === "C" ? { color: "#888" } : (val === 'P' ? { color: "var(--success-color)" } : { color: "var(--danger-color)" })} >
                      <input
                        type="radio"
                        name={`allSelector_${val}`}
                        checked={AllSelector === val}
                        onChange={() => setAllSelector(val)}
                      />
                      {val === "C" ? "Clear" : val}
                    </label>
                  ))}
                </div>
              </div>
            </div>
              )
            }

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
                        const entry = currentEvent.attendance[m.id] || { estado: "", comentario: "" };
                        const visible = commentsVisible[m.id] ?? entry.estado === "J";
                    
                        return (
                          <div className="attendance-row" key={m.id}>
                            <div className="attendance-main">
                              <div className="member-name">{m.nickname}</div>
                        
                              <div className="attendance-options">
                                {["P", "A", "J"].map(val => (
                                  <label key={val} className="option-label" style={val === "J" ? { color: "var(--warning-color)" } : (val === 'P' ? { color: "var(--success-color)" } : { color: "var(--danger-color)" })} >
                                    <input
                                      type="radio"
                                      name={`att_${m.id}`}
                                      value={val}
                                      checked={entry.estado === val}
                                      onChange={() => toggleMemberAttendance(m, val, '')}
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
                                  onChange={e => toggleMemberAttendance(m, entry.estado, e.target.value)}
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
                <button className="btn-primary" onClick={() => saveAttendanceHandler()}>
                    {textSumit}
                </button>
            </div>
        </div>
    </div>  
        </>
    )
}
