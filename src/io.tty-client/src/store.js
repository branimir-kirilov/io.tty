import Vue from 'vue';
import Vuex from 'vuex';
import DynamoDB from 'aws-sdk/clients/dynamodb';
import { Auth } from 'aws-amplify';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    stats: null,
    deviceId: null,
    signedIn: null,
  },
  mutations: {
    getData(state, data) {
      // eslint-disable-next-line
      state.stats = data.Items;
    },
    setDevice(state, deviceId) {
      // eslint-disable-next-line
      state.deviceId = deviceId;
    },
    setSignedIn(state, isSignedIn) {
      // eslint-disable-next-line
      state.signedIn = isSignedIn;
    },
    removeStatsFromStore(state) {
      // eslint-disable-next-line
      state.stats = null;
    },
    setSignedOut(state) {
      // eslint-disable-next-line
      state.signedIn = null;
    },
    removeDevice(state) {
      // eslint-disable-next-line
      state.deviceId = null;
    },
  },
  actions: {
    getDeviceIdFromLocalStorage({ commit, dispatch }) {
      const deviceIdLocalStorage = JSON.parse(localStorage.getItem('deviceId'));
      const deviceId = deviceIdLocalStorage && deviceIdLocalStorage.deviceId;

      if (deviceId) {
        commit('setDevice', deviceId);
      }

      dispatch('getStats');
    },
    removeDeviceId({ commit }) {
      commit('removeDevice');
      localStorage.setItem('deviceId', null);
    },
    setDeviceId({ commit, dispatch }, deviceId) {
      localStorage.setItem('deviceId', JSON.stringify({ deviceId }));
      commit('setDevice', deviceId);
      dispatch('getStats');
    },
    signedIn({ commit }) {
      commit('setSignedIn', true);
    },
    getStats({ commit }) {
      const { deviceId } = this.state;

      if (!deviceId) {
        return;
      }

      Auth.currentCredentials()
        .then((credentials) => {
          console.log('credentials', credentials);

          const db = new DynamoDB.DocumentClient({
            credentials: Auth.essentialCredentials(credentials),
            region: 'us-east-1',
          });

          db.query({
            TableName: 'RoomMonitorTable',
            KeyConditionExpression: 'DeviceId = :deviceId and #timestamp between :v2 and :v3',
            ExpressionAttributeNames: { '#timestamp': 'timestamp' },
            ExpressionAttributeValues: {
              ':deviceId': deviceId,
              ':v2': '1234',
              ':v3': '3234',
            },
          },
          (err, data) => {
            if (err) {
              console.log(err);
            } else {
              console.log('success - got data');
              commit('getData', data);
            }
          });
        });
    },
    signOut({ commit }) {
      commit('setSignedOut');
    },
    removeStats({ commit }) {
      commit('removeStatsFromStore');
    },
  },
});
