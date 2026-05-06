import { useState } from "react";

const G = {
  bg:"#0a0a0a", card:"#161616", border:"#252525",
  gold:"#c9a84c", goldLt:"#e8d080", goldDk:"#7a5c1e",
  text:"#f0ead6", sub:"#6a6050", mid:"#a09080", red:"#c0392b"
};

const STORES = [
  {id:"susan",  label:"횟집",  name:"최우영수산",  e:"🐟", g:"linear-gradient(150deg,#071c2e,#0d3a60)"},
  {id:"sushiya",label:"초밥",  name:"최우영스시야", e:"🍣", g:"linear-gradient(150deg,#1e1200,#3d2800)"},
  {id:"sushi",  label:"초밥",  name:"최우영스시",   e:"🍱", g:"linear-gradient(150deg,#0d1a2e,#1a3a5a)"},
  {id:"gogiya", label:"고기",  name:"최우영고기야", e:"🥩", g:"linear-gradient(150deg,#1a0800,#3d1400)"},
];

const ROLES = [
  {id:"kitchen", label:"요리사",    sub:"CHEF",         desc:"메뉴·조리·품질·위생\n주방 운영 관리", e:"👨‍🍳"},
  {id:"hall",    label:"홀담당자", sub:"HALL MANAGER", desc:"홀 서비스·응대·위생\n직원 관리",      e:"🧑‍💼"},
];

const CATS = [
  {id:"open",  name:"영업 준비",       e:"🌅", r:"both"},
  {id:"kwork", name:"주방 업무",       e:"🔪", r:"kitchen"},
  {id:"hwork", name:"홀 업무",         e:"🛎️", r:"hall"},
  {id:"khyg",  name:"주방 위생",       e:"🧼", r:"kitchen"},
  {id:"hhyg",  name:"홀 위생",         e:"✨", r:"hall"},
  {id:"pack",  name:"포장 방법",       e:"📦", r:"both"},
  {id:"prec",  name:"포장영수증 체크", e:"🧾", r:"both"},
  {id:"clean", name:"대청소 리스트",   e:"🧹", r:"both"},
  {id:"svc",   name:"서비스 교육",     e:"💬", r:"both"},
  {id:"buy",   name:"매장 사입",       e:"🛒", r:"both"},
];

const CL = {
  open:{
    k:["냉장·냉동고 온도 확인 (냉장0~5°C/냉동-18°C)","당일 식재료 해동 상태 점검","칼·도마·집게 소독 완료","육수·소스 기본 세팅 완료","식재료 유통기한 전수 확인","가스밸브·화구 점화 테스트","주방 바닥·배수구 청결","위생장갑·앞치마 착용","손세정제·소독제 비치 확인","예약 인원 주방 공유 완료"],
    h:["테이블 세팅 완료 (수저·물컵·메뉴판)","홀 조명·에어컨·음악 세팅","입구·화장실 청결 확인","오픈 사인·영업시간 확인","포스기·영수증 용지 확인","예약 테이블 표시","서빙 트레이·앞치마 준비","음료 냉장고 온도·재고 확인","직원 복장·명찰 확인","비상연락망·매니저 출근 확인"],
  },
  kwork:{k:["주문 3초 내 복창 확인","된장찌개·사이드 누락 없이 출고","완성 요리 온도 확인 후 서빙","선입선출 원칙 유지","재조리 발생 시 홀 즉시 보고","표준 레시피 준수","그릇·용기 파손 즉시 교체","마스크·위생모 착용","교차오염 방지 (색깔 도마 구분)","피크타임 전 반조리 준비 완료"], h:[]},
  hwork:{k:[], h:["착석 30초 내 물·메뉴판 제공","주문 반드시 복창 확인","서빙 시 '맛있게 드세요' 멘트","빈 그릇 2개 이상 즉시 수거","퇴장 시 배웅 인사","테이블 회전 2분 내 세팅","지연 3분 이상 시 손님 먼저 안내","클레임 발생 시 매니저 즉시 호출","화장실 30분마다 확인","마감 전 테이블·의자 전수 점검"]},
  khyg:{k:["2시간마다 손 세척 30초 이상","조리 전후 도마 소독","생선·육류·채소 도마 분리","쓰레기통 뚜껑 닫힘 유지","냉장고 내부 음식 덮개 처리","행주 매 시간 교체·소독","튀김기름 색·냄새 점검","주방화 미끄럼 방지 확인","위생복 매일 세탁","맛보기 금지 (1회용 스푼 사용)"], h:[]},
  hhyg:{k:[], h:["퇴석 후 소독제로 테이블 닦기","수저통·물컵 매일 세척·소독","메뉴판 알코올 와이프","트레이 매 사용 후 세척","화장실 청결 체크 기록","입구 미끄럼 방지 매트 확인","쓰레기 봉투 70% 차면 교체","에어컨 필터 주 1회 확인","테이블 아래 이물질 점검","유니폼·앞치마 청결 유지"]},
  pack:{
    k:["메뉴별 규격 용기 확인","국물 메뉴 밀폐 용기 사용","보온 필요 메뉴 보온백 포장","생선류 아이스팩 동봉","소스·반찬 별도 용기 분리","뚜껑 밀봉 확인","봉투 입구 테이프 고정","포장 후 수량 재확인"],
    h:["주문 시 예상 시간 안내","포장백 손잡이 이중 묶음","영수증 봉투 외부 부착","수령 시 메뉴명 복창","뜨거운 음식 경고 스티커","배달앱 픽업 완료 처리","대기 5분 이상 먼저 안내","쇼핑백 반듯하게 접어 전달"],
  },
  prec:{
    k:["영수증 메뉴명 ↔ 실제 포장 일치","수량 일치 여부 확인","옵션(맵기·추가) 반영 확인","알레르기 특이사항 확인"],
    h:["영수증 봉투 외부 부착","할인·쿠폰 최종 확인","배달앱 주문번호 일치","결제 방식 확인","미출력 시 재출력 부착","요청 영수증 별도 동봉"],
  },
  clean:{
    k:["후드·환풍기 필터 분해 세척","가스레인지 버너 분해 청소","냉장·냉동고 내부 전체 세척","싱크대 배수구 이물질 제거","식기세척기 내부 청소","냉동고 성에 제거","주방 벽면 기름때 제거","바닥 그리스트랩 청소","선반·수납장 내부 닦기","소화기 위치·압력 확인"],
    h:["테이블·의자 다리 오염 제거","창문·유리문 전체 세척","에어컨 필터 세척","조명 기구 먼지 제거","카운터 하단·서랍 청소","냉장 음료고 전체 세척","메뉴판 교체 또는 세척","입구 간판·유리 닦기","화장실 전체 소독","바닥 왁스 주 1회"],
  },
  svc:{
    k:["📌 요리 완성 = 3초 내 홀 호출","📌 재조리 사유 반드시 홀 전달","📌 바쁠 때도 플레이팅 기준 유지","📌 사이드 누락 = 즉시 재출고+보고","💬 클레임 = 방어 말고 홀 매니저 위임","💬 '죄송합니다, 바로 다시 준비할게요'","🎯 한식 10분 / 구이 15분 이내 출고"],
    h:["📌 입장 5초 내 '어서오세요!'","📌 주문 복창 필수","📌 빈 그릇 방치 = 서비스 0점","📌 지연 안내 '곧 나옵니다, 죄송합니다'","📌 클레임 '불편 죄송합니다' → 매니저","💬 퇴장 '감사합니다, 또 오세요!'","🎯 테이블 회전 후 2분 내 재세팅"],
  },
  buy:{
    k:["전날 재고 기준 발주량 산출","냉동 해동 스케줄 맞춰 발주","신선도 민감 식재료 매일 발주","납품 시간 주방장 직접 확인","납품 온도·신선도 즉시 점검","불량 식재료 즉시 반품","입고 후 선입선출 정리","발주장 기록 → 매니저 공유"],
    h:["음료·소모품 재고 확인","포장 용기·봉투 재고 발주","청소 용품 재고 확인","영수증 용지·포스 소모품","발주 내용 매니저 보고","납품 수량 검수 후 서명","창고 정리 정돈","유통기한 임박 소모품 우선 사용"],
  },
};

const SITS = [
  {id:"busy", title:"바쁠 때 행동 기준", e:"🔥", steps:[
    {r:"kitchen", t:"주문 순서 화이트보드 기록 → 선입선출 처리"},
    {r:"hall",    t:"테이블 현황 파악 → 우선순위 빠르게 결정"},
    {r:"both",    t:"실수 발생 즉시 '죄송합니다+재처리' — 변명 절대 금지"},
    {r:"kitchen", t:"사이드 체크리스트 주방 벽 부착 → 출고 전 확인"},
    {r:"hall",    t:"지연 3분 이상 → 손님 테이블 직접 방문 안내"},
  ]},
  {id:"leave", title:"손님 퇴장 직전 대응", e:"🚪", steps:[
    {r:"hall",    t:"'감사합니다, 맛있게 드셨나요?' 만족 확인"},
    {r:"hall",    t:"잔돈·카드 직접 전달 (테이블에 두고 가기 금지)"},
    {r:"hall",    t:"문 쪽까지 배웅 + '또 오세요!'"},
    {r:"hall",    t:"퇴석 즉시 2분 내 테이블 재세팅"},
    {r:"both",    t:"불만 손님 감지 즉시 매니저 보고"},
  ]},
  {id:"delay", title:"음식 지연 상황 대응", e:"⏰", steps:[
    {r:"hall",    t:"주문 후 10분 경과 → 주방 상황 확인"},
    {r:"hall",    t:"'조금 더 기다려주시면 곧 나옵니다, 죄송합니다'"},
    {r:"kitchen", t:"지연 사유 홀에 즉시 전달"},
    {r:"hall",    t:"15분 이상 → 서비스 or 할인 쿠폰 제안"},
    {r:"both",    t:"클레임 → 매니저 직접 사과 + 재발 방지 보고"},
  ]},
  {id:"claim", title:"클레임 대응 절차", e:"⚠️", steps:[
    {r:"hall",    t:"끝까지 경청 — 절대 반박 금지"},
    {r:"hall",    t:"'불편 드려 정말 죄송합니다' 즉시 멘트"},
    {r:"hall",    t:"매니저 즉시 호출 → 상황 인계"},
    {r:"kitchen", t:"재조리 필요 시 최우선 처리"},
    {r:"both",    t:"해결 후 '불편함 해소되셨나요?' 재확인"},
  ]},
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@700;900&family=Noto+Sans+KR:wght@400;700;900&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0a0a0a; font-family: 'Noto Sans KR', sans-serif; }
  button { font-family: 'Noto Sans KR', sans-serif; cursor: pointer; border: none; outline: none; }
  @keyframes fu { from { opacity:0; transform:translateY(14px) } to { opacity:1; transform:translateY(0) } }
  .a0{animation:fu .4s .00s both} .a1{animation:fu .4s .07s both} .a2{animation:fu .4s .14s both} .a3{animation:fu .4s .21s both}
  .tap:active { transform: scale(.96) !important; transition: transform .1s !important; }
  ::-webkit-scrollbar { width: 0; }
`;

function W({ children }) {
  return (
    <div style={{ maxWidth:480, margin:"0 auto", minHeight:"100vh", background:G.bg, paddingBottom:40 }}>
      {children}
    </div>
  );
}

function SL({ children }) {
  return (
    <div style={{ fontSize:10, fontWeight:700, color:G.sub, letterSpacing:2, textTransform:"uppercase", marginBottom:12 }}>
      {children}
    </div>
  );
}

function TB({ title, subtitle, onBack, accent }) {
  return (
    <div style={{ background:G.card, borderBottom:`2px solid ${accent||G.goldDk}`, padding:"14px 16px", display:"flex", alignItems:"center", gap:10, position:"sticky", top:0, zIndex:10 }}>
      <button onClick={onBack} style={{ fontSize:26, color:G.gold, background:"none", padding:"0 4px", lineHeight:1 }}>‹</button>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:16, fontWeight:900, color:G.gold, fontFamily:"'Noto Serif KR',serif" }}>{title}</div>
        {subtitle && <div style={{ fontSize:11, color:G.sub, marginTop:1 }}>{subtitle}</div>}
      </div>
    </div>
  );
}

function Pill({ children }) {
  return (
    <div style={{ display:"inline-block", background:`${G.gold}22`, border:`1px solid ${G.goldDk}`, color:G.gold, fontSize:10, fontWeight:700, padding:"5px 12px", borderRadius:20 }}>
      {children}
    </div>
  );
}

export default function App() {
  const [sc, setSc]       = useState("home");
  const [store, setStore] = useState(null);
  const [role, setRole]   = useState(null);
  const [cat, setCat]     = useState(null);
  const [checks, setChecks] = useState({});
  const [sit, setSit]     = useState(null);

  const SO = STORES.find(s => s.id === store);
  const RO = ROLES.find(r => r.id === role);
  const CO = CATS.find(c => c.id === cat);
  const fCats = CATS.filter(c => c.r === "both" || c.r === role);
  const rk = role === "kitchen" ? "k" : "h";

  const getItems = (cid) => { const d = CL[cid]; if (!d) return []; return d[rk] || []; };
  const ck  = (cid, i) => !!checks[`${store}|${role}|${cid}|${i}`];
  const tog = (cid, i) => setChecks(p => ({ ...p, [`${store}|${role}|${cid}|${i}`]: !p[`${store}|${role}|${cid}|${i}`] }));
  const prog = (cid) => {
    const items = getItems(cid);
    const done  = items.filter((_, i) => ck(cid, i)).length;
    return { done, total: items.length, pct: items.length ? Math.round(done / items.length * 100) : 0 };
  };

  /* ── HOME ── */
  if (sc === "home") return (
    <W>
      <style>{CSS}</style>

      {/* HERO */}
      <div style={{ background:"radial-gradient(ellipse at 50% -10%,#241900,#0a0a0a 65%)", padding:"32px 20px 26px", textAlign:"center", position:"relative", overflow:"hidden", borderBottom:`1px solid ${G.goldDk}44` }}>
        <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,transparent,${G.gold},${G.goldLt},${G.gold},transparent)` }} />
        <div style={{ position:"absolute", inset:0, backgroundImage:`radial-gradient(${G.goldDk}18 1px,transparent 1px)`, backgroundSize:"28px 28px", pointerEvents:"none" }} />

        {/* Bell */}
        <div style={{ position:"absolute", top:16, right:16, textAlign:"center" }}>
          <div style={{ position:"relative", display:"inline-block" }}>
            <span style={{ fontSize:22 }}>🔔</span>
            <div style={{ position:"absolute", top:-5, right:-7, background:G.red, color:"#fff", fontSize:9, fontWeight:900, width:16, height:16, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", border:`1.5px solid ${G.bg}` }}>3</div>
          </div>
          <div style={{ fontSize:9, color:G.sub, marginTop:2 }}>공지</div>
        </div>

        {/* Logo */}
        <div className="a0" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:14, marginBottom:14 }}>
          <div style={{ width:54, height:54, flexShrink:0, background:`linear-gradient(135deg,${G.goldLt},${G.goldDk})`, clipPath:"polygon(50% 0%,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26 }}>🍽️</div>
          <div style={{ textAlign:"left" }}>
            <div style={{ fontFamily:"'Noto Serif KR',serif", fontSize:34, fontWeight:900, background:`linear-gradient(135deg,${G.goldLt},${G.gold})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", letterSpacing:"-1px", lineHeight:1 }}>최우영</div>
            <div style={{ fontSize:10, letterSpacing:4, color:G.sub, marginTop:3 }}>CHOI WOO YOUNG</div>
          </div>
        </div>
        <div className="a1" style={{ fontFamily:"'Noto Serif KR',serif", fontSize:15, fontWeight:700, color:G.goldLt, marginBottom:7 }}>기본이 매장을 만들고, 기준이 브랜드를 만든다</div>
        <div className="a2" style={{ fontSize:11, color:G.sub }}>맛 · 서비스 · 정리 · 속도 · 위생 &nbsp;|&nbsp; 우리가 지키는 5가지 기준</div>
      </div>

      {/* STORES */}
      <div style={{ padding:"20px 16px 0" }}>
        <SL>매장 선택</SL>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          {STORES.map((s,i) => (
            <button key={s.id} className={`tap a${Math.min(i,3)}`} onClick={() => { setStore(s.id); setRole(null); setSc("role"); }}
              style={{ background:s.g, border:`1px solid ${G.goldDk}55`, borderRadius:16, overflow:"hidden", padding:0, transition:"transform .15s" }}>
              <div style={{ height:80, display:"flex", alignItems:"center", justifyContent:"center", fontSize:36, background:"rgba(0,0,0,.3)" }}>{s.e}</div>
              <div style={{ padding:"9px 8px 13px", textAlign:"center" }}>
                <div style={{ fontFamily:"'Noto Serif KR',serif", fontSize:15, fontWeight:900, color:"#fff", marginBottom:1 }}>{s.label}</div>
                <div style={{ fontSize:9, color:G.sub, marginBottom:9 }}>{s.name}</div>
                <Pill>바로가기 ›</Pill>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ROLES */}
      <div style={{ padding:"20px 16px 0" }}>
        <SL>역할을 선택하세요</SL>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
          {ROLES.map(r => (
            <button key={r.id} className="tap" onClick={() => { setRole(r.id); if (!store) setStore("susan"); setSc("category"); }}
              style={{ background:G.card, border:`1px solid ${G.border}`, borderRadius:16, padding:"16px 8px 14px", textAlign:"center", transition:"transform .15s", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,transparent,${G.gold},transparent)` }} />
              <div style={{ fontSize:28, marginBottom:7 }}>{r.e}</div>
              <div style={{ fontFamily:"'Noto Serif KR',serif", fontSize:14, fontWeight:900, color:G.gold, lineHeight:1.3 }}>{r.label}</div>
              <div style={{ fontSize:8, color:G.sub, letterSpacing:1, margin:"3px 0 8px" }}>{r.sub}</div>
              <div style={{ width:28, height:28, borderRadius:"50%", border:`1px solid ${G.goldDk}`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto", color:G.gold, fontSize:14 }}>›</div>
            </button>
          ))}
        </div>
      </div>

      {/* QUICK */}
      <div style={{ padding:"20px 16px 0" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
          {[
            {e:"📋",l:"오늘 할 일", s:"체크리스트",    fn:()=>setSc("category")},
            {e:"📦",l:"포장 체크",  s:"누락 없이 완벽", fn:()=>{ setCat("pack"); setSc("checklist"); }},
            {e:"⚠️",l:"상황 대응",  s:"긴급 가이드",   fn:()=>setSc("situations")},
            {e:"📣",l:"공지 확인",  s:"전체 공지",      fn:()=>setSc("situations")},
            {e:"📖",l:"SOP 자료실", s:"표준 레시피",    fn:()=>setSc("situations")},
            {e:"🎓",l:"교육 자료",  s:"교육·테스트",   fn:()=>setSc("situations")},
          ].map((q,i) => (
            <button key={i} className="tap" onClick={q.fn}
              style={{ background:G.card, border:`1px solid ${G.border}`, borderRadius:14, padding:"14px 6px 12px", textAlign:"center", transition:"transform .15s" }}>
              <div style={{ fontSize:24, marginBottom:6 }}>{q.e}</div>
              <div style={{ fontSize:12, fontWeight:700, color:G.text, marginBottom:2 }}>{q.l}</div>
              <div style={{ fontSize:9, color:G.sub }}>{q.s}</div>
            </button>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ margin:"20px 16px 0", background:"linear-gradient(135deg,#1c1400,#2a1e00)", border:`1px solid ${G.goldDk}44`, borderRadius:16, padding:"16px 18px", display:"flex", alignItems:"center", gap:14 }}>
        <div style={{ width:44, height:44, background:`linear-gradient(135deg,${G.goldLt},${G.goldDk})`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>🏆</div>
        <div>
          <div style={{ fontFamily:"'Noto Serif KR',serif", fontSize:14, fontWeight:700, color:G.gold, marginBottom:3 }}>작은 차이가 전문가를 만든다</div>
          <div style={{ fontSize:10, color:G.sub, lineHeight:1.6 }}>우리는 전문가다. 기본을 지키는 사람이 진짜 전문가다.</div>
        </div>
      </div>
    </W>
  );

  /* ── ROLE SELECT ── */
  if (sc === "role") return (
    <W>
      <style>{CSS}</style>
      <TB title={`${SO?.e} ${SO?.name}`} onBack={() => setSc("home")} accent={G.goldDk} />
      <div style={{ padding:"20px 16px" }}>
        <SL>역할 선택</SL>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
          {ROLES.map(r => (
            <button key={r.id} className="tap" onClick={() => { setRole(r.id); setSc("category"); }}
              style={{ background:G.card, border:`1px solid ${G.border}`, borderRadius:16, padding:"24px 12px 20px", textAlign:"center", transition:"transform .15s", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,transparent,${G.gold},transparent)` }} />
              <div style={{ fontSize:38, marginBottom:8 }}>{r.e}</div>
              <div style={{ fontFamily:"'Noto Serif KR',serif", fontSize:22, fontWeight:900, color:G.gold }}>{r.label}</div>
              <div style={{ fontSize:9, color:G.sub, letterSpacing:2, marginTop:3 }}>{r.sub}</div>
            </button>
          ))}
        </div>
      </div>
    </W>
  );

  /* ── CATEGORY ── */
  if (sc === "category") return (
    <W>
      <style>{CSS}</style>
      <TB title={`${RO?.e} ${RO?.label} 업무`} subtitle={SO ? `${SO.e} ${SO.name}` : ""} onBack={() => setSc(store ? "role" : "home")} accent={G.goldDk} />
      <div style={{ padding:"16px 16px 0" }}>
        <SL>카테고리 선택</SL>
        {fCats.map(c => {
          const { done, total, pct } = prog(c.id);
          return (
            <button key={c.id} className="tap" onClick={() => { setCat(c.id); setSc("checklist"); }}
              style={{ display:"flex", alignItems:"center", gap:12, width:"100%", background:G.card, border:`1px solid ${G.border}`, borderRadius:14, padding:"13px 14px", marginBottom:9, textAlign:"left", transition:"transform .15s" }}>
              <div style={{ width:40, height:40, borderRadius:11, background:`${G.gold}18`, border:`1px solid ${G.goldDk}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{c.e}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:700, color:G.text, marginBottom:5 }}>{c.name}</div>
                <div style={{ height:4, background:G.border, borderRadius:2, overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${pct}%`, background:`linear-gradient(90deg,${G.goldDk},${G.gold})`, borderRadius:2, transition:"width .4s" }} />
                </div>
                <div style={{ fontSize:9, color:G.sub, marginTop:3 }}>{done}/{total} · {pct}%</div>
              </div>
              <div style={{ color:G.goldDk, fontSize:20 }}>›</div>
            </button>
          );
        })}
        <button className="tap" onClick={() => setSc("situations")}
          style={{ display:"flex", alignItems:"center", gap:12, width:"100%", background:"linear-gradient(135deg,#1c1000,#2a1800)", border:`1px solid ${G.goldDk}`, borderRadius:14, padding:"13px 14px", textAlign:"left", transition:"transform .15s" }}>
          <div style={{ width:40, height:40, borderRadius:11, background:`${G.gold}22`, border:`1px solid ${G.goldDk}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>🔥</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:14, fontWeight:700, color:G.gold }}>상황 대응 가이드</div>
            <div style={{ fontSize:9, color:G.sub, marginTop:3 }}>바쁠 때 · 지연 · 클레임 대응</div>
          </div>
          <div style={{ color:G.gold, fontSize:20 }}>›</div>
        </button>
      </div>
    </W>
  );

  /* ── CHECKLIST ── */
  if (sc === "checklist") {
    const items = getItems(cat);
    const done  = items.filter((_, i) => ck(cat, i)).length;
    const pct   = items.length ? Math.round(done / items.length * 100) : 0;
    return (
      <W>
        <style>{CSS}</style>
        <TB title={`${CO?.e} ${CO?.name}`} subtitle={`${SO?.e||""} ${SO?.name||""} · ${RO?.label||""}`} onBack={() => setSc("category")} accent={G.goldDk} />
        <div style={{ background:G.card, padding:"16px 18px 14px", borderBottom:`1px solid ${G.border}` }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:8 }}>
            <div style={{ fontFamily:"'Noto Serif KR',serif", fontSize:30, fontWeight:900, background:`linear-gradient(135deg,${G.goldLt},${G.gold})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{pct}%</div>
            <div style={{ fontSize:12, color:G.sub, paddingBottom:4 }}>{done}/{items.length}개 완료</div>
          </div>
          <div style={{ height:7, background:G.border, borderRadius:4, overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${pct}%`, background:`linear-gradient(90deg,${G.goldDk},${G.gold},${G.goldLt})`, borderRadius:4, transition:"width .5s" }} />
          </div>
          {pct === 100 && (
            <div style={{ marginTop:10, padding:"9px 14px", background:`${G.gold}18`, border:`1px solid ${G.goldDk}`, borderRadius:10, display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ fontSize:20 }}>🎉</span>
              <span style={{ color:G.gold, fontWeight:900, fontSize:13, fontFamily:"'Noto Serif KR',serif" }}>모든 항목 완료!</span>
            </div>
          )}
        </div>
        <div style={{ padding:"12px 14px 30px" }}>
          {items.map((item, i) => {
            const checked = ck(cat, i);
            return (
              <button key={i} className="tap" onClick={() => tog(cat, i)}
                style={{ display:"flex", alignItems:"flex-start", gap:12, width:"100%", padding:"13px 13px", borderRadius:12, marginBottom:7, textAlign:"left", background:checked ? `${G.gold}14` : G.card, border:`1.5px solid ${checked ? G.gold : G.border}`, transition:"all .15s" }}>
                <div style={{ width:24, height:24, borderRadius:6, minWidth:24, border:`2px solid ${checked ? G.gold : G.border}`, background:checked ? G.gold : "transparent", display:"flex", alignItems:"center", justifyContent:"center", transition:"all .15s", marginTop:1 }}>
                  {checked && <span style={{ color:"#000", fontSize:12, fontWeight:900 }}>✓</span>}
                </div>
                <span style={{ fontSize:13, lineHeight:1.65, flex:1, color:checked ? G.sub : G.text, textDecoration:checked ? "line-through" : "none", transition:"all .15s" }}>{item}</span>
              </button>
            );
          })}
        </div>
      </W>
    );
  }

  /* ── SITUATIONS ── */
  if (sc === "situations") {
    if (sit) {
      const s = SITS.find(x => x.id === sit);
      return (
        <W>
          <style>{CSS}</style>
          <TB title={`${s.e} ${s.title}`} onBack={() => setSit(null)} accent={G.goldDk} />
          <div style={{ padding:"16px 16px 30px" }}>
            {s.steps.map((st, i) => (
              <div key={i} className={`a${Math.min(i,3)}`}
                style={{ background:G.card, borderRadius:13, padding:"14px 16px", marginBottom:10, borderLeft:`4px solid ${st.r==="kitchen" ? G.gold : st.r==="hall" ? "#4a9eff" : G.goldDk}` }}>
                <div style={{ fontSize:10, fontWeight:700, color:G.sub, letterSpacing:1, marginBottom:6 }}>
                  {st.r==="kitchen" ? "👨‍🍳 주방" : st.r==="hall" ? "🛎️ 홀" : "🔄 공통"}
                </div>
                <p style={{ margin:0, fontSize:14, lineHeight:1.7, color:G.text }}>{st.t}</p>
              </div>
            ))}
          </div>
        </W>
      );
    }
    return (
      <W>
        <style>{CSS}</style>
        <TB title="상황 대응 가이드" onBack={() => setSc(role ? "category" : "home")} accent={G.goldDk} />
        <div style={{ padding:"16px 16px 0" }}>
          <SL>상황 선택</SL>
          {SITS.map(s => (
            <button key={s.id} className="tap" onClick={() => setSit(s.id)}
              style={{ display:"flex", alignItems:"center", gap:14, width:"100%", background:G.card, border:`1px solid ${G.border}`, borderRadius:14, padding:"16px 16px", marginBottom:10, textAlign:"left", transition:"transform .15s" }}>
              <div style={{ width:44, height:44, borderRadius:12, background:`${G.gold}18`, border:`1px solid ${G.goldDk}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{s.e}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:15, fontWeight:700, color:G.text }}>{s.title}</div>
                <div style={{ fontSize:10, color:G.sub, marginTop:3 }}>{s.steps.length}개 행동 기준</div>
              </div>
              <div style={{ color:G.goldDk, fontSize:22 }}>›</div>
            </button>
          ))}
        </div>
      </W>
    );
  }

  return null;
}
