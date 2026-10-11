/* 문항 풀이 화면 — 즉답 퀴즈, 분류 게임, 보스전, 복습 큐, 대비 드릴, 모의고사, 발문 드릴 */
(function () {
  'use strict';
  /* UI 헬퍼는 호출 시점에 위임한다 (로드 순서와 무관하게 동작) */
  function esc(s) { return UI.esc(s); }
  function go(h) { return UI.go(h); }
  function on(a, b, c, d) { return UI.on(a, b, c, d); }
  function head(a, b) { return UI.head(a, b); }
  function tabs(a) { return UI.tabs(a); }
  function html(s) { return UI.html(s); }
  function toast(s) { return UI.toast(s); }
  function markStem(s) { return UI.markStem(s); }
  function bind() {}
  var NUM = ['①', '②', '③', '④', '⑤'];

  /* 문항 정규화 */
  function norm(item) {
    if (item.kind === 'bank') {
      var b = App.bank(item.bi);
      return { q: b.q, ch: b.ch, a: b.a, sol: b.sol, c: b.c, neg: b.neg, u: b.u, src: '기출형' };
    }
    if (item.kind === 'inline') { var g = item.gen; g.src = '대비 문항'; g.u = item.u; return g; }
    if (item.kind === 'data') {
      var d = window.DATASETS.filter(function (x) { return x.id === item.ds; })[0];
      var q = d.qs[item.qi];
      return { q: q.q, ch: q.ch, a: q.a, sol: q.sol, u: d.u, ds: d, dq: q, src: '자료 문항' };
    }
    if (!item.src) item.src = item.pair ? '대비 문항' : (item.caseId ? '사례 문항' : '즉답 문항');
    return item;
  }

  function choiceHTML(ch) {
    return '<ul class="ch">' + ch.map(function (c, i) {
      return '<li><button data-i="' + i + '"><span class="n">' + NUM[i] + '</span>' +
        '<span>' + esc(c) + '</span></button></li>';
    }).join('') + '</ul>';
  }

  /* 오답 원인 선택 UI */
  function causeHTML(qid, cid, wk) {
    return '<div class="card" data-cause-box><h3>왜 틀렸나요?</h3>' +
      '<div class="sub">원인을 고르면 맞춤 처방으로 이어집니다. 이 문항은 <b>오답 노트</b>에 저장되었습니다.</div>' +
      '<div class="row wrap mt">' + window.ERROR_CAUSES.map(function (e) {
        return '<button class="btn sm sec" data-cause="' + e.id + '" data-q="' + esc(qid || '') +
          '" data-wk="' + esc(wk || '') + '" data-c="' + esc(cid || '') + '">' + esc(e.label) + '</button>';
      }).join('') + '</div></div>';
  }

  /* 틀린 문항을 오답 노트에 통째로 저장 */
  function noteWrong(q, sel) {
    if (!q || !q.ch) return null;
    var u = q.u || (q.c && App.concept(q.c) ? App.concept(q.c).u : null);
    Store.addWrong({
      q: q.q, ch: q.ch, a: q.a, sol: q.sol || '', c: q.c || null, u: u,
      src: q.src || '', dsId: q.ds ? q.ds.id : null
    }, sel);
    return (q.q || '').replace(/\s+/g, ' ').slice(0, 70);
  }
  function bindCause(root) {
    on('[data-cause]', 'click', function () {
      var id = this.getAttribute('data-cause');
      var e = window.ERROR_CAUSES.filter(function (x) { return x.id === id; })[0];
      Store.logError(id, this.getAttribute('data-c'), this.getAttribute('data-q'));
      if (this.getAttribute('data-wk')) Store.setWrongCause(this.getAttribute('data-wk'), id);
      var box = this.closest('[data-cause-box]');
      var cid = this.getAttribute('data-c');
      box.innerHTML = '<h3>처방</h3><div class="sub">' + esc(e.label) + ' → <b>' + esc(e.rx) + '</b></div>' +
        '<button class="btn mt" data-rx="' + e.action + '" data-c="' + esc(cid) + '">처방 바로 하기</button>';
      on('[data-rx]', 'click', function () {
        var a = this.getAttribute('data-rx'), c = this.getAttribute('data-c');
        var con = c && App.concept(c);
        if (a === 'compare' && con) { var p = App.pairOf(c); return go(p ? '#/sort/' + p.id : '#/compare'); }
        if (a === 'concept' && con) return go('#/concept/' + c);
        if (a === 'dataread') return go('#/data');
        if (a === 'stemdrill') return go('#/stem');
        if (a === 'quiz') return go('#/quiz/' + (con ? con.u : 'all') + '/10');
        go('#/home');
      }, box);
    }, root || UI.$app);
  }

  /* ───────── 공통 문항 러너 ───────── */
  /* opts: {title, back, limitSec, items, onDone(res), showCause, tag} */
  function runner(opts) {
    var i = 0, res = [], t0 = 0, timer = null;
    function render() {
      if (i >= opts.items.length) return finish();
      var q = norm(opts.items[i]);
      t0 = Date.now();
      var fig = q.ds ? DataView.figure(q.ds) : '';
      html(head(opts.title, opts.back) +
        '<div class="card">' +
          '<div class="spread"><span class="pill">' + (i + 1) + ' / ' + opts.items.length + '</span>' +
          '<span class="mini">' + esc(q.src || '') + '</span></div>' +
          (opts.limitSec ? '<div class="tbar" id="tb"><i style="width:100%"></i></div>' +
            '<div class="mini center mt"><span class="timer" id="tt">' + opts.limitSec + '</span>초</div>' : '') +
          (fig ? '<div class="mt ds">' + fig + '</div>' : '') +
          '<div class="stem mt">' + markStem(q.q) + '</div>' +
          choiceHTML(q.ch) +
          '<div id="after"></div>' +
        '</div>' + tabs(''));
      UI.bindBack();
      if (q.ds) DataView.mount(document.querySelector('.ds'), q.ds);
      on('.ch button', 'click', function () { answer(q, parseInt(this.getAttribute('data-i'), 10), this); });
      if (opts.limitSec) startTimer(q);
    }
    function startTimer(q) {
      var left = opts.limitSec, bar = document.getElementById('tb'), tt = document.getElementById('tt');
      clearInterval(timer);
      timer = setInterval(function () {
        left -= 0.1;
        if (!bar) return clearInterval(timer);
        var pct = Math.max(0, left / opts.limitSec * 100);
        bar.firstChild.style.width = pct + '%';
        bar.className = 'tbar' + (pct < 25 ? ' bad' : pct < 50 ? ' warn' : '');
        if (tt) tt.textContent = Math.max(0, left).toFixed(1);
        if (left <= 0) { clearInterval(timer); answer(q, -1, null); }
      }, 100);
    }
    function answer(q, sel, btn) {
      clearInterval(timer);
      if (document.querySelector('.ch button[disabled]')) return;
      var ms = Date.now() - t0, ok = sel === q.a;
      document.querySelectorAll('.ch button').forEach(function (b, k) {
        b.setAttribute('disabled', '');
        if (k === q.a) b.classList.add('ok');
        if (k === sel && !ok) b.classList.add('no');
      });
      if (q.c) Store.record(q.c, ok, ms);
      res.push({ ok: ok, ms: ms, q: q, sel: sel });
      if (opts.tag === 'quiz') { var s = Store.s(); s.quiz.total++; if (ok) s.quiz.right++; Store.save(); }

      /* 오답 노트: 틀리면 보관하고, 오답 노트에서 푼 문항이면 해결 여부를 갱신한다 */
      var wk = q.key || null;
      if (q.key) Store.markWrongResult(q.key, ok);
      else if (!ok) wk = noteWrong(q, sel);

      var slow = ok && ms > Store.SLOW_MS;
      var after = document.getElementById('after');
      after.innerHTML =
        '<div class="sol"><b>' + (sel === -1 ? '시간 초과' : ok ? '정답' : '오답') + '</b> · ' +
          (ms / 1000).toFixed(1) + '초' + (slow ? ' <span class="pill r">불안정으로 분류</span>' : '') +
          '<div class="mt">' + esc(q.sol || '') + '</div>' +
          (q.c && App.concept(q.c) && App.concept(q.c).x ?
            '<div class="mini mt">함정: ' + esc(App.concept(q.c).x) + '</div>' : '') + '</div>' +
        (!ok && opts.showCause ? causeHTML(q.src, q.c || '', wk) : '') +
        (ok && q.key && Store.findWrong(q.key) && Store.findWrong(q.key).fixed ?
          '<div class="sol" style="background:#ecfdf5;border-color:#a7f3d0">' +
          '<b>오답 노트에서 해결</b> · 두 번 연속 맞혔습니다.</div>' : '') +
        '<button class="btn mt" id="next">' + (i + 1 >= opts.items.length ? '결과 보기' : '다음 문항') + '</button>';
      bindCause(after);
      on('#next', 'click', function () { i++; render(); }, after);
    }
    function finish() {
      clearInterval(timer);
      var right = res.filter(function (r) { return r.ok; }).length;
      opts.onDone(res, right);
    }
    render();
  }

  function resultCard(right, total, extra) {
    var pct = Math.round(right / total * 100);
    return '<div class="card center"><div class="stat" style="border:0;box-shadow:none">' +
      '<b style="font-size:34px">' + right + ' / ' + total + '</b><span>정답률 ' + pct + '%</span></div>' +
      (extra || '') + '</div>';
  }

  /* ───────── 즉답 퀴즈 (20초 제한) ───────── */
  function viewQuiz(uid, n) {
    var items = App.quizSet(parseInt(n || 10, 10), uid === 'all' ? null : uid);
    if (!items.length) { html(head('즉답 퀴즈') + '<div class="card">문항이 없습니다.</div>' + tabs('')); return UI.bindBack(); }
    runner({
      title: '개념 즉답 퀴즈', back: uid === 'all' ? '#/home' : '#/unit/' + uid,
      limitSec: 20, items: items, showCause: true, tag: 'quiz',
      onDone: function (res, right) {
        var slow = res.filter(function (r) { return r.ok && r.ms > Store.SLOW_MS; }).length;
        var avg = res.reduce(function (a, r) { return a + r.ms; }, 0) / res.length / 1000;
        if (right === res.length) Store.award('즉답 만점');
        html(head('퀴즈 결과', '#/home') +
          resultCard(right, res.length,
            '<div class="kv mt"><span>평균 소요 시간</span><b>' + avg.toFixed(1) + '초</b></div>' +
            '<div class="kv"><span>느려서 불안정 분류</span><b>' + slow + '개</b></div>' +
            '<div class="mini mt">실제 시험은 문항당 약 72초입니다. 개념 즉답은 8초 안에 떠올라야 안전합니다.</div>') +
          '<div class="card"><h3>다시 볼 개념</h3>' +
          (res.filter(function (r) { return !r.ok || r.ms > Store.SLOW_MS; }).map(function (r) {
            var c = App.concept(r.q.c); if (!c) return '';
            return '<button class="citem" data-c="' + c.id + '"><i class="m m' + Store.mastery(c.id) + '"></i>' +
              '<span class="grow"><span class="t">' + esc(c.t) + '</span>' +
              '<span class="d"> — ' + esc(c.d) + '</span></span></button>';
          }).join('') || '<div class="sub">없습니다. 훌륭합니다.</div>') + '</div>' +
          '<div class="card"><button class="btn" data-go="#/quiz/' + uid + '/' + res.length + '">한 판 더</button>' +
          '<button class="btn sec mt" data-go="#/home">홈으로</button></div>' + tabs(''));
        UI.bindBack();
        on('[data-c]', 'click', function () { go('#/concept/' + this.getAttribute('data-c')); });
        on('[data-go]', 'click', function () { go(this.getAttribute('data-go')); });
      }
    });
  }

  /* ───────── 복습 큐 ───────── */
  function viewReview(uid) {
    var back = uid ? '#/unit/' + uid : '#/home';
    var items = App.reviewSet(10, uid);
    if (!items.length) {
      html(head('복습 큐', back) + '<div class="card center"><b>복습할 개념이 없습니다.</b>' +
        '<div class="sub mt">틀린 개념은 1·3·7일 뒤에 <b>다른 사례</b>로 다시 나옵니다.</div>' +
        '<button class="btn mt" data-go="#/quiz/all/10">즉답 퀴즈로 진단하기</button></div>' + tabs(''));
      UI.bindBack();
      return on('[data-go]', 'click', function () { go(this.getAttribute('data-go')); });
    }
    runner({
      title: '복습 큐 (다른 사례로)', back: back, items: items, showCause: true,
      onDone: function (res, right) {
        var cleared = res.filter(function (r) {
          return r.ok && r.q.c && !Store.cs(r.q.c).unstable; }).length;
        html(head('복습 결과', back) +
          resultCard(right, res.length,
            '<div class="kv mt"><span>빨강이 풀린 개념</span><b>' + cleared + '개</b></div>' +
            '<div class="mini mt">서로 다른 날 3번 맞히면 빨강이 풀립니다. 오늘 몫은 끝났으니 내일 또 오세요.</div>') +
          '<div class="card"><button class="btn" data-go="' + back + '">돌아가기</button></div>' + tabs(''));
        UI.bindBack();
        on('[data-go]', 'click', function () { go(this.getAttribute('data-go')); });
      }
    });
  }

  /* ───────── 대비 드릴 (쌍당 5문항) ───────── */
  function viewDrill(pid) {
    var p = App.pair(pid), items = [], seenQ = {}, guard = 0;
    /* 같은 쌍에서 5문항을 뽑으므로 사례가 겹치지 않을 때만 담는다 */
    while (items.length < 5 && guard++ < 40) {
      var g = App.genContrast(pid);
      if (!g) break;
      var key = g.caseId || (g.q + '|' + g.ch.join('|'));
      if (seenQ[key]) continue;
      seenQ[key] = 1;
      items.push(g);
    }
    /* 사례가 모자라면 그 쌍의 개념을 즉답 문항으로 채운다.
       사례 문항과 발문 형식이 달라 서로 겹치지 않는다. */
    if (items.length < 5) {
      var refs = App.shuffle(((p && p.refs) || []).slice());
      for (var ri = 0; ri < refs.length && items.length < 5; ri++) {
        if (!App.concept(refs[ri])) continue;
        var q2 = App.genInstant(refs[ri], 1);
        var k2 = q2.q + '|' + q2.ch.join('|');
        if (seenQ[k2]) continue;
        seenQ[k2] = 1;
        items.push(q2);
      }
    }
    if (!items.length) { toast('이 쌍은 사례 카드가 부족합니다.'); return go('#/compare/' + pid); }
    runner({
      title: p.title, back: '#/compare/' + pid, items: items, showCause: true,
      onDone: function (res, right) {
        var st = Store.pairState(pid);
        st.plays++; st.best = Math.max(st.best, Math.round(right / res.length * 100));
        if (right === res.length) { st.cleared = true; Store.award(p.title + ' 완성'); }
        Store.save();
        html(head('대비 드릴 결과', '#/compare/' + pid) +
          resultCard(right, res.length, right === res.length ?
            '<div class="pill g mt">이 대비 쌍 완성</div>' :
            '<div class="mini mt">' + esc(p.tip) + '</div>') +
          '<div class="card"><button class="btn sec" data-go="#/compare/' + pid + '">대비표 다시 보기</button>' +
          '<button class="btn mt" data-go="#/sort/' + pid + '">분류 게임으로 굳히기</button></div>' + tabs(''));
        UI.bindBack();
        on('[data-go]', 'click', function () { go(this.getAttribute('data-go')); });
      }
    });
  }

  /* ───────── 단원 보스전 ───────── */
  function viewBoss(uid) {
    var u = App.unit(uid), items = App.bossSet(uid);
    runner({
      title: u.title + ' 보스전', back: '#/unit/' + uid, items: items, showCause: true,
      onDone: function (res, right) {
        var st = Store.unitState(uid); st.tries++;
        var pass = right === res.length;
        if (pass && !st.boss) { st.boss = true; Store.award(u.title + ' 보스 격파'); }
        Store.save();
        html(head('보스전 결과', '#/unit/' + uid) +
          '<div class="card center"><div style="font-size:40px">' + (pass ? '🏆' : '💪') + '</div>' +
          '<b style="font-size:19px">' + (pass ? '통과!' : '아쉽습니다') + '</b>' +
          '<div class="sub mt">' + right + ' / ' + res.length + ' — 5문항을 모두 맞혀야 통과합니다.</div></div>' +
          (pass ? '' : '<div class="card"><h3>다시 볼 개념</h3>' +
            res.filter(function (r) { return !r.ok; }).map(function (r) {
              var c = App.concept(r.q.c); if (!c) return '';
              var p = App.pairOf(c.id);
              return '<div class="kv"><span>' + esc(c.t) + '<div class="mini">' + esc(c.x || c.d) + '</div></span>' +
                (p ? '<button class="btn sm sec" data-go="#/compare/' + p.id + '">대비표</button>' : '') + '</div>';
            }).join('') + '</div>') +
          '<div class="card"><button class="btn" data-go="#/boss/' + uid + '">다시 도전</button>' +
          '<button class="btn sec mt" data-go="#/unit/' + uid + '">단원으로</button></div>' + tabs(''));
        UI.bindBack();
        on('[data-go]', 'click', function () { go(this.getAttribute('data-go')); });
      }
    });
  }

  /* ───────── 분류 게임 ───────── */
  function viewSort(pid) {
    var p = App.pair(pid);
    if (!p) return go('#/sortlist');
    var idx = [];
    (p.refs || []).forEach(function (r, i) { if (r && App.casesOf(r).length) idx.push(i); });
    if (idx.length < 2) { toast('사례 카드가 부족합니다.'); return go('#/compare/' + pid); }

    var pool = [];
    idx.forEach(function (i) {
      App.sample(App.casesOf(p.refs[i]), 2).forEach(function (x) { pool.push({ x: x, box: i }); });
    });
    pool = App.shuffle(pool);
    var total = pool.length, cur = 0, right = 0, wrongIds = [];
    var myHash = location.hash;                       // 화면을 떠났으면 다시 그리지 않는다
    function alive() { return location.hash === myHash; }
    var counts = {};                                  // 상자별로 지금까지 넣은 장수

    function draw() {
      var item = pool[cur];
      html(head(p.title, '#/compare/' + pid) +
        '<div class="card"><div class="spread"><span class="pill">' + (cur + 1) + ' / ' + total + '</span>' +
          '<span class="mini">맞힘 ' + right + '</span></div>' +
          '<div class="cardpile" id="pile">' +
            (item ? '<div class="gcard" id="gc" draggable="true">' + esc(item.x.t) + '</div>'
                  : '<div class="sub center">카드를 모두 분류했습니다.</div>') + '</div>' +
          '<div class="mini mt">카드를 끌어 상자에 넣거나, 카드를 누른 뒤 상자를 누르세요.</div>' +
          '<div class="boxes">' + idx.map(function (i) {
            return '<div class="box" data-box="' + i + '"><div class="bt">' + esc(p.cols[i]) + '</div>' +
              '<div class="cnt" data-cnt="' + i + '">' + (counts[i] || 0) + '장</div></div>';
          }).join('') + '</div>' +
          '<div id="fb"></div>' +
        '</div>' + tabs(''));
      UI.bindBack();
      wire();
    }

    function wire() {
      var gc = document.getElementById('gc');
      var sel = false;
      if (gc) {
        gc.addEventListener('click', function () {
          sel = !sel; gc.classList.toggle('sel', sel);
        });
        gc.addEventListener('dragstart', function (e) {
          gc.classList.add('drag'); try { e.dataTransfer.setData('text/plain', 'c'); } catch (x) {}
        });
        gc.addEventListener('dragend', function () { gc.classList.remove('drag'); });
      }
      on('.box', 'dragover', function (e) { e.preventDefault(); this.classList.add('over'); });
      on('.box', 'dragleave', function () { this.classList.remove('over'); });
      on('.box', 'drop', function (e) {
        e.preventDefault(); this.classList.remove('over');
        drop(parseInt(this.getAttribute('data-box'), 10));
      });
      on('.box', 'click', function () {
        if (!gc) return;
        drop(parseInt(this.getAttribute('data-box'), 10));
      });
    }

    function drop(box) {
      var item = pool[cur]; if (!item) return;
      var ok = box === item.box;
      var cid = p.refs[item.box];
      Store.record(cid, ok, 0);
      counts[box] = (counts[box] || 0) + 1;
      var cnt = document.querySelector('[data-cnt="' + box + '"]');
      if (cnt) cnt.textContent = counts[box] + '장';
      var fb = document.getElementById('fb');
      if (ok) {
        right++;
        fb.innerHTML = '<div class="sol"><b>정답</b> · ' + esc(item.x.w) + '</div>';
      } else {
        wrongIds.push(cid);
        var target = document.querySelector('[data-box="' + box + '"]');
        if (target) { target.classList.add('flash'); setTimeout(function () { target.classList.remove('flash'); }, 500); }
        fb.innerHTML = '<div class="sol" style="background:#fef2f2;border-color:#fecaca">' +
          '<b>다른 상자입니다</b> · ' + esc(item.x.w) + '<div class="mini mt">' + esc(p.tip) + '</div></div>';
      }
      cur++;
      setTimeout(function () {
        if (!alive()) return;
        cur >= total ? done() : draw();
      }, ok ? 550 : 1700);
    }

    function done() {
      var score = Math.round(right / total * 100);
      var st = Store.pairState(pid);
      st.plays++; st.best = Math.max(st.best, score);
      if (score === 100) { st.cleared = true; Store.award(p.title + ' 분류 만점'); }
      Store.save();
      html(head('분류 게임 결과', '#/compare/' + pid) +
        resultCard(right, total, '<div class="kv mt"><span>최고 기록</span><b>' + st.best + '점</b></div>' +
          (score === 100 ? '<div class="pill g mt">이 대비 쌍 완성</div>' : '')) +
        '<div class="card"><div class="tip"><b>구분 팁</b> ' + esc(p.tip) + '</div>' +
          '<button class="btn mt" data-go="#/sort/' + pid + '">다시 하기</button>' +
          '<button class="btn sec mt" data-go="#/compare/' + pid + '">대비표 보기</button>' +
          '<button class="btn sec mt" data-go="#/drill/' + pid + '">대비 문항 5개</button></div>' + tabs(''));
      UI.bindBack();
      on('[data-go]', 'click', function () { go(this.getAttribute('data-go')); });
    }
    draw();
  }

  /* ───────── 오답 노트 ───────── */
  var WF = { open: true, u: '', cause: '' };       // 현재 필터

  function causeLabel(id) {
    var e = (window.ERROR_CAUSES || []).filter(function (x) { return x.id === id; })[0];
    return e ? e.label : '';
  }
  function dstr(ts) {
    var d = new Date(ts);
    return (d.getMonth() + 1) + '/' + d.getDate();
  }

  function viewWrong() {
    var all = Store.wrongList({});
    var list = Store.wrongList(WF);
    var openN = Store.wrongCount(true);
    var units = window.UNITS.filter(function (u) {
      return all.some(function (w) { return w.u === u.id; });
    });
    var causes = window.ERROR_CAUSES.filter(function (c) {
      return all.some(function (w) { return w.cause === c.id; });
    });

    html(head('오답 노트') +
      '<div class="card"><div class="grid2">' +
        '<div class="stat"><b>' + openN + '</b><span>아직 못 잡은 문항</span></div>' +
        '<div class="stat"><b>' + (all.length - openN) + '</b><span>해결한 문항</span></div>' +
      '</div>' +
      (openN ? '<button class="btn mt" data-go="#/wrongrun">틀린 문제만 모아 풀기 (' +
        Math.min(10, openN) + '문항)</button>' : '') +
      '<div class="mini mt">오답 노트에서 <b>서로 다른 판에서 2번 연속</b> 맞히면 해결로 바뀝니다.</div></div>' +

      '<div class="card"><h3>골라 보기</h3>' +
        '<div class="row wrap">' +
          '<button class="btn sm ' + (WF.open ? '' : 'sec') + '" data-f="open">못 잡은 것만</button>' +
          '<button class="btn sm ' + (WF.open ? 'sec' : '') + '" data-f="all">전체</button>' +
        '</div>' +
        (units.length ? '<div class="row wrap mt">' +
          '<button class="btn sm ' + (WF.u ? 'sec' : '') + '" data-u="">모든 단원</button>' +
          units.map(function (u) {
            return '<button class="btn sm ' + (WF.u === u.id ? '' : 'sec') + '" data-u="' + u.id + '">' +
              esc(u.no + '. ' + u.title) + '</button>';
          }).join('') + '</div>' : '') +
        (causes.length ? '<div class="row wrap mt">' +
          '<button class="btn sm ' + (WF.cause ? 'sec' : '') + '" data-cz="">모든 원인</button>' +
          causes.map(function (c) {
            return '<button class="btn sm ' + (WF.cause === c.id ? '' : 'sec') + '" data-cz="' + c.id + '">' +
              esc(c.label) + '</button>';
          }).join('') + '</div>' : '') +
      '</div>' +

      (list.length ? list.map(function (w, i) {
        var c = w.c && App.concept(w.c);
        var u = w.u && App.unit(w.u);
        return '<button class="wrow' + (w.fixed ? ' fixed' : '') + '" data-k="' + esc(w.k) + '">' +
          '<div class="wtop">' +
            '<span class="pill' + (w.fixed ? ' g' : ' r') + '">' + (w.fixed ? '해결' : '틀림 ' + (w.n || 1) + '회') + '</span>' +
            (u ? '<span class="mini">' + esc(u.no + '. ' + u.title) + '</span>' : '') +
            '<span class="grow"></span><span class="mini">' + dstr(w.ts) + '</span>' +
          '</div>' +
          '<div class="wq">' + esc((w.q || '').replace(/\n+/g, ' ').slice(0, 68)) +
            ((w.q || '').length > 68 ? '…' : '') + '</div>' +
          '<div class="mini">' + (c ? esc(c.t) : esc(w.src || '')) +
            (w.cause ? ' · ' + esc(causeLabel(w.cause)) : '') + '</div>' +
        '</button>';
      }).join('') :
        '<div class="card center"><div style="font-size:34px">🎉</div>' +
        '<b>해당하는 오답이 없습니다.</b>' +
        '<div class="sub mt">문제를 틀리면 여기에 문항이 통째로 저장됩니다.</div></div>') +
      tabs('wrong'));

    UI.bindBack();
    on('[data-go]', 'click', function () { go(this.getAttribute('data-go')); });
    on('[data-f]', 'click', function () { WF.open = this.getAttribute('data-f') === 'open'; viewWrong(); });
    on('[data-u]', 'click', function () { WF.u = this.getAttribute('data-u'); viewWrong(); });
    on('[data-cz]', 'click', function () { WF.cause = this.getAttribute('data-cz'); viewWrong(); });
    on('[data-k]', 'click', function () { viewWrongOne(this.getAttribute('data-k')); });
  }

  function viewWrongOne(k) {
    var w = Store.findWrong(k);
    if (!w) return viewWrong();
    var c = w.c && App.concept(w.c);
    var p = c && App.pairOf(c.id);
    var ds = w.dsId && window.DATASETS.filter(function (d) { return d.id === w.dsId; })[0];

    html(head('오답 다시 보기', '#/wrong') +
      '<div class="card">' +
        '<div class="spread"><span class="pill' + (w.fixed ? ' g' : ' r') + '">' +
          (w.fixed ? '해결' : '틀림 ' + (w.n || 1) + '회') + '</span>' +
          '<span class="mini">' + esc(w.src || '') + ' · ' + dstr(w.ts) + '</span></div>' +
        (ds ? '<div class="mt ds">' + DataView.figure(ds) + '</div>' : '') +
        '<div class="stem mt">' + markStem(w.q) + '</div>' +
        '<ul class="ch">' + w.ch.map(function (t, i) {
          return '<li><button disabled class="' + (i === w.a ? 'ok' : (i === w.sel ? 'no' : '')) + '">' +
            '<span class="n">' + NUM[i] + '</span><span>' + esc(t) + '</span>' +
            (i === w.sel && i !== w.a ? '<span class="mini" style="margin-left:auto">내 답</span>' : '') +
            (i === w.a ? '<span class="mini" style="margin-left:auto">정답</span>' : '') +
            '</button></li>';
        }).join('') + '</ul>' +
        '<div class="sol"><b>해설</b><div class="mt">' + esc(w.sol || '') + '</div>' +
          (c && c.x ? '<div class="mini mt">함정: ' + esc(c.x) + '</div>' : '') + '</div>' +
        (w.cause ? '<div class="mini mt">내가 고른 원인: <b>' + esc(causeLabel(w.cause)) + '</b></div>' : '') +
      '</div>' +

      '<div class="card"><h3>이어서 할 일</h3>' +
        (c ? '<button class="btn sec mt" data-go="#/concept/' + c.id + '">개념 카드 보기 — ' + esc(c.t) + '</button>' : '') +
        (p ? '<button class="btn sec mt" data-go="#/compare/' + p.id + '">대비표 보기 — ' + esc(p.title) + '</button>' : '') +
        (ds ? '<button class="btn sec mt" data-go="#/data/' + ds.id + '">이 자료 다시 훈련</button>' : '') +
        '<button class="btn mt" data-go="#/wrongrun">틀린 문제 모아 풀기</button>' +
      '</div>' +

      '<div class="card"><div class="btnrow">' +
        '<button class="btn sec" id="tog">' + (w.fixed ? '다시 못 잡음으로' : '해결로 표시') + '</button>' +
        '<button class="btn sec" id="del">노트에서 지우기</button></div></div>' + tabs('wrong'));

    UI.bindBack();
    if (ds) DataView.mount(document.querySelector('.ds'), ds);
    on('[data-go]', 'click', function () { go(this.getAttribute('data-go')); });
    on('#tog', 'click', function () { Store.setWrongFixed(k, !w.fixed); viewWrongOne(k); });
    on('#del', 'click', function () {
      if (!confirm('이 문항을 오답 노트에서 지울까요?')) return;
      Store.removeWrong(k); viewWrong();
    });
  }

  /* 틀린 문제만 모아 풀기 — 선택지 순서를 섞어 위치 암기를 막는다 */
  function viewWrongRun() {
    var list = Store.wrongList({ open: true, u: WF.u, cause: WF.cause });
    if (!list.length) list = Store.wrongList({ open: true });
    if (!list.length) { toast('풀 오답이 없습니다.'); return go('#/wrong'); }
    var items = App.shuffle(list).slice(0, 10).map(function (w) {
      var idx = w.ch.map(function (_, i) { return i; });
      var sh = App.shuffle(idx);
      return {
        kind: 'wrongq', key: w.k, c: w.c, u: w.u, q: w.q,
        ch: sh.map(function (i) { return w.ch[i]; }),
        a: sh.indexOf(w.a), sol: w.sol, src: '오답 노트'
      };
    });
    runner({
      title: '틀린 문제 모아 풀기', back: '#/wrong', items: items, showCause: true,
      onDone: function (res, right) {
        var fixed = res.filter(function (r) {
          var w = Store.findWrong(r.q.key); return r.ok && w && w.fixed;
        }).length;
        html(head('오답 복습 결과', '#/wrong') +
          resultCard(right, res.length,
            '<div class="kv mt"><span>해결로 바뀐 문항</span><b>' + fixed + '개</b></div>' +
            '<div class="kv"><span>남은 오답</span><b>' + Store.wrongCount(true) + '개</b></div>' +
            '<div class="mini mt">한 번 더 맞혀야 해결되는 문항은 다음 판에 또 나옵니다.</div>') +
          '<div class="card"><button class="btn" data-go="#/wrongrun">한 판 더</button>' +
          '<button class="btn sec mt" data-go="#/wrong">오답 노트로</button></div>' + tabs('wrong'));
        UI.bindBack();
        on('[data-go]', 'click', function () { go(this.getAttribute('data-go')); });
      }
    });
  }

  /* ───────── 개념 매칭 게임 (이름 카드 ↔ 뜻 카드) ───────── */
  function viewMatch(uid, n) {
    n = parseInt(n || 5, 10);
    var pool = (uid === 'all') ? App.allConcepts() : App.conceptsOf(uid);
    if (pool.length < 2) { toast('개념이 부족합니다.'); return go('#/home'); }
    /* 아직 약한 개념을 먼저 내보낸다 (섞은 뒤 숙달도 오름차순 — 같은 단계 안에서는 무작위) */
    var picked = App.shuffle(pool.slice()).sort(function (a, b) {
      return Store.mastery(a.id) - Store.mastery(b.id);
    }).slice(0, Math.min(n, pool.length));

    var names = App.shuffle(picked), defs = App.shuffle(picked);
    var matched = {}, done = 0, tries = 0, t0 = Date.now(), missed = {};
    var selN = null, selD = null, lock = false;
    var back = (uid === 'all') ? '#/home' : '#/unit/' + uid;

    function draw() {
      html(head('개념 매칭', back) +
        '<div class="card">' +
          '<div class="spread"><span class="pill">' + done + ' / ' + picked.length + ' 짝</span>' +
          '<span class="mini">시도 ' + tries + '회</span></div>' +
          '<div class="mini mt">개념 이름을 고른 뒤, 그 뜻을 고르세요. 순서는 반대여도 됩니다.</div>' +
          '<div class="row wrap mt" id="names">' + names.map(function (c) {
            return '<button class="mchip" data-n="' + c.id + '">' + esc(c.t) + '</button>';
          }).join('') + '</div>' +
          '<div class="mdefs" id="defs">' + defs.map(function (c) {
            return '<button class="mdef" data-d="' + c.id + '">' + esc(c.d) + '</button>';
          }).join('') + '</div>' +
          '<div id="fb"></div>' +
        '</div>' + tabs(''));
      UI.bindBack();
      on('[data-n]', 'click', function () { tap('n', this.getAttribute('data-n')); });
      on('[data-d]', 'click', function () { tap('d', this.getAttribute('data-d')); });
    }

    function nodeN(id) { return document.querySelector('[data-n="' + id + '"]'); }
    function nodeD(id) { return document.querySelector('[data-d="' + id + '"]'); }

    function tap(side, id) {
      if (lock || matched[id]) return;
      if (side === 'n') {
        if (selN) nodeN(selN).classList.remove('sel');
        selN = (selN === id) ? null : id;
        if (selN) nodeN(selN).classList.add('sel');
      } else {
        if (selD) nodeD(selD).classList.remove('sel');
        selD = (selD === id) ? null : id;
        if (selD) nodeD(selD).classList.add('sel');
      }
      if (selN && selD) check();
    }

    function check() {
      var a = selN, b = selD, ok = (a === b);
      tries++;
      lock = true;
      Store.record(a, ok, 0);
      var fb = document.getElementById('fb');
      if (ok) {
        matched[a] = 1; done++;
        nodeN(a).className = 'mchip ok'; nodeD(b).className = 'mdef ok';
        selN = selD = null; lock = false;
        var c = App.concept(a);
        fb.innerHTML = '<div class="sol"><b>짝 맞음</b> · ' + esc(c.t) +
          (c.x ? '<div class="mini mt">함정: ' + esc(c.x) + '</div>' : '') + '</div>';
        document.querySelector('.spread .pill').textContent = done + ' / ' + picked.length + ' 짝';
        if (done >= picked.length) return setTimeout(finish, 600);
      } else {
        missed[a] = 1;
        var ca = App.concept(a);
        nodeN(a).classList.add('no'); nodeD(b).classList.add('no');
        fb.innerHTML = '<div class="sol" style="background:#fef2f2;border-color:#fecaca">' +
          '<b>짝이 아닙니다</b> · ‘' + esc(ca.t) + '’의 단서: ' +
          esc((ca.k || []).slice(0, 3).join(' · ')) + '</div>';
        setTimeout(function () {
          var na = nodeN(a), nd = nodeD(b);
          if (na) na.className = 'mchip';
          if (nd) nd.className = 'mdef';
          selN = selD = null; lock = false;
        }, 900);
      }
      document.querySelector('.spread .mini').textContent = '시도 ' + tries + '회';
    }

    function finish() {
      var sec = (Date.now() - t0) / 1000;
      var perfect = tries === picked.length;
      if (perfect) Store.award('매칭 무실수');
      var miss = Object.keys(missed);
      html(head('매칭 결과', back) +
        '<div class="card center"><div style="font-size:38px">' + (perfect ? '🎯' : '🧩') + '</div>' +
          '<b style="font-size:20px">' + picked.length + '짝 완성</b>' +
          '<div class="sub mt">' + sec.toFixed(1) + '초 · 시도 ' + tries + '회' +
          (perfect ? ' · 한 번도 안 틀림' : '') + '</div></div>' +
        (miss.length ? '<div class="card"><h3>헷갈린 개념</h3>' + miss.map(function (id) {
          var c = App.concept(id);
          return '<button class="citem" data-c="' + id + '"><i class="m m' + Store.mastery(id) + '"></i>' +
            '<span class="grow"><span class="t">' + esc(c.t) + '</span>' +
            '<span class="d"> — ' + esc(c.d) + '</span></span></button>';
        }).join('') + '</div>' : '') +
        '<div class="card"><button class="btn" data-go="#/match/' + uid + '/' + n + '">한 판 더</button>' +
        '<button class="btn sec mt" data-go="' + back + '">돌아가기</button></div>' + tabs(''));
      UI.bindBack();
      on('[data-c]', 'click', function () { go('#/concept/' + this.getAttribute('data-c')); });
      on('[data-go]', 'click', function () { go(this.getAttribute('data-go')); });
    }
    draw();
  }

  /* ───────── 발문 핵심어 터치 드릴 ───────── */
  function viewStem() {
    var negs = window.QBANK.map(function (q, i) { return { q: q, i: i }; })
      .filter(function (o) { return o.q.neg; });
    var mixed = App.shuffle(negs).slice(0, 3)
      .concat(App.shuffle(window.QBANK.map(function (q, i) { return { q: q, i: i }; })
        .filter(function (o) { return !o.q.neg; })).slice(0, 2));
    mixed = App.shuffle(mixed);
    var i = 0, right = 0;

    function draw() {
      if (i >= mixed.length) return done();
      var b = mixed[i].q;
      var words = b.q.split(/(\s+)/);
      html(head('발문 핵심어 터치', '#/home') +
        '<div class="card"><div class="spread"><span class="pill">' + (i + 1) + ' / ' + mixed.length + '</span>' +
          '<span class="mini">발문 오독 처방</span></div>' +
          '<div class="sub mt">발문에서 <b>가장 중요한 낱말</b>을 눌러 표시한 뒤 선택지를 고르세요. ' +
          "('옳지 않은', '아닌', '적절한' 같은 말)</div>" +
          '<div class="stem mt" id="stem">' + words.map(function (w, k) {
            return /\S/.test(w) ? '<button class="wordbtn" data-w="' + k + '">' + esc(w) + '</button>' : esc(w);
          }).join('') + '</div>' +
          choiceHTML(b.ch) + '<div id="after"></div></div>' + tabs(''));
      UI.bindBack();
      var tapped = [];
      on('.wordbtn', 'click', function () {
        this.classList.toggle('on');
        var k = this.getAttribute('data-w');
        var at = tapped.indexOf(k); at < 0 ? tapped.push(k) : tapped.splice(at, 1);
      });
      on('.ch button', 'click', function () {
        if (!tapped.length) return toast('먼저 발문의 핵심어를 눌러 표시하세요.');
        var sel = parseInt(this.getAttribute('data-i'), 10), ok = sel === b.a;
        var keyFound = tapped.some(function (k) {
          return /옳지|않은|아닌|적절한|가장|모두/.test(words[k]);
        });
        document.querySelectorAll('.ch button').forEach(function (x, k) {
          x.setAttribute('disabled', '');
          if (k === b.a) x.classList.add('ok');
          if (k === sel && !ok) x.classList.add('no');
        });
        if (ok) right++;
        Store.record(b.c, ok, 0);
        document.getElementById('after').innerHTML =
          '<div class="sol"><b>' + (ok ? '정답' : '오답') + '</b>' +
          (b.neg ? ' · 이 문항은 <b>부정 발문</b>입니다.' : ' · 이 문항은 긍정 발문입니다.') +
          '<div class="mt">' + esc(b.sol) + '</div>' +
          '<div class="mini mt">' + (keyFound ? '핵심어를 잘 짚었습니다.' :
            "핵심어를 놓쳤습니다. '옳지 않은·아닌·가장' 같은 말에 먼저 표시하세요.") + '</div></div>' +
          '<button class="btn mt" id="next">다음</button>';
        on('#next', 'click', function () { i++; draw(); }, document.getElementById('after'));
      });
    }
    function done() {
      var s = Store.s(); s.drills.stem++; Store.save();
      html(head('발문 드릴 결과', '#/home') + resultCard(right, mixed.length,
        '<div class="mini mt">실전에서는 발문을 읽자마자 부정어에 동그라미를 치세요.</div>') +
        '<div class="card"><button class="btn" data-go="#/stem">한 판 더</button>' +
        '<button class="btn sec mt" data-go="#/home">홈으로</button></div>' + tabs(''));
      UI.bindBack();
      on('[data-go]', 'click', function () { go(this.getAttribute('data-go')); });
    }
    draw();
  }

  /* ───────── 실전 모의고사 (25문항 / 30분) ───────── */
  var EX = null;
  function viewExamIntro() {
    var st = Store.examStats();
    html(head('실전 모의고사') +
      '<div class="card"><h3>통합사회 실전 25문항</h3>' +
        '<div class="kv"><span>문항</span><b>25문항 × 4점</b></div>' +
        '<div class="kv"><span>시간</span><b>30분 (문항당 72초)</b></div>' +
        '<div class="kv"><span>형식</span><b>4지선다 · OMR</b></div>' +
        '<div class="tip"><b>검토 루틴</b> 25문항을 22분 안에 풀고, 남은 8분 동안 ① ‘옳지 않은’ 발문 재확인 ' +
        '② 자료 문항의 단위·범례 재확인 ③ OMR 대조 순서로 점검합니다.</div>' +
        '<button class="btn mt" id="start">시작하기</button></div>' +
      '<div class="card"><h3>기록</h3>' +
        '<div class="kv"><span>응시 횟수</span><b>' + st.count + '회</b></div>' +
        '<div class="kv"><span>최고 점수</span><b>' + st.best + '점</b></div>' +
        '<div class="kv"><span>3회 연속 100점</span><b>' + (st.perfectRun ? '달성' : '미달성') + '</b></div>' +
        (st.recent.length ? st.recent.map(function (e) {
          var d = new Date(e.ts);
          return '<div class="kv"><span>' + (d.getMonth() + 1) + '/' + d.getDate() + '</span>' +
            '<b>' + e.score + '점 · ' + Math.round(e.min) + '분</b></div>';
        }).join('') : '') + '</div>' + tabs('exam'));
    UI.bindBack();
    on('#start', 'click', function () {
      EX = {
        items: App.buildExam(25).map(function (it) { return norm(it); }),
        ans: [], sec: [], i: 0, start: Date.now(), left: 30 * 60, tick: null, last: Date.now()
      };
      for (var k = 0; k < 25; k++) { EX.ans.push(null); EX.sec.push(0); }
      examRun();
    });
  }

  function examRun() {
    var q = EX.items[EX.i];
    var fig = q.ds ? DataView.figure(q.ds) : '';
    html('<header class="top"><button class="back" id="omrtop">OMR</button>' +
        '<h1>모의고사 <span class="timer" id="clk"></span></h1>' +
        '<button class="back" id="quitex">나가기</button>' +
        '<button class="back" id="fin">제출</button></header>' +
      '<div class="card">' +
        '<div class="spread"><span class="pill">' + (EX.i + 1) + ' / 25</span>' +
        '<span class="mini">' + esc(q.src || '') + '</span></div>' +
        (fig ? '<div class="mt ds">' + fig + '</div>' : '') +
        '<div class="stem mt">' + markStem(q.q) + '</div>' + choiceHTML(q.ch) +
        '<div class="btnrow mt"><button class="btn sec" id="prev">이전</button>' +
        '<button class="btn sec" id="next">다음</button></div>' +
      '</div>' +
      '<div class="card"><h3>OMR</h3><div class="omr" id="omr"></div>' +
        '<button class="btn mt" id="submit">제출하기</button></div>');
    if (q.ds) DataView.mount(document.querySelector('.ds'), q.ds);
    if (EX.ans[EX.i] != null) {
      var b = document.querySelector('.ch button[data-i="' + EX.ans[EX.i] + '"]');
      if (b) b.classList.add('on');
    }
    on('.ch button', 'click', function () {
      document.querySelectorAll('.ch button').forEach(function (x) { x.classList.remove('on'); });
      this.classList.add('on');
      EX.ans[EX.i] = parseInt(this.getAttribute('data-i'), 10);
      drawOMR();
      setTimeout(function () {
        if (!document.getElementById('omr')) return;   // 화면을 떠났으면 중단
        if (EX.i < 24) { stamp(); EX.i++; examRun(); }
      }, 220);
    });
    on('#prev', 'click', function () { if (EX.i > 0) { stamp(); EX.i--; examRun(); } });
    on('#next', 'click', function () { if (EX.i < 24) { stamp(); EX.i++; examRun(); } });
    on('#omrtop', 'click', function () { document.getElementById('omr').scrollIntoView({ behavior: 'smooth' }); });
    on('#fin', 'click', confirmSubmit);
    on('#submit', 'click', confirmSubmit);
    on('#quitex', 'click', function () {
      if (!confirm('모의고사를 중단하고 홈으로 나갈까요?\n지금까지 푼 내용은 채점되지 않습니다.')) return;
      clearInterval(EX.tick);
      go('#/home');
    });
    drawOMR();
    clock();
  }
  function stamp() {
    var now = Date.now();
    EX.sec[EX.i] += (now - EX.last) / 1000; EX.last = now;
  }
  function drawOMR() {
    var o = document.getElementById('omr'); if (!o) return;
    o.innerHTML = EX.items.map(function (q, k) {
      return '<button data-k="' + k + '" class="' + (EX.ans[k] != null ? 'done ' : '') +
        (k === EX.i ? 'cur' : '') + '">' + (k + 1) + '<br>' +
        (EX.ans[k] != null ? NUM[EX.ans[k]] : '·') + '</button>';
    }).join('');
    on('[data-k]', 'click', function () {
      stamp(); EX.i = parseInt(this.getAttribute('data-k'), 10); examRun();
    }, o);
  }
  function clock() {
    clearInterval(EX.tick);
    paintClock();
    EX.tick = setInterval(function () { EX.left--; paintClock(); }, 1000);
  }
  function paintClock() {
      var c = document.getElementById('clk');
      if (!c) return clearInterval(EX.tick);
      var m = Math.floor(Math.max(0, EX.left) / 60), s = Math.max(0, EX.left) % 60;
      c.textContent = m + ':' + (s < 10 ? '0' : '') + s;
      c.style.color = EX.left < 300 ? 'var(--bad)' : (EX.left <= 480 ? 'var(--warn)' : '');
      if (EX.left === 480) toast('22분 경과 — 이제 검토 루틴을 시작하세요.');
      if (EX.left <= 0) { clearInterval(EX.tick); examGrade(); }
  }
  function confirmSubmit() {
    var blank = EX.ans.filter(function (a) { return a == null; }).length;
    if (blank && !confirm(blank + '문항이 비어 있습니다. 제출할까요?')) return;
    examGrade();
  }

  function examGrade() {
    stamp(); clearInterval(EX.tick);
    var min = (Date.now() - EX.start) / 60000;
    var right = 0;
    EX.items.forEach(function (q, k) {
      var ok = EX.ans[k] === q.a;
      if (ok) right++;
      if (q.c) Store.record(q.c, ok, EX.sec[k] * 1000);
      if (!ok) noteWrong(q, EX.ans[k]);        // 시험이 끝나도 오답은 남는다
    });
    var score = right * 4;
    Store.s().exams.push({ ts: Date.now(), score: score, min: min, right: right });
    if (score === 100) Store.award('모의고사 100점');
    if (Store.examStats().perfectRun) Store.award('3회 연속 100점');
    Store.save();

    var slowest = EX.items.map(function (q, k) { return { k: k, s: EX.sec[k], ok: EX.ans[k] === q.a }; })
      .sort(function (a, b) { return b.s - a.s; }).slice(0, 3);

    html(head('채점 결과', '#/exam') +
      '<div class="card center"><b style="font-size:38px">' + score + '점</b>' +
        '<div class="sub">' + right + ' / 25 정답 · ' + min.toFixed(1) + '분 소요</div>' +
        (score === 100 ? '<div class="pill g mt">만점</div>' : '') +
        (min > 30 ? '<div class="pill r mt">시간 초과</div>' : '') + '</div>' +
      '<div class="card"><h3>OMR</h3><div class="omr">' + EX.items.map(function (q, k) {
        var ok = EX.ans[k] === q.a;
        return '<button data-r="' + k + '" class="' + (ok ? 'ok' : 'no') + '">' + (k + 1) + '<br>' +
          (EX.ans[k] != null ? NUM[EX.ans[k]] : '·') + '</button>';
      }).join('') + '</div>' +
      '<div class="mini mt">번호를 누르면 해설과 오답 원인 선택으로 이동합니다.</div></div>' +
      '<div class="card"><h3>가장 오래 걸린 문항</h3>' + slowest.map(function (x) {
        return '<div class="kv"><span>' + (x.k + 1) + '번</span><b>' + x.s.toFixed(0) + '초 ' +
          (x.ok ? '' : '· 오답') + '</b></div>';
      }).join('') + '<div class="mini mt">문항당 72초가 기준입니다.</div></div>' +
      '<div class="card">' +
        (right < 25 ? '<button class="btn" data-go="#/wrong">틀린 ' + (25 - right) +
          '문항 오답 노트에서 보기</button>' : '') +
        '<button class="btn sec mt" data-go="#/exam">다시 응시</button>' +
        '<button class="btn sec mt" data-go="#/report">리포트 보기</button></div>' + tabs('exam'));
    UI.bindBack();
    on('[data-go]', 'click', function () { go(this.getAttribute('data-go')); });
    on('[data-r]', 'click', function () { examReview(parseInt(this.getAttribute('data-r'), 10)); });
  }

  function examReview(k) {
    var q = EX.items[k], ok = EX.ans[k] === q.a;
    var fig = q.ds ? DataView.figure(q.ds) : '';
    html(head((k + 1) + '번 해설', '#/exam') +
      '<div class="card">' + (fig ? '<div class="ds mb">' + fig + '</div>' : '') +
        '<div class="stem">' + markStem(q.q) + '</div>' +
        '<ul class="ch">' + q.ch.map(function (c, i) {
          return '<li><button disabled class="' + (i === q.a ? 'ok' : (i === EX.ans[k] ? 'no' : '')) + '">' +
            '<span class="n">' + NUM[i] + '</span><span>' + esc(c) + '</span></button></li>';
        }).join('') + '</ul>' +
        '<div class="sol"><b>' + (ok ? '정답' : '오답') + '</b> · ' + EX.sec[k].toFixed(0) + '초' +
        '<div class="mt">' + esc(q.sol || '') + '</div></div>' +
        (ok ? '' : causeHTML((k + 1) + '번', q.c || '',
          (q.q || '').replace(/\s+/g, ' ').slice(0, 70))) +
        '<div class="btnrow mt">' +
          '<button class="btn sec" ' + (k > 0 ? 'data-mv="' + (k - 1) + '"' : 'disabled') + '>이전</button>' +
          '<button class="btn sec" ' + (k < 24 ? 'data-mv="' + (k + 1) + '"' : 'disabled') + '>다음</button>' +
        '</div>' +
        '<button class="btn mt" id="back2">채점표로</button>' +
      '</div>' + tabs('exam'));
    if (q.ds) DataView.mount(document.querySelector('.ds'), q.ds);
    UI.bindBack(); bindCause();
    on('[data-mv]', 'click', function () { examReview(parseInt(this.getAttribute('data-mv'), 10)); });
    on('#back2', 'click', examGradeBack);
  }
  function examGradeBack() {
    // 재채점 없이 결과 화면만 다시 그린다
    var right = EX.items.filter(function (q, k) { return EX.ans[k] === q.a; }).length;
    var score = right * 4;
    html(head('채점 결과', '#/exam') +
      '<div class="card center"><b style="font-size:38px">' + score + '점</b>' +
      '<div class="sub">' + right + ' / 25 정답</div></div>' +
      '<div class="card"><h3>OMR</h3><div class="omr">' + EX.items.map(function (q, k) {
        var ok = EX.ans[k] === q.a;
        return '<button data-r="' + k + '" class="' + (ok ? 'ok' : 'no') + '">' + (k + 1) + '<br>' +
          (EX.ans[k] != null ? NUM[EX.ans[k]] : '·') + '</button>';
      }).join('') + '</div></div>' +
      '<div class="card"><button class="btn" data-go="#/exam">다시 응시</button></div>' + tabs('exam'));
    UI.bindBack();
    on('[data-go]', 'click', function () { go(this.getAttribute('data-go')); });
    on('[data-r]', 'click', function () { examReview(parseInt(this.getAttribute('data-r'), 10)); });
  }

  /* ───────── 라우팅 ───────── */
  function route(p) {
    bind();
    switch (p[0]) {
      case 'quiz':   viewQuiz(p[1] || 'all', p[2] || 10); return true;
      case 'review': viewReview(p[1] || null); return true;
      case 'drill':  viewDrill(p[1]); return true;
      case 'boss':   viewBoss(p[1]); return true;
      case 'sort':   viewSort(p[1]); return true;
      case 'match':  viewMatch(p[1] || 'all', p[2] || 5); return true;
      case 'wrong':  viewWrong(); return true;
      case 'wrongrun': viewWrongRun(); return true;
      case 'stem':   viewStem(); return true;
      case 'exam':   viewExamIntro(); return true;
    }
    return false;
  }
  window.Play = { route: route, runner: function (o) { bind(); runner(o); }, causeHTML: causeHTML, bindCause: bindCause, norm: norm, choiceHTML: choiceHTML, resultCard: resultCard };
})();
