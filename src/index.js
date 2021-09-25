import React from 'react';
import ReactDOM from 'react-dom';

import { firebase, FieldValue, FieldPath } from './utils/firebase';
import FirebaseContext from './contexts/firebaseContext';
import App from './App';

ReactDOM.render(
  <FirebaseContext.Provider value={{ firebase, FieldValue, FieldPath }}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);
