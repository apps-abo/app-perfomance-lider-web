/* eslint-disable react/no-unescaped-entities */
import { FC } from 'react';

import Head from 'next/head';

interface IProps {
	title: string;
	description?: string;
}

const Seo: FC<IProps> = ({ title, description }) => {
	return (
		<Head>
			<style>
				@import url('https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;700&display=swap');
			</style>
			<title>{title}</title>
			{description && <meta name="description" content={description} />}
			<link rel="icon" type="image/png" sizes="32x18" href="/favicon.ico" />
			<style>
				@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
			</style>
		</Head>
	);
};
export default Seo;
