import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import 'styles/index.css'

import { AppProps } from 'next/app'
import { lazy } from 'react'
import { SharedPageProps } from 'types'

import localFont from 'next/font/local'

const font = localFont({
  src: '../public/fonts/InterVariable.woff2',
})

const PreviewProvider = lazy(() => import('components/preview/PreviewProvider'))
const SanityVisualEditing = lazy(
  () => import('components/preview/SanityVisualEditing'),
)

export default function App({
  Component,
  pageProps,
}: AppProps<SharedPageProps>) {
  const { draftMode, token } = pageProps
  return (
    <div className={font.className}>
      {draftMode ? (
        <PreviewProvider token={token}>
          <Component {...pageProps} />
        </PreviewProvider>
      ) : (
        <Component {...pageProps} />
      )}

      {process.env.NEXT_PUBLIC_SANITY_VISUAL_EDITING === 'true' ? (
        <SanityVisualEditing />
      ) : null}
    </div>
  )
}
