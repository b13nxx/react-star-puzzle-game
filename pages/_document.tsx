import Document, {
  Head, Html, Main, NextScript
} from 'next/document'

export default class MyDocument extends Document {
  font: string =
    'https://fonts.googleapis.com/css2?family=Open+Sans&display=swap'

  render (): JSX.Element {
    return (
      <Html>
        <Head>
          <link
            href={ this.font }
            rel='stylesheet' />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
