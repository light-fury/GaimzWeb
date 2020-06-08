import React from 'react';
import { Option } from 'react-dropdown';
import styles from './MatchmakingSettings.module.css';
import LabelDropdown from '../LabelDropdown';

export interface IMatchmakingSettings {
  gameType: string;
  gameMode: string;
  region: string;
  streamer: string;
  streamerOption: string;
}

interface MatchmakingSettingsProps {
  matchmakingSettings: IMatchmakingSettings;
  onChangeMatchmakingSettings: (matchmakingSettings: IMatchmakingSettings) => void;
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
    label: 'N. America',
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

const MatchmakingSettings = ({ matchmakingSettings, onChangeMatchmakingSettings }: MatchmakingSettingsProps) => {
  const onSettingsChange = (val: string, field: string) => {
    // @ts-ignore
    matchmakingSettings[field] = val;
    onChangeMatchmakingSettings(matchmakingSettings);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        SEARCH SETTINGS
      </div>
      <LabelDropdown
        label="GAME TYPE"
        selectedItemValue={matchmakingSettings.gameType}
        dropdownItems={GameTypeDropDown}
        onSelectValue={(val) => onSettingsChange(val, 'gameType')}
      />
      <div className={styles.row}>
        <div className={styles.halfContainer}>
          <div className={styles.leftContainer}>
            <LabelDropdown
              label="GAME MODE"
              selectedItemValue={matchmakingSettings.gameMode}
              dropdownItems={GameModeDropDown}
              onSelectValue={(val) => onSettingsChange(val, 'gameMode')}
            />
          </div>
        </div>
        <div className={styles.halfContainer}>
          <div className={styles.rightContainer}>
            <LabelDropdown
              label="REGION"
              selectedItemValue={matchmakingSettings.region}
              dropdownItems={RegionDropDown}
              onSelectValue={(val) => onSettingsChange(val, 'region')}
            />
          </div>
        </div>
      </div>
      <LabelDropdown
        label="SELECT STREAMER"
        selectedItemValue={matchmakingSettings.streamer}
        dropdownItems={StreamerDropDown}
        onSelectValue={(val) => onSettingsChange(val, 'streamer')}
      />
      <LabelDropdown
        label="CREATE MATCH"
        selectedItemValue={matchmakingSettings.streamerOption}
        dropdownItems={StreamerOptionDropDown}
        onSelectValue={(val) => onSettingsChange(val, 'streamerOption')}
      />
    </div>
  );
};

export default MatchmakingSettings;
