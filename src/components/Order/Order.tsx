import { FC, Fragment, MouseEventHandler, useState } from 'react';

import Button from 'react-bootstrap/Button';
import ListGroup from "react-bootstrap/ListGroup";
import Modal from 'react-bootstrap/Modal';

import Collapse from '@mui/material/Collapse';
import { Stack } from "@mui/material";

import { Comment } from "../Comment/Comment";
import { commentActions, orderActions } from "../../redux";
import { CommentForm } from "../CommentForm/CommentForm";
import { CommentsPaginate } from "../CommentsPaginate/CommentsPaginate";
import { dataTable } from "../../constants";
import { DateFormat } from "../DateFormat/DateFormat";
import { IComment, IGroup, IOrder } from "../../interfaces";
import { IFuncVoid } from "../../types";
import { StyledTableCell, StyledTableRow } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks";

import { button_css, form_css } from '../../styles/index';
import css from './Order.module.css';

interface IProps {
    order: IOrder;
    isOpen: boolean;
    onClick: IFuncVoid;
}

const Order: FC<IProps> = ({ order, isOpen, onClick }) => {
    const dispatch = useAppDispatch();
    const {
        id, name, surname, email, phone, age, course, course_format, course_type,
        status, sum, alreadyPaid, group, created_at, manager, utm, msg, comments
    } = order;
    const {noData, noGroup, noManager, noComments, commentsField} = dataTable;
    const {groups} = useAppSelector(state => state.groupReducer);
    const {me} = useAppSelector(state => state.authReducer);
    const {startShowComment, endShowComments, errorsComment} = useAppSelector(state => state.commentReducer);
    const [showComment, setShowComment] = useState<boolean>(false);
    const handleShow: MouseEventHandler<HTMLDivElement> = () => setShowComment(true);
    const handleClose: IFuncVoid = () => {
        setShowComment(false);
        dispatch(commentActions.setDefaultPaginate());
    };
    const setUpdate: IFuncVoid = () => dispatch(orderActions.setOrderUpdate(order));
    const getNameGroup = (group_id: number): string => {
        const group: IGroup = groups.find(group => group.id === group_id);
        if (group && group.name) {
            return group.name;
        }
        return noGroup;
    };
    const addValidForm: boolean = order.manager && order.manager?.id !== me?.id;
    const nameGroup: string = getNameGroup(group);
    const lastComments: IComment[] = comments.slice(0, 3);
    const PaginateComments: IComment[] = comments.slice(startShowComment, endShowComments);

    return (
        <Fragment>
            <StyledTableRow onClick={() => onClick()}>
                <StyledTableCell component="th" scope="row" align="center">{id}</StyledTableCell>
                <StyledTableCell align="center">{name ? name : noData}</StyledTableCell>
                <StyledTableCell align="center">{surname ? surname : 'no data'}</StyledTableCell>
                <StyledTableCell align="center">{email ? email : noData}</StyledTableCell>
                <StyledTableCell align="center">{phone ? phone : noData}</StyledTableCell>
                <StyledTableCell align="center">{age ? age : noData}</StyledTableCell>
                <StyledTableCell align="center">{course ? course : noData}</StyledTableCell>
                <StyledTableCell align="center">{course_format ? course_format : noData}</StyledTableCell>
                <StyledTableCell align="center">{course_type ? course_type : noData}</StyledTableCell>
                <StyledTableCell align="center">{status ? status : noData}</StyledTableCell>
                <StyledTableCell align="center">{sum ? sum : noData}</StyledTableCell>
                <StyledTableCell align="center">{alreadyPaid ? alreadyPaid : noData}</StyledTableCell>
                <StyledTableCell align="center">{nameGroup ? nameGroup : noData}</StyledTableCell>
                <StyledTableCell align="center">{ <DateFormat originalDate={created_at} /> }</StyledTableCell>
                <StyledTableCell align="center">{manager ? manager.name : noManager}</StyledTableCell>
            </StyledTableRow>
            <StyledTableCell
                colSpan={15}
                style={{ paddingBottom: 0, paddingTop: 0 }}
                sx={{"&:nth-of-type(odd)": {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'}
                }}
            >
                <Collapse in={isOpen}>
                    <Stack
                        direction={'row'}
                        justifyContent={'space-between'}
                        useFlexGap
                    >
                        <div className={css.left_block}>
                            <div>Message:&nbsp;{msg ? msg : noData}</div>
                            <div>UTM:&nbsp;{utm ? utm : noData}</div>
                            <div>
                                <button disabled={addValidForm}
                                        className={button_css.btn_open}
                                        onClick={setUpdate}
                                >
                                    Edit
                                </button>
                                {order.manager && order.manager?.id !== me?.id &&
                                    <div className={form_css.err_text}>
                                        You&#160;cannot&#160;comment&#160;and&#160;
                                        edit&#160;this&#160;order&#46;&#160;It&#160;
                                        belongs&#160;to&#160;another&#160;manager&#46;
                                    </div>
                                }
                            </div>
                        </div>
                        <div className={css.right_block}>
                            {comments.length < 1 ? noComments : commentsField}
                            <div
                                className={comments.length > 0 ? css.comments_field : 'd-none'}
                                onClick={handleShow}
                            >
                                <ListGroup>
                                    <ListGroup.Item action variant="success">
                                        { comments &&
                                            lastComments.map(commentBody => <Comment
                                                key={commentBody.id}
                                                commentBody={commentBody}
                                            />)
                                        }
                                    </ListGroup.Item>
                                </ListGroup>
                            </div>
                            <Modal size="xl"
                                   show={showComment}
                                   onHide={handleClose}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Comments</Modal.Title>
                                </Modal.Header>
                                <Modal.Body className={css.comments_field_modal}>
                                    <ListGroup>
                                        <ListGroup.Item variant='info'>
                                            {comments &&
                                                PaginateComments.map(commentBody => <Comment
                                                    key={commentBody.id}
                                                    commentBody={commentBody}
                                                />)
                                            }
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Modal.Body>
                                <CommentsPaginate comments={comments}/>
                                <Modal.Footer>
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        onClick={handleClose}
                                    >
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            <CommentForm order_id={id}/>
                            { errorsComment && <div className={form_css.err_text}>{errorsComment.comment}</div> }
                        </div>
                    </Stack>
                </Collapse>
            </StyledTableCell>
        </Fragment>
    );
};

export {
    Order
};
