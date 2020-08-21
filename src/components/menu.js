import React, { useEffect, useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '25ch',
        },
      },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
        display: 'block',
        },
    },
    titleBackCourse: {
        textAlign: 'left',
        paddingLeft: '50px',
        marginTop: '10px',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
        width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
        display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
        display: 'none',
        },
    },
    Menubar: {
        backgroundColor: '#c8af82',
        marginTop: '20px',
    },
    backButton: {
        width: '190px',
    },
    resetButton : {
        marginTop: '20px',
        display: 'none',
        position: 'absolute',
    }
}));

export default function PrimarySearchAppBar(props) {
    const classes = useStyles();
    const [city, setCity] = React.useState('');
    const [country, setCountry] = React.useState('');
    const inputRef = React.createRef();

    useEffect(() => {
        let newList = [...props.savedList]
        newList = newList.filter(user => {
            return (city === '' || user.city === city) && (country === '' || user.country === country)
        });
        props.setUserList(newList)
      }, [city, country]);

    const handleChange = (event, type) => {
        if (type ==='city') {
            setCity(event.target.value);
        } else {
            setCountry(event.target.value);
        }
        document.getElementById('reset_button').style.display = 'initial'
    };

    const resetFilters = () => {
        setCity('');
        setCountry('');
        document.getElementById('reset_button').style.display = 'none'
    };

    return (
        <div className={classes.grow}>
        <AppBar position="static" className={classes.Menubar}>
            <Button size="small" href="https://www.champagne-mooc.com/dashboard" className={classes.backButton}>
                ← Retour au cours
            </Button>
            <Typography className={classes.title} variant="h6">
            Liste des membres Alumni, utilisez les filtres pour affiner votre recherche
            </Typography>
            <form className={classes.root} noValidate autoComplete="off">
        <div>
        <TextField
            id="select-city"
            select
            label="Ville"
            value={city}
            ref={inputRef}
            onChange={(event) => handleChange(event, 'city')}
            variant="filled"
            >
            {props.cities.map((city, index) => (
                <MenuItem key={index} value={city}>
                {city}
                </MenuItem>
            ))}
            </TextField>
            <TextField
            id="select-country"
            select
            label="Pays"
            value={country}
            onChange={(event) => handleChange(event, 'country')}
            variant="filled"
            >
            {props.countries.map((country, index) => (
                <MenuItem key={index} value={country}>
                {country}
                </MenuItem>
            ))}
            </TextField>
            <Button 
            size="small" 
            className={classes.resetButton} 
            id="reset_button"
            onClick={resetFilters}>
                <ClearIcon/>
            </Button>
        </div>
        </form>
        </AppBar>
        </div>
    );
}