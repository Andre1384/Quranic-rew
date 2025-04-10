import React from 'react';
import { BookOpenText, Github, Mail } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-white via-gray-50 to-white text-gray-700 mt-24 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand & Deskripsi */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <BookOpenText className="w-6 h-6 text-yellow-500" />
            <span className="font-bold text-lg">Quranic-rew</span>
          </div>
          <p className="text-sm text-gray-600">
            Memberikan pengalaman membaca Al-Qur’an yang interaktif, informatif, dan mudah diakses untuk semua kalangan.
          </p>
        </div>

        {/* Fitur */}
        <div>
          <h4 className="text-md font-semibold mb-2">Features</h4>
          <ul className="text-sm space-y-1">
            <li>• Daftar Surah</li>
            <li>• Detail & Terjemahan</li>
            <li>• Audio Tilawah</li>
            <li>• Navigasi Juz</li>
          </ul>
        </div>

        {/* Teknologi */}
        <div>
          <h4 className="text-md font-semibold mb-2">APIs & Technology</h4>
          <ul className="text-sm space-y-1">
            <li>
              <span className="text-gray-600">• Quran.com API</span>
            </li>
            <li>• React + Tailwind CSS</li>
            <li>• Framer Motion</li>
            <li>• Lucide Icons</li>
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <h4 className="text-md font-semibold mb-2">Contact</h4>
          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">12350111588@students.uin-suska.ac.id</span>
            </li>
            <li className="flex items-center gap-2">
              <Github className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">Andre1384</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Aplikasi Al-Qur’an.
      </div>
    </footer>
  );
}

export default Footer;
