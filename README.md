imageresampler.js
==============

JS (Emscripten) version of imageresampler by Rich Geldreich, published on https://code.google.com/p/imageresampler/.

It provides a class to resample images with many types of filters (such as Cautmull-Rom and Lanczos4), in order to get better resampling quality.

It is public domain like the original code (unlicense.org).

dist contains compiled js using emscripten, and also minified js using the closure-compiler.

In order to compile it yourself, you must have the following installed and in your PATH:
* emscripten
* closure-compiler
* p7zip-full

