import { useEffect } from 'react';

export function useSecurity() {
    useEffect(() => {
        const handleContextMenu = (event) => {
            event.preventDefault();
        };

        const handleKeyDown = (event) => {
            // F12
            if (event.key === 'F12' || event.keyCode === 123) {
                event.preventDefault();
            }

            // Ctrl+Shift+I
            if (
                event.ctrlKey &&
                event.shiftKey &&
                (event.key === 'I' || event.key === 'i' || event.keyCode === 73)
            ) {
                event.preventDefault();
            }

            // Ctrl+Shift+J
            if (
                event.ctrlKey &&
                event.shiftKey &&
                (event.key === 'J' || event.key === 'j' || event.keyCode === 74)
            ) {
                event.preventDefault();
            }

            // Ctrl+Shift+C
            if (
                event.ctrlKey &&
                event.shiftKey &&
                (event.key === 'C' || event.key === 'c' || event.keyCode === 67)
            ) {
                event.preventDefault();
            }

            // Ctrl+U
            if (
                event.ctrlKey &&
                (event.key === 'U' || event.key === 'u' || event.keyCode === 85)
            ) {
                event.preventDefault();
            }
        };

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
}
