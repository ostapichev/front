import { FC } from 'react';

import { DateFormat } from "../DateFormat/DateFormat";
import { IComment } from "../../interfaces";

import css from './Comment.module.css';

interface IProps {
    commentBody: IComment;
}

const Comment: FC<IProps> = ({ commentBody }) => {
    const {comment, created_at, profile} = commentBody;
    const {name, surname} = profile;

    return (
        <div className={css.comment_body}>
            <div>{comment}</div>
            <div>
                {name}&#160;{surname}&#44;&#160;{ <DateFormat originalDate={ created_at } />}
            </div>
        </div>
    );
};

export {
    Comment
};
