/* 화면·라우팅 — 홈, 단원 지도, 개념 카드, 대비표, 로드맵, 리포트, 튜터 */
(function () {
  'use strict';
  var $app;
  var MNAME = ['미학습', '불안정', '학습 중', '익힘', '완성'];

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function html(s) { $app.innerHTML = s; window.scrollTo(0, 0); }
  /* 같은 주소로 이동하면 hashchange가 일어나지 않으므로 직접 다시 그린다
     ('한 판 더', '다시 하기', '다시 응시' 같은 버튼이 여기에 해당한다) */
  function go(h) {
    if (location.hash === h) return route();
    location.hash = h;
  }
  function on(sel, ev, fn, root) {
    (root || $app).querySelectorAll(sel).forEach(function (n) { n.addEventListener(ev, fn); });
  }
  function toast(msg) {
    var t = document.getElementById('toast');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove('show'); }, 1800);
  }
  function head(title, backHash) {
    return '<header class="top">' +
      (backHash !== false ? '<button class="back" data-back="' + esc(backHash || '#/home') + '">←</button>' : '') +
      '<h1>' + esc(title) + '</h1>' +
      '<button class="back home" data-back="#/home">홈</button></header>';
  }
  function bindBack() {
    on('[data-back]', 'click', function () { go(this.getAttribute('data-back')); });
  }
  /* '옳지 않은' 등 부정 발문 강조 */
  function markStem(q) {
    return esc(q).replace(/(옳지 않은|적절하지 않은|아닌 것은|해당하지 않는)/g,
      '<span class="neg">$1</span>');
  }

  /* ───────── 홈 ───────── */
  function viewHome() {
    var st = Store.s();
    var dueTotal = Store.dueConcepts().length;
    var total = App.allConcepts().length, learned = Store.learnedTotal();
    var pr = Store.progress();
    var nx = Store.nextToLearn(null);
    var p1pct = Math.round(learned / total * 100);
    var openWrong = Store.wrongCount(true);
    var ex = Store.examStats();
    var dueMap = Store.dueUnits();
    var T = window.UNIT_TONE || {};

    var units = window.UNITS.map(function (u) {
      var t = T[u.id] || { soft: '#e9eef8', acc: '#5a6b8c', tint: '#f6f8fc' };
      var dist = Store.unitDist(u.id);
      var n = dist.reduce(function (a, b) { return a + b; }, 0);
      var lrn = Store.learnedIn(u.id);
      var pct = Math.round(Store.unitMastery(u.id) / 4 * 100);
      var d = dueMap[u.id] || 0;
      return '<button class="ucard" data-u="' + u.id + '" style="--soft:' + t.soft +
        ';--acc:' + t.acc + ';--tint:' + t.tint + '">' +
        '<span class="uc-thumb">' + Art.forUnit(u.id) +
          '<span class="uc-tag">통합사회' + u.book + ' · ' + u.no + '</span>' +
          (d ? '<span class="uc-due">복습 ' + d + '</span>' : '') +
        '</span>' +
        '<span class="uc-body">' +
          '<span class="uc-ti">' + esc(u.title) + '</span>' +
          '<span class="uc-sub">개념 ' + n + '개 · ' + esc(u.subs.length) + '개 중단원</span>' +
          '<span class="uc-bars">' + segBar(dist, n) + '</span>' +
          '<span class="uc-foot">' +
            '<i class="uc-chip">📘 ' + (lrn >= n ? '개념 완료' : lrn + '/' + n) + '</i>' +
            '<i class="uc-chip">숙달도 ' + pct + '%</i>' +
            (Store.unitState(u.id).boss ? '<i class="uc-chip star">★ 보스전</i>' : '') +
          '</span>' +
        '</span></button>';
    }).join('');

    html(
      '<div class="topbar"><span class="tb-logo">📘</span>' +
        '<span class="tb-n"><b>통합사회 만점 독학</b><i>SOCIAL STUDIES 1 &amp; 2</i></span>' +
        '<span class="tb-streak">🔥 ' + st.streak + '일</span></div>' +

      '<section class="hero">' +
        '<span class="hero-badge"><i></i> 통합사회1·2 개념부터 실전까지</span>' +
        '<h2 class="hero-ti">개념은 <em>하나씩</em>,<br>점수는 <em>확실하게</em></h2>' +
        '<p class="hero-p">통합사회1·2의 개념 ' + total + '개를 그림과 만화로 익히고,<br>' +
        '헷갈리는 짝을 갈라낸 다음 30분 실전으로 마무리합니다.</p>' +
        '<div class="hero-stat">' +
          '<span><b>' + learned + '</b>배운 개념</span>' +
          '<span><b>' + ex.best + '</b>모의고사 최고</span>' +
          '<span><b>' + pr.got + '/' + pr.total + '</b>목표 달성</span>' +
        '</div>' +
      '</section>' +

      (dueTotal || openWrong ?
        '<div class="todaybar">' +
          '<span class="tdy-t">오늘 먼저 할 일</span>' +
          (dueTotal ? '<button class="tdy-b" data-go="#/review">복습 큐 <i>' + dueTotal + '</i></button>' : '') +
          (openWrong ? '<button class="tdy-b r" data-go="#/wrong">오답 노트 <i>' + openWrong + '</i></button>' : '') +
        '</div>' : '') +

      '<div class="parts">' +
        '<button class="pcard p1" data-go="#/learn">' +
          '<span class="pc-top"><i class="pc-no">1부</i><i class="pc-pct">' + p1pct + '%</i></span>' +
          '<span class="pc-ti">기본개념 학습</span>' +
          '<span class="pc-sub">배우기 → 확인 문제 → 통과<br>개념을 하나씩 정확히 익힙니다</span>' +
          '<span class="pc-bar"><i style="width:' + p1pct + '%"></i></span>' +
          '<span class="pc-foot">' + learned + ' / ' + total + '개' +
            (nx ? ' · 다음은 ' + esc(nx.t) : ' · 모두 완료') + '</span>' +
          '<span class="pc-go">' + (learned ? '이어서 배우기' : '시작하기') + ' →</span>' +
        '</button>' +
        '<button class="pcard p2" data-go="#/challenge">' +
          '<span class="pc-top"><i class="pc-no">2부</i><i class="pc-pct">' + ex.best + '점</i></span>' +
          '<span class="pc-ti">시험 만점 도전</span>' +
          '<span class="pc-sub">대비표 · 분류 게임 · 자료 해석<br>30분 실전 모의고사</span>' +
          '<span class="pc-bar"><i style="width:' + Math.round(pr.got / pr.total * 100) + '%"></i></span>' +
          '<span class="pc-foot">' +
            (p1pct < 50 ? '1부를 절반 이상 마친 뒤 권장 (지금 ' + p1pct + '%)'
                        : '목표 ' + pr.got + ' / ' + pr.total + '개 달성') + '</span>' +
          '<span class="pc-go">' + (p1pct < 50 ? '미리 둘러보기' : '도전하기') + ' →</span>' +
        '</button>' +
      '</div>' +

      '<section class="sect">' +
        '<div class="sect-h"><h3>단원 지도</h3>' +
        '<span class="mini">📘 개념 학습 · 색막대 숙달도</span></div>' +
        '<div class="ucards">' + units + '</div>' +
        '<div class="legend">' +
          '<span><i class="m m0"></i>미학습</span><span><i class="m m1"></i>불안정</span>' +
          '<span><i class="m m2"></i>학습 중</span><span><i class="m m3"></i>익힘</span>' +
          '<span><i class="m m4"></i>완성</span></div>' +
      '</section>' +

      roadmapCard() + tabs('home')
    );
    on('[data-u]', 'click', function () { go('#/unit/' + this.getAttribute('data-u')); });
    on('[data-go]', 'click', function () { go(this.getAttribute('data-go')); });
  }

  /* ───────── 2부 허브 ───────── */
  function viewChallenge() {
    var pr = Store.progress(), ex = Store.examStats();
    var total = App.allConcepts().length, learned = Store.learnedTotal();
    var p1pct = Math.round(learned / total * 100);
    var pairsDone = window.PAIRS.filter(function (p) { return Store.pairState(p.id).cleared; }).length;
    var dsDone = window.DATASETS.filter(function (d) { return Store.s().ds[d.id]; }).length;
    var openWrong = Store.wrongCount(true);

    function row(icon, t, sub, dest, badge) {
      return '<button class="unitrow" data-go="' + dest + '">' +
        '<span class="ur-em">' + icon + '</span>' +
        '<span class="ur-b"><span class="ur-t">' + esc(t) + '</span>' +
        '<span class="mini">' + esc(sub) + '</span></span>' +
        '<span class="ur-n">' + (badge || '›') + '</span></button>';
    }

    html(head('2부 · 시험 만점 도전') +
      '<div class="card">' +
        '<div class="spread"><b style="font-size:16px">비슷한 개념을 갈라내기</b>' +
        '<span class="pill">최고 ' + ex.best + '점</span></div>' +
        '<div class="sub mt">통합사회 오답의 대부분은 <b>비슷한 개념 혼동</b>과 <b>자료 해석 실수</b>입니다. ' +
        '2부는 그 둘을 집중해서 없앱니다.</div>' +
        (p1pct < 50 ? '<div class="tip"><b>1부를 먼저 하세요.</b> 개념을 모르는 상태로 문제를 풀면 ' +
          '틀린 이유를 알 수 없습니다. 지금 1부 진행률 ' + p1pct + '%입니다.</div>' +
          '<button class="btn mt" data-go="#/learn">1부로 가기</button>' : '') +
      '</div>' +

      '<div class="card"><h3>개념 갈라내기</h3>' +
        row('⚖️', '대비표 50쌍', '헷갈리는 개념을 나란히 놓고 차이 보기 · 완성 ' + pairsDone + '/' + window.PAIRS.length, '#/compare') +
        row('🗂️', '사례 분류 게임', '사례 카드를 알맞은 개념 상자에 넣기', '#/sortlist') +
        row('🧩', '개념 매칭 게임', '이름 카드와 뜻 카드 짝 맞추기', '#/match/all/5') +
        row('⚡', '개념 즉답 퀴즈', '20초 안에 떠오르는지 확인 (실전은 문항당 72초)', '#/quiz/all/10') +
      '</div>' +

      '<div class="card"><h3>자료와 발문</h3>' +
        row('📊', '자료 해석 훈련', '그래프·표·지도·헌법 조문 10종 · 완료 ' + dsDone + '/' + window.DATASETS.length, '#/data') +
        row('🔍', '발문 터치 드릴', '‘옳지 않은’을 놓치는 습관 교정', '#/stem') +
      '</div>' +

      '<div class="card"><h3>실전</h3>' +
        row('📝', '실전 모의고사', '25문항 · 30분 · OMR · 문항별 소요 시간', '#/exam') +
        row('🔖', '오답 노트', '틀린 문항을 통째로 보관 · 모아 풀기', '#/wrong',
          openWrong ? '<span class="pill r">' + openWrong + '</span>' : '›') +
        row('🪜', '내 학습 단계', '5단계 체크리스트 · 달성 ' + pr.got + ' / ' + pr.total, '#/roadmap') +
      '</div>' + tabs('challenge'));
    bindBack();
    on('[data-go]', 'click', function () { go(this.getAttribute('data-go')); });
  }

  /* 숙달도 분포를 5색으로 쌓아 보여 주는 막대 */
  function segBar(dist, total) {
    if (!total) return '<div class="bar"></div>';
    return '<div class="bar seg">' + [4, 3, 2, 1, 0].map(function (lv) {
      var w = dist[lv] / total * 100;
      return w ? '<i style="width:' + w.toFixed(2) + '%;background:var(--m' + lv + ')"></i>' : '';
    }).join('') + '</div>';
  }

  function roadmapCard() {
    var pr = Store.progress(), cur = pr.cur;
    var next = cur.checks.filter(function (c) { return !c.done; })[0];
    return '<div class="card"><div class="spread"><h3 style="margin:0">내 학습 단계</h3>' +
      '<span class="pill">' + cur.step + '단계 / 5</span></div>' +
      '<div class="mt"><b>' + esc(cur.name) + '</b>' +
      '<div class="sub">' + esc(cur.act) + '</div></div>' +
      '<div class="barh mt"><i style="width:' + Math.round(pr.got / pr.total * 100) + '%"></i></div>' +
      '<div class="mini mt">전체 목표 ' + pr.got + ' / ' + pr.total + '개 달성' +
      (next ? ' · 다음: ' + esc(next.t) : '') + '</div>' +
      '<button class="btn sec mt" data-go="#/roadmap">단계별로 확인하기</button></div>';
  }

  /* 개념 카드 한 장 — 누를 수 있다는 것이 바로 보이도록 */
  function conceptTile(c, i, curId) {
    var m = Store.mastery(c.id);
    return '<button class="ccard' + (c.id === curId ? ' cur' : '') + '" data-c="' + c.id + '">' +
      (i != null ? '<span class="cnum">' + (i + 1) + '</span>' : '') +
      (window.ConceptArt ? ConceptArt.thumb(c) : '') +
      '<span class="cb">' +
        '<span class="ct"><i class="m m' + m + '" title="' + MNAME[m] + '"></i>' + esc(c.t) + '</span>' +
        '<span class="cd">' + esc(c.d) + '</span>' +
        '<span class="cgo">' + (c.id === curId ? '지금 보는 개념' : '눌러서 공부하기 ›') + '</span>' +
      '</span></button>';
  }
  function conceptGrid(list, curId) {
    return '<div class="ccards">' + list.map(function (c, i) {
      return conceptTile(c, i, curId);
    }).join('') + '</div>';
  }

  /* ───────── 단원 화면 ───────── */
  function viewUnit(uid) {
    var u = App.unit(uid);
    if (!u) return go('#/home');
    var cs = App.conceptsOf(uid);
    var ps = window.PAIRS.filter(function (p) { return p.u === uid; });
    var ds = window.DATASETS.filter(function (d) { return d.u === uid; });
    var st = Store.unitState(uid);

    var list = conceptGrid(cs, null);

    var pl = ps.map(function (p) {
      var ps2 = Store.pairState(p.id);
      return '<li><button class="citem" data-p="' + p.id + '">' +
        '<span class="grow"><span class="t">' + esc(p.title) + '</span>' +
        '<span class="d"> — ' + p.cols.join(' / ') + '</span></span>' +
        (ps2.cleared ? '<span class="pill g">완료</span>' : '') + '</button></li>';
    }).join('') || '<li class="sub" style="padding:10px 2px">이 단원의 대비표는 준비 중입니다.</li>';

    html(
      head(u.no + '. ' + u.title) +
      '<div class="card"><div class="spread"><span class="row">' + Fig.icon(u.id) +
        '<span class="pill">통합사회' + u.book + '</span></span>' +
        (st.boss ? '<span class="pill g">★ 보스전 통과</span>' : '') + '</div>' +
        Art.forUnit(uid) +
        '<div class="sub mt"><b>만점을 막는 요인</b> — ' + esc(u.trap) + '</div>' +
        '<div class="mini mt">중단원: ' + u.subs.map(esc).join(' · ') + '</div>' +
        '<div class="mini">2015 개정 대응: ' + esc(u.tag2015) + '</div></div>' +

      masteryCard(uid, cs.length) +

      '<div class="card"><h3>개념 카드 (' + cs.length + ')</h3>' +
        '<div class="sub">읽기만 하지 말고 게임으로 굳히세요.</div>' +
        '<div class="btnrow mt">' +
          '<button class="btn" data-go="#/match/' + uid + '/5">개념 매칭 게임</button>' +
          '<button class="btn sec" data-go="#/quiz/' + uid + '/10">즉답 퀴즈</button>' +
        '</div>' +
        '<button class="btn sec mt" data-go="#/learn/' + uid + '">📘 1부에서 이 단원 개념 배우기</button>' +
        '<div class="hintbar">👆 아래 카드를 누르면 그림·사례·함정까지 볼 수 있어요</div>' +
        list + '</div>' +

      '<div class="card"><h3>대비 개념 쌍 (' + ps.length + ')</h3><ul class="clist">' + pl + '</ul></div>' +

      (ds.length ? '<div class="card"><h3>인터랙티브 자료</h3>' + ds.map(function (d) {
        return '<button class="btn sec mt" data-go="#/data/' + d.id + '">' + esc(d.title) + '</button>';
      }).join('') + '</div>' : '') +

      '<div class="card"><h3>단원 보스전</h3>' +
        '<div class="sub">대비 개념이 섞인 사례 5문항을 <b>모두</b> 맞혀야 통과합니다.</div>' +
        '<button class="btn mt" data-go="#/boss/' + uid + '">보스전 도전' +
        (st.tries ? ' (' + st.tries + '회 시도)' : '') + '</button></div>' + tabs('')
    );
    bindBack();
    on('[data-c]', 'click', function () { go('#/concept/' + this.getAttribute('data-c')); });
    on('[data-p]', 'click', function () { go('#/compare/' + this.getAttribute('data-p')); });
    on('[data-go]', 'click', function () { go(this.getAttribute('data-go')); });
  }

  /* 해당 단계에 있는 개념들을 다음 단계로 올리는 데 필요한 정답 횟수 */
  function needFor(uid, lv, target) {
    var need = 0;
    App.conceptsOf(uid).forEach(function (c) {
      if (Store.mastery(c.id) !== lv) return;
      need += Math.max(1, target - Store.rightOf(c.id));
    });
    return need;
  }

  /* 지금 무엇을 눌러야 점수가 오르는지 — 급한 순서대로 */
  function todoSteps(uid, dist) {
    var s = [], boss = Store.unitState(uid).boss;
    if (dist[1]) s.push({ lv: 1,
      what: '빨강 ' + dist[1] + '개를 먼저 되돌리세요',
      short: '빨강 ' + dist[1] + '개 되돌리기',
      why: '틀렸거나 8초를 넘긴 개념입니다. 오늘·내일·모레처럼 <b>서로 다른 날 3번</b> 맞히면 빨강이 풀립니다.',
      btn: '복습 큐 풀기', btn2: '복습', go: '#/review/' + uid });
    if (dist[0]) s.push({ lv: 0,
      what: '아직 안 본 ' + dist[0] + '개를 만나세요',
      short: '안 본 ' + dist[0] + '개 익히기',
      why: '한 번도 출제되지 않은 개념입니다. 매칭 게임 한 판이면 5개를 처음 익힙니다.',
      btn: '개념 매칭 게임', btn2: '매칭', go: '#/match/' + uid + '/5' });
    if (dist[2]) s.push({ lv: 2,
      what: '주황 ' + dist[2] + '개를 노랑으로 올리세요',
      short: '주황 ' + dist[2] + '개 → 노랑',
      why: '이 개념들을 합쳐 <b>정답 ' + needFor(uid, 2, Store.OK_RIGHT) + '회</b>를 더 쌓으면 노랑이 됩니다.',
      btn: '개념 매칭 게임', btn2: '매칭', go: '#/match/' + uid + '/5' });
    if (dist[3]) s.push({ lv: 3,
      what: '노랑 ' + dist[3] + '개를 초록으로 올리세요',
      short: '노랑 ' + dist[3] + '개 → 초록',
      why: '이 개념들을 합쳐 <b>정답 ' + needFor(uid, 3, Store.FULL_RIGHT) + '회</b>를 더 쌓으면 초록이 됩니다.',
      btn: '즉답 퀴즈 10문항', btn2: '즉답 퀴즈', go: '#/quiz/' + uid + '/10' });
    if (!boss) s.push({ lv: 4,
      what: '단원 보스전을 통과하세요',
      short: '단원 보스전 5문항',
      why: '대비 개념이 섞인 사례 5문항을 모두 맞히면 이 단원에 ★가 붙습니다.',
      btn: '보스전 도전', btn2: '보스전', go: '#/boss/' + uid });
    if (!s.length) s.push({ lv: 4,
      what: '이 단원은 완성했습니다',
      short: '실전 연습',
      why: '이제 다른 단원과 섞어서 푸는 실전 연습이 남았습니다.',
      btn: '실전 모의고사', btn2: '모의고사', go: '#/exam' });
    return s;
  }

  /* 단원 숙달도 카드 — 지시가 먼저, 규칙 설명은 뒤 */
  function masteryCard(uid, n) {
    var dist = Store.unitDist(uid);
    var pct = Math.round(Store.unitMastery(uid) / 4 * 100);
    var left = Store.unitRemaining(uid);
    var steps = todoSteps(uid, dist);
    var now = steps[0], rest = steps.slice(1);

    return '<div class="card"><div class="spread"><h3 style="margin:0">숙달도 ' + pct + '%</h3>' +
      '<span class="mini">완성 ' + dist[4] + ' / ' + n + '개</span></div>' +
      segBar(dist, n) +
      '<div class="mt">' + [4, 3, 2, 1, 0].map(function (lv) {
        return dist[lv] ? '<div class="kv"><span><i class="m m' + lv + '"></i> ' + MNAME[lv] +
          '</span><b>' + dist[lv] + '개</b></div>' : '';
      }).join('') + '</div>' +

      '<div class="todo"><div class="lbl">지금 할 일</div>' +
        '<div class="wh"><i class="m m' + now.lv + '"></i> ' + esc(now.what) + '</div>' +
        '<div class="mini mt">' + now.why + '</div>' +
        '<button class="btn mt" data-go="' + now.go + '">' + esc(now.btn) + ' →</button>' +
      '</div>' +

      (rest.length ? '<div class="mt"><b class="mini">그 다음 순서</b>' + rest.map(function (s) {
        return '<div class="kv"><span><i class="m m' + s.lv + '"></i> ' + esc(s.short) + '</span>' +
          '<button class="btn sm sec" data-go="' + s.go + '">' + esc(s.btn2) + '</button></div>';
      }).join('') + '</div>' : '') +

      '<div class="tip"><b>점수는 이렇게 오릅니다.</b> 개념 하나를 맞힐 때마다 색이 한 칸씩 올라갑니다.<br>' +
      '회색(안 봄) → 1~2회 맞힘 주황 → ' + Store.OK_RIGHT + '회 노랑 → ' + Store.FULL_RIGHT + '회 초록.<br>' +
      '매칭 게임·분류 게임·즉답 퀴즈·모의고사 <b>어느 것으로 맞혀도 똑같이 올라갑니다.</b>' +
      (left ? '<div class="mt">남은 분량: <b>정답 ' + left + '회</b> ≈ 매칭 게임 ' +
        Math.ceil(left / 5) + '판 또는 즉답 퀴즈 ' + Math.ceil(left / 10) + '판</div>' : '') +
      '</div></div>';
  }

  /* ───────── 개념 카드 상세 ───────── */
  function viewConcept(cid) {
    var c = App.concept(cid);
    if (!c) return go('#/home');
    var u = App.unit(c.u), m = Store.mastery(cid), st = Store.cs(cid);
    var cases = App.casesOf(cid);
    var p = App.pairOf(cid);
    var sib = App.conceptsOf(c.u);                 // 같은 단원의 개념들
    var at = sib.map(function (x) { return x.id; }).indexOf(cid);
    var prev = at > 0 ? sib[at - 1] : null, next = at >= 0 && at < sib.length - 1 ? sib[at + 1] : null;

    html(
      head(c.t, '#/unit/' + c.u) +
      '<div class="card">' +
        '<div class="row"><i class="m m' + m + '"></i><span class="mini">' + MNAME[m] + '</span>' +
        '<span class="grow"></span><span class="mini">정답 ' + st.right + ' / 오답 ' + st.wrong + '</span></div>' +
        '<div class="row mt"><span>' + Fig.icon(c.u) + '</span>' +
        '<b style="font-size:17px">' + esc(c.t) + '</b></div>' +
        (ConceptArt.forConcept(c) || Art.forConcept(c)) +
        '<div class="mt">' + esc(c.d) + '</div>' +
        Fig.forConcept(c) +
        (c.k && c.k.length ? '<div class="mt"><b class="mini">판별 단서</b><div class="row wrap mt">' +
          c.k.map(function (k) { return '<span class="pill">' + esc(k) + '</span>'; }).join('') + '</div></div>' : '') +
        (c.x ? '<div class="tip"><b>함정</b> ' + esc(c.x) + '</div>' : '') +
        '<div class="mini mt">' + u.no + '. ' + esc(u.title) + ' › ' + esc(u.subs[c.sub] || '') + '</div>' +
      '</div>' +

      (cases.length ? '<div class="card"><h3>사례 ' + cases.length + '개</h3>' +
        cases.map(function (x) {
          return '<div class="kv"><span>' + esc(x.t) + '<div class="mini">→ ' + esc(x.w) + '</div></span>' +
            '<span class="pill' + (x.k === '시사' ? ' y' : '') + '">' + esc(x.k) + '</span></div>';
        }).join('') + '</div>' : '') +

      (p ? '<div class="card"><h3>함께 보는 대비표</h3>' +
        '<div class="sub">' + esc(p.title) + ' — ' + p.cols.join(' / ') + '</div>' +
        '<button class="btn mt" data-go="#/compare/' + p.id + '">대비표 열기</button></div>' : '') +

      '<div class="card">' +
        '<div class="spread"><h3 style="margin:0">' + u.no + '. ' + esc(u.title) + ' 개념 ' + sib.length + '개</h3>' +
        '<span class="mini">' + (at + 1) + ' / ' + sib.length + '</span></div>' +
        '<div class="pn">' +
          '<button class="prev"' + (prev ? ' data-c="' + prev.id + '"' : ' disabled') + '>' +
            '<span class="lb">‹ 이전 개념</span><span class="nm">' + (prev ? esc(prev.t) : '처음입니다') + '</span></button>' +
          '<button class="next"' + (next ? ' data-c="' + next.id + '"' : ' disabled') + '>' +
            '<span class="lb">다음 개념 ›</span><span class="nm">' + (next ? esc(next.t) : '마지막입니다') + '</span></button>' +
        '</div>' +
        '<div class="hintbar">👆 뒤로 가지 말고 여기서 바로 다음 개념을 누르세요</div>' +
        conceptGrid(sib, cid) +
        '<button class="btn sec mt" data-go="#/match/' + c.u + '/5">이 단원 개념 매칭 게임</button>' +
      '</div>' + tabs('')
    );
    bindBack();
    on('[data-c]', 'click', function () { go('#/concept/' + this.getAttribute('data-c')); });
    on('[data-go]', 'click', function () { go(this.getAttribute('data-go')); });
  }

  /* ───────── 대비표 목록 ───────── */
  function viewCompareList() {
    var done = 0;
    var groups = window.UNITS.map(function (u) {
      var ps = window.PAIRS.filter(function (p) { return p.u === u.id; });
      if (!ps.length) return '';
      return '<div class="card"><h3>' + u.no + '. ' + esc(u.title) + '</h3><ul class="clist">' +
        ps.map(function (p) {
          var s = Store.pairState(p.id); if (s.cleared) done++;
          return '<li><button class="citem" data-p="' + p.id + '"><span class="grow">' +
            '<span class="t">' + esc(p.title) + '</span><span class="d"> — ' + p.cols.join(' / ') + '</span></span>' +
            (s.cleared ? '<span class="pill g">완료</span>' : '') + '</button></li>';
        }).join('') + '</ul></div>';
    }).join('');

    html(head('대비 개념 쌍 ' + window.PAIRS.length + '개') +
      '<div class="card"><div class="spread"><b>완성률</b><span>' + done + ' / ' + window.PAIRS.length + '</span></div>' +
      '<div class="barh mt"><i style="width:' + Math.round(done / window.PAIRS.length * 100) + '%"></i></div>' +
      '<div class="mini mt">목표: 시험 4주 전까지 50쌍 전부 완성</div></div>' + groups + tabs('compare'));
    bindBack();
    on('[data-p]', 'click', function () { go('#/compare/' + this.getAttribute('data-p')); });
  }

  /* ───────── 비교표 ───────── */
  function viewCompare(pid) {
    var p = App.pair(pid);
    if (!p) return go('#/compare');
    var u = App.unit(p.u);
    var thead = '<thead><tr><th>기준</th>' + p.cols.map(function (c) {
      return '<th>' + esc(c) + '</th>'; }).join('') + '</tr></thead>';
    var tbody = '<tbody>' + p.rows.map(function (r) {
      return '<tr><th>' + esc(r.axis) + '</th>' + r.v.map(function (v) {
        return '<td>' + esc(v) + '</td>'; }).join('') + '</tr>';
    }).join('') + '</tbody>';

    var links = (p.refs || []).map(function (r, i) {
      if (!r || !App.concept(r)) return '';
      var m = Store.mastery(r);
      return '<button class="btn sm sec" data-c="' + r + '"><i class="m m' + m +
        '" style="margin-right:6px"></i>' + esc(p.cols[i]) + '</button>';
    }).join('');

    var hasGame = (p.refs || []).filter(function (r) { return r && App.casesOf(r).length; }).length >= 2;

    html(head(p.title, '#/unit/' + p.u) +
      '<div class="card"><span class="pill">' + u.no + '. ' + esc(u.title) + '</span>' +
        Art.forPair(p) +
        Fig.forPair(p) +
        '<div class="mt"><table class="cmp">' + thead + tbody + '</table></div>' +
        '<div class="tip"><b>구분 팁</b> ' + esc(p.tip) + '</div></div>' +
      (links ? '<div class="card"><h3>개념 카드</h3><div class="row wrap">' + links + '</div></div>' : '') +
      '<div class="card">' +
        (hasGame ? '<button class="btn" data-go="#/sort/' + pid + '">분류 게임 1판</button>' : '') +
        '<button class="btn sec mt" data-go="#/drill/' + pid + '">대비 문항 5개 풀기</button></div>' + tabs('compare'));
    bindBack();
    on('[data-c]', 'click', function () { go('#/concept/' + this.getAttribute('data-c')); });
    on('[data-go]', 'click', function () { go(this.getAttribute('data-go')); });
  }

  /* ───────── 분류 게임 목록 ───────── */
  function viewSortList() {
    var ok = window.PAIRS.filter(function (p) {
      return (p.refs || []).filter(function (r) { return r && App.casesOf(r).length; }).length >= 2;
    });
    html(head('분류 게임') +
      '<div class="card"><div class="sub">사례 카드를 알맞은 개념 상자에 넣으세요. 틀리면 왜 다른 상자인지 한 줄로 알려 줍니다.</div></div>' +
      window.UNITS.map(function (u) {
        var ps = ok.filter(function (p) { return p.u === u.id; });
        if (!ps.length) return '';
        return '<div class="card"><h3>' + u.no + '. ' + esc(u.title) + '</h3><ul class="clist">' +
          ps.map(function (p) {
            var s = Store.pairState(p.id);
            return '<li><button class="citem" data-p="' + p.id + '"><span class="grow">' +
              '<span class="t">' + esc(p.title) + '</span>' +
              '<span class="d"> — ' + p.cols.length + '개 상자</span></span>' +
              (s.plays ? '<span class="mini">최고 ' + s.best + '점</span>' : '') + '</button></li>';
          }).join('') + '</ul></div>';
      }).join('') + tabs(''));
    bindBack();
    on('[data-p]', 'click', function () { go('#/sort/' + this.getAttribute('data-p')); });
  }

  /* ───────── 로드맵 ───────── */
  /* 체크 한 줄 */
  function checkRow(c) {
    var num = c.label ? c.label : c.now + ' / ' + c.goal;
    var bar = !c.done && c.goal;
    return '<div class="chk' + (c.done ? ' on' : '') + '">' +
      '<span class="mark">' + (c.done ? '✓' : '') + '</span>' +
      '<span class="txt">' + esc(c.t) +
        '<div class="num">' + esc(num) + (c.done ? ' · 완료' : '') + '</div>' +
        (bar ? '<div class="barh mt" style="height:6px"><i style="width:' +
          Math.min(100, Math.round((c.now / Math.max(1, c.goal)) * 100)) + '%"></i></div>' : '') +
      '</span>' +
      (c.done ? '' : '<button class="btn sm sec" data-go="' + c.go + '">하러 가기</button>') +
      '</div>';
  }

  /* ───────── 내 학습 단계 ───────── */
  function viewRoadmap() {
    var pr = Store.progress(), ex = Store.examStats();
    var cur = pr.cur;

    html(head('내 학습 단계') +
      '<div class="card"><div class="lvbig">' +
        '<div class="ring"><b>' + cur.step + '단계</b><span>/ 5단계</span></div>' +
        '<div class="grow"><b style="font-size:16px">' + esc(cur.name) + '</b>' +
          '<div class="sub">' + esc(cur.act) + '</div>' +
          '<div class="mini mt">전체 목표 ' + pr.got + ' / ' + pr.total + '개 달성</div>' +
          '<div class="barh mt"><i style="width:' +
            Math.round(pr.got / pr.total * 100) + '%"></i></div>' +
        '</div></div>' +
        (pr.allDone ? '<div class="pill g mt">전 과정 완주</div>' :
          '<button class="btn mt" data-go="' + cur.checks.filter(function (c) { return !c.done; })[0].go +
          '">지금 이것부터 →</button>') +
      '</div>' +

      pr.stages.map(function (st) {
        var isCur = st.step === cur.step;
        var n = st.checks.filter(function (c) { return c.done; }).length;
        return '<div class="stage' + (isCur ? ' cur' : (st.done ? ' done' : '')) + '">' +
          '<div class="spread"><b>' + st.step + '. ' + esc(st.name) + '</b>' +
          '<span class="pill' + (st.done ? ' g' : (isCur ? '' : ' y')) + '">' +
            (st.done ? '완료' : n + ' / ' + st.checks.length) + ' · ' + esc(st.weeks) + '</span></div>' +
          '<div class="mt">' + st.checks.map(checkRow).join('') + '</div></div>';
      }).join('') +

      '<div class="card"><h3>지금까지 쌓은 기록</h3>' +
        kv('연속 학습일', Store.s().streak + '일') +
        kv('모의고사 최고 점수', ex.best + '점') +
        kv('푼 개념 즉답 문항', Store.s().quiz.total + '문항') +
        kv('오답 노트에 남은 문항', Store.wrongCount(true) + '개') +
        kv('얻은 배지', Store.s().badges.length + '개') +
        '<button class="btn sec mt" data-go="#/report">자세한 리포트 보기</button></div>' + tabs('roadmap'));
    bindBack();
    on('[data-go]', 'click', function () { go(this.getAttribute('data-go')); });
  }
  function kv(k, v) { return '<div class="kv"><span>' + esc(k) + '</span><b>' + esc(v) + '</b></div>'; }

  /* ───────── 리포트 ───────── */
  function viewReport() {
    var s = Store.s(), ec = Store.errorStats(), ex = Store.examStats();
    var total = App.allConcepts().length;
    var dist = [0, 0, 0, 0, 0];
    App.allConcepts().forEach(function (c) { dist[Store.mastery(c.id)]++; });
    var maxErr = Math.max.apply(null, window.ERROR_CAUSES.map(function (e) { return ec[e.id]; }).concat([1]));
    var days = Object.keys(s.days).sort().slice(-14);
    var qRate = s.quiz.total ? Math.round(s.quiz.right / s.quiz.total * 100) : 0;

    html(head('학습 리포트') +
      '<div class="card"><div class="grid2">' +
        '<div class="stat"><b>' + dist[4] + '</b><span>완성 개념</span></div>' +
        '<div class="stat"><b>' + Store.unstableConcepts().length + '</b><span>불안정 개념</span></div>' +
        '<div class="stat"><b>' + qRate + '%</b><span>즉답 정답률</span></div>' +
        '<div class="stat"><b>' + ex.best + '</b><span>모의고사 최고</span></div>' +
      '</div></div>' +

      '<div class="card"><h3>개념 숙달도 분포 (' + total + '개)</h3>' +
        MNAME.map(function (n, i) {
          return '<div class="kv"><span><i class="m m' + i + '"></i> ' + n + '</span>' +
            '<b>' + dist[i] + '개</b></div>';
        }).join('') + '</div>' +

      '<div class="card"><h3>오답 원인 분석</h3>' +
        (s.errors.length ? window.ERROR_CAUSES.map(function (e) {
          return '<div class="mt"><div class="spread"><span>' + esc(e.label) + '</span>' +
            '<b>' + ec[e.id] + '회</b></div>' +
            '<div class="barh"><i style="width:' + Math.round(ec[e.id] / maxErr * 100) + '%"></i></div>' +
            '<div class="mini">처방: ' + esc(e.rx) + '</div></div>';
        }).join('') : '<div class="sub">아직 기록이 없습니다. 문항을 풀고 오답 원인을 선택해 보세요.</div>') + '</div>' +

      '<div class="card"><h3>모의고사 기록</h3>' +
        (ex.recent.length ? ex.recent.map(function (e, i) {
          var d = new Date(e.ts);
          return '<div class="kv"><span>' + (d.getMonth() + 1) + '/' + d.getDate() + ' · ' +
            Math.round(e.min) + '분</span><b>' + e.score + '점</b></div>';
        }).join('') : '<div class="sub">아직 응시 기록이 없습니다.</div>') + '</div>' +

      '<div class="card"><h3>최근 2주 학습</h3>' +
        (days.length ? days.map(function (d) {
          return '<div class="kv"><span>' + d.slice(5) + '</span><b>' + Math.round(s.days[d]) + '분</b></div>';
        }).join('') : '<div class="sub">기록 없음</div>') +
        '<div class="mini mt">연속 학습 ' + s.streak + '일 · 목표: 주 5일 이상</div></div>' +

      (s.badges.length ? '<div class="card"><h3>배지</h3><div class="row wrap">' +
        s.badges.map(function (b) { return '<span class="badge">★ ' + esc(b) + '</span>'; }).join('') +
        '</div></div>' : '') +

      '<div class="card"><h3>데이터</h3>' +
        '<button class="btn sec" id="reset">학습 기록 초기화</button></div>' + tabs(''));
    bindBack();
    on('#reset', 'click', function () {
      if (confirm('모든 학습 기록을 지웁니다. 계속할까요?')) { Store.reset(); go('#/home'); location.reload(); }
    });
  }

  /* ───────── AI 튜터 (오프라인 규칙 기반) ───────── */
  function viewTutor() {
    html(head('튜터에게 묻기') +
      '<div class="card"><div class="sub">두 개념의 차이가 궁금하면 그대로 물어보세요.<br>' +
      '예) <b>문화 상대주의와 문화 사대주의 차이가 뭐예요?</b></div>' +
      '<input id="q" class="btn sec" style="text-align:left;margin-top:10px" placeholder="개념 이름을 넣어 질문하세요">' +
      '<button class="btn mt" id="ask">물어보기</button></div>' +
      '<div id="ans"></div>' +
      '<div class="card"><h3>자주 묻는 대비</h3><div class="row wrap">' +
      ['문화 상대주의 자문화 중심주의', '자유권 사회권', '시장 실패 정부 실패',
       '소극적 평화 적극적 평화', '주식 채권', '사회 보험 공공 부조',
       '인간 중심주의 생태 중심주의', '기회비용 매몰 비용'].map(function (s) {
        return '<button class="btn sm sec" data-q="' + esc(s) + '">' + esc(s) + '</button>';
      }).join('') + '</div></div>' + tabs(''));
    bindBack();
    on('#ask', 'click', ask);
    on('#q', 'keydown', function (e) { if (e.key === 'Enter') ask(); });
    on('[data-q]', 'click', function () {
      document.getElementById('q').value = this.getAttribute('data-q'); ask();
    });
  }

  /* 검색용 정규화 — 띄어쓰기·기호·물음말을 지운다 ("사회구조"로도 "사회 구조"를 찾게) */
  function nrm(t) {
    return String(t == null ? '' : t).toLowerCase()
      .replace(/[\s·,.?!'"“”‘’()\[\]{}~\-–—:;\/]/g, '');
  }
  function stripAsk(q) {
    return String(q).replace(/(이|가|은|는|와|과|랑|이랑|의)?\s*(무엇|뭐|뭔|어떤|어떻게|왜|차이점|차이|뜻|의미|설명|알려\s*줘|말해\s*줘|가르쳐\s*줘|해\s*줘|인가요|인가|예요|에요|이야|야|니|죠|지|요)+[?]*\s*$/g, '');
  }
  /* 가장 긴 공통 부분 문자열 길이 */
  function lcs(a, b) {
    if (!a || !b) return 0;
    var best = 0, prev = new Array(b.length + 1).fill(0), cur;
    for (var i = 1; i <= a.length; i++) {
      cur = new Array(b.length + 1).fill(0);
      for (var j = 1; j <= b.length; j++) {
        if (a[i - 1] === b[j - 1]) {
          cur[j] = prev[j - 1] + 1;
          if (cur[j] > best) best = cur[j];
        }
      }
      prev = cur;
    }
    return best;
  }

  /* 질문 → 관련 개념 (점수 높은 순) */
  function findConcepts(q) {
    var nq = nrm(stripAsk(q));
    if (nq.length < 2) return [];
    var out = [];
    App.allConcepts().forEach(function (c) {
      var nt = nrm(c.t), sc = 0;
      if (nt && nq.indexOf(nt) >= 0) sc = 200 + nt.length * 2;        // 용어가 그대로 들어 있음
      else if (nq.length >= 2 && nt.indexOf(nq) >= 0) sc = 150 + nq.length * 2;  // 줄여 말함('융합')
      else {
        var m = lcs(nq, nt);
        if (m >= Math.max(3, Math.ceil(nt.length * 0.7))) sc = 80 + m * 3;       // 거의 같은 말
      }
      (c.k || []).forEach(function (kw) {                              // 판별 단서로도 찾는다
        var nk = nrm(kw);
        if (nk.length >= 2 && nq.indexOf(nk) >= 0) sc = Math.max(sc, 60 + nk.length);
      });
      if (!sc && nrm(c.d).indexOf(nq) >= 0 && nq.length >= 3) sc = 40; // 뜻 안에 들어 있음
      if (sc) out.push({ c: c, s: sc });
    });
    out.sort(function (a, b) { return b.s - a.s; });
    return out;
  }

  /* 질문 → 관련 대비 쌍 */
  function findPairs(q, hits) {
    var nq = nrm(stripAsk(q)), found = [];
    window.PAIRS.forEach(function (p) {
      var sc = 0;
      if (nrm(p.title) && nq.indexOf(nrm(p.title)) >= 0) sc += 120;
      var cols = p.cols.filter(function (c) { return nrm(c) && nq.indexOf(nrm(c)) >= 0; }).length;
      if (cols >= 2) sc += 150; else if (cols === 1) sc += 40;
      var refs = (p.refs || []).filter(function (r) {
        return r && hits.some(function (h) { return h.c.id === r; });
      }).length;
      if (refs >= 2) sc += 130; else if (refs === 1) sc += 30;
      if (sc) found.push({ p: p, s: sc });
    });
    found.sort(function (a, b) { return b.s - a.s; });
    return found;
  }

  function pairCard(p) {
    return '<div class="card"><h3>' + esc(p.title) + '</h3>' +
      (window.ConceptArt ? '' : '') +
      '<table class="cmp"><thead><tr><th>기준</th>' +
      p.cols.map(function (c) { return '<th>' + esc(c) + '</th>'; }).join('') +
      '</tr></thead><tbody>' + p.rows.map(function (r) {
        return '<tr><th>' + esc(r.axis) + '</th>' + r.v.map(function (v) {
          return '<td>' + esc(v) + '</td>'; }).join('') + '</tr>';
      }).join('') + '</tbody></table>' +
      '<div class="tip"><b>한 줄 정리</b> ' + esc(p.tip) + '</div>' +
      '<div class="btnrow mt"><button class="btn sec" data-go="#/compare/' + p.id + '">대비표 열기</button>' +
      '<button class="btn sec" data-go="#/sort/' + p.id + '">분류 게임</button></div></div>';
  }

  function conceptCard(c) {
    var u = App.unit(c.u), p = App.pairOf(c.id);
    var cs = App.casesOf(c.id).slice(0, 2);
    return '<div class="card"><div class="row">' + Fig.icon(c.u) +
      '<b style="font-size:16px">' + esc(c.t) + '</b></div>' +
      (window.ConceptArt ? ConceptArt.forConcept(c) : '') +
      '<div class="mt">' + esc(c.d) + '</div>' +
      (c.k && c.k.length ? '<div class="row wrap mt">' + c.k.map(function (k) {
        return '<span class="pill">' + esc(k) + '</span>'; }).join('') + '</div>' : '') +
      (c.x ? '<div class="tip"><b>함정</b> ' + esc(c.x) + '</div>' : '') +
      (cs.length ? '<div class="mt"><b class="mini">사례</b>' + cs.map(function (x) {
        return '<div class="kv"><span>' + esc(x.t) + '</span></div>'; }).join('') + '</div>' : '') +
      '<div class="mini mt">' + (u ? u.no + '. ' + esc(u.title) : '') + '</div>' +
      '<div class="btnrow mt"><button class="btn sec" data-go="#/concept/' + c.id + '">개념 카드</button>' +
      (p ? '<button class="btn sec" data-go="#/compare/' + p.id + '">대비표</button>' : '') + '</div></div>';
  }

  function ask() {
    var q = (document.getElementById('q').value || '').trim();
    var box = document.getElementById('ans');
    if (!q) { box.innerHTML = ''; return; }

    var hits = findConcepts(q);
    var pairs = findPairs(q, hits);
    var out = '';

    /* 두 개념을 나란히 물었으면 대비표부터 */
    var strongPair = pairs.filter(function (o) { return o.s >= 130; });
    if (strongPair.length) {
      out += strongPair.slice(0, 2).map(function (o) { return pairCard(o.p); }).join('');
    }
    /* 개념 설명 */
    if (hits.length) {
      var top = hits[0].s;
      var show = hits.filter(function (o, i) {
        return i === 0 || (o.s >= top * 0.7 && i < (strongPair.length ? 1 : 2));
      });
      out += show.map(function (o) { return conceptCard(o.c); }).join('');
      /* 이 개념이 속한 대비표도 곁들인다 */
      if (!strongPair.length) {
        var p0 = App.pairOf(hits[0].c.id);
        if (p0) out += pairCard(p0);
      }
      if (hits.length > 2) {
        out += '<div class="card"><h3>이것도 찾았어요</h3><div class="row wrap">' +
          hits.slice(strongPair.length ? 1 : 2, 7).map(function (o) {
            return '<button class="btn sm sec" data-go="#/concept/' + o.c.id + '">' +
              esc(o.c.t) + '</button>';
          }).join('') + '</div></div>';
      }
    } else if (!strongPair.length) {
      /* 못 찾았을 때: 비슷한 이름을 추천해 준다 */
      var nq = nrm(stripAsk(q));
      var near = App.allConcepts().map(function (c) {
        return { c: c, s: lcs(nq, nrm(c.t)) };
      }).filter(function (o) { return o.s >= 2; })
        .sort(function (a, b) { return b.s - a.s; }).slice(0, 8);
      out = '<div class="card"><h3>찾지 못했어요</h3>' +
        '<div class="sub">‘' + esc(q) + '’와 맞는 개념이 없습니다. 띄어쓰기는 달라도 되니 ' +
        '교과서에 나오는 말로 물어보세요.</div>' +
        (near.length ? '<div class="mt"><b class="mini">혹시 이것인가요?</b><div class="row wrap mt">' +
          near.map(function (o) {
            return '<button class="btn sm sec" data-go="#/concept/' + o.c.id + '">' +
              esc(o.c.t) + '</button>';
          }).join('') + '</div></div>' : '') + '</div>';
    }

    box.innerHTML = out;
    on('[data-go]', 'click', function () { go(this.getAttribute('data-go')); }, box);
    box.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }


  /* ───────── 하단 탭 ───────── */
  function tabs(cur) {
    var open = Store.wrongCount(true);
    var t = [['#/home', '홈', '🏠'], ['#/learn', '1부 개념', '📘'],
             ['#/challenge', '2부 도전', '🎯'], ['#/wrong', '오답 노트', '🔖'],
             ['#/roadmap', '내 단계', '🪜']];
    return '<p class="copyright">All Rights Reserved (무단 전재 및 재배포 금지)</p>' +
      '<nav class="tabs">' + t.map(function (x) {
      var k = x[0].split('/')[1];
      return '<a href="' + x[0] + '" class="' + (cur === k ? 'on' : '') + '">' +
        '<span class="ic">' + x[2] +
        (k === 'wrong' && open ? '<i class="tdot">' + (open > 99 ? '99+' : open) + '</i>' : '') +
        '</span>' + x[1] + '</a>';
    }).join('') + '</nav>';
  }

  /* ───────── 라우터 ───────── */
  function route() {
    var h = location.hash.replace(/^#\/?/, '') || 'home';
    var p = h.split('/');
    switch (p[0]) {
      case 'home': return viewHome();
      case 'unit': return viewUnit(p[1]);
      case 'concept': return viewConcept(p[1]);
      case 'compare': return p[1] ? viewCompare(p[1]) : viewCompareList();
      case 'sortlist': return viewSortList();
      case 'challenge': return viewChallenge();
      case 'roadmap': return viewRoadmap();
      case 'report': return viewReport();
      case 'tutor': return viewTutor();
      default:
        if (window.Learn && Learn.route(p)) return;
        if (window.Play && Play.route(p)) return;
        if (window.DataView && DataView.route(p)) return;
        return viewHome();
    }
  }

  window.UI = {
    esc: esc, html: html, go: go, on: on, head: head, bindBack: bindBack,
    tabs: tabs, toast: toast, markStem: markStem, kv: kv, route: route, MNAME: MNAME
  };

  document.addEventListener('DOMContentLoaded', function () {
    $app = document.getElementById('app');
    UI.$app = $app;
    App.init();
    Store.touch(0);
    window.addEventListener('hashchange', route);
    route();
    // 학습 시간 적립 (1분 단위)
    setInterval(function () { if (!document.hidden) Store.touch(1); }, 60000);
  });
})();
