import React, { useState } from "react";
import { Link } from 'react-router-dom'
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { toAbsoluteUrl } from "../../_helpers";
import InfoModal from '../../layout/components/challenges/modals/infoModals/InfoModals.component'


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
}));
const theme = createMuiTheme({
  typography: {
    fontFamily: 'Shabnam',
    fontSize: 15
  }
})


export function Demo3Dashboard() {
  const [showModal, setShowModal] = useState(false)
  const [gameName , setGameName] = useState('')
  console.log(showModal);
  const classes = useStyles();


  return (
    <ThemeProvider theme={theme}>
      {/* begin::Row */}
      <div className="row h-50 align-items-center">
        <div className="col col-6 p-10 text-center h-100">
          <Card className="mx-10 h-100">
            <Link to="/n-back" className="active">
              <CardHeader
                dir="ltr"
                avatar={
                  <Avatar aria-label="recipe" src={toAbsoluteUrl("/media/images/cpttest-icon.png")} />
                }
                title="چنتا قبل"
                subheader="NBack"
              />
              <CardMedia
                className={classes.media}
                image='https://via.placeholder.com/150'
                title="Paella dish"
              />
            </Link>
            <CardActions className={classes.cardActions}>
              <IconButton aria-label="info" onClick={()=>{
                setShowModal(true);
                setGameName('NBack')
              }}>
                <HelpOutlineIcon />
              </IconButton>
              {gameName === 'NBack' && <InfoModal showModal={showModal} setShowModal={setShowModal} gameName={gameName} />}
            </CardActions>
          </Card>

        </div>
        <div className="col col-6 p-10 text-center h-100">
          <Card className="mx-10 h-100">
            <Link to="/cpt" className="active">
              <CardHeader
                dir="ltr"
                avatar={
                  <Avatar aria-label="recipe" src={toAbsoluteUrl("/media/images/cpttest-icon.png")} />
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

            <CardActions>
              <IconButton aria-label="info" onClick={()=>{
                setShowModal(true);
                setGameName('CPT')
              }}>
                <HelpOutlineIcon />
              </IconButton>
              {gameName === 'CPT' && <InfoModal showModal={showModal} setShowModal={setShowModal} gameName={gameName} />}
            </CardActions>
          </Card>
        </div>
      </div>
      <div className="row h-50 align-items-center">
        <div className="col col-6 p-10 text-center h-100">
          <Card className="mx-10 h-100">
            <Link to="/go-nogo" className="active">
              <CardHeader

                dir="ltr"
                avatar={
                  <Avatar aria-label="recipe" src={toAbsoluteUrl("/media/images/cpttest-icon.png")} />
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
              <IconButton aria-label="info" onClick={()=>{
                setShowModal(true);
                setGameName('GonoGo')
              }}>
                <HelpOutlineIcon />
              </IconButton>
              {gameName === 'GonoGo' && <InfoModal showModal={showModal} setShowModal={setShowModal} gameName={gameName} />}
            </CardActions>
          </Card>
        </div>
        <div className="col col-6 p-10 text-center h-100">
          <Card className="mx-10 h-100">
            <Link to="/stroop" className="active">
              <CardHeader

                dir="ltr"
                avatar={
                  <Avatar aria-label="recipe" src={toAbsoluteUrl("/media/images/cpttest-icon.png")} />
                }
                title="رنگ ها را دنبال کن"
                subheader="Stroop"
              />
              <CardMedia
                className={classes.media}
                image='https://via.placeholder.com/150'
                title="Paella dish"
              />
            </Link>

            <CardActions className="mt-auto">
              <IconButton aria-label="info" onClick={()=>{
                setShowModal(true);
                setGameName('Stroop')
              }}>
                <HelpOutlineIcon />
              </IconButton>
              {gameName === 'Stroop' && <InfoModal showModal={showModal} setShowModal={setShowModal} gameName={gameName} />}
            </CardActions>
          </Card>
        </div>
      </div>
      {/* end::Row */}
    </ThemeProvider>


  );
}