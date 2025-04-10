import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SurahList from './components/SurahList';
import SurahDetail from './components/SurahDetail';
import JuzDetail from './components/JuzDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/surah" element={<SurahList />} />
      <Route path="/surah/:id" element={<SurahDetail />} />
      <Route path="/juz/:juzNumber" element={<JuzDetail />} />
    </Routes>
  );
}

export default App;
