/* ============================================================
   m365 홈 리뉴얼 — 인터랙티브 목업
   Claude Design 파일 `m365 홈 리뉴얼.dc.html` 를 의존성 없는
   정적 HTML/CSS/JS 로 이식한 버전입니다. (빌드 불필요)
   ============================================================ */
(function () {
"use strict";

/* ── 1. 데이터 ───────────────────────────────────────────── */

var OWNED = 75;
var INUSE = 5;

var NOTICES = [
  { cat: "서비스", pinned: true, title: "이용권 체계 통합 안내 (문서·이전 → 통합 이용권)", date: "2026.08.28", body: [
    "기존 문서 이용권과 이전 이용권으로 나뉘어 있던 상품이 하나의 '이용권'으로 통합됩니다.",
    "보유하신 잔여 이용권은 통합 이용권으로 자동 전환되며, 별도 신청은 필요하지 않습니다.",
    "통합 이용권은 1건당 1,100원(부가세 포함)이며 최소 10건부터 구매할 수 있습니다."
  ] },
  { cat: "점검", pinned: true, title: "9월 정기 서버 점검 안내 (09.06 02:00~05:00)", date: "2026.08.25", body: [
    "안정적인 서비스 제공을 위해 아래와 같이 정기 점검을 진행합니다.",
    "점검 일시 : 2026년 9월 6일(일) 02:00 ~ 05:00 (3시간)",
    "점검 시간 동안 이용권 구매, 계약서 발행 등 모든 서비스 이용이 제한됩니다."
  ] },
  { cat: "서비스", pinned: false, title: "할부·보험 상담 신청 기능 오픈", date: "2026.08.14", body: [
    "홈 화면에서 고객의 할부·보험 상담을 바로 신청할 수 있습니다.",
    "차량을 선택하고 고객 정보를 입력하면 안내 문자가 발송됩니다.",
    "상담이 실제 계약으로 이어지면 광고비가 지급됩니다."
  ] },
  { cat: "결제", pinned: false, title: "가상계좌 입금 확인 지연 관련 안내", date: "2026.07.30", body: [
    "일부 은행 점검 시간(23:30~00:30)에는 입금 확인이 최대 30분 지연될 수 있습니다.",
    "입금 후에도 결제 상태가 '입금 대기'로 유지되면 고객센터로 문의해 주시기 바랍니다."
  ] },
  { cat: "약관", pinned: false, title: "개인정보 처리방침 개정 안내", date: "2026.07.11", body: [
    "개인정보 처리방침이 2026년 7월 25일자로 개정됩니다.",
    "주요 변경 사항은 위탁 업체 추가 및 보관 기간 명확화입니다."
  ] },
  { cat: "서비스", pinned: false, title: "성능점검기록부 서식 변경 적용", date: "2026.06.20", body: [
    "법령 개정에 따라 성능점검기록부 서식이 변경되었습니다.",
    "변경된 서식은 앱에 자동 반영되며, 기존에 발행된 문서에는 영향이 없습니다."
  ] }
];

var QTYPES = ["이용권·결제", "계약서·문서", "할부·보험", "계정·정보 변경", "기타"];

var INQUIRIES = [
  { cat: "이용권·결제", title: "이용권 결제 후 잔여 건수가 반영되지 않습니다", date: "2026.08.29",
    body: "8월 29일 오전에 30건을 결제했는데 잔여 이용권에 반영되지 않았습니다. 확인 부탁드립니다.",
    answer: "확인 결과 결제는 정상 완료되었으며, 반영 지연 건은 8월 29일 14시에 처리되었습니다. 불편을 드려 죄송합니다.", answeredAt: "2026.08.29" },
  { cat: "계약서·문서", title: "매도 계약서 발행 취소 방법 문의", date: "2026.08.12",
    body: "잘못 발행한 매도 계약서를 취소하고 싶습니다. 이용권은 환급되나요?",
    answer: "발행 당일에 한해 문서함에서 취소할 수 있으며, 취소 시 차감된 이용권은 자동으로 복구됩니다.", answeredAt: "2026.08.13" },
  { cat: "할부·보험", title: "보험 광고비 지급 시점이 궁금합니다", date: "2026.08.02",
    body: "보험 상담 신청 후 고객이 가입했는데 광고비는 언제 지급되나요?" }
];

var RWD_ITEMS = ["할부", "보험", "티맵HUD", "고트럭"];

var RWD2 = [
  { item: "할부",     sub: "",             unit: "cash", value: 60000, plate: "12가1234", model: "K5 2.0", paidAt: "2026-08-31" },
  { item: "보험",     sub: "다이렉트",      unit: "cash", value: 60000, plate: "12가1234", model: "K5 2.0", paidAt: "2026-08-31" },
  { item: "보험",     sub: "다이렉트",      unit: "pass", value: 5,     plate: "12가1234", model: "K5 2.0", paidAt: "2026-08-31" },
  { item: "보험",     sub: "비교견적",      unit: "pass", value: 5,     plate: "12가1234", model: "K5 2.0", paidAt: "2026-08-31" },
  { item: "티맵HUD", sub: "",             unit: "pass", value: 30,    plate: "12가1234", model: "K5 2.0", paidAt: "2026-08-31" },
  { item: "고트럭",   sub: "고객일감등록",  unit: "pass", value: 3,     plate: "12가1234", model: "K5 2.0", paidAt: "2026-08-31" }
];

var CARS = [
  { plate: "24나 5933", model: "쏘나타투1.8", offerNo: "2024057500", year: "1994년식", km: "152,336 Km", price: 5000000, tag: "계약 진행 중" },
  { plate: "123가 5933", model: "쏘렌토", offerNo: "2024057500", year: "1994년식", km: "152,336 Km", price: 5000000 },
  { plate: "서울 1 가 2354", model: "차종 이름이 길어도 한 줄 까지만 표시합니다. 차종 이름이 길어도", offerNo: "2024057500", year: "1994년식", km: "152,336 Km", price: 14000000 }
];

var CARRIERS = [
  { name: "DB손해보험", code: "db", featured: true },
  { name: "현대해상", code: "hyundai" },
  { name: "KB손해보험", code: "kb" },
  { name: "메리츠화재", code: "meritz" },
  { name: "한화손해보험", code: "hanwha" },
  { name: "롯데손해보험", code: "lotte" },
  { name: "삼성화재", code: "samsung" }
];

var CONTACTS = [
  { name: "홍길동", phone: "010-1234-1234" },
  { name: "김영수", phone: "010-2233-7788" },
  { name: "박지훈 (오토카)", phone: "010-5555-0101" },
  { name: "이수진", phone: "010-8899-2020" }
];

var USE_DAYS = [
  { date: "4월 30일", groups: [
    { kind: "차감", count: 10, rows: [
      { type: "매입", count: 1, plate: "24나 5933", model: "쏘나타두 1.8", time: "오후 10:57:17" },
      { type: "매도", count: 2, plate: "서울 30 가 2354", model: "차량이름이 길어도 말줄임 처리됩니다", time: "오후 10:57:17" },
      { type: "매도", count: 1, badge: "성능점검 미포함", plate: "24나 5933", model: "쏘나타두 1.8", time: "오후 10:57:17" },
      { type: "이전", count: 5, plate: "24나 5933", model: "쏘나타두 1.8", time: "오후 10:57:17" }
    ] },
    { kind: "만료", count: 3, rows: [
      { type: "이용권", count: 3, plate: "유효기간 만료", model: "2026-04-30 만료", time: "오후 11:59:59" }
    ] }
  ] },
  { date: "4월 27일", groups: [
    { kind: "만료", count: 1, rows: [
      { type: "이용권", count: 1, plate: "유효기간 만료", model: "2026-04-27 만료", time: "오후 11:59:59" }
    ] }
  ] },
  { date: "4월 24일", groups: [
    { kind: "차감", count: 8, rows: [
      { type: "매도", count: 2, plate: "12가 1234", model: "그랜저 IG 2.4", time: "오후 03:21:08" },
      { type: "매입", count: 1, plate: "12가 1234", model: "그랜저 IG 2.4", time: "오후 03:19:44" },
      { type: "이전", count: 5, plate: "34다 7788", model: "K5 2.0", time: "오전 11:02:31" }
    ] }
  ] }
];

var STATUS_ALL = ["결제 완료", "입금 대기", "결제 취소", "환불 요청", "환불 완료"];

var ROWS = [
  { status: "결제 완료", no: "260311-00005", amount: 11000,  item: "이용권 10건",  breakdown: "(1건 × 1,100원)", method: "카드 결제", methodNote: "" },
  { status: "결제 완료", no: "260311-00004", amount: 55000,  item: "이용권 50건",  breakdown: "(1건 × 1,100원)", method: "카드 결제", methodNote: "" },
  { status: "결제 취소", no: "260311-00003", amount: 33000,  item: "이용권 30건",  breakdown: "(1건 × 1,100원)", method: "가상계좌", methodNote: "(취소사유: 입금 기한 만료)" },
  { status: "결제 완료", no: "260311-00002", amount: 22000,  item: "이용권 20건",  breakdown: "(1건 × 1,100원)", method: "카드 결제", methodNote: "" },
  { status: "결제 완료", no: "260311-00001", amount: 110000, item: "이용권 100건", breakdown: "(1건 × 1,100원)", method: "가상계좌", methodNote: "", fail: "(실패사유: 이용권 사용, 내용이 길어져도…)" }
];

/* 이용권 패키지 — 현재 화면에서는 숨김 처리(display:none)된 셀렉트에서만 사용 */
var DOC = [
  { amount: 11000,  total: 10,  base: 10,  bonus: 0 },
  { amount: 22000,  total: 20,  base: 20,  bonus: 0 },
  { amount: 33000,  total: 30,  base: 30,  bonus: 0 },
  { amount: 55000,  total: 53,  base: 50,  bonus: 3 },
  { amount: 110000, total: 107, base: 100, bonus: 7 },
  { amount: 330000, total: 330, base: 300, bonus: 30 },
  { amount: 550000, total: 563, base: 500, bonus: 63 }
];
var TR = [
  { amount: 11000,  total: 10,  base: 10,  bonus: 0 },
  { amount: 22000,  total: 20,  base: 20,  bonus: 0 },
  { amount: 55000,  total: 53,  base: 50,  bonus: 3 },
  { amount: 110000, total: 107, base: 100, bonus: 7 }
];

/* ── 2. 상태 ─────────────────────────────────────────────── */

var S = {
  screen: "home", from: null,
  sheet: false, tip: false, arrowLeft: 0,
  open: null, doc: null, tr: null, toast: false,
  statusSheet: false, statuses: STATUS_ALL.slice(), draft: null, page: 2,
  qty: "",
  rwdSel: null, rwdDraft: null, rwdSheet: false, rwdPage: 2,
  mode: null, step: "list", car: null, cName: "", cPhone: "",
  kind: null, carrier: null, dd: null, contacts: false, adFee: false, sms: false,
  useTab: "month", useChip: "all", useOpen: {},
  noticeId: null,
  csStep: "list", csOpen: null, inquiries: null,
  qType: null, qTypeOpen: false, qTitle: "", qBody: "", qPhone: "", csToast: false
};

var timers = {};
function later(key, ms, fn) { clearTimeout(timers[key]); timers[key] = setTimeout(fn, ms); }

function set(patch) {
  Object.assign(S, typeof patch === "function" ? patch(S) : patch);
  render();
}

/* ── 3. 유틸 ─────────────────────────────────────────────── */

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
function won(n) { return n.toLocaleString("ko-KR") + "원"; }
function num(n) { return n.toLocaleString("ko-KR"); }
function availNum() { return OWNED - INUSE; }
function availLabel() { return availNum() + "건"; }

/* 반복되는 아이콘 */
function chevR(size, color) {
  return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="' + color + '" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" style="flex: none;"><path d="M9 5l7 7-7 7"></path></svg>';
}
function chevL() {
  return '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2e2e2e" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5 8 12l7 7"></path></svg>';
}
function chevDown(rot) {
  return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#808080" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" style="transform: rotate(' + (rot || "0deg") + ');"><path d="M6 9.5l6 6 6-6"></path></svg>';
}
function closeIcon() {
  return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2e2e2e" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"></path></svg>';
}
function infoIcon(size, color) {
  return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="' + color + '" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" style="flex: none;"><circle cx="12" cy="12" r="9"></circle><path d="M12 11v5"></path><circle cx="12" cy="7.8" r="0.4" fill="currentColor" stroke="currentColor"></circle></svg>';
}
function checkIcon() {
  return '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"></path></svg>';
}
function pagerArrows(first) {
  return first
    ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b2b2b2" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M13 6.5 7.5 12l5.5 5.5M18 6.5 12.5 12l5.5 5.5"></path></svg>' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b2b2b2" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6.5 9.5 12l5.5 5.5"></path></svg>'
    : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b2b2b2" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 6.5 15 12l-5.5 5.5"></path></svg>' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b2b2b2" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6.5 11.5 12 6 17.5M11 6.5 16.5 12 11 17.5"></path></svg>';
}
function grabber() {
  return '<div style="display: flex; justify-content: center; padding: 6px 0 8px;"><span style="width: 128px; height: 4px; border-radius: 999px; background: #2e2e2e;"></span></div>';
}
function appBar(title, backAct) {
  return '' +
  '<div style="display: flex; align-items: center; gap: 12px; padding: 16px 20px; background: #fff; border-bottom: 1px solid var(--m-line-200);">' +
    '<div data-act="' + backAct + '" style="display: flex; cursor: pointer;">' + chevL() + '</div>' +
    '<h1 style="flex: 1; margin: 0; font-size: 18px; font-weight: 700; color: var(--m-ink-900); letter-spacing: -0.02em;">' + esc(title) + '</h1>' +
  '</div>';
}
function pager(pages, current, act) {
  return pages.map(function (n) {
    return '<span data-act="' + act + '" data-i="' + n + '" style="min-width: 18px; text-align: center; font-size: 13.5px; font-weight: ' +
      (n === current ? "700" : "500") + '; color: ' + (n === current ? "var(--m-orange)" : "var(--m-ink-700)") + '; cursor: pointer;">' + n + '</span>';
  }).join("");
}
function checkboxRow(label, on, act, i) {
  return '' +
  '<div data-act="' + act + '" data-i="' + i + '" style="display: flex; align-items: center; gap: 12px; padding: 11px 0; cursor: pointer;">' +
    '<span style="flex: none; width: 20px; height: 20px; border-radius: 4px; background: ' + (on ? "var(--m-orange)" : "#fff") +
      '; border: 1.6px solid ' + (on ? "var(--m-orange)" : "var(--m-line-300)") + '; display: flex; align-items: center; justify-content: center;">' + checkIcon() + '</span>' +
    '<span style="font-size: 14.5px; font-weight: 500; color: ' + (on ? "var(--m-orange)" : "var(--m-ink-500)") + '; letter-spacing: -0.02em;">' + esc(label) + '</span>' +
  '</div>';
}
function sheetShell(title, closeAct, inner, z) {
  return '' +
  '<div style="position: absolute; inset: 0; z-index: ' + z + '; display: flex; flex-direction: column; justify-content: flex-end;">' +
    '<div data-act="' + closeAct + '" style="position: absolute; inset: 0; background: var(--m-overlay); animation: m-fade-in 200ms ease-out both;"></div>' +
    '<div style="position: relative; background: #fff; border-radius: 20px 20px 0 0; padding: 22px 20px 12px; box-shadow: 0 -6px 24px rgba(0,0,0,.16); animation: m-sheet-up 280ms cubic-bezier(.2,0,0,1) both;">' +
      '<div style="display: flex; align-items: center; justify-content: space-between;">' +
        '<h2 style="margin: 0; font-size: 17px; font-weight: 700; color: var(--m-ink-900); letter-spacing: -0.02em;">' + esc(title) + '</h2>' +
        '<div data-act="' + closeAct + '" style="display: flex; cursor: pointer;">' + closeIcon() + '</div>' +
      '</div>' + inner + grabber() +
    '</div>' +
  '</div>';
}
function toast(html, bottom) {
  return '<div style="position: absolute; left: 20px; right: 20px; bottom: ' + bottom + 'px; z-index: 60; background: rgba(46,46,46,.94); color: #fff; border-radius: 10px; padding: 13px 16px; font-size: 13px; line-height: 1.5; letter-spacing: -0.02em; box-shadow: 0 4px 16px rgba(0,0,0,.20); animation: m-fade-in 160ms ease-out both;">' + html + '</div>';
}

/* ── 4. 홈 ───────────────────────────────────────────────── */

function screenHome() {
  return '' +
  '<div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 20px 14px; background: #ffffff;">' +
    '<img src="assets/mobility365.svg" alt="mobility365" style="height: 22px; display: block;">' +
    '<div style="display: flex; align-items: center; gap: 16px;">' +
      '<div data-act="goNoti" style="position: relative; width: 24px; height: 24px; cursor: pointer;">' +
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2e2e2e" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 10a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6z"></path><path d="M10 20a2 2 0 0 0 4 0"></path></svg>' +
        '<span style="position: absolute; top: 1px; right: 1px; width: 7px; height: 7px; border-radius: 999px; background: var(--m-red); border: 1.5px solid #fff;"></span>' +
      '</div>' +
      '<div data-act="goMore" style="width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; cursor: pointer;">' +
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2e2e2e" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M3 12h18"></path><path d="M3 18h18"></path></svg>' +
      '</div>' +
    '</div>' +
  '</div>' +

  /* 잔여 이용권 스트립 */
  '<div id="strip" style="position: relative; display: flex; align-items: center; gap: 8px; padding: 12px 20px; background: var(--m-orange-50); border-top: 1px solid #ffe3cf;">' +
    '<span style="font-size: 13px; color: var(--m-ink-600);">잔여 이용권</span>' +
    '<span style="font-size: 14px; font-weight: 700; color: var(--m-orange); letter-spacing: -0.01em;">' + availLabel() + '</span>' +
    '<div id="tipIcon" data-act="toggleTip" style="position: relative; display: flex; align-items: center; justify-content: center; width: 22px; height: 22px; margin: -4px; cursor: pointer; z-index: 31;">' +
      '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ff6f0f" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 11v5"></path><circle cx="12" cy="7.8" r="0.4" fill="currentColor" stroke="currentColor"></circle></svg>' +
    '</div>' +
    (S.tip
      ? '<div style="position: absolute; top: 100%; left: 16px; right: 16px; z-index: 30; margin-top: 2px; padding-top: 7px; animation: m-fade-in 160ms ease-out both;">' +
          '<div id="tipArrow" style="position: absolute; top: 0; left: ' + S.arrowLeft + 'px; width: 0; height: 0; border-left: 7px solid transparent; border-right: 7px solid transparent; border-bottom: 8px solid var(--m-ink-900);"></div>' +
          '<div style="position: relative; background: var(--m-ink-900); color: #fff; border-radius: 8px; padding: 10px 14px; font-size: 11px; line-height: 1.55; letter-spacing: -0.02em; box-shadow: 0 6px 24px rgba(0,0,0,.16);">이용권은 계약 완료 시 매입 1건, 매도 2건이 차감되며 이전완료 시 5건이 차감됩니다.&nbsp;</div>' +
        '</div>'
      : '') +
    '<span style="flex: 1;"></span>' +
    '<span data-act="goBuy" style="font-size: 12px; font-weight: 500; color: var(--m-orange); display: flex; align-items: center; gap: 2px; cursor: pointer;">충전하기' +
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff6f0f" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"></path></svg>' +
    '</span>' +
  '</div>' +

  /* 전자계약 */
  '<div style="padding: 22px 16px 20px; background: #ffffff;">' +
    '<div style="display: flex; align-items: baseline; justify-content: space-between; padding: 0 4px 14px;">' +
      '<h2 style="margin: 0; font-size: 19px; font-weight: 700; color: var(--m-ink-900); letter-spacing: -0.02em;">전자계약</h2>' +
    '</div>' +
    '<div style="display: grid; grid-template-columns: 1.06fr 1fr; gap: 10px;">' +
      '<div class="h-hero" data-act="openSheet" style="position: relative; overflow: hidden; border-radius: 16px; background: var(--m-orange); box-shadow: 0 4px 14px rgba(255,111,15,.28); padding: 18px 16px 16px; display: flex; flex-direction: column; justify-content: space-between; min-height: 196px; cursor: pointer; transition: background 140ms ease, box-shadow 140ms ease, transform 140ms ease;">' +
        '<div>' +
          '<div style="display: inline-flex; align-items: center; height: 22px; padding: 0 8px; border-radius: 999px; background: rgba(255,255,255,.22); color: #fff; font-size: 11px; font-weight: 700; margin-bottom: 10px; letter-spacing: -0.02em;">매입 1건 · 매도 2건 차감</div>' +
          '<div style="font-size: 18px; font-weight: 700; line-height: 1.35; color: #fff; letter-spacing: -0.02em;">매입/매도<br>계약 작성하기</div>' +
        '</div>' +
        '<div style="display: flex; align-items: flex-end; justify-content: flex-end;">' +
          '<svg width="72" height="72" viewBox="0 0 64 64" fill="none" style="margin: -6px -6px -6px 0;">' +
            '<rect x="13" y="8" width="32" height="42" rx="4" fill="#fff" opacity=".95"></rect>' +
            '<path d="M21 20h16M21 27h16M21 34h9" stroke="#ff6f0f" stroke-width="2.4" stroke-linecap="round" opacity=".55"></path>' +
            '<path d="M35 47l4.5-1.3 15-15a3.2 3.2 0 0 0 0-4.5l-1.2-1.2a3.2 3.2 0 0 0-4.5 0l-15 15L33.4 45.6z" fill="#2e2e2e"></path>' +
            '<path d="M46.6 27.4l4.4 4.4" stroke="#fff" stroke-width="2" stroke-linecap="round"></path>' +
          '</svg>' +
        '</div>' +
      '</div>' +
      '<div style="display: grid; grid-template-rows: 1fr 1fr; gap: 10px;">' +
        '<div class="h-tile" style="background: #fff; border: 1px solid var(--m-line-200); border-radius: 16px; box-shadow: 0 2px 8px rgba(0,0,0,.05); padding: 14px; display: flex; flex-direction: column; justify-content: space-between; cursor: pointer; transition: border-color 140ms ease, box-shadow 140ms ease, background 140ms ease, transform 140ms ease;">' +
          '<div style="display: flex; align-items: center; justify-content: space-between; gap: 4px;">' +
            '<span style="font-size: 14px; font-weight: 700; color: var(--m-ink-900); letter-spacing: -0.03em;">진행 중 계약</span>' + chevR(16, "#b2b2b2") +
          '</div>' +
          '<div style="display: flex; align-items: baseline; gap: 2px; margin-top: 10px;">' +
            '<span style="font-size: 24px; font-weight: 900; color: var(--m-orange); letter-spacing: -0.03em; line-height: 1;">3</span>' +
            '<span style="font-size: 14px; font-weight: 700; color: var(--m-orange);">건</span>' +
          '</div>' +
        '</div>' +
        '<div class="h-tile" style="position: relative; overflow: hidden; background: #fff; border: 1px solid var(--m-line-200); border-radius: 16px; box-shadow: 0 2px 8px rgba(0,0,0,.05); padding: 14px; display: flex; flex-direction: column; cursor: pointer; transition: border-color 140ms ease, box-shadow 140ms ease, background 140ms ease, transform 140ms ease;">' +
          '<div style="display: flex; align-items: center; justify-content: space-between; gap: 4px;">' +
            '<span style="font-size: 14px; font-weight: 700; color: var(--m-ink-900); letter-spacing: -0.03em;">완료 문서함</span>' + chevR(16, "#b2b2b2") +
          '</div>' +
          '<div style="margin-top: 3px; font-size: 11px; color: var(--m-ink-400); letter-spacing: -0.03em;">보관문서 보기</div>' +
          '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" style="position: absolute; right: 10px; bottom: 8px;">' +
            '<path d="M3.5 7.4A2 2 0 0 1 5.5 5.4h3.2l1.6 2h8.2a2 2 0 0 1 2 2v7.2a2 2 0 0 1-2 2H5.5a2 2 0 0 1-2-2V7.4z" fill="#dce7f4"></path>' +
            '<path d="M9.2 13.6l2.3 2.3 4.2-4.6" stroke="#005cb9" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>' +
          '</svg>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>' +

  /* 이용권 안내 배너 */
  '<div style="padding: 0 16px 20px; background: #ffffff;">' +
    '<div style="position: relative; overflow: hidden; border-radius: 16px; background: var(--m-orange-banner); padding: 16px 18px; display: flex; align-items: center; justify-content: space-between; gap: 8px;">' +
      '<div>' +
        '<div style="font-size: 11px; font-weight: 700; color: #a2621a; letter-spacing: -0.01em; margin-bottom: 5px;">이용권 안내</div>' +
        '<div style="font-size: 16px; font-weight: 700; color: #5c3a05; line-height: 1.4; letter-spacing: -0.03em; white-space: nowrap;">이용권 <span style="color: var(--m-orange);">1건 1,100원</span> · 최소 10건</div>' +
      '</div>' +
      '<img src="assets/gift-box.png" alt="" style="width: 62px; height: 62px; object-fit: contain; flex: none; margin: -8px -4px -8px 0;">' +
    '</div>' +
  '</div>' +

  '<div style="height: 8px; background: var(--m-surface-gray);"></div>' +

  /* 자주 쓰는 서비스 */
  '<div style="padding: 22px 16px; background: #ffffff;">' +
    '<div style="display: flex; align-items: baseline; justify-content: space-between; padding: 0 4px 16px;">' +
      '<h2 style="margin: 0; font-size: 19px; font-weight: 700; color: var(--m-ink-900); letter-spacing: -0.02em;">자주 쓰는 서비스</h2>' +
    '</div>' +
    '<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px 4px;">' +
      quickTile(null, "#fff4ec", "이전비 계산기",
        '<rect x="7" y="4" width="18" height="24" rx="3.5" fill="#ff6f0f"></rect>' +
        '<rect x="10" y="7.5" width="12" height="5" rx="1.6" fill="#fff"></rect>' +
        '<circle cx="11.6" cy="17" r="1.5" fill="#fff"></circle><circle cx="16" cy="17" r="1.5" fill="#fff"></circle><circle cx="20.4" cy="17" r="1.5" fill="#fff"></circle>' +
        '<circle cx="11.6" cy="22" r="1.5" fill="#fff"></circle><circle cx="16" cy="22" r="1.5" fill="#fff"></circle>' +
        '<rect x="19" y="20.5" width="3" height="3" rx="1.5" fill="#ffe7b8"></rect>') +
      quickTile(null, "#f0f5fb", "시승보험",
        '<path d="M16 4l9 3v8.4c0 5.4-3.6 9.9-9 11.6-5.4-1.7-9-6.2-9-11.6V7l9-3z" fill="#005cb9"></path>' +
        '<path d="M9.5 18.5h13l-1.4-3.6a2 2 0 0 0-1.9-1.3h-6.4a2 2 0 0 0-1.9 1.3L9.5 18.5z" fill="#fff"></path>' +
        '<circle cx="12" cy="19.4" r="1.3" fill="#fff"></circle><circle cx="20" cy="19.4" r="1.3" fill="#fff"></circle>') +
      quickTile("goFinance", "#eff6f5", "할부",
        '<rect x="4" y="8" width="24" height="16" rx="3.2" fill="#5aa29c"></rect>' +
        '<path d="M4 13h24" stroke="#fff" stroke-width="2.6"></path>' +
        '<rect x="7.5" y="17.5" width="7" height="2.4" rx="1.2" fill="#fff"></rect>' +
        '<circle cx="23" cy="18.8" r="2" fill="#ffe7b8"></circle>') +
      quickTile("goInsurance", "#fff4ec", "보험",
        '<path d="M16 5c-6.1 0-11 4.5-11 10h22c0-5.5-4.9-10-11-10z" fill="#ff6f0f"></path>' +
        '<path d="M16 15v9.5a3 3 0 0 0 6 0" stroke="#2e2e2e" stroke-width="2.2" stroke-linecap="round"></path>' +
        '<path d="M5 15h22" stroke="#ffe7b8" stroke-width="2"></path>') +
    '</div>' +
  '</div>' +

  '<div style="height: 8px; background: var(--m-surface-gray);"></div>' +

  /* 프로모 카드 2종 */
  '<div style="padding: 20px 16px 24px; background: #ffffff; display: flex; flex-direction: column; gap: 12px;">' +
    '<div style="position: relative; overflow: hidden; border-radius: 16px; background: #eef3fa; padding: 20px; display: flex; align-items: center; justify-content: space-between; gap: 12px;">' +
      '<div>' +
        '<div style="font-size: 11px; font-weight: 700; color: var(--m-blue); margin-bottom: 6px;">성능점검기록부</div>' +
        '<div style="font-size: 16px; font-weight: 700; color: var(--m-ink-900); line-height: 1.45; letter-spacing: -0.02em;">차량 정보 입력 없이<br>3분이면 발급 완료</div>' +
        '<div style="margin-top: 10px; font-size: 12px; font-weight: 500; color: var(--m-blue); display: flex; align-items: center; gap: 2px;">발급 방법 보기' +
          '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#005cb9" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"></path></svg>' +
        '</div>' +
      '</div>' +
      '<svg width="76" height="76" viewBox="0 0 80 80" fill="none" style="flex: none; margin: -6px -4px;">' +
        '<rect x="17" y="12" width="40" height="52" rx="5" fill="#fff"></rect>' +
        '<path d="M25 25h24M25 33h24M25 41h14" stroke="#005cb9" stroke-width="2.6" stroke-linecap="round" opacity=".35"></path>' +
        '<circle cx="52" cy="50" r="14" fill="#005cb9"></circle>' +
        '<path d="M46 50.4l4 4 8-8.4" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>' +
      '</svg>' +
    '</div>' +
    '<div style="position: relative; overflow: hidden; border-radius: 16px; background: var(--m-orange-50); padding: 20px; display: flex; align-items: center; justify-content: space-between; gap: 12px;">' +
      '<div>' +
        '<div style="font-size: 11px; font-weight: 700; color: var(--m-orange); margin-bottom: 6px;">이용권 안내</div>' +
        '<div style="font-size: 16px; font-weight: 700; color: var(--m-ink-900); line-height: 1.45; letter-spacing: -0.02em;">필요한 만큼만<br>낱개로 구매하세요</div>' +
        '<div data-act="goBuy" style="margin-top: 10px; font-size: 12px; font-weight: 500; color: var(--m-orange); display: flex; align-items: center; gap: 2px; cursor: pointer;">이용권 구매하기' +
          '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ff6f0f" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"></path></svg>' +
        '</div>' +
      '</div>' +
      '<svg width="76" height="76" viewBox="0 0 80 80" fill="none" style="flex: none; margin: -6px -4px;">' +
        '<rect x="12" y="44" width="16" height="22" rx="3" fill="#ffe3cf"></rect>' +
        '<rect x="32" y="32" width="16" height="34" rx="3" fill="#ffb27a"></rect>' +
        '<rect x="52" y="18" width="16" height="48" rx="3" fill="#ff6f0f"></rect>' +
      '</svg>' +
    '</div>' +
  '</div>' +

  /* 푸터 */
  '<div style="background: var(--m-surface-gray); padding: 22px 20px 30px;">' +
    '<div style="display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 700; color: var(--m-ink-700);">한국모빌리티전자계약(주) 사업자 정보' +
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555b63" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 15l7-7 7 7"></path></svg>' +
    '</div>' +
    '<div style="margin-top: 14px; font-size: 11.5px; line-height: 1.8; color: var(--m-ink-500);">' +
      '<div>대표이사 신인철 <span style="color: var(--m-line-400); padding: 0 4px;">|</span> 서울시 강남구 논현로 646</div>' +
      '<div>사업자등록번호 733-81-03784</div>' +
      '<div>통신판매업신고번호 2026-서울강남-01959</div>' +
      '<div>대표번호 02-6188-8402 <span style="color: var(--m-ink-300);">(평일 09:30~17:30 / 점심 12:00~13:00)</span></div>' +
    '</div>' +
    '<div style="margin-top: 14px; font-size: 11px; line-height: 1.7; color: var(--m-ink-400);">한국모빌리티전자계약(주)는 통신판매중개자로 전자계약 당사자가 아니며, 상품거래정보 및 거래에 대하여 책임을 지지 않습니다.</div>' +
    '<div style="margin-top: 12px; font-size: 10.5px; color: var(--m-ink-300);">Copyright © Korea Mobility e-Contract Co.,LTD. All rights reserved.</div>' +
    '<div style="margin-top: 16px; display: flex; align-items: center; gap: 10px; font-size: 11.5px; font-weight: 500; color: var(--m-ink-600);">' +
      '<span>회사소개</span><span style="color: var(--m-line-400);">|</span><span>이용약관</span><span style="color: var(--m-line-400);">|</span><span>개인정보처리방침</span>' +
    '</div>' +
  '</div>';
}

function quickTile(act, bg, label, paths) {
  return '' +
  '<div class="h-quick" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 6px 0; border-radius: 14px; cursor: pointer; transition: transform 140ms ease, background 140ms ease;">' +
    '<div ' + (act ? 'data-act="' + act + '" ' : "") + 'style="width: 58px; height: 58px; border-radius: 18px; background: ' + bg + '; display: flex; align-items: center; justify-content: center;">' +
      '<svg width="30" height="30" viewBox="0 0 32 32" fill="none">' + paths + '</svg>' +
    '</div>' +
    '<span style="font-size: 12px; font-weight: 500; color: var(--m-ink-800); text-align: center; letter-spacing: -0.03em;">' + esc(label) + '</span>' +
  '</div>';
}

/* ── 5. 알림 ─────────────────────────────────────────────── */

function notiRow(opts) {
  return '' +
  '<div class="' + (opts.unread ? "h-noti" : "h-gray") + '" style="display: flex; gap: 12px; padding: 16px 20px; border-bottom: 1px solid var(--m-line-200);' +
    (opts.unread ? " background: var(--m-orange-50);" : "") + ' cursor: pointer; transition: background 140ms ease;">' +
    '<div style="flex: none; width: 38px; height: 38px; border-radius: 12px; background: ' + opts.iconBg + '; display: flex; align-items: center; justify-content: center;' +
      (opts.unread ? " box-shadow: 0 1px 3px rgba(0,0,0,.06);" : "") + '">' + opts.icon + '</div>' +
    '<div style="flex: 1; min-width: 0;">' +
      '<div style="display: flex; align-items: center; gap: 6px;">' +
        '<span style="font-size: 14px; font-weight: 700; color: ' + (opts.unread ? "var(--m-ink-900)" : "var(--m-ink-600)") + '; letter-spacing: -0.02em;">' + opts.kind + '</span>' +
        (opts.unread ? '<span style="width: 6px; height: 6px; border-radius: 999px; background: var(--m-orange); flex: none;"></span>' : "") +
      '</div>' +
      '<div style="margin-top: 4px; font-size: 13px; line-height: 1.5; color: ' + (opts.unread ? "var(--m-ink-700)" : "var(--m-ink-500)") + '; letter-spacing: -0.02em;">' + opts.text + '</div>' +
      '<div style="margin-top: 6px; font-size: 11px; color: var(--m-ink-300);">오후 12:09</div>' +
    '</div>' +
  '</div>';
}

function screenNoti() {
  var docIcon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6f0f" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h7l5 5v13H6z"></path><path d="M13 3v5h5"></path><path d="M9 14.2l2.2 2.2 4-4.6"></path></svg>';
  var cardIcon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#005cb9" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2.5"></rect><path d="M3 10.5h18"></path></svg>';
  var rwdIcon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5aa29c" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"></circle><path d="M12 8v8M9 12h6"></path></svg>';
  var clockIcon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#808080" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3.5 2"></path></svg>';

  return '' +
  '<div style="background: #ffffff; min-height: 760px;">' +
    '<div style="display: flex; align-items: center; gap: 12px; padding: 10px 16px 16px; background: #ffffff;">' +
      '<div class="h-gray" data-act="goHome" style="width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; cursor: pointer; border-radius: 8px;">' + chevL() + '</div>' +
      '<h1 style="flex: 1; margin: 0; font-size: 18px; font-weight: 700; color: var(--m-ink-900); letter-spacing: -0.02em;">알림</h1>' +
      '<div style="display: flex; align-items: center; gap: 6px;">' +
        '<span class="h-tx" style="font-size: 12px; font-weight: 500; color: var(--m-ink-400); cursor: pointer;">모두 읽음</span>' +
        '<div class="h-gray" style="width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; cursor: pointer; border-radius: 8px;">' +
          '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#2e2e2e" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3.2"></circle><path d="M12 2.5v2.5M12 19v2.5M4.2 7.2l2.1 1.2M17.7 15.6l2.1 1.2M4.2 16.8l2.1-1.2M17.7 8.4l2.1-1.2"></path></svg>' +
        '</div>' +
      '</div>' +
    '</div>' +

    '<div style="padding: 8px 20px; background: var(--m-surface-gray); font-size: 12px; font-weight: 700; color: var(--m-ink-500); letter-spacing: -0.02em;">오늘</div>' +
    '<div style="display: flex; flex-direction: column;">' +
      notiRow({ unread: true, iconBg: "#fff", icon: docIcon, kind: "계약완료",
        text: '<span style="font-weight: 700; color: var(--m-ink-900);">12가1234</span> 의 매도 계약이 완료되었습니다.' }) +
      notiRow({ unread: true, iconBg: "#fff", icon: docIcon, kind: "계약완료",
        text: '<span style="font-weight: 700; color: var(--m-ink-900);">12가1234</span> 의 매입 계약이 완료되었습니다.' }) +
    '</div>' +

    '<div style="padding: 8px 20px; background: var(--m-surface-gray); font-size: 12px; font-weight: 700; color: var(--m-ink-500); letter-spacing: -0.02em;">2026-08-04</div>' +
    '<div style="display: flex; flex-direction: column;">' +
      notiRow({ iconBg: "#f0f5fb", icon: cardIcon, kind: "결제", text: "이용권 구매가 완료되었습니다." }) +
      notiRow({ iconBg: "#eff6f5", icon: rwdIcon, kind: "리워드",
        text: '정산예정인 리워드가 <span style="font-weight: 700; color: var(--m-ink-700);">2건</span> 있습니다. 확인해주세요.' }) +
      notiRow({ iconBg: "#eff6f5", icon: rwdIcon, kind: "리워드",
        text: '리워드 <span style="font-weight: 700; color: var(--m-green);">100,000원</span>이 정산되었습니다.' }) +
      notiRow({ iconBg: "var(--m-surface-gray)", icon: clockIcon, kind: "만료",
        text: '이용권 <span style="font-weight: 700; color: var(--m-ink-700);">3건</span>이 만료되었습니다.' }) +
    '</div>' +

    '<div style="padding: 28px 20px 40px; text-align: center; font-size: 11.5px; color: var(--m-ink-300); letter-spacing: -0.02em;">알림은 최근 30일까지 보관됩니다.</div>' +
  '</div>';
}

/* ── 6. 리워드 내역 ──────────────────────────────────────── */

function rwdSel() { return S.rwdSel || RWD_ITEMS; }

function screenRwd() {
  var sel = rwdSel();
  var rows = RWD2.filter(function (r) { return sel.indexOf(r.item) >= 0; });
  var label = sel.length === RWD_ITEMS.length ? "전체"
    : sel.length === 0 ? "항목 선택"
    : sel.length === 1 ? sel[0] : sel[0] + " 외 " + (sel.length - 1) + "건";

  var list = rows.map(function (r) {
    var amount = r.unit === "pass" ? r.value + " 건" : num(r.value) + "원";
    var unitLabel = r.unit === "pass" ? "전자계약 이용권" : "현금 정산";
    return '' +
    '<div style="background: #fff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,.06); padding: 16px 16px 14px;">' +
      '<div style="display: flex; align-items: baseline; gap: 7px; padding-bottom: 12px; border-bottom: 1px solid var(--m-line-200);">' +
        '<span style="font-size: 15px; font-weight: 700; color: var(--m-ink-900); letter-spacing: -0.02em;">' + esc(r.item) + '</span>' +
        '<span style="flex: 1; font-size: 13px; color: var(--m-ink-600); letter-spacing: -0.02em;">' + esc(r.sub) + '</span>' +
        '<span style="font-size: 16px; font-weight: 700; color: var(--m-ink-900); letter-spacing: -0.02em;">' + esc(amount) + '</span>' +
      '</div>' +
      '<div style="padding-top: 12px; display: flex; flex-direction: column; gap: 6px;">' +
        '<div style="font-size: 13.5px; color: var(--m-ink-800); letter-spacing: -0.02em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">' + esc(r.plate) + ' <span style="color: var(--m-line-300); padding: 0 3px;">|</span> <span style="color: var(--m-ink-500);">' + esc(r.model) + '</span></div>' +
        '<div style="font-size: 13.5px; color: var(--m-ink-800); letter-spacing: -0.02em;">' + unitLabel + ' <span style="color: var(--m-line-300); padding: 0 3px;">|</span> <span style="color: var(--m-ink-600);">' + esc(r.paidAt) + ' 지급완료</span></div>' +
      '</div>' +
    '</div>';
  }).join("");

  var empty = rows.length === 0 ? '' +
    '<div style="flex: 1; min-height: 300px; padding: 40px 32px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; background: #fff; border-radius: 12px;">' +
      '<svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#c3c3c3" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="8.5" width="17" height="11.5" rx="2"></rect><path d="M3.5 12.5h17M12 8.5V20"></path><path d="M12 8.5c-3.2 0-4.6-.6-4.6-2.2S9.2 4.5 12 8.5zM12 8.5c3.2 0 4.6-.6 4.6-2.2S14.8 4.5 12 8.5z"></path></svg>' +
      '<div style="margin-top: 6px; font-size: 14px; font-weight: 700; color: var(--m-ink-800); letter-spacing: -0.02em;">아직 리워드 내역이 없습니다.</div>' +
      '<div style="font-size: 12.5px; line-height: 1.6; color: var(--m-ink-500); text-align: center; letter-spacing: -0.02em;">고객에게 할부·보험을 추천하고<br>성사되면 리워드가 지급됩니다.</div>' +
      '<div style="margin-top: 16px; display: flex; gap: 10px;">' +
        '<div class="h-btn" data-act="goFinance" style="height: 42px; padding: 0 22px; border-radius: 999px; background: var(--m-orange); color: #fff; font-size: 14px; font-weight: 700; letter-spacing: -0.02em; display: flex; align-items: center; cursor: pointer; transition: background 140ms ease;">할부 추천</div>' +
        '<div class="h-out" data-act="goInsurance" style="height: 42px; padding: 0 22px; border-radius: 999px; border: 1px solid var(--m-line-300); color: var(--m-ink-800); font-size: 14px; font-weight: 700; letter-spacing: -0.02em; display: flex; align-items: center; cursor: pointer; transition: all 140ms ease;">보험 추천</div>' +
      '</div>' +
    '</div>' : "";

  return '' +
  '<div style="background: #fff; min-height: 812px; display: flex; flex-direction: column;">' +
    appBar("리워드 내역", "goBack") +
    '<div style="padding: 14px 16px; background: #fff;">' +
      '<div class="h-bd" data-act="openRwdFilter" style="height: 48px; padding: 0 14px; border: 1px solid var(--m-line-300); border-radius: 8px; background: #fff; display: flex; align-items: center; gap: 8px; cursor: pointer; transition: border-color 140ms ease;">' +
        '<span style="flex: 1; font-size: 14px; color: var(--m-ink-900); letter-spacing: -0.02em;">' + esc(label) + '</span>' + chevDown() +
      '</div>' +
    '</div>' +
    '<div style="flex: 1; display: flex; flex-direction: column; gap: 12px; padding: 4px 16px 16px; background: var(--m-surface-gray);">' + list + empty + '</div>' +
    '<div style="position: sticky; bottom: 0; display: flex; align-items: center; padding: 12px 20px 16px; background: #fff; border-top: 1px solid var(--m-line-200);">' +
      '<span style="flex: 1; font-size: 12.5px; color: var(--m-ink-500); letter-spacing: -0.02em;">총 ' + (rows.length === 0 ? "0" : "226") + '</span>' +
      '<div style="display: flex; align-items: center; gap: 10px;">' + pagerArrows(true) + pager([1, 2, 3], S.rwdPage, "rwdPage") + pagerArrows(false) + '</div>' +
    '</div>' +
  '</div>';
}

function sheetRwdFilter() {
  var sel = S.rwdDraft || rwdSel();
  var all = sel.length === RWD_ITEMS.length;
  var opts = checkboxRow("전체", all, "rwdOpt", -1) +
    RWD_ITEMS.map(function (it, i) { return checkboxRow(it, sel.indexOf(it) >= 0, "rwdOpt", i); }).join("");
  var inner = '<div style="margin-top: 18px; display: flex; flex-direction: column;">' + opts + '</div>' +
    '<div class="h-btn" data-act="applyRwdFilter" style="margin: 18px 0 8px; height: 52px; border-radius: 999px; background: var(--m-orange); color: #fff; font-size: 16px; font-weight: 700; letter-spacing: -0.02em; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 140ms ease;">확인</div>';
  return sheetShell("리워드 항목", "closeRwdFilter", inner, 46);
}

/* ── 7. 할부 / 보험 상담 신청 ────────────────────────────── */

function insReady() {
  if (S.mode !== "insurance") return true;
  if (S.kind === "비교견적") return true;
  return S.kind === "다이렉트" && !!S.carrier;
}

function smsUrl() {
  if (S.mode !== "insurance") return "https://mb365.kr/f-a1b";
  if (S.kind === "비교견적") return "https://mb365.kr/ins/compare/a1b";
  var c = CARRIERS.filter(function (x) { return x.name === S.carrier; })[0];
  return c ? "https://mb365.kr/ins/" + c.code + "/a1b" : "https://mb365.kr/ins/a1b";
}

function carSpec(c) {
  return '' +
  '<div style="margin-top: 12px; padding: 12px; background: var(--m-surface-gray); border-radius: 8px; display: flex; flex-direction: column; gap: 7px;">' +
    specRow("제시번호", c.offerNo) + specRow("년식", c.year) + specRow("주행거리", c.km) +
  '</div>' +
  '<div style="margin-top: 12px; display: flex; align-items: baseline; justify-content: space-between;">' +
    '<span style="font-size: 13.5px; font-weight: 500; color: var(--m-ink-800); letter-spacing: -0.02em;">제시 금액</span>' +
    '<span style="font-size: 18px; font-weight: 700; color: var(--m-ink-900); letter-spacing: -0.03em;">' + num(c.price) + ' 원</span>' +
  '</div>';
}
function specRow(k, v) {
  return '<div style="display: flex; justify-content: space-between; font-size: 12.5px;"><span style="color: var(--m-ink-500);">' + esc(k) + '</span><span style="color: var(--m-ink-800);">' + esc(v) + '</span></div>';
}

function screenApply() {
  var isIns = S.mode === "insurance";
  var title = isIns ? "보험 상담 신청" : "할부 신청";
  var head = '' +
  '<div style="display: flex; align-items: center; gap: 12px; padding: 16px 20px; background: #fff;">' +
    '<div data-act="applyBack" style="display: flex; cursor: pointer;">' + chevL() + '</div>' +
    '<h1 style="flex: 1; margin: 0; font-size: 18px; font-weight: 700; color: var(--m-ink-900); letter-spacing: -0.02em;">' + title + '</h1>' +
  '</div>';

  var body = S.step === "form" ? applyForm(isIns) : applyList(isIns);
  return '<div style="background: #fff; min-height: 812px; display: flex; flex-direction: column;">' + head + body + '</div>';
}

function applyList(isIns) {
  var lead = isIns ? "보험 상담을 신청할 차량을 선택하세요" : "할부 상담을 신청할 차량을 선택하세요";
  var cards = CARS.map(function (c, i) {
    return '' +
    '<div class="h-lift" data-act="carPick" data-i="' + i + '" style="background: #fff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,.06); padding: 16px; cursor: pointer; transition: box-shadow 140ms ease, transform 140ms ease;">' +
      '<div style="display: flex; align-items: center; gap: 8px;">' +
        '<span style="font-size: 16px; font-weight: 700; color: var(--m-orange); letter-spacing: -0.02em;">' + esc(c.plate) + '</span>' +
        (c.tag ? '<span style="height: 19px; padding: 0 7px; border-radius: 4px; background: var(--m-surface-gray); color: var(--m-ink-600); font-size: 10.5px; font-weight: 500; display: inline-flex; align-items: center; letter-spacing: -0.02em;">계약 진행 중</span>' : "") +
      '</div>' +
      '<div style="margin-top: 6px; font-size: 13.5px; color: var(--m-ink-800); letter-spacing: -0.02em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">' + esc(c.model) + '</div>' +
      carSpec(c) +
    '</div>';
  }).join("");

  return '' +
  '<div>' +
    '<div style="padding: 4px 20px 0; font-size: 15.5px; font-weight: 700; color: var(--m-ink-900); letter-spacing: -0.03em;">' + lead + '</div>' +
    '<div style="padding: 14px 16px 18px;">' +
      '<div style="height: 48px; padding: 0 14px; border: 1px solid var(--m-line-300); border-radius: 8px; display: flex; align-items: center; gap: 8px;">' +
        '<span style="flex: 1; font-size: 14px; color: var(--m-ink-400); letter-spacing: -0.02em;">차량 번호 검색 (예: 12가5678)</span>' +
        '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#808080" stroke-width="1.6" stroke-linecap="round"><circle cx="11" cy="11" r="6.4"></circle><path d="M16 16l4 4"></path></svg>' +
      '</div>' +
    '</div>' +
    '<div style="height: 8px; background: var(--m-surface-gray);"></div>' +
    '<div style="padding: 16px; display: flex; flex-direction: column; gap: 14px;">' + cards + '</div>' +
  '</div>';
}

function applyForm(isIns) {
  var c = CARS[S.car] || null;
  var can = !!S.cPhone && insReady();

  var kinds = ["비교견적", "다이렉트"].map(function (k) {
    var on = S.kind === k;
    return '<div class="h-bd" data-act="kindPick" data-i="' + k + '" style="flex: 1; height: 48px; border: 1px solid ' + (on ? "var(--m-orange)" : "var(--m-line-300)") +
      '; border-radius: 8px; background: #fff; color: ' + (on ? "var(--m-orange)" : "var(--m-ink-800)") +
      '; font-size: 14.5px; font-weight: ' + (on ? "700" : "500") + '; letter-spacing: -0.02em; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 140ms ease;">' + k + '</div>';
  }).join("");

  var carrierRows = CARRIERS.map(function (cc, i) {
    var active = S.carrier === cc.name || cc.featured;
    return '<div class="h-orange50" data-act="carrierPick" data-i="' + i + '" style="padding: 13px 14px; border-bottom: 1px solid var(--m-line-200); background: ' + (cc.featured ? "#fff8f2" : "#fff") +
      '; display: flex; align-items: center; gap: 7px; font-size: 14px; font-weight: ' + (cc.featured ? "700" : "500") +
      '; color: ' + (active ? "var(--m-orange)" : "var(--m-ink-800)") + '; letter-spacing: -0.02em; cursor: pointer; transition: background 120ms ease;">' +
      '<span>' + esc(cc.name) + '</span>' +
      (cc.featured ? '<span style="height: 19px; padding: 0 6px; border-radius: 4px; background: var(--m-orange); color: #fff; font-size: 10.5px; font-weight: 700; display: inline-flex; align-items: center; letter-spacing: -0.02em;">추천</span>' : "") +
    '</div>';
  }).join("");

  var carrierBlock = S.kind === "다이렉트" ? '' +
    '<div style="position: relative;">' +
      '<div class="h-bd" data-act="toggleCarrier" style="height: 50px; padding: 0 14px; border: 1px solid var(--m-line-300); border-radius: 8px; background: #fff; display: flex; align-items: center; gap: 8px; cursor: pointer; transition: border-color 140ms ease;">' +
        '<span style="flex: 1; font-size: 14px; letter-spacing: -0.02em; color: ' + (S.carrier ? "var(--m-ink-900)" : "var(--m-ink-400)") + ';">' + esc(S.carrier || "보험사 선택") + '</span>' +
        chevDown(S.dd === "carrier" ? "180deg" : "0deg") +
      '</div>' +
      (S.dd === "carrier"
        ? '<div style="position: absolute; top: 100%; left: 0; right: 0; z-index: 21; margin-top: 6px; background: #fff; border: 1px solid var(--m-line-300); border-radius: 8px; box-shadow: 0 6px 24px rgba(0,0,0,.16); max-height: 232px; overflow: auto; animation: m-fade-in 140ms ease-out both;">' + carrierRows + '</div>'
        : "") +
    '</div>' : "";

  var insBlock = isIns ? '' +
    '<div style="margin-top: 18px;">' +
      '<div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">' +
        '<span style="font-size: 14px; font-weight: 700; color: var(--m-ink-900); letter-spacing: -0.02em;">보험정보</span>' +
        '<div class="h-tx" data-act="openAdFee" style="display: flex; align-items: center; gap: 4px; padding: 4px 0; font-size: 12.5px; color: var(--m-ink-500); letter-spacing: -0.02em; cursor: pointer; transition: color 140ms ease;">' +
          infoIcon(15, "currentColor") +
          '<span style="text-decoration: underline; text-underline-offset: 2px;">광고비 안내</span>' +
        '</div>' +
      '</div>' +
      '<div style="margin-top: 12px; display: flex; flex-direction: column; gap: 10px;">' +
        '<div style="display: flex; gap: 10px;">' + kinds + '</div>' +
        carrierBlock +
      '</div>' +
    '</div>' : "";

  var line1 = isIns
    ? "안녕하세요 고객님, 오늘 상담드린 차량 보험 건으로 연락드립니다."
    : "안녕하세요 고객님, 오늘 상담드린 차량 금융 건으로 연락드립니다.";
  var line2 = isIns
    ? "아래 링크에서 간단한 정보 입력과 동의를 완료하시면 제휴 보험사 신청 페이지로 바로 연결됩니다."
    : "아래 링크에서 간단한 정보 입력과 동의를 완료하시면 제휴 금융사 신청 페이지로 바로 연결됩니다.";

  return '' +
  '<div style="flex: 1; display: flex; flex-direction: column;">' +
    '<div style="padding: 4px 16px 18px;">' +
      '<div style="background: #fff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,.06); padding: 16px;">' +
        '<div style="font-size: 16px; font-weight: 700; color: var(--m-orange); letter-spacing: -0.02em;">' + esc(c ? c.plate : "") + '</div>' +
        '<div style="margin-top: 6px; font-size: 13.5px; color: var(--m-ink-800); letter-spacing: -0.02em;">' + esc(c ? c.model : "") + '</div>' +
        (c ? carSpec(c) : "") +
      '</div>' +
    '</div>' +

    '<div style="height: 8px; background: var(--m-surface-gray);"></div>' +

    '<div style="padding: 18px 16px 0;">' +
      '<div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">' +
        '<span style="font-size: 14px; font-weight: 700; color: var(--m-ink-900); letter-spacing: -0.02em;">고객정보</span>' +
        '<div class="h-out" data-act="openContacts" style="height: 36px; padding: 0 14px; border: 1px solid var(--m-line-300); border-radius: 999px; display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 500; color: var(--m-ink-800); letter-spacing: -0.02em; cursor: pointer; transition: all 140ms ease;">' +
          '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8.6" r="3.4"></circle><path d="M5.5 19.5a6.5 6.5 0 0 1 13 0"></path></svg>' +
          '연락처 불러오기' +
        '</div>' +
      '</div>' +
      '<div style="margin-top: 12px; display: flex; flex-direction: column; gap: 10px;">' +
        '<input class="inp" data-inp="cName" value="' + esc(S.cName) + '" placeholder="성명 입력" style="height: 50px; padding: 0 14px; border: 1px solid var(--m-line-300); border-radius: 8px; font-family: inherit; font-size: 14px; color: var(--m-ink-900); letter-spacing: -0.02em; outline: none; background: #fff;">' +
        '<input class="inp" data-inp="cPhone" value="' + esc(S.cPhone) + '" placeholder="휴대폰번호 입력" inputmode="tel" style="height: 50px; padding: 0 14px; border: 1px solid var(--m-line-300); border-radius: 8px; font-family: inherit; font-size: 14px; color: var(--m-ink-900); letter-spacing: -0.02em; outline: none; background: #fff;">' +
      '</div>' +
      insBlock +

      '<div style="margin-top: 18px; font-size: 14px; font-weight: 700; color: var(--m-ink-900); letter-spacing: -0.02em;">문자예시</div>' +
      '<div style="margin-top: 10px; padding: 16px; background: var(--m-surface-gray); border-radius: 8px; display: flex; flex-direction: column; gap: 14px;">' +
        '<div style="font-size: 13.5px; line-height: 1.6; color: var(--m-ink-800); letter-spacing: -0.02em;">' + line1 + '</div>' +
        '<div style="font-size: 13.5px; line-height: 1.6; color: var(--m-ink-800); letter-spacing: -0.02em;">' + line2 + '</div>' +
        '<div style="display: flex; align-items: center; gap: 7px; font-size: 13.5px; color: var(--m-ink-800);">' +
          '<svg width="11" height="11" viewBox="0 0 12 12" fill="#2e2e2e"><path d="M2.5 1.6v8.8L10 6z"></path></svg>' + smsUrl() +
        '</div>' +
      '</div>' +
    '</div>' +

    '<div style="flex: 1; min-height: 24px;"></div>' +
    '<div style="margin: 24px 16px 0; padding: 14px; background: var(--m-orange-50); border-radius: 8px; font-size: 12.5px; line-height: 1.65; color: var(--m-ink-700); letter-spacing: -0.02em;">\'안내문자 보내기\'를 누르면 입력하신 번호로 상담신청 안내 문자가 작성됩니다. 문자 앱에서 전송 버튼을 눌러주세요.</div>' +
    '<div style="padding: 14px 16px 22px;">' +
      (can
        ? '<div class="h-primary" data-act="sendSms" style="height: 52px; border-radius: 8px; background: var(--m-orange); color: #fff; font-size: 16px; font-weight: 700; letter-spacing: -0.02em; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 14px rgba(255,111,15,.28); transition: background 140ms ease, transform 140ms ease;">안내문자 보내기</div>'
        : '<div style="height: 52px; border-radius: 8px; background: var(--m-line-300); color: #fff; font-size: 16px; font-weight: 700; letter-spacing: -0.02em; display: flex; align-items: center; justify-content: center; cursor: not-allowed;">안내문자 보내기</div>') +
    '</div>' +
  '</div>';
}

function sheetAdFee() {
  var inner = '' +
  '<div style="margin-top: 16px; display: flex; gap: 10px;">' +
    '<div style="flex: 1; padding: 14px 16px; background: var(--m-surface-gray); border-radius: 12px;">' +
      '<div style="font-size: 12.5px; font-weight: 500; color: var(--m-ink-600); letter-spacing: -0.02em;">비교견적</div>' +
      '<div style="margin-top: 6px; font-size: 22px; font-weight: 900; color: var(--m-ink-900); letter-spacing: -0.03em; line-height: 1;">3%</div>' +
    '</div>' +
    '<div style="flex: 1; padding: 14px 16px; background: var(--m-orange-50); border-radius: 12px;">' +
      '<div style="font-size: 12.5px; font-weight: 500; color: #a2621a; letter-spacing: -0.02em;">다이렉트</div>' +
      '<div style="margin-top: 6px; font-size: 22px; font-weight: 900; color: var(--m-orange); letter-spacing: -0.03em; line-height: 1;">5%</div>' +
    '</div>' +
  '</div>' +
  '<div style="margin-top: 14px; padding: 14px 16px; background: var(--m-surface-gray); border-radius: 8px; display: flex; flex-direction: column; gap: 9px;">' +
    '<div style="display: flex; align-items: baseline; gap: 12px;">' +
      '<span style="flex: none; width: 62px; font-size: 12.5px; color: var(--m-ink-500); letter-spacing: -0.02em;">정산 기준</span>' +
      '<span style="flex: 1; font-size: 13px; color: var(--m-ink-900); letter-spacing: -0.02em;">보험료의 3% (비교견적) · 5% (다이렉트)</span>' +
    '</div>' +
    '<div style="display: flex; align-items: baseline; gap: 12px;">' +
      '<span style="flex: none; width: 62px; font-size: 12.5px; color: var(--m-ink-500); letter-spacing: -0.02em;">정산 시점</span>' +
      '<span style="flex: 1; font-size: 13px; color: var(--m-ink-900); letter-spacing: -0.02em;">고객 보험 가입일로부터 영업일 기준 1일 이후</span>' +
    '</div>' +
  '</div>' +
  '<ul style="margin: 14px 0 0; padding-left: 16px; font-size: 12px; line-height: 1.75; color: var(--m-ink-500); letter-spacing: -0.02em;">' +
    '<li>광고비는 고객이 보험에 실제 가입한 건에 대해서만 지급됩니다.</li>' +
    '<li>가입 철회·취소 시 지급 예정 광고비는 회수됩니다.</li>' +
    '<li>지급 내역은 <span style="color: var(--m-ink-700); font-weight: 500;">더보기 &gt; 리워드 내역</span>에서 확인할 수 있습니다.</li>' +
  '</ul>' +
  '<div class="h-btn" data-act="closeAdFee" style="margin: 18px 0 8px; height: 52px; border-radius: 999px; background: var(--m-orange); color: #fff; font-size: 16px; font-weight: 700; letter-spacing: -0.02em; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 140ms ease;">확인</div>';
  return sheetShell("광고비 안내", "closeAdFee", inner, 50);
}

/* ── 8. 사용현황 ─────────────────────────────────────────── */

function screenUse() {
  var tabs = [["월별", "month"], ["연별", "year"]].map(function (t) {
    var on = S.useTab === t[1];
    return '<div data-act="useTab" data-i="' + t[1] + '" style="flex: 1; height: 36px; border-radius: 999px; background: ' + (on ? "#fff" : "transparent") +
      '; box-shadow: ' + (on ? "0 2px 8px rgba(0,0,0,.10)" : "none") + '; display: flex; align-items: center; justify-content: center; font-size: 13.5px; font-weight: ' +
      (on ? "700" : "500") + '; color: ' + (on ? "var(--m-ink-900)" : "var(--m-ink-400)") + '; letter-spacing: -0.02em; cursor: pointer; transition: all 160ms cubic-bezier(.2,0,0,1);">' + t[0] + '</div>';
  }).join("");

  var chips = [["전체 22", "all"], ["차감 18", "차감"], ["만료 4", "만료"]].map(function (c) {
    var on = S.useChip === c[1];
    return '<div data-act="useChip" data-i="' + c[1] + '" style="height: 26px; padding: 0 11px; border-radius: 999px; border: 1px solid ' + (on ? "#5c6066" : "var(--m-line-300)") +
      '; background: ' + (on ? "#5c6066" : "#fff") + '; color: ' + (on ? "#fff" : "var(--m-ink-600)") +
      '; font-size: 11.5px; font-weight: 500; letter-spacing: -0.02em; display: flex; align-items: center; cursor: pointer; transition: all 140ms ease;">' + c[0] + '</div>';
  }).join("");

  var days = USE_DAYS.map(function (d) {
    var groups = d.groups.filter(function (g) { return S.useChip === "all" || g.kind === S.useChip; });
    if (!groups.length) return "";
    var gs = groups.map(function (g) {
      var id = d.date + g.kind;
      var open = !!S.useOpen[id];
      var rows = open ? '<div style="display: flex; flex-direction: column;">' + g.rows.map(function (r) {
        return '' +
        '<div style="padding: 11px 0 12px; border-top: 1px solid var(--m-line-200);">' +
          '<div style="display: flex; align-items: center; gap: 6px;">' +
            '<span style="font-size: 13.5px; font-weight: 500; color: var(--m-ink-900); letter-spacing: -0.02em;">' + esc(r.type) + '</span>' +
            (r.badge ? '<span style="height: 17px; padding: 0 5px; border-radius: 4px; background: #ffe9d9; color: var(--m-orange); font-size: 10px; font-weight: 700; display: inline-flex; align-items: center; letter-spacing: -0.02em;">' + esc(r.badge) + '</span>' : "") +
            '<span style="flex: 1;"></span>' +
            '<span style="font-size: 12.5px; font-weight: 700; color: var(--m-ink-800);">- ' + r.count + '건</span>' +
          '</div>' +
          '<div style="margin-top: 5px; display: flex; align-items: center; gap: 8px;">' +
            '<span style="flex: 1; min-width: 0; font-size: 11.5px; color: var(--m-ink-500); letter-spacing: -0.02em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">' + esc(r.plate) + ' <span style="color: var(--m-line-300);">|</span> ' + esc(r.model) + '</span>' +
            '<span style="flex: none; font-size: 10.5px; color: var(--m-ink-400);">' + esc(r.time) + '</span>' +
          '</div>' +
        '</div>';
      }).join("") + '</div>' : "";

      return '' +
      '<div>' +
        '<div data-act="useToggle" data-i="' + esc(id) + '" style="display: flex; align-items: center; gap: 8px; padding: 11px 0; cursor: pointer;">' +
          '<span style="width: 3px; height: 15px; border-radius: 2px; background: ' + (g.kind === "차감" ? "var(--m-red)" : "var(--m-line-300)") + ';"></span>' +
          '<span style="flex: 1; font-size: 14.5px; font-weight: 700; color: ' + (g.kind === "차감" ? "var(--m-red)" : "var(--m-ink-800)") + '; letter-spacing: -0.02em;">' + g.kind + '</span>' +
          '<span style="font-size: 13px; font-weight: 500; color: var(--m-ink-700); letter-spacing: -0.02em;">- ' + g.count + '건</span>' +
          '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#808080" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="transform: rotate(' + (open ? "180deg" : "0deg") + ');"><path d="M6 9.5l6 6 6-6"></path></svg>' +
        '</div>' + rows +
      '</div>';
    }).join("");

    return '<div style="padding: 12px 16px 0; border-top: 1px solid var(--m-line-200);">' +
      '<div style="font-size: 11.5px; color: var(--m-ink-400); letter-spacing: -0.02em;">' + d.date + '</div>' + gs + '</div>';
  }).join("");

  return '' +
  '<div style="background: #fff; min-height: 812px; display: flex; flex-direction: column;">' +
    appBar("사용현황", "goBack") +
    '<div style="padding: 16px;">' +
      '<div style="background: var(--m-surface-gray); border-radius: 12px; padding: 16px;">' +
        '<div style="font-size: 12.5px; color: var(--m-ink-600); letter-spacing: -0.02em;">사용 가능한 이용권</div>' +
        '<div style="margin-top: 6px; display: flex; align-items: baseline; gap: 3px;">' +
          '<span style="font-size: 30px; font-weight: 900; color: var(--m-ink-900); letter-spacing: -0.04em; line-height: 1;">' + availNum() + '</span>' +
          '<span style="font-size: 14px; font-weight: 500; color: var(--m-ink-700);">건</span>' +
        '</div>' +
        '<div style="margin-top: 14px; display: flex; align-items: center; gap: 14px;">' +
          '<span style="display: flex; align-items: center; gap: 5px; font-size: 11.5px; color: var(--m-ink-600); letter-spacing: -0.02em;"><span style="width: 8px; height: 8px; border-radius: 2px; background: var(--m-orange);"></span>사용 가능 <span style="font-weight: 700; color: var(--m-ink-900);">' + availLabel() + '</span></span>' +
          '<span style="display: flex; align-items: center; gap: 5px; font-size: 11.5px; color: var(--m-ink-600); letter-spacing: -0.02em;"><span style="width: 8px; height: 8px; border-radius: 2px; background: #d9dde1;"></span>사용 중 <span style="font-weight: 700; color: var(--m-ink-900);">' + INUSE + '건</span></span>' +
        '</div>' +
        '<div style="margin-top: 10px; display: flex; height: 18px; border-radius: 3px; overflow: hidden; background: #e3e7ea;">' +
          '<span style="width: 93%; background: var(--m-orange);"></span>' +
        '</div>' +
        '<div style="margin-top: 7px; display: flex; justify-content: space-between; font-size: 10.5px; color: var(--m-ink-400);">' +
          '<span>0건</span><span>보유 ' + OWNED + '건</span>' +
        '</div>' +
        '<div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--m-line-200); font-size: 11.5px; line-height: 1.6; color: var(--m-ink-500); letter-spacing: -0.02em;">전자계약 매입 1건 · 매도 2건, 이전 5건이 차감됩니다.</div>' +
      '</div>' +
    '</div>' +

    '<div style="height: 8px; background: var(--m-surface-gray);"></div>' +

    '<div style="padding: 18px 16px 0;">' +
      '<div style="display: flex; padding: 4px; background: var(--m-surface-gray); border-radius: 999px;">' + tabs + '</div>' +
    '</div>' +

    '<div style="display: flex; align-items: center; justify-content: center; gap: 14px; padding: 16px 0 14px; border-bottom: 1px solid var(--m-line-200);">' +
      '<div style="display: flex; cursor: pointer;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b2b2b2" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5 8 12l7 7"></path></svg></div>' +
      '<span style="font-size: 14.5px; font-weight: 700; color: var(--m-ink-900); letter-spacing: -0.02em;">' + (S.useTab === "year" ? "2026년" : "2026년&nbsp;&nbsp; 4월") + '</span>' +
      '<div style="display: flex; cursor: pointer;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#808080" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"></path></svg></div>' +
    '</div>' +

    '<div style="display: flex; gap: 6px; padding: 14px 16px 6px;">' + chips + '</div>' +
    '<div style="flex: 1; display: flex; flex-direction: column;">' + days +
      '<div style="border-top: 1px solid var(--m-line-200); min-height: 40px;"></div>' +
    '</div>' +
  '</div>';
}

/* ── 9. 결제 내역 ────────────────────────────────────────── */

function screenPay() {
  var rows = ROWS.filter(function (r) { return S.statuses.indexOf(r.status) >= 0; });
  var label = S.statuses.length === STATUS_ALL.length ? "모든 상태"
    : S.statuses.length === 0 ? "상태 선택"
    : S.statuses.length === 1 ? S.statuses[0]
    : S.statuses[0] + " 외 " + (S.statuses.length - 1) + "건";

  var list = rows.map(function (r) {
    var cancelled = r.status === "결제 취소";
    return '' +
    '<div class="h-lift1" style="background: #fff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,.06); padding: 16px 16px 14px; cursor: pointer; transition: box-shadow 140ms ease, transform 140ms ease;">' +
      '<div style="display: flex; align-items: baseline; gap: 8px; padding-bottom: 12px; border-bottom: 1px solid var(--m-line-200);">' +
        '<span style="font-size: 15px; font-weight: 700; color: ' + (cancelled ? "var(--m-ink-500)" : "var(--m-ink-900)") + '; letter-spacing: -0.02em;">' + r.status + '</span>' +
        '<span style="flex: 1; font-size: 12px; color: var(--m-ink-400); letter-spacing: -0.01em;">' + r.no + '</span>' +
        '<span style="font-size: 16px; font-weight: 700; color: ' + (cancelled ? "var(--m-ink-400)" : "var(--m-ink-900)") + '; text-decoration: ' + (cancelled ? "line-through" : "none") + '; letter-spacing: -0.02em;">' + won(r.amount) + '</span>' +
      '</div>' +
      '<div style="padding-top: 12px; display: flex; flex-direction: column; gap: 5px;">' +
        '<div style="font-size: 13.5px; color: var(--m-ink-800); letter-spacing: -0.02em;">' + esc(r.item) + ' <span style="color: var(--m-line-300); padding: 0 3px;">|</span> ' + esc(r.method) + ' <span style="color: var(--m-ink-500);">' + esc(r.methodNote) + '</span></div>' +
        (r.fail ? '<div style="font-size: 13.5px; letter-spacing: -0.02em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"><span style="font-weight: 700; color: var(--m-red);">환불실패</span> <span style="color: var(--m-ink-500);">' + esc(r.fail) + '</span></div>' : "") +
      '</div>' +
    '</div>';
  }).join("");

  var empty = rows.length === 0 ? '' +
    '<div style="flex: 1; min-height: 420px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;">' +
      '<svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#c3c3c3" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2.8" y="6.5" width="14" height="11" rx="2"></rect><path d="M5.8 10.5h5M5.8 13.5h3"></path><ellipse cx="18" cy="12" rx="3.2" ry="4.2"></ellipse></svg>' +
      '<span style="font-size: 13.5px; color: var(--m-ink-400); letter-spacing: -0.02em;">결제 내역이 없습니다.</span>' +
    '</div>' : "";

  return '' +
  '<div style="background: var(--m-surface-gray); min-height: 812px; display: flex; flex-direction: column;">' +
    appBar("결제 내역", "goBack") +
    '<div style="padding: 14px 16px; background: #fff;">' +
      '<div class="h-bd" data-act="openStatus" style="height: 48px; padding: 0 14px; border: 1px solid var(--m-line-300); border-radius: 8px; background: #fff; display: flex; align-items: center; gap: 8px; cursor: pointer; transition: border-color 140ms ease;">' +
        '<span style="flex: 1; font-size: 14px; color: var(--m-ink-900); letter-spacing: -0.02em;">' + esc(label) + '</span>' + chevDown() +
      '</div>' +
    '</div>' +
    '<div style="flex: 1; padding: 14px 16px 20px; display: flex; flex-direction: column; gap: 12px;">' + list + empty + '</div>' +
    '<div style="position: sticky; bottom: 0; display: flex; align-items: center; padding: 12px 20px 16px; background: #fff; border-top: 1px solid var(--m-line-200);">' +
      '<span style="flex: 1; font-size: 12.5px; color: var(--m-ink-500); letter-spacing: -0.02em;">총 ' + (rows.length === 0 ? "0" : "226") + '</span>' +
      '<div style="display: flex; align-items: center; gap: 10px;">' + pagerArrows(true) + pager([1, 2, 3], S.page, "payPage") + pagerArrows(false) + '</div>' +
    '</div>' +
  '</div>';
}

function sheetStatus() {
  var sel = S.draft || S.statuses;
  var all = sel.length === STATUS_ALL.length;
  var opts = checkboxRow("모든 상태", all, "statusOpt", -1) +
    STATUS_ALL.map(function (st, i) { return checkboxRow(st, sel.indexOf(st) >= 0, "statusOpt", i); }).join("");
  var inner = '<div style="margin-top: 18px; display: flex; flex-direction: column;">' + opts + '</div>' +
    '<div class="h-btn" data-act="applyStatus" style="margin: 18px 0 8px; height: 52px; border-radius: 999px; background: var(--m-orange); color: #fff; font-size: 16px; font-weight: 700; letter-spacing: -0.02em; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 140ms ease;">확인</div>';
  return sheetShell("상태 선택", "closeStatus", inner, 45);
}

/* ── 10. 이용권 구매 ─────────────────────────────────────── */

function packRows(list, key) {
  return list.map(function (p, i) {
    return '<div class="h-orange50" data-act="packPick" data-key="' + key + '" data-i="' + i + '" style="display: flex; align-items: center; gap: 10px; padding: 13px 14px; border-bottom: 1px solid var(--m-line-200); cursor: pointer; transition: background 120ms ease;">' +
      '<span style="width: 88px; flex: none; font-size: 14px; font-weight: 700; color: var(--m-ink-900); letter-spacing: -0.02em;">' + num(p.amount) + ' 원</span>' +
      '<span style="width: 58px; flex: none; font-size: 13.5px; font-weight: 500; color: var(--m-ink-800); letter-spacing: -0.02em; white-space: nowrap;">' + p.total + '건</span>' +
      (p.bonus > 0 ? '<span style="font-size: 12px; color: var(--m-ink-400); letter-spacing: -0.02em; white-space: nowrap;">(' + p.base + '건 <span style="color: var(--m-green); font-weight: 700;">+ ' + p.bonus + '건</span>)</span>' : "") +
    '</div>';
  }).join("");
}

/* 문서/이전 이용권 셀렉트 — 통합 이용권 도입으로 화면에서는 숨김(display:none) */
function hiddenPackSelect(key) {
  var list = key === "doc" ? DOC : TR;
  var idx = key === "doc" ? S.doc : S.tr;
  var p = idx === null ? null : list[idx];
  var open = S.open === key;
  return '' +
  '<div style="display: none;">' +
    '<div class="h-bd" data-act="togglePack" data-key="' + key + '" style="height: 48px; padding: 0 14px; border: 1px solid var(--m-line-300); border-radius: 8px; background: #fff; display: flex; align-items: center; gap: 8px; cursor: pointer; transition: border-color 140ms ease;">' +
      '<span style="flex: 1; font-size: 14px; letter-spacing: -0.02em; color: ' + (p ? "var(--m-ink-900)" : "var(--m-ink-400)") + ';">' + (p ? p.total + "건 · " + won(p.amount) : "선택") + '</span>' +
      (p ? '<div class="h-x" data-act="clearPack" data-key="' + key + '" style="flex: none; width: 20px; height: 20px; margin-right: 2px; border-radius: 999px; background: var(--m-surface-gray); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 140ms ease;"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#808080" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12"></path><path d="M18 6 6 18"></path></svg></div>' : "") +
      chevDown(open ? "180deg" : "0deg") +
    '</div>' +
    (open ? '<div style="position: absolute; top: 100%; left: 0; right: 0; z-index: 20; margin-top: 6px; background: #fff; border: 1px solid var(--m-line-300); border-radius: 8px; box-shadow: 0 6px 24px rgba(0,0,0,.16); overflow: hidden; animation: m-fade-in 140ms ease-out both;">' + packRows(list, key) + '</div>' : "") +
  '</div>';
}

function screenBuy() {
  var n = parseInt(S.qty, 10) || 0;
  var valid = n >= 10;
  var total = valid ? n * 1100 : 0;

  var quicks = [20, 30, 40, 50].map(function (v) {
    var on = n === v;
    return '<div data-act="qtyQuick" data-i="' + v + '" style="flex: 1; height: 38px; border-radius: 999px; border: 1px solid ' + (on ? "var(--m-orange)" : "var(--m-line-300)") +
      '; background: ' + (on ? "var(--m-orange-50)" : "#fff") + '; color: ' + (on ? "var(--m-orange)" : "var(--m-ink-700)") +
      '; font-size: 13.5px; font-weight: 700; letter-spacing: -0.02em; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 140ms ease;">' + v + '건</div>';
  }).join("");

  return '' +
  '<div style="background: #ffffff; min-height: 780px; display: flex; flex-direction: column;">' +
    '<div style="display: flex; align-items: center; gap: 8px; padding: 10px 16px 14px; background: #ffffff;">' +
      '<div class="h-gray" data-act="goBack" style="width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; cursor: pointer; border-radius: 8px;">' + chevL() + '</div>' +
      '<h1 style="flex: 1; margin: 0; font-size: 18px; font-weight: 700; color: var(--m-ink-900); letter-spacing: -0.02em;">이용권 구매</h1>' +
    '</div>' +

    '<div style="padding: 10px 20px 0;">' +
      '<div style="font-size: 19px; font-weight: 700; color: var(--m-ink-900); letter-spacing: -0.03em; line-height: 1.4;">구매할 이용권을 선택해주세요.</div>' +
      '<div style="margin-top: 6px; font-size: 12.5px; color: var(--m-ink-500); letter-spacing: -0.02em;">1건당 1,100원(부가세 포함) · 최소 10건부터 구매할 수 있습니다.</div>' +
    '</div>' +

    '<div style="padding: 22px 20px 0; display: flex; flex-direction: column; gap: 18px;">' +
      '<div>' +
        '<div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">' +
          '<span style="font-size: 13px; font-weight: 700; color: var(--m-ink-800); letter-spacing: -0.02em;">구매 수량</span>' +
          '<span style="font-size: 11.5px; color: var(--m-ink-400); letter-spacing: -0.02em;">잔여 ' + availLabel() + '</span>' +
        '</div>' +
        '<div style="height: 52px; padding: 0 6px 0 14px; border: 1px solid ' + (n > 0 && !valid ? "var(--m-red)" : valid ? "var(--m-orange)" : "var(--m-line-300)") +
          '; border-radius: 8px; background: #fff; display: flex; align-items: center; gap: 8px; transition: border-color 140ms ease;">' +
          '<input data-inp="qty" value="' + esc(S.qty) + '" placeholder="수량입력" inputmode="numeric" style="flex: 1; min-width: 0; height: 48px; border: none; outline: none; background: transparent; font-family: inherit; font-size: 14px; font-weight: 400; color: var(--m-ink-900); letter-spacing: -0.02em;">' +
          '<span style="font-size: 14px; font-weight: 500; color: var(--m-ink-500);">건</span>' +
          '<div style="display: flex; align-items: center; gap: 4px; padding-left: 6px;">' +
            '<div data-act="qtyDec" style="width: 38px; height: 38px; border-radius: 8px; background: ' + (n > 10 ? "var(--m-surface-gray)" : "#fafbfc") +
              '; display: flex; align-items: center; justify-content: center; cursor: ' + (n > 10 ? "pointer" : "not-allowed") + '; transition: background 140ms ease;">' +
              '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="' + (n > 10 ? "#555b63" : "#d2d2d2") + '" stroke-width="2.2" stroke-linecap="round"><path d="M5.5 12h13"></path></svg>' +
            '</div>' +
            '<div class="h-x" data-act="qtyInc" style="width: 38px; height: 38px; border-radius: 8px; background: var(--m-orange-50); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 140ms ease;">' +
              '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff6f0f" stroke-width="2.2" stroke-linecap="round"><path d="M12 5.5v13M5.5 12h13"></path></svg>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div style="margin-top: 10px; display: flex; gap: 8px;">' + quicks + '</div>' +
        '<div style="margin-top: 9px; font-size: 11.5px; color: ' + (n > 0 && !valid ? "var(--m-red)" : "var(--m-ink-400)") + '; letter-spacing: -0.02em;">' +
          (n > 0 && !valid ? "최소 10건부터 구매할 수 있습니다." : "1건당 1,100원 (부가세 포함)") + '</div>' +
      '</div>' +
      hiddenPackSelect("doc") +
      hiddenPackSelect("tr") +
    '</div>' +

    '<div style="margin: 24px 20px 0; padding: 16px 16px 18px; background: var(--m-surface-gray); border-radius: 12px;">' +
      '<div style="display: flex; align-items: center; gap: 6px;">' + infoIcon(15, "#555b63") +
        '<span style="font-size: 13px; font-weight: 700; color: var(--m-ink-800); letter-spacing: -0.02em;">이용권 차감 안내</span>' +
      '</div>' +
      '<div style="margin-top: 10px; font-size: 12px; line-height: 1.7; color: var(--m-ink-600); letter-spacing: -0.02em;">전자계약과 온라인이전 서비스 이용을 위한 이용권으로 각 서비스별 차감 안내사항은 아래와 같습니다.</div>' +
      '<div style="margin-top: 12px; font-size: 12px; font-weight: 700; color: var(--m-ink-700); letter-spacing: -0.02em;">전자계약</div>' +
      '<ul style="margin: 5px 0 0; padding-left: 16px; font-size: 11.5px; line-height: 1.75; color: var(--m-ink-500); letter-spacing: -0.02em;">' +
        '<li>계약 시작 시 이용권이 사용되며 해당 이용권은 다른 계약에 사용할 수 없습니다.</li>' +
        '<li>계약 완료 시 이용권이 차감되며, 취소 시 복원됩니다.</li>' +
        '<li>이용권은 매입 1건, 매도 2건 차감됩니다.</li>' +
        '<li>단, 매도 시 성능점검기록부가 없는 경우 1건만 차감됩니다.</li>' +
      '</ul>' +
      '<div style="margin-top: 14px; font-size: 12px; font-weight: 700; color: var(--m-ink-700); letter-spacing: -0.02em;">이전</div>' +
      '<ul style="margin: 5px 0 0; padding-left: 16px; font-size: 11.5px; line-height: 1.75; color: var(--m-ink-500); letter-spacing: -0.02em;">' +
        '<li>이전 신청 시 이용권이 사용되며 해당 이용권은 다른 계약에 사용할 수 없습니다.</li>' +
        '<li>이전 완료 시 이용권이 차감되며, 취소나 불가 시 복원됩니다.</li>' +
        '<li>이용권은 5건 차감됩니다.</li>' +
      '</ul>' +
    '</div>' +

    '<div style="flex: 1; min-height: 28px;"></div>' +

    '<div style="position: sticky; bottom: 0; background: #fff; box-shadow: 0 -2px 12px rgba(0,0,0,.06);">' +
      '<div style="display: flex; align-items: center; justify-content: space-between; padding: 14px 20px; background: var(--m-orange-50);">' +
        '<span style="font-size: 14px; font-weight: 500; color: var(--m-ink-800); letter-spacing: -0.02em;">합계</span>' +
        '<span style="font-size: 20px; font-weight: 900; color: ' + (total > 0 ? "var(--m-orange)" : "var(--m-ink-900)") + '; letter-spacing: -0.03em;">' + won(total) + '</span>' +
      '</div>' +
      '<div style="padding: 12px 16px 22px;">' +
        (total > 0
          ? '<div class="h-primary" data-act="pay" style="height: 52px; border-radius: 10px; background: var(--m-orange); color: #fff; font-size: 16px; font-weight: 700; letter-spacing: -0.02em; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 14px rgba(255,111,15,.28); transition: background 140ms ease, transform 140ms ease;">결제하기</div>'
          : '<div style="height: 52px; border-radius: 10px; background: var(--m-line-300); color: #fff; font-size: 16px; font-weight: 700; letter-spacing: -0.02em; display: flex; align-items: center; justify-content: center; cursor: not-allowed;">결제하기</div>') +
      '</div>' +
    '</div>' +
  '</div>';
}

/* ── 11. 공지사항 ────────────────────────────────────────── */

function screenNotice() {
  var body;
  if (S.noticeId == null) {
    body = '<div style="flex: 1; display: flex; flex-direction: column;">' + NOTICES.map(function (n, i) {
      return '' +
      '<div class="h-gray" data-act="noticeOpen" data-i="' + i + '" style="padding: 15px 20px; border-bottom: 1px solid var(--m-line-200); cursor: pointer; transition: background 140ms ease;">' +
        '<div style="display: flex; align-items: center; gap: 6px;">' +
          (n.pinned ? '<span style="height: 19px; padding: 0 6px; border-radius: 4px; background: #ffe9d9; color: var(--m-orange); font-size: 10.5px; font-weight: 700; display: inline-flex; align-items: center; letter-spacing: -0.02em;">중요</span>' : "") +
          '<span style="font-size: 11.5px; color: var(--m-ink-400); letter-spacing: -0.02em;">' + esc(n.cat) + '</span>' +
        '</div>' +
        '<div style="margin-top: 5px; display: flex; align-items: center; gap: 10px;">' +
          '<span style="flex: 1; min-width: 0; font-size: 14.5px; font-weight: 500; color: var(--m-ink-900); letter-spacing: -0.02em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">' + esc(n.title) + '</span>' +
          chevR(16, "#c3c3c3") +
        '</div>' +
        '<div style="margin-top: 4px; font-size: 12px; color: var(--m-ink-400); letter-spacing: -0.02em;">' + n.date + '</div>' +
      '</div>';
    }).join("") + '</div>';
  } else {
    var n = NOTICES[S.noticeId];
    body = '' +
    '<div style="flex: 1; display: flex; flex-direction: column;">' +
      '<div style="padding: 20px 20px 16px; border-bottom: 1px solid var(--m-line-200);">' +
        '<span style="font-size: 11.5px; color: var(--m-ink-400); letter-spacing: -0.02em;">' + esc(n.cat) + '</span>' +
        '<h2 style="margin: 6px 0 0; font-size: 17px; font-weight: 700; line-height: 1.45; color: var(--m-ink-900); letter-spacing: -0.03em; text-wrap: pretty;">' + esc(n.title) + '</h2>' +
        '<div style="margin-top: 8px; font-size: 12px; color: var(--m-ink-400); letter-spacing: -0.02em;">' + n.date + '</div>' +
      '</div>' +
      '<div style="flex: 1; padding: 20px; display: flex; flex-direction: column; gap: 14px;">' +
        n.body.map(function (t) {
          return '<p style="margin: 0; font-size: 14px; line-height: 1.75; color: var(--m-ink-800); letter-spacing: -0.02em; text-wrap: pretty;">' + esc(t) + '</p>';
        }).join("") +
      '</div>' +
      '<div style="padding: 12px 20px 20px; border-top: 1px solid var(--m-line-200);">' +
        '<div class="h-out" data-act="noticeToList" style="height: 48px; border-radius: 8px; border: 1px solid var(--m-line-300); color: var(--m-ink-800); font-size: 15px; font-weight: 700; letter-spacing: -0.02em; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 140ms ease;">목록으로</div>' +
      '</div>' +
    '</div>';
  }

  return '<div style="background: #fff; min-height: 812px; display: flex; flex-direction: column;">' +
    appBar("공지사항", "noticeBack") + body + '</div>';
}

/* ── 12. 고객센터 ────────────────────────────────────────── */

function inquiryList() { return S.inquiries || INQUIRIES; }

function screenCs() {
  var body = S.csStep === "form" ? csForm() : csList();
  return '<div style="background: var(--m-surface-gray); min-height: 812px; display: flex; flex-direction: column;">' +
    appBar(S.csStep === "form" ? "문의하기" : "고객센터", "csBack") + body + '</div>';
}

function csList() {
  var items = inquiryList().map(function (q, i) {
    var open = S.csOpen === i;
    var answered = !!q.answer;
    return '' +
    '<div data-act="inquiryToggle" data-i="' + i + '" style="padding: 14px 4px; border-bottom: 1px solid var(--m-line-200); cursor: pointer;">' +
      '<div style="display: flex; align-items: center; gap: 8px;">' +
        '<span style="height: 20px; padding: 0 7px; border-radius: 4px; background: ' + (answered ? "#ffe9d9" : "var(--m-surface-gray)") +
          '; color: ' + (answered ? "var(--m-orange)" : "var(--m-ink-500)") + '; font-size: 10.5px; font-weight: 700; display: inline-flex; align-items: center; letter-spacing: -0.02em;">' + (answered ? "답변완료" : "접수") + '</span>' +
        '<span style="font-size: 11.5px; color: var(--m-ink-400); letter-spacing: -0.02em;">' + esc(q.cat) + '</span>' +
        '<span style="flex: 1;"></span>' +
        '<span style="font-size: 11.5px; color: var(--m-ink-400); letter-spacing: -0.02em;">' + esc(q.date) + '</span>' +
      '</div>' +
      '<div style="margin-top: 6px; font-size: 14.5px; font-weight: 500; color: var(--m-ink-900); letter-spacing: -0.02em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">' + esc(q.title) + '</div>' +
      (open ? '<div style="margin-top: 12px; display: flex; flex-direction: column; gap: 10px;">' +
        '<div style="padding: 13px 14px; background: var(--m-surface-gray); border-radius: 10px; font-size: 13.5px; line-height: 1.7; color: var(--m-ink-800); letter-spacing: -0.02em;">' + esc(q.body) + '</div>' +
        (answered ? '<div style="padding: 13px 14px; background: #fff8f2; border: 1px solid #ffe0c7; border-radius: 10px;">' +
          '<div style="font-size: 11.5px; font-weight: 700; color: var(--m-orange); letter-spacing: -0.02em;">답변 · ' + esc(q.answeredAt) + '</div>' +
          '<div style="margin-top: 6px; font-size: 13.5px; line-height: 1.7; color: var(--m-ink-800); letter-spacing: -0.02em;">' + esc(q.answer) + '</div>' +
        '</div>' : "") +
      '</div>' : "") +
    '</div>';
  }).join("");

  return '' +
  '<div style="flex: 1; display: flex; flex-direction: column;">' +
    '<div style="padding: 16px 20px 18px; background: #fff; display: flex; align-items: center; gap: 14px;">' +
      '<div style="flex: 1; min-width: 0;">' +
        '<div style="font-size: 12.5px; color: var(--m-ink-500); letter-spacing: -0.02em;">고객센터</div>' +
        '<div style="margin-top: 3px; font-size: 20px; font-weight: 900; color: var(--m-ink-900); letter-spacing: -0.03em;">1566-3639</div>' +
        '<div style="margin-top: 4px; font-size: 12px; color: var(--m-ink-400); letter-spacing: -0.02em;">평일 09:30 ~ 17:00 (점심 12:30 ~ 13:30)</div>' +
      '</div>' +
      '<div class="h-out" style="flex: none; height: 40px; padding: 0 16px; border-radius: 999px; border: 1px solid var(--m-line-300); display: flex; align-items: center; gap: 6px; font-size: 13.5px; font-weight: 500; color: var(--m-ink-800); letter-spacing: -0.02em; cursor: pointer; transition: all 140ms ease;">' +
        '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4.5h3.4l1.6 4-2.1 1.4a11 11 0 0 0 5.2 5.2l1.4-2.1 4 1.6V18a1.5 1.5 0 0 1-1.6 1.5C9.7 19 5 14.3 4.5 6.1A1.5 1.5 0 0 1 5 4.5z"></path></svg>전화' +
      '</div>' +
    '</div>' +
    '<div style="height: 8px; background: var(--m-surface-gray);"></div>' +
    '<div style="padding: 16px 20px 10px; background: #fff; display: flex; align-items: center; justify-content: space-between; gap: 10px;">' +
      '<span style="font-size: 15px; font-weight: 700; color: var(--m-ink-900); letter-spacing: -0.02em;">문의내역</span>' +
      '<div class="h-btn" data-act="csNew" style="height: 36px; padding: 0 15px; border-radius: 999px; background: var(--m-orange); color: #fff; font-size: 13.5px; font-weight: 700; letter-spacing: -0.02em; display: flex; align-items: center; gap: 5px; cursor: pointer; transition: background 140ms ease;">' +
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"></path></svg>문의하기' +
      '</div>' +
    '</div>' +
    '<div style="flex: 1; padding: 6px 16px 20px; background: #fff; display: flex; flex-direction: column;">' + items + '</div>' +
  '</div>';
}

function csForm() {
  var can = !!(S.qType && S.qTitle.trim() && S.qBody.trim());
  var types = QTYPES.map(function (t, i) {
    return '<div class="h-gray" data-act="qTypePick" data-i="' + i + '" style="padding: 13px 14px; font-size: 14px; color: var(--m-ink-900); letter-spacing: -0.02em; cursor: pointer; border-bottom: 1px solid var(--m-line-200);">' + t + '</div>';
  }).join("");

  return '' +
  '<div style="flex: 1; display: flex; flex-direction: column; background: #fff;">' +
    '<div style="padding: 18px 16px 0; display: flex; flex-direction: column; gap: 16px;">' +
      '<div>' +
        '<div style="font-size: 13px; font-weight: 700; color: var(--m-ink-800); letter-spacing: -0.02em;"><span style="color: var(--m-orange);">*</span> 문의 유형</div>' +
        '<div style="margin-top: 8px; position: relative;">' +
          '<div class="h-bd" data-act="toggleQType" style="height: 50px; padding: 0 14px; border: 1px solid var(--m-line-300); border-radius: 8px; background: #fff; display: flex; align-items: center; gap: 8px; cursor: pointer;">' +
            '<span style="flex: 1; font-size: 14px; letter-spacing: -0.02em; color: ' + (S.qType ? "var(--m-ink-900)" : "var(--m-ink-400)") + ';">' + esc(S.qType || "문의 유형을 선택하세요") + '</span>' +
            chevDown(S.qTypeOpen ? "180deg" : "0deg") +
          '</div>' +
          (S.qTypeOpen ? '<div style="position: absolute; top: 100%; left: 0; right: 0; z-index: 20; margin-top: 6px; background: #fff; border: 1px solid var(--m-line-300); border-radius: 8px; box-shadow: 0 6px 24px rgba(0,0,0,.16); overflow: hidden;">' + types + '</div>' : "") +
        '</div>' +
      '</div>' +
      '<div>' +
        '<div style="font-size: 13px; font-weight: 700; color: var(--m-ink-800); letter-spacing: -0.02em;"><span style="color: var(--m-orange);">*</span> 제목</div>' +
        '<input class="inp" data-inp="qTitle" value="' + esc(S.qTitle) + '" placeholder="제목을 입력하세요" style="margin-top: 8px; width: 100%; box-sizing: border-box; height: 50px; padding: 0 14px; border: 1px solid var(--m-line-300); border-radius: 8px; font-family: inherit; font-size: 14px; color: var(--m-ink-900); letter-spacing: -0.02em; outline: none; background: #fff;">' +
      '</div>' +
      '<div>' +
        '<div style="font-size: 13px; font-weight: 700; color: var(--m-ink-800); letter-spacing: -0.02em;"><span style="color: var(--m-orange);">*</span> 문의 내용</div>' +
        '<div style="margin-top: 8px; position: relative;">' +
          '<textarea class="inp" data-inp="qBody" placeholder="문의하실 내용을 자세히 적어주세요." style="width: 100%; box-sizing: border-box; height: 150px; padding: 13px 14px 28px; border: 1px solid var(--m-line-300); border-radius: 8px; font-family: inherit; font-size: 14px; line-height: 1.6; color: var(--m-ink-900); letter-spacing: -0.02em; outline: none; resize: none; background: #fff;">' + esc(S.qBody) + '</textarea>' +
          '<span style="position: absolute; right: 12px; bottom: 12px; font-size: 11.5px; color: var(--m-ink-400);">' + S.qBody.length + '/300자</span>' +
        '</div>' +
      '</div>' +
      '<div>' +
        '<div style="font-size: 13px; font-weight: 700; color: var(--m-ink-800); letter-spacing: -0.02em;">답변 받을 연락처</div>' +
        '<input class="inp" data-inp="qPhone" value="' + esc(S.qPhone) + '" placeholder="휴대폰번호 입력" inputmode="tel" style="margin-top: 8px; width: 100%; box-sizing: border-box; height: 50px; padding: 0 14px; border: 1px solid var(--m-line-300); border-radius: 8px; font-family: inherit; font-size: 14px; color: var(--m-ink-900); letter-spacing: -0.02em; outline: none; background: #fff;">' +
      '</div>' +
    '</div>' +
    '<div style="flex: 1;"></div>' +
    '<div style="padding: 14px 16px 22px; background: #fff;">' +
      (can
        ? '<div class="h-btn" data-act="submitQ" style="height: 52px; border-radius: 8px; background: var(--m-orange); color: #fff; font-size: 16px; font-weight: 700; letter-spacing: -0.02em; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 140ms ease;">문의 등록</div>'
        : '<div style="height: 52px; border-radius: 8px; background: var(--m-line-300); color: #fff; font-size: 16px; font-weight: 700; letter-spacing: -0.02em; display: flex; align-items: center; justify-content: center;">문의 등록</div>') +
    '</div>' +
  '</div>';
}

/* ── 13. 더보기 ──────────────────────────────────────────── */

function moreRow(opts) {
  return '' +
  '<div class="' + (opts.hover || "h-gray") + '" ' + (opts.act ? 'data-act="' + opts.act + '" ' : "") +
    'style="display: flex; align-items: center; gap: 14px; padding: 13px 20px; cursor: pointer; transition: background 140ms ease;">' +
    opts.icon +
    '<span style="flex: 1; font-size: 15px; font-weight: 500; color: var(--m-ink-900); letter-spacing: -0.02em;">' + opts.label + '</span>' +
    (opts.right || "") + chevR(18, "#b2b2b2") +
  '</div>';
}

function screenMore() {
  var cashTotal = num(RWD2.filter(function (r) { return r.unit === "cash"; })
    .reduce(function (s, r) { return s + r.value; }, 0));
  var g = function (d) { return '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#808080" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + d + '</svg>'; };

  return '' +
  '<div style="position: relative; z-index: 35; background: #fff; min-height: 800px; animation: m-sheet-up 280ms cubic-bezier(.2,0,0,1) both;">' +
    '<div style="display: flex; align-items: center; justify-content: space-between; padding: 14px 20px 8px;">' +
      '<h1 style="margin: 0; font-size: 18px; font-weight: 700; color: var(--m-ink-900); letter-spacing: -0.02em;">더보기</h1>' +
      '<div class="h-gray" data-act="goHome" style="width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; cursor: pointer; border-radius: 8px;">' +
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2e2e2e" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12"></path><path d="M18 6 6 18"></path></svg>' +
      '</div>' +
    '</div>' +

    '<div style="position: relative; z-index: 1; background: var(--m-orange-50); padding: 20px; margin-top: 4px; overflow: hidden; box-shadow: 0 4px 14px rgba(46,46,46,.10);">' +
      '<div style="position: absolute; top: -46px; right: -34px; width: 150px; height: 150px; border-radius: 999px; background: #ffe3cf; opacity: .55;"></div>' +
      '<div style="position: relative; display: flex; align-items: center; gap: 12px;">' +
        '<div style="flex: 1; min-width: 0;">' +
          '<div style="font-size: 21px; font-weight: 700; color: var(--m-ink-900); letter-spacing: -0.03em; line-height: 1.2;">김딜러 <span style="font-weight: 500; color: var(--m-ink-600);">님</span></div>' +
          '<div style="margin-top: 4px; display: flex; align-items: center; gap: 6px;">' +
            '<span style="font-size: 12px; color: var(--m-ink-500); letter-spacing: -0.02em;">오토카모터스</span>' +
          '</div>' +
        '</div>' +
        '<div class="h-chip" style="flex: none; display: inline-flex; align-items: center; gap: 6px; height: 34px; padding: 0 13px; background: #fff; border-radius: 999px; box-shadow: 0 2px 8px rgba(0,0,0,.08); cursor: pointer; transition: transform 140ms ease, box-shadow 140ms ease;">' +
          '<span style="display: flex; align-items: center; justify-content: center; width: 20px; height: 14px; border-radius: 4px; background: var(--m-orange);">' +
            '<svg width="8" height="8" viewBox="0 0 10 10" fill="#fff"><path d="M2 1.4v7.2l6.2-3.6z"></path></svg>' +
          '</span>' +
          '<span style="font-size: 12.5px; font-weight: 500; color: var(--m-ink-800); letter-spacing: -0.03em;">영상가이드</span>' +
        '</div>' +
      '</div>' +
      '<div class="h-white" data-act="goUse" style="margin-top: 14px; position: relative; display: flex; align-items: center; gap: 8px; height: 40px; padding: 0 6px 0 14px; background: rgba(255,255,255,.72); border-radius: 999px; cursor: pointer; transition: background 140ms ease;">' +
        '<span style="font-size: 12.5px; color: var(--m-ink-600); letter-spacing: -0.02em;">이용권</span>' +
        '<span style="display: flex; align-items: baseline; gap: 1px;"><span style="font-size: 15px; font-weight: 900; color: var(--m-ink-900); letter-spacing: -0.03em;">' + availNum() + '</span><span style="font-size: 12px; font-weight: 700; color: var(--m-ink-900);">건</span></span>' +
        '<span style="width: 1px; height: 11px; background: #dadada;"></span>' +
        '<span style="font-size: 12px; color: var(--m-ink-400); letter-spacing: -0.02em;">사용 중 ' + INUSE + '건</span>' +
        '<span style="flex: 1;"></span>' + chevR(16, "#b2b2b2") +
      '</div>' +
    '</div>' +

    '<div style="padding: 22px 0 8px;">' +
      '<div style="padding: 0 20px 4px; font-size: 12px; font-weight: 700; color: var(--m-ink-400); letter-spacing: -0.02em;">문서함</div>' +
      moreRow({ label: "진행 중 문서함", icon: g('<path d="M3.5 7.5A2 2 0 0 1 5.5 5.5h3.2l1.6 2h8.2a2 2 0 0 1 2 2v7.2a2 2 0 0 1-2 2H5.5a2 2 0 0 1-2-2V7.5z"></path>') }) +
      moreRow({ label: "완료 문서함", icon: g('<path d="M3.5 7.5A2 2 0 0 1 5.5 5.5h3.2l1.6 2h8.2a2 2 0 0 1 2 2v7.2a2 2 0 0 1-2 2H5.5a2 2 0 0 1-2-2V7.5z"></path><path d="M9.2 13.6l2.3 2.3 4.2-4.6"></path>') }) +
    '</div>' +

    '<div style="padding: 14px 0 8px;">' +
      '<div style="padding: 0 20px 4px; font-size: 12px; font-weight: 700; color: var(--m-ink-400); letter-spacing: -0.02em;">설정</div>' +
      moreRow({ label: "내 정보", icon: g('<circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="10" r="2.6"></circle><path d="M6.8 18.4a5.6 5.6 0 0 1 10.4 0"></path>') }) +
      moreRow({ label: "내 서명", icon: g('<path d="M3.5 15.5c1.8 0 2.2-8 4-8s.6 8 2.4 8 1.4-5 3.2-5 1.2 5 3 5h4.4"></path>'),
        right: '<span style="display: inline-flex; align-items: center; height: 22px; padding: 0 8px; border-radius: 4px; background: #fdecec; color: var(--m-red); font-size: 11px; font-weight: 700;">미등록</span>' }) +
    '</div>' +

    '<div style="padding: 14px 0 8px;">' +
      '<div style="padding: 0 20px 4px; font-size: 12px; font-weight: 700; color: var(--m-ink-400); letter-spacing: -0.02em;">결제/정산</div>' +
      moreRow({ act: "goBuy", hover: "h-orange50", label: "이용권 구매",
        icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff6f0f" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 8.5A1.5 1.5 0 0 1 5 7h14a1.5 1.5 0 0 1 1.5 1.5v1.8a1.7 1.7 0 0 0 0 3.4v1.8A1.5 1.5 0 0 1 19 17H5a1.5 1.5 0 0 1-1.5-1.5v-1.8a1.7 1.7 0 0 0 0-3.4z"></path><path d="M12 9.5v5"></path></svg>' }) +
      moreRow({ act: "goPay", label: "결제내역", icon: g('<path d="M6 3.5h12v17l-2-1.4-2 1.4-2-1.4-2 1.4-2-1.4-2 1.4z"></path><path d="M9 8.5h6M9 12h6"></path>') }) +
      moreRow({ act: "goUse", label: "사용현황", icon: g('<rect x="4" y="4" width="16" height="16" rx="2.5"></rect><path d="M8 15.5v-3M12 15.5v-6M16 15.5v-4.5"></path>') }) +
      moreRow({ act: "goRwd", label: "리워드 내역",
        icon: g('<rect x="3.5" y="8.5" width="17" height="11.5" rx="2"></rect><path d="M3.5 12.5h17M12 8.5V20"></path><path d="M12 8.5c-3.2 0-4.6-.6-4.6-2.2S9.2 4.5 12 8.5zM12 8.5c3.2 0 4.6-.6 4.6-2.2S14.8 4.5 12 8.5z"></path>'),
        right: '<span style="font-size: 13px; font-weight: 700; color: var(--m-green);">' + cashTotal + '원 지급완료</span>' }) +
    '</div>' +

    '<div style="margin: 12px 20px 0; border-top: 1px solid var(--m-line-200);"></div>' +
    '<div style="padding: 10px 0 28px; display: flex; flex-direction: column;">' +
      '<span class="h-tx9" data-act="goNotice" style="padding: 11px 20px; font-size: 13.5px; color: var(--m-ink-500); cursor: pointer; transition: color 140ms ease;">공지사항</span>' +
      '<span class="h-tx9" data-act="goCs" style="padding: 11px 20px; font-size: 13.5px; color: var(--m-ink-500); cursor: pointer; transition: color 140ms ease;">고객센터</span>' +
      '<span class="h-txr" style="padding: 11px 20px; font-size: 13.5px; color: var(--m-ink-400); cursor: pointer; transition: color 140ms ease;">로그아웃</span>' +
    '</div>' +
  '</div>';
}

/* ── 14. 계약 작성 바텀시트 ──────────────────────────────── */

function contractOption(icon, bg, title, desc) {
  return '' +
  '<div class="h-tile" data-act="closeSheet" style="display: flex; align-items: center; gap: 14px; padding: 16px; border: 1px solid var(--m-line-300); border-radius: 12px; cursor: pointer;">' +
    '<div style="flex: none; width: 44px; height: 44px; border-radius: 12px; background: ' + bg + '; display: flex; align-items: center; justify-content: center;">' +
      '<svg width="26" height="26" viewBox="0 0 32 32" fill="none">' + icon + '</svg>' +
    '</div>' +
    '<div style="flex: 1;">' +
      '<div style="font-size: 15px; font-weight: 700; color: var(--m-ink-900);">' + title + '</div>' +
      '<div style="margin-top: 3px; font-size: 12px; color: var(--m-ink-500);">' + desc + '</div>' +
    '</div>' + chevR(18, "#b2b2b2") +
  '</div>';
}

function sheetContract() {
  return '' +
  '<div style="position: absolute; inset: 0; z-index: 40; display: flex; flex-direction: column; justify-content: flex-end;">' +
    '<div data-act="closeSheet" style="position: absolute; inset: 0; background: var(--m-overlay); animation: m-fade-in 200ms ease-out both;"></div>' +
    '<div style="position: relative; background: #fff; border-radius: 20px 20px 0 0; padding: 24px 20px 20px; box-shadow: 0 -6px 24px rgba(0,0,0,.16); animation: m-sheet-up 280ms cubic-bezier(.2,0,0,1) both;">' +
      '<div style="position: absolute; top: 10px; left: 50%; width: 40px; height: 4px; margin-left: -20px; border-radius: 999px; background: var(--m-line-300);"></div>' +
      '<div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;">' +
        '<div>' +
          '<div style="font-size: 18px; font-weight: 700; color: var(--m-ink-900); letter-spacing: -0.02em;">어떤 계약을 작성하시나요?</div>' +
          '<div style="margin-top: 6px; font-size: 13px; color: var(--m-ink-500); line-height: 1.5;">계약 시작 시 이용권이 차감되며, 해당 이용권은<br>다른 계약에 사용할 수 없습니다.</div>' +
        '</div>' +
        '<div data-act="closeSheet" style="flex: none; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; cursor: pointer;">' +
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#808080" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12"></path><path d="M18 6 6 18"></path></svg>' +
        '</div>' +
      '</div>' +
      '<div style="margin-top: 20px; display: flex; flex-direction: column; gap: 10px;">' +
        contractOption(
          '<rect x="7" y="5" width="18" height="22" rx="3" fill="#ff6f0f"></rect><path d="M12 12h8M12 17h8" stroke="#fff" stroke-width="2" stroke-linecap="round"></path><path d="M16 27l-4-4h8l-4 4z" fill="#ff6f0f"></path>',
          "#fff4ec", "매입 계약 작성", '차량을 매입할 때 · 이용권 <span style="color: var(--m-orange); font-weight: 700;">1건</span> 차감') +
        contractOption(
          '<rect x="7" y="5" width="18" height="22" rx="3" fill="#005cb9"></rect><path d="M12 12h8M12 17h8" stroke="#fff" stroke-width="2" stroke-linecap="round"></path><path d="M16 27l4-4h-8l4 4z" fill="#005cb9"></path>',
          "#f0f5fb", "매도 계약 작성", '차량을 판매할 때 · 이용권 <span style="color: var(--m-orange); font-weight: 700;">2건</span> 차감') +
      '</div>' +
      '<div style="margin-top: 16px; padding: 12px 14px; background: var(--m-surface-gray); border-radius: 12px; display: flex; align-items: center; justify-content: space-between;">' +
        '<span style="font-size: 12px; color: var(--m-ink-600);">사용 가능한 이용권</span>' +
        '<span style="font-size: 13px; font-weight: 700; color: var(--m-ink-900);">' + availLabel() + '</span>' +
      '</div>' +
    '</div>' +
  '</div>';
}

/* ── 15. 렌더 ────────────────────────────────────────────── */

function render() {
  var out = "";

  if (S.screen === "home")   out += screenHome();
  if (S.screen === "noti")   out += screenNoti();
  if (S.screen === "rwd")    out += screenRwd();
  if (S.rwdSheet)            out += sheetRwdFilter();
  if (S.screen === "apply")  out += screenApply();
  if (S.contacts) out += toast('기기 연락처 앱에서 고객정보를 선택합니다.<br><span style="color: rgba(255,255,255,.7);">선택한 성명·휴대폰번호가 자동 입력되며 수정할 수 있습니다.</span>', 100);
  if (S.adFee)               out += sheetAdFee();
  if (S.sms) out += toast('문자 앱을 실행합니다 · 수신인 ' + esc(S.cPhone) + '<br><span style="color: rgba(255,255,255,.7);">안내문자 내용이 자동 입력됩니다. (고객정보는 저장되지 않습니다)</span>', 100);
  if (S.screen === "use")    out += screenUse();
  if (S.screen === "pay")    out += screenPay();
  if (S.statusSheet)         out += sheetStatus();
  if (S.screen === "buy")    out += screenBuy();
  if (S.open !== null)       out += '<div data-act="closeSelects" style="position: absolute; inset: 0; z-index: 15;"></div>';
  if (S.toast) {
    var n = parseInt(S.qty, 10) || 0;
    out += toast('결제 페이지(PG)로 이동합니다 · ' + won(n >= 10 ? n * 1100 : 0), 110);
  }
  if (S.tip)                 out += '<div data-act="closeTip" style="position: absolute; inset: 0; z-index: 25;"></div>';
  if (S.screen === "notice") out += screenNotice();
  if (S.screen === "cs")     out += screenCs();
  if (S.csToast)             out += toast("문의가 등록되었습니다. 답변은 영업일 기준 1일 이내 등록됩니다.", 100);
  if (S.screen === "more")   out += screenMore();
  if (S.sheet)               out += sheetContract();

  var app = document.getElementById("app");
  var active = document.activeElement;
  var focusKey = active && active.dataset ? active.dataset.inp : null;
  var caret = focusKey ? active.selectionStart : null;

  app.innerHTML = out;

  if (focusKey) {
    var next = app.querySelector('[data-inp="' + focusKey + '"]');
    if (next) {
      next.focus();
      try { next.setSelectionRange(caret, caret); } catch (e) { /* type doesn't support it */ }
    }
  }

  positionTipArrow();
  syncRoute();
}

/* 툴팁 화살표를 아이콘 중앙에 맞춘다 (원본의 ref 계산과 동일) */
function positionTipArrow() {
  var arrow = document.getElementById("tipArrow");
  var icon = document.getElementById("tipIcon");
  var strip = document.getElementById("strip");
  if (!arrow || !icon || !strip) return;
  var ir = icon.getBoundingClientRect(), sr = strip.getBoundingClientRect();
  arrow.style.left = (ir.left + ir.width / 2 - sr.left - 16 - 7) + "px";
}

/* 현재 화면을 상단 셀렉트 & URL 해시(#buy 등)에 반영 — 목업 공유용 딥링크 */
function routeKey() { return S.screen === "apply" ? "apply-" + S.mode : S.screen; }

function syncRoute() {
  var v = routeKey();
  var jump = document.getElementById("screenJump");
  if (jump && jump.value !== v) jump.value = v;
  if (location.hash.slice(1) !== v) {
    /* file:// 로 직접 열었을 때 replaceState 가 막히는 브라우저가 있어 방어 */
    try { history.replaceState(null, "", v === "home" ? location.pathname : "#" + v); } catch (e) {}
  }
}

function goto(v) {
  if (v === "apply-finance") ACTIONS.goFinance();
  else if (v === "apply-insurance") ACTIONS.goInsurance();
  else {
    var name = "go" + v.charAt(0).toUpperCase() + v.slice(1);
    if (ACTIONS[name]) ACTIONS[name]();
  }
}

/* ── 16. 액션 ────────────────────────────────────────────── */

var ACTIONS = {
  /* 내비게이션 */
  goHome:   function () { set({ screen: "home", tip: false, sheet: false }); },
  goNoti:   function () { set({ screen: "noti", tip: false, sheet: false }); },
  goMore:   function () { set({ screen: "more", tip: false, sheet: false }); },
  goBack:   function () { set({ screen: S.from === "more" ? "more" : "home", from: null, open: null }); },
  goBuy:    function () { set({ screen: "buy", from: S.screen, tip: false, sheet: false, open: null, qty: "10" }); },
  goPay:    function () { set({ screen: "pay", from: S.screen, tip: false, sheet: false, open: null }); },
  goUse:    function () { set({ screen: "use", from: S.screen, tip: false, sheet: false, open: null }); },
  goRwd:    function () { set({ screen: "rwd", from: S.screen, tip: false, sheet: false }); },
  goNotice: function () { set({ screen: "notice", noticeId: null, tip: false, sheet: false }); },
  goCs:     function () { set({ screen: "cs", csStep: "list", csOpen: null, tip: false, sheet: false }); },
  goFinance:   function () { set({ screen: "apply", mode: "finance",   from: "home", step: "list", car: null, cName: "", cPhone: "" }); },
  goInsurance: function () { set({ screen: "apply", mode: "insurance", from: "home", step: "list", car: null, cName: "", cPhone: "", kind: null, carrier: null, dd: null }); },

  /* 홈 */
  toggleTip:   function () { set({ tip: !S.tip }); },
  closeTip:    function () { set({ tip: false }); },
  openSheet:   function () { set({ sheet: true }); },
  closeSheet:  function () { set({ sheet: false }); },

  /* 리워드 */
  rwdPage:        function (el) { set({ rwdPage: parseInt(el.dataset.i, 10) }); },
  openRwdFilter:  function () { set({ rwdSheet: true, rwdDraft: rwdSel().slice() }); },
  closeRwdFilter: function () { set({ rwdSheet: false, rwdDraft: null }); },
  applyRwdFilter: function () { set({ rwdSheet: false, rwdSel: S.rwdDraft || rwdSel(), rwdDraft: null }); },
  rwdOpt: function (el) {
    var i = parseInt(el.dataset.i, 10);
    var cur = (S.rwdDraft || rwdSel()).slice();
    if (i === -1) {
      set({ rwdDraft: cur.length === RWD_ITEMS.length ? [] : RWD_ITEMS.slice() });
    } else {
      var it = RWD_ITEMS[i], at = cur.indexOf(it);
      if (at >= 0) cur.splice(at, 1); else cur.push(it);
      set({ rwdDraft: cur });
    }
  },

  /* 신청 */
  applyBack: function () {
    if (S.step === "form") set({ step: "list", car: null, cName: "", cPhone: "" });
    else set({ screen: "home" });
  },
  carPick:      function (el) { set({ step: "form", car: parseInt(el.dataset.i, 10) }); },
  kindPick:     function (el) { set({ kind: el.dataset.i, carrier: null, dd: null }); },
  toggleCarrier:function () { set({ dd: S.dd === "carrier" ? null : "carrier" }); },
  carrierPick:  function (el) { set({ carrier: CARRIERS[parseInt(el.dataset.i, 10)].name, dd: null }); },
  openContacts: function () {
    var c = CONTACTS[0];
    set({ contacts: true, cName: c.name, cPhone: c.phone });
    later("contacts", 2600, function () { set({ contacts: false }); });
  },
  openAdFee:  function () { set({ adFee: true }); },
  closeAdFee: function () { set({ adFee: false }); },
  sendSms:    function () { set({ sms: true }); later("sms", 2600, function () { set({ sms: false }); }); },

  /* 사용현황 */
  useTab:    function (el) { set({ useTab: el.dataset.i }); },
  useChip:   function (el) { set({ useChip: el.dataset.i }); },
  useToggle: function (el) {
    var m = Object.assign({}, S.useOpen);
    m[el.dataset.i] = !m[el.dataset.i];
    set({ useOpen: m });
  },

  /* 결제 내역 */
  payPage:     function (el) { set({ page: parseInt(el.dataset.i, 10) }); },
  openStatus:  function () { set({ statusSheet: true, draft: S.statuses.slice() }); },
  closeStatus: function () { set({ statusSheet: false, draft: null }); },
  applyStatus: function () { set({ statusSheet: false, statuses: S.draft || S.statuses, draft: null, page: 1 }); },
  statusOpt: function (el) {
    var i = parseInt(el.dataset.i, 10);
    var cur = (S.draft || S.statuses).slice();
    if (i === -1) {
      set({ draft: cur.length === STATUS_ALL.length ? [] : STATUS_ALL.slice() });
    } else {
      var st = STATUS_ALL[i], at = cur.indexOf(st);
      if (at >= 0) cur.splice(at, 1); else cur.push(st);
      set({ draft: cur });
    }
  },

  /* 이용권 구매 */
  qtyInc:   function () { var n = parseInt(S.qty, 10) || 0; set({ qty: String(n < 10 ? 10 : n + 1) }); },
  qtyDec:   function () { var n = parseInt(S.qty, 10) || 0; if (n > 10) set({ qty: String(n - 1) }); },
  qtyQuick: function (el) { set({ qty: el.dataset.i }); },
  pay:      function () { set({ toast: true }); later("pay", 2200, function () { set({ toast: false }); }); },
  togglePack:   function (el) { var k = el.dataset.key; set({ open: S.open === k ? null : k }); },
  packPick:     function (el) { var p = {}; p[el.dataset.key] = parseInt(el.dataset.i, 10); p.open = null; set(p); },
  clearPack:    function (el) { var p = {}; p[el.dataset.key] = null; p.open = null; set(p); },
  closeSelects: function () { set({ open: null }); },

  /* 공지사항 */
  noticeOpen:   function (el) { set({ noticeId: parseInt(el.dataset.i, 10) }); },
  noticeToList: function () { set({ noticeId: null }); },
  noticeBack:   function () { S.noticeId != null ? set({ noticeId: null }) : set({ screen: "more" }); },

  /* 고객센터 */
  csBack: function () { S.csStep === "form" ? set({ csStep: "list" }) : set({ screen: "more" }); },
  csNew:  function () { set({ csStep: "form", qType: null, qTypeOpen: false, qTitle: "", qBody: "", qPhone: "" }); },
  inquiryToggle: function (el) { var i = parseInt(el.dataset.i, 10); set({ csOpen: S.csOpen === i ? null : i }); },
  toggleQType:   function () { set({ qTypeOpen: !S.qTypeOpen }); },
  qTypePick:     function (el) { set({ qType: QTYPES[parseInt(el.dataset.i, 10)], qTypeOpen: false }); },
  submitQ: function () {
    var list = inquiryList().slice();
    list.unshift({ cat: S.qType, title: S.qTitle.trim(), date: "2026.09.02", body: S.qBody.trim() });
    set({ inquiries: list, csStep: "list", csOpen: null, csToast: true });
    later("cs", 2600, function () { set({ csToast: false }); });
  }
};

var INPUTS = {
  qty:    function (v) { return v.replace(/[^0-9]/g, "").slice(0, 4); },
  cName:  function (v) { return v; },
  cPhone: function (v) { return v.replace(/[^0-9-]/g, ""); },
  qTitle: function (v) { return v; },
  qBody:  function (v) { return v.slice(0, 300); },
  qPhone: function (v) { return v; }
};

/* ── 17. 이벤트 바인딩 ───────────────────────────────────── */

document.getElementById("app").addEventListener("click", function (ev) {
  var el = ev.target.closest("[data-act]");
  if (!el) return;
  var fn = ACTIONS[el.dataset.act];
  if (fn) { ev.stopPropagation(); fn(el, ev); }
});

document.getElementById("app").addEventListener("input", function (ev) {
  var key = ev.target.dataset && ev.target.dataset.inp;
  if (!key || !INPUTS[key]) return;
  var patch = {};
  patch[key] = INPUTS[key](ev.target.value);
  set(patch);
});

document.getElementById("screenJump").addEventListener("change", function (ev) {
  goto(ev.target.value);
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("hashchange", function () {
  var v = location.hash.slice(1) || "home";
  if (v !== routeKey()) goto(v);
});

goto(location.hash.slice(1) || "home");
render();

})();
