export const UPDATE_APP_LIST = 'UPDATE_APP_LIST';

export function doUpdateAppList(appList) {
    return {
        type: UPDATE_APP_LIST,
        appList: appList
    };
}