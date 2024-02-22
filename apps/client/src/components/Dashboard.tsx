import { ChangeEvent, useEffect, useState } from 'react';
import { Reorder } from 'framer-motion';
import { toast } from 'sonner';

import loading from '@/lib/loading';
import useStore from '@/lib/store';
import { Cat } from '@/models/cat.model';

import Loading from "@/pages/Loading";
import Error from "@/pages/Error";

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CardCat } from '@/components/Cards/CardCat';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';


export default function Dashboard() {

	const { isDeleting, isUpdating, isCreating, username, isLoading, setIsLoading, setIsCreating } = useStore();
	const [error, setError] = useState();
	const [cats, setCats] = useState<Cat[]>([]);
	const [name, setName] = useState('');
	const [color, setColor] = useState('');

	const handleCreateCat = async () => {

		setIsCreating(true);
		await loading(2000);

		try {
			const response = await fetch(`api/cats`, {
				method: 'POST',
				headers: {
			  		'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name, color }),
		  	});

			if (response.ok) {
				const newCat = (await response.json()) as Cat;
				setCats((prevCats) => [...prevCats, newCat]);
				toast.success('Cat successfully created !');
			} else {
				toast.error('Failed to create cat');
			};

		} catch (error : any) {
			toast.error('Error during cat creation', error.message);
		} finally {
			setIsCreating(false);
		};
	};

	const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
		switch (e.target.id) {
			case 'name':
				setName(e.target.value);
				break;
			case 'color':
				setColor(e.target.value);
				break;
			default:
				break;
		};
	};

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

	useEffect(() => {
		fetchCats();
	}, []);

	if (isLoading) {
		return <Loading aria-busy="true" />
	};

	if (error) {
		return <Error />
	};

	return (
		<section className="page">
			<h1 className="text-3xl mb-4 text-center">Hello {username}, meet your (cutes) friends :</h1>
			{cats.length === 0 ? (
      			<p className="page text-xl font-normal">No cats found. Add a new cat?</p>
    		) : (
				<Reorder.Group axis="y" values={cats} onReorder={setCats}>
					{cats.map((cat) => (
						<Reorder.Item key={cat._id} value={cat}>
							<CardCat key={cat._id} _id={cat._id} name={cat.name} color={cat.color} image={cat.image} onCatDelete={fetchCats} onCatUpdate={fetchCats} />
						</Reorder.Item>
					))}
				</Reorder.Group>
    		)}
			<div className="flex-row-center-between gap-3">
				<p className="text-lg">Add a new cat ?</p>
				<Dialog {...Dialog}>
						<DialogTrigger asChild>
							<Button variant="outline" className="flex-col-center-center" disabled={isDeleting || isUpdating}>
								{isCreating ?
									<Icons.spinner className="h-4 w-4 animate-spin" /> : 'Create'
								}
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle>Create a new cat</DialogTitle>
							</DialogHeader>
							<div className="grid gap-4 py-4">
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="name" className="text-right">Name</Label>
									<Input id="name" placeholder="What's his name?" className="col-span-3" value={name} onChange={handleChange} />
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="color" className="text-right">Color</Label>
									<Input id="color" placeholder="Which color is it?" className="col-span-3" value={color} onChange={handleChange} />
								</div>
							</div>
							<DialogFooter>
								<DialogClose asChild>
									<Button type="submit" onClick={handleCreateCat} disabled={isCreating}>
										{isCreating && (
											<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
										)}
										Create
									</Button>
								</DialogClose>
							</DialogFooter>
						</DialogContent>
    			</Dialog>
			</div>
		</section>
  	);

};

