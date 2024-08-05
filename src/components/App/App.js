import React, { useState, useEffect } from 'react';
import './App.css';
import { getUrls, saveUrl, deleteUrl } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

function App () {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const data = await getUrls();
      setUrls(data.urls);
    } catch (error) {
      console.log(error);
    }
  };


  const addUrl = async (newUrl) => {
    try {
      const savedUrl = await saveUrl(newUrl);
      setUrls([...urls, savedUrl]);
    } catch (error) {
      console.log(error);
    }
  };

  const removeUrl = async (id) => {
    try {
      await deleteUrl(id);
      setUrls(urls.filter(url => url.id !== id));
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <main className="App">
      <header>
        <h1>URL Shortener</h1>
        <UrlForm addUrl={addUrl} />
      </header>

      <UrlContainer urls={urls} removeUrl={removeUrl} />
    </main>
  );
}


export default App;
