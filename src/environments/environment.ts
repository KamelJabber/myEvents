// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyA9LS9uRzyuY7dOyQHNJw8Ew1JH_dgjYB4',
    authDomain: 'myevents-262fc.firebaseapp.com',
    databaseURL: 'https://myevents-262fc.firebaseio.com',
    projectId: 'myevents-262fc',
    storageBucket: 'myevents-262fc.appspot.com',
    messagingSenderId: '460162432044'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
