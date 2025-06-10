import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import ReactPlayer from 'react-player';

export default function MeditationPage({ meditation }) {
  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <Head><title>{meditation.title} - ZenFlow</title></Head>
      <h1 className="text-3xl font-bold mb-4">{meditation.title}</h1>
      <ReactPlayer url={meditation.audioUrl} controls width="100%" />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/meditations');
  const data = await res.json();
  const paths = data.map((m: any) => ({ params: { slug: m.slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = ctx.params?.slug as string;
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/meditations');
  const data = await res.json();
  const meditation = data.find((m: any) => m.slug === slug);
  return { props: { meditation } };
};
