import { createContext, useContext, useState, useEffect } from "react";



// Crear el contexto
const UserContext = createContext();

// Provider
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  const reloadUser = async () => {
    await fetchData();
  }

  const AuthLogin = async (username, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("http://127.0.0.1:3000/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.message || "Error during login");
        return false;
      }

      const data = await res.json();
      console.log("Login successful:", data);
      const formattedUser = formatUser(data.user);
      setUser(formattedUser);
      return true;
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error during login");
      return false;
    }
    finally {
      setIsLoading(false);
    }
  }

  const fetchUser = async () => {
    try {
        const res = await fetch("http://127.0.0.1:3000/auth/me",{
          credentials: "include",
        })
      
      if (res.code === 401) {
        setUser(false);
        return;
      } 
      if (res.status === 401) {
        setUser(false);
        return;
      }

      if (!res.ok) {
        setUser(null);
        setError("Error fetching user data");
        return;
      }
  
      const nUser = await res.json();
      console.log("data recibida:", nUser);
      
      const formattedUser = formatUser(nUser);
      setUser(formattedUser);


    
    } catch (err) {
      console.error(err);
    }finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    error,
    reloadUser,
    AuthLogin,
  }


  
  useEffect(() => {
 
		  console.log("vacio");
      fetchUser();
		}, []);



  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// Hook 
export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser debe usarse dentro de UserProvider");
  }

  return context;
}



const formatUser= (newData) => {
    const user = {
        id : newData.id,
        username : newData.username,
        email : newData.email || null,
        role : newData.role || null,
    };
	return user;
}

