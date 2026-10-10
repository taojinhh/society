/* 자료 해석 훈련 — 인터랙티브 자료 10종 + 읽는 순서 드릴 + 근거 터치 제출 */
(function () {
  'use strict';
  function esc(s) { return UI.esc(s); }
  function go(h) { return UI.go(h); }
  function on(a, b, c, d) { return UI.on(a, b, c, d); }
  function head(a, b) { return UI.head(a, b); }
  function tabs(a) { return UI.tabs(a); }
  function html(s) { return UI.html(s); }
  function toast(s) { return UI.toast(s); }
  function bind() {}
  var MON = ['1','2','3','4','5','6','7','8','9','10','11','12'];
  var state = {};   // 자료별 보조 상태(선택 도시, 연도 등)

  function dsById(id) { return window.DATASETS.filter(function (d) { return d.id === id; })[0]; }
  function readOrderFor(d) {
    if (d.type === 'table') return READ_ORDER.table;
    if (d.type === 'map') return READ_ORDER.map;
    if (d.type === 'law') return READ_ORDER.law;
    if (d.type === 'text') return READ_ORDER.text;
    return READ_ORDER.graph;
  }

  /* ───────── 그래프 그리기 ───────── */
  function climateSVG(c) {
    var W = 320, H = 190, L = 34, R = 26, T = 16, B = 26;
    var pw = W - L - R, ph = H - T - B;
    var maxR = 400, tMin = -25, tMax = 35;
    var bw = pw / 12 * 0.62;
    var bars = c.rain.map(function (v, i) {
      var x = L + pw / 12 * (i + 0.5) - bw / 2;
      var h = Math.max(1, v / maxR * ph);
      return '<rect x="' + x.toFixed(1) + '" y="' + (T + ph - h).toFixed(1) + '" width="' + bw.toFixed(1) +
        '" height="' + h.toFixed(1) + '" fill="#93b4fb" rx="1.5"/>';
    }).join('');
    var pts = c.temp.map(function (v, i) {
      var x = L + pw / 12 * (i + 0.5);
      var y = T + ph - (v - tMin) / (tMax - tMin) * ph;
      return x.toFixed(1) + ',' + y.toFixed(1);
    }).join(' ');
    var gy = '';
    for (var k = 0; k <= 4; k++) {
      var y = T + ph - ph * k / 4;
      gy += '<line x1="' + L + '" y1="' + y + '" x2="' + (W - R) + '" y2="' + y + '" stroke="#eef1f7"/>' +
        '<text x="' + (L - 5) + '" y="' + (y + 3.5) + '" font-size="8" fill="#6b7688" text-anchor="end">' +
        (maxR * k / 4) + '</text>' +
        '<text x="' + (W - R + 4) + '" y="' + (y + 3.5) + '" font-size="8" fill="#ef4444">' +
        Math.round(tMin + (tMax - tMin) * k / 4) + '</text>';
    }
    var xl = MON.map(function (m, i) {
      return '<text x="' + (L + pw / 12 * (i + 0.5)) + '" y="' + (H - 9) + '" font-size="7.5" fill="#6b7688" text-anchor="middle">' + m + '</text>';
    }).join('');
    return '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '" role="img">' + gy +
      '<g class="evid" data-ev="rain">' + bars + '</g>' +
      '<g class="evid" data-ev="temp">' +
      '<polyline points="' + pts + '" fill="none" stroke="transparent" stroke-width="18"/>' +
      '<polyline points="' + pts + '" fill="none" stroke="#ef4444" stroke-width="2"/>' +
      c.temp.map(function (v, i) {
        var x = L + pw / 12 * (i + 0.5), y = T + ph - (v - tMin) / (tMax - tMin) * ph;
        return '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="2" fill="#ef4444"/>';
      }).join('') + '</g>' +
      '<g class="evid" data-ev="axis">' + xl + '</g>' +
      '<text x="' + L + '" y="10" font-size="8" fill="#6b7688">강수량(mm)</text>' +
      '<text x="' + (W - R) + '" y="10" font-size="8" fill="#ef4444" text-anchor="end">기온(℃)</text>' +
      '</svg>';
  }

  function pyramidSVG(d, yi) {
    var y = d.years[yi], W = 320, H = 200, C = W / 2, T = 18, B = 16;
    var rows = d.ages.length, rh = (H - T - B) / rows, max = 9;
    var out = '';
    for (var i = 0; i < rows; i++) {
      var ri = rows - 1 - i;                       // 아래가 0-9세
      var yy = T + i * rh;
      var mw = y.m[ri] / max * (C - 34), fw = y.f[ri] / max * (C - 34);
      var ev = ri === 0 ? 'bottom' : (ri === rows - 1 ? 'top' : 'mid');
      out += '<g class="evid" data-ev="' + ev + '">' +
        '<rect x="' + (C - 17 - mw) + '" y="' + (yy + 1.5) + '" width="' + mw + '" height="' + (rh - 3) + '" fill="#60a5fa" rx="1.5"/>' +
        '<rect x="' + (C + 17) + '" y="' + (yy + 1.5) + '" width="' + fw + '" height="' + (rh - 3) + '" fill="#f9a8d4" rx="1.5"/>' +
        '<text x="' + C + '" y="' + (yy + rh / 2 + 3) + '" font-size="7.5" fill="#6b7688" text-anchor="middle">' +
        d.ages[ri] + '</text></g>';
    }
    return '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '">' +
      '<text x="10" y="11" font-size="9" fill="#2563eb">남자</text>' +
      '<text x="' + (W - 10) + '" y="11" font-size="9" fill="#db2777" text-anchor="end">여자</text>' +
      '<text x="' + C + '" y="11" font-size="9" fill="#1b2330" text-anchor="middle">' + y.y + '년 · ' + y.shape + '</text>' +
      out + '<text x="' + C + '" y="' + (H - 3) + '" font-size="7" fill="#6b7688" text-anchor="middle">가로축: 전체 인구 대비 비율(%)</text></svg>';
  }

  function lineSVG(d) {
    var W = 320, H = 190, L = 30, R = 12, T = 16, B = 28;
    var pw = W - L - R, ph = H - T - B;
    var all = d.series.reduce(function (a, s) { return a.concat(s.v); }, []);
    var max = Math.max.apply(null, all) * 1.1, n = d.series[0].v.length;
    var cols = ['#2f6df6', '#ef4444'];
    var steep = 0, sm = -1;
    for (var i = 0; i < n - 1; i++) {
      var s = Math.abs(d.series[0].v[i + 1] - d.series[0].v[i]);
      if (s > sm) { sm = s; steep = i; }
    }
    var X = function (i) { return L + pw * (i / (n - 1)); };
    var Y = function (v) { return T + ph - v / max * ph; };
    var segs = '';
    for (var i = 0; i < n - 1; i++) {
      var ev = i === steep ? 'slope' : (i === n - 2 ? 'end' : 'seg');
      segs += '<rect class="evid" data-ev="' + ev + '" x="' + X(i) + '" y="' + T + '" width="' +
        (X(i + 1) - X(i)) + '" height="' + ph + '" fill="transparent"/>';
    }
    var band = d.series.length > 1 ? '<polygon class="evid" data-ev="gap" fill="#2f6df615" points="' +
      d.series[0].v.map(function (v, i) { return X(i) + ',' + Y(v); }).join(' ') + ' ' +
      d.series[1].v.map(function (v, i) { return X(n - 1 - i) + ',' + Y(d.series[1].v[n - 1 - i]); }).join(' ') + '"/>' : '';
    var lines = d.series.map(function (s, si) {
      return '<polyline points="' + s.v.map(function (v, i) { return X(i) + ',' + Y(v); }).join(' ') +
        '" fill="none" stroke="' + cols[si] + '" stroke-width="2.2"/>';
    }).join('');
    var lab = d.xlabels.map(function (t, i) {
      return (n > 8 && i % 2) ? '' :
        '<text x="' + X(i) + '" y="' + (H - 12) + '" font-size="7" fill="#6b7688" text-anchor="middle">' + esc(t) + '</text>';
    }).join('');
    var leg = d.series.map(function (s, si) {
      return '<text x="' + (L + si * 66) + '" y="10" font-size="8" fill="' + cols[si] + '">■ ' + esc(s.name) + '</text>';
    }).join('');
    var gy = '';
    for (var k = 0; k <= 4; k++) {
      var y = T + ph - ph * k / 4;
      gy += '<line x1="' + L + '" y1="' + y + '" x2="' + (W - R) + '" y2="' + y + '" stroke="#eef1f7"/>' +
        '<text x="' + (L - 4) + '" y="' + (y + 3) + '" font-size="7.5" fill="#6b7688" text-anchor="end">' +
        Math.round(max * k / 4) + '</text>';
    }
    return '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '">' + gy + band + lines + segs + lab + leg + '</svg>';
  }

  function tableHTML(d) {
    return '<table class="cmp"><thead><tr>' + d.head.map(function (h, i) {
      return '<th class="evid" data-ev="col' + i + '" data-ev2="head">' + esc(h) + '</th>'; }).join('') +
      '</tr></thead><tbody class="evid" data-ev="body">' + d.body.map(function (r, ri) {
        return '<tr class="evid" data-ev="row' + (ri + 1) + '" data-ev2="body">' + r.map(function (c, ci) {
          return (ci === 0 ? '<th>' + esc(c) + '</th>' : '<td>' + esc(c) + '</td>'); }).join('') + '</tr>';
      }).join('') + '</tbody></table>' +
      (d.note ? '<div class="mini mt">' + esc(d.note) + '</div>' : '');
  }

  function mapHTML(d, marks) {
    marks = marks || {};
    return '<div class="maparea" style="aspect-ratio:2/1.35">' +
      '<svg viewBox="0 0 200 100" preserveAspectRatio="none" ' +
      'style="width:100%;height:100%;display:block;background:#dbeafe">' +
      '<path d="M18,30 L40,22 L62,28 L58,46 L40,52 L24,44 Z" fill="#c7d2c0"/>' +
      '<path d="M52,54 L70,50 L74,70 L62,86 L52,74 Z" fill="#c7d2c0"/>' +
      '<path d="M92,20 L118,16 L128,30 L112,40 L96,36 Z" fill="#c7d2c0"/>' +
      '<path d="M96,40 L120,42 L124,64 L108,84 L98,62 Z" fill="#cbb994"/>' +
      '<path d="M126,20 L176,14 L184,40 L152,50 L128,38 Z" fill="#c7d2c0"/>' +
      '<path d="M162,62 L188,60 L190,80 L166,82 Z" fill="#d6c7a1"/>' +
      '<path d="M60,4 L150,2 L160,12 L60,14 Z" fill="#e2e8f0"/>' +
      '</svg>' +
      d.regions.map(function (r) {
        return '<button class="mpin ' + (marks[r.id] || '') + '" data-r="' + r.id + '" ' +
          'style="left:' + r.x + '%;top:' + r.y + '%">' + esc(r.name) + '</button>';
      }).join('') + '</div>';
  }

  /* 공개: 문항 화면에 끼워 넣는 자료 그림 */
  function figure(d) {
    if (typeof d === 'string') d = dsById(d);
    if (!d) return '';
    var st = state[d.id] = state[d.id] || { city: 0, year: 0 };
    var inner = '';
    if (d.kind === 'climate') {
      inner = '<div class="row wrap mb">' + d.cities.map(function (c, i) {
        return '<button class="btn sm ' + (i === st.city ? '' : 'sec') + '" data-city="' + i + '">' +
          esc(c.name) + '</button>'; }).join('') + '</div>' + climateSVG(d.cities[st.city]);
    } else if (d.kind === 'pyramid') {
      inner = pyramidSVG(d, st.year) +
        '<input class="slider" type="range" min="0" max="' + (d.years.length - 1) + '" value="' + st.year + '" data-year>' +
        '<div class="row" style="justify-content:space-between">' + d.years.map(function (y) {
          return '<span class="mini">' + y.y + '</span>'; }).join('') + '</div>';
    } else if (d.kind === 'line') {
      inner = lineSVG(d);
    } else if (d.type === 'table') {
      inner = tableHTML(d);
    } else if (d.type === 'map') {
      inner = mapHTML(d);
    }
    return '<div data-dsid="' + d.id + '"><div class="mini mb"><b>' + esc(d.title) + '</b> — ' +
      esc(d.desc || '') + '</div>' + inner + '</div>';
  }

  /* 인터랙티브 요소 연결 */
  function mount(root, d) {
    if (!root) return;
    if (typeof d === 'string') d = dsById(d);
    if (!d) return;
    var st = state[d.id] = state[d.id] || { city: 0, year: 0 };
    root.querySelectorAll('[data-city]').forEach(function (b) {
      b.addEventListener('click', function () {
        st.city = parseInt(b.getAttribute('data-city'), 10);
        var holder = root.querySelector('[data-dsid]');
        holder.outerHTML = figure(d);
        mount(root, d);
      });
    });
    var sl = root.querySelector('[data-year]');
    if (sl) sl.addEventListener('input', function () {
      st.year = parseInt(sl.value, 10);
      var svg = root.querySelector('svg.chart');
      if (svg) svg.outerHTML = pyramidSVG(d, st.year);
      wireEvid(root);
    });
    wireEvid(root);
  }
  var EVNAME = {
    temp: '기온선', rain: '강수량 막대', axis: '가로축(월)',
    bottom: '가장 아래 연령층', top: '가장 위 연령층', mid: '중간 연령층',
    slope: '기울기가 가장 큰 구간', end: '마지막 구간', seg: '중간 구간',
    gap: '두 선 사이의 간격', body: '표의 본문', head: '표의 항목(머리글)'
  };
  function evLabel(ev) {
    if (EVNAME[ev]) return EVNAME[ev];
    var m = /^col(\d+)$/.exec(ev); if (m) return (+m[1] + 1) + '번째 열';
    m = /^row(\d+)$/.exec(ev); if (m) return m[1] + '번째 행';
    return ev;
  }

  function wireEvid(root) {
    root.querySelectorAll('.evid').forEach(function (n) {
      if (n._w) return; n._w = 1;
      n.addEventListener('click', function (e) {
        e.stopPropagation();
        n.classList.add('tapped');
        root._taps = root._taps || {};
        root._taps[n.getAttribute('data-ev')] = 1;
        if (n.getAttribute('data-ev2')) root._taps[n.getAttribute('data-ev2')] = 1;
        var b = document.getElementById('evBtn');
        if (b) b.removeAttribute('disabled');
        var h = document.getElementById('evHint');
        if (h) h.textContent = '근거로 선택한 부분: ' + evLabel(n.getAttribute('data-ev'));
      });
    });
  }

  /* ───────── 자료 훈련 목록 ───────── */
  function viewList() {
    html(head('자료 해석 훈련') +
      '<div class="card"><div class="sub">자료 문항은 <b>자료를 먼저 읽는 순서</b>가 정해져 있습니다. ' +
      '문항을 풀 때는 근거가 되는 자료 부분을 반드시 눌러야 제출됩니다.</div>' +
      '<div class="mt"><b class="mini">그래프 읽는 순서</b><ol class="steps">' +
      READ_ORDER.graph.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ol></div></div>' +
      window.DATASETS.map(function (d) {
        var u = App.unit(d.u);
        var n = (d.qs ? d.qs.length : (d.items ? d.items.length : 0));
        return '<div class="card"><div class="spread"><b>' + esc(d.title) + '</b>' +
          '<span class="pill">' + (u ? u.no : '') + '</span></div>' +
          '<div class="sub mt">' + esc(d.desc) + '</div>' +
          '<button class="btn mt" data-d="' + d.id + '">' + n + '문항 풀기</button></div>';
      }).join('') + tabs(''));
    UI.bindBack();
    on('[data-d]', 'click', function () { go('#/data/' + this.getAttribute('data-d')); });
  }

  /* ───────── 자료 문항 풀이 ───────── */
  function viewData(id) {
    var d = dsById(id);
    if (!d) return go('#/data');
    if (d.type === 'law' || d.type === 'text') return viewItems(d);
    if (d.type === 'map') return viewMapQuiz(d);
    var i = 0, right = 0;

    function draw() {
      if (i >= d.qs.length) return done();
      var q = d.qs[i];
      html(head(d.title, '#/data') +
        '<div class="card"><div class="spread"><span class="pill">' + (i + 1) + ' / ' + d.qs.length + '</span>' +
          '<span class="mini">자료 문항</span></div>' +
          '<div class="mt ds" id="fig">' + figure(d) + '</div>' +
          '<ol class="steps">' + readOrderFor(d).map(function (s) {
            return '<li>' + esc(s) + '</li>'; }).join('') + '</ol>' +
          '<div class="stem mt">' + UI.markStem(q.q) + '</div>' +
          Play.choiceHTML(q.ch) +
          '<div class="tip mt" id="evHint">근거가 되는 자료 부분을 눌러야 제출할 수 있습니다.</div>' +
          '<button class="btn mt" id="evBtn" disabled>선택한 답 제출</button>' +
          '<div id="after"></div></div>' + tabs(''));
      UI.bindBack();
      var fig = document.getElementById('fig');
      mount(fig, d);
      var sel = null;
      on('.ch button', 'click', function () {
        if (this.hasAttribute('disabled')) return;
        document.querySelectorAll('.ch button').forEach(function (x) { x.classList.remove('on'); });
        this.classList.add('on');
        sel = parseInt(this.getAttribute('data-i'), 10);
      });
      on('#evBtn', 'click', function () {
        if (sel == null) return toast('선택지를 먼저 고르세요.');
        var taps = fig._taps || {};
        if (q.ev && !taps[q.ev]) {
          return toast('근거가 되는 부분을 다시 확인하세요. ' + (q.evTip || ''));
        }
        submit(q, sel);
      });
    }
    function submit(q, sel) {
      var ok = sel === q.a;
      if (ok) right++;
      document.querySelectorAll('.ch button').forEach(function (x, k) {
        x.setAttribute('disabled', '');
        if (k === q.a) x.classList.add('ok');
        if (k === sel && !ok) x.classList.add('no');
      });
      document.getElementById('evBtn').setAttribute('disabled', '');
      var s = Store.s(); s.drills.dataread++; Store.save();
      document.getElementById('after').innerHTML =
        '<div class="sol"><b>' + (ok ? '정답' : '오답') + '</b><div class="mt">' + esc(q.sol) + '</div>' +
        (q.evTip ? '<div class="mini mt">근거 확인: ' + esc(q.evTip) + '</div>' : '') + '</div>' +
        (ok ? '' : Play.causeHTML(d.title, '')) +
        '<button class="btn mt" id="next">' + (i + 1 >= d.qs.length ? '결과 보기' : '다음') + '</button>';
      Play.bindCause(document.getElementById('after'));
      on('#next', 'click', function () { i++; draw(); }, document.getElementById('after'));
    }
    function done() {
      Store.markDataset(d.id);
      html(head('자료 훈련 결과', '#/data') +
        Play.resultCard(right, d.qs.length,
          '<div class="mini mt">자료 오독은 축·단위·범례를 확인하지 않을 때 생깁니다.</div>') +
        '<div class="card"><button class="btn" data-go="#/data/' + d.id + '">다시 풀기</button>' +
        '<button class="btn sec mt" data-go="#/data">다른 자료</button></div>' + tabs(''));
      UI.bindBack();
      on('[data-go]', 'click', function () { go(this.getAttribute('data-go')); });
    }
    draw();
  }

  /* 조문·제시문 유형: 항목 → 개념 고르기 */
  function viewItems(d) {
    var items = App.shuffle(d.items.slice()), i = 0, right = 0;
    function draw() {
      if (i >= items.length) return done();
      var it = items[i];
      var chs = App.shuffle(d.choices.slice());
      html(head(d.title, '#/data') +
        '<div class="card"><div class="spread"><span class="pill">' + (i + 1) + ' / ' + items.length + '</span>' +
          '<span class="mini">' + (d.type === 'law' ? '헌법 조문' : '제시문') + '</span></div>' +
          '<ol class="steps">' + readOrderFor(d).map(function (s) {
            return '<li>' + esc(s) + '</li>'; }).join('') + '</ol>' +
          '<div class="card" style="background:#f8fafc;box-shadow:none">' +
            (it.art ? '<b>' + esc(it.art) + '</b><br>' : '') + esc(it.text) + '</div>' +
          '<div class="stem">이 자료에 해당하는 것은?</div>' +
          '<ul class="ch">' + chs.map(function (cid, k) {
            var c = App.concept(cid);
            return '<li><button data-c="' + cid + '"><span class="n">' + ['①','②','③','④','⑤','⑥'][k] +
              '</span><span>' + esc(c ? c.t : cid) + '</span></button></li>';
          }).join('') + '</ul><div id="after"></div></div>' + tabs(''));
      UI.bindBack();
      on('.ch button', 'click', function () {
        if (this.hasAttribute('disabled')) return;
        var cid = this.getAttribute('data-c'), ok = cid === it.a;
        if (ok) right++;
        Store.record(it.a, ok, 0);
        document.querySelectorAll('.ch button').forEach(function (x) {
          x.setAttribute('disabled', '');
          if (x.getAttribute('data-c') === it.a) x.classList.add('ok');
        });
        if (!ok) this.classList.add('no');
        var c = App.concept(it.a);
        document.getElementById('after').innerHTML =
          '<div class="sol"><b>' + (ok ? '정답' : '오답') + '</b> · ' + esc(c ? c.t : '') +
          '<div class="mt">' + esc(it.why || (c ? c.d : '')) + '</div>' +
          (c && c.x ? '<div class="mini mt">함정: ' + esc(c.x) + '</div>' : '') + '</div>' +
          (ok ? '' : Play.causeHTML(d.title, it.a)) +
          '<button class="btn mt" id="next">' + (i + 1 >= items.length ? '결과 보기' : '다음') + '</button>';
        Play.bindCause(document.getElementById('after'));
        on('#next', 'click', function () { i++; draw(); }, document.getElementById('after'));
      });
    }
    function done() {
      Store.markDataset(d.id);
      html(head('결과', '#/data') + Play.resultCard(right, items.length) +
        '<div class="card"><button class="btn" data-go="#/data/' + d.id + '">다시 풀기</button>' +
        '<button class="btn sec mt" data-go="#/data">다른 자료</button></div>' + tabs(''));
      UI.bindBack();
      on('[data-go]', 'click', function () { go(this.getAttribute('data-go')); });
    }
    draw();
  }

  /* 지도 클릭 퀴즈 */
  function viewMapQuiz(d) {
    var qs = App.shuffle(d.qs.slice()), i = 0, right = 0, marks = {};
    function draw() {
      if (i >= qs.length) return done();
      marks = {};
      var q = qs[i];
      html(head(d.title, '#/data') +
        '<div class="card"><div class="spread"><span class="pill">' + (i + 1) + ' / ' + qs.length + '</span>' +
          '<span class="mini">지도 클릭</span></div>' +
          '<ol class="steps">' + READ_ORDER.map.map(function (s) {
            return '<li>' + esc(s) + '</li>'; }).join('') + '</ol>' +
          '<div class="stem mt">' + esc(q.q) + '</div>' +
          '<div class="mt" id="mp">' + mapHTML(d, marks) + '</div>' +
          '<div id="after"></div></div>' + tabs(''));
      UI.bindBack();
      on('[data-r]', 'click', function () {
        if (document.getElementById('after').innerHTML) return;
        var r = this.getAttribute('data-r'), ok = r === q.a;
        if (ok) right++;
        marks[r] = ok ? 'ok' : 'no'; marks[q.a] = 'ok';
        document.getElementById('mp').innerHTML = mapHTML(d, marks);
        var name = d.regions.filter(function (x) { return x.id === q.a; })[0].name;
        document.getElementById('after').innerHTML =
          '<div class="sol"><b>' + (ok ? '정답' : '오답') + '</b> · 정답은 ' + esc(name) + '' +
          '<div class="mt">' + esc(q.sol) + '</div></div>' +
          '<button class="btn mt" id="next">' + (i + 1 >= qs.length ? '결과 보기' : '다음') + '</button>';
        on('#next', 'click', function () { i++; draw(); }, document.getElementById('after'));
      });
    }
    function done() {
      Store.markDataset(d.id);
      html(head('지도 퀴즈 결과', '#/data') + Play.resultCard(right, qs.length) +
        '<div class="card"><button class="btn" data-go="#/data/' + d.id + '">다시 하기</button>' +
        '<button class="btn sec mt" data-go="#/data">다른 자료</button></div>' + tabs(''));
      UI.bindBack();
      on('[data-go]', 'click', function () { go(this.getAttribute('data-go')); });
    }
    draw();
  }

  function route(p) {
    bind();
    if (p[0] !== 'data') return false;
    p[1] ? viewData(p[1]) : viewList();
    return true;
  }
  window.DataView = { route: route, figure: figure, mount: mount };
})();
