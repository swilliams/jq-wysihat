$(document).ready(function() {
  function fieldChangeHandler(event) {
    var $element = $(this);
    element = $element.get(0);
    var value;

    if ($element.attr('contentEditable') === 'true') {
      value = $element.html();
    } else {
      value = $element.val();
    }
    // TODO: where did previousValue come from? Guessing it's with contentEditable
    if (value && element.previousValue != value) {
      $element.trigger("field:change");
      element.previousValue = value;
    }
  }

  $('input,textarea,*[contenteditable=""],*[contenteditable=true]').keyup(fieldChangeHandler);
});
