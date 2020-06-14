export enum SocialPlatform {
  Twitch,
  Steam,
  Facebook,
  Google
}

declare const window: Window;

export const settings = { ourUrl: 'http://localhost:3000' };
if (process.env.NODE_ENV === 'production') {
  settings.ourUrl = 'https://gaimz.com';
}

const steamSigninUrl = `https://steamcommunity.com/openid/login?openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.mode=checkid_setup&openid.ns=http://specs.openid.net/auth/2.0&openid.realm=${settings.ourUrl}/&openid.return_to=${settings.ourUrl}/oauth/steam`;

const twitchSigninUrl = `https://id.twitch.tv/oauth2/authorize?client_id=z6yyt2tbn36fxromr8j4hbo626a329&redirect_uri=${settings.ourUrl}/oauth/twitch&response_type=code&scope=user_subscriptions+user_read`;

export function connectWithSocial(platform: SocialPlatform) {
  switch (platform) {
    case SocialPlatform.Twitch:
      window.location.assign(twitchSigninUrl);
      break;
    case SocialPlatform.Steam:
      window.location.assign(steamSigninUrl);
      break;
    default:
      throw new Error(`${platform} is currently not supported yet.`);
  }
}
