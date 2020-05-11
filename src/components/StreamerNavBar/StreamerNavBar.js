import React, { useState, useRef, useCallback, useMemo, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createAlert } from '../redux/modules/alert';
import StreamerTile from './StreamerTile/StreamerTile';
import Arrow from '../shared/Arrow/Arrow';
import logo from '../../images/logos/logo.svg';
import gear from '../../images/icons/gear.svg';
import search from '../../images/icons/search.svg';
import styles from './StreamerNavBar.module.css';
import { streamerData } from '../utils/dummyData';
const streamers = streamerData;

const StreamerNavBar = ({ createAlertAction }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [className, setClassName] = useState('Collapsed');
  const [showOffline, setShowOffline] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [showMore, setShowMore] = useState(false);
  const streamerLimit = useRef(5);

  const handleCollapse = useCallback(
    (event) => {
      if (collapsed === true) {
        setCollapsed(false);
        setClassName('Expanded');
      } else {
        setCollapsed(true);
        setClassName('Collapsed');
        setSearchInput('');
        setShowMore(false);
        streamerLimit.current = 5;
      }
    },
    [
      collapsed,
      setCollapsed,
      setClassName,
      setSearchInput,
      setShowMore,
      streamerLimit,
    ]
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

  const handleShowOffline = useCallback(
    (event) => {
      setShowOffline((currentShowOffline) => !currentShowOffline);
    },
    [setShowOffline]
  );

  const handleFollow = useCallback(
    (id, name, currentFollowing) => {
      if (currentFollowing === true) {
        createAlertAction(`You are no longer following ${name}!`, 'danger');
      } else {
        createAlertAction(`You are now following to ${name}!`, 'success');
      }
    },
    [createAlertAction]
  );

  const handleSubscribe = useCallback(
    (id, name, currentSubscribed) => {
      if (currentSubscribed === true) {
        createAlertAction(
          `You are no longer subscribed to from ${name}!`,
          'danger'
        );
      } else {
        createAlertAction(`You are now subscribed to ${name}!`, 'success');
      }
    },
    [createAlertAction]
  );

  const handleShowMore = useCallback(
    (event) => {
      if (showMore === true) {
        setShowMore(false);
        streamerLimit.current = 5;
      } else {
        setShowMore(true);
        streamerLimit.current = streamers.length;
      }
    },
    [showMore, setShowMore, streamerLimit]
  );

  const filteredStreamers = useMemo(() => {
    let filteredStreamers = streamers;
    if (!showOffline)
      filteredStreamers = filteredStreamers.filter(
        (streamer) => streamer.online === true
      );
    if (searchInput.trim() !== '')
      filteredStreamers = filteredStreamers.filter((streamer) =>
        streamer.name.toLowerCase().includes(searchInput.toLowerCase())
      );
    filteredStreamers = filteredStreamers.slice(0, streamerLimit.current);
    return filteredStreamers;
  }, [showOffline, searchInput, showMore]);

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
                filteredStreamers.map((streamer, index) => (
                  <StreamerTile
                    key={`${index}-${streamer.id}`}
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
              <div className={styles.titleContainerExpanded}>
                <span className={styles.titleExpanded}>Streamer List</span>
                <div className={styles.onlineOnlyContainerExpanded}>
                  <span className={styles.onlineOnlyTextExpanded}>
                    Online Only
                  </span>
                  <input
                    className={styles.onlineOnlyCheckboxExpanded}
                    type="checkbox"
                    checked={!showOffline}
                    onChange={handleShowOffline}
                  />
                </div>
              </div>
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
                  filteredStreamers.map((streamer, index) => (
                    <StreamerTile
                      key={`${index}-${streamer.id}`}
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
                {filteredStreamers.length === 0 && streamers.length !== 0 && (
                  <div className={styles.noStreamersExpanded}>
                    Uh oh! We couldn't find anyone!
                    <br />
                    Try a different search!
                  </div>
                )}
                {filteredStreamers.length === 0 && streamers.length === 0 && (
                  <div className={styles.noStreamersExpanded}>
                    Uh oh! It looks like you haven't followed anyone yet!
                  </div>
                )}
                {filteredStreamers.length !== 0 && !showMore && (
                  <div
                    className={styles.showMoreContainer}
                    onClick={handleShowMore}
                  >
                    Show More
                  </div>
                )}
              </div>
              {filteredStreamers.length !== 0 && showMore && (
                <div
                  className={styles.showLessContainer}
                  onClick={handleShowMore}
                >
                  Show Less
                </div>
              )}
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
          <Arrow
            className={styles.buttonIcon}
            direction={collapsed ? 'right' : 'left'}
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
