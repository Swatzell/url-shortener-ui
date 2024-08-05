import React, { useState, useEffect } from 'react';
import './App.css';
import { getUrls, saveUrl, deleteUrl } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

function App () {
  const [urls, setUrls] = useState([]);

  useEffect(() => {

  })

  return (
    <main className="App">
      <header>
        <h1>URL Shortener</h1>
        <UrlForm />
      </header>

      <UrlContainer urls={"<<<Urls should go here>>>"}/>
    </main>
  );
}

export default App;
