import { FC, MouseEventHandler, useState } from 'react';

import { authActions, adminActions } from "../../redux";
import { DateFormat } from "../DateFormat/DateFormat";
import { dataTable } from "../../constants";
import { IUser } from "../../interfaces";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { StatisticUser } from "../StatisticUser/StatisticUser";
import { url, urls } from "../../constants";

import { button_css } from '../../styles/index';
import css from './User.module.css';

interface IProps {
    user: IUser;
}

const User: FC<IProps> = ({ user }) => {
    const dispatch = useAppDispatch();
    const formData: FormData = new FormData();
    const {activateToken} = useAppSelector(state => state.authReducer);
    const {id, email, profile, is_active, last_login} = user;
    const [activate, setActivate] = useState<boolean>(false);
    const [infoText, setInfoText] = useState<string>(null);
    const ban: MouseEventHandler<HTMLButtonElement> = async () => {
        await dispatch(adminActions.ban({id: id.toString()}));
    };
    const unban: MouseEventHandler<HTMLButtonElement> = async () => {
        await dispatch(adminActions.unban({id: id.toString()}));
    };
    const activateUser: MouseEventHandler<HTMLButtonElement> = async () => {
        formData.append('email', email);
        await dispatch(authActions.activateUser({ formData }));
    };
    const recoveryPassword: MouseEventHandler<HTMLButtonElement> = async () => {
        formData.append('email', email);
        await dispatch(authActions.recoveryPassword({ formData }));
    };
    const getLinkActivate: MouseEventHandler<HTMLButtonElement> = async () => {
        await dispatch(authActions.activateLink({id: id.toString()}));
        setActivate(true);
    };
    const copyToClipboard: MouseEventHandler<HTMLButtonElement> = async () => {
        await navigator.clipboard.writeText(`${url}${urls.authAPI.activate}/${activateToken.token}`)
            .then(() => setInfoText('Link copied to clipboard!'));
        setInterval(() => {
            setInfoText(null);
        }, 3000);
        setActivate(false);
    };

    return (
        <div className={css.container_user}>
            <div className={css.block_user}>
                <div className={css.user_content}>id:&#160;<span className={css.user_data}>{id}</span></div>
                <div className={css.user_content}>email:&#160;<span className={css.user_data}>{email}</span></div>
                <div className={css.user_content}>name:&#160;
                    <span className={css.user_data}>{profile.name}</span>
                </div>
                <div className={css.user_content}>surname:&#160;
                    <span className={css.user_data}>{profile.surname}</span>
                </div>
                <div className={css.user_content}>is active:&#160;
                    <span className={css.user_data}>{is_active === true ? 'yes' : 'no'}</span>
                </div>
                <div className={css.user_content}>last login:&#160;<span className={css.user_data}>
                    { last_login ? <DateFormat originalDate={last_login} /> : dataTable.noData }</span>
                </div>
            </div>
            <StatisticUser id={id}/>
            <div className={css.block_button}>
                <button
                    className={button_css.btn_open}
                    type="submit"
                    onClick={(event) => is_active === true ? ban(event) : unban(event)}
                >
                    {is_active ? 'ban' : 'unban'}
                </button>
                <button
                    className={button_css.btn_open}
                    type="submit"
                    onClick={(event) => is_active === true ? recoveryPassword(event) : activateUser(event)}
                >
                    {is_active ? 'recovery' : 'activate user'}
                </button>
                <button
                    className={button_css.btn_open}
                    type="submit"
                    onClick={!activate ? getLinkActivate : copyToClipboard}
                >
                    { !activate ? 'get activate' : 'copy to clipboard' }
                </button>
                { !activate && <div className={css.info_text}>{infoText}</div> }
            </div>
        </div>
    );
};

export {
    User
};
