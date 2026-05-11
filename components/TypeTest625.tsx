
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

type ResultType = 'A' | 'B' | 'C' | 'D' | 'E';

interface Option { text: string; type: ResultType; }
interface Question { qNum: string; scene: string; text: string; image: string; options: Option[]; }
interface ResultData {
  emoji: string; badge: string; role: string; title: string;
  body: string; detail: string; tags: string[];
  meters: Record<string, number>; msg: string;
}

const BASE = import.meta.env.BASE_URL;

const questions: Question[] = [
  {
    qNum: 'Q1', scene: '1950년 6월 25일 새벽',
    text: '상황이 이상함을 느꼈다.\n당신이 가장 먼저 하는 건?',
    image: `${BASE}625-001.png`,
    options: [
      { text: '이 소식이 어디서 시작됐는지 차분히 살핀다', type: 'A' },
      { text: '유난히 불안해 보이는 사람이 먼저 눈에 들어온다', type: 'C' },
      { text: '지금 내가 당장 정해야 할 핵심부터 정리한다', type: 'B' },
      { text: '생각보다 몸이 먼저 움직인다', type: 'D' },
      { text: '혼자 판단하지 않고 몇 명과 빠르게 얘기한다', type: 'E' },
    ],
  },
  {
    qNum: 'Q2', scene: '피란길에서',
    text: '시간이 많지 않다.\n무언가를 선택해야 한다면?',
    image: `${BASE}625-002.png`,
    options: [
      { text: '다음 세대에 의미가 있는 것', type: 'A' },
      { text: '함께 버티게 하는 것', type: 'E' },
      { text: '누군가가 덜 무너지도록 하는 것', type: 'C' },
      { text: '후회가 되지 않게 하는 것', type: 'B' },
      { text: '더 큰 희생이 오지 않을 것', type: 'D' },
    ],
  },
  {
    qNum: 'Q3', scene: '출발하는 날',
    text: '"지금 나서면 위험해"\n이 말을 들었을 때 드는 생각은?',
    image: `${BASE}625-003.png`,
    options: [
      { text: '무섭지만 그냥 넘길 수 없다', type: 'B' },
      { text: '지금 멈추면 더 복잡해진다', type: 'A' },
      { text: '내가 할 일이 있다', type: 'D' },
      { text: '일단 버텨야 다음이 있다', type: 'E' },
      { text: '지금 아니면 후회한다', type: 'C' },
    ],
  },
  {
    qNum: 'Q4', scene: '전선에서',
    text: '우리끼리 분쟁이 생겼다.\n당신이 가장 견디기 힘든 것은?',
    image: `${BASE}625-004.png`,
    options: [
      { text: '확인되지 않은 말이 커질 때', type: 'A' },
      { text: '약한 사람이 뒤에 있을 때', type: 'C' },
      { text: '정보가 엇갈려 같은 실수가 반복될 때', type: 'E' },
      { text: '책임이 여기저기로 전가될 때', type: 'B' },
      { text: '모두가 망설이기만 할 때', type: 'D' },
    ],
  },
  {
    qNum: 'Q5', scene: '참호 속에서',
    text: '잠시 혼자가 됐다.\n당신이 하는 생각은?',
    image: `${BASE}625-005.png`,
    options: [
      { text: '지금 전달하지 못한 것은 무엇인지', type: 'E' },
      { text: '이 전쟁이 어떻게 끝나게 될지', type: 'A' },
      { text: '아직 손이 닿지 않은 사람이 있는지', type: 'C' },
      { text: '지금이라도 힘을 보탤 수 있는 곳이 있는지', type: 'B' },
      { text: '내가 다시 돌아가 지켜야 할 자리가 있는지', type: 'D' },
    ],
  },
  {
    qNum: 'Q6', scene: '긴 전쟁 속에서',
    text: '전쟁이 길어질수록 모두가 지친다.\n그 속에서 당신은?',
    image: `${BASE}625-006.png`,
    options: [
      { text: '이 시간을 기록하는 사람', type: 'A' },
      { text: '자리를 지키는 사람', type: 'D' },
      { text: '곁에 남아 괜찮다고 말해주는 사람', type: 'C' },
      { text: '필요한 걸 이어주는 사람', type: 'E' },
      { text: '결정적인 순간에 움직이는 사람', type: 'B' },
    ],
  },
  {
    qNum: 'Q7', scene: '전쟁이 끝나고',
    text: '전쟁이 끝났다.\n노인이 된 당신이 할 말은?',
    image: `${BASE}625-007.png`,
    options: [
      { text: '그 나이였기에 가능했다.', type: 'A' },
      { text: '나라를 지켰기에 후회하지 않는다.', type: 'D' },
      { text: '희망이 놓쳐지지 않게 붙잡고 있었다.', type: 'C' },
      { text: '끝까지 버텼다.', type: 'B' },
      { text: '그때 손을 놓지 않았다.', type: 'E' },
    ],
  },
];

const results: Record<ResultType, ResultData> = {
  A: {
    emoji: '🔭', badge: '유형 A',
    role: '냉철한 분석가',
    title: '안개 속에서도 길을 보는 분석가',
    body: '두려움보다 먼저 상황을 읽고, 움직이기 전에 생각하는 당신.',
    detail: '75년 전에도 당신 같은 사람이 있었습니다. 총성이 울리는 혼란 속에서도 "지금 무슨 일이 벌어지고 있는가"를 냉정하게 파악했던 사람들. 그 분석이 없었다면 전략도, 승리도 없었습니다. 당신은 위기 속에서 가장 빛나는 눈을 가진 사람입니다.',
    tags: ['#분석형', '#냉철함', '#전략가', '#관찰자'],
    meters: { '상황 판단력': 96, '감정 절제력': 88, '전략적 사고': 92, '용기 지수': 65, '공감 지수': 48 },
    msg: '75년 전 당신은 말했을 거예요.<br/>"<span>알아야 싸울 수 있어.</span>"<br/>그 눈이 전쟁을 바꿨습니다.',
  },
  B: {
    emoji: '⚡', badge: '유형 B',
    role: '결단의 선봉대',
    title: '망설임 없이 앞으로 나아간 선봉대',
    body: '후회가 두려워서 먼저 나선 당신. 나라가 위험하니까, 그냥 막 뛰어들었던 사람.',
    detail: '두려움이 없어서가 아니었습니다. 후회가 더 두려웠기 때문이었겠죠. 17세의 소년들이 그랬습니다. 아무도 시키지 않았지만, 총이 울리는 방향으로 달려갔습니다. 당신이 바로 그 선봉에 섰던 사람입니다.',
    tags: ['#행동형', '#선봉대', '#결단력', '#용감함'],
    meters: { '행동력': 95, '결단력': 90, '용기 지수': 88, '전략적 사고': 55, '공감 지수': 60 },
    msg: '75년 전 당신은 말했을 거예요.<br/>"<span>나라가 위험하니까, 그냥 막 뛰어들었지.</span>"<br/>그 한 걸음이 오늘을 만들었습니다.',
  },
  C: {
    emoji: '💙', badge: '유형 C',
    role: '따뜻한 치유자',
    title: '흔들리는 사람 곁에 남아있던 치유자',
    body: '총 소리보다 먼저 눈에 들어온 건 불안한 사람의 얼굴.',
    detail: '당신은 그 시대에 붕대를 감아준 간호사였을 거예요. 포탄이 떨어지는 곳에서도 누군가의 손을 잡아주었던 사람. 전쟁은 총이 아니라 사람이 이기는 것이고, 그 사람들을 버티게 한 건 당신 같은 사람이었습니다.',
    tags: ['#공감형', '#치유자', '#따뜻함', '#돌봄'],
    meters: { '공감 지수': 97, '돌봄 의지': 92, '감정 조율력': 88, '행동력': 52, '전략적 사고': 48 },
    msg: '75년 전 당신은 말했을 거예요.<br/>"<span>그 사람 손을 놓을 수가 없었어.</span>"<br/>그 온기가 전선을 지켰습니다.',
  },
  D: {
    emoji: '🛡️', badge: '유형 D',
    role: '묵묵한 수호자',
    title: '끝까지 자리를 지킨 수호자',
    body: '도망칠 수도 있었지만, 지켜야 할 것이 있기에 떠나지 않았습니다.',
    detail: '피하지 않았습니다. 아무도 알아주지 않아도, 아무도 보지 않아도, 그 자리에 있어야 한다는 것을 알았으니까요. 75년 전 그들이 그 자리를 버티지 않았다면 오늘 우리는 없었습니다. 당신은 가장 조용하고 가장 단단한 힘이었습니다.',
    tags: ['#수호자', '#인내', '#책임감', '#묵묵함'],
    meters: { '인내력': 95, '책임감': 92, '용기 지수': 85, '행동력': 70, '전략적 사고': 68 },
    msg: '75년 전 당신은 말했을 거예요.<br/>"<span>내가 떠나면 이 자리에 아무도 없어.</span>"<br/>그 버팀이 나라를 세웠습니다.',
  },
  E: {
    emoji: '🤝', badge: '유형 E',
    role: '다리를 놓는 연결자',
    title: '사람과 사람 사이를 이어온 연결자',
    body: '혼자 결정하지 않았습니다. 먼저 주변을 돌아보고, 필요한 것을 이어주었습니다.',
    detail: '전장에서 통신병이 없으면 아무것도 되지 않았습니다. 총을 들지 않아도, 소리치지 않아도 — 당신은 사람과 사람 사이에서 흐름을 만들었어요. 그 연결이 없었다면 작전도, 구조도, 희망도 전달될 수 없었습니다.',
    tags: ['#연결형', '#소통', '#네트워크', '#이어주는사람'],
    meters: { '소통력': 94, '공감 지수': 80, '연결 의지': 96, '행동력': 65, '전략적 사고': 72 },
    msg: '75년 전 당신은 말했을 거예요.<br/>"<span>그때 손을 놓지 않았다.</span>"<br/>그 연결이 승리를 만들었습니다.',
  },
};

const DARK = '#1C1008';
const MID = '#4A3525';
const SEPIA = '#7A6045';
const GOLD = '#B89340';
const RED = '#8B1A1A';
const CREAM = '#F2EDE4';
const LIGHT = '#FAF7F2';
const WARM = '#DDD3C0';
const NAVY = '#1A2B3C';

interface TypeTest625Props { variant?: 'A' | 'B'; }

const TypeTest625: React.FC<TypeTest625Props> = ({ variant = 'A' }) => {
  const navigate = useNavigate();
  const [screen, setScreen] = useState<'intro' | 'quiz' | 'landing'>('intro');
  const [showResult, setShowResult] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [typeCounts, setTypeCounts] = useState<Record<ResultType, number>>({ A: 0, B: 0, C: 0, D: 0, E: 0 });
  const [currentResult, setCurrentResult] = useState<ResultData | null>(null);
  const [formData, setFormData] = useState({ name: '', age: '', phone: '', region: '', city: '', jobStatus: '' });
  const [submitted, setSubmitted] = useState(false);
  const [liveCount, setLiveCount] = useState(312);
  const [signCount, setSignCount] = useState(4287);
  const [confetti, setConfetti] = useState<{ id: number; left: number; color: string; dur: number; delay: number; round: boolean }[]>([]);

  useEffect(() => {
    const t = setTimeout(() => setLiveCount(p => p + Math.floor(Math.random() * 2) + 1), (Math.random() * 5 + 4) * 1000);
    return () => clearTimeout(t);
  }, [liveCount]);

  useEffect(() => {
    const t = setInterval(() => setSignCount(p => p + Math.floor(Math.random() * 2) + 1), 6000);
    return () => clearInterval(t);
  }, []);

  const selectAnswer = (idx: number) => {
    const q = questions[currentQ];
    const newCounts = { ...typeCounts };
    if (answers[currentQ] !== undefined) newCounts[q.options[answers[currentQ]].type]--;
    const newAnswers = [...answers];
    newAnswers[currentQ] = idx;
    newCounts[q.options[idx].type]++;
    setAnswers(newAnswers);
    setTypeCounts(newCounts);
    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(p => p + 1);
        window.scrollTo(0, 0);
      } else {
        let maxType: ResultType = 'A', maxVal = 0;
        (Object.keys(newCounts) as ResultType[]).forEach(t => {
          if (newCounts[t] > maxVal) { maxVal = newCounts[t]; maxType = t; }
        });
        setCurrentResult(results[maxType]);
        setScreen('landing');
        window.scrollTo(0, 0);
      }
    }, 380);
  };

  const submitForm = async () => {
    if (!formData.name) { alert('성함을 입력해주세요.'); return; }
    if (!formData.age) { alert('나이를 입력해주세요.'); return; }
    if (!formData.phone) { alert('연락처를 입력해주세요.'); return; }
    if (!formData.region) { alert('거주 지역을 선택해주세요.'); return; }
    if (!formData.city) { alert('거주 중인 시/군/구를 입력해주세요.'); return; }
    if (!formData.jobStatus) { alert('직업 상태를 선택해주세요.'); return; }
    const resultLabel = currentResult ? `${currentResult.badge} ${currentResult.role}` : '';
    try {
      await supabase.from('quiz_625_submissions').insert({
        name: formData.name, age: formData.age, phone: formData.phone,
        region: formData.region, city: formData.city, job_status: formData.jobStatus,
        result: resultLabel, variant,
      });
    } catch (_) { /* fail silently */ }
    setSignCount(p => p + 1);
    setSubmitted(true);
    setTimeout(() => {
      setShowResult(true);
      const colors = [RED, GOLD, '#D4A843', '#8B3A3A'];
      setConfetti(Array.from({ length: 50 }, (_, i) => ({
        id: i, left: Math.random() * 100, color: colors[Math.floor(Math.random() * colors.length)],
        dur: Math.random() * 2 + 1.5, delay: Math.random(), round: Math.random() > 0.5,
      })));
      setTimeout(() => setConfetti([]), 4000);
    }, 1000);
  };

  const restartTest = () => {
    setScreen('intro'); setCurrentQ(0); setAnswers([]);
    setTypeCounts({ A: 0, B: 0, C: 0, D: 0, E: 0 });
    setCurrentResult(null); setSubmitted(false); setShowResult(false);
    window.scrollTo(0, 0);
  };

  const pct = Math.round(((currentQ + 1) / questions.length) * 100);

  return (
    <div style={{ background: CREAM, minHeight: '100vh', fontFamily: "'Pretendard', 'Noto Sans KR', sans-serif", overflowX: 'hidden' }}>
      <style>{`
        @keyframes confettiFall { to { transform: translateY(100vh) rotate(720deg); opacity: 0; } }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        @keyframes grow625 { from { width: 0 !important; } }
        @keyframes pulse625 { 0%,100%{transform:scale(1);opacity:1;} 50%{transform:scale(1.5);opacity:.6;} }
        .q625-page { animation: fadeInUp 0.45s ease; }
        .q625-opt:hover { border-color: ${RED} !important; background: #FFF0F0 !important; }
        .q625-opt:active { transform: scale(0.99); }
      `}</style>

      {/* confetti */}
      <div style={{ position:'fixed', top:0, left:0, width:'100%', height:'100%', pointerEvents:'none', zIndex:999, overflow:'hidden' }}>
        {confetti.map(p => (
          <div key={p.id} style={{ position:'absolute', width:8, height:8, top:-10, left:`${p.left}%`, background:p.color, borderRadius:p.round?'50%':'2px', animation:`confettiFall ${p.dur}s ${p.delay}s linear forwards` }} />
        ))}
      </div>

      {/* back button */}
      <button onClick={() => navigate('/')} style={{ position:'fixed', top:16, left:16, zIndex:100, background:'white', border:'none', borderRadius:'50%', width:40, height:40, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.15)', cursor:'pointer' }}>
        <i className="fa-solid fa-chevron-left" style={{ color:'#555' }}></i>
      </button>

      <div style={{ maxWidth:480, margin:'0 auto' }}>

        {/* ============ INTRO ============ */}
        {screen === 'intro' && (
          <div className="q625-page">
            {/* hero image */}
            <div style={{ position:'relative', overflow:'hidden' }}>
              <img src={`${BASE}landing01.jpg`} alt="625" style={{ width:'100%', display:'block', maxHeight:520, objectFit:'cover' }} />
              <div style={{ position:'absolute', bottom:0, left:0, right:0, height:80, background:`linear-gradient(transparent,${CREAM})` }} />
            </div>

            <div style={{ padding:'0 20px 32px' }}>
              {/* live badge */}
              <div style={{ display:'flex', alignItems:'center', gap:6, background:'white', border:`2px solid ${RED}`, color:DARK, fontSize:12, fontWeight:700, padding:'6px 14px', borderRadius:30, marginBottom:16, boxShadow:'0 2px 12px rgba(139,26,26,.15)', width:'fit-content' }}>
                <div style={{ width:7, height:7, borderRadius:'50%', background:RED, animation:'pulse625 1.5s ease-in-out infinite' }} />
                지금 <strong style={{ marginLeft:4 }}>{liveCount}명</strong>이 테스트 중
              </div>

              <div style={{ background:NAVY, color:'white', fontSize:10, padding:'5px 12px', borderRadius:20, letterSpacing:1, fontWeight:700, marginBottom:14, display:'inline-block' }}>
                🎗️ 6.25 전쟁 75주년 기념 캠페인
              </div>

              <h1 style={{ fontWeight:900, fontSize:28, color:DARK, lineHeight:1.3, marginBottom:8 }}>
                당신이 그 시대에<br /><span style={{ color:RED }}>있었다면?</span>
              </h1>
              <p style={{ fontSize:14, color:MID, lineHeight:1.7, marginBottom:20, fontWeight:500 }}>
                7가지 선택으로 알아보는<br />나의 참전 역할 유형 테스트
              </p>

              {/* stats */}
              <div style={{ display:'flex', gap:10, marginBottom:16 }}>
                {[
                  { num: signCount.toLocaleString(), label: '명이\n함께했어요' },
                  { num: '2분', label: '이면\n완성돼요' },
                  { num: '5가지', label: '유형으로\n분석해요' },
                ].map((s, i) => (
                  <div key={i} style={{ flex:1, background:'white', borderRadius:16, padding:'14px 10px', textAlign:'center', boxShadow:'0 4px 14px rgba(0,0,0,.07)', overflow:'hidden', position:'relative' }}>
                    <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:i===0?`linear-gradient(90deg,${RED},#C84040)`:i===1?`linear-gradient(90deg,${GOLD},#D4A843)`:`linear-gradient(90deg,${NAVY},#2C4060)` }} />
                    <span style={{ fontWeight:700, fontSize:20, color:DARK, display:'block', lineHeight:1 }}>{s.num}</span>
                    <span style={{ fontSize:10, color:SEPIA, marginTop:4, display:'block', lineHeight:1.4, whiteSpace:'pre-line' }}>{s.label}</span>
                  </div>
                ))}
              </div>

              {/* result type preview */}
              <p style={{ fontSize:12, color:SEPIA, fontWeight:600, marginBottom:10, textAlign:'center' }}>나는 어떤 역할이었을까? 👇</p>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginBottom:10 }}>
                {[
                  { emoji:'🔭', role:'냉철한\n분석가' },
                  { emoji:'⚡', role:'결단의\n선봉대' },
                  { emoji:'💙', role:'따뜻한\n치유자' },
                ].map((t, i) => (
                  <div key={i} style={{ background:'white', borderRadius:14, padding:'12px 8px', textAlign:'center', border:`1.5px solid ${WARM}` }}>
                    <span style={{ fontSize:26, display:'block', marginBottom:4 }}>{t.emoji}</span>
                    <span style={{ fontSize:10, fontWeight:700, color:DARK, lineHeight:1.3, whiteSpace:'pre-line' }}>{t.role}</span>
                  </div>
                ))}
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:20 }}>
                {[
                  { emoji:'🛡️', role:'묵묵한 수호자' },
                  { emoji:'🤝', role:'다리를 놓는 연결자' },
                ].map((t, i) => (
                  <div key={i} style={{ background:'white', borderRadius:14, padding:'12px 8px', textAlign:'center', border:`1.5px solid ${WARM}` }}>
                    <span style={{ fontSize:26, display:'block', marginBottom:4 }}>{t.emoji}</span>
                    <span style={{ fontSize:10, fontWeight:700, color:DARK, lineHeight:1.3 }}>{t.role}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => { setScreen('quiz'); window.scrollTo(0,0); }}
                style={{ width:'100%', background:`linear-gradient(135deg,${RED},#A02020)`, color:'white', border:'none', borderRadius:18, padding:'20px 24px', fontSize:17, fontWeight:700, cursor:'pointer', boxShadow:`0 8px 24px rgba(139,26,26,.35)`, display:'flex', alignItems:'center', justifyContent:'center', gap:10 }}
              >
                <span>지금 내 역할 확인하기</span>
                <span style={{ width:30, height:30, borderRadius:'50%', background:'rgba(255,255,255,.2)', display:'flex', alignItems:'center', justifyContent:'center' }}>→</span>
              </button>
              <div style={{ display:'flex', justifyContent:'center', gap:12, marginTop:12, fontSize:12, color:SEPIA }}>
                <span>⏱ 2분 소요</span><span>🔒 무료</span><span>✅ 즉시 확인</span>
              </div>
            </div>
          </div>
        )}

        {/* ============ QUIZ ============ */}
        {screen === 'quiz' && (
          <div className="q625-page" style={{ padding:'20px 16px 50px' }}>
            {/* progress */}
            <div style={{ marginBottom:14 }}>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, color:SEPIA, marginBottom:5, fontWeight:600 }}>
                <span>질문 {currentQ + 1} / {questions.length}</span><span>{pct}%</span>
              </div>
              <div style={{ height:6, background:WARM, borderRadius:10, overflow:'hidden' }}>
                <div style={{ height:'100%', width:`${pct}%`, background:`linear-gradient(90deg,${RED},${GOLD})`, borderRadius:10, transition:'width .4s ease' }} />
              </div>
            </div>
            <div style={{ display:'flex', gap:5, justifyContent:'center', marginBottom:16 }}>
              {questions.map((_, i) => (
                <div key={i} style={{ height:5, borderRadius:3, width:i===currentQ?16:5, background:i<currentQ?GOLD:i===currentQ?RED:`${SEPIA}40`, transition:'all .3s' }} />
              ))}
            </div>

            {/* question card */}
            <div style={{ background:'white', borderRadius:20, overflow:'hidden', boxShadow:'0 8px 28px rgba(0,0,0,.1)', marginBottom:14 }}>
              <img
                src={questions[currentQ].image}
                alt={`Q${currentQ+1}`}
                style={{ width:'100%', aspectRatio:'4/3', objectFit:'cover', display:'block' }}
              />
              <div style={{ padding:'20px 20px 24px' }}>
                <div style={{ borderBottom:`1px solid ${WARM}`, paddingBottom:14, marginBottom:16 }}>
                  <span style={{ fontSize:11, fontWeight:700, color:RED, letterSpacing:1 }}>{questions[currentQ].qNum} · {questions[currentQ].scene}</span>
                  <p style={{ fontWeight:700, fontSize:17, color:DARK, lineHeight:1.55, marginTop:6, whiteSpace:'pre-line' }}>
                    {questions[currentQ].text}
                    <span style={{ color:RED }}> *</span>
                  </p>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                  {questions[currentQ].options.map((opt, i) => (
                    <button
                      key={i}
                      className="q625-opt"
                      onClick={() => selectAnswer(i)}
                      style={{
                        width:'100%', background:answers[currentQ]===i?'#FFF0EE':'white',
                        border:`1.5px solid ${answers[currentQ]===i?RED:WARM}`,
                        borderRadius:12, padding:'13px 15px', textAlign:'left', fontSize:14,
                        color:DARK, cursor:'pointer', display:'flex', alignItems:'center', gap:12,
                        lineHeight:1.5, transition:'all .18s', fontFamily:'inherit',
                      }}
                    >
                      <span style={{
                        width:22, height:22, borderRadius:4, border:`1.5px solid ${answers[currentQ]===i?RED:WARM}`,
                        background:answers[currentQ]===i?RED:'white', display:'flex', alignItems:'center',
                        justifyContent:'center', flexShrink:0, transition:'all .18s',
                      }}>
                        {answers[currentQ]===i && <i className="fa-solid fa-check" style={{ fontSize:10, color:'white' }}></i>}
                      </span>
                      <span>{opt.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {currentQ > 0 && (
              <div style={{ textAlign:'center' }}>
                <button onClick={() => { setCurrentQ(p=>p-1); window.scrollTo(0,0); }} style={{ background:'none', border:'none', color:SEPIA, fontSize:13, cursor:'pointer', fontFamily:'inherit' }}>← 이전 질문으로</button>
              </div>
            )}
          </div>
        )}

        {/* ============ LANDING ============ */}
        {screen === 'landing' && (
          <div className="q625-page" style={{ padding:'0 16px 80px' }}>

            <div style={{ textAlign:'center', padding:'32px 0 16px' }}>
              <div style={{ display:'inline-block', background:`linear-gradient(135deg,${RED},#A02020)`, color:'white', fontSize:11, fontWeight:700, padding:'5px 14px', borderRadius:20, marginBottom:12 }}>
                ✅ 7가지 질문 분석 완료
              </div>
              <h1 style={{ fontWeight:700, fontSize:22, color:DARK, lineHeight:1.4, marginTop:12, marginBottom:6 }}>
                잠깐, 결과를 보기 전에<br /><span style={{ color:RED }}>우리가 꼭 전해야 할 이야기</span>
              </h1>
              <p style={{ fontSize:13, color:MID, lineHeight:1.7 }}>75년 전 그들의 선택이<br />오늘 당신의 일상을 만들었습니다</p>
            </div>

            {/* landing images */}
            <img src={`${BASE}landing02.jpg`} alt="" style={{ width:'100%', borderRadius:12, marginBottom:10, display:'block' }} onError={(e)=>{(e.target as HTMLImageElement).style.display='none';}} />
            <img src={`${BASE}landing03.jpg`} alt="" style={{ width:'100%', borderRadius:12, marginBottom:10, display:'block' }} onError={(e)=>{(e.target as HTMLImageElement).style.display='none';}} />
            <img src={`${BASE}landing04.jpg`} alt="" style={{ width:'100%', borderRadius:12, marginBottom:10, display:'block' }} onError={(e)=>{(e.target as HTMLImageElement).style.display='none';}} />

            {/* 현실 사실 카드 */}
            <div style={{ display:'flex', alignItems:'center', gap:10, margin:'16px 0 8px', color:SEPIA, fontSize:12, fontWeight:600 }}>
              <div style={{ flex:1, height:1, background:WARM }} />📜 75년 전 그날<div style={{ flex:1, height:1, background:WARM }} />
            </div>

            {[
              { num: '17세', label: '김해 공병대에 입대한 가장 어린 소년의 나이\n나라가 위험하다는 이유 하나로, 그냥 막 뛰어들었다', source: '* 6.25 참전용사 기록 (국가보훈부)' },
              { num: '75년', label: '우리가 지금 이 자리에 있을 수 있는 시간\n그들의 선택이 없었다면, 오늘은 없었습니다', source: '* 1950.6.25 ~ 2025' },
              { num: '138만명', label: '6.25 전쟁 국군 참전 인원\n그 중 많은 수가 10대 후반~20대 초반의 청년이었습니다', source: '* 국방부 통계' },
            ].map((s, i) => (
              <div key={i} style={{ background:NAVY, borderRadius:14, padding:'16px 18px', margin:'8px 0', borderLeft:`4px solid ${GOLD}` }}>
                <span style={{ fontWeight:700, fontSize:30, color:GOLD, display:'block', lineHeight:1, letterSpacing:-1 }}>{s.num}</span>
                <p style={{ fontSize:13, color:'rgba(255,255,255,.85)', marginTop:6, lineHeight:1.6, fontWeight:500, whiteSpace:'pre-line' }}>{s.label}</p>
                <p style={{ fontSize:10, color:'rgba(255,255,255,.4)', marginTop:4 }}>{s.source}</p>
              </div>
            ))}

            <div style={{ background:`linear-gradient(135deg,${RED},#7A1010)`, borderRadius:16, padding:'18px 20px', margin:'14px 0', textAlign:'center' }}>
              <p style={{ fontWeight:700, fontSize:16, color:'white', lineHeight:1.7 }}>
                그들은 묻지 않았습니다.<br />
                <span style={{ color:GOLD }}>"내가 왜 가야 해?"</span><br />
                다만 알았습니다.<br />
                <span style={{ color:GOLD }}>"지금 내가 가지 않으면 안 된다."</span>
              </p>
            </div>

            {/* sign counter */}
            <div style={{ background:`linear-gradient(135deg,${DARK},${MID})`, borderRadius:18, padding:'18px 20px', color:'white', margin:'12px 0', textAlign:'center' }}>
              <p style={{ fontSize:11, color:GOLD, letterSpacing:1, fontWeight:700, marginBottom:6 }}>🎗️ 현재 참여 현황</p>
              <div style={{ fontWeight:700, fontSize:34, lineHeight:1, letterSpacing:-1 }}>
                {signCount.toLocaleString()}<span style={{ fontSize:17, color:GOLD, marginLeft:4 }}>명</span>
              </div>
              <div style={{ height:7, background:'rgba(255,255,255,.15)', borderRadius:10, overflow:'hidden', margin:'10px 0' }}>
                <div style={{ height:'100%', width:`${Math.min(100,(signCount/5000)*100)}%`, background:`linear-gradient(90deg,${GOLD},${RED})`, borderRadius:10 }} />
              </div>
              <p style={{ fontSize:12, color:'rgba(255,255,255,.6)' }}>목표 <strong style={{ color:GOLD }}>5,000명</strong>이 함께 기억합니다</p>
            </div>

            {/* form section divider */}
            <div style={{ display:'flex', alignItems:'center', gap:10, margin:'20px 0 8px', color:SEPIA, fontSize:12, fontWeight:600 }}>
              <div style={{ flex:1, height:1, background:WARM }} />✍️ 정보 입력 후 결과 확인<div style={{ flex:1, height:1, background:WARM }} />
            </div>
            <div style={{ background:`linear-gradient(135deg,${LIGHT},${CREAM})`, borderRadius:16, padding:'16px 18px', marginBottom:14, textAlign:'center', border:`1.5px solid ${WARM}` }}>
              <p style={{ fontSize:15, fontWeight:700, color:DARK, lineHeight:1.5, marginBottom:4 }}>
                당신의 참전 역할 유형을<br /><span style={{ color:RED }}>지금 바로 확인하세요</span>
              </p>
              <p style={{ fontSize:12, color:MID, lineHeight:1.6 }}>아래 정보를 입력하시면 <strong style={{ color:RED }}>나만의 유형 결과</strong>를 확인하실 수 있어요</p>
            </div>

            {/* FORM */}
            {!submitted ? (
              <div style={{ background:'white', borderRadius:20, padding:'24px 20px', boxShadow:'0 8px 28px rgba(0,0,0,.09)', border:`2px solid ${WARM}`, position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:4, background:`linear-gradient(90deg,${RED},${GOLD})` }} />

                {/* 성함 */}
                <div style={{ marginBottom:14 }}>
                  <label style={{ display:'block', fontSize:13, fontWeight:700, color:MID, marginBottom:6 }}>
                    성함을 말씀해 주세요. <span style={{ color:RED }}>*</span>
                    <span style={{ fontSize:11, fontWeight:400, color:SEPIA, marginLeft:6 }}>올바른 정보를 입력해주세요</span>
                  </label>
                  <input type="text" value={formData.name} onChange={e => setFormData(p=>({...p,name:e.target.value}))} placeholder="ex) 김영웅"
                    style={{ width:'100%', border:`1.5px solid ${WARM}`, borderRadius:10, padding:'12px 14px', fontSize:14, color:DARK, background:LIGHT, outline:'none', boxSizing:'border-box', fontFamily:'inherit' }} />
                </div>

                {/* 나이 */}
                <div style={{ marginBottom:14 }}>
                  <label style={{ display:'block', fontSize:13, fontWeight:700, color:MID, marginBottom:6 }}>나이를 말씀해 주세요. <span style={{ color:RED }}>*</span></label>
                  <input type="number" value={formData.age} onChange={e => setFormData(p=>({...p,age:e.target.value}))} placeholder="ex) 24"
                    style={{ width:'50%', border:`1.5px solid ${WARM}`, borderRadius:10, padding:'12px 14px', fontSize:14, color:DARK, background:LIGHT, outline:'none', boxSizing:'border-box', fontFamily:'inherit' }} />
                </div>

                {/* 연락처 */}
                <div style={{ marginBottom:14 }}>
                  <label style={{ display:'block', fontSize:13, fontWeight:700, color:MID, marginBottom:6 }}>연락처를 말씀해 주세요. <span style={{ color:RED }}>*</span></label>
                  <input type="tel" value={formData.phone} onChange={e => setFormData(p=>({...p,phone:e.target.value}))} placeholder="ex) 01012345678"
                    style={{ width:'100%', border:`1.5px solid ${WARM}`, borderRadius:10, padding:'12px 14px', fontSize:14, color:DARK, background:LIGHT, outline:'none', boxSizing:'border-box', fontFamily:'inherit' }} />
                </div>

                {/* 거주 지역 (radio) */}
                <div style={{ marginBottom:14 }}>
                  <label style={{ display:'block', fontSize:13, fontWeight:700, color:MID, marginBottom:8 }}>현재 거주 중인 지역을 선택해 주세요. <span style={{ color:RED }}>*</span></label>
                  <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                    {['서울권', '경기권', '그 외 지역'].map(r => (
                      <label key={r} onClick={() => setFormData(p=>({...p,region:r}))}
                        style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 14px', border:`1.5px solid ${formData.region===r?RED:WARM}`, borderRadius:10, background:formData.region===r?'#FFF0EE':LIGHT, cursor:'pointer', transition:'all .15s' }}>
                        <span style={{ width:18, height:18, borderRadius:'50%', border:`2px solid ${formData.region===r?RED:WARM}`, background:formData.region===r?RED:'white', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                          {formData.region===r && <span style={{ width:7, height:7, borderRadius:'50%', background:'white', display:'block' }} />}
                        </span>
                        <span style={{ fontSize:14, color:DARK, fontWeight:formData.region===r?700:400 }}>{r}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 시/군/구 */}
                <div style={{ marginBottom:14 }}>
                  <label style={{ display:'block', fontSize:13, fontWeight:700, color:MID, marginBottom:6 }}>
                    현재 거주 중인 (시/군/구)를 말씀해 주세요. <span style={{ color:RED }}>*</span>
                    <span style={{ display:'block', fontSize:11, fontWeight:400, color:SEPIA, marginTop:2 }}>서울·경기권 주민 확인용</span>
                  </label>
                  <input type="text" value={formData.city} onChange={e => setFormData(p=>({...p,city:e.target.value}))} placeholder="ex) 서울 관악구, 경기 수원시"
                    style={{ width:'100%', border:`1.5px solid ${WARM}`, borderRadius:10, padding:'12px 14px', fontSize:14, color:DARK, background:LIGHT, outline:'none', boxSizing:'border-box', fontFamily:'inherit' }} />
                </div>

                {/* 직업 상태 (radio grid) */}
                <div style={{ marginBottom:20 }}>
                  <label style={{ display:'block', fontSize:13, fontWeight:700, color:MID, marginBottom:8 }}>현재 직업 상태를 선택해 주세요. <span style={{ color:RED }}>*</span></label>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                    {['수험생', '대학생', '취업 준비생', '직장인', '무직'].map(j => (
                      <label key={j} onClick={() => setFormData(p=>({...p,jobStatus:j}))}
                        style={{ display:'flex', alignItems:'center', gap:8, padding:'12px 14px', border:`1.5px solid ${formData.jobStatus===j?RED:WARM}`, borderRadius:10, background:formData.jobStatus===j?'#FFF0EE':LIGHT, cursor:'pointer', transition:'all .15s', gridColumn:j==='무직'?'1 / -1':undefined }}>
                        <span style={{ width:16, height:16, borderRadius:'50%', border:`2px solid ${formData.jobStatus===j?RED:WARM}`, background:formData.jobStatus===j?RED:'white', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                          {formData.jobStatus===j && <span style={{ width:6, height:6, borderRadius:'50%', background:'white', display:'block' }} />}
                        </span>
                        <span style={{ fontSize:13, color:DARK, fontWeight:formData.jobStatus===j?700:400 }}>{j}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button onClick={submitForm}
                  style={{ width:'100%', background:`linear-gradient(135deg,${RED},#A02020)`, color:'white', border:'none', borderRadius:16, padding:'19px 24px', fontSize:16, fontWeight:700, cursor:'pointer', boxShadow:`0 8px 24px rgba(139,26,26,.35)`, fontFamily:'inherit' }}
                >
                  🎗️ 기록하고 결과 확인하기
                </button>
                <div style={{ marginTop:14, background:LIGHT, padding:'14px', borderRadius:8, border:`1px solid ${WARM}`, textAlign:'center' }}>
                  <div style={{ color:'#C0392B', fontSize:11, fontWeight:800, marginBottom:3 }}>[개인정보 보호 안내]</div>
                  <p style={{ fontSize:11, color:MID, lineHeight:1.5, margin:0 }}>
                    입력하신 정보는 <strong>개인정보 보호법 제15조</strong>에 의거하여<br />
                    캠페인 목적 종료 시 <strong>즉시 파기됩니다.</strong>
                  </p>
                </div>
              </div>
            ) : (
              <div style={{ background:'white', borderRadius:20, padding:'36px 24px', textAlign:'center', boxShadow:'0 8px 28px rgba(0,0,0,.09)' }}>
                <span style={{ fontSize:56, display:'block', marginBottom:12 }}>🎗️</span>
                <h2 style={{ fontWeight:700, fontSize:20, color:DARK, marginBottom:8 }}>기록 완료!</h2>
                <p style={{ fontSize:13, color:MID, lineHeight:1.8 }}>함께 기억해주셔서 감사합니다.<br /><strong style={{ color:RED }}>이제 당신의 역할 유형을 확인해볼까요?</strong></p>
              </div>
            )}

            {/* RESULT */}
            {showResult && currentResult && (
              <div style={{ marginTop:8 }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, margin:'20px 0 8px', color:SEPIA, fontSize:12, fontWeight:600 }}>
                  <div style={{ flex:1, height:1, background:WARM }} />🏅 나의 참전 역할 유형<div style={{ flex:1, height:1, background:WARM }} />
                </div>

                <div style={{ background:'white', borderRadius:22, padding:'26px 22px', boxShadow:'0 8px 28px rgba(0,0,0,.1)', position:'relative', overflow:'hidden' }}>
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:4, background:`linear-gradient(90deg,${RED},${GOLD})` }} />

                  <div style={{ textAlign:'center', marginBottom:14 }}>
                    <span style={{ fontSize:60, display:'block', marginBottom:10 }}>{currentResult.emoji}</span>
                    <div style={{ display:'inline-block', background:`linear-gradient(135deg,${RED},#A02020)`, color:'white', fontSize:11, fontWeight:700, padding:'5px 16px', borderRadius:20, marginBottom:8 }}>
                      {currentResult.badge}
                    </div>
                    <p style={{ fontSize:12, color:RED, fontWeight:700, marginBottom:4, letterSpacing:1 }}>{currentResult.role}</p>
                    <h2 style={{ fontWeight:700, fontSize:20, color:DARK, lineHeight:1.4 }}>{currentResult.title}</h2>
                  </div>

                  <p style={{ fontSize:14, color:MID, lineHeight:1.8, textAlign:'center', marginBottom:10 }}>{currentResult.body}</p>

                  <div style={{ background:`linear-gradient(135deg,#FFF5F5,#FFE8E8)`, border:`1.5px solid ${RED}`, borderRadius:14, padding:'16px 18px', margin:'10px 0' }}>
                    <p style={{ fontSize:13, color:MID, lineHeight:1.8 }}>{currentResult.detail}</p>
                  </div>

                  <div style={{ display:'flex', flexWrap:'wrap', gap:6, margin:'10px 0' }}>
                    {currentResult.tags.map((tag, i) => (
                      <div key={i} style={{ background:'#FFF0EE', border:`1.5px solid #FFCCCC`, color:RED, borderRadius:20, padding:'4px 12px', fontSize:12, fontWeight:500 }}>{tag}</div>
                    ))}
                  </div>

                  <div style={{ background:`linear-gradient(135deg,${NAVY},#0E1C2C)`, borderRadius:14, padding:'18px 20px', margin:'12px 0', textAlign:'center' }}>
                    <p style={{ color:'rgba(255,255,255,.85)', fontWeight:500, fontSize:14, lineHeight:1.8 }}
                       dangerouslySetInnerHTML={{ __html: currentResult.msg.replace(/<span>/g, `<span style="color:${GOLD};font-weight:700;">`) }} />
                  </div>

                  {/* meters */}
                  <div style={{ background:`linear-gradient(135deg,${LIGHT},${CREAM})`, border:`1.5px solid ${WARM}`, borderRadius:14, padding:'16px 18px', margin:'10px 0' }}>
                    <h4 style={{ fontSize:13, fontWeight:700, color:RED, marginBottom:12 }}>⚡ 나의 역할 능력치</h4>
                    {Object.entries(currentResult.meters).map(([label, val]) => (
                      <div key={label} style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
                        <span style={{ fontSize:11, color:MID, width:72, flexShrink:0, fontWeight:600 }}>{label}</span>
                        <div style={{ flex:1, height:7, background:WARM, borderRadius:10, overflow:'hidden' }}>
                          <div style={{ height:'100%', width:`${val}%`, background:`linear-gradient(90deg,${RED},${GOLD})`, borderRadius:10, animation:'grow625 1s ease .3s both' }} />
                        </div>
                        <span style={{ fontSize:11, color:RED, width:36, textAlign:'right', fontWeight:700 }}>{val}%</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ textAlign:'center', marginTop:16 }}>
                    <button onClick={restartTest} style={{ background:'none', border:`2px solid ${WARM}`, color:SEPIA, borderRadius:12, padding:'12px 24px', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>
                      테스트 다시 하기
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div style={{ height:40 }} />
          </div>
        )}

      </div>
    </div>
  );
};

export default TypeTest625;
