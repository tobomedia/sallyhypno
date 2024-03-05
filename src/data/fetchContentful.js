async function fetchGraphQL(query) {
  return fetch(`https://graphql.contentful.com/content/v1/spaces/c7mmdyj6yd5z`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer oTNUFS2sBeuH2bT7s1EMdjfCA7yy8lWnTmGAgsZIAf0`,
    },
    body: JSON.stringify({query}),
  }).then(response => response.json());
}

export default fetchGraphQL;
