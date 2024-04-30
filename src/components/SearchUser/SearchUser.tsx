import { FC } from 'react';
import { joiResolver } from "@hookform/resolvers/joi";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import { InputGroup } from "react-bootstrap";

import { adminActions } from "../../redux";
import { history } from '../../services';
import { IFuncVoid } from "../../types";
import { ISearch } from "../../interfaces";
import { searchValidator } from "../../validators";
import { useAppDispatch, useAppSelector } from "../../hooks";

const SearchUser: FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const {users, paramsUsers} = useAppSelector(state => state.adminReducer);
    const {register, reset, handleSubmit, formState: {isValid}} = useForm<ISearch>({
        mode: 'all',
        resolver: joiResolver(searchValidator)
    });
    const paramsChecked: boolean = JSON.stringify(paramsUsers) === '{}';
    const onSubmit: SubmitHandler<ISearch> = (data: ISearch) => {
        dispatch(adminActions.setSearchUser(data.surnameUserInput));
        dispatch(adminActions.setPage('1'));
        reset();
    };
    const resetParams: IFuncVoid = () => {
        const {pathname} = location;
        history.push(pathname);
        dispatch(adminActions.resetParams());
    };

    return (
        <Form
            className={!users.length ? 'd-none' : 'w-50'}
            onSubmit={handleSubmit(onSubmit)}
        >
            <InputGroup>
                <Form.Control
                    type="search"
                    placeholder="search user by surname"
                    {...register('surnameUserInput')}
                />
                <Button
                    type="submit"
                    className='z-1'
                    variant="primary"
                    disabled={!isValid}
                >
                    Search
                </Button>
                <Button
                    type='reset'
                    className='z-1'
                    variant="outline-secondary"
                    onClick={resetParams}
                    disabled={paramsChecked}
                >
                    Reset
                </Button>
            </InputGroup>
        </Form>
    );
};

export {
    SearchUser
};
