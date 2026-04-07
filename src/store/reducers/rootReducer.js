//rootReducer la noi ket hop cac reducer con lai voi nhau, reudux chi hieu file index.js o action va rootReducer o reducer
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import appReducer from "./appReducer";
import userReducer from "./userReducer";
import adminReducer from "./adminReducer";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};


const userPersistConfig = {
    ...persistCommonConfig,
    key: 'user',
    whitelist: ['isLoggedIn', 'userInfo']
};

const appPersistConfig = {
    ...persistCommonConfig,
    key: 'app',
    whitelist: ['language']//ten bien redux muon luu trong local storage
}

export default (history) => combineReducers({//combineReducers la ham ket hop cac reducer con lai voi nhau
    router: connectRouter(history),
    user: persistReducer(userPersistConfig, userReducer),//key: data (cua reducer)
    app: persistReducer(appPersistConfig, appReducer), //        language: state.app === key === appReducer.language,
    admin: adminReducer,
})