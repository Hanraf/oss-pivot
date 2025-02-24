import './App.css';
import DaftarEvaluator from './pages/DaftarEvaluator';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

function App() {
    return (
        <Router>      
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/daftar_evaluator" element={<DaftarEvaluator />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;