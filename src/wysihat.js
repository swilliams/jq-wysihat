/*  WysiHat - WYSIWYG JavaScript framework, version 0.2.1
 *  (c) 2008-2010 Joshua Peek
 *  JQ-WysiHat - jQuery port of WysiHat to run on jQuery
 *  (c) 2010 Scott Williams
 *
 *  WysiHat is freely distributable under the terms of an MIT-style license.
 *--------------------------------------------------------------------------*/
(function ($, window, undefined)
{
/**
 * == wysihat ==
**/

/** section: wysihat
 * WysiHat
**/
var WysiHat = {};

//= require "wysihat/editor"
//= require "wysihat/features"
//= require "wysihat/commands"

//= require "wysihat/dom/ierange"
//= require "wysihat/dom/range"
//= require "wysihat/dom/selection"
//= require "wysihat/dom/bookmark"

//= require "wysihat/element/sanitize_contents"

//= require "wysihat/events/field_change"
//= require "wysihat/events/frame_loaded"
//= require "wysihat/events/selection_change"

//= require "wysihat/formatting"

//= require "wysihat/toolbar"

// Set wysihat as a jQuery plugin
$.fn.wysihat = function(options) {
	options = $.extend({
			buttons: WysiHat.Toolbar.ButtonSets.Standard
		}, options);

	return this.each(function() {
		var editor = WysiHat.Editor.attach($(this));
		var toolbar = new WysiHat.Toolbar(editor);
		toolbar.initialize(editor);
		toolbar.addButtonSet(options);
	});
};

window.WysiHat = WysiHat;
}(jQuery, this));