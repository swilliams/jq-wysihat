(function() {
  function onReadyStateComplete(document, callback) {

    function checkReadyState() {
      if (document.readyState === 'complete') {
        // TODO: the prototype code checked to see if the event exists before removing it.
        $(document).unbind('readystatechange', checkReadyState);
        callback();
        return true;
      } else {
        return false;
      }
    }

    $(document).bind('readystatechange', checkReadyState);
    checkReadyState();
  }

  function observeFrameContentLoaded(element) {
    element = $(element);
    var bare = element.get(0);

    var loaded, contentLoadedHandler;

    loaded = false;
    function fireFrameLoaded() {
      if (loaded) { return };

      loaded = true;
      if (contentLoadedHandler) { contentLoadedHandler.stop(); }
      element.trigger('frame:loaded');
    }

    if (window.addEventListener) {
      contentLoadedHandler = $(document).bind("DOMFrameContentLoaded", function(event) {
        if (element == $(this))
          fireFrameLoaded();
      });
    }

    element.load(function() {
      var frameDocument;
      if (typeof element.contentDocument !== 'undefined') {
        frameDocument = element.contentDocument;
      } else if (typeof element.contentWindow !== 'undefined' && typeof element.contentWindow.document !== 'undefined') {
        frameDocument = element.contentWindow.document;
      }

      onReadyStateComplete(frameDocument, fireFrameLoaded);
    });

    return element;
  }

  function onFrameLoaded($element, callback) {
    $element.bind('frame:loaded', callback);
    $element.observeFrameContentLoaded();
  }

  $.fn.observeFrameContentLoaded = observeFrameContentLoaded;
  $.fn.onFrameLoaded = onFrameLoaded;
})();
