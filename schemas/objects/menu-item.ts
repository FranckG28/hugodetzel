export const menuItem = {
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'string',
    },
    {
      name: 'newTab',
      title: 'Open in new tab',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'button',
      title: 'Display in a button',
      type: 'boolean',
      initialValue: false,
    },
  ],
}
