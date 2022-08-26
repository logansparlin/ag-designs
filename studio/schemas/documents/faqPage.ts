export default {
    name: 'faqPage',
    title: 'FAQ Page',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name: 'items',
            title: 'FAQ Items',
            type: 'array',
            of: [{ type: 'faqItem' }]
        }
    ]
}