/* 만화 엔진 — 컷(패널) 하나를 SVG로 그린다.
   등장인물 + 말풍선 + 소품(픽토그램 재사용) + 내레이션으로 구성한다. */
(function () {
  'use strict';
  var INK = '#1b2330';
  function st(c, w) {
    return 'fill="none" stroke="' + (c || INK) + '" stroke-width="' + (w || 2) +
      '" stroke-linecap="round" stroke-linejoin="round"';
  }
  function esc(t) {
    return String(t == null ? '' : t).replace(/[&<>]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c];
    });
  }

  /* 등장인물 네 명 — 보내 준 캐릭터 디자인을 벡터로 옮긴 것
     USE_CAST를 true로 두면 assets/char-*.png 그림으로 바꿔 그린다. */
  var USE_CAST = false;
  var CAST = {
    a: { src: 'assets/char-a.png', r: 0.369 },
    b: { src: 'assets/char-b.png', r: 0.366 },
    c: { src: 'assets/char-c.png', r: 0.523 },
    d: { src: 'assets/char-d.png', r: 0.549 }
  };
  var AS_CAST = { blue: 'a', green: 'b', amber: 'c', red: 'd', purple: 'phil' };

  /* 등장인물 — 만화 내용에 맞춰 역할별로 하나씩 만든다.
     얼굴은 점 두 개와 입 하나로만 그린다 (안경·속눈썹 같은 잔선 없음). */
  var CH = {
    /* 사회를 바라보는 4가지 관점 — 네 사람 */
    a:    { hair: 'short',  hairC: '#4a3626', cloth: '#4a7fd4', bottom: 'pants', bottomC: '#2f559c',
            badge: '#3b6fd4', emb: 'clock' },                       /* 1 시간 탓 */
    b:    { hair: 'tail',   hairC: '#23282f', cloth: '#3aa06a', bottom: 'skirt', bottomC: '#20784c',
            badge: '#2e9158', emb: 'pin' },                          /* 2 장소 탓 */
    c:    { hair: 'cap',    hairC: '#5f4428', cloth: '#e09040', bottom: 'pants', bottomC: '#a9661f',
            cap: 1, capC: '#c4761f', badge: '#d9742f', emb: 'gov' },  /* 3 제도 탓 */
    d:    { hair: 'twin',   hairC: '#e2704a', cloth: '#e2738e', bottom: 'skirt', bottomC: '#b14a66',
            badge: '#d14b6a', emb: 'heart' },                        /* 4 옳고 그름 */
    /* 행복 편 — 사상가 세 사람 */
    phil: { hair: 'wave',   hairC: '#cdd3dc', cloth: '#ddd3f3', bottom: 'robe', bottomC: '#ddd3f3',
            beard: '#c9d1dc', wreath: 1, badge: '#8356c7' },         /* 아리스토텔레스 */
    monk: { hair: 'bald',   hairC: '#f0c99f', cloth: '#f0a44e', bottom: 'robe', bottomC: '#f0a44e',
            ushnisha: 1, urna: 1, badge: '#d9742f' },                /* 석가모니 */
    sun:  { hair: 'gat',    hairC: '#2b3038', cloth: '#f3efe3', bottom: 'robe', bottomC: '#f3efe3',
            beard: '#5d6675', badge: '#2e9158' }                     /* 정약용 */
  };
  var SKIN = '#ffe2c4', SKIN_L = '#f0cba6', SHOE = '#39434f';

  function castFigure(x, y, s, ck, tag) {
    var c = CAST[ck];
    var h = 76 * s, w = h * c.r;
    var out = '<image href="' + c.src + '" xlink:href="' + c.src + '" x="' + (x - w / 2) +
      '" y="' + (y - h) + '" width="' + w + '" height="' + h + '"/>';
    if (tag) out += tagBadge(x, y - h - 9 * s, s, '#2f6df6', tag);
    return out;
  }
  function tagBadge(x, y, s, col, t) {
    return '<circle cx="' + x + '" cy="' + y + '" r="' + (9 * s) + '" fill="' + col +
      '" stroke="#fff" stroke-width="' + (1.8 * s) + '"/>' +
      '<text x="' + x + '" y="' + (y + 3.6 * s) + '" text-anchor="middle" font-size="' + (11 * s) +
      '" font-weight="800" fill="#fff">' + esc(t) + '</text>';
  }

  /* 가슴에 붙는 작은 표식 — 그 사람이 무슨 관점인지 한눈에 보이게 한다 */
  function emblem(kind, x, cy, s) {
    var w = 'fill="none" stroke="#ffffff" stroke-width="' + (1.5 * s) +
      '" stroke-linecap="round" stroke-linejoin="round"';
    if (kind === 'clock') {
      return '<circle cx="' + x + '" cy="' + cy + '" r="' + (4.6 * s) + '" ' + w + '/>' +
        '<path d="M' + x + ' ' + (cy - 2.6 * s) + 'V' + cy + 'h' + (2.6 * s) + '" ' + w + '/>';
    }
    if (kind === 'pin') {
      return '<path d="M' + x + ' ' + (cy + 5 * s) + 'c' + (-4.4 * s) + ' ' + (-5 * s) + ' ' +
        (-4.4 * s) + ' ' + (-10 * s) + ' 0 ' + (-10 * s) + 'c' + (4.4 * s) + ' 0 ' + (4.4 * s) +
        ' ' + (5 * s) + ' 0 ' + (10 * s) + 'z" ' + w + '/>' +
        '<circle cx="' + x + '" cy="' + (cy - 2.2 * s) + '" r="' + (1.5 * s) + '" fill="#fff"/>';
    }
    if (kind === 'gov') {
      return '<path d="M' + (x - 5.4 * s) + ' ' + (cy - 1 * s) + 'l' + (5.4 * s) + ' ' + (-3.6 * s) +
        'l' + (5.4 * s) + ' ' + (3.6 * s) + 'M' + (x - 4.4 * s) + ' ' + (cy + 4.4 * s) + 'h' +
        (8.8 * s) + 'M' + (x - 2.6 * s) + ' ' + (cy - 0.4 * s) + 'v' + (4 * s) +
        'M' + (x + 2.6 * s) + ' ' + (cy - 0.4 * s) + 'v' + (4 * s) + '" ' + w + '/>';
    }
    if (kind === 'heart') {
      return '<path d="M' + x + ' ' + (cy + 4 * s) + 'c' + (-6.4 * s) + ' ' + (-4.4 * s) + ' ' +
        (-4.6 * s) + ' ' + (-9.6 * s) + ' 0 ' + (-6.6 * s) + 'c' + (4.6 * s) + ' ' + (-3 * s) +
        ' ' + (6.4 * s) + ' ' + (2.2 * s) + ' 0 ' + (6.6 * s) + 'z" ' + w + '/>';
    }
    return '';
  }

  /* 사람 한 명 — (x, y=발끝). 머리 꼭대기는 대략 y-75s. */
  function person(x, y, o) {
    o = o || {};
    var s = o.s || 1;
    var ck = o.ch || AS_CAST[o.c] || 'a';
    if (USE_CAST && CAST[ck] && !o.vector) return castFigure(x, y, s, ck, o.tag);
    var P = CH[ck] || CH.a;
    var col = o.cloth || P.cloth;
    var hairC = P.hairC, hy = y - 61 * s, hr = 12 * s;
    var mood = o.mood || 'calm';
    var bd = !!P.beard;                         /* 수염이 있으면 얼굴을 조금 위로 */
    var ey = hy + (bd ? 0.6 : 2) * s;           /* 눈 높이 */
    var my = hy + (bd ? 5.4 : 7.2) * s;         /* 입 높이 */
    var exd = 4.6 * s;                          /* 눈 간격 */

    function L(w, c) {
      return 'fill="none" stroke="' + (c || INK) + '" stroke-width="' + (w * s) +
        '" stroke-linecap="round" stroke-linejoin="round"';
    }
    function F(c, w) {
      return 'fill="' + c + '" stroke="' + INK + '" stroke-width="' + ((w || 1.6) * s) +
        '" stroke-linejoin="round" stroke-linecap="round"';
    }
    var out = '';

    /* ── 하의 ── */
    if (P.bottom === 'robe') {
      out += '<path d="M' + (x - 11 * s) + ' ' + (y - 40 * s) + 'h' + (22 * s) + 'l' + (7 * s) +
        ' ' + (38 * s) + 'h' + (-36 * s) + 'z" ' + F(P.bottomC, 1.7) + '/>' +
        '<path d="M' + x + ' ' + (y - 34 * s) + 'V' + (y - 2 * s) + '" ' + L(1.2, 'rgba(0,0,0,.18)') + '/>';
    } else if (P.bottom === 'skirt') {
      out += '<path d="M' + (x - 5.6 * s) + ' ' + (y - 15 * s) + 'V' + (y - 5 * s) +
        'M' + (x + 5.6 * s) + ' ' + (y - 15 * s) + 'V' + (y - 5 * s) + '" ' + L(5.6, SKIN_L) + '/>' +
        '<rect x="' + (x - 10.4 * s) + '" y="' + (y - 5.4 * s) + '" width="' + (8.4 * s) +
        '" height="' + (5.4 * s) + '" rx="' + (2.4 * s) + '" ' + F(SHOE, 1.5) + '/>' +
        '<rect x="' + (x + 2 * s) + '" y="' + (y - 5.4 * s) + '" width="' + (8.4 * s) +
        '" height="' + (5.4 * s) + '" rx="' + (2.4 * s) + '" ' + F(SHOE, 1.5) + '/>' +
        '<path d="M' + (x - 9.4 * s) + ' ' + (y - 27 * s) + 'h' + (18.8 * s) + 'l' + (4.6 * s) +
        ' ' + (14 * s) + 'h' + (-28 * s) + 'z" ' + F(P.bottomC, 1.7) + '/>';
    } else {
      out += '<rect x="' + (x - 10.4 * s) + '" y="' + (y - 26 * s) + '" width="' + (9 * s) +
        '" height="' + (21 * s) + '" rx="' + (2 * s) + '" ' + F(P.bottomC, 1.7) + '/>' +
        '<rect x="' + (x + 1.4 * s) + '" y="' + (y - 26 * s) + '" width="' + (9 * s) +
        '" height="' + (21 * s) + '" rx="' + (2 * s) + '" ' + F(P.bottomC, 1.7) + '/>' +
        '<rect x="' + (x - 10.8 * s) + '" y="' + (y - 5.4 * s) + '" width="' + (8.8 * s) +
        '" height="' + (5.4 * s) + '" rx="' + (2.4 * s) + '" ' + F(SHOE, 1.5) + '/>' +
        '<rect x="' + (x + 2 * s) + '" y="' + (y - 5.4 * s) + '" width="' + (8.8 * s) +
        '" height="' + (5.4 * s) + '" rx="' + (2.4 * s) + '" ' + F(SHOE, 1.5) + '/>';
    }

    /* ── 팔 ── */
    out += '<path d="M' + (x - 10.4 * s) + ' ' + (y - 42 * s) + 'q' + (-7.4 * s) + ' ' + (7 * s) +
      ' ' + (-7.8 * s) + ' ' + (18 * s) + '" ' + L(7.6, col) + '/>' +
      '<path d="M' + (x + 10.4 * s) + ' ' + (y - 42 * s) + 'q' + (7.4 * s) + ' ' + (7 * s) +
      ' ' + (7.8 * s) + ' ' + (18 * s) + '" ' + L(7.6, col) + '/>' +
      '<circle cx="' + (x - 18.2 * s) + '" cy="' + (y - 22 * s) + '" r="' + (3.6 * s) + '" ' +
      F(SKIN, 1.5) + '/>' +
      '<circle cx="' + (x + 18.2 * s) + '" cy="' + (y - 22 * s) + '" r="' + (3.6 * s) + '" ' +
      F(SKIN, 1.5) + '/>';

    /* ── 목 ── */
    out += '<rect x="' + (x - 3.6 * s) + '" y="' + (y - 53 * s) + '" width="' + (7.2 * s) +
      '" height="' + (9 * s) + '" ' + F(SKIN_L, 1.4) + '/>';

    /* ── 상의 ── */
    out += '<path d="M' + (x - 12 * s) + ' ' + (y - 25 * s) + 'V' + (y - 39 * s) +
      'Q' + (x - 12 * s) + ' ' + (y - 47.4 * s) + ' ' + (x - 4 * s) + ' ' + (y - 47.8 * s) +
      'H' + (x + 4 * s) + 'Q' + (x + 12 * s) + ' ' + (y - 47.4 * s) + ' ' + (x + 12 * s) + ' ' +
      (y - 39 * s) + 'V' + (y - 25 * s) + 'z" ' + F(col, 1.7) + '/>' +
      '<path d="M' + (x - 4.4 * s) + ' ' + (y - 47.6 * s) + 'L' + x + ' ' + (y - 42 * s) + 'l' +
      (4.4 * s) + ' ' + (-5.6 * s) + '" ' + L(1.5, 'rgba(0,0,0,.18)') + '/>';
    if (P.emb) out += emblem(P.emb, x, y - 35 * s, s);

    /* ── 얼굴 뒤쪽 머리 ── */
    if (P.hair === 'tail') {
      out += '<ellipse cx="' + (x + 13.4 * s) + '" cy="' + (hy + 3 * s) + '" rx="' + (5.4 * s) +
        '" ry="' + (9.4 * s) + '" ' + F(hairC, 1.5) + '/>';
    } else if (P.hair === 'twin') {
      out += '<ellipse cx="' + (x - 14.6 * s) + '" cy="' + (hy + 3.4 * s) + '" rx="' + (5.6 * s) +
        '" ry="' + (8.6 * s) + '" ' + F(hairC, 1.5) + '/>' +
        '<ellipse cx="' + (x + 14.6 * s) + '" cy="' + (hy + 3.4 * s) + '" rx="' + (5.6 * s) +
        '" ry="' + (8.6 * s) + '" ' + F(hairC, 1.5) + '/>';
    }

    /* ── 수염 (턱 아래로만) ── */
    if (P.beard) {
      out += '<path d="M' + (x - 9.8 * s) + ' ' + (hy + 8.4 * s) + 'q' + (9.8 * s) + ' ' +
        (14 * s) + ' ' + (19.6 * s) + ' 0q' + (-2.6 * s) + ' ' + (9.6 * s) + ' ' + (-9.8 * s) +
        ' ' + (9.6 * s) + 'q' + (-7.2 * s) + ' 0 ' + (-9.8 * s) + ' ' + (-9.6 * s) + 'z" ' +
        F(P.beard, 1.5) + '/>';
    }

    /* ── 얼굴 ── */
    out += '<circle cx="' + x + '" cy="' + hy + '" r="' + hr + '" ' + F(SKIN, 1.7) + '/>';

    /* ── 앞머리 ── */
    if (P.hair !== 'bald' && P.hair !== 'gat' && P.hair !== 'cap') {
      out += '<path d="M' + (x - 11.6 * s) + ' ' + (hy - 3 * s) + 'a' + hr + ' ' + hr +
        ' 0 0 1 ' + (23.2 * s) + ' 0z" fill="' + hairC + '"/>';
    }
    if (P.hair === 'wave') {
      out += '<path d="M' + (x - 11.6 * s) + ' ' + (hy - 3 * s) + 'q' + (5.8 * s) + ' ' +
        (3.6 * s) + ' ' + (11.6 * s) + ' 0q' + (5.8 * s) + ' ' + (-3.6 * s) + ' ' + (11.6 * s) +
        ' 0" ' + L(1.4, 'rgba(0,0,0,.2)') + '/>';
    }
    if (P.hair === 'short') {
      out += '<path d="M' + (x - 11.6 * s) + ' ' + (hy - 3 * s) + 'q' + (3.4 * s) + ' ' +
        (5.4 * s) + ' ' + (8 * s) + ' ' + (3.4 * s) + 'l' + (-1.4 * s) + ' ' + (-4.6 * s) +
        'z" fill="' + hairC + '"/>';
    }
    if (P.hair === 'tail') {
      out += '<path d="M' + (x - 11.6 * s) + ' ' + (hy - 3 * s) + 'q' + (6 * s) + ' ' + (5 * s) +
        ' ' + (14.6 * s) + ' ' + (2.4 * s) + 'l' + (-1.2 * s) + ' ' + (-5.4 * s) + 'z" fill="' +
        hairC + '"/>';
    }
    if (P.hair === 'twin') {
      out += '<path d="M' + (x - 11.6 * s) + ' ' + (hy - 3 * s) + 'q' + (11.6 * s) + ' ' +
        (5.6 * s) + ' ' + (23.2 * s) + ' 0l' + (-1.6 * s) + ' ' + (-5 * s) + 'h' + (-20 * s) +
        'z" fill="' + hairC + '"/>';
    }

    /* ── 모자·관 ── */
    if (P.hair === 'cap') {                       /* 야구모자 */
      out += '<path d="M' + (x - 11.4 * s) + ' ' + (hy - 1 * s) + 'q' + (1 * s) + ' ' + (4 * s) + ' ' +
        (0.4 * s) + ' ' + (5.6 * s) + 'M' + (x + 11.4 * s) + ' ' + (hy - 1 * s) + 'q' +
        (-1 * s) + ' ' + (4 * s) + ' ' + (-0.4 * s) + ' ' + (5.6 * s) + '" ' + L(3.2, hairC) + '/>' +
        '<path d="M' + (x - 11.4 * s) + ' ' + (hy - 2.4 * s) + 'q' + (-10 * s) + ' ' + (0.6 * s) +
        ' ' + (-10.6 * s) + ' ' + (4.4 * s) + 'q' + (5 * s) + ' ' + (1.6 * s) + ' ' + (10.6 * s) +
        ' ' + (-0.8 * s) + 'z" ' + F(P.capC, 1.6) + '/>' +
        '<path d="M' + (x - 11.8 * s) + ' ' + (hy - 2.4 * s) + 'a' + (11.8 * s) + ' ' +
        (11.8 * s) + ' 0 0 1 ' + (23.6 * s) + ' 0z" ' + F(P.capC, 1.6) + '/>' +
        '<circle cx="' + x + '" cy="' + (hy - 13.4 * s) + '" r="' + (1.8 * s) + '" ' +
        F(P.capC, 1.2) + '/>';
    }
    if (P.hair === 'gat') {                       /* 조선 선비의 갓 */
      out += '<path d="M' + (x - 11.6 * s) + ' ' + (hy - 2 * s) + 'q' + (11.6 * s) + ' ' + (3.4 * s) +
        ' ' + (23.2 * s) + ' 0" ' + L(2.6, '#2b3038') + '/>' +
        '<path d="M' + (x - 6.8 * s) + ' ' + (hy - 5 * s) + 'v' + (-10 * s) + 'h' +
        (13.6 * s) + 'v' + (10 * s) + 'z" ' + F('#2b3038', 1.5) + '/>' +
        '<ellipse cx="' + x + '" cy="' + (hy - 5 * s) + '" rx="' + (18.4 * s) + '" ry="' +
        (3.4 * s) + '" ' + F('#2b3038', 1.5) + '/>';
    }
    if (P.ushnisha) {                             /* 석가모니 — 정수리 융기 */
      out += '<circle cx="' + x + '" cy="' + (hy - 12.4 * s) + '" r="' + (4.2 * s) + '" ' +
        F(SKIN, 1.6) + '/>';
    }
    if (P.urna) {
      out += '<circle cx="' + x + '" cy="' + (hy - 3.6 * s) + '" r="' + (1.5 * s) +
        '" fill="#e8b94a"/>';
    }
    if (P.wreath) {                               /* 아리스토텔레스 — 월계관 */
      out += '<path d="M' + (x - 12.4 * s) + ' ' + (hy - 3.6 * s) + 'q' + (12.4 * s) + ' ' +
        (-7.4 * s) + ' ' + (24.8 * s) + ' 0" ' + L(2.4, '#7cb87a') + '/>' +
        '<path d="M' + (x - 7 * s) + ' ' + (hy - 7.6 * s) + 'l' + (-2.6 * s) + ' ' + (-2.6 * s) +
        'M' + x + ' ' + (hy - 9.2 * s) + 'v' + (-3 * s) + 'M' + (x + 7 * s) + ' ' +
        (hy - 7.6 * s) + 'l' + (2.6 * s) + ' ' + (-2.6 * s) + '" ' + L(2, '#7cb87a') + '/>';
    }

    /* ── 눈·입 (점 두 개와 선 하나) ── */
    if (mood === 'happy') {
      out += '<path d="M' + (x - exd - 2.2 * s) + ' ' + (ey + 0.8 * s) + 'q' + (2.2 * s) + ' ' +
        (-3.2 * s) + ' ' + (4.4 * s) + ' 0M' + (x + exd - 2.2 * s) + ' ' + (ey + 0.8 * s) + 'q' +
        (2.2 * s) + ' ' + (-3.2 * s) + ' ' + (4.4 * s) + ' 0" ' + L(1.8) + '/>';
    } else {
      out += '<circle cx="' + (x - exd) + '" cy="' + ey + '" r="' + (1.9 * s) + '" fill="' + INK + '"/>' +
        '<circle cx="' + (x + exd) + '" cy="' + ey + '" r="' + (1.9 * s) + '" fill="' + INK + '"/>';
    }
    if (mood === 'worry') {
      out += '<path d="M' + (x - 7.6 * s) + ' ' + (ey - 5.6 * s) + 'l' + (4.2 * s) + ' ' +
        (2 * s) + 'M' + (x + 7.6 * s) + ' ' + (ey - 5.6 * s) + 'l' + (-4.2 * s) + ' ' +
        (2 * s) + '" ' + L(1.5) + '/>';
    }
    out += mood === 'happy'
      ? '<path d="M' + (x - 3.6 * s) + ' ' + (my - 0.6 * s) + 'q' + (3.6 * s) + ' ' + (4 * s) +
        ' ' + (7.2 * s) + ' 0" ' + L(1.7) + '/>'
      : mood === 'worry'
      ? '<path d="M' + (x - 3.4 * s) + ' ' + (my + 1.6 * s) + 'q' + (3.4 * s) + ' ' + (-3.8 * s) +
        ' ' + (6.8 * s) + ' 0" ' + L(1.7) + '/>'
      : mood === 'talk'
      ? '<ellipse cx="' + x + '" cy="' + my + '" rx="' + (2.6 * s) + '" ry="' + (2.4 * s) +
        '" fill="' + INK + '"/>'
      : '<path d="M' + (x - 2.8 * s) + ' ' + my + 'h' + (5.6 * s) + '" ' + L(1.7) + '/>';

    if (o.tag) out += tagBadge(x, y - 88 * s, s, P.badge || '#2f6df6', o.tag);
    return '<g>' + out + '</g>';
  }

  /* 말풍선 — 글자 수로 줄바꿈 */
  function bubble(b) {
    var fs = b.fs || 11, w = b.w || 130;
    var per = Math.max(4, Math.floor((w - 16) / (fs * 0.98)));
    var words = String(b.t).split(' '), lines = [], cur = '';
    words.forEach(function (wd) {
      if ((cur + ' ' + wd).trim().length > per) { if (cur) lines.push(cur); cur = wd; }
      else cur = (cur ? cur + ' ' : '') + wd;
    });
    if (cur) lines.push(cur);
    var lh = fs * 1.35, h = lines.length * lh + 14;
    var x = b.x - w / 2, y = b.y - h / 2;
    var tail = b.tail === 'up'
      ? '<path d="M' + (b.x - 7) + ' ' + y + 'l7-11 7 11z" fill="#fff" stroke="' + INK + '" stroke-width="1.8"/>' +
        '<path d="M' + (b.x - 6) + ' ' + y + 'h12" stroke="#fff" stroke-width="3"/>'
      : '<path d="M' + (b.x - 7) + ' ' + (y + h) + 'l7 12 7-12z" fill="#fff" stroke="' + INK + '" stroke-width="1.8"/>' +
        '<path d="M' + (b.x - 6) + ' ' + (y + h) + 'h12" stroke="#fff" stroke-width="3"/>';
    return '<g>' +
      '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (h / 2 > 16 ? 14 : h / 2) +
      '" fill="#fff" stroke="' + INK + '" stroke-width="1.8"/>' + tail +
      lines.map(function (l, i) {
        return '<text x="' + b.x + '" y="' + (y + 11 + fs + i * lh - 4) + '" text-anchor="middle" font-size="' + fs +
          '" font-weight="700" fill="' + INK + '">' + esc(l) + '</text>';
      }).join('') + '</g>';
  }

  /* 배경 장면 */
  var SCENE = {
    sea: function () {
      return '<rect width="340" height="210" fill="#cfeaff"/>' +
        '<circle cx="292" cy="34" r="16" fill="#fde68a"/>' +
        '<path d="M0 150h340v60H0z" fill="#5fa8e0"/>' +
        '<path d="M0 158q22-9 44 0t44 0 44 0 44 0 44 0 44 0 44 0" ' + st('#bfe3ff', 2.4) + '/>' +
        '<path d="M0 182q22-9 44 0t44 0 44 0 44 0 44 0 44 0 44 0" ' + st('#bfe3ff', 2.4) + '/>';
    },
    boat: function () {
      return SCENE.sea() +
        '<path d="M46 150h248l-34 42H80z" fill="#c98b4b" stroke="' + INK + '" stroke-width="2.4"/>' +
        '<path d="M46 150h248" ' + st(INK, 2.4) + '/>' +
        '<circle cx="170" cy="176" r="11" fill="#1b2330"/>' +
        '<path d="M170 176q-5 16 0 30M170 176q5 16 0 30" ' + st('#5fa8e0', 3) + '/>';
    },
    deck: function () {
      return '<rect width="340" height="210" fill="#cfeaff"/>' +
        '<circle cx="296" cy="30" r="15" fill="#fde68a"/>' +
        '<path d="M0 142h340v34H0z" fill="#5fa8e0"/>' +
        '<path d="M0 150q22-8 44 0t44 0 44 0 44 0 44 0 44 0 44 0" ' + st('#bfe3ff', 2.2) + '/>' +
        '<path d="M0 176h340v34H0z" fill="#c98b4b"/>' +
        '<path d="M0 176h340" ' + st(INK, 2.4) + '/>' +
        '<path d="M0 192h340" ' + st('#a9743c', 2) + '/>';
    },
    desert: function () {
      return '<rect width="340" height="210" fill="#fef3c7"/>' +
        '<circle cx="288" cy="34" r="17" fill="#fbbf24"/>' +
        '<path d="M0 150q50-20 100-6t120-10 120 8v68H0z" fill="#fcd34d"/>' +
        '<path d="M0 176q60-14 120 0t120 0 100 0" ' + st('#eab308', 2) + '/>';
    },
    plain: function (c) { return '<rect width="340" height="210" fill="' + (c || '#eef3ff') + '"/>'; },
    room: function () {
      return '<rect width="340" height="210" fill="#fdf6ec"/>' +
        '<path d="M0 162h340" ' + st('#e3d3bb', 3) + '/>' +
        '<rect x="18" y="26" width="74" height="44" rx="4" fill="#2f4858"/>' +
        '<rect x="18" y="26" width="74" height="44" rx="4" ' + st(INK, 2) + '/>' +
        '<path d="M28 40h40M28 52h26" ' + st('#9fb3c8', 2) + '/>';
    },
    city: function () {
      return '<rect width="340" height="210" fill="#e8eefc"/>' +
        '<rect x="18" y="74" width="40" height="88" fill="#b9c6e0"/>' +
        '<rect x="64" y="52" width="34" height="110" fill="#a3b3d2"/>' +
        '<rect x="246" y="62" width="38" height="100" fill="#a3b3d2"/>' +
        '<rect x="290" y="88" width="32" height="74" fill="#b9c6e0"/>' +
        '<path d="M0 162h340" ' + st('#94a3b8', 3) + '/>';
    },
    field: function () {
      return '<rect width="340" height="210" fill="#eaf7ff"/>' +
        '<path d="M0 150h340v60H0z" fill="#cdeec0"/>' +
        '<path d="M0 150q40-18 80 0t80 0 80 0 80 0" ' + st('#a3d9a5', 3) + '/>';
    }
  };

  /* 컷 하나 */
  function panel(p) {
    var out = (SCENE[p.scene] || SCENE.plain)(p.bg);
    (p.props || []).forEach(function (o) {
      var g = (window.ConceptArt && ConceptArt.G[o.g]) || '';
      var s = o.s || 2;
      out += '<g transform="translate(' + (o.x - 12 * s) + ',' + (o.y - 12 * s) + ') scale(' + s + ')" opacity="' +
        (o.op || 1) + '">' + g + '</g>';
    });
    (p.arts || []).forEach(function (a) {
      out += window.ComicArt ? ComicArt.place(a.k, a.x, a.y, a.w, a.h, a.o) : '';
    });
    (p.people || []).forEach(function (o) { out += person(o.x, o.y, o); });
    (p.bubbles || []).forEach(function (b) { out += bubble(b); });
    (p.people || []).forEach(function (o) {
      if (o.say) out += bubble({ x: o.x, y: o.y - 106 * (o.s || 1), w: o.sw || 130, t: o.say, tail: 'down' });
    });
    (p.labels || []).forEach(function (l) {
      out += '<text x="' + l.x + '" y="' + l.y + '" text-anchor="middle" font-size="' + (l.fs || 12) +
        '" font-weight="800" fill="' + (l.c || INK) + '">' + esc(l.t) + '</text>';
    });
    return '<svg class="cpanel" viewBox="0 0 340 210" role="img" ' +
      'xmlns:xlink="http://www.w3.org/1999/xlink">' + out + '</svg>';
  }

  /* ───────── 뷰어 ───────── */
  function get(id) { return (window.COMICS || {})[id]; }
  function forConcept(c) {
    var all = window.COMICS || {};
    for (var k in all) {
      if ((all[k].concepts || []).indexOf(c.id) >= 0) return { id: k, comic: all[k] };
    }
    return null;
  }

  /* 컨테이너 안에 한 컷씩 넘겨 보는 뷰어를 심는다 */
  function mount(root, id, opts) {
    var cm = get(id);
    if (!root || !cm) return;
    opts = opts || {};
    var i = Math.max(0, Math.min(cm.panels.length - 1, opts.start || 0));
    var focus = typeof opts.focus === 'number' ? opts.focus : -1;

    function draw() {
      var p = cm.panels[i];
      root.innerHTML =
        '<div class="comic">' +
          '<div class="cm-top"><span class="cm-ti">🎬 ' + esc(cm.title) + '</span>' +
          '<span class="cm-n">' + (i + 1) + ' / ' + cm.panels.length + '</span></div>' +
          panel(p) +
          (p.narr ? '<div class="cm-narr">' + esc(p.narr) + '</div>' : '') +
          '<div class="cm-nav">' +
            '<button class="cm-b" data-d="-1"' + (i === 0 ? ' disabled' : '') + '>‹ 이전</button>' +
            '<span class="cm-dots">' + cm.panels.map(function (_, k) {
              return '<i class="' + (k === i ? 'on' : '') + (k === focus ? ' key' : '') + '" data-j="' + k + '"></i>';
            }).join('') + '</span>' +
            '<button class="cm-b" data-d="1"' + (i === cm.panels.length - 1 ? ' disabled' : '') + '>다음 ›</button>' +
          '</div>' +
          (focus >= 0 ? '<div class="cm-key">노란 점이 지금 배우는 개념의 핵심 컷입니다. ' +
            '이 만화는 여러 개념을 함께 다룹니다.</div>' : '') +
          (cm.src ? '<div class="cm-src">출처 영상: ' + esc(cm.src) + '</div>' : '') +
        '</div>';
      root.querySelectorAll('[data-d]').forEach(function (b) {
        b.addEventListener('click', function () {
          i = Math.max(0, Math.min(cm.panels.length - 1, i + parseInt(b.getAttribute('data-d'), 10)));
          draw();
        });
      });
      root.querySelectorAll('[data-j]').forEach(function (b) {
        b.addEventListener('click', function () { i = parseInt(b.getAttribute('data-j'), 10); draw(); });
      });
    }
    draw();
  }

  window.Comic = { panel: panel, person: person, bubble: bubble, mount: mount, get: get,
    forConcept: forConcept, CAST: CAST };
})();
