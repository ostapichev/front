import { FC } from 'react';

import { NotFound } from '../../components';

const NotFoundPage: FC = () => {
    return (
        <div className="bg-success vh-100 vw-100">
            <NotFound />
        </div>
    );
};

export {
    NotFoundPage
};
