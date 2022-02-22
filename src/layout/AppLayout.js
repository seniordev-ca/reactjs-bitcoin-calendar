import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import TopNav from 'containers/navs/Topnav';

const AppLayout = ({ children, history }) => {
  return (
    <div id="app-container">
      <TopNav history={history} />
      <main>
        <div className="container-fluid">{children}</div>
      </main>
    </div>
  );
};
const mapStateToProps = () => {
  return {};
};
const mapActionToProps = {};

export default withRouter(
  connect(mapStateToProps, mapActionToProps)(AppLayout)
);
