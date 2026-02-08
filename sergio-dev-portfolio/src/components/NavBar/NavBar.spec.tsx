import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavBar from './NavBar';
import { ThemeProvider } from '../../core/switch/ThemeContext';

jest.mock('./NavBar.scss', () => ({}));

const renderWithTheme = (initialTheme = 'dark') => {
    localStorage.setItem('theme', initialTheme);
    return render(
        <ThemeProvider>
            <NavBar />
        </ThemeProvider>
    );
};

describe('NavBar', () => {
    beforeEach(() => {
        localStorage.clear();
        document.body.className = '';
    });

    it('should render navbar', () => {
        renderWithTheme();
        expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('should render all navigation links', () => {
        renderWithTheme();
        expect(screen.getByText('Inicio')).toBeInTheDocument();
        expect(screen.getByText('Experiencia')).toBeInTheDocument();
        expect(screen.getByText('Proyectos')).toBeInTheDocument();
        expect(screen.getByText('Formación')).toBeInTheDocument();
        expect(screen.getByText('Contacto')).toBeInTheDocument();
    });

    it('should render hamburger button closed by default', () => {
        renderWithTheme();
        expect(screen.getByLabelText(/Abrir menú/i)).toBeInTheDocument();
    });

    it('should toggle menu open/closed with hamburger button', () => {
        renderWithTheme();
        const hamburger = screen.getByLabelText(/Abrir menú/i);

        fireEvent.click(hamburger);
        expect(screen.getByLabelText(/Cerrar menú/i)).toBeInTheDocument();

        fireEvent.click(hamburger);
        expect(screen.getByLabelText(/Abrir menú/i)).toBeInTheDocument();
    });

    it('should close menu when clicking ANY navigation link', () => {
        renderWithTheme();
        const hamburger = screen.getByLabelText(/Abrir menú/i);

        fireEvent.click(hamburger);
        expect(screen.getByLabelText(/Cerrar menú/i)).toBeInTheDocument();

        ['Inicio', 'Experiencia', 'Proyectos', 'Formación', 'Contacto'].forEach(linkText => {
            fireEvent.click(screen.getByText(linkText));
            expect(screen.getByLabelText(/Abrir menú/i)).toBeInTheDocument();
        });
    });

    it('should render sun icon structure on dark theme', () => {
        renderWithTheme('dark');
        const icon = document.querySelector('.navbar__icon');
        expect(icon).toBeInTheDocument();
        expect(icon).toHaveAttribute('viewBox', '0 0 24 24');
        expect(icon?.querySelector('circle')).toBeInTheDocument();
    });

    it('should render moon icon structure on light theme', () => {
        renderWithTheme('light');
        const icon = document.querySelector('.navbar__icon');
        expect(icon).toBeInTheDocument();
        expect(icon).toHaveAttribute('viewBox', '0 0 24 24');
        expect(icon?.querySelector('path')).toBeInTheDocument();
    });
});
