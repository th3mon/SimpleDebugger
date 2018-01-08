import '../css/main.css';

// TODO: create some module for functions like removeNode() and move this function into it.
const removeNode = node => node.parentNode.removeChild(node);
const createMainContainer = id => {
  const mainContainer = document.createElement('div');

  mainContainer.setAttribute('id', `SimpleDebugger-${id}`);
  mainContainer.classList.add('SimpleDebugger', `SimpleDebugger-${id}`);

  return mainContainer;
};
const addMainClass = () => document.body.classList.add('SimpleDebuggerOnBoard');

class SimpleDebugger {
  constructor (window, id) {
    this.id = id;
    this.messageId = 0;
    this.messages = [];

    this.mainContainer = createMainContainer(id);
    // TODO: should throw error if document is falsy
    document.body.appendChild(this.mainContainer);
    addMainClass();
    // TODO: should throw error if window is falsy
    window.onerror = (e, src, line) => this.logError(e, src, line);
  }

  add (message) {
    const messageConfig = {
      id: `SimpleDebuggerMessage-${this.id}-${this.messageId}`,
      text: message
    };

    this.messages.push(messageConfig);
    const messageElement = this.createMessageElement(messageConfig);

    this.addMessageToDOM(messageElement);
    this.updateHeightOfContainer();

    this.messageId += 1;
  }

  createMessageElement ({ id, text }) {
    const pararaph = document.createElement('p');

    pararaph.setAttribute('id', id);
    pararaph.innerText = text;
    pararaph.classList.add(id, 'SimpleDebugger__message');

    return pararaph;
  }

  addMessageToDOM (messageElement) {
    this.mainContainer.appendChild(messageElement);
  }
}

SimpleDebugger.prototype.updateHeightOfContainer = function () {
  const mainContainerHeight = Math.max(this.mainContainer.offsetHeight, this.mainContainer.clientHeight);

  document.body.style.paddingTop = `${mainContainerHeight}px`;
};

SimpleDebugger.prototype.remove = function (messageId) {
  this.messages = [
    ...this.messages.slice(0, messageId),
    ...this.messages.slice(messageId + 1)
  ];

  this.removeFromDOM(messageId);
  this.updateHeightOfContainer();
};

SimpleDebugger.prototype.removeFromDOM = function (messageId) {
  const message = document.body.querySelector(`.SimpleDebuggerMessage-${this.id}-${messageId}`);

  removeNode(message);
};

SimpleDebugger.prototype.logError = function (error, source, line) {
  this.add(`error: ${error} in ${source} at line ${line}`);
};

export default SimpleDebugger;
