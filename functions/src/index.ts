import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

const fcm = {
  /**
   * getNotificationKey
   * notification_keyを保持
   * @returns notificationKey
   */
  getNotificationKey() {
    console.log('getNotificationKey() start');
    const request = require('request');

    const options = {
      url: 'https://iid.googleapis.com/notification?notification_key_name=donn',
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '', // key=<クラウドメッセージングのサーバーキー>
        'project_id': '' // <messagingSenderId>
      },
      json: true
    };

    return new Promise(function (resolve, reject) {
      request(options, function (error, res, body) {
        if (!error && res.statusCode == 200) {
          resolve(body);
        } else {
          reject(error);
        }
      });
    });
  },

  /**
   * removeExistingTokenFromGroup
   * FCMグループから既存のトークンを消す
   * @param {string} existingToken 既存のトークン
   * @param {string} notificationKey notificationキー
   */
  removeExistingToken(existingToken, notificationKey) {
    console.log('removeExistingTokenFromGroup() start');

    const request = require('request');

    const requestOptions = {
      url: 'https://iid.googleapis.com/notification/',
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '', // key=<クラウドメッセージングのサーバーキー>
        'project_id': '' // <messagingSenderId>
      },
      body: JSON.stringify({
        "operation": "remove",
        "notification_key_name": "donn",
        "notification_key": notificationKey,
        "registration_ids": [ existingToken ]
      })
    };

    return new Promise(function (resolve, reject) {
      request(requestOptions, function (error, res, body) {
        console.log('removeExistingToken-err : ' + error);
        console.log('removeExistingToken-res : ' + res);
        console.log('removeExistingToken-body : ' + body);

        if (!error && res.statusCode == 200) {
          resolve(body);
        } else {
          reject(error);
        }
      });
    });
  },
  addNewToken(newToken, notificationKey) {
    console.log('addNewToken() start');

    const request = require('request');

    const requestOptions = {
      url: 'https://iid.googleapis.com/notification/',
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '', // key=<クラウドメッセージングのサーバーキー>
        'project_id': '' // <messagingSenderId>
      },
      body: JSON.stringify({
        "operation": "create",
        "notification_key_name": "donn",
        "notification_key": notificationKey,
        "registration_ids": [ newToken ]
      })
    };

    return new Promise(function (resolve, reject) {
      request(requestOptions, function (error, res, body) {
        console.log('addNewToken-err : ' + error);
        console.log('addNewToken-res : ' + res);
        console.log('addNewToken-body : ' + body);

        if (!error && res.statusCode == 200) {
          resolve(body);
        } else {
          reject(error);
        }
      });
    });
  },
  async fcmUpdateGroup(existingToken, newToken) {
    console.log('old:' + existingToken);
    console.log('new' + newToken);

    //「notification_key」を保持
    const notificationKey = await fcm.getNotificationKey();

    // FCMグループに新しいトークンを登録
    await fcm.addNewToken(newToken, notificationKey['notification_key']);

    // FCMグループから既存のトークンを消す
    await fcm.removeExistingToken(existingToken, notificationKey['notification_key']);
  }
}

export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

export const fcmSend = functions.database.ref('/public_spend/{spendId}').onCreate((snapshot, context) => {
  const spendInfo = snapshot.val();
  const userId = context.params.userId;

  const payload = {
    notification: {
      title: 'Donn! 新規入力💰',
      body: spendInfo.memo + '( ¥' + spendInfo.amount + ') が入力されました',
      icon: "https://user-images.githubusercontent.com/33277426/45892904-7bbe0f00-be04-11e8-8780-940767b3dddb.png"
    }
  };

  admin.database()
    .ref('/fcmTokens/')
    .once('value')
    .then(token => {
      const tokenList = (token.val()) || '';

      Object.keys(tokenList).map(function(key, index) {
        console.log(tokenList[key]);
        admin.messaging().sendToDevice(tokenList[key], payload)
          .then(res => {
            console.log("Sent Successfully", res);
          })
          .catch(err => {
            console.log(err);
          });
      });
    })
    .catch(err => {
      console.log(err);
    });

  // グループ通知
  // admin.database()
  //   .ref(`/fcmTokens/${userId}`)
  //   .once('value')
  //   .then(token => token.val() )
  //   .then(userFcmToken => {
  //     console.log('userFcmToken: '+ userFcmToken);
  //     // 個別通知: sendToDevice(userFcmToken, payload)

  //     // グループ通知
  //     return admin.messaging().sendToDeviceGroup('APA91bF05ThCHjjT9DPpTwExJvkb8VU-867_EjTh0RV5VaTXaQ-Al0esqKh7WiDh7M4899u1s6OFbmFK7Guwmc5dZaMbMgB-Icy1SyoIWELBhQ194B7fj04', payload);
  //   })
  //   .then(res => {
  //     console.log("Sent Successfully", res);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
});

export const updateGroup = functions.database.ref('/fcmTokens/{uid}').onUpdate((change, context) => {
  // 既存のトークンを保持
  const existingToken = change.before.val();
  const newToken = change.after.val();
  console.log(context);

  fcm.fcmUpdateGroup(existingToken, newToken)
    .then( () => console.log('succeed update group.') )
    .catch( (err) => console.log('updateGroup-err: ' + err) );
});
