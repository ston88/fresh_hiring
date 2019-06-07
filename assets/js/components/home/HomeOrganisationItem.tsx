import * as React from 'react';
import { Link } from 'react-router-dom';
// MUI Core
import { Box, Theme, Typography } from '@material-ui/core';
// MUI Styles
import { makeStyles, useTheme } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  banner: {
    bottom: 0,
    left: 0,
    height: '100%',
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
  },
  bannerWrapper: {
    backgroundColor: theme.palette.grey[200],
    overflow: 'hidden',
    paddingBottom: '52.5%',
    position: 'relative',
  },
  content: {
    display: 'flex',
    padding: `${theme.spacing(2)}px 0px`,
  },
  infoContainer: {
    marginLeft: theme.spacing(2),
    overflow: 'hidden',
  },
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
  logo: {
    height: '100%',
    width: '100%',
  },
  logoWrapper: {
    backgroundColor: theme.palette.common.white,
    borderRadius: 4,
    maxHeight: 66,
    maxWidth: 66,
    minHeight: 66,
    minWidth: 66,
    overflow: 'hidden',
    position: 'relative',
  },
}));

function HomeOrganisationItem() {
  const classes = useStyles();
  const theme = useTheme<Theme>();

  return (
    <a
      className={classes.link}
      href="/ASX/WSR"
      rel="noopener noreferrer"
      target="_blank"
    >
      <div className={classes.bannerWrapper}>
        <img
          className={classes.banner}
          alt="ASX:DPD"
          src="/images/dealpad-banner.jpg"
        />
      </div>

      <div className={classes.content}>
        <div className={classes.logoWrapper}>
          <img
            className={classes.logo}
            alt="ASX:DPD"
            src="/images/dealpad-logo.png"
          />
        </div>
        <div className={classes.infoContainer}>
          <Typography color="secondary" noWrap variant="caption">
            CAPITAL RAISE
          </Typography>
          <Typography noWrap>DEAL PAD PTY LTD</Typography>
          <Typography color="textSecondary" variant="caption">
            ASX:DPD
          </Typography>
        </div>
      </div>
    </a>
  );
}

export default HomeOrganisationItem;
