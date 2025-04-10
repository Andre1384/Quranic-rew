import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const timeline = [
  {
    year: '610 M',
    title: 'Wahyu Pertama',
    description: 'Surah Al-‘Alaq ayat 1–5 diturunkan kepada Nabi Muhammad SAW di Gua Hira.',
    icon: '📜',
  },
  {
    year: '613 M',
    title: 'Dakwah Terbuka',
    description: 'Nabi mulai menyampaikan ajaran Islam secara terang-terangan.',
    icon: '📣',
  },
  {
    year: '622 M',
    title: 'Hijrah ke Madinah',
    description: 'Perpindahan Nabi dan umat Islam ke Madinah, wahyu mulai menyorot hukum-hukum sosial.',
    icon: '🕌',
  },
  {
    year: '632 M',
    title: 'Wahyu Terakhir',
    description: 'Surah Al-Ma’idah ayat 3 diturunkan sebelum wafatnya Nabi Muhammad SAW.',
    icon: '✨',
  },
];

function HomeWahyuTimeline() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/pattern-islamic.png')] bg-cover bg-center opacity-70 blur-sm z-0" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h2
          className="text-2xl sm:text-3xl font-bold text-center mb-10 text-gray-800"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Perjalanan Wahyu Al-Qur'an
        </motion.h2>

        <div className="border-l-4 border-yellow-500 pl-4 sm:pl-6 space-y-10 relative">
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              className="relative bg-white/70 rounded-lg p-4 sm:p-5 shadow transition duration-500 ease-in-out"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {/* Titik dan Icon */}
              <div className="absolute -left-8 top-3 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-yellow-500 text-white text-sm sm:text-base font-bold rounded-full shadow-md">
                {item.icon}
              </div>

              <p className="text-sm text-gray-500 font-medium">{item.year}</p>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">{item.title}</h3>
              <p className="text-sm sm:text-base text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-base sm:text-lg font-medium text-gray-700 mb-4">
            Perjalanan wahyu telah sampai kepada kita.
          </p>
          <a
            href="/surah"
            className="inline-flex items-center px-5 sm:px-6 py-2.5 sm:py-3 bg-yellow-500 text-white font-semibold rounded-full shadow-md hover:bg-yellow-600 transition"
          >
            Mulai Membaca Sekarang
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default HomeWahyuTimeline;
