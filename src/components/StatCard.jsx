import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ icon, title, value }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-gray-50 rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-200 hover:border-yellow-500"
  >
    <div className="mb-3 flex justify-center">{icon}</div>
    <h3 className="text-base font-medium text-gray-700">{title}</h3>
    <p className="text-3xl font-bold text-indigo-700">{value}</p>
  </motion.div>
);

export default StatCard;
