import { useContext } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AuthContext from '../auth';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Button } from '@mui/material';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function MUILoginErrorModal() {
    let name='test'
    const { auth } = useContext(AuthContext);
    
    function handleDeleteList(event) {
        //store.deleteMarkedList();
    }
    function handleCloseModal(event) {
        //store.unmarkListForDeletion();
        console.log("trying to close modal")
        auth.errMessage=''
        auth.clearErrMessage()

        
    
    }
    console.log(auth.errMessage)
    return (
        <Modal
            open={auth.errMessage !== ''}
        >
           
            <Box sx={style}>
            <Alert severity="warning">
                <AlertTitle>Warning</AlertTitle>
                Login Error Occured — <strong>Details Below!</strong>
            
                <div className="modal-dialog">
                <header className="dialog-header">
                    {auth.errMessage}
                </header>
                <div id="confirm-cancel-container">
                    <Button variant="Contained"
                        id="dialog-yes-button"
                        className="modal-button"
                        onClick={handleCloseModal}
                    >Close </Button>
                </div>
                
            </div>
            </Alert>
            </Box>
        </Modal>
    );
}