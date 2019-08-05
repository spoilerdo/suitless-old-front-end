export const API_URL = (process.env.NODE_ENV == "development" || process.env.NODE_ENV == "testdevelopment" ? 'https://68.183.6.25/api' : 'https://startupseindhoven.com/api');
export const CDN_URL = `${API_URL}/cdn`;
export const MODULE_URL = `${API_URL}/modules`;
export const ACCOUT_URL = `${API_URL}/accounts`;
export const PROFILE_URL = `${API_URL}/profiles`;

export const NOTIFICATION_HANDLER = 'notificationHandler/addNotification';
export const SURVEY_NOTIFICATION_HANDLER = 'progress/setNotification';