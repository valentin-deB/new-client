import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartComponent from './components/StartComponent/StartComponent';
import InfosComponent from './components/InfosComponent/InfosComponent';
import ProjectComponent from './components/ProjectComponent/ProjectComponent';
import InspiComponent from './components/InspiComponent/InspiComponent';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<StartComponent />} />
                <Route path="/infos" element={<InfosComponent />} />
                <Route path="/project" element={<ProjectComponent />} />
                <Route path="/inspirations" element={<InspiComponent />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
