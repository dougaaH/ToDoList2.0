import '../styles/globals.css';
import { AuthProvider } from '../context/AuthContext';
import { Inter } from 'next/font/google';

const inter = Inter({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-inter',
});

export default function App({ Component, pageProps }) {
    return <main className={`${inter.variable} font-sans`}><AuthProvider>
        <Component {...pageProps} />
    </AuthProvider></main>;
}