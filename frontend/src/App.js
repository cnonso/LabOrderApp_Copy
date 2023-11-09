import logo from './logo.svg';
// import './App.css';
import Create from "./pages/create";
import Index from "./pages/index";
import { Routes, Route, Redirect } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Create />} />
      <Route path="/index" element={<Index />} />
      <Route path="/create" element={<Create />} />
    </Routes>
  );
}

export default App;
