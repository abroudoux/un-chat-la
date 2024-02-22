import { FC } from 'react';
import { motion } from 'framer-motion';

import { EditCat } from '@/components/Cards/EditCat';
import { DeleteCat } from '@/components/Cards/DeleteCat';

import { CatProps } from '@/models/cat.model';


export const CardCat : FC<CatProps> = ( props ) => {

    const cardVariants = {
        visible : {
            x: 0,
            opacity: 1,
        },
        hidden : {
            x: 100,
            opacity: 0,
        },
    };

    return (
        <motion.li className="reorder-handle rounded-lg my-6 border-grey-light cursor-row-resize bg-background border-[1px] flex-col-center-between py-3 px-5 w-96" key={ props._id || 'defaultKey' } variants={cardVariants}>
            <div className="w-full flex-row-center-between">
                <ul className="flex-col-center-between">
                    <li className="text-2xl font-normal">{ props.name }</li>
                    <li className="font-light text-base">Color : { props.color }</li>
                </ul>
                <ul className="flex-row-center-center gap-3">
                    <EditCat _id={ props._id } name={ props.name } color={ props.color } onCatDelete={ props.onCatDelete } onCatUpdate={ props.onCatUpdate } />
                    <DeleteCat _id={ props._id } name={ props.name } color={ props.color } onCatDelete={ props.onCatDelete } onCatUpdate={ props.onCatUpdate } />
                </ul>
            </div>
            <div className="flex-col-center-center w-full py-4">
                <img src={ props.image } alt="" className="w-full h-auto rounded-lg" />
            </div>
        </motion.li>
    );
};
