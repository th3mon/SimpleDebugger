import '../css/main.css';
import $ from 'jquery';

const SimpleDebugger = function (window, id) {
  const createMainContainer = () => {
    this.mainContainer = $('<div>', {
      id: 'SimpleDebugger-' + id,
      'class': 'SimpleDebugger'
    }).appendTo(document.body);
  };

  this.id = id;
  this.messageId = 0;
  this.messages = [];

  createMainContainer();
  this.addMainClass();
  window.onerror = (e, src, line) => this.logError(e, src, line);
};

SimpleDebugger.prototype.addMainClass = function () {
  $(document.body).addClass('SimpleDebuggerOnBoard');
};

SimpleDebugger.prototype.add = function (message) {
  const messageConfig = {
    id: `SimpleDebuggerMessage-${this.id}-${this.messageId}`,
    text: message
  };

  this.messages.push(messageConfig);
  this.messageId += 1;

  this.addToDOM(messageConfig);
  this.increaseHeightOfContainer();
};

SimpleDebugger.prototype.addToDOM = function (message) {
  $('<p>', message).appendTo(this.mainContainer);
};

SimpleDebugger.prototype.increaseHeightOfContainer = function () {
  $(document.body).css({paddingTop: this.mainContainer.height() + 'px'});
};

SimpleDebugger.prototype.remove = function (messageId) {
  this.messages = [
    ...this.messages.slice(0, messageId),
    ...this.messages.slice(messageId + 1)
  ];

  this.removeFromDOM(messageId);
  this.decreaseHeightOfContainer();
};

SimpleDebugger.prototype.decreaseHeightOfContainer = function () {
  $(document.body).css({paddingTop: this.mainContainer.height() + 'px'});
};

SimpleDebugger.prototype.removeFromDOM = function (messageId) {
  $('#' + messageId).remove();
};

SimpleDebugger.prototype.logError = function (error, source, line) {
  this.add(`error: ${error} in ${source} at line ${line}`);
};

export default SimpleDebugger;
