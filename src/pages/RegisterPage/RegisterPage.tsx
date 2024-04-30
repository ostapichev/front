import { FC } from 'react';

import { RegisterFormApp } from "../../components";

import { page_css } from '../../styles/index';

interface IProps {
    page: string;
}

const RegisterPage: FC<IProps> = ({ page }) => {
    return (
        <div className={page_css.start_page}>
            <RegisterFormApp page={page} />
        </div>
    );
};

export {
    RegisterPage
};
