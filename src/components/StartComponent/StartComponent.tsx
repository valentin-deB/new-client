import React from 'react';
import { useNavigate } from "react-router-dom";

const StartComponent: React.FC = () => {
    const navigate = useNavigate();
  
    const handleStartClick = () => {
        navigate('/infos');
    };

    return (
        <div className="l-container">
            <div className="c-start">
                <h1>Nouveau projet - Valentin de Brabandère</h1>
                <p>Let's kickstart your new project together! Provide some initial details to get started.</p>
                <button onClick={handleStartClick} className="c-cta">Start New Project</button>
            </div>
        </div>
    );
}

export default StartComponent;
