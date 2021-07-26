import React, { useState } from "react";
import { Link } from 'react-router-dom'
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';



const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
  },
  media: {
    height: 100,
  },
  avatar: {
    backgroundColor: 'teal',
  },
}));
const theme = createMuiTheme({
  typography: {
    fontFamily: 'Shabnam',
    fontSize: 15
  }
})


export function Demo3Dashboard() {
  const classes = useStyles();


  return (
      <ThemeProvider theme={theme}>
        {/* begin::Row */}
        <div className="row h-50 align-items-center">
          <div className="col col-6 p-10 text-center h-100">
            <Card className="mx-10 h-100" theme={theme.typography}>
              <Link to="/NBack" className="active">
                <CardHeader

                  dir="ltr"
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      N
                    </Avatar>
                  }
                  title="چنتا قبل"
                  subheader="NBack"
                />
                <CardMedia
                  theme={theme.typography}
                  className={classes.media}
                  image='https://via.placeholder.com/150'
                  title="Paella dish"
                />
              </Link>
              <CardActions>
                <IconButton aria-label="info" onClick={()=>{
                  console.log(classes.media);
                }}>
                  <HelpOutlineIcon />
                </IconButton>
              </CardActions>
            </Card>

          </div>
          <div className="col col-6 p-10 text-center h-100">
            <Card className="mx-10 h-100">
              <Link to="/CPT" className="active">
                <CardHeader

                  dir="ltr"
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      C
                    </Avatar>
                  }
                  title="عملکرد پیوسته"
                  subheader="CPT"
                />
                <CardMedia
                  className={classes.media}
                  image='https://via.placeholder.com/150'
                  title="Paella dish"
                />
              </Link>

              <CardActions >
                <IconButton aria-label="info">
                  <HelpOutlineIcon />
                </IconButton>
              </CardActions>
            </Card>
          </div>
        </div>
        <div className="row h-50 align-items-center">
          <div className="col col-6 p-10 text-center h-100">
            <Card className="mx-10 h-100">
              <Link to="#" className="active">
                <CardHeader

                  dir="ltr"
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      G
                    </Avatar>
                  }
                  title="برونرو"
                  subheader="Go-NoGo"
                />
                <CardMedia
                  className={classes.media}
                  image='https://via.placeholder.com/150'
                  title="Paella dish"
                />
              </Link>

              <CardActions>
                <IconButton aria-label="info">
                  <HelpOutlineIcon />
                </IconButton>
              </CardActions>
            </Card>
          </div>
          <div className="col col-6 p-10 text-center h-100">
            <Card className="mx-10 h-100">
              <Link to="#" className="active">
                <CardHeader

                  dir="ltr"
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      S
                    </Avatar>
                  }
                  title="رنگ ها را دنبال کن"
                  subheader="Strop"
                />
                <CardMedia
                  className={classes.media}
                  image='https://via.placeholder.com/150'
                  title="Paella dish"
                />
              </Link>

              <CardActions className="mt-auto">
                <IconButton aria-label="info">
                  <HelpOutlineIcon />
                </IconButton>
              </CardActions>
            </Card>
          </div>
        </div>
        {/* end::Row */}
      </ThemeProvider>


  );
}