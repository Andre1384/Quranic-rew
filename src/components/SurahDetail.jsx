import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Pause } from 'lucide-react';

function SurahDetail() {
  const { id } = useParams();
  const [verses, setVerses] = useState([]);
  const [translations, setTranslations] = useState([]);
  const [surahName, setSurahName] = useState('');
  const [surahTranslation, setSurahTranslation] = useState('');
  const [qaris, setQaris] = useState([]);
  const [selectedQari, setSelectedQari] = useState(1); // Default Qari ID
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());

  // Fetch Qari list once
  useEffect(() => {
    const fetchQaris = async () => {
      try {
        const res = await fetch('https://api.quran.com/api/v4/resources/recitations');
        const data = await res.json();
        setQaris(data.recitations);
      } catch (err) {
        console.error('Gagal fetch Qari:', err);
      }
    };
    fetchQaris();
  }, []);

  // Fetch surah + audio (1 surah) setiap kali id atau Qari berubah
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [versesRes, translationRes, audioRes, chapterRes] = await Promise.all([
          fetch(`https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${id}`),
          fetch(`https://api.quran.com/api/v4/quran/translations/134?chapter_number=${id}`),
          fetch(`https://api.quran.com/api/v4/chapter_recitations/${selectedQari}/${id}`),
          fetch(`https://api.quran.com/api/v4/chapters/${id}?language=id`)
        ]);

        const versesData = await versesRes.json();
        const translationData = await translationRes.json();
        const audioData = await audioRes.json();
        const chapterData = await chapterRes.json();

        setVerses(versesData.verses);
        setTranslations(translationData.translations || []);
        setAudioUrl(audioData.audio_file.audio_url || '');

        if (chapterData?.chapter?.name_simple) {
          setSurahName(chapterData.chapter.name_simple);
          setSurahTranslation(chapterData.chapter.translated_name?.name || '');
        } else {
          setSurahName('Surah Tidak Ditemukan');
        }

        setLoading(false);
      } catch (err) {
        console.error('Gagal fetch detail surah:', err);
        setSurahName('Surah Tidak Ditemukan');
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      audioRef.current.pause();
      audioRef.current.src = '';
      setIsPlaying(false);
    };
  }, [id, selectedQari]);

  const handlePlayPause = () => {
    const audio = audioRef.current;

    if (!audioUrl) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.src = audioUrl;
      audio.play();
      setIsPlaying(true);
    }

    audio.onended = () => setIsPlaying(false);
  };

  const cleanTranslation = (text) => {
    return text
      .replace(/<[^>]+>/g, '')
      .replace(/&[^;\s]+;/g, '')
      .replace(/foot_note=\d+/g, '')
      .replace(/\d+/g, '')
      .replace(/>/g, '')
      .trim();
  };

  if (loading) return <div className="text-center mt-8 text-white">Loading ayat...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-yellow-900 text-white px-4 py-8 relative">
      <Link
        to="/surah"
        className="absolute top-4 left-4 bg-yellow-600 hover:bg-yellow-700 text-white rounded-full p-2 shadow-lg"
        title="Kembali ke Daftar Surah"
      >
        <ArrowLeft size={20} />
      </Link>

      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold">{surahName}</h2>
        {surahTranslation && (
          <p className="text-yellow-300 text-lg">{surahTranslation}</p>
        )}
      </div>

      <div className="flex flex-col items-center mb-6 gap-4">
        <select
          value={selectedQari}
          onChange={(e) => setSelectedQari(Number(e.target.value))}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md focus:outline-none"
        >
          {qaris.map((qari) => (
            <option key={qari.id} value={qari.id}>
              {qari.reciter_name} - {qari.style}
            </option>
          ))}
        </select>

        <button
          onClick={handlePlayPause}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          {isPlaying ? 'Pause Audio Surah' : 'Play Audio Surah'}
        </button>
      </div>

      <div className="space-y-6">
        {verses.map((verse, index) => (
          <div key={verse.id} className="bg-gray-900 p-4 rounded-lg shadow-md">
            <p className="text-xl mb-2 text-right font-arabic">{verse.text_uthmani}</p>
            <p className="text-gray-300 mt-2">{cleanTranslation(translations[index]?.text || '')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SurahDetail;
