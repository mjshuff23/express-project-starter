import React from 'react';
import { Redirect, Route } from 'react-router-dom';

// Private Route - Must be logged in to access
// Takes component and renames it Component, then spreads the rest of the props
export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    // Spread props
    {...rest}
    render={(props) =>
      // Not logged in?
      rest.needLogin === true ? (
        // Send to splash page
        <Redirect to='/landing' />
      ) : (
        // Render component with props
        <Component {...props} />
      )
    }
  />
);

// Protected Route - Can't be accessed when logged in
export const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    // Spread props
    {...rest}
    render={(props) =>
      // Logged in? If so, redirect to root directory, otherwise, load the component
      rest.needLogin !== true ? <Redirect to='/' /> : <Component {...props} />
    }
  />
);
