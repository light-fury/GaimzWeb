import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { removeAlert } from '../redux/modules/alert';

import styles from './Alert.module.css';
import dismiss from '../../images/icons/x.svg';

const Alert = ({ c, alerts, remove }) => (
  <div className={styles.alertsContainer}>
    {alerts !== null &&
      alerts.length > 0 &&
      alerts.map((alert) => (
        <div
          className={[styles.alertContainer, styles[alert.alertType]].join(' ')}
          key={alert.id}
        >
          {alert.message}
          <img
            className={styles.cancelButton}
            src={dismiss}
            alt="Dismiss Alert"
            onClick={() => remove(alert.id)}
          />
        </div>
      ))}
  </div>
);

Alert.propTypes = {
  c: PropTypes.number,
  alerts: PropTypes.array,
  remove: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    c: Math.random(),
    alerts: state.alert.alerts,
  };
};

const mapDispatchToProps = (dispatch) => ({
  remove: (id) => dispatch(removeAlert(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
