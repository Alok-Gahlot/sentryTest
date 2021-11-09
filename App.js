import * as React from 'react';
import {View, Text} from 'react-native';

import * as Sentry from '@sentry/react-native';
import Navigation from './route/navigation';

function App() {
  return <Navigation />;
}
export default Sentry.wrap(App);
