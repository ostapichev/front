import { FC, ReactElement } from 'react';
import { Navigate } from "react-router-dom";

import { useAppSelector } from "../hooks";

interface IProps {
    children: ReactElement;
}

const RequiredAuthAdmin: FC<IProps> = ({ children }) => {
    const {me} = useAppSelector(state => state.authReducer);
    if (!me?.is_superuser) {
        return <Navigate to='/orders' />
    }
    return children;
};

export {
    RequiredAuthAdmin
};
