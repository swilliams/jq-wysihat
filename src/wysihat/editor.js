/** section: wysihat
 * WysiHat.Editor
**/
WysiHat.Editor = {
  /** section: wysihat
   *  WysiHat.Editor.attach(textarea) -> undefined
   *  - $textarea (jQuery): a jQuery wrapped textarea that you want to convert 
   * to a rich-text field.
   *
   *  Creates a new editor for the textarea.
  **/
  attach: function($textarea) {
    var $editArea;

    var id = $textarea.attr('id') + '_editor';
    if ($editArea == $('#' + id)) { return $editArea; }

    $editArea = $('<div id="' + id + '" class="editor" contentEditable="true"></div>');

    $editArea.html(WysiHat.Formatting.getBrowserMarkupFrom($textarea.val()));

    $.extend($editArea, WysiHat.Commands);

    $textarea.before($editArea);
    $textarea.hide();

    // WysiHat.BrowserFeatures.run()

    return $editArea;
  }
};
