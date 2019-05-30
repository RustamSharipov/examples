import React from 'react';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ILoginActions } from 'apps/users/interfaces/loginForm';
import { IUserReducer } from 'apps/users/interfaces/user';
import { localizeString } from 'utils/localization';
import * as LoginActions from 'apps/users/actions/LoginActions';
import styles from './style.css';

interface IUserProps {
  user: IUserReducer;
  LoginActions: ILoginActions;
}

class User extends React.Component<IUserProps> {
  public render() {
    const { merchant_user } = this.props.user;
    if (merchant_user) {
      return (
        <div>
          <span className={classNames(
            styles.userName,
            'spec-app-header-username',
          )}>
            {merchant_user.name}
          </span>
          <button
            className={classNames(
              styles.userCTA,
              'spec-app-header-signout-button',
            )}
            onClick={this.signOut}
            type="button">
            {localizeString('Sign Out')}
          </button>
        </div>
      );
    }

    return null;
  }

  private signOut = () => {
    this.props.LoginActions.signOut();
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    LoginActions: bindActionCreators(LoginActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
