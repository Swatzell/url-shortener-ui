import React, { useState } from 'react';

function UrlForm({ addUrl }) {
  const [title, setTitle] = useState('');
  const [urlToShorten, setUrlToShorten] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const newUrl = {
      title,
      long_url: urlToShorten
    };
    await addUrl(newUrl);
    clearInputs();
  };

  const clearInputs = () => {
    setTitle('');
    setUrlToShorten('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Title...'
        name='title'
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <input
        type='text'
        placeholder='URL to Shorten...'
        name='urlToShorten'
        value={urlToShorten}
        onChange={e => setUrlToShorten(e.target.value)}
      />

      <button type="submit">
        Shorten Please!
      </button>
    </form>
  );
}

export default UrlForm;