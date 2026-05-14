
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

type Step = 1 | 2 | 3 | 4;

interface PersonalInfo {
  name: string; age: string; phone: string; email: string;
  region: string; addressDetail: string; job: string; referral: string;
}
interface IdeaInfo {
  q1: string; q2: string; q3: string; q4: string;
  q5: string; q6: string; q7: string; q8: string; pledgeAgreed: boolean;
}

const REGIONS  = ['서울', '경기', '인천', '기타'];
const JOBS     = ['대학생', '직장인', '취업준비생', '고등학생', '기타'];
const REFERRALS = ['인스타그램', '지인 추천', '유튜브', '기타'];

const NAVY = '#1A2B5C';
const GOLD = '#C8A84B';

const FormContestB: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [personal, setPersonal] = useState<PersonalInfo>({ name:'', age:'', phone:'', email:'', region:'', addressDetail:'', job:'', referral:'' });
  const [idea, setIdea] = useState<IdeaInfo>({ q1:'', q2:'', q3:'', q4:'', q5:'', q6:'', q7:'', q8:'', pledgeAgreed:false });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [receiptNum, setReceiptNum] = useState('');

  const setP = (k: keyof PersonalInfo, v: string) => setPersonal(p => ({ ...p, [k]: v }));
  const setI = (k: keyof IdeaInfo, v: string | boolean) => setIdea(p => ({ ...p, [k]: v }));

  const validateStep2 = () => {
    if (!personal.name)     return '이름을 입력해주세요.';
    if (!personal.age)      return '나이를 입력해주세요.';
    if (!personal.phone)    return '전화번호를 입력해주세요.';
    if (!personal.email)    return '이메일을 입력해주세요.';
    if (!personal.region)        return '거주 지역을 선택해주세요.';
    if (!personal.addressDetail) return '세부 주소를 입력해주세요.';
    if (!personal.job)           return '소속/직업을 선택해주세요.';
    if (!personal.referral) return '신청 경로를 선택해주세요.';
    return null;
  };
  const validateStep3 = () => {
    if (!idea.q1) return 'Q1 참전용사 경험을 작성해주세요.';
    if (!idea.q2) return 'Q2 아이디어 한 줄 소개를 작성해주세요.';
    if (!idea.q3) return 'Q3 배경 이야기를 작성해주세요.';
    if (!idea.q4) return 'Q4 처우 개선이 필요한 이유를 작성해주세요.';
    if (!idea.q5) return 'Q5 프로젝트 이름을 작성해주세요.';
    if (!idea.q6) return 'Q6 해결하려는 문제를 작성해주세요.';
    if (!idea.q7) return 'Q7 실현 방법을 작성해주세요.';
    if (!idea.q8) return 'Q8 기대하는 사회 변화를 작성해주세요.';
    if (!idea.pledgeAgreed) return '서약서에 동의해주세요.';
    return null;
  };

  const goNext = () => {
    if (step === 2) { const e = validateStep2(); if (e) { alert(e); return; } }
    if (step === 3) { const e = validateStep3(); if (e) { alert(e); return; } }
    if (step < 4) { setStep(s => (s + 1) as Step); window.scrollTo(0, 0); }
  };
  const goPrev = () => { if (step > 1) { setStep(s => (s - 1) as Step); window.scrollTo(0, 0); } };

  const submit = async () => {
    setSubmitting(true);
    const num = `CB-${Date.now().toString().slice(-6)}`;
    try {
      await supabase.from('AD-ieum-contest-b').insert({
        name: personal.name, age: personal.age, phone: personal.phone, email: personal.email,
        region: personal.region, address_detail: personal.addressDetail, job: personal.job, referral: personal.referral,
        q1: idea.q1, q2: idea.q2, q3: idea.q3, q4: idea.q4,
        q5: idea.q5, q6: idea.q6, q7: idea.q7, q8: idea.q8,
        pledge_agreed: idea.pledgeAgreed, receipt_number: num,
      });
    } catch (_) { /* fail silently */ }
    setReceiptNum(num);
    setSubmitted(true);
    setSubmitting(false);
    window.scrollTo(0, 0);
  };

  const STEP_LABELS = ['공모전 소개', '본인 확인', '아이디어 작성', '내용 확인'];

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5 text-center" style={{ background: '#F9F6EE' }}>
        <div className="bg-white rounded-3xl p-10 max-w-sm w-full shadow-lg border border-gray-100">
          <div className="text-5xl mb-4">🎗️</div>
          <h2 className="text-xl font-bold mb-2" style={{ color: NAVY }}>신청이 완료되었습니다!</h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-2">
            접수번호: <strong style={{ color: NAVY }}>{receiptNum}</strong>
          </p>
          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            선착순 50명께 스타벅스 기프티콘을 발송드립니다.<br />
            채택 시 개별 연락 안내 예정입니다.
          </p>
          <button onClick={() => navigate('/')} className="w-full text-white font-bold py-3 rounded-xl text-sm" style={{ background: NAVY }}>
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#F9F6EE', fontFamily: "'Pretendard', 'Noto Sans KR', sans-serif" }}>
      {/* header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <button onClick={() => step === 1 ? navigate(-1) : goPrev()} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors">
            <i className="fa-solid fa-chevron-left" style={{ color: NAVY }}></i>
          </button>
          <div className="flex-1">
            <p className="text-xs text-gray-400 font-medium">잊지 말고, 이음 아이디어 공모전</p>
            <p className="text-sm font-bold" style={{ color: NAVY }}>{STEP_LABELS[step - 1]}</p>
          </div>
          <span className="text-xs font-bold" style={{ color: NAVY }}>{step} / 4</span>
        </div>
        <div className="h-1 bg-gray-100">
          <div className="h-full transition-all duration-500" style={{ width: `${(step / 4) * 100}%`, background: NAVY }} />
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 pb-32">

        {/* step dots */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {STEP_LABELS.map((label, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center gap-1">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors"
                  style={{ background: i + 1 === step ? NAVY : i + 1 < step ? GOLD : '#E5E0D8', color: i + 1 <= step ? 'white' : '#888' }}>
                  {i + 1 < step ? <i className="fa-solid fa-check text-[10px]"></i> : i + 1}
                </div>
                <span className="text-[9px] font-semibold" style={{ color: i + 1 === step ? NAVY : '#aaa' }}>{label}</span>
              </div>
              {i < 3 && <div className="w-8 h-px mb-4" style={{ background: i + 1 < step ? GOLD : '#E5E0D8' }} />}
            </React.Fragment>
          ))}
        </div>

        {/* ── STEP 1: 공모전 소개 ── */}
        {step === 1 && (
          <div>
            {/* 포스터 스타일 헤더 */}
            <div className="rounded-3xl overflow-hidden mb-5" style={{ background: 'linear-gradient(160deg, #F5F0E8 0%, #EAE4D4 100%)', border: `2px solid ${GOLD}40` }}>
              <div className="px-6 pt-7 pb-5 text-center">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full mb-4" style={{ background: NAVY, color: 'white' }}>
                  🎗️ 6월, 호국보훈의 달
                </div>
                <p className="text-sm font-bold mb-1" style={{ color: NAVY }}>잊지 말고, 이음</p>
                <h1 className="text-3xl font-black leading-tight mb-3" style={{ color: NAVY }}>
                  아이디어<br />공모전
                </h1>
                <p className="text-sm text-gray-600 leading-relaxed">
                  참전용사 처우개선을 위한<br />따뜻한 아이디어를 보내주세요
                </p>
              </div>

              {/* 공모전 정보 */}
              <div className="mx-4 mb-5 bg-white rounded-2xl p-4 space-y-2.5">
                {[
                  { label: '참가자격', value: '대한민국 20대 청년' },
                  { label: '공모기간', value: '2026.5.15 ~ 5.28' },
                  { label: '공모주제', value: '참전용사 처우개선에 대한 다양한 아이디어' },
                  { label: '참여방법', value: 'i-eum 공식 홈페이지에서 아이디어 제출' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-3">
                    <span className="text-xs font-black px-2 py-0.5 rounded-md flex-shrink-0" style={{ background: NAVY, color: GOLD }}>
                      {label}
                    </span>
                    <span className="text-xs text-gray-700 leading-relaxed">{value}</span>
                  </div>
                ))}
              </div>

              {/* 시상내역 */}
              <div className="mx-4 mb-5">
                <p className="text-xs font-black text-center mb-3" style={{ color: NAVY }}>🏆 시상내역</p>
                <div className="space-y-2">
                  {[
                    { award: '대상', prize: '상금 100만원 + 아이디어 실현', color: '#B8860B' },
                    { award: '우수상', prize: '상금 50만원 + 실무 컨설팅', color: '#808080' },
                    { award: '장려상', prize: '실무 컨설팅 (포트폴리오 리뷰 또는 커리어 코칭 1회)', color: '#CD7F32' },
                  ].map(({ award, prize, color }) => (
                    <div key={award} className="flex items-center gap-3 bg-white rounded-xl px-4 py-2.5">
                      <span className="text-xs font-black w-14 flex-shrink-0" style={{ color }}>{award}</span>
                      <span className="text-xs text-gray-600">{prize}</span>
                    </div>
                  ))}
                  <div className="text-center text-[11px] text-gray-500 mt-2 font-medium">
                    ☕ 선착순 50명 스타벅스 기프티콘 증정
                  </div>
                </div>
              </div>
            </div>

            {/* 참전용사 현황 */}
            <div className="rounded-3xl overflow-hidden mb-5" style={{ border: '2px solid #E8E0D0', background: '#FFFDF8' }}>
              {/* 인용구 */}
              <div className="px-6 py-5 text-center" style={{ borderBottom: '1px solid #F0EBE0' }}>
                <p className="text-[11px] font-semibold text-gray-400 mb-2 tracking-wide uppercase">💬 한 참전용사 어르신의 말씀</p>
                <p className="text-sm leading-loose text-gray-600 italic">
                  "전쟁이란 거는 절대 있으면 안 돼...<br />
                  참 많이 힘들었지. 그래도 말이야,<br />
                  <strong className="not-italic" style={{ color: NAVY }}>너희가 이렇게 잘 살고 있으니까 충분해.</strong>"
                </p>
              </div>

              {/* 메인 메시지 */}
              <div className="px-6 pt-5 pb-3 text-center">
                <p className="text-base font-black leading-snug" style={{ color: NAVY }}>
                  어르신은 '충분하다'고 말하지만,
                </p>
                <p className="text-base font-black leading-snug mb-3" style={{ color: '#C0392B' }}>
                  우리는 정말 충분한가요?
                </p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  명예로운 이름 뒤에 가려진<br />냉혹한 생활고와 고립된 노후
                </p>
              </div>

              {/* 현실 카드 3개 */}
              <div className="px-5 pb-4 space-y-2">
                {([
                  { num: '1', label: '차가운 단칸방', sub: '열악한 주거환경과 지속되는 생활고' },
                  { num: '2', label: '반복되는 병원방문', sub: '전상 후유증으로 지속적인 치료 필요' },
                  { num: '3', label: '부족한 지원', sub: '참전명예수당 월 38만원 (2026년 기준)' },
                ] as { num: string; label: string; sub: string }[]).map(({ num, label, sub }) => (
                  <div key={num} className="flex items-center gap-3 bg-white rounded-xl px-4 py-2.5" style={{ border: '1px solid #F0EBE0' }}>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0" style={{ background: '#C0392B' }}>
                      {num}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800">{label}</p>
                      <p className="text-[11px] text-gray-400">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 마무리 문장 */}
              <div className="px-6 pt-2 pb-5 text-center" style={{ borderTop: '1px solid #F0EBE0' }}>
                <p className="text-xs text-gray-500 leading-loose">
                  아픈 몸보다 더 아픈 건,<br />
                  영웅이라 부르면서도 잊고 살아온<br />
                  <strong style={{ color: NAVY }}>우리의 무관심</strong>일지도 모릅니다.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-gray-100 text-xs text-gray-500 leading-relaxed text-center">
              아래 버튼을 눌러 아이디어를 제출해주세요.<br />
              <strong style={{ color: NAVY }}>참전용사를 위한 당신의 아이디어</strong>를 기다립니다.
            </div>
          </div>
        )}

        {/* ── STEP 2: 본인 확인 ── */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold mb-1" style={{ color: NAVY }}>신청자 정보를 입력해주세요</h2>
            <p className="text-sm text-gray-400 mb-6">수집된 정보는 공모전 운영 목적으로만 사용됩니다.</p>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="이름" required><input type="text" value={personal.name} onChange={e => setP('name', e.target.value)} placeholder="홍길동" className="form-input-b" /></Field>
                <Field label="나이" required><input type="number" value={personal.age} onChange={e => setP('age', e.target.value)} placeholder="24" className="form-input-b" /></Field>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="전화번호" required><input type="tel" value={personal.phone} onChange={e => setP('phone', e.target.value)} placeholder="01012345678" className="form-input-b" /></Field>
                <Field label="이메일" required><input type="email" value={personal.email} onChange={e => setP('email', e.target.value)} placeholder="example@email.com" className="form-input-b" /></Field>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="거주 지역" required><RadioGroupB options={REGIONS} value={personal.region} onChange={v => setP('region', v)} navy={NAVY} /></Field>
                <Field label="세부 주소" required>
                  <input type="text" value={personal.addressDetail} onChange={e => setP('addressDetail', e.target.value)} placeholder="ex) 서울 관악구 신림동" className="form-input-b" />
                </Field>
              </div>
              <Field label="소속 / 직업" required><RadioGroupB options={JOBS} value={personal.job} onChange={v => setP('job', v)} cols={2} navy={NAVY} /></Field>
              <Field label="신청 경로" required><RadioGroupB options={REFERRALS} value={personal.referral} onChange={v => setP('referral', v)} cols={2} navy={NAVY} /></Field>
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs text-gray-400 leading-relaxed">
                <p className="font-bold text-gray-600 mb-1">개인정보 수집·이용 안내</p>
                수집 항목: 이름, 나이, 전화번호, 이메일, 거주 지역<br />
                수집 목적: 공모전 심사 및 결과 안내 / 기프티콘 발송<br />
                보유 기간: 공모전 종료 후 1년
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 3: 아이디어 작성 ── */}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold mb-1" style={{ color: NAVY }}>참전용사의 이야기를 들려주세요.</h2>
            <p className="text-sm text-gray-400 mb-5">당신의 경험과 따뜻한 아이디어를 자유롭게 작성해주세요.</p>

            <div className="flex flex-col gap-4">
              <IdeaFieldB num="Q1" navy={NAVY}
                label="당신이 기억하는 참전용사에 대한 경험이나 이야기를 나눠주세요."
                value={idea.q1} onChange={v => setI('q1', v)} rows={5} required />

              <IdeaFieldB num="Q2" navy={NAVY}
                label="당신이 제안하고 싶은 참전용사 처우 개선 아이디어를 한 문장으로 소개해 주세요."
                hint="ex) 참전용사의 생활 향상을 위한 프로그램 제안"
                value={idea.q2} onChange={v => setI('q2', v)} maxLen={150} rows={2} required />

              <IdeaFieldB num="Q3" navy={NAVY}
                label="이 아이디어를 떠올리게 된 배경 이야기를 들려주세요."
                value={idea.q3} onChange={v => setI('q3', v)} rows={5} required />

              <IdeaFieldB num="Q4" navy={NAVY}
                label="참전용사의 처우 개선이 필요하다고 느꼈던 이유는 무엇인가요?"
                hint="특별한 경험이나 인상 깊었던 순간을 자유롭게 작성해 주세요."
                value={idea.q4} onChange={v => setI('q4', v)} rows={5} required />

              <IdeaFieldB num="Q5" navy={NAVY}
                label="당신의 아이디어에 적합한 프로젝트 이름은 무엇인가요?"
                hint="이 프로젝트를 대표하는 창의적인 이름을 지어주세요."
                value={idea.q5} onChange={v => setI('q5', v)} rows={1} required />

              <IdeaFieldB num="Q6" navy={NAVY}
                label="이 아이디어는 참전용사의 어떤 문제를 해결하나요?"
                hint="구체적으로 어떤 처우 개선을 이루고자 하는지 설명해 주세요."
                value={idea.q6} onChange={v => setI('q6', v)} rows={5} required />

              <IdeaFieldB num="Q7" navy={NAVY}
                label="이 개선 아이디어는 현실에서 어떻게 이루어질 수 있을까요?"
                hint="사람들이 연결되거나 프로그램을 운영하기 위해 필요한 방법과 자원은 무엇인가요? 초기 비용은 어느 정도가 예상되나요?"
                value={idea.q7} onChange={v => setI('q7', v)} rows={5} required />

              <IdeaFieldB num="Q8" navy={NAVY}
                label="이 개선이 우리 사회에 어떤 긍정적인 변화를 가져올 수 있을까요?"
                hint="참전용사와 사회가 서로 어떻게 연결되고, 결과적으로 어떤 변화가 생길까요?"
                value={idea.q8} onChange={v => setI('q8', v)} rows={5} required />

              {/* 서약서 */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100">
                <p className="text-xs font-bold mb-1" style={{ color: NAVY }}>서약서 <span className="text-red-500">*</span></p>
                <div className="bg-gray-50 rounded-xl p-4 text-xs text-gray-500 leading-loose mb-4 space-y-1">
                  <p>• 본 아이디어는 본인의 창작물임을 확인합니다.</p>
                  <p>• 표절 또는 무단 도용 시 민·형사상 책임을 집니다.</p>
                  <p>• 동일인은 1개의 아이디어만 제안할 수 있습니다.</p>
                  <p>• 채택 시 개별 연락을 통해 진행 방식을 안내드립니다.</p>
                </div>
                <label onClick={() => setI('pledgeAgreed', !idea.pledgeAgreed)}
                  className="flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all"
                  style={{ borderColor: idea.pledgeAgreed ? NAVY : '#E5E0D8', background: idea.pledgeAgreed ? `${NAVY}08` : 'white' }}>
                  <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-colors"
                    style={{ background: idea.pledgeAgreed ? NAVY : 'white', border: idea.pledgeAgreed ? 'none' : '2px solid #E5E0D8' }}>
                    {idea.pledgeAgreed && <i className="fa-solid fa-check text-white text-[10px]"></i>}
                  </div>
                  <span className="text-sm font-semibold" style={{ color: idea.pledgeAgreed ? NAVY : '#aaa' }}>
                    위 내용을 모두 확인하고 동의합니다.
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 4: 내용 확인 ── */}
        {step === 4 && (
          <div>
            <h2 className="text-xl font-bold mb-1" style={{ color: NAVY }}>입력 내용을 확인해주세요</h2>
            <p className="text-sm text-gray-400 mb-5">제출 후에는 수정이 어려우니 꼼꼼히 확인해주세요.</p>

            <ReviewSectionB title="신청자 정보" navy={NAVY}>
              <ReviewRowB label="이름" value={personal.name} />
              <ReviewRowB label="나이" value={`${personal.age}세`} />
              <ReviewRowB label="전화번호" value={personal.phone} />
              <ReviewRowB label="이메일" value={personal.email} />
              <ReviewRowB label="거주 지역" value={personal.region} />
              <ReviewRowB label="세부 주소" value={personal.addressDetail} />
              <ReviewRowB label="소속/직업" value={personal.job} />
              <ReviewRowB label="신청 경로" value={personal.referral} />
            </ReviewSectionB>

            <ReviewSectionB title="아이디어" navy={NAVY}>
              <ReviewRowB label="Q1 참전용사 경험" value={idea.q1} truncate />
              <ReviewRowB label="Q2 아이디어 소개" value={idea.q2} truncate />
              <ReviewRowB label="Q3 배경 이야기" value={idea.q3} truncate />
              <ReviewRowB label="Q4 개선 필요 이유" value={idea.q4} truncate />
              <ReviewRowB label="Q5 프로젝트 이름" value={idea.q5} />
              <ReviewRowB label="Q6 해결 문제" value={idea.q6} truncate />
              <ReviewRowB label="Q7 실현 방법" value={idea.q7} truncate />
              <ReviewRowB label="Q8 사회적 변화" value={idea.q8} truncate />
              <ReviewRowB label="서약서 동의" value={idea.pledgeAgreed ? '✅ 동의' : '미동의'} />
            </ReviewSectionB>

            <div className="rounded-xl p-4 text-xs text-gray-400 mt-2 mb-4 text-center border border-gray-100 bg-white">
              제출 후 결과는 입력하신 이메일로 안내드립니다.<br />
              <strong style={{ color: NAVY }}>선착순 50명</strong>께 스타벅스 기프티콘을 발송합니다.
            </div>
          </div>
        )}
      </div>

      {/* bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-4 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
        <div className="max-w-2xl mx-auto">
          {step < 4 ? (
            <button onClick={goNext} className="w-full text-white font-bold py-4 rounded-2xl text-base transition-opacity hover:opacity-90" style={{ background: NAVY }}>
              다음 단계로 <i className="fa-solid fa-arrow-right ml-2 text-sm"></i>
            </button>
          ) : (
            <button onClick={submit} disabled={submitting} className="w-full text-white font-bold py-4 rounded-2xl text-base transition-opacity hover:opacity-90 disabled:opacity-50" style={{ background: NAVY }}>
              {submitting ? '제출 중...' : '🎗️ 최종 제출하기'}
            </button>
          )}
        </div>
      </div>

      <style>{`
        .form-input-b {
          width: 100%; border: 1.5px solid #E5E0D8; border-radius: 10px;
          padding: 12px 14px; font-size: 14px; color: #1A2B5C;
          background: #F9F6EE; outline: none; box-sizing: border-box; font-family: inherit;
        }
        .form-input-b:focus { border-color: ${NAVY}; }
      `}</style>
    </div>
  );
};

/* ── Sub-components ── */
const Field: React.FC<{ label: string; required?: boolean; children: React.ReactNode }> = ({ label, required, children }) => (
  <div>
    <label className="block text-sm font-bold text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

const RadioGroupB: React.FC<{ options: string[]; value: string; onChange: (v: string) => void; cols?: number; navy: string }> = ({ options, value, onChange, cols = 1, navy }) => (
  <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
    {options.map(opt => (
      <label key={opt} onClick={() => onChange(opt)}
        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border cursor-pointer transition-all text-sm"
        style={{ borderColor: value === opt ? navy : '#E5E0D8', background: value === opt ? `${navy}08` : '#F9F6EE', color: navy, fontWeight: value === opt ? 700 : 400 }}>
        <span className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors"
          style={{ borderColor: value === opt ? navy : '#E5E0D8', background: value === opt ? navy : 'white' }}>
          {value === opt && <span className="w-1.5 h-1.5 rounded-full bg-white block" />}
        </span>
        {opt}
      </label>
    ))}
  </div>
);

const IdeaFieldB: React.FC<{
  num: string; label: string; hint?: string; required?: boolean; navy: string;
  value: string; onChange: (v: string) => void; maxLen?: number; rows?: number;
}> = ({ num, label, hint, required, navy, value, onChange, maxLen, rows = 4 }) => (
  <div className="bg-white rounded-2xl p-5 border border-gray-100">
    <p className="text-xs font-black mb-1" style={{ color: navy }}>
      {num} <span className="font-bold text-sm text-gray-800">· {label}</span>
      {required && <span className="text-red-500 ml-1">*</span>}
    </p>
    {hint && <p className="text-xs text-gray-400 mb-3 leading-relaxed">{hint}</p>}
    <textarea
      value={value}
      onChange={e => onChange(maxLen ? e.target.value.slice(0, maxLen) : e.target.value)}
      rows={rows} placeholder="내용을 입력해주세요."
      className="w-full border border-gray-200 rounded-xl p-3 text-sm text-gray-800 bg-gray-50 resize-none outline-none transition-colors"
      style={{ fontFamily: 'inherit' }}
      onFocus={e => (e.target.style.borderColor = navy)}
      onBlur={e => (e.target.style.borderColor = '#E5E7EB')}
    />
    {maxLen && (
      <p className="text-right text-xs text-gray-400 mt-1">
        <span className={value.length >= maxLen ? 'text-red-500 font-bold' : ''}>{value.length}</span> / {maxLen}
      </p>
    )}
  </div>
);

const ReviewSectionB: React.FC<{ title: string; navy: string; children: React.ReactNode }> = ({ title, navy, children }) => (
  <div className="bg-white rounded-2xl p-5 border border-gray-100 mb-3">
    <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: navy }}>{title}</p>
    <div className="space-y-2">{children}</div>
  </div>
);

const ReviewRowB: React.FC<{ label: string; value: string; truncate?: boolean }> = ({ label, value, truncate }) => (
  <div className="flex gap-3">
    <span className="text-xs text-gray-400 font-semibold w-28 flex-shrink-0 pt-0.5">{label}</span>
    <span className={`text-sm text-gray-800 leading-relaxed ${truncate ? 'line-clamp-2' : ''}`}>{value}</span>
  </div>
);

export default FormContestB;
