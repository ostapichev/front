import { FC } from 'react';

import css from "./NotFound.module.css";

const NotFound: FC = () => {
    return (
        <div className={css.not_found}>
            <h1 className={css.header}>404</h1>
            <p className={css.text_page}>Page&#160;Not&#160;Found</p>
        </div>
    );
};

export {
    NotFound
};
