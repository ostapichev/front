import { ChangeEvent, FC } from 'react';
import { useSearchParams } from "react-router-dom";

import { Pagination, Stack } from '@mui/material';

import { adminActions, orderActions } from "../../redux";
import { useAppDispatch, useAppSelector } from "../../hooks";

interface IProps {
    namePage: string;
}

const PaginationApp: FC<IProps> = ({ namePage }) => {
    const dispatch = useAppDispatch();
    const [query] = useSearchParams();
    const {totalPagesOrders} = useAppSelector(state => state.orderReducer);
    const {totalPagesUsers} = useAppSelector(state => state.adminReducer);
    const getDataPage = (): number[] => {
        if (namePage === 'homePage') {
            return [totalPagesOrders, +query.get('page') || 1];
        } else if (namePage === 'adminPage') {
            return [totalPagesUsers, +query.get('page') || 1];
        }
        alert('Pagination: button error');
    };
    const handlerChangePage = (event: ChangeEvent<unknown>, num: number): void => {
        switch (namePage) {
            case 'homePage':
                dispatch(orderActions.setPage(num));
                break;
            case 'adminPage':
                dispatch(adminActions.setPage(num));
                break;
            default:
                alert('Pagination: name page error');
        }
    };
    const dataPage: number[] = getDataPage();

    return (
        <Stack spacing={2} sx={{ marginY: 3 }}>
            { (dataPage[0] > 1) &&
                <Pagination
                    count={dataPage[0]}
                    page={dataPage[1]}
                    onChange={handlerChangePage}
                    color="primary"
                    siblingCount={2}
                    showFirstButton
                    showLastButton
                />
             }
        </Stack>
    );
};

export  {
    PaginationApp
};
