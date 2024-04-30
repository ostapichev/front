import { FC } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { authActions } from "../../redux";
import { IFuncVoid } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks";

const DataMessage: FC = () => {
    const dispatch = useAppDispatch();
    const {error, textModal} = useAppSelector(state => state.authReducer);
    const handleClose: IFuncVoid = () => dispatch(authActions.closeModal());

    return (
        <>
            <Modal
                show={!!textModal || !!error}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{textModal ? 'INFO' : 'ERROR'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='fw-bold fs-6 text-serif'>
                        {
                            textModal
                                ? JSON.parse(textModal)
                                : error?.detail
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export {
    DataMessage
};
