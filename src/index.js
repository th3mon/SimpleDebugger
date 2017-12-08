import '../css/main.css';
import $ from 'jquery';

const SimpleDebugger = function (id) {
  const self = this;
  const createMainContainer = function () {
    self.$main = $('<div>', {
      id: 'SimpleDebugger' + id,
      'class': 'SimpleDebugger'
    }).appendTo(document.body);
  };

  this.id = id;
  this.messageId = 0;
  this.messages = [];
  createMainContainer();
  $(document.body).addClass('SimpleDebuggerOnBoard');
  window.onerror = function (e, src, line) {
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

  $(document.body).css({paddingTop: this.$main.height() + 'px'});
};

SimpleDebugger.prototype.remove = function (messageId) {
  $('#' + messageId).remove();
  $(document.body).css({paddingTop: this.$main.height() + 'px'});
};

window.SimpleDebugger = SimpleDebugger;
