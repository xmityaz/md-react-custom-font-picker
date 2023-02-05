import {useMemo, useState} from 'react';
import Select, {SingleValue} from 'react-select';
import {Font, loadFont} from './fonts';

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
  const [isFontsLoading, setIsFontsLoading] = useState(false);
  const [isFontsReady, setIsFontsReady] = useState(false);

  const fontOptions = useMemo(
    () => options.map((font) => ({label: font.name, value: font.name})),
    [options]
  );
  const uploadFonts = async () => {
    if (!isFontsReady && !isFontsLoading) {
      setIsFontsLoading(true);

      const loadAllFonts = options.map((font) => loadFont(font));
      await Promise.all(loadAllFonts);
    }

    setIsFontsLoading(false);
    setIsFontsReady(true);
  };

  return (
    <Select
      value={props.value ? {label: props.value, value: props.value} : null}
      onChange={props.onChange}
      options={isFontsReady ? fontOptions : undefined}
      isLoading={isFontsLoading}
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
