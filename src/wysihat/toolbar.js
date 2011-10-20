//= require "events/selection_change"

/** section: wysihat
 *  class WysiHat.Toolbar
**/
WysiHat.Toolbar = function() {
  var editor;
  var element;

  /**
   *  new WysiHat.Toolbar(ed)
   *  - ed (WysiHat.Editor): the editor object that you want to attach to.
   *
   *  This was renamed from 'editor' in the original wysihat code, since I 
   *  had to add a class level 'editor' object, causing a conflict with the 
   *  names.
   *
   *  Creates a toolbar element above the editor. The WysiHat.Toolbar object
   *  has many helper methods to easily add buttons to the toolbar.
   *
   *  This toolbar class is not required for the Editor object to function.
   *  It is merely a set of helper methods to get you started and to build
   *  on top of. If you are going to use this class in your application,
   *  it is highly recommended that you subclass it and override methods
   *  to add custom functionality.
  **/
  function initialize(ed) {
    editor = ed;
    element = createToolbarElement();
  }

  /**
   *  WysiHat.Toolbar#createToolbarElement() -> Element
   *
   *  Creates a toolbar container element and inserts it right above the
   *  original textarea element. The element is a div with the class
   *  'editor_toolbar'.
   *
   *  You can override this method to customize the element attributes and
   *  insert position. Be sure to return the element after it has been
   *  inserted.
  **/
  function createToolbarElement() {
    var toolbar = $('<div class="editor_toolbar"></div>');
    editor.before(toolbar);
    return toolbar;
  }

  /**
   *  WysiHat.Toolbar#addButtonSet(set) -> undefined
   *  - set (Array): The set array contains nested arrays that hold the
   *  button options, and handler.
   *
   *  Adds a button set to the toolbar.
  **/
  function addButtonSet(options) {
    $(options.buttons).each(function(index, button){
      addButton(button);
    });
  }

  function addDropdown(options, handler) {
    if (!options['name']) {
      options['name'] = options['label'].toLowerCase();
    }
    var name = options['name'];
    var select = createDropdownElement(element, options);

    var handler = buttonHandler(name, options);
    observeDropdownChange(select, handler);
  }

  /**
   *  WysiHat.Toolbar#addButton(options[, handler]) -> undefined
   *  - options (Hash): Required options hash
   *  - handler (Function): Function to bind to the button
   *
   *  The options hash accepts two required keys, name and label. The label
   *  value is used as the link's inner text. The name value is set to the
   *  link's class and is used to check the button state. However the name
   *  may be omitted if the name and label are the same. In that case, the
   *  label will be down cased to make the name value. So a "Bold" label
   *  will default to "bold" name.
   *
   *  The second optional handler argument will be used if no handler
   *  function is supplied in the options hash.
   *
   *  toolbar.addButton({
   *    name: 'bold', label: "Bold" }, function(editor) {
   *      editor.boldSelection();
   *  });
   *
   *  Would create a link,
   *  "<a href='#' class='button bold'><span>Bold</span></a>"
  **/
  function addButton(options, handler) {
    if (!options['name']) {
      options['name'] = options['label'].toLowerCase();
    }
    var name = options['name'];

    var button = createButtonElement(element, options);

    var handler = buttonHandler(name, options);
    observeButtonClick(button, handler);

    var handler = buttonStateHandler(name, options);
    observeStateChanges(button, name, handler);
  }

  /**
   *  WysiHat.Toolbar#createButtonElement(toolbar, options) -> Element
   *  - toolbar (Element): Toolbar element created by createToolbarElement
   *  - options (Hash): Options hash that pass from addButton
   *
   *  Creates individual button elements and inserts them into the toolbar
   *  container. The default elements are 'a' tags with a 'button' class.
   *
   *  You can override this method to customize the element attributes and
   *  insert positions. Be sure to return the element after it has been
   *  inserted.
  **/
  function createButtonElement(toolbar, options) {
    var button = $('<a class="" href="#"><span>' + options['label'] + '</span></a>');
    button.addClass("button");
		button.addClass(options['name']);
		button.addClass(options['cssClass']);
    toolbar.append(button);

    return button;
  }

  /**
   *  WysiHat.Toolbar#createDropdownElement(toolbar, options) 
   *
   *  Creates a dropdown element and inserts it into the toolbar container.
   *
   *  options.options contains the elements that go in the dropdown
  **/ 
  function createDropdownElement(toolbar, options) {
    var optionTemplate = '<option value="KEY">VALUE</option>',
        selectTemplate = '<select>OPTIONS</select>';
        builder = '';
    for (var i = 0; i < options.options.length; i++) {
      var o = options.options[i];
      builder += optionTemplate.replace('KEY', o.val).replace('VALUE', o.label);
    };
    var select = $('<select>' + builder + '</select>');
    select.addClass(options['cssClass']);
    toolbar.append(select);
    return select;
  }

  /**
   *  WysiHat.Toolbar#buttonHandler(name, options) -> Function
   *  - name (String): Name of button command: 'bold', 'italic'
   *  - options (Hash): Options hash that pass from addButton
   *
   *  Returns the button handler function to bind to the buttons onclick
   *  event. It checks the options for a 'handler' attribute otherwise it
   *  defaults to a function that calls execCommand with the button name.
  **/
  function buttonHandler(name, options) {
    if (options.handler)
      return options.handler;
    else if (options['handler'])
      return options['handler'];
    else
      return function(editor) { editor.execCommand(name); };
  }

  /**
   *  WysiHat.Toolbar#observeButtonClick(element, handler) -> undefined
   *  - element (Element): Button element
   *  - handler (Function): Handler function to bind to element
   *
   *  Bind handler to elements onclick event.
  **/
  function observeButtonClick(element, handler) {
    $(element).click(function() {
      handler(editor);
      //event.stop();
      $(document.activeElement).trigger("selection:change");
      return false;
    });
  }

  function observeDropdownChange(element, handler) {
    $(element).change(function() {
      var selectedValue = $(this).val();
      handler(editor, selectedValue);
      $(document.activeElement).trigger("selection:change");
    });
  }

  /**
   *  WysiHat.Toolbar#buttonStateHandler(name, options) -> Function
   *  - name (String): Name of button command: 'bold', 'italic'
   *  - options (Hash): Options hash that pass from addButton
   *
   *  Returns the button handler function that checks whether the button
   *  state is on (true) or off (false). It checks the options for a
   *  'query' attribute otherwise it defaults to a function that calls
   *  queryCommandState with the button name.
  **/
  function buttonStateHandler(name, options) {
    if (options.query)
      return options.query;
    else if (options['query'])
      return options['query'];
    else
      return function(editor) { return editor.queryCommandState(name); };
  }

  /**
   *  WysiHat.Toolbar#observeStateChanges(element, name, handler) -> undefined
   *  - element (Element): Button element
   *  - name (String): Button name
   *  - handler (Function): State query function
   *
   *  Determines buttons state by calling the query handler function then
   *  calls updateButtonState.
  **/
  function observeStateChanges(element, name, handler) {
    var previousState;
    editor.bind("selection:change", function() {
      var state = handler(editor);
      if (state != previousState) {
        previousState = state;
        updateButtonState(element, name, state);
      }
    });
  }

  /**
   *  WysiHat.Toolbar#updateButtonState(element, name, state) -> undefined
   *  - element (Element): Button element
   *  - name (String): Button name
   *  - state (Boolean): Whether button state is on/off
   *
   *  If the state is on, it adds a 'selected' class to the button element.
   *  Otherwise it removes the 'selected' class.
   *
   *  You can override this method to change the class name or styles
   *  applied to buttons when their state changes.
  **/
  function updateButtonState(elem, name, state) {
    if (state)
      $(elem).addClass('selected');
    else
      $(elem).removeClass('selected');
  }

  return {
    initialize:           initialize,
    createToolbarElement: createToolbarElement,
    addButtonSet:         addButtonSet,
    addButton:            addButton,
    addDropdown:          addDropdown,
    createButtonElement:  createButtonElement,
    buttonHandler:        buttonHandler,
    observeButtonClick:   observeButtonClick,
    buttonStateHandler:   buttonStateHandler,
    observeStateChanges:  observeStateChanges,
    updateButtonState:    updateButtonState
  };
};

/**
 * WysiHat.Toolbar.ButtonSets
 *
 *  A namespace for various sets of Toolbar buttons. These sets should be
 *  compatible with WysiHat.Toolbar, and can be added to the toolbar with:
 *  toolbar.addButtonSet(WysiHat.Toolbar.ButtonSets.Basic);
**/
WysiHat.Toolbar.ButtonSets = {};

/**
 * WysiHat.Toolbar.ButtonSets.Basic
 *
 *  A basic set of buttons: bold, underline, and italic. This set is
 *  compatible with WysiHat.Toolbar, and can be added to the toolbar with:
 *  toolbar.addButtonSet(WysiHat.Toolbar.ButtonSets.Basic);
**/
WysiHat.Toolbar.ButtonSets.Basic = [
  { label: "Bold" },
  { label: "Underline" },
  { label: "Italic" }
];

/**
 * WysiHat.Toolbar.ButtonSets.Standard
 * 
 * The most common set of buttons that I will be using.
**/
WysiHat.Toolbar.ButtonSets.Standard = [
  { label: "Bold", cssClass: 'toolbar_button' },
  { label: "Italic", cssClass: 'toolbar_button' },
  { label: "Strikethrough", cssClass: 'toolbar_button' },
  { label: "Bullets", cssClass: 'toolbar_button', handler: function(editor) { return editor.toggleUnorderedList(); } }
];
