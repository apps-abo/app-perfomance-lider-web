import { Roboto, Public_Sans } from 'next/font/google';

const roboto = Roboto({
	weight: ['400', '700'],
	subsets: ['latin'],
	fallback: ['Roboto']
});

const publicSans = Public_Sans({
	weight: ['400', '700'],
	subsets: ['latin'],
	fallback: ['Public Sans'],
});

export { roboto, publicSans };
