(function() {
  function cloneWithAllowedAttributes(element, allowedAttributes) {
    var length = allowedAttributes.length, i;
    var result = $('<' + element.tagName.toLowerCase() + '></' + element.tagName.toLowerCase() + '>')
    element = $(element);

    for (i = 0; i < allowedAttributes.length; i++) {
      attribute = allowedAttributes[i];
      if (element.attr(attribute)) {
        result.attr(attribute, element.attr(attribute));
      }
    }

    return result;
  }

  function withEachChildNodeOf(element, callback) {
    var nodes = $(element).children;
    var length = nodes.length, i;
    for (i = 0; i < length; i++) callback(nodes[i]);
  }

  function sanitizeNode(node, tagsToRemove, tagsToAllow, tagsToSkip) {
    var parentNode = node.parentNode;

    switch (node.nodeType) {
      case Node.ELEMENT_NODE:
        var tagName = node.tagName.toLowerCase();

        if (tagsToSkip) {
          var newNode = node.cloneNode(false);
          withEachChildNodeOf(node, function(childNode) {
            newNode.appendChild(childNode);
            sanitizeNode(childNode, tagsToRemove, tagsToAllow, tagsToSkip);
          });
          parentNode.insertBefore(newNode, node);

        } else if (tagName in tagsToAllow) {
          var newNode = cloneWithAllowedAttributes(node, tagsToAllow[tagName]);
          withEachChildNodeOf(node, function(childNode) {
            newNode.appendChild(childNode);
            sanitizeNode(childNode, tagsToRemove, tagsToAllow, tagsToSkip);
          });
          parentNode.insertBefore(newNode, node);

        } else if (!(tagName in tagsToRemove)) {
          withEachChildNodeOf(node, function(childNode) {
            parentNode.insertBefore(childNode, node);
            sanitizeNode(childNode, tagsToRemove, tagsToAllow, tagsToSkip);
          });
        }

      case Node.COMMENT_NODE:
        parentNode.removeChild(node);
    }
  }

  $.fn.sanitizeContents = function(options) {
    var element = $(this);
    var tagsToRemove = {};
    $.each((options.remove || "").split(","), function(tagName) {
      tagsToRemove[$.trim(tagName)] = true;
    });

    var tagsToAllow = {};
    $.each((options.allow || "").split(","), function(selector) {
      var parts = $.trim(selector).split(/[\[\]]/);
      var tagName = parts[0];
      var allowedAttributes = $.grep(parts.slice(1), function(n, i) {
        return /./.test(n);
      });
      tagsToAllow[tagName] = allowedAttributes;
    });

    var tagsToSkip = options.skip;

    withEachChildNodeOf(element, function(childNode) {
      sanitizeNode(childNode, tagsToRemove, tagsToAllow, tagsToSkip);
    });

    return element;
  }
})();
