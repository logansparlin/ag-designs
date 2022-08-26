export default {
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'object',
  fields: [
      {
        name: 'question',
        title: 'Question',
        type: 'string'
      },
      {
        name: 'answer',
        title: 'Answer',
        type: 'blockContent'
      }
  ]
}