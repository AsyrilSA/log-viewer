import AppPage from 'components/layout/AppPage'

import Home from 'pages/WelcomePage';
import BaseInformations from 'pages/BaseInformations';
import AdvancedPage from 'pages/AdvancedPage';
import { BrowserRouter as Routes, Route } from 'react-router-dom';

function App() {
  return (
      <div className="App">
        <AppPage/>
        <div className="content">
          {/* <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/BaseInformations" element={<BaseInformations/>} />
            <Route exact path="/AdvancedPage" element={<AdvancedPage/>} />
          </Routes> */}
        </div>
      </div>
  );
}

export default App;