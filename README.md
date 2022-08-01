# Video Conference App

In this week's lesson, we're creating a video conference tool like zoom. Our video conferencing app only allows 2 participants. There is no authorization this week nor is there any database.

Setup is as before. Here we only need to install next.js and tailwind to get the app started.

## Add Button to Create New Room

1. When the button is clicked, a client side random ID is generated for that chat room. The user is redirected to that URL.
2. For the random ID, use 'crypto.randomUUID()'. This creates a string such as '1f14a12d-bbcc-4cdc-80f1-cacb85b5161d' - but since Flavio wants a shorter string, we'll only use the part up to the first '-':

```
crypto.randomUUID().split('-')[0]
```
