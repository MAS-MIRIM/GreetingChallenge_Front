import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { FadeTransition } from './pages/FadeTransition';
import Guide from './pages/Guide';

function App() {
  return (
    <Router>
      <FadeTransition />
    </Router>
  );
}

export default App;