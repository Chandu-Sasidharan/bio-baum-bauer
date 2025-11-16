import { describe, it, expect } from 'vitest';
import Tree from '../tree.js';
import validateTree from '#src/validations/tree-validation.js';

describe('Tree model', () => {
  it('exposes the tree validator', () => {
    expect(Tree.validateTree).toBe(validateTree);
    const result = Tree.validateTree({
      name: 'Oak',
      category: 'Fruit Tree',
      price: '10',
      availableQuantity: 5,
      shortDescription: 'Short',
      description: 'Long description',
      imageUrl: 'https://example.com/tree.png',
      status: 'Available',
      isFeatured: false,
    });
    expect(result.success).toBe(true);
  });

  it('defaults status to Available and isFeatured to false', () => {
    const doc = new Tree({
      name: 'Pine',
      category: 'Evergreen Forest',
      price: 15,
      availableQuantity: 2,
      shortDescription: 'Short',
      description: 'Long description',
    });

    expect(doc.status).toBe('Available');
    expect(doc.isFeatured).toBe(false);
  });
});
