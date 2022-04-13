import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
import store from "./redux/store";
import { Provider } from 'react-redux'
import ProductDetail from "./Pages/ProductDetail";


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <HashRouter>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </HashRouter>
      </div>
    </Provider>
  );
}

export default App;
