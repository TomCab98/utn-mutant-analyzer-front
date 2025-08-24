import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/header/header";

function App() {
  return (
    <>
      <Router>
        <Header/>
        <AppRoutes />
      </Router>
    </>
  );
}

export default App;
