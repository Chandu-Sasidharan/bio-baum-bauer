import Faq from '#src/models/faq.js';

const faqResource = {
  resource: Faq,
  options: {
    navigation: { name: 'Content', icon: 'HelpCircle' },
    listProperties: ['question.en', 'createdAt'],
    editProperties: ['question.en', 'question.de', 'answer.en', 'answer.de'],
    filterProperties: ['question.en', 'createdAt'],
    properties: {
      'question.en': { label: 'Question (EN)' },
      'question.de': { label: 'Question (DE)' },
      'answer.en': { type: 'richtext', label: 'Answer (EN)' },
      'answer.de': { type: 'richtext', label: 'Answer (DE)' },
    },
  },
  meta: {
    label: 'FAQs',
    icon: 'HelpCircle',
  },
};

export default faqResource;
