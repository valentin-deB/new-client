// React Imports
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Components imports
import StartComponent from "./components/StartComponent/StartComponent";
import InfosComponent from "./components/InfosComponent/InfosComponent";
import ProjectComponent from "./components/ProjectComponent/ProjectComponent";
import InspiComponent from "./components/InspiComponent/InspiComponent";
// Scripts imports
import useWordChecker from "./scripts/WordChecker";
import useImageAnimation from "./scripts/animation";

import { CompanyDataProvider } from "./context/CompanyDataContext";
function App() {
  const { showImage, imageUrl } = useWordChecker(["::tesla", "::raptor"]);
  const { coords } = useImageAnimation(200, showImage);

  return (
    <BrowserRouter>
      <CompanyDataProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<StartComponent />} />
            <Route path="/infos" element={<InfosComponent />} />
            <Route path="/project" element={<ProjectComponent />} />
            <Route path="/inspirations" element={<InspiComponent />} />
          </Routes>

          {showImage && imageUrl && (
            <img
              src={imageUrl}
              alt="Special Image"
              style={{
                position: "fixed",
                top: `${coords.y}px`,
                left: `${coords.x}px`,
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
              }}
            />
          )}
        </div>
      </CompanyDataProvider>
    </BrowserRouter>
  );
}

export default App;
