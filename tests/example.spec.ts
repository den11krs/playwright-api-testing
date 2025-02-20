import { test, expect } from '@playwright/test';

let authToken: string;
test.beforeAll("Run this before each test", async ({ request }) => {
  const tokenResponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
    data: { 'user': { 'email': 'den11krs@gmail.com', 'password': 'd~oC$<8xA`2*_}k-"8' } }
  });
  const tokenResponseJSON = await tokenResponse.json();
  authToken = 'Token ' + tokenResponseJSON.user.token;
});



test('Get Test Tags', async ({ request }) => {
  const tagsResponse = await request.get('https://conduit-api.bondaracademy.com/api/tags');
  const tagsResponseJSON = await tagsResponse.json();

  expect(tagsResponse.status()).toEqual(200);
  expect(tagsResponseJSON.tags[0]).toEqual('Test');
  expect(tagsResponseJSON.tags.length).toBeLessThanOrEqual(10);
});

test('Get All Articles', async ({ request }) => {
  const articlesResponse = await request.get('https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0');
  const articlesResponseJSON = await articlesResponse.json();

  expect(articlesResponse.status()).toEqual(200);
  expect(articlesResponseJSON.articles.length).toBeLessThanOrEqual(10);
  expect(articlesResponseJSON.articlesCount).toBeLessThanOrEqual(10);

});

test('Create and Delete Article', async ({ request }) => {
  const newArticleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles', {
    headers: {
      'Authorization': authToken
    },
    data: {
      'article': {
        'title': 'Test TEST 001',
        'description': 'Test Description',
        'body': 'Test Body',
        'tagList': ['Test']
      }
    }
  });
  const newArticleResponseJSON = await newArticleResponse.json();
  expect(newArticleResponse.status()).toEqual(201);
  expect(newArticleResponseJSON.article.title).toEqual('Test TEST 001');
  const slugId = newArticleResponseJSON.article.slug;

  const articlesResponse = await request.get('https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0', {
    headers: {
      'Authorization': authToken
    }
  });
  const articlesResponseJSON = await articlesResponse.json();

  expect(articlesResponseJSON.articles[0].title).toEqual('Test TEST 001');
  expect(articlesResponseJSON.articles[0].description).toEqual('Test Description');

  const deleteArticleResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slugId}`, {
    headers: {
      'Authorization': authToken
    }
  });

  expect(deleteArticleResponse.status()).toEqual(204);
});


test('Create, Update and Delete Article', async ({ request }) => {
  const newArticleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles', {
    headers: {
      'Authorization': authToken
    },
    data: {
      'article': {
        'title': 'Test TEST 002',
        'description': 'Test Description',
        'body': 'Test Body',
        'tagList': ['Test']
      }
    }
  });
  const newArticleResponseJSON = await newArticleResponse.json();
  expect(newArticleResponse.status()).toEqual(201);
  expect(newArticleResponseJSON.article.title).toEqual('Test TEST 002');
  const slugId = newArticleResponseJSON.article.slug;

  const updateArticleResponse = await request.put(`https://conduit-api.bondaracademy.com/api/articles/${slugId}`, {
    headers: {
      'Authorization': authToken
    },
    data: {
      'article': {
        'title': 'Test TEST 002 Modified',
        'description': 'Test Description',
        'body': 'Test Body',
        'tagList': ['Test']
      }
    }
  });
  const updateArticleResponseJSON = await updateArticleResponse.json();
  expect(updateArticleResponse.status()).toEqual(200);
  expect(updateArticleResponseJSON.article.title).toEqual('Test TEST 002 Modified');
  const newSlugId = updateArticleResponseJSON.article.slug;

  const articlesResponse = await request.get('https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0', {
    headers: {
      'Authorization': authToken
    }
  });
  const articlesResponseJSON = await articlesResponse.json();

  expect(articlesResponseJSON.articles[0].title).toEqual('Test TEST 002 Modified');
  expect(articlesResponseJSON.articles[0].description).toEqual('Test Description');

  const deleteArticleResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${newSlugId}`, {
    headers: {
      'Authorization': authToken
    }
  });

  expect(deleteArticleResponse.status()).toEqual(204);
});

test.skip('Skip this test!', async ({ request }) => { });
test.fixme('Fix Me!', async ({ request }) => { });