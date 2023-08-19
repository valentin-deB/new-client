import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartComponent from './components/StartComponent/StartComponent';
import InfosComponent from './components/InfosComponent/InfosComponent';
import ProjectComponent from './components/ProjectComponent/ProjectComponent';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<StartComponent />} />
                <Route path="/infos" element={<InfosComponent />} />
                <Route path="/project" element={<ProjectComponent />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
