import { ChangeEvent, FC } from 'react';

import { Pagination, Box } from "@mui/material";

import { commentActions } from "../../redux";
import { IComment } from "../../interfaces";
import { useAppDispatch, useAppSelector } from "../../hooks";

interface IProps {
    comments?: IComment[];
}

const CommentsPaginate: FC<IProps> = ({ comments }) => {
    const dispatch = useAppDispatch();
    const {totalPageComments, pageComments, pageSize} = useAppSelector(state => state.commentReducer);
    const countPages: number = Math.ceil( comments.length / pageSize);
    const getDataPage = (): number[] => {
        if (comments) {
            dispatch(commentActions.setTotalPages(countPages));
        }
        return [totalPageComments, pageComments];
    };
    const dataPage: number[] = getDataPage();
    const handleChangePage = (event: ChangeEvent<unknown>, num: number): void => {
        dispatch(commentActions.setPage(num));
    };

    return (
        <Box justifyContent='center'
             alignItems='center'
             display='flex'
             sx={{ margin: '20px 0' }}>
                { (dataPage[0] > 1) &&
                    <Pagination
                        count={dataPage[0]}
                        page={dataPage[1]}
                        onChange={handleChangePage}
                        color="primary"
                        siblingCount={2}
                    />
                }
        </Box>
    );
};

export {
    CommentsPaginate
};
