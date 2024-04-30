import { FC, useEffect } from 'react';

import { adminActions } from "../../redux";
import { useAppDispatch, useAppSelector } from "../../hooks";

import css from './StatisticOrder.module.css';

const StatisticOrder: FC = () => {
    const dispatch = useAppDispatch();
    const {orderStatistic, userTrigger} = useAppSelector(state => state.adminReducer);
    const {item_count, in_work, new_order, agree, disagree, dubbing, user_count} = orderStatistic;
    useEffect(() => {
        dispatch(adminActions.getStatisticOrder());
    }, [dispatch, userTrigger]);

    return (
        <div className={css.statistic_order_container}>
            <div className={css.statistic_order_block}>
                <div className={css.order_count}>{item_count}</div>
                <div className={css.count_name}>order count</div>
            </div>
            <div className={css.statistic_order_block}>
                <div className={css.order_count}>{user_count}</div>
                <div className={css.count_name}>users</div>
            </div>
            <div className={css.statistic_order_block}>
                <div className={css.order_count}>{new_order}</div>
                <div className={css.count_name}>new order</div>
            </div>
            <div className={css.statistic_order_block}>
                <div className={css.order_count}>{in_work}</div>
                <div className={css.count_name}>in work</div>
            </div>
            <div className={css.statistic_order_block}>
                <div className={css.order_count}>{agree}</div>
                <div className={css.count_name}>agree</div>
            </div>
            <div className={css.statistic_order_block}>
                <div className={css.order_count}>{disagree}</div>
                <div className={css.count_name}>disagree</div>
            </div>
            <div className={css.statistic_order_block}>
                <div className={css.order_count}>{dubbing}</div>
                <div className={css.count_name}>dubbing</div>
            </div>
        </div>
    );
};

export {
    StatisticOrder
};
