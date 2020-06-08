import React, { useState } from 'react';
import { Option } from 'react-dropdown';
import styles from './MatchmakingSettings.module.css';
import LabelDropdown from '../LabelDropdown';

interface MatchmakingSettingsProps {

}

const GameTypeDropDown: Option[] = [
  {
    label: '1 versus 1',
    value: '1v1'
  },
  {
    label: '5 versus 5',
    value: '5v5'
  },
  {
    label: '3 versus 3',
    value: '3v3'
  }
];

const GameModeDropDown: Option[] = [
  {
    label: 'All pick',
    value: 'allPick'
  },
  {
    label: 'Competitive',
    value: 'competitive'
  }
];

const RegionDropDown: Option[] = [
  {
    label: 'Automatic',
    value: 'auto'
  },
  {
    label: 'North America',
    value: 'NA'
  },
  {
    label: 'Europe',
    value: 'EU'
  },
  {
    label: 'Asia',
    value: 'ASIA'
  }
];

const StreamerDropDown: Option[] = [
  {
    label: 'Streamer 1',
    value: 'streamer1'
  },
  {
    label: 'Streamer 2',
    value: 'streamer2'
  },
  {
    label: 'Streamer 3',
    value: 'streamer3'
  },
  {
    label: 'Streamer 4',
    value: 'streamer4'
  }
];

const StreamerOptionDropDown: Option[] = [
  {
    label: 'Subscribers only',
    value: 'subscribers'
  },
  {
    label: 'Followers only',
    value: 'followers'
  }
];

const MatchmakingSettings = ({}: MatchmakingSettingsProps) => {
  const [gameType, setGameType] = useState('1v1');
  const [gameMode, setGameMode] = useState('allPick');
  const [region, setRegion] = useState('auto');
  const [streamer, setStreamer] = useState('streamer1');
  const [streamerOption, setStreamerOption] = useState('subscribers');

  const onSelectGameType = (value: string) => {
    setGameType(value);
  };

  const onSelectGameMode = (value: string) => {
    setGameMode(value);
  };

  const onSelectRegion = (value: string) => {
    setRegion(value);
  };

  const onSelectStreamer = (value: string) => {
    setStreamer(value);
  };

  const onSelectStreamerOptions = (value: string) => {
    setStreamerOption(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        SEARCH SETTINGS
      </div>
      <LabelDropdown
        label="GAME TYPE"
        selectedItemValue={gameType}
        dropdownItems={GameTypeDropDown}
        onSelectValue={onSelectGameType}
      />
      <div className={styles.row}>
        <div className={styles.halfContainer}>
          <div className={styles.leftContainer}>
            <LabelDropdown
              label="GAME MODE"
              selectedItemValue={gameMode}
              dropdownItems={GameModeDropDown}
              onSelectValue={onSelectGameMode}
            />
          </div>
        </div>
        <div className={styles.halfContainer}>
          <div className={styles.rightContainer}>
            <LabelDropdown
              label="REGION"
              selectedItemValue={region}
              dropdownItems={RegionDropDown}
              onSelectValue={onSelectRegion}
            />
          </div>
        </div>
      </div>
      <LabelDropdown
        label="SELECT STREAMER"
        selectedItemValue={streamer}
        dropdownItems={StreamerDropDown}
        onSelectValue={onSelectStreamer}
      />
      <LabelDropdown
        label="CREATE MATCH"
        selectedItemValue={streamerOption}
        dropdownItems={StreamerOptionDropDown}
        onSelectValue={onSelectStreamerOptions}
      />
    </div>
  );
};

export default MatchmakingSettings;
