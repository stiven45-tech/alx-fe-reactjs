import { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/formikForm';
import './App.css';

function App() {
  const [showFormik, setShowFormik] = useState(false);

  return (
    <div className="App">
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={() => setShowFormik(!showFormik)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Switch to {showFormik ? 'Controlled Components' : 'Formik'} Form
        </button>
      </div>

      {showFormik ? <FormikForm /> : <RegistrationForm />}
    </div>
  );
}

export default App;
