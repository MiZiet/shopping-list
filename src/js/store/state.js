export default function () {
  let localState = JSON.parse(window.localStorage.getItem('state'));
  if (localState !== null && localState !== undefined && localState !== 'undefined') {
    return localState;
  } else {
    return {
      items: [],
    };
  }
}
