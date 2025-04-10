import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const JuzDetail = () => {
  const { juzNumber } = useParams();
  const navigate = useNavigate();
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJuzData = async () => {
      try {
        const [arabRes, indoRes] = await Promise.all([
          fetch(`https://api.alquran.cloud/v1/juz/${juzNumber}/quran-uthmani`),
          fetch(`https://api.alquran.cloud/v1/juz/${juzNumber}/id.indonesian`)
        ]);

        const arabData = await arabRes.json();
        const indoData = await indoRes.json();

        if (arabData.data && indoData.data) {
          const combined = arabData.data.ayahs.map((ayah, index) => ({
            ...ayah,
            translation: indoData.data.ayahs[index]?.text || ''
          }));
          setVerses(combined);
        } else {
          setVerses([]);
        }
      } catch (error) {
        console.error('Gagal mengambil data Juz:', error);
        setVerses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJuzData();
  }, [juzNumber]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-gradient-to-b from-yellow-600 to-black text-white">
        <p className="text-lg">Memuat data Juz {juzNumber}...</p>
      </div>
    );
  }

  if (!verses.length) {
    return (
      <div className="flex justify-center items-center h-64 bg-gradient-to-b from-yellow-600 to-black text-white">
        <p className="text-red-300 text-lg">Data tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen w-full px-4 sm:px-8 py-10 bg-gradient-to-b from-[#0e0e10] via-[#3a2800] to-[#0e0e10] text-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Tombol Kembali */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-300 hover:text-yellow-400 flex items-center gap-2 font-medium cursor-pointer"
        >
          <ArrowLeft size={20} />
          <span>Kembali</span>
        </button>
      </div>

      {/* Judul Juz */}
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-yellow-300 mb-6 select-none">
        Juz {juzNumber}
      </h2>

      {/* Ayat-ayat */}
      <div className="space-y-6">
        {verses.map((verse, index) => (
          <motion.div
            key={index}
            className="bg-[#1a1a1d] p-4 sm:p-6 rounded-2xl shadow-md shadow-black/20 border border-[#2e2e30]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm sm:text-base text-yellow-400 font-semibold mb-2 select-none">
              {verse.surah.englishName} ({verse.surah.number}:{verse.numberInSurah})
            </p>
            <p className="text-xl sm:text-2xl font-arabic text-right text-white leading-loose tracking-wide">
              {verse.text}
            </p>
            <p className="text-sm sm:text-base text-gray-400 mt-4 font-light">
              {verse.translation}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default JuzDetail;
