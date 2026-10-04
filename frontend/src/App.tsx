import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { BuildPage } from './components/BuildPage';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/build" element={<BuildPage />} />
            </Routes>
        </BrowserRouter>
    );
}