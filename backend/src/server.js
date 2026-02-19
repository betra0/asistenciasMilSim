import dotenv from "dotenv";
dotenv.config({ path: './.env' });
console.log(" database url:", process.env.DATABASE_URL);

import app from "./app.js";




const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});