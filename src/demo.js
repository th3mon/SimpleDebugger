import SimpleDebugger from './index';

const generateMockContent = () => {
  for (let i = 100; i > 0; i--) {
    const mockContent = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque adipisci enim ut. Temporibus quasi reprehenderit maiores nostrum adipisci debitis porro? Quo commodi officia praesentium reiciendis. Labore odit aliquid consectetur debitis?';
    const p = document.createElement('p');

    p.innerText = mockContent;

    document.body.appendChild(p);
  }
};

generateMockContent();

const db1 = new SimpleDebugger(window, document, 1);

for (let i = 30; i > 0; i--) {
  db1.add(`TEST ${i}`);
}
