
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ARTICLES = [
  {
    title: '제1조 (목적)',
    content: `이 약관은 이음(IEUM, 이하 "단체")이 운영하는 웹사이트(이하 "서비스")를 이용함에 있어 단체와 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.`,
  },
  {
    title: '제2조 (정의)',
    content: `① "서비스"란 단체가 제공하는 이음(IEUM) 웹사이트 및 관련 서비스 일체를 의미합니다.\n\n② "이용자"란 본 약관에 따라 서비스를 이용하는 모든 사람을 말합니다.\n\n③ "회원"이란 서비스에 개인정보를 제공하여 회원 등록을 한 자로서, 서비스의 정보를 지속적으로 제공받으며 서비스를 계속적으로 이용할 수 있는 자를 말합니다.\n\n④ "콘텐츠"란 단체가 서비스 내에서 제공하는 텍스트, 이미지, 영상, 음성 등 일체의 정보를 의미합니다.`,
  },
  {
    title: '제3조 (약관의 효력 및 변경)',
    content: `① 이 약관은 서비스를 이용하고자 하는 모든 이용자에게 적용됩니다.\n\n② 단체는 필요한 경우 관련 법령에 위배되지 않는 범위 내에서 이 약관을 변경할 수 있습니다.\n\n③ 약관이 변경되는 경우 단체는 변경 사항을 시행일 7일 전부터 서비스 내 공지사항을 통해 공지합니다. 다만, 이용자에게 불리한 약관 변경의 경우에는 30일 전부터 공지합니다.\n\n④ 이용자가 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단하고 탈퇴할 수 있으며, 변경된 약관의 효력 발생일 이후에도 서비스를 계속 이용할 경우 약관 변경에 동의한 것으로 간주됩니다.`,
  },
  {
    title: '제4조 (서비스의 제공 및 변경)',
    content: `① 단체는 다음과 같은 서비스를 제공합니다.\n\n• 청년 사회참여 프로그램 정보 제공 (프로젝트, 세미나, 캠페인 등)\n• 청년 콘텐츠 제공 (인터뷰, 에세이/칼럼, 인사이트 리포트 등)\n• 이음(IEUM) 단체 소개 및 활동 정보 제공\n• 프로그램 신청 및 참여 관리\n• 기타 단체가 정하는 서비스\n\n② 단체는 상당한 이유가 있는 경우 서비스의 내용을 변경할 수 있으며, 이 경우 변경 내용과 시행일을 명시하여 사전에 공지합니다.\n\n③ 서비스는 연중무휴 24시간 제공함을 원칙으로 하나, 시스템 점검, 증설 및 교체, 통신의 두절 등의 경우 일시적으로 서비스 제공이 중단될 수 있습니다.`,
  },
  {
    title: '제5조 (이용자의 의무)',
    content: `① 이용자는 다음 행위를 하여서는 안 됩니다.\n\n1. 신청 또는 변경 시 허위내용을 등록하는 행위\n2. 단체에 게시된 정보를 변경하는 행위\n3. 단체가 정한 정보 이외의 정보(컴퓨터 프로그램 등)를 송신하거나 게시하는 행위\n4. 단체의 저작권, 제3자의 저작권 등 기타 권리를 침해하는 행위\n5. 단체 및 기타 제3자의 명예를 손상하거나 업무를 방해하는 행위\n6. 외설 또는 폭력적인 메시지, 화상, 음성 기타 공서양속에 반하는 정보를 서비스에 공개 또는 게시하는 행위\n7. 단체의 동의 없이 영리를 목적으로 서비스를 사용하는 행위\n8. 기타 불법적이거나 부당한 행위`,
  },
  {
    title: '제6조 (서비스 이용 제한)',
    content: `① 단체는 이용자가 이 약관의 의무를 위반하거나 서비스의 정상적인 운영을 방해한 경우, 경고, 일시 정지, 영구 이용 정지 등으로 서비스 이용을 단계적으로 제한할 수 있습니다.\n\n② 단체는 전항에도 불구하고, 저작권법을 위반한 불법 프로그램의 제공 및 운영 방해, 정보통신망 이용촉진 및 정보보호 등에 관한 법률을 위반한 불법 통신 및 해킹, 악성 프로그램의 배포, 접속권한 초과행위 등과 같이 관련 법률을 위반한 경우에는 즉시 영구 이용 정지를 할 수 있습니다.`,
  },
  {
    title: '제7조 (지식재산권)',
    content: `① 단체가 제공하는 서비스 및 서비스 내 콘텐츠(텍스트, 이미지, 영상, 로고 등)에 대한 저작권 및 지식재산권은 단체에 귀속됩니다.\n\n② 이용자는 서비스를 이용함으로써 얻은 정보 중 단체에 지식재산권이 귀속된 정보를 단체의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리 목적으로 이용하거나 제3자에게 이용하게 하여서는 안 됩니다.\n\n③ 이용자가 서비스 내에 게시한 콘텐츠에 대한 저작권은 해당 이용자에게 귀속됩니다. 다만, 이용자는 단체에게 해당 콘텐츠를 서비스 내에서 사용, 복사, 수정, 재게시, 번역하는 것에 대한 비독점적, 무상의 라이선스를 부여합니다.`,
  },
  {
    title: '제8조 (면책조항)',
    content: `① 단체는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.\n\n② 단체는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.\n\n③ 단체는 이용자가 서비스를 이용하여 기대하는 수익을 상실한 것에 대하여 책임을 지지 않으며, 그 밖에 서비스를 통하여 얻은 자료로 인한 손해 등에 대하여도 책임을 지지 않습니다.\n\n④ 단체는 이용자가 게재한 정보, 자료, 사실의 신뢰도, 정확성 등 내용에 관하여는 책임을 지지 않습니다.\n\n⑤ 단체는 서비스와 연결된 외부 링크 사이트에서 제공하는 정보·서비스에 대하여 책임을 지지 않습니다.`,
  },
  {
    title: '제9조 (분쟁해결)',
    content: `① 단체는 이용자로부터 제출되는 불만사항 및 의견을 우선적으로 처리합니다.\n\n② 단체와 이용자 간에 발생한 전자상거래 분쟁에 관한 소송은 제소 당시의 이용자의 주소에 의하고, 주소가 없는 경우에는 거소를 관할하는 지방법원의 전속관할로 합니다. 단, 제소 당시 이용자의 주소 또는 거소가 명확하지 아니한 경우에는 관할 법원은 민사소송법에 따라 정합니다.`,
  },
  {
    title: '제10조 (기타)',
    content: `① 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 대한민국 관계 법령 및 상관례에 따릅니다.\n\n② 단체의 서비스 관련 문의사항이나 불만은 아래 연락처로 문의하시기 바랍니다.\n\n• 이메일: hello@reallygreatsite.com\n• 주소: 서울특별시 마포구 독막로 76-1 2층\n• 사업자등록번호: 289-67-00756\n• 대표자: 이찬영`,
  },
];

const TermsPage: React.FC = () => {
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
            이용약관
          </h1>
          <p className="text-white/40 text-sm mt-3">시행일: 2025년 1월 1일 · 이음(IEUM)</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-5 py-10">
        <div className="bg-ieumLight border border-ieumBorder rounded-2xl p-6 mb-10">
          <p className="text-ieumDark text-sm leading-relaxed">
            이음(IEUM)의 서비스를 이용해주셔서 감사합니다. 본 약관은 이음 웹사이트 및
            서비스 이용에 관한 조건과 절차를 규정합니다. 서비스를 이용하시기 전에
            반드시 본 약관을 읽고 동의하신 후 이용해 주시기 바랍니다.
          </p>
        </div>

        <div className="space-y-6">
          {ARTICLES.map((article, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-ieumBorder p-7">
              <h2 className="text-base font-black text-ieumDark mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-ieumOrange/10 text-ieumOrange rounded-lg flex items-center justify-center text-[11px] font-black flex-shrink-0">
                  {idx + 1}
                </span>
                {article.title}
              </h2>
              <div className="text-sm text-ieumMuted leading-[1.9] whitespace-pre-line">
                {article.content}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-ieumNavy rounded-2xl p-7 text-center">
          <i className="fa-solid fa-envelope text-ieumOrange text-2xl mb-3 block"></i>
          <p className="text-white font-bold text-sm mb-1">이용약관 관련 문의</p>
          <a href="mailto:hello@reallygreatsite.com" className="text-ieumOrange text-sm hover:underline">
            hello@reallygreatsite.com
          </a>
          <p className="text-white/40 text-xs mt-2">단체명: 이음(IEUM) · 대표자: 이찬영</p>
        </div>

        <p className="text-ieumMuted text-xs text-center mt-8 pb-8">
          본 이용약관은 2025년 1월 1일부터 시행됩니다.<br />
          서울특별시 마포구 독막로 76-1 2층 · 사업자등록번호 289-67-00756
        </p>
      </div>
    </div>
  );
};

export default TermsPage;
