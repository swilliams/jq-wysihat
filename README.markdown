JQ-WysiHat
=======

#### A WYSIWYG JavaScript framework

JQ-WysiHat is a WYSIWYG JavaScript framework that provides an extensible
foundation to design your own rich text editor. WysiHat stays out of your
way and leaves the UI design to you.

The original version of WysiHat was designed to run on Prototype. This fork of it was ported to run on jQuery (used against 1.6.4).

### Support platforms

JQ-WysiHat currently supports:

* Microsoft Internet Explorer for Windows, version 7.0
* Mozilla Firefox 3.0
* Apple Safari 4.0
* Google Chrome 4.0

### Dependencies

* jQuery 1.6.4 or later (http://jquery.com/) although older versions will probably work fine, they just haven't been tested.

## Documentation

Code is documented inline with PDoc (http://pdoc.org/).

### Examples

Several examples can be found under `examples/` to get you started.

The easiest way is to simply call:

    $('#myTextArea').wysihat();

This adds some commonly used buttons to the toolbar and gets you going.

### Building from source

You can build the latest version of JQ-WysiHat from source by running
`rake` the root directory. The generated file will be saved to
`dist/jq-wysihat.js`. Ruby and the Rake gem are only required to build
the project from source. It is not required to run the code.

## Contributing

Check out the original WysiHat source with

    $ git clone git://github.com/37signals/wysihat.git

And the fork with

    $ git clone git://github.com/nhowell/jq-wysihat.git

Then

    $ cd jq-wysihat
    $ git submodule init
    $ git submodule update

GitHub pull requests are welcome.

## License

JQ-WysiHat is released under the MIT license.
