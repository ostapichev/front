import { FC, MouseEventHandler, useCallback, useEffect } from 'react';
import { NavLink, useLocation } from "react-router-dom";

import { adminActions, authActions, orderActions } from "../../redux";
import { authService, history } from "../../services";
import { IFuncVoid } from "../../types";
import { Profile } from "../Profile/Profile";
import { useAppDispatch, useAppSelector } from "../../hooks";

import css from './Header.module.css';

import { admin_panel, home_page, login, log_out, okten_school } from '../../assets';

const Header: FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const {me} = useAppSelector(state => state.authReducer);
    const isAdmin = me?.is_superuser || false;
    const defaultParamsOrders: MouseEventHandler<HTMLAnchorElement> = () => {
        dispatch(orderActions.resetParams());
    };
    const defaultParamsUsers: MouseEventHandler<HTMLAnchorElement> = () => {
        dispatch(adminActions.resetParams());
    };
    const resetState: IFuncVoid = useCallback(() => {
        dispatch(adminActions.resetParams());
        dispatch(orderActions.resetParams());
        dispatch(orderActions.resetOrders());
        authService.deleteTokens();
    }, [dispatch]);
    const logout: MouseEventHandler<HTMLAnchorElement> = () => {
        resetState();
        dispatch(authActions.logout());
    };
    useEffect(() => {
        let timeoutId: NodeJS.Timeout = null;
        const handleMove = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                const {pathname} = location;
                history.push(pathname);
                resetState();
                dispatch(authActions.logout());
                dispatch(orderActions.getAll({params: {}}));
            }, 900000);
        };
        window.addEventListener('mousemove', handleMove);
        window.addEventListener('keydown', handleMove)
        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('keydown', handleMove);
            clearTimeout(timeoutId);
        };
    }, [dispatch, location, resetState]);

    return (
        <div className={css.header}>
            <div>
                <NavLink
                    to='https://owu.com.ua/'
                    target='_blank'
                >
                    <img className={css.logo} src={okten_school} alt="okten_school" />
                </NavLink>
            </div>
            <div>
                { me ?
                    <div className={css.nav_bar}>
                        <Profile me={me}/>
                        { isAdmin &&
                            <div className={css.header_link}>
                                <NavLink
                                    onClick={defaultParamsOrders}
                                    to='/orders'
                                >
                                    <img className={css.image_link} src={home_page} alt="home" />
                                </NavLink>
                            </div>
                        }
                        { isAdmin &&
                            <div className={css.header_link}>
                                <NavLink
                                    onClick={defaultParamsUsers}
                                    to='/admin'
                                >
                                    <img className={css.image_link} src={admin_panel} alt="admin" />
                                </NavLink>
                            </div>
                        }
                        <div className={css.header_link}>
                            <NavLink
                                to='/login'
                                onClick={logout}
                            >
                                <img className={css.image_link} src={log_out} alt="logout" />
                            </NavLink>
                        </div>
                    </div>
                    :
                    <div>
                        <div className={css.header_link}>
                            <NavLink to='/login'>
                                <img className={css.image_link} src={login} alt="login" />
                            </NavLink>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export {
    Header
};
