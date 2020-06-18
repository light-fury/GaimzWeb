import React, { useState } from 'react';
import { Option } from 'react-dropdown';
import { Game } from 'src/models/match-interfaces';
import styles from './MatchmakingSettings.module.css';
import LabelDropdown from '../shared/LabelDropdown';
import sharedStyles from '../shared/sharedcss.module.css';
import DarkInputField from '../shared/DarkInputField';
import { InputType } from '../shared';

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
  [s: string]: string;
}

interface MatchmakingSettingsUpdate{
  gameType?: string;
  gameMode?: string;
  region?: string;
  restriction?: Restriction;
  password?: string;
}

interface MatchmakingSettingsProps {
  game: Game;
  onSubmitForm(settings: IMatchmakingSettings): void;
}

const RegionDropDown: Option[] = [
  {
    label: 'Automatic',
    value: 'auto'
  }
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
  { game, onSubmitForm }: MatchmakingSettingsProps
) => {
  const [matchmakingSettings, setMatchmakingSettings] = useState<IMatchmakingSettings>({
    gameType: '',
    gameMode: '',
    region: 'auto',
    restriction: Restriction.Everyone,
    password: '',
  });

  const [valid, setValid] = useState<boolean>(false);

  const onSettingsChange = (update: MatchmakingSettingsUpdate) => {
    const newSettings: IMatchmakingSettings = { ...matchmakingSettings, ...update };
    setMatchmakingSettings(newSettings);
    if (!newSettings.gameMode
      || !newSettings.gameType
      || !newSettings.restriction
      || !newSettings.region
      || (!newSettings.password && newSettings.restriction === Restriction.PasswordProtected)) {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  const selectedGameType = game.game_types.find((gt) => gt.type === matchmakingSettings.gameType);
  const selectedGameMode = selectedGameType?.gameModes.find(
    (gm) => gm === matchmakingSettings.gameMode
  );
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {`SEARCH SETTINGS - ${game.game_name}`}
      </div>
      <LabelDropdown
        label="GAME TYPE"
        selectedItemValue={matchmakingSettings.gameType}
        dropdownItems={game.game_types.map((gt) => ({ label: gt.type, value: gt.type }))}
        onSelectValue={(val) => onSettingsChange({ gameType: val, gameMode: '' })}
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
              onSelectValue={(val) => onSettingsChange({ gameMode: val })}
            />
          </div>
        </div>
        <div className={styles.halfContainer}>
          <div className={styles.rightContainer}>
            <LabelDropdown
              label="REGION"
              selectedItemValue={matchmakingSettings.region}
              dropdownItems={RegionDropDown}
              onSelectValue={(val) => onSettingsChange({ region: val })}
            />
          </div>
        </div>
      </div>
      <LabelDropdown
        label="RESTRICTION"
        selectedItemValue={matchmakingSettings.restriction}
        dropdownItems={RestrictionDropDown}
        onSelectValue={(val) => onSettingsChange({ restriction: val as Restriction })}
      />
      {
        matchmakingSettings.restriction === Restriction.PasswordProtected
          ? <DarkInputField type={InputType.Password} label="PASSWORD" value={matchmakingSettings.password} onChange={(val) => onSettingsChange({ password: val })} />
          : ''
      }
      <button
        disabled={!valid}
        className={styles.matchButton}
        onClick={() => onSubmitForm(matchmakingSettings)}
      >
        Start Search
      </button>
    </div>
  );
};

export default MatchmakingSettings;
