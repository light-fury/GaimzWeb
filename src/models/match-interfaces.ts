export interface PlayerInterface {
  player_status: string;
  won?: boolean;
  user_id: string;
  hero_name?: string;
  hero_avatar_url?: string;
  kills?: number;
  deaths?: number;
  assists?: number;
  items?: string[];
  gpm?: number;
  lasthits?: number;
  user_avatar_url?: string;
  denies?: number;
}

export interface Stats {
  teams: Side[];
  dire: Side;
  radiant: Side;
  teamWon?: number;
  duration: number;
}

export interface Side {
  players: PlayerInterface[];
  name: string;
  id: number;
}
export interface PlayerDto {
  user_id: string;
  player_status: string;
}
export interface MatchResponse {
  match_id?: string;
  game_id?: string;
  start_time?: string;
  end_time?: string;
  bet?: number;
  game_mode?: string;
  game_type?: string;
  match_status?: string;
  players?: PlayerDto[];
  stats?: Stats;
}

export interface MatchRequestDTO {
  game_id: string;
  bet: 0;
  game_mode: string;
  game_type: string;
  restriction: string;
  password: string;
}


export interface GameTypeAndMode {
  type: string;
  gameModes: string[];
  nrOfPlayers: number;
}

export interface Game {
  game_id: string;
  game_name: string;
  game_picture_url: string;
  game_types: Array<GameTypeAndMode>;
  success: boolean;
}

export enum MatchStatus {
  MatchRequested = 'match_requested',
  PlayersFound = 'players_found',
  MatchAccepted = 'match_accepted',
  MatchCancelled = 'match_cancelled',
  InvitesSent = 'invites_sent',
  MatchStarted = 'match_started',
  MatchEnded = 'match_ended'
}
export interface MatchResult {
  match_id: string;
  match_status: MatchStatus;
  game_id: string;
  bet: number;
  started: Date;
  ended: Date;
  lobby_name: string;
  external_match_id: string;
  stats: Stats;
}

export enum PlayerStatus{
  MatchRequested = 'match_requested',
  MatchAccepted = 'match_accepted',
  MatchCancelled = 'match_cancelled',
}
