import { MatchResult } from 'src/features/matches';
import { Streamer, Feed, ForYouFeed } from 'src/features/feed';

export const streamerData: Streamer[] = [
  {
    id: 'e1',
    name: 'BrendenLive',
    icon: 'https://randomuser.me/api/portraits/men/1.jpg',
    following: true,
    subscribed: true,
    online: true,
  },
  {
    id: 'e2',
    name: 'DaisyTTV',
    icon: 'https://randomuser.me/api/portraits/women/44.jpg',
    following: true,
    subscribed: false,
    online: true,
  },
  {
    id: 'e3',
    name: 'JamesLion',
    icon: 'https://randomuser.me/api/portraits/men/3.jpg',
    following: false,
    subscribed: true,
    online: false,
  },
  {
    id: 'e4',
    name: 'BrandenDunn',
    icon: 'https://randomuser.me/api/portraits/men/4.jpg',
    following: true,
    subscribed: true,
    online: true,
  },
  {
    id: 'e5',
    name: 'SnailSong',
    icon: 'https://randomuser.me/api/portraits/women/45.jpg',
    following: true,
    subscribed: false,
    online: true,
  },
  {
    id: 'e6',
    name: 'GaryJam',
    icon: 'https://randomuser.me/api/portraits/men/8.jpg',
    following: true,
    subscribed: true,
    online: true,
  },
  {
    id: 'e7',
    name: 'sharepickaxe',
    icon: 'https://randomuser.me/api/portraits/men/18.jpg',
    following: true,
    subscribed: false,
    online: true,
  },
  {
    id: 'e8',
    name: 'Redselect',
    icon: 'https://randomuser.me/api/portraits/men/10.jpg',
    following: false,
    subscribed: true,
    online: false,
  },
  {
    id: 'e9',
    name: 'BaileyB',
    icon: 'https://randomuser.me/api/portraits/women/6.jpg',
    following: true,
    subscribed: true,
    online: true,
  },
  {
    id: 'e10',
    name: 'WingTiffey',
    icon: 'https://randomuser.me/api/portraits/women/8.jpg',
    following: true,
    subscribed: false,
    online: true,
  },
];

export const feedData: Feed[] = [
  {
    user: streamerData[0],
    id: 'c1',
    title: 'Hardcore Domination',
    subTitle: 'Call of Duty: Modern Warfare',
    sourceImg: 'https://i.ytimg.com/vi/Tzs8nN_g7VY/maxresdefault.jpg',
    viewerCount: '4.8k',
    isLive: true,
  },
  {
    user: streamerData[1],
    id: 'c2',
    title: 'Playing some aram alone :)',
    subTitle: 'League of Legends',
    sourceImg: 'https://i.ytimg.com/vi/1op2xg5YhV8/maxresdefault.jpg',
    viewerCount: '1.2k',
    isLive: true,
  },
  {
    user: streamerData[8],
    id: 'c3',
    title: 'Please no basement time',
    subTitle: 'Dead By Daylight',
    sourceImg: 'https://i.ytimg.com/vi/RHQ1nBdZqhw/maxresdefault.jpg',
    viewerCount: '15.4k',
    isLive: true,
  },
  {
    user: streamerData[3],
    id: 'c4',
    title: 'Please nerf Jager',
    subTitle: "Tom Clancy's Rainbow Six Siege",
    sourceImg:
      'https://i.pinimg.com/originals/eb/98/b1/eb98b1f5170bd0ef1d6438072fd2e400.jpg',
    viewerCount: '3.5k',
    isLive: true,
  },
  {
    user: streamerData[6],
    id: 'c5',
    title: 'Looking for some diamonds!',
    subTitle: 'Minecraft',
    sourceImg:
      'https://www.thegamesstorebh.com/wp-content/uploads/2018/12/Minecraft-gameplay-image-6.jpg',
    viewerCount: '0.9k',
    isLive: true,
  },
];

// new dummyData for ForYouData:
export const forYouFeedData: ForYouFeed[] = [
  {
    user: streamerData[0],
    id: 'c1',
    title: 'Hardcore Domination',
    subTitle: 'Call of Duty: Modern Warfare',
    sourceImg: 'https://i.ytimg.com/vi/Tzs8nN_g7VY/maxresdefault.jpg',
    viewerCount: '4.8k',
    isLive: true,
  },
  {
    user: streamerData[1],
    id: 'c2',
    title: 'Playing some aram alone :)',
    subTitle: 'League of Legends',
    sourceImg: 'https://i.ytimg.com/vi/1op2xg5YhV8/maxresdefault.jpg',
    viewerCount: '1.2k',
    isLive: true,
  },
  {
    user: streamerData[8],
    id: 'c3',
    title: 'Please no basement time',
    subTitle: 'Dead By Daylight',
    sourceImg: 'https://i.ytimg.com/vi/RHQ1nBdZqhw/maxresdefault.jpg',
    viewerCount: '15.4k',
    isLive: true,
  },
  {
    user: streamerData[3],
    id: 'c4',
    title: 'Please nerf Jager',
    subTitle: "Tom Clancy's Rainbow Six Siege",
    sourceImg:
      'https://i.pinimg.com/originals/eb/98/b1/eb98b1f5170bd0ef1d6438072fd2e400.jpg',
    viewerCount: '3.5k',
    isLive: true,
  },
  {
    user: streamerData[6],
    id: 'c5',
    title: 'Looking for some diamonds!',
    subTitle: 'Minecraft',
    sourceImg:
      'https://www.thegamesstorebh.com/wp-content/uploads/2018/12/Minecraft-gameplay-image-6.jpg',
    viewerCount: '0.9k',
    isLive: true,
  },
];

export const recentMatchesData: MatchResult[] = [
  {
    match_id: '1',
    hero_avatar_url:
      'https://elasticbeanstalk-us-east-2-265842567910.s3.us-east-2.amazonaws.com/images/heroes/pudge_lg.png',
    won: true,
    duration: 300,
    deaths: 5,
    kills: 10,
    assists: 15,
    gpm: 350,
    type: 'Gaimz Match',
    user_id: '12345',
    hero_name: 'Pudge',
    items: [],
    lasthits: 150,
  },
  {
    match_id: '2',
    hero_avatar_url:
      'https://elasticbeanstalk-us-east-2-265842567910.s3.us-east-2.amazonaws.com/images/heroes/lion_lg.png',
    won: true,
    duration: 310,
    deaths: 5,
    kills: 50,
    assists: 15,
    gpm: 3500,
    type: 'Gaimz Match',
    user_id: '12345',
    hero_name: 'Lion',
    items: [],
    lasthits: 97,
  },
  {
    match_id: '3',
    hero_avatar_url:
      'https://elasticbeanstalk-us-east-2-265842567910.s3.us-east-2.amazonaws.com/images/heroes/lina_lg.png',
    won: false,
    duration: 3016,
    deaths: 25,
    kills: 10,
    assists: 15,
    gpm: 50,
    type: 'Gaimz Match',
    user_id: '12345',
    hero_name: 'Lina',
    items: [],
    lasthits: 150,
  },
];
