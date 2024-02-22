export type CatProps = {
    _id : string;
    name : string;
    color : string;
    image ? : string;
    onCatDelete : () => void;
    onCatUpdate : () => void;
};

export interface Cat {
	_id : string,
	name : string,
    image ? : string,
	color : string,
};