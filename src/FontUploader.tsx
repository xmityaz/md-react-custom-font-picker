import {useState} from 'react';
import {loadFont} from './fonts';

export type FontUploaderProps = {
  onFontUploaded?: (font?: string) => void;
};

export function FontUploader(props: FontUploaderProps) {
  const [isFontsLoading, setIsFontsLoading] = useState(false);

  const onFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];

    if (file) {
      setIsFontsLoading(true);

      const fontName = file?.name?.replace(/\.[^/.]+$/, '') || 'custom font';
      await loadFont({name: fontName, src: file});

      setIsFontsLoading(false);
      props.onFontUploaded?.(fontName);
    }
  };

  return isFontsLoading ? (
    <div>Loading...</div>
  ) : (
    <input type="file" accept=".ttf,.otf,.woff,woff2" onChange={onFileUpload} />
  );
}
