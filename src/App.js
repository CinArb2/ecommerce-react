import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
import ProductDetail from "./Pages/ProductDetail";
import Shop from "./Pages/Shop"
import Loader from "./components/Loader";
import { useSelector } from "react-redux";
import Purchases from "./Pages/Purchases";
import ProtectedRoutes from "./Pages/ProtectedRoutes";
import ShopManager from "./components/ShopManager";
import CreateProduct from "./components/CreateProduct";
import Overview from "./components/Overview";
import ProductUpdate from "./components/ProductUpdate";
import ShopUpdate from "./components/ShopUpdate";


function App() {
  const isLoading = useSelector((state) => state.loader.isLoading);
  return (
    <div className="App">
      <HashRouter>
        {isLoading && <Loader/>}
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/shop/:id" element={<Shop />}/>
          <Route element={<ProtectedRoutes />}>
            <Route path="/purchases" element={<Purchases />} />
            <Route path="/shop/" element={<Shop />} />
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
