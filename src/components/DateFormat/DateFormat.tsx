import { FC, Fragment } from 'react';
import { format } from 'date-fns';

interface IProps {
    originalDate: string;
}

const DateFormat: FC<IProps> = ({ originalDate }) => {
    const formatData = format(new Date(originalDate), 'MMMM dd, yyyy');

    return (
        <Fragment>{formatData}</Fragment>
    );
};

export {
    DateFormat
};
