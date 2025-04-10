import React from 'react';
import { BookOpen, Compass, Search, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <BookOpen size={32} />,
    title: 'Daftar Surah',
  },
  {
    icon: <Compass size={32} />,
    title: 'Navigasi Juz',
  },
  {
    icon: <Search size={32} />,
    title: 'Pencarian Ayat',
  },
  {
    icon: <Volume2 size={32} />,
    title: 'Audio Tilawah (segera)',
    disabled: true,
  },
];

function MainFeatures() {
  return (
    <div
      className="relative text-gray-800 py-16 text-center overflow-hidden select-none caret-transparent"
      style={{
        backgroundImage: "url('/pattern-islamic.png')",
        backgroundRepeat: 'repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'top-center',
      }}
    >
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-0" />

      <div className="relative z-10 px-4 sm:px-6">
        <motion.h2
          className="text-3xl font-bold mb-2 drop-shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Fitur Utama
        </motion.h2>

        <motion.p
          className="mb-10 text-gray-600 drop-shadow-sm max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Temukan kemudahan dalam membaca dan memahami Al-Qur'an melalui fitur-fitur yang kami sediakan.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index, duration: 0.5 }}
              className={`group bg-white/90 text-black rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center transition duration-300 hover:shadow-2xl hover:brightness-105 hover:ring-2 hover:ring-yellow-400 ${
                feature.disabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <motion.div
                className="mb-4 text-primary"
                whileHover={{
                  rotate: 15,
                  scale: 1.2,
                  transition: { type: 'spring', stiffness: 300 },
                }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-base sm:text-lg font-semibold text-center">{feature.title}</h3>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="mt-12 italic text-gray-600 drop-shadow-md text-sm sm:text-base"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          “Sesungguhnya Al-Qur'an ini memberikan petunjuk kepada (jalan) yang lebih lurus...” <br />
          <span className="text-xs">[QS. Al-Isra: 9]</span>
        </motion.p>
      </div>
    </div>
  );
}

export default MainFeatures;
