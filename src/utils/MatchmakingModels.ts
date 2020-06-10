export interface PlayerInterface {
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
  player_status: string;
  won?: boolean;
}

export interface Stats {
  teams: Side[];
  dire: Side;
  radiant: Side;
  teamWon?: number;
}

export interface Side {
  players: PlayerInterface[];
  name: string;
  id: number;
}

export interface MatchResponse {
  match_id: string;
  game_id: string;
  start_time: string;
  end_time: string;
  bet: number;
  game_mode: string;
  match_status: string;
  lobby_name: string;
  game: string;
}
