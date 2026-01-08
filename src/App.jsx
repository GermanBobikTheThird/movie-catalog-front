import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import MediaPage from './pages/MediaPage';

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="/media/:id" element={<MediaPage />} />
                    <Route path="*" element={<div>Page not found</div>} />
                </Route>
            </Routes>
        </HashRouter>
    );
}

export default App;
