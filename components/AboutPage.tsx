
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const sections = [
  { key: 'greeting', label: '인사말', path: '/about/greeting' },
  { key: 'intro', label: 'IEUM 소개', path: '/about/intro' },
  { key: 'history', label: '연혁', path: '/about/history' },
  { key: 'organization', label: '조직도', path: '/about/organization' },
];

/* ── 인사말 ── */
const Greeting: React.FC = () => (
  <div className="animate-fadeIn">
    <div className="bg-ieumNavy relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-ieumOrange opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white opacity-5"></div>
      </div>
      <div className="max-w-5xl mx-auto px-5 py-16 md:py-24 relative z-10">
        <span className="text-ieumOrange text-xs font-bold uppercase tracking-widest">Greeting</span>
        <h1 className="text-white text-3xl md:text-5xl font-black mt-3 leading-tight">
          청년 한 명의 이야기가<br />
          <span className="text-ieumOrange">세상을 바꾸는 힘</span>이 됩니다
        </h1>
        <p className="text-white/50 text-sm md:text-base mt-4 max-w-lg leading-relaxed">이음(IEUM) 대표의 인사말</p>
      </div>
    </div>

    <div className="bg-ieumOrange">
      <div className="max-w-5xl mx-auto px-5 py-5">
        <div className="flex gap-8 md:gap-16 overflow-x-auto hide-scrollbar">
          {[
            { num: '2,841명', label: '함께한 청년' },
            { num: '123개', label: '진행 프로젝트' },
            { num: '48개', label: '협력 네트워크' },
            { num: '15.8만회', label: '캠페인 영향력' },
          ].map((s, i) => (
            <div key={i} className="flex-shrink-0 text-center md:text-left">
              <p className="text-white font-black text-xl md:text-2xl">{s.num}</p>
              <p className="text-white/70 text-xs font-semibold mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="max-w-5xl mx-auto px-5 py-12 md:py-16">
      <div className="md:grid md:grid-cols-[1fr_320px] md:gap-14">
        <div>
          <p className="text-ieumMuted text-sm leading-[2] mb-8">안녕하세요.</p>
          <blockquote className="border-l-4 border-ieumOrange pl-5 mb-8 bg-ieumLight rounded-r-2xl py-5 pr-5">
            <p className="text-ieumDark text-base md:text-lg font-bold leading-relaxed">"나만 이런가?"</p>
            <p className="text-ieumMuted text-sm leading-relaxed mt-2">청년들이 사회에 첫 발을 내딛는 순간 가장 많이 하는 질문입니다.</p>
          </blockquote>
          <p className="text-ieumDark text-sm md:text-base leading-[2] mb-6">
            취업 준비의 압박, 관계의 어려움, 미래에 대한 불안.
            이런 감정들이 나만의 문제가 아니라 우리 사회가 함께 풀어야 할 과제임을 알게 되는 것,
            그것이 <strong className="text-ieumOrange font-bold">이음(IEUM)</strong>의 시작입니다.
          </p>
          <p className="text-ieumDark text-sm md:text-base leading-[2] mb-6">
            이음은 <strong className="text-ieumDark font-bold">'연결'</strong>을 믿습니다.
            청년 개인의 감정이 사회 구조와 연결될 때, 그 연결이 행동이 될 때,
            비로소 변화가 시작됩니다. 고립된 감정은 사회와 맞닿는 순간 하나의 목소리가 되고,
            그 목소리들이 모여 세상을 조금씩 바꾸어 나갑니다.
          </p>
          <div className="bg-ieumNavy rounded-2xl p-6 mb-6 text-white">
            <i className="fa-solid fa-quote-left text-ieumOrange text-2xl mb-3 block"></i>
            <p className="text-white/90 text-sm md:text-base leading-relaxed font-medium">
              설립 이후, 이음은 <span className="text-ieumOrange font-black">2,841명</span>의 청년들과 함께
              <span className="text-ieumOrange font-black"> 123개</span>의 프로젝트를 진행했습니다.
              그들이 자신의 이야기를 꺼내고, 사회를 이해하고, 행동에 나서는 과정을 곁에서 지켜보며
              이음도 함께 성장해왔습니다.
            </p>
          </div>
          <p className="text-ieumDark text-sm md:text-base leading-[2] mb-10">
            앞으로도 이음은 청년들이 고립되지 않고 사회와 이어질 수 있도록,
            그 연결의 판을 계속해서 만들어가겠습니다.
            청년 한 명 한 명의 이야기가 세상을 바꾸는 힘이 된다고 믿으며,
            이음은 언제나 그 곁에 있겠습니다.
          </p>
          <div className="border-t border-ieumBorder pt-8 flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ieumNavy to-ieumNavyLight flex items-center justify-center flex-shrink-0">
              <i className="fa-solid fa-user text-white text-xl"></i>
            </div>
            <div>
              <p className="text-ieumDark font-black text-base">이찬영</p>
              <p className="text-ieumMuted text-xs mt-0.5">이음(IEUM) 대표 · 청년 참여 구조, IEUM</p>
              <p className="text-ieumOrange text-xs font-semibold mt-1">2025년 봄</p>
            </div>
          </div>
        </div>
        <div className="mt-10 md:mt-0 space-y-5">
          <div className="bg-ieumCream border border-ieumBorder rounded-2xl p-6">
            <p className="text-ieumOrange text-xs font-bold uppercase tracking-widest mb-3">IEUM이 추구하는 것</p>
            <div className="space-y-4">
              {[
                { icon: 'fa-heart-pulse', title: '감정', desc: '불안에서 출발합니다' },
                { icon: 'fa-arrows-to-circle', title: '연결', desc: '사회와 이어집니다' },
                { icon: 'fa-bolt', title: '행동', desc: '변화를 만들어갑니다' },
              ].map((v, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white rounded-xl border border-ieumBorder flex items-center justify-center flex-shrink-0">
                    <i className={`fa-solid ${v.icon} text-ieumOrange text-sm`}></i>
                  </div>
                  <div>
                    <p className="text-ieumDark text-sm font-bold">{v.title}</p>
                    <p className="text-ieumMuted text-xs">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-ieumNavy rounded-2xl p-6 text-center">
            <i className="fa-solid fa-infinity text-ieumOrange text-3xl mb-3"></i>
            <p className="text-white font-black text-base leading-snug">감정에서 출발해<br />사회와 연결되고<br />행동으로 변화를 만드는</p>
            <p className="text-ieumOrange font-black text-lg mt-2">청년들의 이야기</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ── ieum 소개 ── */
const Intro: React.FC = () => (
  <div className="animate-fadeIn">
    <div className="bg-ieumNavy relative overflow-hidden px-5 py-14 md:py-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-ieumOrange opacity-[0.07]"></div>
        <div className="absolute bottom-0 -left-10 w-52 h-52 rounded-full bg-white opacity-[0.04]"></div>
      </div>
      <div className="max-w-5xl mx-auto relative z-10">
        <span className="text-ieumOrange text-xs font-bold uppercase tracking-widest">About IEUM</span>
        <h1 className="text-white text-3xl md:text-4xl font-black mt-2">IEUM 소개</h1>
        <p className="text-white/50 text-sm mt-3 max-w-xl leading-relaxed">
          청년이 사회와 연결되는 참여 구조를 만드는 비영리 청년사회단체
        </p>
      </div>
    </div>

    {/* 핵심 수치 */}
    <div className="bg-white border-b border-ieumBorder">
      <div className="max-w-5xl mx-auto px-5 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { num: '2,841', unit: '명', label: '누적 참여 청년', icon: 'fa-users', sub: '2023년 설립 이후' },
            { num: '123', unit: '개', label: '진행 프로젝트', icon: 'fa-layer-group', sub: '프로젝트·세미나·캠페인' },
            { num: '48', unit: '개', label: '협력 기관·단체', icon: 'fa-handshake', sub: '파트너 네트워크' },
            { num: '15.8만', unit: '회', label: '캠페인 영향력', icon: 'fa-bullhorn', sub: '온·오프라인 합산' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="w-10 h-10 bg-ieumNavy/5 rounded-xl flex items-center justify-center mx-auto mb-3">
                <i className={`fa-solid ${s.icon} text-ieumNavy text-sm`}></i>
              </div>
              <p className="text-2xl md:text-3xl font-black text-ieumOrange leading-none">
                {s.num}<span className="text-base text-ieumMuted ml-0.5">{s.unit}</span>
              </p>
              <p className="text-sm font-bold text-ieumDark mt-1">{s.label}</p>
              <p className="text-[11px] text-ieumMuted mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="max-w-5xl mx-auto px-5 py-12 md:py-16 space-y-16">

      {/* 설립 배경 */}
      <div className="md:grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="text-ieumOrange text-xs font-bold uppercase tracking-widest">Our Story</span>
          <h2 className="text-2xl md:text-3xl font-black text-ieumDark mt-2 mb-4 leading-tight">
            왜 이음(IEUM)인가
          </h2>
          <p className="text-ieumDark text-sm leading-[2] mb-4">
            2023년, 청년들의 고립과 사회 단절이라는 문제를 직접 목격한 청년들이 모여
            <strong className="text-ieumOrange">이음(IEUM)</strong>을 설립했습니다.
            "청년의 불안과 감정이 사회 구조와 얼마나 연결되어 있는가"라는 질문에서 출발해,
            단순한 커뮤니티를 넘어 <strong className="text-ieumOrange">참여 구조</strong>를 만드는 단체로 성장했습니다.
          </p>
          <p className="text-ieumDark text-sm leading-[2]">
            '이어짐'이라는 이름처럼, 이음은 청년이 감정에서 출발해 사회와 연결되고,
            행동으로 변화를 만드는 선순환 구조를 창립 때부터 지금까지 일관되게 구축해나가고 있습니다.
          </p>
        </div>
        <div className="mt-8 md:mt-0 space-y-3">
          {[
            { year: '2023', event: '이음(IEUM) 설립 — 청년 참여 구조의 첫걸음' },
            { year: '2024', event: '캠페인·세미나 정례화 — 연간 참여자 1,200명 달성' },
            { year: '2025', event: '청년 연결 플랫폼 본격화 — 누적 참여자 2,800명 돌파' },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 items-start bg-ieumCream border border-ieumBorder rounded-xl p-4">
              <span className="text-ieumOrange font-black text-sm flex-shrink-0 mt-0.5">{item.year}</span>
              <p className="text-sm text-ieumDark leading-relaxed">{item.event}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 비전 / 미션 */}
      <div>
        <span className="text-ieumOrange text-xs font-bold uppercase tracking-widest">Vision & Mission</span>
        <h2 className="text-2xl md:text-3xl font-black text-ieumDark mt-2 mb-6">비전과 미션</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-ieumNavy rounded-2xl p-8">
            <div className="w-10 h-10 bg-ieumOrange/20 rounded-xl flex items-center justify-center mb-4">
              <i className="fa-solid fa-eye text-ieumOrange"></i>
            </div>
            <p className="text-ieumOrange text-xs font-bold uppercase tracking-widest mb-2">Vision</p>
            <h3 className="text-white text-xl font-black leading-snug mb-3">
              청년이 사회와<br />연결되는 세상
            </h3>
            <p className="text-white/50 text-sm leading-relaxed">
              고립과 불안이 아닌, 연결과 참여가 청년의 일상이 되는 사회.
              청년 한 명의 이야기가 정책이 되고, 문화가 되는 세상을 만들어갑니다.
            </p>
          </div>
          <div className="bg-ieumLight border border-ieumBorder rounded-2xl p-8">
            <div className="w-10 h-10 bg-ieumOrange/10 rounded-xl flex items-center justify-center mb-4">
              <i className="fa-solid fa-bullseye text-ieumOrange"></i>
            </div>
            <p className="text-ieumOrange text-xs font-bold uppercase tracking-widest mb-2">Mission</p>
            <h3 className="text-ieumDark text-xl font-black leading-snug mb-3">
              감정에서 행동으로<br />이어지는 참여 구조
            </h3>
            <p className="text-ieumMuted text-sm leading-relaxed">
              청년의 불안과 감정을 사회 문제와 연결하고,
              프로젝트·세미나·캠페인을 통해 직접 행동하게 하는
              지속 가능한 참여 생태계를 구축합니다.
            </p>
          </div>
        </div>
      </div>

      {/* 4대 전략 */}
      <div>
        <span className="text-ieumOrange text-xs font-bold uppercase tracking-widest">Strategic Pillars</span>
        <h2 className="text-2xl md:text-3xl font-black text-ieumDark mt-2 mb-8">4대 전략 방향</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              num: '01', icon: 'fa-people-arrows', title: '참여 구조 구축',
              desc: '청년이 주체가 되어 기획·실행·평가하는 사회참여 프로젝트 체계를 운영합니다. 아이디어 발굴부터 실행까지 이음이 함께합니다.',
              tags: ['프로젝트 기획', '실행 지원', '성과 측정'],
            },
            {
              num: '02', icon: 'fa-newspaper', title: '콘텐츠 생산',
              desc: '청년의 시선으로 사회를 기록하는 인터뷰·에세이·인사이트 리포트를 발행합니다. 매월 정기 발행으로 청년의 목소리를 전달합니다.',
              tags: ['월간 리포트', '인터뷰 시리즈', '에세이/칼럼'],
            },
            {
              num: '03', icon: 'fa-bullhorn', title: '캠페인 운영',
              desc: '일상 속 작은 실천으로 시작하는 사회 변화를 만듭니다. 온·오프라인을 넘나드는 캠페인으로 더 많은 청년들과 연결됩니다.',
              tags: ['온라인 캠페인', '오프라인 행사', '정책 제안'],
            },
            {
              num: '04', icon: 'fa-network-wired', title: '네트워크 확장',
              desc: '청년단체·사회적기업·공공기관 등 48개 파트너와 함께 청년을 위한 생태계를 구축합니다. 연결은 힘입니다.',
              tags: ['파트너십', '공동 프로그램', '자원 공유'],
            },
          ].map((p, i) => (
            <div key={i} className="border border-ieumBorder rounded-2xl p-6 bg-white hover:border-ieumOrange transition-colors group">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-3xl font-black text-ieumBorder group-hover:text-ieumOrange/30 transition-colors leading-none">{p.num}</span>
                <div className="w-10 h-10 bg-ieumNavy/5 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className={`fa-solid ${p.icon} text-ieumNavy text-sm`}></i>
                </div>
              </div>
              <h3 className="text-base font-black text-ieumDark mb-2">{p.title}</h3>
              <p className="text-xs text-ieumMuted leading-relaxed mb-4">{p.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((tag, j) => (
                  <span key={j} className="text-[10px] font-semibold text-ieumNavy bg-ieumNavy/5 px-2.5 py-1 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 핵심 가치 */}
      <div>
        <span className="text-ieumOrange text-xs font-bold uppercase tracking-widest">Core Values</span>
        <h2 className="text-2xl md:text-3xl font-black text-ieumDark mt-2 mb-8">이음의 핵심 가치</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              icon: 'fa-link', title: '연결 (Connect)',
              desc: '개인의 감정을 사회와 잇습니다. 혼자라고 느끼는 청년들이 서로, 그리고 사회와 연결되도록 판을 만듭니다.',
              quote: '"혼자가 아니라는 것을 아는 것, 그것이 변화의 시작입니다."',
            },
            {
              icon: 'fa-bolt', title: '행동 (Act)',
              desc: '질문에서 행동으로. 이음의 모든 활동은 청년이 직접 기획하고 실행하는 실천의 공간입니다.',
              quote: '"청년의 행동 하나하나가 사회를 바꾸는 힘이 됩니다."',
            },
            {
              icon: 'fa-seedling', title: '변화 (Change)',
              desc: '작은 행동이 모여 세상을 바꿉니다. 청년의 목소리가 사회 변화의 씨앗이 되도록 지원합니다.',
              quote: '"지금의 청년이 만드는 변화는 미래를 위한 자산입니다."',
            },
          ].map((v, i) => (
            <div key={i} className="border border-ieumBorder rounded-2xl p-6 bg-white flex flex-col">
              <div className="w-10 h-10 bg-ieumNavy/5 rounded-xl flex items-center justify-center mb-4">
                <i className={`fa-solid ${v.icon} text-ieumNavy`}></i>
              </div>
              <h3 className="text-base font-black text-ieumDark mb-2">{v.title}</h3>
              <p className="text-xs text-ieumMuted leading-relaxed mb-4 flex-1">{v.desc}</p>
              <p className="text-xs text-ieumOrange font-semibold italic leading-relaxed border-t border-ieumBorder pt-4">{v.quote}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 활동 영역 */}
      <div>
        <span className="text-ieumOrange text-xs font-bold uppercase tracking-widest">What We Do</span>
        <h2 className="text-2xl md:text-3xl font-black text-ieumDark mt-2 mb-8">이음이 하는 일</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              icon: 'fa-puzzle-piece', title: '프로젝트', tag: 'Program', color: 'text-blue-600 bg-blue-50',
              desc: '청년이 직접 기획하고 실행하는 사회참여 프로젝트. 아이디어 발굴 → 팀빌딩 → 실행 → 성과 공유의 전 과정을 이음이 함께합니다.',
              stat: '연간 40+ 프로젝트 운영',
            },
            {
              icon: 'fa-users-rays', title: '세미나', tag: 'Program', color: 'text-purple-600 bg-purple-50',
              desc: '사회·경제·문화 이슈를 깊이 있게 탐구하는 지식 나눔의 자리. 전문가·활동가·청년이 함께 배우고 토론하는 월례 세미나를 운영합니다.',
              stat: '월 2회 정기 개최',
            },
            {
              icon: 'fa-bullhorn', title: '캠페인', tag: 'Program', color: 'text-orange-600 bg-orange-50',
              desc: '일상 속 작은 실천으로 시작하는 사회 변화. SNS 캠페인부터 오프라인 퍼포먼스까지, 누구나 참여 가능한 캠페인을 기획·운영합니다.',
              stat: '누적 영향력 15.8만 회',
            },
            {
              icon: 'fa-microphone', title: '인터뷰', tag: '소식', color: 'text-green-600 bg-green-50',
              desc: '우리 주변 평범한 청년들의 비범한 삶의 이야기. 다양한 삶의 방식을 기록하고 나누며 서로의 존재를 확인합니다.',
              stat: '격주 1편 발행',
            },
            {
              icon: 'fa-pen-nib', title: '에세이/칼럼', tag: '소식', color: 'text-pink-600 bg-pink-50',
              desc: '청년의 눈으로 바라본 사회 이야기. 한강의 문학처럼 깊이 있는 글쓰기로 세상을 새롭게 보는 에세이·칼럼을 발행합니다.',
              stat: '월 4편 이상 발행',
            },
            {
              icon: 'fa-lightbulb', title: '인사이트 리포트', tag: '소식', color: 'text-amber-600 bg-amber-50',
              desc: '매월 발행하는 청년 사회 분석 리포트. 데이터와 현장의 목소리를 담아 청년 사회를 이해하는 깊이 있는 분석을 제공합니다.',
              stat: '월 1회 정기 발행',
            },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 items-start p-5 rounded-2xl border border-ieumBorder bg-white hover:border-ieumOrange transition-colors group">
              <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <i className={`fa-solid ${item.icon} text-sm`}></i>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-black text-ieumDark">{item.title}</h3>
                  <span className="text-[10px] text-ieumMuted border border-ieumBorder px-1.5 py-0.5 rounded-full">{item.tag}</span>
                </div>
                <p className="text-xs text-ieumMuted leading-relaxed mb-2">{item.desc}</p>
                <span className="text-[10px] font-bold text-ieumOrange">{item.stat}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 파트너 / 협력 */}
      <div className="bg-ieumNavy rounded-2xl p-8 md:p-10 text-center">
        <span className="text-ieumOrange text-xs font-bold uppercase tracking-widest">Partners & Network</span>
        <h2 className="text-white text-2xl font-black mt-2 mb-3">함께하는 파트너들</h2>
        <p className="text-white/50 text-sm mb-8 max-w-lg mx-auto leading-relaxed">
          청년을 위한 더 나은 사회를 만들기 위해 다양한 기관·단체와 함께합니다.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: 'fa-building-columns', label: '공공기관', num: '12개' },
            { icon: 'fa-handshake', label: '청년단체', num: '18개' },
            { icon: 'fa-store', label: '사회적기업', num: '11개' },
            { icon: 'fa-graduation-cap', label: '학교·연구소', num: '7개' },
          ].map((p, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <i className={`fa-solid ${p.icon} text-ieumOrange text-xl mb-2`}></i>
              <p className="text-white font-black text-lg">{p.num}</p>
              <p className="text-white/50 text-xs">{p.label}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>
);

/* ── 연혁 ── */
const History: React.FC = () => {
  const timeline = [
    {
      year: '2025',
      color: 'text-ieumOrange',
      items: [
        { month: '05', event: '참전용사·사회연결 공모전 시리즈 본격 론칭', detail: '참전용사 처우개선·굿즈 디자인 등 사회 의제 기반 공모전 시리즈 시작. 전국 청년 참여 확대.', highlight: true },
        { month: '04', event: '청년 유형 테스트 A/B 캠페인 런칭', detail: '청년 생존 유형 테스트를 통한 사회참여 캠페인. 서명 참여자 8,400명 돌파.' },
        { month: '03', event: '청년민원24 프로젝트 론칭', detail: '청년의 사회 문제를 정책으로 연결하는 디지털 민원 플랫폼 오픈. Supabase 기반 실시간 데이터 수집.' },
        { month: '02', event: '누적 참여 청년 2,800명 돌파', detail: '설립 2년 만에 2,800명 참여 달성. 서울·경기·부산 등 전국 8개 지역 청년 참여.' },
        { month: '01', event: '2025 청년 사회참여 공모전 개최', detail: '총 34개 팀 참가, 최우수상 1팀 프로젝트 실제 운영 지원. 상금 총 300만원 지급.' },
      ],
    },
    {
      year: '2024',
      color: 'text-ieumNavy',
      items: [
        { month: '11', event: '연간 인사이트 리포트 Vol.2 발간', detail: '청년 고립·사회참여 현황 데이터 분석. 총 48페이지, 다운로드 1,200회 이상.' },
        { month: '09', event: '손편지 프로젝트 — 연결의 편지', detail: '군인·독립유공자 후손 대상 손편지 전달 프로젝트. 128명 참여, 전국 47개 부대 전달.' },
        { month: '07', event: '청년 유형 테스트 서비스 v1 오픈', detail: '자취생 생존 유형 테스트 첫 론칭. 3개월 내 12,000명 이상 참여.' },
        { month: '05', event: '정기 세미나 시즌1 종료 — 6회 진행', detail: '마음건강·커리어·주거·관계 등 6개 주제. 총 참여자 420명, 평균 만족도 4.7/5.0.' },
        { month: '04', event: '캠페인 시리즈 본격화', detail: '누적 캠페인 영향력 10만 회 돌파. SNS 해시태그 캠페인 #청년연결 참여자 3,200명.' },
        { month: '02', event: '파트너십 협약 20개 기관 달성', detail: '서울시 산하 청년 지원 기관, 사회적 기업, 대학 내 학생단체 등과 MOU 체결.' },
        { month: '01', event: '세미나 정기 프로그램 론칭', detail: '월 2회 정기 세미나 시작. 첫 회 주제: "청년의 감정, 어디서 왔는가" — 참여자 67명.' },
      ],
    },
    {
      year: '2023',
      color: 'text-ieumNavyLight',
      items: [
        { month: '12', event: '연간 결산 — 참여자 1,200명, 프로젝트 38개', detail: '설립 첫 해 결산. 기획팀·콘텐츠팀·운영팀 체계 완성.' },
        { month: '09', event: '월간 인사이트 리포트 창간', detail: '청년 사회 분석 콘텐츠 정기 발행 시작. 창간호 주제: "고립의 시대, 청년은 어디에 있는가"' },
        { month: '07', event: '첫 번째 여름 캠페인 운영', detail: '오프라인 캠페인 행사 첫 개최. 참여 청년 230명, 서울 홍대·연남동 일대 진행.' },
        { month: '06', event: '첫 번째 청년 기획 프로젝트 시작', detail: '5개 팀, 24명의 청년이 직접 기획한 사회참여 프로젝트 1기 시작.' },
        { month: '04', event: '카카오채널 개설 및 커뮤니티 첫 운영', detail: '온라인 커뮤니티 첫 개설. 첫 달 200명 가입. 격주 뉴스레터 발행 시작.' },
        { month: '03', event: '이음(IEUM) 설립 — 청년 참여 구조의 시작', detail: '청년사회단체 이음 공식 창립. 창립 멤버 12명, 서울 마포구 사무실 개설.', highlight: true },
      ],
    },
  ];

  return (
    <div className="animate-fadeIn">
      <div className="bg-ieumNavy relative overflow-hidden px-5 py-14 md:py-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-ieumOrange opacity-[0.07]"></div>
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <span className="text-ieumOrange text-xs font-bold uppercase tracking-widest">History</span>
          <h1 className="text-white text-3xl md:text-4xl font-black mt-2">연혁</h1>
          <p className="text-white/50 text-sm mt-3 max-w-lg">2023년 이음(IEUM) 창립부터 현재까지, 청년과 함께 걸어온 발자국</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 py-12 md:py-16">

        {/* 요약 수치 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {[
            { num: '2+', label: '설립 연수', sub: '2023년 3월~' },
            { num: '2,841', label: '누적 참여 청년', sub: '전국 8개 지역' },
            { num: '123', label: '진행 프로젝트', sub: '프로젝트·세미나·캠페인' },
            { num: '48', label: '협력 네트워크', sub: '기관·단체·기업' },
          ].map((s, i) => (
            <div key={i} className="bg-ieumCream border border-ieumBorder rounded-2xl p-5 text-center">
              <p className="text-2xl md:text-3xl font-black text-ieumOrange">{s.num}</p>
              <p className="text-[12px] font-bold text-ieumDark mt-1">{s.label}</p>
              <p className="text-[10px] text-ieumMuted mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* 타임라인 */}
        <div className="space-y-14">
          {timeline.map((section) => (
            <div key={section.year} className="md:flex md:gap-12">
              <div className="md:w-24 flex-shrink-0 mb-6 md:mb-0 md:pt-1">
                <span className={`text-4xl font-black ${section.color}`}>{section.year}</span>
                <div className="hidden md:block w-8 h-1 bg-ieumBorder rounded-full mt-2"></div>
              </div>
              <div className="flex-1 border-l-2 border-ieumBorder pl-6 space-y-4">
                {section.items.map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className={`absolute -left-[29px] top-1.5 w-3.5 h-3.5 rounded-full border-2 ${item.highlight ? 'bg-ieumOrange border-ieumOrange' : 'bg-white border-gray-300'}`}></div>
                    <div className={`rounded-xl border overflow-hidden ${item.highlight ? 'border-ieumOrange/30' : 'border-ieumBorder'}`}>
                      <div className={`px-4 py-3 ${item.highlight ? 'bg-ieumOrange/5' : 'bg-white'}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-black text-ieumMuted bg-ieumCream border border-ieumBorder px-2 py-0.5 rounded-full">
                            {section.year}.{item.month}
                          </span>
                          {item.highlight && (
                            <span className="text-[10px] font-bold text-white bg-ieumOrange px-2 py-0.5 rounded-full">주요 이정표</span>
                          )}
                        </div>
                        <p className={`text-sm font-black ${item.highlight ? 'text-ieumOrange' : 'text-ieumDark'}`}>{item.event}</p>
                      </div>
                      <div className="px-4 py-2.5 bg-ieumCream/50 border-t border-ieumBorder">
                        <p className="text-xs text-ieumMuted leading-relaxed">{item.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

/* ── 조직도 ── */
const Organization: React.FC = () => (
  <div className="animate-fadeIn">
    <div className="bg-ieumNavy relative overflow-hidden px-5 py-14 md:py-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-ieumOrange opacity-[0.07]"></div>
      </div>
      <div className="max-w-5xl mx-auto relative z-10">
        <span className="text-ieumOrange text-xs font-bold uppercase tracking-widest">Organization</span>
        <h1 className="text-white text-3xl md:text-4xl font-black mt-2">조직도</h1>
        <p className="text-white/50 text-sm mt-3">청년의, 청년에 의한, 청년을 위한 이음의 팀</p>
      </div>
    </div>

    <div className="max-w-5xl mx-auto px-5 py-12 md:py-16">

      {/* 조직 규모 */}
      <div className="grid grid-cols-3 gap-4 mb-12">
        {[
          { num: '18명', label: '활동 멤버', sub: '기획·콘텐츠·운영' },
          { num: '3개', label: '운영 팀', sub: '분야별 전문화' },
          { num: '5명', label: '자문단', sub: '전문가 네트워크' },
        ].map((s, i) => (
          <div key={i} className="bg-ieumCream border border-ieumBorder rounded-2xl p-4 md:p-5 text-center">
            <p className="text-xl md:text-2xl font-black text-ieumOrange">{s.num}</p>
            <p className="text-xs md:text-sm font-bold text-ieumDark mt-1">{s.label}</p>
            <p className="text-[10px] text-ieumMuted mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* 대표 */}
      <div className="flex justify-center mb-6">
        <div className="bg-ieumNavy text-white rounded-2xl px-8 py-5 text-center min-w-[200px]">
          <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-white/20">
            <i className="fa-solid fa-user text-white text-xl"></i>
          </div>
          <p className="text-ieumOrange text-[10px] font-bold uppercase tracking-widest mb-0.5">Representative</p>
          <p className="text-white font-black text-base">이찬영</p>
          <p className="text-white/50 text-xs mt-1">대표 · 총괄 · 전략 수립 · 대외협력</p>
        </div>
      </div>

      {/* 연결선 */}
      <div className="flex justify-center mb-6">
        <div className="w-px h-8 bg-ieumBorder"></div>
      </div>

      {/* 부대표 */}
      <div className="flex justify-center mb-6">
        <div className="bg-ieumLight border border-ieumBorder text-ieumDark rounded-2xl px-8 py-4 text-center min-w-[200px]">
          <p className="text-ieumOrange text-[10px] font-bold uppercase tracking-widest mb-0.5">Vice Representative</p>
          <p className="text-ieumDark font-black text-base">부대표</p>
          <p className="text-ieumMuted text-xs mt-1">내부 운영 조율 · 팀 지원</p>
        </div>
      </div>

      {/* 연결선 → 3팀 */}
      <div className="hidden md:flex justify-center mb-6">
        <div className="relative w-full max-w-2xl">
          <div className="absolute top-0 left-1/4 right-1/4 h-px bg-ieumBorder"></div>
          <div className="absolute top-0 left-[calc(50%-0.5px)] w-px h-6 bg-ieumBorder"></div>
          <div className="absolute top-0 left-[calc(16.66%-0.5px)] w-px h-6 bg-ieumBorder"></div>
          <div className="absolute top-0 left-[calc(83.33%-0.5px)] w-px h-6 bg-ieumBorder"></div>
          <div className="h-6"></div>
        </div>
      </div>
      <div className="flex justify-center mb-2 md:hidden">
        <div className="w-px h-6 bg-ieumBorder"></div>
      </div>

      {/* 3개 팀 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {[
          {
            name: '기획팀',
            icon: 'fa-lightbulb',
            color: 'bg-ieumOrange',
            headCount: '6명',
            desc: '이음의 핵심 프로그램을 기획·운영합니다.',
            roles: [
              { pos: '팀장', duty: '팀 총괄 · 프로그램 개발 전략' },
              { pos: '프로젝트 매니저', duty: '청년 기획 프로젝트 운영 · 참여자 관리' },
              { pos: '파트너십 담당', duty: '기관 협약 · 협력 프로그램 기획' },
              { pos: '행사 기획', duty: '세미나 · 캠페인 현장 기획·운영' },
            ],
          },
          {
            name: '콘텐츠팀',
            icon: 'fa-pen-nib',
            color: 'bg-ieumNavyLight',
            headCount: '7명',
            desc: '이음의 목소리를 글과 콘텐츠로 만듭니다.',
            roles: [
              { pos: '팀장', duty: '콘텐츠 전략 · 편집장' },
              { pos: '인터뷰 에디터', duty: '청년 인터뷰 기획 · 취재 · 발행' },
              { pos: '에세이 에디터', duty: '에세이·칼럼 원고 편집 · 발행' },
              { pos: '인사이트 리서처', duty: '월간 리포트 조사·분석·발행' },
              { pos: 'SNS 운영', duty: '채널 운영 · 콘텐츠 배포' },
            ],
          },
          {
            name: '운영팀',
            icon: 'fa-gear',
            color: 'bg-ieumNavy',
            headCount: '5명',
            desc: '이음이 원활하게 굴러갈 수 있도록 지원합니다.',
            roles: [
              { pos: '팀장', duty: '운영 총괄 · 내부 커뮤니케이션' },
              { pos: '커뮤니티 매니저', duty: '멤버 관리 · 온라인 커뮤니티 운영' },
              { pos: '재무 담당', duty: '예산 관리 · 정산 · 후원 관리' },
              { pos: '기술 담당', duty: '웹사이트 운영 · 디지털 인프라 관리' },
            ],
          },
        ].map((team, i) => (
          <div key={i} className="border border-ieumBorder rounded-2xl overflow-hidden bg-white">
            <div className={`${team.color} px-5 py-4`}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-white/15 rounded-xl flex items-center justify-center">
                    <i className={`fa-solid ${team.icon} text-white text-xs`}></i>
                  </div>
                  <h3 className="text-white font-black text-base">{team.name}</h3>
                </div>
                <span className="text-white/70 text-xs font-bold">{team.headCount}</span>
              </div>
              <p className="text-white/60 text-xs">{team.desc}</p>
            </div>
            <ul className="px-5 py-4 space-y-3">
              {team.roles.map((role, j) => (
                <li key={j} className="border-b border-ieumBorder pb-3 last:border-0 last:pb-0">
                  <p className="text-xs font-black text-ieumDark">{role.pos}</p>
                  <p className="text-[11px] text-ieumMuted mt-0.5 leading-relaxed">{role.duty}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* 자문단 */}
      <div className="border border-ieumBorder rounded-2xl overflow-hidden mb-8">
        <div className="bg-ieumCream px-6 py-4 border-b border-ieumBorder flex items-center gap-3">
          <div className="w-8 h-8 bg-ieumNavy/10 rounded-xl flex items-center justify-center">
            <i className="fa-solid fa-star text-ieumNavy text-sm"></i>
          </div>
          <div>
            <h3 className="text-ieumDark font-black text-base">자문단 Advisory Board</h3>
            <p className="text-ieumMuted text-xs">각 분야 전문가 5명이 이음의 방향성을 함께 고민합니다</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-0 divide-y md:divide-y-0 md:divide-x divide-ieumBorder">
          {[
            { area: '사회정책', role: '청년 정책 전문가', icon: 'fa-landmark' },
            { area: '청년심리', role: '임상심리 전문가', icon: 'fa-brain' },
            { area: '콘텐츠', role: '미디어·저널리즘', icon: 'fa-newspaper' },
            { area: '법률', role: '비영리단체 법률 자문', icon: 'fa-scale-balanced' },
            { area: '기술', role: '디지털 플랫폼 전문가', icon: 'fa-microchip' },
          ].map((a, i) => (
            <div key={i} className="px-4 py-5 text-center">
              <div className="w-9 h-9 bg-ieumNavy/5 rounded-xl flex items-center justify-center mx-auto mb-2">
                <i className={`fa-solid ${a.icon} text-ieumNavy text-sm`}></i>
              </div>
              <p className="text-xs font-black text-ieumDark">{a.area}</p>
              <p className="text-[10px] text-ieumMuted mt-0.5 leading-relaxed">{a.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 채용/참여 CTA */}
      <div className="bg-ieumLight border border-ieumBorder rounded-2xl p-8">
        <div className="md:flex md:items-center md:justify-between gap-8">
          <div className="mb-6 md:mb-0">
            <span className="text-ieumOrange text-xs font-bold uppercase tracking-widest">Join Us</span>
            <h3 className="text-ieumDark font-black text-xl mt-1 mb-2">이음의 팀원이 되어주세요</h3>
            <p className="text-ieumMuted text-sm leading-relaxed max-w-lg">
              이음은 청년 자원활동가, 기획자, 에디터, 개발자가 함께 운영합니다.
              정기적으로 팀원을 모집하며, 사회참여에 관심 있는 청년이라면 누구든 환영합니다.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {['기획자', '에디터·작가', '디자이너', '개발자', '마케터', '현장 활동가'].map((r, i) => (
                <span key={i} className="text-xs font-semibold text-ieumNavy bg-white border border-ieumBorder px-3 py-1.5 rounded-full">{r}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
);

/* ── 메인 AboutPage 라우터 ── */
const AboutPage: React.FC = () => {
  const { section } = useParams<{ section: string }>();
  const navigate = useNavigate();

  const renderSection = () => {
    switch (section) {
      case 'greeting': return <Greeting />;
      case 'intro': return <Intro />;
      case 'history': return <History />;
      case 'organization': return <Organization />;
      default: return <Intro />;
    }
  };

  return (
    <div>
      <div className="bg-white border-b border-ieumBorder sticky top-16 z-30">
        <div className="max-w-5xl mx-auto px-5">
          <div className="flex overflow-x-auto hide-scrollbar">
            {sections.map(s => (
              <button
                key={s.key}
                onClick={() => navigate(s.path)}
                className={`flex-shrink-0 px-4 py-3.5 text-sm font-semibold border-b-2 transition-colors ${
                  section === s.key || (!section && s.key === 'intro')
                    ? 'border-ieumOrange text-ieumOrange'
                    : 'border-transparent text-ieumMuted hover:text-ieumDark'
                }`}
              >{s.label}</button>
            ))}
          </div>
        </div>
      </div>
      {renderSection()}
    </div>
  );
};

export default AboutPage;
