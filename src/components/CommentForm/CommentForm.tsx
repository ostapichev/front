import { FC } from 'react';
import { joiResolver } from "@hookform/resolvers/joi";
import { SubmitHandler, useForm } from "react-hook-form";

import Form from 'react-bootstrap/Form';

import { commentActions } from "../../redux";
import { commentValidator } from "../../validators";
import { IComment, IOrder } from "../../interfaces";
import { useAppDispatch, useAppSelector } from "../../hooks";

import css from './CommentForm.module.css';
import { form_css } from '../../styles/index';

interface IProps {
    order_id: number;
}

const CommentForm: FC<IProps> = ({ order_id }) => {
    const dispatch = useAppDispatch();
    const {handleSubmit, register, setValue, formState: {errors, isValid}} = useForm<IComment>({
        mode: "all",
        resolver: joiResolver(commentValidator)
    });
    const {me} = useAppSelector(state => state.authReducer);
    const {orders} = useAppSelector(state => state.orderReducer);
    const save: SubmitHandler<IComment> = async (comment) => {
        await dispatch(commentActions.create({order_id, comment}));
        setValue('comment', '');
    };
    const order: IOrder = orders.find(item => item.id === order_id);
    const addValidForm: boolean = order && order.manager && order.manager?.id !== me?.id;

    return (
        <Form
            className={css.comment_form}
            onSubmit={handleSubmit(save)}
        >
            <input type="text" placeholder="Enter comment" {...register('comment')}/>
            <button
                type="submit"
                className={css.button_comment}
                disabled={!isValid || addValidForm}
            >
                Add
            </button>
            { errors.comment && <div className={form_css.err_text}>{errors.comment.message}</div> }
        </Form>
    );
};

export {
    CommentForm
};
