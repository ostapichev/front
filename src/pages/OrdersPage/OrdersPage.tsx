import { FC } from 'react';

import { InputBlock, Loading, MyBlockButton, OrderForm, Orders, PaginationApp } from "../../components";
import { useAppSelector } from "../../hooks";

import css from './OrdersPage.module.css';
import { page_css } from '../../styles/index';

const OrdersPage: FC = () => {
    const {orders, loading, openOrderForm} = useAppSelector(state => state.orderReducer);

    return (
        <div className={css.order_page}>
            <div className={css.inputs_actions}>
                <InputBlock />
                <MyBlockButton />
            </div>
            { loading && <Loading /> }
            <div className={loading ? 'd-none' : css.orders_block}>
                <OrderForm />
                <Orders />
                { !!orders.length && <PaginationApp namePage='homePage' /> }
            </div>
            <div className={openOrderForm ? page_css.overlay : 'd-none'}></div>
        </div>
    );
};

export {
    OrdersPage
};
