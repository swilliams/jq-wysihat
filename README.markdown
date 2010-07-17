WysiHat
=======

#### A WYSIWYG JavaScript framework

JQ-WysiHat is a WYSIWYG JavaScript framework that provides an extensible
foundation to design your own rich text editor. WysiHat stays out of your
way and leaves the UI design to you.

The original version of WysiHat was designed to run on Prototype. This fork of it was ported to run on jQuery (used against 1.4.2).

### Support platforms

WysiHat currently supports:

* Microsoft Internet Explorer for Windows, version 7.0
* Mozilla Firefox 3.0
* Apple Safari 4.0
* Google Chrome 4.0

### Dependencies

* jQuery 1.4.2 or later (http://jquery.com/) although older versions will probably work fine, they just haven't been tested.

## Documentation

Code is documented inline with PDoc (http://pdoc.org/).

The generated HTML documentation can be found on the `gh-pages` branch or viewed online at (http://josh.github.com/wysihat/).

### Examples

Several examples can be found under `examples/` to get you started.

The easiest way is to simply call:

    $('#myTextArea').wysihat();

This adds some commonly used buttons to the toolbar and gets you going.

### Downloading

Once I get closer to a 'stable' version I'll tag a release and add it here.

### Building from source

You can build the latest version of WysiHat from source by running
`rake` the root directory. The generated file will be saved to
`dist/wysihat.js`. Ruby and the Rake gem are only required to build
the project from source. It is not required to run the code.

## Contributing

Check out the original WysiHat source with

    $ git clone git://github.com/josh/wysihat.git

And the fork with

    $ git clone git://github.com/swilliams/wysihat.git

Then

    $ cd wysihat
    $ git submodule init
    $ git submodule update

GitHub pull requests are welcome.

## License

WysiHat is released under the MIT license.
