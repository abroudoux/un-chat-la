import AuthForm from '@/components/AuthForm';

import useStore from '@/lib/store';


export default function Auth() {

    const { token, username, signIn, setUsername } = useStore();

    return (
        <section className="page">
            {token ? (
                <div>Welcome to your account {username}</div>
            ) : (
                <AuthForm />
            )}
        </section>
    );
};