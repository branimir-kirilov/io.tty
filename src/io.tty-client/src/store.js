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
  },
  mutations: {
    getData(state, data) {
      // eslint-disable-next-line
      console.log('state', state);
      console.log('data', data);
      state.stats = data.Items;
    },
  },
  actions: {
    getStats({ commit }) {
      debugger;
      Auth.currentCredentials()
        .then((credentials) => {
          console.log('credentials', credentials);

          const db = new DynamoDB.DocumentClient({
            credentials: Auth.essentialCredentials(credentials),
            region: 'us-east-1',
          });

          const dbRes = db.query({
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
              commit('getData', data);
            }
          });
        });
    },
  },
});
