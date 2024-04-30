import { FC } from 'react';

import { LoginForm } from "../../components";

import { page_css } from '../../styles/index';

const LoginPage: FC = () => {
    return (
        <div className={page_css.start_page}>
            <LoginForm />
        </div>
    );
};

export {
    LoginPage
};
