import { FC, useEffect } from 'react';
import { joiResolver } from "@hookform/resolvers/joi";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";

import Form from 'react-bootstrap/Form';

import { authActions } from "../../redux";
import { authService } from "../../services";
import { authValidator } from "../../validators";
import { IAuth } from "../../interfaces";
import { useAppDispatch, useAppSelector } from "../../hooks";

import { button_css, form_css } from '../../styles/index';

import { okten_school } from '../../assets';

const LoginForm: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {error, loading} = useAppSelector(state => state.authReducer);
    const [query] = useSearchParams();
    const {handleSubmit, register, reset, formState: {errors, dirtyFields}} = useForm<IAuth>({
        mode: 'all',
        resolver: joiResolver(authValidator)
    });
    const login: SubmitHandler<IAuth> = async (user) => {
        if (localStorage.getItem('access' || 'refresh')) authService.deleteTokens();
        const {meta: {requestStatus}} = await dispatch(authActions.login(user));
        if (requestStatus === 'fulfilled') navigate('/orders');
        reset();
    };
    useEffect(() => {
        if (!dirtyFields.email || !dirtyFields.password) {
            dispatch(authActions.resetLoading());
        }
    }, [dispatch, dirtyFields]);

    return (
        <div className={form_css.form_block}>
            <img className={form_css.logo_form} src={okten_school} alt='logo' />
            <Form
                className={form_css.login_form}
                onSubmit={handleSubmit(login)}
            >
                <label className='w-100'>
                    Email
                    <Form.Control
                        type="email"
                        size="sm"
                        id='email'
                        placeholder='enter email'
                        disabled={loading}
                        {...register('email',{required: true})}
                    />
                </label>
                { errors.email && <p className={form_css.err_text}>{errors.email.message}</p> }
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
                <button
                    type="submit"
                    className={button_css.btn_submit}
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Login'}
                </button>
                { query.get('expSession') && <p className={form_css.err_text}>Please&#160;login!</p> }
                { error?.detail && <p className={form_css.err_text}>{error.detail}</p> }
            </Form>
        </div>
    );
};

export {
    LoginForm
};
