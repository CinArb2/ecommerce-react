import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
import ProductDetail from "./Pages/ProductDetail";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";


function App() {
  const isLoading = useSelector((state) => state.isLoading);
  return (
      <div className="App">
        <HashRouter>
          {isLoading && <Loader/>}
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </HashRouter>
      </div>
  );
}

export default App;
