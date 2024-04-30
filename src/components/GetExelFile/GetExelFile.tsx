import { FC } from 'react';

import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { IFuncVoid } from "../../types";
import { orderActions } from "../../redux";
import { useAppDispatch, useAppSelector } from "../../hooks";

import css from '../MyBlockButton/MyBlockButton.module.css';

import { exel } from "../../assets";

const GetExelFile: FC = () => {
    const dispatch = useAppDispatch();
    const {paramsOrders} = useAppSelector(state => state.orderReducer);
    const getFile: IFuncVoid = async () => {
        await dispatch(orderActions.getExelFile({params: paramsOrders}));
    }

    return (
        <OverlayTrigger
            placement="top"
            overlay={ <Tooltip>Get exel file by orders</Tooltip> }
        >
            {({ref, ...triggerHandler}) => (
                <Image
                    className={css.icon}
                    ref={ref}
                    src={exel}
                    alt='exel_icon'
                    onClick={getFile}
                    {...triggerHandler}
                />
            )}
        </OverlayTrigger>
    );
};

export {
    GetExelFile
};
