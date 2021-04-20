import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import UnsubscribeModal from './unsubscribeModal'

const useStyles = makeStyles((theme) => ({
    MenuUnsubscribe: {
        width: '500px',
        margin: '20px auto auto auto',
        backgroundColor: 'transparent',
    },
    unsubscribeButton: {
        width: '500px',
        color: 'black',
        padding: '10px 0px 10px 0px',
        cursor: 'pointer',
        backgroundColor: 'rgba(255,255,255,0.8)',
    }
}));

export default function PrimarySearchAppBar(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const texts = window.props.texts

    return (
      <>
        <AppBar position="static" className={classes.MenuUnsubscribe}>
            <a size="small" onClick={handleOpen} className={classes.unsubscribeButton}>
            {texts.unsubscribeButton}
            </a>
        </AppBar>
        <UnsubscribeModal 
            open={open}
            handleClose={handleClose}
        />
      </>
    );
}