import { BrowserRouter,Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import { AuthProvider } from "./context/AuthContext"
import CategoriesPage from "./pages/CategoriesPage"
import CategoryFormPage from "./pages/CategoryFormPage"
import ProfilePage from "./pages/ProfilePage"
import HomePage from "./pages/HomePage"
import ProtectedRoute from "./ProtectedRoute"
function App() {

  return (
   <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}  />
          <Route path="/login" element={<LoginPage/>}  />
          <Route path="/register" element={<RegisterPage/>}  />

          <Route element={<ProtectedRoute />}>
            <Route path="/categories" element={<CategoriesPage/>}  />
            <Route path="/category/new" element={<CategoryFormPage/>}  />
            <Route path="/category/:id" element={<CategoryFormPage/>}  />
            <Route path="/profile" element={<ProfilePage />}  />
        
            <Route path="/Carrito" element={<h1>Carrito</h1>}  />
          </Route>
        

        </Routes>
      </BrowserRouter>
   </AuthProvider>
  )
}

export default App
