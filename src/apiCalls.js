export const getUrls = async () => {
  const response = await fetch('http://localhost:3001/api/v1/urls');
  if (!response.ok) {
    throw new Error('Failed to fetch URLs');
  }
  return response.json();
};

export const saveUrl = async (url) => {
  const response = await fetch('http://localhost:3001/api/v1/urls', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(url)
  });
  if (!response.ok) {
    throw new Error('Failed to save URL');
  }
  return response.json();
};

export const deleteUrl = async (id) => {
  const response = await fetch(`http://localhost:3001/api/v1/urls/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Failed to delete URL');
  }
  return response;
};