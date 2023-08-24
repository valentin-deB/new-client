import { useState, useEffect } from 'react';

type WordCheckerReturnType = {
    showImage: boolean;
    imageUrl: string | null;
};

const useWordChecker = (wordList: string[]): WordCheckerReturnType => {
    const [showImage, setShowImage] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    let typedString = "";

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            typedString += e.key;

            for (const word of wordList) {
                if (typedString.endsWith(word)) {
                    setShowImage(true);
                    setImageUrl(`/assets/img/${word.replace(':', '')}.png`);
                    typedString = ""; 
                    break;
                }
            }

            // Optional: Consider adding a condition to clear the `typedString` if it becomes too long.
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        }
    }, [wordList]);

    return { showImage, imageUrl };
}

export default useWordChecker;
