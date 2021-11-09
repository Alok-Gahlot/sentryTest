import * as React from 'react';
import {View, Text} from 'react-native';

import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://02a4d9d14dd34ddd86724e12e3812fc5@o1045193.ingest.sentry.io/6055447',
  tracesSampleRate: 1,
  integrations: [
    new Sentry.ReactNativeTracing({
      tracingOrigins: ['localhost', 'my-site-url.com', /^\//],
      // ... other options
    }),
  ],
  enableAutoSessionTracking: true,
  // Sessions close after app is 10 seconds in the background.
  sessionTrackingIntervalMillis: 10000,
});
// Sentry.nativeCrash();
// throw new Error('My first Sentry error!');

function validateShoppingCartOnServer() {
  return 2;
}

function processAndValidateShoppingCart(result) {
  alert(result);
}

const shopCheckout = () => {
  const transaction = Sentry.startTransaction({name: 'shopCheckout'});

  Sentry.getCurrentHub().configureScope(scope => scope.setSpan(transaction));

  const result = validateShoppingCartOnServer();

  const span = transaction.startChild({
    data: {
      result,
    },
    op: 'task',
    description: `processing shopping cart result`,
  });
  try {
    processAndValidateShoppingCart(result);
    span.setStatus('Ok');
  } catch (err) {
    span.setStatus('UnknownError');
    throw err;
  } finally {
    span.finish();
    transaction.finish();
  }
};
function App() {
  return (
    <Sentry.TouchEventBoundary>
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Text onPress={shopCheckout}>Test</Text>
      </View>
    </Sentry.TouchEventBoundary>
  );
}
export default Sentry.wrap(App);
