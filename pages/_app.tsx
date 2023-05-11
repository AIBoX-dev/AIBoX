// 1. import `NextUIProvider` component
import { NextUIProvider } from '@nextui-org/react';
import { appWithTranslation } from 'next-i18next'

function MyApp({ Component, pageProps }: any) {
  return (
    // 2. Use at the root of your app
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default appWithTranslation(MyApp);
