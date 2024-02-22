import useStore from "@/lib/store";


export default function Account() {

    const { username } = useStore();

    return (
        <div>Welcome to yout account {username}</div>
    );
};