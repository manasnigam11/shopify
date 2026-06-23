/**
 * MainLayout — Public storefront layout.
 * Wraps Header + Footer around page content via React Router <Outlet />.
 */
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

export default function MainLayout() {
  return (
    <div className="app-shell">
      <Header />
      <main className="container page-container">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
