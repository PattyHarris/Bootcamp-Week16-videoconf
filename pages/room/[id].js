import Script from "next/script";

export default function Room() {
  return (
    <>
      <Script
        src="https://unpkg.com/peerjs@1.4.5/dist/peerjs.min.js"
        onLoad={() => {
          console.log(Peer);
        }}
      />

      <h1 className="mt-20 text-center text-3xl uppercase font-black">Room</h1>
    </>
  );
}
