import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function SurahList() {
  const [surahs, setSurahs] = useState([]);
  const [filteredSurahs, setFilteredSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('surah');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch('http://api.quran.com/api/v4/chapters')
      .then(res => res.json())
      .then(data => {
        setSurahs(data.chapters);
        setFilteredSurahs(data.chapters);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching surah:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (location.pathname.includes('/juz/')) {
      setActiveTab('juz');
    } else if (location.pathname.includes('/surah/')) {
      setActiveTab('surah');
    }
  }, [location]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = surahs.filter(
      (surah) =>
        surah.name_simple.toLowerCase().includes(term) ||
        surah.name_arabic.toLowerCase().includes(term) ||
        surah.translated_name.name.toLowerCase().includes(term)
    );
    setFilteredSurahs(filtered);
  };

  const juzList = Array.from({ length: 30 }, (_, i) => i + 1);

  if (loading) return <div className="text-center mt-8 text-white">Loading...</div>;
  if (!surahs.length) return <div className="text-center mt-8 text-red-500">Gagal memuat surah.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-yellow-900 text-white px-4 py-8">
      {/* Header */}
      <div className="flex flex-col items-center justify-center gap-4 mb-8">
        {/* Home + Search Bar */}
        <div className="flex items-center gap-3 w-full max-w-md">
          <button
            onClick={() => navigate('/')}
            className="bg-yellow-500 text-black rounded-full p-2 hover:bg-yellow-400 transition"
          >
            <Home size={20} />
          </button>

          <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-md w-full">
            <Search className="text-yellow-600 mr-2" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search"
              className="bg-transparent outline-none text-black w-full"
            />
          </div>
        </div>

        {/* Judul */}
        <motion.h2
          className="text-3xl font-bold text-yellow-400 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Daftar Surah & Juz
        </motion.h2>

        {/* Tab Navigasi */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => setActiveTab('surah')}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              activeTab === 'surah' ? 'bg-yellow-500 text-black' : 'bg-white text-yellow-700'
            }`}
          >
            Surah
          </button>
          <button
            onClick={() => setActiveTab('juz')}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              activeTab === 'juz' ? 'bg-yellow-500 text-black' : 'bg-white text-yellow-700'
            }`}
          >
            Juz
          </button>
        </div>
      </div>

      {/* Grid Konten */}
      <AnimatePresence mode="wait">
        {activeTab === 'surah' ? (
          <motion.div
            key="surah"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4 }}
          >
            {filteredSurahs.map((surah) => (
              <motion.div
                key={surah.id}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Link to={`/surah/${surah.id}`}>
                  <div className="bg-white text-black p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition">
                    <h3 className="text-xl font-semibold mb-1">
                      {surah.name_simple}{' '}
                      <span className="font-arabic">{surah.name_arabic}</span>
                    </h3>
                    <p className="text-sm">Jumlah Ayat: {surah.verses_count}</p>
                    <p className="text-sm text-gray-600">{surah.translated_name?.name}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="juz"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            {juzList.map((juz) => (
              <motion.div
                key={juz}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  aria-label={`Navigasi ke Juz ${juz}`}
                  onClick={() => navigate(`/juz/${juz}`)}
                  className="bg-yellow-100 text-black p-4 rounded-lg shadow-md cursor-pointer hover:bg-yellow-200 transition text-center"
                >
                  <h3 className="text-xl font-bold">Juz {juz}</h3>
                  <p className="text-sm text-gray-600 mt-1">Klik untuk melihat ayat</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SurahList;
