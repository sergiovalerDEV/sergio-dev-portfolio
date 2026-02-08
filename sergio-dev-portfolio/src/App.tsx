import '../src/core/i18n';
import { ThemeProvider } from './core/switch/ThemeContext';
import NavBar from './components/NavBar/NavBar';
import './App.scss';

function App() {
  return (
    <ThemeProvider>
      <div className="app-container">
        <NavBar />
      </div>
    </ThemeProvider>
  );
}
export default App;