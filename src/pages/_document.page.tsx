import { Html, Head, Main, NextScript } from 'next/document';

import { roboto, publicSans } from '../layout/Fonts';

export default function Document() {
	return (
		<Html lang="pt-BR">
			<Head>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<body className={`${roboto.className} ${publicSans.className}`}>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}