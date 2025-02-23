import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/evaluator";

interface IEvaluator {
    id_evaluator: number;
    nama_evaluator: string;
    deleted_at: string | null;
  }

export default function DataTable() {
  const [data, setData] = useState<IEvaluator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Evaluator</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-500">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-500 p-2">ID</th>
              <th className="border border-gray-500 p-2">Nama</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id_evaluator} className="border">
                  <td className="border border-gray-500 p-2 text-center">{item.id_evaluator}</td>
                  <td className="border border-gray-500 p-2">{item.nama_evaluator}</td>
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
      </div>
    </div>
  );
}
