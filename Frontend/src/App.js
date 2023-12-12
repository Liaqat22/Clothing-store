import { Route, Routes } from 'react-router-dom';
// import './App.css';
import Layout from './component/Layout/Layout'
import Login from './pages/Login';
import Register from './pages/Register';
import ProductHome from './pages/ProductHome';
import Dashboard from './pages/User/Dashboard';
import Orders from './pages/User/Orders';
import Private from './protectedRoutes/Private';
import AdminRoute from './protectedRoutes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import AllProducts from './pages/Admin/AllProducts';
import UpdateProduct from './pages/Admin/UpdateProduct'; 
import CartPage from './pages/CartPage';
import ProductDetail from './pages/ProductDetail';
import SearchedProducts from './pages/SearchedProducts';
import AdminOrders from './pages/Admin/AdminOrders';
import Profile from './pages/User/Profile';

function App() {
  return (
    <div >
      <Layout>
     <Routes>

      {/* user routes */}
      <Route path='/dashboard' element = {<Private/>}>
      <Route path='user' element = {<Dashboard/>}/>
      <Route path='user/orders' element = {<Orders/>}/>
      <Route path='user/profile' element = {<Profile/>}/>
      </Route>
      {/* AdminRoutes */}
      <Route path='/dashboard' element = {<AdminRoute/>}>
      <Route path='admin' element = {<AdminDashboard/>}/>
      <Route path='admin/adminorders' element = {<AdminOrders/>}/>
      <Route path='admin/createcategory' element = {<CreateCategory/>}/>
      <Route path='admin/createproduct' element = {<CreateProduct/>}/>
      <Route path='admin/updateproduct/:slug' element = {<UpdateProduct/>}/>
      <Route path='admin/allproducts' element = {<AllProducts/>}/>
      </Route>
{/* Gernal Routes */}
      <Route path='/login' element = {<Login/>}/>
      <Route path='/searchedproducts' element = {<SearchedProducts/>}/>
      <Route path='/cart' element = {<CartPage/>}/>
      <Route path='/productdetail/:slug' element = {<ProductDetail/>}/>
      <Route path='/register' element = {<Register/>}/>

      {/* homeproduct */}
      <Route path='/' element = {<ProductHome/>}/>
     </Routes>
     </Layout>
    </div>
  );
}

export default App;
