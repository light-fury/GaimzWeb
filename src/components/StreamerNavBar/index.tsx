import React, {
  useState,
  useCallback,
  useMemo,
  Fragment,
  useEffect,
} from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { createAlert } from 'src/features/alert';
import { Arrow, StreamerTile } from 'src/components';
import logo from 'src/images/logos/logo.svg';
import gear from 'src/images/icons/gear.svg';
import search from 'src/images/icons/search.svg';

import { Streamer, loadStreamers } from 'src/features/feed';
import { RootState } from 'src/app/rootReducer';
import styles from './StreamerNavBar.module.css';

interface StreamerNavBarProps {
  streamers?: Streamer[];
}

const StreamerNavBar = () => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(true);
  const [className, setClassName] = useState('Collapsed');
  const [showOffline, setShowOffline] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [showMore, setShowMore] = useState(false);
  const [streamerLimit, setStreamerLimit] = useState(5);

  useEffect(() => {
    dispatch(loadStreamers());
  }, [dispatch]);

  const { streamerData } = useSelector((s: RootState) => s.feed);

  const handleCollapse = useCallback(() => {
    if (collapsed === true) {
      setCollapsed(false);
      setClassName('Expanded');
    } else {
      setCollapsed(true);
      setClassName('Collapsed');
      setSearchInput('');
      setShowMore(false);
      setStreamerLimit(5);
    }
  }, [
    collapsed,
    setCollapsed,
    setClassName,
    setSearchInput,
    setShowMore,
    setStreamerLimit,
  ]);

  const handleSettings = () => {
    console.log('Settings Clicked');
  };

  const handleSearch = useCallback(
    (event) => {
      setSearchInput(event.target.value);
    },
    [setSearchInput]
  );

  const handleShowOffline = useCallback(() => {
    setShowOffline((currentShowOffline) => !currentShowOffline);
  }, [setShowOffline]);

  const handleFollow = useCallback(
    (id, name, currentFollowing) => {
      if (currentFollowing === true) {
        dispatch(createAlert(`You are no longer following ${name}!`, 'danger'));
      } else {
        dispatch(createAlert(`You are now following to ${name}!`, 'success'));
      }
    },
    [dispatch]
  );

  const handleSubscribe = useCallback(
    (id, name, currentSubscribed) => {
      if (currentSubscribed === true) {
        dispatch(
          createAlert(`You are no longer subscribed to from ${name}!`, 'danger')
        );
      } else {
        dispatch(createAlert(`You are now subscribed to ${name}!`, 'success'));
      }
    },
    [dispatch]
  );

  const handleShowMore = useCallback(() => {
    if (showMore === true) {
      setShowMore(false);
      setStreamerLimit(5);
    } else {
      setShowMore(true);
      setStreamerLimit(streamerData.length);
    }
  }, [showMore, setShowMore, setStreamerLimit, streamerData.length]);

  const filteredStreamers = useMemo(() => {
    let returnValue = streamerData;
    if (!showOffline) {
      returnValue = returnValue.filter((streamer) => streamer.online === true);
    }
    if (searchInput.trim() !== '') {
      returnValue = returnValue.filter((streamer) =>
        streamer.name.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
    returnValue = returnValue.slice(0, streamerLimit);
    return returnValue;
  }, [showOffline, searchInput, streamerLimit, streamerData]);

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
                {filteredStreamers.length === 0 && streamerData.length !== 0 && (
                  <div className={styles.noStreamersExpanded}>
                    Uh oh! We couldn't find anyone!
                    <br />
                    Try a different search!
                  </div>
                )}
                {filteredStreamers.length === 0 &&
                  streamerData.length === 0 && (
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

export default StreamerNavBar;
