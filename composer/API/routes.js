module.exports = routes = [
    {
        method: 'GET',
        url: 'list',
        controller: 'list'
    },
    {
        method: 'GET',
        url: 'presentation/([0-9]+)',
        controller: 'get'
    },
    {
        method: 'DELETE',
        url: 'presentation/([0-9]+)',
        controller: 'delete'
    },
    {
        method: 'POST',
        url: 'create',
        controller: 'create'
    },
    {
        method: 'PUT',
        url: 'update',
        controller: 'update'
    },
    {
      method: 'POST',
      url: 'saveimage',
      controller: 'saveImage'
    },
    {
      method: 'GET',
      url: 'images',
      controller: 'listImage'
    },
    {
      method: 'DELETE',
      url: 'image/(.*)',
      controller: 'deleteImage'
    }
];
