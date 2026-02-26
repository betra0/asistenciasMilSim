import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db/pool.js";
import { config } from "../config/env.js";


export async function authenticate(username, password) {
  const client = await pool.connect();

  try{
    if (username !== config.admin.name) return false;
    //const res = await client.query("SELECT id, username, password_hash FROM users WHERE username = $1", [username]);  
    // la bd no la usare por ahora
    

    //if (res.rowCount === 0) return false;

    const user = {password_hash: config.admin.hash}; // provisional, la idea es consultar en bd
    const match = await bcrypt.compare(
        password,
        user.password_hash
    );

    if (!match) return false;
    const idUser = 1; // provisional, la idea es consultar en bd
    const token = jwt.sign(
        { sub: idUser },
        config.jwtSecret,
        { expiresIn: "30d" }
    );

  return { token, id: idUser, username: config.admin.name };


  }catch (err) {
    console.error("Error during authentication:", err);
    return false;
  }     
  finally {    
    client.release();
  }


  



}