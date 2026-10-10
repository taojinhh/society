/* 핵심 그림 — 개념마다 들어가는 손그림 느낌의 SVG 삽화
   글을 읽기 전에 그림 한 장으로 "아, 이거구나"가 되게 하는 것이 목적이다. */
(function () {
  'use strict';

  var C = {
    ink: '#1b2330', sub: '#6b7688', line: '#cbd5e1', sky: '#dbeafe', grass: '#bbf7d0',
    sand: '#fde68a', wood: '#d6a56a', brick: '#e7cba9', roof: '#94a3b8', blue: '#2f6df6',
    lblue: '#93b4fb', red: '#ef4444', green: '#10b981', amber: '#f59e0b', pink: '#f9a8d4',
    gray: '#e2e8f0', dark: '#475569', white: '#ffffff'
  };
  var K = 'stroke="' + C.ink + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"';
  function k(c, w) {
    return 'stroke="' + (c || C.ink) + '" stroke-width="' + (w || 2) +
      '" stroke-linecap="round" stroke-linejoin="round" fill="none"';
  }

  /* ── 자주 쓰는 조각 ── */
  function person(x, y, c) {           // y = 발끝
    c = c || C.blue;
    return '<circle cx="' + x + '" cy="' + (y - 21) + '" r="4.6" fill="' + c + '"/>' +
      '<path d="M' + x + ' ' + (y - 16) + 'v9 M' + (x - 6) + ' ' + (y - 12) + 'h12 M' +
      x + ' ' + (y - 7) + 'l-5 7 M' + x + ' ' + (y - 7) + 'l5 7" ' + k(c, 2.4) + '/>';
  }
  function tree(x, y, s) {
    s = s || 1;
    return '<path d="M' + x + ' ' + (y - 30 * s) + 'l' + (11 * s) + ' ' + (21 * s) +
      'h' + (-22 * s) + 'z" fill="#34d399"/>' +
      '<rect x="' + (x - 2 * s) + '" y="' + (y - 9 * s) + '" width="' + (4 * s) +
      '" height="' + (9 * s) + '" fill="#92400e" rx="1"/>';
  }
  function palm(x, y) {
    return '<path d="M' + x + ' ' + y + 'q2-16 -1-26" ' + k('#92400e', 2.6) + '/>' +
      '<path d="M' + (x - 1) + ' ' + (y - 26) + 'q-13-6-16 2 M' + (x - 1) + ' ' + (y - 26) +
      'q13-7 17 1 M' + (x - 1) + ' ' + (y - 26) + 'q-7-11-16-9 M' + (x - 1) + ' ' + (y - 26) +
      'q8-11 16-7" ' + k('#16a34a', 2.4) + '/>';
  }
  function sun(x, y) {
    return '<circle cx="' + x + '" cy="' + y + '" r="8" fill="' + C.amber + '"/>' +
      '<path d="M' + x + ' ' + (y - 13) + 'v-4 M' + x + ' ' + (y + 13) + 'v4 M' + (x - 13) + ' ' + y +
      'h-4 M' + (x + 13) + ' ' + y + 'h4" ' + k(C.amber, 2) + '/>';
  }
  function hArrow(x1, x2, y, c) {
    c = c || C.blue;
    var d = x2 > x1 ? -1 : 1;
    return '<path d="M' + x1 + ' ' + y + 'H' + x2 + '" ' + k(c, 2.4) + '/>' +
      '<path d="M' + x2 + ' ' + y + 'l' + (6 * d) + ' -4 M' + x2 + ' ' + y + 'l' + (6 * d) + ' 4" ' + k(c, 2.4) + '/>';
  }
  function vArrow(y1, y2, x, c) {
    c = c || C.blue;
    var d = y2 > y1 ? -1 : 1;
    return '<path d="M' + x + ' ' + y1 + 'V' + y2 + '" ' + k(c, 2.4) + '/>' +
      '<path d="M' + x + ' ' + y2 + 'l-4 ' + (6 * d) + ' M' + x + ' ' + y2 + 'l4 ' + (6 * d) + '" ' + k(c, 2.4) + '/>';
  }
  function lbl(x, y, t, c, sz) {
    return '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-size="' + (sz || 9) +
      '" font-weight="700" fill="' + (c || C.sub) + '">' + t + '</text>';
  }
  function ground(y, c) {
    return '<rect x="0" y="' + y + '" width="200" height="' + (110 - y) + '" fill="' + (c || C.grass) + '"/>';
  }
  function bldg(x, y, w, h, c) {
    var win = '';
    for (var r = 0; r < Math.floor(h / 10); r++)
      for (var q = 0; q < Math.floor(w / 9); q++)
        win += '<rect x="' + (x + 3 + q * 9) + '" y="' + (y - h + 4 + r * 10) +
          '" width="4" height="5" fill="' + C.white + '" opacity=".85"/>';
    return '<rect x="' + x + '" y="' + (y - h) + '" width="' + w + '" height="' + h +
      '" rx="2" fill="' + (c || C.roof) + '"/>' + win;
  }

  /* ───────────────── 장면들 ───────────────── */
  var A = {};

  /* 단원 I — 네 가지 관점 */
  A.lens = function () {
    var cx = 100, cy = 56;
    var eye = [[38, 26, '🕐'], [162, 26, ''], [38, 86, ''], [162, 86, '']];
    return '<rect width="200" height="110" fill="' + C.sky + '" rx="10"/>' +
      '<path d="M38 30L100 56 162 30M38 80L100 56 162 80" ' + k(C.lblue, 1.6) + '/>' +
      '<g><rect x="' + (cx - 16) + '" y="' + (cy - 8) + '" width="32" height="22" rx="2" fill="' + C.white + '"/>' +
      '<path d="M' + (cx - 20) + ' ' + (cy - 8) + 'l20-13 20 13" ' + k(C.ink, 2.2) + '/>' +
      '<rect x="' + (cx - 16) + '" y="' + (cy - 8) + '" width="32" height="22" rx="2" ' + K + '/>' +
      lbl(cx, cy + 26, '사회 현상', C.ink, 9) + '</g>' +
      '<circle cx="38" cy="26" r="15" fill="' + C.white + '"/><circle cx="38" cy="26" r="15" ' + K + '/>' +
      '<path d="M38 19v7l5 3" ' + k(C.blue, 2.2) + '/>' + lbl(38, 50, '시간', C.blue) +
      '<circle cx="162" cy="26" r="15" fill="' + C.white + '"/><circle cx="162" cy="26" r="15" ' + K + '/>' +
      '<path d="M162 33c5-7 7-9 7-13a7 7 0 0 0-14 0c0 4 2 6 7 13z" ' + k(C.green, 2.2) + '/>' +
      lbl(162, 50, '공간', C.green) +
      '<circle cx="38" cy="80" r="15" fill="' + C.white + '"/><circle cx="38" cy="80" r="15" ' + K + '/>' +
      '<path d="M31 86h14M31 80h14M31 74h14" ' + k(C.amber, 2.2) + '/>' + lbl(38, 104, '사회', C.amber) +
      '<circle cx="162" cy="80" r="15" fill="' + C.white + '"/><circle cx="162" cy="80" r="15" ' + K + '/>' +
      '<path d="M162 87c-6-4-9-7-9-11a4.5 4.5 0 0 1 9-2 4.5 4.5 0 0 1 9 2c0 4-3 7-9 11z" ' + k(C.red, 2.2) + '/>' +
      lbl(162, 104, '윤리', C.red);
  };

  /* 단원 II — 행복의 네 기둥 */
  A.happy = function () {
    var p = [[34, '집', C.green], [72, '돈', C.amber], [128, '투표', C.blue], [166, '마음', C.red]];
    var out = '<rect width="200" height="110" fill="#fff7ed" rx="10"/>' + ground(92, '#fed7aa');
    p.forEach(function (o) {
      out += '<rect x="' + (o[0] - 13) + '" y="52" width="26" height="40" rx="3" fill="' + C.white + '"/>' +
        '<rect x="' + (o[0] - 13) + '" y="52" width="26" height="40" rx="3" ' + K + '/>' +
        '<circle cx="' + o[0] + '" cy="64" r="7" fill="' + o[2] + '"/>' + lbl(o[0], 84, o[1], C.ink, 8.5);
    });
    out += '<path d="M20 52h160" ' + k(C.ink, 2.4) + '/>' + person(100, 50, C.red) +
      '<path d="M92 24q8-9 16 0" ' + k(C.amber, 2.2) + '/>' + lbl(100, 16, '행복', C.ink, 10);
    return out;
  };

  /* 기후별 가옥 */
  A['house-tropic'] = function () {
    return '<rect width="200" height="110" fill="#e0f2fe" rx="10"/>' + ground(86, '#86efac') +
      '<path d="M40 24l6 8M60 18l4 9M150 22l5 8M170 30l4 8" ' + k(C.lblue, 2.4) + '/>' +
      palm(36, 86) + palm(172, 86) +
      '<path d="M78 86v-16M92 86v-16M110 86v-16M124 86v-16" ' + k('#92400e', 3) + '/>' +
      '<rect x="72" y="48" width="58" height="22" fill="' + C.brick + '"/>' +
      '<path d="M66 48l35-20 35 20z" fill="#a16207"/>' +
      '<rect x="72" y="48" width="58" height="22" ' + K + '/>' +
      '<path d="M66 48l35-20 35 20" ' + K + '/>' +
      '<rect x="92" y="54" width="16" height="16" fill="' + C.white + '"/>' +
      lbl(101, 104, '기둥 위에 띄워 짓는다 — 열기·습기·해충', C.dark, 8.5);
  };
  A['house-desert'] = function () {
    return '<rect width="200" height="110" fill="#fef3c7" rx="10"/>' +
      '<path d="M0 88q40-16 80-4t120-6v32H0z" fill="#fcd34d"/>' + sun(168, 24) +
      '<rect x="62" y="52" width="46" height="34" fill="' + C.brick + '"/>' +
      '<rect x="108" y="62" width="28" height="24" fill="#d9b48a"/>' +
      '<path d="M58 52h54M104 62h36" ' + k(C.ink, 2.4) + '/>' +
      '<rect x="62" y="52" width="46" height="34" ' + K + '/>' +
      '<rect x="108" y="62" width="28" height="24" ' + K + '/>' +
      '<rect x="72" y="62" width="9" height="9" fill="' + C.white + '"/>' +
      '<rect x="88" y="62" width="9" height="9" fill="' + C.white + '"/>' +
      '<rect x="80" y="76" width="12" height="10" fill="#92400e"/>' + palm(28, 88) +
      lbl(100, 104, '평평한 지붕·작은 창 — 비가 거의 없고 일교차가 크다', C.dark, 8.5);
  };
  A['house-temperate'] = function () {
    return '<rect width="200" height="110" fill="#eff6ff" rx="10"/>' + ground(84, '#bbf7d0') +
      '<path d="M0 84h200" ' + k('#4ade80', 2) + '/>' +
      '<path d="M10 92q12-5 24 0M46 92q12-5 24 0M130 92q12-5 24 0M166 92q12-5 24 0" ' + k('#22c55e', 2) + '/>' +
      '<path d="M60 56h80l-6 28H66z" fill="' + C.brick + '"/>' +
      '<path d="M52 56q48-26 96 0z" fill="#64748b"/>' +
      '<path d="M52 56q48-26 96 0" ' + K + '/>' +
      '<path d="M60 56h80l-6 28H66z" ' + K + '/>' +
      '<rect x="78" y="64" width="18" height="20" fill="' + C.white + '"/>' +
      '<rect x="106" y="64" width="18" height="20" fill="' + C.white + '"/>' +
      '<path d="M87 64v20M78 74h18M115 64v20M106 74h18" ' + k(C.ink, 1.4) + '/>' +
      tree(26, 84, .8) + tree(176, 84, .8) +
      lbl(100, 104, '사계절이 뚜렷 — 벼농사와 인구 밀집', C.dark, 8.5);
  };
  A['house-cold'] = function () {
    return '<rect width="200" height="110" fill="#eef6ff" rx="10"/>' + ground(84, '#f1f5f9') +
      '<path d="M24 20v3M40 30v3M58 16v3M150 22v3M168 32v3M184 18v3" ' + k(C.lblue, 2.6) + '/>' +
      '<path d="M22 84q0-30 22-30t22 30z" fill="#e2e8f0"/>' +
      '<path d="M22 84q0-30 22-30t22 30" ' + K + '/>' +
      '<path d="M36 84v-12q8-8 16 0v12" ' + k(C.ink, 2) + ' fill="#cbd5e1"/>' +
      '<rect x="100" y="54" width="60" height="30" fill="' + C.wood + '"/>' +
      '<path d="M94 54l36-18 36 18z" fill="#b45309"/>' +
      '<rect x="100" y="54" width="60" height="30" ' + K + '/>' +
      '<path d="M94 54l36-18 36 18" ' + K + '/>' +
      '<path d="M100 62h60M100 70h60M100 78h60" ' + k('#92400e', 1.4) + '/>' +
      '<rect x="120" y="66" width="18" height="18" fill="#7c2d12"/>' +
      '<path d="M108 30q-5 6 0 10" ' + k(C.line, 2) + '/>' +
      lbl(100, 104, '두꺼운 벽·작은 창 — 보온이 먼저다', C.dark, 8.5);
  };

  /* 자연관 */
  A['nature-anthro'] = function () {
    return '<rect width="200" height="110" fill="#fef2f2" rx="10"/>' + ground(88, '#fecaca') +
      '<circle cx="62" cy="40" r="26" fill="' + C.white + '" opacity=".7"/>' +
      tree(48, 88, .7) + tree(76, 88, .6) +
      '<circle cx="46" cy="70" r="4" fill="#16a34a"/>' +
      person(140, 88, C.red) +
      '<rect x="150" y="60" width="4" height="22" fill="#92400e" transform="rotate(20 152 70)"/>' +
      '<path d="M156 58l10-4-3 10z" fill="' + C.dark + '"/>' +
      hArrow(112, 84, 62, C.red) + lbl(98, 52, '이용·정복', C.red, 9) +
      lbl(100, 104, '자연은 인간을 위한 수단 — 인간 중심주의', C.dark, 8.5);
  };
  A['nature-eco'] = function () {
    return '<rect width="200" height="110" fill="#ecfdf5" rx="10"/>' +
      '<circle cx="100" cy="52" r="42" fill="' + C.white + '" opacity=".75"/>' +
      '<circle cx="100" cy="52" r="42" ' + k(C.green, 2.4) + ' stroke-dasharray="5 4"/>' +
      person(74, 74, C.green) + tree(122, 76, .7) +
      '<path d="M96 30q6-6 12 0" ' + k(C.dark, 2) + '/>' +
      '<circle cx="128" cy="36" r="4" fill="' + C.amber + '"/>' +
      '<path d="M60 40q6-5 12 0q6-5 12 0" ' + k(C.lblue, 2) + '/>' +
      lbl(100, 100, '인간도 생태계의 한 구성원 — 생태 중심주의', C.dark, 8.5);
  };
  A.treaty = function () {
    return '<rect width="200" height="110" fill="#eff6ff" rx="10"/>' +
      '<circle cx="54" cy="52" r="28" fill="#7dd3fc"/>' +
      '<path d="M32 40q22 8 44 0M30 60q24-8 48 0M54 24v56" ' + k(C.white, 2) + '/>' +
      '<circle cx="54" cy="52" r="28" ' + K + '/>' +
      '<rect x="104" y="28" width="62" height="50" rx="3" fill="' + C.white + '"/>' +
      '<rect x="104" y="28" width="62" height="50" rx="3" ' + K + '/>' +
      '<path d="M114 42h42M114 52h42M114 62h26" ' + k(C.line, 2.4) + '/>' +
      '<path d="M132 70q10-8 20-2" ' + k(C.blue, 2.2) + '/>' +
      lbl(100, 98, '국경을 넘는 문제는 나라끼리 약속으로', C.dark, 8.5);
  };

  /* 단원 IV — 문화 */
  A.culture = function () {
    return '<rect width="200" height="110" fill="#faf5ff" rx="10"/>' +
      '<path d="M14 66q22-30 52-18t44-14 54 10v36H14z" fill="#e9d5ff"/>' +
      '<path d="M14 66q22-30 52-18t44-14 54 10" ' + k('#a855f7', 2.2) + '/>' +
      person(44, 96, '#a855f7') + person(100, 96, C.amber) + person(156, 96, C.green) +
      '<path d="M38 56h12M96 46h12M150 52h12" ' + k(C.ink, 2) + '/>' +
      lbl(100, 20, '지역마다 다른 생활 양식', C.dark, 9);
  };
  A['invent-discover'] = function () {
    return '<rect width="200" height="110" fill="#fffbeb" rx="10"/>' +
      '<path d="M100 14v84" ' + k(C.line, 1.6) + ' stroke-dasharray="4 4"/>' +
      '<path d="M50 62a14 14 0 1 1 20 0c-3 3-4 5-4 8h-12c0-3-1-5-4-8z" fill="' + C.amber + '"/>' +
      '<path d="M50 62a14 14 0 1 1 20 0c-3 3-4 5-4 8h-12c0-3-1-5-4-8z" ' + K + '/>' +
      '<path d="M54 76h12M56 82h8" ' + k(C.ink, 2) + '/>' +
      lbl(60, 92, '발명', C.ink, 11) + lbl(60, 103, '없던 것을 만듦', C.sub, 8) +
      '<circle cx="136" cy="52" r="15" ' + k(C.dark, 3) + '/>' +
      '<path d="M147 63l10 10" ' + k(C.dark, 3.4) + '/>' +
      '<path d="M130 52l5 6 8-10" ' + k(C.green, 2.6) + '/>' +
      lbl(140, 92, '발견', C.ink, 11) + lbl(140, 103, '있던 것을 찾음', C.sub, 8);
  };
  A.spread = function () {
    return '<rect width="200" height="110" fill="#eff6ff" rx="10"/>' +
      person(20, 56, C.blue) + person(48, 56, C.green) + hArrow(28, 40, 44, C.ink) +
      lbl(34, 74, '직접', C.ink, 8.5) + lbl(34, 86, '사람이 감', C.sub, 7.5) +
      '<path d="M76 14v84" ' + k(C.line, 1.4) + ' stroke-dasharray="4 4"/>' +
      '<rect x="88" y="34" width="26" height="18" rx="2" fill="' + C.white + '"/>' +
      '<rect x="88" y="34" width="26" height="18" rx="2" ' + K + '/>' +
      '<path d="M101 34v-8M96 22l5 4 5-4" ' + k(C.blue, 2) + '/>' + person(101, 74, C.green) +
      lbl(101, 88, '간접 — 매체', C.sub, 7.5) +
      '<path d="M128 14v84" ' + k(C.line, 1.4) + ' stroke-dasharray="4 4"/>' +
      lbl(146, 34, 'A', C.dark, 13) + hArrow(156, 172, 30, C.amber) +
      lbl(180, 34, 'B', C.green, 13) +
      '<path d="M146 42v10M180 42v10" ' + k(C.line, 1.6) + '/>' +
      lbl(163, 74, '자극', C.ink, 8.5) + lbl(163, 86, '보고 새로 만듦', C.sub, 7.5);
  };
  A.acculturation = function () {
    function box(x, c, t) {
      return '<rect x="' + x + '" y="30" width="18" height="18" rx="3" fill="' + c + '"/>' +
        '<rect x="' + x + '" y="30" width="18" height="18" rx="3" ' + K + '/>' + (t || '');
    }
    return '<rect width="200" height="110" fill="#f0fdfa" rx="10"/>' +
      box(8, C.blue) + lbl(30, 44, '+', C.ink, 13) + box(38, C.red) + hArrow(60, 76, 39, C.ink) +
      box(80, C.red) + lbl(52, 66, '동화', C.ink, 9) + lbl(52, 78, '하나가 사라짐', C.sub, 7.5) +
      '<path d="M104 14v84" ' + k(C.line, 1.4) + ' stroke-dasharray="4 4"/>' +
      box(112, C.blue) + box(134, C.red) + lbl(133, 66, '병존', C.ink, 9) +
      lbl(133, 78, '둘 다 남음', C.sub, 7.5) +
      '<path d="M160 14v84" ' + k(C.line, 1.4) + ' stroke-dasharray="4 4"/>' +
      '<rect x="172" y="30" width="18" height="18" rx="3" fill="#a855f7"/>' +
      '<rect x="172" y="30" width="18" height="18" rx="3" ' + K + '/>' +
      lbl(181, 66, '융합', C.ink, 9) + lbl(181, 78, '새것이 생김', C.sub, 7.5);
  };
  A.attitudes = function () {
    function fig(x, my, oy, c1, c2, t, s) {
      return person(x - 11, my, c1) + person(x + 11, oy, c2) + lbl(x, 96, t, C.ink, 9) +
        lbl(x, 106, s, C.sub, 7.5);
    }
    return '<rect width="200" height="110" fill="#fdf4ff" rx="10"/>' +
      '<path d="M16 62h44M74 62h44M132 62h52" ' + k(C.line, 1.6) + '/>' +
      fig(38, 62, 82, C.blue, C.sub, '자문화 중심', '내가 위') +
      fig(96, 82, 62, C.sub, C.blue, '사대주의', '내가 아래') +
      fig(158, 62, 62, C.blue, C.green, '상대주의', '나란히');
  };
  A['melting-salad'] = function () {
    return '<rect width="200" height="110" fill="#fff7ed" rx="10"/>' +
      '<path d="M22 34h54l-8 44H30z" fill="#fb923c"/>' +
      '<path d="M22 34h54l-8 44H30z" ' + K + '/>' +
      '<circle cx="49" cy="58" r="10" fill="' + C.amber + '"/>' +
      lbl(49, 94, '용광로 — 하나로 녹임', C.dark, 8.5) +
      '<path d="M100 14v84" ' + k(C.line, 1.4) + ' stroke-dasharray="4 4"/>' +
      '<path d="M120 48h60q-4 30-30 30t-30-30z" fill="' + C.white + '"/>' +
      '<path d="M120 48h60q-4 30-30 30t-30-30z" ' + K + '/>' +
      '<circle cx="136" cy="58" r="6" fill="' + C.red + '"/>' +
      '<circle cx="152" cy="62" r="6" fill="' + C.green + '"/>' +
      '<circle cx="168" cy="57" r="6" fill="' + C.blue + '"/>' +
      lbl(150, 94, '샐러드 볼 — 각자 살림', C.dark, 8.5);
  };

  /* 단원 V — 도시 */
  A.city = function () {
    return '<rect width="200" height="110" fill="#f1f5f9" rx="10"/>' + ground(88, '#e2e8f0') +
      '<rect x="16" y="70" width="26" height="18" fill="' + C.brick + '"/>' +
      '<path d="M11 70l18-13 18 13" ' + K + '/>' +
      '<rect x="16" y="70" width="26" height="18" ' + K + '/>' +
      '<rect x="25" y="78" width="9" height="10" fill="#92400e"/>' +
      '<path d="M6 92q10-5 20 0M34 92q10-5 20 0" ' + k('#22c55e', 2) + '/>' +
      lbl(29, 50, '농촌', C.dark, 9) +
      bldg(76, 88, 18, 24, '#94a3b8') + bldg(100, 88, 20, 40, '#64748b') +
      bldg(126, 88, 18, 32, '#94a3b8') + bldg(150, 88, 24, 52, '#475569') +
      lbl(126, 24, '도시', C.dark, 9) +
      hArrow(50, 70, 62, C.blue) + lbl(60, 54, '이촌 향도', C.blue, 8.5) +
      lbl(100, 102, '일자리를 찾아 도시로 — 건물이 높아진다', C.dark, 8.5);
  };
  A['city-inner'] = function () {
    return '<rect width="200" height="110" fill="#f8fafc" rx="10"/>' + ground(88, '#e2e8f0') +
      bldg(88, 88, 26, 56, '#475569') + lbl(101, 24, '도심', C.ink, 9) +
      bldg(24, 88, 18, 20, '#cbd5e1') + bldg(48, 88, 16, 16, '#cbd5e1') +
      bldg(140, 88, 16, 18, '#cbd5e1') + bldg(162, 88, 18, 22, '#cbd5e1') +
      hArrow(76, 56, 50, C.red) + hArrow(126, 146, 50, C.red) +
      lbl(58, 44, '주거·공업', C.red, 7.5) + lbl(146, 44, '이심', C.red, 8) +
      hArrow(40, 80, 70, C.blue) + lbl(58, 80, '집심', C.blue, 8) +
      lbl(100, 102, '비싼 땅값을 감당하면 남고, 못 하면 나간다', C.dark, 8.5);
  };
  A.donut = function () {
    return '<rect width="200" height="110" fill="#fff7ed" rx="10"/>' +
      '<circle cx="62" cy="52" r="30" fill="#fdba74"/>' +
      '<circle cx="62" cy="52" r="12" fill="#fff7ed"/>' +
      '<circle cx="62" cy="52" r="30" ' + K + '/><circle cx="62" cy="52" r="12" ' + K + '/>' +
      lbl(62, 96, '도심이 비는 모양', C.dark, 8.5) +
      sun(140, 30) + lbl(140, 48, '낮 — 사람 많음', C.ink, 8.5) +
      '<path d="M132 66a9 9 0 1 0 12 12 11 11 0 0 1-12-12z" fill="' + C.dark + '"/>' +
      lbl(140, 96, '밤 — 사람 적음', C.ink, 8.5);
  };

  /* 단원 VI — 인권 */
  A.rights = function () {
    return '<rect width="200" height="110" fill="#eff6ff" rx="10"/>' +
      '<path d="M100 14l34 14v24c0 24-15 38-34 46-19-8-34-22-34-46V28z" fill="' + C.white + '"/>' +
      '<path d="M100 14l34 14v24c0 24-15 38-34 46-19-8-34-22-34-46V28z" ' + k(C.blue, 2.4) + '/>' +
      person(100, 74, C.blue) +
      lbl(100, 104, '사람이라는 이유만으로 누리는 권리', C.dark, 8.5);
  };
  A['rights-gen'] = function () {
    return '<rect width="200" height="110" fill="#f0f9ff" rx="10"/>' +
      '<rect x="16" y="66" width="52" height="24" fill="#bfdbfe"/>' +
      '<rect x="72" y="48" width="52" height="42" fill="#93c5fd"/>' +
      '<rect x="128" y="30" width="52" height="60" fill="#60a5fa"/>' +
      '<path d="M16 66h52v24M72 48h52v42M128 30h52v60" ' + k(C.ink, 2) + '/>' +
      lbl(42, 80, '1세대', C.ink, 9) + lbl(42, 90, '자유권', C.dark, 8) +
      lbl(98, 66, '2세대', C.ink, 9) + lbl(98, 76, '사회권', C.dark, 8) +
      lbl(154, 50, '3세대', C.white, 9) + lbl(154, 60, '연대권', C.white, 8) +
      lbl(100, 22, '간섭 말라 → 보장해 달라 → 함께 하자', C.dark, 8.5);
  };
  A.basic5 = function () {
    var t = ['자유', '평등', '참정', '청구', '사회'];
    var out = '<rect width="200" height="110" fill="#f5f3ff" rx="10"/>' +
      '<path d="M40 40q60-30 120 0z" fill="#c4b5fd"/>' +
      '<path d="M40 40q60-30 120 0" ' + K + '/><path d="M100 40v14" ' + k(C.ink, 2.4) + '/>' +
      lbl(100, 20, '기본권', C.ink, 10);
    t.forEach(function (s, i) {
      var x = 24 + i * 38;
      out += '<path d="M100 54L' + x + ' 72" ' + k('#8b5cf6', 1.8) + '/>' +
        '<rect x="' + (x - 17) + '" y="72" width="34" height="18" rx="9" fill="' + C.white + '"/>' +
        '<rect x="' + (x - 17) + '" y="72" width="34" height="18" rx="9" ' + k('#8b5cf6', 2) + '/>' +
        lbl(x, 85, s, C.ink, 9);
    });
    return out + lbl(100, 105, '자유·평등·참정·청구·사회', C.dark, 8);
  };

  /* 단원 VII — 정의 */
  A.scale = function () {
    return '<rect width="200" height="110" fill="#fffbeb" rx="10"/>' +
      '<path d="M100 20v62M76 88h48" ' + k(C.ink, 3) + '/>' +
      '<path d="M100 82q-14 0-24 6M100 82q14 0 24 6" ' + k(C.ink, 2) + '/>' +
      '<path d="M40 30h120" ' + k(C.ink, 3) + '/>' +
      '<path d="M40 30v10M160 30v10" ' + k(C.ink, 2) + '/>' +
      '<path d="M24 40h32l-6 16H30z" fill="' + C.amber + '"/>' +
      '<path d="M24 40h32l-6 16H30z" ' + K + '/>' +
      '<path d="M144 40h32l-6 16h-20z" fill="' + C.amber + '"/>' +
      '<path d="M144 40h32l-6 16h-20z" ' + K + '/>' +
      '<circle cx="100" cy="20" r="5" fill="' + C.ink + '"/>' +
      lbl(100, 104, '각자에게 정당한 몫을 — 정의', C.dark, 8.5);
  };
  A.dist3 = function () {
    function pie(cx, cut, t, s) {
      return '<circle cx="' + cx + '" cy="44" r="20" fill="#fde68a"/>' +
        '<circle cx="' + cx + '" cy="44" r="20" ' + K + '/>' + cut +
        lbl(cx, 80, t, C.ink, 9) + lbl(cx, 92, s, C.sub, 7.5);
    }
    return '<rect width="200" height="110" fill="#fff7ed" rx="10"/>' +
      pie(38, '<path d="M38 44L38 24M38 44l17 10M38 44l-17 10" ' + k(C.ink, 2) + '/>', '업적', '한 만큼') +
      pie(100, '<path d="M100 44l20 0M100 44l-14 14M100 44l-6-19" ' + k(C.ink, 2) + '/>', '능력', '할 수 있는 만큼') +
      pie(162, '<path d="M162 44l20-4M162 44l-4 20M162 44l-19-9" ' + k(C.ink, 2) + '/>', '필요', '부족한 만큼');
  };
  A.justice2 = function () {
    return '<rect width="200" height="110" fill="#eef2ff" rx="10"/>' +
      '<circle cx="54" cy="50" r="30" fill="' + C.white + '"/>' +
      '<circle cx="54" cy="50" r="30" ' + k(C.blue, 2.4) + ' stroke-dasharray="5 4"/>' +
      person(54, 66, C.blue) + lbl(54, 94, '자유주의', C.ink, 10) + lbl(54, 105, '나의 선택', C.sub, 8) +
      '<circle cx="146" cy="50" r="32" fill="' + C.white + '"/>' +
      '<circle cx="146" cy="50" r="32" ' + k(C.green, 2.4) + '/>' +
      person(128, 64, C.green) + person(146, 68, C.green) + person(164, 64, C.green) +
      lbl(146, 94, '공동체주의', C.ink, 10) + lbl(146, 105, '우리의 좋음', C.sub, 8);
  };
  A.welfare3 = function () {
    return '<rect width="200" height="110" fill="#f0fdf4" rx="10"/>' +
      '<rect x="12" y="34" width="46" height="30" rx="4" fill="' + C.white + '"/>' +
      '<rect x="12" y="34" width="46" height="30" rx="4" ' + K + '/>' +
      '<circle cx="26" cy="49" r="6" fill="' + C.amber + '"/><circle cx="44" cy="49" r="6" fill="' + C.blue + '"/>' +
      lbl(35, 80, '사회 보험', C.ink, 9) + lbl(35, 92, '나도 낸다', C.sub, 7.5) +
      '<rect x="76" y="34" width="46" height="30" rx="4" fill="' + C.white + '"/>' +
      '<rect x="76" y="34" width="46" height="30" rx="4" ' + K + '/>' +
      '<circle cx="99" cy="49" r="8" fill="' + C.green + '"/>' + lbl(99, 52, '국가', C.white, 7.5) +
      lbl(99, 80, '공공 부조', C.ink, 9) + lbl(99, 92, '전액 국가', C.sub, 7.5) +
      '<path d="M150 56q-10-10 0-16 10-6 16 4 6-10 16-4 10 6 0 16l-16 12z" fill="#fca5a5"/>' +
      '<path d="M150 56q-10-10 0-16 10-6 16 4 6-10 16-4 10 6 0 16l-16 12z" ' + K + '/>' +
      lbl(166, 80, '사회 서비스', C.ink, 9) + lbl(166, 92, '돈 대신 돌봄', C.sub, 7.5);
  };
  A.equity = function () {
    return '<rect width="200" height="110" fill="#f0f9ff" rx="10"/>' +
      '<path d="M8 40v52M96 40v52" ' + k(C.line, 2) + '/>' +
      '<path d="M8 40h88M104 40h88" ' + k('#a16207', 3) + '/>' +
      '<path d="M104 40v52M192 40v52" ' + k(C.line, 2) + '/>' +
      '<rect x="22" y="78" width="14" height="10" fill="' + C.wood + '"/>' + person(29, 78, C.blue) +
      '<rect x="60" y="78" width="14" height="10" fill="' + C.wood + '"/>' + person(67, 78, C.green) +
      '<rect x="118" y="70" width="14" height="18" fill="' + C.wood + '"/>' + person(125, 70, C.blue) +
      '<rect x="156" y="82" width="14" height="6" fill="' + C.wood + '"/>' + person(163, 82, C.green) +
      lbl(52, 104, '같은 발판 — 형식적 평등', C.dark, 8) +
      lbl(148, 104, '다른 발판 — 실질적 평등', C.dark, 8);
  };

  /* 단원 VIII — 경제 */
  A.market = function () {
    return '<rect width="200" height="110" fill="#f0fdf4" rx="10"/>' +
      '<path d="M26 84V44h40v40z" fill="' + C.white + '"/>' +
      '<path d="M20 44l26-18 26 18" ' + K + '/><path d="M26 84V44h40v40z" ' + K + '/>' +
      '<rect x="36" y="58" width="20" height="26" fill="' + C.amber + '"/>' +
      '<path d="M98 84L130 42l14 18 22-30" ' + k(C.green, 3) + '/>' +
      '<path d="M92 26v58h84" ' + k(C.ink, 2.4) + '/>' +
      '<circle cx="166" cy="30" r="9" fill="' + C.amber + '"/>' + lbl(166, 34, '₩', C.white, 11) +
      lbl(100, 102, '가격이 신호가 되어 자원이 움직인다', C.dark, 8.5);
  };
  A.capital4 = function () {
    var s = [['상업', '배'], ['산업', '공장'], ['수정', '정부'], ['신자유', '자율']];
    var out = '<rect width="200" height="110" fill="#eff6ff" rx="10"/>';
    s.forEach(function (o, i) {
      var x = 14 + i * 47;
      out += '<rect x="' + x + '" y="32" width="38" height="34" rx="4" fill="' + C.white + '"/>' +
        '<rect x="' + x + '" y="32" width="38" height="34" rx="4" ' + K + '/>' +
        lbl(x + 19, 48, o[0], C.ink, 9) + lbl(x + 19, 60, o[1], C.sub, 8);
      if (i < 3) out += hArrow(x + 40, x + 45, 49, C.blue);
    });
    return out + lbl(100, 86, '정부 역할: 통제 → 방임 → 개입 → 축소', C.dark, 9) +
      '<path d="M14 94h172" ' + k(C.line, 1.6) + '/>';
  };
  A['market-fail'] = function () {
    return '<rect width="200" height="110" fill="#fef2f2" rx="10"/>' + ground(88, '#fecaca') +
      '<rect x="20" y="52" width="44" height="36" fill="' + C.dark + '"/>' +
      '<rect x="30" y="34" width="10" height="18" fill="' + C.dark + '"/>' +
      '<path d="M35 32q-6-8 2-12t2-10" ' + k(C.sub, 2.6) + '/>' +
      '<circle cx="46" cy="24" r="6" fill="' + C.line + '"/><circle cx="56" cy="18" r="8" fill="' + C.line + '"/>' +
      lbl(42, 102, '외부 불경제', C.dark, 8.5) +
      '<path d="M100 20v74" ' + k(C.line, 1.4) + ' stroke-dasharray="4 4"/>' +
      '<rect x="128" y="50" width="44" height="38" fill="' + C.white + '"/>' +
      '<path d="M122 50l28-16 28 16" ' + K + '/><rect x="128" y="50" width="44" height="38" ' + K + '/>' +
      lbl(150, 72, '1곳뿐', C.red, 9) + lbl(150, 102, '독과점', C.dark, 8.5);
  };
  A.asset3 = function () {
    return '<rect width="200" height="110" fill="#fffbeb" rx="10"/>' +
      '<path d="M100 20l54 62H46z" fill="' + C.white + '"/>' +
      '<path d="M100 20l54 62H46z" ' + k(C.amber, 2.6) + '/>' +
      '<circle cx="100" cy="20" r="7" fill="' + C.green + '"/>' + lbl(100, 12, '안전성', C.ink, 9) +
      '<circle cx="154" cy="82" r="7" fill="' + C.red + '"/>' + lbl(164, 98, '수익성', C.ink, 9) +
      '<circle cx="46" cy="82" r="7" fill="' + C.blue + '"/>' + lbl(38, 98, '유동성', C.ink, 9) +
      lbl(100, 60, '셋을 다 가질 수는 없다', C.dark, 8.5);
  };
  A.products4 = function () {
    return '<rect width="200" height="110" fill="#f0fdfa" rx="10"/>' +
      '<path d="M16 56q0-12 16-12t16 12-16 12-16-12z" fill="#fca5a5"/>' +
      '<path d="M28 42v-6h8v6" ' + k(C.ink, 2) + '/>' + lbl(32, 84, '예금', C.ink, 9) +
      '<path d="M66 70l10-16 10 10 12-22" ' + k(C.green, 3) + '/>' + lbl(82, 84, '주식', C.ink, 9) +
      '<rect x="112" y="40" width="32" height="24" rx="2" fill="' + C.white + '"/>' +
      '<rect x="112" y="40" width="32" height="24" rx="2" ' + K + '/>' +
      '<path d="M118 48h20M118 56h12" ' + k(C.line, 2) + '/>' + lbl(128, 84, '채권', C.ink, 9) +
      '<path d="M158 44h32l-5 22h-22z" fill="#fcd34d"/>' +
      '<path d="M158 44h32l-5 22h-22z" ' + K + '/>' +
      '<circle cx="168" cy="54" r="4" fill="' + C.red + '"/><circle cx="180" cy="54" r="4" fill="' + C.blue + '"/>' +
      lbl(174, 84, '펀드', C.ink, 9) +
      lbl(100, 100, '안전할수록 덜 벌고, 많이 벌수록 위험하다', C.dark, 8.5);
  };
  A.trade = function () {
    return '<rect width="200" height="110" fill="#eff6ff" rx="10"/>' +
      '<rect x="0" y="72" width="200" height="38" fill="#bfdbfe"/>' +
      '<path d="M10 72q22-24 44 0z" fill="#86efac"/>' +
      '<path d="M146 72q22-24 44 0z" fill="#fcd34d"/>' +
      lbl(32, 66, '갑국', C.ink, 9) + lbl(168, 66, '을국', C.ink, 9) +
      '<path d="M76 56h34l-5 12H81z" fill="' + C.white + '"/>' +
      '<path d="M76 56h34l-5 12H81z" ' + K + '/><path d="M93 56V42M93 42h12" ' + k(C.ink, 2) + '/>' +
      hArrow(66, 40, 34, C.green) + hArrow(120, 146, 34, C.amber) +
      lbl(100, 96, '서로 잘 만드는 것을 나누어 만든다', C.dark, 8.5);
  };

  /* 단원 IX — 세계화·평화 */
  A.globe = function () {
    return '<rect width="200" height="110" fill="#eff6ff" rx="10"/>' +
      '<circle cx="100" cy="54" r="34" fill="#7dd3fc"/>' +
      '<path d="M72 38q28 10 56 0M70 70q30-10 60 0M100 20v68" ' + k(C.white, 2) + '/>' +
      '<circle cx="100" cy="54" r="34" ' + K + '/>' +
      '<circle cx="34" cy="30" r="5" fill="' + C.blue + '"/><circle cx="170" cy="34" r="5" fill="' + C.green + '"/>' +
      '<circle cx="28" cy="82" r="5" fill="' + C.amber + '"/><circle cx="174" cy="84" r="5" fill="' + C.red + '"/>' +
      '<path d="M39 32q22 6 30 14M165 36q-20 6-28 14M33 79q20-6 30-12M169 81q-20-6-30-12" ' +
      k(C.blue, 1.8) + ' stroke-dasharray="4 3"/>' +
      lbl(100, 104, '국경이 흐려지고 서로 기대어 산다', C.dark, 8.5);
  };
  A.mnc = function () {
    return '<rect width="200" height="110" fill="#f8fafc" rx="10"/>' +
      bldg(24, 60, 26, 40, '#475569') + lbl(37, 14, '본사', C.ink, 9) +
      lbl(37, 74, '선진국', C.sub, 8) +
      '<rect x="92" y="40" width="44" height="30" fill="' + C.dark + '"/>' +
      '<rect x="100" y="28" width="8" height="12" fill="' + C.dark + '"/>' +
      lbl(114, 80, '생산 공장', C.dark, 8.5) + lbl(114, 90, '임금 낮은 곳', C.sub, 8) +
      hArrow(54, 86, 52, C.blue) +
      '<circle cx="176" cy="48" r="14" fill="#fcd34d"/>' + lbl(176, 52, '판매', C.ink, 8.5) +
      hArrow(142, 158, 52, C.amber) +
      lbl(100, 104, '기능마다 유리한 나라에 나누어 둔다', C.dark, 8.5);
  };
  A.peace2 = function () {
    return '<rect width="200" height="110" fill="#f0fdf4" rx="10"/>' +
      '<path d="M20 46h40v10H20z" fill="' + C.dark + '"/>' +
      '<path d="M26 56v8M54 56v8" ' + k(C.dark, 3) + '/>' +
      '<circle cx="40" cy="50" r="22" ' + k(C.red, 3) + '/>' +
      '<path d="M25 35l30 30" ' + k(C.red, 3) + '/>' +
      lbl(40, 88, '소극적 평화', C.ink, 9) + lbl(40, 100, '총성이 멈춤', C.sub, 8) +
      '<path d="M100 20v74" ' + k(C.line, 1.4) + ' stroke-dasharray="4 4"/>' +
      '<path d="M120 58q0-10 10-10t10 10-10 12-10-12z" fill="#60a5fa"/>' +
      '<rect x="146" y="44" width="22" height="16" rx="2" fill="#fcd34d"/>' +
      '<path d="M146 44h22M157 44v16" ' + k(C.ink, 1.6) + '/>' +
      '<path d="M174 60q4-14 12-14" ' + k('#16a34a', 2.6) + '/>' +
      lbl(150, 88, '적극적 평화', C.ink, 9) + lbl(150, 100, '물·교육·기회까지', C.sub, 8);
  };
  A.division = function () {
    return '<rect width="200" height="110" fill="#eff6ff" rx="10"/>' +
      '<path d="M84 16q16-4 22 8t-2 18 6 16-4 16-2 14-14 6-16-10-4-18 2-16-2-18 8-16z" fill="#bbf7d0"/>' +
      '<path d="M84 16q16-4 22 8t-2 18 6 16-4 16-2 14-14 6-16-10-4-18 2-16-2-18 8-16z" ' + K + '/>' +
      '<path d="M66 56h60" ' + k(C.red, 3) + ' stroke-dasharray="7 5"/>' +
      '<path d="M66 50v12M96 50v12M126 50v12" ' + k(C.red, 2) + '/>' +
      lbl(150, 40, '북', C.dark, 10) + lbl(150, 76, '남', C.dark, 10) +
      lbl(100, 102, '분단 비용은 지금도 들고 있다', C.dark, 8.5);
  };

  /* 단원 X — 미래 */
  A.future = function () {
    return '<rect width="200" height="110" fill="#f0fdf4" rx="10"/>' +
      '<circle cx="100" cy="56" r="30" fill="#bbf7d0"/>' +
      '<path d="M100 72v-18q0-12 12-16" ' + k('#16a34a', 2.6) + '/>' +
      '<path d="M112 38q10-4 12-12-12 0-16 8z" fill="#22c55e"/>' +
      '<path d="M100 54q-10-4-12-12 12 0 14 8z" fill="#4ade80"/>' +
      '<circle cx="40" cy="36" r="11" ' + k(C.blue, 2.4) + '/>' +
      '<path d="M40 30v6l4 3" ' + k(C.blue, 2) + '/>' +
      '<rect x="150" y="30" width="24" height="24" rx="4" ' + k(C.dark, 2.4) + '/>' +
      '<circle cx="158" cy="40" r="2.4" fill="' + C.dark + '"/><circle cx="166" cy="40" r="2.4" fill="' + C.dark + '"/>' +
      '<path d="M157 47h10" ' + k(C.dark, 2) + '/>' +
      lbl(100, 102, '기술은 빨라지고, 지구는 하나뿐이다', C.dark, 8.5);
  };
  A.pyramid3 = function () {
    return '<rect width="200" height="110" fill="#fdf2f8" rx="10"/>' +
      '<path d="M34 78L14 78 34 26 54 78z" fill="#93c5fd"/>' +
      lbl(34, 92, '피라미드형', C.ink, 8.5) + lbl(34, 102, '아이 많음', C.sub, 7.5) +
      '<path d="M100 78q-18 0-18-14t4-26q14-6 28 0t4 26-18 14z" fill="#86efac"/>' +
      lbl(100, 92, '종형', C.ink, 8.5) + lbl(100, 102, '안정', C.sub, 7.5) +
      '<path d="M166 78q-14 0-12-16t0-26q12-8 24 0t0 26-12 16z" fill="#fca5a5"/>' +
      '<path d="M156 74h20" ' + k(C.white, 2) + '/>' +
      lbl(166, 92, '방추형', C.ink, 8.5) + lbl(166, 102, '저출산·고령', C.sub, 7.5);
  };
  A.energy2 = function () {
    return '<rect width="200" height="110" fill="#fffbeb" rx="10"/>' + ground(82, '#fde68a') +
      '<path d="M22 82V44h10v38M16 44h22" ' + k(C.dark, 2.6) + '/>' +
      '<path d="M27 44v-10" ' + k(C.dark, 2.6) + '/>' +
      '<rect x="48" y="58" width="30" height="24" fill="' + C.dark + '"/>' +
      lbl(50, 92, '화석 에너지', C.ink, 9) + lbl(50, 103, '유한 · 오염', C.sub, 8) +
      '<path d="M100 20v76" ' + k(C.line, 1.4) + ' stroke-dasharray="4 4"/>' +
      '<path d="M124 82V50" ' + k(C.dark, 2.6) + '/>' +
      '<path d="M124 50l18-8M124 50l-16-10M124 50l2 20" ' + k(C.blue, 2.6) + '/>' +
      '<path d="M156 82l6-22h22l-6 22z" fill="#60a5fa"/>' +
      '<path d="M156 82l6-22h22l-6 22z" ' + K + '/>' +
      '<path d="M163 60l-3 22M170 60l-3 22M177 60l-3 22" ' + k(C.white, 1.6) + '/>' +
      lbl(150, 92, '신 · 재생', C.ink, 9) + lbl(150, 103, '깨끗하나 불안정', C.sub, 8);
  };
  A.sdgs = function () {
    return '<rect width="200" height="110" fill="#eff6ff" rx="10"/>' +
      '<circle cx="78" cy="46" r="26" fill="#93c5fd" opacity=".75"/>' +
      '<circle cx="122" cy="46" r="26" fill="#86efac" opacity=".75"/>' +
      '<circle cx="100" cy="76" r="26" fill="#fcd34d" opacity=".75"/>' +
      lbl(62, 40, '경제', C.ink, 9) + lbl(138, 40, '환경', C.ink, 9) + lbl(100, 92, '사회', C.ink, 9) +
      lbl(100, 56, '지속가능', C.ink, 9) +
      lbl(100, 106, '미래 세대의 몫을 남겨 두는 발전', C.dark, 8.5);
  };

  /* ── 단원 기본 그림 ── */
  var UNIT = {
    u1: 'lens', u2: 'happy', u3: 'nature-eco', u4: 'culture', u5: 'city',
    u6: 'rights', u7: 'scale', u8: 'market', u9: 'globe', u10: 'future'
  };

  /* ── 개념 → 그림 ── */
  var MAP = {
    c101: 'lens', c102: 'lens', c103: 'lens', c104: 'lens', c105: 'lens', c106: 'lens',
    c206: 'happy', c207: 'happy', c208: 'happy', c209: 'happy', c201: 'happy', c203: 'happy',
    c301: 'house-tropic', c302: 'house-desert', c303: 'house-temperate', c304: 'house-cold',
    c305: 'house-temperate', c306: 'house-temperate', c307: 'treaty',
    c309: 'nature-anthro', c311: 'nature-anthro', c310: 'nature-eco', c312: 'nature-eco',
    c313: 'nature-eco', c314: 'sdgs', c315: 'treaty', c316: 'treaty',
    c401: 'culture', c402: 'culture', c403: 'invent-discover',
    c404: 'invent-discover', c405: 'invent-discover',
    c406: 'spread', c407: 'spread', c408: 'spread',
    c409: 'acculturation', c410: 'acculturation', c411: 'acculturation', c412: 'acculturation',
    c414: 'attitudes', c415: 'attitudes', c416: 'attitudes', c417: 'attitudes', c418: 'attitudes',
    c419: 'melting-salad', c420: 'melting-salad', c421: 'melting-salad',
    c501: 'city', c502: 'city', c503: 'city', c504: 'city', c505: 'city',
    c506: 'city-inner', c507: 'city-inner', c508: 'city-inner', c510: 'city-inner',
    c509: 'donut', c511: 'donut', c512: 'city', c513: 'city', c516: 'city-inner',
    c601: 'rights', c602: 'rights', c603: 'rights-gen', c604: 'rights-gen', c605: 'rights-gen',
    c606: 'rights', c607: 'rights', c608: 'rights', c609: 'rights', c610: 'rights',
    c614: 'basic5', c615: 'basic5', c616: 'basic5', c617: 'basic5', c618: 'basic5', c619: 'basic5',
    c611: 'rights', c612: 'rights', c613: 'rights', c621: 'scale', c622: 'equity',
    c701: 'scale', c702: 'dist3', c703: 'dist3', c704: 'dist3', c704b: 'dist3',
    c705: 'justice2', c706: 'justice2', c707: 'justice2', c708: 'justice2', c709: 'justice2',
    c713: 'welfare3', c714: 'welfare3', c715: 'welfare3', c716: 'equity', c717: 'equity',
    c710: 'scale', c711: 'equity', c712: 'equity',
    c801: 'capital4', c802: 'capital4', c803: 'capital4', c804: 'capital4', c805: 'capital4',
    c806: 'market', c807: 'market', c808: 'market', c809: 'market', c810: 'market',
    c811: 'market-fail', c812: 'market-fail', c813: 'market-fail', c814: 'market-fail',
    c817: 'asset3', c818: 'asset3', c819: 'asset3',
    c820: 'products4', c821: 'products4', c822: 'products4', c823: 'products4', c824: 'products4',
    c825: 'products4', c826: 'trade', c827: 'trade', c828: 'trade', c829: 'trade',
    c901: 'globe', c902: 'globe', c903: 'globe', c905: 'globe', c904: 'mnc',
    c906: 'globe', c907: 'globe', c908: 'globe',
    c909: 'peace2', c910: 'peace2', c911: 'peace2', c912: 'peace2',
    c913: 'division', c914: 'division', c915: 'division', c916: 'division',
    c1001: 'pyramid3', c1002: 'pyramid3', c1003: 'pyramid3', c1004: 'pyramid3',
    c1005: 'pyramid3', c1006: 'pyramid3', c1007: 'pyramid3',
    c1008: 'energy2', c1009: 'energy2', c1010: 'energy2', c1011: 'energy2', c1012: 'energy2',
    c1013: 'sdgs', c1014: 'future', c1015: 'future', c1016: 'sdgs'
  };

  /* 대비 쌍 → 그림 */
  var PAIR = {
    'p-view4': 'lens', 'p-happy': 'happy', 'p-happyview': 'happy',
    'p-climate': 'house-tropic', 'p-disaster': 'treaty',
    'p-nature': 'nature-anthro', 'p-thinker-nature': 'nature-eco',
    'p-treaty': 'treaty', 'p-envactor': 'treaty',
    'p-cchange': 'invent-discover', 'p-spread': 'spread', 'p-cresult': 'acculturation',
    'p-cattitude': 'attitudes', 'p-multi': 'melting-salad',
    'p-urban': 'city', 'p-urbanin': 'city-inner', 'p-migration': 'city', 'p-info': 'city',
    'p-hrgen': 'rights-gen', 'p-newhr': 'rights', 'p-basic': 'basic5',
    'p-basic-fs': 'basic5', 'p-remedy': 'scale',
    'p-dist': 'dist3', 'p-justice': 'justice2', 'p-rawls-nozick': 'justice2',
    'p-welfare': 'welfare3', 'p-aa': 'equity',
    'p-capital': 'capital4', 'p-econsys': 'market', 'p-keynes-neo': 'capital4',
    'p-failure': 'market-fail', 'p-external': 'market-fail', 'p-cost': 'market',
    'p-asset': 'asset3', 'p-product': 'products4', 'p-stock-bond': 'products4',
    'p-trade': 'trade', 'p-labor3': 'scale',
    'p-global': 'globe', 'p-igo': 'globe', 'p-peace': 'peace2', 'p-violence': 'peace2',
    'p-eastasia': 'division',
    'p-pop': 'pyramid3', 'p-pyramid': 'pyramid3', 'p-demotrans': 'pyramid3',
    'p-fossil': 'energy2', 'p-energy': 'energy2', 'p-consume': 'sdgs'
  };

  function draw(id) {
    var f = A[id];
    if (!f) return '';
    return '<svg class="art" viewBox="0 0 200 110" role="img" aria-hidden="true">' + f() + '</svg>';
  }
  function forConcept(c) {
    if (!c) return '';
    return draw(MAP[c.id] || UNIT[c.u] || 'lens');
  }
  function forPair(p) {
    if (!p) return '';
    return draw(PAIR[p.id] || UNIT[p.u] || 'lens');
  }
  function forUnit(uid) { return draw(UNIT[uid] || 'lens'); }

  window.Art = { draw: draw, forConcept: forConcept, forPair: forPair, forUnit: forUnit, has: A };
})();
