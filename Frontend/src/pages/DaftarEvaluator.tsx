import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const API_URL = "http://localhost:5000/api/evaluator";

interface IEvaluator {
    id_evaluator: number;
    nama_evaluator: string;
    deleted_at: string | null;
}

function DaftarEvaluator(){
  const [data, setData] = useState<IEvaluator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const navigate = useNavigate();

  const fetchData = () => {
    setLoading(true);
    axios
      .get<{ message: string; data: IEvaluator[] }>(API_URL)
      .then((response) => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [refreshTrigger]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container d-flex flex-column align-items-center text-center mt-4">
      <h1 className="">Evaluator</h1>
      <Button variant="success" onClick={() => navigate("/tambah_evaluator")} className="mb-3">+ Tambah Evaluator</Button>
      <div className="table-responsive">
        <table className="table table-bordered table-striped text-center">
          <thead>
            <tr className="">
              <th className="">ID</th>
              <th className="">Nama</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id_evaluator} className="">
                  <td className="">{item.id_evaluator}</td>
                  <td className="">{item.nama_evaluator}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-2 text-center">
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Button variant="primary" onClick={() => navigate("/")} className="mt-2">Home</Button>
      </div>
    </div>
  );
}

export default DaftarEvaluator;