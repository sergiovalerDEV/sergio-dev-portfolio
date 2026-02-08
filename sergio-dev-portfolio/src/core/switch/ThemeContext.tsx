import { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from 'react';
interface ThemeContextType {
    theme: 'dark' | 'light';
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const getInitialTheme = (): 'dark' | 'light' => {
        const stored = localStorage.getItem('theme');
        return stored === 'dark' || stored === 'light' ? stored : 'dark';
    };

    const [theme, setTheme] = useState<'dark' | 'light'>(getInitialTheme);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    };

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    const contextValue = useMemo(
        () => ({
            theme,
            toggleTheme
        }),
        [theme]
    );

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};
