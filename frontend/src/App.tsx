import './index.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Home />
      </div>
      <Footer />
    </div>
  );
}
