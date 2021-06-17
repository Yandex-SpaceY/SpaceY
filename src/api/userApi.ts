import { ROUTE_CONSTANTS } from 'constants/routeConstants';
import { URL_CONSTANTS } from 'constants/urlConstants';
import { api, METHODS, Result } from 'utils';

export const changeProfile = (payload: Record<string, FormDataEntryValue>): Promise<Result> => (
  api(`${URL_CONSTANTS.USER}${ROUTE_CONSTANTS.PROFILE}`, METHODS.POST, JSON.stringify(payload))
);

export const changeProfileAvatar = (payload: FormData): Promise<Result> => (
  api(`${URL_CONSTANTS.USER}${ROUTE_CONSTANTS.AVATAR}`, METHODS.POST, payload, true)
);
