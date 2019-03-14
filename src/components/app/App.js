import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Alert } from 'antd';
import AppLayout from '../layout/Layout';
import routes from 'UTILS/routes';
import 'antd/dist/antd.css';
import './App.scss';



const App = () => {
  const [online, changeStatus] = useState(true);
  function changeStatus(value) {
    online = value;
  }

  useEffect(()=> {
    window.addEventListener('online', () => {
      changeStatus(navigator.onLine);
    });
    window.addEventListener('offline', () => {
      changeStatus(navigator.onLine);
    });
  });
  return (
    <div className="App">
    <div className="online">
      {!online && <Alert message="Seems like you lost internet connection." type="error" showIcon closable />}
    </div>
      <Router>
        <Route path={routes.root} component={AppLayout} />
      </Router>
    </div>
  );
}  
export default App;
