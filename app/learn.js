/* 1부 기본개념 학습 — 개념을 하나씩 '배우기 → 확인 → 통과'로 익힌다.
   통과해야 다음으로 넘어가므로, 읽고 흘려보내는 일이 생기지 않는다. */
(function () {
  'use strict';
  function esc(s) { return UI.esc(s); }
  function go(h) { return UI.go(h); }
  function on(a, b, c, d) { return UI.on(a, b, c, d); }
  function head(a, b) { return UI.head(a, b); }
  function tabs(a) { return UI.tabs(a); }
  function html(s) { return UI.html(s); }
  function toast(s) { return UI.toast(s); }
  var NUM = ['①', '②', '③', '④'];

  function bar(now, goal) {
    return '<div class="barh"><i style="width:' +
      Math.min(100, Math.round(now / Math.max(1, goal) * 100)) + '%"></i></div>';
  }

  /* ───────── 1부 허브 — 단원별 학습 진도 ───────── */
  function viewHub() {
    var total = App.allConcepts().length, done = Store.learnedTotal();
    var nx = Store.nextToLearn(null);

    html(head('1부 · 기본개념 학습') +
      '<div class="card partcard p1">' +
        '<div class="spread"><b style="font-size:17px">개념을 하나씩 정확히</b>' +
        '<span class="pill">' + done + ' / ' + total + '</span></div>' +
        '<div class="sub mt">개념마다 <b>배우기 → 확인 문제 → 통과</b> 순서로 익힙니다. ' +
        '확인 문제를 다 맞혀야 통과 도장이 찍힙니다.</div>' +
        bar(done, total) +
        (nx ? '<button class="btn mt" data-go="#/study/' + nx.id + '">' +
          (done ? '이어서 배우기' : '처음부터 배우기') + ' — ' + esc(nx.t) + ' →</button>'
            : '<div class="pill g mt">모든 개념을 배웠습니다 · 2부로 가세요</div>' +
              '<button class="btn mt" data-go="#/challenge">2부 시험 만점 도전 →</button>') +
      '</div>' +

      window.UNITS.map(function (u) {
        var cs = App.conceptsOf(u.id), d = Store.learnedIn(u.id);
        var un = Store.nextToLearn(u.id);
        return '<button class="unitrow" data-go="' + (un ? '#/study/' + un.id : '#/learn/' + u.id) + '">' +
          '<span class="ur-ic">' + Fig.icon(u.id) + '</span>' +
          '<span class="ur-b">' +
            '<span class="ur-t">' + u.no + '. ' + esc(u.title) + '</span>' +
            '<span class="mini">통합사회' + u.book + ' · 개념 ' + cs.length + '개</span>' +
            bar(d, cs.length) +
          '</span>' +
          '<span class="ur-n' + (d >= cs.length ? ' ok' : '') + '">' +
            (d >= cs.length ? '✓' : d + '/' + cs.length) + '</span></button>';
      }).join('') +

      '<div class="card"><h3>다 배운 뒤에는</h3>' +
        '<div class="sub">2부에서 비슷한 개념 구분·자료 해석·실전 모의고사로 점수를 올립니다.</div>' +
        '<button class="btn sec mt" data-go="#/challenge">2부 둘러보기</button></div>' +
      tabs('learn'));
    UI.bindBack();
    on('[data-go]', 'click', function () { go(this.getAttribute('data-go')); });
  }

  /* ───────── 1부 단원 화면 ───────── */
  function viewUnit(uid) {
    var u = App.unit(uid);
    if (!u) return go('#/learn');
    var cs = App.conceptsOf(uid), d = Store.learnedIn(uid);
    var nx = Store.nextToLearn(uid);

    html(head('1부 · ' + u.no + '. ' + u.title, '#/learn') +
      '<div class="card">' + Art.forUnit(uid) +
        '<div class="spread mt"><b>배운 개념 ' + d + ' / ' + cs.length + '</b>' +
        (d >= cs.length ? '<span class="pill g">단원 완료</span>' : '') + '</div>' +
        bar(d, cs.length) +
        (nx ? '<button class="btn mt" data-go="#/study/' + nx.id + '">이어서 배우기 — ' +
          esc(nx.t) + ' →</button>'
            : '<button class="btn mt" data-go="#/boss/' + uid + '">단원 보스전으로 확인하기</button>') +
      '</div>' +

      '<div class="card"><h3>이 단원의 개념</h3>' +
        '<div class="ccards">' + cs.map(function (c, i) {
          var lc = Store.isLearned(c.id);
          return '<button class="ccard' + (lc ? ' learned' : '') + '" data-s="' + c.id + '">' +
            '<span class="cnum">' + (i + 1) + '</span>' +
            ConceptArt.thumb(c) +
            '<span class="cb"><span class="ct">' +
              (lc ? '<span class="stamp">✓</span>' : '') + esc(c.t) + '</span>' +
              '<span class="cd">' + esc(c.d) + '</span>' +
              '<span class="cgo">' + (lc ? '다시 보기 ›' : '배우기 ›') + '</span>' +
            '</span></button>';
        }).join('') + '</div></div>' + tabs('learn'));
    UI.bindBack();
    on('[data-go]', 'click', function () { go(this.getAttribute('data-go')); });
    on('[data-s]', 'click', function () { go('#/study/' + this.getAttribute('data-s')); });
  }

  /* ───────── 개념 하나 학습 ───────── */
  /* 1단계 배우기 → 2단계 확인 문제(전부 정답) → 3단계 통과 */
  function viewStudy(cid) {
    var c = App.concept(cid);
    if (!c) return go('#/learn');
    var u = App.unit(c.u), sib = App.conceptsOf(c.u);
    var at = sib.map(function (x) { return x.id; }).indexOf(cid);
    var back = '#/learn/' + c.u;
    var quiz = null, qi = 0, wrong = 0;

    function top(step) {
      return head('배우기 ' + (at + 1) + ' / ' + sib.length, back) +
        '<div class="steps3">' +
        ['1 배우기', '2 확인', '3 통과'].map(function (t, i) {
          return '<span class="s3' + (i + 1 === step ? ' on' : (i + 1 < step ? ' done' : '')) + '">' +
            esc(t) + '</span>';
        }).join('') + '</div>';
    }

    /* 1단계 — 배우기 */
    function learn() {
      var cases = App.casesOf(cid).slice(0, 2);
      var p = App.pairOf(cid);
      var cm = window.Comic ? Comic.forConcept(c) : null;
      html(top(1) +
        '<div class="card">' +
          '<div class="row">' + Fig.icon(c.u) + '<b style="font-size:18px">' + esc(c.t) + '</b>' +
          (Store.isLearned(cid) ? '<span class="grow"></span><span class="pill g">배움 완료</span>' : '') + '</div>' +
          (cm ? '<div id="cmbox"></div>' : '') +
          (ConceptArt.forConcept(c) || '') +
          '<div class="deftext">' + esc(c.d) + '</div>' +
          (c.k && c.k.length ? '<div class="mt"><b class="mini">이 말이 보이면 이 개념</b>' +
            '<div class="row wrap mt">' + c.k.map(function (k) {
              return '<span class="pill">' + esc(k) + '</span>'; }).join('') + '</div></div>' : '') +
          (c.x ? '<div class="tip"><b>함정</b> ' + esc(c.x) + '</div>' : '') +
          (cases.length ? '<div class="mt"><b class="mini">사례</b>' + cases.map(function (x) {
            return '<div class="exbox">' + esc(x.t) + '<div class="mini mt">→ ' + esc(x.w) + '</div></div>';
          }).join('') + '</div>' : '') +
          (p ? '<div class="mini mt">헷갈리는 짝: ' + esc(p.cols.join(' / ')) + ' (2부에서 자세히)</div>' : '') +
          '<div class="mini mt">' + u.no + '. ' + esc(u.title) + ' › ' + esc(u.subs[c.sub] || '') + '</div>' +
          '<button class="btn mt" id="toq">이해했어요 · 확인 문제 풀기 →</button>' +
        '</div>' + tabs('learn'));
      UI.bindBack();
      if (cm) {
        var fx = (cm.comic.focus || {})[cid];
        Comic.mount(document.getElementById('cmbox'), cm.id,
          { start: 0, focus: typeof fx === 'number' ? fx : -1 });
      }
      on('#toq', 'click', function () { startQuiz(); });
    }

    /* 2단계 — 확인 문제 */
    function startQuiz() {
      quiz = [App.genInstant(cid)];
      quiz.push(App.casesOf(cid).length ? App.genCase(cid) : App.genInstant(cid));
      qi = 0; wrong = 0;
      Store.addLearnTry(cid);
      askQ();
    }
    function askQ() {
      var q = quiz[qi], t0 = Date.now();
      html(top(2) +
        '<div class="card">' +
          '<div class="spread"><span class="pill">확인 ' + (qi + 1) + ' / ' + quiz.length + '</span>' +
          '<span class="mini">' + esc(c.t) + '</span></div>' +
          '<div class="stem mt">' + UI.markStem(q.q) + '</div>' +
          '<ul class="ch">' + q.ch.map(function (t, i) {
            return '<li><button data-i="' + i + '"><span class="n">' + NUM[i] + '</span>' +
              '<span>' + esc(t) + '</span></button></li>';
          }).join('') + '</ul><div id="after"></div>' +
        '</div>' + tabs('learn'));
      UI.bindBack();
      on('.ch button', 'click', function () {
        if (this.hasAttribute('disabled')) return;
        var sel = parseInt(this.getAttribute('data-i'), 10), ok = sel === q.a;
        document.querySelectorAll('.ch button').forEach(function (b, k) {
          b.setAttribute('disabled', '');
          if (k === q.a) b.classList.add('ok');
          if (k === sel && !ok) b.classList.add('no');
        });
        Store.record(cid, ok, Date.now() - t0);
        if (!ok) wrong++;
        document.getElementById('after').innerHTML =
          '<div class="sol"><b>' + (ok ? '정답' : '아직이에요') + '</b>' +
          '<div class="mt">' + esc(q.sol || '') + '</div></div>' +
          (ok ? '<button class="btn mt" id="next">' +
                  (qi + 1 >= quiz.length ? '결과 보기' : '다음 확인 문제') + '</button>'
              : '<div class="btnrow mt">' +
                '<button class="btn" id="relearn">개념 다시 보기</button>' +
                '<button class="btn sec" id="next">계속</button></div>');
        on('#next', 'click', function () {
          qi++;
          if (qi >= quiz.length) return finish();
          askQ();
        }, document.getElementById('after'));
        on('#relearn', 'click', learn, document.getElementById('after'));
      });
    }

    /* 3단계 — 통과 */
    function finish() {
      var passed = wrong === 0;
      if (passed) {
        var first = !Store.isLearned(cid);
        Store.setLearned(cid, 1);
        if (first && Store.learnedIn(c.u) === sib.length) Store.award(u.title + ' 개념 완주');
        if (first && Store.learnedTotal() === App.allConcepts().length) Store.award('전 개념 완주');
      }
      var nx = Store.nextToLearn(c.u) || Store.nextToLearn(null);
      var unitDone = Store.learnedIn(c.u) >= sib.length;

      html(top(3) +
        '<div class="card center">' +
          '<div style="font-size:42px">' + (passed ? '✅' : '📖') + '</div>' +
          '<b style="font-size:19px">' + (passed ? '배움 완료' : '한 번 더 볼까요') + '</b>' +
          '<div class="sub mt">‘' + esc(c.t) + '’' +
          (passed ? ' — 확인 문제를 모두 맞혔습니다.' : ' — 확인 문제를 모두 맞혀야 통과입니다.') + '</div>' +
          '<div class="mt">' + bar(Store.learnedIn(c.u), sib.length) +
          '<div class="mini mt">' + u.no + '. ' + esc(u.title) + ' — ' +
          Store.learnedIn(c.u) + ' / ' + sib.length + ' 개념</div></div>' +
        '</div>' +

        '<div class="card">' +
          (passed
            ? (nx && !(unitDone && nx.u !== c.u)
                ? '<button class="btn" data-go="#/study/' + nx.id + '">다음 개념 배우기 — ' + esc(nx.t) + ' →</button>'
                : '') +
              (unitDone
                ? '<div class="tip mt"><b>' + esc(u.title) + ' 개념을 모두 배웠습니다.</b> ' +
                  '이제 보스전으로 확인해 보세요.</div>' +
                  '<button class="btn mt" data-go="#/boss/' + c.u + '">단원 보스전 도전</button>' +
                  (nx ? '<button class="btn sec mt" data-go="#/study/' + nx.id + '">다음 단원 개념 배우기</button>' : '')
                : '')
            : '<button class="btn" id="again">다시 배우기</button>') +
          '<button class="btn sec mt" data-go="' + back + '">단원 개념 목록</button>' +
        '</div>' + tabs('learn'));
      UI.bindBack();
      on('#again', 'click', learn);
      on('[data-go]', 'click', function () { go(this.getAttribute('data-go')); });
    }

    learn();
  }

  function route(p) {
    if (p[0] === 'learn') { p[1] ? viewUnit(p[1]) : viewHub(); return true; }
    if (p[0] === 'study') { viewStudy(p[1]); return true; }
    return false;
  }
  window.Learn = { route: route };
})();
