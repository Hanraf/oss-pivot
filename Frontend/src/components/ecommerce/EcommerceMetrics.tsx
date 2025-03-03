import {
  ArrowDownIcon,
  BoxIconLine,
  CheckCircleIcon,
  CheckLineIcon,
  ArrowUpIcon,
  TaskIcon,
  AngleUpIcon,
  ErrorIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";
import { useEffect, useState } from "react";

interface EvaluatorPermohonan{
  id_permohonan: number;
  id_jenis_izin: number;
    id_badan_usaha: number;
    id_status_oss: number;
    nama_status: string;
    id_progress: number;
    nama_progress: string;
    id_kabupaten: number;
    id_kecamatan: number;
    id_desa: number;
    tautan_dokumen: string;
    nomor_permohonan: string;
    tanggal_permohonan: string;
    alamat: string;
    modal_usaha: number;
    tanggal_selesai_permohonan: string;
    durasi_permohonan_menit: number;
}

interface EvaluatorPermohonanData{
  message: string;
  data: EvaluatorPermohonan[];
}

export default function EcommerceMetrics() {
  const [datas, setData] = useState<EvaluatorPermohonan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(API_URL + "/daftar_permohonan");
        if (!response.ok) {
          throw new Error("Gagal memuat data");
        }
        const result: EvaluatorPermohonanData = await response.json();

        setData(result.data);
      } catch (error: any) {
        setError(error.message || "Gagal memuat data permohonan");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const permohonanKembaliCount = datas.filter((permohonan) => permohonan.id_progress === 1 ).length;
  const permohonanDiprosesCount = datas.filter((permohonan) => permohonan.id_progress === 2 ).length;
  const permohonanSetujuCount = datas.filter((permohonan) => permohonan.id_progress === 3 ).length;
  const permohonanTolakCount = datas.filter((permohonan) => permohonan.id_progress === 4 ).length;
  const permohonanKirimPBCount = datas.filter((permohonan) => permohonan.id_progress === 5 ).length;
  const permohonanSelesaiCount = permohonanKembaliCount + permohonanSetujuCount + permohonanTolakCount + permohonanKirimPBCount;

  return (
    
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
        {/* <!-- Metric Item Start --> */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <CheckCircleIcon className="text-gray-800 size-6 dark:text-white/90" />
          </div>
          
            <div className="flex items-end justify-between mt-5">
              <div>
                <Badge color="success">
                  <CheckLineIcon />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                    Permohonan Selesai
                    </span>
                </Badge>
                <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                  {permohonanSelesaiCount}
                </h4>
              </div>
              {/* <Badge color="success">
                <ArrowUpIcon />
                11.01%
              </Badge> */}
            </div>
          </div>
        {/* <!-- Metric Item End --> */}

        {/* <!-- Metric Item Start --> */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <TaskIcon className="text-gray-800 size-6 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <Badge color="error">
                <CheckLineIcon />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                  Permohonan Diproses
                  </span>
              </Badge>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {permohonanDiprosesCount}
              </h4>
            </div>
            {permohonanDiprosesCount < permohonanSelesaiCount ? 
              <Badge color="error">
                <ArrowDownIcon />
              </Badge>
                : 
              <Badge color="error">
                <ArrowUpIcon />
              </Badge>
            }
          </div>
        </div>
        {/* <!-- Metric Item End --> */}

        {/* <!-- Metric Item Start --> */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <AngleUpIcon className="text-gray-800 size-6 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <Badge color="warning">
                <CheckLineIcon />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                  Permohonan Dikembalikan
                  </span>
              </Badge>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {permohonanKembaliCount}
              </h4>
            </div>
            {/* {permohonanDiprosesCount < permohonanSelesaiCount ? 
              <Badge color="error">
                <ArrowDownIcon />
              </Badge>
                : 
              <Badge color="error">
                <ArrowUpIcon />
              </Badge>
            } */}
          </div>
        </div>
        {/* <!-- Metric Item End --> */}

        {/* <!-- Metric Item Start --> */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <Badge color="success">
                <CheckLineIcon />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                  Permohonan Disetujui
                  </span>
              </Badge>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {permohonanSetujuCount}
              </h4>
            </div>
            {/* {permohonanDiprosesCount < permohonanSelesaiCount ? 
              <Badge color="error">
                <ArrowDownIcon />
              </Badge>
                : 
              <Badge color="error">
                <ArrowUpIcon />
              </Badge>
            } */}
          </div>
        </div>
        {/* <!-- Metric Item End --> */}

        {/* <!-- Metric Item Start --> */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <ErrorIcon className="text-gray-800 size-6 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <Badge color="error">
                <CheckLineIcon />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                  Permohonan Ditolak
                  </span>
              </Badge>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {permohonanTolakCount}
              </h4>
            </div>
            {/* {permohonanDiprosesCount < permohonanSelesaiCount ? 
              <Badge color="error">
                <ArrowDownIcon />
              </Badge>
                : 
              <Badge color="error">
                <ArrowUpIcon />
              </Badge>
            } */}
          </div>
        </div>
        {/* <!-- Metric Item End --> */}
      </div>
   
  );
}
