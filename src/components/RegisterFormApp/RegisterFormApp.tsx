import { FC, useEffect } from 'react';
import { joiResolver } from "@hookform/resolvers/joi";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import Form from "react-bootstrap/Form";

import { authActions } from "../../redux";
import { IAuth } from "../../interfaces";
import { passwordValidator } from "../../validators";
import { useAppDispatch, useAppSelector } from "../../hooks";

import { button_css, form_css } from '../../styles/index';

import { okten_school } from "../../assets";

interface IProps {
    page: string;
}

const RegisterFormApp: FC<IProps> = ({ page }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const formData: FormData = new FormData();
    const {token} = useParams<{token: string}>();
    const {loading, confirmError, error} = useAppSelector(state => state.authReducer);
    const {handleSubmit, register, getValues, formState: {errors, dirtyFields}} = useForm<IAuth>({
        mode: 'all',
        resolver: joiResolver(passwordValidator)
    });
    const recoveryRequestUser: SubmitHandler<IAuth> = async () => {
        const {password, confirmPassword} = getValues();
        formData.append('password', password);
        if (password !== confirmPassword) {
            dispatch(authActions.setConfirmError('Password mismatch!'));
            return;
        }
        if (page === 'recovery') {
            const {meta: {requestStatus}} = await dispatch(authActions.recoveryRequestPassword(
                {formData, token}
            ));
            if (requestStatus === 'fulfilled') {
                navigate('/login');
            }
        } else if (page === 'activate') {
            const {meta: {requestStatus}} = await dispatch(authActions.activateRequestUser(
                {formData, token}
            ));
            if (requestStatus === 'fulfilled') {
                navigate('/login');
            }
        } else {
            alert('RegisterFormApp: name error function');
        }
    };
    useEffect(() => {
        if ((!dirtyFields.password || !dirtyFields.confirmPassword) && loading) {
            dispatch(authActions.resetLoading());
        }
    }, [dispatch, dirtyFields, loading]);

    return (
        <div className={form_css.form_block}>
            <img className={form_css.logo_form} src={okten_school} alt='logo' />
            <Form
                className={form_css.login_form}
                onSubmit={handleSubmit(recoveryRequestUser)}
            >
                <label className='w-100'>
                    Password
                    <Form.Control
                        type="password"
                        size="sm"
                        placeholder='enter password'
                        autoComplete='on'
                        disabled={loading}
                        {...register('password',{required: true})}
                    />
                </label>
                { errors.password && <p className={form_css.err_text}>{errors.password.message}</p> }
                <label className='w-100'>
                    Confirm password
                    <Form.Control
                        type="password"
                        size="sm"
                        placeholder='enter confirm password'
                        autoComplete='on'
                        disabled={loading}
                        {...register('confirmPassword',{required: true})}
                    />
                </label>
                <button
                    type="submit"
                    className={button_css.btn_submit}
                    disabled={loading}
                >
                    Submit
                </button>
                { errors.confirmPassword && <p className={form_css.err_text}>{errors.confirmPassword.message}</p> }
                { error && <p className={form_css.err_text}>{error.detail}</p> }
                { confirmError && <p className={form_css.err_text}>{confirmError}</p> }
            </Form>
        </div>
    );
};

export {
    RegisterFormApp
};
