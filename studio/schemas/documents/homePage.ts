import { BiHomeAlt } from 'react-icons/bi'
;
export default {
    name: 'homePage',
    title: 'Home Page',
    type: 'document',
    icon: BiHomeAlt,
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name: 'process',
            title: 'Our Process',
            type: 'array',
            of: [{ type: 'string' }]
        },
        {
            name: 'services',
            title: 'Our Services',
            type: 'array',
            of: [{ type: 'string' }]
        }
    ]
}