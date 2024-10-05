import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated ,user} = useAuth();
  return (
    <nav className="bg-zinc-700 my-3 flex  justify-between py-5 px-10 rounded-lg">
      <Link to="/">
        <h1 className="text-2xl font-bold">E-Commerce</h1>
      </Link>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
          
            <li>
              <Link to="/categories"> Categorias</Link>
            </li>
            <li>
              <Link to="/products"> Productos</Link>
            </li>
            <li>
              <Link to="/profile">Mi perfil</Link>
            </li>
            
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
