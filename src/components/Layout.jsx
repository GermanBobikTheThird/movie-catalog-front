import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
    return (
        <div>
            <Header />
            <main style={{ minHeight: '80vh', padding: '20px 0' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                    <Outlet />
                </div>
            </main>
            <footer style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                © 2025 MovieCatalog
            </footer>
        </div>
    );
};

export default Layout;