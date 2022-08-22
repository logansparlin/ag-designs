export default {
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        {
          name: 'images',
          title: 'Images',
          type: 'array',
          of: [{ type: 'imageWithAlt' }],
          options: {
            layout: 'grid'
          }
        },
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
          name: 'slug',
          title: 'Slug',
          type: 'slug',
          options: {
              source: 'title'
          }
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3
        },
        {
          name: 'location',
          title: 'Location',
          type: 'string'
        },
        {
          name: 'clientType',
          title: 'Client Type',
          type: 'string'
        },
        {
          name: 'scope',
          title: 'Scope',
          type: 'array',
          of: [{ type: 'string' }]
        },
        {
          name: 'services',
          title: 'Services',
          type: 'array',
          of: [{ type: 'string' }]
        }
    ]
}