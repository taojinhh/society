/* 학습 기록 저장소 — localStorage 기반
   간격반복 큐(1·3·7일), 숙달도, 연속 학습, 배지, 오답 원인 로그 */
(function () {
  'use strict';
  var KEY = 'tonghap-master-v1';
  var INTERVALS = [1, 3, 7];          // 기획서 5절: 1·3·7일
  var CLEAR_STREAK = 3;               // 서로 다른 날 3회 연속 정답 시 해제
  var SLOW_MS = 8000;                 // 8초 넘게 걸리면 '불안정'
  var FULL_RIGHT = 5;                 // '완성'에 필요한 누적 정답 수
  var OK_RIGHT = 3;                   // '익힘'에 필요한 누적 정답 수

  function today() {
    var d = new Date();
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function addDays(days) {
    var d = new Date();
    d.setDate(d.getDate() + days);
    d.setHours(4, 0, 0, 0);           // 새벽 4시 기준으로 '다음 날' 처리
    return d.getTime();
  }

  function blank() {
    return {
      v: 1,
      startedAt: Date.now(),
      concepts: {},
      pairs: {},
      units: {},
      errors: [],
      learn: {},                       // 1부 기본개념 학습 통과 기록
      wrongs: [],                      // 오답 노트 (문항 통째로 보관)
      exams: [],
      ds: {},                          // 자료 유형별 완료 횟수
      quiz: { total: 0, right: 0 },
      drills: { dataread: 0, stem: 0 },
      days: {},                        // 'YYYY-MM-DD' -> 학습 분
      streak: 0,
      lastDay: null,
      badges: [],
      week: 1
    };
  }

  var S = load();

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return blank();
      var o = JSON.parse(raw);
      var b = blank();
      for (var k in b) if (!(k in o)) o[k] = b[k];
      return o;
    } catch (e) { return blank(); }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {}
  }

  function cs(id) {
    if (!S.concepts[id]) {
      S.concepts[id] = {
        seen: 0, right: 0, wrong: 0,
        stage: -1,        // -1: 큐에 없음, 0~2: 1·3·7일 단계
        due: 0,
        dayStreak: 0,     // 서로 다른 날 연속 정답 횟수
        lastDay: null,
        unstable: false,
        slow: 0
      };
    }
    return S.concepts[id];
  }

  /* 숙달도 0~4 → 색 표시 */
  function mastery(id) {
    var c = S.concepts[id];
    if (!c || c.seen === 0) return 0;              // 미학습
    if (c.unstable) return 1;                      // 불안정(재출제 대상)
    var rate = c.right / Math.max(1, c.right + c.wrong);
    if (c.right >= FULL_RIGHT && rate >= 0.9) return 4;   // 완성
    if (c.right >= OK_RIGHT && rate >= 0.75) return 3;    // 익힘
    return 2;                                      // 학습 중
  }

  /* 정답/오답 기록 — 간격반복 큐 갱신 */
  function record(conceptId, ok, ms) {
    if (!conceptId) return;
    var c = cs(conceptId);
    var d = today();
    c.seen++;
    if (ok) {
      c.right++;
      if (typeof ms === 'number' && ms > SLOW_MS) {
        c.slow++;
        c.unstable = true;                          // 느린 개념은 불안정 분류
        if (c.stage < 0) { c.stage = 0; c.due = addDays(INTERVALS[0]); }
      } else if (c.unstable) {
        if (c.lastDay !== d) {                      // 같은 날 반복은 1회만 인정
          c.dayStreak++;
          c.lastDay = d;
          if (c.dayStreak >= CLEAR_STREAK) {        // 3일 연속 정답 → 해제
            c.unstable = false; c.stage = -1; c.due = 0; c.dayStreak = 0;
          } else {
            c.stage = Math.min(c.stage + 1, INTERVALS.length - 1);
            c.due = addDays(INTERVALS[c.stage]);
          }
        }
      }
    } else {
      c.wrong++;
      c.unstable = true;
      c.dayStreak = 0;
      c.stage = 0;
      c.due = addDays(INTERVALS[0]);                // 오답 → 1일 뒤 다른 사례로 재출제
      c.lastDay = null;
    }
    save();
  }

  function dueConcepts() {
    var now = Date.now(), out = [];
    for (var id in S.concepts) {
      var c = S.concepts[id];
      if (c.unstable && c.due && c.due <= now) out.push(id);
    }
    return out;
  }
  function unstableConcepts() {
    var out = [];
    for (var id in S.concepts) if (S.concepts[id].unstable) out.push(id);
    return out;
  }
  function dueUnits() {
    var m = {};
    dueConcepts().forEach(function (id) {
      var c = App.concept(id); if (c) m[c.u] = (m[c.u] || 0) + 1;
    });
    return m;
  }

  function logError(cause, conceptId, qid) {
    S.errors.push({ ts: Date.now(), cause: cause, c: conceptId || null, q: qid || null });
    if (S.errors.length > 500) S.errors = S.errors.slice(-500);
    save();
  }
  function errorStats() {
    var m = {};
    (window.ERROR_CAUSES || []).forEach(function (e) { m[e.id] = 0; });
    S.errors.forEach(function (e) { if (e.cause in m) m[e.cause]++; });
    return m;
  }

  /* 연속 학습일 */
  function touch(minutes) {
    var d = today();
    S.days[d] = (S.days[d] || 0) + (minutes || 0);
    if (S.lastDay !== d) {
      var y = new Date(); y.setDate(y.getDate() - 1);
      var yd = y.getFullYear() + '-' + pad(y.getMonth() + 1) + '-' + pad(y.getDate());
      S.streak = (S.lastDay === yd) ? S.streak + 1 : 1;
      S.lastDay = d;
    }
    save();
  }

  function award(id) {
    if (S.badges.indexOf(id) < 0) { S.badges.push(id); save(); return true; }
    return false;
  }

  function pairState(id) {
    if (!S.pairs[id]) S.pairs[id] = { plays: 0, best: 0, cleared: false };
    return S.pairs[id];
  }
  function unitState(id) {
    if (!S.units[id]) S.units[id] = { boss: false, tries: 0 };
    return S.units[id];
  }

  /* 단원 숙달도 평균(0~4) */
  function unitMastery(uid) {
    var list = (window.CONCEPTS || []).filter(function (c) { return c.u === uid; });
    if (!list.length) return 0;
    var sum = 0;
    list.forEach(function (c) { sum += mastery(c.id); });
    return sum / list.length;
  }

  /* ───────── 1부 기본개념 학습 ───────── */
  function isLearned(id) { return !!(S.learn[id] && S.learn[id].done); }
  function setLearned(id, tries) {
    var l = S.learn[id] || (S.learn[id] = { done: 0, tries: 0 });
    l.done = 1; l.tries = (l.tries || 0) + (tries || 0); l.ts = Date.now();
    save();
  }
  function addLearnTry(id) {
    var l = S.learn[id] || (S.learn[id] = { done: 0, tries: 0 });
    l.tries = (l.tries || 0) + 1; save();
  }
  function learnedIn(uid) {
    var n = 0;
    (window.CONCEPTS || []).forEach(function (c) { if (c.u === uid && isLearned(c.id)) n++; });
    return n;
  }
  function learnedTotal() {
    var n = 0;
    (window.CONCEPTS || []).forEach(function (c) { if (isLearned(c.id)) n++; });
    return n;
  }
  function learnedInBook(book) {
    var a = 0, t = 0;
    (window.UNITS || []).forEach(function (u) {
      if (u.book !== book) return;
      (window.CONCEPTS || []).forEach(function (c) {
        if (c.u !== u.id) return;
        t++; if (isLearned(c.id)) a++;
      });
    });
    return { a: a, t: t };
  }
  /* 아직 안 배운 첫 개념 — '이어서 배우기'가 여기로 간다 */
  function nextToLearn(uid) {
    var list = (window.CONCEPTS || []).filter(function (c) { return !uid || c.u === uid; });
    for (var i = 0; i < list.length; i++) if (!isLearned(list[i].id)) return list[i];
    return null;
  }

  /* 개념의 누적 정답 수 (기록이 없으면 0) — 상태를 새로 만들지 않는다 */
  function rightOf(id) { var c = S.concepts[id]; return c ? c.right : 0; }

  /* 단원의 숙달도 단계별 개념 수 [미학습, 불안정, 학습중, 익힘, 완성] */
  function unitDist(uid) {
    var d = [0, 0, 0, 0, 0];
    (window.CONCEPTS || []).forEach(function (c) {
      if (c.u === uid) d[mastery(c.id)]++;
    });
    return d;
  }

  /* 모든 개념을 '완성'으로 올리려면 최소 몇 번 더 맞혀야 하는가 */
  function unitRemaining(uid) {
    var need = 0;
    (window.CONCEPTS || []).forEach(function (c) {
      if (c.u !== uid) return;
      var st = S.concepts[c.id];
      need += Math.max(0, FULL_RIGHT - (st ? st.right : 0));
    });
    return need;
  }

  function examStats() {
    var e = S.exams;
    var last3 = e.slice(-3);
    return {
      count: e.length,
      best: e.reduce(function (a, b) { return Math.max(a, b.score); }, 0),
      perfectRun: last3.length === 3 && last3.every(function (x) { return x.score === 100; }),
      recent: e.slice(-8)
    };
  }

  /* ───────── 오답 노트 ─────────
     문항을 통째로 보관해 언제든 다시 볼 수 있게 한다. 같은 문항은 한 줄로 합친다. */
  function wkey(q) { return (q.q || '').replace(/\s+/g, ' ').slice(0, 70); }

  function addWrong(q, sel) {
    var k = wkey(q), ex = null;
    for (var i = 0; i < S.wrongs.length; i++) if (S.wrongs[i].k === k) { ex = S.wrongs[i]; break; }
    if (ex) {
      ex.ts = Date.now(); ex.n = (ex.n || 1) + 1; ex.sel = sel;
      ex.fixed = 0; ex.streak = 0;
    } else {
      S.wrongs.push({
        k: k, ts: Date.now(), n: 1, sel: sel,
        q: q.q, ch: q.ch, a: q.a, sol: q.sol || '',
        c: q.c || null, u: q.u || null, src: q.src || '', dsId: q.dsId || null,
        cause: null, fixed: 0, streak: 0
      });
      if (S.wrongs.length > 300) S.wrongs = S.wrongs.slice(-300);
    }
    save();
  }

  /* 오답 노트에서 다시 풀었을 때 — 서로 다른 판에서 2회 연속 맞히면 '해결' */
  function markWrongResult(k, ok) {
    var w = findWrong(k); if (!w) return;
    if (ok) { w.streak = (w.streak || 0) + 1; if (w.streak >= 2) w.fixed = 1; }
    else { w.streak = 0; w.fixed = 0; w.n = (w.n || 1) + 1; w.ts = Date.now(); }
    save();
  }
  function findWrong(k) {
    for (var i = 0; i < S.wrongs.length; i++) if (S.wrongs[i].k === k) return S.wrongs[i];
    return null;
  }
  function setWrongCause(k, cause) {
    var w = findWrong(k); if (!w) return;
    w.cause = cause; save();
  }
  function setWrongFixed(k, v) {
    var w = findWrong(k); if (!w) return;
    w.fixed = v ? 1 : 0; if (v) w.streak = 2; else w.streak = 0;
    save();
  }
  function removeWrong(k) {
    S.wrongs = S.wrongs.filter(function (w) { return w.k !== k; }); save();
  }
  /* f: {open:true 미해결만, u:'u1' 단원, cause:'confuse'} */
  function wrongList(f) {
    f = f || {};
    return S.wrongs.filter(function (w) {
      if (f.open && w.fixed) return false;
      if (f.u && w.u !== f.u) return false;
      if (f.cause && w.cause !== f.cause) return false;
      return true;
    }).sort(function (a, b) { return b.ts - a.ts; });
  }
  function wrongCount(open) { return wrongList({ open: !!open }).length; }

  /* 자료 유형 완료 기록 */
  function markDataset(id) { S.ds[id] = (S.ds[id] || 0) + 1; save(); }

  /* ───────── 학습 단계 체크리스트 ─────────
     '무엇을 했고 무엇을 안 했는지'를 숫자로 보여 준다. */
  function seenInUnit(uid) {
    var n = 0;
    (window.CONCEPTS || []).forEach(function (c) {
      if (c.u === uid && S.concepts[c.id] && S.concepts[c.id].seen) n++;
    });
    return n;
  }
  function okInBook(book) {          // '익힘' 이상 개념 수 / 전체
    var a = 0, t = 0;
    (window.UNITS || []).forEach(function (u) {
      if (u.book !== book) return;
      (window.CONCEPTS || []).forEach(function (c) {
        if (c.u !== u.id) return;
        t++; if (mastery(c.id) >= 3) a++;
      });
    });
    return { a: a, t: t };
  }
  function bossCount(book) {
    return (window.UNITS || []).filter(function (u) {
      return u.book === book && unitState(u.id).boss;
    }).length;
  }

  function progress() {
    var units = window.UNITS || [], pairs = window.PAIRS || [];
    var dsList = (window.DATASETS || []);
    var ex = examStats();
    var b1 = okInBook(1), b2 = okInBook(2);
    var dsDone = dsList.filter(function (d) { return S.ds[d.id]; }).length;
    var diag = units.filter(function (u) { return seenInUnit(u.id) >= 3; }).length;
    var pairDone = pairs.filter(function (p) { return pairState(p.id).cleared; }).length;
    var unstable = unstableConcepts().length;
    var openWrong = wrongCount(true);
    /* 아무것도 안 푼 상태에서 '0개라서 달성'이 되지 않도록 학습 이력을 본다 */
    var seenTotal = 0;
    (window.CONCEPTS || []).forEach(function (c) {
      if (S.concepts[c.id] && S.concepts[c.id].seen) seenTotal++;
    });
    var active = seenTotal >= 10;

    var stages = [
      { step: 1, name: '진단', weeks: '1주', goto: '#/quiz/all/10', act: '단원별 개념 즉답 퀴즈',
        checks: [
          { t: '10개 단원을 한 번씩 맛보기 (단원당 개념 3개 이상)', now: diag, goal: units.length, go: '#/quiz/all/10' }
        ] },
      { step: 2, name: '통합사회1', weeks: '5주', goto: '#/home', act: '단원별 개념·대비표·사례',
        checks: [
          { t: '1부 — 통합사회1 개념 배우기', now: learnedInBook(1).a, goal: learnedInBook(1).t, go: '#/learn' },
          { t: '통합사회1 단원 보스전 통과', now: bossCount(1), goal: 5, go: '#/home' },
          { t: '통합사회1 개념을 ‘익힘’ 이상으로', now: b1.a, goal: Math.ceil(b1.t * 0.7), go: '#/match/all/5' }
        ] },
      { step: 3, name: '통합사회2', weeks: '5주', goto: '#/home', act: '단원별 개념·대비표·헌법 조문',
        checks: [
          { t: '1부 — 통합사회2 개념 배우기', now: learnedInBook(2).a, goal: learnedInBook(2).t, go: '#/learn' },
          { t: '통합사회2 단원 보스전 통과', now: bossCount(2), goal: 5, go: '#/home' },
          { t: '통합사회2 개념을 ‘익힘’ 이상으로', now: b2.a, goal: Math.ceil(b2.t * 0.7), go: '#/match/all/5' }
        ] },
      { step: 4, name: '자료·실전', weeks: '7주', goto: '#/data', act: '자료 유형 10종, 모의고사 주 2회',
        checks: [
          { t: '자료 유형 10종 모두 풀어 보기', now: dsDone, goal: dsList.length, go: '#/data' },
          { t: '모의고사 응시', now: ex.count, goal: 6, go: '#/exam' },
          { t: '모의고사 3회 연속 100점', now: ex.perfectRun ? 1 : 0, goal: 1, go: '#/exam' }
        ] },
      { step: 5, name: '마무리', weeks: '2주', goto: '#/compare', act: '대비 쌍 전체 훑어보기, 오답 0개',
        checks: [
          { t: '대비 개념 쌍 완성', now: pairDone, goal: pairs.length, go: '#/compare' },
          { t: '불안정(빨강) 개념 없애기', go: '#/review',
            label: !active ? '개념 10개 이상 풀면 집계 (현재 ' + seenTotal + '개)'
                           : (unstable ? unstable + '개 남음' : '없음'),
            done: active && unstable === 0 },
          { t: '오답 노트 비우기', go: '#/wrong',
            label: !active ? '개념 10개 이상 풀면 집계 (현재 ' + seenTotal + '개)'
                           : (openWrong ? openWrong + '개 남음' : '없음'),
            done: active && openWrong === 0 }
        ] }
    ];

    var total = 0, got = 0;
    stages.forEach(function (st) {
      st.checks.forEach(function (c) {
        if (c.done === undefined) c.done = c.now >= c.goal;
        total++; if (c.done) got++;
      });
      st.n = st.checks.filter(function (c) { return c.done; }).length;
      st.done = st.checks.every(function (c) { return c.done; });
    });
    var cur = stages.filter(function (st) { return !st.done; })[0] || stages[stages.length - 1];
    return { stages: stages, total: total, got: got, cur: cur, allDone: got === total };
  }

  function reset() { S = blank(); save(); }

  window.Store = {
    s: function () { return S; },
    save: save, today: today,
    cs: cs, mastery: mastery, record: record,
    dueConcepts: dueConcepts, unstableConcepts: unstableConcepts, dueUnits: dueUnits,
    logError: logError, errorStats: errorStats,
    touch: touch, award: award,
    pairState: pairState, unitState: unitState, unitMastery: unitMastery,
    unitDist: unitDist, unitRemaining: unitRemaining, rightOf: rightOf,
    isLearned: isLearned, setLearned: setLearned, addLearnTry: addLearnTry,
    learnedIn: learnedIn, learnedTotal: learnedTotal, learnedInBook: learnedInBook,
    nextToLearn: nextToLearn,
    addWrong: addWrong, wrongList: wrongList, wrongCount: wrongCount, findWrong: findWrong,
    markWrongResult: markWrongResult, setWrongCause: setWrongCause,
    setWrongFixed: setWrongFixed, removeWrong: removeWrong,
    markDataset: markDataset, progress: progress,
    examStats: examStats, reset: reset,
    SLOW_MS: SLOW_MS, INTERVALS: INTERVALS,
    FULL_RIGHT: FULL_RIGHT, OK_RIGHT: OK_RIGHT
  };
})();
