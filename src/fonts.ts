import arFont from './assets/fonts/AnticallyRegular-OVox8.ttf';

export type Font = {
  name: string;
  src: string | File;
};

export async function loadFont({name, src}: Font) {
  const fontAlreadyLoaded = document.fonts.check(`10px ${name}`);

  if (!fontAlreadyLoaded) {
    const fontFace = new FontFace(
      name,
      typeof src === 'string' ? `url(${src})` : await src.arrayBuffer()
    );

    try {
      await fontFace.load();
      document.fonts.add(fontFace);
    } catch (e) {
      console.error(`Font ${name} failed to load`);
    }
  }
}

export const DEFAULT_FONT_LIST: Font[] = [
  {
    name: 'Antically Regular',
    src: arFont,
  },
  {
    name: 'Choko Milky',
    src: 'https://get.fontspace.co/webfont/gx8gR/ZDRkZjE0NmZkMDYyNDhhY2E0YzQ1ZDlkZjRmMDc5Mjcub3Rm/choko-milky.woff',
  },
  {
    name: 'Vegan Style',
    src: 'https://get.fontspace.co/webfont/5Y58/M2YzNDA2YWM1MWRmNDU4YjgzN2I0MTA1NmI5OGNjYmIudHRm/vegan-style-personal-use.woff',
  },
  {
    name: 'Country Side',
    src: 'https://get.fontspace.co/webfont/YdKj/Yjc5MDc4ZjkyNTAzNDVmYWE1MGE1ZWQxNTc0M2MzZTMudHRm/countryside.woff',
  },
  {
    name: 'Metalsmith Vintage',
    src: 'https://get.fontspace.co/webfont/p7ylO/YmYzZGQwNGUyNzkxNGQ0Mjk3ZWJlNzMzNDM0MWQ2ZmMub3Rm/metalsmith-regular.woff',
  },
  {
    name: 'Ginga font',
    src: 'https://get.fontspace.co/webfont/r09p/M2Y4NjQzNmE4ODk1NGVmYzkxODFhMzIzYTdkYmQxNjIudHRm/ginga.woff',
  },
];
