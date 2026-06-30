
export enum Category {
  PROJECTS = '프로젝트',
  SEMINARS = '세미나',
  INSIGHTS = '인사이트',
  CAMPAIGNS = '캠페인',
  INTERVIEWS = '인터뷰',
  ESSAYS = '에세이/칼럼',
  TYPE_TEST = '유형테스트'
}

export const CATEGORY_SLUG: Record<Category, string> = {
  [Category.PROJECTS]:   'projects',
  [Category.SEMINARS]:   'seminars',
  [Category.INSIGHTS]:   'insights',
  [Category.CAMPAIGNS]:  'campaigns',
  [Category.INTERVIEWS]: 'interviews',
  [Category.ESSAYS]:     'essays',
  [Category.TYPE_TEST]:  'type-test',
};

export const SLUG_TO_CATEGORY: Record<string, Category> = {
  projects:   Category.PROJECTS,
  seminars:   Category.SEMINARS,
  insights:   Category.INSIGHTS,
  campaigns:  Category.CAMPAIGNS,
  interviews: Category.INTERVIEWS,
  essays:     Category.ESSAYS,
  'type-test':Category.TYPE_TEST,
};

export interface UserProfile {
  age: number;
  region: string;
  mbti?: string;
  interests: Category[];
  isAnalyzed: boolean;
  analysisVibe?: string;
}

export interface ContentItem {
  id: string;
  title: string;
  category: Category;
  description: string;
  imageUrl: string;
  detailImages?: string[];
  externalLink?: string;
  deadline?: string;
  /** ISO datetime. 이 시각이 지나면 자동으로 '진행완료' 처리됩니다 (예약 마감). */
  autoCompleteAt?: string;
  tag?: string;
  isWishlisted?: boolean;
  detailedSections?: {
    type?: 'default' | 'quote' | 'highlight' | 'steps' | 'progress' | 'checklist' | 'faq' | 'image';
    subtitle?: string;
    body: string;
    iconClass?: string;
    extraData?: string[]; // For steps or checklist
    progressData?: { current: number; target: number; label: string };
    faqData?: { question: string; answer: string }[];
  }[];
}

export interface AppState {
  isFirstLogin: boolean;
  user: UserProfile | null;
  wishlist: string[];
}
