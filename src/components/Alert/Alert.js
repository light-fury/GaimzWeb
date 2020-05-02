import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { removeAlert } from '../redux/modules/alert';

import styles from './Alert.module.css';
import dismiss from '../../images/icons/x.svg';

const Alert = ({ alerts, remove }) => (
  <div className={styles.alertsContainer}>
    {alerts !== null &&
      Object.keys(alerts).length > 0 &&
      Object.keys(alerts).map((alertId) => {
        return (
          <div
            className={[
              styles.alertContainer,
              styles[alerts[alertId].alertType],
            ].join(' ')}
            key={alertId}
          >
            {alerts[alertId].message}
            <img
              className={styles.cancelButton}
              src={dismiss}
              alt="Dismiss Alert"
              onClick={() => remove(alertId)}
            />
          </div>
        );
      })}
  </div>
);

Alert.propTypes = {
  alerts: PropTypes.array,
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
