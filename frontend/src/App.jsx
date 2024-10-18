import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AlertDashboard from './components/AlertDashboard';
import OutbreakHistory from './components/OutbreakHistory';
import HospitalDashboard from './components/HospitalDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Alert Dashboard</Link>
            </li>
            <li>
              <Link to="/outbreak-history">Outbreak History</Link>
            </li>
            <li>
              <Link to="/hospital-dashboard">Hospital Dashboard</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route index element={<AlertDashboard />} />
          <Route path="/outbreak-history" element={<OutbreakHistory />} />
          <Route path="/hospital-dashboard" element={<HospitalDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
