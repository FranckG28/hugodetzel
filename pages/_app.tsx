import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import 'styles/index.css'

import { AppProps } from 'next/app'
import localFont from 'next/font/local'
import { lazy } from 'react'
import { SharedPageProps } from 'types'

import { cn } from '@/lib/utils'

const font = localFont({
  src: '../public/fonts/InterVariable.woff2',
  variable: '--font-inter',
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
    <>
      <style jsx global>
        {`
          :root {
            --font-inter: ${font.variable};
          }
        `}
      </style>

      <main className={cn(font.className)}>
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
      </main>
    </>
  )
}
