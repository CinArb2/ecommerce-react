import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
import ProductDetail from "./Pages/ProductDetail";
import Shop from "./Pages/Shop"
import Loader from "./components/Loader";
import { useSelector } from "react-redux";
import ProtectedRoutes from "./Pages/ProtectedRoutes";
import ShopManager from "./components/ShopManager";
import CreateProduct from "./components/CreateProduct";
import Overview from "./components/Overview";
import ProductUpdate from "./components/ProductUpdate";
import ShopUpdate from "./components/ShopUpdate";
import UserManager from "./Pages/UserManager";
import UserSettings from "./components/UserSettings";
import UserOrders from "./components/UserOrders";
import MessageModal from "./components/MessageModal";
import { useState } from "react";


function App() {
  const isLoading = useSelector((state) => state.loader.isLoading);
  const modalMsg = useSelector(state => state.error.modalMsg)

  return (
    <div className="App">
      <HashRouter>
        {isLoading && <Loader />}
        
        <Navbar />
        {modalMsg && <MessageModal/>}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/shop/:id" element={<Shop />} />
          
          {/* protected routes */}
          <Route element={<ProtectedRoutes />}>
            
            {/* User routes */}
            <Route path="/userManager/*" element={<UserManager />} >
              <Route path="orders" element={<UserOrders />} />
              <Route path="settings" element={<UserSettings/>}/>
            </Route>

            {/* Shop route */}
            <Route path="/shop/" element={<Shop />} />

            {/* Shop Manager routes */}
            <Route path="/shop/manager/*" element={<ShopManager />}>
              <Route path="overview" element={<Overview/>}/>
              <Route path="createProduct" element={<CreateProduct/>}/>
              <Route path="updateProduct" element={<ProductUpdate/>}/>
              <Route path="updateShop" element={<ShopUpdate/>}/>
            </Route>
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
