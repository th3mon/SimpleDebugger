import { removeNode } from '../src/dom';

describe('DOM', () => {
  describe('removeNode', () => {
    it('should remove node', () => {
      const id = 'node';
      let node = document.createElement('p');

      node.setAttribute('id', id);
      document.body.appendChild(node);

      expect(document.getElementById(id)).toBeTruthy();

      removeNode(node);

      expect(document.getElementById(id)).toBeNull();
    });
  });
});


