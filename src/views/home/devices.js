// This list of common devices was put together from various online sources by me, Jan Keromnes.
//
// The device features are:
// - name: The device brand and model(s).
// - width: The viewport width.
// - height: The viewport height.
// - pixelratio: The screen's pixel ratio (e.g. HiDPI > 1).
// - useragent: The device's Useragent string on the web.
// - touch: Whether the device's screen is touch-enabled.
//
// The different types of devices are:
// - phones (sources: [1] + various)
// - tablets (sources: [1] + various)
// - notebooks (sources: [1])
// - televisions (sources: various)
// - watches (sources: various)
//
// [1] https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/devtools/front_end/toolbox/OverridesUI.js

// currently our website only displays phone and tablet options all in one array called devices

export const userAgentOptions = {
  devices: [
    {
      name: 'Apple iPhone 3GS',
      text: 'Apple iPhone 3GS',
      value: 'Apple iPhone 3GS',
      width: 320,
      height: 480,
      pixelratio: 1,
      useragent:
        'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_2_1 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8C148 Safari/6533.18.5',
      touch: 'true',
    },
    {
      name: 'Apple iPhone 4',
      text: 'Apple iPhone 4',
      value: 'Apple iPhone 4',
      width: 320,
      height: 480,
      pixelratio: 2,
      useragent:
        'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_2_1 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8C148 Safari/6533.18.5',
      touch: 'true',
    },
    {
      name: 'Apple iPhone 5',
      text: 'Apple iPhone 5',
      value: 'Apple iPhone 5',
      width: 320,
      height: 568,
      pixelratio: 2,
      useragent:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X; en-us) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53',
      touch: 'true',
    },
    {
      name: 'Apple iPhone 6',
      text: 'Apple iPhone 6',
      value: 'Apple iPhone 6',
      width: 375,
      height: 667,
      pixelratio: 2,
      useragent:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4',
      touch: 'true',
    },
    {
      name: 'Apple iPhone 6 Plus',
      text: 'Apple iPhone 6 Plus',
      value: 'Apple iPhone 6 Plus',
      width: 414,
      height: 736,
      pixelratio: 3,
      useragent:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4',
      touch: 'true',
    },
    {
      name: 'BlackBerry Z10',
      text: 'BlackBerry Z10',
      value: 'BlackBerry Z10',
      width: 384,
      height: 640,
      pixelratio: 2,
      useragent:
        'Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.0.9.2372 Mobile Safari/537.10+',
      touch: 'true',
    },
    {
      name: 'BlackBerry Z30',
      text: 'BlackBerry Z30',
      value: 'BlackBerry Z30',
      width: 360,
      height: 640,
      pixelratio: 2,
      useragent:
        'Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.0.9.2372 Mobile Safari/537.10+',
      touch: 'true',
    },
    {
      name: 'Google Nexus 4',
      text: 'Google Nexus 4',
      value: 'Google Nexus 4',
      width: 384,
      height: 640,
      pixelratio: 2,
      useragent:
        'Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 4 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19',
      touch: 'true',
    },
    {
      name: 'Google Nexus 5',
      text: 'Google Nexus 5',
      value: 'Google Nexus 5',
      width: 360,
      height: 640,
      pixelratio: 3,
      useragent:
        'Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 5 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19',
      touch: 'true',
    },
    {
      name: 'HTC Evo, Touch HD, Desire HD, Desire',
      text: 'HTC Evo, Touch HD, Desire HD, Desire',
      value: 'HTC Evo, Touch HD, Desire HD, Desire',
      width: 320,
      height: 533,
      pixelratio: 1.5,
      useragent:
        'Mozilla/5.0 (Linux; U; Android 2.2; en-us; Sprint APA9292KT Build/FRF91) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
      touch: 'true',
    },
    {
      name: 'HTC One X, EVO LTE',
      text: 'HTC One X, EVO LTE',
      value: 'HTC One X, EVO LTE',
      width: 360,
      height: 640,
      pixelratio: 2,
      useragent:
        'Mozilla/5.0 (Linux; Android 4.0.3; HTC One X Build/IML74K) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19',
      touch: 'true',
    },
    {
      name: 'HTC Sensation, Evo 3D',
      text: 'HTC Sensation, Evo 3D',
      value: 'HTC Sensation, Evo 3D',
      width: 360,
      height: 640,
      pixelratio: 1.5,
      useragent:
        'Mozilla/5.0 (Linux; U; Android 4.0.3; en-us; HTC Sensation Build/IML74K) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
      touch: 'true',
    },
    {
      name: 'LG Optimus 2X, Optimus 3D, Optimus Black',
      text: 'LG Optimus 2X, Optimus 3D, Optimus Black',
      value: 'LG Optimus 2X, Optimus 3D, Optimus Black',
      width: 320,
      height: 533,
      pixelratio: 1.5,
      useragent:
        'Mozilla/5.0 (Linux; U; Android 2.2; en-us; LG-P990/V08c Build/FRG83) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1 MMS/LG-Android-MMS-V1.0/1.2',
      touch: 'true',
    },
    {
      name: 'LG Optimus G',
      text: 'LG Optimus G',
      value: 'LG Optimus G',
      width: 384,
      height: 640,
      pixelratio: 2,
      useragent:
        'Mozilla/5.0 (Linux; Android 4.0; LG-E975 Build/IMM76L) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19',
      touch: 'true',
    },
    {
      name: 'LG Optimus LTE, Optimus 4X HD',
      text: 'LG Optimus LTE, Optimus 4X HD',
      value: 'LG Optimus LTE, Optimus 4X HD',
      width: 424,
      height: 753,
      pixelratio: 1.7,
      useragent:
        'Mozilla/5.0 (Linux; U; Android 2.3; en-us; LG-P930 Build/GRJ90) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
      touch: 'true',
    },
    {
      name: 'LG Optimus One',
      text: 'LG Optimus One',
      value: 'LG Optimus One',
      width: 213,
      height: 320,
      pixelratio: 1.5,
      useragent:
        'Mozilla/5.0 (Linux; U; Android 2.2.1; en-us; LG-MS690 Build/FRG83) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
      touch: 'true',
    },
    {
      name: 'Motorola Defy, Droid, Droid X, Milestone',
      text: 'Motorola Defy, Droid, Droid X, Milestone',
      value: 'Motorola Defy, Droid, Droid X, Milestone',
      width: 320,
      height: 569,
      pixelratio: 1.5,
      useragent:
        'Mozilla/5.0 (Linux; U; Android 2.0; en-us; Milestone Build/ SHOLS_U2_01.03.1) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/530.17',
      touch: 'true',
    },
    {
      name: 'Motorola Droid 3, Droid 4, Droid Razr, Atrix 4G, Atrix 2',
      text: 'Motorola Droid 3, Droid 4, Droid Razr, Atrix 4G, Atrix 2',
      value: 'Motorola Droid 3, Droid 4, Droid Razr, Atrix 4G, Atrix 2',
      width: 540,
      height: 960,
      pixelratio: 1,
      useragent:
        'Mozilla/5.0 (Linux; U; Android 2.2; en-us; Droid Build/FRG22D) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
      touch: 'true',
    },
    {
      name: 'Motorola Droid Razr HD',
      text: 'Motorola Droid Razr HD',
      value: 'Motorola Droid Razr HD',
      width: 720,
      height: 1280,
      pixelratio: 1,
      useragent:
        'Mozilla/5.0 (Linux; U; Android 2.3; en-us; DROID RAZR 4G Build/6.5.1-73_DHD-11_M1-29) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
      touch: 'true',
    },
    {
      name: 'Nokia C5, C6, C7, N97, N8, X7',
      text: 'Nokia C5, C6, C7, N97, N8, X7',
      value: 'Nokia C5, C6, C7, N97, N8, X7',
      width: 360,
      height: 640,
      pixelratio: 1,
      useragent:
        'NokiaN97/21.1.107 (SymbianOS/9.4; Series60/5.0 Mozilla/5.0; Profile/MIDP-2.1 Configuration/CLDC-1.1) AppleWebkit/525 (KHTML, like Gecko) BrowserNG/7.1.4',
      touch: 'true',
    },
    {
      name: 'Samsung Galaxy Note 3',
      text: 'Samsung Galaxy Note 3',
      value: 'Samsung Galaxy Note 3',
      width: 360,
      height: 640,
      pixelratio: 3,
      useragent:
        'Mozilla/5.0 (Linux; U; Android 4.3; en-us; SM-N900T Build/JSS15J) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
      touch: 'true',
    },
    {
      name: 'Samsung Galaxy Note II',
      text: 'Samsung Galaxy Note II',
      value: 'Samsung Galaxy Note II',
      width: 360,
      height: 640,
      pixelratio: 2,
      useragent:
        'Mozilla/5.0 (Linux; U; Android 4.1; en-us; GT-N7100 Build/JRO03C) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
      touch: 'true',
    },
    {
      name: 'Samsung Galaxy Note',
      text: 'Samsung Galaxy Note',
      value: 'Samsung Galaxy Note',
      width: 400,
      height: 640,
      pixelratio: 2,
      useragent:
        'Mozilla/5.0 (Linux; U; Android 2.3; en-us; SAMSUNG-SGH-I717 Build/GINGERBREAD) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
      touch: 'true',
    },
    {
      name: 'Samsung Galaxy S III, Galaxy Nexus',
      text: 'Samsung Galaxy S III, Galaxy Nexus',
      value: 'Samsung Galaxy S III, Galaxy Nexus',
      width: 360,
      height: 640,
      pixelratio: 2,
      useragent:
        'Mozilla/5.0 (Linux; U; Android 4.0; en-us; GT-I9300 Build/IMM76D) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
      touch: 'true',
    },
    {
      name: 'Samsung Galaxy S, S II, W',
      text: 'Samsung Galaxy S, S II, W',
      value: 'Samsung Galaxy S, S II, W',
      width: 320,
      height: 533,
      pixelratio: 1.5,
      useragent:
        'Mozilla/5.0 (Linux; U; Android 2.1; en-us; GT-I9000 Build/ECLAIR) AppleWebKit/525.10+ (KHTML, like Gecko) Version/3.0.4 Mobile Safari/523.12.2',
      touch: 'true',
    },
    {
      name: 'Samsung Galaxy S4',
      text: 'Samsung Galaxy S4',
      value: 'Samsung Galaxy S4',
      width: 360,
      height: 640,
      pixelratio: 3,
      useragent:
        'Mozilla/5.0 (Linux; Android 4.2.2; GT-I9505 Build/JDQ39) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.59 Mobile Safari/537.36',
      touch: 'true',
    },
    {
      name: 'LG Fireweb',
      text: 'LG Fireweb',
      value: 'LG Fireweb',
      width: 320,
      height: 480,
      pixelratio: 1,
      useragent:
        'Mozilla/5.0 (Mobile; LG-D300; rv:28.0) Gecko/28.0 Firefox/28.0',
      touch: 'true',
    },
    {
      name: 'Amazon Kindle Fire HDX 7″',
      text: 'Amazon Kindle Fire HDX 7″',
      value: 'Amazon Kindle Fire HDX 7″',
      width: 1920,
      height: 1200,
      pixelratio: 2,
      useragent:
        'Mozilla/5.0 (Linux; U; en-us; KFTHWI Build/JDQ39) AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.13 Safari/535.19 Silk-Accelerated="true"',
      touch: 'true',
    },
    {
      name: 'Amazon Kindle Fire HDX 8.9″',
      text: 'Amazon Kindle Fire HDX 8.9″',
      value: 'Amazon Kindle Fire HDX 8.9″',
      width: 2560,
      height: 1600,
      pixelratio: 2,
      useragent:
        'Mozilla/5.0 (Linux; U; en-us; KFAPWI Build/JDQ39) AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.13 Safari/535.19 Silk-Accelerated="true"',
      touch: 'true',
    },
    {
      name: 'Amazon Kindle Fire (First Generation)',
      text: 'Amazon Kindle Fire (First Generation)',
      value: 'Amazon Kindle Fire (First Generation)',
      width: 1024,
      height: 600,
      pixelratio: 1,
      useragent:
        'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; en-us; Silk/1.0.141.16-Gen4_11004310) AppleWebkit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16 Silk-Accelerated="true"',
      touch: 'true',
    },
    {
      name: 'Apple iPad 1 / 2 / iPad Mini',
      text: 'Apple iPad 1 / 2 / iPad Mini',
      value: 'Apple iPad 1 / 2 / iPad Mini',
      width: 1024,
      height: 768,
      pixelratio: 1,
      useragent:
        'Mozilla/5.0 (iPad; CPU OS 4_3_5 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8L1 Safari/6533.18.5',
      touch: 'true',
    },
    {
      name: 'Apple iPad 3 / 4',
      text: 'Apple iPad 3 / 4',
      value: 'Apple iPad 3 / 4',
      width: 1024,
      height: 768,
      pixelratio: 2,
      useragent:
        'Mozilla/5.0 (iPad; CPU OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53',
      touch: 'true',
    },
    {
      name: 'Google Nexus 10',
      text: 'Google Nexus 10',
      value: 'Google Nexus 10',
      width: 1280,
      height: 800,
      pixelratio: 2,
      useragent:
        'Mozilla/5.0 (Linux; Android 4.3; Nexus 10 Build/JSS15Q) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.72 Safari/537.36',
      touch: 'true',
    },
    {
      name: 'Google Nexus 7 2',
      text: 'Google Nexus 7 2',
      value: 'Google Nexus 7 2',
      width: 960,
      height: 600,
      pixelratio: 2,
      useragent:
        'Mozilla/5.0 (Linux; Android 4.3; Nexus 7 Build/JSS15Q) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.72 Safari/537.36',
      touch: 'true',
    },
    {
      name: 'Google Nexus 7',
      text: 'Google Nexus 7',
      value: 'Google Nexus 7',
      width: 966,
      height: 604,
      pixelratio: 1.325,
      useragent:
        'Mozilla/5.0 (Linux; Android 4.3; Nexus 7 Build/JSS15Q) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.72 Safari/537.36',
      touch: 'true',
    },
    {
      name: 'Samsung Galaxy Tab 7.7, 8.9, 10.1',
      text: 'Samsung Galaxy Tab 7.7, 8.9, 10.1',
      value: 'Samsung Galaxy Tab 7.7, 8.9, 10.1',
      width: 1280,
      height: 800,
      pixelratio: 1,
      useragent:
        'Mozilla/5.0 (Linux; U; Android 2.2; en-us; SCH-I800 Build/FROYO) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
      touch: 'true',
    },
    {
      name: 'Samsung Galaxy Tab',
      text: 'Samsung Galaxy Tab',
      value: 'Samsung Galaxy Tab',
      width: 1024,
      height: 600,
      pixelratio: 1,
      useragent:
        'Mozilla/5.0 (Linux; U; Android 2.2; en-us; SCH-I800 Build/FROYO) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
      touch: 'true',
    },
  ],
  televisions: [
    {
      name: 'Matchstick',
      width: 1280,
      height: 720,
      pixelratio: 1,
      useragent: 'Mozilla/5.0 (Mobile; rv:28.0) Gecko/28.0 Firefox/28.0',
      touch: false,
    },
    {
      name: 'Chromecast',
      width: 1280,
      height: 720,
      pixelratio: 1,
      useragent:
        'Mozilla/5.0 (CrKey armv7l 1.4.15250) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.0 Safari/537.36',
      touch: false,
    },
    {
      name: '720p HD Television',
      width: 1280,
      height: 720,
      pixelratio: 1,
      useragent: '',
      touch: false,
    },
    {
      name: '1080p Full HD Television',
      width: 1920,
      height: 1080,
      pixelratio: 1,
      useragent: '',
      touch: false,
    },
    {
      name: '4K Ultra HD Television',
      width: 3840,
      height: 2160,
      pixelratio: 1,
      useragent: '',
      touch: false,
    },
  ],
  watches: [
    {
      name: 'LG G Watch',
      width: 280,
      height: 280,
      pixelratio: 1,
      useragent: '',
      touch: 'true',
    },
    {
      name: 'LG G Watch R',
      width: 320,
      height: 320,
      pixelratio: 1,
      useragent: '',
      touch: 'true',
    },
    {
      name: 'Moto 360',
      width: 320,
      height: 290,
      pixelratio: 1,
      useragent: '',
      touch: 'true',
    },
    {
      name: 'Samsung Gear Live',
      width: 320,
      height: 320,
      pixelratio: 1,
      useragent: '',
      touch: 'true',
    },
  ],
};
