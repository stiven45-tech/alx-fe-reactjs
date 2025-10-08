import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import ProfileDetails from './components/ProfileDetails';
import ProfileSettings from './components/ProfileSettings';
import BlogPost from './components/BlogPost';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav style={{
          padding: '20px',
          backgroundColor: '#333',
          color: 'white',
          marginBottom: '20px'
        }}>
          <ul style={{
            listStyle: 'none',
            display: 'flex',
            gap: '20px',
            margin: 0,
            padding: 0
          }}>
            <li><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link></li>
            <li><Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>Profile</Link></li>
            <li><Link to="/blog/1" style={{ color: 'white', textDecoration: 'none' }}>Blog Post 1</Link></li>
            <li><Link to="/blog/2" style={{ color: 'white', textDecoration: 'none' }}>Blog Post 2</Link></li>
            <li><Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          
          {/* Dynamic Route */}
          <Route path="/blog/:id" element={<BlogPost />} />
          
          {/* Protected Route with Nested Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          >
            {/* Nested Routes */}
            <Route path="details" element={<ProfileDetails />} />
            <Route path="settings" element={<ProfileSettings />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
