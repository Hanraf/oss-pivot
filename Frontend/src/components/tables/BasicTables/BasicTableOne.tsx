import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";

interface EvaluatorPermohonan {
  id_evaluator_permohonan: number;
  id_permohonan: number;
  nomor_permohonan: string;
  id_evaluator: number;
  nama_evaluator: string;
  id_operator: number;
  nama_operator: string;
  id_jenis_izin: number;
  nama_jenis_izin: string;
  id_badan_usaha: number;
  nama_badan_usaha: string;
  id_status_oss: number;
  nama_status: string;
  id_progress: number;
  nama_progress: string;
  id_kabupaten: number;
  nama_kabupaten: string;
  id_kecamatan: number;
  id_desa: number;
  tanggal_disposisi: Date;
  tautan_dokumen: string;
  tanggal_permohonan: Date;
  alamat: string;
  modal_usaha: number;
  tanggal_selesai_permohonan: string;
  durasi_permohonan_menit: number;
}

export default function EvaluatorPermohonanTable() {
  const [data, setData] = useState<EvaluatorPermohonan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/daftar_evaluator_permohonan`); // Ganti dengan URL API yang benar
        if (!response.ok) {
          throw new Error("Gagal mengambil data dari API");
        }
        const result = await response.json();
        setData(result.data); // Sesuaikan dengan struktur respons API
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading data...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  ID
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Nomor Permohonan
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Nama Perusahaan
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Izin
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Tanggal Permohonan
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Tautan Dokumen
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Kabupaten
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Evaluator
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Lama Pengurusan
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Progress
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Status OSS
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {data.map((permohonan) => (
                <TableRow key={permohonan.id_permohonan}>
                  
                  {/* ID Permohonan */}
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {permohonan.id_permohonan}
                  </TableCell>

                  {/* Nomor Permohonan */}
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {permohonan.nomor_permohonan}
                    </span>
                  </TableCell>

                  {/* Nama Perusahaan */}
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {permohonan.nama_badan_usaha}
                  </TableCell>

                  {/* Jenis Izin */}
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {permohonan.nama_jenis_izin}
                  </TableCell>

                  {/* Tanggal Permohonan */}
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {new Date(permohonan.tanggal_permohonan).toLocaleDateString("id-ID")}
                  </TableCell>

                  {/* ID Permohonan */}
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {permohonan.tautan_dokumen ? (
                        <a
                          href={permohonan.tautan_dokumen} // Menetapkan tautan
                          target="_blank" // Membuka di tab baru
                          rel="noopener noreferrer" // Keamanan untuk membuka di tab baru
                          className="text-blue-500 hover:underline"
                        >
                          {permohonan.tautan_dokumen} {/* Menampilkan tautan */}
                        </a>
                      ) : (
                        <span>No Document</span> // Menampilkan pesan jika tautan tidak ada
                      )}
                  </TableCell>

                  {/*kabupaten */}
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {permohonan.nama_kabupaten}
                  </TableCell>

                  {/*Evaluator */}
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {permohonan.nama_evaluator}
                  </TableCell>

                  {/* Modal Usaha
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    Rp {permohonan.modal_usaha.toLocaleString("id-ID")}
                  </TableCell> */}

                  {/* Durasi Permohonan dalam Jam */}
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {(permohonan.durasi_permohonan_menit / 60).toFixed(2)} Jam
                  </TableCell>

                  {/* Lama Pengurusan */}
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        permohonan.nama_progress === "MOHON" ?
                          "error" :
                        permohonan.nama_progress === "DIPROSES" ?
                          "primary" :
                        permohonan.nama_progress === "DIKEMBALIKAN" ?
                          "warning" :
                        permohonan.nama_progress === "KIRIM PB" ? 
                          "info" : 
                        permohonan.nama_progress === "DISETUJUI" ? 
                          "success" :
                        "error"
                      }
                    >
                      {permohonan.nama_progress}
                    </Badge>
                  </TableCell>

                  {/* Status OSS */}
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        permohonan.nama_status === "TOLAK" ?
                          "error" :
                        permohonan.nama_status === "DIPROSES" ?
                          "primary" :
                        permohonan.nama_status === "KEMBALI" ?
                          "warning" :
                        permohonan.nama_status === "TERBIT" ? 
                          "success" : 
                        "error"
                      }
                    >
                      {permohonan.nama_status}
                    </Badge>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
