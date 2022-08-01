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
