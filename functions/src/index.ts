import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

const messagingSendToDevice = (payload) => {
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
};

export const fcmSend = functions.database.ref('/public_spend/{spendId}').onCreate((snapshot, context) => {
  const spendInfo = snapshot.val();

  const payload = {
    notification: {
      title: '新規入力💰',
      body: spendInfo.memo + '( ¥' + spendInfo.amount + ') が入力されました',
      clickAction: "https://donn-a0b1c.firebaseapp.com/spend-list?isPublic=true",
      icon: "https://user-images.githubusercontent.com/33277426/45892904-7bbe0f00-be04-11e8-8780-940767b3dddb.png"
    }
  };

  messagingSendToDevice(payload);
});

export const dailyPushLunch = functions.pubsub.topic('daily-push-lunch').onPublish(() => {

  const payload = {
    notification: {
      title: 'リマインダー🐧',
      body: '入力は済ませましたか？午後も頑張りましょう！😃',
      clickAction: "https://donn-a0b1c.firebaseapp.com/spend",
      icon: "https://user-images.githubusercontent.com/33277426/45892904-7bbe0f00-be04-11e8-8780-940767b3dddb.png"
    }
  };

  messagingSendToDevice(payload);
});

export const dailyPushDinner = functions.pubsub.topic('daily-push-dinner').onPublish(() => {

  const payload = {
    notification: {
      title: 'リマインダー🐧',
      body: '入力は済ませましたか？今日も一日お疲れさまでした！🍺',
      clickAction: "https://donn-a0b1c.firebaseapp.com/spend",
      icon: "https://user-images.githubusercontent.com/33277426/45892904-7bbe0f00-be04-11e8-8780-940767b3dddb.png"
    }
  };

  messagingSendToDevice(payload);
});

export const monthlyPushSpend = functions.pubsub.topic('monthly-push-spend').onPublish(() => {

  const payload = {
    notification: {
      title: 'リマインダー🐧',
      body: '今月もお疲れさまでした！一ヶ月の支出をチェックしてみましょう 👀',
      clickAction: "https://donn-a0b1c.firebaseapp.com/spend-list?isPublic=true",
      icon: "https://user-images.githubusercontent.com/33277426/45892904-7bbe0f00-be04-11e8-8780-940767b3dddb.png"
    }
  };

  messagingSendToDevice(payload);
});
