//= require "./wysihat/dom/ierange"
//= require "./wysihat/dom/range"
//= require "./wysihat/dom/selection"
//= require "./wysihat/dom/bookmark"
//= require "./wysihat/header"
//= require "./wysihat/editor"
//= require "./wysihat/features"
//= require "./wysihat/commands"
//= require "./wysihat/element/sanitize_contents"
//= require "./wysihat/events/field_change"
//= require "./wysihat/events/frame_loaded"
//= require "./wysihat/events/selection_change"
//= require "./wysihat/formatting"
//= require "./wysihat/toolbar"

// Set wysihat as a jQuery plugin
$.fn.wysihat = function(buttons) {
  buttons = typeof(buttons) == 'undefined' ? WysiHat.Toolbar.ButtonSets.Basic : buttons;

  var result;

  this.each(function() {
    var $editor = WysiHat.Editor.attach($(this));
    var toolbar = new WysiHat.Toolbar($editor);
    toolbar.initialize($editor);
    toolbar.addButtonSet(buttons);
    $editor.toolbar = toolbar;
    if (result) result.add($editor); else result = $editor;
  });

  return result;
};

})(jQuery);
