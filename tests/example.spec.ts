import { test, expect } from '@playwright/test';
import { console } from 'inspector';

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
  const tokenResponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
    data: { 'user': { 'email': 'den11krs@gmail.com', 'password': 'd~oC$<8xA`2*_}k-"8' } }
  });
  const tokenResponseJSON = await tokenResponse.json();
  const authToken = tokenResponseJSON.user.token;

  const newArtecleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles', {
    headers: {
      'Authorization': `Token ${authToken}`
    },
    data: {
      'article': {
        'title': 'Test Article',
        'description': 'Test Description',
        'body': 'Test Body',
        'tagList': ['Test']
      }
    }
  });
  const newArtecleResponseJSON = await newArtecleResponse.json();
  expect(newArtecleResponse.status()).toEqual(201);
  expect(newArtecleResponseJSON.article.title).toEqual('Test Article');
  const slugId = newArtecleResponseJSON.article.slug;

  const articlesResponse = await request.get('https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0', {
    headers: {
      'Authorization': `Token ${authToken}`
    }
  });
  const articlesResponseJSON = await articlesResponse.json();

  expect(articlesResponseJSON.articles[0].title).toEqual('Test Article');
  expect(articlesResponseJSON.articles[0].description).toEqual('Test Description');

  const deleteArticleResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slugId}`, {
    headers: {
      'Authorization': `Token ${authToken}`
    }
  });

  expect(deleteArticleResponse.status()).toEqual(204);
});