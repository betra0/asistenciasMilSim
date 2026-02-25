import { useState } from "react";
import { useUser } from "../context/UserContext";



export default function AuthForm() {
    const { AuthLogin } = useUser();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const labelClass = "flex gap-2 h-6 justify-center text-md w-full bg-grey-200 rounded";
    const inputClass = "border border-gray-300 rounded";


    const handleSubmit = async (e) => {
        e.preventDefault();
        await AuthLogin(username, password);
    }

  return (
    <> 

        <h2 className="text-2xl font-bold mb-4">Division Andina</h2>
        <form className="flex flex-col gap-4 max-w-sm mx-auto mt-4">      


          <label htmlFor="username" className={labelClass}>Usuario:
              <input type="text" id="username" name="username" className={inputClass} 
              value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
          </label>
          <label htmlFor="password" className={labelClass}>Contraseña:
              <input type="password" id="password" name="password" className={inputClass} 
              value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
          </label>
          <button style={{'backgroundColor': 'var(--accent-color)'}} 
          className=" hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded" 
          type="button" 
            onClick={handleSubmit}
          >Iniciar Sesión</button>
        </form>
      



    </>

  );
}