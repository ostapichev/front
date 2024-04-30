import { FC } from 'react';

import { adminActions } from "../../redux";
import { IFuncVoid } from "../../types";
import { useAppDispatch } from "../../hooks";

import { button_css } from '../../styles/index';

const ButtonApp: FC = () => {
    const dispatch = useAppDispatch();
    const handleOpen: IFuncVoid = () => {
        dispatch(adminActions.openUserForm());
    };

    return (
        <button
            type="button"
            className={button_css.btn_open}
            onClick={handleOpen}
        >
            Create
        </button>
    );
};

export {
    ButtonApp
};
