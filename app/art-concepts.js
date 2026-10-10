/* 개념별 핵심 그림 — 개념 하나하나에 서로 다른 그림이 붙는다.
   픽토그램(G) + 배치 틀(T) + 개념별 지정(SPEC)의 조합으로 만든다. */
(function () {
  'use strict';
  var INK = '#1b2330', SUB = '#6b7688';
  function s(c, w) {
    return 'fill="none" stroke="' + (c || INK) + '" stroke-width="' + (w || 1.8) +
      '" stroke-linecap="round" stroke-linejoin="round"';
  }
  var B = s();                       // 기본 선
  var CO = {
    blue: '#2f6df6', red: '#ef4444', green: '#16a34a', amber: '#f59e0b',
    purple: '#a855f7', sky: '#0ea5e9', pink: '#ec4899', brown: '#92400e',
    gray: '#94a3b8', teal: '#14b8a6'
  };

  /* ───── 픽토그램 (24×24 기준) ───── */
  var G = {
    person: '<circle cx="12" cy="6.5" r="3.2" ' + B + '/><path d="M5.5 21v-3a6.5 6.5 0 0 1 13 0v3" ' + B + '/>',
    people: '<circle cx="8" cy="7" r="2.8" ' + B + '/><circle cx="16.5" cy="7.5" r="2.4" ' + B + '/>' +
      '<path d="M2.5 20v-2.5A5.5 5.5 0 0 1 13 17v3M14 15.5a5 5 0 0 1 7.5 4.3V20" ' + B + '/>',
    crowd: '<circle cx="6" cy="8" r="2.4" ' + B + '/><circle cx="12" cy="6.5" r="2.6" ' + B + '/>' +
      '<circle cx="18" cy="8" r="2.4" ' + B + '/><path d="M2 20v-2a4 4 0 0 1 8 0M8 20v-3a4 4 0 0 1 8 0M14 20v-2a4 4 0 0 1 8 0v2" ' + B + '/>',
    child: '<circle cx="12" cy="7" r="3.6" ' + B + '/><path d="M7 21v-4a5 5 0 0 1 10 0v4M9 6.5l-2-2M15 6.5l2-2" ' + B + '/>',
    elder: '<circle cx="11" cy="6" r="3" ' + B + '/><path d="M6 21l2-8a4 4 0 0 1 7 0l1 8M18 10v11" ' + B + '/>',
    baby: '<circle cx="12" cy="9" r="6" ' + B + '/><path d="M9.5 8.5h.01M14.5 8.5h.01M10 12q2 1.5 4 0M12 15v6M8 21h8" ' + B + '/>',

    clock: '<circle cx="12" cy="12" r="9" ' + B + '/><path d="M12 7v5.5l3.5 2" ' + B + '/>',
    hourglass: '<path d="M6 3h12M6 21h12M7 3q0 6 5 9-5 3-5 9M17 3q0 6-5 9 5 3 5 9" ' + B + '/>',
    calendar: '<rect x="3.5" y="5" width="17" height="15" rx="2" ' + B + '/><path d="M3.5 10h17M8 3v4M16 3v4M8 14h3" ' + B + '/>',

    map: '<path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z" ' + B + '/><path d="M9 3v15M15 6v15" ' + B + '/>',
    pin: '<path d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12z" ' + B + '/><circle cx="12" cy="9" r="2.6" ' + B + '/>',
    globe: '<circle cx="12" cy="12" r="9" ' + B + '/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18" ' + B + '/>',
    flag: '<path d="M5 21V3M5 4h12l-2.5 4L17 12H5" ' + B + '/>',
    border: '<path d="M12 2v20" ' + s(CO.red, 2) + ' stroke-dasharray="3 3"/><path d="M4 8h4M16 8h4M4 16h4M16 16h4" ' + B + '/>',

    house: '<path d="M3.5 11L12 4l8.5 7v9h-17z" ' + B + '/><path d="M9.5 20v-6h5v6" ' + B + '/>',
    stilt: '<path d="M4 9L12 3l8 6" ' + B + '/><path d="M6 9h12v6H6z" ' + B + '/>' +
      '<path d="M7.5 15v6M11 15v6M14.5 15v6M18 15v6" ' + B + '/>',
    flathouse: '<path d="M3.5 9h17v11h-17z" ' + B + '/><path d="M2 9h20M8 13h3M14 13h3M10 20v-4h4v4" ' + B + '/>',
    hanok: '<path d="M2.5 9q9.5-6 19 0" ' + B + '/><path d="M5 9h14v11H5z" ' + B + '/>' +
      '<path d="M9 9v11M15 9v11M5 14h14" ' + B + '/>',
    cabin: '<path d="M3 9l9-6 9 6" ' + B + '/><path d="M5 9h14v11H5z" ' + B + '/><path d="M5 13h14M5 17h14" ' + B + '/>',
    igloo: '<path d="M2.5 20a9.5 9.5 0 0 1 19 0z" ' + B + '/><path d="M9 20v-4a3 3 0 0 1 6 0v4M4 14h16" ' + B + '/>',
    tower: '<path d="M6 21V5h12v16z" ' + B + '/><path d="M9 9h2M13 9h2M9 13h2M13 13h2M10 21v-4h4v4" ' + B + '/>',
    factory: '<path d="M2.5 21h19M4 21V10l5 3V10l5 3V6h5v15" ' + B + '/>' +
      '<path d="M6 7q-1.5-2 0-3.5" ' + s(CO.gray, 1.6) + '/><path d="M17 12h2M17 16h2" ' + B + '/>',
    school: '<path d="M3 10l9-5 9 5v11H3z" ' + B + '/><path d="M9 21v-6h6v6M12 5V2" ' + B + '/>',
    hospital: '<rect x="4" y="6" width="16" height="15" rx="2" ' + B + '/><path d="M12 9v7M8.5 12.5h7" ' + s(CO.red, 2) + '/>',
    bank: '<path d="M3 9l9-5 9 5M4 9v10M9 9v10M15 9v10M20 9v10M2.5 21h19" ' + B + '/>',
    capitol: '<path d="M3 21h18M5 21V10M10 21V10M14 21V10M19 21V10M2.5 10h19L12 3z" ' + B + '/>',
    court: '<path d="M12 3v18M6 21h12M5 8h14" ' + B + '/><path d="M5 8l-2.5 5a2.5 2.5 0 0 0 5 0zM19 8l2.5 5a2.5 2.5 0 0 1-5 0z" ' + B + '/>',
    tent: '<path d="M12 3L3 20h18z" ' + B + '/>' +
          '<path d="M12 10l-3.4 10M12 10l3.4 10" ' + B + '/>' +
          '<path d="M2 20h20" ' + B + '/>',

    tree: '<path d="M12 3l6 9h-4l4 6H6l4-6H6z" ' + s(CO.green, 1.8) + '/><path d="M12 18v3" ' + B + '/>',
    palm: '<path d="M12 21q1-9 0-13" ' + s(CO.brown, 1.8) + '/>' +
      '<path d="M12 8q-6-3-8 1M12 8q6-3 8 1M12 8q-3-5-8-4M12 8q3-5 8-4" ' + s(CO.green, 1.8) + '/>',
    cactus: '<path d="M12 21V6M12 13H8V9M12 15h4v-4" ' + s(CO.green, 2) + '/><path d="M8 21h8" ' + B + '/>',
    pine: '<path d="M12 3l4 6h-8zM12 8l5 7H7zM12 13l6 7H6z" ' + s(CO.green, 1.8) + '/><path d="M12 20v1" ' + B + '/>',
    mountain: '<path d="M2 20l7-12 4 6 3-4 6 10z" ' + B + '/><path d="M7.5 12.5h3" ' + B + '/>',
    sun: '<circle cx="12" cy="12" r="5" ' + s(CO.amber, 2) + '/>' +
      '<path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M5 5l1.8 1.8M17.2 17.2L19 19M19 5l-1.8 1.8M6.8 17.2L5 19" ' + s(CO.amber, 1.8) + '/>',
    rain: '<path d="M6.5 13a4.5 4.5 0 0 1 .6-9 6 6 0 0 1 11.2 2A3.7 3.7 0 0 1 17.5 13z" ' + B + '/>' +
      '<path d="M8 17l-1 3M13 17l-1 3M18 17l-1 3" ' + s(CO.sky, 2) + '/>',
    snow: '<path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" ' + s(CO.sky, 1.8) + '/>',
    wind: '<path d="M3 8h11a3 3 0 1 0-3-3M3 13h15a3 3 0 1 1-3 3M3 18h8" ' + B + '/>',
    fire: '<path d="M12 21c4 0 6.5-2.6 6.5-6 0-4.5-4.5-5-3.5-12-4 2-8 5.5-8 11 0 3.7 2.5 7 5 7z" ' + s(CO.red, 1.8) + '/>',
    quake: '<path d="M2 15h4l3-7 3 12 3-9 2 4h5" ' + s(CO.red, 2) + '/><path d="M2 20h20" ' + B + '/>',
    leaf: '<path d="M4 20C4 9 12 4 21 4c0 10-7 16-17 16z" ' + s(CO.green, 1.8) + '/><path d="M8 16q5-5 11-8" ' + B + '/>',
    seed: '<path d="M12 21v-8q0-5 6-6 0 6-6 6M12 15q0-4-5-5 0 4 5 5" ' + s(CO.green, 1.8) + '/><path d="M8 21h8" ' + B + '/>',
    bird: '<path d="M3 9q5-4 9 0 4-4 9 0-4 9-9 9T3 9z" ' + B + '/>',
    fish: '<path d="M3 12q6-6 12 0-6 6-12 0z" ' + B + '/><path d="M15 12l6-4v8z" ' + B + '/><path d="M7 11h.01" ' + B + '/>',
    water: '<path d="M12 3s7 8 7 12a7 7 0 0 1-14 0c0-4 7-12 7-12z" ' + s(CO.sky, 1.8) + '/>',

    book: '<path d="M4 4h7a3 3 0 0 1 3 3v13a3 3 0 0 0-3-3H4z" ' + B + '/>' +
      '<path d="M20 4h-6v13h6z" ' + B + '/>',
    lawbook: '<rect x="4" y="4" width="16" height="16" rx="2" ' + B + '/>' +
      '<path d="M12 8v8M9 12h6" ' + s(CO.blue, 2) + '/>',
    doc: '<path d="M6 3h8l4 4v14H6z" ' + B + '/><path d="M14 3v4h4M9 12h6M9 16h4" ' + B + '/>',
    stamp: '<path d="M7 21h10M9 17h6v-2H9z" ' + B + '/><path d="M12 15V9a2.5 2.5 0 1 1 2.5-2.5" ' + B + '/>' +
      '<circle cx="12" cy="6" r="3" ' + s(CO.red, 1.8) + '/>',
    scale: '<path d="M12 4v17M7 21h10M4 8h16" ' + B + '/>' +
      '<path d="M4 8l-2 5a2 2 0 0 0 4 0zM20 8l2 5a2 2 0 0 1-4 0z" ' + B + '/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.4 8.6-8 10-4.6-1.4-8-5-8-10V6z" ' + s(CO.blue, 1.8) + '/>',
    gavel: '<path d="M3 21h9M4 14l7-7M7 5l6 6M10 2l6 6M13 11l6-6" ' + B + '/>',
    ballot: '<rect x="3" y="10" width="18" height="11" rx="2" ' + B + '/>' +
      '<path d="M9 10V4h6v6M9 6h6" ' + B + '/><path d="M10 14l1.5 1.5L14 13" ' + s(CO.blue, 2) + '/>',
    coin: '<circle cx="12" cy="12" r="8" ' + s(CO.amber, 2) + '/><path d="M9 10h6M9 14h6M12 7v10" ' + B + '/>',
    bill: '<rect x="2.5" y="7" width="19" height="10" rx="1.5" ' + B + '/><circle cx="12" cy="12" r="2.6" ' + B + '/>',
    piggy: '<path d="M4 13a7 5 0 0 1 14 0v4h-3l-1 3h-2l-1-3H6z" ' + s(CO.pink, 1.8) + '/>' +
      '<path d="M10 8V6M16 12h.01" ' + B + '/>',
    chartup: '<path d="M3 20V4M3 20h18" ' + B + '/><path d="M6 16l4-5 3 3 6-8" ' + s(CO.green, 2.2) + '/>',
    chartdown: '<path d="M3 20V4M3 20h18" ' + B + '/><path d="M6 8l4 5 3-3 6 8" ' + s(CO.red, 2.2) + '/>',
    bars: '<path d="M3 20V4M3 20h18" ' + B + '/><path d="M7 20v-6M12 20v-10M17 20v-4" ' + s(CO.blue, 2.6) + '/>',
    pie: '<circle cx="12" cy="12" r="8" ' + B + '/><path d="M12 4v8l6 4" ' + B + '/>',
    scurve: '<path d="M3 20V4M3 20h18" ' + B + '/><path d="M5 18q5 0 7-6t7-6" ' + s(CO.blue, 2.2) + '/>',
    pyramid: '<path d="M12 4l8 16H4z" ' + B + '/><path d="M8 14h8M6.5 17h11" ' + B + '/>',
    cart: '<path d="M2 4h3l2.5 11h11L21 7H6" ' + B + '/><circle cx="9" cy="19" r="1.6" ' + B + '/>' +
      '<circle cx="18" cy="19" r="1.6" ' + B + '/>',
    basket: '<path d="M3 8h18l-2 12H5z" ' + B + '/><path d="M8 8l2-5M16 8l-2-5" ' + B + '/>',
    bulb: '<path d="M9 17h6M10 20h4" ' + B + '/><path d="M12 3a6 6 0 0 0-3 11v3h6v-3a6 6 0 0 0-3-11z" ' + s(CO.amber, 1.8) + '/>',
    magnifier: '<circle cx="10.5" cy="10.5" r="6.5" ' + B + '/><path d="M15.5 15.5L21 21" ' + s(INK, 2.2) + '/>',
    handshake: '<path d="M3 12l4-4 5 4 5-4 4 4-5 6-4-3-4 3z" ' + B + '/>',
    heart: '<path d="M12 20s-8-5-8-10a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5-8 10-8 10z" ' + s(CO.red, 1.8) + '/>',
    lock: '<rect x="5" y="10" width="14" height="11" rx="2" ' + B + '/><path d="M8 10V7a4 4 0 0 1 8 0v3" ' + B + '/>',
    unlock: '<rect x="5" y="10" width="14" height="11" rx="2" ' + B + '/><path d="M8 10V7a4 4 0 0 1 7.5-2" ' + B + '/>',
    chain: '<path d="M9 15l6-6" ' + B + '/><path d="M7.5 17.5a4 4 0 0 1 0-5.6l2-2M16.5 6.5a4 4 0 0 1 0 5.6l-2 2" ' + B + '/>',
    chainbreak: '<path d="M7 17a4 4 0 0 1 0-5.6l1.5-1.5M17 7a4 4 0 0 1 0 5.6L15.5 14" ' + B + '/>' +
      '<path d="M12 4v3M12 17v3M19 12h-3M8 12H5" ' + s(CO.red, 1.8) + '/>',
    key: '<circle cx="7.5" cy="12" r="4" ' + B + '/><path d="M11.5 12H21M18 12v3M15 12v2.5" ' + B + '/>',
    umbrella: '<path d="M2.5 12a9.5 9.5 0 0 1 19 0z" ' + B + '/><path d="M12 12v7a2.5 2.5 0 0 0 5 0" ' + B + '/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3" ' + B + '/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M8.5 21h7" ' + B + '/>',
    megaphone: '<path d="M4 10v4l12 5V5z" ' + B + '/><path d="M16 9a3 3 0 0 1 0 6" ' + B + '/>',
    ship: '<path d="M3 17h18l-2 4H5z" ' + B + '/><path d="M6 17V9h10l3 8M11 9V4l7 3" ' + B + '/>',
    train: '<rect x="5" y="4" width="14" height="12" rx="3" ' + B + '/>' +
      '<path d="M7 9h10M8 20l-2 2M16 20l2 2M9 16v2M15 16v2" ' + B + '/>',
    plane: '<path d="M12 2l2 8 8 3-8 2-2 7-2-7-8-2 8-3z" ' + B + '/>',
    phone: '<rect x="7" y="2.5" width="10" height="19" rx="2.5" ' + B + '/><path d="M11 18.5h2" ' + B + '/>',
    tv: '<rect x="3" y="6" width="18" height="12" rx="2" ' + B + '/><path d="M8 21h8M8 6l4-3 4 3" ' + B + '/>',
    laptop: '<path d="M5 5h14v10H5z" ' + B + '/><path d="M2.5 19h19l-2.5-4H5z" ' + B + '/>',
    wifi: '<path d="M4 9a13 13 0 0 1 16 0M7 13a8 8 0 0 1 10 0" ' + B + '/><circle cx="12" cy="18" r="1.6" fill="' + INK + '"/>',
    satellite: '<circle cx="12" cy="12" r="3" ' + B + '/><path d="M6 6l3 3M18 18l-3-3M6 18l3-3M18 6l-3 3" ' + B + '/>' +
      '<path d="M3 12h2M19 12h2" ' + B + '/>',
    robot: '<rect x="4" y="7" width="16" height="13" rx="3" ' + B + '/>' +
      '<path d="M9 12h.01M15 12h.01M9.5 16h5M12 7V4" ' + B + '/>',
    gear: '<circle cx="12" cy="12" r="3.5" ' + B + '/>' +
      '<path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" ' + B + '/>',
    network: '<circle cx="12" cy="5" r="2.5" ' + B + '/><circle cx="5" cy="18" r="2.5" ' + B + '/>' +
      '<circle cx="19" cy="18" r="2.5" ' + B + '/><path d="M10.5 7L6.5 15.5M13.5 7l4 8.5M7.5 18h9" ' + B + '/>',
    gun: '<path d="M3 8h13v5h-4l-2 4H7l1-4H3z" ' + B + '/><path d="M16 9h4" ' + B + '/>',
    nogun: '<path d="M3 9h13v5h-4l-2 3" ' + B + '/><circle cx="12" cy="12" r="9.5" ' + s(CO.red, 2) + '/>' +
      '<path d="M5.5 5.5l13 13" ' + s(CO.red, 2) + '/>',
    bread: '<path d="M4 12a4 4 0 0 1 4-6h8a4 4 0 0 1 4 6v8H4z" ' + s(CO.amber, 1.8) + '/><path d="M9 6v14" ' + B + '/>',
    pill: '<rect x="3" y="9" width="18" height="7" rx="3.5" ' + B + '/><path d="M12 9v7" ' + B + '/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14" ' + B + '/>',
    recycle: '<path d="M8 6l4-3 4 3M17 9l3 5-2 4M7 9l-3 5 2 4" ' + s(CO.green, 1.8) + '/>' +
      '<path d="M6 18h12" ' + s(CO.green, 1.8) + '/>',
    solar: '<path d="M4 16l3-9h12l-3 9z" ' + s(CO.blue, 1.8) + '/>' +
      '<path d="M8 7l-2 9M13 7l-2 9M10 11.5h8M12 16v5M9 21h6" ' + B + '/>',
    turbine: '<path d="M12 21V11" ' + B + '/><path d="M12 11l8-4M12 11l-7-5M12 11v-8" ' + s(CO.sky, 2) + '/>' +
      '<path d="M9 21h6" ' + B + '/>',
    oil: '<path d="M5 21V8h4v13M3 8h8" ' + B + '/><path d="M7 8V3M13 21v-8h7v8z" ' + B + '/>',
    coal: '<path d="M4 18l4-8 5 3 4-5 4 10z" ' + s('#334155', 1.8) + '/>',
    gas: '<path d="M8 21h8a3 3 0 0 0 3-3V9H5v9a3 3 0 0 0 3 3zM5 9l3-5h8l3 5" ' + B + '/>',
    battery: '<rect x="2" y="7" width="17" height="10" rx="2" ' + B + '/><path d="M21 10v4M6 10v4M10 10v4" ' + B + '/>',
    mask: '<path d="M5 8q7-2.5 14 0v5.4q0 3.6-7 5.1-7-1.5-7-5.1z" ' + B + '/>' +
          '<path d="M5.4 11.2h13.2M6 14h12" ' + B + '/>' +
          '<path d="M5 8.4L1.8 6M19 8.4L22.2 6" ' + B + '/>',
    ring: '<circle cx="12" cy="12" r="8" ' + s(CO.purple, 2) + '/><circle cx="12" cy="12" r="3" ' + B + '/>',
    ladder: '<path d="M7 3v18M17 3v18M7 7h10M7 12h10M7 17h10" ' + B + '/>',
    steps: '<path d="M3 20h5v-5h5v-5h5V5h3" ' + B + '/>',
    bridge: '<path d="M2 16h20M4 16V9M20 16V9M2 9q10-6 20 0" ' + B + '/>',
    wall: '<path d="M3 6h18v12H3z" ' + B + '/><path d="M3 12h18M9 6v6M15 12v6" ' + B + '/>',
    arrowup: '<path d="M12 20V5M6 11l6-6 6 6" ' + s(CO.green, 2.2) + '/>',
    arrowdown: '<path d="M12 4v15M6 13l6 6 6-6" ' + s(CO.red, 2.2) + '/>',
    plus: '<path d="M12 5v14M5 12h14" ' + s(CO.green, 2.4) + '/>',
    cross: '<path d="M5 5l14 14M19 5L5 19" ' + s(CO.red, 2.4) + '/>',
    check: '<path d="M4 13l5 5L20 6" ' + s(CO.green, 2.6) + '/>',
    question: '<circle cx="12" cy="12" r="9" ' + B + '/><path d="M9 9.5a3 3 0 1 1 3.5 3v2M12.5 18h.01" ' + B + '/>',
    balance2: '<path d="M4 18h16M12 18V6M7 10h10" ' + B + '/><circle cx="12" cy="4" r="2" ' + B + '/>'
  };

  function g(name, x, y, sc) {
    sc = sc || 1;
    var inner = G[name] || G.question;
    return '<g transform="translate(' + (x - 12 * sc) + ',' + (y - 12 * sc) + ') scale(' + sc + ')">' +
      inner + '</g>';
  }
  function txt(x, y, t, c, sz, w) {
    return '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-size="' + (sz || 9) +
      '" font-weight="' + (w || 700) + '" fill="' + (c || INK) + '">' + esc(t) + '</text>';
  }
  function esc(t) {
    return String(t).replace(/[&<>]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c];
    });
  }
  function wrap2(x, y, t, c, sz) {   // 긴 라벨은 두 줄로
    t = String(t);
    if (t.length <= 7) return txt(x, y, t, c, sz);
    var mid = t.lastIndexOf(' ', Math.ceil(t.length / 2) + 2);
    if (mid < 2) mid = Math.ceil(t.length / 2);
    return txt(x, y - 5, t.slice(0, mid).trim(), c, sz) +
      txt(x, y + 5, t.slice(mid).trim(), c, sz);
  }
  function tile(x, y, w, item) {
    return '<rect x="' + (x - w / 2) + '" y="' + (y - 30) + '" width="' + w + '" height="56" rx="10" ' +
      'fill="#ffffff" stroke="#dbe3f3" stroke-width="1.4"/>' +
      g(item[0], x, y - 12, 1.15) + wrap2(x, y + 15, item[1], INK, 8.5);
  }
  function arrowR(x1, x2, y) {
    return '<path d="M' + x1 + ' ' + y + 'H' + x2 + 'M' + (x2 - 5) + ' ' + (y - 4) + 'l5 4-5 4" ' +
      s(CO.blue, 2.2) + '/>';
  }
  function cap(t) { return t ? txt(100, 104, t, SUB, 8.5, 600) : ''; }
  function frame(inner) {
    return '<svg class="art" viewBox="0 0 200 110" role="img" aria-hidden="true">' +
      '<rect width="200" height="110" rx="10" fill="#f7f9ff"/>' + inner + '</svg>';
  }

  /* ───── 배치 틀 ───── */
  var T = {
    one: function (sp) {
      return frame(g(sp[1], 100, 44, 2.6) + cap(sp[2]));
    },
    vs: function (sp) {                       // ['vs', [g,l], [g,l], mid, cap]
      return frame(tile(54, 44, 78, sp[1]) + tile(146, 44, 78, sp[2]) +
        '<circle cx="100" cy="44" r="12" fill="#ffffff" stroke="#dbe3f3" stroke-width="1.4"/>' +
        txt(100, 47.5, sp[3] || 'vs', CO.blue, 9) + cap(sp[4]));
    },
    tiles: function (sp) {                    // ['tiles', [[g,l],...], cap]
      var it = sp[1], n = it.length;
      var xs = { 1: [100], 2: [58, 142], 3: [40, 100, 160], 4: [29, 76, 124, 171] }[n] || [100];
      var w = { 1: 90, 2: 80, 3: 56, 4: 44 }[n] || 80;
      return frame(it.map(function (o, i) { return tile(xs[i], 42, w, o); }).join('') + cap(sp[2]));
    },
    flow: function (sp) {                     // ['flow', [[g,l],...], cap]
      var it = sp[1], n = it.length;
      var xs = { 2: [56, 144], 3: [38, 100, 162], 4: [28, 76, 124, 172] }[n] || [56, 144];
      var w = { 2: 74, 3: 54, 4: 42 }[n] || 74;
      var out = it.map(function (o, i) { return tile(xs[i], 42, w, o); }).join('');
      for (var i = 0; i < n - 1; i++) out += arrowR(xs[i] + w / 2 + 2, xs[i + 1] - w / 2 - 2, 42);
      return frame(out + cap(sp[2]));
    },
    hub: function (sp) {                      // ['hub', [g,l], [[g,l],...], cap]
      var c = sp[1], it = sp[2], n = it.length;
      var xs = { 2: [58, 142], 3: [42, 100, 158], 4: [32, 78, 122, 168] }[n] || [58, 142];
      var out = g(c[0], 100, 22, 1.5) + txt(100, 44, c[1], INK, 10);
      it.forEach(function (o, i) {
        out += '<path d="M100 48L' + xs[i] + ' 62" ' + s('#c7d8ff', 1.6) + '/>' +
          g(o[0], xs[i], 70, 1) + wrap2(xs[i], 92, o[1], SUB, 8);
      });
      return frame(out);
    }
  };

  /* ───── 개념별 지정 ───── */
  var SPEC = {
    /* I. 통합적 관점 */
    c101: ['flow', [['hourglass', '과거'], ['clock', '현재']], '언제부터 어떻게 변해 왔나'],
    c102: ['vs', ['map', '이 지역'], ['pin', '저 지역'], '≠', '어디에서, 지역마다 어떻게 다른가'],
    c103: ['hub', ['lawbook', '제도'], [['people', '사람들'], ['factory', '일터'], ['school', '학교']], ''],
    c104: ['vs', ['heart', '옳은가'], ['question', '그른가'], '?', '바람직한지 가치로 판단한다'],
    c105: ['tiles', [['clock', '시간'], ['map', '공간'], ['lawbook', '사회'], ['heart', '윤리']], '네 관점을 함께 쓴다'],
    c106: ['hub', ['question', '한 현상'], [['clock', '시대'], ['map', '지역'], ['lawbook', '제도']], ''],
    c107: ['flow', [['book', '과거의 일'], ['arrowup', '오늘의 모습']], '지금은 과거에서 이어진 결과'],
    c108: ['vs', ['mountain', '이 지역만'], ['globe', '다른 지역'], '≠', '그 지역만의 고유한 특성'],
    c109: ['flow', [['pin', 'A 지역'], ['train', '오고 감'], ['pin', 'B 지역']], '사람·물자·정보가 오간다'],
    c110: ['hub', ['network', '사회 구조'], [['person', '개인'], ['person', '개인'], ['person', '개인']], ''],
    c111: ['tiles', [['lawbook', '법률'], ['doc', '정책'], ['capitol', '공식 기구']], '행동을 규율하는 공식 장치'],
    c112: ['vs', ['check', '옳다'], ['cross', '그르다'], '?', '가치 기준으로 평가한다'],
    c113: ['tiles', [['people', '서로의 약속'], ['heart', '마땅히 지킬 것']], '강제력 없이도 지켜지는 기준'],
    c114: ['tiles', [['sun', '기후'], ['mountain', '지형'], ['leaf', '식생']], '인간을 둘러싼 자연 조건'],
    c115: ['tiles', [['crowd', '인구'], ['factory', '산업'], ['tower', '도시']], '인간이 만들어 낸 환경'],

    /* II. 행복 */
    c201: ['one', 'heart', '삶에서 기쁨과 만족을 느끼는 상태'],
    c202: ['tiles', [['clock', '시대마다'], ['map', '지역마다'], ['person', '사람마다']], '행복의 기준은 달라진다'],
    c203: ['flow', [['person', '이성'], ['star', '덕'], ['heart', '행복']], '덕을 실현하는 삶이 최고선'],
    c204: ['tiles', [['book', '유교 수양'], ['ring', '불교 해탈'], ['leaf', '도가 무위']], '동양의 세 갈래 행복관'],
    c205: ['tiles', [['hospital', '건강'], ['school', '교육'], ['leaf', '환경'], ['coin', '소득']], '소득만으로 재지 않는다'],
    c206: ['tiles', [['house', '주거'], ['tree', '녹지'], ['hospital', '의료'], ['train', '교통']], '머물러 살기 좋은 공간'],
    c207: ['tiles', [['coin', '소득'], ['factory', '일자리'], ['piggy', '복지']], '먹고살 기반이 있어야 한다'],
    c208: ['tiles', [['ballot', '선거'], ['megaphone', '참여'], ['capitol', '권력 분립']], '시민이 직접 참여한다'],
    c209: ['tiles', [['handshake', '배려'], ['heart', '봉사'], ['magnifier', '성찰']], '개인의 실천과 돌아봄'],
    c210: ['bars2', '', ''],
    c211: ['flow', [['coin', '소득 증가'], ['heart', '행복 그대로']], '일정 수준을 넘으면 비례하지 않는다'],
    c212: ['hub', ['shield', '복지 제도'], [['pill', '질병'], ['factory', '실업'], ['elder', '노령']], ''],
    c213: ['tiles', [['ballot', '주민 투표'], ['coin', '참여 예산제'], ['doc', '청원']], '시민이 정책에 직접 참여'],
    c214: ['tiles', [['shield', '치안'], ['quake', '재해 대비'], ['hospital', '응급 의료']], '안전해야 머물 수 있다'],
    c215: ['vs', ['person', '개인의 태도'], ['capitol', '사회적 여건'], '+', '둘 다 있어야 행복하다'],

    /* III. 자연환경과 인간 */
    c301: ['tiles', [['stilt', '고상 가옥'], ['palm', '열대림'], ['rain', '많은 비']], '덥고 습해 띄워 짓는다'],
    c302: ['tiles', [['flathouse', '평지붕 흙집'], ['cactus', '사막'], ['sun', '강한 햇볕']], '비가 적고 일교차가 크다'],
    c303: ['tiles', [['hanok', '기와집'], ['tree', '사계절'], ['crowd', '인구 밀집']], '거주에 가장 유리한 기후'],
    c304: ['tiles', [['cabin', '통나무집'], ['igloo', '이글루'], ['snow', '긴 겨울']], '보온이 먼저인 기후'],
    c305: ['tiles', [['mask', '옷'], ['bread', '음식'], ['house', '집']], '기후가 의식주를 좌우한다'],
    c306: ['tiles', [['mountain', '산지 임업'], ['tree', '평야 농업'], ['ship', '해안 어업']], '지형이 산업을 정한다'],
    c307: ['vs', ['quake', '지진·화산'], ['rain', '홍수·태풍'], '≠', '땅이 원인인가, 하늘이 원인인가'],
    c308: ['hub', ['shield', '안전하게 살 권리'], [['quake', '재해'], ['capitol', '국가의 의무']], ''],
    c309: ['flow', [['tree', '자연'], ['person', '인간의 이익']], '자연은 인간을 위한 수단'],
    c310: ['hub', ['ring', '생태계 전체'], [['person', '인간'], ['tree', '식물'], ['bird', '동물']], ''],
    c311: ['flow', [['gear', '자연은 기계'], ['person', '인간이 주인']], '데카르트·베이컨의 정복적 자연관'],
    c312: ['hub', ['mountain', '대지 공동체'], [['leaf', '토양·물'], ['bird', '동식물'], ['person', '인간']], ''],
    c313: ['vs', ['leaf', '풀 한 포기'], ['person', '사람'], '=', '모든 생명은 그 자체로 존중'],
    c314: ['tiles', [['coin', '경제'], ['people', '사회'], ['leaf', '환경'], ['baby', '미래 세대']], '네 가지의 균형'],
    c315: ['flow', [['globe', '국경을 넘는 문제'], ['doc', '나라 간 약속']], '기후·오존·폐기물·습지'],
    c316: ['tiles', [['capitol', '정부 법·제도'], ['factory', '기업 기술'], ['person', '시민 실천']], '주체마다 할 일이 다르다'],

    /* IV. 문화와 다양성 */
    c401: ['tiles', [['map', '비슷한 생활'], ['mic', '언어'], ['ring', '종교']], '문화가 비슷한 공간 범위'],
    c402: ['vs', ['sun', '자연환경'], ['ring', '인문 환경'], '+', '기후·지형 + 종교·산업'],
    c403: ['vs', ['bulb', '안에서 생김'], ['plane', '밖에서 옴'], '≠', '내재적 요인과 외재적 요인'],
    c404: ['one', 'bulb', '없던 것을 새로 만들어 냈다'],
    c405: ['one', 'magnifier', '이미 있던 것을 찾아냈다'],
    c406: ['flow', [['person', '사람이'], ['people', '직접 만남']], '교역·이주·정복으로 전해진다'],
    c407: ['flow', [['tv', '매체를 통해'], ['crowd', '널리 퍼짐']], '드라마·인터넷이 경로가 된다'],
    c408: ['flow', [['magnifier', '보고 힌트를'], ['bulb', '새로 만듦']], '한자를 보고 이두를 만들 듯'],
    c409: ['flow', [['house', '우리 문화'], ['cross', '사라짐']], '외래문화로 완전히 대체된다'],
    c410: ['tiles', [['hanok', '우리 것'], ['tower', '외래 것']], '섞이지 않고 나란히 있다'],
    c411: ['flow', [['hanok', '우리 것 +'], ['tower', '외래 것'], ['ring', '제3의 새것']], '결합해 새 문화가 생긴다'],
    c412: ['vs', ['robot', '기술은 빨리'], ['lawbook', '제도는 느리게'], '≠', '물질문화를 비물질문화가 못 따라감'],
    c413: ['flow', [['book', '전통의 뿌리'], ['bulb', '재해석'], ['star', '문화 콘텐츠']], '고유성을 지키며 오늘에 맞게'],
    c414: ['vs', ['flag', '우리 것 최고'], ['crowd', '남은 미개'], '>', '자기 문화만 우수하다고 본다'],
    c415: ['vs', ['star', '남의 것 우월'], ['flag', '우리 것 열등'], '>', '자기 문화를 낮추어 본다'],
    c416: ['vs', ['flag', '우리 문화'], ['flag', '다른 문화'], '=', '그 사회의 맥락에서 이해한다'],
    c417: ['vs', ['mask', '문화라며 인정'], ['chainbreak', '인권 침해'], '!', '보편 윤리를 벗어난 태도'],
    c418: ['tiles', [['person', '인간 존엄'], ['heart', '생명 존중'], ['scale', '자유·평등']], '누구나 지켜야 할 선'],
    c419: ['flow', [['crowd', '여러 문화'], ['fire', '녹여 하나로']], '주류 문화로 통합한다'],
    c420: ['tiles', [['basket', '한 그릇 안에'], ['crowd', '각자 그대로']], '고유성을 지키며 공존한다'],
    c421: ['hub', ['handshake', '다양성 존중'], [['people', '다문화 가족'], ['cross', '차별 금지']], ''],

    /* V. 생활공간과 사회 */
    c501: ['flow', [['tree', '농업 중심'], ['factory', '공업·서비스']], '2·3차 산업 비중이 커진다'],
    c502: ['vs', ['crowd', '촌락 인구'], ['tower', '도시 인구'], '%', '“수”가 아니라 “비율”이 지표다'],
    c503: ['one', 'scurve', 'S자 곡선 — 초기·가속화·종착'],
    c504: ['flow', [['house', '촌락'], ['briefcase2', '일자리 찾아'], ['tower', '도시']], '가속화 단계에 활발하다'],
    c505: ['flow', [['tower', '도시에서'], ['house', '촌락으로']], '도시 문제를 피해 되돌아온다'],
    c506: ['tiles', [['tower', '도심'], ['bank', '부도심'], ['house', '주변 지역']], '접근성과 지가로 나뉜다'],
    c507: ['flow', [['bank', '업무·상업'], ['tower', '도심으로']], '비싼 땅값을 감당할 수 있다'],
    c508: ['flow', [['factory', '주거·공업'], ['house', '외곽으로']], '비싼 땅값을 감당하지 못한다'],
    c509: ['vs', ['sun', '낮 인구 많음'], ['snow', '밤 인구 적음'], '≠', '도심이 도넛처럼 빈다'],
    c510: ['hub', ['tower', '대도시'], [['train', '통근'], ['house', '위성 도시']], ''],
    c511: ['vs', ['fire', '도심 더움'], ['tree', '주변 서늘'], '>', '포장 면적과 인공 열 때문'],
    c512: ['flow', [['train', '교통 발달'], ['map', '생활권 확대']], '시간 거리가 줄어든다'],
    c513: ['flow', [['train', '고속철 개통'], ['house', '작은 도시'], ['tower', '대도시로 흡수']], '교통 발달의 부정적 영향'],
    c514: ['tiles', [['laptop', '전자 상거래'], ['wifi', '원격 근무'], ['globe', '가상 공간']], '공간 제약이 줄어든다'],
    c515: ['vs', ['phone', '잘 쓰는 사람'], ['elder', '못 쓰는 사람'], '≠', '정보가 새 불평등을 만든다'],
    c516: ['flow', [['brush2', '동네가 뜸'], ['coin', '임대료 상승'], ['cart', '원주민 떠남']], '개발 이익이 원주민에게 안 간다'],
    c517: ['hub', ['star', '지역 브랜드'], [['basket', '특산물'], ['stamp', '지리적 표시제']], ''],
    c518: ['tiles', [['hourglass', '느림'], ['hanok', '전통 보존'], ['leaf', '친환경']], '지역 고유의 삶을 지킨다'],

    /* VI. 인권 보장과 헌법 */
    c601: ['one', 'shield', '사람이라는 이유만으로 누리는 권리'],
    c602: ['tiles', [['baby', '천부성'], ['crowd', '보편성'], ['hourglass', '항구성'], ['lock', '불가침성']], '인권의 네 가지 성질'],
    c603: ['flow', [['chainbreak', '시민 혁명'], ['unlock', '국가로부터의 자유']], '가장 먼저 확립된 1세대 인권'],
    c604: ['flow', [['capitol', '국가'], ['plus', '보장해 달라'], ['person', '개인']], '산업화가 만든 2세대 인권'],
    c605: ['hub', ['globe', '3세대 연대권'], [['nogun', '평화권'], ['leaf', '환경권'], ['seed', '발전권']], ''],
    c606: ['one', 'doc', '1948년 국제 연합이 채택한 인권 기준'],
    c607: ['one', 'house', '적절한 집에서 살 권리'],
    c608: ['tiles', [['quake', '재난'], ['factory', '산업 재해'], ['shield', '보호받을 권리']], '안전하게 살 권리'],
    c609: ['one', 'leaf', '쾌적한 환경에서 살 권리'],
    c610: ['flow', [['laptop', '남은 기록'], ['trash', '지워 달라']], '온라인 정보 삭제를 요구할 권리'],
    c611: ['flow', [['lawbook', '헌법에 따라'], ['capitol', '권력 행사']], '권력을 헌법으로 묶는다'],
    c612: ['flow', [['crowd', '국민'], ['capitol', '국가 권력']], '권력의 원천은 국민에게 있다'],
    c613: ['tiles', [['lawbook', '입법'], ['capitol', '행정'], ['court', '사법']], '나누어 서로 견제한다'],
    c614: ['vs', ['capitol', '국가'], ['unlock', '간섭하지 마라'], '✕', '신체·종교·언론·재산의 자유'],
    c615: ['vs', ['person', '누구든'], ['scale', '같은 대우'], '=', '차별받지 않을 권리'],
    c616: ['one', 'ballot', '선거권·공무 담임권 — 참여할 권리'],
    c617: ['flow', [['cross', '권리를 침해당함'], ['gavel', '구제를 요구']], '청원·재판·국가 배상 청구권'],
    c618: ['tiles', [['school', '교육'], ['factory', '근로'], ['bread', '인간다운 생활']], '국가에 보장을 요구할 권리'],
    c619: ['flow', [['unlock', '기본권'], ['lawbook', '법률로써만'], ['lock', '제한 가능']], '본질적 내용은 침해 못 한다'],
    c620: ['tiles', [['megaphone', '공개적'], ['heart', '비폭력'], ['gavel', '처벌 감수']], '최후의 수단일 때만'],
    c621: ['tiles', [['gavel', '법원 — 재판'], ['lawbook', '헌재 — 위헌 심판'], ['shield', '인권위 — 조사']], '기관마다 하는 일이 다르다'],
    c622: ['vs', ['crowd', '다수'], ['person', '차별받는 쪽'], '≠', '수가 아니라 위치가 기준'],
    c623: ['tiles', [['child', '청소년 근로자'], ['coin', '최저 임금'], ['clock', '1일 7시간']], '나이가 어려도 똑같이 보호'],
    c624: ['hub', ['globe', '세계 인권 문제'], [['bread', '빈곤'], ['child', '아동 노동'], ['tent', '난민']], ''],

    /* VII. 사회 정의와 불평등 */
    c701: ['one', 'scale', '각자에게 정당한 몫을 주는 것'],
    c702: ['hub', ['pie', '분배적 정의'], [['chartup', '업적'], ['bulb', '능력'], ['bread', '필요']], ''],
    c703: ['flow', [['chartup', '해낸 성과'], ['coin', '더 많은 몫']], '성과급 — 객관적이나 약자에 불리'],
    c704: ['flow', [['stamp', '자격·재능'], ['briefcase2', '자리 배치']], '능력 — 타고난 우연이 섞인다'],
    c704b: ['flow', [['bread', '부족한 정도'], ['piggy', '더 많은 몫']], '필요 — 약자를 보호하나 유인 약화'],
    c705: ['hub', ['person', '개인의 자유'], [['unlock', '간섭 최소'], ['check', '자발적 선택']], ''],
    c706: ['hub', ['crowd', '공동선'], [['handshake', '연대'], ['flag', '공동체의 가치']], ''],
    c707: ['flow', [['mask', '무지의 베일'], ['scale', '공정한 합의']], '최소 수혜자에게 이익일 때만 허용'],
    c708: ['vs', ['lock', '내 소유권'], ['cross', '재분배 반대'], '!', '국가는 최소한만 — 노직'],
    c709: ['hub', ['book', '공동체의 전통'], [['person', '서사적 자아'], ['star', '덕']], ''],
    c710: ['vs', ['coin', '많이 가진 쪽'], ['piggy', '적게 가진 쪽'], '≠', '지니 계수·5분위 배율로 잰다'],
    c711: ['vs', ['tower', '수도권'], ['house', '지방'], '≠', '지역 간 발전 격차'],
    c712: ['tiles', [['piggy', '저소득층'], ['elder', '노인'], ['person', '장애인']], '지원이 필요한 사람들'],
    c713: ['flow', [['coin', '내가 낸 보험료'], ['shield', '위험 대비']], '국민연금·건강보험·고용보험'],
    c714: ['flow', [['capitol', '국가가 전액'], ['bread', '기초 생활']], '기초 생활 보장·의료 급여'],
    c715: ['flow', [['handshake', '돈 대신'], ['hospital', '돌봄·상담']], '비금전적 서비스를 준다'],
    c716: ['vs', ['steps', '다른 발판'], ['check', '같은 출발선'], '→', '실질적 평등을 위한 우대'],
    c717: ['vs', ['steps', '지나친 우대'], ['cross', '다른 쪽 불이익'], '!', '적극적 우대 조치의 뒷면'],

    /* VIII. 시장경제와 지속가능발전 */
    c801: ['tiles', [['lock', '사유 재산'], ['coin', '이윤 추구'], ['cart', '시장 가격']], '자본주의의 기본 뼈대'],
    c802: ['flow', [['ship', '신항로'], ['cart', '무역으로 부']], '생산이 아니라 유통 중심'],
    c803: ['flow', [['factory', '공장제 생산'], ['unlock', '자유방임']], '작은 정부 — 보이지 않는 손'],
    c804: ['flow', [['chartdown', '대공황'], ['capitol', '정부가 개입']], '큰 정부 — 뉴딜과 케인스'],
    c805: ['flow', [['oil', '석유 파동'], ['unlock', '규제 완화']], '다시 작은 정부 — 민영화'],
    c806: ['flow', [['coin', '가격 신호'], ['factory', '기업이 결정']], '효율적이나 격차가 커진다'],
    c807: ['flow', [['capitol', '국가의 계획'], ['factory', '생산 지시']], '형평하나 유인이 약하다'],
    c808: ['vs', ['heart', '편익'], ['coin', '비용'], '>', '편익이 비용보다 커야 한다'],
    c809: ['flow', [['check', '고른 것'], ['cross', '포기한 최선']], '포기한 것 중 가장 큰 하나'],
    c810: ['vs', ['trash', '이미 쓴 돈'], ['cross', '고려하지 말 것'], '!', '아까워서 계속하면 오류'],
    c811: ['hub', ['cart', '시장 실패'], [['tower', '독과점'], ['shield', '공공재'], ['factory', '외부 효과']], ''],
    c812: ['flow', [['capitol', '정부가 개입'], ['chartdown', '더 비효율']], '과도한 규제와 관료제'],
    c813: ['vs', ['shield', '국방·치안'], ['crowd', '대가 없이 이용'], '!', '무임승차로 공급이 부족해진다'],
    c814: ['vs', ['tree', '대가 없는 이익'], ['factory', '대가 없는 피해'], '≠', '보조금 vs 세금·규제'],
    c815: ['hub', ['factory', '기업의 책임'], [['person', '소비자'], ['leaf', '환경'], ['handshake', '공정 경쟁']], ''],
    c816: ['tiles', [['people', '단결권'], ['handshake', '교섭권'], ['megaphone', '행동권']], '뭉치고 → 협상하고 → 행동한다'],
    c817: ['flow', [['lock', '원금 보전'], ['piggy', '예금·적금']], '안전할수록 덜 번다'],
    c818: ['flow', [['chartup', '이익 가능성'], ['bars', '주식']], '많이 벌수록 위험하다'],
    c819: ['flow', [['bill', '바로 현금화'], ['clock', '얼마나 빨리']], '부동산은 유동성이 낮다'],
    c820: ['one', 'piggy', '원금과 이자 — 가장 안전한 자산'],
    c821: ['one', 'chartup', '배당과 시세 차익 — 원금 손실 가능'],
    c822: ['flow', [['bill', '돈을 빌려줌'], ['doc', '증서'], ['coin', '이자 + 원금']], '주식보다 안전, 의결권은 없다'],
    c823: ['flow', [['crowd', '모은 돈'], ['person', '전문가가 운용']], '간접 투자 — 분산되나 원금 비보장'],
    c824: ['flow', [['shield', '위험 대비'], ['elder', '노후 준비']], '수익보다 대비가 목적'],
    c825: ['flow', [['child', '청년'], ['people', '중년'], ['elder', '노년']], '소득은 한정, 지출은 평생'],
    c826: ['vs', ['cart', '갑국 10벌'], ['basket', '을국 4벌'], '>', '같은 자원으로 더 많이 만든다'],
    c827: ['vs', ['balance2', '갑국 기회비용'], ['balance2', '을국 기회비용'], '<', '더 적게 포기하는 쪽이 유리'],
    c828: ['vs', ['basket', '선택 폭 확대'], ['chartdown', '취약 산업 위축'], '≠', '좋은 점과 나쁜 점이 함께'],
    c829: ['flow', [['seed', '개도국 생산자'], ['coin', '정당한 대가']], '값이 조금 비싸도 사는 이유'],

    /* IX. 세계화와 평화 */
    c901: ['flow', [['border', '국경이 흐려짐'], ['globe', '서로 의존']], '상품·자본·사람이 오간다'],
    c902: ['flow', [['pin', '지역 고유성'], ['star', '세계적 가치']], '지리적 표시제·장소 마케팅'],
    c903: ['vs', ['globe', '세계 기업'], ['basket', '현지 입맛'], '+', '나라마다 다른 메뉴를 낸다'],
    c904: ['flow', [['bank', '본사·연구소'], ['factory', '생산 공장'], ['cart', '판매 법인']], '기능마다 유리한 나라에'],
    c905: ['flow', [['crowd', '여러 문화'], ['tv', '하나로 획일화']], '세계화의 부정적 영향'],
    c906: ['tiles', [['flag', '국가'], ['globe', '국제기구'], ['handshake', 'NGO'], ['factory', '다국적 기업']], '국제 사회의 네 주체'],
    c907: ['hub', ['globe', '국제 연합'], [['nogun', '평화 유지군'], ['school', '유네스코']], ''],
    c908: ['tiles', [['leaf', '그린피스'], ['shield', '앰네스티'], ['hospital', '국경 없는 의사회']], '민간이 주체인 기구'],
    c909: ['one', 'nogun', '전쟁·테러가 없는 상태'],
    c910: ['tiles', [['water', '깨끗한 물'], ['school', '교육'], ['bread', '먹을 것']], '빈곤·차별까지 사라진 상태'],
    c911: ['vs', ['wall', '제도·구조'], ['person', '사람이 다침'], '!', '가해자를 특정하기 어렵다'],
    c912: ['flow', [['book', '이념·종교'], ['check', '폭력을 정당화']], '당연하게 여기게 만든다'],
    c913: ['flow', [['border', '냉전과 38선'], ['gun', '6·25 전쟁']], '국제적 요인과 국내적 요인'],
    c914: ['vs', ['coin', '분단 비용'], ['bridge', '통일 편익'], '→', '비용은 일시적, 편익은 지속적'],
    c915: ['vs', ['book', '일본 — 독도·왜곡'], ['map', '중국 — 동북공정'], '≠', '나라별 쟁점이 다르다'],
    c916: ['flow', [['mountain', '대륙'], ['bridge', '반도'], ['ship', '해양']], '둘을 잇는 교량 역할'],

    /* X. 미래와 지속가능한 삶 */
    c1001: ['flow', [['baby', '많이 낳고 죽음'], ['arrowup', '사망률 급감'], ['elder', '둘 다 낮음']], '인구가 가장 빨리 느는 때는 2단계'],
    c1002: ['one', 'pyramid', '성별·연령별 인구 구성 그림'],
    c1003: ['vs', ['baby', '저출산'], ['elder', '고령화'], '+', '노동력 부족과 복지 부담'],
    c1004: ['vs', ['crowd', '인구 급증'], ['tent', '도시 과밀'], '+', '식량·일자리·기반 시설 부족'],
    c1005: ['flow', [['person', '여성 한 명'], ['baby', '평균 자녀 수']], '2.1명이 인구 유지 수준'],
    c1006: ['flow', [['elder', '7% 고령화'], ['elder', '14% 고령'], ['elder', '20% 초고령']], '65세 이상 인구 비율 기준'],
    c1007: ['vs', ['people', '생산 가능 인구'], ['elder', '부양할 인구'], '÷', '고령화가 되면 노년 부양비 증가'],
    c1008: ['vs', ['map', '한쪽에 몰림'], ['globe', '나머지 지역'], '≠', '자원은 치우쳐 분포한다'],
    c1009: ['tiles', [['oil', '석유 — 수송'], ['coal', '석탄 — 제철'], ['gas', '천연가스 — 청정']], '용도와 분포가 다르다'],
    c1010: ['flow', [['oil', '자원 보유국'], ['lock', '수출 제한']], '자원을 무기로 쓴다'],
    c1011: ['tiles', [['solar', '태양광'], ['turbine', '풍력'], ['water', '조력']], '깨끗하나 자연 조건에 좌우'],
    c1012: ['vs', ['ship', '남중국해'], ['snow', '북극해'], '!', '자원과 항로를 둘러싼 분쟁'],
    c1013: ['tiles', [['coin', '경제'], ['people', '사회'], ['leaf', '환경']], '2030년까지의 17개 목표'],
    c1014: ['tiles', [['robot', '인공 지능'], ['wifi', '사물 인터넷'], ['gear', '자동화']], '산업과 일자리가 바뀐다'],
    c1015: ['hub', ['globe', '세계시민 의식'], [['handshake', '연대'], ['heart', '책임'], ['people', '공동체']], ''],
    c1016: ['vs', ['coin', '가격만 보기'], ['leaf', '과정까지 보기'], '≠', '공정 무역·로컬 푸드·친환경']
  };

  /* 빠진 픽토그램 보정 */
  G.star = '<path d="M12 3l2.8 6 6.2.7-4.7 4.2 1.4 6.1L12 17l-5.7 3 1.4-6.1L3 9.7 9.2 9z" ' + s(CO.amber, 1.8) + '/>';
  G.briefcase2 = '<rect x="3" y="7" width="18" height="13" rx="2" ' + B + '/><path d="M9 7V4h6v3M3 13h18" ' + B + '/>';
  G.brush2 = '<path d="M4 20c0-3 2-4 4-4s3 1 3 3-2 3-4 3-3-1-3-2z" ' + B + '/>' +
    '<path d="M10 16L20 5l-2-2-11 10" ' + s(CO.purple, 1.8) + '/>';
  T.bars2 = function () {
    return frame(g('bars', 60, 42, 1.6) + txt(60, 72, 'GDP 순위', SUB, 8.5) +
      g('heart', 140, 42, 1.6) + txt(140, 72, '행복 지수', SUB, 8.5) +
      txt(100, 46, '≠', CO.blue, 14) +
      cap('소득 순위와 행복 순위는 다르게 나온다'));
  };

  function render(spec) {
    if (!spec) return '';
    var f = T[spec[0]];
    return f ? f(spec) : '';
  }
  function forConcept(c) {
    if (!c) return '';
    return render(SPEC[c.id]);
  }


  /* 목록용 작은 그림 — 그 개념 그림의 첫 픽토그램 */
  function firstGlyph(sp) {
    if (!sp) return 'question';
    var t = sp[0];
    if (t === 'one') return sp[1];
    if (t === 'vs') return sp[1][0];
    if (t === 'tiles' || t === 'flow') return sp[1][0][0];
    if (t === 'hub') return sp[1][0];
    return 'question';
  }
  function thumb(c) {
    var n = firstGlyph(c && SPEC[c.id]);
    return '<svg class="cthumb" viewBox="0 0 24 24" aria-hidden="true">' + (G[n] || G.question) + '</svg>';
  }

  window.ConceptArt = { forConcept: forConcept, render: render, SPEC: SPEC, G: G, T: T, draw: g, thumb: thumb };
})();
