import React from 'react';
import { connect } from 'react-redux';

import { removeAlert } from '../redux/modules/alert';

import styles from './Alert.module.css';
import dismiss from '../../images/icons/x.svg';

const Alert = (props) => {
  return (
    <div className={styles.alertsContainer}>
      { props.alerts !== null
        && props.alerts.length > 0
        && props.alerts.map((alert) => (
        <div className={[styles.alertContainer, styles[alert.alertType]].join(' ')} key={alert.id}>
          {alert.message}
          <img className={styles.cancelButton} src={dismiss} onClick={() => props.removeAlert(alert.id)} />
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  alerts: state.alert
});

const mapDispatchToProps = (dispatch) => {
  return {
    removeAlert: (id) => dispatch(removeAlert(id))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
