import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, useTheme } from './ThemeContext';

const TestComponent = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <div>
            <span data-testid="theme-display">{theme}</span>
            <button data-testid="toggle-btn" onClick={toggleTheme}>
                Toggle Theme
            </button>
        </div>
    );
};

describe('ThemeContext', () => {
    beforeEach(() => {
        localStorage.clear();
        document.body.className = '';
    });

    it('should initialize with dark theme by default when localStorage is empty', () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        expect(screen.getByTestId('theme-display')).toHaveTextContent('dark');
        expect(document.body.className).toBe('dark');
        expect(localStorage.getItem('theme')).toBe('dark');
    });

    it('should initialize with theme from localStorage when present (light)', () => {
        localStorage.setItem('theme', 'light');

        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        expect(screen.getByTestId('theme-display')).toHaveTextContent('light');
        expect(document.body.className).toBe('light');
        expect(localStorage.getItem('theme')).toBe('light');
    });

    it('should toggle theme from dark to light', () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        const toggleButton = screen.getByTestId('toggle-btn');
        fireEvent.click(toggleButton);

        expect(screen.getByTestId('theme-display')).toHaveTextContent('light');
        expect(document.body.className).toBe('light');
        expect(localStorage.getItem('theme')).toBe('light');
    });

    it('should toggle theme from light to dark when starting from light in localStorage', () => {
        localStorage.setItem('theme', 'light');

        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        expect(screen.getByTestId('theme-display')).toHaveTextContent('light');

        const toggleButton = screen.getByTestId('toggle-btn');
        fireEvent.click(toggleButton);

        expect(screen.getByTestId('theme-display')).toHaveTextContent('dark');
        expect(document.body.className).toBe('dark');
        expect(localStorage.getItem('theme')).toBe('dark');
    });

    it('should update body className and localStorage on theme change', () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        const toggleButton = screen.getByTestId('toggle-btn');
        fireEvent.click(toggleButton);

        expect(document.body.className).toBe('light');
        expect(localStorage.getItem('theme')).toBe('light');
    });

    it('useTheme should throw error when used outside ThemeProvider', () => {
        const BrokenComponent = () => {
            useTheme();
            return null;
        };

        expect(() => render(<BrokenComponent />)).toThrow(
            'useTheme must be used within ThemeProvider'
        );
    });
});
