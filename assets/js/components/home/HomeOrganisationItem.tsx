import * as React from 'react';
// MUI Core
import { Theme, Typography } from '@material-ui/core';
// MUI Styles
import { makeStyles } from '@material-ui/styles';
// Types
import { ICapitalRaise } from '../../utils/types';

interface IProps {
  capitalRaise: ICapitalRaise;
}

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

function HomeOrganisationItem({ capitalRaise }: IProps) {
  const classes = useStyles();

  return (
    <a
      className={classes.link}
      href={`/capital-raise/${capitalRaise.id}`}
      rel="noopener noreferrer"
      target="_blank"
    >
      <div className={classes.bannerWrapper}>
        <img
          className={classes.banner}
          alt={capitalRaise.key}
          src={capitalRaise.banner}
        />
      </div>

      <div className={classes.content}>
        <div className={classes.logoWrapper}>
          <img
            className={classes.logo}
            alt={capitalRaise.key}
            src={capitalRaise.logo}
          />
        </div>
        <div className={classes.infoContainer}>
          <Typography color="secondary" noWrap variant="caption">
            CAPITAL RAISE
          </Typography>
          <Typography noWrap>{capitalRaise.name}</Typography>
          <Typography color="textSecondary" variant="caption">
            {capitalRaise.key}
          </Typography>
        </div>
      </div>
    </a>
  );
}

export default HomeOrganisationItem;
