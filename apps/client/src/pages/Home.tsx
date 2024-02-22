import useStore from '@/lib/store';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import Dashboard from '@/components/Dashboard';


export default function Home() {

	const { token } = useStore();

	if (!token) {
		return (
			<section className="page flec-col-center-center gap-10">
				<h1 className="text-2xl max-w-xs text-center">To start managing chats, sign in or create an account</h1>
				<Button>
					<Link to="/auth">
						Sign In
					</Link>
				</Button>
			</section>
		);
	};

	return (
		<Dashboard />
  	);

};

