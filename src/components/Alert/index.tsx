import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeAlert, AlertStatus } from 'src/features/alert';
import dismiss from 'src/images/icons/x.svg';
import { RootState } from 'src/app/rootReducer';

import styles from './Alert.module.css';

const Alert = () => {
  const dispatch = useDispatch();
  const alertState = useSelector((state: RootState) => state.alert);
  let alerts = null;
  if (alertState !== null) {
    alerts = Object.values(alertState) as AlertStatus[];
  }

  return (
    <div className={styles.alertsContainer}>
      {alerts !== null &&
        alerts.map((alert) => (
          <div
            className={[styles.alertContainer, styles[alert.alertType]].join(
              ' '
            )}
            key={alert.id}
          >
            {alert.message}
            <button
              className={styles.cancelButton}
              onClick={() => dispatch(removeAlert(alert.id))}
            >
              <img src={dismiss} alt="Dismiss Alert" />
            </button>
          </div>
        ))}
    </div>
  );
};

export default Alert;
