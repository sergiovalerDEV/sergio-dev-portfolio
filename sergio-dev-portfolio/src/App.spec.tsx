import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

jest.mock('../src/core/i18n/index.ts', () => ({}));
jest.mock('./components/NavBar/NavBar.tsx', () => ({
  default: () => <div>NavBar Mock</div>
}));
jest.mock('./components/NavBar/NavBar.scss', () => ({}));
jest.mock('./App.scss', () => ({}));

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.className = '';
  });

  it('should render app-container', () => {
    render(<App />);
    expect(document.querySelector('.app-container')).toBeInTheDocument();
  });

  it('should apply default dark theme', () => {
    render(<App />);
    expect(document.body.className).toBe('dark');
  });

  it('should respect light theme from localStorage', () => {
    localStorage.setItem('theme', 'light');
    render(<App />);
    expect(document.body.className).toBe('light');
  });
});
