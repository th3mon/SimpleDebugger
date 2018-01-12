import { removeNode } from './dom';

const createMainContainer = id => {
  const mainContainer = document.createElement('div');

  mainContainer.setAttribute('id', `SimpleDebugger-${id}`);
  mainContainer.classList.add('SimpleDebugger', `SimpleDebugger-${id}`);

  return mainContainer;
};
const addMainClass = () => document.body.classList.add('SimpleDebuggerOnBoard');

class SimpleDebugger {
  constructor (window, document, id) {
    this.id = id;
    this.messageId = 0;
    this.messages = [];

    this.mainContainer = createMainContainer(id);

    if (document) {
      document.body.appendChild(this.mainContainer);
    } else {
      throw Error('document should be defined');
    }

    addMainClass();

    if (window) {
      window.onerror = (e, src, line) => this.logError(e, src, line);
    } else {
      throw Error('window should be defined');
    }
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

  updateHeightOfContainer () {
    const mainContainerHeight = Math.max(this.mainContainer.offsetHeight, this.mainContainer.clientHeight);

    document.body.style.paddingTop = `${mainContainerHeight}px`;
  }

  remove (messageId) {
    this.messages = [
      ...this.messages.slice(0, messageId),
      ...this.messages.slice(messageId + 1)
    ];

    this.removeFromDOM(messageId);
    this.updateHeightOfContainer();
  }

  removeFromDOM (messageId) {
    const message = document.body.querySelector(`.SimpleDebuggerMessage-${this.id}-${messageId}`);

    removeNode(message);
  }

  logError (error, source, line) {
    this.add(`error: ${error} in ${source} at line ${line}`);
  }
}

export default SimpleDebugger;
