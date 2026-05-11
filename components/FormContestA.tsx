
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

type Track = '기술' | '문화' | '교육';
type Step = 1 | 2 | 3 | 4;

interface PersonalInfo {
  name: string;
  age: string;
  phone: string;
  email: string;
  region: string;
  job: string;
  referral: string;
}

interface IdeaInfo {
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  q6: string;
  q7agreed: boolean;
}

const TRACKS: { id: Track; icon: string; title: string; desc: string; color: string }[] = [
  { id: '기술', icon: '💡', title: '기술 트랙', desc: '세상을 바꾸는 기술과 혁신 아이디어\n새로운 소통 방식 창출에 초점을 맞춥니다', color: '#E8F4FD' },
  { id: '문화', icon: '🎨', title: '문화 트랙', desc: '일상 속 콘텐츠를 통한 상호이해 증진\n문화적 연결로 세상을 가깝게 만듭니다', color: '#FDF0E8' },
  { id: '교육', icon: '📚', title: '교육 트랙', desc: '배움과 경험으로 인식·기회 확장\n교육을 통해 더 나은 미래를 만듭니다', color: '#EDF8ED' },
];

const REGIONS = ['서울', '경기', '인천', '기타'];
const JOBS = ['대학생', '직장인', '취업준비생', '고등학생', '기타'];
const REFERRALS = ['인스타그램', '지인 추천', '유튜브', '기타'];

const FormContestA: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [track, setTrack] = useState<Track | null>(null);
  const [personal, setPersonal] = useState<PersonalInfo>({ name: '', age: '', phone: '', email: '', region: '', job: '', referral: '' });
  const [idea, setIdea] = useState<IdeaInfo>({ q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7agreed: false });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [receiptNum, setReceiptNum] = useState('');

  const setP = (key: keyof PersonalInfo, val: string) => setPersonal(p => ({ ...p, [key]: val }));
  const setI = (key: keyof IdeaInfo, val: string | boolean) => setIdea(p => ({ ...p, [key]: val }));

  const validateStep2 = () => {
    if (!personal.name) return '이름을 입력해주세요.';
    if (!personal.age) return '나이를 입력해주세요.';
    if (!personal.phone) return '전화번호를 입력해주세요.';
    if (!personal.email) return '이메일을 입력해주세요.';
    if (!personal.region) return '거주 지역을 선택해주세요.';
    if (!personal.job) return '소속/직업을 선택해주세요.';
    if (!personal.referral) return '신청 경로를 선택해주세요.';
    return null;
  };

  const validateStep3 = () => {
    if (!idea.q1) return '한 줄 소개를 입력해주세요.';
    if (!idea.q2) return '배경 이야기를 입력해주세요.';
    if (!idea.q3) return '아이디어 제목을 입력해주세요.';
    if (!idea.q4) return '문제 해결 방식을 입력해주세요.';
    if (!idea.q5) return '실행 가능성을 입력해주세요.';
    if (!idea.q6) return '기대 효과를 입력해주세요.';
    if (!idea.q7agreed) return '서약서에 동의해주세요.';
    return null;
  };

  const goNext = () => {
    if (step === 1) {
      if (!track) { alert('분야를 선택해주세요.'); return; }
      setStep(2);
    } else if (step === 2) {
      const err = validateStep2();
      if (err) { alert(err); return; }
      setStep(3);
    } else if (step === 3) {
      const err = validateStep3();
      if (err) { alert(err); return; }
      setStep(4);
    }
    window.scrollTo(0, 0);
  };

  const goPrev = () => {
    if (step > 1) { setStep(s => (s - 1) as Step); window.scrollTo(0, 0); }
  };

  const submit = async () => {
    setSubmitting(true);
    const num = `CA-${Date.now().toString().slice(-6)}`;
    try {
      await supabase.from('AD-ieum-contest').insert({
        track,
        name: personal.name, age: personal.age, phone: personal.phone, email: personal.email,
        region: personal.region, job: personal.job, referral: personal.referral,
        q1: idea.q1, q2: idea.q2, q3: idea.q3, q4: idea.q4,
        q5: idea.q5, q6: idea.q6, q7_agreed: idea.q7agreed,
        receipt_number: num,
      });
    } catch (_) { /* fail silently */ }
    setReceiptNum(num);
    setSubmitted(true);
    setSubmitting(false);
    window.scrollTo(0, 0);
  };

  const STEP_LABELS = ['분야 선택', '본인 확인', '아이디어 작성', '내용 확인'];

  if (submitted) {
    return (
      <div className="min-h-screen bg-ieumCream flex flex-col items-center justify-center px-5 text-center">
        <div className="bg-white rounded-3xl p-10 max-w-sm w-full shadow-lg">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-xl font-bold text-ieumDark mb-2">신청이 완료되었습니다!</h2>
          <p className="text-sm text-ieumMuted leading-relaxed mb-4">
            접수번호: <strong className="text-ieumOrange">{receiptNum}</strong><br />
            이메일로 결과를 안내드릴 예정입니다.<br />심사 결과는 이메일로 발표됩니다.
          </p>
          <button onClick={() => navigate('/')} className="w-full bg-ieumOrange text-white font-bold py-3 rounded-xl text-sm">
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ieumCream" style={{ fontFamily: "'Pretendard', 'Noto Sans KR', sans-serif" }}>
      {/* header */}
      <header className="sticky top-0 z-50 bg-white border-b border-ieumBorder shadow-sm">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
          <button onClick={() => step === 1 ? navigate(-1) : goPrev()} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-ieumCream transition-colors">
            <i className="fa-solid fa-chevron-left text-ieumDark"></i>
          </button>
          <div className="flex-1">
            <p className="text-xs text-ieumMuted font-medium">SEESAW 아이디어 공모전</p>
            <p className="text-sm font-bold text-ieumDark">{STEP_LABELS[step - 1]}</p>
          </div>
          <span className="text-xs font-bold text-ieumOrange">{step} / 4</span>
        </div>
        {/* progress bar */}
        <div className="h-1 bg-ieumCream">
          <div className="h-full bg-ieumOrange transition-all duration-500" style={{ width: `${(step / 4) * 100}%` }} />
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6 pb-32">

        {/* step indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {STEP_LABELS.map((label, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center gap-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${i + 1 === step ? 'bg-ieumOrange text-white' : i + 1 < step ? 'bg-ieumGold text-white' : 'bg-ieumCream text-ieumMuted border border-ieumBorder'}`}>
                  {i + 1 < step ? <i className="fa-solid fa-check text-[10px]"></i> : i + 1}
                </div>
                <span className={`text-[9px] font-semibold ${i + 1 === step ? 'text-ieumOrange' : 'text-ieumMuted'}`}>{label}</span>
              </div>
              {i < STEP_LABELS.length - 1 && <div className={`w-8 h-px mb-4 ${i + 1 < step ? 'bg-ieumGold' : 'bg-ieumBorder'}`} />}
            </React.Fragment>
          ))}
        </div>

        {/* ── STEP 1: 분야 선택 ── */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold text-ieumDark mb-1">참여 분야를 선택해주세요</h2>
            <p className="text-sm text-ieumMuted mb-6 leading-relaxed">세 가지 트랙 중 아이디어에 맞는 분야를 골라주세요.</p>
            <div className="flex flex-col gap-3">
              {TRACKS.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTrack(t.id)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all ${track === t.id ? 'border-ieumOrange bg-ieumOrange/5' : 'border-ieumBorder bg-white hover:border-ieumOrange/40'}`}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{t.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-ieumDark">{t.title}</span>
                        {track === t.id && <i className="fa-solid fa-circle-check text-ieumOrange"></i>}
                      </div>
                      <p className="text-xs text-ieumMuted leading-relaxed whitespace-pre-line">{t.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── STEP 2: 본인 확인 ── */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold text-ieumDark mb-1">신청자 정보를 입력해주세요</h2>
            <p className="text-sm text-ieumMuted mb-6">수집된 정보는 공모전 운영 목적으로만 사용됩니다.</p>
            <div className="flex flex-col gap-4">
              <Field label="이름" required>
                <input type="text" value={personal.name} onChange={e => setP('name', e.target.value)} placeholder="홍길동" className="form-input" />
              </Field>
              <Field label="나이" required>
                <input type="number" value={personal.age} onChange={e => setP('age', e.target.value)} placeholder="24" className="form-input w-28" />
              </Field>
              <Field label="전화번호" required>
                <input type="tel" value={personal.phone} onChange={e => setP('phone', e.target.value)} placeholder="01012345678" className="form-input" />
              </Field>
              <Field label="이메일" required>
                <input type="email" value={personal.email} onChange={e => setP('email', e.target.value)} placeholder="example@email.com" className="form-input" />
              </Field>
              <Field label="거주 지역" required>
                <RadioGroup options={REGIONS} value={personal.region} onChange={v => setP('region', v)} />
              </Field>
              <Field label="소속 / 직업" required>
                <RadioGroup options={JOBS} value={personal.job} onChange={v => setP('job', v)} cols={2} />
              </Field>
              <Field label="신청 경로" required>
                <RadioGroup options={REFERRALS} value={personal.referral} onChange={v => setP('referral', v)} cols={2} />
              </Field>

              <div className="bg-ieumCream border border-ieumBorder rounded-xl p-4 text-xs text-ieumMuted leading-relaxed">
                <p className="font-bold text-ieumDark mb-1">개인정보 수집·이용 안내</p>
                수집 항목: 이름, 나이, 전화번호, 이메일, 거주 지역<br />
                수집 목적: 공모전 심사 및 결과 안내<br />
                보유 기간: 공모전 종료 후 1년
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 3: 아이디어 작성 ── */}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold text-ieumDark mb-1">아이디어를 작성해주세요</h2>
            <div className="inline-flex items-center gap-1.5 bg-ieumOrange/10 text-ieumOrange text-xs font-bold px-3 py-1.5 rounded-full mb-5">
              <i className="fa-solid fa-layer-group text-[10px]"></i>
              {track} 트랙
            </div>
            <div className="flex flex-col gap-5">
              <IdeaField
                num="Q1" label="아이디어를 한 줄로 소개해주세요." required
                hint="100자 이내로 간결하게 작성해주세요."
                value={idea.q1} onChange={v => setI('q1', v)} maxLen={100} rows={2}
              />
              <IdeaField
                num="Q2" label="아이디어의 배경 이야기를 들려주세요." required
                hint="왜 이 아이디어가 필요한지, 어떤 문제를 해결하려는지 적어주세요. (1000자 이내)"
                value={idea.q2} onChange={v => setI('q2', v)} maxLen={1000} rows={6}
              />
              <IdeaField
                num="Q3" label="아이디어의 제목을 지어주세요." required
                value={idea.q3} onChange={v => setI('q3', v)} rows={1}
              />
              <IdeaField
                num="Q4" label="이 아이디어는 문제를 어떻게 해결하나요?" required
                hint="구체적인 방법과 접근 방식을 작성해주세요."
                value={idea.q4} onChange={v => setI('q4', v)} rows={5}
              />
              <IdeaField
                num="Q5" label="실행 가능성을 설명해주세요." required
                hint="실행 계획, 필요한 자원, 예산 등을 포함해 작성해주세요."
                value={idea.q5} onChange={v => setI('q5', v)} rows={5}
              />
              <IdeaField
                num="Q6" label="기대 효과를 작성해주세요." required
                hint="단기적 효과와 장기적 효과를 구분해서 작성해주세요."
                value={idea.q6} onChange={v => setI('q6', v)} rows={5}
              />

              {/* Q7 서약서 */}
              <div className="bg-white rounded-2xl p-5 border border-ieumBorder">
                <p className="text-xs font-bold text-ieumOrange mb-1">Q7 · 서약서 <span className="text-red-500">*</span></p>
                <div className="bg-ieumCream rounded-xl p-4 text-xs text-ieumMuted leading-loose mb-4 space-y-1">
                  <p>• 본 아이디어는 본인의 창작물임을 확인합니다.</p>
                  <p>• 표절 또는 무단 도용 시 민·형사상 책임을 집니다.</p>
                  <p>• 동일인은 1개의 아이디어만 제안할 수 있습니다.</p>
                  <p>• 선정 시 제세공과금은 수상자 부담입니다.</p>
                </div>
                <label
                  onClick={() => setI('q7agreed', !idea.q7agreed)}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${idea.q7agreed ? 'border-ieumOrange bg-ieumOrange/5' : 'border-ieumBorder bg-white'}`}
                >
                  <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-colors ${idea.q7agreed ? 'bg-ieumOrange' : 'bg-white border-2 border-ieumBorder'}`}>
                    {idea.q7agreed && <i className="fa-solid fa-check text-white text-[10px]"></i>}
                  </div>
                  <span className={`text-sm font-semibold ${idea.q7agreed ? 'text-ieumOrange' : 'text-ieumMuted'}`}>
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
            <h2 className="text-xl font-bold text-ieumDark mb-1">입력 내용을 확인해주세요</h2>
            <p className="text-sm text-ieumMuted mb-5">제출 후에는 수정이 어려우니 꼼꼼히 확인해주세요.</p>

            <ReviewSection title="참여 분야">
              <div className="flex items-center gap-2">
                <span className="bg-ieumOrange text-white text-xs font-bold px-3 py-1 rounded-full">{track} 트랙</span>
              </div>
            </ReviewSection>

            <ReviewSection title="신청자 정보">
              <ReviewRow label="이름" value={personal.name} />
              <ReviewRow label="나이" value={`${personal.age}세`} />
              <ReviewRow label="전화번호" value={personal.phone} />
              <ReviewRow label="이메일" value={personal.email} />
              <ReviewRow label="거주 지역" value={personal.region} />
              <ReviewRow label="소속/직업" value={personal.job} />
              <ReviewRow label="신청 경로" value={personal.referral} />
            </ReviewSection>

            <ReviewSection title="아이디어">
              <ReviewRow label="Q1 한 줄 소개" value={idea.q1} />
              <ReviewRow label="Q2 배경 이야기" value={idea.q2} truncate />
              <ReviewRow label="Q3 제목" value={idea.q3} />
              <ReviewRow label="Q4 해결 방식" value={idea.q4} truncate />
              <ReviewRow label="Q5 실행 가능성" value={idea.q5} truncate />
              <ReviewRow label="Q6 기대 효과" value={idea.q6} truncate />
              <ReviewRow label="서약서 동의" value={idea.q7agreed ? '✅ 동의' : '미동의'} />
            </ReviewSection>

            <div className="bg-ieumOrange/5 border border-ieumOrange/20 rounded-xl p-4 text-xs text-ieumMuted mt-2 mb-6 text-center">
              제출 후 결과는 입력하신 이메일로 안내드립니다.
            </div>
          </div>
        )}

      </div>

      {/* bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-ieumBorder px-4 py-4 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
        <div className="max-w-lg mx-auto">
          {step < 4 ? (
            <button onClick={goNext} className="w-full bg-ieumOrange text-white font-bold py-4 rounded-2xl text-base hover:bg-ieumGold transition-colors">
              다음 단계로
              <i className="fa-solid fa-arrow-right ml-2 text-sm"></i>
            </button>
          ) : (
            <button onClick={submit} disabled={submitting} className="w-full bg-ieumOrange text-white font-bold py-4 rounded-2xl text-base hover:bg-ieumGold transition-colors disabled:opacity-60">
              {submitting ? '제출 중...' : '🎯 최종 제출하기'}
            </button>
          )}
        </div>
      </div>

      <style>{`
        .form-input {
          width: 100%; border: 1.5px solid #E5E0D8; border-radius: 10px;
          padding: 12px 14px; font-size: 14px; color: #1C170D;
          background: #FAF7F2; outline: none; box-sizing: border-box;
          font-family: inherit;
        }
        .form-input:focus { border-color: #E8803A; }
      `}</style>
    </div>
  );
};

/* ── Sub-components ── */

const Field: React.FC<{ label: string; required?: boolean; children: React.ReactNode }> = ({ label, required, children }) => (
  <div>
    <label className="block text-sm font-bold text-ieumDark mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

const RadioGroup: React.FC<{ options: string[]; value: string; onChange: (v: string) => void; cols?: number }> = ({ options, value, onChange, cols = 1 }) => (
  <div className={`grid gap-2`} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
    {options.map(opt => (
      <label key={opt} onClick={() => onChange(opt)}
        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border cursor-pointer transition-all text-sm ${value === opt ? 'border-ieumOrange bg-ieumOrange/5 font-bold text-ieumOrange' : 'border-ieumBorder bg-ieumCream text-ieumDark'}`}>
        <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${value === opt ? 'border-ieumOrange bg-ieumOrange' : 'border-ieumBorder bg-white'}`}>
          {value === opt && <span className="w-1.5 h-1.5 rounded-full bg-white block" />}
        </span>
        {opt}
      </label>
    ))}
  </div>
);

const IdeaField: React.FC<{
  num: string; label: string; hint?: string; required?: boolean;
  value: string; onChange: (v: string) => void; maxLen?: number; rows?: number;
}> = ({ num, label, hint, required, value, onChange, maxLen, rows = 4 }) => (
  <div className="bg-white rounded-2xl p-5 border border-ieumBorder">
    <p className="text-xs font-bold text-ieumOrange mb-1">
      {num} <span className="text-ieumDark font-bold text-sm">· {label}</span>
      {required && <span className="text-red-500 ml-1">*</span>}
    </p>
    {hint && <p className="text-xs text-ieumMuted mb-3 leading-relaxed">{hint}</p>}
    <textarea
      value={value}
      onChange={e => onChange(maxLen ? e.target.value.slice(0, maxLen) : e.target.value)}
      rows={rows}
      placeholder="내용을 입력해주세요."
      className="w-full border border-ieumBorder rounded-xl p-3 text-sm text-ieumDark bg-ieumCream resize-none outline-none focus:border-ieumOrange transition-colors"
      style={{ fontFamily: 'inherit' }}
    />
    {maxLen && (
      <p className="text-right text-xs text-ieumMuted mt-1">
        <span className={value.length >= maxLen ? 'text-red-500 font-bold' : ''}>{value.length}</span> / {maxLen}
      </p>
    )}
  </div>
);

const ReviewSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white rounded-2xl p-5 border border-ieumBorder mb-3">
    <p className="text-xs font-bold text-ieumOrange mb-3 uppercase tracking-wide">{title}</p>
    <div className="space-y-2">{children}</div>
  </div>
);

const ReviewRow: React.FC<{ label: string; value: string; truncate?: boolean }> = ({ label, value, truncate }) => (
  <div className="flex gap-3">
    <span className="text-xs text-ieumMuted font-semibold w-24 flex-shrink-0 pt-0.5">{label}</span>
    <span className={`text-sm text-ieumDark leading-relaxed ${truncate ? 'line-clamp-2' : ''}`}>{value}</span>
  </div>
);

export default FormContestA;
