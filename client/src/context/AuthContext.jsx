import { createContext, useState, useContext } from "react";
import { registerRequest } from "../api/auth";

//creamos un contexto
export const AuthContext = createContext();

//
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deberia estar dentro de un provider. ");
  }
  return context;
};

//creamos un provider ,recibimos los children(hijos)
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error.response)
      setErrors(error.response.data);
    }
  };

  return (
    //con esto proveemos a todos los hijos que se desplegan por dentro, de la informacion que esta en value
    <AuthContext.Provider
      value={{
        signup,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};