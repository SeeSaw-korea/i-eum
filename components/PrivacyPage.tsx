
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  {
    title: '제1조 (목적)',
    content: `이음(IEUM, 이하 "단체")은 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.`,
  },
  {
    title: '제2조 (개인정보의 처리 목적)',
    content: `단체는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.\n\n① 홈페이지 회원 가입 및 관리: 회원 가입 의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 서비스 부정이용 방지 목적으로 개인정보를 처리합니다.\n② 활동 프로그램 참여 관리: 이음의 프로젝트, 세미나, 캠페인 등 프로그램 참여 신청 확인 및 운영, 참여 이력 관리, 만족도 조사를 위해 개인정보를 처리합니다.\n③ 뉴스레터 및 소식 발송: 이음의 활동 소식, 신규 프로그램 안내, 인사이트 리포트 발송을 위해 개인정보를 처리합니다.`,
  },
  {
    title: '제3조 (개인정보의 처리 및 보유기간)',
    content: `① 단체는 법령에 따른 개인정보 보유·이용 기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용 기간 내에서 개인정보를 처리·보유합니다.\n\n② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.\n\n• 홈페이지 회원 가입 및 관리: 회원 탈퇴 시까지. 단, 다음의 사유에 해당하는 경우에는 해당 사유 종료 시까지 보유합니다.\n  - 관계 법령 위반에 따른 수사·조사 등이 진행 중인 경우: 해당 수사·조사 종료 시까지\n• 활동 프로그램 참여 관리: 프로그램 종료 후 1년\n• 뉴스레터 구독: 수신 거부 시까지`,
  },
  {
    title: '제4조 (처리하는 개인정보의 항목)',
    content: `① 단체는 다음의 개인정보 항목을 처리하고 있습니다.\n\n• 홈페이지 회원 가입 및 관리\n  - 필수항목: 이름(닉네임), 연령대, 거주 지역\n  - 선택항목: MBTI, 관심 분야, 프로필 이미지\n• 활동 프로그램 참여\n  - 필수항목: 이름, 연락처(이메일 또는 전화번호), 참여 희망 프로그램\n  - 선택항목: 참여 동기, 자기소개\n• 자동 수집 정보: IP 주소, 쿠키, 서비스 이용 기록, 방문 일시`,
  },
  {
    title: '제5조 (개인정보의 제3자 제공)',
    content: `① 단체는 개인정보를 제2조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.\n\n② 현재 단체는 개인정보를 제3자에게 제공하지 않습니다. 향후 제공이 필요한 경우 반드시 사전에 정보주체의 동의를 받겠습니다.`,
  },
  {
    title: '제6조 (개인정보의 파기)',
    content: `① 단체는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.\n\n② 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.\n\n③ 개인정보 파기의 절차 및 방법은 다음과 같습니다.\n\n• 파기 절차: 단체는 파기 사유가 발생한 개인정보를 선정하고, 단체의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.\n• 파기 방법: 전자적 파일 형태로 기록·저장된 개인정보는 기록을 재생할 수 없도록 파기하며, 종이 문서에 기록·저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.`,
  },
  {
    title: '제7조 (정보주체와 법정대리인의 권리·의무 및 행사방법)',
    content: `① 정보주체는 단체에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.\n\n② 권리 행사는 단체에 대해 「개인정보 보호법」 시행령 제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며, 단체는 이에 대해 지체없이 조치하겠습니다.\n\n③ 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수도 있습니다. 이 경우 위임장을 제출하셔야 합니다.\n\n④ 개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조 제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한될 수 있습니다.\n\n⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.`,
  },
  {
    title: '제8조 (개인정보의 안전성 확보조치)',
    content: `단체는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.\n\n① 내부관리계획의 수립 및 시행: 개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고 있습니다.\n\n② 개인정보 취급 직원의 최소화 및 교육: 개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화하여 개인정보를 관리하는 대책을 시행하고 있습니다.\n\n③ 개인정보에 대한 접근 제한: 개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여, 변경, 말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를 하고 있습니다.\n\n④ 접속기록의 보관 및 위변조 방지: 개인정보처리시스템에 접속한 기록을 최소 1년 이상 보관, 관리하고 있으며, 접속 기록이 위변조 및 도난, 분실되지 않도록 보안기능을 사용하고 있습니다.`,
  },
  {
    title: '제9조 (개인정보 보호책임자)',
    content: `① 단체는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.\n\n▶ 개인정보 보호책임자\n  - 성명: 이찬영\n  - 직책: 대표\n  - 연락처: hello@reallygreatsite.com\n  - 주소: 서울특별시 마포구 독막로 76-1 2층\n\n② 정보주체께서는 단체의 서비스(또는 사업)를 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다. 단체는 정보주체의 문의에 대해 지체없이 답변 및 처리해드릴 것입니다.`,
  },
  {
    title: '제10조 (권익침해 구제방법)',
    content: `정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다.\n\n• 개인정보분쟁조정위원회: (국번없이) 1833-6972 (www.kopico.go.kr)\n• 개인정보침해신고센터: (국번없이) 118 (privacy.kisa.or.kr)\n• 대검찰청: (국번없이) 1301 (www.spo.go.kr)\n• 경찰청: (국번없이) 182 (ecrm.cyber.go.kr)`,
  },
  {
    title: '제11조 (개인정보처리방침의 변경)',
    content: `이 개인정보처리방침은 2025년 1월 1일부터 적용됩니다.\n\n이전의 개인정보 처리방침은 아래에서 확인하실 수 있습니다.\n\n변경 이력이 없습니다.`,
  },
];

const PrivacyPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-ieumCream animate-fadeIn">
      {/* Header */}
      <div className="bg-ieumNavy px-5 py-14 md:py-20 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-ieumOrange opacity-[0.07] pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/50 text-sm mb-6 hover:text-white transition-colors"
          >
            <i className="fa-solid fa-arrow-left text-xs"></i> 이전으로
          </button>
          <span className="text-ieumOrange text-xs font-bold uppercase tracking-widest">Legal</span>
          <h1 className="text-white text-3xl md:text-4xl font-black mt-2 leading-tight">
            개인정보처리방침
          </h1>
          <p className="text-white/40 text-sm mt-3">시행일: 2025년 1월 1일 · 이음(IEUM)</p>
        </div>
      </div>

      {/* Intro */}
      <div className="max-w-3xl mx-auto px-5 py-10">
        <div className="bg-ieumLight border border-ieumBorder rounded-2xl p-6 mb-10">
          <p className="text-ieumDark text-sm leading-relaxed">
            이음(IEUM, 이하 <strong>"단체"</strong>)은 개인정보 보호법 등 관련 법령을 준수하며,
            이용자의 개인정보를 안전하게 보호하기 위해 최선을 다하고 있습니다.
            본 방침은 단체가 어떤 정보를 수집하고, 수집된 정보를 어떻게 사용하며,
            필요시 어떻게 공유하는지에 대해 설명합니다.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {SECTIONS.map((section, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-ieumBorder p-7">
              <h2 className="text-base font-black text-ieumDark mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-ieumOrange/10 text-ieumOrange rounded-lg flex items-center justify-center text-[11px] font-black flex-shrink-0">
                  {idx + 1}
                </span>
                {section.title}
              </h2>
              <div className="text-sm text-ieumMuted leading-[1.9] whitespace-pre-line">
                {section.content}
              </div>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-10 bg-ieumNavy rounded-2xl p-7 text-center">
          <i className="fa-solid fa-envelope text-ieumOrange text-2xl mb-3 block"></i>
          <p className="text-white font-bold text-sm mb-1">개인정보 관련 문의</p>
          <a href="mailto:hello@reallygreatsite.com" className="text-ieumOrange text-sm hover:underline">
            hello@reallygreatsite.com
          </a>
          <p className="text-white/40 text-xs mt-2">개인정보 보호책임자: 이찬영 (대표)</p>
        </div>

        <p className="text-ieumMuted text-xs text-center mt-8 pb-8">
          본 개인정보처리방침은 2025년 1월 1일부터 시행됩니다.<br />
          서울특별시 마포구 독막로 76-1 2층 · 사업자등록번호 289-67-00756
        </p>
      </div>
    </div>
  );
};

export default PrivacyPage;
