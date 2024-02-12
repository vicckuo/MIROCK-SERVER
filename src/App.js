import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ImageLoader from './components/ImageLoader';
import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route
            path='/mirock/:imageId'
            element={<ImageLoader />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
