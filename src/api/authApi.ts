import { ROUTE_CONSTANTS } from 'constants/routeConstants';
import { URL_CONSTANTS } from 'constants/urlConstants';
import { api, METHODS, Result } from 'utils';

export const signup = (payload: Record<string, FormDataEntryValue>): Promise<Result> => (
  api(`${URL_CONSTANTS.AUTH}${ROUTE_CONSTANTS.SIGNUP}`, METHODS.POST, JSON.stringify(payload))
);

export const signin = (payload: Record<string, FormDataEntryValue>): Promise<Result> => (
  api(`${URL_CONSTANTS.AUTH}${ROUTE_CONSTANTS.SIGNIN}`, METHODS.POST, JSON.stringify(payload))
);

export const getUserInfo = (): Promise<Result> => api(`${URL_CONSTANTS.AUTH}${ROUTE_CONSTANTS.USER}`);

export const logout = (): Promise<Result> => api(`${URL_CONSTANTS.AUTH}${ROUTE_CONSTANTS.LOGOUT}`, METHODS.POST);
