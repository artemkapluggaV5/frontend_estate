import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CatalogPage from './pages/CatalogPage';
import PropertyDetails from './pages/PropertyDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import FavoritesPage from './pages/FavoritesPage';
import NotificationsPage from './pages/NotificationsPage';
import ChatPage from './pages/ChatPage';
import CreatePropertyPage from './pages/CreatePropertyPage';
import About from './pages/About';
import Contacts from './pages/Contacts';
import NotFound from './pages/errors/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <ToastContainer position="bottom-right" autoClose={3000} theme="colored" />
        <Navbar />
        <main className="page-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/create-property" element={<CreatePropertyPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;