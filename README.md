# catserver

> Cute cat animated GIFs. STRAIGHT TO YOUR BROWSER.

![catserver icon](./src/img/icons/256.png)

AKA: An NFC-enabled front-end run web server that runs on Firefox OS devices, entirely JavaScript powered.

[Video demo](https://www.youtube.com/watch?v=uAThqeOi0yw)

## How to get and run it

Clone the repository.

Run `npm install` on its folder (you need node.js or io.js installed).

Then `npm run build`

Then you can install the app using WebIDE or `install-to-adb` for example. You need to run this on a phone as the simulator doesn't seem to let you do the cool stuff (Web NFC, TCP sockets).

**NOTE THAT YOU NEED A ROOTED PHONE** to install certified apps like this one.

I do all with just one line:

```bash
npm run build; install-to-adb build/ --launch
```

as I have [install-to-adb](https://github.com/sole/install-to-adb) installed globally (`npm install -g install-to-adb`) because I wrote that tool and I trust myself.

<!--
Actually, TODO: does the simulator let you open sockets?
-->

Once the app is built and deployed to a device you will get the IP address of the device on screen. If the device has NFC disabled you should get a message on the screen. Otherwise if you touch another NFC-enabled device, the first device (the *server*) will send its URL to the second device, and it generally will open a browser and you will get CATS!

## Compatibility

The APIs in use for NFC peer discovery will work in Firefox OS version 2.2 and above. Below that it'll look like it works, and even seem like it should, but the device doesn't have the peer discovery parts.

## Credits

Thanks to [Guillaume](http://github.com/gmarty) for the happy cheerful icon!
