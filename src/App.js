import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import './App.css';
import Nav from './components/Navbar/Nav';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initializeApp, catchUnhandledErrors } from './Redux/appReducer';
import Preloader from './components/common/preloader/preloader';
import { withSuspense } from './hocs/withSuspense';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const Settings = React.lazy(() => import('./components/Settings/Settings'));
const News = React.lazy(() => import('./components/News/News'));
const Music = React.lazy(() => import('./components/Music/Music'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));

class App extends React.Component {
  catchAllUnhandledErrors = (PromiseRejectionEvent) => {
    console.log(PromiseRejectionEvent);
    this.props.catchUnhandledErrors(PromiseRejectionEvent.reason.message);
  }
  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  }
  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  }
  render() {
    if (!this.props.initialized) {
      return (<Preloader />);
    }
    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <Nav store={this.props.store} />
        <div className="app-wrapper-content">
          <div>{this.props.globalErrorMessage}</div>
          <Switch>
            <Redirect exact from='/' to='/profile' />
            <Route path='/login' render={() => <Login />} />
            <Route path='/dialogs' render={withSuspense(DialogsContainer)} />
            <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
            <Route path='/settings' render={withSuspense(Settings)} />
            <Route path='/news' render={withSuspense(News)} />
            <Route path='/music' render={withSuspense(Music)} />
            <Route path='/users' render={withSuspense(UsersContainer)} />

          </Switch>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return ({
    initialized: state.app.initialized,
    globalErrorMessage: state.app.globalErrorMessage
  })
}


export default compose(
  withRouter,
  connect(mapStateToProps, { initializeApp, catchUnhandledErrors }))(App);;
