import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="container text-center mt-5">
            <h1>Selamat Datang di Home</h1>
            <Button variant="primary" onClick={() => navigate("/daftar_evaluator")}>
                Pergi ke Daftar Evaluator
            </Button>
        </div>
    );
}

export default Home;
