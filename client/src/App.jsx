import { BrowserRouter,Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import { AuthProvider } from "./context/AuthContext"
import CategoriesPage from "./pages/CategoriesPage"
import CategoryFormPage from "./pages/CategoryFormPage"
import ProfilePage from "./pages/ProfilePage"
import HomePage from "./pages/HomePage"
import ProtectedRoute from "./ProtectedRoute"
import Navbar from "./components/Navbar"
import ProductsPage from "./pages/ProductsPage"
import ProductFormPage from "./pages/ProductFormPage"
import { CategoryProvider } from "./context/CategoryContext"
function App() {

  return (
   <AuthProvider>
    <CategoryProvider>
        <BrowserRouter>

          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />}  />
            <Route path="/login" element={<LoginPage/>}  />
            <Route path="/register" element={<RegisterPage/>}  />

            <Route element={<ProtectedRoute />}>


              {/*CATEGORIAS */}
            
              <Route path="/categories" element={<CategoriesPage/>}  />
              <Route path="/category/new" element={<CategoryFormPage/>}  />
              <Route path="/categories/:id" element={<CategoryFormPage/>}  />

              {/*PRODUCTOS */}
              <Route path="/products" element={<ProductsPage/>}  />
              <Route path="/products/new" element={<ProductFormPage/>}  />
              <Route path="/products/:id" element={<ProductFormPage/>}  />



              <Route path="/profile" element={<ProfilePage />}  />
              <Route path="/Carrito" element={<h1>Carrito</h1>}  />
            </Route>
          

          </Routes>
        </BrowserRouter>
      </CategoryProvider>
   </AuthProvider>
  )
}

export default App
