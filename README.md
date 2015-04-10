# catserver

- gulp build

from src folder: copy css, img, index.html, manifest.webapp to build/
browserify src/js/app.js into build/js/app.js
also copy www data to build/www (? - not sure how data is served yet)

- gulp install

before: gulp build
then run install-to-adb with build/

## Before running

Clone the repository
Run `npm install` on its folder (you need node.js or io.js installed).

gulp build

Then you can install the app using WebIDE or gulp install install-to-adb for example. You need to run this on a phone as the simulator doesn't seem to let you do the cool stuff.

TODO: does the simulator let you open sockets?
