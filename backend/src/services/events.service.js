import pool from "../db/pool.js";

export async function newEvent(eventData) {

    const ejemploBody ={
        "name": "Evento de prueba",
        "description": "Descripción del evento de prueba",
        "date": "2024-07-01T18:00:00.000Z",
        "attendance": {
            "1": { "estado": "P", "comentario": "" },
            "2": { "estado": "A", "comentario": "" },
            "3": { "estado": "J", "comentario": "Tenia hora con el medico" }

        }
    }
    if (!eventData.name || !eventData.date) {
        throw new Error("Datos incompletos del evento");
    }
    eventData.description = eventData.description || "";
    const client = await pool.connect();

    try {
        await client.query('BEGIN');
        
        const insertEventText = 'INSERT INTO events(name, description, event_date) VALUES($1, $2, $3) RETURNING id';
        const insertEventValues = [eventData.name, eventData.description, eventData.date];
        const res = await client.query(insertEventText, insertEventValues);
        const eventId = res.rows[0].id;

        const insertAttendanceText = 'INSERT INTO event_attendance(event_id, member_id, status, justification) VALUES($1, $2, $3, $4)';
        const truvalues = {
            "P": "present",
            "A": "absent",
            "J": "justified"
        }
        for (const memberId in eventData.attendance) {
            const { estado, text } = eventData.attendance[memberId];
            const comentario = estado === "J" ? text : "";
            const insertAttendanceValues = [eventId, memberId, truvalues[estado], comentario];
            await client.query(insertAttendanceText, insertAttendanceValues);
        }

        await client.query('COMMIT');


    return { eventId }
    } catch (error) {
        await client.query('ROLLBACK');
        console.error("Error creating event:", error);
        throw error;
    } finally {
        client.release();
    }


}
