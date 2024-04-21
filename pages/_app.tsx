import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import 'styles/index.css'

import { AppProps } from 'next/app'
import { Albert_Sans } from 'next/font/google'
import localFont from 'next/font/local'
import { lazy } from 'react'
import { SharedPageProps } from 'types'

const PreviewProvider = lazy(() => import('components/preview/PreviewProvider'))
const SanityVisualEditing = lazy(
  () => import('components/preview/SanityVisualEditing'),
)

const headingFont = Albert_Sans({ subsets: ['latin'], variable: '--font-sans' })
const contentFont = localFont({
  src: '../public/fonts/InterVariable.woff2',
  variable: '--font-serif',
})

export default function App({
  Component,
  pageProps,
}: AppProps<SharedPageProps>) {
  const { draftMode, token } = pageProps
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-sans: ${headingFont.style.fontFamily};
            --font-serif: ${contentFont.style.fontFamily};
          }
        `}
      </style>

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
    </>
  )
}
