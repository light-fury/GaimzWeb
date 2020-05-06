import React, { useState, useCallback, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createAlert } from '../redux/modules/alert';

import StreamerTile from './StreamerTile/StreamerTile';

import logo from '../../images/logos/logo.svg';
import gear from '../../images/icons/gear.svg';
import arrowRight from '../../images/icons/arrowRight.svg';
import arrowLeft from '../../images/icons/arrowLeft.svg';
import search from '../../images/icons/search.svg';

import styles from './StreamerNavBar.module.css';

const StreamerNavBar = ({ streamers, createAlertAction }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [className, setClassName] = useState('Collapsed');
  const [searchInput, setSearchInput] = useState('');

  const handleCollapse = useCallback(
    (event) => {
      if (collapsed === true) {
        setCollapsed(false);
        setClassName('Expanded');
      } else {
        setCollapsed(true);
        setClassName('Collapsed');
        setSearchInput('');
      }
    },
    [collapsed, setCollapsed, setClassName, setSearchInput]
  );

  const handleSettings = () => {
    console.log('Settings Clicked');
  };

  const handleSearch = useCallback(
    (event) => {
      setSearchInput(event.target.value);
    },
    [setSearchInput]
  );

  const handleFollow = (id, name, currentFollowing) => {
    if (currentFollowing === true) {
      createAlertAction(`You are no longer following ${name}!`, 'danger');
    } else {
      createAlertAction(`You are now following to ${name}!`, 'success');
    }
  };

  const handleSubscribe = (id, name, currentSubscribed) => {
    if (currentSubscribed === true) {
      createAlertAction(
        `You are no longer subscribed to from ${name}!`,
        'danger'
      );
    } else {
      createAlertAction(`You are now subscribed to ${name}!`, 'success');
    }
  };

  let filteredStreamers;
  if (searchInput.trim() === '') {
    filteredStreamers = streamers;
  } else {
    filteredStreamers = streamers.filter((streamer) =>
      streamer.name.toLowerCase().includes(searchInput.toLowerCase())
    );
  }

  return (
    <div
      className={[styles.container, styles[`container${className}`]].join(' ')}
    >
      <div className={[styles.header, styles[`header${className}`]].join(' ')}>
        <Link className={styles.logoContainer} to="/feed">
          <img className={styles.logo} src={logo} alt="Gaimz Logo" />
        </Link>
        {!collapsed && (
          <img
            className={styles.gear}
            src={gear}
            alt="Settings Icon"
            onClick={handleSettings}
          />
        )}
      </div>

      <div className={styles.middleContainer}>
        <div
          className={[
            styles.streamerContainer,
            styles[`streamerContainer${className}`],
          ].join(' ')}
        >
          {collapsed ? (
            <Fragment>
              {filteredStreamers !== null &&
                filteredStreamers.map((streamer) => (
                  <StreamerTile
                    key={streamer.id}
                    id={streamer.id}
                    name={streamer.name}
                    icon={streamer.icon}
                    following={streamer.following}
                    subscribed={streamer.subscribed}
                    online={streamer.online}
                    collapsed={collapsed}
                  />
                ))}
            </Fragment>
          ) : (
            <Fragment>
              <div className={styles.headerExpanded}>
                <div
                  className={[
                    styles.headerCellExpanded,
                    styles.headerNameCellExpanded,
                  ].join(' ')}
                >
                  Name
                </div>
                <div
                  className={[
                    styles.headerCellExpanded,
                    styles.headerFollowingCellExpanded,
                  ].join(' ')}
                >
                  Following
                </div>
                <div
                  className={[
                    styles.headerCellExpanded,
                    styles.headerSubscribedCellExpanded,
                  ].join(' ')}
                >
                  Subscribed
                </div>
              </div>
              <div className={styles.bodyExpanded}>
                {filteredStreamers !== null &&
                  filteredStreamers.length !== 0 &&
                  filteredStreamers.map((streamer) => (
                    <StreamerTile
                      key={streamer.id}
                      id={streamer.id}
                      name={streamer.name}
                      icon={streamer.icon}
                      following={streamer.following}
                      subscribed={streamer.subscribed}
                      online={streamer.online}
                      collapsed={collapsed}
                      handleFollow={handleFollow}
                      handleSubscribe={handleSubscribe}
                    />
                  ))}
                {filteredStreamers.length === 0 && (
                  <div className={styles.noStreamersExpanded}>
                    Uh oh! We couldn't find anyone!
                    <br />
                    Try a different search!
                  </div>
                )}
              </div>
            </Fragment>
          )}
        </div>
      </div>

      <div className={styles.actionContainer}>
        {!collapsed && (
          <div className={styles.searchContainer}>
            <img className={styles.searchIcon} src={search} alt="Search Icon" />
            <input
              className={styles.searchInput}
              placeholder="Search for streamers..."
              value={searchInput}
              onChange={handleSearch}
            />
          </div>
        )}
        <div
          className={[styles.button, styles[`button${className}`]].join(' ')}
          onClick={handleCollapse}
        >
          <img
            className={styles.buttonIcon}
            src={collapsed ? arrowRight : arrowLeft}
            alt="Streamer List Button"
          />
        </div>
      </div>
    </div>
  );
};

StreamerNavBar.propTypes = {
  streamers: PropTypes.array,
  createAlertAction: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  createAlertAction: (message, alertType) =>
    dispatch(createAlert(message, alertType)),
});

export default connect(null, mapDispatchToProps)(StreamerNavBar);
