/* 만화 컷 전용 상세 삽화 — 아이콘 한 개로는 설명이 안 되는 장면을 직접 그린다.
   각 그림은 자기 크기(w, h)를 갖고, place()가 컷 안의 상자에 맞춰 줄여 넣는다. */
(function () {
  'use strict';

  var INK = '#1b2330';
  function k(c, w, d) {                       /* 선 */
    return 'fill="none" stroke="' + (c || INK) + '" stroke-width="' + (w || 2) +
      '" stroke-linecap="round" stroke-linejoin="round"' + (d ? ' stroke-dasharray="' + d + '"' : '');
  }
  function f(c, w) {                          /* 면 + 테두리 */
    return 'fill="' + c + '" stroke="' + INK + '" stroke-width="' + (w == null ? 1.8 : w) +
      '" stroke-linejoin="round" stroke-linecap="round"';
  }
  function t(x, y, s, sz, c) {                /* 가운데 정렬 글자 */
    return '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-size="' + (sz || 8.5) +
      '" font-weight="800" fill="' + (c || '#46506080'.slice(0, 7)) + '">' + s + '</text>';
  }
  function arw(x1, y1, x2, y2, c, w) {        /* 화살표 */
    c = c || '#2f6df6'; w = w || 2.2;
    var dx = x2 - x1, dy = y2 - y1, L = Math.sqrt(dx * dx + dy * dy) || 1;
    var ux = dx / L, uy = dy / L, h = 5.6;
    var lx = x2 - ux * h, ly = y2 - uy * h, px = -uy * 3.4, py = ux * 3.4;
    return '<path d="M' + x1 + ' ' + y1 + 'L' + x2 + ' ' + y2 + '" ' + k(c, w) + '/>' +
      '<path d="M' + x2 + ' ' + y2 + 'L' + (lx + px) + ' ' + (ly + py) +
      'M' + x2 + ' ' + y2 + 'L' + (lx - px) + ' ' + (ly - py) + '" ' + k(c, w) + '/>';
  }
  function sun(x, y, r, c) {
    r = r || 11; c = c || '#fbbf24';
    var ray = '';
    for (var i = 0; i < 8; i++) {
      var a = i * Math.PI / 4;
      ray += 'M' + (x + Math.cos(a) * (r + 3)) + ' ' + (y + Math.sin(a) * (r + 3)) +
        'L' + (x + Math.cos(a) * (r + 7)) + ' ' + (y + Math.sin(a) * (r + 7));
    }
    return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" ' + f(c) + '/>' +
      '<path d="' + ray + '" ' + k(c, 2.2) + '/>';
  }
  function pine(x, y, s) {                    /* 침엽수 — y는 밑동 */
    s = s || 1;
    return '<path d="M' + x + ' ' + (y - 34 * s) + 'l' + (10 * s) + ' ' + (13 * s) + 'h' + (-20 * s) +
      'z" ' + f('#2f8f5b', 1.4) + '/>' +
      '<path d="M' + x + ' ' + (y - 24 * s) + 'l' + (12 * s) + ' ' + (16 * s) + 'h' + (-24 * s) +
      'z" ' + f('#35a066', 1.4) + '/>' +
      '<rect x="' + (x - 2 * s) + '" y="' + (y - 8 * s) + '" width="' + (4 * s) + '" height="' +
      (8 * s) + '" fill="#7a5230"/>';
  }
  function broadleaf(x, y, s, dead) {
    s = s || 1;
    if (dead) {
      return '<path d="M' + x + ' ' + y + 'v' + (-26 * s) + 'M' + x + ' ' + (y - 16 * s) + 'l' +
        (-9 * s) + ' ' + (-8 * s) + 'M' + x + ' ' + (y - 20 * s) + 'l' + (9 * s) + ' ' + (-7 * s) +
        'M' + x + ' ' + (y - 9 * s) + 'l' + (-7 * s) + ' ' + (-6 * s) + '" ' + k('#8a6a4a', 2.4 * s) + '/>';
    }
    return '<rect x="' + (x - 2.4 * s) + '" y="' + (y - 12 * s) + '" width="' + (4.8 * s) +
      '" height="' + (12 * s) + '" fill="#7a5230"/>' +
      '<circle cx="' + x + '" cy="' + (y - 20 * s) + '" r="' + (11 * s) + '" ' + f('#43b06b', 1.5) + '/>';
  }
  function factory(x, y, s) {                 /* x = 왼쪽, y = 바닥 */
    s = s || 1;
    return '<rect x="' + x + '" y="' + (y - 34 * s) + '" width="' + (52 * s) + '" height="' +
      (34 * s) + '" ' + f('#9aa7b8') + '/>' +
      '<rect x="' + (x + 8 * s) + '" y="' + (y - 54 * s) + '" width="' + (9 * s) + '" height="' +
      (21 * s) + '" ' + f('#7a8798') + '/>' +
      '<rect x="' + (x + 26 * s) + '" y="' + (y - 60 * s) + '" width="' + (9 * s) + '" height="' +
      (27 * s) + '" ' + f('#7a8798') + '/>' +
      '<rect x="' + (x + 8 * s) + '" y="' + (y - 24 * s) + '" width="' + (10 * s) + '" height="' +
      (9 * s) + '" fill="#e8eef6"/>' +
      '<rect x="' + (x + 24 * s) + '" y="' + (y - 24 * s) + '" width="' + (10 * s) + '" height="' +
      (9 * s) + '" fill="#e8eef6"/>' +
      '<rect x="' + (x + 38 * s) + '" y="' + (y - 16 * s) + '" width="' + (9 * s) + '" height="' +
      (16 * s) + '" fill="#6b7788"/>';
  }
  function puff(x, y, r, c, op) {
    return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + (c || '#aab6c6') +
      '" opacity="' + (op == null ? .85 : op) + '"/>';
  }
  function fig(x, y, s, c) {                  /* 아주 작은 사람 — y는 발끝 */
    s = s || 1; c = c || '#2f6df6';
    return '<circle cx="' + x + '" cy="' + (y - 22 * s) + '" r="' + (4.8 * s) + '" fill="' + c + '"/>' +
      '<path d="M' + x + ' ' + (y - 17 * s) + 'v' + (9 * s) + 'M' + (x - 6 * s) + ' ' + (y - 13 * s) +
      'h' + (12 * s) + 'M' + x + ' ' + (y - 8 * s) + 'l' + (-5 * s) + ' ' + (8 * s) + 'M' + x + ' ' +
      (y - 8 * s) + 'l' + (5 * s) + ' ' + (8 * s) + '" ' + k(c, 2.4 * s) + '/>';
  }

  var CA = {};

  /* ───────── 단원 III-1 기후·지형 ───────── */

  /* 평평한 지붕 vs 뾰족한 지붕 — 비가 오면 어떻게 되는가 */
  CA.roofpair = { w: 212, h: 124, d: function () {
    var rain = '';
    for (var i = 0; i < 11; i++) rain += 'M' + (10 + i * 19) + ' ' + (2 + (i % 3) * 5) +
      'l-4 11';
    return '<path d="' + rain + '" ' + k('#7fb4e6', 2) + '/>' +
      '<rect x="0" y="104" width="212" height="20" fill="#cfe3c0"/>' +
      '<path d="M0 104h212" ' + k('#9dc08b', 2) + '/>' +
      /* 왼쪽 — 평지붕 */
      '<rect x="24" y="58" width="58" height="46" ' + f('#e9d5b5') + '/>' +
      '<rect x="17" y="49" width="72" height="10" ' + f('#c9ad88') + '/>' +
      '<ellipse cx="53" cy="49" rx="23" ry="3.6" fill="#6aa9e0"/>' +
      '<rect x="33" y="68" width="15" height="14" ' + f('#fdf7ec', 1.4) + '/>' +
      '<rect x="58" y="78" width="16" height="26" ' + f('#a9793f', 1.4) + '/>' +
      arw(53, 40, 53, 46, '#2563eb', 2) +
      /* 오른쪽 — 뾰족지붕 */
      '<path d="M120 60L158 22l38 38z" ' + f('#a9573a') + '/>' +
      '<rect x="128" y="60" width="60" height="44" ' + f('#e9d5b5') + '/>' +
      '<rect x="136" y="70" width="15" height="14" ' + f('#fdf7ec', 1.4) + '/>' +
      '<rect x="162" y="78" width="16" height="26" ' + f('#a9793f', 1.4) + '/>' +
      arw(152, 32, 128, 58, '#2563eb', 2) + arw(164, 32, 188, 58, '#2563eb', 2);
  } };

  /* 세계 기후대 띠 — 적도에서 멀어질수록 추워진다 */
  CA.climatebands = { w: 206, h: 120, d: function () {
    var band = [['한대', '#d9ecff'], ['냉대', '#aecdf2'], ['온대', '#c3eecb'], ['건조', '#fbe6a8'],
                ['열대', '#f8b6a4'], ['건조', '#fbe6a8'], ['온대', '#c3eecb'], ['냉대', '#aecdf2'],
                ['한대', '#d9ecff']];
    var out = '', y0 = 6, bh = 12.4;
    band.forEach(function (b, i) {
      var y = y0 + i * bh;
      out += '<rect x="42" y="' + y + '" width="146" height="' + bh + '" fill="' + b[1] + '"/>' +
        t(i === 4 ? 72 : 115, y + bh - 3.6, b[0], 8.4, '#2b3545');
    });
    out += '<rect x="42" y="' + y0 + '" width="146" height="' + (bh * 9) + '" rx="5" ' +
      f('none', 1.8) + '/>';
    for (var j = 1; j < 9; j++)
      out += '<path d="M42 ' + (y0 + j * bh) + 'h146" ' + k('#ffffff', 1) + '/>';
    var eq = y0 + 4.5 * bh;
    out += '<path d="M96 ' + eq + 'h100" ' + k('#dc2626', 1.8, '5 4') + '/>' +
      t(160, eq - 4, '적도', 8.6, '#dc2626') +
      sun(16, 26, 9) +
      arw(26, 36, 44, eq - 12, '#f59e0b', 2) + arw(28, 46, 46, eq - 4, '#f59e0b', 2);
    return out;
  } };

  /* 고상 가옥 — 땅에서 띄워 짓는 이유까지 */
  CA.stilthouse = { w: 208, h: 128, d: function () {
    return '<rect x="0" y="106" width="208" height="22" fill="#cfe3c0"/>' +
      '<path d="M0 106h208" ' + k('#9dc08b', 2) + '/>' +
      /* 기둥 */
      '<rect x="48" y="64" width="8" height="42" ' + f('#a9793f', 1.5) + '/>' +
      '<rect x="78" y="64" width="8" height="42" ' + f('#a9793f', 1.5) + '/>' +
      '<rect x="116" y="64" width="8" height="42" ' + f('#a9793f', 1.5) + '/>' +
      '<rect x="146" y="64" width="8" height="42" ' + f('#a9793f', 1.5) + '/>' +
      '<path d="M52 88h98" ' + k('#8a5f30', 2.2) + '/>' +
      /* 바닥 · 벽 · 지붕 */
      '<rect x="38" y="56" width="128" height="9" ' + f('#c89a63') + '/>' +
      '<rect x="46" y="30" width="112" height="26" ' + f('#ead6b4') + '/>' +
      '<path d="M32 30L102 2l70 28z" ' + f('#a9814c') + '/>' +
      '<path d="M48 26l54-21M66 30l36-14M86 30l16-6" ' + k('#8a6334', 1.4) + '/>' +
      '<rect x="88" y="34" width="28" height="22" ' + f('#fdf7ec', 1.5) + '/>' +
      '<rect x="56" y="36" width="20" height="15" ' + f('#fdf7ec', 1.5) + '/>' +
      /* 사다리 */
      '<path d="M166 106l-8-42M180 106l-8-42" ' + k('#8a5f30', 2.2) + '/>' +
      '<path d="M168 98h13M170 88h13M172 78h13M174 68h13" ' + k('#8a5f30', 2) + '/>' +
      /* 땅에서 올라오는 것들 */
      arw(60, 104, 60, 74, '#ef4444', 2.2) + arw(72, 104, 72, 80, '#ef4444', 2) +
      '<path d="M98 102q4-7 0-10-4 3 0 10zM110 98q4-7 0-10-4 3 0 10z" ' + f('#3b82f6', 1.2) + '/>' +
      '<ellipse cx="136" cy="98" rx="5" ry="3.4" ' + f('#6b7280', 1.2) + '/>' +
      '<path d="M131 95l-3-3M141 95l3-3M136 95v-4" ' + k('#6b7280', 1.4) + '/>' +
      t(60, 122, '열기', 8.4, '#b91c1c') + t(104, 122, '습기', 8.4, '#1d4ed8') +
      t(140, 122, '벌레', 8.4, '#4b5563');
  } };

  /* 이글루 — 얼음 블록과 입구 터널 */
  CA.iglooscene = { w: 200, h: 104, d: function () {
    var sn = '';
    [[24, 16], [58, 8], [150, 14], [176, 26], [96, 10]].forEach(function (p) {
      sn += 'M' + p[0] + ' ' + (p[1] - 4) + 'v8M' + (p[0] - 4) + ' ' + p[1] + 'h8M' +
        (p[0] - 3) + ' ' + (p[1] - 3) + 'l6 6M' + (p[0] + 3) + ' ' + (p[1] - 3) + 'l-6 6';
    });
    return '<path d="M0 86q50-10 100-2t100-4v38H0z" ' + f('#ffffff', 1.8) + '/>' +
      '<path d="' + sn + '" ' + k('#9ec5e8', 1.6) + '/>' +
      '<path d="M38 88a40 40 0 0 1 80 0z" ' + f('#eef5ff') + '/>' +
      '<path d="M44 68a40 40 0 0 1 68 0M40 78h76" ' + k('#b7cbe2', 1.5) + '/>' +
      '<path d="M62 56v12M94 56v12M52 68v10M78 68v10M104 68v10M48 78v10M70 78v10M86 78v10M110 78v10" ' +
      k('#b7cbe2', 1.5) + '/>' +
      '<path d="M104 88a19 15 0 0 1 38 0z" ' + f('#e2ecfa') + '/>' +
      '<path d="M114 88a10 11 0 0 1 20 0z" fill="#33415a"/>' +
      '<path d="M150 88q6-10 12 0z" ' + f('#cfe0f2', 1.4) + '/>' +
      '<ellipse cx="170" cy="92" rx="11" ry="4.4" ' + f('#8ec7ee', 1.4) + '/>';
  } };

  /* 냉대 통나무집 — 가파른 지붕에 눈이 쌓이지 않는다 */
  CA.cabinsnow = { w: 204, h: 106, d: function () {
    return '<path d="M0 92q52-8 104 0t100-2v30H0z" ' + f('#ffffff', 1.8) + '/>' +
      pine(22, 92, .9) + pine(42, 94, .7) + pine(186, 94, .8) +
      '<rect x="68" y="54" width="78" height="40" ' + f('#c89a63') + '/>' +
      '<path d="M68 62h78M68 70h78M68 78h78M68 86h78" ' + k('#9c7340', 1.3) + '/>' +
      '<path d="M58 56L107 14l49 42z" ' + f('#6b7b8c') + '/>' +
      '<path d="M61 53L107 18l46 35" ' + k('#ffffff', 7) + '/>' +
      '<path d="M58 56L107 14l49 42" ' + k(INK, 1.8) + '/>' +
      '<rect x="126" y="24" width="11" height="17" ' + f('#8a5a3c', 1.5) + '/>' +
      '<path d="M131 22q7-6 2-12t3-8" ' + k('#b6c2cf', 2.2) + '/>' +
      '<rect x="78" y="62" width="16" height="16" ' + f('#ffe9a8', 1.5) + '/>' +
      '<path d="M86 62v16M78 70h16" ' + k('#b08b3a', 1.2) + '/>' +
      '<rect x="120" y="62" width="16" height="16" ' + f('#ffe9a8', 1.5) + '/>' +
      '<path d="M128 62v16M120 70h16" ' + k('#b08b3a', 1.2) + '/>' +
      '<rect x="99" y="76" width="18" height="18" ' + f('#8a5a3c', 1.5) + '/>' +
      arw(50, 34, 36, 60, '#2563eb', 2) + arw(164, 34, 178, 60, '#2563eb', 2);
  } };

  /* 산지 · 평야 · 해안 단면 — 지형이 하는 일을 바꾼다 */
  CA.terrain3 = { w: 254, h: 124, d: function () {
    return '<rect x="0" y="94" width="254" height="30" fill="#cfe3c0"/>' +
      /* 산지 */
      '<path d="M2 94L30 34l26 60z" ' + f('#9fb0c4') + '/>' +
      '<path d="M30 34l-8 16q8 5 16 0z" fill="#ffffff"/>' +
      '<path d="M34 94L60 46l26 48z" ' + f('#b4c3d4') + '/>' +
      '<path d="M46 80h22M50 86h20M62 72h16" ' + k('#4d9a5e', 2.2) + '/>' +
      pine(14, 94, .62) +
      '<path d="M70 94a7 8 0 0 1 14 0z" ' + f('#5b6676', 1.4) + '/>' +
      /* 평야 */
      '<path d="M90 94v-30" ' + k('#b8c6d6', 1.4, '4 4') + '/>' +
      '<rect x="96" y="76" width="38" height="16" ' + f('#bde8a0', 1.4) + '/>' +
      '<path d="M96 81h38M96 86h38" ' + k('#79b85e', 1.2) + '/>' +
      '<path d="M94 100h74" ' + k('#cbb894', 5) + '/>' +
      '<path d="M100 100h8M116 100h8M132 100h8M148 100h8" ' + k('#ffffff', 1.4) + '/>' +
      '<path d="M140 76l10-9 10 9z" ' + f('#c0724f', 1.4) + '/>' +
      '<rect x="143" y="76" width="14" height="14" ' + f('#f0e2c8', 1.4) + '/>' +
      '<path d="M160 82l8-7 8 7z" ' + f('#c0724f', 1.4) + '/>' +
      '<rect x="162" y="82" width="12" height="10" ' + f('#f0e2c8', 1.4) + '/>' +
      /* 해안 */
      '<path d="M178 94v-30" ' + k('#b8c6d6', 1.4, '4 4') + '/>' +
      '<rect x="186" y="88" width="68" height="36" fill="#7fc0ea"/>' +
      '<path d="M186 96q10-5 20 0t20 0 20 0M186 106q10-5 20 0t20 0 20 0" ' + k('#bfe0f5', 2) + '/>' +
      '<rect x="180" y="84" width="26" height="5" ' + f('#a9793f', 1.4) + '/>' +
      '<path d="M186 89v8M200 89v8" ' + k('#8a5f30', 2) + '/>' +
      '<path d="M216 100h26l-5 8h-16z" ' + f('#e8eef6', 1.5) + '/>' +
      '<path d="M229 100V86l12 10z" ' + f('#ef6b53', 1.4) + '/>' +
      '<path d="M246 112q-5-4 0-6 3 3 0 6z" ' + f('#5aa9d8', 1.2) + '/>' +
      t(44, 14, '산지', 10, '#334155') + t(134, 14, '평야', 10, '#334155') +
      t(216, 14, '해안', 10, '#334155');
  } };

  /* 건조 기후 — 사막 흙집과 초원의 천막집 */
  CA.desertlife = { w: 236, h: 124, d: function () {
    return '<path d="M0 88q42-16 84-5t76 3q38 5 76-8v44H0z" ' + f('#f4d98a', 1.8) + '/>' +
      '<path d="M0 100q60-12 122 3t114-7" ' + k('#e0b95f', 2) + '/>' +
      sun(210, 18, 10) +
      /* 흙집 */
      '<rect x="22" y="52" width="60" height="40" ' + f('#dcb184') + '/>' +
      '<rect x="15" y="43" width="74" height="10" ' + f('#c89a63') + '/>' +
      '<rect x="31" y="60" width="12" height="12" ' + f('#8a6a4a', 1.4) + '/>' +
      '<rect x="60" y="60" width="12" height="12" ' + f('#8a6a4a', 1.4) + '/>' +
      '<rect x="44" y="76" width="16" height="16" ' + f('#8a6a4a', 1.4) + '/>' +
      '<path d="M22 66h60" ' + k('#c08f63', 1.3) + '/>' +
      /* 게르(천막집) */
      '<path d="M128 92V72q32-8 64 0v20z" ' + f('#f6f2e7') + '/>' +
      '<path d="M126 72q34-26 68 0z" ' + f('#ffffff') + '/>' +
      '<path d="M160 48v24M138 56l12 16M182 56l-12 16" ' + k('#cbbfa6', 1.5) + '/>' +
      '<circle cx="160" cy="47" r="4.4" ' + f('#b4553a', 1.4) + '/>' +
      '<rect x="152" y="74" width="17" height="18" ' + f('#b4553a', 1.4) + '/>' +
      '<path d="M128 80h64" ' + k('#d9d0bb', 1.4) + '/>' +
      /* 가축 */
      '<ellipse cx="104" cy="110" rx="11" ry="7" ' + f('#ffffff', 1.5) + '/>' +
      '<circle cx="114" cy="105" r="4.4" ' + f('#4b5563', 1.3) + '/>' +
      '<path d="M98 116v4M104 117v4M110 116v4" ' + k('#4b5563', 1.6) + '/>' +
      '<ellipse cx="212" cy="110" rx="9" ry="6" ' + f('#ffffff', 1.5) + '/>' +
      '<circle cx="220" cy="106" r="3.8" ' + f('#4b5563', 1.3) + '/>' +
      '<path d="M207 115v4M213 116v4" ' + k('#4b5563', 1.5) + '/>';
  } };

  /* 열대의 조리법 — 기름에 볶고 튀긴다 */
  CA.wokfood = { w: 196, h: 100, d: function () {
    return '<path d="M8 92h180" ' + k('#c9a86f', 5) + '/>' +
      '<path d="M58 34q6-10 14-4M78 30q6-12 14-5M98 34q6-10 14-4" ' + k('#b6c2cf', 2.4) + '/>' +
      '<path d="M44 52h98q-6 30-49 30T44 52z" ' + f('#4b5563') + '/>' +
      '<ellipse cx="93" cy="52" rx="49" ry="9" ' + f('#6b7280') + '/>' +
      '<path d="M142 52l34-8" ' + k('#4b5563', 5) + '/>' +
      '<circle cx="78" cy="51" r="4.4" fill="#f0a63c"/>' +
      '<circle cx="96" cy="53" r="4" fill="#e4584a"/>' +
      '<circle cx="110" cy="50" r="4.4" fill="#4fae62"/>' +
      '<circle cx="88" cy="47" r="3.4" fill="#f6d26a"/>' +
      '<path d="M60 92q6-16 12 0q6-16 12 0q6-16 12 0q6-16 12 0q6-16 12 0" ' + f('#f59e0b', 1.4) + '/>' +
      '<path d="M70 92q4-9 8 0M94 92q4-9 8 0M118 92q4-9 8 0" ' + f('#fbbf24', 0) + '/>';
  } };

  /* ───────── 단원 III-2 자연재해 ───────── */

  /* 태풍 — 적도의 수증기가 소용돌이가 되어 올라온다 */
  CA.typhoon = { w: 206, h: 124, d: function () {
    var arm = '';
    for (var i = 0; i < 3; i++)                      /* 눈에서 뻗어 나와 감기는 띠 */
      arm += '<path d="M100 44C124 44 138 62 130 80C122 96 98 100 82 88" ' +
        k('#9cc9ea', 12) + ' transform="rotate(' + (i * 120) + ' 100 54)"/>';
    for (var j = 0; j < 3; j++)                      /* 안쪽 가는 띠 */
      arm += '<path d="M100 40C120 40 130 54 124 68" ' +
        k('#c7e4f7', 6) + ' transform="rotate(' + (j * 120 + 60) + ' 100 54)"/>';
    return arm +
      '<circle cx="100" cy="54" r="10" ' + f('#ffffff') + '/>' +
      '<rect x="0" y="96" width="206" height="28" fill="#8ec7ee"/>' +
      '<path d="M0 104q16-6 32 0t32 0 32 0 32 0 32 0 32 0" ' + k('#c7e4f7', 2.2) + '/>' +
      '<path d="M0 110h206" ' + k('#dc2626', 1.8, '5 4') + '/>' +
      t(18, 120, '적도', 8.4, '#b91c1c') +
      arw(56, 96, 58, 80, '#2563eb', 2) + arw(80, 96, 80, 78, '#2563eb', 2) +
      arw(122, 96, 122, 80, '#2563eb', 2) +
      arw(152, 40, 192, 20, '#1d4ed8', 2.4) +
      t(172, 44, '우리나라 쪽으로', 8.2, '#1d4ed8');
  } };

  /* 판과 판이 부딪히는 곳 — 지진과 화산이 되풀이된다 */
  CA.platecut = { w: 228, h: 122, d: function () {
    return '<rect x="0" y="40" width="228" height="16" fill="#8ec7ee"/>' +
      '<path d="M0 48q16-5 32 0t32 0 32 0 32 0 32 0 32 0 36 0" ' + k('#c7e4f7', 2) + '/>' +
      '<path d="M0 56h100v46H0z" ' + f('#c8a271') + '/>' +
      '<path d="M128 56h100v46H128z" ' + f('#b58d5c') + '/>' +
      '<path d="M100 56l28 46" ' + k(INK, 1.8) + '/>' +
      '<rect x="0" y="102" width="228" height="20" ' + f('#8c5a3a', 1.8) + '/>' +
      '<path d="M78 122q36-26 72 0z" ' + f('#ef4444', 1.4) + '/>' +
      /* 화산 */
      '<path d="M82 56L114 10l32 46z" ' + f('#78889a') + '/>' +
      '<path d="M104 18h20l-10-8z" ' + f('#ef4444', 1.4) + '/>' +
      '<path d="M114 10q-9-6-4-8M114 10q9-6 5-9" ' + k('#9aa7b8', 2) + '/>' +
      '<path d="M110 18l-8 22M120 18l9 22" ' + k('#f97316', 2.4) + '/>' +
      arw(42, 80, 90, 80, '#b91c1c', 2.6) + arw(190, 80, 140, 80, '#b91c1c', 2.6) +
      '<path d="M20 70l6-6 6 10 6-10 6 6M196 70l6-6 6 10 6-10 6 6" ' + k('#b91c1c', 2.2) + '/>' +
      t(114, 118, '판이 부딪히는 경계', 8.6, '#ffffff');
  } };

  /* ───────── 단원 III-3 자연관 ───────── */

  /* 인간 중심주의 ↔ 생태 중심주의 */
  CA.anthroeco = { w: 248, h: 124, d: function () {
    return '<path d="M124 6v112" ' + k('#b8c6d6', 1.6, '5 5') + '/>' +
      /* 왼쪽 — 위아래로 나뉜 세계 */
      '<rect x="12" y="20" width="98" height="40" rx="6" fill="#ffedd5"/>' +
      fig(61, 56, 1.1, '#b45309') +
      '<path d="M12 62h98" ' + k('#c8b49a', 1.6, '4 4') + '/>' +
      '<rect x="12" y="64" width="98" height="46" rx="6" fill="#e7f3e2"/>' +
      broadleaf(32, 104, .72) +
      '<ellipse cx="66" cy="98" rx="11" ry="7" ' + f('#9a7a56', 1.4) + '/>' +
      '<circle cx="76" cy="93" r="4.6" ' + f('#9a7a56', 1.3) + '/>' +
      '<path d="M60 105v5M66 106v4M72 105v5" ' + k('#7a5e3f', 1.5) + '/>' +
      '<path d="M98 100q5-9 0-12-5 3 0 12z" ' + f('#3b82f6', 1.3) + '/>' +
      arw(90, 50, 90, 78, '#b45309', 2.4) +
      t(61, 16, '사람이 위', 9, '#b45309') +
      /* 오른쪽 — 하나의 원 */
      '<circle cx="186" cy="64" r="46" ' + f('#eafaf0') + '/>' +
      fig(186, 48, .8, '#047857') +
      broadleaf(222, 72, .6) +
      '<ellipse cx="186" cy="96" rx="10" ry="6.4" ' + f('#6f9a63', 1.3) + '/>' +
      '<circle cx="195" cy="92" r="4.2" ' + f('#6f9a63', 1.3) + '/>' +
      '<path d="M152 72q6-11 0-14-6 3 0 14z" ' + f('#3b82f6', 1.3) + '/>' +
      '<path d="M186 48a28 28 0 0 1 22 20M206 78a28 28 0 0 1-38 12M166 82a28 28 0 0 1 4-36" ' +
      k('#34a06a', 1.8, '4 4') + '/>' +
      t(186, 16, '모두 한 울타리', 9, '#047857');
  } };

  /* 대지 윤리 — 도덕 공동체가 넓어진다 */
  CA.landethic = { w: 208, h: 134, d: function () {
    return '<ellipse cx="104" cy="62" rx="98" ry="56" ' + f('#eef7ef') + '/>' +
      '<ellipse cx="104" cy="62" rx="64" ry="40" ' + f('#ddf0e3', 1.6) + '/>' +
      '<ellipse cx="104" cy="62" rx="30" ry="22" ' + f('#dbeafe') + '/>' +
      fig(104, 72, .82, '#1d4ed8') +
      broadleaf(62, 76, .58) +
      '<ellipse cx="146" cy="68" rx="10" ry="6.4" ' + f('#8a9a62', 1.3) + '/>' +
      '<circle cx="155" cy="64" r="4.2" ' + f('#8a9a62', 1.3) + '/>' +
      '<path d="M140 75v4M146 76v3M152 75v4" ' + k('#6f7d4e', 1.4) + '/>' +
      '<path d="M26 66q6-12 0-15-6 3 0 15z" ' + f('#3b82f6', 1.3) + '/>' +
      '<ellipse cx="178" cy="66" rx="12" ry="7" ' + f('#9aa7b8', 1.4) + '/>' +
      '<path d="M60 104q44-10 88 0" ' + k('#8c5a3a', 4) + '/>' +
      t(104, 20, '흙 · 물 · 돌까지', 11, '#2f7a52') +
      t(104, 34, '동식물', 10.5, '#2f7a52') +
      t(104, 130, '도덕 공동체를 대지 전체로', 10, '#46506b');
  } };

  /* ───────── 단원 III-4 환경 문제 ───────── */

  /* 온실 효과 — 이불이 두꺼워지면 열이 갇힌다 */
  CA.greenhouse = { w: 230, h: 128, d: function () {
    return sun(24, 16, 11) +
      '<path d="M0 46q115-20 230 0v18q-115-20-230 0z" fill="#aab6c6" opacity=".8"/>' +
      '<path d="M0 46q115-20 230 0M0 64q115-20 230 0" ' + k('#7f8c9e', 1.6) + '/>' +
      '<circle cx="42" cy="56" r="4" fill="#64748b"/><circle cx="88" cy="50" r="4" fill="#64748b"/>' +
      '<circle cx="134" cy="49" r="4" fill="#64748b"/><circle cx="182" cy="53" r="4" fill="#64748b"/>' +
      '<path d="M0 104q115-18 230 0v24H0z" ' + f('#bfe3c6') + '/>' +
      arw(44, 26, 74, 98, '#f59e0b', 2.2) + arw(72, 22, 104, 98, '#f59e0b', 2.2) +
      arw(160, 98, 150, 68, '#ef4444', 2.2) +
      arw(150, 66, 168, 98, '#ef4444', 2.2) +
      arw(196, 96, 204, 70, '#ef4444', 2) +
      factory(108, 104, .58) +
      '<path d="M114 72q4-7 0-10M126 68q4-7 0-10" ' + k('#8a97a8', 2.4) + '/>' +
      t(115, 26, '온실 기체 = 지구의 이불', 8.8, '#46506b') +
      t(162, 122, '열이 빠져나가지 못한다', 8.6, '#b91c1c');
  } };

  /* 빙하가 녹고 해수면이 오른다 */
  CA.warmresult = { w: 236, h: 122, d: function () {
    return '<path d="M8 66L34 22l30 44z" ' + f('#e8f4ff') + '/>' +
      '<path d="M0 66L34 10l40 56" ' + k('#94a3b8', 1.6, '5 4') + '/>' +
      '<ellipse cx="36" cy="58" rx="11" ry="6.4" ' + f('#ffffff', 1.4) + '/>' +
      '<circle cx="46" cy="52" r="5" ' + f('#ffffff', 1.4) + '/>' +
      '<circle cx="44" cy="50" r="1.2" fill="' + INK + '"/>' +
      '<rect x="162" y="30" width="22" height="62" ' + f('#9fb0c4') + '/>' +
      '<rect x="190" y="44" width="20" height="48" ' + f('#b4c3d4') + '/>' +
      '<rect x="214" y="22" width="18" height="70" ' + f('#9fb0c4') + '/>' +
      '<path d="M166 38h6M176 38h4M166 50h6M176 50h4M194 54h6M204 54h4M218 32h6M226 32h4" ' +
      k('#ffffff', 2.2) + '/>' +
      '<rect x="0" y="62" width="236" height="60" fill="#7fc0ea" opacity=".82"/>' +
      '<path d="M0 72q18-6 36 0t36 0 36 0 36 0 36 0 36 0" ' + k('#bfe0f5', 2) + '/>' +
      '<path d="M0 84h236" ' + k('#1b2330', 1.6, '5 4') + '/>' +
      arw(118, 84, 118, 64, '#1d4ed8', 2.4) +
      t(118, 98, '해수면 상승', 8.6, '#0b3b63') +
      t(36, 112, '빙하 감소', 8.6, '#0b3b63') +
      t(196, 112, '저지대 침수', 8.6, '#0b3b63');
  } };

  /* 산성비 — 매연이 비에 섞여 내린다 */
  CA.acidrain = { w: 242, h: 122, d: function () {
    var rain = '';
    for (var i = 0; i < 9; i++) rain += 'M' + (110 + i * 14) + ' 62l-6 14M' + (116 + i * 14) + ' 80l-5 12';
    return '<rect x="0" y="98" width="242" height="24" fill="#cfe3c0"/>' +
      '<path d="M0 98h242" ' + k('#9dc08b', 2) + '/>' +
      factory(8, 98, .78) +
      puff(22, 44, 8) + puff(34, 36, 10) + puff(50, 30, 9) + puff(68, 28, 11) +
      '<rect x="70" y="86" width="30" height="12" rx="3" ' + f('#5b86c4', 1.5) + '/>' +
      '<path d="M76 86l5-8h14l5 8z" ' + f('#8fb4e6', 1.4) + '/>' +
      '<circle cx="78" cy="99" r="4" fill="' + INK + '"/><circle cx="94" cy="99" r="4" fill="' + INK + '"/>' +
      puff(66, 92, 4.4, '#aab6c6', .9) + puff(60, 88, 3.4, '#aab6c6', .8) +
      puff(118, 40, 13, '#8e9cae') + puff(144, 32, 16, '#8e9cae') +
      puff(174, 38, 14, '#8e9cae') + puff(200, 44, 11, '#8e9cae') +
      '<path d="' + rain + '" ' + k('#6b7a8c', 2) + '/>' +
      broadleaf(128, 98, .78, 1) +
      '<path d="M140 80q5 5 2 9M146 88q5 4 2 8" ' + k('#b45309', 1.6) + '/>' +
      '<ellipse cx="196" cy="96" rx="34" ry="9" ' + f('#6aa9e0', 1.5) + '/>' +
      '<path d="M190 96q6-5 12 0q-6 5-12 0z" ' + f('#e8eef6', 1.2) + '/>' +
      '<path d="M204 94l4-3M204 94l4 3" ' + k(INK, 1.2) + '/>' +
      t(126, 118, '나무가 마른다', 8.6, '#8a5a1c') +
      t(192, 118, '호수가 산성화', 8.6, '#0b3b63');
  } };

  /* 오존층 파괴 — 구멍으로 자외선이 그대로 들어온다 */
  CA.ozone = { w: 224, h: 124, d: function () {
    return sun(26, 18, 11) +
      '<path d="M8 62Q54 36 94 30" ' + k('#9ec9ea', 11) + '/>' +
      '<path d="M138 30Q178 36 216 62" ' + k('#9ec9ea', 11) + '/>' +
      '<path d="M94 30q22-4 44 0" ' + k('#9ec9ea', 2, '5 4') + '/>' +
      '<path d="M0 100q112-16 224 0v24H0z" ' + f('#bfe3c6') + '/>' +
      arw(52, 30, 62, 54, '#8b5cf6', 2.2) +
      '<path d="M57 56l8 8M65 56l-8 8" ' + k('#8b5cf6', 2.2) + '/>' +
      arw(178, 32, 170, 54, '#8b5cf6', 2.2) +
      '<path d="M165 56l8 8M173 56l-8 8" ' + k('#8b5cf6', 2.2) + '/>' +
      arw(104, 22, 108, 90, '#8b5cf6', 2.4) + arw(128, 22, 124, 90, '#8b5cf6', 2.4) +
      fig(116, 104, .82, '#b91c1c') +
      '<rect x="18" y="86" width="22" height="16" rx="3" ' + f('#cbd5e1', 1.5) + '/>' +
      '<path d="M22 92h14M22 96h14" ' + k('#94a3b8', 1.4) + '/>' +
      puff(34, 78, 4.2, '#c4b5fd', .9) + puff(42, 70, 3.4, '#c4b5fd', .85) +
      t(116, 16, '구멍', 8.6, '#7c3aed') +
      t(30, 114, '프레온 가스', 8.4, '#6d28d9') +
      t(170, 112, '막아 주던 오존층', 8.4, '#0b3b63');
  } };

  /* 사막화 — 초원이 사막으로 번진다 */
  CA.desertif = { w: 244, h: 114, d: function () {
    var g1 = '', g2 = '';
    for (var i = 0; i < 9; i++) g1 += 'M' + (10 + i * 7) + ' 88q2-10 4 0';
    for (var j = 0; j < 4; j++) g2 += 'M' + (104 + j * 14) + ' 88q2-8 4 0';
    return '<rect x="2" y="66" width="72" height="34" rx="5" ' + f('#d6eecb', 1.6) + '/>' +
      '<path d="' + g1 + '" ' + k('#4d9a5e', 2.2) + '/>' +
      broadleaf(22, 78, .5) + broadleaf(56, 80, .42) +
      '<rect x="86" y="66" width="72" height="34" rx="5" ' + f('#eaeec4', 1.6) + '/>' +
      '<path d="' + g2 + '" ' + k('#8aa05a', 2.2) + '/>' +
      '<ellipse cx="124" cy="80" rx="10" ry="6.4" ' + f('#ffffff', 1.4) + '/>' +
      '<circle cx="133" cy="76" r="4.2" ' + f('#6b7280', 1.3) + '/>' +
      '<path d="M119 87v4M125 88v3M130 87v4" ' + k('#6b7280', 1.4) + '/>' +
      '<rect x="170" y="66" width="72" height="34" rx="5" ' + f('#f3dca2', 1.6) + '/>' +
      '<path d="M176 88q10-4 20 0M198 92q12-4 24 0M182 95h14M210 84h18" ' + k('#c99b45', 1.8) + '/>' +
      broadleaf(206, 84, .46, 1) +
      arw(76, 83, 84, 83, '#b45309', 2.4) + arw(160, 83, 168, 83, '#b45309', 2.4) +
      t(38, 58, '초원', 9.5, '#2f7a52') + t(122, 58, '과도한 농경 · 방목', 9.5, '#8a7a1c') +
      t(206, 58, '사막', 9.5, '#b45309') +
      t(122, 110, '사막 주변부터 번져 나간다', 8.6, '#8a5a1c');
  } };

  /* 탄소 배출권 거래제 */
  CA.carbontrade = { w: 236, h: 126, d: function () {
    return '<rect x="0" y="104" width="236" height="22" fill="#eef2f7"/>' +
      '<path d="M0 104h236" ' + k('#c3cdda', 2) + '/>' +
      factory(10, 104, .72) +
      factory(170, 104, .72) +
      t(29, 120, 'A 기업', 9, '#b91c1c') + t(189, 120, 'B 기업', 9, '#047857') +
      '<rect x="8" y="12" width="60" height="15" rx="4" ' + f('#ffffff', 1.6) + '/>' +
      '<rect x="8" y="12" width="60" height="15" rx="4" fill="#ef4444"/>' +
      '<rect x="8" y="12" width="60" height="15" rx="4" ' + f('none', 1.6) + '/>' +
      t(44, 8, '100 / 100 · 다 썼다', 8.2, '#b91c1c') +
      '<rect x="168" y="12" width="60" height="15" rx="4" ' + f('#ffffff', 1.6) + '/>' +
      '<rect x="168" y="12" width="42" height="15" rx="4" fill="#10b981"/>' +
      '<rect x="168" y="12" width="60" height="15" rx="4" ' + f('none', 1.6) + '/>' +
      '<path d="M210 12v15" ' + k(INK, 1.4, '3 3') + '/>' +
      t(192, 8, '70 / 100 · 30 남음', 8.2, '#047857') +
      arw(160, 44, 78, 44, '#047857', 2.6) +
      t(119, 38, '남은 배출권 30', 8.8, '#047857') +
      arw(78, 74, 160, 74, '#b45309', 2.6) +
      t(119, 68, '돈', 8.8, '#b45309') +
      '<circle cx="119" cy="92" r="11" ' + f('#fbbf24', 1.6) + '/>' +
      t(119, 96, '₩', 11, '#8a5a1c');
  } };

  /* 소득과 행복 — 일정 수준을 넘으면 비례하지 않는다 */
  CA.incomehappy = { w: 214, h: 124, d: function () {
    return '<path d="M26 14v86h176" ' + k('#64748b', 2.2) + '/>' +
      '<path d="M26 14l-4 6M26 14l4 6M202 100l-6-4M202 100l-6 4" ' + k('#64748b', 2.2) + '/>' +
      '<path d="M26 100C56 98 70 54 102 44C140 32 168 38 192 50V100z" fill="#dbeafe"/>' +
      '<path d="M26 100C56 98 70 54 102 44C140 32 168 38 192 50" ' + k('#2563eb', 3) + '/>' +
      '<path d="M62 100V78M96 100V46" ' + k('#94a3b8', 1.6, '4 4') + '/>' +
      '<path d="M26 78h36M26 46h70" ' + k('#94a3b8', 1.6, '4 4') + '/>' +
      '<circle cx="62" cy="78" r="3.6" ' + f('#2563eb', 1.4) + '/>' +
      '<circle cx="102" cy="44" r="4.4" ' + f('#ef4444', 1.6) + '/>' +
      t(62, 112, '200만', 8.4, '#46506b') + t(102, 112, '400만', 8.4, '#46506b') +
      t(16, 22, '행복', 9, '#334155') + t(190, 114, '소득', 9, '#334155') +
      t(150, 28, '여기부터는 거의 그대로', 8.6, '#b91c1c') +
      '<path d="M150 32v8" ' + k('#b91c1c', 1.6) + '/>';
  } };

  /* ───────── 단원 IV 문화와 다양성 ───────── */

  function blob(x, y, w, h, c) {                /* 지도용 덩어리 */
    var x2 = x + w, y2 = y + h, cx = x + w / 2, cy = y + h / 2;
    return '<path d="M' + cx + ' ' + y + 'Q' + x2 + ' ' + (y + h * .1) + ' ' + x2 + ' ' + cy +
      'Q' + (x2 - w * .06) + ' ' + y2 + ' ' + cx + ' ' + y2 +
      'Q' + x + ' ' + (y2 - h * .1) + ' ' + x + ' ' + cy +
      'Q' + (x + w * .06) + ' ' + y + ' ' + cx + ' ' + y + 'z" ' + f(c, 1.6) + '/>';
  }
  function note(x, y, c) {                      /* 음표 */
    c = c || INK;
    return '<path d="M' + (x - 2.6) + ' ' + y + 'v-13l9-2v11" ' + k(c, 2) + '/>' +
      '<ellipse cx="' + (x - 5.2) + '" cy="' + y + '" rx="3.4" ry="2.6" fill="' + c + '"/>' +
      '<ellipse cx="' + (x + 3.8) + '" cy="' + (y - 2) + '" rx="3.4" ry="2.6" fill="' + c + '"/>';
  }
  function face(x, y, r, c) {                   /* 동그란 얼굴 + 점 눈 */
    c = c || '#ffe2c4';
    return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" ' + f(c) + '/>' +
      '<circle cx="' + (x - r * .34) + '" cy="' + (y - r * .1) + '" r="' + (r * .13) + '" fill="' + INK + '"/>' +
      '<circle cx="' + (x + r * .34) + '" cy="' + (y - r * .1) + '" r="' + (r * .13) + '" fill="' + INK + '"/>';
  }

  /* ───────── 세계지도 ─────────
     대륙 윤곽을 문화권 단위로 잘라 그린다. 등장방형도법을 눈대중으로 옮긴 것이라
     해안선이 정밀하지는 않지만, 어느 대륙의 어디인지는 한눈에 알아볼 수 있다. */
  var LAND = {
    arc: { c: '#cfe3f7', lx: 150, ly: 7, n: '북극',
           d: 'M6 5Q150 -1 294 5L294 15Q150 21 6 15Z' +
              'M110 17Q122 8 133 13Q137 23 130 31Q120 35 114 28Q108 22 110 17Z' },
    ang: { c: '#a8c6ef', lx: 52, ly: 33, n: '앵글로 아메리카',
           d: 'M12 21Q22 12 44 14L74 14Q94 18 98 34Q93 44 85 49Q81 54 77 57L60 57' +
              'Q50 53 44 41Q34 35 22 31Q14 27 12 21Z' },
    lat: { c: '#f3bb92', lx: 97, ly: 102, n: '라틴 아메리카',
           d: 'M58 59L77 58Q83 64 81 71Q88 73 97 75Q111 77 118 87Q121 101 111 113' +
              'Q101 127 93 129Q87 123 85 109Q83 93 81 85Q75 79 71 75Q63 69 58 59Z' },
    eu:  { c: '#9db4ea', lx: 164, ly: 31, n: '유럽',
           d: 'M139 46Q143 36 150 32Q154 22 166 17L182 16Q191 24 189 35Q179 43 168 44' +
              'Q152 48 139 46Z' },
    dry: { c: '#f0cd78', lx: 174, ly: 58, n: '건조',
           d: 'M135 63Q144 50 157 48L179 51Q190 44 199 46Q211 50 215 59Q209 67 199 67' +
              'Q187 69 181 67L158 67Q146 70 135 63Z' },
    af:  { c: '#d4ba90', lx: 169, ly: 82, fz: 7.2, n: '아프리카',
           d: 'M137 65Q150 69 158 68L181 68Q187 78 183 93Q175 109 167 113' +
              'Q159 105 157 91Q151 77 143 73Z' },
    as:  { c: '#8ed7a3', lx: 246, ly: 38, n: '아시아',
           d: 'M189 35Q199 18 217 15L253 12Q283 14 295 23Q287 35 269 39Q261 51 253 61' +
              'Q243 71 233 77Q223 77 217 71Q213 61 215 59Q211 50 199 46Q191 44 189 35Z' },
    oc:  { c: '#87d4c6', lx: 261, ly: 107, n: '오세아니아',
           d: 'M243 97Q253 88 266 90L277 97Q279 109 269 115Q255 119 246 111Q241 103 243 97Z' +
              'M285 119Q291 115 293 121Q291 127 286 126Q282 123 285 119Z' }
  };
  var LAND_ORDER = ['arc', 'ang', 'lat', 'eu', 'dry', 'af', 'as', 'oc'];

  function worldmap(hi, all) {
    var g = '', out = '';
    for (var i = 1; i < 4; i++) g += 'M6 ' + (i * 34) + 'h288';
    for (var j = 1; j < 8; j++) g += 'M' + (j * 37.5) + ' 2v132';
    out += '<rect x="2" y="2" width="296" height="132" rx="7" fill="#e8f3fb"/>' +
      '<path d="' + g + '" ' + k('#d2e4f2', 1) + '/>';
    LAND_ORDER.forEach(function (key) {
      var L = LAND[key], on = all || hi.indexOf(key) >= 0;
      out += '<path d="' + L.d + '" fill="' + (on ? L.c : '#dfe6ee') +
        '" stroke="' + (on ? INK : '#c3cedb') + '" stroke-width="' + (on ? 2 : 1.1) +
        '" stroke-linejoin="round"/>';
    });
    LAND_ORDER.forEach(function (key) {
      var L = LAND[key];
      if (!all && hi.indexOf(key) < 0) return;
      var sz = L.fz || (L.n.length > 5 ? 7 : L.n.length > 3 ? 8 : 8.8);
      if (L.n.length > 6) {
        var cut = L.n.indexOf(' ');
        if (cut > 0) {
          out += t(L.lx, L.ly - 4, L.n.slice(0, cut), sz, '#15202e') +
            t(L.lx, L.ly + 6, L.n.slice(cut + 1), sz, '#15202e');
          return;
        }
      }
      out += t(L.lx, L.ly + 3, L.n, sz, '#15202e');
    });
    out += '<rect x="2" y="2" width="296" height="132" rx="7" ' + f('none', 1.8) + '/>';
    return out;
  }

  /* 세계의 문화권 — 여덟 권역을 모두 보여 준다 */
  CA.culturemap = { w: 300, h: 150, d: function () {
    return worldmap([], true) +
      t(150, 147, '여덟 문화권 — 자연환경 + 인문환경으로 묶는다', 8.6, '#46506b');
  } };

  /* 지금 다루는 문화권만 칠한 지도 */
  CA.regionmap = { w: 300, h: 138, d: function (o) {
    return worldmap((o && o.hi) || [], false);
  } };

  /* 국기 — 한국 · 일본 · 미국 */
  function trigram(x, y, p, ang) {
    var o = '';
    p.forEach(function (v, i) {
      var yy = -4.6 + i * 4.6;
      o += v
        ? '<rect x="-7" y="' + (yy - 1.1) + '" width="14" height="2.2" fill="#12161c"/>'
        : '<rect x="-7" y="' + (yy - 1.1) + '" width="5.7" height="2.2" fill="#12161c"/>' +
          '<rect x="1.3" y="' + (yy - 1.1) + '" width="5.7" height="2.2" fill="#12161c"/>';
    });
    return '<g transform="translate(' + x + ',' + y + ') rotate(' + ang + ')">' + o + '</g>';
  }
  CA.flags3 = { w: 312, h: 118, d: function () {
    var FW = 72, FH = 48, FY = 12;
    function pole(fx) {
      return '<path d="M' + (fx - 3) + ' ' + (FY - 6) + 'V' + (FY + FH + 12) + '" ' +
        k('#6b7280', 3) + '/>';
    }
    /* 태극기 */
    var kx = 16, kc = kx + FW / 2, kcy = FY + FH / 2;
    var kr = '<rect x="' + kx + '" y="' + FY + '" width="' + FW + '" height="' + FH + '" ' +
      f('#ffffff', 1.6) + '/>' +
      '<g transform="rotate(-33 ' + kc + ' ' + kcy + ')">' +
      '<circle cx="' + kc + '" cy="' + kcy + '" r="11" fill="#0047a0"/>' +
      '<path d="M' + (kc - 11) + ' ' + kcy + 'a11 11 0 0 1 22 0a5.5 5.5 0 0 1-11 0a5.5 5.5 0 0 0-11 0z" ' +
      'fill="#cd2e3a"/></g>' +
      trigram(kx + 13, FY + 10, [1, 1, 1], -57) +
      trigram(kx + 13, FY + 38, [1, 0, 1], 57) +
      trigram(kx + 59, FY + 10, [0, 1, 0], 57) +
      trigram(kx + 59, FY + 38, [0, 0, 0], -57);
    /* 일장기 */
    var jx = 120;
    var jp = '<rect x="' + jx + '" y="' + FY + '" width="' + FW + '" height="' + FH + '" ' +
      f('#ffffff', 1.6) + '/>' +
      '<circle cx="' + (jx + FW / 2) + '" cy="' + (FY + FH / 2) + '" r="13.5" fill="#bc002d"/>';
    /* 성조기 */
    var ux = 224, sh = FH / 13, st = '';
    for (var i = 0; i < 13; i++)
      if (i % 2 === 0) st += '<rect x="' + ux + '" y="' + (FY + i * sh) + '" width="' + FW +
        '" height="' + sh + '" fill="#b22234"/>';
    var dots = '';
    for (var r = 0; r < 3; r++)
      for (var q = 0; q < 4; q++)
        dots += '<circle cx="' + (ux + 5 + q * 6.6) + '" cy="' + (FY + 6 + r * 7) +
          '" r="1.5" fill="#ffffff"/>';
    var us = '<rect x="' + ux + '" y="' + FY + '" width="' + FW + '" height="' + FH + '" fill="#ffffff"/>' +
      st +
      '<rect x="' + ux + '" y="' + FY + '" width="' + (FW * 0.42) + '" height="' + (sh * 7) +
      '" fill="#3c3b6e"/>' + dots +
      '<rect x="' + ux + '" y="' + FY + '" width="' + FW + '" height="' + FH + '" ' + f('none', 1.6) + '/>';

    return pole(kx) + kr + pole(jx) + jp + pole(ux) + us +
      t(52, 88, '한국', 11.5, '#2b3545') + t(52, 105, '김치 · 한복 · 한글', 8.6, '#46506b') +
      t(156, 88, '일본', 11.5, '#2b3545') + t(156, 105, '기모노 · 초밥', 8.6, '#46506b') +
      t(260, 88, '미국', 11.5, '#2b3545') + t(260, 105, '햄버거 · 영어', 8.6, '#46506b');
  } };

  /* 점이 지대 — 두 문화권이 만나는 곳 */
  CA.transzone = { w: 252, h: 132, d: function () {
    return '<circle cx="90" cy="60" r="56" fill="#dbeafe"/>' +
      '<circle cx="160" cy="60" r="56" fill="#d9f0da" opacity=".74"/>' +
      '<circle cx="90" cy="60" r="56" ' + f('none', 2) + '/>' +
      '<circle cx="160" cy="60" r="56" ' + f('none', 2) + '/>' +
      t(69, 64, '유럽 문화', 10, '#1d4ed8') +
      t(181, 64, '아시아 문화', 10, '#166534') +
      '<path d="M125 24v16M117 31h16" ' + k('#b45309', 3) + '/>' +
      t(125, 68, '튀르키예', 9.5, '#b45309') +
      '<path d="M121 80a8 8 0 1 0 9 7 10 10 0 1 1-9-7z" ' + f('#b45309', 1.3) + '/>' +
      t(125, 126, '점이 지대 — 두 문화가 함께 나타난다', 9.5, '#b45309');
  } };

  /* 기후에 따른 옷 문화 */
  CA.clothe3 = { w: 252, h: 126, d: function () {
    return "" +
      /* ── 열대 — 민소매에 반바지 ── */
      '<path d="M33 48l-9 18M61 48l9 18" ' + k('#ffe2c4', 8) + '/>' +
      '<circle cx="24" cy="68" r="4.4" ' + f('#ffe2c4', 1.4) + '/>' +
      '<circle cx="70" cy="68" r="4.4" ' + f('#ffe2c4', 1.4) + '/>' +
      '<rect x="33" y="46" width="28" height="26" ' + f('#7ecec0') + '/>' +
      '<rect x="35" y="72" width="24" height="13" ' + f('#5b8fd6') + '/>' +
      '<path d="M41 85v9M53 85v9" ' + k('#ffe2c4', 7) + '/>' +
      '<circle cx="47" cy="30" r="12.5" ' + f('#ffe2c4') + '/>' +
      '<path d="M34.5 28a12.5 12.5 0 0 1 25 0z" fill="#3b3028"/>' +
      '<circle cx="42.6" cy="32" r="1.6" fill="' + INK + '"/>' +
      '<circle cx="51.4" cy="32" r="1.6" fill="' + INK + '"/>' +
      /* ── 건조 — 얼굴만 내놓고 온몸을 감싼다 ── */
      '<path d="M110 50q-7-32 15-34t15 34z" ' + f('#efe8d4') + '/>' +
      '<circle cx="125" cy="31" r="12.5" ' + f('#ffe2c4') + '/>' +
      '<circle cx="120.6" cy="33" r="1.6" fill="' + INK + '"/>' +
      '<circle cx="129.4" cy="33" r="1.6" fill="' + INK + '"/>' +
      '<path d="M112 28q-3 16 1 24h5q-5-12-2-24z" ' + f('#e4dcc4', 1.4) + '/>' +
      '<path d="M138 28q3 16-1 24h-5q5-12 2-24z" ' + f('#e4dcc4', 1.4) + '/>' +
      '<path d="M110 20q15-9 30 0" ' + k('#b45309', 4) + '/>' +
      '<path d="M110 52h30l8 33h-46z" ' + f('#f6f1e4') + '/>' +
      '<path d="M110 56l-8 22M140 56l8 22" ' + k('#f6f1e4', 10) + '/>' +
      '<path d="M119 60v22M131 60v22" ' + k('#e0d8c2', 1.4) + '/>' +
      /* ── 한대 — 털 두른 후드 파카 ── */
      '<circle cx="204" cy="30" r="17" ' + f('#3f5f9f') + '/>' +
      '<circle cx="204" cy="31" r="14.5" ' + f('#e8eef6', 1.5) + '/>' +
      '<circle cx="204" cy="31" r="11.5" ' + f('#ffe2c4', 1.5) + '/>' +
      '<circle cx="200" cy="33" r="1.6" fill="' + INK + '"/>' +
      '<circle cx="208" cy="33" r="1.6" fill="' + INK + '"/>' +
      '<path d="M190 54l-10 20M218 54l10 20" ' + k('#2f5fbc', 11) + '/>' +
      '<circle cx="179" cy="76" r="5" ' + f('#e8eef6', 1.4) + '/>' +
      '<circle cx="229" cy="76" r="5" ' + f('#e8eef6', 1.4) + '/>' +
      '<path d="M190 50h28v26h-28z" ' + f('#2f5fbc') + '/>' +
      '<rect x="190" y="70" width="28" height="6" fill="#e8eef6" stroke="' + INK +
      '" stroke-width="1.4" stroke-linejoin="round"/>' +
      '<rect x="192" y="81" width="24" height="10" ' + f('#1f3f85', 1.5) + '/>' +
      '<path d="M196 91v5M212 91v5" ' + k('#1f3f85', 7) + '/>' +
      /* ── 이름과 특징 ── */
      t(47, 108, '열대', 10.5, '#0f766e') + t(47, 121, '통풍이 잘 된다', 8.4, '#46506b') +
      t(125, 108, '건조', 10.5, '#b45309') + t(125, 121, '온몸을 감싼다', 8.4, '#46506b') +
      t(204, 108, '한대', 10.5, '#1d4ed8') + t(204, 121, '가죽과 털', 8.4, '#46506b');
  } };

  /* 자연환경에 따른 음식 문화 */
  CA.food3 = { w: 244, h: 126, d: function () {
    return "" +
      /* 밥 */
      '<path d="M22 56h54q-4 30-27 30T22 56z" ' + f('#eef2f7') + '/>' +
      '<path d="M26 56q10-16 23-16t23 16z" ' + f('#ffffff') + '/>' +
      '<path d="M34 50q8-9 16-9M44 44q6-6 12-5" ' + k('#d7dee8', 1.4) + '/>' +
      '<path d="M66 32l16-10M70 36l16-10" ' + k('#b07c45', 2.4) + '/>' +
      /* 빵 · 고기 */
      '<path d="M94 58q28-16 54 0-8 10-27 10T94 58z" ' + f('#d9a35e') + '/>' +
      '<path d="M108 52l6-6M122 49l6-6M136 52l6-6" ' + k('#a9793f', 1.8) + '/>' +
      '<path d="M100 76h42q4 12-21 12T100 76z" ' + f('#b2593f') + '/>' +
      '<path d="M112 80h18" ' + k('#8a3b2c', 2) + '/>' +
      /* 감자 · 옥수수 */
      '<ellipse cx="184" cy="64" rx="17" ry="13" ' + f('#d9b377') + '/>' +
      '<circle cx="179" cy="60" r="1.6" fill="#a9793f"/><circle cx="189" cy="66" r="1.6" fill="#a9793f"/>' +
      '<path d="M214 44q11 6 11 22t-11 22q-11-6-11-22t11-22z" ' + f('#f2c84b') + '/>' +
      '<path d="M209 52v28M214 48v36M219 52v28" ' + k('#d8a62c', 1.6) + '/>' +
      t(49, 106, '아시아', 10.5, '#2b3545') + t(49, 119, '쌀', 8.6, '#46506b') +
      t(122, 106, '유럽 · 건조', 10.5, '#2b3545') + t(122, 119, '빵과 고기', 8.6, '#46506b') +
      t(200, 106, '고산', 10.5, '#2b3545') + t(200, 119, '감자와 옥수수', 8.6, '#46506b');
  } };

  /* 자연환경에 따른 집 문화 */
  CA.house3 = { w: 262, h: 116, d: function () {
    return '<rect x="0" y="92" width="262" height="24" fill="#e6ecf4"/>' +
      '<path d="M0 92h262" ' + k('#c3cdda', 2) + '/>' +
      /* 고상 가옥 */
      '<path d="M26 70v22M40 70v22M54 70v22M68 70v22" ' + k('#a9793f', 3.4) + '/>' +
      '<rect x="20" y="64" width="54" height="7" ' + f('#c89a63', 1.5) + '/>' +
      '<rect x="26" y="48" width="42" height="16" ' + f('#ead6b4', 1.5) + '/>' +
      '<path d="M16 48L47 24l31 24z" ' + f('#a9814c', 1.6) + '/>' +
      '<rect x="40" y="52" width="14" height="12" ' + f('#fdf7ec', 1.3) + '/>' +
      /* 흙집 */
      '<rect x="104" y="56" width="54" height="36" ' + f('#dcb184', 1.6) + '/>' +
      '<rect x="98" y="48" width="66" height="9" ' + f('#c89a63', 1.6) + '/>' +
      '<rect x="112" y="64" width="11" height="11" ' + f('#8a6a4a', 1.3) + '/>' +
      '<rect x="140" y="64" width="11" height="11" ' + f('#8a6a4a', 1.3) + '/>' +
      '<rect x="124" y="78" width="14" height="14" ' + f('#8a6a4a', 1.3) + '/>' +
      /* 통나무집 */
      '<rect x="190" y="58" width="56" height="34" ' + f('#c89a63', 1.6) + '/>' +
      '<path d="M190 66h56M190 74h56M190 82h56" ' + k('#9c7340', 1.3) + '/>' +
      '<path d="M182 60L218 26l36 34z" ' + f('#6b7b8c', 1.6) + '/>' +
      '<path d="M185 57L218 30l33 27" ' + k('#ffffff', 5) + '/>' +
      '<rect x="210" y="70" width="16" height="22" ' + f('#8a5a3c', 1.3) + '/>' +
      t(47, 110, '열대 — 고상 가옥', 8.8, '#2b3545') +
      t(131, 110, '건조 — 흙집', 8.8, '#2b3545') +
      t(218, 110, '냉대 — 통나무집', 8.8, '#2b3545');
  } };

  /* 종교에 따른 문화권 */
  CA.religion4 = { w: 276, h: 128, d: function () {
    return "" + /* 이슬람교 — 모스크 */
      '<rect x="22" y="56" width="40" height="34" ' + f('#eef3fa') + '/>' +
      '<path d="M22 56q20-26 40 0z" ' + f('#8fb4e6') + '/>' +
      '<rect x="14" y="48" width="8" height="42" ' + f('#d7e3f3', 1.4) + '/>' +
      '<rect x="62" y="48" width="8" height="42" ' + f('#d7e3f3', 1.4) + '/>' +
      '<path d="M38 28a7 7 0 1 0 9 6 9 9 0 1 1-9-6z" ' + f('#2f6db0', 1.2) + '/>' +

      /* 힌두교 — 소 */
      '<ellipse cx="108" cy="62" rx="24" ry="15" ' + f('#f0ece2') + '/>' +
      '<circle cx="129" cy="52" r="9" ' + f('#f0ece2', 1.4) + '/>' +
      '<path d="M124 45q-4-8 2-9M134 45q4-8-2-9" ' + k('#b9b0a0', 2.2) + '/>' +
      '<path d="M94 76v10M104 78v8M114 78v8M124 76v10" ' + k('#cfc8ba', 2.6) + '/>' +
      '<path d="M84 100q18-7 36 0t36 0" ' + k('#7fc0ea', 3) + '/>' +
      '<path d="M84 108q18-7 36 0t36 0" ' + k('#aed8f2', 3) + '/>' +
      /* 크리스트교 — 교회 */
      '<rect x="170" y="62" width="38" height="30" ' + f('#f4f1e8') + '/>' +
      '<path d="M164 62l25-20 25 20z" ' + f('#b2593f') + '/>' +
      '<rect x="183" y="74" width="12" height="18" ' + f('#8fb4e6', 1.3) + '/>' +
      '<path d="M189 42V24M182 31h14" ' + k('#8a5a3c', 3) + '/>' +
      /* 불교 — 탑과 불상 */
      '<path d="M236 92h34l-5-10h-24z" ' + f('#cbb894', 1.5) + '/>' +
      '<path d="M240 82h26l-4-10h-18z" ' + f('#cbb894', 1.5) + '/>' +
      '<path d="M244 72h18l-3-9h-12z" ' + f('#cbb894', 1.5) + '/>' +
      '<path d="M253 63V52" ' + k('#a9793f', 2.4) + '/>' +
      '<circle cx="253" cy="48" r="5" ' + f('#f2c84b', 1.3) + '/>' +
      t(42, 110, '이슬람교', 10, '#2b3545') + t(42, 123, '모스크 · 돼지 금기', 7.8, '#46506b') +
      t(120, 110, '힌두교', 10, '#2b3545') + t(120, 123, '소 · 갠지스강', 7.8, '#46506b') +
      t(192, 110, '크리스트교', 10, '#2b3545') + t(192, 123, '십자가 · 교회', 7.8, '#46506b') +
      t(253, 110, '불교', 10, '#2b3545') + t(253, 123, '탑 · 불상', 7.8, '#46506b');
  } };

  /* 산업에 따른 문화권 — 농경과 유목 */
  CA.farmnomad = { w: 240, h: 118, d: function () {
    return '<path d="M118 8v102" ' + k('#b8c6d6', 1.6, '5 5') + '/>' +
      /* 농경 */
      '<rect x="8" y="76" width="100" height="26" ' + f('#cfe3c0', 1.6) + '/>' +
      '<path d="M14 84h88M14 92h88" ' + k('#8bb073', 2) + '/>' +
      '<path d="M22 76v-8M34 76v-10M46 76v-8M58 76v-10M70 76v-8" ' + k('#4d9a5e', 2.4) + '/>' +
      '<path d="M78 66l14-12 14 12z" ' + f('#c0724f', 1.4) + '/>' +
      '<rect x="82" y="66" width="20" height="12" ' + f('#f0e2c8', 1.4) + '/>' +
      fig(34, 64, .7, '#2f7a52') +
      t(58, 24, '농경', 11, '#2f7a52') + t(58, 40, '땅에 정착한다', 8.6, '#46506b') +
      /* 유목 */
      '<path d="M130 102h102" ' + k('#e0c98b', 3) + '/>' +
      '<path d="M146 92V78q16-5 32 0v14z" ' + f('#f6f2e7', 1.5) + '/>' +
      '<path d="M144 78q18-16 36 0z" ' + f('#ffffff', 1.5) + '/>' +
      '<rect x="157" y="82" width="10" height="10" ' + f('#b4553a', 1.3) + '/>' +
      '<ellipse cx="200" cy="90" rx="11" ry="7" ' + f('#ffffff', 1.4) + '/>' +
      '<circle cx="210" cy="85" r="4.4" ' + f('#4b5563', 1.3) + '/>' +
      '<path d="M194 97v5M200 98v4M206 97v5" ' + k('#4b5563', 1.5) + '/>' +
      arw(140, 64, 222, 64, '#b45309', 2.4) +
      t(180, 24, '유목', 11, '#b45309') + t(180, 40, '먹이를 찾아 옮겨 다닌다', 8.6, '#46506b');
  } };

  /* 발명과 발견 */
  CA.inventfind = { w: 240, h: 116, d: function () {
    return '<path d="M120 8v100" ' + k('#b8c6d6', 1.6, '5 5') + '/>' +
      /* 발명 */
      '<circle cx="58" cy="52" r="18" ' + f('#ffe9a8') + '/>' +
      '<path d="M50 66h16M52 72h12" ' + k('#a9793f', 2.4) + '/>' +
      '<path d="M58 46v12M52 52h12" ' + k('#d8a62c', 2) + '/>' +
      '<path d="M30 30l6 6M86 30l-6 6M58 24v8" ' + k('#f59e0b', 2.4) + '/>' +
      '<path d="M26 56h-7M90 56h7" ' + k('#f59e0b', 2.4) + '/>' +
      t(58, 100, '없던 것을 새로 만든다', 9, '#b45309') +
      t(58, 16, '발명', 12, '#b45309') +
      /* 발견 */
      '<path d="M156 78q24-22 48 0z" ' + f('#c8a271', 1.6) + '/>' +
      '<path d="M172 70q6-14 12 0q-6 10-12 0z" ' + f('#ef4444', 1.3) + '/>' +
      '<circle cx="190" cy="48" r="15" ' + f('none', 2.6) + '/>' +
      '<circle cx="190" cy="48" r="15" fill="#dbeafe" opacity=".45"/>' +
      '<path d="M201 59l12 12" ' + k(INK, 3.4) + '/>' +
      t(180, 100, '있었는데 몰랐던 것을 찾아낸다', 9, '#1d4ed8') +
      t(180, 16, '발견', 12, '#1d4ed8');
  } };

  /* 전파 세 가지 */
  CA.spread3 = { w: 272, h: 142, d: function () {
    return "" + /* 직접 */
      t(30, 28, '직접', 10, '#b45309') +
      fig(72, 34, .62, '#b45309') + fig(190, 34, .62, '#2f6db0') +
      arw(88, 22, 174, 22, '#b45309', 2.4) +
      t(131, 46, '전쟁 · 식민지 · 교역로', 8.4, '#46506b') +
      /* 간접 */
      t(30, 80, '간접', 10, '#2f6db0') +
      fig(72, 86, .62, '#2f6db0') + fig(190, 86, .62, '#2f7a52') +
      '<rect x="112" y="60" width="38" height="26" rx="3" ' + f('#2f4858', 1.6) + '/>' +
      '<path d="M120 68h18M120 76h11" ' + k('#9fb3c8', 2) + '/>' +
      '<path d="M126 86h10v4h-10z" ' + f('#2f4858', 1.4) + '/>' +
      arw(88, 72, 108, 72, '#2f6db0', 2.2) + arw(154, 72, 174, 72, '#2f6db0', 2.2) +
      t(131, 100, '인터넷 · TV · 책 (한류)', 8.4, '#46506b') +
      /* 자극 */
      t(30, 126, '자극', 10, '#6d28d9') +
      '<rect x="56" y="104" width="30" height="22" rx="4" ' + f('#ede9fe', 1.5) + '/>' +
      t(71, 119, 'ABC', 9, '#6d28d9') +
      arw(90, 115, 114, 115, '#6d28d9', 2.2) +
      '<circle cx="131" cy="115" r="11" ' + f('#ffe9a8', 1.5) + '/>' +
      '<path d="M127 120h8M128 124h6" ' + k('#a9793f', 1.8) + '/>' +
      arw(146, 115, 170, 115, '#6d28d9', 2.2) +
      '<rect x="174" y="104" width="40" height="22" rx="4" ' + f('#e9d5ff', 1.5) + '/>' +
      t(194, 119, '새 문자', 8.4, '#6d28d9') +
      t(136, 134, '체로키 문자 · 신라의 이두', 8.4, '#46506b');
  } };

  /* 문화 접변 세 갈래 — 병존 · 동화 · 융합 */
  CA.acculturation3 = { w: 272, h: 140, d: function () {
    return '<circle cx="110" cy="22" r="14" ' + f('#5b8fd6') + '/>' +
      t(110, 26, 'A', 12, '#ffffff') +
      t(136, 27, '+', 14, '#46506b') +
      '<circle cx="162" cy="22" r="14" ' + f('#e08a3c') + '/>' +
      t(162, 26, 'B', 12, '#ffffff') +
      arw(130, 40, 54, 62, '#8a94a6', 2.2) +
      arw(136, 42, 136, 62, '#8a94a6', 2.2) +
      arw(142, 40, 220, 62, '#8a94a6', 2.2) +
      /* 병존 */
      '<circle cx="42" cy="82" r="13" ' + f('#5b8fd6') + '/>' + t(42, 86, 'A', 11, '#ffffff') +
      '<circle cx="70" cy="82" r="13" ' + f('#e08a3c') + '/>' + t(70, 86, 'B', 11, '#ffffff') +
      t(56, 110, '문화 병존', 10.5, '#1d4ed8') +
      t(56, 126, '필리핀의 두 언어', 8.2, '#46506b') +
      /* 동화 */
      '<circle cx="122" cy="82" r="13" ' + f('none', 1.6) + ' stroke-dasharray="4 3"/>' +
      t(122, 86, 'A', 11, '#b8c6d6') +
      '<circle cx="150" cy="82" r="13" ' + f('#e08a3c') + '/>' + t(150, 86, 'B', 11, '#ffffff') +
      t(136, 110, '문화 동화', 10.5, '#b45309') +
      t(136, 126, '원주민 문화가 사라짐', 8.2, '#46506b') +
      /* 융합 */
      '<circle cx="220" cy="82" r="15" ' + f('#8356c7') + '/>' + t(220, 87, 'C', 12, '#ffffff') +
      t(220, 110, '문화 융합', 10.5, '#6d28d9') +
      t(220, 126, '재즈가 태어났다', 8.2, '#46506b');
  } };

  /* 재즈 — 두 음악이 만나 새 장르가 된다 */
  CA.jazz = { w: 216, h: 116, d: function () {
    return '<path d="M30 34h36l-6 36H36z" ' + f('#b2593f') + '/>' +
      '<ellipse cx="48" cy="34" rx="18" ry="7" ' + f('#f0ddc0', 1.5) + '/>' +
      '<path d="M34 42l28 0M36 52h24" ' + k('#8a3b2c', 1.4) + '/>' +
      note(84, 44, '#b2593f') +
      t(48, 88, '아프리카 리듬', 8.8, '#8a3b2c') +
      t(108, 56, '+', 14, '#46506b') +
      '<rect x="130" y="30" width="62" height="26" rx="3" ' + f('#ffffff', 1.6) + '/>' +
      '<path d="M139 30v26M148 30v26M157 30v26M166 30v26M175 30v26M184 30v26" ' + k(INK, 1.3) + '/>' +
      '<rect x="135" y="30" width="6" height="15" fill="' + INK + '"/>' +
      '<rect x="153" y="30" width="6" height="15" fill="' + INK + '"/>' +
      '<rect x="171" y="30" width="6" height="15" fill="' + INK + '"/>' +
      note(154, 72, '#2f4858') +
      t(161, 88, '서양 음악', 8.8, '#2f4858') +
      '<path d="M86 100h44" ' + k('#46506b', 2.2) + '/>' +
      '<path d="M86 106h44" ' + k('#46506b', 2.2) + '/>' +
      note(154, 110, '#d8a62c') +
      t(190, 110, '재즈', 12, '#b45309');
  } };

  /* 문화 지체 — 물질이 앞서고 제도가 뒤처진다 */
  CA.lag = { w: 236, h: 118, d: function () {
    return '<path d="M8 84h220" ' + k('#c3cdda', 4) + '/>' +
      '<path d="M18 84v-6M58 84v-6M98 84v-6M138 84v-6M178 84v-6M218 84v-6" ' + k('#c3cdda', 2) + '/>' +
      /* 앞선 물질문화 */
      '<rect x="166" y="38" width="40" height="40" rx="6" ' + f('#dbeafe') + '/>' +
      '<rect x="178" y="46" width="16" height="24" rx="3" ' + f('#2f4858', 1.5) + '/>' +
      '<path d="M182 50h8" ' + k('#9fb3c8', 1.6) + '/>' +
      t(186, 30, '물질문화', 10, '#1d4ed8') +
      /* 뒤처진 비물질문화 */
      '<rect x="36" y="38" width="40" height="40" rx="6" ' + f('#fee2e2') + '/>' +
      '<path d="M46 50h20v20H46z" ' + f('#ffffff', 1.5) + '/>' +
      '<path d="M50 56h12M50 61h12M50 66h8" ' + k('#b91c1c', 1.6) + '/>' +
      t(56, 30, '제도 · 의식', 10, '#b91c1c') +
      arw(80, 58, 160, 58, '#8a94a6', 2.2, 1) +
      '<path d="M80 58h80" ' + k('#8a94a6', 1.8, '5 4') + '/>' +
      t(120, 52, '지체', 11, '#b91c1c') +
      t(120, 106, '기술은 달려가는데 제도와 의식이 따라가지 못한다', 8.8, '#46506b');
  } };

  /* 나라마다 다른 인사법 */
  CA.greetings4 = { w: 258, h: 120, d: function () {
    return "" + /* 한국 — 허리 숙임 */
      face(34, 44, 13) +
      '<path d="M21 40a13 13 0 0 1 26 0z" fill="#3b3028"/>' +
      '<path d="M34 57v14q0 8 10 10" ' + k('#5b8fd6', 8) + '/>' +
      '<path d="M40 76l10 8" ' + k('#ffe2c4', 5) + '/>' +
      t(36, 100, '한국', 9.5, '#2b3545') + t(36, 113, '숙인다', 8.4, '#46506b') +
      /* 프랑스 — 볼 맞대기 */
      face(94, 44, 12) + face(118, 44, 12, '#ffd9b8') +
      '<path d="M82 38a12 12 0 0 1 24 0z" fill="#8a5a3c"/>' +
      '<path d="M106 38a12 12 0 0 1 24 0z" fill="#d8a62c"/>' +
      '<path d="M106 54q0 6 0 0" ' + k('#ef4444', 2) + '/>' +
      '<path d="M101 60q5 5 10 0" ' + k('#ef4444', 2) + '/>' +
      t(106, 100, '프랑스', 9.5, '#2b3545') + t(106, 113, '볼 맞대기', 8.4, '#46506b') +
      /* 티베트 — 혀 */
      face(172, 44, 13) +
      '<path d="M159 40a13 13 0 0 1 26 0z" fill="#3b3028"/>' +
      '<path d="M166 50q6 5 12 0" ' + k(INK, 1.6) + '/>' +
      '<path d="M168 52h8q0 10-4 10t-4-10z" ' + f('#ef7b8c', 1.3) + '/>' +
      t(172, 100, '티베트', 9.5, '#2b3545') + t(172, 113, '혀 내밀기', 8.4, '#46506b') +
      /* 마사이 — 침 */
      face(222, 44, 12, '#c98b5b') + face(246, 50, 11, '#c98b5b') +
      '<path d="M210 38a12 12 0 0 1 24 0z" fill="#2b2320"/>' +
      '<path d="M235 45a11 11 0 0 1 22 0z" fill="#2b2320"/>' +
      '<path d="M234 52q4-6 8-2" ' + k('#5aa9d8', 1.8) + '/>' +
      '<circle cx="237" cy="56" r="2.2" fill="#5aa9d8"/>' +
      '<circle cx="241" cy="60" r="1.6" fill="#5aa9d8"/>' +
      t(232, 100, '마사이', 9.5, '#2b3545') + t(232, 113, '침 나누기', 8.4, '#46506b');
  } };

  /* 세 가지 태도 — 우리 문화와 남의 문화를 어떻게 보는가 */
  CA.attitude3 = { w: 262, h: 124, d: function () {
    function pair(cx, a, b, c1, c2) {           /* a, b = 네모 크기 */
      return '<rect x="' + (cx - 30 - a / 2) + '" y="' + (62 - a / 2) + '" width="' + a +
        '" height="' + a + '" rx="4" ' + f(c1) + '/>' +
        '<rect x="' + (cx + 30 - b / 2) + '" y="' + (62 - b / 2) + '" width="' + b +
        '" height="' + b + '" rx="4" ' + f(c2) + '/>' +
        t(cx - 30, 92, '우리', 8.4, '#46506b') + t(cx + 30, 92, '남', 8.4, '#46506b');
    }
    return pair(48, 44, 20, '#5b8fd6', '#cbd5e1') +
      t(48, 22, '자문화 중심주의', 10, '#b45309') +
      t(48, 112, '우리만 우수하다', 8.6, '#46506b') +
      '<path d="M130 16v96" ' + k('#b8c6d6', 1.4, '5 5') + '/>' +
      pair(130, 20, 44, '#cbd5e1', '#e08a3c') +
      t(130, 22, '문화 사대주의', 10, '#b45309') +
      t(130, 112, '남의 것이 더 낫다', 8.6, '#46506b') +
      '<path d="M196 16v96" ' + k('#b8c6d6', 1.4, '5 5') + '/>' +
      pair(214, 34, 34, '#5b8fd6', '#e08a3c') +
      '<path d="M210 62h8" ' + k('#2f7a52', 2.4) + '/>' +
      '<path d="M210 58h8M210 66h8" ' + k('#2f7a52', 2.4) + '/>' +
      t(214, 22, '문화 상대주의', 10, '#047857') +
      t(214, 112, '다를 뿐, 우열이 없다', 8.6, '#46506b');
  } };

  /* 보편 윤리 — 넘으면 안 되는 선 */
  CA.commonethic = { w: 232, h: 120, d: function () {
    return '<rect x="10" y="10" width="212" height="44" rx="8" fill="#eafaf0"/>' +
      '<path d="M34 34q6-7 12 0" ' + k('#047857', 2.4) + '/>' +
      '<circle cx="40" cy="24" r="7" ' + f('#ffe2c4', 1.4) + '/>' +
      '<path d="M70 20h18v18H70z" ' + f('#ffffff', 1.4) + '/>' +
      '<path d="M74 26h10M74 32h6" ' + k('#047857', 1.6) + '/>' +
      '<ellipse cx="124" cy="30" rx="14" ry="9" ' + f('#ffffff', 1.4) + '/>' +
      '<path d="M116 30h16" ' + k('#047857', 1.6) + '/>' +
      '<path d="M166 38q10-20 20 0z" ' + f('#ffffff', 1.4) + '/>' +
      t(206, 34, '✓', 15, '#047857') +
      '<path d="M10 62h212" ' + k('#b91c1c', 4) + '/>' +
      t(116, 76, '보편 윤리 — 생명과 인권', 11, '#b91c1c') +
      '<rect x="10" y="84" width="212" height="30" rx="8" fill="#fee2e2"/>' +
      t(86, 104, '식인 문화 · 사티', 10, '#b91c1c') +
      '<path d="M140 94l16 16M156 94l-16 16" ' + k('#b91c1c', 3) + '/>' +
      t(190, 104, '받아들이지 않는다', 8.6, '#b91c1c');
  } };

  /* 용광로 이론 ↔ 샐러드 볼 이론 */
  CA.meltsalad = { w: 264, h: 128, d: function () {
    return '<path d="M132 10v108" ' + k('#b8c6d6', 1.6, '5 5') + '/>' +
      /* 용광로 */
      '<circle cx="30" cy="24" r="7" ' + f('#5b8fd6', 1.3) + '/>' +
      '<circle cx="52" cy="18" r="7" ' + f('#e08a3c', 1.3) + '/>' +
      '<circle cx="74" cy="24" r="7" ' + f('#8356c7', 1.3) + '/>' +
      '<circle cx="96" cy="18" r="7" ' + f('#43b06b', 1.3) + '/>' +
      '<path d="M22 44h82l-12 32H34z" ' + f('#6b7280') + '/>' +
      '<path d="M22 44h82" ' + k(INK, 2.2) + '/>' +
      '<ellipse cx="63" cy="52" rx="30" ry="6" ' + f('#b45309', 1.4) + '/>' +
      '<path d="M50 76q6 16 13 0" ' + k('#b45309', 3) + '/>' +
      '<path d="M40 88q10-10 23-10t23 10q-10 10-23 10T40 88z" ' + f('#b45309', 1.6) + '/>' +
      t(63, 110, '용광로 — 하나로 녹인다', 9, '#b45309') +
      /* 샐러드 볼 */
      '<path d="M156 52h96q-6 42-48 42t-48-42z" ' + f('#eef3fa') + '/>' +
      '<ellipse cx="204" cy="52" rx="48" ry="9" ' + f('#ffffff', 1.6) + '/>' +
      '<circle cx="180" cy="50" r="9" ' + f('#e4584a', 1.3) + '/>' +
      '<path d="M192 54q12-14 22 0q-11 7-22 0z" ' + f('#4fae62', 1.3) + '/>' +
      '<circle cx="228" cy="50" r="8" ' + f('#f2c84b', 1.3) + '/>' +
      '<circle cx="196" cy="66" r="7" ' + f('#8356c7', 1.3) + '/>' +
      '<circle cx="216" cy="68" r="7" ' + f('#5b8fd6', 1.3) + '/>' +
      '<path d="M226 64q10-10 18 0q-9 6-18 0z" ' + f('#43b06b', 1.3) + '/>' +
      t(204, 110, '샐러드 볼 — 제 색을 지킨다', 9, '#047857');
  } };

  /* 캐나다 모자이크 정책 */
  CA.mosaic = { w: 218, h: 116, d: function () {
    var col = ['#e4584a', '#f2c84b', '#5b8fd6', '#43b06b', '#8356c7', '#e08a3c', '#2f7a52', '#5aa9d8'];
    var tile = '', n = 0;
    for (var r = 0; r < 6; r++)
      for (var q = 0; q < 10; q++, n++)
        tile += '<rect x="' + (28 + q * 16) + '" y="' + (16 + r * 13) + '" width="14" height="11" rx="2" fill="' +
          col[(q + r * 3) % 8] + '" opacity=".8"/>';
    return '<rect x="20" y="8" width="178" height="88" rx="6" fill="#f4f0e4"/>' + tile +
      '<rect x="20" y="8" width="178" height="88" rx="6" fill="none" stroke="#8a5a3c" stroke-width="7"/>' +
      '<rect x="20" y="8" width="178" height="88" rx="6" ' + f('none', 1.6) + '/>' +
      t(109, 110, '조각 하나하나가 서로 다른 문화 — 모여서 한 그림', 8.6, '#b45309');
  } };

  /* 다문화 사회가 된 까닭 */
  CA.multicause = { w: 258, h: 118, d: function () {
    return '<path d="M26 46l34-10 10-14 6 2-5 14 20-6 6-8 5 2-4 10 16-4 2 6-16 6 3 10-5 2-6-8-20 6 5 14-6 2-10-14z" ' +
      f('#5b8fd6', 1.5) + '/>' +
      '<path d="M44 86a26 26 0 0 1 36 0M52 94a16 16 0 0 1 20 0" ' + k('#2f7a52', 3) + '/>' +
      '<circle cx="62" cy="102" r="3.4" fill="#2f7a52"/>' +
      t(62, 116, '교통 · 통신의 발달', 9.5, '#1d4ed8') +
      arw(104, 58, 134, 58, '#46506b', 2.6) +
      fig(164, 46, .64, '#b45309') +
      '<path d="M157 26h14v5h-14z" ' + f('#f59e0b', 1.2) + '/>' +
      t(164, 62, '외국인 근로자', 8, '#46506b') +
      fig(220, 46, .64, '#e2738e') +
      '<path d="M234 30q-5-5 0-8 4 2 0 8z" ' + f('#e2738e', 1.2) + '/>' +
      t(222, 62, '결혼 이민자', 8, '#46506b') +
      fig(164, 100, .64, '#2f6db0') +
      '<rect x="172" y="84" width="11" height="9" ' + f('#2f6db0', 1.2) + '/>' +
      t(164, 116, '유학생', 8, '#46506b') +
      fig(220, 100, .64, '#2f7a52') +
      '<path d="M228 82h12v10h-12z" ' + f('#ffffff', 1.2) + '/>' +
      '<path d="M230 86h8M230 89h5" ' + k('#2f7a52', 1.2) + '/>' +
      t(220, 116, '북한 이탈 주민', 8, '#46506b');
  } };

  /* ───────── 단원 V 생활공간과 사회 ───────── */

  function bldg(x, y, w, h, c, win) {           /* x,y = 왼쪽 아래 */
    var o = '<rect x="' + x + '" y="' + (y - h) + '" width="' + w + '" height="' + h + '" ' +
      f(c || '#9fb0c4', 1.5) + '/>';
    if (win !== 0) {
      var cols = Math.max(1, Math.floor(w / 9)), rows = Math.max(1, Math.floor(h / 11));
      for (var r = 0; r < rows; r++)
        for (var q = 0; q < cols; q++)
          o += '<rect x="' + (x + 3 + q * 9) + '" y="' + (y - h + 5 + r * 11) +
            '" width="4.5" height="6" fill="' + (win || '#eef4fb') + '"/>';
    }
    return o;
  }
  function box(x, y, w, h, c) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="6" ' +
      f(c || '#ffffff', 1.6) + '/>';
  }

  /* 1차 → 2차 → 3차 산업 */
  CA.industry3 = { w: 284, h: 120, d: function () {
    return "" +
      box(8, 16, 70, 62, '#eaf7e4') +
      '<path d="M26 70v-22M34 70v-26M42 70v-22M50 70v-26M58 70v-22" ' + k('#d8a62c', 2.6) + '/>' +
      '<path d="M26 48q-6-6 0-8 6 2 0 8M34 44q-6-6 0-8 6 2 0 8M42 48q-6-6 0-8 6 2 0 8' +
      'M50 44q-6-6 0-8 6 2 0 8M58 48q-6-6 0-8 6 2 0 8" ' + f('#e9c75a', 1.2) + '/>' +
      '<path d="M14 70h58" ' + k('#8a6a3c', 3) + '/>' +
      arw(84, 48, 102, 48, '#46506b', 2.6) +
      box(108, 16, 70, 62, '#eef3fa') +
      factory(116, 70, .62) +
      '<path d="M150 62q16-9 30 0-5 6-15 6t-15-6z" ' + f('#d9a35e', 1.4) + '/>' +
      arw(184, 48, 202, 48, '#46506b', 2.6) +
      box(208, 16, 70, 62, '#fdf2f8') +
      '<path d="M216 44h54v26h-54z" ' + f('#f7e4ec', 1.5) + '/>' +
      '<path d="M212 44l8-14h46l8 14z" ' + f('#e2738e', 1.5) + '/>' +
      '<rect x="234" y="52" width="18" height="18" ' + f('#ffffff', 1.3) + '/>' +
      fig(224, 70, .42, '#b91c1c') +
      t(43, 94, '1차 산업', 10.5, '#2f7a52') + t(43, 109, '땅에서 길러 낸다', 8.6, '#46506b') +
      t(143, 94, '2차 산업', 10.5, '#1d4ed8') + t(143, 109, '물건을 만들어 낸다', 8.6, '#46506b') +
      t(243, 94, '3차 산업', 10.5, '#b45309') + t(243, 109, '팔고 서비스한다', 8.6, '#46506b');
  } };

  /* 농촌이 도시로 — 산업화와 도시화 */
  CA.urbanize = { w: 286, h: 124, d: function () {
    return "" +
      '<rect x="4" y="80" width="124" height="26" fill="#cfe3c0"/>' +
      '<path d="M4 88h124M4 96h124" ' + k('#8bb073', 2) + '/>' +
      '<path d="M22 80l16-13 16 13z" ' + f('#c0724f', 1.4) + '/>' +
      '<rect x="26" y="80" width="24" height="14" ' + f('#f0e2c8', 1.4) + '/>' +
      '<path d="M66 80l14-11 14 11z" ' + f('#c0724f', 1.4) + '/>' +
      '<rect x="70" y="80" width="20" height="12" ' + f('#f0e2c8', 1.4) + '/>' +
      broadleaf(110, 80, .6) +
      arw(136, 62, 164, 62, '#46506b', 3) +
      '<rect x="172" y="88" width="110" height="18" fill="#dde5ef"/>' +
      bldg(176, 88, 24, 56, '#9fb0c4') +
      bldg(204, 88, 20, 70, '#b4c3d4') +
      bldg(228, 88, 26, 46, '#8fa3bb') +
      bldg(258, 88, 22, 62, '#a8b9cd') +
      '<path d="M172 100h110" ' + k('#aab6c6', 2) + '/>' +
      '<rect x="186" y="100" width="16" height="6" rx="2" ' + f('#5b86c4', 1.2) + '/>' +
      '<rect x="236" y="100" width="16" height="6" rx="2" ' + f('#e4584a', 1.2) + '/>' +
      t(66, 120, '1960년대 — 대부분 농부', 9, '#46506b') +
      t(226, 120, '공장이 생기고 도시가 자란다', 9, '#1d4ed8');
  } };

  /* 도시화 곡선 — S자 세 단계 */
  CA.urbancurve = { w: 244, h: 132, d: function () {
    return "" +
      '<path d="M34 14v92h192" ' + k('#64748b', 2.2) + '/>' +
      '<path d="M34 14l-4 6M34 14l4 6M226 106l-6-4M226 106l-6 4" ' + k('#64748b', 2.2) + '/>' +
      '<path d="M34 82h186M34 58h186M34 34h186" ' + k('#dbe3ec', 1.4) + '/>' +
      t(24, 86, '25', 7.4, '#64748b') + t(24, 62, '50', 7.4, '#64748b') +
      t(24, 38, '75', 7.4, '#64748b') +
      '<path d="M34 102C62 100 76 94 90 80C106 64 120 36 150 28C180 20 200 22 218 24" ' +
      k('#2563eb', 3.4) + '/>' +
      '<path d="M90 106V78M150 106V28" ' + k('#94a3b8', 1.6, '4 4') + '/>' +
      t(62, 120, '초기', 10, '#2f7a52') + t(120, 120, '가속화', 10, '#b45309') +
      t(186, 120, '종착', 10, '#1d4ed8') +
      t(62, 20, '천천히', 8, '#2f7a52') + t(104, 36, '이촌 향도', 8.4, '#b45309') +
      t(192, 16, '느려지고 역도시화', 8, '#1d4ed8') +
      t(12, 56, '%', 8.4, '#334155') + t(216, 120, '시간', 8.4, '#334155');
  } };

  /* 도시 내부 분화 — 집심과 이심 */
  CA.citydiff = { w: 290, h: 182, d: function () {
    return "" +
      '<path d="M10 52C60 52 100 24 145 24C190 24 230 52 280 52" ' + k('#e2738e', 2.6, '6 5') + '/>' +
      t(145, 16, '지가 (땅값)', 9, '#b91c1c') +
      '<rect x="4" y="104" width="282" height="16" fill="#e6ecf4"/>' +
      bldg(14, 104, 20, 20, '#c3cedb') + bldg(38, 104, 18, 16, '#cdd6e1') +
      bldg(74, 104, 20, 32, '#a8b9cd') + bldg(98, 104, 18, 28, '#b4c3d4') +
      bldg(126, 104, 20, 50, '#8fa3bb') + bldg(150, 104, 18, 58, '#7e93ac') +
      bldg(172, 104, 16, 46, '#8fa3bb') +
      bldg(200, 104, 18, 28, '#b4c3d4') + bldg(222, 104, 20, 32, '#a8b9cd') +
      bldg(252, 104, 18, 16, '#cdd6e1') +
      t(145, 134, '집심 — 중추 관리 기능이 모인다', 9, '#1d4ed8') +
      arw(46, 142, 112, 142, '#1d4ed8', 2.4) + arw(244, 142, 178, 142, '#1d4ed8', 2.4) +
      t(145, 160, '이심 — 주거 · 공업이 빠져나간다', 9, '#b45309') +
      arw(124, 168, 56, 168, '#b45309', 2.4) + arw(166, 168, 234, 168, '#b45309', 2.4) +
      t(32, 116, '주변', 8.6, '#46506b') + t(90, 116, '부도심', 8.6, '#46506b') +
      t(159, 116, '도심', 10, '#1d4ed8') +
      t(214, 116, '부도심', 8.6, '#46506b') + t(264, 116, '주변', 8.6, '#46506b');
  } };

  /* 인구 공동화 — 낮과 밤의 도심 */
  CA.hollowing = { w: 264, h: 124, d: function () {
    function tower(x, y, h, on) {
      var o = bldg(x, y, 26, h, '#8fa3bb', on ? '#ffe9a8' : '#3b4656');
      return o;
    }
    return "" +
      '<rect x="4" y="12" width="124" height="96" rx="7" fill="#eaf4ff"/>' +
      sun(26, 30, 9) +
      '<rect x="4" y="96" width="124" height="12" fill="#dde5ef"/>' +
      tower(28, 96, 56, 1) + tower(62, 96, 70, 1) + tower(96, 96, 48, 1) +
      fig(18, 108, .4, '#1d4ed8') + fig(44, 108, .4, '#b45309') +
      fig(84, 108, .4, '#047857') + fig(114, 108, .4, '#b91c1c') +
      '<rect x="136" y="12" width="124" height="96" rx="7" fill="#232c3d"/>' +
      '<path d="M242 22a9 9 0 1 0 10 8 11 11 0 1 1-10-8z" fill="#ffe9a8"/>' +
      '<rect x="136" y="96" width="124" height="12" fill="#39445a"/>' +
      tower(160, 96, 56, 0) + tower(194, 96, 70, 0) + tower(228, 96, 48, 0) +
      fig(146, 108, .4, '#9aa7b8') +
      t(66, 122, '낮 — 주간 인구 많다', 9, '#1d4ed8') +
      t(198, 122, '밤 — 상주 인구 적다', 9, '#6d28d9');
  } };

  /* 교외화와 대도시권 */
  CA.metroarea = { w: 266, h: 136, d: function () {
    return "" +
      '<ellipse cx="133" cy="62" rx="126" ry="56" ' + f('#eef4fb', 1.8) + ' stroke-dasharray="6 5"/>' +
      '<circle cx="133" cy="62" r="36" ' + f('#dbeafe') + '/>' +
      bldg(118, 78, 14, 34, '#7e93ac') + bldg(136, 78, 12, 26, '#8fa3bb') +
      bldg(150, 78, 10, 20, '#a8b9cd') +
      t(133, 42, '중심 도시', 9.5, '#1d4ed8') +
      '<circle cx="46" cy="40" r="20" ' + f('#e7f3e2') + '/>' +
      '<path d="M38 48l8-8 8 8z" ' + f('#c0724f', 1.2) + '/><rect x="41" y="48" width="10" height="7" ' + f('#f0e2c8', 1.1) + '/>' +
      '<circle cx="46" cy="92" r="20" ' + f('#e7f3e2') + '/>' +
      '<path d="M38 100l8-8 8 8z" ' + f('#c0724f', 1.2) + '/><rect x="41" y="100" width="10" height="7" ' + f('#f0e2c8', 1.1) + '/>' +
      '<circle cx="220" cy="40" r="20" ' + f('#e7f3e2') + '/>' +
      '<path d="M212 48l8-8 8 8z" ' + f('#c0724f', 1.2) + '/><rect x="215" y="48" width="10" height="7" ' + f('#f0e2c8', 1.1) + '/>' +
      '<circle cx="220" cy="92" r="20" ' + f('#e7f3e2') + '/>' +
      '<path d="M212 100l8-8 8 8z" ' + f('#c0724f', 1.2) + '/><rect x="215" y="100" width="10" height="7" ' + f('#f0e2c8', 1.1) + '/>' +
      arw(68, 46, 98, 56, '#b45309', 2.2) + arw(68, 88, 98, 72, '#b45309', 2.2) +
      arw(198, 46, 168, 56, '#b45309', 2.2) + arw(198, 88, 168, 72, '#b45309', 2.2) +
      t(133, 132, '집은 주변 도시, 직장은 중심 도시 — 대도시권', 9, '#46506b');
  } };

  /* 열섬 현상 */
  CA.heatisland = { w: 274, h: 130, d: function () {
    return "" +
      '<path d="M10 76C46 76 58 72 74 60C96 44 120 24 144 24C168 24 190 44 210 60C224 72 238 76 264 76" ' +
      k('#e4584a', 3) + '/>' +
      t(144, 18, '기온', 9, '#b91c1c') +
      '<rect x="4" y="90" width="266" height="26" fill="#cfe3c0"/>' +
      '<rect x="78" y="90" width="118" height="26" fill="#9aa2ad"/>' +
      '<path d="M78 90v26M196 90v26" ' + k('#6b7280', 1.6) + '/>' +
      pine(24, 90, .5) + broadleaf(50, 90, .5) +
      pine(248, 90, .5) + broadleaf(222, 90, .5) +
      bldg(86, 90, 20, 40, '#8fa3bb') + bldg(110, 90, 18, 54, '#7e93ac') +
      bldg(132, 90, 20, 36, '#9fb0c4') + bldg(156, 90, 16, 48, '#8fa3bb') +
      bldg(176, 90, 16, 30, '#a8b9cd') +
      arw(100, 88, 100, 72, '#e4584a', 2) + arw(140, 84, 140, 68, '#e4584a', 2) +
      arw(178, 88, 178, 74, '#e4584a', 2) +
      '<rect x="120" y="100" width="12" height="9" rx="2" ' + f('#cbd5e1', 1.2) + '/>' +
      '<path d="M122 103h8M122 106h8" ' + k('#94a3b8', 1.1) + '/>' +
      t(40, 126, '촌락', 9, '#2f7a52') + t(137, 126, '도시 — 아스팔트 · 건물 · 기계 열', 8.8, '#b91c1c') +
      t(240, 126, '촌락', 9, '#2f7a52');
  } };

  /* 빨대 효과 */
  CA.strawman = { w: 266, h: 142, d: function () {
    return "" +
      '<rect x="4" y="92" width="258" height="18" fill="#e6ecf4"/>' +
      '<path d="M4 101h258" ' + k('#9aa7b8', 2.4, '9 6') + '/>' +
      t(133, 126, '고속철도 · 고속도로로 한 시간 거리', 8.8, '#46506b') +
      bldg(20, 92, 18, 22, '#c3cedb') + bldg(42, 92, 16, 18, '#cdd6e1') +
      bldg(62, 92, 18, 16, '#c3cedb') +
      t(50, 58, '작은 도시', 9.5, '#46506b') +
      bldg(186, 92, 20, 60, '#7e93ac') + bldg(210, 92, 18, 74, '#8fa3bb') +
      bldg(232, 92, 20, 52, '#7e93ac') +
      t(218, 20, '큰 도시', 10.5, '#1d4ed8') +
      '<path d="M78 86C110 86 126 58 160 40" ' + k('#e4584a', 9) + '/>' +
      '<path d="M78 86C110 86 126 58 160 40" ' + k('#ffffff', 3.4) + '/>' +
      '<circle cx="92" cy="86" r="4" fill="#b45309"/>' +
      '<circle cx="114" cy="78" r="4" fill="#b45309"/>' +
      '<circle cx="134" cy="60" r="4" fill="#b45309"/>' +
      t(133, 139, '인구와 소비가 빨려 간다', 9, '#b91c1c');
  } };

  /* 선박 평형수와 외래종 */
  CA.ballast = { w: 274, h: 120, d: function () {
    function fish(x, y, c, s) {
      s = s || 1;
      return '<path d="M' + x + ' ' + y + 'q' + (9 * s) + ' ' + (-6 * s) + ' ' + (18 * s) + ' 0q' +
        (-9 * s) + ' ' + (6 * s) + ' ' + (-18 * s) + ' 0z" ' + f(c, 1.2) + '/>' +
        '<path d="M' + (x + 18 * s) + ' ' + y + 'l' + (5 * s) + ' ' + (-4 * s) + 'v' + (8 * s) + 'z" ' +
        f(c, 1.2) + '/>';
    }
    function ship(x) {
      return '<path d="M' + x + ' 44h56l-9 18h-38z" ' + f('#e8eef6', 1.6) + '/>' +
        '<rect x="' + (x + 16) + '" y="30" width="22" height="14" ' + f('#5b86c4', 1.4) + '/>' +
        '<path d="M' + (x + 24) + ' 30v-9" ' + k('#4b5563', 2.2) + '/>';
    }
    return "" +
      '<rect x="4" y="62" width="266" height="46" fill="#8ec7ee"/>' +
      '<path d="M4 70q16-5 32 0t32 0 32 0 32 0 32 0 32 0 36 0" ' + k('#c7e4f7', 2) + '/>' +
      ship(16) + ship(196) +
      arw(84, 36, 190, 36, '#1d4ed8', 2.6) +
      '<path d="M40 62v14" ' + k('#2563eb', 3) + '/>' +
      '<path d="M234 62v14" ' + k('#2563eb', 3) + '/>' +
      fish(30, 84, '#e4584a', .7) + fish(52, 94, '#e4584a', .7) +
      fish(198, 86, '#43b06b', .7) + fish(226, 96, '#e4584a', .7) +
      fish(246, 84, '#43b06b', .7) +
      t(44, 116, '평형수와 함께 빨려 든다', 8.6, '#1d4ed8') +
      t(226, 116, '다른 바다에 버려져 섞인다', 8.6, '#b91c1c');
  } };

  /* 정보화가 바꾼 세 분야 */
  CA.infochange = { w: 286, h: 124, d: function () {
    return "" +
      box(6, 12, 88, 70, '#eef4fb') +
      '<rect x="30" y="26" width="40" height="30" rx="3" ' + f('#ffffff', 1.5) + '/>' +
      '<path d="M38 36h24M38 44h16" ' + k('#5b86c4', 2) + '/>' +
      '<path d="M44 56h12v8H44z" ' + f('#5b86c4', 1.3) + '/>' +
      '<path d="M36 70h28" ' + k('#9aa7b8', 2) + '/>' +
      box(99, 12, 88, 70, '#f0fdf4') +
      '<rect x="124" y="26" width="38" height="26" rx="3" ' + f('#ffffff', 1.5) + '/>' +
      '<path d="M132 34h22M132 42h14" ' + k('#2f7a52', 2) + '/>' +
      '<path d="M126 58h34l-5 14h-24z" ' + f('#8fd8a4', 1.4) + '/>' +
      '<path d="M134 58v-6a9 9 0 0 1 18 0v6" ' + k('#2f7a52', 2) + '/>' +
      box(192, 12, 88, 70, '#fdf2f8') +
      '<rect x="216" y="24" width="24" height="38" rx="4" ' + f('#ffffff', 1.5) + '/>' +
      '<path d="M222 32h12M222 40h12M222 48h8" ' + k('#e2738e', 2) + '/>' +
      '<path d="M248 36h18v20h-18z" ' + f('#e2738e', 1.4) + '/>' +
      '<path d="M253 46l8-4v8z" fill="#ffffff"/>' +
      '<path d="M214 70h44" ' + k('#9aa7b8', 2) + '/>' +
      t(50, 96, '정치 · 행정', 10, '#1d4ed8') + t(50, 111, '전자 투표 · 민원 서류', 8.2, '#46506b') +
      t(143, 96, '경제', 10, '#047857') + t(143, 111, '전자 상거래 · 금융 앱', 8.2, '#46506b') +
      t(236, 96, '사회 · 문화', 10, '#b91c1c') + t(236, 111, '원격 진료 · 교육 · 영상', 8.2, '#46506b');
  } };

  /* 정보 격차 */
  CA.digitalgap = { w: 254, h: 120, d: function () {
    return "" +
      '<path d="M8 96h110v12H8z" ' + f('#d6eecb', 1.5) + '/>' +
      '<path d="M18 96V74h20v22M44 96V58h20v38M70 96V42h20v54" ' + k('#2f7a52', 3) + '/>' +
      fig(100, 96, .52, '#047857') +
      '<rect x="104" y="60" width="11" height="17" rx="2" ' + f('#2f7a52', 1.3) + '/>' +
      '<path d="M136 96h110v12H136z" ' + f('#f3dca2', 1.5) + '/>' +
      '<path d="M146 96V88h20v8M172 96V84h20v12M198 96V80h20v16" ' + k('#b45309', 3) + '/>' +
      fig(230, 96, .52, '#b45309') +
      '<path d="M222 58l14 14M236 58l-14 14" ' + k('#b91c1c', 2.6) + '/>' +
      t(63, 32, '정보를 잘 쓰는 사람', 9.5, '#047857') +
      t(190, 32, '못 쓰는 사람', 9.5, '#b45309') +
      t(127, 116, '정보 격차 — 기회와 소득의 차이로 이어진다', 8.8, '#b91c1c');
  } };

  /* 지역 조사 다섯 단계 */
  CA.survey5 = { w: 304, h: 118, d: function () {
    var step = ['목적 정하기', '주제 · 지역', '정보 수집', '정보 분석', '보고서'],
        sub = ['왜 조사하나', '무얼 어디서', '실내 → 야외', '그래프 · 지도', '해석과 대책'],
        col = ['#dbeafe', '#e7f3e2', '#fdf0cd', '#f5e8fb', '#fde3ea'],
        ic = ['question', 'map', 'magnifier', 'bars', 'doc'];
    var o = '';
    for (var i = 0; i < 5; i++) {
      var x = 4 + i * 60;
      o += box(x, 14, 52, 54, col[i]);
      var g = (window.ConceptArt && ConceptArt.G[ic[i]]) || '';
      o += '<g transform="translate(' + (x + 14) + ',24) scale(1)">' + g + '</g>';
      o += t(x + 26, 62, String(i + 1), 11, '#46506b');
      o += t(x + 26, 84, step[i], 8.8, '#2b3545');
      o += t(x + 26, 98, sub[i], 7.6, '#46506b');
      if (i < 4) o += arw(x + 54, 40, x + 58, 40, '#46506b', 2.2);
    }
    return o + t(152, 114, '단계 순서를 묻는 문제가 자주 나온다', 8.8, '#b91c1c');
  } };

  /* 도시 문제와 촌락 문제 */
  CA.citycountry = { w: 288, h: 130, d: function () {
    return "" +
      '<path d="M144 8v116" ' + k('#b8c6d6', 1.6, '5 5') + '/>' +
      '<rect x="4" y="86" width="132" height="20" fill="#e6ecf4"/>' +
      bldg(14, 86, 20, 44, '#8fa3bb') + bldg(38, 86, 18, 56, '#7e93ac') +
      bldg(60, 86, 20, 38, '#9fb0c4') +
      '<path d="M90 86h40l-4 -12h-32z" ' + f('#c0724f', 1.4) + '/>' +
      '<path d="M94 80h8M110 80h8" ' + k('#8a5a3c', 1.4) + '/>' +
      fig(100, 86, .42, '#b91c1c') + fig(120, 86, .42, '#b45309') +
      t(70, 20, '도시', 11, '#1d4ed8') +
      t(70, 114, '주택 부족 · 슬럼 · 기반 시설 부족', 8.2, '#46506b') +
      t(70, 126, '중소도시는 인구 유출', 8.2, '#46506b') +
      '<rect x="152" y="86" width="132" height="20" fill="#cfe3c0"/>' +
      '<path d="M166 86l16-13 16 13z" ' + f('#c0724f', 1.4) + '/>' +
      '<rect x="170" y="86" width="24" height="0" />' +
      '<path d="M210 86l14-11 14 11z" ' + f('#9aa7b8', 1.4) + '/>' +
      '<rect x="214" y="78" width="20" height="8" ' + f('#d7dee8', 1.3) + '/>' +
      '<path d="M216 80l16 6M232 80l-16 6" ' + k('#9aa7b8', 1.4) + '/>' +
      broadleaf(258, 86, .55) +
      fig(182, 86, .42, '#047857') +
      t(218, 20, '촌락', 11, '#047857') +
      t(218, 114, '노동력 부족 · 성비 불균형', 8.2, '#46506b') +
      t(218, 126, '교육 · 의료 · 문화 시설 부족', 8.2, '#46506b');
  } };

  /* 촌락을 살리는 길 */
  CA.brandregion = { w: 276, h: 118, d: function () {
    return "" +
      box(6, 12, 80, 62, '#fdf0cd') +
      '<circle cx="46" cy="40" r="17" ' + f('#ffffff', 1.6) + '/>' +
      '<circle cx="46" cy="40" r="12" ' + f('none', 1.4) + '/>' +
      t(46, 44, '순창', 9, '#b45309') +
      box(98, 12, 80, 62, '#e7f3e2') +
      '<rect x="112" y="26" width="52" height="28" rx="4" ' + f('#ffffff', 1.6) + '/>' +
      t(138, 45, '벌교 꼬막', 9.5, '#047857') +
      '<path d="M126 54v10h24v-10" ' + k('#8a6a4a', 2.4) + '/>' +
      box(190, 12, 80, 62, '#fde3ea') +
      '<path d="M202 60h56l-28-26z" ' + f('#f3b6c4', 1.5) + '/>' +
      '<path d="M230 34v-14l16 5-16 5" ' + f('#e4584a', 1.4) + '/>' +
      '<path d="M202 60h56" ' + k('#b2593f', 2.2) + '/>' +
      t(46, 92, '지리적 표시제', 9.5, '#b45309') + t(46, 106, '어디서 났는지 표시', 8, '#46506b') +
      t(138, 92, '지역 브랜드화', 9.5, '#047857') + t(138, 106, '이름만 들어도 떠오르게', 8, '#46506b') +
      t(230, 92, '지역 축제', 9.5, '#b91c1c') + t(230, 106, '사람을 불러 모은다', 8, '#46506b');
  } };

  /* 젠트리피케이션 */
  CA.gentri = { w: 288, h: 126, d: function () {
    return "" +
      box(4, 14, 84, 64, '#f1ece2') +
      '<path d="M18 70h26v-26H18z" ' + f('#d9cdb8', 1.4) + '/>' +
      '<path d="M50 70h24V48H50z" ' + f('#cfc2ab', 1.4) + '/>' +
      '<path d="M22 54h16M54 56h14" ' + k('#a9977c', 1.6) + '/>' +
      fig(62, 70, .4, '#8a5a3c') +
      t(46, 92, '낡은 골목', 9.5, '#8a6a4a') + t(46, 106, '임대료가 싸다', 8.2, '#46506b') +
      arw(92, 46, 100, 46, '#46506b', 2.2) +
      box(104, 14, 84, 64, '#fdf0cd') +
      '<path d="M118 70h26V44h-26z" ' + f('#ffffff', 1.4) + '/>' +
      '<path d="M116 44h30l-4-8h-22z" ' + f('#e4584a', 1.4) + '/>' +
      '<path d="M150 70h24V48h-24z" ' + f('#ffffff', 1.4) + '/>' +
      '<path d="M148 48h28l-4-7h-20z" ' + f('#5b86c4', 1.4) + '/>' +
      fig(132, 70, .4, '#b45309') + fig(166, 70, .4, '#047857') + fig(180, 70, .4, '#1d4ed8') +
      t(146, 92, '사람이 몰린다', 9.5, '#b45309') + t(146, 106, '카페 · 가게가 들어선다', 8.2, '#46506b') +
      arw(192, 46, 200, 46, '#46506b', 2.2) +
      box(204, 14, 80, 64, '#fde3ea') +
      '<path d="M216 70h24V40h-24z" ' + f('#ffffff', 1.4) + '/>' +
      '<path d="M214 40h28l-4-8h-20z" ' + f('#e2738e', 1.4) + '/>' +
      arw(252, 66, 252, 32, '#b91c1c', 2.6) +
      t(264, 50, '임대료', 7.6, '#b91c1c') +
      fig(226, 70, .4, '#8a5a3c') +
      '<rect x="234" y="62" width="10" height="8" rx="1.5" ' + f('#8a5a3c', 1.2) + '/>' +
      t(244, 92, '원래 사람이 밀려난다', 9.5, '#b91c1c') + t(244, 106, '젠트리피케이션', 8.6, '#b91c1c');
  } };

  /* 교통이 이어 준 두 지역 */
  CA.bridgelink = { w: 272, h: 118, d: function () {
    return "" +
      '<rect x="4" y="56" width="264" height="48" fill="#8ec7ee"/>' +
      '<path d="M4 66q16-5 32 0t32 0 32 0 32 0 32 0 32 0 36 0" ' + k('#c7e4f7', 2) + '/>' +
      '<path d="M4 56h64v-8H4z" ' + f('#cfe3c0', 1.5) + '/>' +
      '<path d="M204 56h64v-8h-64z" ' + f('#cfe3c0', 1.5) + '/>' +
      bldg(16, 48, 18, 24, '#9fb0c4') + bldg(40, 48, 16, 18, '#b4c3d4') +
      bldg(216, 48, 18, 22, '#9fb0c4') + bldg(240, 48, 16, 28, '#b4c3d4') +
      '<path d="M68 48h136" ' + k('#cbd5e1', 7) + '/>' +
      '<path d="M68 48h136" ' + k(INK, 1.8) + '/>' +
      '<path d="M100 48V26M172 48V26" ' + k('#9aa7b8', 3) + '/>' +
      '<path d="M68 48L100 26l36 16 36-16 32 22" ' + k('#9aa7b8', 2) + '/>' +
      '<path d="M90 60v16M182 60v16" ' + k('#9aa7b8', 3) + '/>' +
      '<rect x="120" y="38" width="22" height="9" rx="2" ' + f('#e4584a', 1.3) + '/>' +
      t(36, 112, '세 시간 → 한 시간', 9, '#1d4ed8') +
      t(206, 112, '서로 오가며 경제가 살아난다', 9, '#047857');
  } };

  /* ───────── 단원 VI 인권 보장과 헌법 ───────── */

  function card(x, y, w, h, c, bd) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="7" ' +
      f(c || '#ffffff', bd == null ? 1.6 : bd) + '/>';
  }
  function crown(x, y, s) {
    s = s || 1;
    return '<path d="M' + (x - 11 * s) + ' ' + y + 'l' + (-2 * s) + ' ' + (-13 * s) + 'l' +
      (6.5 * s) + ' ' + (5 * s) + 'L' + x + ' ' + (y - 16 * s) + 'l' + (6.5 * s) + ' ' + (8 * s) +
      'l' + (6.5 * s) + ' ' + (-5 * s) + 'l' + (-2 * s) + ' ' + (13 * s) + 'z" ' +
      f('#f2c84b', 1.5 * s) + '/>';
  }

  /* 인권이 자라 온 길 — 1 · 2 · 3세대 */
  CA.rightgrow = { w: 302, h: 136, d: function () {
    function node(x, c) {
      return '<circle cx="' + x + '" cy="62" r="9" ' + f(c, 2) + '/>';
    }
    return "" +
      '<path d="M14 62h276" ' + k('#aab6c6', 3) + '/>' +
      '<path d="M290 62l-7-5M290 62l-7 5" ' + k('#aab6c6', 3) + '/>' +
      node(60, '#5b8fd6') + node(152, '#43b06b') + node(244, '#8356c7') +
      card(18, 10, 84, 40, '#eaf1ff') + t(60, 26, '시민 혁명', 9.5, '#1d4ed8') +
      t(60, 41, '18세기', 8.4, '#46506b') +
      card(110, 10, 84, 40, '#eaf7ec') + t(152, 26, '바이마르 헌법', 9.5, '#047857') +
      t(152, 41, '1919년', 8.4, '#46506b') +
      card(202, 10, 84, 40, '#f3ecfd') + t(244, 26, '오늘날', 9.5, '#6d28d9') +
      t(244, 41, '지구 전체', 8.4, '#46506b') +
      t(60, 88, '1세대 — 자유권', 10, '#1d4ed8') +
      t(60, 103, '평등권 · 참정권', 8.6, '#46506b') +
      t(60, 120, '“간섭하지 마”', 9, '#1d4ed8') +
      t(152, 88, '2세대 — 사회권', 10, '#047857') +
      t(152, 103, '교육 · 근로 · 환경', 8.6, '#46506b') +
      t(152, 120, '“도와줘”', 9, '#047857') +
      t(244, 88, '3세대 — 연대권', 10, '#6d28d9') +
      t(244, 103, '평화 · 환경 · 발전', 8.6, '#46506b') +
      t(244, 120, '“다 같이 지키자”', 9, '#6d28d9');
  } };

  /* 인권의 네 가지 성질 */
  CA.right4 = { w: 284, h: 120, d: function () {
    return "" +
      card(6, 10, 64, 62, '#eaf1ff') +
      '<path d="M38 22v22M30 36l8 8 8-8" ' + k('#5b8fd6', 2.6) + '/>' +
      '<path d="M26 56h24" ' + k('#5b8fd6', 2.6) + '/>' +
      card(78, 10, 64, 62, '#eaf7ec') +
      '<path d="M110 20l16 7v12c0 10-8 17-16 20-8-3-16-10-16-20V27z" ' + f('#8ed7a3', 1.6) + '/>' +
      card(150, 10, 64, 62, '#fdf0cd') +
      fig(166, 60, .46, '#b45309') + fig(182, 60, .46, '#b45309') + fig(198, 60, .46, '#b45309') +
      card(222, 10, 64, 62, '#f3ecfd') +
      '<path d="M242 22h24l-12 16 12 16h-24l12-16z" ' + f('#c4a8ec', 1.5) + '/>' +
      '<path d="M240 20h28M240 56h28" ' + k('#6d28d9', 2.4) + '/>' +
      t(38, 90, '천부성', 10.5, '#1d4ed8') + t(38, 106, '태어날 때부터', 8.4, '#46506b') +
      t(110, 90, '불가침성', 10.5, '#047857') + t(110, 106, '누구도 못 뺏는다', 8.4, '#46506b') +
      t(182, 90, '보편성', 10.5, '#b45309') + t(182, 106, '누구에게나', 8.4, '#46506b') +
      t(254, 90, '항구성', 10.5, '#6d28d9') + t(254, 106, '영원히', 8.4, '#46506b');
  } };

  /* 세 번의 시민 혁명과 세 문서 */
  CA.revolution3 = { w: 292, h: 128, d: function () {
    return "" +
      card(6, 10, 88, 66, '#eaf1ff') +
      crown(50, 44, .9) +
      '<path d="M34 50h32" ' + k('#b91c1c', 3.4) + '/>' +
      card(102, 10, 88, 66, '#fdf0cd') +
      '<path d="M132 60V20l30 8-30 8" ' + f('#e4584a', 1.6) + '/>' +
      '<path d="M132 60v8" ' + k('#8a5a3c', 2.6) + '/>' +
      card(198, 10, 88, 66, '#fde3ea') +
      '<path d="M222 66V32h40v34z" ' + f('#9aa7b8', 1.6) + '/>' +
      '<path d="M232 66V48h8v18M250 66V48h8v18" ' + f('#4b5563', 1.3) + '/>' +
      '<path d="M218 32h48" ' + k('#4b5563', 2.6) + '/>' +
      t(50, 94, '영국 명예혁명', 9.6, '#1d4ed8') + t(50, 110, '권리 장전', 9, '#46506b') +
      t(146, 94, '미국 독립혁명', 9.6, '#b45309') + t(146, 110, '독립 선언', 9, '#46506b') +
      t(242, 94, '프랑스 혁명', 9.6, '#b91c1c') + t(242, 110, '인권 선언', 9, '#46506b') +
      t(146, 126, '왕의 힘을 묶고, 시민이 주인이 되었다', 8.8, '#46506b');
  } };

  /* 자본주의의 모순 */
  CA.capcontra = { w: 276, h: 124, d: function () {
    return "" +
      '<path d="M138 8v104" ' + k('#b8c6d6', 1.6, '5 5') + '/>' +
      card(8, 12, 122, 70, '#eef4fb') +
      '<path d="M34 72h44V40H34z" ' + f('#9fb0c4', 1.5) + '/>' +
      '<path d="M30 40l26-14 26 14" ' + k('#7e93ac', 2.6) + '/>' +
      t(56, 60, '국가', 10, '#46506b') +
      arw(96, 56, 122, 56, '#46506b', 2.4) +
      t(69, 96, '국가는 물러났다', 9.6, '#1d4ed8') +
      t(69, 110, '“간섭하지 않겠다”', 8.4, '#46506b') +
      card(146, 12, 122, 70, '#fef2f2') +
      crown(176, 36, .62) +
      fig(176, 74, .72, '#b45309') +
      fig(216, 74, .5, '#6b7280') + fig(238, 74, .36, '#6b7280') +
      arw(192, 48, 208, 56, '#b91c1c', 2.2) +
      t(207, 96, '자본가가 왕이 되었다', 9.6, '#b91c1c') +
      t(207, 110, '긴 노동 시간 · 아동 노동', 8.4, '#46506b');
  } };

  /* 세계 인권 선언 */
  CA.udhr = { w: 266, h: 126, d: function () {
    return "" +
      '<circle cx="44" cy="46" r="26" ' + f('#dbeafe', 1.8) + '/>' +
      '<path d="M26 46h36M44 20v52M30 30q14 8 28 0M30 62q14-8 28 0" ' + k('#5b8fd6', 1.5) + '/>' +
      t(44, 90, 'UN', 11, '#1d4ed8') + t(44, 106, '1948년', 9, '#46506b') +
      card(84, 10, 176, 26, '#ffffff') + t(172, 28, '1조 — 자유롭고 존엄하며 평등하다', 9.4, '#1b2330') +
      card(84, 40, 176, 26, '#ffffff') + t(172, 58, '2조 — 어떤 이유로도 차별받지 않는다', 9.4, '#1b2330') +
      card(84, 70, 176, 26, '#eaf7ec') + t(172, 88, '22조 — 사회 보장을 받는다  (사회권)', 9.4, '#047857') +
      card(84, 100, 176, 24, '#eaf7ec') + t(172, 117, '24조 — 휴식과 여가  (사회권)', 9.4, '#047857');
  } };

  /* 새로 나타난 권리들 */
  CA.newrights = { w: 294, h: 120, d: function () {
    var it = [['house', '주거권', '안전한 집'], ['shield', '안전권', '재난에서 보호'],
              ['leaf', '환경권', '깨끗한 환경'], ['brush2', '문화권', '문화를 누릴'],
              ['handshake', '연대권', '함께 지키기']];
    var o = '';
    for (var i = 0; i < 5; i++) {
      var x = 4 + i * 58;
      o += card(x, 10, 52, 54, i === 4 ? '#f3ecfd' : '#eaf7ec');
      var g = (window.ConceptArt && ConceptArt.G[it[i][0]]) || '';
      o += '<g transform="translate(' + (x + 14) + ',22) scale(1)">' + g + '</g>';
      o += t(x + 26, 82, it[i][1], 9.6, i === 4 ? '#6d28d9' : '#047857');
      o += t(x + 26, 97, it[i][2], 7.8, '#46506b');
    }
    return o + t(147, 116, '앞의 넷은 사회권에 들고, 연대권은 3세대 인권이다', 8.6, '#46506b');
  } };

  /* 법의 차례 — 헌법이 맨 위 */
  CA.lawpyramid = { w: 258, h: 136, d: function () {
    var row = [['헌법', '#f2c84b', 72], ['법률', '#8ed7a3', 108], ['명령', '#9fc3ef', 144],
               ['조례', '#f4b98e', 180], ['규칙', '#cdd6e1', 216]];
    var o = '', y = 10;
    for (var i = 0; i < 5; i++) {
      var w = row[i][2], x = 128 - w / 2;
      o += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="22" rx="4" ' +
        f(row[i][1], 1.6) + '/>' + t(128, y + 16, row[i][0], 10, '#1b2330');
      y += 24;
    }
    o += crown(128, 10, .62);
    o += arw(20, 118, 20, 20, '#b91c1c', 2.6);
    o += t(18, 70, '위', 9, '#b91c1c');
    o += t(128, 132, '아래 법은 위의 법을 어길 수 없다', 9, '#b91c1c');
    return o;
  } };

  /* 헌법이 지켜 주는 기본권 다섯 */
  CA.basic5 = { w: 304, h: 130, d: function () {
    var it = [['unlock', '자유권', '간섭받지 않을', '#1d4ed8', '#eaf1ff'],
              ['scale', '평등권', '차별받지 않을', '#047857', '#eaf7ec'],
              ['ballot', '참정권', '정치에 참여할', '#b45309', '#fdf0cd'],
              ['house', '사회권', '인간답게 살', '#6d28d9', '#f3ecfd'],
              ['gavel', '청구권', '구제를 요구할', '#b91c1c', '#fde3ea']];
    var o = '';
    for (var i = 0; i < 5; i++) {
      var x = 4 + i * 60;
      o += card(x, 10, 54, 56, it[i][4]);
      var g = (window.ConceptArt && ConceptArt.G[it[i][0]]) || '';
      o += '<g transform="translate(' + (x + 15) + ',23) scale(1)">' + g + '</g>';
      o += t(x + 27, 84, it[i][1], 10, it[i][3]);
      o += t(x + 27, 99, it[i][2], 7.8, '#46506b');
      o += t(x + 27, 111, '권리', 7.8, '#46506b');
    }
    return o + t(152, 127, '청구권은 다른 기본권이 다쳤을 때 쓰는 “도와 줘” 권리', 8.6, '#b91c1c');
  } };

  /* 삼권 분립 */
  CA.sepapower = { w: 268, h: 134, d: function () {
    return "" +
      card(84, 8, 100, 38, '#eaf1ff') +
      t(134, 25, '입법부 — 국회', 10, '#1d4ed8') + t(134, 39, '법을 만든다', 8.4, '#46506b') +
      card(6, 80, 104, 38, '#eaf7ec') +
      t(58, 97, '행정부 — 정부', 10, '#047857') + t(58, 111, '법을 집행한다', 8.4, '#46506b') +
      card(158, 80, 104, 38, '#fde3ea') +
      t(210, 97, '사법부 — 법원', 10, '#b91c1c') + t(210, 111, '법으로 심판한다', 8.4, '#46506b') +
      arw(102, 52, 68, 74, '#8a94a6', 2.2) + arw(58, 74, 92, 52, '#8a94a6', 2.2) +
      arw(166, 52, 200, 74, '#8a94a6', 2.2) + arw(210, 74, 176, 52, '#8a94a6', 2.2) +
      arw(118, 92, 150, 92, '#8a94a6', 2.2) + arw(150, 106, 118, 106, '#8a94a6', 2.2) +
      t(134, 66, '서로 견제한다', 8.8, '#46506b') +
      t(134, 131, '한 집단에 힘이 몰리지 않게 나눈다', 8.8, '#46506b');
  } };

  /* 기본권의 제한 — 헌법 제37조 */
  CA.limitright = { w: 288, h: 132, d: function () {
    return "" +
      card(84, 8, 120, 28, '#eaf1ff') + t(144, 27, '국민의 자유와 권리', 10.5, '#1d4ed8') +
      arw(144, 38, 144, 54, '#46506b', 2.4) +
      card(8, 58, 84, 32, '#fdf0cd') + t(50, 78, '국가 안전 보장', 9, '#b45309') +
      card(102, 58, 84, 32, '#fdf0cd') + t(144, 78, '질서 유지', 9, '#b45309') +
      card(196, 58, 84, 32, '#fdf0cd') + t(238, 78, '공공복리', 9, '#b45309') +
      t(144, 50, '이 셋을 위해서만, 법률로써', 8.4, '#46506b') +
      '<path d="M8 102h272" ' + k('#b91c1c', 4) + '/>' +
      t(144, 118, '그래도 본질적인 내용은 침해할 수 없다', 10, '#b91c1c') +
      t(144, 130, '헌법 제37조', 8.4, '#46506b');
  } };

  /* 헌법 재판소의 두 심판 */
  CA.constcourt = { w: 282, h: 126, d: function () {
    return "" +
      '<path d="M104 92h74V54h-74z" ' + f('#eef3fa', 1.6) + '/>' +
      '<path d="M98 54l43-22 43 22z" ' + f('#9fb0c4', 1.6) + '/>' +
      '<path d="M114 92V62h8v30M132 92V62h8v30M150 92V62h8v30M166 92V62h8v30" ' +
      f('#ffffff', 1.2) + '/>' +
      t(141, 108, '헌법 재판소', 10, '#1b2330') +
      fig(26, 54, .6, '#1d4ed8') + t(26, 70, '국민', 9, '#1d4ed8') +
      arw(44, 44, 96, 44, '#1d4ed8', 2.4) +
      t(70, 34, '헌법 소원 심판', 8.4, '#1d4ed8') +
      card(234, 30, 44, 28, '#fde3ea') + t(256, 48, '법원', 9.5, '#b91c1c') +
      arw(230, 44, 188, 44, '#b91c1c', 2.4) +
      t(210, 34, '위헌 법률 심판', 8.4, '#b91c1c') +
      t(141, 122, '누가 신청하느냐가 둘을 가른다 — 국민이냐, 법원이냐', 8.6, '#46506b');
  } };

  /* 시민 불복종 — 간디의 소금 행진과 네 조건 */
  CA.disobey = { w: 296, h: 132, d: function () {
    return "" +
      card(6, 8, 130, 92, '#fdf6ec') +
      '<path d="M10 86h122" ' + k('#e0c98b', 4) + '/>' +
      fig(34, 86, .58, '#46506b') + fig(54, 86, .52, '#46506b') +
      fig(72, 86, .52, '#46506b') + fig(90, 86, .46, '#46506b') +
      arw(100, 60, 126, 60, '#b45309', 2.4) +
      '<path d="M112 86h18l-3-10h-12z" ' + f('#ffffff', 1.4) + '/>' +
      t(71, 24, '간디의 소금 행진', 9.6, '#b45309') +
      t(71, 110, '“이 법은 따르지 않겠다”', 8.6, '#46506b') +
      card(146, 8, 144, 110, '#eaf7ec') +
      t(218, 26, '인정받으려면 네 가지', 9.6, '#047857') +
      t(160, 46, '①', 9, '#047857') + t(222, 46, '비폭력이어야 한다', 8.8, '#1b2330') +
      t(160, 64, '②', 9, '#047857') + t(222, 64, '처벌을 감수한다', 8.8, '#1b2330') +
      t(160, 82, '③', 9, '#047857') + t(222, 82, '목적이 정당해야 한다', 8.8, '#1b2330') +
      t(160, 100, '④', 9, '#047857') + t(222, 100, '최후의 수단이어야 한다', 8.8, '#1b2330') +
      t(148, 130, '네 가지를 못 채우면 그냥 위법이다', 8.8, '#b91c1c');
  } };

  /* 사회적 소수자 — 차별받기 쉬운 사람들 */
  CA.minority = { w: 294, h: 126, d: function () {
    return "" +
      /* 외국인 노동자 — 같은 일인데 임금이 다르다 */
      card(6, 8, 66, 74, '#fff4e6') +
      '<rect x="12" y="20" width="24" height="14" rx="2" ' + f('#8ed7a3', 1.3) + '/>' +
      t(24, 31, '\u20a9', 10, '#1b2330') +
      '<rect x="46" y="24" width="15" height="9" rx="2" ' + f('#8ed7a3', 1.3) + '/>' +
      t(53.5, 31, '\u20a9', 7, '#1b2330') +
      '<path d="M39 22l4 6-4 6" ' + k('#b91c1c', 2.4) + '/>' +
      fig(39, 78, .48, '#b45309') +
      /* 장애인 — 계단뿐인 버스 */
      card(80, 8, 66, 74, '#eaf1ff') +
      '<rect x="88" y="18" width="50" height="26" rx="5" ' + f('#5b86c4', 1.4) + '/>' +
      '<rect x="94" y="23" width="13" height="10" ' + f('#dbeafe', 0) + '/>' +
      '<rect x="112" y="23" width="13" height="10" ' + f('#dbeafe', 0) + '/>' +
      '<circle cx="98" cy="46" r="4.6" fill="' + INK + '"/>' +
      '<circle cx="128" cy="46" r="4.6" fill="' + INK + '"/>' +
      '<path d="M92 72h10v-7h10v-7h10" ' + k('#9aa7b8', 3.4) + '/>' +
      '<circle cx="100" cy="60" r="5" ' + f('none', 2) + ' stroke="#1d4ed8"/>' +
      '<circle cx="100" cy="52" r="3.4" fill="#1d4ed8"/>' +
      '<path d="M86 56l12 12M98 56l-12 12" ' + k('#b91c1c', 2.4) + '/>' +
      /* 노인 — 가게에서 거절 */
      card(154, 8, 66, 74, '#f3ecfd') +
      '<path d="M160 18h54l-4 9h-46z" ' + f('#e4584a', 1.3) + '/>' +
      '<rect x="164" y="27" width="46" height="26" ' + f('#f4f1e8', 1.3) + '/>' +
      '<rect x="178" y="35" width="15" height="18" ' + f('#9aa7b8', 1.2) + '/>' +
      '<path d="M170 32l18 18M188 32l-18 18" ' + k('#b91c1c', 2.6) + '/>' +
      fig(184, 78, .46, '#6d28d9') +
      '<path d="M195 62v15" ' + k('#6d28d9', 2) + '/>' +
      /* 임신한 여성 — 직장에서 밀려남 */
      card(228, 8, 62, 74, '#fde3ea') +
      '<rect x="234" y="18" width="26" height="36" rx="2" ' + f('#e8eef6', 1.3) + '/>' +
      '<circle cx="255" cy="36" r="2" fill="' + INK + '"/>' +
      arw(264, 36, 284, 36, '#b91c1c', 2.4) +
      fig(248, 78, .48, '#b91c1c') +
      '<circle cx="253" cy="66" r="6" ' + f('#f3b6c4', 1.2) + '/>' +
      t(39, 98, '외국인 노동자', 8.8, '#b45309') + t(39, 111, '임금을 적게', 8, '#46506b') +
      t(113, 98, '장애인', 8.8, '#1d4ed8') + t(113, 111, '계단뿐인 버스', 8, '#46506b') +
      t(187, 98, '노인', 8.8, '#6d28d9') + t(187, 111, '가게에서 거절', 8, '#46506b') +
      t(259, 98, '임신한 여성', 8.8, '#b91c1c') + t(259, 111, '직장에서 밀려남', 8, '#46506b') +
      t(147, 124, '수가 적어서가 아니라, 약자의 자리에 있어서 소수자다', 8.6, '#b91c1c');
  } };

  /* 청소년 알바, 꼭 알아야 할 것 */
  CA.teenwork = { w: 304, h: 142, d: function () {
    var L = [['만 15세부터 일할 수 있다', '#1d4ed8'],
             ['친권자 동의서가 필요하다', '#1d4ed8'],
             ['근로계약서를 반드시 쓴다', '#b91c1c'],
             ['최저임금은 성인과 같다', '#b91c1c'],
             ['하루 7시간 · 주 35시간', '#047857'],
             ['휴일 · 초과 근무는 50% 더', '#047857'],
             ['술집 · 노래방은 못 한다', '#b45309'],
             ['다치면 산재보험으로 치료', '#b45309']];
    var o = card(4, 6, 296, 118, '#ffffff');
    for (var i = 0; i < 8; i++) {
      var x = i < 4 ? 12 : 156, y = 26 + (i % 4) * 25;
      o += '<circle cx="' + (x + 9) + '" cy="' + (y - 4) + '" r="7.5" ' + f(L[i][1], 0) + '/>' +
        t(x + 9, y - 1, String(i + 1), 8.4, '#ffffff') +
        t(i < 4 ? 89 : 234, y, L[i][0], 8.2, '#1b2330');
    }
    o += '<path d="M152 18v92" ' + k('#dbe3ec', 1.4) + '/>';
    o += t(152, 138, '신고 대표전화 1644-3199', 10, '#b91c1c');
    return o;
  } };

  /* 자유 지수 — 색으로 보는 인권 */
  CA.freeindex = { w: 282, h: 126, d: function () {
    function row(y, c, t1, t2) {
      return '<rect x="14" y="' + y + '" width="30" height="18" rx="4" ' + f(c, 1.5) + '/>' +
        t(84, y + 14, t1, 9.6, '#1b2330') + t(196, y + 14, t2, 8.6, '#46506b');
    }
    return "" +
      t(141, 16, '세계 자유 지수 — 색으로 나타낸다', 10, '#1d4ed8') +
      row(26, '#8ed7a3', '자유 국가', '권리가 잘 지켜진다') +
      row(50, '#f2c84b', '부분 자유', '지켜지다 말다 한다') +
      row(74, '#c4a8ec', '비자유 국가', '권리가 잘 지켜지지 않는다') +
      t(141, 110, '인간 개발 지수 · 세계 노동 권리 지수 · 언론 자유 지수', 8.6, '#46506b') +
      t(141, 123, '점수로 알려 사람들이 관심을 갖게 한다', 8.6, '#46506b');
  } };

  /* ───────── 단원 VII 사회 정의와 불평등 ───────── */

  function bill(x, y, w, h, c) {                /* 지폐 */
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="2" ' +
      f(c || '#8ed7a3', 1.3) + '/>' +
      '<circle cx="' + (x + w / 2) + '" cy="' + (y + h / 2) + '" r="' + (h * .26) + '" ' +
      f('none', 1.1) + '/>';
  }
  function coin(x, y, r) {
    return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" ' + f('#f2c84b', 1.3) + '/>' +
      '<circle cx="' + x + '" cy="' + y + '" r="' + (r * .55) + '" ' + f('none', 1) + '/>';
  }
  function star5(x, y, r, c) {
    var d = '', i, a;
    for (i = 0; i < 10; i++) {
      a = -Math.PI / 2 + i * Math.PI / 5;
      var rr = i % 2 ? r * .46 : r;
      d += (i ? 'L' : 'M') + (x + Math.cos(a) * rr) + ' ' + (y + Math.sin(a) * rr);
    }
    return '<path d="' + d + 'z" ' + f(c || '#f2c84b', 1.3) + '/>';
  }

  /* 피자 여섯 조각을 셋이 나누기 */
  CA.pizza3 = { w: 292, h: 140, d: function () {
    var sl = '';
    for (var i = 0; i < 6; i++) {
      var a = i * Math.PI / 3;
      sl += 'M62 44L' + (62 + Math.cos(a) * 34) + ' ' + (44 + Math.sin(a) * 34);
    }
    return "" +
      '<circle cx="62" cy="44" r="34" ' + f('#e9a94a') + '/>' +
      '<circle cx="62" cy="44" r="28" ' + f('#f4c66b', 0) + '/>' +
      '<circle cx="50" cy="34" r="4" fill="#d1452f"/><circle cx="74" cy="36" r="4" fill="#d1452f"/>' +
      '<circle cx="56" cy="56" r="4" fill="#d1452f"/><circle cx="76" cy="56" r="4" fill="#d1452f"/>' +
      '<path d="' + sl + '" ' + k('#b2593f', 1.6) + '/>' +
      t(62, 94, '피자 6조각', 10, '#b45309') +
      /* 세 사람과 낸 돈 */
      fig(136, 72, .62, '#1d4ed8') + t(136, 90, 'A', 11, '#1d4ed8') +
      bill(120, 16, 32, 18) + t(136, 44, '거의 다 냄', 8.2, '#46506b') +
      fig(200, 72, .62, '#047857') + t(200, 90, 'B', 11, '#047857') +
      coin(200, 26, 9) + t(200, 44, '조금 냄', 8.2, '#46506b') +
      fig(262, 72, .62, '#b45309') + t(262, 90, 'C', 11, '#b45309') +
      '<circle cx="262" cy="26" r="9" ' + f('none', 1.6) + ' stroke-dasharray="3 3"/>' +
      t(262, 44, '못 냄', 8.2, '#46506b') +
      t(170, 116, '두 조각씩 똑같이 나누면 정의로운가?', 10.5, '#b91c1c') +
      t(170, 134, '정의 = 각자에게 정당한 몫을 주는 것', 10, '#1d4ed8');
  } };

  /* 정의가 필요한 두 가지 이유 */
  CA.justwhy = { w: 284, h: 130, d: function () {
    return "" +
      card(6, 10, 132, 76, '#eaf1ff') +
      '<path d="M72 26l18 8v14c0 12-9 19-18 22-9-3-18-10-18-22V34z" ' + f('#9fc3ef', 1.6) + '/>' +
      '<path d="M64 48l6 7 12-13" ' + k('#ffffff', 3) + '/>' +
      card(146, 10, 132, 76, '#eaf7ec') +
      '<circle cx="186" cy="48" r="20" fill="#8ed7a3" opacity=".8"/>' +
      '<circle cx="232" cy="48" r="20" fill="#5b8fd6" opacity=".6"/>' +
      '<circle cx="186" cy="48" r="20" ' + f('none', 1.6) + '/>' +
      '<circle cx="232" cy="48" r="20" ' + f('none', 1.6) + '/>' +
      t(176, 52, '나', 10, '#1b2330') + t(242, 52, '우리', 10, '#1b2330') +
      t(72, 102, '기본권 보장', 10.5, '#1d4ed8') +
      t(72, 118, '구속 · 차별 · 억압에서 지킨다', 8.4, '#46506b') +
      t(212, 102, '개인선과 공동선의 조화', 10.5, '#047857') +
      t(212, 118, '기준을 세워 갈등을 줄인다', 8.4, '#46506b');
  } };

  /* 분배의 세 기준 — 업적 · 능력 · 필요 */
  CA.dist3 = { w: 304, h: 156, d: function () {
    function mon(x, y, s) {
      s = s || 1;
      return '<path d="M' + (x - 7 * s) + ' ' + y + 'a' + (7 * s) + ' ' + (7 * s) +
        ' 0 0 1 ' + (14 * s) + ' 0v' + (6 * s) + 'l' + (-3.5 * s) + ' ' + (-3 * s) + 'l' +
        (-3.5 * s) + ' ' + (3 * s) + 'l' + (-3.5 * s) + ' ' + (-3 * s) + 'l' + (-3.5 * s) + ' ' +
        (3 * s) + 'z" ' + f('#8a6ad0', 1.2) + '/>' +
        '<circle cx="' + (x - 2.6 * s) + '" cy="' + (y - 2 * s) + '" r="' + (1.3 * s) +
        '" fill="#fff"/><circle cx="' + (x + 2.6 * s) + '" cy="' + (y - 2 * s) + '" r="' +
        (1.3 * s) + '" fill="#fff"/>';
    }
    return "" +
      card(4, 8, 96, 92, '#eaf1ff') +
      mon(26, 28) + mon(44, 28) + mon(62, 28) + mon(80, 28) +
      t(52, 48, '많이 잡은 사람이', 8.6, '#1b2330') +
      t(52, 62, '더 받는다', 9.6, '#1d4ed8') +
      bill(20, 70, 26, 15) + bill(52, 74, 18, 11) + bill(76, 78, 12, 7) +
      card(104, 8, 96, 92, '#eaf7ec') +
      card(118, 20, 30, 18, '#ffffff') + t(133, 34, 'Lv.30', 8.6, '#047857') +
      card(156, 24, 30, 15, '#ffffff') + t(171, 36, 'Lv.5', 8, '#9aa7b8') +
      t(152, 56, '힘이 센 사람에게', 8.6, '#1b2330') +
      t(152, 70, '큰 몫을 맡긴다', 9.6, '#047857') +
      '<path d="M120 84h64" ' + k('#8ed7a3', 5) + '/>' +
      '<path d="M120 84h44" ' + k('#2f7a52', 5) + '/>' +
      card(204, 8, 96, 92, '#fde3ea') +
      fig(228, 56, .62, '#b91c1c') +
      '<path d="M214 62h28" ' + k('#e8eef6', 5) + '/>' +
      '<path d="M214 62h6" ' + k('#e4584a', 5) + '/>' +
      '<path d="M268 30h16v26h-16z" ' + f('#f3b6c4', 1.4) + '/>' +
      '<path d="M272 24h8v6h-8z" ' + f('#b91c1c', 1.2) + '/>' +
      arw(258, 44, 244, 50, '#b91c1c', 2.2) +
      t(252, 76, '가장 급한 사람에게', 8.6, '#1b2330') +
      t(252, 90, '먼저 준다', 9.6, '#b91c1c') +
      t(52, 118, '업적', 12, '#1d4ed8') + t(52, 134, '이루어 놓은 정도', 8.4, '#46506b') +
      t(52, 148, '성과급 · 장학금', 8.4, '#46506b') +
      t(152, 118, '능력', 12, '#047857') + t(152, 134, '잠재력 · 자격', 8.4, '#46506b') +
      t(152, 148, '의사 · 운동선수 · 채용', 8.4, '#46506b') +
      t(252, 118, '필요', 12, '#b91c1c') + t(252, 134, '인간다운 삶에 필요한 만큼', 7.8, '#46506b') +
      t(252, 148, '기초생활수급 · 장학금', 8.2, '#46506b');
  } };

  /* 업적에 따른 분배 — 좋은 점과 나쁜 점 */
  CA.meritpro = { w: 288, h: 128, d: function () {
    return "" +
      card(6, 10, 132, 78, '#eaf7ec') +
      '<path d="M30 70V50h12v20M50 70V36h12v34M70 70V22h12v48" ' + f('#8ed7a3', 1.5) + '/>' +
      '<path d="M24 70h70" ' + k('#2f7a52', 2.4) + '/>' +
      star5(110, 36, 11) +
      card(150, 10, 132, 78, '#fde3ea') +
      fig(178, 74, .6, '#b91c1c') + fig(206, 74, .6, '#1d4ed8') +
      '<path d="M190 34l8 8-8 8M198 42h-16" ' + k('#b91c1c', 2.4) + '/>' +
      fig(252, 74, .5, '#9aa7b8') +
      '<path d="M240 40h24" ' + k('#9aa7b8', 2.4, '4 3') + '/>' +
      t(72, 104, '성취 동기 ↑ · 생산성 ↑', 9.4, '#047857') +
      t(72, 120, '많이 이루면 많이 받는다', 8.4, '#46506b') +
      t(216, 104, '과열 경쟁 · 약자 소외', 9.4, '#b91c1c') +
      t(216, 120, '다른 업적끼리는 비교가 어렵다', 8.2, '#46506b');
  } };

  /* 능력에 따른 분배 — 좋은 점과 나쁜 점 */
  CA.abilitypro = { w: 288, h: 128, d: function () {
    return "" +
      card(6, 10, 132, 78, '#eaf1ff') +
      fig(44, 74, .66, '#1d4ed8') +
      '<path d="M32 44h24v12H32z" ' + f('#ffffff', 1.3) + '/>' +
      '<path d="M44 46v8M40 50h8" ' + k('#e4584a', 2) + '/>' +
      fig(100, 74, .66, '#047857') +
      '<circle cx="100" cy="44" r="9" ' + f('#f2c84b', 1.3) + '/>' +
      t(100, 48, '1', 10, '#8a5a1c') +
      card(150, 10, 132, 78, '#fff4e6') +
      '<path d="M166 72h32V40h-32z" ' + f('#d9b377', 1.4) + '/>' +
      '<path d="M214 72h32V54h-32z" ' + f('#cdd6e1', 1.4) + '/>' +
      '<path d="M166 40l16-14 16 14" ' + k('#b45309', 2.2) + '/>' +
      '<path d="M214 54l16-10 16 10" ' + k('#9aa7b8', 2.2) + '/>' +
      t(72, 104, '재능을 마음껏 펼친다', 9.4, '#1d4ed8') +
      t(72, 120, '성취를 크게 높일 수 있다', 8.4, '#46506b') +
      t(216, 104, '능력은 재기 어렵다', 9.4, '#b45309') +
      t(216, 120, '타고남 · 지원 차이가 불평등을 낳는다', 7.8, '#46506b');
  } };

  /* 필요에 따른 분배 — 좋은 점과 나쁜 점 */
  CA.needpro = { w: 288, h: 128, d: function () {
    return "" +
      card(6, 10, 132, 78, '#eaf7ec') +
      '<path d="M24 72h96" ' + k('#2f7a52', 3) + '/>' +
      '<path d="M24 72V54h24v18M52 72V46h24v26M80 72V54h24v18" ' + f('#8ed7a3', 1.4) + '/>' +
      '<path d="M20 44h104" ' + k('#2f7a52', 2.4, '5 4') + '/>' +
      t(72, 36, '모두 이 선 위로', 8.4, '#047857') +
      card(150, 10, 132, 78, '#fde3ea') +
      fig(186, 74, .6, '#b91c1c') + fig(244, 74, .6, '#9aa7b8') +
      bill(172, 34, 28, 16) + bill(230, 34, 28, 16) +
      t(215, 26, '열심히 해도 같다', 8.4, '#b91c1c') +
      t(72, 104, '모두가 인간답게 산다', 9.4, '#047857') +
      t(72, 120, '사회 안전망으로 약자를 지킨다', 8.2, '#46506b') +
      t(216, 104, '성취 동기 ↓', 9.4, '#b91c1c') +
      t(216, 120, '모두를 만족시키기도 어렵다', 8.4, '#46506b');
  } };

  /* 청소기를 사자 ↔ 나는 빗자루면 된다 */
  CA.broomvacuum = { w: 286, h: 132, d: function () {
    return "" +
      '<path d="M143 10v112" ' + k('#b8c6d6', 1.6, '5 5') + '/>' +
      card(6, 10, 130, 78, '#eaf1ff') +
      '<path d="M44 76h34l-4-26H48z" ' + f('#5b86c4', 1.5) + '/>' +
      '<path d="M61 50V26h22" ' + k('#4b5563', 3) + '/>' +
      '<circle cx="50" cy="78" r="5" fill="' + INK + '"/>' +
      '<circle cx="72" cy="78" r="5" fill="' + INK + '"/>' +
      coin(100, 34, 9) + coin(112, 48, 8) + coin(96, 56, 7) +
      t(71, 102, '“같이 돈을 모아 청소기를 사자”', 9, '#1d4ed8') +
      t(71, 120, '우리가 먼저 — 공동체주의', 9.4, '#1d4ed8') +
      card(150, 10, 130, 78, '#fff4e6') +
      '<path d="M206 26v34" ' + k('#a9793f', 3.4) + '/>' +
      '<path d="M196 60h20l6 20h-32z" ' + f('#e9c75a', 1.5) + '/>' +
      '<path d="M200 66v14M206 66v14M212 66v14" ' + k('#b08b3a', 1.3) + '/>' +
      fig(250, 78, .56, '#b45309') +
      t(215, 102, '“나는 빗자루로 충분해”', 9, '#b45309') +
      t(215, 120, '내가 먼저 — 자유주의', 9.4, '#b45309');
  } };

  /* 자유주의 ↔ 공동체주의 */
  CA.libcom = { w: 300, h: 152, d: function () {
    return "" +
      '<path d="M150 8v128" ' + k('#b8c6d6', 1.6, '5 5') + '/>' +
      '<circle cx="74" cy="60" r="46" ' + f('#dbeafe') + '/>' +
      t(74, 36, '나', 15, '#1d4ed8') +
      '<circle cx="74" cy="74" r="20" ' + f('#b9d2f5', 1.4) + '/>' +
      t(74, 78, '우리', 9.4, '#1b2330') +
      t(74, 122, '자유주의적 정의관', 11, '#1d4ed8') +
      t(74, 139, '자유가 최고의 가치 — 국가는 최소한만', 7.8, '#46506b') +
      '<circle cx="226" cy="60" r="46" ' + f('#d7f0dc') + '/>' +
      t(226, 36, '우리', 15, '#047857') +
      '<circle cx="226" cy="74" r="20" ' + f('#a7dfb8', 1.4) + '/>' +
      t(226, 78, '나', 9.4, '#1b2330') +
      t(226, 122, '공동체주의적 정의관', 11, '#047857') +
      t(226, 139, '좋은 삶은 공동체 속에서 만들어진다', 7.8, '#46506b');
  } };

  /* 노직과 롤즈 */
  CA.nozickrawls = { w: 292, h: 142, d: function () {
    return "" +
      card(6, 8, 132, 88, '#eaf1ff') +
      fig(40, 76, .72, '#1d4ed8') +
      '<path d="M76 40h50v16H76z" ' + f('#ffffff', 1.4) + '/>' +
      t(101, 52, '치안 · 국방', 8.6, '#1b2330') +
      '<path d="M76 62h50v16H76z" ' + f('#f1f4f8', 1.4) + '/>' +
      t(101, 74, '그 밖엔 손대지 마', 7.8, '#46506b') +
      '<path d="M84 28l12 12M96 28l-12 12" ' + k('#b91c1c', 2.4) + '/>' +
      t(112, 34, '세금도 반대', 8, '#b91c1c') +
      card(154, 8, 132, 88, '#eaf7ec') +
      fig(188, 76, .72, '#047857') +
      '<path d="M222 70h54" ' + k('#2f7a52', 3) + '/>' +
      '<path d="M222 70V44h16v26M242 70V30h16v40M262 70V52h14v18" ' + f('#8ed7a3', 1.4) + '/>' +
      arw(228, 86, 228, 74, '#b45309', 2.2) +
      t(249, 32, '가장 어려운 사람에게', 7.6, '#046c4e') +
      t(249, 42, '가장 큰 이익이 되게', 7.6, '#046c4e') +
      t(72, 114, '노직 — 자유지상주의', 10.5, '#1d4ed8') +
      t(72, 132, '최소 국가, 소유권은 절대', 8.4, '#46506b') +
      t(220, 114, '롤스 — 평등주의적 자유주의', 10, '#047857') +
      t(220, 132, '자유가 먼저, 그다음 불평등 최소화', 8, '#46506b');
  } };

  /* 공유지의 비극 */
  CA.commons = { w: 292, h: 136, d: function () {
    function cow(x, y, s, c) {
      s = s || 1;
      return '<ellipse cx="' + x + '" cy="' + y + '" rx="' + (11 * s) + '" ry="' + (7 * s) + '" ' +
        f(c || '#ffffff', 1.3) + '/>' +
        '<circle cx="' + (x + 10 * s) + '" cy="' + (y - 5 * s) + '" r="' + (4.6 * s) + '" ' +
        f(c || '#ffffff', 1.2) + '/>' +
        '<path d="M' + (x - 6 * s) + ' ' + (y + 6 * s) + 'v' + (4 * s) + 'M' + x + ' ' +
        (y + 7 * s) + 'v' + (3 * s) + 'M' + (x + 6 * s) + ' ' + (y + 6 * s) + 'v' + (4 * s) +
        '" ' + k('#6b7280', 1.5) + '/>';
    }
    var g1 = '', g2 = '';
    for (var i = 0; i < 10; i++) g1 += 'M' + (12 + i * 7) + ' 78q2-11 4 0';
    for (var j = 0; j < 3; j++) g2 += 'M' + (112 + j * 16) + ' 78q2-8 4 0';
    return "" +
      card(6, 10, 84, 78, '#d9f0de') +
      '<path d="' + g1 + '" ' + k('#4d9a5e', 2.2) + '/>' +
      cow(34, 54, .7) + cow(66, 62, .62) +
      card(104, 10, 84, 78, '#eaeec4') +
      '<path d="' + g2 + '" ' + k('#8aa05a', 2.2) + '/>' +
      cow(126, 40, .56) + cow(154, 44, .56) + cow(140, 60, .56) + cow(168, 62, .56) +
      card(202, 10, 84, 78, '#f3dca2') +
      '<path d="M210 70q12-5 24 0M240 74q14-5 28 0M214 80h18M248 62h22" ' + k('#c99b45', 1.8) + '/>' +
      cow(240, 44, .62, '#d8d2c4') +
      '<path d="M234 40l6 6M240 40l-6 6" ' + k('#b91c1c', 1.8) + '/>' +
      arw(92, 50, 102, 50, '#b45309', 2.4) + arw(190, 50, 200, 50, '#b45309', 2.4) +
      t(48, 104, '모두의 푸른 땅', 9, '#2f7a52') +
      t(146, 104, '너도나도 소를 더', 9, '#8a7a1c') +
      t(244, 104, '황무지 — 다 함께 망한다', 8.6, '#b45309') +
      t(146, 128, '제 이익만 좇다가 모두가 잃는다 — 공유지의 비극', 9, '#b91c1c');
  } };

  /* 집단주의로 변질되면 */
  CA.collectivism = { w: 284, h: 128, d: function () {
    return "" +
      card(6, 10, 132, 76, '#eef2f7') +
      fig(40, 76, .62, '#6b7280') + fig(62, 76, .62, '#6b7280') +
      fig(84, 76, .62, '#6b7280') + fig(106, 76, .62, '#6b7280') +
      '<path d="M22 28h98v12H22z" ' + f('#4b5563', 1.4) + '/>' +
      t(71, 38, '집단이 먼저', 9, '#ffffff') +
      arw(71, 46, 71, 56, '#b91c1c', 2.4) +
      card(150, 10, 128, 76, '#fde3ea') +
      '<path d="M176 74h46l-6-18h-34z" ' + f('#9aa7b8', 1.5) + '/>' +
      '<path d="M199 56V34l20 8-20 8" ' + f('#e4584a', 1.4) + '/>' +
      arw(236, 36, 262, 66, '#b91c1c', 2.6) +
      t(246, 26, '자살 공격', 8, '#b91c1c') +
      t(72, 104, '개인의 목숨까지 희생시킨다', 9, '#b91c1c') +
      t(214, 104, '나치 · 가미카제', 9.4, '#b91c1c') +
      t(142, 124, '공동체주의가 지나치면 집단주의로 변질된다', 9, '#b91c1c');
  } };

  /* 사회 계층의 양극화 */
  CA.polarize = { w: 300, h: 128, d: function () {
    return "" +
      '<path d="M144 8v112" ' + k('#b8c6d6', 1.6, '5 5') + '/>' +
      /* 다이아몬드형 */
      '<path d="M56 24h28l16 26H40z" ' + f('#9fc3ef', 1.5) + '/>' +
      '<path d="M40 52h80v26H40z" ' + f('#5b8fd6', 1.5) + '/>' +
      '<path d="M40 80h80l-16 24H56z" ' + f('#9fc3ef', 1.5) + '/>' +
      t(80, 68, '두꺼운 중간층', 9, '#ffffff') +
      /* 모래시계형 */
      '<path d="M172 24h72v26h-72z" ' + f('#e2738e', 1.5) + '/>' +
      '<path d="M172 52h72l-24 26h-24z" ' + f('#f3b6c4', 1.5) + '/>' +
      '<path d="M196 80h24l24 24h-72z" ' + f('#e2738e', 1.5) + '/>' +
      t(276, 68, '얇아진', 7.4, '#b91c1c') + t(276, 78, '중간층', 7.4, '#b91c1c') +
      arw(126, 64, 160, 64, '#b91c1c', 2.6) +
      t(80, 122, '보통의 사회', 9.6, '#1d4ed8') +
      t(208, 122, '양극화된 사회', 9.6, '#b91c1c');
  } };

  /* 사회적 약자 차별 */
  CA.weakgroup = { w: 292, h: 128, d: function () {
    return "" +
      card(6, 8, 66, 76, '#fde3ea') +
      fig(39, 76, .56, '#b91c1c') +
      '<circle cx="44" cy="62" r="6" ' + f('#f3b6c4', 1.2) + '/>' +
      '<rect x="18" y="20" width="42" height="18" rx="3" ' + f('#ffffff', 1.3) + '/>' +
      t(39, 33, '채용', 8.6, '#1b2330') +
      '<path d="M26 22l26 14M52 22l-26 14" ' + k('#b91c1c', 2.2) + '/>' +
      card(80, 8, 66, 76, '#f3ecfd') +
      fig(113, 76, .56, '#6d28d9') +
      '<path d="M122 60v16" ' + k('#6d28d9', 2) + '/>' +
      '<rect x="92" y="22" width="42" height="16" rx="3" ' + f('#ffffff', 1.3) + '/>' +
      t(113, 34, '혐오 표현', 8, '#b91c1c') +
      card(154, 8, 66, 76, '#eaf1ff') +
      fig(187, 76, .56, '#1d4ed8') +
      '<circle cx="187" cy="64" r="7" ' + f('none', 2) + ' stroke="#1d4ed8"/>' +
      '<path d="M166 22h42v16h-42z" ' + f('#ffffff', 1.3) + '/>' +
      t(187, 34, '능력 부족?', 8, '#b91c1c') +
      card(228, 8, 58, 76, '#fff4e6') +
      fig(257, 76, .56, '#b45309') +
      '<path d="M236 22h42v16h-42z" ' + f('#ffffff', 1.3) + '/>' +
      t(257, 34, '교육 · 의료', 7.8, '#1b2330') +
      '<path d="M240 24l34 12M274 24l-34 12" ' + k('#b91c1c', 2.2) + '/>' +
      t(39, 100, '여성', 9.4, '#b91c1c') + t(39, 114, '출산 · 육아로 채용 거절', 7.6, '#46506b') +
      t(113, 100, '노인', 9.4, '#6d28d9') + t(113, 114, '혐오가 웃음거리로', 7.6, '#46506b') +
      t(187, 100, '장애인', 9.4, '#1d4ed8') + t(187, 114, '능력 부족이라는 편견', 7.6, '#46506b') +
      t(257, 100, '빈곤층', 9.4, '#b45309') + t(257, 114, '서비스를 못 받는다', 7.6, '#46506b');
  } };

  /* 공간 불평등 */
  CA.spacegap = { w: 296, h: 144, d: function () {
    return "" +
      card(6, 8, 132, 92, '#eaf1ff') +
      '<rect x="10" y="78" width="124" height="18" fill="#dde5ef"/>' +
      bldg(20, 78, 20, 44, '#8fa3bb') + bldg(44, 78, 18, 56, '#7e93ac') +
      bldg(66, 78, 20, 38, '#9fb0c4') + bldg(90, 78, 18, 50, '#8fa3bb') +
      bldg(112, 78, 18, 34, '#a8b9cd') +
      '<rect x="24" y="20" width="26" height="14" rx="3" ' + f('#ffffff', 1.2) + '/>' +
      t(37, 31, '학교', 8, '#1b2330') +
      '<rect x="56" y="20" width="26" height="14" rx="3" ' + f('#ffffff', 1.2) + '/>' +
      t(69, 31, '병원', 8, '#1b2330') +
      '<rect x="88" y="20" width="32" height="14" rx="3" ' + f('#ffffff', 1.2) + '/>' +
      t(104, 31, '문화시설', 7.4, '#1b2330') +
      card(158, 8, 132, 92, '#eaf7e4') +
      '<rect x="162" y="78" width="124" height="18" fill="#cfe3c0"/>' +
      '<path d="M180 78l16-14 16 14z" ' + f('#c0724f', 1.4) + '/>' +
      '<rect x="184" y="78" width="24" height="0"/>' +
      '<path d="M228 78l14-12 14 12z" ' + f('#9aa7b8', 1.4) + '/>' +
      broadleaf(268, 78, .6) +
      '<rect x="176" y="20" width="26" height="14" rx="3" ' + f('#ffffff', 1.2) + '/>' +
      '<rect x="208" y="20" width="26" height="14" rx="3" ' + f('#ffffff', 1.2) + '/>' +
      '<rect x="240" y="20" width="32" height="14" rx="3" ' + f('#ffffff', 1.2) + '/>' +
      '<path d="M180 22l18 10M198 22l-18 10M212 22l18 10M230 22l-18 10M246 22l20 10M266 22l-20 10" ' +
      k('#b91c1c', 2) + '/>' +
      t(72, 116, '수도권 · 대도시', 10, '#1d4ed8') +
      t(72, 132, '교육 · 의료 · 문화가 모여 있다', 8.4, '#46506b') +
      t(224, 116, '농촌 · 소도시', 10, '#047857') +
      t(224, 132, '시설이 모자라 삶의 질이 낮다', 8.4, '#46506b');
  } };

  /* 사회 복지 제도 세 가지 */
  CA.welfare3 = { w: 304, h: 152, d: function () {
    return "" +
      card(4, 8, 96, 96, '#eaf1ff') +
      '<path d="M52 30q-22 0-22 22h44q0-22-22-22z" ' + f('#5b8fd6', 1.5) + '/>' +
      '<path d="M52 52v22" ' + k('#4b5563', 2.6) + '/>' +
      '<path d="M52 74q-6 0-6 5" ' + k('#4b5563', 2.2) + '/>' +
      bill(22, 84, 22, 13) + bill(58, 84, 22, 13) +
      card(104, 8, 96, 96, '#eaf7ec') +
      fig(130, 80, .62, '#9aa7b8') +
      '<path d="M158 50h26v30h-26z" ' + f('#8ed7a3', 1.5) + '/>' +
      '<path d="M154 50l17-14 17 14" ' + k('#2f7a52', 2.2) + '/>' +
      arw(156, 64, 142, 64, '#047857', 2.4) +
      t(152, 96, '국가가 전액', 8.4, '#047857') +
      card(204, 8, 96, 96, '#fde3ea') +
      fig(230, 80, .62, '#b91c1c') +
      '<path d="M258 44h30v22h-30z" ' + f('#ffffff', 1.4) + '/>' +
      '<path d="M264 52h18M264 58h12" ' + k('#e2738e', 1.8) + '/>' +
      '<path d="M258 66l-6 8h10z" ' + f('#ffffff', 1.4) + '/>' +
      '<path d="M252 84q10-8 20 0" ' + k('#e2738e', 2.4) + '/>' +
      t(52, 122, '사회 보험', 11, '#1d4ed8') +
      t(52, 137, '본인 + 국가가 나눠 낸다', 8, '#46506b') +
      t(52, 149, '건강보험 · 고용보험 · 국민연금', 7.4, '#46506b') +
      t(152, 122, '공공 부조', 11, '#047857') +
      t(152, 137, '국가가 비용을 모두 낸다', 8, '#46506b') +
      t(152, 149, '생계 · 주거 · 의료 급여', 7.8, '#46506b') +
      t(252, 122, '사회 서비스', 11, '#b91c1c') +
      t(252, 137, '돈이 아니라 도움을 준다', 8, '#46506b') +
      t(252, 149, '상담 · 재활 · 돌봄', 7.8, '#46506b');
  } };

  /* 적극적 우대 조치와 역차별 */
  CA.affirm = { w: 296, h: 144, d: function () {
    return "" +
      card(6, 8, 136, 92, '#eaf7ec') +
      '<path d="M14 84h120" ' + k('#c3cedb', 3) + '/>' +
      '<path d="M30 84V34" ' + k('#9aa7b8', 2.4, '4 4') + '/>' +
      '<path d="M78 84V34" ' + k('#2f7a52', 2.4) + '/>' +
      fig(30, 84, .56, '#9aa7b8') +
      fig(78, 84, .56, '#047857') +
      arw(44, 44, 72, 44, '#047857', 2.4) +
      t(58, 30, '출발선을 당겨 준다', 8, '#047857') +
      '<path d="M120 84V24" ' + k('#b45309', 2.4) + '/>' +
      '<path d="M120 24h14v10h-14z" ' + f('#e4584a', 1.3) + '/>' +
      card(154, 8, 136, 92, '#fde3ea') +
      '<path d="M162 84h120" ' + k('#c3cedb', 3) + '/>' +
      fig(196, 84, .56, '#b91c1c') +
      fig(240, 84, .56, '#9aa7b8') +
      '<path d="M228 44l24 24M252 44l-24 24" ' + k('#b91c1c', 2.6) + '/>' +
      t(222, 30, '떨어지는 사람이 생긴다', 8, '#b91c1c') +
      t(74, 118, '적극적 우대 조치', 10.5, '#047857') +
      t(74, 134, '여성 할당제 · 농어촌 특별전형', 8.2, '#46506b') +
      t(222, 118, '역차별 문제', 10.5, '#b91c1c') +
      t(222, 134, '지나치면 다수가 불이익을 본다', 8.2, '#46506b');
  } };

  /* ───────── 단원 VIII 시장경제 ───────── */

  function tag(x, y, w, h, c, s2, col) {        /* 작은 꼬리표 */
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="4" ' +
      f(c || '#ffffff', 1.4) + '/>' + t(x + w / 2, y + h / 2 + 3.4, s2, 8.6, col || '#1b2330');
  }
  function won(x, y, r, c) {
    return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" ' + f(c || '#f2c84b', 1.3) + '/>' +
      t(x, y + r * .36, '\u20a9', r * 1.1, '#8a5a1c');
  }

  /* 자본주의의 세 가지 특징 */
  CA.capitalism3 = { w: 292, h: 128, d: function () {
    return "" +
      card(6, 10, 88, 72, '#eaf1ff') +
      '<path d="M32 70h36V44H32z" ' + f('#ffffff', 1.5) + '/>' +
      '<path d="M26 44l24-18 24 18" ' + k('#5b8fd6', 2.6) + '/>' +
      '<path d="M44 70V56h12v14" ' + f('#9fc3ef', 1.3) + '/>' +
      '<path d="M62 32a7 7 0 0 1 14 0v4h-14z" ' + f('#f2c84b', 1.3) + '/>' +
      card(102, 10, 88, 72, '#eaf7ec') +
      '<path d="M116 70h60" ' + k('#2f7a52', 2.6) + '/>' +
      '<path d="M122 70V50h12v20M140 70V38h12v32M158 70V56h12v14" ' + f('#8ed7a3', 1.3) + '/>' +
      won(146, 26, 9) +
      card(198, 10, 88, 72, '#fdf0cd') +
      fig(226, 70, .66, '#b45309') +
      '<path d="M246 36l12 10-12 10" ' + k('#b45309', 2.6) + '/>' +
      '<path d="M246 46h20" ' + k('#b45309', 2.6) + '/>' +
      t(50, 104, '사유 재산 인정', 9.6, '#1d4ed8') +
      t(50, 119, '내 것은 내 것', 8.2, '#46506b') +
      t(146, 104, '시장 경제 체제', 9.6, '#047857') +
      t(146, 119, '가격은 시장이 정한다', 8.2, '#46506b') +
      t(242, 104, '경제 활동의 자유', 9.6, '#b45309') +
      t(242, 119, '무엇을 살지 내가 정한다', 7.8, '#46506b');
  } };

  /* 자본주의가 걸어온 길 — 정부의 손이 커졌다 작아졌다 */
  CA.captimeline = { w: 312, h: 156, d: function () {
    return "" +
      '<path d="M16 54C44 54 50 22 78 22C106 22 112 54 142 54C172 54 178 20 208 20' +
      'C238 20 244 54 300 54" ' + k('#e2738e', 2.6, '6 5') + '/>' +
      t(156, 12, '정부 개입의 크기', 8.6, '#b91c1c') +
      '<path d="M14 70h288" ' + k('#aab6c6', 3) + '/>' +
      '<path d="M302 70l-7-5M302 70l-7 5" ' + k('#aab6c6', 3) + '/>' +
      '<circle cx="52" cy="70" r="7" ' + f('#5b8fd6', 2) + '/>' +
      '<circle cx="124" cy="70" r="7" ' + f('#8ed7a3', 2) + '/>' +
      '<circle cx="198" cy="70" r="7" ' + f('#f2c84b', 2) + '/>' +
      '<circle cx="268" cy="70" r="7" ' + f('#c4a8ec', 2) + '/>' +
      t(52, 92, '상업 자본주의', 9.4, '#1d4ed8') +
      t(52, 106, '16~18세기 중반', 7.8, '#46506b') +
      t(52, 120, '중상주의 · 무역', 7.8, '#46506b') +
      t(52, 134, '정부 개입 큼', 8, '#b91c1c') +
      t(124, 92, '산업 자본주의', 9.4, '#047857') +
      t(124, 106, '산업 혁명 이후', 7.8, '#46506b') +
      t(124, 120, '자유방임 · 작은 정부', 7.6, '#46506b') +
      t(124, 134, '정부 개입 작음', 8, '#1d4ed8') +
      t(198, 92, '수정 자본주의', 9.4, '#b45309') +
      t(198, 106, '대공황 이후', 7.8, '#46506b') +
      t(198, 120, '케인스 · 큰 정부', 7.8, '#46506b') +
      t(198, 134, '정부 개입 큼', 8, '#b91c1c') +
      t(268, 92, '신자유주의', 9.4, '#6d28d9') +
      t(268, 106, '1970년대 이후', 7.8, '#46506b') +
      t(268, 120, '민영화 · 규제 완화', 7.6, '#46506b') +
      t(268, 134, '정부 개입 작음', 8, '#1d4ed8') +
      t(156, 152, '커졌다 작아졌다를 되풀이한다 — 순서로 외운다', 8.6, '#46506b');
  } };

  /* 보이지 않는 손 = 가격 */
  CA.invisiblehand = { w: 294, h: 142, d: function () {
    return "" +
      fig(36, 92, .7, '#1d4ed8') + t(36, 110, '파는 사람', 9, '#1d4ed8') +
      t(36, 124, '비싸게 팔고 싶다', 7.8, '#46506b') +
      arw(70, 84, 104, 50, '#1d4ed8', 2.6) +
      fig(258, 92, .7, '#b45309') + t(258, 110, '사는 사람', 9, '#b45309') +
      t(258, 124, '싸게 사고 싶다', 7.8, '#46506b') +
      arw(224, 84, 190, 50, '#b45309', 2.6) +
      '<path d="M118 34q18-18 32-6q12-12 24 0q12-8 18 6l-6 24h-62z" ' +
      'fill="#d7e3f3" opacity=".75" stroke="' + INK + '" stroke-width="1.6"/>' +
      tag(118, 56, 60, 20, '#ffffff', '가격', '#1b2330') +
      t(147, 94, '둘이 만나는 지점에서', 9, '#1b2330') +
      t(147, 110, '거래가 이루어진다', 9.6, '#047857') +
      t(147, 138, '애덤 스미스의 “보이지 않는 손” = 가격', 9.4, '#46506b');
  } };

  /* 대공황의 악순환 */
  CA.depression = { w: 300, h: 150, d: function () {
    function node(x, y, w, s2, c) {
      return tag(x - w / 2, y - 12, w, 24, c || '#ffffff', s2, '#1b2330');
    }
    return "" +
      '<circle cx="150" cy="74" r="30" ' + f('#fde3ea', 1.8) + '/>' +
      t(150, 70, '대공황', 11, '#b91c1c') + t(150, 84, '1929', 8, '#b91c1c') +
      node(150, 16, 104, '독점 기업이 시장을 먹음') +
      node(272, 58, 92, '노동자는 가난해짐') +
      node(246, 134, 104, '안 팔려 공장을 닫음') +
      node(54, 134, 86, '실업자가 늘어남') +
      node(28, 58, 88, '살 돈이 더 없어짐') +
      arw(196, 22, 236, 46, '#b91c1c', 2.2) +
      arw(280, 72, 262, 120, '#b91c1c', 2.2) +
      arw(196, 140, 100, 140, '#b91c1c', 2.2) +
      arw(36, 120, 28, 74, '#b91c1c', 2.2) +
      arw(44, 44, 94, 22, '#b91c1c', 2.2);
  } };

  /* 뉴딜 — 정부가 돈을 돌린다 */
  CA.newdeal = { w: 296, h: 134, d: function () {
    return "" +
      card(6, 10, 88, 72, '#eaf1ff') +
      '<path d="M26 72h54V34H26z" ' + f('#9fb0c4', 1.5) + '/>' +
      '<path d="M26 44h54M26 56h54" ' + k('#7e93ac', 1.6) + '/>' +
      '<path d="M20 72h66" ' + k('#5b8fd6', 4) + '/>' +
      t(50, 100, '정부가 댐을 짓는다', 8.8, '#1d4ed8') +
      arw(98, 46, 112, 46, '#46506b', 2.4) +
      card(116, 10, 76, 72, '#eaf7ec') +
      fig(140, 72, .6, '#047857') + fig(168, 72, .6, '#047857') +
      won(154, 32, 11) +
      t(154, 100, '실업자가 일하고', 8.8, '#047857') +
      t(154, 114, '돈을 번다', 8.8, '#047857') +
      arw(196, 46, 210, 46, '#46506b', 2.4) +
      card(214, 10, 76, 72, '#fdf0cd') +
      '<path d="M228 70h48l-6-22h-36z" ' + f('#e9a94a', 1.5) + '/>' +
      '<path d="M240 48V36h24v12" ' + k('#b45309', 2.2) + '/>' +
      fig(252, 70, .5, '#b45309') +
      t(252, 100, '물건을 사면서', 8.8, '#b45309') +
      t(252, 114, '경제가 돈다', 8.8, '#b45309') +
      t(148, 130, '케인스 — 국가가 적극적으로 개입하는 큰 정부', 9, '#46506b');
  } };

  /* 석유 파동과 신자유주의 */
  CA.oilshock = { w: 294, h: 134, d: function () {
    return "" +
      card(6, 10, 100, 74, '#fff4e6') +
      '<path d="M40 72h32V38H40z" ' + f('#4b5563', 1.5) + '/>' +
      '<path d="M44 32h24v6H44z" ' + f('#b45309', 1.3) + '/>' +
      arw(84, 70, 84, 26, '#b91c1c', 3) +
      t(56, 102, '석유값 폭등', 9.6, '#b91c1c') +
      t(56, 117, '물가만 오른다', 8.4, '#46506b') +
      arw(112, 46, 128, 46, '#46506b', 2.4) +
      card(134, 10, 154, 74, '#f3ecfd') +
      tag(144, 20, 62, 20, '#ffffff', '민영화', '#6d28d9') +
      tag(214, 20, 64, 20, '#ffffff', '규제 완화', '#6d28d9') +
      tag(144, 48, 62, 20, '#ffffff', '복지 축소', '#6d28d9') +
      tag(214, 48, 64, 20, '#ffffff', '자유 무역', '#6d28d9') +
      t(211, 102, '신자유주의', 10.5, '#6d28d9') +
      t(211, 117, '다시 시장에 맡기자 — 작은 정부', 8.2, '#46506b');
  } };

  /* 편익과 비용 표 */
  CA.benefitcost = { w: 308, h: 152, d: function () {
    var row = ['편익 (얻는 것)', '명시적 비용', '암묵적 비용', '편익 − 기회비용'];
    var ja = ['5,500원', '5,000원', '1,000원', '−500원'];
    var jj = ['7,000원', '6,000원', '500원', '+500원'];
    var o = card(4, 8, 300, 116, '#ffffff');
    o += '<rect x="4" y="8" width="300" height="24" rx="7" fill="#e8eef6"/>';
    o += t(80, 25, '구분', 9.4, '#46506b') + t(188, 25, '짜장면 5,000원', 9.4, '#1d4ed8') +
      t(264, 25, '짬뽕 6,000원', 9.4, '#b45309');
    for (var i = 0; i < 4; i++) {
      var y = 32 + i * 23;
      if (i === 3) o += '<rect x="4" y="' + y + '" width="300" height="23" fill="#fdf0cd"/>';
      o += '<path d="M4 ' + y + 'h300" ' + k('#dbe3ec', 1.2) + '/>';
      o += t(80, y + 16, row[i], 8.8, i === 3 ? '#b45309' : '#1b2330');
      o += t(188, y + 16, ja[i], 9, i === 3 ? '#b91c1c' : '#46506b');
      o += t(264, y + 16, jj[i], 9, i === 3 ? '#047857' : '#46506b');
    }
    o += '<path d="M140 8v116M236 8v116" ' + k('#dbe3ec', 1.2) + '/>';
    o += t(154, 140, '암묵적 비용 = 다른 쪽 편익 − 그 명시적 비용', 9, '#46506b');
    o += t(154, 152, '편익 − 기회비용이 큰 쪽이 합리적 선택', 9.4, '#b91c1c');
    return o;
  } };

  /* 기회비용 = 명시적 + 암묵적 */
  CA.oppcost = { w: 292, h: 132, d: function () {
    return "" +
      card(6, 30, 110, 44, '#eaf1ff') +
      t(61, 50, '명시적 비용', 10, '#1d4ed8') + t(61, 65, '실제로 낸 돈', 8.2, '#46506b') +
      t(130, 58, '+', 15, '#46506b') +
      card(144, 30, 118, 44, '#fde3ea') +
      t(203, 50, '암묵적 비용', 10, '#b91c1c') + t(203, 65, '포기한 이익', 8.2, '#46506b') +
      arw(134, 82, 134, 96, '#46506b', 2.6) +
      card(62, 100, 170, 26, '#fdf0cd') +
      t(147, 118, '기회비용', 12, '#b45309') +
      t(147, 18, '선택하면 잃는 것 전부', 9.6, '#46506b') +
      t(274, 52, '눈에', 8, '#b91c1c') + t(274, 64, '안 보임', 8, '#b91c1c');
  } };

  /* 매몰 비용 */
  CA.sunkcost = { w: 288, h: 132, d: function () {
    return "" +
      '<path d="M138 10v110" ' + k('#b8c6d6', 1.6, '5 5') + '/>' +
      card(6, 10, 124, 76, '#f1ece2') +
      '<path d="M14 62q52-14 108 0v22H14z" ' + f('#b89a72', 1.5) + '/>' +
      won(46, 70, 10) + won(70, 76, 9) + won(94, 70, 10) +
      '<path d="M100 20l16 16M110 14l-6 20" ' + k('#8a6a4a', 2.6) + '/>' +
      t(68, 104, '이미 묻혀 버린 돈', 9.6, '#8a5a3c') +
      t(68, 120, '돌려받을 수 없다', 8.4, '#46506b') +
      card(148, 10, 134, 76, '#fde3ea') +
      '<path d="M158 66h114v16H158z" ' + f('#2f7a52', 1.5) + '/>' +
      '<rect x="172" y="44" width="20" height="24" rx="3" ' + f('#ffffff', 1.3) + '/>' +
      '<rect x="200" y="44" width="20" height="24" rx="3" ' + f('#ffffff', 1.3) + '/>' +
      '<rect x="228" y="44" width="20" height="24" rx="3" ' + f('#ffffff', 1.3) + '/>' +
      t(182, 60, 'A', 9, '#b91c1c') + t(210, 60, 'K', 9, '#1b2330') +
      t(238, 60, 'Q', 9, '#b91c1c') +
      t(215, 34, '“100만원이나 썼는데…”', 8.4, '#b91c1c') +
      t(215, 104, '도박이 가장 쉬운 예', 9.6, '#b91c1c') +
      t(215, 120, '이미 쓴 돈에 끌려다닌다', 8.4, '#46506b') +
      t(144, 132, '매몰 비용은 합리적 선택에서 아예 빼고 계산한다', 9, '#b91c1c');
  } };

  /* 합리적 선택의 한계 */
  CA.choicelimit = { w: 296, h: 134, d: function () {
    return "" +
      card(6, 10, 136, 78, '#eaf1ff') +
      tag(18, 22, 54, 22, '#ffffff', '안전하게', '#1d4ed8') +
      tag(80, 22, 54, 22, '#ffffff', '100억', '#1d4ed8') +
      tag(18, 52, 54, 22, '#ffffff', '그냥 보상', '#b91c1c') +
      tag(80, 52, 54, 22, '#fde3ea', '50억', '#b91c1c') +
      t(74, 104, '싼 쪽이 합리적?', 9.6, '#b91c1c') +
      t(74, 120, '사람 목숨이 걸린 문제라면', 8.2, '#46506b') +
      card(152, 10, 136, 78, '#fff4e6') +
      t(220, 28, '① 편익은 사람마다 다르다', 8.4, '#1b2330') +
      t(220, 46, '② 개인에게 합리적이 사회엔 아닐 수', 7.6, '#1b2330') +
      t(220, 64, '③ 공익을 해치기도 한다', 8.4, '#1b2330') +
      t(220, 104, '합리적 선택의 한계', 9.6, '#b45309') +
      t(220, 120, '모두가 저축만 하면 경제가 멈춘다', 8, '#46506b');
  } };

  /* 남을 의식한 소비 세 가지 */
  CA.bandwagon = { w: 300, h: 134, d: function () {
    return "" +
      card(4, 10, 94, 76, '#eaf1ff') +
      fig(30, 74, .56, '#1d4ed8') + fig(50, 74, .56, '#1d4ed8') + fig(70, 74, .56, '#1d4ed8') +
      '<path d="M22 32h54v14H22z" ' + f('#ffffff', 1.3) + '/>' +
      t(49, 42, '유행!', 8.6, '#1d4ed8') +
      card(104, 10, 94, 76, '#eaf7ec') +
      fig(130, 74, .56, '#9aa7b8') + fig(150, 74, .56, '#9aa7b8') +
      fig(178, 74, .6, '#047857') +
      '<path d="M166 56l10 10M176 56l-10 10" ' + k('#047857', 2.2) + '/>' +
      t(151, 42, '남들 다 사니까', 8, '#047857') +
      card(204, 10, 92, 76, '#fdf0cd') +
      fig(230, 74, .56, '#b45309') +
      '<path d="M252 70h32V44h-32z" ' + f('#f2c84b', 1.4) + '/>' +
      t(268, 60, '\u20a9\u20a9\u20a9', 9, '#8a5a1c') +
      t(250, 32, '비쌀수록 좋다', 8, '#b45309') +
      t(51, 104, '밴드왜건 효과', 9.4, '#1d4ed8') +
      t(51, 119, '남들이 사니 나도', 8.2, '#46506b') +
      t(151, 104, '스노브 효과', 9.4, '#047857') +
      t(151, 119, '남들이 사니 난 안 산다', 7.8, '#46506b') +
      t(250, 104, '베블런 효과', 9.4, '#b45309') +
      t(250, 119, '비싸야 과시가 된다', 8.2, '#46506b');
  } };

  /* 독과점 */
  CA.monopoly = { w: 294, h: 138, d: function () {
    return "" +
      '<path d="M144 10v108" ' + k('#b8c6d6', 1.6, '5 5') + '/>' +
      card(6, 10, 130, 78, '#eaf7ec') +
      factory(14, 60, .4) + factory(54, 60, .4) + factory(94, 60, .4) +
      tag(32, 66, 72, 20, '#ffffff', '값이 내린다', '#047857') +
      t(70, 104, '여러 회사가 경쟁', 9.6, '#047857') +
      t(70, 120, '필요한 사람에게 간다', 8.2, '#46506b') +
      card(152, 10, 136, 78, '#fde3ea') +
      factory(186, 62, .56) +
      crown(214, 28, .5) +
      tag(190, 66, 90, 20, '#fde3ea', '값을 올린다', '#b91c1c') +
      arw(272, 60, 272, 34, '#b91c1c', 2.6) +
      t(220, 104, '한 회사뿐이면', 9.6, '#b91c1c') +
      t(220, 120, '일부러 적게 만들고 담합한다', 7.8, '#46506b') +
      t(144, 136, '정말 약이 필요한 사람에게 가지 못한다 — 시장 실패', 8.8, '#b91c1c');
  } };

  /* 공공재와 무임승차 */
  CA.publicgood = { w: 296, h: 144, d: function () {
    return "" +
      '<rect x="4" y="8" width="288" height="86" rx="7" fill="#232c3d"/>' +
      '<path d="M148 92V34" ' + k('#9aa7b8', 4) + '/>' +
      '<path d="M138 34h20l-4-8h-12z" ' + f('#f2c84b', 1.4) + '/>' +
      '<path d="M148 42L96 92h104z" fill="#ffe9a8" opacity=".3"/>' +
      fig(60, 92, .56, '#8ed7a3') + won(60, 56, 8) +
      fig(104, 92, .56, '#cdd6e1') + fig(196, 92, .56, '#cdd6e1') +
      fig(240, 92, .56, '#cdd6e1') +
      t(60, 110, '돈을 낸 사람', 8.6, '#047857') +
      t(174, 110, '돈을 안 내도 밝다 — 무임승차', 8.6, '#b91c1c') +
      t(84, 128, '비배제성', 9.6, '#1d4ed8') + t(84, 141, '누구도 막을 수 없다', 8, '#46506b') +
      t(216, 128, '비경합성', 9.6, '#1d4ed8') + t(216, 141, '써도 줄지 않는다', 8, '#46506b');
  } };

  /* 외부 효과 — 나쁜 쪽과 좋은 쪽 */
  CA.externality = { w: 302, h: 148, d: function () {
    return "" +
      '<path d="M150 10v120" ' + k('#b8c6d6', 1.6, '5 5') + '/>' +
      card(6, 10, 136, 86, '#fef2f2') +
      factory(16, 90, .62) +
      puff(30, 42, 9) + puff(44, 34, 11) + puff(62, 32, 9) +
      fig(110, 90, .58, '#b91c1c') +
      '<path d="M100 58q6-6 12 0M104 50q5-5 10 0" ' + k('#9aa7b8', 2) + '/>' +
      t(74, 112, '부정적 외부 효과', 9.6, '#b91c1c') +
      t(74, 127, '외부 불경제 — 매연 피해', 8.2, '#46506b') +
      tag(22, 130, 104, 18, '#fde3ea', '세금을 물린다', '#b91c1c') +
      card(158, 10, 136, 86, '#f0fdf4') +
      '<path d="M166 88h56V62h-56z" ' + f('#ffffff', 1.4) + '/>' +
      '<path d="M162 62l32-18 32 18" ' + k('#43b06b', 2.2) + '/>' +
      '<circle cx="178" cy="52" r="5" ' + f('#e4584a', 1.2) + '/>' +
      '<circle cx="196" cy="46" r="5" ' + f('#f2c84b', 1.2) + '/>' +
      '<circle cx="212" cy="52" r="5" ' + f('#8356c7', 1.2) + '/>' +
      '<path d="M238 88h48V66h-48z" ' + f('#fdf0cd', 1.4) + '/>' +
      t(262, 80, '가게', 8.4, '#b45309') +
      fig(244, 62, .4, '#047857') + fig(258, 62, .4, '#047857') + fig(272, 62, .4, '#047857') +
      t(226, 112, '긍정적 외부 효과', 9.6, '#047857') +
      t(226, 127, '예쁜 정원에 손님이 몰린다', 8.2, '#46506b') +
      tag(174, 130, 104, 18, '#d7f0dc', '보조금을 준다', '#047857');
  } };

  /* 경제 주체 넷의 역할 */
  CA.fourplayers = { w: 306, h: 148, d: function () {
    var it = [['capitol', '정부', ['독과점 규제', '공공재 공급', '누진세'], '#1d4ed8', '#eaf1ff'],
              ['factory', '기업', ['기업가 정신', '윤리적 경영', '법규 준수'], '#047857', '#eaf7ec'],
              ['people', '노동자', ['노동 3권', '근로권 지키기', '동반자 의식'], '#b45309', '#fdf0cd'],
              ['cart', '소비자', ['소비자 주권', '합리적 소비', '윤리적 소비'], '#b91c1c', '#fde3ea']];
    var o = '';
    for (var i = 0; i < 4; i++) {
      var x = 4 + i * 76;
      o += card(x, 8, 70, 58, it[i][4]);
      var g = (window.ConceptArt && ConceptArt.G[it[i][0]]) || '';
      o += '<g transform="translate(' + (x + 23) + ',20) scale(1)">' + g + '</g>';
      o += t(x + 35, 84, it[i][1], 11, it[i][3]);
      for (var j = 0; j < 3; j++) o += t(x + 35, 102 + j * 15, it[i][2][j], 7.8, '#46506b');
    }
    return o + t(153, 146, '넷이 제 몫을 해야 경제가 제대로 돈다', 8.8, '#46506b');
  } };

  /* 노동 3권 */
  CA.labor3 = { w: 296, h: 136, d: function () {
    return "" +
      card(6, 10, 90, 78, '#eaf1ff') +
      fig(34, 78, .56, '#1d4ed8') + fig(52, 78, .56, '#1d4ed8') + fig(70, 78, .56, '#1d4ed8') +
      '<path d="M50 44V24l24 7-24 7" ' + f('#5b8fd6', 1.4) + '/>' +
      '<path d="M50 44v14" ' + k('#4b5563', 2.2) + '/>' +
      card(104, 10, 90, 78, '#eaf7ec') +
      '<path d="M114 56h70v6h-70z" ' + f('#c89a63', 1.4) + '/>' +
      fig(128, 78, .54, '#047857') + fig(172, 78, .54, '#9aa7b8') +
      '<path d="M138 40h24v12h-24z" ' + f('#ffffff', 1.3) + '/>' +
      t(150, 49, '협상', 8, '#047857') +
      card(202, 10, 88, 78, '#fde3ea') +
      fig(224, 78, .54, '#b91c1c') + fig(246, 78, .54, '#b91c1c') +
      '<path d="M258 36l22-8v16z" ' + f('#e4584a', 1.4) + '/>' +
      '<path d="M258 36v22" ' + k('#4b5563', 2.2) + '/>' +
      '<path d="M214 44h28v12h-28z" ' + f('#ffffff', 1.3) + '/>' +
      t(51, 106, '단결권', 10.5, '#1d4ed8') + t(51, 121, '노동조합을 만든다', 8.2, '#46506b') +
      t(149, 106, '단체 교섭권', 10.5, '#047857') + t(149, 121, '사용자와 협상한다', 8.2, '#46506b') +
      t(246, 106, '단체 행동권', 10.5, '#b91c1c') + t(246, 121, '집회 · 시위를 한다', 8.2, '#46506b') +
      t(148, 134, '이 셋을 묶어 노동 3권이라고 한다', 8.8, '#46506b');
  } };

  /* 시장이 하는 일 */
  CA.marketrole = { w: 290, h: 130, d: function () {
    return "" +
      card(6, 10, 88, 74, '#eaf1ff') +
      fig(34, 72, .58, '#1d4ed8') + fig(66, 72, .58, '#b45309') +
      '<path d="M44 40h12v12H44z" ' + f('#8ed7a3', 1.3) + '/>' +
      arw(42, 34, 58, 34, '#46506b', 2.2) + arw(58, 58, 42, 58, '#46506b', 2.2) +
      card(102, 10, 88, 74, '#eaf7ec') +
      '<path d="M116 72h60" ' + k('#2f7a52', 2.4) + '/>' +
      '<path d="M122 72V52h10v20M138 72V38h10v34M154 72V46h10v26" ' + f('#8ed7a3', 1.3) + '/>' +
      card(198, 10, 88, 74, '#fdf0cd') +
      '<path d="M212 36h20v18h-20z" ' + f('#e9a94a', 1.3) + '/>' +
      arw(236, 45, 258, 45, '#b45309', 2.4) +
      fig(266, 72, .56, '#b45309') +
      t(50, 102, '찾아다닐 필요 없다', 8.8, '#1d4ed8') +
      t(50, 117, '거래 비용 ↓', 8.4, '#46506b') +
      t(146, 102, '하나만 잘 만들면 된다', 8.6, '#047857') +
      t(146, 117, '생산성 ↑', 8.4, '#46506b') +
      t(242, 102, '필요한 사람에게 간다', 8.6, '#b45309') +
      t(242, 117, '자원의 효율적 배분', 8.4, '#46506b');
  } };


  /* ───────── 단원 VIII-2 자산 관리 ───────── */

  function tbl(x, y, w2, s, c, bg, sz) {        /* 표 칸 — 높이 26 고정 */
    return '<rect x="' + x + '" y="' + y + '" width="' + w2 + '" height="26" ' +
      f(bg || '#ffffff', 1.2) + '/>' + (s ? t(x + w2 / 2, y + 16.2, s, sz || 8.4, c) : '');
  }

  /* 자산과 금융자산 */
  CA.assetkind = { w: 298, h: 124, d: function () {
    return "" +
      card(6, 8, 128, 78, '#eef3ff') +
      '<path d="M24 56l22-17 22 17v24H24z" ' + f('#ffffff', 1.5) + '/>' +
      '<path d="M20 56l26-20 26 20" ' + k('#e07a5f', 2.6) + '/>' +
      '<rect x="40" y="66" width="12" height="14" ' + f('#c7d6ee', 1.2) + '/>' +
      '<path d="M82 80h38v-11l-7-11H89l-7 11z" ' + f('#8fb6f0', 1.4) + '/>' +
      '<circle cx="92" cy="81" r="4.6" ' + f('#46506b', 1.2) + '/>' +
      '<circle cx="112" cy="81" r="4.6" ' + f('#46506b', 1.2) + '/>' +
      won(100, 26, 9) +
      t(70, 100, '자산 = 집 · 차 · 돈', 9.4, '#1d4ed8') +
      t(70, 114, '개인이 가진 재산 전부', 8.2, '#46506b') +
      arw(140, 46, 160, 46, '#46506b', 2.2) +
      card(166, 8, 126, 78, '#fff7e6') +
      bill(182, 54, 34, 17) + bill(194, 42, 34, 17) +
      won(250, 40, 14) + coin(254, 68, 8) +
      t(229, 100, '금융자산 = 돈 그 자체', 9.4, '#b45309') +
      t(229, 114, '집 · 차는 빼고 센다', 8.2, '#46506b');
  } };

  /* 금고에 넣어 두기 vs 금융상품 */
  CA.assetgrow = { w: 294, h: 126, d: function () {
    return "" +
      card(6, 8, 118, 80, '#f1f5f9') +
      '<rect x="32" y="24" width="64" height="50" rx="5" ' + f('#9aa7b8', 1.8) + '/>' +
      '<rect x="40" y="32" width="34" height="34" rx="3" ' + f('#c9d4e2', 1.2) + '/>' +
      '<circle cx="84" cy="49" r="7" ' + f('#e8eef6', 1.4) + '/>' +
      t(57, 52, '₩1000', 8.4, '#46506b') +
      t(65, 102, '금고에 넣어 두면', 9, '#46506b') +
      t(65, 116, '1000원 그대로', 8.6, '#46506b') +
      arw(130, 48, 158, 48, '#047857', 2.6) +
      t(144, 34, '금융상품', 8.6, '#047857') +
      card(164, 8, 124, 80, '#eafaf0') +
      tag(172, 18, 52, 16, '#ffffff', '예금', '#1d4ed8') +
      tag(228, 18, 52, 16, '#ffffff', '주식', '#b91c1c') +
      tag(172, 38, 52, 16, '#ffffff', '채권', '#047857') +
      tag(228, 38, 52, 16, '#ffffff', '펀드', '#7c3aed') +
      t(226, 76, '₩2000', 11.5, '#047857') +
      t(226, 102, '굴리면 늘어난다', 9, '#047857') +
      t(226, 116, '대신 위험도 따라온다', 8, '#46506b');
  } };

  /* 예금 — 돈이 도는 길 */
  CA.depositflow = { w: 302, h: 146, d: function () {
    return "" +
      t(108, 14, '돈을 맡긴다', 8.2, '#1d4ed8') +
      t(234, 14, '빌려주고 투자', 8.2, '#047857') +
      card(6, 22, 78, 64, '#eef3ff') +
      fig(45, 78, .92, '#2f6df6') +
      t(45, 100, '나', 9.6, '#1d4ed8') +
      arw(88, 48, 128, 48, '#1d4ed8', 2.4) +
      card(132, 22, 78, 64, '#fdf6e6') +
      '<path d="M146 76h50V50h-50z" ' + f('#f4e2b8', 1.5) + '/>' +
      '<path d="M139 50h64l-32-16z" ' + f('#e9c477', 1.5) + '/>' +
      '<path d="M156 76V56M171 76V56M186 76V56" ' + k('#b98c3a', 2) + '/>' +
      t(171, 100, '은행', 9.6, '#b45309') +
      arw(214, 48, 254, 48, '#047857', 2.4) +
      card(258, 22, 38, 64, '#eafaf0') +
      fig(277, 76, .76, '#047857') +
      t(277, 100, '기업', 9, '#047857') +
      arw(196, 118, 70, 118, '#b91c1c', 2.4) +
      t(133, 138, '그 대가로 나는 이자를 받는다 — 보통 연 1~3%', 9, '#b91c1c');
  } };

  /* 예금의 갈래 */
  CA.deposittree = { w: 340, h: 154, d: function () {
    return "" +
      tag(127, 4, 76, 20, '#dbeafe', '예금', '#1d4ed8') +
      '<path d="M165 24v12M70 36h190M70 36v12M260 36v12" ' + k('#94a3b8', 2) + '/>' +
      card(18, 48, 104, 52, '#f1f5f9') +
      t(70, 65, '요구불 예금', 9.4, '#46506b') +
      t(70, 79, '언제든 넣고 뺀다', 7.6, '#46506b') +
      t(70, 92, '이자는 거의 없다', 7.6, '#46506b') +
      card(208, 48, 104, 52, '#eafaf0') +
      t(260, 65, '저축성 예금', 9.4, '#047857') +
      t(260, 79, '기간을 정해 맡긴다', 7.6, '#46506b') +
      t(260, 92, '이자가 더 높다', 7.6, '#46506b') +
      '<path d="M260 100v8M224 108h72M224 108v10M296 108v10" ' + k('#94a3b8', 2) + '/>' +
      tag(188, 118, 72, 20, '#ffffff', '정기 예금', '#047857') +
      tag(260, 118, 72, 20, '#ffffff', '정기 적금', '#047857');
  } };

  /* 정기 예금과 정기 적금 */
  CA.fixeddiff = { w: 300, h: 130, d: function () {
    var c = '', i;
    for (i = 0; i < 6; i++) c += coin(178 + i * 17, 32, 6.4);
    return "" +
      card(6, 8, 134, 78, '#eef3ff') +
      won(40, 36, 16) +
      arw(60, 36, 98, 36, '#1d4ed8', 2.2) +
      t(79, 26, '1년', 8, '#1d4ed8') +
      won(118, 36, 12) + coin(118, 57, 6) +
      t(73, 77, '한 번에 맡기고 기다린다', 8.4, '#1d4ed8') +
      t(73, 102, '정기 예금', 10.4, '#1d4ed8') +
      t(73, 118, '1000만원 → 1년 뒤 원금+이자', 7.6, '#46506b') +
      card(160, 8, 134, 78, '#eafaf0') +
      c +
      arw(178, 52, 272, 52, '#047857', 2.2) +
      t(227, 77, '다달이 조금씩 쌓는다', 8.4, '#047857') +
      t(227, 102, '정기 적금', 10.4, '#047857') +
      t(227, 118, '매달 100만원 → 1년 뒤 1200만원+이자', 7, '#46506b');
  } };

  /* 예금자 보호 제도 */
  CA.protect5000 = { w: 286, h: 120, d: function () {
    return "" +
      '<path d="M22 76h58V48H22z" ' + f('#e2e8f0', 1.5) + '/>' +
      '<path d="M14 48h74l-37-18z" ' + f('#cbd5e1', 1.5) + '/>' +
      '<path d="M30 54l42 30M72 54l-42 30" ' + k('#b91c1c', 3) + '/>' +
      t(51, 102, '은행이 드물게 망해도', 8.6, '#b91c1c') +
      arw(94, 62, 116, 62, '#46506b', 2.2) +
      '<path d="M166 20L198 32v26c0 20-14 30-32 36-18-6-32-16-32-36V32z" ' + f('#8ed7a3', 1.8) + '/>' +
      t(166, 54, '예금자', 9, '#065f46') +
      t(166, 68, '보호 제도', 9, '#065f46') +
      t(166, 102, '1인당 최대 5천만원', 9, '#047857') +
      arw(206, 62, 230, 62, '#047857', 2.2) +
      fig(258, 84, .92, '#047857') +
      t(258, 102, '돌려받는다', 8.4, '#047857');
  } };

  /* 주식 — 기업과 투자자의 거래 */
  CA.stockflow = { w: 304, h: 138, d: function () {
    return "" +
      card(6, 14, 92, 72, '#eef3ff') +
      bldg(28, 78, 50, 48, '#a8bdd8') +
      t(52, 102, '기업', 9.6, '#1d4ed8') +
      t(52, 116, '사업하려니 큰 돈이 필요', 7.2, '#46506b') +
      arw(102, 32, 190, 32, '#b45309', 2.4) +
      t(146, 24, '주식(계약서)을 준다', 8.2, '#b45309') +
      arw(190, 66, 102, 66, '#047857', 2.4) +
      t(146, 80, '돈을 맡긴다', 8.2, '#047857') +
      card(196, 14, 100, 72, '#fff7e6') +
      '<rect x="210" y="26" width="42" height="30" rx="3" ' + f('#ffffff', 1.4) + '/>' +
      '<path d="M216 36h30M216 43h22M216 50h26" ' + k('#b45309', 1.6) + '/>' +
      fig(274, 58, .82, '#b45309') +
      t(246, 102, '주주', 9.6, '#b45309') +
      t(246, 116, '주식을 가진 사람', 7.2, '#46506b');
  } };

  /* 주식으로 버는 두 길, 그리고 위험 */
  CA.stockgain = { w: 306, h: 134, d: function () {
    return "" +
      card(4, 8, 94, 80, '#eafaf0') +
      bldg(26, 52, 32, 24, '#a8bdd8', 0) +
      coin(38, 70, 7) + coin(56, 70, 7) + coin(74, 70, 7) +
      arw(42, 56, 42, 62, '#047857', 2) +
      t(51, 100, '배당금', 9.6, '#047857') +
      t(51, 114, '기업이 번 돈을 나눠 준다', 7, '#46506b') +
      card(106, 8, 94, 80, '#eef3ff') +
      '<path d="M118 72h74" ' + k('#94a3b8', 1.8) + '/>' +
      '<path d="M120 66l20-14 18 6 22-28" ' + k('#1d4ed8', 2.6) + '/>' +
      t(134, 84, '산 값', 7.4, '#46506b') +
      t(180, 22, '판 값', 7.4, '#1d4ed8') +
      t(153, 100, '시세 차익', 9.6, '#1d4ed8') +
      t(153, 114, '싸게 사서 비싸게 판다', 7, '#46506b') +
      card(208, 8, 94, 80, '#fdecec') +
      '<path d="M220 30h74" ' + k('#94a3b8', 1.8) + '/>' +
      '<path d="M222 26l18 18 18-6 22 32" ' + k('#b91c1c', 2.6) + '/>' +
      t(255, 100, '원금 손실', 9.6, '#b91c1c') +
      t(255, 114, '기업이 망하면 돈이 사라진다', 7, '#46506b');
  } };

  /* 채권 — 빌려 주고 증서를 받는다 */
  CA.bondflow = { w: 304, h: 138, d: function () {
    return "" +
      card(4, 14, 92, 72, '#eef3ff') +
      '<path d="M22 72h56V46H22z" ' + f('#e8eef6', 1.5) + '/>' +
      '<path d="M15 46h70l-35-18z" ' + f('#c9d4e2', 1.5) + '/>' +
      '<path d="M32 72V52M50 72V52M68 72V52" ' + k('#8a97a8', 2) + '/>' +
      t(50, 102, '정부 · 공공기관', 9, '#1d4ed8') +
      t(50, 116, '도로를 지으려니 돈이 필요', 7.2, '#46506b') +
      arw(100, 32, 184, 32, '#b45309', 2.4) +
      t(142, 24, '채권을 발행', 8.2, '#b45309') +
      arw(184, 68, 100, 68, '#047857', 2.4) +
      t(142, 82, '돈을 빌려 준다', 8.2, '#047857') +
      card(190, 14, 110, 72, '#fff7e6') +
      '<rect x="200" y="26" width="54" height="34" rx="3" ' + f('#ffffff', 1.4) + '/>' +
      t(227, 40, '만기에', 7.6, '#b45309') +
      t(227, 52, '원금 + 이자 3%', 7.6, '#b45309') +
      fig(278, 62, .8, '#b45309') +
      t(245, 102, '채권을 산 사람', 9, '#b45309') +
      t(245, 116, '주식처럼 비싸게 팔 수도 있다', 7, '#46506b');
  } };

  /* 예금 · 채권 · 주식의 사다리 */
  CA.assetladder = { w: 300, h: 140, d: function () {
    return "" +
      '<path d="M18 96h266" ' + k('#94a3b8', 2) + '/>' +
      '<rect x="36" y="70" width="58" height="26" rx="4" ' + f('#8ed7a3', 1.5) + '/>' +
      t(65, 88, '예금 · 적금', 9, '#06563a') +
      '<rect x="122" y="48" width="58" height="48" rx="4" ' + f('#9fc6f5', 1.5) + '/>' +
      t(151, 78, '채권', 9.6, '#123a74') +
      '<rect x="208" y="20" width="58" height="76" rx="4" ' + f('#f5a7a7', 1.5) + '/>' +
      t(237, 62, '주식', 9.6, '#7a1d1d') +
      '<path d="M24 112h258" ' + k('#cbd5e1', 2) + '/>' +
      arw(150, 112, 26, 112, '#047857', 2.4) +
      arw(150, 112, 280, 112, '#b91c1c', 2.4) +
      t(76, 132, '안전성이 높다', 9.2, '#047857') +
      t(228, 132, '수익성이 높다', 9.2, '#b91c1c');
  } };

  /* 펀드 — 전문가에게 맡긴다 */
  CA.fundflow = { w: 304, h: 138, d: function () {
    return "" +
      fig(26, 48, .8, '#1d4ed8') + fig(26, 84, .8, '#1d4ed8') + fig(26, 120, .8, '#1d4ed8') +
      t(26, 134, '여러 투자자', 8.2, '#1d4ed8') +
      arw(44, 38, 90, 60, '#1d4ed8', 2) +
      arw(44, 74, 90, 74, '#1d4ed8', 2) +
      arw(44, 110, 90, 88, '#1d4ed8', 2) +
      card(96, 44, 76, 60, '#fff7e6') +
      fig(134, 94, 1.05, '#b45309') +
      t(134, 36, '전문가', 9.6, '#b45309') +
      t(134, 118, '모아서 대신 굴린다', 7.8, '#46506b') +
      arw(176, 74, 210, 74, '#047857', 2.4) +
      tag(214, 48, 76, 20, '#ffffff', '주식', '#b91c1c') +
      tag(214, 76, 76, 20, '#ffffff', '채권', '#047857') +
      t(252, 118, '수익을 나눠 주고 수수료를 뗀다', 7.4, '#46506b');
  } };

  /* 보험과 연금 */
  CA.insurepension = { w: 300, h: 128, d: function () {
    return "" +
      card(4, 8, 140, 80, '#fdecec') +
      fig(34, 64, .9, '#b91c1c') +
      '<path d="M24 32q6-11 12 0 6 11 12 0" ' + k('#b91c1c', 2.4) + '/>' +
      t(34, 80, '사고 · 질병', 8, '#b91c1c') +
      arw(56, 48, 82, 48, '#46506b', 2.2) +
      '<rect x="88" y="30" width="50" height="36" rx="4" ' + f('#ffffff', 1.4) + '/>' +
      t(113, 46, '보험회사', 8.4, '#b91c1c') +
      t(113, 58, '치료비 지급', 7.6, '#46506b') +
      t(74, 104, '보험', 10.4, '#b91c1c') +
      t(74, 118, '큰 지출을 막아 주는 상품', 7.2, '#46506b') +
      card(156, 8, 140, 80, '#eef3ff') +
      coin(176, 28, 6) + coin(192, 28, 6) + coin(208, 28, 6) + coin(224, 28, 6) +
      t(200, 46, '젊을 때 조금씩 낸 돈', 7.8, '#1d4ed8') +
      arw(176, 58, 248, 58, '#1d4ed8', 2.2) +
      fig(276, 80, .78, '#1d4ed8') +
      t(206, 78, '늙어서 매달 나눠 받는다', 7.6, '#46506b') +
      t(226, 104, '연금', 10.4, '#1d4ed8') +
      t(226, 118, '직장이 없는 노후를 대비한다', 7.2, '#46506b');
  } };

  /* 자산 관리의 세 원칙 */
  CA.threeprinciple = { w: 302, h: 132, d: function () {
    return "" +
      card(4, 8, 94, 76, '#eafaf0') +
      '<path d="M51 20L74 30v18c0 15-9 21-23 27-14-6-23-12-23-27V30z" ' + f('#8ed7a3', 1.6) + '/>' +
      t(51, 54, '원금', 8.6, '#065f46') +
      t(51, 100, '안전성', 10.4, '#047857') +
      t(51, 116, '내 돈이 사라지지 않는가', 7.2, '#46506b') +
      card(104, 8, 94, 76, '#fdecec') +
      '<path d="M118 70h66" ' + k('#94a3b8', 1.6) + '/>' +
      '<path d="M120 66l18-14 16 8 22-28" ' + k('#b91c1c', 2.6) + '/>' +
      t(151, 100, '수익성', 10.4, '#b91c1c') +
      t(151, 116, '얼마나 벌 수 있는가', 7.2, '#46506b') +
      card(204, 8, 94, 76, '#eef3ff') +
      won(226, 44, 13) +
      arw(244, 44, 266, 44, '#1d4ed8', 2.2) +
      bill(270, 36, 22, 16) +
      t(251, 72, '바로 현금으로', 7.6, '#1d4ed8') +
      t(251, 100, '유동성', 10.4, '#1d4ed8') +
      t(251, 116, '필요할 때 바로 바꾼다', 7.2, '#46506b');
  } };

  /* 안전성과 수익성은 시소 */
  CA.safeyield = { w: 292, h: 130, d: function () {
    return "" +
      '<path d="M146 52l-108 34M146 52l108 14" ' + k('#46506b', 3) + '/>' +
      '<path d="M146 52l-14 42h28z" ' + f('#cbd5e1', 1.6) + '/>' +
      '<rect x="12" y="62" width="58" height="24" rx="4" ' + f('#8ed7a3', 1.5) + '/>' +
      t(41, 78, '예금', 9.4, '#06563a') +
      '<rect x="222" y="42" width="58" height="24" rx="4" ' + f('#f5a7a7', 1.5) + '/>' +
      t(251, 58, '주식', 9.4, '#7a1d1d') +
      t(41, 108, '안전성 ↑ 수익성 ↓', 8.8, '#047857') +
      t(251, 108, '안전성 ↓ 수익성 ↑', 8.8, '#b91c1c') +
      t(146, 126, '한쪽을 올리면 다른 쪽이 내려간다', 9.2, '#46506b');
  } };

  /* 유동성 — 현금으로 바꾸는 속도 */
  CA.liquidity = { w: 300, h: 126, d: function () {
    return "" +
      card(4, 8, 138, 76, '#eafaf0') +
      won(32, 44, 15) +
      arw(52, 44, 100, 44, '#047857', 3) +
      bill(104, 34, 28, 20) +
      t(73, 76, '몇 초면 끝난다', 8.4, '#047857') +
      t(73, 100, '유동성 높음', 9.8, '#047857') +
      t(73, 116, '요구불 예금 · 현금', 7.8, '#46506b') +
      card(158, 8, 138, 76, '#fdecec') +
      '<path d="M176 50l20-14 20 14v14h-40z" ' + f('#ffffff', 1.5) + '/>' +
      '<path d="M172 50l24-17 24 17" ' + k('#b91c1c', 2.2) + '/>' +
      arw(224, 50, 254, 50, '#b91c1c', 2) +
      bill(258, 40, 28, 20) +
      t(227, 78, '몇 달이 걸리기도', 8, '#b91c1c') +
      t(227, 100, '유동성 낮음', 9.8, '#b91c1c') +
      t(227, 116, '땅 · 집 같은 부동산', 7.8, '#46506b');
  } };

  /* 분산 투자 */
  CA.diversify = { w: 296, h: 126, d: function () {
    function egg(x, y) {
      return '<ellipse cx="' + x + '" cy="' + y + '" rx="5.6" ry="7" ' + f('#fdf0cd', 1.2) + '/>';
    }
    function basket(x, y) {
      return '<path d="M' + (x - 18) + ' ' + y + 'l4 18h28l4-18z" ' + f('#d9a86c', 1.5) + '/>' +
        '<path d="M' + (x - 18) + ' ' + y + 'h36" ' + k('#8a5a2b', 2) + '/>';
    }
    return "" +
      card(4, 8, 138, 76, '#fdecec') +
      basket(72, 44) + egg(58, 36) + egg(72, 36) + egg(86, 36) + egg(65, 48) + egg(79, 48) +
      '<path d="M46 18l52 52M98 18l-52 52" ' + k('#b91c1c', 2.6) + '/>' +
      t(73, 100, '한 바구니에 전부', 9.4, '#b91c1c') +
      t(73, 116, '떨어뜨리면 다 깨진다', 7.8, '#46506b') +
      card(158, 8, 134, 76, '#eafaf0') +
      basket(184, 34) + egg(184, 26) +
      basket(226, 34) + egg(226, 26) +
      basket(268, 34) + egg(268, 26) +
      t(225, 74, '예금 · 채권 · 주식에 나눠 담기', 7.6, '#047857') +
      t(225, 100, '분산 투자', 9.4, '#047857') +
      t(225, 116, '수익성과 안전성을 함께 지킨다', 7.2, '#46506b');
  } };

  /* 생애 주기 — 소득과 소비 곡선 */
  CA.lifecurve = { w: 310, h: 142, d: function (o) {
    var X = [40, 86, 132, 178, 224, 272];
    var NM = ['10대', '20대', '30대', '40대', '50대', '60대'];
    var INC = [104, 86, 66, 48, 28, 74];
    var SPD = [90, 70, 50, 54, 58, 62];
    var i, on, g = '';
    for (i = 0; i < 6; i++) {
      on = o && o.hi === i;
      if (on) g += '<rect x="' + Math.max(28, X[i] - 21) + '" y="14" width="42" height="104" rx="5" ' +
        'fill="#ffeab0" opacity=".9"/>';
      g += '<path d="M' + X[i] + ' 118v5" ' + k('#94a3b8', 1.6) + '/>' +
        t(X[i], 134, NM[i], on ? 10 : 8.6, on ? '#b45309' : '#46506b');
    }
    function line(A, c) {
      var d = '', j;
      for (j = 0; j < 6; j++) d += (j ? 'L' : 'M') + X[j] + ' ' + A[j];
      return '<path d="' + d + '" ' + k(c, 2.8) + '/>';
    }
    return "" +
      '<path d="M26 118h268M26 14v104" ' + k('#94a3b8', 1.8) + '/>' +
      g +
      line(SPD, '#2f6df6') +
      line(INC, '#e03e3e') +
      t(294, 58, '소비', 8.6, '#2f6df6') +
      t(294, 86, '소득', 8.6, '#e03e3e');
  } };

  /* 소득은 한정된 기간, 지출은 평생 */
  CA.incomespan = { w: 300, h: 124, d: function () {
    return "" +
      t(150, 16, '버는 기간과 쓰는 기간은 다르다', 10, '#46506b') +
      '<rect x="24" y="28" width="252" height="26" rx="6" ' + f('#dbeafe', 1.5) + '/>' +
      t(150, 46, '지출 — 태어나서 죽을 때까지 평생', 9.2, '#1d4ed8') +
      '<rect x="78" y="64" width="128" height="26" rx="6" ' + f('#fde2e2', 1.5) + '/>' +
      t(142, 82, '소득 — 취업부터 은퇴까지', 9.2, '#b91c1c') +
      '<path d="M78 94v8M206 94v8M78 102h128" ' + k('#b91c1c', 1.8) + '/>' +
      t(142, 118, '이 짧은 기간에 번 돈으로 평생을 살아야 한다', 8.8, '#b91c1c');
  } };

  /* 흑자가 날 때 노후를 준비한다 */
  CA.retireprep = { w: 298, h: 130, d: function () {
    return "" +
      card(4, 10, 130, 76, '#eafaf0') +
      coin(36, 40, 10) + coin(60, 40, 10) + coin(84, 40, 10) + coin(108, 40, 10) +
      t(69, 70, '버는 돈 > 쓰는 돈', 9.2, '#047857') +
      t(69, 102, '40~50대 흑자', 9.8, '#047857') +
      t(69, 118, '소득이 가장 많아지는 때', 7.6, '#46506b') +
      arw(140, 46, 164, 46, '#b45309', 2.4) +
      card(170, 10, 124, 76, '#fff7e6') +
      '<path d="M200 70q-14 0-14-14t14-14h38q14 0 14 14t-14 14z" ' + f('#f3c6a0', 1.6) + '/>' +
      '<path d="M214 42v-6h10v6" ' + k('#b45309', 2.2) + '/>' +
      '<circle cx="244" cy="54" r="2.6" fill="#8a5a2b"/>' +
      t(232, 102, '노후 준비', 9.8, '#b45309') +
      t(232, 118, '은퇴 뒤 쓸 돈을 미리 모은다', 7.4, '#46506b');
  } };

  /* 금융 생활 설계 */
  CA.lifeplan = { w: 298, h: 128, d: function () {
    return "" +
      card(4, 8, 138, 78, '#fdecec') +
      bill(26, 26, 26, 14) + bill(56, 22, 26, 14) + bill(86, 30, 26, 14) +
      '<path d="M30 18l82 32M112 18l-82 32" ' + k('#b91c1c', 2.4) + '/>' +
      fig(72, 78, .9, '#b91c1c') +
      t(73, 102, '계획 없이 쓰면', 9.2, '#b91c1c') +
      t(73, 118, '늙어서 쓸 돈이 남지 않는다', 7.6, '#46506b') +
      card(158, 8, 136, 78, '#eafaf0') +
      '<rect x="178" y="18" width="96" height="58" rx="4" ' + f('#ffffff', 1.5) + '/>' +
      '<path d="M186 26h40" ' + k('#047857', 2.8) + '/>' +
      '<path d="M186 40h80M186 52h80M186 64h52" ' + k('#8ed7a3', 2.4) + '/>' +
      t(226, 102, '금융 생활 설계', 9.2, '#047857') +
      t(226, 118, '생애 단계를 내다보고 계획한다', 7.4, '#46506b');
  } };

  /* ───────── 단원 VIII-3 국제 무역 ───────── */

  /* 무역은 왜 하는가 */
  CA.tradewhy = { w: 304, h: 132, d: function () {
    return "" +
      card(4, 10, 100, 78, '#eafaf0') +
      '<path d="M34 56q20-18 40 0z" ' + f('#fdf0cd', 1.5) + '/>' +
      '<path d="M28 56h52l-9 20H37z" ' + f('#ffffff', 1.7) + '/>' +
      '<path d="M26 56h56" ' + k('#1b2330', 1.8) + '/>' +
      '<circle cx="46" cy="48" r="1.8" fill="#d8a62c"/>' +
      '<circle cx="56" cy="44" r="1.8" fill="#d8a62c"/>' +
      '<circle cx="64" cy="49" r="1.8" fill="#d8a62c"/>' +
      t(54, 102, '쌀의 나라', 9.6, '#047857') +
      t(54, 118, '고기는 못 만든다', 7.6, '#46506b') +
      arw(110, 34, 194, 34, '#b45309', 2.6) +
      t(152, 26, '쌀을 보낸다', 8.2, '#b45309') +
      arw(194, 64, 110, 64, '#047857', 2.6) +
      t(152, 80, '고기를 보낸다', 8.2, '#047857') +
      card(200, 10, 100, 78, '#fdecec') +
      '<path d="M226 40q26-6 46 4 9 12-3 22-22 8-44 0-9-13 1-26z" ' + f('#f0a0a0', 1.7) + '/>' +
      '<path d="M234 54q14-7 28 0" ' + k('#c76b6b', 2.2) + '/>' +
      '<path d="M232 62q14-6 28 0" ' + k('#c76b6b', 2.2) + '/>' +
      '<circle cx="268" cy="38" r="6" ' + f('#fdf3ef', 1.4) + '/>' +
      t(250, 102, '고기의 나라', 9.6, '#b91c1c') +
      t(250, 118, '쌀은 못 만든다', 7.6, '#46506b');
  } };

  /* 무역으로 오가는 것들 */
  CA.tradekind = { w: 302, h: 126, d: function () {
    return "" +
      card(4, 8, 94, 76, '#eef3ff') +
      '<rect x="26" y="30" width="24" height="20" rx="3" ' + f('#ffffff', 1.4) + '/>' +
      '<path d="M31 30v-5M38 30v-5M45 30v-5M31 50v5M38 50v5M45 50v5" ' + k('#46506b', 1.6) + '/>' +
      '<path d="M58 52h24v-8l-5-8H63l-5 8z" ' + f('#8fb6f0', 1.3) + '/>' +
      '<circle cx="64" cy="53" r="3.4" ' + f('#46506b', 1.1) + '/>' +
      '<circle cx="76" cy="53" r="3.4" ' + f('#46506b', 1.1) + '/>' +
      '<path d="M30 70q10-9 20 0" ' + k('#d8a62c', 2.6) + '/>' +
      '<circle cx="68" cy="68" r="7" ' + f('#f3b55a', 1.3) + '/>' +
      t(51, 100, '상품', 10, '#1d4ed8') +
      t(51, 114, '자동차 · 반도체 · 바나나', 7, '#46506b') +
      card(104, 8, 94, 76, '#fdecec') +
      '<rect x="124" y="26" width="54" height="34" rx="4" ' + f('#ffffff', 1.4) + '/>' +
      '<path d="M144 36l16 7-16 7z" ' + f('#b91c1c', 1.2) + '/>' +
      '<path d="M136 70h30" ' + k('#b91c1c', 2.4) + '/>' +
      t(151, 100, '서비스', 10, '#b91c1c') +
      t(151, 114, '영화 · 게임 · 영상 서비스', 7, '#46506b') +
      card(204, 8, 94, 76, '#eafaf0') +
      fig(228, 64, .92, '#047857') +
      '<path d="M252 64h32V50h-32z" ' + f('#8ed7a3', 1.4) + '/>' +
      '<path d="M252 50q8-8 16 0 8 8 16 0" ' + k('#2f8f5b', 2) + '/>' +
      t(251, 100, '생산 요소', 10, '#047857') +
      t(251, 114, '노동자 · 토지', 7, '#46506b');
  } };

  /* 특화와 국제 분업 */
  CA.special2 = { w: 300, h: 130, d: function () {
    return "" +
      card(4, 10, 118, 76, '#eef3ff') +
      '<rect x="30" y="36" width="66" height="32" rx="4" ' + f('#9fc6f5', 1.5) + '/>' +
      '<path d="M38 36v-6M52 36v-6M66 36v-6M80 36v-6M38 68v6M52 68v6M66 68v6M80 68v6" ' +
        k('#1d4ed8', 2) + '/>' +
      t(63, 56, '반도체', 8.6, '#123a74') +
      t(63, 102, '한국은 반도체를 특화', 8.8, '#1d4ed8') +
      t(63, 118, '석유는 한 방울도 안 난다', 7.4, '#46506b') +
      arw(128, 36, 174, 36, '#1d4ed8', 2.4) +
      arw(174, 66, 128, 66, '#b45309', 2.4) +
      t(151, 28, '판다', 8, '#1d4ed8') +
      t(151, 82, '산다', 8, '#b45309') +
      card(180, 10, 116, 76, '#fff7e6') +
      '<rect x="216" y="38" width="36" height="34" rx="5" ' + f('#8a6a4a', 1.6) + '/>' +
      '<path d="M216 48h36M216 62h36" ' + k('#5f4a33', 2.2) + '/>' +
      '<path d="M234 20q9 11 9 16a9 9 0 0 1-18 0q0-5 9-16z" ' + f('#3f3a33', 1.4) + '/>' +
      t(238, 102, '산유국은 석유를 특화', 8.8, '#b45309') +
      t(238, 118, '각자 잘하는 것만 — 국제 분업', 7.4, '#46506b');
  } };

  /* 절대 우위 — 생산 비용 비교 */
  CA.abscost = { w: 300, h: 132, d: function () {
    return "" +
      tbl(8, 14, 106, '', null, '#eef3ff') +
      tbl(114, 14, 90, '사과 1개', null, '#eef3ff') +
      tbl(204, 14, 90, '바나나 1개', null, '#eef3ff') +
      tbl(8, 40, 106, '사과국', null, '#f8fafc', 9) +
      tbl(114, 40, 90, '5원', '#047857', '#eafaf0', 9.6) +
      tbl(204, 40, 90, '10원', null, '#ffffff', 9.6) +
      tbl(8, 66, 106, '바나나국', null, '#f8fafc', 9) +
      tbl(114, 66, 90, '6원', null, '#ffffff', 9.6) +
      tbl(204, 66, 90, '4원', '#047857', '#eafaf0', 9.6) +
      t(150, 108, '생산 비용이 더 낮은 쪽이 절대 우위 — 색칠한 칸', 8.8, '#047857') +
      t(150, 126, '사과국은 사과에, 바나나국은 바나나에 절대 우위', 8.8, '#1d4ed8');
  } };

  /* 절대 우위로 무역했을 때의 이익 */
  CA.absgain = { w: 304, h: 134, d: function () {
    return "" +
      tbl(8, 12, 96, '', null, '#eef3ff') +
      tbl(104, 12, 76, '무역 전', null, '#eef3ff') +
      tbl(180, 12, 68, '무역 후', null, '#eef3ff') +
      tbl(248, 12, 48, '아낀 돈', null, '#eef3ff', 7.4) +
      tbl(8, 38, 96, '사과국', null, '#f8fafc', 9) +
      tbl(104, 38, 76, '5+10 = 15원', null, '#ffffff', 8) +
      tbl(180, 38, 68, '5+5 = 10원', null, '#ffffff', 8) +
      tbl(248, 38, 48, '5원', '#047857', '#eafaf0', 9.6) +
      tbl(8, 64, 96, '바나나국', null, '#f8fafc', 9) +
      tbl(104, 64, 76, '6+4 = 10원', null, '#ffffff', 8) +
      tbl(180, 64, 68, '4+4 = 8원', null, '#ffffff', 8) +
      tbl(248, 64, 48, '2원', '#047857', '#eafaf0', 9.6) +
      t(152, 106, '각자 잘 만드는 것만 두 개씩 만들어 하나를 바꾼다', 8.8, '#46506b') +
      t(152, 126, '두 나라 모두 비용이 줄었다 — 무역은 둘 다 이익', 9.2, '#047857');
  } };

  /* 절대 우위론의 한계 */
  CA.absgap = { w: 298, h: 130, d: function () {
    function stars(x, y, n) {
      var o2 = '', i;
      for (i = 0; i < 3; i++) o2 += star5(x + i * 16, y, 6.4, i < n ? '#f2c84b' : '#e2e8f0');
      return o2;
    }
    return "" +
      card(6, 10, 136, 78, '#eef3ff') +
      fig(36, 62, 1, '#1d4ed8') +
      t(36, 80, '흥민군', 9.2, '#1d4ed8') +
      t(82, 34, '축구', 8.4, '#46506b') + stars(100, 32, 3) +
      t(82, 62, '청소', 8.4, '#46506b') + stars(100, 60, 2) +
      t(74, 104, '둘 다 잘한다', 9.4, '#1d4ed8') +
      t(74, 120, '축구도 청소도 절대 우위', 7.4, '#46506b') +
      card(156, 10, 136, 78, '#fdecec') +
      fig(186, 62, 1, '#b91c1c') +
      t(186, 80, '세원군', 9.2, '#b91c1c') +
      t(232, 34, '축구', 8.4, '#46506b') + stars(250, 32, 1) +
      t(232, 62, '청소', 8.4, '#46506b') + stars(250, 60, 1) +
      t(224, 104, '둘 다 못한다', 9.4, '#b91c1c') +
      t(224, 120, '절대 우위가 하나도 없다', 7.4, '#46506b');
  } };

  /* 둘 다 이익이 되는 분업 */
  CA.hiregain = { w: 300, h: 128, d: function () {
    return "" +
      card(4, 10, 138, 76, '#eef3ff') +
      fig(40, 66, 1, '#1d4ed8') +
      '<circle cx="72" cy="50" r="9" ' + f('#ffffff', 1.5) + '/>' +
      '<path d="M66 46l6-4 6 4-2 7h-8z" ' + f('#1b2330', 1) + '/>' +
      arw(52, 46, 60, 48, '#1d4ed8', 2) +
      t(108, 50, '축구에 집중', 8.6, '#1d4ed8') +
      t(73, 102, '흥민군은 축구만', 9.4, '#1d4ed8') +
      t(73, 118, '잘하는 일에 시간을 몰아준다', 7.2, '#46506b') +
      card(158, 10, 138, 76, '#eafaf0') +
      fig(192, 66, 1, '#047857') +
      '<path d="M216 66l10-26 8 3-10 26z" ' + f('#8ed7a3', 1.4) + '/>' +
      '<path d="M212 68h22" ' + k('#2f8f5b', 2.4) + '/>' +
      t(262, 50, '청소를 맡는다', 8.2, '#047857') +
      t(227, 102, '세원군은 일자리를 얻고', 9, '#047857') +
      t(227, 118, '둘 다 전보다 이익이 된다', 7.2, '#46506b');
  } };

  /* 비교 우위 — 기회비용으로 따진다 */
  CA.compcost = { w: 316, h: 144, d: function (o) {
    var step = (o && o.step) || 3;
    var g2 = step >= 3 ? '#eafaf0' : '#ffffff';
    var c2 = step >= 3 ? '#047857' : null;
    return "" +
      tbl(6, 10, 76, '', null, '#eef3ff') +
      tbl(82, 10, 58, '딸기 비용', null, '#eef3ff', 7.6) +
      tbl(140, 10, 58, '포도 비용', null, '#eef3ff', 7.6) +
      (step >= 2 ?
        tbl(198, 10, 58, '딸기의 기회비용', null, '#fff7e6', 6.4) +
        tbl(256, 10, 58, '포도의 기회비용', null, '#fff7e6', 6.4) : '') +
      tbl(6, 36, 76, '과일왕국', null, '#f8fafc', 8.4) +
      tbl(82, 36, 58, '2원', null, '#ffffff', 9.4) +
      tbl(140, 36, 58, '1원', null, '#ffffff', 9.4) +
      (step >= 2 ?
        tbl(198, 36, 58, '포도 2개', null, '#ffffff', 8) +
        tbl(256, 36, 58, '딸기 1/2개', c2, g2, 8) : '') +
      tbl(6, 62, 76, '딸기국', null, '#f8fafc', 8.4) +
      tbl(82, 62, 58, '3원', null, '#ffffff', 9.4) +
      tbl(140, 62, 58, '6원', null, '#ffffff', 9.4) +
      (step >= 2 ?
        tbl(198, 62, 58, '포도 1/2개', c2, g2, 8) +
        tbl(256, 62, 58, '딸기 2개', null, '#ffffff', 8) : '') +
      (step === 1 ?
        t(158, 108, '생산 비용은 딸기도 포도도 과일왕국이 싸다', 9, '#46506b') +
        t(158, 128, '절대 우위는 과일왕국이 둘 다 가졌다', 9.2, '#b45309') : '') +
      (step === 2 ?
        t(158, 108, '그래도 무역하면 이익이 날 수 있다', 9, '#46506b') +
        t(158, 128, '생산 비용 대신 기회비용을 옆에 적어 본다', 9.2, '#b45309') : '') +
      (step >= 3 ?
        t(158, 108, '기회비용이 작은 쪽이 비교 우위 — 색칠한 칸', 9, '#047857') +
        t(158, 128, '딸기국은 딸기, 과일왕국은 포도를 만들면 된다', 9.2, '#1d4ed8') : '');
  } };

  /* 기회비용 구하는 요령 — 가위 */
  CA.scissors = { w: 292, h: 126, d: function () {
    return "" +
      card(6, 10, 128, 70, '#eef3ff') +
      t(70, 30, '과일왕국 — 딸기 2원 · 포도 1원', 8, '#46506b') +
      '<path d="M36 44l62 24M98 44l-62 24" ' + k('#b45309', 2.8) + '/>' +
      '<circle cx="34" cy="70" r="5" ' + f('#f3c6a0', 1.4) + '/>' +
      '<circle cx="100" cy="70" r="5" ' + f('#f3c6a0', 1.4) + '/>' +
      t(70, 96, '가까운 숫자를 위로', 9.4, '#b45309') +
      t(70, 114, '생산 비용이 주어질 때만 쓴다', 7.6, '#46506b') +
      card(152, 10, 134, 70, '#fff7e6') +
      t(206, 30, '딸기 1개의 기회비용', 8.4, '#46506b') +
      '<path d="M190 50h32" ' + k('#1b2330', 2) + '/>' +
      t(206, 47, '2', 11, '#b45309') +
      t(206, 64, '1', 11, '#1b2330') +
      arw(230, 50, 252, 50, '#047857', 2.2) +
      t(268, 56, '2', 13, '#047857') +
      t(219, 96, '포도 2개를 포기한다', 9.4, '#047857') +
      t(219, 114, '가까운 2를 위로, 먼 1을 아래로', 7.6, '#46506b');
  } };

  /* 비교 우위로 무역했을 때의 이익 */
  CA.compgain = { w: 304, h: 134, d: function () {
    return "" +
      tbl(8, 12, 96, '', null, '#eef3ff') +
      tbl(104, 12, 76, '무역 전', null, '#eef3ff') +
      tbl(180, 12, 68, '무역 후', null, '#eef3ff') +
      tbl(248, 12, 48, '아낀 돈', null, '#eef3ff', 7.4) +
      tbl(8, 38, 96, '과일왕국', null, '#f8fafc', 9) +
      tbl(104, 38, 76, '2+1 = 3원', null, '#ffffff', 8) +
      tbl(180, 38, 68, '1+1 = 2원', null, '#ffffff', 8) +
      tbl(248, 38, 48, '1원', '#047857', '#eafaf0', 9.6) +
      tbl(8, 64, 96, '딸기국', null, '#f8fafc', 9) +
      tbl(104, 64, 76, '3+6 = 9원', null, '#ffffff', 8) +
      tbl(180, 64, 68, '3+3 = 6원', null, '#ffffff', 8) +
      tbl(248, 64, 48, '3원', '#047857', '#eafaf0', 9.6) +
      t(152, 106, '과일왕국은 포도만, 딸기국은 딸기만 두 개씩', 8.8, '#46506b') +
      t(152, 126, '절대 우위가 없는 나라도 무역하면 이익이다', 9.2, '#047857');
  } };

  /* 생산량이 주어질 때 */
  CA.outputtable = { w: 316, h: 142, d: function () {
    return "" +
      tbl(6, 10, 76, '', null, '#eef3ff') +
      tbl(82, 10, 58, '사과 생산량', null, '#eef3ff', 7) +
      tbl(140, 10, 58, '포도 생산량', null, '#eef3ff', 7) +
      tbl(198, 10, 58, '사과의 기회비용', null, '#fff7e6', 6.4) +
      tbl(256, 10, 58, '포도의 기회비용', null, '#fff7e6', 6.4) +
      tbl(6, 36, 76, '갑국', null, '#f8fafc', 9) +
      tbl(82, 36, 58, '8개', null, '#ffffff', 9.4) +
      tbl(140, 36, 58, '16개', null, '#ffffff', 9.4) +
      tbl(198, 36, 58, '포도 2개', '#047857', '#eafaf0', 8) +
      tbl(256, 36, 58, '사과 1/2개', null, '#ffffff', 8) +
      tbl(6, 62, 76, '을국', null, '#f8fafc', 9) +
      tbl(82, 62, 58, '4개', null, '#ffffff', 9.4) +
      tbl(140, 62, 58, '12개', null, '#ffffff', 9.4) +
      tbl(198, 62, 58, '포도 3개', null, '#ffffff', 8) +
      tbl(256, 62, 58, '사과 1/3개', '#047857', '#eafaf0', 8) +
      t(158, 106, '생산량은 많아야 좋다 — 가위를 반대로 쓴다', 9, '#b45309') +
      t(158, 126, '갑국은 사과, 을국은 포도에 비교 우위', 9.2, '#047857');
  } };

  /* WTO · FTA — 관세가 사라진다 */
  CA.wtofta = { w: 296, h: 140, d: function () {
    return "" +
      '<path d="M24 88h248" ' + k('#94a3b8', 2.2) + '/>' +
      '<rect x="126" y="44" width="44" height="44" rx="4" ' + f('#f5a7a7', 1.6) + '/>' +
      '<path d="M120 38l56 56M176 38l-56 56" ' + k('#b91c1c', 3.4) + '/>' +
      arw(26, 26, 270, 26, '#047857', 2.6) +
      t(148, 14, '장벽이 낮아져 무역이 활발해진다', 9, '#047857') +
      t(148, 112, '관세가 사라진다', 9.2, '#b91c1c') +
      t(62, 134, 'WTO 세계 무역 기구', 8.6, '#047857') +
      t(234, 134, 'FTA 자유 무역 협정', 8.6, '#047857');
  } };

  /* 무역이 주는 이익 */
  CA.tradegood = { w: 304, h: 130, d: function () {
    return "" +
      card(4, 8, 94, 78, '#eef3ff') +
      '<rect x="26" y="44" width="20" height="22" ' + f('#9fc6f5', 1.4) + '/>' +
      '<rect x="52" y="40" width="20" height="26" ' + f('#c7d6ee', 1.4) + '/>' +
      '<circle cx="82" cy="54" r="8" ' + f('#f3b55a', 1.3) + '/>' +
      fig(51, 82, .6, '#1d4ed8') +
      t(51, 102, '소비자', 9.8, '#1d4ed8') +
      t(51, 116, '더 싸고 다양하게 고른다', 7, '#46506b') +
      card(104, 8, 94, 78, '#eafaf0') +
      factory(120, 70, .64) +
      '<path d="M170 72V46M180 72V34M190 72V54" ' + k('#2f8f5b', 4) + '/>' +
      t(151, 102, '기업', 9.8, '#047857') +
      t(151, 116, '규모의 경제 · 경쟁하며 발전', 7, '#46506b') +
      card(204, 8, 94, 78, '#fff7e6') +
      '<circle cx="240" cy="46" r="18" ' + f('#f3d9a0', 1.5) + '/>' +
      '<path d="M222 46h36M240 28v36M228 34q12 12 0 24M252 34q-12 12 0 24" ' + k('#b45309', 1.4) + '/>' +
      '<path d="M264 62q8-10 16 0" ' + k('#b45309', 2) + '/>' +
      t(251, 102, '국가', 9.8, '#b45309') +
      t(251, 116, '기술 · 문화를 받아들이고 협력', 7, '#46506b');
  } };

  /* 규모의 경제 */
  CA.scaleecon = { w: 298, h: 128, d: function () {
    var g = '', i, j;
    for (i = 0; i < 4; i++)
      for (j = 0; j < 6; j++)
        g += '<rect x="' + (218 + j * 13) + '" y="' + (24 + i * 12) + '" width="9" height="9" rx="1.5" ' +
          f('#8ed7a3', 1) + '/>';
    return "" +
      card(4, 10, 134, 76, '#fdecec') +
      '<rect x="22" y="28" width="46" height="34" rx="3" ' + f('#cbd5e1', 1.5) + '/>' +
      t(45, 48, '공장', 8.6, '#46506b') +
      t(45, 76, '100만원', 8.4, '#46506b') +
      '<path d="M86 50l10-4 10 4 5 6-6 3v15H87V59l-6-3z" ' + f('#f0a0a0', 1.4) + '/>' +
      t(96, 38, '옷 1벌', 7.6, '#b91c1c') +
      t(71, 102, '1벌에 100만원', 9.6, '#b91c1c') +
      t(71, 118, '이걸 누가 사겠는가', 7.4, '#46506b') +
      card(154, 10, 140, 76, '#eafaf0') +
      '<rect x="166" y="28" width="40" height="34" rx="3" ' + f('#cbd5e1', 1.5) + '/>' +
      t(186, 48, '공장', 8.6, '#46506b') +
      t(186, 76, '100만원', 8.4, '#46506b') +
      g +
      t(224, 102, '1벌에 1만원', 9.6, '#047857') +
      t(224, 118, '많이 만들수록 개당 비용이 내려간다', 7, '#46506b');
  } };

  /* 무역의 그늘 */
  CA.tradebad = { w: 304, h: 144, d: function () {
    return "" +
      card(4, 8, 94, 78, '#fdecec') +
      factory(20, 62, .58) +
      '<path d="M26 26l38 36M64 26l-38 36" ' + k('#b91c1c', 2.6) + '/>' +
      fig(80, 72, .68, '#b91c1c') +
      t(51, 102, '일자리가 준다', 9.2, '#b91c1c') +
      t(51, 116, '경쟁에 진 국내 기업이', 7.2, '#46506b') +
      t(51, 130, '문을 닫는다', 7.2, '#46506b') +
      card(104, 8, 94, 78, '#fff7e6') +
      '<path d="M118 68h66" ' + k('#94a3b8', 1.6) + '/>' +
      '<path d="M120 32l16 18 14-8 22 24" ' + k('#b45309', 2.6) + '/>' +
      '<circle cx="134" cy="24" r="7" ' + f('#f3b55a', 1.2) + '/>' +
      t(151, 102, '의존도가 높으면', 9.2, '#b45309') +
      t(151, 116, '외국 경제가 나빠지면', 7.2, '#46506b') +
      t(151, 130, '함께 흔들린다', 7.2, '#46506b') +
      card(204, 8, 94, 78, '#eef3ff') +
      '<rect x="216" y="22" width="30" height="46" rx="3" ' + f('#9fc6f5', 1.4) + '/>' +
      '<rect x="256" y="52" width="30" height="16" rx="3" ' + f('#c7d6ee', 1.4) + '/>' +
      '<path d="M231 18v-6M271 48v-6" ' + k('#1d4ed8', 2) + '/>' +
      t(251, 102, '격차가 벌어진다', 9.2, '#1d4ed8') +
      t(251, 116, '잘 사는 나라와', 7.2, '#46506b') +
      t(251, 130, '못 사는 나라', 7.2, '#46506b');
  } };

  /* 공정 무역 */
  CA.fairtrade = { w: 300, h: 130, d: function () {
    return "" +
      card(4, 10, 134, 76, '#fdecec') +
      fig(32, 70, .9, '#b91c1c') +
      coin(56, 64, 6) +
      arw(48, 44, 84, 44, '#b91c1c', 2.2) +
      '<path d="M96 70h32V42H96z" ' + f('#cbd5e1', 1.5) + '/>' +
      coin(104, 32, 8) + coin(120, 32, 8) +
      t(71, 102, '값을 후려치면', 9.4, '#b91c1c') +
      t(71, 118, '생산자에게 돌아가는 몫이 거의 없다', 7, '#46506b') +
      card(154, 10, 140, 76, '#eafaf0') +
      fig(182, 70, .9, '#047857') +
      coin(206, 58, 7) + coin(222, 58, 7) + coin(238, 58, 7) +
      '<circle cx="264" cy="40" r="14" ' + f('#8ed7a3', 1.6) + '/>' +
      '<path d="M258 40l4 5 8-10" ' + k('#06563a', 2.6) + '/>' +
      t(224, 102, '공정 무역', 9.8, '#047857') +
      t(224, 118, '생산자에게 정당한 대가를 치른다', 7, '#46506b');
  } };


  /* ───────── 단원 IX-1 세계화와 지역화 ───────── */

  function dotp(x, y, c, r) {                   /* 지도 위의 점 */
    return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 5) + '" fill="' + (c || '#e03e3e') +
      '" stroke="' + INK + '" stroke-width="1.3"/>';
  }
  function cup(x, y, c) {                       /* 종이컵 */
    return '<path d="M' + (x - 8) + ' ' + (y - 16) + 'h16l-2 16h-12z" ' + f(c || '#ffffff', 1.4) + '/>' +
      '<path d="M' + (x - 8) + ' ' + (y - 11) + 'h16" ' + k('#2f8f5b', 1.8) + '/>';
  }
  function burger(x, y) {
    return '<path d="M' + (x - 10) + ' ' + (y - 10) + 'q10-9 20 0z" ' + f('#e9a94a', 1.3) + '/>' +
      '<path d="M' + (x - 10) + ' ' + (y - 9) + 'h20v4h-20z" ' + f('#8ed7a3', 1.1) + '/>' +
      '<path d="M' + (x - 10) + ' ' + (y - 5) + 'h20v5h-20z" ' + f('#b06a3c', 1.1) + '/>' +
      '<path d="M' + (x - 10) + ' ' + y + 'h20v4h-20z" ' + f('#e9a94a', 1.3) + '/>';
  }
  function film(x, y) {
    return '<rect x="' + (x - 11) + '" y="' + (y - 9) + '" width="22" height="18" rx="2" ' +
      f('#2f3a4a', 1.2) + '/>' +
      '<path d="M' + (x - 7) + ' ' + (y - 3) + 'l8 4-8 4z" fill="#ffffff"/>';
  }

  /* 한 지역의 병이 온 세계로 */
  CA.pandemicflow = { w: 300, h: 146, d: function () {
    return "" +
      '<circle cx="44" cy="56" r="25" ' + f('#fde2e2', 1.5) + '/>' +
      dotp(44, 56, '#e03e3e', 6) +
      t(44, 112, '한 지역', 9.4, '#b91c1c') +
      arw(74, 56, 98, 56, '#b91c1c', 2.6) +
      '<circle cx="140" cy="56" r="34" ' + f('#f9c6c6', 1.5) + '/>' +
      dotp(130, 46, '#e03e3e', 5) + dotp(150, 60, '#e03e3e', 5) + dotp(134, 68, '#e03e3e', 5) +
      t(140, 112, '한 나라', 9.4, '#b91c1c') +
      arw(180, 56, 204, 56, '#b91c1c', 2.6) +
      '<circle cx="252" cy="56" r="42" ' + f('#9fc6f5', 1.6) + '/>' +
      '<path d="M210 56h84M252 14v84M228 20q-11 36 0 72M276 20q11 36 0 72" ' + k('#1d4ed8', 1.2) + '/>' +
      dotp(236, 38, '#e03e3e', 4) + dotp(266, 44, '#e03e3e', 4) +
      dotp(242, 72, '#e03e3e', 4) + dotp(270, 76, '#e03e3e', 4) +
      t(252, 112, '온 세계', 9.4, '#b91c1c') +
      t(92, 132, '예전에는 여기서 멈췄다', 8.6, '#46506b') +
      t(252, 132, '지금은 여기까지 간다', 8.6, '#b91c1c');
  } };

  /* 세계화 — 국경을 넘나드는 것들 */
  CA.globalflow = { w: 300, h: 144, d: function () {
    var R = [['상품', '#1d4ed8'], ['자본', '#047857'], ['기술', '#b45309'],
             ['문화', '#b91c1c'], ['종교', '#7c3aed']];
    var g = '', i, y;
    for (i = 0; i < 5; i++) {
      y = 30 + i * 18;
      g += tag(10, y - 8, 48, 16, '#ffffff', R[i][0], R[i][1]) +
        arw(62, y, 238, y, R[i][1], 2);
    }
    return "" +
      t(34, 16, '우리 나라', 9.4, '#46506b') +
      t(266, 16, '다른 나라', 9.4, '#46506b') +
      '<path d="M150 24v98" ' + k('#94a3b8', 2, '6 5') + '/>' +
      t(150, 16, '국경', 8.6, '#94a3b8') +
      g +
      t(150, 138, '국경을 넘는 일이 아주 쉬워진 현상 = 세계화', 9.4, '#1d4ed8');
  } };

  /* 지역화 — 그 지역만의 것이 세계의 가치가 된다 */
  CA.localize = { w: 304, h: 176, d: function () {
    function cell(x, y, ic, nm, sub) {
      return card(x, y, 144, 42, '#ffffff') + ic(x + 6, y + 4) +
        t(x + 96, y + 19, nm, 8.8, '#1d4ed8') + t(x + 96, y + 34, sub, 7.4, '#46506b');
    }
    function canyon(a, b) {
      return '<path d="M' + (a + 1) + ' ' + (b + 26) + 'h34l-6 7h-22z" ' + f('#e2a06a', 1.2) + '/>' +
        '<path d="M' + (a + 4) + ' ' + (b + 10) + 'h11v16h-11zM' + (a + 20) + ' ' + (b + 5) +
        'h10v21h-10z" ' + f('#d98f52', 1.2) + '/>';
    }
    function pyramid(a, b) {
      return '<path d="M' + (a + 18) + ' ' + (b + 5) + 'l16 28h-32z" ' + f('#f0cd78', 1.3) + '/>' +
        '<path d="M' + (a + 18) + ' ' + (b + 5) + 'v28" ' + k('#c9a44e', 1.3) + '/>';
    }
    function machu(a, b) {
      return '<path d="M' + (a + 18) + ' ' + (b + 4) + 'l17 29h-34z" ' + f('#8ed7a3', 1.3) + '/>' +
        '<path d="M' + (a + 8) + ' ' + (b + 27) + 'h20M' + (a + 12) + ' ' + (b + 20) + 'h12" ' +
        k('#2f8f5b', 1.5) + '/>';
    }
    function venice(a, b) {
      return '<path d="M' + a + ' ' + (b + 30) + 'h36" ' + k('#7fb6e8', 2.4) + '/>' +
        '<path d="M' + (a + 4) + ' ' + (b + 24) + 'q14 7 28 0-7 5-14 5t-14-5z" ' +
        f('#2f3a4a', 1.2) + '/>' +
        '<path d="M' + (a + 18) + ' ' + (b + 24) + 'v-14" ' + k('#8a6a4a', 1.8) + '/>';
    }
    function music(a, b) {
      return note(a + 11, b + 28, '#7c3aed') + note(a + 26, b + 20, '#7c3aed');
    }
    function bowl(a, b) {
      return '<path d="M' + (a + 6) + ' ' + (b + 20) + 'q12-10 24 0z" ' + f('#fdf0cd', 1.3) + '/>' +
        '<path d="M' + (a + 2) + ' ' + (b + 20) + 'h32l-6 12h-20z" ' + f('#ffffff', 1.4) + '/>' +
        '<path d="M' + a + ' ' + (b + 20) + 'h36" ' + k('#1b2330', 1.5) + '/>';
    }
    return "" +
      t(152, 14, '그 지역만의 것이 세계의 가치가 된다', 10, '#047857') +
      cell(4, 22, canyon, '그랜드 캐니언', '미국') +
      cell(156, 22, pyramid, '피라미드', '이집트') +
      cell(4, 68, machu, '마추픽추', '페루') +
      cell(156, 68, venice, '물의 도시 베네치아', '이탈리아') +
      cell(4, 114, music, '클래식의 도시 빈', '오스트리아') +
      cell(156, 114, bowl, '음식이 맛있는 나라', '한국') +
      t(152, 172, '지리적 표시제 · 장소 마케팅이 이런 지역화의 방법이다', 8.4, '#46506b');
  } };

  /* 세계화와 지역화가 가능해진 이유 */
  CA.globalcause = { w: 298, h: 134, d: function () {
    return "" +
      card(6, 10, 128, 60, '#eef3ff') +
      '<path d="M30 42l28-8 8-10 6 2-4 10 18-6 4 6-26 16z" ' + f('#9fc6f5', 1.3) + '/>' +
      '<path d="M86 48q10-10 22 0M90 54q6-6 14 0" ' + k('#1d4ed8', 2) + '/>' +
      '<circle cx="97" cy="60" r="2.4" fill="#1d4ed8"/>' +
      t(70, 86, '교통 · 통신의 발달', 9.4, '#1d4ed8') +
      card(166, 10, 128, 60, '#eafaf0') +
      '<circle cx="206" cy="40" r="17" ' + f('#8ed7a3', 1.5) + '/>' +
      '<path d="M189 40h34M206 23v34M196 28q10 12 0 24M216 28q-10 12 0 24" ' + k('#2f8f5b', 1.3) + '/>' +
      arw(230, 40, 258, 40, '#047857', 2.2) +
      t(272, 44, '자유', 8, '#047857') +
      t(230, 86, 'WTO — 자유로운 거래', 9.4, '#047857') +
      arw(150, 94, 150, 108, '#46506b', 2.4) +
      t(150, 126, '세계화 · 지역화', 11.5, '#46506b');
  } };

  /* 글로컬리제이션 */
  CA.glocal = { w: 300, h: 128, d: function () {
    return "" +
      card(4, 10, 86, 72, '#eef3ff') +
      burger(47, 42) +
      t(47, 70, '세계 공통 메뉴', 8.2, '#1d4ed8') +
      t(100, 50, '+', 15, '#46506b') +
      card(112, 10, 86, 72, '#eafaf0') +
      '<path d="M135 36q20-9 40 0-8 12-20 12t-20-12z" ' + f('#fdf0cd', 1.3) + '/>' +
      '<path d="M131 36h48" ' + k('#2f8f5b', 1.8) + '/>' +
      t(155, 70, '그 나라의 입맛', 8.2, '#047857') +
      t(208, 50, '=', 15, '#46506b') +
      card(220, 10, 76, 72, '#fff7e6') +
      burger(258, 38) +
      '<path d="M242 54q16-7 32 0" ' + k('#b45309', 2) + '/>' +
      t(258, 70, '현지화 메뉴', 8.2, '#b45309') +
      t(150, 102, '글로컬리제이션', 11, '#b45309') +
      t(150, 120, '세계화하면서 그 지역에 맞게 바꾸는 전략', 9, '#46506b');
  } };

  /* 공간적 분업 */
  CA.spacedivide = { w: 304, h: 142, d: function () {
    return "" +
      card(4, 8, 94, 76, '#eef3ff') +
      bldg(32, 64, 38, 40, '#a8bdd8') +
      t(51, 100, '본사', 10, '#1d4ed8') +
      t(51, 114, '본국에 둔다', 7.6, '#46506b') +
      t(51, 128, '의사 결정 · 기획', 7.2, '#46506b') +
      card(104, 8, 94, 76, '#fff7e6') +
      '<rect x="128" y="30" width="46" height="34" rx="4" ' + f('#ffffff', 1.4) + '/>' +
      '<path d="M138 56l8-12 8 8 8-16" ' + k('#b45309', 2.2) + '/>' +
      fig(151, 78, .5, '#b45309') +
      t(151, 100, '연구소', 10, '#b45309') +
      t(151, 114, '교육 수준이 높은 나라', 7.2, '#46506b') +
      t(151, 128, '우수한 인재가 많은 곳', 7.2, '#46506b') +
      card(204, 8, 94, 76, '#eafaf0') +
      factory(222, 70, .62) +
      t(251, 100, '공장', 10, '#047857') +
      t(251, 114, '개발 도상국', 7.6, '#46506b') +
      t(251, 128, '값싼 노동력', 7.2, '#46506b');
  } };

  /* 삼성전자의 공간적 분업 */
  CA.samsungmap = { w: 300, h: 200, d: function () {
    return "" +
      t(150, 12, '본사 · 연구소 · 공장을 세계에 나눠 배치한다', 9.6, '#46506b') +
      '<g transform="translate(0,18)">' + worldmap([], true) + '</g>' +
      dotp(80, 50, '#f2a93b') + dotp(150, 44, '#f2a93b') + dotp(280, 66, '#f2a93b') +
      dotp(256, 70, '#2f8f5b') + dotp(248, 78, '#2f8f5b') + dotp(112, 108, '#2f8f5b') +
      dotp(74, 62, '#2f8f5b') +
      dotp(268, 62, '#2f6df6', 6) +
      dotp(20, 168, '#2f6df6', 5) + t(62, 172, '본사 — 한국', 7.8, '#1d4ed8') +
      dotp(130, 168, '#f2a93b', 5) + t(206, 172, '연구소 — 미국 · 영국 · 일본', 7.6, '#b45309') +
      dotp(20, 188, '#2f8f5b', 5) + t(118, 192, '공장 — 베트남 · 중국 · 브라질 · 미국', 7.6, '#047857');
  } };

  /* 다국적 기업의 빛과 그늘 */
  CA.mnceffect = { w: 304, h: 134, d: function () {
    return "" +
      tbl(6, 8, 76, '', null, '#f1f5f9') +
      tbl(82, 8, 108, '좋은 점', '#047857', '#eafaf0', 9) +
      tbl(190, 8, 108, '나쁜 점', '#b91c1c', '#fdecec', 9) +
      tbl(6, 34, 76, '본국', null, '#f8fafc', 9) +
      tbl(82, 34, 108, '큰 수익이 들어온다', null, '#ffffff', 8) +
      tbl(190, 34, 108, '공장이 떠나 일자리가 준다', null, '#ffffff', 7.4) +
      tbl(6, 60, 76, '받아들인', null, '#f8fafc', 8.4) +
      tbl(82, 60, 108, '일자리 · 새 기술', null, '#ffffff', 8) +
      tbl(190, 60, 108, '국내 기업이 밀려난다', null, '#ffffff', 7.8) +
      t(44, 82, '나라', 8.4, '#46506b') +
      t(152, 104, '본국은 실업률이 오르고', 8.8, '#b91c1c') +
      t(152, 124, '받아들인 나라는 자립력이 떨어질 수 있다', 8.8, '#b91c1c');
  } };

  /* 세계 도시 */
  CA.worldcity = { w: 302, h: 136, d: function () {
    function sky(x, c) {
      return bldg(x, 76, 18, 34, c) + bldg(x + 22, 76, 16, 50, c) + bldg(x + 42, 76, 20, 40, c);
    }
    return "" +
      t(151, 14, '세계에서 가장 큰 역할을 하는 도시들', 9.6, '#46506b') +
      card(4, 20, 94, 64, '#eef3ff') + sky(20, '#9fc6f5') +
      t(51, 100, '런던', 10.4, '#1d4ed8') +
      t(51, 116, '유럽 금융의 중심', 7.6, '#46506b') +
      card(104, 20, 94, 64, '#fdecec') + sky(120, '#f0a0a0') +
      t(151, 100, '도쿄', 10.4, '#b91c1c') +
      t(151, 116, '혼다 · 소니 본사', 7.6, '#46506b') +
      card(204, 20, 94, 64, '#eafaf0') + sky(220, '#8ed7a3') +
      t(251, 100, '뉴욕', 10.4, '#047857') +
      t(251, 116, '화이자 · 펩시 본사', 7.6, '#46506b') +
      t(151, 132, '세계적 기업의 본사가 모이는 곳', 8.8, '#46506b');
  } };

  /* 세계 도시가 하는 일 */
  CA.worldcityrole = { w: 304, h: 134, d: function () {
    return "" +
      card(4, 8, 94, 76, '#eef3ff') +
      bldg(26, 70, 20, 40, '#a8bdd8') + bldg(52, 70, 20, 32, '#a8bdd8') +
      crown(60, 30, .62) +
      t(51, 100, '본사가 모인다', 9.2, '#1d4ed8') +
      t(51, 116, '세계적 기업의 머리', 7.4, '#46506b') +
      card(104, 8, 94, 76, '#eafaf0') +
      '<path d="M118 70h66" ' + k('#94a3b8', 1.6) + '/>' +
      '<path d="M122 64l16-14 16 10 20-26" ' + k('#047857', 2.6) + '/>' +
      won(130, 28, 9) +
      t(151, 100, '국제 금융', 9.2, '#047857') +
      t(151, 116, '뉴욕의 월 스트리트', 7.4, '#46506b') +
      card(204, 8, 94, 76, '#fff7e6') +
      '<rect x="218" y="26" width="30" height="24" rx="3" ' + f('#ffffff', 1.3) + '/>' +
      '<rect x="254" y="26" width="30" height="24" rx="3" ' + f('#ffffff', 1.3) + '/>' +
      '<rect x="236" y="56" width="30" height="20" rx="3" ' + f('#ffffff', 1.3) + '/>' +
      t(233, 42, '금융', 7.4, '#b45309') + t(269, 42, '보험', 7.4, '#b45309') +
      t(251, 70, '부동산', 7.4, '#b45309') +
      t(251, 100, '생산자 서비스업', 9.2, '#b45309') +
      t(251, 116, '기업을 위한 서비스', 7.4, '#46506b');
  } };

  /* 국가 간 빈부 격차 */
  CA.richpoorgap = { w: 300, h: 140, d: function () {
    return "" +
      '<path d="M26 100h256M26 16v84" ' + k('#94a3b8', 1.8) + '/>' +
      '<path d="M34 88L272 22" ' + k('#e03e3e', 3) + '/>' +
      '<path d="M34 94L272 76" ' + k('#2f6df6', 3) + '/>' +
      '<path d="M272 22v54" ' + k('#b45309', 2, '5 4') + '/>' +
      t(286, 24, '선진국', 8.4, '#e03e3e') +
      t(286, 80, '개발', 8, '#2f6df6') +
      t(286, 90, '도상국', 8, '#2f6df6') +
      t(248, 52, '격차', 8.4, '#b45309') +
      t(150, 114, '모두 조금씩 잘살게 되었지만', 9, '#46506b') +
      t(150, 134, '잘사는 나라가 훨씬 더 많이 잘살게 되었다', 9.4, '#b91c1c');
  } };

  /* 격차가 벌어지는 까닭 */
  CA.whygap = { w: 300, h: 130, d: function () {
    return "" +
      card(4, 10, 138, 76, '#fdecec') +
      '<rect x="24" y="26" width="46" height="30" rx="4" ' + f('#ffffff', 1.4) + '/>' +
      '<path d="M32 50l10-12 10 8 10-14" ' + k('#b91c1c', 2.2) + '/>' +
      won(100, 40, 14) +
      t(73, 72, '우수한 기술 · 많은 자본', 8.4, '#b91c1c') +
      t(73, 102, '선진국', 10, '#b91c1c') +
      t(73, 118, '돈을 많이 버는 서비스업', 7.6, '#46506b') +
      card(158, 10, 138, 76, '#eef3ff') +
      '<path d="M176 60q12-9 24 0" ' + k('#d8a62c', 2.6) + '/>' +
      '<path d="M180 50v8M188 46v12M196 50v8" ' + k('#d8a62c', 2.2) + '/>' +
      factory(222, 62, .5) +
      t(227, 72, '농업 · 제조업 중심', 8.4, '#1d4ed8') +
      t(227, 102, '개발 도상국', 10, '#1d4ed8') +
      t(227, 118, '경쟁 상대가 되기 어렵다', 7.6, '#46506b');
  } };

  /* 문화 획일화 */
  CA.monoculture = { w: 302, h: 134, d: function () {
    function town(x, nm) {
      return card(x, 20, 94, 64, '#ffffff') +
        cup(x + 24, 62) + burger(x + 48, 56) + film(x + 74, 54) +
        t(x + 47, 78, nm, 8.6, '#46506b');
    }
    return "" +
      t(151, 14, '어느 나라를 가도 비슷해진다', 9.8, '#b91c1c') +
      town(4, '파리') + town(104, '방콕') + town(204, '서울') +
      t(151, 102, '문화 획일화', 11, '#b91c1c') +
      t(151, 120, '커피도 햄버거도 영화도 언어도 하나로 — 다양성이 줄어든다', 8.2, '#46506b');
  } };

  /* 보편 윤리와 특수 윤리 */
  CA.universalspecial = { w: 304, h: 146, d: function () {
    return "" +
      card(4, 10, 128, 76, '#eafaf0') +
      '<circle cx="40" cy="36" r="11" ' + f('#8ed7a3', 1.4) + '/>' +
      '<path d="M35 36l4 5 7-9" ' + k('#06563a', 2.2) + '/>' +
      t(92, 30, '생명은 소중하다', 7.8, '#047857') +
      t(92, 44, '모두 평등해야 한다', 7.8, '#047857') +
      t(68, 66, '대부분이 인정하는 옳은 행동', 7.8, '#46506b') +
      t(68, 102, '보편 윤리', 10, '#047857') +
      card(172, 10, 128, 76, '#fff7e6') +
      t(236, 28, '티베트 형제 공처', 8.2, '#b45309') +
      fig(200, 56, .78, '#b45309') + fig(222, 56, .78, '#b45309') +
      '<path d="M194 60h34" ' + k('#b45309', 2) + '/>' +
      t(211, 70, '형제 둘', 7.2, '#b45309') +
      '<path d="M234 46h16" ' + k('#94a3b8', 2, '4 3') + '/>' +
      fig(262, 56, .78, '#b91c1c') +
      t(262, 70, '아내 하나', 7.2, '#b91c1c') +
      t(236, 82, '농사가 어려워 남자가 장사를 떠난다', 6.8, '#46506b') +
      t(236, 102, '특수 윤리', 10, '#b45309') +
      t(152, 124, '세계화로 둘이 부딪히는 일이 늘었다', 9.4, '#b91c1c') +
      t(152, 142, '어느 쪽이 옳다고 단정하기 어렵다', 9, '#46506b');
  } };

  /* 문화 상대주의와 그 한계 */
  CA.relativelimit = { w: 300, h: 132, d: function () {
    return "" +
      card(4, 10, 138, 78, '#eafaf0') +
      '<circle cx="73" cy="40" r="17" ' + f('#8ed7a3', 1.5) + '/>' +
      '<path d="M65 40l6 7 12-15" ' + k('#06563a', 2.8) + '/>' +
      t(73, 76, '옳다 그르다 하기 전에', 8, '#047857') +
      t(73, 104, '문화 상대주의', 9.8, '#047857') +
      t(73, 120, '그 문화의 사정을 이해한다', 7.4, '#46506b') +
      card(158, 10, 138, 78, '#fdecec') +
      '<circle cx="227" cy="40" r="17" ' + f('#f5a7a7', 1.5) + '/>' +
      '<path d="M219 32l16 16M235 32l-16 16" ' + k('#7a1d1d', 2.8) + '/>' +
      t(227, 76, '여기까지는 안 된다', 8, '#b91c1c') +
      t(227, 104, '상대주의의 한계', 9.8, '#b91c1c') +
      t(227, 120, '생명 · 자유 · 평등을 해치는 문화', 7.2, '#46506b');
  } };

  /* ───────── 단원 IX-2 국제 사회와 평화 ───────── */

  /* 두 나라 싸움에 여러 나라가 얽힌다 */
  CA.warweb = { w: 300, h: 136, d: function () {
    return "" +
      card(28, 44, 80, 44, '#eef3ff') + t(68, 70, '러시아', 10, '#1d4ed8') +
      card(192, 44, 80, 44, '#fdecec') + t(232, 70, '우크라이나', 9.4, '#b91c1c') +
      '<path d="M132 56l16 10-16 10M168 56l-16 10 16 10" ' + k('#b91c1c', 2.6) + '/>' +
      '<path d="M150 46v-8M150 86v8" ' + k('#b91c1c', 2.2) + '/>' +
      tag(6, 8, 56, 18, '#ffffff', '미국', '#46506b') +
      tag(72, 8, 56, 18, '#ffffff', '폴란드', '#46506b') +
      tag(172, 8, 56, 18, '#ffffff', '중국', '#46506b') +
      tag(238, 8, 56, 18, '#ffffff', '한국', '#46506b') +
      '<path d="M34 26l28 16M100 26l-20 16M200 26l24 16M266 26l-20 16" ' + k('#94a3b8', 1.8, '4 4') + '/>' +
      t(150, 110, '두 나라의 싸움처럼 보여도', 9.2, '#46506b') +
      t(150, 130, '뒤에는 수많은 나라가 얽혀 있다 — 국제 사회', 9.6, '#1d4ed8');
  } };

  /* 국제 사회의 세 가지 특징 */
  CA.intlfeature3 = { w: 304, h: 136, d: function () {
    return "" +
      card(4, 8, 94, 76, '#eef3ff') +
      '<path d="M38 56l13-18 13 18z" ' + f('#9fc6f5', 1.4) + '/>' +
      '<path d="M30 68h42" ' + k('#1d4ed8', 2.2) + '/>' +
      t(51, 30, '우리 나라 먼저', 7.6, '#1d4ed8') +
      t(51, 100, '자국의 이익 우선', 9, '#1d4ed8') +
      t(51, 116, '두 나라가 부딪히면', 7.2, '#46506b') +
      t(51, 130, '갈등이 된다', 7.2, '#46506b') +
      card(104, 8, 94, 76, '#fdecec') +
      '<rect x="128" y="28" width="46" height="32" rx="4" ' + f('#e2e8f0', 1.4) + '/>' +
      t(151, 48, '중앙 정부', 7.8, '#46506b') +
      '<path d="M124 24l54 42M178 24l-54 42" ' + k('#b91c1c', 2.8) + '/>' +
      t(151, 100, '중앙 정부가 없다', 9, '#b91c1c') +
      t(151, 116, '막 나가는 나라가 있어도', 7.2, '#46506b') +
      t(151, 130, '강제할 방법이 없다', 7.2, '#46506b') +
      card(204, 8, 94, 76, '#fff7e6') +
      '<rect x="216" y="24" width="34" height="38" rx="4" ' + f('#e9a94a', 1.4) + '/>' +
      '<rect x="258" y="46" width="28" height="16" rx="4" ' + f('#f3d9a0', 1.3) + '/>' +
      t(233, 48, '강대국', 7.4, '#7a4a12') +
      t(251, 100, '힘의 논리', 9, '#b45309') +
      t(251, 116, '강한 나라가 마음대로', 7.2, '#46506b') +
      t(251, 130, '해도 막기 어렵다', 7.2, '#46506b');
  } };

  /* 갈등의 씨앗 */
  CA.conflictcause = { w: 302, h: 134, d: function () {
    return "" +
      card(4, 8, 94, 76, '#fdecec') +
      fig(36, 60, .8, '#b91c1c') + fig(66, 60, .8, '#1d4ed8') +
      '<path d="M48 36l8 8-8 8M58 36l-8 8 8 8" ' + k('#b91c1c', 2.2) + '/>' +
      t(51, 100, '민족', 10, '#b91c1c') +
      t(51, 116, '슬로바키아 · 헝가리인의', 6.8, '#46506b') +
      t(51, 128, '분리 독립 운동', 6.8, '#46506b') +
      card(104, 8, 94, 76, '#eef3ff') +
      '<path d="M130 66V34M122 42h16" ' + k('#1d4ed8', 2.6) + '/>' +
      '<path d="M166 66V36M158 44q8-10 16 0" ' + k('#047857', 2.6) + '/>' +
      '<path d="M146 46l4 4-4 4M152 46l-4 4 4 4" ' + k('#b91c1c', 2) + '/>' +
      t(151, 100, '종교', 10, '#1d4ed8') +
      t(151, 116, '믿음이 다르다는 이유로', 6.8, '#46506b') +
      t(151, 128, '싸우는 일이 많다', 6.8, '#46506b') +
      card(204, 8, 94, 76, '#eafaf0') +
      '<path d="M218 62q14-16 32-8 16 8 30 2v10z" ' + f('#8ed7a3', 1.4) + '/>' +
      '<path d="M248 54V28" ' + k('#46506b', 2) + '/>' +
      '<path d="M248 28h16v10h-16z" ' + f('#f0a0a0', 1.2) + '/>' +
      t(251, 100, '영토', 10, '#047857') +
      t(251, 116, '카슈미르 분쟁처럼', 6.8, '#46506b') +
      t(251, 128, '땅을 차지하려는 다툼', 6.8, '#46506b');
  } };

  /* 국제 사회의 협력 */
  CA.cooperate3 = { w: 304, h: 136, d: function () {
    return "" +
      card(4, 8, 94, 76, '#fdecec') +
      '<path d="M24 66h52l-6-22H30z" ' + f('#cbd5e1', 1.4) + '/>' +
      '<path d="M24 50l20 16M44 44l20 22" ' + k('#8a97a8', 1.6) + '/>' +
      '<path d="M46 30q8-8 16 0" ' + k('#b91c1c', 2) + '/>' +
      '<path d="M66 26h14v8H66z" ' + f('#ffffff', 1.2) + '/>' +
      '<path d="M69 30h8M73 26v8" ' + k('#b91c1c', 1.6) + '/>' +
      t(51, 100, '재난 구호', 9.4, '#b91c1c') +
      t(51, 116, '2023년 튀르키예 지진에', 6.8, '#46506b') +
      t(51, 128, '세계가 지원을 보냈다', 6.8, '#46506b') +
      card(104, 8, 94, 76, '#eef3ff') +
      fig(138, 62, .9, '#2f6df6') +
      '<path d="M128 26h22v12h-22z" ' + f('#9fc6f5', 1.3) + '/>' +
      '<path d="M166 66V30" ' + k('#46506b', 2) + '/>' +
      '<path d="M166 30h18v10h-18z" ' + f('#bcd3f5', 1.2) + '/>' +
      t(151, 100, '평화 유지군', 9.4, '#1d4ed8') +
      t(151, 116, '치안이 나쁜 지역에', 6.8, '#46506b') +
      t(151, 128, '국제 연합이 보낸다', 6.8, '#46506b') +
      card(204, 8, 94, 76, '#eafaf0') +
      '<circle cx="234" cy="40" r="12" ' + f('#f3d9a0', 1.3) + '/>' +
      '<path d="M222 40h24M234 28v24" ' + k('#b45309', 1.2) + '/>' +
      '<path d="M258 46q10-12 20 0" ' + k('#047857', 2.2) + '/>' +
      '<path d="M216 66h66" ' + k('#2f8f5b', 2.2) + '/>' +
      t(251, 100, '약속과 만남', 9.4, '#047857') +
      t(251, 116, '정상 회담 · 올림픽', 6.8, '#46506b') +
      t(251, 128, '기후 협약', 6.8, '#46506b');
  } };

  /* 국제 사회의 네 주인공 */
  CA.actor4 = { w: 304, h: 156, d: function () {
    function box4(x, y, bg, icon, nm, sub) {
      return card(x, y, 144, 58, bg) + icon +
        t(x + 96, y + 26, nm, 9.4, '#1b2330') + t(x + 96, y + 42, sub, 7.2, '#46506b');
    }
    return "" +
      box4(4, 8, '#eef3ff',
        '<path d="M26 54V22" ' + k('#46506b', 2.2) + '/>' +
        '<path d="M26 22h24v12H26z" ' + f('#9fc6f5', 1.3) + '/>', '국가', '가장 기본이 되는 주체') +
      box4(156, 8, '#eafaf0',
        '<circle cx="180" cy="36" r="14" ' + f('#8ed7a3', 1.4) + '/>' +
        '<path d="M166 36h28M180 22v28" ' + k('#2f8f5b', 1.2) + '/>', '정부 간 국제기구', 'UN · EU · OECD') +
      box4(4, 74, '#fff7e6',
        '<circle cx="28" cy="92" r="6" ' + f('#f3c6a0', 1.3) + '/>' +
        '<path d="M28 98v12M18 102h20M22 122l6-12 6 12" ' + k('#b45309', 2.2) + '/>',
        '국제 비정부 기구', '민간이 만든 단체') +
      box4(156, 74, '#fdecec',
        fig(180, 124, .95, '#b91c1c'), '개인', '영향력 있는 사람') +
      t(152, 150, '이 넷이 서로 얽혀 국제 사회를 움직인다', 9.2, '#46506b');
  } };

  /* 국가 */
  CA.statepower = { w: 300, h: 142, d: function () {
    return "" +
      card(4, 10, 88, 66, '#eafaf0') +
      '<path d="M22 56q14-12 30-4 12 6 22 0v12H22z" ' + f('#8ed7a3', 1.4) + '/>' +
      t(48, 92, '영토', 9.6, '#047857') +
      t(104, 44, '+', 14, '#46506b') +
      card(116, 10, 88, 66, '#eef3ff') +
      fig(142, 64, .72, '#2f6df6') + fig(160, 64, .72, '#2f6df6') + fig(178, 64, .72, '#2f6df6') +
      t(160, 92, '국민', 9.6, '#1d4ed8') +
      t(216, 44, '+', 14, '#46506b') +
      card(228, 10, 68, 66, '#fff7e6') +
      crown(262, 50, .9) +
      t(262, 92, '주권', 9.6, '#b45309') +
      t(150, 116, '이 셋을 갖춘 곳이 국가다', 9.6, '#46506b') +
      t(150, 136, '외교 · 조약 · 동맹, 때로는 전쟁까지 한다', 8.8, '#b91c1c');
  } };

  /* 정부 간 국제기구 */
  CA.igo3 = { w: 302, h: 136, d: function () {
    return "" +
      card(4, 8, 94, 76, '#eef3ff') +
      '<circle cx="51" cy="40" r="18" ' + f('#9fc6f5', 1.5) + '/>' +
      '<path d="M33 40h36M51 22v36M40 26q10 14 0 28M62 26q-10 14 0 28" ' + k('#1d4ed8', 1.2) + '/>' +
      '<path d="M30 60q21 14 42 0" ' + k('#1d4ed8', 2) + '/>' +
      t(51, 100, '국제 연합 UN', 9.2, '#1d4ed8') +
      t(51, 116, '평화 유지군 · 유네스코', 6.8, '#46506b') +
      t(51, 128, '안전 보장 이사회', 6.8, '#46506b') +
      card(104, 8, 94, 76, '#eafaf0') +
      '<circle cx="151" cy="42" r="19" ' + f('#2f4a9c', 1.5) + '/>' +
      star5(151, 26, 4, '#f2c84b') + star5(167, 42, 4, '#f2c84b') +
      star5(151, 58, 4, '#f2c84b') + star5(135, 42, 4, '#f2c84b') +
      t(151, 100, '유럽 연합 EU', 9.2, '#047857') +
      t(151, 116, '유럽이 힘을 모아', 6.8, '#46506b') +
      t(151, 128, '강대국을 견제한다', 6.8, '#46506b') +
      card(204, 8, 94, 76, '#fff7e6') +
      '<path d="M220 66h62" ' + k('#94a3b8', 1.6) + '/>' +
      '<path d="M226 66V44M242 66V34M258 66V48M274 66V28" ' + k('#b45309', 5) + '/>' +
      t(251, 100, 'OECD', 9.2, '#b45309') +
      t(251, 116, '회원국이 함께 잘살자는', 6.8, '#46506b') +
      t(251, 128, '경제 협력 개발 기구', 6.8, '#46506b');
  } };

  /* 국제 비정부 기구 */
  CA.ngo3 = { w: 302, h: 136, d: function () {
    return "" +
      card(4, 8, 94, 76, '#fdecec') +
      '<path d="M40 28h22v14h14v22H40z" ' + f('#ffffff', 1.4) + '/>' +
      '<path d="M44 36h14M51 29v14" ' + k('#b91c1c', 2.6) + '/>' +
      fig(72, 64, .5, '#b91c1c') +
      t(51, 100, '국경 없는 의사회', 8.8, '#b91c1c') +
      t(51, 116, '치료가 필요한 곳이면', 6.8, '#46506b') +
      t(51, 128, '어디든 찾아간다', 6.8, '#46506b') +
      card(104, 8, 94, 76, '#eafaf0') +
      '<circle cx="151" cy="40" r="17" ' + f('#8ed7a3', 1.4) + '/>' +
      '<path d="M151 54V34" ' + k('#2f8f5b', 2.2) + '/>' +
      '<path d="M151 36q-12-6-12-10 10-2 12 10M151 36q12-6 12-10-10-2-12 10" ' + f('#2f8f5b', 1) + '/>' +
      t(151, 100, '그린피스', 8.8, '#047857') +
      t(151, 116, '지구 환경을 지키려고', 6.8, '#46506b') +
      t(151, 128, '만든 단체', 6.8, '#46506b') +
      card(204, 8, 94, 76, '#fff7e6') +
      '<circle cx="251" cy="42" r="18" ' + f('#f3d9a0', 1.4) + '/>' +
      '<path d="M244 46v-8a7 7 0 0 1 14 0v8" ' + k('#b45309', 2.2) + '/>' +
      '<path d="M240 46h22v12h-22z" ' + f('#ffffff', 1.3) + '/>' +
      t(251, 100, '국제 앰네스티', 8.8, '#b45309') +
      t(251, 116, '인권을 침해받는 사람을', 6.8, '#46506b') +
      t(251, 128, '구하려는 단체', 6.8, '#46506b');
  } };

  /* 개인도 주체가 된다 */
  CA.individual = { w: 298, h: 126, d: function () {
    return "" +
      fig(48, 72, 1.15, '#b45309') +
      '<path d="M72 30h86v24H72z" ' + f('#ffffff', 1.5) + '/>' +
      '<path d="M78 42l-8 10 14-4z" ' + f('#ffffff', 1.5) + '/>' +
      t(116, 46, '한 마디가 세계로', 8.6, '#b45309') +
      arw(164, 42, 196, 42, '#b45309', 2.4) +
      '<circle cx="238" cy="52" r="26" ' + f('#9fc6f5', 1.6) + '/>' +
      '<path d="M212 52h52M238 26v52M224 32q12 20 0 40M252 32q-12 20 0 40" ' + k('#1d4ed8', 1.2) + '/>' +
      t(150, 102, '개인도 국제 사회의 행위 주체다', 9.6, '#46506b') +
      t(150, 120, '교황 · 대통령 · UN 사무총장의 말은 무겁게 받아들여진다', 8.2, '#46506b');
  } };

  /* 소극적 평화와 적극적 평화 */
  CA.peacepair = { w: 304, h: 148, d: function () {
    return "" +
      card(4, 10, 138, 80, '#eef3ff') +
      '<circle cx="40" cy="60" r="12" ' + f('#6b7788', 1.4) + '/>' +
      '<path d="M46 50l7-9" ' + k('#6b7788', 2.4) + '/>' +
      '<path d="M26 46l28 28M54 46l-28 28" ' + k('#b91c1c', 2.8) + '/>' +
      '<path d="M78 62h26v9H78z" ' + f('#6b7788', 1.3) + '/>' +
      '<path d="M84 62v-9h9v9" ' + k('#6b7788', 2.2) + '/>' +
      '<path d="M74 48l34 28M108 48l-34 28" ' + k('#b91c1c', 2.8) + '/>' +
      t(92, 30, '전쟁도 테러도 없다', 7.8, '#1d4ed8') +
      t(73, 106, '소극적 평화', 10.2, '#1d4ed8') +
      t(73, 122, '직접적 · 물리적 폭력이 없는 상태', 7.2, '#46506b') +
      t(73, 136, '그런데 이것만으로 평화일까?', 7.2, '#b91c1c') +
      card(158, 10, 138, 80, '#eafaf0') +
      '<circle cx="190" cy="34" r="10" ' + f('#8ed7a3', 1.3) + '/>' +
      '<path d="M185 34l4 5 7-9" ' + k('#06563a', 2) + '/>' +
      t(248, 30, '빈곤 · 기아도 없고', 7.4, '#047857') +
      t(248, 46, '차별 · 억압도 없다', 7.4, '#047857') +
      fig(190, 80, .8, '#047857') + fig(212, 80, .8, '#047857') + fig(234, 80, .8, '#047857') +
      t(269, 70, '모두 사람답게', 7, '#46506b') +
      t(227, 106, '적극적 평화', 10.2, '#047857') +
      t(227, 122, '구조적 · 문화적 폭력까지 사라진 상태', 7.2, '#46506b') +
      t(227, 136, '갈퉁이 말한 진짜 평화', 7.2, '#047857');
  } };

  /* 폭력의 세 얼굴 */
  CA.violence3 = { w: 304, h: 140, d: function () {
    return "" +
      card(4, 8, 94, 76, '#fdecec') +
      fig(32, 76, .75, '#b91c1c') + fig(74, 76, .75, '#46506b') +
      '<path d="M40 60h15" ' + k('#b91c1c', 3) + '/>' +
      '<path d="M58 60a4.5 4.5 0 1 0 .1 0z" ' + f('#b91c1c', 1.2) + '/>' +
      '<path d="M64 54l5-4M64 60h6M64 66l5 4" ' + k('#b91c1c', 2) + '/>' +
      t(51, 100, '직접적 폭력', 9.2, '#b91c1c') +
      t(51, 116, '전쟁 · 테러 · 폭행', 7.2, '#46506b') +
      t(51, 130, '때린 사람이 보인다', 7, '#46506b') +
      card(104, 8, 94, 76, '#eef3ff') +
      '<rect x="118" y="24" width="66" height="14" rx="3" ' + f('#c7d6ee', 1.3) + '/>' +
      t(151, 34, '제도 · 구조', 7.2, '#46506b') +
      arw(151, 42, 151, 54, '#1d4ed8', 2.2) +
      fig(132, 76, .72, '#1d4ed8') + fig(170, 76, .72, '#1d4ed8') +
      t(151, 100, '구조적 폭력', 9.2, '#1d4ed8') +
      t(151, 116, '빈곤 · 제도적 차별', 7.2, '#46506b') +
      t(151, 130, '가해자가 보이지 않는다', 6.8, '#46506b') +
      card(204, 8, 94, 76, '#fff7e6') +
      '<path d="M226 34q18-14 34 0 10 12-4 18h-26q-14-6-4-18z" ' + f('#f3d9a0', 1.4) + '/>' +
      t(243, 44, '당연하지', 7.4, '#b45309') +
      '<path d="M234 52l-6 10 12-6z" ' + f('#f3d9a0', 1.4) + '/>' +
      fig(268, 76, .72, '#b45309') +
      t(251, 100, '문화적 폭력', 9.2, '#b45309') +
      t(251, 116, '종교 · 이념 · 언어가', 7.2, '#46506b') +
      t(251, 130, '앞의 둘을 정당화한다', 6.8, '#46506b');
  } };

  /* ───────── 단원 IX-3 동아시아의 평화와 통일 ───────── */

  /* 분단의 70년 */
  CA.divide70 = { w: 312, h: 136, d: function () {
    function node(x, y1, y2, c, bg) {
      return '<circle cx="' + x + '" cy="40" r="7" ' + f(bg, 1.6) + '/>' +
        t(x, 24, y1, 8.6, c) + t(x, 62, y2, 7.2, '#46506b');
    }
    return "" +
      '<path d="M22 40h268" ' + k('#94a3b8', 2.4) + '/>' +
      node(40, '1945', '광복', '#047857', '#8ed7a3') +
      node(118, '분할 점령', '미국 · 소련이 38선을 긋다', '#b45309', '#f3d9a0') +
      node(196, '1950', '6 · 25 전쟁', '#b91c1c', '#f5a7a7') +
      node(274, '지금', '70년째 분단', '#1d4ed8', '#9fc6f5') +
      t(156, 92, '미국과 소련 사이가 나빠지자', 9, '#46506b') +
      t(156, 110, '남과 북의 사이까지 함께 나빠졌다', 9, '#46506b') +
      t(156, 132, '이것이 분단의 시작이었다', 9.4, '#b91c1c');
  } };

  /* 분단 비용과 통일 비용 */
  CA.costcompare = { w: 304, h: 148, d: function () {
    return "" +
      t(152, 14, '어느 쪽이 더 많이 들까?', 10, '#46506b') +
      t(16, 38, '분단', 8.6, '#b91c1c') + t(16, 50, '비용', 8.6, '#b91c1c') +
      '<rect x="40" y="26" width="248" height="26" rx="4" ' + f('#f5a7a7', 1.4) + '/>' +
      t(164, 44, '국방비 · 외교비 · 투자 비용 — 분단된 동안 영원히', 8.4, '#7a1d1d') +
      t(16, 80, '통일', 8.6, '#047857') + t(16, 92, '비용', 8.6, '#047857') +
      '<rect x="40" y="68" width="84" height="26" rx="4" ' + f('#f3d9a0', 1.4) + '/>' +
      t(82, 86, '통일 직후 잠깐', 8, '#7a4a12') +
      '<rect x="124" y="68" width="164" height="26" rx="4" ' + f('#8ed7a3', 1.4) + '/>' +
      t(206, 86, '그 뒤로는 오히려 이익이 되어 돌아온다', 8, '#06563a') +
      t(152, 122, '짧게 보면 통일 비용이 커 보이지만', 9, '#46506b') +
      t(152, 142, '길게 보면 통일하는 쪽이 이득이다', 9.6, '#047857');
  } };

  /* 통일이 주는 것 */
  CA.unibenefit = { w: 304, h: 136, d: function () {
    return "" +
      card(4, 8, 94, 76, '#eef3ff') +
      '<path d="M34 64q17-20 34 0" ' + k('#1d4ed8', 2.6) + '/>' +
      '<path d="M51 44V28" ' + k('#1d4ed8', 2.6) + '/>' +
      '<path d="M51 30q-11-6-11-10 9-2 11 10M51 30q11-6 11-10-9-2-11 10" ' + f('#9fc6f5', 1) + '/>' +
      t(51, 100, '한반도 평화 정착', 8.8, '#1d4ed8') +
      t(51, 116, '전쟁의 위협이 사라진다', 6.8, '#46506b') +
      t(51, 130, '군대에 쓰던 돈도 줄어든다', 6.6, '#46506b') +
      card(104, 8, 94, 76, '#eafaf0') +
      '<path d="M126 64q10-24 25-16 15 8 25-8" ' + k('#047857', 2.6) + '/>' +
      '<circle cx="176" cy="40" r="5" ' + f('#8ed7a3', 1.3) + '/>' +
      '<path d="M120 36h18v10h-18z" ' + f('#8ed7a3', 1.2) + '/>' +
      t(151, 100, '세계 경제의 중심지', 8.8, '#047857') +
      t(151, 116, '대륙과 바다를 잇는', 6.8, '#46506b') +
      t(151, 130, '자리를 살릴 수 있다', 6.8, '#46506b') +
      card(204, 8, 94, 76, '#fff7e6') +
      fig(234, 64, .9, '#b45309') + fig(268, 64, .9, '#b45309') +
      '<path d="M244 40q7-8 14 0" ' + k('#b45309', 2.4) + '/>' +
      t(251, 100, '민족 동질성 회복', 8.8, '#b45309') +
      t(251, 116, '70년 동안 달라진 문화를', 6.6, '#46506b') +
      t(251, 130, '다시 하나로 만든다', 6.8, '#46506b');
  } };

  /* 통일을 위해 할 일 */
  CA.unieffort = { w: 298, h: 130, d: function () {
    return "" +
      card(4, 10, 138, 76, '#eef3ff') +
      fig(36, 66, .95, '#2f6df6') + fig(110, 66, .95, '#b91c1c') +
      '<path d="M56 34h34v16H56z" ' + f('#ffffff', 1.4) + '/>' +
      '<path d="M62 50l-4 8 10-4z" ' + f('#ffffff', 1.4) + '/>' +
      t(73, 45, '대화', 8.4, '#46506b') +
      t(73, 102, '남북이 끊임없이', 9, '#1d4ed8') +
      t(73, 118, '대화하고 교류한다', 9, '#1d4ed8') +
      card(158, 10, 138, 76, '#eafaf0') +
      '<circle cx="200" cy="44" r="16" ' + f('#8ed7a3', 1.4) + '/>' +
      '<path d="M184 44h32M200 28v32M190 32q10 12 0 24M210 32q-10 12 0 24" ' + k('#2f8f5b', 1.2) + '/>' +
      arw(220, 44, 248, 44, '#047857', 2.4) +
      '<path d="M254 36h30v18h-30z" ' + f('#ffffff', 1.3) + '/>' +
      t(269, 48, '응원', 7.6, '#047857') +
      t(227, 102, '통일이 세계에도 이득임을', 8.4, '#047857') +
      t(227, 118, '주변 나라에 알린다', 9, '#047857');
  } };

  /* 일본과의 갈등 */
  CA.japanissue = { w: 304, h: 146, d: function () {
    return "" +
      card(4, 8, 94, 76, '#fdecec') +
      '<rect x="26" y="26" width="50" height="36" rx="3" ' + f('#ffffff', 1.4) + '/>' +
      '<path d="M32 36h38M32 44h30M32 52h34" ' + k('#cbd5e1', 1.8) + '/>' +
      '<path d="M36 24l36 40" ' + k('#b91c1c', 2.8) + '/>' +
      t(51, 100, '역사를 숨긴다', 9, '#b91c1c') +
      t(51, 116, '강제 징용 · 일본군 위안부를', 6.4, '#46506b') +
      t(51, 130, '제대로 가르치지 않는다', 6.6, '#46506b') +
      t(51, 142, '사과와 반성이 이어지지 않는다', 6.4, '#46506b') +
      card(104, 8, 94, 76, '#fff7e6') +
      '<path d="M126 62h50l-6-10h-38z" ' + f('#c9a98a', 1.4) + '/>' +
      '<path d="M134 52V36M168 52V36M124 36h54M128 30h46" ' + k('#8a6a4a', 2.4) + '/>' +
      fig(151, 74, .45, '#b45309') +
      t(151, 100, '야스쿠니 신사 참배', 8.4, '#b45309') +
      t(151, 116, '전쟁을 일으킨 전범들이', 6.6, '#46506b') +
      t(151, 130, '있는 곳에 정치인이 간다', 6.6, '#46506b') +
      card(204, 8, 94, 76, '#eef3ff') +
      '<path d="M214 62h76" ' + k('#7fb6e8', 2.4) + '/>' +
      '<path d="M232 58q8-20 18-18 10 2 14 18z" ' + f('#9aa7b8', 1.5) + '/>' +
      '<path d="M264 58q6-10 12 0z" ' + f('#9aa7b8', 1.4) + '/>' +
      '<path d="M242 34h16v8h-16z" ' + f('#ffffff', 1.2) + '/>' +
      '<circle cx="250" cy="38" r="2.4" fill="#e03e3e"/>' +
      '<path d="M236 24l28 20" ' + k('#b91c1c', 2.6) + '/>' +
      t(251, 100, '독도 억지 주장', 9, '#1d4ed8') +
      t(251, 116, '명백한 우리 땅을', 6.8, '#46506b') +
      t(251, 130, '자기 땅이라 우긴다', 6.8, '#46506b');
  } };

  /* 동북공정 */
  CA.northproject = { w: 304, h: 144, d: function () {
    return "" +
      card(4, 8, 180, 86, '#f7fafc') +
      '<path d="M22 50q30-20 70-14 28 4 44 18 8 18-10 30-28 14-62 8-32-6-44-22-4-12 2-20z" ' +
        f('#e2e8f0', 1.6) + '/>' +
      '<path d="M118 28q26-8 42 6 8 12-4 22-20 10-38 0-8-16 0-28z" ' + f('#f5a7a7', 1.8) + '/>' +
      '<path d="M168 50q8-4 11 5 2 12-5 20-6 8-9 2-4-11-1-19z" ' + f('#9fc6f5', 1.6) + '/>' +
      t(60, 70, '중국', 9.4, '#46506b') +
      t(139, 22, '동북 3성', 8, '#7a1d1d') +
      t(170, 88, '한반도', 7.4, '#123a74') +
      card(190, 8, 108, 86, '#fff7e6') +
      t(244, 26, '이 땅의 옛 나라', 8.2, '#b45309') +
      tag(200, 32, 88, 17, '#ffffff', '고조선', '#46506b') +
      tag(200, 52, 88, 17, '#ffffff', '고구려', '#46506b') +
      tag(200, 72, 88, 17, '#ffffff', '발해', '#46506b') +
      t(152, 112, '중국은 이 셋이 사실 중국 역사였다고 주장한다', 8.8, '#b91c1c') +
      t(152, 132, '수많은 유적이 한국 역사라고 말하는데도 — 동북공정', 8.8, '#b91c1c');
  } };

  /* 역사 갈등을 푸는 길 */
  CA.historyfix = { w: 304, h: 140, d: function () {
    return "" +
      card(4, 8, 94, 76, '#eafaf0') +
      '<path d="M28 30h46v26H28z" ' + f('#ffffff', 1.4) + '/>' +
      '<path d="M34 40h34M34 48h24" ' + k('#8ed7a3', 1.8) + '/>' +
      '<path d="M40 70q11-8 22 0" ' + k('#047857', 2.2) + '/>' +
      t(51, 100, '사과에서 시작한다', 8.4, '#047857') +
      t(51, 116, '1993 고노 담화', 7, '#46506b') +
      t(51, 130, '1995 무라야마 담화', 7, '#46506b') +
      card(104, 8, 94, 76, '#eef3ff') +
      bldg(126, 62, 46, 36, '#a8bdd8') +
      fig(180, 62, .5, '#1d4ed8') +
      t(151, 26, '동북아 역사 재단', 7.6, '#1d4ed8') +
      t(151, 100, '함께 연구한다', 8.4, '#1d4ed8') +
      t(151, 116, '한 · 중 · 일 역사학자가', 6.8, '#46506b') +
      t(151, 130, '왜곡을 바로잡는다', 6.8, '#46506b') +
      card(204, 8, 94, 76, '#fff7e6') +
      '<path d="M222 62h58V30h-58z" ' + f('#ffffff', 1.5) + '/>' +
      '<path d="M251 30v32" ' + k('#b45309', 1.8) + '/>' +
      '<path d="M228 40h16M228 48h16M258 40h16M258 48h16" ' + k('#f3d9a0', 1.8) + '/>' +
      t(251, 100, '같은 교재를 쓴다', 8.4, '#b45309') +
      t(251, 116, '한 · 중 · 일이 함께 만든', 6.8, '#46506b') +
      t(251, 130, '동아시아 근현대사 교재', 6.8, '#46506b');
  } };

  /* 우리나라의 지정학적 위치 */
  CA.koreaposition = { w: 300, h: 204, d: function () {
    return "" +
      t(150, 12, '대륙과 바다를 잇는 자리에 있다', 10, '#46506b') +
      '<g transform="translate(0,20)">' + worldmap([], true) + '</g>' +
      dotp(262, 68, '#e03e3e', 6) +
      '<path d="M269 68h10" ' + k('#7a1d1d', 1.6) + '/>' +
      t(288, 71, '한국', 8.4, '#7a1d1d') +
      t(150, 178, '북으로는 중국 · 러시아 · 유럽까지 이어지고', 9.2, '#1d4ed8') +
      t(150, 198, '사방이 바다와 닿아 어디로든 갈 수 있다 — 지리적 요충지', 8.6, '#46506b');
  } };

  /* 한국의 위상 */
  CA.koreastatus = { w: 304, h: 140, d: function () {
    return "" +
      card(4, 8, 94, 76, '#eef3ff') +
      '<circle cx="51" cy="40" r="16" ' + f('#9fc6f5', 1.4) + '/>' +
      '<path d="M35 40h32M51 24v32M41 28q10 12 0 24M61 28q-10 12 0 24" ' + k('#1d4ed8', 1.2) + '/>' +
      '<path d="M32 66q19 10 38 0" ' + k('#1d4ed8', 2) + '/>' +
      t(51, 100, '정치', 9.6, '#1d4ed8') +
      t(51, 116, '국제 연합 가입', 7, '#46506b') +
      t(51, 130, 'UN 인권 이사회 활동', 6.8, '#46506b') +
      card(104, 8, 94, 76, '#eafaf0') +
      '<path d="M120 68h62" ' + k('#94a3b8', 1.6) + '/>' +
      '<path d="M126 68V48M142 68V36M158 68V44M174 68V26" ' + k('#2f8f5b', 5) + '/>' +
      t(151, 100, '경제', 9.6, '#047857') +
      t(151, 116, 'OECD 회원국', 7, '#46506b') +
      t(151, 130, '경제 협력 개발 기구', 6.8, '#46506b') +
      card(204, 8, 94, 76, '#fff7e6') +
      '<path d="M218 64h34V40h-34z" ' + f('#f3d9a0', 1.4) + '/>' +
      '<path d="M214 40h42l-21-14z" ' + f('#e9a94a', 1.4) + '/>' +
      note(272, 40, '#b45309') + note(284, 54, '#b45309') +
      t(251, 100, '문화', 9.6, '#b45309') +
      t(251, 116, '유네스코 세계 문화유산', 6.6, '#46506b') +
      t(251, 130, 'K팝 · K영화 · K드라마', 6.8, '#46506b');
  } };

  /* 국제 평화를 위한 우리의 몫 */
  CA.peaceact = { w: 302, h: 134, d: function () {
    return "" +
      card(4, 8, 94, 76, '#eef3ff') +
      '<path d="M40 60V28M62 60V28" ' + k('#46506b', 2.6) + '/>' +
      arw(42, 44, 60, 44, '#047857', 2.4) +
      '<path d="M28 68h46" ' + k('#94a3b8', 2) + '/>' +
      t(51, 100, '분단을 넘는다', 9, '#1d4ed8') +
      t(51, 118, '남북이 하나 되는 일부터', 7, '#46506b') +
      card(104, 8, 94, 76, '#eafaf0') +
      fig(130, 64, .85, '#047857') +
      arw(146, 44, 166, 44, '#047857', 2.4) +
      fig(180, 64, .85, '#b45309') +
      '<path d="M170 56q8-9 16 0" ' + k('#047857', 2) + '/>' +
      t(151, 100, '가난한 나라를 돕는다', 8.4, '#047857') +
      t(151, 118, '받던 나라에서 주는 나라로', 6.8, '#46506b') +
      card(204, 8, 94, 76, '#fff7e6') +
      '<circle cx="238" cy="40" r="14" ' + f('#f3d9a0', 1.3) + '/>' +
      '<path d="M224 40h28M238 26v28" ' + k('#b45309', 1.2) + '/>' +
      '<path d="M258 32h24v20h-24z" ' + f('#ffffff', 1.3) + '/>' +
      '<path d="M262 42h16M270 34v16" ' + k('#b91c1c', 2.2) + '/>' +
      t(251, 100, '국제 활동에 나선다', 8.4, '#b45309') +
      t(251, 118, 'UN · 국경 없는 의사회', 6.8, '#46506b');
  } };


  /* ───────── 단원 X-1 인구 변화와 인구 문제 ───────── */

  function elder(x, y, s, c) {                  /* 지팡이를 짚은 사람 — y는 발끝 */
    s = s || 1; c = c || '#8a7a68';
    return fig(x, y, s, c) +
      '<path d="M' + (x + 9 * s) + ' ' + (y - 16 * s) + 'v' + (16 * s) + '" ' + k(c, 2 * s) + '/>';
  }
  function baby(x, y, s, c) {                   /* 작은 아이 */
    s = s || 1; c = c || '#2f6df6';
    return '<circle cx="' + x + '" cy="' + (y - 13 * s) + '" r="' + (4 * s) + '" fill="' + c + '"/>' +
      '<path d="M' + x + ' ' + (y - 9 * s) + 'v' + (5 * s) + 'M' + (x - 4 * s) + ' ' + (y - 7 * s) +
      'h' + (8 * s) + 'M' + x + ' ' + (y - 4 * s) + 'l' + (-3 * s) + ' ' + (4 * s) + 'M' + x + ' ' +
      (y - 4 * s) + 'l' + (3 * s) + ' ' + (4 * s) + '" ' + k(c, 2 * s) + '/>';
  }

  /* 200년 만에 여덟 배 */
  CA.popgrow = { w: 300, h: 142, d: function () {
    return "" +
      '<path d="M30 110h254M30 18v92" ' + k('#94a3b8', 1.8) + '/>' +
      '<path d="M38 104L90 100 142 92 194 74 238 46 276 20" ' + k('#e03e3e', 3) + '/>' +
      dotp(38, 104, '#e03e3e', 4) + dotp(276, 20, '#e03e3e', 5) +
      t(62, 96, '10억 명', 8.4, '#46506b') +
      t(38, 122, '1800년', 8, '#46506b') +
      t(276, 122, '지금', 8, '#46506b') +
      t(244, 24, '80억 명', 9.4, '#b91c1c') +
      t(150, 138, '단 200년 만에 여덟 배로 늘었다', 9.4, '#b91c1c');
  } };

  /* 인구가 폭발한 까닭 */
  CA.whygrow = { w: 304, h: 140, d: function () {
    function step(x, bg, ic, s1, s2) {
      return card(x, 8, 68, 56, bg) + ic +
        t(x + 34, 78, s1, 8.6, '#1b2330') + t(x + 34, 91, s2, 7, '#46506b');
    }
    return "" +
      step(4, '#eef3ff', factory(14, 56, .52), '산업 혁명', '기계가 발명된다') +
      arw(74, 36, 80, 36, '#46506b', 2) +
      step(82, '#fff7e6',
        '<path d="M96 56h40" ' + k('#94a3b8', 1.6) + '/>' +
        '<path d="M100 56V40M110 56V30M120 56V34M130 56V22" ' + k('#b45309', 5) + '/>',
        '생산 급증', '전보다 훨씬 많이') +
      arw(152, 36, 158, 36, '#46506b', 2) +
      step(160, '#eafaf0',
        '<path d="M176 50q12-10 24 0z" ' + f('#fdf0cd', 1.3) + '/>' +
        '<path d="M172 50h32l-6 10h-20z" ' + f('#ffffff', 1.4) + '/>' +
        fig(212, 58, .5, '#047857'),
        '생활 수준 향상', '잘 먹고 잘 살게 된다') +
      arw(230, 36, 236, 36, '#46506b', 2) +
      step(238, '#fdecec',
        '<path d="M254 50h36" ' + k('#94a3b8', 1.6) + '/>' +
        '<path d="M256 24l12 14 10-6 14 18" ' + k('#b91c1c', 2.6) + '/>',
        '사망률 감소', '죽는 사람이 줄어든다') +
      '<path d="M152 98v8" ' + k('#46506b', 2) + '/>' +
      arw(152, 100, 152, 110, '#b91c1c', 2.4) +
      '<rect x="60" y="114" width="184" height="22" rx="6" ' + f('#f5a7a7', 1.5) + '/>' +
      t(152, 129, '인구가 빠르게 증가한다', 10, '#7a1d1d');
  } };

  /* 인구 변천 모형 */
  CA.demotransition = { w: 312, h: 156, d: function (o) {
    var hi = o && o.hi;
    var B = [[32, 28], [96, 30], [160, 36], [224, 68], [288, 86]];
    var D = [[32, 36], [96, 38], [160, 78], [224, 86], [288, 90]];
    function ln(A, c) {
      var d = '', i;
      for (i = 0; i < A.length; i++) d += (i ? 'L' : 'M') + A[i][0] + ' ' + A[i][1];
      return '<path d="' + d + '" ' + k(c, 2.8) + '/>';
    }
    var NM = ['1 고위 정체', '2 초기 팽창', '3 후기 팽창', '4 저위 정체'];
    var g = '', i, cx;
    for (i = 0; i < 4; i++) {
      cx = 64 + i * 64;
      if (hi === i + 1) g += '<rect x="' + (cx - 32) + '" y="16" width="64" height="88" rx="4" ' +
        'fill="#ffeab0" opacity=".9"/>';
      g += t(cx, 122, NM[i], hi === i + 1 ? 8.4 : 7.6, hi === i + 1 ? '#b45309' : '#46506b');
    }
    return "" +
      '<path d="M32 104h256M32 16v88" ' + k('#94a3b8', 1.8) + '/>' +
      g +
      '<path d="M96 16v88M160 16v88M224 16v88" ' + k('#cbd5e1', 1.4, '4 4') + '/>' +
      ln(B, '#e03e3e') + ln(D, '#2f6df6') +
      '<path d="M238 24h16" ' + k('#e03e3e', 2.6) + '/>' + t(276, 27, '출생률', 7.6, '#e03e3e') +
      '<path d="M238 38h16" ' + k('#2f6df6', 2.6) + '/>' + t(276, 41, '사망률', 7.6, '#2f6df6') +
      '<path d="M128 38v18M124 42l4-4 4 4M124 52l4 4 4-4" ' + k('#b45309', 1.8) + '/>' +
      t(128, 96, '자연 증가', 8, '#b45309') +
      t(156, 152, '인구 증가율이 가장 큰 때는 2단계 — 사망률만 뚝 떨어진다', 8.6, '#b45309');
  } };

  /* 대륙마다 다른 인구 증가율 */
  CA.devgap = { w: 300, h: 150, d: function () {
    var R = [['아프리카', 88, '#e03e3e'], ['아시아', 56, '#f2a93b'],
             ['라틴 아메리카', 42, '#f2a93b'], ['앵글로 아메리카', 22, '#2f6df6'],
             ['유럽', 10, '#2f6df6']];
    var g = '', i, y;
    for (i = 0; i < 5; i++) {
      y = 16 + i * 19;
      g += '<rect x="96" y="' + y + '" width="' + R[i][1] + '" height="13" rx="3" ' +
        f(R[i][2], 1.2) + '/>' + t(52, y + 11, R[i][0], 7.6, '#46506b');
    }
    return "" +
      t(150, 10, '대륙별 인구 증가율', 9.4, '#46506b') +
      g +
      '<path d="M96 14v98" ' + k('#94a3b8', 1.6) + '/>' +
      t(150, 128, '개발 도상국이 많은 아시아 · 아프리카가 높고', 8.8, '#46506b') +
      t(150, 146, '선진국이 많은 유럽은 매우 낮다', 8.8, '#1d4ed8');
  } };

  /* 사람은 살기 좋은 곳에 몰린다 */
  CA.popmap = { w: 304, h: 150, d: function () {
    var g = '', i;
    for (i = 0; i < 8; i++)
      g += fig(48 + (i % 4) * 17, 58 - Math.floor(i / 4) * 17, .42, '#2f6df6');
    return "" +
      '<circle cx="74" cy="64" r="42" ' + f('#cfe3f7', 1.6) + '/>' +
      '<path d="M30 64h88" ' + k('#b91c1c', 2, '5 4') + '/>' +
      g +
      fig(66, 92, .42, '#2f6df6') +
      t(74, 16, '북반구에 90%', 8.6, '#1d4ed8') +
      t(74, 120, '남반구에 10%', 8.2, '#46506b') +
      t(132, 68, '적도', 7.4, '#b91c1c') +
      card(154, 10, 146, 50, '#fdecec') +
      t(227, 26, '사람이 적은 곳', 8.6, '#b91c1c') +
      t(227, 40, '사막 · 아마존 · 한대 기후', 7.4, '#46506b') +
      t(227, 52, '너무 덥거나 너무 춥다', 7.4, '#46506b') +
      card(154, 66, 146, 50, '#eafaf0') +
      t(227, 82, '사람이 많은 곳', 8.6, '#047857') +
      t(227, 96, '동남아시아 · 유럽 · 미국', 7.4, '#46506b') +
      t(227, 108, '농사가 잘되고 일자리가 많다', 7.2, '#46506b') +
      t(152, 146, '날씨 좋고 일자리 많고 서비스가 좋은 곳에 몰린다', 8.8, '#46506b');
  } };

  /* 인구 피라미드 세 모양 */
  CA.pyramid3 = { w: 304, h: 150, d: function () {
    function pyr(x, bg, W, nm, sub) {
      var g = '', i, w2;
      for (i = 0; i < 6; i++) {
        w2 = W[i];
        g += '<rect x="' + (x + 47 - w2 / 2) + '" y="' + (16 + i * 11) + '" width="' + w2 +
          '" height="9" rx="1.5" ' + f(bg, 1) + '/>';
      }
      return card(x, 8, 94, 76, '#ffffff') + g +
        '<path d="M' + (x + 47) + ' 16v66" ' + k('#cbd5e1', 1.2) + '/>' +
        t(x + 47, 100, nm, 9.4, '#1b2330') + t(x + 47, 114, sub, 7.2, '#46506b');
    }
    return "" +
      pyr(4, '#f0a0a0', [26, 36, 46, 56, 66, 78], '피라미드형', '유소년이 많다') +
      pyr(104, '#9fc6f5', [48, 56, 62, 62, 58, 48], '종형', '선진국의 모습') +
      pyr(204, '#8ed7a3', [62, 66, 60, 50, 38, 26], '방추형', '저출산 · 고령화') +
      t(152, 134, '아래가 유소년, 위가 노년 — 위가 두꺼울수록 늙은 나라다', 8.6, '#46506b') +
      t(152, 148, '축이 인구 "수"인지 "비율"인지 먼저 확인한다', 8.6, '#b45309');
  } };

  /* 선진국과 개발 도상국의 인구 구조 */
  CA.agestructure = { w: 304, h: 146, d: function () {
    return "" +
      card(4, 8, 140, 78, '#eef3ff') +
      elder(28, 54, .8, '#1d4ed8') + elder(50, 54, .8, '#1d4ed8') + elder(72, 54, .8, '#1d4ed8') +
      baby(104, 54, .8, '#1d4ed8') +
      t(74, 70, '노인은 많고 아이는 적다', 7.8, '#1d4ed8') +
      t(74, 102, '선진국', 10, '#1d4ed8') +
      t(74, 116, '65세 이상 비율이 높다', 7.4, '#46506b') +
      t(74, 128, '중위 연령이 높다', 7.4, '#46506b') +
      card(160, 8, 140, 78, '#eafaf0') +
      baby(184, 54, .8, '#047857') + baby(204, 54, .8, '#047857') +
      baby(224, 54, .8, '#047857') + baby(244, 54, .8, '#047857') +
      elder(274, 54, .8, '#047857') +
      t(230, 70, '아이는 많고 노인은 적다', 7.8, '#047857') +
      t(230, 102, '개발 도상국', 10, '#047857') +
      t(230, 116, '0~14세 비율이 높다', 7.4, '#46506b') +
      t(230, 128, '중위 연령이 낮다', 7.4, '#46506b') +
      t(152, 144, '중위 연령 = 한 줄로 세웠을 때 딱 가운데 사람의 나이', 8.6, '#b45309');
  } };

  /* 개발 도상국은 왜 아이를 많이 낳을까 */
  CA.whyyoung = { w: 302, h: 136, d: function () {
    return "" +
      card(4, 10, 138, 76, '#eafaf0') +
      '<path d="M22 62q14-10 28 0" ' + k('#d8a62c', 2.6) + '/>' +
      '<path d="M26 52v10M34 48v14M42 52v10" ' + k('#d8a62c', 2.2) + '/>' +
      '<path d="M62 62q10-6 20 0" ' + k('#2f8f5b', 2.2) + '/>' +
      fig(104, 64, .62, '#047857') + fig(122, 64, .62, '#047857') +
      t(73, 30, '농업 · 어업 같은 1차 산업', 8, '#047857') +
      t(73, 102, '사람이 많을수록 좋다', 9, '#047857') +
      t(73, 118, '풍부한 노동력이 곧 힘이다', 7.4, '#46506b') +
      arw(148, 48, 170, 48, '#46506b', 2.4) +
      card(176, 10, 124, 76, '#fff7e6') +
      baby(200, 62, .8, '#b45309') + baby(222, 62, .8, '#b45309') +
      baby(244, 62, .8, '#b45309') + baby(266, 62, .8, '#b45309') +
      t(238, 30, '아이를 많이 낳는다', 8.4, '#b45309') +
      t(238, 102, '출산율이 높다', 9, '#b45309') +
      t(238, 118, '그래서 유소년 비율이 높다', 7.4, '#46506b');
  } };

  /* 인구 이동 */
  CA.migration = { w: 304, h: 140, d: function () {
    return "" +
      card(4, 10, 138, 76, '#f1f5f9') +
      '<path d="M26 60h30V34H26z" ' + f('#ffffff', 1.4) + '/>' +
      '<path d="M41 34V22M35 28h12" ' + k('#46506b', 2.2) + '/>' +
      '<path d="M78 60h38V38H78z" ' + f('#e2e8f0', 1.4) + '/>' +
      '<path d="M86 38V26h8v12" ' + k('#46506b', 2) + '/>' +
      t(73, 76, '종교의 자유 · 식민지 개척', 7.6, '#46506b') +
      t(73, 102, '과거의 이동', 9.4, '#46506b') +
      card(160, 10, 140, 76, '#fff7e6') +
      won(186, 36, 12) +
      '<path d="M214 44h28v16h-28z" ' + f('#f3d9a0', 1.3) + '/>' +
      '<path d="M214 44l14-12 14 12" ' + k('#b45309', 2) + '/>' +
      fig(272, 60, .7, '#b45309') +
      t(230, 76, '돈 · 난민 · 자연재해', 7.6, '#46506b') +
      t(230, 102, '오늘날의 이동', 9.4, '#b45309') +
      '<rect x="48" y="112" width="90" height="20" rx="5" ' + f('#eafaf0', 1.3) + '/>' +
      t(93, 126, '개발 도상국', 8.4, '#047857') +
      arw(142, 122, 170, 122, '#b91c1c', 2.6) +
      '<rect x="174" y="112" width="90" height="20" rx="5" ' + f('#eef3ff', 1.3) + '/>' +
      t(219, 126, '선진국', 8.4, '#1d4ed8');
  } };

  /* 합계 출산율 */
  CA.tfr = { w: 302, h: 142, d: function () {
    return "" +
      t(151, 14, '여성 한 명이 평생 낳을 것으로 기대되는 자녀 수', 9, '#46506b') +
      '<path d="M26 96h254" ' + k('#94a3b8', 1.8) + '/>' +
      '<path d="M26 52h254" ' + k('#047857', 2, '5 4') + '/>' +
      t(290, 50, '2.1', 8.4, '#047857') +
      t(150, 44, '인구가 유지되는 수준 2.1명', 8, '#047857') +
      '<rect x="70" y="56" width="52" height="40" rx="3" ' + f('#9fc6f5', 1.3) + '/>' +
      t(96, 110, '세계 평균', 8, '#46506b') +
      '<rect x="180" y="82" width="52" height="14" rx="3" ' + f('#f0a0a0', 1.3) + '/>' +
      t(206, 110, '한국 2023년', 8, '#b91c1c') +
      t(206, 124, '0.7명', 10.4, '#b91c1c') +
      t(151, 140, '아이를 낳지 않는 부부를 딩크족이라 한다', 8.6, '#46506b');
  } };

  /* 고령화의 세 단계 */
  CA.aging = { w: 302, h: 140, d: function () {
    function st(x, y, w2, c, pct, nm) {
      return '<rect x="' + x + '" y="' + y + '" width="' + w2 + '" height="' + (100 - y) + '" rx="4" ' +
        f(c, 1.4) + '/>' + t(x + w2 / 2, y + 20, pct, 11, '#1b2330') +
        t(x + w2 / 2, y + 36, nm, 8.2, '#46506b');
    }
    return "" +
      t(151, 14, '65세 이상 인구가 차지하는 비율', 9.2, '#46506b') +
      st(16, 56, 84, '#fdf0cd', '7%', '고령화 사회') +
      st(110, 42, 84, '#f3d9a0', '14%', '고령 사회') +
      st(204, 26, 84, '#e9a94a', '20%', '초고령 사회') +
      elder(58, 120, .74, '#8a7a68') + elder(152, 120, .74, '#8a7a68') +
      elder(240, 120, .74, '#8a7a68') + elder(262, 120, .74, '#8a7a68') +
      t(151, 136, '숫자 7 · 14 · 20을 짝지어 묻는 문항이 자주 나온다', 8.4, '#b45309');
  } };

  /* 인구 부양비 */
  CA.support = { w: 302, h: 146, d: function () {
    return "" +
      baby(70, 36, .9, '#2f6df6') + baby(96, 36, .9, '#2f6df6') +
      t(83, 50, '유소년 0~14세', 7.6, '#1d4ed8') +
      elder(206, 36, .82, '#b45309') + elder(234, 36, .82, '#b45309') +
      t(220, 50, '노년 65세 이상', 7.6, '#b45309') +
      '<rect x="46" y="58" width="210" height="24" rx="5" ' + f('#8ed7a3', 1.5) + '/>' +
      t(151, 74, '생산 가능 인구 15~64세', 9.4, '#06563a') +
      '<path d="M83 54v4M220 54v4" ' + k('#94a3b8', 1.6) + '/>' +
      '<rect x="46" y="94" width="210" height="26" rx="5" ' + f('#ffffff', 1.4) + '/>' +
      t(151, 112, '총부양비 = (유소년 + 노년) ÷ 생산 가능 인구 × 100', 8.4, '#46506b') +
      t(151, 140, '고령화가 진행되면 노년 부양비가 올라간다', 9, '#b45309');
  } };

  /* 선진국의 인구 문제 */
  CA.devprob = { w: 304, h: 146, d: function () {
    return "" +
      card(4, 8, 144, 80, '#eef3ff') +
      baby(34, 56, .9, '#1d4ed8') +
      '<path d="M50 30l34 34M84 30l-34 34" ' + k('#b91c1c', 2.4) + '/>' +
      t(110, 34, '아이를 낳지', 7.6, '#1d4ed8') +
      t(110, 48, '않는다', 7.6, '#1d4ed8') +
      fig(110, 74, .55, '#94a3b8') +
      t(76, 104, '저출산', 10, '#1d4ed8') +
      t(76, 120, '미래에 일할 사람이 줄고', 7.4, '#46506b') +
      t(76, 132, '나라의 힘이 약해진다', 7.4, '#46506b') +
      card(156, 8, 144, 80, '#fff7e6') +
      elder(180, 58, .85, '#b45309') + elder(204, 58, .85, '#b45309') +
      elder(228, 58, .85, '#b45309') +
      fig(272, 58, .85, '#2f6df6') +
      '<path d="M252 44q10-10 20 0" ' + k('#b91c1c', 2.2) + '/>' +
      t(272, 34, '부담', 7.6, '#b91c1c') +
      t(228, 104, '고령화', 10, '#b45309') +
      t(228, 120, '젊은 층의 부양 부담이 커져', 7.2, '#46506b') +
      t(228, 132, '세대 간 갈등이 생긴다', 7.4, '#46506b');
  } };

  /* 개발 도상국의 인구 문제 */
  CA.dvpprob = { w: 304, h: 146, d: function () {
    return "" +
      card(4, 8, 144, 80, '#fdecec') +
      baby(28, 46, .72, '#b91c1c') + baby(48, 46, .72, '#b91c1c') +
      baby(68, 46, .72, '#b91c1c') + baby(88, 46, .72, '#b91c1c') +
      baby(108, 46, .72, '#b91c1c') + baby(128, 46, .72, '#b91c1c') +
      '<path d="M24 66h40l-6 12H30z" ' + f('#ffffff', 1.3) + '/>' +
      t(44, 76, '빈 그릇', 6.6, '#b91c1c') +
      t(100, 74, '먹을 것이 모자란다', 7.6, '#b91c1c') +
      t(76, 104, '인구 급증', 10, '#b91c1c') +
      t(76, 120, '식량 부족 · 빈곤 · 실업', 7.4, '#46506b') +
      t(76, 132, '같은 사회 문제가 생긴다', 7.4, '#46506b') +
      card(156, 8, 144, 80, '#eef3ff') +
      bldg(172, 76, 22, 46, '#a8bdd8') + bldg(198, 76, 20, 54, '#a8bdd8') +
      bldg(222, 76, 22, 40, '#a8bdd8') +
      fig(258, 76, .6, '#1d4ed8') + fig(272, 76, .6, '#1d4ed8') +
      fig(286, 76, .6, '#1d4ed8') +
      t(272, 34, '일자리를 찾아', 7.2, '#1d4ed8') +
      t(272, 46, '도시로', 7.2, '#1d4ed8') +
      t(228, 104, '도시 과밀', 10, '#1d4ed8') +
      t(228, 120, '일자리 부족 · 주택 부족', 7.4, '#46506b') +
      t(228, 132, '도시 문제에 시달린다', 7.4, '#46506b');
  } };

  /* 선진국의 대책 */
  CA.popfix1 = { w: 304, h: 146, d: function () {
    return "" +
      card(4, 8, 144, 80, '#eafaf0') +
      baby(36, 58, 1, '#047857') +
      '<path d="M54 44q10-10 20 0" ' + k('#047857', 2.2) + '/>' +
      tag(68, 22, 72, 17, '#ffffff', '출산 휴가', '#047857') +
      tag(68, 42, 72, 17, '#ffffff', '육아 휴직', '#047857') +
      tag(68, 62, 72, 17, '#ffffff', '양육비 지원', '#047857') +
      t(76, 104, '출산 장려 정책', 9.6, '#047857') +
      t(76, 120, '아이를 낳고 기르기 좋은', 7.4, '#46506b') +
      t(76, 132, '환경을 만들어 준다', 7.4, '#46506b') +
      card(156, 8, 144, 80, '#fff7e6') +
      elder(182, 58, 1, '#b45309') +
      tag(220, 22, 72, 17, '#ffffff', '노인 연금', '#b45309') +
      tag(220, 42, 72, 17, '#ffffff', '정년 연장', '#b45309') +
      tag(220, 62, 72, 17, '#ffffff', '복지 시설 확충', '#b45309') +
      t(228, 104, '고령화 대책', 9.6, '#b45309') +
      t(228, 120, '청년이 노인을 부양하는', 7.4, '#46506b') +
      t(228, 132, '부담을 덜어 준다', 7.4, '#46506b');
  } };

  /* 개발 도상국의 대책 */
  CA.popfix2 = { w: 304, h: 144, d: function () {
    return "" +
      card(4, 8, 94, 76, '#eafaf0') +
      '<path d="M22 60q14-10 28 0" ' + k('#d8a62c', 2.6) + '/>' +
      '<path d="M26 50v10M34 46v14M42 50v10" ' + k('#d8a62c', 2.2) + '/>' +
      '<path d="M62 60h22l-4 10H66z" ' + f('#ffffff', 1.3) + '/>' +
      arw(54, 36, 74, 36, '#047857', 2.2) +
      t(51, 100, '경제 발전 · 식량 증산', 7.8, '#047857') +
      t(51, 116, '굶는 사람이 없도록', 7, '#46506b') +
      card(104, 8, 94, 76, '#eef3ff') +
      baby(134, 58, .9, '#1d4ed8') + baby(160, 58, .9, '#1d4ed8') +
      '<path d="M124 30h54" ' + k('#1d4ed8', 2.4) + '/>' +
      t(151, 26, '조절', 7.2, '#1d4ed8') +
      t(151, 100, '출산 억제 정책', 8.4, '#1d4ed8') +
      t(151, 116, '인구 증가율을 낮춘다', 7, '#46506b') +
      card(204, 8, 94, 76, '#fff7e6') +
      bldg(216, 70, 20, 30, '#f3d9a0') + bldg(240, 70, 18, 40, '#f3d9a0') +
      bldg(262, 70, 20, 26, '#f3d9a0') +
      '<path d="M216 26q20-10 40 0" ' + k('#b45309', 2.2) + '/>' +
      t(251, 100, '중소도시 육성', 8.4, '#b45309') +
      t(251, 116, '생활 환경을 고쳐', 7, '#46506b') +
      t(251, 128, '떠나지 않게 한다', 7, '#46506b') +
      t(152, 142, '대도시로만 몰리는 흐름을 돌려놓는다', 8.6, '#46506b');
  } };

  /* 제도만으로는 부족하다 — 생각의 변화 */
  CA.popmind = { w: 304, h: 140, d: function () {
    return "" +
      card(4, 8, 94, 76, '#eef3ff') +
      fig(36, 56, .85, '#2f6df6') + fig(64, 56, .85, '#b91c1c') +
      baby(50, 72, .62, '#46506b') +
      '<path d="M44 34q6-8 12 0" ' + k('#1d4ed8', 2.2) + '/>' +
      t(51, 100, '양성평등', 9.6, '#1d4ed8') +
      t(51, 116, '자녀 양육도 집안일도', 7.2, '#46506b') +
      t(51, 128, '함께 해 나간다', 7.2, '#46506b') +
      card(104, 8, 94, 76, '#fff7e6') +
      elder(134, 62, .9, '#b45309') +
      fig(168, 62, .78, '#2f6df6') +
      '<path d="M146 34h26v14h-26z" ' + f('#ffffff', 1.3) + '/>' +
      t(159, 44, '지혜', 7.2, '#b45309') +
      arw(148, 54, 162, 54, '#b45309', 2) +
      t(151, 100, '노인 공경', 9.6, '#b45309') +
      t(151, 116, '지혜와 경험을 나누는', 7.2, '#46506b') +
      t(151, 128, '어른으로 바라본다', 7.2, '#46506b') +
      card(204, 8, 94, 76, '#eafaf0') +
      fig(226, 62, .8, '#047857') +
      arw(242, 46, 262, 46, '#047857', 2.2) +
      baby(276, 62, .8, '#047857') +
      '<path d="M216 72h66" ' + k('#2f8f5b', 2) + '/>' +
      t(251, 100, '세대 간 정의', 9.6, '#047857') +
      t(251, 116, '미래 세대에게 책임을', 7.2, '#46506b') +
      t(251, 128, '떠넘기지 않는다', 7.2, '#46506b') +
      t(152, 138, '제도와 함께 생각이 바뀌어야 풀린다', 8.6, '#46506b');
  } };


  /* ───────── 단원 X-2 자원과 지속가능한 발전 ───────── */

  function lump(x, y, s, c) {                   /* 돌덩이 */
    s = s || 1;
    return '<path d="M' + x + ' ' + y + 'l' + (-10 * s) + ' ' + (-6 * s) + 'l' + (2 * s) + ' ' +
      (-9 * s) + 'l' + (9 * s) + ' ' + (-5 * s) + 'l' + (10 * s) + ' ' + (4 * s) + 'l' + (1 * s) +
      ' ' + (10 * s) + 'z" ' + f(c || '#3f3a33', 1.4) + '/>';
  }
  function drop(x, y, s, c) {                   /* 기름 방울 */
    s = s || 1;
    return '<path d="M' + x + ' ' + (y - 16 * s) + 'q' + (9 * s) + ' ' + (11 * s) + ' ' + (9 * s) +
      ' ' + (16 * s) + 'a' + (9 * s) + ' ' + (9 * s) + ' 0 0 1 ' + (-18 * s) + ' 0q0 ' + (-5 * s) +
      ' ' + (9 * s) + ' ' + (-16 * s) + 'z" ' + f(c || '#3f3a33', 1.4) + '/>';
  }

  /* 자원이란 무엇인가 */
  CA.resmean = { w: 302, h: 138, d: function () {
    return "" +
      card(4, 8, 140, 76, '#eafaf0') +
      lump(36, 56, .9) + drop(74, 58, .8) + '<rect x="98" y="38" width="26" height="20" rx="3" ' +
      f('#9aa7b8', 1.3) + '/>' +
      t(74, 74, '석탄 · 석유 · 철', 8, '#047857') +
      t(74, 100, '자원이다', 9.8, '#047857') +
      t(74, 116, '쓸모가 있고 돈이 된다', 7.6, '#46506b') +
      card(160, 8, 140, 76, '#fdecec') +
      '<path d="M186 46q8-10 16 0-8 6-16 0z" ' + f('#c9d4e2', 1.2) + '/>' +
      '<path d="M194 46v10M190 56h8" ' + k('#46506b', 1.6) + '/>' +
      '<circle cx="232" cy="42" r="3" fill="#9aa7b8"/>' +
      '<circle cx="246" cy="52" r="3" fill="#9aa7b8"/>' +
      '<circle cx="258" cy="40" r="3" fill="#9aa7b8"/>' +
      '<circle cx="268" cy="54" r="3" fill="#9aa7b8"/>' +
      t(230, 74, '모기 · 미세먼지', 8, '#b91c1c') +
      t(230, 100, '자원이 아니다', 9.8, '#b91c1c') +
      t(230, 116, '쓸모가 없다', 7.6, '#46506b') +
      t(151, 134, '그중 에너지로 바꿔 쓸 수 있는 것이 에너지 자원이다', 8.8, '#b45309');
  } };

  /* 자원의 세 가지 특징 */
  CA.res3trait = { w: 304, h: 140, d: function () {
    return "" +
      card(4, 8, 94, 76, '#fdecec') +
      '<path d="M34 24h34l-17 20zM34 70h34l-17-20z" ' + f('#f3d9a0', 1.5) + '/>' +
      '<path d="M30 24h42M30 70h42" ' + k('#8a6a4a', 2.2) + '/>' +
      t(51, 100, '유한성', 10, '#b91c1c') +
      t(51, 116, '계속 쓰면 고갈된다', 7.4, '#46506b') +
      card(104, 8, 94, 76, '#eef3ff') +
      '<rect x="116" y="24" width="70" height="46" rx="4" ' + f('#e8f3fb', 1.3) + '/>' +
      '<circle cx="168" cy="40" r="7" fill="#3f3a33"/>' +
      '<circle cx="176" cy="54" r="5" fill="#3f3a33"/>' +
      '<circle cx="158" cy="56" r="4" fill="#3f3a33"/>' +
      t(134, 62, '0', 8, '#94a3b8') +
      t(151, 100, '편재성', 10, '#1d4ed8') +
      t(151, 116, '특정 지역에 몰려 있다', 7.4, '#46506b') +
      card(204, 8, 94, 76, '#eafaf0') +
      lump(224, 42, .62) +
      arw(236, 40, 250, 40, '#047857', 2) +
      drop(262, 44, .55) +
      arw(236, 62, 250, 62, '#047857', 2) +
      sun(268, 62, 7) +
      t(251, 100, '가변성', 10, '#047857') +
      t(251, 116, '가치가 바뀐다', 7.4, '#46506b') +
      t(152, 136, '기술과 사회 배경에 따라 쓸모가 달라진다', 8.6, '#46506b');
  } };

  /* 유한성 — 앞으로 몇 년 */
  CA.finite = { w: 300, h: 136, d: function () {
    function bar(y, w2, nm, yr, c) {
      return t(48, y + 13, nm, 9, '#46506b') +
        '<rect x="72" y="' + y + '" width="' + w2 + '" height="18" rx="3" ' + f(c, 1.3) + '/>' +
        t(72 + w2 + 26, y + 13, yr, 9, '#1b2330');
    }
    return "" +
      t(150, 14, '지금처럼 쓰면 앞으로 몇 년이나 남았을까', 9.2, '#46506b') +
      bar(28, 176, '석탄', '약 110년', '#6b7788') +
      bar(58, 80, '석유', '약 50년', '#3f3a33') +
      bar(88, 80, '천연가스', '약 50년', '#9fc6f5') +
      t(150, 128, '쓰고 나면 다시 생기지 않는다 — 이것이 유한성', 8.8, '#b91c1c');
  } };

  /* 편재성 — 한쪽으로 몰려 있다 */
  CA.ubiquity = { w: 302, h: 140, d: function () {
    return "" +
      card(4, 10, 138, 76, '#eef3ff') +
      '<path d="M50 62q10-5 14 6 2 16-6 26-8 11-11 2-5-15-1-24z" ' + f('#9fc6f5', 1.6) + '/>' +
      t(56, 34, '한국', 9.6, '#1d4ed8') +
      t(104, 52, '석유', 8.4, '#46506b') +
      t(104, 68, '한 방울도', 8, '#b91c1c') +
      t(104, 80, '나지 않는다', 8, '#b91c1c') +
      card(160, 10, 140, 76, '#fff7e6') +
      '<path d="M178 64q22-20 50-12 26 8 22 26h-72z" ' + f('#f3d9a0', 1.6) + '/>' +
      drop(206, 50, .66) + drop(230, 52, .66) + drop(252, 48, .66) +
      t(230, 34, '사우디아라비아', 9, '#b45309') +
      t(230, 80, '물보다 석유가 싸다', 7.8, '#b45309') +
      t(151, 110, '석유의 절반이 서남아시아 페르시아만에 몰려 있다', 9, '#46506b') +
      t(151, 132, '한쪽으로 쏠려 있는 성질 — 편재성', 9.2, '#1d4ed8');
  } };

  /* 가변성 — 가치가 바뀐다 */
  CA.variable = { w: 304, h: 134, d: function () {
    return "" +
      '<path d="M20 70h262" ' + k('#94a3b8', 2.2) + '/>' +
      '<path d="M60 70v-6M152 70v-6M244 70v-6" ' + k('#94a3b8', 1.8) + '/>' +
      lump(60, 52, .9) +
      t(60, 24, '과거', 8.6, '#46506b') + t(60, 90, '석탄의 시대', 8.6, '#46506b') +
      drop(152, 54, .8) +
      t(152, 24, '지금', 8.6, '#b45309') + t(152, 90, '석유의 시대', 8.6, '#b45309') +
      sun(232, 46, 8) +
      '<path d="M252 54V32M246 36l6-6 6 6" ' + k('#2f8f5b', 2.2) + '/>' +
      '<path d="M264 54q8-10 16 0" ' + k('#7fb6e8', 2.2) + '/>' +
      t(252, 24, '앞으로', 8.6, '#047857') + t(252, 90, '햇빛 · 바람 · 물', 8.6, '#047857') +
      t(152, 114, '기술이 달라지면 쓸모없던 것도 자원이 된다', 9, '#46506b') +
      t(152, 132, '이렇게 가치가 바뀌는 것이 가변성', 9.2, '#047857');
  } };

  /* 석탄 */
  CA.coal = { w: 304, h: 148, d: function () {
    return "" +
      card(4, 8, 88, 76, '#f1f5f9') +
      lump(48, 56, 1.3) +
      t(48, 76, '검은 돌덩어리', 7.6, '#46506b') +
      t(48, 26, '석탄', 11, '#1b2330') +
      card(98, 8, 202, 76, '#ffffff') +
      t(199, 24, '고생대 지층에 묻혀 있다', 8.4, '#46506b') +
      tag(108, 32, 90, 18, '#eef3ff', '제철 공업용', '#1d4ed8') +
      tag(202, 32, 90, 18, '#eef3ff', '전기 발전용', '#1d4ed8') +
      tag(108, 56, 90, 18, '#eafaf0', '전 세계에 고루', '#047857') +
      tag(202, 56, 90, 18, '#fdecec', '국제 이동량 적음', '#b91c1c') +
      t(152, 104, '18세기 산업 혁명의 기계를 돌린 첫 화석 에너지', 8.8, '#46506b') +
      t(152, 124, '세계 석탄의 절반을 중국이 생산하는데도 중국은 수입한다', 8.4, '#46506b') +
      t(152, 144, '태우면 대기 오염 물질이 많이 나온다', 9, '#b91c1c');
  } };

  /* 석유 */
  CA.oil = { w: 304, h: 150, d: function () {
    return "" +
      card(4, 8, 88, 76, '#f1f5f9') +
      drop(48, 56, 1.35) +
      t(48, 80, '검은 황금', 7.6, '#46506b') +
      t(48, 26, '석유', 11, '#1b2330') +
      card(98, 8, 202, 76, '#ffffff') +
      t(134, 24, '배사 구조', 7.6, '#46506b') +
      '<path d="M110 62q24-26 48 0z" ' + f('#f3d9a0', 1.4) + '/>' +
      '<path d="M120 62q14-15 28 0z" ' + f('#3f3a33', 1.1) + '/>' +
      '<path d="M110 50q24-19 48 0" ' + k('#b08d5a', 1.5) + '/>' +
      '<path d="M104 62h60" ' + k('#8a6a4a', 2.2) + '/>' +
      t(134, 78, '신생대 제3기', 7, '#46506b') +
      t(230, 24, '배처럼 볼록한 곳에 고인다', 7, '#46506b') +
      tag(170, 32, 120, 18, '#eef3ff', '자동차 · 비행기 연료', '#1d4ed8') +
      tag(170, 56, 120, 18, '#fff7e6', '석유 화학 — 플라스틱', '#b45309') +
      t(152, 106, '전 세계 석유의 절반이 서남아시아 페르시아만에 있다', 8.8, '#46506b') +
      t(152, 126, '편재성이 가장 큰 자원 — 사우디아라비아 · 미국 · 러시아', 8.4, '#46506b') +
      t(152, 146, '지금은 석유의 시대다', 9, '#b45309');
  } };

  /* 천연가스 */
  CA.gas = { w: 304, h: 150, d: function () {
    return "" +
      card(4, 8, 88, 76, '#f1f5f9') +
      '<path d="M34 64q14-10 28 0" ' + k('#7fb6e8', 2.6) + '/>' +
      '<path d="M38 50q4-10 10 0 6 10 10 0" ' + k('#7fb6e8', 2.4) + '/>' +
      '<path d="M38 38q4-10 10 0 6 10 10 0" ' + k('#bcd3f5', 2.2) + '/>' +
      t(48, 78, '기체', 7.6, '#46506b') +
      t(48, 26, '천연가스', 10, '#1b2330') +
      card(98, 8, 202, 76, '#ffffff') +
      t(199, 24, '석유와 같은 배사 구조, 석유보다 위쪽에 있다', 7.4, '#46506b') +
      tag(108, 32, 90, 18, '#eef3ff', '난방용', '#1d4ed8') +
      tag(202, 32, 90, 18, '#eef3ff', '취사용', '#1d4ed8') +
      tag(108, 56, 90, 18, '#fff7e6', '액화해서 운반', '#b45309') +
      tag(202, 56, 90, 18, '#fff7e6', '파이프라인', '#b45309') +
      t(152, 104, '기체라 운반이 어려웠지만 액화 기술로 소비가 빠르게 늘었다', 8.2, '#46506b') +
      t(152, 124, '석탄 · 석유보다 대기 오염 물질이 적어 청정 에너지라 불린다', 8.2, '#047857') +
      t(152, 144, '미국 · 러시아가 가장 많이 생산한다', 8.8, '#46506b');
  } };

  /* 세 화석 에너지 비교 */
  CA.fossil3 = { w: 312, h: 148, d: function () {
    return "" +
      tbl(6, 10, 66, '', null, '#f1f5f9') +
      tbl(72, 10, 78, '석탄', '#1b2330', '#f1f5f9', 9.4) +
      tbl(150, 10, 78, '석유', '#1b2330', '#f1f5f9', 9.4) +
      tbl(228, 10, 78, '천연가스', '#1b2330', '#f1f5f9', 9.4) +
      tbl(6, 36, 66, '주요 용도', null, '#f8fafc', 7.6) +
      tbl(72, 36, 78, '제철 · 발전', null, '#ffffff', 7.6) +
      tbl(150, 36, 78, '수송 · 화학', null, '#ffffff', 7.6) +
      tbl(228, 36, 78, '난방 · 취사', null, '#ffffff', 7.6) +
      tbl(6, 62, 66, '분포', null, '#f8fafc', 7.6) +
      tbl(72, 62, 78, '고루 퍼져 있다', '#047857', '#eafaf0', 7.4) +
      tbl(150, 62, 78, '한쪽에 몰려 있다', '#b91c1c', '#fdecec', 7.2) +
      tbl(228, 62, 78, '석유와 비슷', null, '#ffffff', 7.6) +
      tbl(6, 88, 66, '대기 오염', null, '#f8fafc', 7.6) +
      tbl(72, 88, 78, '가장 많다', '#b91c1c', '#fdecec', 7.6) +
      tbl(150, 88, 78, '중간', null, '#ffffff', 7.6) +
      tbl(228, 88, 78, '가장 적다', '#047857', '#eafaf0', 7.6) +
      t(156, 128, '석탄은 국제 이동량이 적고, 석유는 편재성이 가장 크다', 8.6, '#46506b') +
      t(156, 146, '세 자원의 소비 비중 그래프 해석이 단골 문항이다', 8.6, '#b45309');
  } };

  /* 생산지와 소비지의 불일치 */
  CA.mismatch = { w: 302, h: 138, d: function () {
    var g = '', i;
    for (i = 0; i < 12; i++)
      g += '<rect x="' + (168 + (i % 6) * 22) + '" y="' + (30 + Math.floor(i / 6) * 22) +
        '" width="16" height="16" rx="3" ' + f('#9fc6f5', 1.1) + '/>';
    return "" +
      card(4, 10, 138, 76, '#fff7e6') +
      '<rect x="24" y="30" width="30" height="16" rx="3" ' + f('#f3d9a0', 1.2) + '/>' +
      '<rect x="62" y="30" width="30" height="16" rx="3" ' + f('#f3d9a0', 1.2) + '/>' +
      '<rect x="100" y="30" width="30" height="16" rx="3" ' + f('#f3d9a0', 1.2) + '/>' +
      t(73, 62, '미국 · 러시아 · 사우디', 7.6, '#b45309') +
      t(73, 76, '몇몇 나라뿐', 8, '#46506b') +
      t(73, 102, '생산하는 나라', 9.4, '#b45309') +
      card(158, 10, 142, 76, '#eef3ff') +
      g +
      t(229, 76, '거의 모든 나라', 8, '#46506b') +
      t(229, 102, '소비하는 나라', 9.4, '#1d4ed8') +
      t(151, 126, '생산지와 소비지가 어긋나 있다', 9.6, '#b91c1c') +
      t(151, 138, '여기에서 온갖 갈등이 자라난다', 8.6, '#46506b');
  } };

  /* 자원을 둘러싼 갈등 */
  CA.resconflict = { w: 304, h: 144, d: function () {
    return "" +
      card(4, 8, 94, 76, '#fdecec') +
      drop(51, 54, .72) +
      fig(28, 74, .6, '#b91c1c') + fig(74, 74, .6, '#1d4ed8') +
      '<path d="M44 28l6 6-6 6M58 28l-6 6 6 6" ' + k('#b91c1c', 2) + '/>' +
      t(51, 100, '생산지 다툼', 9, '#b91c1c') +
      t(51, 116, '자원이 나는 땅을', 7.2, '#46506b') +
      t(51, 128, '서로 차지하려 한다', 7.2, '#46506b') +
      card(104, 8, 94, 76, '#eef3ff') +
      '<path d="M114 62h76" ' + k('#7fb6e8', 3) + '/>' +
      '<path d="M126 56h20l-4-8h-12z" ' + f('#9aa7b8', 1.3) + '/>' +
      '<path d="M158 56h20l-4-8h-12z" ' + f('#9aa7b8', 1.3) + '/>' +
      '<path d="M144 24v18M138 30h12" ' + k('#b91c1c', 2.2) + '/>' +
      t(151, 100, '수송로 다툼', 9, '#1d4ed8') +
      t(151, 116, '자원이 지나가는 길목을', 7, '#46506b') +
      t(151, 128, '차지하려 한다', 7.2, '#46506b') +
      card(204, 8, 94, 76, '#fff7e6') +
      drop(236, 54, .66) +
      '<path d="M254 34h26v20h-26z" ' + f('#f3d9a0', 1.3) + '/>' +
      t(267, 48, '값 ↑', 7.4, '#b45309') +
      fig(222, 74, .55, '#b45309') +
      t(251, 100, '자원 민족주의', 8.6, '#b45309') +
      t(251, 116, '가진 나라가 자원을', 7.2, '#46506b') +
      t(251, 128, '무기로 쓴다', 7.2, '#46506b');
  } };

  /* 자원 민족주의 */
  CA.resnation = { w: 302, h: 136, d: function () {
    return "" +
      card(4, 10, 130, 76, '#fff7e6') +
      drop(44, 58, 1.05) +
      '<path d="M70 36h48v34H70z" ' + f('#f3d9a0', 1.4) + '/>' +
      t(94, 52, '자원 보유국', 7.6, '#b45309') +
      t(94, 64, '우리 뜻대로', 7.6, '#b45309') +
      t(69, 102, '자원이 곧 무기다', 9, '#b45309') +
      arw(140, 48, 164, 48, '#b91c1c', 2.6) +
      card(170, 10, 128, 76, '#fdecec') +
      tag(178, 22, 112, 17, '#ffffff', '수출을 막는다', '#b91c1c') +
      tag(178, 42, 112, 17, '#ffffff', '값을 올린다', '#b91c1c') +
      tag(178, 62, 112, 17, '#ffffff', '석유 파동', '#b91c1c') +
      t(234, 102, '쓰는 나라가 휘둘린다', 9, '#b91c1c') +
      t(151, 130, '편재성이 크기 때문에 가능한 일이다', 9, '#46506b');
  } };

  /* 신 · 재생 에너지 */
  CA.renew = { w: 304, h: 148, d: function () {
    return "" +
      sun(32, 34, 10) +
      '<path d="M20 56h24v10H20z" ' + f('#9fc6f5', 1.3) + '/>' +
      t(32, 78, '태양광', 7.6, '#047857') +
      '<path d="M84 66V34" ' + k('#94a3b8', 2.4) + '/>' +
      '<path d="M84 34l14-8M84 34l-2 16M84 34l-14-6" ' + k('#cbd5e1', 3.4) + '/>' +
      t(84, 78, '풍력', 7.6, '#047857') +
      '<path d="M124 66h32M124 66q8-18 16-6 8 12 16-4" ' + k('#7fb6e8', 2.6) + '/>' +
      '<path d="M128 44h24v8h-24z" ' + f('#cbd5e1', 1.2) + '/>' +
      t(140, 78, '수력', 7.6, '#047857') +
      '<path d="M180 62q10-10 20 0 10 10 20 0" ' + k('#7fb6e8', 2.6) + '/>' +
      '<path d="M180 50q10-10 20 0 10 10 20 0" ' + k('#bcd3f5', 2.4) + '/>' +
      '<circle cx="200" cy="32" r="8" ' + f('#e2e8f0', 1.3) + '/>' +
      t(200, 78, '조력', 7.6, '#047857') +
      '<path d="M248 66h32l-6-16h-20z" ' + f('#d9a86c', 1.4) + '/>' +
      '<path d="M258 44q4-10 8 0M268 40q3-8 6 0" ' + k('#b91c1c', 2.2) + '/>' +
      t(264, 78, '지열', 7.6, '#047857') +
      card(4, 88, 144, 38, '#eafaf0') +
      t(76, 104, '고갈 걱정이 적다', 8.4, '#047857') +
      t(76, 118, '오염 물질이 적다', 8.4, '#047857') +
      card(156, 88, 144, 38, '#fdecec') +
      t(228, 104, '처음 드는 돈이 크다', 8.4, '#b91c1c') +
      t(228, 118, '자연 조건에 묶인다', 8.4, '#b91c1c') +
      t(152, 144, '"항상 안정적으로 공급된다"는 틀린 말이다', 9, '#b45309');
  } };

  /* 자원이 부르는 환경 문제 */
  CA.resenv = { w: 300, h: 148, d: function () {
    return "" +
      card(4, 10, 138, 76, '#fdecec') +
      broadleaf(28, 72, .6) + broadleaf(50, 72, .6, 1) + broadleaf(72, 72, .6, 1) +
      '<path d="M92 72h40l-6-16H98z" ' + f('#8a6a4a', 1.4) + '/>' +
      lump(112, 48, .5) +
      t(73, 30, '자원을 캐려고', 8, '#b91c1c') +
      t(73, 102, '숲이 사라진다', 9, '#b91c1c') +
      t(73, 118, '생태계가 무너진다', 7.4, '#46506b') +
      card(158, 10, 142, 76, '#fff7e6') +
      factory(172, 72, .62) +
      puff(216, 36, 9, '#9aa7b8') + puff(228, 30, 11, '#9aa7b8') + puff(242, 36, 9, '#9aa7b8') +
      sun(276, 34, 8, '#e9a94a') +
      '<path d="M258 56q12-8 24 0" ' + k('#b45309', 2.2) + '/>' +
      t(229, 102, '미세먼지 · 지구 온난화', 8.4, '#b45309') +
      t(229, 118, '화석 연료를 너무 많이 쓴 결과', 7.2, '#46506b') +
      t(150, 142, '많이 캘수록, 많이 태울수록 지구가 아프다', 8.8, '#46506b');
  } };

  /* 지속가능한 발전 */
  CA.sustain = { w: 304, h: 146, d: function () {
    return "" +
      '<circle cx="110" cy="56" r="40" fill="#8ed7a3" opacity=".55" stroke="' + INK +
      '" stroke-width="1.6"/>' +
      '<circle cx="194" cy="56" r="40" fill="#9fc6f5" opacity=".55" stroke="' + INK +
      '" stroke-width="1.6"/>' +
      '<circle cx="152" cy="92" r="40" fill="#f3d9a0" opacity=".55" stroke="' + INK +
      '" stroke-width="1.6"/>' +
      t(86, 46, '환경', 9.6, '#06563a') +
      t(218, 46, '경제', 9.6, '#123a74') +
      t(152, 116, '사회', 9.6, '#7a4a12') +
      t(152, 64, '지속가능', 8.4, '#1b2330') +
      t(152, 76, '발전', 8.4, '#1b2330') +
      t(152, 142, '미래 세대를 생각하며 발전한다 — 셋의 균형이 핵심', 8.8, '#047857');
  } };

  /* 국제적인 노력 */
  CA.intlact = { w: 302, h: 138, d: function () {
    return "" +
      card(4, 8, 94, 76, '#eafaf0') +
      '<circle cx="51" cy="40" r="17" ' + f('#8ed7a3', 1.4) + '/>' +
      '<path d="M34 40h34M51 23v34M41 27q10 13 0 26M61 27q-10 13 0 26" ' + k('#2f8f5b', 1.2) + '/>' +
      '<path d="M30 66h42" ' + k('#047857', 2.2) + '/>' +
      t(51, 100, '2015 파리', 8.8, '#047857') +
      t(51, 114, '기후변화 협약', 8.8, '#047857') +
      t(51, 128, '지구 온난화를 막자는 약속', 6.8, '#46506b') +
      card(104, 8, 94, 76, '#eef3ff') +
      puff(130, 34, 8, '#9aa7b8') + puff(142, 28, 10, '#9aa7b8') +
      '<rect x="120" y="50" width="26" height="18" rx="3" ' + f('#ffffff', 1.3) + '/>' +
      arw(150, 58, 172, 58, '#1d4ed8', 2.2) +
      '<rect x="166" y="50" width="26" height="18" rx="3" ' + f('#ffffff', 1.3) + '/>' +
      won(184, 32, 8) +
      t(151, 100, '온실가스', 8.8, '#1d4ed8') +
      t(151, 114, '배출권 거래제', 8.8, '#1d4ed8') +
      t(151, 128, '덜 내뿜은 만큼 사고판다', 6.8, '#46506b') +
      card(204, 8, 94, 76, '#fff7e6') +
      fig(230, 64, .72, '#b45309') + fig(252, 64, .72, '#b45309') +
      fig(274, 64, .72, '#b45309') +
      '<path d="M216 30h66v12h-66z" ' + f('#ffffff', 1.3) + '/>' +
      t(249, 39, '함께', 7.4, '#b45309') +
      t(251, 100, '국제기구 · NGO', 8.4, '#b45309') +
      t(251, 114, '경제뿐 아니라', 7.4, '#46506b') +
      t(251, 128, '사회와 환경까지 함께', 7, '#46506b');
  } };

  /* 개인의 노력 */
  CA.personact = { w: 302, h: 136, d: function () {
    return "" +
      card(4, 8, 94, 76, '#eafaf0') +
      '<path d="M38 30v24M38 54h26" ' + k('#7fb6e8', 2.6) + '/>' +
      '<path d="M34 24q4 8 8 0" ' + k('#7fb6e8', 2.2) + '/>' +
      '<path d="M44 66h20" ' + k('#94a3b8', 2) + '/>' +
      '<circle cx="72" cy="40" r="9" ' + f('#ffffff', 1.3) + '/>' +
      '<path d="M68 40l3 4 6-7" ' + k('#047857', 2) + '/>' +
      t(51, 100, '아껴 쓴다', 9.2, '#047857') +
      t(51, 116, '물 · 전기 · 오염 물질', 7.2, '#46506b') +
      card(104, 8, 94, 76, '#eef3ff') +
      '<path d="M136 26l12 10-12 10z" ' + f('#8ed7a3', 1.3) + '/>' +
      '<path d="M168 44l-10 12-12-10z" ' + f('#8ed7a3', 1.3) + '/>' +
      '<path d="M132 58l14-4 2 14z" ' + f('#8ed7a3', 1.3) + '/>' +
      t(151, 100, '다시 쓴다', 9.2, '#1d4ed8') +
      t(151, 116, '재활용하는 습관', 7.2, '#46506b') +
      card(204, 8, 94, 76, '#fff7e6') +
      '<path d="M226 38h52v28h-52z" ' + f('#ffffff', 1.3) + '/>' +
      '<path d="M226 38l26-14 26 14" ' + k('#b45309', 2) + '/>' +
      '<circle cx="252" cy="52" r="7" ' + f('#8ed7a3', 1.2) + '/>' +
      '<path d="M248 52l3 4 6-7" ' + k('#06563a', 1.8) + '/>' +
      t(251, 100, '골라 산다', 9.2, '#b45309') +
      t(251, 116, '윤리적 소비', 7.6, '#46506b') +
      t(151, 134, '작아 보여도 모이면 지구를 바꾼다', 8.8, '#46506b');
  } };

  /* 윤리적 소비 */
  CA.ethicbuy = { w: 304, h: 150, d: function () {
    return "" +
      card(4, 8, 140, 80, '#eafaf0') +
      '<path d="M22 64q12-9 24 0" ' + k('#d8a62c', 2.4) + '/>' +
      '<path d="M26 54v10M34 50v14M42 54v10" ' + k('#d8a62c', 2.2) + '/>' +
      arw(56, 58, 78, 58, '#047857', 2.4) +
      '<path d="M86 64h40V42H86z" ' + f('#ffffff', 1.3) + '/>' +
      '<path d="M86 42l20-12 20 12" ' + k('#047857', 2) + '/>' +
      t(106, 58, '우리 동네', 7, '#047857') +
      t(74, 80, '가까우니 운송 오염이 적다', 7.2, '#46506b') +
      t(74, 104, '로컬 푸드', 9.8, '#047857') +
      t(74, 120, '그 지역에서 난 것을 산다', 7.4, '#46506b') +
      card(156, 8, 144, 80, '#fff7e6') +
      cup(182, 44, '#ffffff') +
      t(182, 58, '4000원', 8, '#46506b') +
      arw(198, 42, 220, 42, '#b91c1c', 2.2) +
      fig(240, 60, .72, '#b45309') +
      t(240, 74, '커피 농부', 7, '#46506b') +
      t(272, 42, '20원', 9, '#b91c1c') +
      t(228, 104, '공정 무역', 9.8, '#b45309') +
      t(228, 120, '만든 사람에게 제값이 가도록', 7.2, '#46506b') +
      t(152, 146, '조금 비싸더라도 바르게 만든 물건을 고르는 것', 8.8, '#46506b');
  } };


  /* ───────── 단원 X-3 미래 사회의 모습 ───────── */

  /* 미래를 보는 두 개의 눈 */
  CA.futureview = { w: 302, h: 138, d: function () {
    return "" +
      card(4, 8, 138, 78, '#eafaf0') +
      bldg(24, 72, 20, 34, '#9fc6f5') + bldg(50, 72, 18, 46, '#9fc6f5') +
      bldg(74, 72, 20, 38, '#9fc6f5') +
      sun(118, 32, 9) +
      '<path d="M100 72q12-10 24 0" ' + k('#2f8f5b', 2.4) + '/>' +
      t(73, 102, '밝은 미래', 9.8, '#047857') +
      t(73, 118, '기술과 협력이 삶을 낫게 한다', 7.2, '#46506b') +
      card(160, 8, 138, 78, '#fdecec') +
      bldg(180, 72, 20, 28, '#c9d4e2') +
      '<path d="M206 72V46l8 10 6-16" ' + k('#8a97a8', 2.4) + '/>' +
      broadleaf(236, 72, .6, 1) +
      puff(264, 34, 10, '#9aa7b8') + puff(278, 40, 8, '#9aa7b8') +
      t(229, 102, '어두운 미래', 9.8, '#b91c1c') +
      t(229, 118, '경쟁과 파괴가 지구를 망가뜨린다', 7, '#46506b') +
      t(151, 136, '정치 · 경제 / 과학 기술 / 환경 — 세 분야를 두 눈으로 본다', 8.4, '#46506b');
  } };

  /* 정치 · 경제의 밝은 쪽 */
  CA.polgood = { w: 304, h: 144, d: function () {
    return "" +
      card(4, 8, 94, 76, '#eafaf0') +
      '<path d="M22 60h24v18H22zM58 60h24v18H58z" ' + f('#8ed7a3', 1.4) + '/>' +
      '<path d="M50 78V34" ' + k('#cbd5e1', 3, '5 4') + '/>' +
      arw(46, 44, 30, 44, '#047857', 2.2) + arw(56, 44, 72, 44, '#047857', 2.2) +
      t(51, 100, '국가 간 벽이 낮아진다', 7.6, '#047857') +
      t(51, 116, '정치적 협력이 강해진다', 7.2, '#46506b') +
      card(104, 8, 94, 76, '#eef3ff') +
      tag(110, 22, 82, 16, '#ffffff', '핵 안보', '#1d4ed8') +
      tag(110, 42, 82, 16, '#ffffff', '영토 · 종교 분쟁', '#1d4ed8') +
      tag(110, 62, 82, 16, '#ffffff', '난민 · 기아 · 빈곤', '#1d4ed8') +
      t(151, 100, '함께 풀어 간다', 8.6, '#1d4ed8') +
      t(151, 116, 'UN 같은 움직임이 늘어난다', 7, '#46506b') +
      card(204, 8, 94, 76, '#fff7e6') +
      fig(228, 66, .75, '#b45309') + fig(250, 66, .75, '#b45309') +
      fig(272, 66, .75, '#b45309') +
      '<path d="M216 30h66v14h-66z" ' + f('#ffffff', 1.3) + '/>' +
      t(249, 40, '기본권', 7.6, '#b45309') +
      t(251, 100, '기본권이 올라간다', 8.2, '#b45309') +
      t(251, 116, '민주주의 이념이 퍼진다', 7, '#46506b') +
      t(152, 140, '긍정적 관점 — 벽이 허물어지며 함께 풀어 가는 미래', 8.8, '#047857');
  } };

  /* 정치 · 경제의 어두운 쪽 */
  CA.polbad = { w: 304, h: 144, d: function () {
    return "" +
      card(4, 8, 94, 76, '#fdecec') +
      fig(30, 70, .7, '#b91c1c') + fig(50, 70, .7, '#1d4ed8') + fig(70, 70, .7, '#b45309') +
      '<path d="M26 34h50" ' + k('#b91c1c', 2.4) + '/>' +
      '<path d="M70 28l8 6-8 6" ' + k('#b91c1c', 2.4) + '/>' +
      t(51, 50, '자유무역 확대', 7.2, '#b91c1c') +
      t(51, 100, '경쟁이 치열해진다', 8.2, '#b91c1c') +
      t(51, 116, '국가 간 경쟁 심화', 7.2, '#46506b') +
      card(104, 8, 94, 76, '#fff7e6') +
      '<rect x="118" y="24" width="26" height="54" rx="3" ' + f('#e9a94a', 1.4) + '/>' +
      '<rect x="150" y="56" width="20" height="22" rx="3" ' + f('#f3d9a0', 1.3) + '/>' +
      '<rect x="174" y="64" width="18" height="14" rx="3" ' + f('#f3d9a0', 1.3) + '/>' +
      crown(131, 20, .5) +
      t(151, 100, '몇몇 나라가 독점', 8.2, '#b45309') +
      t(151, 116, '빈부 격차가 더 벌어진다', 7, '#46506b') +
      card(204, 8, 94, 76, '#fdecec') +
      '<path d="M224 66h22v12h-22z" ' + f('#9aa7b8', 1.3) + '/>' +
      '<path d="M246 70h26v8h-26z" ' + f('#6b7788', 1.3) + '/>' +
      puff(240, 36, 11, '#f0a0a0') + puff(256, 30, 9, '#f0a0a0') +
      '<path d="M226 52q10-12 20 0" ' + k('#b91c1c', 2.2) + '/>' +
      t(251, 100, '전쟁 · 테러가 잦아진다', 7.6, '#b91c1c') +
      t(251, 116, '국가 간 갈등이 깊어진다', 7, '#46506b') +
      t(152, 140, '부정적 관점 — 더 잘살되 더 치열해지는 미래', 8.8, '#b91c1c');
  } };

  /* 과학 기술의 밝은 쪽 */
  CA.techgood = { w: 304, h: 160, d: function () {
    return "" +
      card(4, 8, 94, 82, '#eef3ff') +
      '<rect x="22" y="24" width="22" height="18" rx="3" ' + f('#ffffff', 1.3) + '/>' +
      '<rect x="58" y="24" width="22" height="18" rx="3" ' + f('#ffffff', 1.3) + '/>' +
      '<rect x="22" y="58" width="22" height="18" rx="3" ' + f('#ffffff', 1.3) + '/>' +
      '<rect x="58" y="58" width="22" height="18" rx="3" ' + f('#ffffff', 1.3) + '/>' +
      '<path d="M44 33h14M33 42v16M69 42v16M44 67h14M33 33l36 34M69 33l-36 34" ' +
        k('#9fc6f5', 1.6) + '/>' +
      t(51, 106, '초연결 사회', 9, '#1d4ed8') +
      t(51, 122, '사물 인터넷으로', 7, '#46506b') +
      t(51, 134, '모든 것이 이어진다', 7, '#46506b') +
      card(104, 8, 94, 82, '#eafaf0') +
      bldg(118, 76, 18, 30, '#8ed7a3') + bldg(142, 76, 16, 42, '#8ed7a3') +
      bldg(164, 76, 18, 34, '#8ed7a3') +
      '<path d="M120 28h58v14h-58z" ' + f('#ffffff', 1.3) + '/>' +
      t(149, 38, '스마트 시티', 7.4, '#047857') +
      t(151, 106, '편리한 도시', 9, '#047857') +
      t(151, 122, '투표 · 민원도 인터넷으로', 6.8, '#46506b') +
      t(151, 134, '개인의 영향력이 커진다', 7, '#46506b') +
      card(204, 8, 94, 82, '#fff7e6') +
      '<path d="M216 62h30v12h-30z" ' + f('#f3d9a0', 1.3) + '/>' +
      '<circle cx="224" cy="76" r="4" ' + f('#46506b', 1.1) + '/>' +
      '<circle cx="240" cy="76" r="4" ' + f('#46506b', 1.1) + '/>' +
      '<path d="M258 54h26M262 50v8M280 50v8" ' + k('#b45309', 2) + '/>' +
      '<rect x="262" y="24" width="20" height="20" rx="4" ' + f('#f3d9a0', 1.3) + '/>' +
      '<circle cx="268" cy="32" r="2" fill="#46506b"/>' +
      '<circle cx="276" cy="32" r="2" fill="#46506b"/>' +
      t(251, 106, '자율주행 · 드론 · AI', 7.8, '#b45309') +
      t(251, 122, '노동 시간이 줄고', 7, '#46506b') +
      t(251, 134, '생명공학으로 수명이 는다', 6.8, '#46506b') +
      t(152, 156, '긍정적 관점 — 기술이 삶을 더 윤택하게 만든다', 8.8, '#047857');
  } };

  /* 과학 기술의 어두운 쪽 */
  CA.techbad = { w: 304, h: 146, d: function () {
    return "" +
      card(4, 8, 94, 78, '#fdecec') +
      '<rect x="26" y="26" width="50" height="34" rx="3" ' + f('#ffffff', 1.3) + '/>' +
      '<path d="M34 36h34M34 44h24" ' + k('#cbd5e1', 1.8) + '/>' +
      '<path d="M44 70v-8a7 7 0 0 1 14 0v8" ' + k('#b91c1c', 2.2) + '/>' +
      '<path d="M40 70h22v10H40z" ' + f('#f0a0a0', 1.3) + '/>' +
      '<path d="M66 22l-30 24" ' + k('#b91c1c', 2.4) + '/>' +
      t(51, 102, '개인정보 유출', 8.4, '#b91c1c') +
      t(51, 118, '해킹 · 사생활 침해', 7.2, '#46506b') +
      card(104, 8, 94, 78, '#fff7e6') +
      '<path d="M136 26q16 12 0 24-16 12 0 24" ' + k('#b45309', 2.6) + '/>' +
      '<path d="M162 26q-16 12 0 24 16 12 0 24" ' + k('#b45309', 2.6) + '/>' +
      '<path d="M138 32h22M143 44h12M138 56h22M143 68h12" ' + k('#b45309', 2) + '/>' +
      '<path d="M172 36l14 14M186 36l-14 14" ' + k('#b91c1c', 2.6) + '/>' +
      t(151, 102, '유전자 조작 · 복제', 7.8, '#b45309') +
      t(151, 118, '생명을 어디까지 다룰까', 7, '#46506b') +
      card(204, 8, 94, 78, '#eef3ff') +
      '<rect x="236" y="26" width="30" height="28" rx="5" ' + f('#c7d6ee', 1.4) + '/>' +
      '<circle cx="245" cy="38" r="3" fill="#46506b"/>' +
      '<circle cx="257" cy="38" r="3" fill="#46506b"/>' +
      '<path d="M242 62h18v14h-18z" ' + f('#9fc6f5', 1.3) + '/>' +
      '<path d="M276 34q8 10 0 20" ' + k('#1d4ed8', 2) + '/>' +
      t(251, 102, '인공지능의 윤리', 8.4, '#1d4ed8') +
      t(251, 118, '안전성을 누가 책임질까', 7, '#46506b') +
      t(152, 142, '부정적 관점 — 기술이 새로운 위험을 함께 데려온다', 8.8, '#b91c1c');
  } };

  /* 환경의 어두운 쪽 */
  CA.envbad = { w: 304, h: 142, d: function () {
    return "" +
      card(4, 8, 94, 76, '#fdecec') +
      sun(48, 32, 11, '#e9a94a') +
      '<path d="M22 70q14-10 28 0 14 10 26 0" ' + k('#e2a06a', 2.6) + '/>' +
      '<path d="M26 58h12M44 54h14M64 60h10" ' + k('#f0cd78', 2.2) + '/>' +
      t(51, 100, '온난화 · 사막화', 8.4, '#b91c1c') +
      t(51, 116, '자원을 마구 쓴 결과', 7.2, '#46506b') +
      card(104, 8, 94, 76, '#fff7e6') +
      '<path d="M126 70q10-8 20 0" ' + k('#2f8f5b', 2.2) + '/>' +
      broadleaf(140, 70, .5, 1) + broadleaf(164, 70, .5, 1) +
      '<path d="M176 34q-8 6 0 12 8-6 0-12z" ' + f('#f0a0a0', 1.3) + '/>' +
      '<path d="M126 28l54 34" ' + k('#b91c1c', 2.4) + '/>' +
      t(151, 100, '생물 종이 줄어든다', 8, '#b45309') +
      t(151, 116, '숲과 바다가 함께 무너진다', 6.8, '#46506b') +
      card(204, 8, 94, 76, '#eef3ff') +
      '<circle cx="251" cy="44" r="22" ' + f('#9fc6f5', 1.5) + '/>' +
      '<path d="M229 44h44M251 22v44M238 26q12 18 0 36M264 26q-12 18 0 36" ' + k('#1d4ed8', 1.1) + '/>' +
      '<path d="M232 26l38 36" ' + k('#b91c1c', 2.6) + '/>' +
      t(251, 100, '생존이 위협받는다', 8.2, '#1d4ed8') +
      t(251, 116, '인간만의 문제가 아니다', 7, '#46506b') +
      t(152, 138, '환경만큼은 부정적 관점이 더 많은 편이다', 8.8, '#b91c1c');
  } };

  /* 환경의 밝은 쪽 */
  CA.envgood = { w: 304, h: 148, d: function () {
    return "" +
      card(4, 8, 94, 80, '#eafaf0') +
      '<rect x="30" y="22" width="42" height="56" rx="3" ' + f('#ffffff', 1.4) + '/>' +
      '<path d="M30 36h42M30 50h42M30 64h42" ' + k('#cbd5e1', 1.4) + '/>' +
      '<path d="M36 34q6-8 12 0M54 34q6-8 12 0M36 48q6-8 12 0M54 48q6-8 12 0M36 62q6-8 12 0' +
      'M54 62q6-8 12 0" ' + k('#2f8f5b', 1.8) + '/>' +
      t(51, 104, '수직 농장', 9.4, '#047857') +
      t(51, 120, '건물 안에서 기른다', 7.2, '#46506b') +
      t(51, 134, '수확량이 30배', 7.6, '#047857') +
      card(104, 8, 94, 80, '#eef3ff') +
      factory(114, 56, .5) +
      puff(146, 30, 8, '#9aa7b8') +
      arw(152, 36, 172, 52, '#1d4ed8', 2.2) +
      '<path d="M112 70h78" ' + k('#8a6a4a', 2) + '/>' +
      '<path d="M166 56h22v22h-22z" ' + f('#d9a86c', 1.3) + '/>' +
      t(177, 70, 'CO₂', 7, '#7a4a12') +
      t(151, 104, '이산화탄소 포집', 8.4, '#1d4ed8') +
      t(151, 120, '모아서 땅속 · 바닷속에', 7, '#46506b') +
      t(151, 134, '저장해 버린다', 7.2, '#46506b') +
      card(204, 8, 94, 80, '#fff7e6') +
      sun(226, 32, 9) +
      '<path d="M252 56V30" ' + k('#94a3b8', 2.2) + '/>' +
      '<path d="M252 30l12-7M252 30l-2 14M252 30l-12-5" ' + k('#cbd5e1', 3) + '/>' +
      '<path d="M214 72q12-9 24 0 12 9 24 0 12-9 24 0" ' + k('#7fb6e8', 2.4) + '/>' +
      t(251, 104, '신재생 · 복원', 8.6, '#b45309') +
      t(251, 120, '멸종한 종을 되살리고', 7, '#46506b') +
      t(251, 134, '온실가스를 함께 줄인다', 7, '#46506b') +
      t(152, 146, '긍정적 관점 — 인간의 과오를 고쳐 나갈 수 있다', 8.8, '#047857');
  } };

  /* 4차 산업 혁명과 일자리 */
  CA.future4 = { w: 304, h: 144, d: function () {
    return "" +
      card(4, 10, 138, 76, '#eef3ff') +
      '<rect x="30" y="26" width="30" height="28" rx="5" ' + f('#c7d6ee', 1.4) + '/>' +
      '<circle cx="39" cy="38" r="3" fill="#46506b"/>' +
      '<circle cx="51" cy="38" r="3" fill="#46506b"/>' +
      '<path d="M34 62h22v16H34z" ' + f('#9fc6f5', 1.3) + '/>' +
      '<path d="M78 40h46M78 54h46M78 68h30" ' + k('#1d4ed8', 2.4) + '/>' +
      t(101, 28, '인공지능 · 자동화', 7.4, '#1d4ed8') +
      t(73, 102, '사라지는 일자리', 8.8, '#1d4ed8') +
      t(73, 118, '기계가 대신하는 일', 7.2, '#46506b') +
      arw(148, 48, 170, 48, '#46506b', 2.4) +
      card(176, 10, 124, 76, '#eafaf0') +
      fig(202, 68, .8, '#047857') +
      '<rect x="222" y="30" width="26" height="20" rx="3" ' + f('#ffffff', 1.3) + '/>' +
      '<path d="M228 44l6-8 6 6" ' + k('#047857', 2) + '/>' +
      '<rect x="258" y="30" width="26" height="20" rx="3" ' + f('#ffffff', 1.3) + '/>' +
      '<path d="M264 40h14M271 33v14" ' + k('#047857', 2) + '/>' +
      '<path d="M222 62h62v16h-62z" ' + f('#8ed7a3', 1.3) + '/>' +
      t(253, 73, '새로 생기는 일', 7.4, '#06563a') +
      t(238, 102, '바뀌는 일자리 구조', 8.4, '#047857') +
      t(238, 118, '없어지고 또 생겨난다', 7.2, '#46506b') +
      t(152, 140, '기술의 긍정과 부정을 함께 묻는 문항이 나온다', 8.8, '#b45309');
  } };

  /* 지속가능발전목표 */
  CA.sdgs = { w: 304, h: 150, d: function () {
    var g = '', i, C = ['#e03e3e', '#e9a94a', '#8ed7a3', '#9fc6f5', '#c9a0e0', '#f3b55a',
      '#7fb6e8', '#f0a0a0', '#b9d98f', '#d9a86c', '#9aa7b8', '#f2c84b', '#7fd6c6', '#a0b6ef',
      '#e2a06a', '#8fd0a8', '#c7b2e8'];
    for (i = 0; i < 17; i++)
      g += '<rect x="' + (18 + (i % 9) * 30) + '" y="' + (26 + Math.floor(i / 9) * 30) +
        '" width="26" height="26" rx="4" ' + f(C[i], 1.1) + '/>' +
        t(31 + (i % 9) * 30, 43 + Math.floor(i / 9) * 30, String(i + 1), 9, '#ffffff');
    return "" +
      t(152, 16, '국제 연합이 정한 2030년까지의 약속', 9.2, '#46506b') +
      g +
      t(152, 104, '지속가능발전목표 SDGs — 17개 목표', 10, '#1d4ed8') +
      t(152, 124, '빈곤 종식 · 기아 해결 · 기후 행동 · 불평등 완화…', 8.4, '#46506b') +
      t(152, 146, '경제 · 사회 · 환경의 균형이 핵심이다', 9, '#047857');
  } };

  /* 미래를 살아갈 세 가지 자세 */
  CA.futureattitude = { w: 304, h: 144, d: function () {
    return "" +
      card(4, 8, 94, 76, '#eafaf0') +
      '<circle cx="51" cy="40" r="17" ' + f('#8ed7a3', 1.4) + '/>' +
      '<path d="M43 40l6 7 12-15" ' + k('#06563a', 2.6) + '/>' +
      '<path d="M32 68h38" ' + k('#2f8f5b', 2.2) + '/>' +
      t(51, 100, '올바른 인성과 가치관', 7.6, '#047857') +
      t(51, 116, '정보와 기술을', 7.2, '#46506b') +
      t(51, 128, '바르게 쓴다', 7.2, '#46506b') +
      card(104, 8, 94, 76, '#eef3ff') +
      '<circle cx="146" cy="38" r="14" ' + f('none', 2.2) + '/>' +
      '<path d="M156 48l12 12" ' + k('#1d4ed8', 3) + '/>' +
      '<path d="M120 66h62" ' + k('#cbd5e1', 2) + '/>' +
      '<path d="M124 72h32" ' + k('#cbd5e1', 2) + '/>' +
      t(151, 100, '비판적 사고', 9, '#1d4ed8') +
      t(151, 116, '쏟아지는 정보를', 7.2, '#46506b') +
      t(151, 128, '그대로 믿지 않는다', 7.2, '#46506b') +
      card(204, 8, 94, 76, '#fff7e6') +
      '<circle cx="251" cy="40" r="17" ' + f('#f3d9a0', 1.4) + '/>' +
      '<path d="M234 40h34M251 23v34M241 27q10 13 0 26M261 27q-10 13 0 26" ' + k('#b45309', 1.2) + '/>' +
      '<path d="M232 66q19 10 38 0" ' + k('#b45309', 2.2) + '/>' +
      t(251, 100, '세계 시민 의식', 9, '#b45309') +
      t(251, 116, '우리나라만이 아니라', 7.2, '#46506b') +
      t(251, 128, '지구촌 모두를 본다', 7.2, '#46506b') +
      t(152, 142, '어떤 미래가 오느냐는 우리가 어떤 자세로 사느냐에 달렸다', 8.4, '#46506b');
  } };

  /* 세계 시민 의식 */
  CA.globalcitizen = { w: 302, h: 138, d: function () {
    return "" +
      '<circle cx="76" cy="58" r="40" ' + f('#9fc6f5', 1.6) + '/>' +
      '<path d="M36 58h80M76 18v80M56 23q-12 35 0 70M96 23q12 35 0 70" ' + k('#1d4ed8', 1.2) + '/>' +
      fig(44, 112, .7, '#b91c1c') + fig(68, 112, .7, '#047857') +
      fig(92, 112, .7, '#b45309') + fig(116, 112, .7, '#2f6df6') +
      '<path d="M36 100q40 14 86 0" ' + k('#46506b', 2, '5 4') + '/>' +
      card(148, 14, 150, 44, '#fdecec') +
      t(223, 32, '나만 · 우리나라만 잘살기', 8.4, '#b91c1c') +
      t(223, 48, '이것으로는 부족하다', 7.6, '#46506b') +
      card(148, 66, 150, 52, '#eafaf0') +
      t(223, 84, '문화적 차이를 인정하고', 8, '#047857') +
      t(223, 98, '다양성을 존중하며', 8, '#047857') +
      t(223, 112, '지구촌 문제를 함께 푼다', 8, '#047857') +
      t(151, 136, '세계 시민이라는 책임 의식을 갖는 것', 9, '#1d4ed8');
  } };


  /* 무엇으로 묶느냐에 따라 문화권이 달라진다 */
  CA.groupby = { w: 304, h: 152, d: function () {
    function chip(x, y, s2, bg) {
      return '<rect x="' + x + '" y="' + y + '" width="28" height="22" rx="5" ' +
        f(bg || '#ffffff', 1.3) + '/>' + t(x + 14, y + 15, s2, 9.4, '#1b2330');
    }
    function grp(x, y, a, b, c) {
      return '<rect x="' + x + '" y="' + y + '" width="62" height="28" rx="7" fill="none" stroke="' +
        c + '" stroke-width="2"/>' + t(x + 31, y + 19, a + '   ' + b, 9.4, c);
    }
    return "" +
      t(152, 14, '같은 네 나라를 놓고 보자', 9.4, '#46506b') +
      chip(86, 20, '가') + chip(120, 20, '나') + chip(154, 20, '다') + chip(188, 20, '라') +
      card(4, 58, 144, 62, '#eef3ff') +
      t(76, 76, '언어로 묶으면', 8.8, '#1d4ed8') +
      grp(14, 84, '가', '나', '#2f6df6') + grp(82, 84, '다', '라', '#2f6df6') +
      card(156, 58, 144, 62, '#fff7e6') +
      t(228, 76, '종교로 묶으면', 8.8, '#b45309') +
      grp(166, 84, '가', '다', '#b45309') + grp(234, 84, '나', '라', '#b45309') +
      t(152, 138, '종교가 같아도 기후와 언어가 다를 수 있고, 언어가 같아도 종교가 다를 수 있다',
        7.8, '#46506b') +
      t(152, 150, '무엇을 기준으로 삼느냐에 따라 문화권은 다르게 묶인다', 8.8, '#b45309');
  } };

  /* 그림을 컷 안 (cx, cy)에 maxW × maxH 상자로 맞춰 넣는다 */
  function place(name, cx, cy, maxW, maxH, opt) {
    var a = CA[name];
    if (!a) return '';
    var s = Math.min((maxW || a.w) / a.w, (maxH || a.h) / a.h);
    return '<g transform="translate(' + (cx - a.w * s / 2) + ',' + (cy - a.h * s / 2) +
      ') scale(' + s + ')">' + a.d(opt || {}) + '</g>';
  }

  window.ComicArt = { has: CA, place: place };
})();
