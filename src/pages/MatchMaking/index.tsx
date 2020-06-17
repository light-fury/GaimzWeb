import React, { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RightModal, MatchmakingSettings, FindingMatchmaking, MatchmakingVersus, MatchmakingStats, GameSelector } from 'src/components';
import RecentMatches from 'src/components/RecentMatches';
import { RootState } from 'src/app/rootReducer';
import { settingsSubmitted, loadRecentMatches, loadGame, updateMatch, MatchmakingFlow, getCurrentMatch, gameLoaded, resendUpdates } from 'src/features/matches';
import { PlayerInterface, MatchResponse } from 'src/models/match-interfaces';

import { IMatchmakingSettings } from 'src/components/MatchmakingSettings';

import { Direction } from 'src/components/FindingMatchmaking';
import styles from './MatchMaking.module.css';

declare const window: Window;

const MatchMaking = () => {
  const dispatch = useDispatch();

  const {
    recentMatchesData,
    user,
    game,
    games,
    match,
    matchMakingFlow,
  } = useSelector(
    (s: RootState) => ({
      recentMatchesData: s.matches.recentMatchesData,
      user: s.authentication.user,
      games: s.matches.gamesData,
      game: s.matches.gameData,
      match: s.matches.matchData,
      matchMakingFlow: s.matches.matchMakingFlow,
    })
  );

  useEffect(() => {
    const userId = user?.user_id;
    if (userId !== undefined) {
      dispatch(loadRecentMatches(userId));
      dispatch(getCurrentMatch());
    }
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(loadGame('1')); // 1 is hard coded DOTA 2
  }, [dispatch]);


  const onAcceptMatchmaking = useCallback((matchId: string) => {
    dispatch(updateMatch(matchId, true));
  }, [dispatch]);


  const onCancelMatchmakingClicked = useCallback((matchId: string) => {
    dispatch(updateMatch(matchId, false));
  }, [dispatch]);

  const onReportIssueClicked = () => {
    // TODO: opens a reporting modal maybe?
  };

  const onResendInvitesClick = useCallback((matchId: string) => {
    dispatch(resendUpdates(matchId));
  }, [dispatch]);

  const renderLeftPanel = useCallback(() => {
    switch (matchMakingFlow) {
      case MatchmakingFlow.MATCH_IN_PROGRESS:
      case MatchmakingFlow.MATCH_END:
        return (
          <MatchmakingStats
            matchStats={match.stats!}
            matchResponse={match}
            game={game}
          />
        );
      default:
        return (
          <>
            <div className={styles.titleContainer}>
              <span className={styles.title}>Recent Matches</span>
            </div>
            <div className={styles.contentContainer}>
              {recentMatchesData !== null && (
                <RecentMatches userId={user!.user_id} recentMatchesData={recentMatchesData} />
              )}
            </div>
          </>
        );
    }
  }, [game, match, matchMakingFlow, recentMatchesData, user]);


  const initialState = useCallback(() => (
    <div className={styles.centerContainer}>
      <GameSelector
        games={games!}
        onGameSelected={(g) => { dispatch(gameLoaded(g)); }}
        selectedGameId={game.game_id}
      />
      <MatchmakingSettings
        game={game}
        onSubmitForm={(settings: IMatchmakingSettings) => {
          dispatch(settingsSubmitted({
            bet: 0,
            game_id: game.game_id,
            game_mode: settings.gameMode,
            game_type: settings.gameType,
            password: settings.password,
            restriction: settings.restriction
          }));
        }}
      />
    </div>
  ), [games, dispatch, game]);

  const searchingMatches = useCallback((matchId: string) => (
    <>
      <FindingMatchmaking
        title="Finding Match..."
        description="A match has 10 minutes to find available players. It will cancel after that timeout."
        completedTimeInS={600}
        onFinished={() => onCancelMatchmakingClicked(matchId)}
      />
      <div className={styles.centerContainer}>
        <button
          className={styles.matchButton}
          onClick={() => onCancelMatchmakingClicked(matchId)}
        >
          Cancel
        </button>
      </div>
    </>
  ), [onCancelMatchmakingClicked]);

  const matchFoundReady = useCallback((matchId: string) => (
    <>
      <FindingMatchmaking
        title="Your match is ready"
        completedTimeInS={30}
        direction={Direction.Down}
        description="Failing to accept may result in a temporary match ban."
      />
      <div className={styles.centerContainer}>
        <button
          className={styles.matchButton}
          onClick={() => onAcceptMatchmaking(matchId)}
        >
          Accept
        </button>
      </div>
      <div className={styles.centerContainer}>
        <button
          className={styles.settingsButton}
          onClick={() => onCancelMatchmakingClicked(matchId)}
        >
          Cancel
        </button>
      </div>
    </>
  ), [onAcceptMatchmaking, onCancelMatchmakingClicked]);

  const preparingMatchLobby = useCallback((matchId: string) => (
    <>
      <FindingMatchmaking
        title={`#GMZLOBBY${matchId}`}
        completedTimeInS={0}
        centerText="Gaimz Bot Preparing Lobby"
      />
      <div className={styles.centerContainer}>
        <button className={styles.reportIssuesButton} onClick={onReportIssueClicked}>
          REPORT ISSUE
        </button>
      </div>
    </>
  ), []);

  const sendingInvites = useCallback((matchId: string) => (
    <>
      <FindingMatchmaking
        title={`#GMZLOBBY${matchId}`}
        completedTimeInS={30}
        direction={Direction.Down}
        centerText="Gaimz Bot Sending Invites"
      />
      <div className={styles.centerContainer}>
        <button
          className={styles.resendInvitesButton}
          onClick={() => onResendInvitesClick(matchId)}
        >
          SEND INVITES AGAIN
        </button>
        <button className={styles.reportIssuesButton} onClick={onReportIssueClicked}>
          REPORT ISSUE
        </button>
      </div>
    </>
  ), [onResendInvitesClick]);

  const showStats = useCallback((m: MatchResponse) => {
    const playersRow: { radiant: PlayerInterface, dire: PlayerInterface }[] = [];
    if (m.stats) {
      m.stats.radiant.players.forEach((player, index) => {
        const playerTemp: { radiant: PlayerInterface, dire: PlayerInterface } = {
          radiant: player,
          dire: m.stats!.dire!.players[index]
        };
        playersRow.push(playerTemp);
      });
    }
    return (
      <>
        <div>
          <MatchmakingVersus players={playersRow} />
        </div>
        <div className={styles.centerContainer}>
          <div className={styles.bottomTextMatchName}>
            {`#GMZLOBBY${m.match_id}`}
          </div>
          <button className={styles.reportIssuesButton} onClick={onReportIssueClicked}>
            REPORT ISSUE
          </button>
        </div>
      </>
    );
  }, []);

  const renderRightPanel = useCallback(() => {
    if (!user?.apps.steam) {
      return (
        <div className={styles.centerContainer}>
          <h3 className={styles.steamWarning}>
            Make sure you first connect your steam id before trying to continue!
          </h3>
        </div>
      );
    }

    switch (matchMakingFlow) {
      case MatchmakingFlow.INITIAL_STATE:
        return initialState();
      case MatchmakingFlow.SEARCHING_FOR_MATCHES:
        return searchingMatches(match.match_id!);
      case MatchmakingFlow.MATCH_FOUND_READY:
        return matchFoundReady(match.match_id!);
      case MatchmakingFlow.PREPARING_MATCH_LOBBY:
        return preparingMatchLobby(match.match_id!);
      case MatchmakingFlow.SENDING_INVITES:
        return sendingInvites(match.match_id!);
      case MatchmakingFlow.MATCH_IN_PROGRESS:
      case MatchmakingFlow.MATCH_END:
        return showStats(match);
      default:
        return null;
    }
  }, [match,
    matchMakingFlow,
    user,
    initialState,
    searchingMatches,
    matchFoundReady,
    preparingMatchLobby,
    sendingInvites,
    showStats
  ]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.mainContainer}>
        <div className={styles.topNavBar}>
          <div className={[styles.topNavBarItem, styles.inactive].join(' ')}>
            <Link to="/feed">Discover</Link>
          </div>
          <div className={[styles.topNavBarItem, styles.active].join(' ')}>
            <span>Matchmaking</span>
            <div className={styles.dot} />
          </div>
        </div>
        {renderLeftPanel()}
      </div>
      <RightModal>
        {renderRightPanel()}
      </RightModal>
    </div>
  );
};
export default MatchMaking;
