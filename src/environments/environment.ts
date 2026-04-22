// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import * as config from '../../appsettings.json';

const { domain, clientId, authorizationParams: { audience, redirect_uri }, apiUrl, appUrl, errorPath } = config as {
  domain: string;
  clientId: string;
  authorizationParams: {
    audience: string;
    redirect_uri: string
  },
  apiUrl: string;
  appUrl: string;
  errorPath: string;
};

export const environment = {
  production: false,
  apiUrl: apiUrl,
  auth: {
    domain,
    clientId,
    authorizationParams: {
      audience: audience,
      redirect_uri: redirect_uri,
    },
    errorPath,
  },
  httpInterceptor: {
    allowedList: [`${apiUrl}/*`],
  },
};
