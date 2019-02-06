import Vue from 'vue';
import Vuex from 'vuex';
// import axios from 'axios';
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
      state.stats = deviceId;
    },
    setSignedIn(state, isSignedIn) {
      // eslint-disable-next-line
      state.signedIn = isSignedIn;
    },
  },
  actions: {
    setDeviceId({ commit }, deviceId) {
      commit('setDevice', deviceId);
    },
    signedIn({ commit }) {
      commit('setSignedIn', true);
    },
    getStats({ commit }) {
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
              ':deviceId': 'device1',
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
  },
});
