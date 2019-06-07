import * as React from 'react';
// MUI Core
import {
  Box,
  Container,
  Grid,
  Icon,
  TextField,
  Typography,
  Theme,
} from '@material-ui/core';
// MUI Styles
import { makeStyles, useTheme } from '@material-ui/styles';

const useStyles = makeStyles({
  iconContainer: {
    display: 'flex',
  },
  input: {
    padding: 0,
  },
  inputContainer: {
    flex: 1,
  },
});

function HomeHeader() {
  const classes = useStyles();
  const theme = useTheme<Theme>();

  return (
    <Box bgcolor={theme.palette.common.white}>
      <Container maxWidth="lg">
        <Box px={3} py={12}>
          <Grid container justify="center" spacing={3}>
            <Grid item xs={12}>
              <Typography align="center" component="h1" variant="h5">
                Find Capital Raises from over 2,400 Companies
              </Typography>
            </Grid>
            <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
              <Box
                border={`solid 1px ${theme.palette.divider}`}
                borderRadius={4}
                p={1.5}
              >
                <Grid container alignItems="center" spacing={1} wrap="nowrap">
                  <Grid item className={classes.inputContainer}>
                    <TextField
                      fullWidth
                      InputProps={{
                        classes: { input: classes.input },
                        disableUnderline: true,
                      }}
                      placeholder="Search by Company Name, Code, Industry, or Tag"
                    />
                  </Grid>
                  <Grid item className={classes.iconContainer}>
                    <Icon color="action" fontSize="small">search</Icon>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default HomeHeader;
