# Video Conference App

In this week's lesson, we're creating a video conference tool like zoom. Our video conferencing app only allows 2 participants. There is no authorization this week nor is there any database.

Setup is as before. Here we only need to install next.js and tailwind to get the app started.

## Add Button to Create New Room

1. When the button is clicked, a client side random ID is generated for that chat room. The user is redirected to that URL.
2. For the random ID, use 'crypto.randomUUID()'. This creates a string such as '1f14a12d-bbcc-4cdc-80f1-cacb85b5161d' - but since Flavio wants a shorter string, we'll only use the part up to the first '-':

```
crypto.randomUUID().split('-')[0]
```

## The Room

1. Create the page for the URL '/room/<id>' (pages/room/[id].js).

## Setup and Initialize Peer.js

1. See Flavio's blog on Peer.js and WebRTC for more information.
2. In 'room/[id].js', we're adding access via the 'script' tag and a bit of JSX to wait for 'onLoad' event - meaning the script has loaded. The next.js 'Script' tag allows for this access.
3. Once the script is loaded, we'll have access to the 'Peer' object - e.g:

```
onLoad={() => {
  console.log(Peer)
}}
```

## Access the Room ID

1. Again, in '/pages/room/[id].js': to access the Room ID, we need to use the router.

```
import { useRouter } from 'next/router'

export default function Room() {
  const router = useRouter()
  const { id } = router.query
  ....
```

2. Add 'getServerSideProps' to indicate to Next.js that this is a server-generated page - this will allow access to the 'router.query' from the last step.

## Handle the First User in the 'Room'

1. The design decision is to use 2 rooms - the first room is our room at 'pages/room/[id].js' - this will be the page for the caller. The second page is for the 'callee' as it were - this page will be at 'pages/room/[id]/join.js'.
2. The code for handling the caller will reside in the '[id].js' code for handling 'onLoad'.
3. Initialize the peer for the caller - where the name is 'room-{id}-first':

```
const peer = new Peer(`room-${id}-first`)
```

4. Initialize a stream (our local webcam stream) using the 'navigator.mediaDevices.getUserMedia' API - this is how browsers can access specific hardware. The object passed to the API specifies that we want both the video and audio:

```
onLoad={async () => {
  const peer = new Peer(`room-${id}-first`)

  const localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  })
}}
```

5. Add video JSX - we apparently don't need audio from our stream. This part of the JSX is needed for iOS Safari: 'playsInline muted'

```
    <div className='flex'>
        <video id='local' autoPlay playsInline muted></video>
    </div>
```

6. Using the DOM, we set the 'video' element above to the local stream - this is added inside the 'Script' tag after setting up the local stream:

```
document.querySelector("video#local").srcObject = localStream;
```

7. At this point, you should be able to see video when you create a chat room. NOTE: when asked if you allow the browser access to your video/audio, if you select 'no', you'll need to clean out your cookies to make it work again.
8. Next we need to add an event listener to listen for calls coming from PeerJS - when we answer, we send our local stream:

```
          peer.on("call", (call) => {
            call.answer(localStream);

            call.on("stream", (remoteStream) => {
              document.querySelector("video#remote").srcObject = remoteStream;
            });
          });

```

9. We listen for an incoming stream which is then the remote stream. Add JSX to handle that video:

```
<video id='remote' autoPlay playsInline></video>
```

## Create the Invite Link for the Second Person

1.  We can't join the chat with the same URL - we'll need another local stream, but no connection to the other participant in the same 'room'.
2.  Add JSX for 'share this link' to 'pages/room/[id].js'. The link is in really huge font so that it can be clicked and shared. This definitely needs improvement.
3.  To handle the 'share this link', add 'pages/room/[id]/join.js' - I think this page was added previously, but with no content...??? Not sure when I did that!

Not much here....

## Handle Person 2 Chat Room Access

1. In 'pages/room/[id]/join.js', add access to the PeerJS script as we did with '[id].js'.
2. Initialize the new peer instance as we did with '[id].js' - here the peer is identified as 'room-${id}-second'. As before, we need to make the page server side generated and return the props via 'getServerSideProps'.
3. Initialize the local stream as we did with '[id].js'.
4. Finally we call the 'room-${id}-first' user using 'peer.call()', receiving the 'call' object back.
5. This doesn't really make sense (yet). To test, you need to separate browser's + cameras.

## ngrok

1. Installed via brew install ngrok/ngrok/ngrok
2. Setup the token which is then stored at /Users/\***\*\*\*\*\*\*\***/Library/Application Support/ngrok/ngrok.yml - example auth token here:

```
ngrok config add-authtoken 2CrdYL4MQcJqZlQJbHa3hKFE5O0_2QXfwLU4E8adteXZpCTxR
```

This is too much trouble for this example. Uninstalled ngrok and moving right along...
Finished.
