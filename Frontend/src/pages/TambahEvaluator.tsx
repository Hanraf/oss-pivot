import { useState } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";

const API_URL = "http://localhost:5000/api/evaluator"; // Sesuaikan dengan backend

function TambahEvaluator() {
    const [namaEvaluator, setNamaEvaluator] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(API_URL, { nama_evaluator: namaEvaluator }, {
                headers: { "Content-Type": "application/json" }
            });

            if (response.status === 201) {
                setSuccess(true);
                setNamaEvaluator("");
            }
        } catch (err) {
            setError("Gagal menambahkan evaluator!");
        }
    };

    return (
        <div className="container mt-4">
            <h2>Tambah Evaluator</h2>
            {success && <Alert variant="success">Evaluator berhasil ditambahkan!</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nama Evaluator</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={namaEvaluator} 
                        onChange={(e) => setNamaEvaluator(e.target.value)} 
                        required 
                    />
                </Form.Group>
                <Button type="submit" variant="primary">Simpan</Button>
            </Form>
        </div>
    );
}

export default TambahEvaluator;
