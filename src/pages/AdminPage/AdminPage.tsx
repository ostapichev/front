import { FC } from 'react';

import { Loading, PaginationApp, SearchUser, StatisticOrder, UserForm, Users } from "../../components";
import { useAppSelector } from "../../hooks";

import { page_css } from '../../styles/index';

const AdminPage: FC = () => {
    const {users, loading, openUserForm} = useAppSelector(state => state.adminReducer);

    return (
        <div className='d-flex flex-column align-items-center w-100'>
            <StatisticOrder />
            { loading && <Loading /> }
            <div className={loading ? 'd-none' : 'd-flex flex-column align-items-center'}>
                <UserForm/>
                <SearchUser/>
                {!!users.length && <PaginationApp namePage='adminPage'/>}
                <Users/>
                {!!users.length && <PaginationApp namePage='adminPage'/>}
            </div>
            <div className={openUserForm ? page_css.overlay : 'd-none'}></div>
        </div>
    );
};

export {
    AdminPage
};
