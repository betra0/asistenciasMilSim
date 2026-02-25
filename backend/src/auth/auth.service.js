import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db/pool.js";
import dotenv from "dotenv";
dotenv.config({ path: './.env' });


export async function authenticate(username, password) {
  const client = await pool.connect();

    console.log("Authenticating user:", username, "with password:", password);
    console.log("secret:", process.env.JWT_SECRET, "admin_username:", process.env.ADMIN_USERNAME, "|| admin_hash:", process.env.ADMIN_HASH );
  try{
    if (username !== process.env.ADMIN_USERNAME) return false;
    //const res = await client.query("SELECT id, username, password_hash FROM users WHERE username = $1", [username]);  
    // la bd no la usare por ahora
    

    //if (res.rowCount === 0) return false;

    const user = {password_hash: process.env.ADMIN_HASH}; // provisional, la idea es consultar en bd
    const match = await bcrypt.compare(
        password,
        user.password_hash
    );

    if (!match) return false;
    const idUser = 1; // provisional, la idea es consultar en bd
    const token = jwt.sign(
        { sub: idUser },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
    );

  return { token };


  }catch (err) {
    console.error("Error during authentication:", err);
    return false;
  }     
  finally {    
    client.release();
  }


  



}