import { FC, useEffect } from 'react';
import { useDebounce } from "use-debounce";
import { useSearchParams } from "react-router-dom";

import { adminActions } from "../../redux";
import { ButtonApp } from "../ButtonApp/ButtonApp";
import { DataMessage } from "../DataMessage/DataMessage";
import { IParams } from "../../interfaces";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { User } from "../User/User";

import css from './Users.module.css';

const Users: FC = () => {
    const dispatch = useAppDispatch();
    const {users, userTrigger, paramsUsers, showParams} = useAppSelector(state => state.adminReducer);
    const {authTrigger} = useAppSelector(state => state.authReducer);
    const [query, setQuery] = useSearchParams();
    const [debouncedParams] = useDebounce<IParams>(
        {
            page: query.get('page'),
            surname: query.get('surname')
        }, 1000);
    const debouncedParamsString: string = JSON.stringify(debouncedParams);
    useEffect(() => {
        const queryParams: string[] = [];
        if (showParams) {
            queryParams.push(`page=${encodeURIComponent(paramsUsers.page)}`);
        }
        if (paramsUsers.surname) {
            queryParams.push(`surname=${encodeURIComponent(paramsUsers.surname)}`);
        }
        if (queryParams.length) {
            setQuery(`?${queryParams.join('&')}`);
        }
    }, [paramsUsers, showParams, setQuery]);
    useEffect(() => {
        const params: IParams = JSON.parse(debouncedParamsString);
        dispatch(adminActions.getAll({ params }));
    }, [dispatch, userTrigger, authTrigger, debouncedParamsString]);

    return (
        <div className={!users.length ? 'd-none' : css.table_users}>
            <div className={css.table_head}>
                <div className={css.head_user}>Users</div>
                <div className={css.btn_user_create}>
                    <ButtonApp />
                </div>
            </div>
            {
                users.map(user => <User
                    key={user.id}
                    user={user}
                />)
            }
            <DataMessage />
        </div>
    );
};

export {
    Users
};
