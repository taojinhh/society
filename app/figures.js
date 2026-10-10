/* 핵심 그림 — 개념·대비표 페이지에 들어가는 다이어그램과 단원 아이콘
   글을 읽지 않아도 '이 개념이 어디에 있는지' 한눈에 보이게 하는 것이 목적이다. */
(function () {
  'use strict';
  function esc(s) { return UI.esc(s); }

  /* ── 단원 아이콘 (선 그림) ── */
  var P = 'fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"';
  var ICONS = {
    u1: '<circle cx="12" cy="12" r="4.2" ' + P + '/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" ' + P + '/>',
    u2: '<path d="M12 20s-7-4.4-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4.6-7 9-7 9z" ' + P + '/>',
    u3: '<path d="M3 20h18M6 20l5-9 5 9M9.5 14h5" ' + P + '/><path d="M18 20c0-4 1.5-6 3-7" ' + P + '/><circle cx="18" cy="9" r="2.6" ' + P + '/>',
    u4: '<circle cx="12" cy="12" r="9" ' + P + '/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" ' + P + '/>',
    u5: '<path d="M3 21h18M5 21V9l5-3v15M14 21V11l5-2v12" ' + P + '/><path d="M7.5 12h0M7.5 15h0M16.5 14h0M16.5 17h0" ' + P + '/>',
    u6: '<path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" ' + P + '/><path d="M9 12l2 2 4-4" ' + P + '/>',
    u7: '<path d="M12 4v16M7 20h10M5 8h14M5 8l-2 5a3 3 0 0 0 6 0zM19 8l2 5a3 3 0 0 1-6 0z" ' + P + '/>',
    u8: '<path d="M3 20h18M6 20v-6M11 20V8M16 20v-9M21 20V5" ' + P + '/>',
    u9: '<circle cx="12" cy="12" r="9" ' + P + '/><path d="M12 3a14 14 0 0 0 0 18a14 14 0 0 0 0-18M3.5 9h17M3.5 15h17" ' + P + '/>',
    u10: '<path d="M12 21c0-5 2-8 6-9-4-1-6-4-6-8-0 4-2 7-6 8 4 1 6 4 6 9z" ' + P + '/><path d="M4 21h16" ' + P + '/>'
  };
  function icon(uid) {
    if (!ICONS[uid]) return '';
    return '<span class="uicon"><svg viewBox="0 0 24 24" aria-hidden="true">' + ICONS[uid] + '</svg></span>';
  }

  /* ── 카드 나열 도식 (기본) / 화살표 흐름 도식 ── */
  function cards(items, opts) {
    opts = opts || {};
    var n = items.length, flow = !!opts.flow;
    var out = [];
    items.forEach(function (it, i) {
      if (i) out.push(flow ? '<div class="farrow">›</div>'
                           : (n === 2 ? '<div class="fvs">vs</div>' : ''));
      out.push('<div class="fc' + (opts.hl && it.id === opts.hl ? ' on' : '') + '">' +
        '<b>' + esc(it.k) + '</b>' +
        (it.v ? '<span>' + esc(it.v) + '</span>' : '') + '</div>');
    });
    return '<div class="fig figcards n' + n + (flow ? ' flow' : '') + '">' +
      out.join('') + '</div>';
  }

  /* ── 개념 하나 + 판별 단서 방사 도식 ── */
  function spoke(term, keys) {
    keys = (keys || []).slice(0, 4);
    if (!keys.length) return '';
    return '<div class="fig figspoke">' +
      '<div class="hub">' + esc(term) + '</div>' +
      '<div class="stem"></div>' +
      '<div class="rays">' + keys.map(function (k) {
        return '<span>' + esc(k) + '</span>';
      }).join('') + '</div>' +
      '<div class="cap">이 말이 보이면 이 개념</div></div>';
  }

  /* 값이 가장 많이 갈리는 줄을 고른다 — 그림 한 장으로 구분이 되어야 하므로 */
  function bestRow(p) {
    var best = null, bestN = -1;
    (p.rows || []).forEach(function (r) {
      var seen = {}, n = 0;
      r.v.forEach(function (v) { if (!seen[v]) { seen[v] = 1; n++; } });
      if (n > bestN) { bestN = n; best = r; }
    });
    return best || { v: [] };
  }

  /* ── 대비 쌍 → 도식 스펙 ── */
  function forPair(p, hl) {
    if (!p) return '';
    var row = bestRow(p);
    var items = p.cols.map(function (c, i) {
      return { k: c, v: row.v[i] || '', id: (p.refs || [])[i] };
    });
    var body = cards(items, { flow: p.fig === 'flow', hl: hl });
    return '<div class="figwrap"><div class="figtitle">' + esc(p.title) +
      (row.axis ? ' <span>· ' + esc(row.axis) + ' 기준</span>' : '') + '</div>' +
      body + '</div>';
  }

  /* ── 개념 → 도식 (대비 쌍이 있으면 그 안에서 위치를 보여 준다) ── */
  function forConcept(c) {
    if (!c) return '';
    var p = App.pairOf(c.id);
    if (p && p.refs && p.refs.indexOf(c.id) >= 0 && p.cols.length >= 2) return forPair(p, c.id);
    return spoke(c.t, c.k);
  }

  window.Fig = { icon: icon, cards: cards, spoke: spoke, forPair: forPair, forConcept: forConcept };
})();
