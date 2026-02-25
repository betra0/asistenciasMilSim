import readline from "node:readline/promises";
import bcrypt from "bcrypt";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output });

const password = await rl.question("Enter password to hash: ");
rl.close();

const hash = await bcrypt.hash(password, 10);

console.log("\nHash:");
console.log(hash);