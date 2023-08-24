import { useState, useEffect } from 'react';

type AnimationReturnType = {
    coords: { x: number, y: number }
};

const useImageAnimation = (delay: number = 100, isActive: boolean = false): AnimationReturnType => {
    const [coords, setCoords] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

    useEffect(() => {
        if (!isActive) return;

        const handleMouseMove = (e: MouseEvent) => {
            setTimeout(() => {
                setCoords({ x: e.clientX, y: e.clientY });
            }, delay);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [delay, isActive]);

    return { coords };
}

export default useImageAnimation;
