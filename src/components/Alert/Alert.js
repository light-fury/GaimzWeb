import React from 'react';
import { connect } from 'react-redux';

import { removeAlert } from '../redux/modules/alert';

import styles from './Alert.module.css';
import dismiss from '../../images/icons/x.svg';

const Alert = ({ alerts, remove }) => (
  <div className={styles.alertsContainer}>
    { alerts !== null
        && alerts.length > 0
        && alerts.map((alert) => (
          <div className={[styles.alertContainer, styles[alert.alertType]].join(' ')} key={alert.id}>
            {alert.message}
            <img className={styles.cancelButton} src={dismiss} alt="Dismiss Alert" onClick={() => remove(alert.id)} />
          </div>
        ))}
  </div>
);

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

const mapDispatchToProps = (dispatch) => ({
  remove: (id) => dispatch(removeAlert(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
