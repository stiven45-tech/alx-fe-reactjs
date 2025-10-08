// src/components/Home.jsx
export default function Home() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Welcome to Home Page</h1>
      <p>This is the home page of the application.</p>
    </div>
  );
}

// src/components/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      // Simulate login by storing in localStorage
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', username);
      alert('Login successful!');
      navigate('/profile');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    alert('Logged out successfully!');
  };

  const isAuth = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Login Page</h2>
      {!isAuth ? (
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Login
          </button>
        </form>
      ) : (
        <div>
          <p>You are already logged in as {localStorage.getItem('username')}</p>
          <button
            onClick={handleLogout}
            style={{
              padding: '10px 20px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated) {
    alert('Please login to access this page');
    return <Navigate to="/login" replace />;
  }

  return children;
}

// src/components/Profile.jsx
import { Outlet, Link } from 'react-router-dom';

export default function Profile() {
  const username = localStorage.getItem('username') || 'User';

  return (
    <div style={{ padding: '20px' }}>
      <h1>Profile Page - Welcome {username}!</h1>
      <p>This is a protected route. Only authenticated users can see this.</p>
      
      <nav style={{ margin: '20px 0' }}>
        <Link
          to="details"
          style={{
            marginRight: '20px',
            padding: '10px 15px',
            backgroundColor: '#28a745',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px'
          }}
        >
          View Details
        </Link>
        <Link
          to="settings"
          style={{
            padding: '10px 15px',
            backgroundColor: '#ffc107',
            color: 'black',
            textDecoration: 'none',
            borderRadius: '4px'
          }}
        >
          Settings
        </Link>
      </nav>

      {/* Nested routes will render here */}
      <div style={{
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px'
      }}>
        <Outlet />
      </div>
    </div>
  );
}

// src/components/ProfileDetails.jsx
export default function ProfileDetails() {
  const username = localStorage.getItem('username') || 'User';

  return (
    <div>
      <h2>Profile Details (Nested Route)</h2>
      <p><strong>Username:</strong> {username}</p>
      <p><strong>Email:</strong> {username.toLowerCase()}@example.com</p>
      <p><strong>Member Since:</strong> {new Date().toLocaleDateString()}</p>
    </div>
  );
}

// src/components/ProfileSettings.jsx
export default function ProfileSettings() {
  return (
    <div>
      <h2>Profile Settings (Nested Route)</h2>
      <form>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Email Notifications:
          </label>
          <input type="checkbox" defaultChecked /> Enable email notifications
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Privacy:
          </label>
          <select style={{ padding: '5px' }}>
            <option>Public</option>
            <option>Friends Only</option>
            <option>Private</option>
          </select>
        </div>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}

// src/components/BlogPost.jsx
import { useParams, useNavigate } from 'react-router-dom';

export default function BlogPost() {
  const { id } = useParams(); // Dynamic parameter from URL
  const navigate = useNavigate();

  // Simulated blog post data
  const blogPosts = {
    '1': { title: 'First Blog Post', content: 'This is the content of the first blog post.' },
    '2': { title: 'Second Blog Post', content: 'This is the content of the second blog post.' },
  };

  const post = blogPosts[id];

  if (!post) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Blog Post Not Found</h2>
        <button onClick={() => navigate('/')} style={{ padding: '10px 20px', marginTop: '10px' }}>
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Blog Post {id}</h1>
      <h2>{post.title}</h2>
      <p style={{ lineHeight: '1.6', color: '#666' }}>{post.content}</p>
      <button
        onClick={() => navigate('/')}
        style={{
          padding: '10px 20px',
          marginTop: '20px',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Back to Home
      </button>
    </div>
  );
}
