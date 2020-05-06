import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { removeAlert } from '../redux/modules/alert';

import styles from './Alert.module.css';
import dismiss from '../../images/icons/x.svg';

const Alert = ({ alerts, remove }) => {
  return (
    <div className={styles.alertsContainer}>
      {alerts !== null &&
        Object.values(alerts).length > 0 &&
        Object.values(alerts).map((alert) => {
          return (
            <div
              className={[styles.alertContainer, styles[alert.alertType]].join(
                ' '
              )}
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
          );
        })}
    </div>
  );
};

Alert.propTypes = {
  alerts: PropTypes.object,
  remove: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    alerts: state.alert,
  };
};

const mapDispatchToProps = (dispatch) => ({
  remove: (id) => dispatch(removeAlert(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
