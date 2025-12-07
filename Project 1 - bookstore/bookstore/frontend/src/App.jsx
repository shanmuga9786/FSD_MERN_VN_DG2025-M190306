import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookDetails from "./pages/BookDetails";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";
import AdminBooks from "./pages/AdminBooks";
import AdminOrders from "./pages/AdminOrders";



function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/admin/books" element={<AdminBooks />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
