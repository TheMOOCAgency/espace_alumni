import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid, CardContent, Typography } from '@material-ui/core';
import SchoolIcon from '@material-ui/icons/School';
import RoomIcon from '@material-ui/icons/Room';
import WorkIcon from '@material-ui/icons/Work';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        textAlign: 'left',
        backgroundColor: '#ece9e3',
        marginTop: '20px',
        marginBottom: '20px',
    },
    name: {
        textTransform: 'capitalize',
    },
    detail: {
        textTransform: 'capitalize',
        display: 'inline-block',
        verticalAlign: 'top',
        marginLeft: '5px',
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
  
  const getMention  = (mention) => {
    if (mention <= 0.95) {
      return texts.with_merit
    } else {
      return texts.with_distinction
    }
  };

  const completeJobs = {
    "hotellerie":"Hôtellerie/Sommellerie",
    "commerce":"Commerce/Vente",
    "viticulture":"Viticulture/Œnologie ",
    "marketing":"Marketing/Communication",
    "droit":"Droit",
    "journalisme":"Journalisme",
    "tourisme":"Tourisme",
    "autre":"Autre"
  }
  const texts = window.props.texts

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <a href={"/u/"+props.username}><img src={props.profile_image_url} alt="avatar profile" /></a>
          </Grid>
          <Grid item xs={12} sm={6} md={8} lg={9} xl={10}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="h5" component="h2" className={classes.name}>
                  {props.first_name} {props.last_name}
                </Typography>
              </Grid>
              <Grid item xs={12}>
              <RoomIcon style={{ color: 'rgba(200,175,130,1)' }}>icon_localisation</RoomIcon>
              <Typography color="textSecondary" className={classes.detail}>
                {props.city}, {props.country}
              </Typography>
              </Grid>
              <Grid item xs={12}>
              <WorkIcon style={{ color: 'rgba(200,175,130,1)' }}>icon_metier</WorkIcon>
              <Typography color="textSecondary" className={classes.detail}>
                {completeJobs[props.tell_us_more_again] || "autre"}
              </Typography>
              </Grid>
              <Grid item xs={12}>
              <SchoolIcon style={{ color: 'rgba(200,175,130,1)' }}>icon_mention</SchoolIcon>
              <Typography color="textSecondary" className={classes.detail}>
                {getMention(props.mention)}
              </Typography>
              </Grid>
              {props.linkedin &&
              <Grid item xs={12}>
                <a href={props.linkedin} target="_blank" rel="noopener noreferrer"><LinkedInIcon style={{ color: 'rgba(200,175,130,1)' }}>icon_linkedin</LinkedInIcon></a>
              </Grid>
              }
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}