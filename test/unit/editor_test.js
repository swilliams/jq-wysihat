new Test.Unit.Runner({
  setup: function() {
    this.textarea = jQuery('#content');
    this.editor = WysiHat.Editor.attach(this.textarea);
    this.editor.focus();
  },

  teardown: function() {
    this.editor.innerHTML = "";
    this.textarea.value = "";
  },

  testInsertHTML: function() {
    var runner = this;

    this.editor.html("<p>Hello.</p>");
    runner.assertEqual("<p>Hello.</p>", this.editor.html());
  },

  testBoldSelection: function() {
    var runner = this;

    this.editor.html('<p id="hello">Hello.</p>');

    window.getSelection().selectNode(this.editor.find('#hello'));
    this.editor.boldSelection();

    runner.assert(this.editor.boldSelected());
    runner.assertEqual('<p id="hello"><strong>Hello.</strong></p>', this.editor.html());
  }
});
