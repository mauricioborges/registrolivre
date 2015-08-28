app.service("clipboard", [
  function() {
    function getText(event) {
      return event.originalEvent.clipboardData.getData("text");
    }

    this.handlePaste = function(domNode) {
      return R.compose(domNode.val, getText);
    };
  }
]);
