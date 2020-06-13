import React from 'react';
import { Option } from 'react-dropdown';
import { Game } from 'src/models/match-interfaces';
import styles from './MatchmakingSettings.module.css';
import LabelDropdown from '../shared/LabelDropdown';
import sharedStyles from '../shared/sharedcss.module.css';

export enum Restriction {
  Everyone = 'Everyone',
  FollowersOnly = 'FollowersOnly',
  SubsOnly = 'SubsOnly',
  PasswordProtected = 'PasswordProtected'
}

export interface IMatchmakingSettings {
  gameType: string;
  gameMode: string;
  region: string;
  restriction: Restriction;
  password: string;
  complete: boolean;
  [s: string]: string | boolean;
}

interface MatchmakingSettingsProps {
  matchmakingSettings: IMatchmakingSettings;
  onChangeMatchmakingSettings: (matchmakingSettings: IMatchmakingSettings) => void;
  game: Game;
}

const RegionDropDown: Option[] = [
  {
    label: 'Automatic',
    value: 'auto'
  }
  // },
  // {
  //   label: 'N. America',
  //   value: 'NA'
  // },
  // {
  //   label: 'Europe',
  //   value: 'EU'
  // },
  // {
  //   label: 'Asia',
  //   value: 'ASIA'
  // }
];

const RestrictionDropDown: Option[] = [
  {
    label: 'Everyone',
    value: Restriction.Everyone
  },
  {
    label: 'Followers only',
    value: Restriction.FollowersOnly
  },
  {
    label: 'Subscribers only',
    value: Restriction.SubsOnly
  },
  {
    label: 'Password Protected',
    value: Restriction.PasswordProtected
  }
];

const MatchmakingSettings = (
  { matchmakingSettings, onChangeMatchmakingSettings, game }: MatchmakingSettingsProps
) => {
  const onSettingsChange = (val: string, field: string) => {
    const newSettings: IMatchmakingSettings = { ...matchmakingSettings };
    newSettings[field] = val;
    newSettings.complete = true;
    for (const k in newSettings) {
      if (k !== 'complete' && !newSettings[k]) { newSettings.complete = false; }
    }
    onChangeMatchmakingSettings(newSettings);
  };

  const selectedGameType = game.game_types.find((gt) => gt.type === matchmakingSettings.gameType);
  const selectedGameMode = selectedGameType?.gameModes.find(
    (gm) => gm === matchmakingSettings.gameMode
  );
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        SEARCH SETTINGS
      </div>
      <LabelDropdown
        label="GAME TYPE"
        selectedItemValue={matchmakingSettings.gameType}
        dropdownItems={game.game_types.map((gt) => ({ label: gt.type, value: gt.type }))}
        onSelectValue={(val) => { onSettingsChange(val, 'gameType'); }}
      />
      <div className={sharedStyles.row}>
        <div className={styles.halfContainer}>
          <div className={styles.leftContainer}>
            <LabelDropdown
              label="GAME MODE"
              selectedItemValue={selectedGameMode || ''}
              dropdownItems={selectedGameType
                ? selectedGameType.gameModes.map((gm) => ({ label: gm, value: gm }))
                : []}
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
        label="CREATE MATCH"
        selectedItemValue={matchmakingSettings.restriction}
        dropdownItems={RestrictionDropDown}
        onSelectValue={(val) => onSettingsChange(val, 'restriction')}
      />
    </div>
  );
};

export default MatchmakingSettings;
