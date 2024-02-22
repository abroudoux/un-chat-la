import { useState } from 'react';

import useStore from '@/lib/store';
import { Cat } from '@/models/cat.model';


const { isLoading, setIsLoading } = useStore();
const [cats, setCats] = useState<Cat[]>([]);
const [error, setError] = useState();

const fetchCats = async () => {

    setIsLoading(true);

    try {
        const response = await fetch(`api/cats`);
        const cats = (await response.json()) as Cat[];
        setCats(cats);
    } catch (e : any) {
        setError(e);
    } finally {
        setIsLoading(false);
    };
};


export default fetchCats();