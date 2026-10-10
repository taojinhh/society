/* 문항 생성 엔진 — 같은 개념을 다른 사례·다른 자료로 묻는다 */
(function () {
  'use strict';

  var byId = {}, casesBy = {}, pairById = {}, unitById = {};

  function init() {
    (window.CONCEPTS || []).forEach(function (c) { byId[c.id] = c; });
    (window.CASES || []).forEach(function (x, i) {
      x.id = 'x' + i;
      (casesBy[x.c] = casesBy[x.c] || []).push(x);
    });
    (window.PAIRS || []).forEach(function (p) { pairById[p.id] = p; });
    (window.UNITS || []).forEach(function (u) { unitById[u.id] = u; });
  }

  function concept(id) { return byId[id]; }
  function pair(id) { return pairById[id]; }
  function unit(id) { return unitById[id]; }
  function casesOf(id) { return casesBy[id] || []; }
  function allConcepts() { return window.CONCEPTS || []; }
  function conceptsOf(uid) { return allConcepts().filter(function (c) { return c.u === uid; }); }

  /* 개념이 속한 대비 묶음(비교표가 있는 것 우선) */
  function pairOf(cid) {
    var c = byId[cid];
    if (c && c.pair && pairById[c.pair]) return pairById[c.pair];
    var found = null;
    (window.PAIRS || []).forEach(function (p) {
      if (!found && p.refs && p.refs.indexOf(cid) >= 0) found = p;
    });
    return found;
  }

  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function sample(a, n) { return shuffle(a).slice(0, n); }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }

  /* 같은 개념이라도 매번 다른 사례를 쓰도록 */
  function freshCase(cid) {
    var list = casesOf(cid);
    if (!list.length) return null;
    var st = Store.cs(cid);
    st.used = st.used || [];
    var avail = list.filter(function (x) { return st.used.indexOf(x.id) < 0; });
    if (!avail.length) { st.used = []; avail = list; }
    var chosen = pick(avail);
    st.used.push(chosen.id);
    Store.save();
    return chosen;
  }

  /* 오답 선택지: 대비 개념을 우선 배치 (기획서 5절 '대비 문항') */
  function distractors(cid, n) {
    var p = pairOf(cid), pool = [];
    if (p && p.refs) pool = p.refs.filter(function (r) { return r && r !== cid && byId[r]; });
    if (pool.length < n) {
      var c = byId[cid];
      var same = conceptsOf(c.u).map(function (x) { return x.id; })
        .filter(function (x) { return x !== cid && pool.indexOf(x) < 0; });
      pool = pool.concat(shuffle(same));
    }
    if (pool.length < n) {
      pool = pool.concat(shuffle(allConcepts().map(function (x) { return x.id; })
        .filter(function (x) { return x !== cid && pool.indexOf(x) < 0; })));
    }
    return pool.slice(0, n);
  }

  function buildMC(cid, stem, solPrefix) {
    var wrong = distractors(cid, 3);
    var ids = shuffle([cid].concat(wrong));
    return {
      kind: 'gen', c: cid,
      q: stem,
      ch: ids.map(function (i) { return byId[i].t; }),
      a: ids.indexOf(cid),
      sol: (solPrefix ? solPrefix + ' ' : '') + byId[cid].t + ': ' + byId[cid].d,
      ids: ids
    };
  }

  /* ① 개념 즉답 퀴즈 — 용어 ↔ 뜻 (20초 제한) */
  function genInstant(cid) {
    var c = byId[cid];
    if (Math.random() < 0.6) {
      return buildMC(cid, '다음 설명에 해당하는 개념은?\n\n"' + c.d + '"', '');
    }
    var wrong = distractors(cid, 3);
    var ids = shuffle([cid].concat(wrong));
    return {
      kind: 'gen', c: cid,
      q: '‘' + c.t + '’에 대한 설명으로 옳은 것은?',
      ch: ids.map(function (i) { return byId[i].d; }),
      a: ids.indexOf(cid),
      sol: c.t + ': ' + c.d + (c.x ? ' / ' + c.x : ''),
      ids: ids
    };
  }

  /* ② 사례 변형 문항 — 같은 개념, 새 사례 */
  function genCase(cid) {
    var x = freshCase(cid);
    if (!x) return genInstant(cid);
    var q = buildMC(cid, '다음 사례에 해당하는 개념으로 가장 적절한 것은?\n\n"' + x.t + '"', '');
    q.sol = x.w + ' (' + byId[cid].t + ')';
    q.caseId = x.id;
    return q;
  }

  /* ③ 대비 문항 — 대비 개념 쌍을 선택지에 함께 배치 */
  function genContrast(pid) {
    var p = pairById[pid];
    if (!p) return null;
    var refs = (p.refs || []).filter(function (r) { return r && byId[r] && casesOf(r).length; });
    if (!refs.length) return null;
    var cid = pick(refs);
    var x = freshCase(cid);
    /* 대비 개념을 먼저 넣고, 4지선다가 되도록 같은 단원 개념으로 채운다 */
    var members = shuffle((p.refs || []).filter(function (r) {
      return r && byId[r] && r !== cid;
    }));
    var ids = [cid].concat(members).slice(0, 4);
    if (ids.length < 4) {
      var fill = shuffle(conceptsOf(byId[cid].u).map(function (c) { return c.id; }))
        .concat(shuffle(allConcepts().map(function (c) { return c.id; })));
      for (var fi = 0; fi < fill.length && ids.length < 4; fi++) {
        if (ids.indexOf(fill[fi]) < 0) ids.push(fill[fi]);
      }
    }
    ids = shuffle(ids.slice(0, 4));
    return {
      kind: 'gen', c: cid, pair: pid,
      q: '다음 사례에 해당하는 개념은?\n\n"' + x.t + '"',
      ch: ids.map(function (i) { return byId[i].t; }),
      a: ids.indexOf(cid),
      sol: x.w + ' — ' + p.tip,
      ids: ids, caseId: x.id
    };
  }

  /* ④ 자료 문항 — 지도 클릭형은 선택지가 없으므로 4지선다 세트에서 제외한다 */
  function dataQuestions(uid) {
    var out = [];
    (window.DATASETS || []).forEach(function (d) {
      if (uid && d.u !== uid) return;
      if (d.type === 'map') return;
      (d.qs || []).forEach(function (q, i) {
        if (!q.ch || !q.ch.length) return;
        out.push({ kind: 'data', ds: d.id, qi: i, u: d.u });
      });
    });
    return out;
  }

  /* 기출형 은행 */
  function bankQuestions(uid) {
    return (window.QBANK || []).map(function (q, i) { return { kind: 'bank', bi: i, u: q.u, c: q.c }; })
      .filter(function (q) { return !uid || q.u === uid; });
  }
  function bank(i) { return window.QBANK[i]; }

  /* 모의고사 25문항 조립 — 단원 고르게 + 자료 문항 포함 */
  function buildExam(n) {
    n = n || 25;
    var units = (window.UNITS || []).map(function (u) { return u.id; });
    var out = [], usedBank = {};
    var perUnit = Math.floor(n / units.length);       // 10단원 × 2 = 20
    units.forEach(function (uid) {
      var b = shuffle(bankQuestions(uid));
      for (var i = 0; i < perUnit && i < b.length; i++) { usedBank[b[i].bi] = 1; out.push(b[i]); }
    });
    // 남은 문항: 자료 문항 + 대비/사례 생성 문항
    var rest = n - out.length;
    var dq = shuffle(dataQuestions());
    var take = Math.min(rest, Math.max(2, Math.round(n * 0.16)), dq.length);
    for (var i = 0; i < take; i++) out.push(dq[i]);
    while (out.length < n) {
      var p = pick(window.PAIRS);
      var g = genContrast(p.id);
      if (g) out.push({ kind: 'inline', gen: g, u: p.u });
    }
    return shuffle(out).slice(0, n);
  }

  /* 단원 보스전 — 대비 개념이 섞인 사례 5문항 */
  function bossSet(uid) {
    var ps = (window.PAIRS || []).filter(function (p) { return p.u === uid; });
    var out = [];
    shuffle(ps).forEach(function (p) {
      if (out.length >= 5) return;
      var g = genContrast(p.id);
      if (g) out.push(g);
    });
    var cs = shuffle(conceptsOf(uid));
    for (var i = 0; out.length < 5 && i < cs.length; i++) {
      if (casesOf(cs[i].id).length) out.push(genCase(cs[i].id));
    }
    while (out.length < 5 && cs.length) out.push(genInstant(pick(cs).id));
    return out.slice(0, 5);
  }

  /* 복습 큐에서 문항 뽑기 — 반드시 '다른 사례'로. uid를 주면 그 단원만. */
  function reviewSet(n, uid) {
    function only(list) {
      return uid ? list.filter(function (id) {
        return byId[id] && byId[id].u === uid;
      }) : list;
    }
    var due = only(Store.dueConcepts());
    if (!due.length) due = only(Store.unstableConcepts());
    var out = [];
    shuffle(due).slice(0, n || 10).forEach(function (cid) {
      out.push(casesOf(cid).length ? genCase(cid) : genInstant(cid));
    });
    return out;
  }

  /* 즉답 퀴즈 세트 — 불안정 개념 우선, 미학습 개념 보충 */
  function quizSet(n, uid) {
    n = n || 10;
    var pool = uid ? conceptsOf(uid).map(function (c) { return c.id; })
                   : allConcepts().map(function (c) { return c.id; });
    var unstable = Store.unstableConcepts().filter(function (id) { return pool.indexOf(id) >= 0; });
    var fresh = pool.filter(function (id) { return Store.mastery(id) === 0; });
    var weak = pool.filter(function (id) { return Store.mastery(id) === 2; });
    var order = shuffle(unstable).concat(shuffle(fresh), shuffle(weak), shuffle(pool));
    var seen = {}, out = [];
    for (var i = 0; i < order.length && out.length < n; i++) {
      if (seen[order[i]]) continue;
      seen[order[i]] = 1;
      out.push(genInstant(order[i]));
    }
    return out;
  }

  window.App = {
    init: init, concept: concept, pair: pair, unit: unit, casesOf: casesOf,
    conceptsOf: conceptsOf, pairOf: pairOf, allConcepts: allConcepts,
    shuffle: shuffle, sample: sample, pick: pick,
    genInstant: genInstant, genCase: genCase, genContrast: genContrast,
    buildExam: buildExam, bossSet: bossSet, reviewSet: reviewSet, quizSet: quizSet,
    bank: bank, bankQuestions: bankQuestions, dataQuestions: dataQuestions
  };
})();
