import * as React from 'react';
import { compose, withApollo } from 'react-apollo';
import { withRouter, RouteComponentProps } from 'react-router-dom';
// MUI Core
import { Avatar, Menu, MenuItem } from '@material-ui/core';
// Contexts
import SnackbarContext from '../../contexts/SnackbarContext';

interface IProps {
  client: {
    resetStore: () => Promise<any>;
  };
  me: {
    email: string;
    name: string;
  };
}

function UserMenu({ client, history, me }: IProps & RouteComponentProps) {
  const { showSnackbar } = React.useContext(SnackbarContext);

  const [anchorEl, setAnchorEl] = React.useState<
    Element | ((element: Element) => Element) | null | undefined
  >(null);

  function handleLogOut() {
    setAnchorEl(null);

    fetch(`/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then(() => {
        history.push('/');

        client.resetStore();
      })
      .catch(() => {
        showSnackbar({
          message: 'Oops! Something went wrong.',
          variant: 'error',
        });
      });
  }

  return (
    <React.Fragment>
      <Avatar onClick={(e) => setAnchorEl(e.currentTarget)}>
        {me.name.charAt(0).toUpperCase()}
      </Avatar>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default compose(
  withApollo,
  withRouter,
)(UserMenu);
