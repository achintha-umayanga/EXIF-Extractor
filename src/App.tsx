import React, { useState, useEffect } from 'react';
import './App.css';
import ImageUploader from './components/ImageUploader';
import MetaDataExtractor from './components/MetaDataExtractor';
import MetaDataDisplay from './components/MetaDataDisplay';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [meta, setMeta] = useState<Record<string, unknown> | null>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  // Update image preview when file changes
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setImgUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setImgUrl(null);
    }
  }, [file]);

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: 24 }}>
      <h1>Image Metadata Viewer</h1>
      <ImageUploader onImageSelected={setFile} />
      {file && (
        <div style={{ margin: '16px 0' }}>
          <strong>Selected file:</strong> {file.name}
        </div>
      )}
      {imgUrl && (
        <div style={{ margin: '24px 0', textAlign: 'center' }}>
          <img src={imgUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: 350, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
        </div>
      )}
      <MetaDataExtractor file={file} onExtracted={setMeta} />
      <MetaDataDisplay meta={meta} />
    </div>
  );
}

export default App;
