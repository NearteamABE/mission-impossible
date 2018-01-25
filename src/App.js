import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Alert } from '@blueprintjs/core';
import './App.css';
import Missions from './components/missions';
import { Header, HeaderLeft, HeaderRight, HeaderCenter } from './components/header';
import { Title, Logo, Menu } from './components/app/';
import {
  removeMission,
  removeMissions,
  toggleMission,
  hideAlert,
  filterMissionOpen,
  filterMissionEnd,
  sortMissions,
  requestAction,
  searchBar,
} from './actions';
import { getSortedMissions, filterMissions } from './selectors';

const App = props => (
  <div>
    <Alert isOpen={props.showAlert} onConfirm={() => props.hideAlert()}>
      {"Vous n'avez pas la permission de faire cette action."}
    </Alert>
    <Header>
      <HeaderLeft>
        <Logo />
      </HeaderLeft>
      <HeaderCenter>
        <Title />
      </HeaderCenter>
      <HeaderRight>
        <Menu />
      </HeaderRight>
    </Header>
    <Missions {...props} />
  </div>
);

App.propTypes = {
  showAlert: PropTypes.bool.isRequired,
  hideAlert: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  removeMission,
  removeMissions,
  toggleMission,
  hideAlert,
  filterMissionOpen,
  filterMissionEnd,
  sortMissions,
  requestAction,
  searchBar,
};
const mapStateToProps = state => {
  return {
    ...state,
    missions: filterMissions(state, getSortedMissions(state)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
