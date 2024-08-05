import React from 'react';
import './UrlContainer.css';

const UrlContainer = ({ urls, removeUrl }) => {
  const urlEls = urls.map(url => {
    return (
      <div key={url.id} className="url">
        <h3>{url.title}</h3>
        <a href={url.short_url} target="_blank" rel="noopener noreferrer">{url.short_url}</a>
        <p>{url.long_url}</p>
        <button onClick={() => removeUrl(url.id)}>Delete</button>
      </div>
    );
  });

  return (
    <section>
      {urlEls.length ? urlEls : <p>No urls yet! Find some to shorten!</p>}
    </section>
  );
}

export default UrlContainer;