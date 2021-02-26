import React, { useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import UnsubscribeModal from './unsubscribeModal'

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
    MenuTitle: {
        backgroundColor: '#c8af82',
        marginTop: '20px',
    },
    Menuback: {
        backgroundColor: '#c8af82',
        marginTop: '20px',
        width: '200px',
    },
    backButton: {
        width: '190px',
    },
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
    },
    resetButton : {
        marginTop: '20px',
        display: 'none',
        position: 'absolute',
        cursor: 'pointer',
    }
}));

export default function PrimarySearchAppBar(props) {
    const classes = useStyles();
    const [city, setCity] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [work, setWork] = React.useState('');
    const [search, setSearch] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const inputRef = React.createRef();
    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const getSearch = (user) => {
        const propertiesListy = ['country', 'tell_us_more_again', 'city', 'first_name', 'last_name']
        let isInList = false
        propertiesListy.forEach(element => {
            if (user[element].toLowerCase().includes(search.toLowerCase())) {
                isInList = true
            }
        })
        return isInList
    };

    const checkUser = (user) => {
        const isInFilteredList = (city === '' || user.city === city) && (country === '' || user.country === country) && (work === '' || user.tell_us_more_again === work) && getSearch(user) === true
        return isInFilteredList
    };

    useEffect(() => {
        let newList = [...window.props.users_list]
        newList = newList.filter(user => {
            return checkUser(user)
        });
        props.setUserList(newList)
      }, [city, country, work, search]);

    const handleChange = (event, type) => {
        if (type ==='city') {
            setCity(event.target.value);
        } else if (type ==='country') {
            setCountry(event.target.value);
        } else if (type ==='work') {
            setWork(event.target.value);
        } else {
            setSearch(event.target.value);
        }
        document.getElementById('reset_button').style.display = 'initial'
    };

    const resetFilters = () => {
        setCity('');
        setCountry('');
        setWork('');
        setSearch('');
        let newList = [...window.props.users_list]
        props.setUserList(newList)
        document.getElementById('reset_button').style.display = 'none'
    };

    const texts = window.props.texts

    return (
        <div className={classes.grow}>
        <AppBar position="static" className={classes.Menuback}>
            <Button size="small" href="https://www.champagne-mooc.com/dashboard" className={classes.backButton}>
            {texts.backToCourse}
            </Button>
        </AppBar>
        <AppBar position="static" className={classes.MenuTitle}>
            <Typography className={classes.title} variant="h4">
            {texts.title}
            </Typography>
        </AppBar>
        <AppBar position="static" className={classes.Menubar}>
            <Typography className={classes.title} variant="h6">
            {texts.welcome}
            </Typography>
            <Typography variant="subtitle1">
            {texts.welcomeSubtitle}
            </Typography>
            <form className={classes.root} noValidate autoComplete="off">
        <div>
        <TextField
            id="select-city"
            select
            label={texts.town}
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
            label={texts.country}
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
        <TextField
            id="select-work"
            select
            label={texts.work}
            value={work}
            ref={inputRef}
            onChange={(event) => handleChange(event, 'work')}
            variant="filled"
        >
        {props.works.map((work, index) => (
            <MenuItem key={index} value={work}>
            {work}
            </MenuItem>
        ))}
        </TextField>
        <TextField
            id="standard-search"
            label={texts.search}
            value={search}
            ref={inputRef}
            onChange={(event) => handleChange(event, 'search')}
            variant="filled"
        >
        </TextField>
        <ClearIcon
            size="small" 
            className={classes.resetButton} 
            id="reset_button"
            onClick={resetFilters}
        />
        </div>
        </form>
        </AppBar>
        <AppBar position="static" className={classes.MenuUnsubscribe}>
            <a size="small" onClick={handleOpen} className={classes.unsubscribeButton}>
            {texts.unsubscribeButton}
            </a>
        </AppBar>
        <UnsubscribeModal 
            open={open}
            handleClose={handleClose}
        />
        </div>
    );
}