export const UPDATE_APP_LIST = 'UPDATE_APP_LIST';
export const UPDATE_DEPENDENCY_LIST = 'UPDATE_DEPENDENCY_LIST';

export function doUpdateAppList(appList) {
    return {
        type: UPDATE_APP_LIST,
        appList: appList
    };
}

export function doUpdateDependencyList(dependencyList) {
    return {
       type: UPDATE_DEPENDENCY_LIST,
       dependencyList: dependencyList
    };
}