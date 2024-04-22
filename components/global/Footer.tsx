import { Container } from 'components/shared/Container'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import { PortableTextBlock } from 'sanity'

export function Footer({
  footer,
  siteName,
}: {
  footer: PortableTextBlock[]
  siteName: string
}) {
  return (
    <footer className="bottom-0 w-full py-6 md:py-10 bg-slate-900 border-t border-slate-800">
      <Container className="flex gap-2">
        <div className="max-w-prose flex flex-col">
          <h4>{siteName}</h4>
          {footer && <CustomPortableText value={footer} />}
        </div>
      </Container>
    </footer>
  )
}
