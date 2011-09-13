//= require "./selection"

if (jQuery.browser.msie) {
  jQuery.extend(Selection.prototype, (function() {
    function setBookmark() {
      var bookmark = jQuery('#bookmark');
      if (bookmark) bookmark.remove();

      bookmark = jQuery('<span id="bookmark">&nbsp;</span>');
      var parent = jQuery('<div></div>').html(bookmark);

      var range = this._document.selection.createRange();
      range.collapse();
      range.pasteHTML(parent.html());
    }

    function moveToBookmark() {
      var bookmark = jQuery('#bookmark');
      if (!bookmark) return;

      var range = this._document.selection.createRange();
      range.moveToElementText(bookmark);
      range.collapse();
      range.select();

      bookmark.remove();
    }

    return {
      setBookmark:    setBookmark,
      moveToBookmark: moveToBookmark
    }
  })());
} else {
  jQuery.extend(Selection.prototype, (function() {
    function setBookmark() {
      var bookmark = jQuery('#bookmark');
      if (bookmark) bookmark.remove();

      bookmark = jQuery('<span id="bookmark">&nbsp;</span>');
      this.getRangeAt(0).insertNode(bookmark);
    }

    function moveToBookmark() {
      var bookmark = jQuery('#bookmark');
      if (!bookmark) return;

      var range = document.createRange();
      range.setStartBefore(bookmark);
      this.removeAllRanges();
      this.addRange(range);

      bookmark.remove();
    }

    return {
      setBookmark:    setBookmark,
      moveToBookmark: moveToBookmark
    }
  })());
}
