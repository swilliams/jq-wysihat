/** section: wysihat
 * WysiHat.Editor
**/
WysiHat.Editor = {
  /** section: wysihat
   *  WysiHat.Editor.attach(textarea) -> undefined
   *  - textarea (String | Element): an id or DOM node of the textarea that
   *    you want to convert to rich text.
   *
   *  Creates a new editor for the textarea.
  **/
  attach: function(textarea) {
    var $editArea;

    textarea = $(textarea);

    var id = textarea.id + '_editor';
    if ($editArea = $(id)) { return $editArea; }

    $editArea = $('<div id="' + id + '" class="editor" contentEditable="true"></div>');

    $editArea.html(WysiHat.Formatting.getBrowserMarkupFrom(textarea.val()));

    // TODO port to jQuery
    Object.extend(editArea, WysiHat.Commands);

    textarea.before(editArea);
    textarea.hide();

    // WysiHat.BrowserFeatures.run()

    return editArea;
  }
};
