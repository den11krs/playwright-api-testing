import { test } from '../utils/fixtures';

test('first test', async({ api }) => {

    api
        .url('https://conduit-api.bondaracademy.com/api')
        .path('/articles')
        .params({limit: 10, offset: 0})
        .headers({Authorization: 'athToken'})
        .body({'user': { 'email': 'pwapiuser@test.com', 'password': 'Welcome' }});

});