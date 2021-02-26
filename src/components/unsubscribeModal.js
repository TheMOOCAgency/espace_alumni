import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Backdrop, Grid, Fade, Modal } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    backgroundColor: '#c8af82',
  },
  modalButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    fontWeight: '900!important',
    fontSize: '16px',
    color: 'white',
    cursor: 'pointer',
    padding: '10px 15px 10px 15px',
  },
  modalTitle: {
    textTransform: 'uppercase',
    color: 'white',
  },
  modalContent: {
    color: 'white',
  },
  buttonContainer: {
    textAlign: 'center',
    paddingTop: '20px',
  }
}));

export default function TransitionsModal(props) {
    const texts = window.props.texts
    const classes = useStyles();
    const unsubscribeUser = async () => {
        // update custom fields
        const url = "/tma_apps/tma_api/v0/CustomFieldView/";
        let formData = new FormData();
        formData.append("alumni_registered", false);
        const settings = {
            method: "POST",
            headers: {
                "X-CSRFToken": window.props.csrfToken,
            },
            contentType: false,
            processData: false,
            body: formData,
        };
        const api_call = await fetch(url, settings);

        const statusText = api_call.statusText;
        console.log(statusText)
        window.location.href = "/"
    }

  return (
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500,
        }}
    >
        <Fade in={props.open}>
            <div className={classes.paper}>
                <h2 id="transition-modal-title" className={classes.modalTitle}>{texts.unsubscribeTitle}</h2>
                <p id="transition-modal-description" className={classes.modalContent}>{texts.unsubscribeContent}</p>
                <Grid container spacing={3} className={classes.buttonContainer}>
                    <Grid item xs={6}>
                        <a size="small" onClick={unsubscribeUser} className={classes.modalButton}>
                        {texts.yes}
                        </a>
                    </Grid>
                    <Grid item xs={6}>
                        <a size="small" onClick={props.handleClose} className={classes.modalButton}>
                        {texts.no}
                        </a>
                    </Grid>
                </Grid>
            </div>
        </Fade>
    </Modal>
  );
}
