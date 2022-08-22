export default {
  name: 'imageWithAlt',
  title: 'Image with Alt Text',
  type: 'object',
  fields: [
      {
        name: 'image',
        title: 'Image',
        type: 'image'
      },
      {
        name: 'alt',
        title: 'Alt Text',
        type: 'string'
      }
  ]
}