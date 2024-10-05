
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
function ProfilePage(){
    const {user, logout}= useAuth()
    return(
        <div>Usuario: <h1>{user.username}</h1>
        <Link
                to="/"
                onClick={() => {
                  logout();
                }}
              >
                Cerrar Sesion
              </Link>
          
        </div>
      
    )
}

export default ProfilePage