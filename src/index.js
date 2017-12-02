/*
**  SimpleDebugger v1.0.0
**
**  Dependencies
**      jQuery v1.8
*/
(function (g, d, $, u) {
  const SimpleDebugger = function (id) {
    const self = this;
    const createMainContainer = function () {
      self.$main = $('<div>', {
        id: 'SimpleDebugger' + id,
        'class': 'SimpleDebugger'
      }).appendTo(d.body);
    };

    this.id = id;
    this.messageId = 0;
    this.messages = [];
    createMainContainer();
    $(d.body).addClass('SimpleDebuggerOnBoard');
    g.onerror = function (e, src, line) {
      self.add('error: ' + e);
      self.add('in ' + src + ' at line ' + line);
    };
  };

  SimpleDebugger.prototype.add = function (message) {
    const messageConfig = {
      id: 'SimpleDebuggerMessage' + this.id + this.messageId,
      text: message
    };

    $('<p>', messageConfig).appendTo(this.$main);
    this.messages.push(messageConfig);
    this.messageId += 1;

    $(d.body).css({paddingTop: this.$main.height() + 'px'});
  };

  SimpleDebugger.prototype.remove = function (messageId) {
    $('#' + messageId).remove();
    $(d.body).css({paddingTop: this.$main.height() + 'px'});
  };

  g.SimpleDebugger = SimpleDebugger;
}(window, document, jQuery));
