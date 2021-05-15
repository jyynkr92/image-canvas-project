import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Header from './Header';

interface IProps {
  exact?: boolean;
  path: string;
  component: React.ComponentType<any>;
}

function MainLayout({ component: Component, ...rest }: IProps) {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <Fragment>
          {/* {loading && <Loading />} */}
          <Header />
          <Component {...matchProps} />
        </Fragment>
      )}
    />
  );
}

export default MainLayout;
