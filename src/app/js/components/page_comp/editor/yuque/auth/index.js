import { yuQueAuthUrl } from "../../../../../config";

let authWindowRef = null;

const YuQueAuth = () => {
  return new Promise((resolve, reject) => {
    const receiveMessage = (event) => {
      try {
        const authResult = JSON.parse(event.data);
        if (authResult.login) {
          resolve(authResult);
        } else {
          reject(false);
        }
      } catch (e) {
        console.log('OTHER MESSAGE.')
      }
    }
    window.removeEventListener('message', receiveMessage);
    if (authWindowRef === null || authWindowRef.closed) {
      const authWindowFeat =
        'toolbar=no, menubar=no, width=500, height=700, top=0, left=0';
      authWindowRef = window.open(
        yuQueAuthUrl,
        'YuQue Auth Window',
        authWindowFeat
      )
    } else {
      authWindowRef.focus();
    }
    window.addEventListener('message', receiveMessage, false);
  })
}

export {
  YuQueAuth
}