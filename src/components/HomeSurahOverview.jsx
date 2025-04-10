import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, MapPin, Map, ListOrdered } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from './StatCard';

function HomeSurahOverview() {
  const [stats, setStats] = useState({
    totalSurah: 0,
    makkiyah: 0,
    madaniyah: 0,
    totalAyat: 0,
  });
  const [loading, setLoading] = useState(true);
  const [hoverIndex, setHoverIndex] = useState(null);

  useEffect(() => {
    const fetchSurahStats = async () => {
      try {
        const res = await fetch('https://api.quran.com/api/v4/chapters');
        if (!res.ok) throw new Error('Gagal mengambil data');

        const data = await res.json();
        const chapters = data.chapters;
        const total = chapters.length;
        const makkiyah = chapters.filter(ch => ch.revelation_place === 'makkah').length;
        const madaniyah = chapters.filter(ch => ch.revelation_place === 'madinah').length;
        const totalAyat = chapters.reduce((sum, ch) => sum + ch.verses_count, 0);

        setStats({ totalSurah: total, makkiyah, madaniyah, totalAyat });
      } catch (err) {
        console.error('Gagal fetch statistik surah:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSurahStats();
  }, []);

  const COLORS = ['#FFD700', '#111111']; // Emas dan hitam

  const floatingAnimation = {
    animate: {
      y: [0, -5, 0],
      transition: {
        repeat: Infinity,
        duration: 3,
        ease: 'easeInOut',
      },
    },
  };

  const statCards = [
    {
      title: 'Total Surah',
      value: stats.totalSurah,
      icon: (
        <motion.div {...floatingAnimation}>
          <BookOpen className="w-7 h-7 text-blue-600" />
        </motion.div>
      ),
    },
    {
      title: `Surah Makkiyah (${((stats.makkiyah / stats.totalSurah) * 100).toFixed(1)}%)`,
      value: stats.makkiyah,
      icon: (
        <motion.div {...floatingAnimation}>
          <MapPin className="w-7 h-7 text-green-600" />
        </motion.div>
      ),
    },
    {
      title: `Surah Madaniyah (${((stats.madaniyah / stats.totalSurah) * 100).toFixed(1)}%)`,
      value: stats.madaniyah,
      icon: (
        <motion.div {...floatingAnimation}>
          <Map className="w-7 h-7 text-yellow-600" />
        </motion.div>
      ),
    },
    {
      title: 'Total Ayat',
      value: stats.totalAyat,
      icon: (
        <motion.div {...floatingAnimation}>
          <ListOrdered className="w-7 h-7 text-purple-600" />
        </motion.div>
      ),
    },
  ];

  const chartData = [
    { name: 'Makkiyah', value: stats.makkiyah },
    { name: 'Madaniyah', value: stats.madaniyah },
  ];

  return (
    <section className="relative py-12 px-4 overflow-hidden">
      {/* Gambar latar belakang buram */}
      <div className="absolute inset-0 bg-[url('/pattern-islamic.png')] bg-cover opacity-70 blur-sm z-0" />

      {/* Konten utama */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center mb-4 drop-shadow-lg text-gray-800"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Statistik Al-Qur'an
        </motion.h2>

        <motion.p
          className="text-center text-gray-700 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Menyajikan statistik inti Al-Qur'an: jumlah surah, kategori wahyu, dan total ayat untuk membantu memahami strukturnya secara menyeluruh.
        </motion.p>

        {loading ? (
          <motion.p
            className="text-center text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Memuat statistik...
          </motion.p>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-5 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Stat Cards */}
            <div className="md:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {statCards.map((card, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                  viewport={{ once: true }}
                >
                  <StatCard icon={card.icon} title={card.title} value={card.value} />
                </motion.div>
              ))}
            </div>

            {/* Pie Chart with Floating & Hover */}
            <motion.div
              className="flex items-center justify-center"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            >
              <ResponsiveContainer width={180} height={180}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="value"
                    label
                    onMouseEnter={(_, i) => setHoverIndex(i)}
                    onMouseLeave={() => setHoverIndex(null)}
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        style={{
                          transform: hoverIndex === index ? 'scale(1.1)' : 'scale(1)',
                          transformOrigin: 'center',
                          transition: 'transform 0.3s ease',
                        }}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default HomeSurahOverview;