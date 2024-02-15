import React from 'react';
import {makeStyles} from "@mui/material";
// import InstagramIcon from '@mui/icons-material';
// import TwitterIcon from '@mui/icons-material';
// import FacebookIcon from '@mui/icons-material';
import { Google } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
    content: {
        backgroundColor: "#fff",
        height: "4vw",
        paddingLeft: "5vw",
        paddingRight: "5vw",
        [theme.breakpoints.up('md')]: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        },
        [theme.breakpoints.down('sm')]: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexFlow: 'row',
            height: "8vw",
            paddingLeft: "7vw",
        },
        [theme.breakpoints.down('xs')]: {
            padding: "5vw",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexFlow: 'column',
            height: "auto",
        }

    },
    iconsContainer: {
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        }
    },
    icon: {
        color: "#766a36",
        marginRight: "2vw",
        [theme.breakpoints.down('xs')]: {
            marginTop: "1vw",
            marginBottom: "1vw",
        }
    },
    copyright: {
        color: "#766a36",
        fontWeight: "bold",
        fontSize: "0.9vw",
        [theme.breakpoints.down('sm')]: {
            fontSize: "1.5vw",
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: "2.5vw",
            marginBottom: "1vw",
        }
    },
    name: {
        color: "#766a36",
        fontWeight: "bold",
        fontSize: "1.2vw",
        letterSpacing: "0.3vw",
        [theme.breakpoints.down('sm')]: {
            fontSize: "2vw",
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: "2.6vw",
            marginBottom: "1vw",
        }
    },

}))

const Copyrights = () => {
    const classes = useStyles()
    return (
        <div className={classes.content}>
            <div className={classes.iconsContainer}>
                {/* <TwitterIcon className={classes.icon}/>
                <FacebookIcon className={classes.icon}/>
                <InstagramIcon className={classes.icon}/> */}
                <Google className={classes.icon}/>
            </div>
            <div className={classes.copyright}>
                ⓒ WMERN
            </div>
            <div className={classes.name}>IORA RESORT</div>
        </div>
    );
};

export default Copyrights;
