import sanityClient from '@sanity/client';
// import { ImageUrlBuilder } from 'next-sanity-image'; // isn't supported anymore
import imageUrlBuilder from '@sanity/image-url'

export const client = sanityClient({
    projectId: 'hubymbj6',
    dataset: 'production',
    apiVersion: '2023-05-03',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);