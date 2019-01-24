const baseUrl = 'http://localhost:8080/bucket';

export const loadBucket = () => {
  return fetch(baseUrl)
    .then(res => res.json());
};

export const createBucket = (bucket) => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bucket)
  }).then(res => res.json);
};

export const saveBucket = (bucket) => {
  return fetch(`${baseUrl}/${bucket.id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bucket)
  }).then(res => res.json);
};

export const deleteBucket = (id) => {
  return fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
};
