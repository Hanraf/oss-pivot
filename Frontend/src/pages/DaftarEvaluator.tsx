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

  const navigate = useNavigate();

  useEffect(() => {
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
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="">
      <h1 className="">Evaluator</h1>
      <div className="">
        <table className="">
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
        <Button variant="primary" onClick={() => navigate("/")} className="mt-5">Home</Button>
      </div>
    </div>
  );
}

export default DaftarEvaluator;