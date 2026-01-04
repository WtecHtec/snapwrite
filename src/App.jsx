import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { DraftProvider } from './context/DraftContext';
import LandingPage from './pages/LandingPage';
import EditorPage from './pages/EditorPage';

function App() {
  return (
    <BrowserRouter>
      <DraftProvider>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/app" element={<EditorPage />} />
          </Routes>
          <Toaster position="top-center" />
        </div>
      </DraftProvider>
    </BrowserRouter>
  )
}

export default App
