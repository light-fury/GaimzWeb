import React from 'react';
import { connect } from 'react-redux';

import { removeAlert } from '../redux/modules/alert';

import styles from './Alert.module.css';

const Alert = (props) => {
  return (
    <div className={styles.alertsContainer}>
      { props.alerts !== null 
        && props.alerts.length > 0 
        && props.alerts.map((alert) => (
        <div className={styles.alertContainer} onClick={() => props.removeAlert(alert.id)}>
          {alert.message}
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