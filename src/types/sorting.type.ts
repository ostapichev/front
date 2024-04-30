type IOrderBySorting = string;
type ISortingReverse = (orderBy: IOrderBySorting) => void;
type IFuncVoid = () => void;

export type {
    ISortingReverse,
    IFuncVoid
};
