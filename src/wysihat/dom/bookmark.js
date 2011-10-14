//= require "selection"

if ($.browser.msie) {
  $.extend(Selection.prototype, (function() {
    function setBookmark() {
      var bookmark = $('#bookmark');
      if (bookmark) bookmark.remove();

      bookmark = $('<span id="bookmark">&nbsp;</span>');
      var parent = $('<div></div>').html(bookmark);

      var range = this._document.selection.createRange();
      range.collapse();
      range.pasteHTML(parent.html());
    }

    function moveToBookmark() {
      var bookmark = $('#bookmark');
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
  $.extend(Selection.prototype, (function() {
    function setBookmark() {
      var bookmark = $('#bookmark');
      if (bookmark) bookmark.remove();

      bookmark = $('<span id="bookmark">&nbsp;</span>');
      this.getRangeAt(0).insertNode(bookmark);
    }

    function moveToBookmark() {
      var bookmark = $('#bookmark');
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
