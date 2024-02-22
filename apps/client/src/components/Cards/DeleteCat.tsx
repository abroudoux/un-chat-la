import { FC } from 'react';
import { toast } from 'sonner';

import loading from '@/lib/loading';
import useStore from "@/lib/store";
import { CatProps } from '@/models/cat.model';

import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Icons } from '@/components/ui/icons';


export const DeleteCat : FC<CatProps> = ( props ) => {

    const { isDeleting, isUpdating, isLoading, isCreating, setIsDeleting } = useStore();

    const handleDelete = async () => {

        setIsDeleting(true);
        await loading(2000);

        try {
            const response = await fetch(`api/cats/${props._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                props.onCatDelete();
				toast.success('Cat successfully deleted !');
            } else {
				toast.error('Cat successfully deleted !');
                throw new Error('Failed to delete cat');
            };

        } catch (error: any) {
			toast.error('Error during cat deletion', error.message);
        } finally {
            setIsDeleting(false);
        };
    };

    return (
        <li className="cursor-pointer">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline" className="flex-col-center-center" size="icon" disabled={isDeleting || isUpdating || isLoading || isCreating}>
                        {isDeleting ?
                            <Icons.spinner className="h-4 w-4 animate-spin" /> : '❌'}
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your (beautiful) cat.
                            </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsDeleting(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                            {isDeleting && (
                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                )}
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </li>
    );
};
