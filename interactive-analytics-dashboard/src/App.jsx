import LoadingProvider from "./contexts/LoadingProvider";
import { ThemeProvider } from "./contexts/ThemeContext";
import Dashboard from "./pages/Dashboard/Dashboard";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <LoadingProvider>
        <Dashboard />
      </LoadingProvider>
    </ThemeProvider>
  );
}
export default App;
