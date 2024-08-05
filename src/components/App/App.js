import React, { useState, useEffect } from 'react';
import './App.css';
import { getUrls, saveUrl, deleteUrl } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

function App() {
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const data = await getUrls();
      setUrls(data.urls);
    } catch (error) {
      setError('Failed to fetch URLs.');
    }
  };

  const addUrl = async (newUrl) => {
    try {
      const savedUrl = await saveUrl(newUrl);
      setUrls([...urls, savedUrl]);
    } catch (error) {
      setError('Failed to save URL.');
    }
  };

  const removeUrl = async (id) => {
    try {
      await deleteUrl(id);
      setUrls(urls.filter(url => url.id !== id));
    } catch (error) {
      setError('Failed to delete URL.');
    }
  };

  return (
    <main className="App">
      <header>
        <h1>URL Shortener</h1>
        {error && <p className="error">{error}</p>}
        <UrlForm addUrl={addUrl} setError={setError} />
      </header>

      <UrlContainer urls={urls} removeUrl={removeUrl} />
    </main>
  );
}

export default App;