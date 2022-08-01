import Head from "next/head";
import Router from "next/router";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Video Conference</title>
        <meta name="description" content="Video Conference" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="mt-20 text-center text-3xl uppercase font-black">
        Video Conference
      </h1>

      <button
        className="block mx-auto  bg-black text-white p-3 rounded-2xl mt-20 text-2xl"
        onClick={() => {
          Router.push(`/room/${crypto.randomUUID().split("-")[0]}`);
        }}
      >
        Create a new chat room
      </button>
    </div>
  );
}
