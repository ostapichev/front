import { FC } from 'react';
import { useLocation } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { GetExelFile } from "../GetExelFile/GetExelFile";
import { history } from "../../services";
import { IFuncVoid } from "../../types";
import { orderActions } from "../../redux";
import { useAppDispatch, useAppSelector } from "../../hooks";

import css from "./MyBlockButton.module.css";

import {create, reload} from '../../assets';

const MyBlockButton: FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const {checkbox} = useAppSelector(state => state.orderReducer);
    const {me} = useAppSelector(state => state.authReducer);
    const handler: IFuncVoid = () => {
        dispatch(orderActions.setCheckBox(me.id));
        dispatch(orderActions.setPage('1'));
    };
    const createOrder: IFuncVoid = () => {
        dispatch(orderActions.openForm());
    };
    const setDefaultParams: IFuncVoid = () => {
        dispatch(orderActions.resetParams());
        const {pathname} = location;
        history.push(pathname);
    };

    return (
        <div className={css.block_filters}>
            <div className='mb-1'>
                <Form.Check
                    id='myOrders'
                    checked={checkbox}
                    aria-label="My_orders"
                    inline onChange={handler}
                />
                <label className={css.my} htmlFor='myOrders'>My orders</label>
            </div>
            <div className={css.icon_block}>
                <OverlayTrigger
                    placement="top"
                    overlay={ <Tooltip>Reset params</Tooltip> }
                >
                    {({ref, ...triggerHandler}) => (
                        <Image
                            className={css.icon}
                            ref={ref}
                            src={reload}
                            alt='reload'
                            onClick={setDefaultParams}
                            {...triggerHandler}
                        />
                    )}
                </OverlayTrigger>
                <OverlayTrigger
                    placement="top"
                    overlay={ <Tooltip>Create new order</Tooltip> }
                >
                    {({ref, ...triggerHandler}) => (
                        <Image
                            className={css.icon}
                            ref={ref}
                            src={create}
                            alt='create_icon'
                            onClick={createOrder}
                            {...triggerHandler}
                        />
                    )}
                </OverlayTrigger>
                <GetExelFile />
            </div>
        </div>
    );
};

export {
    MyBlockButton
};
