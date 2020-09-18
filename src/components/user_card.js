import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        textAlign: 'left',
        backgroundColor: '#d4cec3',
        marginTop: '20px',
        marginBottom: '20px',
    },
    name: {
        textTransform: 'capitalize',
    },
    location: {
        textTransform: 'capitalize',
    },
    email: {
        color: 'rgba(74, 56, 24, 0.47)',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
});

export default function SimpleCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2" className={classes.name}>
            {props.first_name} {props.last_name}
        </Typography>
        <Typography variant="body2" component="p" className={classes.email}>
            {props.email}
        </Typography>
        <Typography color="textSecondary" className={classes.location}>
        {props.city}, {props.country}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href={`mailto:${props.email}`}>{window.props.texts.contact}</Button>
      </CardActions>
    </Card>
  );
}