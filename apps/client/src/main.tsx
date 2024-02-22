import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';

import Home from '@/pages/Home';
import Auth from '@/pages/Auth';
import Account from '@/pages/Account';

import { ThemeProvider } from '@/config/theme-provider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import '@/style/index.css';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
		<BrowserRouter>
			<Header />
			<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/auth" element={<Auth /> }></Route>
					<Route path="/account" element={<Account /> }></Route>
			</Routes>
			<Footer />
			<Toaster richColors />
		</BrowserRouter>
	</ThemeProvider>
)
