import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartComponent from './components/StartComponent/StartComponent';
import InfosComponent from './components/InfosComponent/InfosComponent';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<StartComponent />} />
                <Route path="/infos" element={<InfosComponent />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
