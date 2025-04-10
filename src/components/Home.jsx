import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainFeatures from './MainFeatures'; 
import HomeSurahOverview from './HomeSurahOverview'; 
import HomeWahyuTimeline from './HomeWahyuTimeline';
import Footer from './Footer';

function Home() {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/surah');
  };

  return (
    <>
      <div 
        className="relative bg-cover bg-center text-white text-center flex justify-center items-center min-h-screen px-4 py-8 sm:py-12 md:py-16"
        id="home"
        style={{ backgroundImage: "url('/maccah-bg.png')" }}
      >
        <div className="absolute inset-0 bg-black opacity-60 z-0"></div>

        <div className="relative z-10 flex flex-col items-center w-full max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xl sm:text-2xl md:text-3xl font-arabic mb-4 pointer-events-none leading-relaxed">
            بِسْمِ ٱللّٰهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide mb-4 font-header drop-shadow-md">
            QURANIC-REW
          </h1>

          <p className="mt-2 text-base sm:text-lg md:text-xl max-w-xl drop-shadow-sm leading-relaxed">
            Quranicrew is a modern web-based Al-Qur'an application that helps you read, listen, and understand the Qur'an anytime, anywhere — with a simple and elegant interface.
          </p>

          <button
            onClick={handleExplore}
            className="mt-8 px-5 py-2.5 sm:px-6 sm:py-3 bg-white text-black font-semibold rounded-full
              transition-all duration-300 ease-in-out transform
              hover:scale-105 hover:bg-gray-200 active:scale-95 shadow-md"
          >
            Explore Now
          </button>
        </div>
      </div>

      <MainFeatures />
      <HomeSurahOverview />
      <HomeWahyuTimeline />
      <Footer />
    </>
  );
}

export default Home;
