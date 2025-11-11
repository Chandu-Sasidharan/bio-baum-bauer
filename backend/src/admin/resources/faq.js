import Faq from '#src/models/faq.js';

const faqResource = {
  resource: Faq,
  options: {
    navigation: { name: 'Content', icon: 'HelpCircle' },
    listProperties: ['question', 'createdAt'],
    editProperties: ['question', 'answer'],
    filterProperties: ['question', 'createdAt'],
    properties: {
      answer: { type: 'richtext' },
    },
  },
  meta: {
    label: 'FAQs',
    icon: 'HelpCircle',
  },
};

export default faqResource;
