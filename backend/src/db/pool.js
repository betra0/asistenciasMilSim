import pkg from "pg";
import { config } from "../config/env.js";


const { Pool } = pkg;



const pool = new Pool({
  connectionString: config.db.url
});

export default pool;