import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { Rootstate } from 'store';
import Header from 'components/common/Header';
import Loading from 'components/common/Loading';

interface IProps {
  exact?: boolean;
  path: string;
  component: React.ComponentType<any>;
}

function MainLayout({ component: Component, ...rest }: IProps) {
  const { loading } = useSelector((root: Rootstate) => root.common);

  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <Fragment>
          {loading && <Loading />}
          <Header />
          <Component {...matchProps} />
        </Fragment>
      )}
    />
  );
}

export default MainLayout;
