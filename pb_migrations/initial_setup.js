/// <reference path="../pb_data/types.d.ts" />

migrate((db) => {
  const collection = new Collection({
    name: 'users',
    type: 'auth',
    schema: [
      {
        name: 'name',
        type: 'text',
        required: true,
      },
      {
        name: 'avatar',
        type: 'file',
        required: false,
      },
    ],
    indexes: ['name'],
    listRule: '',
    viewRule: '',
    createRule: '',
    updateRule: 'id = @request.auth.id',
    deleteRule: 'id = @request.auth.id',
  });

  return [collection];
});