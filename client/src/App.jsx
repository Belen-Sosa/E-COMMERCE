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
import { CartProvider } from "./context/CartContext"
import Cart from "./components/Cart"
import OrderFormPage from "./pages/OrderFormPage"
import PaymentPage from "./pages/PaymentPage"
import OrderPage from "./pages/OrdersPage"
import DetailOrderPage from "./pages/DetailOrderPage"


function App() {

  return (
   <AuthProvider>
    
    <CategoryProvider>
      <CartProvider>
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

              <Route path="/orders" element={<OrderPage/>}  />
              <Route path="/order/new" element={<OrderFormPage/>}  />
              <Route path="/order/detail/:id" element={<DetailOrderPage/>}  />
              <Route path="/payment" element={<PaymentPage />}  />
            </Route>
          

          </Routes>
        </BrowserRouter>
        </CartProvider>
      </CategoryProvider>
   </AuthProvider>
  )
}

export default App
