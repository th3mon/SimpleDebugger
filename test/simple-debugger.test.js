import SimpleDebugger from '../src/index';

let simpleDebugger;

const fakeWindow = {
  onerror: jest.fn()
};

const removeNode = node => node.parentNode.removeChild(node);
const removeSimpleDebugger = () =>
  document.body
    .querySelectorAll('.SimpleDebugger')
    .forEach( removeNode );


beforeEach(() => simpleDebugger = new SimpleDebugger(fakeWindow, 666));
afterEach( removeSimpleDebugger );

it('to be defined', () => expect(simpleDebugger).toBeDefined());

describe('constructor', () => {
  it('should create main container', () =>
    expect(simpleDebugger.mainContainer).toBeTruthy()
  );

  it('should add main container to DOM', () =>
    expect(document.body.querySelector('.SimpleDebugger')).toBeTruthy()
  );

  it('should main container have id', () => {
    const mainContainer = document.getElementById('SimpleDebugger-666');

    expect(mainContainer.id).toBe('SimpleDebugger-666');
  });

  it('should set id', () => expect(simpleDebugger.id).toEqual(666) );

  it('should react on rised error', () => {
    simpleDebugger.logError = jest.fn().mockName('logError');
    fakeWindow.onerror();

    expect(simpleDebugger.logError).toHaveBeenCalled();
  });

  it('should add className "SimpleDebuggerOnBoard" to body', () =>
    expect(document.body.classList.contains('SimpleDebuggerOnBoard')).toBe(true)
  );
});

describe('add message', () => {
  it('should insert into messages', () => {
    simpleDebugger.add('Some message');

    expect(simpleDebugger.messages.length).toEqual(1);
  });

  it('should have text', () => {
    simpleDebugger.add('Some message');

    const messageId = `SimpleDebuggerMessage-${simpleDebugger.id}-0`;
    const message = simpleDebugger.messages.find(item => item.id === messageId);

    expect(message.text).toBe('Some message');
  });

  it('should have id', () => {
    simpleDebugger.add('Some message');

    const messageId = `SimpleDebuggerMessage-${simpleDebugger.id}-0`;
    const message = simpleDebugger.messages.find(item => item.id === messageId);

    expect(message.id).toEqual(messageId);
  });

  it('should increase messageId', () => {
    simpleDebugger.add('Some message');

    expect(simpleDebugger.messageId).toBeGreaterThan(0);
  });

  it('should insert to DOM', () => {
    simpleDebugger.add('Some message');

    const messageElement = document.body.querySelector('.SimpleDebugger__message');
    const messageId = `SimpleDebuggerMessage-${simpleDebugger.id}-0`;

    expect(messageElement).toBeTruthy();
    expect(messageElement.innerText).toBe('Some message');
    expect(messageElement.getAttribute('id')).toBe(messageId);
    expect(messageElement.classList.contains(messageId)).toBe(true);
  });

  it('should increase height of container', () => {
    jest.spyOn(simpleDebugger, 'increaseHeightOfContainer');

    simpleDebugger.add('Some message');

    expect(simpleDebugger.increaseHeightOfContainer).toHaveBeenCalled();
  });
});

describe('remove message', () => {
  const messageId = 0;

  it('should remove message from messages', () => {
    simpleDebugger.add('Some message');
    simpleDebugger.remove(messageId);

    const message = simpleDebugger.messages.find(item => item.id === messageId);

    expect(message).toBeUndefined();
  });

  it('should remove message from DOM', () => {
    jest.spyOn(simpleDebugger, 'removeFromDOM');

    simpleDebugger.add('Some message');
    simpleDebugger.remove(messageId);

    expect(simpleDebugger.removeFromDOM).toHaveBeenCalledWith(messageId);
  });

  it('should decrease height of container', () => {
    jest.spyOn(simpleDebugger, 'decreaseHeightOfContainer');

    simpleDebugger.add('Some message');
    simpleDebugger.remove(messageId);

    expect(simpleDebugger.decreaseHeightOfContainer).toHaveBeenCalled();
  });
});

describe('logError', () => {
  it('should add error object as message', () => {
    const error = new Error('Some error');

    jest.spyOn(simpleDebugger, 'add');
    simpleDebugger.logError(error);

    expect(simpleDebugger.add).toHaveBeenCalledWith(
      expect.stringContaining(`error: ${error}`)
    );
  });

  it('should add error source as message', () => {
    const error = new Error('Some error');
    const source = 'Some source';

    jest.spyOn(simpleDebugger, 'add');
    simpleDebugger.logError(error, source);

    expect(simpleDebugger.add).toHaveBeenCalledWith(
      expect.stringContaining(source)
    );
  });

  it('should add error line as message', () => {
    const error = new Error('Some error');
    const source = 'Some source';
    const line = 'Some line';

    jest.spyOn(simpleDebugger, 'add');
    simpleDebugger.logError(error, source, line);

    expect(simpleDebugger.add).toHaveBeenCalledWith(
      expect.stringContaining(line)
    );
  });
});

describe('createMessageElement', () => {
  let simpleDebuggerId;
  let messageId;
  let messageContent;
  let messageConfig;
  let messageElement;

  beforeEach(() => {
    simpleDebuggerId = simpleDebugger.id;
    messageId = simpleDebugger.messageId;
    messageContent = 'Some message';

    messageConfig = {
      id: `SimpleDebuggerMessage-${simpleDebuggerId}-${messageId}`,
      text: messageContent
    };

    messageElement = simpleDebugger.createMessageElement(messageConfig);
  });

  it('should created message element be HTMLParagraphElement', () => {
    expect(messageElement.toString()).toBe('[object HTMLParagraphElement]');
  });

  it('should create message with given id', () => {
    const id = `SimpleDebuggerMessage-${simpleDebuggerId}-${messageId}`;

    expect(messageElement.getAttribute('id')).toEqual(id);
  });

  it('should create message with given content', () => {
    expect(messageElement.innerText).toEqual('Some message');
  });

  it('should create message with given id as className', () => {
    const id = `SimpleDebuggerMessage-${simpleDebuggerId}-${messageId}`;

    expect(messageElement.classList.contains(id)).toBe(true);
  });
});
