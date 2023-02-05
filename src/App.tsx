import {useState} from 'react';
import {FontPicker} from './FontPicker';
import {DEFAULT_FONT_LIST} from './fonts';
import {FontUploader} from './FontUploader';
import './App.css';

export function App() {
  const [font, setFont] = useState<string>();

  return (
    <div className="App" style={{fontFamily: font}}>
      <h1 style={{fontFamily: font}}>
        The quick brown fox jumps over the lazy dog
      </h1>

      <div className="select-container">
        <FontPicker
          options={DEFAULT_FONT_LIST}
          value={font}
          onChange={(e) => setFont(e?.value)}
        />
      </div>

      <div className="uploader-container">
        <FontUploader
          onFontUploaded={(font?: string) => font && setFont(font)}
        />
      </div>
    </div>
  );
}
