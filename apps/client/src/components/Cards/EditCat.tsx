import { FC, useState } from 'react';
import { toast } from 'sonner';

import loading from '@/lib/loading';
import useStore from "@/lib/store";
import { CatProps } from '@/models/cat.model';

import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/ui/icons';


export const EditCat : FC<CatProps> = ( props ) => {

    const { isDeleting, isUpdating, isLoading, isCreating, setIsUpdating, setIsLoading } = useStore();

    const [catData, setCatData] = useState({
        name : '',
        color : '',
        image : '',
    });

    const [catDataUpdated, setCatDataUpdated] = useState({
        name : '',
        color : '',
    });

    const handleSheetOpen = async () => {

        setIsUpdating(true);
        await loading(1000);

        try {
            const response = await fetch(`api/cats/${props._id}`);
            setIsLoading(false);
            const catData = await response.json();
            setCatData(catData);
        } catch (error) {
            console.error('Error fetching cat data', error);
        } finally {
            setIsUpdating(false);
        };
    };

    const handleUpdate = async () => {

        setIsUpdating(true);

        try {
            const response = await fetch(`api/cats/${props._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(catDataUpdated),
            });

            if (response.ok) {
                setCatData({ ...catData, ...catDataUpdated });
                props.onCatUpdate();
				toast.success('Cat updated successfully !');
            } else {
				toast.error('Error during cat updating');
                throw new Error('Failed to update cat');
            };

        } catch (error: any) {
            toast.error('Error during cat updating', error.message);
        } finally {
            setIsUpdating(false);
        };

    };

    const handleUpdatecatImage = async () => {

        setIsUpdating(true);

        try {
            const response = await fetch(`api/cats/${props._id}/update-image`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(catDataUpdated),
            });

            if (response.ok) {
                setCatData({ ...catData, ...catDataUpdated });
                props.onCatUpdate();
				toast.success('Cat updated successfully !');
            } else {
				toast.error('Error during cat updating');
                throw new Error('Failed to update cat');
            };

        } catch (error: any) {
            toast.error('Error during cat image updating', error.message);
        } finally {
            setIsUpdating(false);
        };
    };


    return (
        <li className="cursor-pointer">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" onClick={handleSheetOpen} disabled={isUpdating || isDeleting || isLoading || isCreating}>
                        {isUpdating ?
                        <Icons.spinner className="h-4 w-4 animate-spin" />  : '🔎'
                        }
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Edit cat</SheetTitle>
                        <SheetDescription>
                            Make changes to your cat here.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4 h-10">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            {isUpdating ? 
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> 
                                :
                                <Input id="name" className="col-span-3" defaultValue={catData.name} onChange={(e) => setCatDataUpdated({ ...catDataUpdated, name: e.target.value })}/>
                            }
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4 h-10">
                            <Label htmlFor="color" className="text-right">
                                Color
                            </Label>
                            {isUpdating ? 
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> 
                                :
                                <Input id="color" className="col-span-3" defaultValue={catData.color} onChange={(e) => setCatDataUpdated({ ...catDataUpdated, color: e.target.value })}/>
                            }
                        </div>
                        <div className="w-full">
                            {isUpdating ?
                                <div className="w-full flex-row-center-center">
                                    <Icons.spinner className="mr-4 h-4 w-4 animate-spin" /> 
                                </div> 
                                :
                                <div className="flex-row-center-center w-full relative">
                                    <img src={catData.image} alt="" className="rounded-lg" />
                                    <Button variant="outline" className="absolute right-2 bottom-2" onClick={handleUpdatecatImage} disabled={isUpdating || isDeleting || isLoading || isCreating}>
                                        {isUpdating ?
                                            <Icons.spinner className="h-4 w-4 animate-spin" />  : 'New image'
                                        }
                                    </Button>
                                </div>
                            }
                        </div>
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit" onClick={handleUpdate} disabled={isLoading}>
                                {isUpdating && (
                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                {isUpdating ? 'Loading..' : 'Update'}
                            </Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </li>
    );
};
