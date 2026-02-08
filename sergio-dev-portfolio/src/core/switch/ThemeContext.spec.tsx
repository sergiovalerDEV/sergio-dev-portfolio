import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { ThemeProvider, useTheme } from './ThemeContext';

const mockLocalStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
    removeItem: jest.fn()
};

Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage
});

Object.defineProperty(document.body, 'className', {
    value: '',
    writable: true
});

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
        jest.clearAllMocks();
        mockLocalStorage.clear();
        document.body.className = '';
    });

    it('should initialize with dark theme by default when localStorage is empty', () => {
        mockLocalStorage.getItem.mockReturnValue(null);

        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        expect(screen.getByTestId('theme-display')).toHaveTextContent('dark');
        expect(document.body.className).toBe('dark');
        expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
        expect(mockLocalStorage.getItem).toHaveBeenCalledWith('theme');
    });

    it('should initialize with theme from localStorage when present (light)', () => {
        mockLocalStorage.getItem.mockReturnValue('light');

        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        expect(screen.getByTestId('theme-display')).toHaveTextContent('light');
        expect(document.body.className).toBe('light');
        expect(mockLocalStorage.getItem).toHaveBeenCalledWith('theme');
    });

    it('should toggle theme from dark to light', () => {
        mockLocalStorage.getItem.mockReturnValue(null);

        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        const toggleButton = screen.getByTestId('toggle-btn');
        fireEvent.click(toggleButton);

        expect(screen.getByTestId('theme-display')).toHaveTextContent('light');
        expect(document.body.className).toBe('light');
        expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme', 'light');
    });

    it('should toggle theme from light to dark when starting from light in localStorage', () => {
        mockLocalStorage.getItem.mockReturnValue('light');

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
        expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
    });

    it('should handle invalid localStorage value gracefully', () => {
        mockLocalStorage.getItem.mockReturnValue('invalid');

        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        expect(screen.getByTestId('theme-display')).toHaveTextContent('dark');
        expect(document.body.className).toBe('dark');
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
