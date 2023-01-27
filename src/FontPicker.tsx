import {useMemo, useState} from 'react';
import Select, {SingleValue} from 'react-select';
import {Font} from './fonts';

async function loadFont({name, href}: Font) {
  const fontAlreadyLoaded = document.fonts.check(`10px ${name}`);

  if (!fontAlreadyLoaded) {
    const fontFace = new FontFace(name, `url(${href})`);

    try {
      await fontFace.load();
      document.fonts.add(fontFace);
    } catch (e) {
      console.error(`Font ${name} failed to load`);
    }
  }
}

type FontOption = {
  label: string;
  value: string;
};

export type FontPickerProps = {
  options: Font[];
  value?: string;
  onChange: (value: SingleValue<FontOption>) => void;
};

export function FontPicker({options, ...props}: FontPickerProps) {
  const [loadingFonts, setLoadingFonts] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);

  const fontOptions = useMemo(
    () => options.map((font) => ({label: font.name, value: font.name})),
    [options]
  );
  const uploadFonts = async () => {
    if (!fontLoaded && !loadingFonts) {
      setLoadingFonts(true);

      const loadAllFonts = options.map((font) => loadFont(font));
      await Promise.all(loadAllFonts);
    }

    setLoadingFonts(false);
    setFontLoaded(true);
  };

  return (
    <Select
      value={props.value ? {label: props.value, value: props.value} : null}
      onChange={props.onChange}
      options={fontLoaded ? fontOptions : undefined}
      isLoading={loadingFonts}
      onFocus={uploadFonts}
      styles={{
        option: (style, {data}) => ({
          ...style,
          fontFamily: data.value,
          color: '#212121',
        }),
        control: (style, cp) => ({
          ...style,
          fontFamily: cp.getValue()?.[0]?.value,
        }),
      }}
    />
  );
}
