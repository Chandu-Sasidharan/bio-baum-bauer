import { describe, it, expect } from 'vitest';
import Tree from '../tree.js';
import validateTree from '#src/validations/tree-validation.js';

describe('Tree model', () => {
  it('exposes the tree validator', () => {
    expect(Tree.validateTree).toBe(validateTree);
    const result = Tree.validateTree({
      name: { en: 'Oak', de: 'Eiche' },
      category: 'Fruit Tree',
      price: '10',
      availableQuantity: 5,
      shortDescription: { en: 'Short', de: 'Kurz' },
      description: { en: 'Long description', de: 'Lange Beschreibung' },
      imageUrl: 'https://example.com/tree.png',
      status: 'Available',
      isFeatured: false,
    });
    expect(result.success).toBe(true);
  });

  it('defaults status to Available and isFeatured to false', () => {
    const doc = new Tree({
      name: { en: 'Pine', de: 'Kiefer' },
      category: 'Evergreen Forest',
      price: 15,
      availableQuantity: 2,
      shortDescription: { en: 'Short', de: 'Kurz' },
      description: { en: 'Long description', de: 'Lange Beschreibung' },
    });

    expect(doc.status).toBe('Available');
    expect(doc.isFeatured).toBe(false);
  });
});
