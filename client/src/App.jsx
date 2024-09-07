import { BrowserRouter,Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import { AuthProvider } from "./context/AuthContext"

function App() {

  return (
   <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Inicio</h1>}  />
          <Route path="/categorias" element={<h1>Categorias</h1>}  />
          <Route path="/perfil" element={<h1>Perfil</h1>}  />
          <Route path="/login" element={<LoginPage/>}  />
          <Route path="/register" element={<RegisterPage/>}  />
          <Route path="/Carrito" element={<h1>Carrito</h1>}  />

        </Routes>
      </BrowserRouter>
   </AuthProvider>
  )
}

export default App
