import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en-US', 'ja-JP', 'zh-CN'],
  defaultLocale: 'ja-JP'
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};