import React from "react";
import {
  Routes,
  Route
} from "react-router-dom";
import Main from "./components/layout/Main";
import SignIn from "./pages/SignIn";
import Stock from "./pages/Stock";
import Warehouse from "./pages/Warehouse";
import Product from "./pages/Product";
import Store from "./pages/Store";
import Supplier from "./pages/Supplier";
import Sale from "./pages/Sale";
import Movement from "./pages/Movement";
import Supplying from "./pages/Supplying";
import NotFound from "./pages/notfound/NotFound";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/privateroute";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

const Layout = ({ children }) => {
  return (
    <Main>
      <Routes>
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/stock" element={<PrivateRoute element={<Stock />} />} />
        <Route path="/warehouse" element={<PrivateRoute element={<Warehouse />} />} />
        <Route path="/product" element={<PrivateRoute element={<Product />} />} />
        <Route path="/store" element={<PrivateRoute element={<Store />} />} />
        <Route path="/supplier" element={<PrivateRoute element={<Supplier />} />} />
        <Route path="/sale" element={<PrivateRoute element={<Sale />} />} />
        <Route path="/movement" element={<PrivateRoute element={<Movement />} />} />
        <Route path="/supplying" element={<PrivateRoute element={<Supplying />} />} />
        <Route path="*" element={<PrivateRoute element={<NotFound />} />}/>
        <Route path="*" element={<SignIn />} />
      </Routes>
    </Main>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/*" element={<Layout />} />
    </Routes>
  );
}

export default App;
