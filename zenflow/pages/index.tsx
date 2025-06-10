import Head from 'next/head';

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-100 to-blue-100">
      <Head>
        <title>ZenFlow 冥想</title>
      </Head>
      <h1 className="text-4xl font-bold">欢迎来到 ZenFlow 冥想平台</h1>
    </div>
  );
}
