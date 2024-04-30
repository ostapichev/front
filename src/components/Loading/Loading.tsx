import { FC } from 'react';

import css from './Loading.module.css';

import { okten_logo } from '../../assets';

const Loading: FC = () => {
    return (
        <div className={css.container}>
            <img className={css.logo_loading} src={okten_logo} alt="logoRotate" />
            <h1 className={css.title_loading}>LOADING...</h1>
            <div className={css.overlay}></div>
        </div>
    );
};

export {
    Loading
};
