import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Modal from './components/Modal';
import Home from './pages/Home';
import Menu from './pages/Menu';
import DishDetail from './pages/DishDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Reservation from './pages/Reservation';
import Contact from './pages/Contact';
import Reviews from './pages/Reviews';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  // Khởi tạo giỏ hàng từ localStorage (nếu có)
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('restaurant-cart');
    return saved ? JSON.parse(saved) : [];
  });

  // State cho modal thông báo
  const [modal, setModal] = useState({ show: false, title: '', message: '' });

  // Lưu giỏ hàng vào localStorage mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem('restaurant-cart', JSON.stringify(cart));
  }, [cart]);

  // Thêm món vào giỏ hàng
  const addToCart = (dish, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.id === dish.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...dish, quantity }];
    });
    setModal({
      show: true,
      title: 'Thành công!',
      message: `Đã thêm "${dish.name}" vào giỏ hàng.`,
    });
  };

  // Cập nhật số lượng món trong giỏ
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // Xóa món khỏi giỏ
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Xóa toàn bộ giỏ hàng
  const clearCart = () => {
    setCart([]);
  };

  // Tính tổng số lượng món
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Đóng modal
  const closeModal = () => setModal({ show: false, title: '', message: '' });

  // Hiển thị modal
  const showModal = (title, message) => {
    setModal({ show: true, title, message });
  };

  return (
    <Router>
      <div className="app">
        <Navbar cartCount={cartCount} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu addToCart={addToCart} />} />
            <Route
              path="/dish/:id"
              element={<DishDetail addToCart={addToCart} />}
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                />
              }
            />
            <Route
              path="/checkout"
              element={
                <Checkout
                  cart={cart}
                  clearCart={clearCart}
                  showModal={showModal}
                />
              }
            />
            <Route
              path="/reservation"
              element={<Reservation showModal={showModal} />}
            />
            <Route
              path="/contact"
              element={<Contact showModal={showModal} />}
            />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <Modal
          show={modal.show}
          title={modal.title}
          message={modal.message}
          onClose={closeModal}
        />
      </div>
    </Router>
  );
}

export default App;
