import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ApplicationProvider } from './context/ApplicationContext';
import { ToastContainer } from 'react-toastify';
import EditApplication from './pages/EditApplication';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import AddApplication from './pages/AddApplication';
import Analytics from './pages/Analytics';
import Navbar from './components/Navbar';

function App() {
  return (
    <ApplicationProvider>
      <Router>
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/applications/new" element={<AddApplication />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/applications/:id" element={<EditApplication />} />
          </Routes>
        </div>
        <ToastContainer position="bottom-right" />
      </Router>
    </ApplicationProvider>
  );
}

export default App;