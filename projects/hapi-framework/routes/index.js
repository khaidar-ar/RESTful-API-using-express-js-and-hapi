const bookHandler = require('../api/handler/bookHandler')

exports.routes = [{
        method: 'POST',
        path: '/books',
        handler: bookHandler.addBook
    }, {
        method: 'GET',
        path: '/books',
        handler: bookHandler.getAll
    }, {
        method: 'GET',
        path: '/books/{id}',
        handler: bookHandler.getById
    }, {
        method: 'DELETE',
        path: '/books',
        handler: bookHandler.deleteBook
    }, {
        method: 'DELETE',
        path: '/books/{id}',
        handler: bookHandler.deleteBookById
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: bookHandler.update
    }
]