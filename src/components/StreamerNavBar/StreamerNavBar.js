import React, { useState, useCallback, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import StreamerTile from './StreamerTile/StreamerTile';

import logo from '../../images/logos/logo.svg';
import gear from '../../images/icons/gear.svg';
import arrowRight from '../../images/icons/arrowRight.svg';
import arrowLeft from '../../images/icons/arrowLeft.svg';
import search from '../../images/icons/search.svg';

import styles from './StreamerNavBar.module.css';

const StreamerNavBar = ({ streamers }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [className, setClassName] = useState('Expanded');
  const [searchInput, setSearchInput] = useState('');

  const handleCollapse = useCallback(
    (event) => {
      if (collapsed === true) {
        setCollapsed(false);
        setClassName('Expanded');
      } else {
        setCollapsed(true);
        setClassName('Collapsed');
      }
    },
    [collapsed, className]
  );

  const handleSettings = useCallback((event) => {
    console.log('Settings Clicked');
  }, []);

  const handleSearch = useCallback(
    (event) => {
      setSearchInput(event.target.value);
    },
    [setSearchInput]
  );

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
            <table
              className={styles.tableExpanded}
              cellSpacing="0"
              cellPadding="0"
            >
              <thead className={styles.tableHeadExpanded}>
                <tr>
                  <th className={styles.tableHeadNameCellExpanded}>Name</th>
                  <th className={styles.tableHeadFollowingCellExpanded}>
                    Following
                  </th>
                  <th className={styles.tableHeadSubscribedCellExpanded}>
                    Subscribed
                  </th>
                </tr>
              </thead>
              <tbody>
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
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className={styles.actionContainer}>
        {!collapsed && (
          <div className={styles.searchContainer}>
            <img className={styles.searchIcon} src={search} />
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
};

export default StreamerNavBar;
