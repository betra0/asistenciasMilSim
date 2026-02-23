import { newEvent } from "../services/events.service.js";



export async function raizPost(req, res) {

  try {
    if (!req.body || !req.body.name || !req.body.date || !req.body.attendance) {
      return res.status(400).json(
        { 
          ok: false, error: "Datos incompletos del evento",
          example: {
            "name": "Evento de prueba",
            "description": "Descripción del evento de prueba",
            "date": "2024-07-01T18:00:00.000Z",
            "attendance": {
                "1": { "estado": "P", "comentario": "" },
                "2": { "estado": "A", "comentario": "" },
                "3": { "estado": "J", "comentario": "justificacion" }
            }
          }
        }
      );
    }

    const data = await newEvent(req.body);
    res.json({ ok : true, data });


  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "internal error" });
  }
}