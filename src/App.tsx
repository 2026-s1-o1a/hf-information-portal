import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './pages/About'
import Home from './pages/Home'
import Features from './components/Features'
import Navbar from './components/Navbar'
import Pricing from './components/pricing'
// import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing  />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;