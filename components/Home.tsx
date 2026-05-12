
import React, { useState, useRef, useEffect } from 'react';
import { Category, AppState } from '../types';
import { useContents } from '../hooks/useContents';
import Card from './Card';
import { useNavigate } from 'react-router-dom';

interface HomeProps {
  appState: AppState;
  toggleWishlist: (id: string) => void;
  setShowOnboarding: (show: boolean) => void;
}

const Home: React.FC<HomeProps> = ({ appState, toggleWishlist }) => {
  const navigate = useNavigate();
  const { contents, loading, error } = useContents();
  const [statsTab, setStatsTab] = useState<'all' | 'project' | 'seminar' | 'campaign' | 'interview' | 'live'>('all');
  const [splineKey, setSplineKey] = useState(0);
  const splineContainerRef = useRef<HTMLDivElement>(null);
  const splineWasHidden = useRef(false);

  useEffect(() => {
    const el = splineContainerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          splineWasHidden.current = true;
        } else if (splineWasHidden.current) {
          splineWasHidden.current = false;
          setSplineKey((k) => k + 1);
        }
      });
    }, { threshold: 0 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <i className="fa-solid fa-spinner fa-spin text-3xl text-ieumOrange mb-3"></i>
          <p className="text-ieumMuted">콘텐츠를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <i className="fa-solid fa-exclamation-triangle text-3xl text-red-400 mb-3"></i>
          <p className="text-ieumMuted">콘텐츠를 불러오는데 실패했습니다.</p>
        </div>
      </div>
    );
  }

  const statsData = {
    all: [
      { icon: 'fa-users', label: '참여 청년', value: '2,841', unit: '명' },
      { icon: 'fa-heart', label: '연결된 마음', value: '12,450', unit: '건' },
      { icon: 'fa-layer-group', label: '진행 프로젝트', value: '123', unit: '개' },
      { icon: 'fa-bullhorn', label: '캠페인 영향력', value: '15.8만', unit: '회' },
      { icon: 'fa-handshake', label: '협력 네트워크', value: '48', unit: '개' },
    ],
    project: [
      { icon: 'fa-users', label: '참여 청년', value: '452', unit: '명' },
      { icon: 'fa-heart', label: '연결된 마음', value: '890', unit: '건' },
      { icon: 'fa-layer-group', label: '진행 프로젝트', value: '24', unit: '개' },
      { icon: 'fa-bullhorn', label: '캠페인 영향력', value: '3.2만', unit: '회' },
      { icon: 'fa-handshake', label: '협력 네트워크', value: '12', unit: '개' },
    ],
    seminar: [
      { icon: 'fa-users', label: '참여 청년', value: '925', unit: '명' },
      { icon: 'fa-heart', label: '연결된 마음', value: '1,320', unit: '건' },
      { icon: 'fa-layer-group', label: '진행 프로젝트', value: '38', unit: '개' },
      { icon: 'fa-bullhorn', label: '캠페인 영향력', value: '1.5만', unit: '회' },
      { icon: 'fa-handshake', label: '협력 네트워크', value: '18', unit: '개' },
    ],
    campaign: [
      { icon: 'fa-users', label: '참여 청년', value: '1,145', unit: '명' },
      { icon: 'fa-heart', label: '연결된 마음', value: '9,850', unit: '건' },
      { icon: 'fa-layer-group', label: '진행 프로젝트', value: '15', unit: '개' },
      { icon: 'fa-bullhorn', label: '캠페인 영향력', value: '10.4만', unit: '회' },
      { icon: 'fa-handshake', label: '협력 네트워크', value: '8', unit: '개' },
    ],
    interview: [
      { icon: 'fa-users', label: '참여 청년', value: '319', unit: '명' },
      { icon: 'fa-heart', label: '연결된 마음', value: '390', unit: '건' },
      { icon: 'fa-layer-group', label: '진행 프로젝트', value: '46', unit: '개' },
      { icon: 'fa-bullhorn', label: '캠페인 영향력', value: '0.7만', unit: '회' },
      { icon: 'fa-handshake', label: '협력 네트워크', value: '10', unit: '개' },
    ],
    live: [
      { icon: 'fa-envelope-open-text', label: '손편지 프로젝트\n참여자', value: '128', unit: '명' },
      { icon: 'fa-trophy', label: '청년 공모전\n참가 팀', value: '34', unit: '팀' },
    ],
  };

  const statsTabs = [
    { key: 'all', label: '전체' },
    { key: 'live', label: '진행중' },
    { key: 'project', label: '프로젝트' },
    { key: 'seminar', label: '세미나' },
    { key: 'campaign', label: '캠페인' },
    { key: 'interview', label: '인터뷰' },
  ] as const;

  const allProjects   = contents.filter(i => i.category === Category.PROJECTS && i.deadline !== '진행완료');
  const allSeminars   = contents.filter(i => i.category === Category.SEMINARS);
  const allInsights   = contents.filter(i => i.category === Category.INSIGHTS);
  const allCampaigns  = contents.filter(i => i.category === Category.CAMPAIGNS);
  const allInterviews = contents.filter(i => i.category === Category.INTERVIEWS);

  const marqueeItems = [
    '참여 청년 2,841명', '진행 프로젝트 123개', '협력 네트워크 48곳',
    '세미나 38회', '캠페인 15개', '연결된 마음 12,450건',
  ];

  const coreValues = [
    {
      icon: 'fa-heart-pulse',
      title: '청년의 감정을 이해합니다',
      desc: '불안, 고립, 무기력. 지금 청년이 느끼는 감정에서 출발해 사회와의 연결고리를 찾습니다.',
    },
    {
      icon: 'fa-arrows-to-circle',
      title: '사회와의 연결을 만듭니다',
      desc: '개인의 문제라 여겼던 감정들이 사실은 사회 구조와 연결되어 있음을 함께 발견합니다.',
    },
    {
      icon: 'fa-hands-holding-circle',
      title: '청년의 행동을 지지합니다',
      desc: '질문에서 행동으로, 행동에서 변화로. 청년들이 사회에 참여하는 모든 순간을 함께합니다.',
    },
  ];

  return (
    <div className="animate-fadeIn">

      {/* marquee keyframe injection */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-scroll { animation: marqueeScroll 32s linear infinite; }
        .marquee-scroll:hover { animation-play-state: paused; }
      `}} />

      {/* ━━━━━ 1. HERO ━━━━━ */}
      <section className="bg-ieumNavy relative overflow-hidden">
        {/* ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full"
               style={{background:'radial-gradient(circle, rgba(255,107,0,0.14) 0%, transparent 65%)'}} />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full"
               style={{background:'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)'}} />
        </div>

        <div className="max-w-5xl mx-auto px-5 pt-14 pb-10 md:pt-20 md:pb-14 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 items-center">

            {/* Left: copy */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <span className="w-2 h-2 rounded-full bg-ieumOrange" style={{animation:'pulse 2s ease-in-out infinite'}}></span>
                <span className="text-white/50 text-[11px] font-semibold tracking-[0.15em] uppercase">Youth Participation Structure</span>
              </div>

              <h1 className="text-white font-black leading-[1.1] mb-5"
                  style={{fontSize:'clamp(1.9rem, 4.5vw, 3.2rem)'}}>
                불안에서 출발해<br />
                <span className="text-ieumOrange">사회와 연결</span>되는<br />
                청년들의 이야기
              </h1>

              <p className="text-white/50 text-sm md:text-base leading-relaxed mb-8">
                질문하고 행동하며, 균형과 연결을 만들어갑니다.<br className="hidden md:block"/>
                이음은 청년이 사회와 이어지는 참여 구조를 만듭니다.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <button
                  onClick={() => navigate('/more')}
                  className="border border-white/20 text-white/70 font-semibold px-7 py-3.5 rounded-2xl text-sm hover:bg-white/10 transition-all"
                >
                  이음 소개
                </button>
              </div>

              {/* quick stats strip */}
              <div className="flex gap-8 pt-8 border-t border-white/10">
                {[
                  { num: '2,841', label: '참여 청년' },
                  { num: '123', label: '프로젝트' },
                  { num: '48', label: '협력 기관' },
                ].map((s, i) => (
                  <div key={i}>
                    <p className="text-white font-black text-xl leading-none">{s.num}</p>
                    <p className="text-white/40 text-xs mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Spline */}
            <div
              ref={splineContainerRef}
              className="relative w-full h-[260px] md:h-[440px] rounded-3xl overflow-hidden"
              style={{ willChange: 'transform', transform: 'translateZ(0)' }}
            >
              {/* @ts-ignore */}
              <spline-viewer
                key={splineKey}
                url="https://prod.spline.design/FvqIaXwDkGTrtBYv/scene.splinecode"
                style={{ width: '100%', height: '100%', display: 'block' }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 pointer-events-none"
                style={{ height: '56px', backgroundColor: '#F8F5F1', zIndex: 9999 }}
              />
            </div>
          </div>
        </div>

        {/* marquee ticker */}
        <div className="border-t border-white/10 overflow-hidden py-3" style={{backgroundColor:'rgba(255,107,0,0.12)'}}>
          <div className="flex marquee-scroll whitespace-nowrap">
            {[0, 1].map((di) => (
              <div key={di} className="flex items-center">
                {marqueeItems.map((text, i) => (
                  <span key={i} className="text-white/60 text-[11px] font-semibold flex items-center">
                    <span className="px-6">{text}</span>
                    <span className="text-ieumOrange">◆</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━ 2. ACTIVITY CARDS — bold, full-color ━━━━━ */}
      <section className="bg-ieumCream">
        <div className="max-w-5xl mx-auto px-5 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: 'fa-puzzle-piece', label: '프로젝트', tag: 'Program',
                desc: '청년이 기획하고 실행하는 사회참여 프로젝트',
                path: '/category/projects',
                bg: 'bg-ieumNavy',
              },
              {
                icon: 'fa-bullhorn', label: '캠페인', tag: 'Action',
                desc: '일상 속 작은 실천으로 만드는 사회적 변화',
                path: '/category/campaigns',
                bg: 'bg-ieumOrange',
              },
              {
                icon: 'fa-microphone', label: '인터뷰', tag: 'Story',
                desc: '우리 주변 평범한 청년들의 이야기를 듣다',
                path: '/category/interviews',
                bg: 'bg-ieumNavyLight',
              },
            ].map((act, idx) => (
              <button
                key={idx}
                onClick={() => navigate(act.path)}
                className={`${act.bg} group text-left rounded-3xl p-7 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300`}
              >
                <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.18em] mb-4 block">{act.tag}</span>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                     style={{backgroundColor:'rgba(255,255,255,0.15)'}}>
                  <i className={`fa-solid ${act.icon} text-white text-xl`}></i>
                </div>
                <h3 className="text-white text-xl font-black mb-2">
                  {act.label}{' '}
                  <span className="text-white/40 group-hover:text-white/80 transition-colors">→</span>
                </h3>
                <p className="text-white/60 text-xs leading-relaxed">{act.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━ 3. MISSION — bold statement ━━━━━ */}
      <section className="bg-white border-y border-ieumBorder">
        <div className="max-w-5xl mx-auto px-5 py-16 md:py-20">
          <div className="md:grid md:grid-cols-[1fr_2fr] md:gap-16 items-start">
            <div className="mb-8 md:mb-0">
              <span className="text-ieumOrange text-xs font-bold uppercase tracking-widest block mb-3">About IEUM</span>
              <h2 className="text-3xl md:text-4xl font-black text-ieumDark leading-[1.1]">
                청년을<br />세우는<br />이음
              </h2>
              <button
                onClick={() => navigate('/about/greeting')}
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-ieumOrange hover:gap-3 transition-all"
              >
                자세히 알아보기 <i className="fa-solid fa-arrow-right text-xs"></i>
              </button>
            </div>
            <div>
              <blockquote className="text-xl md:text-[1.4rem] font-bold text-ieumDark/80 leading-[1.6] border-l-[3px] border-ieumOrange pl-6 mb-6">
                "이음은 사회적 불안을 느끼는 청년들이 고립되지 않고,
                사회와 연결될 수 있도록 돕는 청년 참여 구조입니다."
              </blockquote>
              <p className="text-sm text-ieumMuted leading-relaxed mb-8">
                프로젝트, 세미나, 캠페인, 인터뷰를 통해 청년들이 스스로 질문하고
                행동할 수 있는 판을 만듭니다.
              </p>
              {/* value chips */}
              <div className="flex flex-wrap gap-2">
                {['청년 참여 구조', '사회적 연결', '질문 → 행동 → 변화', '균형과 공감'].map((chip) => (
                  <span key={chip}
                        className="bg-ieumCream border border-ieumBorder text-ieumDark text-[11px] font-semibold px-3 py-1.5 rounded-full">
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━ 4. CORE VALUES ━━━━━ */}
      <section className="bg-ieumCream border-b border-ieumBorder">
        <div className="max-w-5xl mx-auto px-5 py-12 md:py-16">
          <div className="mb-10">
            <span className="text-ieumOrange text-xs font-bold uppercase tracking-widest">Our Approach</span>
            <h2 className="text-2xl md:text-3xl font-black text-ieumDark mt-2">이음이 하는 일</h2>
            <p className="text-sm text-ieumMuted mt-1">청년과 사회를 잇는 세 가지 방식</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {coreValues.map((val, idx) => (
              <div key={idx}
                   className="group bg-white rounded-3xl p-7 border border-ieumBorder hover:border-ieumOrange/50 hover:shadow-xl transition-all duration-300">
                <div className="text-5xl font-black mb-4 leading-none"
                     style={{color:'rgba(26,43,74,0.07)'}}>
                  0{idx + 1}
                </div>
                <div className="w-12 h-12 bg-ieumNavy rounded-2xl flex items-center justify-center mb-4 group-hover:bg-ieumOrange transition-colors duration-300">
                  <i className={`fa-solid ${val.icon} text-white text-base`}></i>
                </div>
                <h3 className="text-base font-black text-ieumDark mb-3">{val.title}</h3>
                <p className="text-xs text-ieumMuted leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━ 5. PROJECTS — magazine asymmetric ━━━━━ */}
      <section className="bg-white border-b border-ieumBorder">
        <div className="max-w-5xl mx-auto px-5 py-12 md:py-16">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-ieumOrange text-xs font-bold uppercase tracking-widest">Program</span>
              <h2 className="text-2xl md:text-3xl font-black text-ieumDark mt-2">지금 진행중인 프로젝트</h2>
              <p className="text-sm text-ieumMuted mt-1">청년이 직접 기획하고 실행하는 활동들</p>
            </div>
            <button
              onClick={() => navigate('/category/projects')}
              className="hidden md:flex items-center gap-1.5 text-sm font-bold text-ieumOrange hover:gap-2.5 transition-all flex-shrink-0"
            >
              전체보기 <i className="fa-solid fa-arrow-right text-xs"></i>
            </button>
          </div>

          {/* Uniform grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {allProjects.map(item => (
              <div
                key={item.id}
                onClick={() => navigate(`/content/${item.id}`)}
                className="rounded-2xl overflow-hidden bg-white border border-ieumBorder hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col"
              >
                <div className="overflow-hidden bg-gray-50">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-auto block group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <span className="text-[10px] font-bold text-ieumOrange bg-ieumOrange/10 px-2 py-0.5 rounded-full w-fit">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-bold text-ieumDark mt-2 mb-1 line-clamp-2 leading-snug flex-1">{item.title}</h3>
                  {item.deadline && (
                    <p className="text-[11px] font-bold text-red-500">{item.deadline}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/category/projects')}
            className="md:hidden mt-4 w-full border border-ieumBorder text-ieumDark text-sm font-bold py-3 rounded-2xl hover:border-ieumOrange hover:text-ieumOrange transition-colors"
          >
            전체 프로젝트 보기
          </button>
        </div>
      </section>

      {/* ━━━━━ 6. IMPACT — large number display ━━━━━ */}
      <section className="bg-ieumNavy overflow-hidden">
        <div className="max-w-5xl mx-auto px-5 py-14 md:py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <span className="text-ieumOrange text-xs font-bold uppercase tracking-widest">Impact</span>
              <h2 className="text-3xl md:text-4xl font-black text-white mt-2">숫자로 보는 이음</h2>
            </div>
            <p className="text-white/30 text-sm mt-2 md:mt-0">불안에서 출발해 사회와 연결되는 청년들의 기록</p>
          </div>

          {/* big four numbers */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-14">
            {[
              { num: '2,841', unit: '명', label: '참여 청년', icon: 'fa-users' },
              { num: '123', unit: '개', label: '진행 프로젝트', icon: 'fa-layer-group' },
              { num: '48', unit: '곳', label: '협력 네트워크', icon: 'fa-handshake' },
              { num: '15.8만', unit: '회', label: '캠페인 영향력', icon: 'fa-bullhorn' },
            ].map((stat, i) => (
              <div key={i} className="border-t-2 border-white/20 pt-6">
                <i className={`fa-solid ${stat.icon} text-ieumOrange mb-4 block`}></i>
                <p className="font-black text-white leading-none"
                   style={{fontSize:'clamp(1.8rem, 3.5vw, 3rem)'}}>
                  {stat.num}
                  <span className="text-base text-white/40 font-bold ml-1">{stat.unit}</span>
                </p>
                <p className="text-white/40 text-xs mt-2">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* tab filter + detail stats */}
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-3 mb-5">
            {statsTabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setStatsTab(tab.key)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                  statsTab === tab.key
                    ? 'bg-ieumOrange text-white'
                    : 'bg-white/10 text-white/50 hover:bg-white/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {statsData[statsTab].map((stat, idx) => (
              <div
                key={idx}
                className="rounded-2xl p-4 border border-white/10"
                style={{backgroundColor:'rgba(255,255,255,0.06)'}}
              >
                <i className={`fa-solid ${stat.icon} text-ieumOrange text-sm mb-2 block`}></i>
                <p className="text-[10px] text-white/40 whitespace-pre-line leading-tight mb-1">{stat.label}</p>
                <p className="text-xl font-black text-white">
                  {stat.value}
                  <span className="text-xs text-white/40 ml-0.5">{stat.unit}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━ 7. SEMINARS ━━━━━ */}
      <section className="bg-ieumCream border-b border-ieumBorder">
        <div className="max-w-5xl mx-auto px-5 py-12 md:py-16">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-ieumNavy text-xs font-bold uppercase tracking-widest">Knowledge</span>
              <h2 className="text-2xl md:text-3xl font-black text-ieumDark mt-2">새로운 관점을 여는 세미나</h2>
              <p className="text-sm text-ieumMuted mt-1">함께 배우고 나누는 지식의 장</p>
            </div>
            <button
              onClick={() => navigate('/category/seminars')}
              className="hidden md:flex items-center gap-1.5 text-sm font-bold text-ieumOrange hover:gap-2.5 transition-all flex-shrink-0"
            >
              전체보기 <i className="fa-solid fa-arrow-right text-xs"></i>
            </button>
          </div>
          <div className="hidden md:grid grid-cols-3 gap-5">
            {allSeminars.slice(0, 3).map(item => (
              <div
                key={item.id}
                onClick={() => navigate(`/content/${item.id}`)}
                className="group bg-white rounded-3xl overflow-hidden border border-ieumBorder hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="aspect-[4/3] bg-gray-50 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <span className="text-[10px] font-bold text-ieumNavy bg-ieumNavy/10 px-2 py-0.5 rounded-full">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-bold text-ieumDark mt-2 line-clamp-2 leading-relaxed">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="md:hidden flex overflow-x-auto gap-3 pb-2 hide-scrollbar">
            {allSeminars.map(item => (
              <Card
                key={item.id}
                item={item}
                isWishlisted={appState.wishlist.includes(item.id)}
                onToggleWishlist={toggleWishlist}
                onClick={() => navigate(`/content/${item.id}`)}
                variant="small"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━ 8. CAMPAIGNS ━━━━━ */}
      <section className="bg-white border-b border-ieumBorder">
        <div className="max-w-5xl mx-auto px-5 py-12 md:py-16">
          <div className="md:flex md:items-start md:gap-12">
            <div className="md:w-64 flex-shrink-0 mb-8 md:mb-0">
              <span className="inline-block bg-ieumOrange text-white text-[10px] font-bold px-3 py-1.5 rounded-full mb-3 uppercase tracking-wider">
                실천
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-ieumDark leading-tight mb-4">
                일상 속 작은 실천,<br />캠페인
              </h2>
              <p className="text-sm text-ieumMuted leading-relaxed mb-5">
                낯선 사회 이슈를 익숙한 언어로 풀고,<br />
                모두가 일상에서 함께할 수 있는<br />
                작지만 확실한 방식의 행동으로 번역합니다.
              </p>
              <button
                onClick={() => navigate('/category/campaigns')}
                className="text-sm font-bold text-ieumOrange flex items-center gap-1.5 hover:gap-2.5 transition-all"
              >
                캠페인 전체보기 <i className="fa-solid fa-arrow-right text-xs"></i>
              </button>
            </div>
            <div className="flex-1 flex overflow-x-auto gap-4 pb-2 hide-scrollbar md:grid md:grid-cols-2 md:overflow-visible">
              {allCampaigns.slice(0, 4).map(item => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/content/${item.id}`)}
                  className="flex-shrink-0 w-44 md:w-auto bg-ieumCream rounded-2xl overflow-hidden border border-ieumBorder hover:shadow-md hover:border-ieumOrange/30 transition-all cursor-pointer group"
                >
                  <div className="aspect-[4/3] bg-gray-50 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="text-xs font-bold text-ieumDark line-clamp-2 leading-relaxed">{item.title}</h3>
                    {item.deadline && (
                      <p className="text-[10px] font-bold text-ieumOrange mt-1">{item.deadline}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━ 9. INTERVIEWS & INSIGHTS ━━━━━ */}
      <section className="bg-ieumCream border-b border-ieumBorder">
        <div className="max-w-5xl mx-auto px-5 py-12 md:py-16">
          <div className="md:grid md:grid-cols-2 md:gap-12">

            {/* 인터뷰 */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-ieumOrange text-xs font-bold uppercase tracking-widest">Archive</span>
                  <h3 className="text-xl font-black text-ieumDark mt-1">우리의 이야기, 인터뷰</h3>
                </div>
                <button
                  onClick={() => navigate('/category/interviews')}
                  className="text-xs text-ieumMuted font-semibold flex items-center gap-1"
                >
                  전체보기 <i className="fa-solid fa-chevron-right text-[10px]"></i>
                </button>
              </div>
              <div className="space-y-2">
                {allInterviews.slice(0, 4).map(item => (
                  <div
                    key={item.id}
                    onClick={() => navigate(`/content/${item.id}`)}
                    className="flex gap-3 items-center cursor-pointer group p-3 rounded-2xl hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-ieumBorder"
                  >
                    <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-ieumMuted font-semibold mb-0.5">{item.category}</p>
                      <h4 className="text-xs font-bold text-ieumDark line-clamp-2 leading-relaxed group-hover:text-ieumOrange transition-colors">
                        {item.title}
                      </h4>
                    </div>
                    <i className="fa-solid fa-chevron-right text-[10px] text-ieumMuted flex-shrink-0"></i>
                  </div>
                ))}
              </div>
            </div>

            {/* 인사이트 */}
            <div className="mt-10 md:mt-0">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-ieumNavy text-xs font-bold uppercase tracking-widest">Insight</span>
                  <h3 className="text-xl font-black text-ieumDark mt-1">매월 청년 사회 인사이트</h3>
                </div>
                <button
                  onClick={() => navigate('/category/insights')}
                  className="text-xs text-ieumMuted font-semibold flex items-center gap-1"
                >
                  전체보기 <i className="fa-solid fa-chevron-right text-[10px]"></i>
                </button>
              </div>
              <div className="space-y-2">
                {allInsights.slice(0, 4).map(item => (
                  <div
                    key={item.id}
                    onClick={() => navigate(`/content/${item.id}`)}
                    className="flex gap-3 items-center cursor-pointer group p-3 rounded-2xl hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-ieumBorder"
                  >
                    <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-ieumMuted font-semibold mb-0.5">{item.category}</p>
                      <h4 className="text-xs font-bold text-ieumDark line-clamp-2 leading-relaxed group-hover:text-ieumNavy transition-colors">
                        {item.title}
                      </h4>
                    </div>
                    <i className="fa-solid fa-chevron-right text-[10px] text-ieumMuted flex-shrink-0"></i>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━ 10. CTA ━━━━━ */}
      <section className="bg-ieumOrange">
        <div className="max-w-5xl mx-auto px-5 py-16 md:py-20 text-center">
          <span className="inline-block text-white/70 text-[10px] font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-widest border border-white/30">
            함께하기
          </span>
          <h2 className="font-black text-white mb-4 leading-tight"
              style={{fontSize:'clamp(1.8rem, 4vw, 2.8rem)'}}>
            이음과 함께<br className="md:hidden" /> 사회를 만들어가세요
          </h2>
          <p className="text-white/70 text-sm md:text-base mb-10 max-w-sm mx-auto leading-relaxed">
            청년의 감정에서 출발해 사회와 연결되는 여정,<br />이음이 함께합니다.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => navigate('/category')}
              className="bg-white text-ieumOrange font-black px-8 py-4 rounded-2xl text-sm hover:bg-ieumCream transition-all"
              style={{boxShadow:'0 8px 30px rgba(0,0,0,0.15)'}}
            >
              활동 둘러보기 <i className="fa-solid fa-arrow-right ml-1.5 text-xs"></i>
            </button>
            <button
              onClick={() => navigate('/more')}
              className="border-2 border-white/40 text-white font-bold px-8 py-4 rounded-2xl text-sm hover:bg-white/15 transition-all"
            >
              이음 소개
            </button>
          </div>
        </div>
      </section>

      {/* ━━━━━ 11. FOOTER ━━━━━ */}
      <footer className="bg-ieumNavy text-white">
        <div className="max-w-5xl mx-auto px-5 py-12 md:py-14">
          <div className="md:flex md:justify-between md:items-start">
            <div className="mb-8 md:mb-0">
              <img
                src={`${import.meta.env.BASE_URL}ieum-logo.png`}
                alt="IEUM"
                className="h-10 w-auto object-contain brightness-0 invert mb-4"
              />
              <p className="text-white/50 text-xs leading-relaxed mb-2">
                청년 참여 구조, IEUM<br />
                감정에서 출발해 사회와 연결되고, 행동으로 변화를 만드는 청년들
              </p>
              <p className="text-white/30 text-[11px]">© 2025 IEUM. All rights reserved.</p>
            </div>
            <div className="flex flex-col gap-6 md:flex-row md:gap-16">
              <div>
                <p className="text-white text-xs font-bold mb-3">활동</p>
                <div className="flex flex-col gap-2">
                  {[
                    ['프로젝트', '/category/projects'],
                    ['세미나', '/category/seminars'],
                    ['캠페인', '/category/campaigns'],
                    ['인터뷰', '/category/interviews'],
                  ].map(([label, path]) => (
                    <button
                      key={path}
                      onClick={() => navigate(path)}
                      className="text-white/50 text-xs text-left hover:text-white transition-colors"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-white text-xs font-bold mb-3">이음</p>
                <div className="flex flex-col gap-2">
                  {[['소개', '/more'], ['인사이트', '/category/insights']].map(([label, path]) => (
                    <button
                      key={path}
                      onClick={() => navigate(path)}
                      className="text-white/50 text-xs text-left hover:text-white transition-colors"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;
