import { ChangeEvent, FC } from 'react';

import Form from "react-bootstrap/Form";

import { Group } from "../Group/Group";
import { orderActions } from "../../redux";
import { useAppDispatch, useAppSelector } from "../../hooks";

import css from './InputBlock.module.css';

const InputBlock: FC = () => {
    const dispatch = useAppDispatch();
    const {paramsOrders} = useAppSelector(state => state.orderReducer);
    const {groups} = useAppSelector(state => state.groupReducer);
    const nameInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        dispatch(orderActions.setPage('1'));
        dispatch(orderActions.setNameInputData(event.target.value));
    };
    const surNameInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        dispatch(orderActions.setPage('1'));
        dispatch(orderActions.setSurnameInputData(event.target.value));
    };
    const emailInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        dispatch(orderActions.setPage('1'));
        dispatch(orderActions.setEmailInputData(event.target.value));
    };
    const phoneInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        dispatch(orderActions.setPage('1'));
        dispatch(orderActions.setPhoneInputData(event.target.value));
    };
    const ageInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        dispatch(orderActions.setPage('1'));
        dispatch(orderActions.setAgeInputData(event.target.value));
    };
    const courseInputChange = (event: ChangeEvent<HTMLSelectElement>): void => {
        dispatch(orderActions.setPage('1'));
        dispatch(orderActions.setCourseInputData(event.target.value));
    };
    const formatCourseInputDataChange = (event: ChangeEvent<HTMLSelectElement>): void => {
        dispatch(orderActions.setPage('1'));
        dispatch(orderActions.setCourseFormatInputData(event.target.value));
    };
    const typeCourseInputDataChange = (event: ChangeEvent<HTMLSelectElement>): void => {
        dispatch(orderActions.setPage('1'));
        dispatch(orderActions.setCourseTypeInputData(event.target.value));
    };
    const statusInputDataChange = (event: ChangeEvent<HTMLSelectElement>): void => {
        dispatch(orderActions.setPage('1'));
        dispatch(orderActions.setStatus(event.target.value));
    };
    const groupInputDataChange = (event: ChangeEvent<HTMLSelectElement>): void => {
        dispatch(orderActions.setPage('1'));
        dispatch(orderActions.setGroup(event.target.value));
    };
    const startDateInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        dispatch(orderActions.setPage('1'));
        dispatch(orderActions.setStartDateInputData(event.target.value));
    };
    const endDateInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        dispatch(orderActions.setPage('1'));
        dispatch(orderActions.setEndDateInputData(event.target.value));
    };

    return (
        <div className={css.input_container}>
            <div className={css.filter_order}>
                <Form.Control
                    type="search"
                    value={paramsOrders.name || ''}
                    size="sm"
                    placeholder="Name"
                    onChange={nameInputChange}
                />
                <Form.Control
                    type="search"
                    value={paramsOrders.surname || ''}
                    size="sm"
                    placeholder="Surname"
                    onChange={surNameInputChange}
                />
                <Form.Control
                    type="search"
                    value={paramsOrders.email || ''}
                    size="sm"
                    placeholder="email"
                    onChange={emailInputChange}
                />
                <Form.Control
                    type="search"
                    value={paramsOrders.phone || ''}
                    size="sm"
                    placeholder="phone"
                    onChange={phoneInputChange}
                />
                <Form.Control
                    type="number"
                    value={paramsOrders.age || ''}
                    size="sm"
                    placeholder="age"
                    onChange={ageInputChange}
                />
                <Form.Select
                    value={paramsOrders.course || ''}
                    size="sm"
                    aria-label="Choose course"
                    onChange={courseInputChange}
                >
                    <option value="">all courses</option>
                    <option value="FS">FS</option>
                    <option value="QACX">QACX</option>
                    <option value="JSCX">JSCX</option>
                    <option value="JCX">JCX</option>
                    <option value="FE">FE</option>
                    <option value="PCX">PCX</option>
                </Form.Select>
            </div>
            <div className={css.filter_order}>
                <Form.Select
                    value={paramsOrders.course_format || ''}
                    size="sm"
                    aria-label="Course_format"
                    onChange={formatCourseInputDataChange}
                >
                    <option value="">all&#160;formats</option>
                    <option value="static">static</option>
                    <option value="online">online</option>
                </Form.Select>
                <Form.Select
                    value={paramsOrders.course_type || ''}
                    size="sm"
                    aria-label="Course_type"
                    onChange={typeCourseInputDataChange}
                >
                    <option value="">all&#160;types</option>
                    <option value="pro">pro</option>
                    <option value="minimal">minimal</option>
                    <option value="premium">premium</option>
                    <option value="incubator">incubator</option>
                    <option value="vip">vip</option>
                </Form.Select>
                <Form.Select
                    value={paramsOrders.status || ''}
                    size="sm"
                    aria-label="Status"
                    onChange={statusInputDataChange}
                >
                    <option value="">all&#160;statuses</option>
                    <option value="new_order">new_order</option>
                    <option value="in_work">in_work</option>
                    <option value="agree">agree</option>
                    <option value="disagree">disagree</option>
                    <option value="dubbing">dubbing</option>
                </Form.Select>
                <Form.Select
                    value={paramsOrders.group || ''}
                    size="sm"
                    aria-label="Choose group"
                    onChange={groupInputDataChange}
                >
                    <option value=''>all&#160;groups</option>
                    {
                        groups.map(group => <Group
                            key={group.id}
                            group={group}
                        />)
                    }
                </Form.Select>
                <Form.Control
                    type="date"
                    value={paramsOrders.created_at_after || ''}
                    size="sm"
                    placeholder="start date"
                    onChange={startDateInputChange}
                />
                <Form.Control
                    type="date"
                    value={paramsOrders.created_at_before || ''}
                    size="sm"
                    placeholder="end date"
                    onChange={endDateInputChange}
                />
            </div>
        </div>
    );
};

export {
    InputBlock
};
