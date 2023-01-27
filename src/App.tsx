import {useState} from 'react';
import './App.css';
import {FontPicker} from './FontPicker';
import {FONT_LIST} from './fonts';
import classNames from 'classnames';

function App() {
  const [font, setFont] = useState<string>();

  return (
    <div className="App" style={{fontFamily: font}}>
      <h1 style={{fontFamily: font}}>
        The quick brown fox jumps over the lazy dog
      </h1>

      <div className="select-container">
        <FontPicker
          options={FONT_LIST}
          value={font}
          onChange={(e) => setFont(e?.value)}
        />
      </div>
    </div>
  );
}

export default App;
