import { ContentItem, Category } from '../types';
import data from '../data.json';

/**
 * 예약 마감 처리.
 * `autoCompleteAt` 시각이 지난 항목은 자동으로 '진행완료' 상태로 변환합니다.
 * 기존 완료 프로젝트와 동일하게, 상세 섹션 맨 앞에 '✅ 진행 완료' 하이라이트를 추가합니다.
 */
function applyScheduledCompletion(item: ContentItem): ContentItem {
  if (
    !item.autoCompleteAt ||
    item.deadline === '진행완료' ||
    Date.now() < new Date(item.autoCompleteAt).getTime()
  ) {
    return item;
  }

  const completionHighlight = {
    type: 'highlight' as const,
    subtitle: '✅ 진행 완료 | 2026년 6월 10일 ~ 7월 15일',
    body: '참여해주신 모든 청년 여러분께 감사드립니다. 결과는 추후 안내될 예정입니다.',
    iconClass: 'fa-solid fa-circle-check text-green-500',
  };

  return {
    ...item,
    deadline: '진행완료',
    detailedSections: [completionHighlight, ...(item.detailedSections ?? [])],
  };
}

export class ApiService {
  static async getRegions(): Promise<string[]> {
    return data.REGIONS;
  }

  static async getMbtiTypes(): Promise<string[]> {
    return data.MBTI_TYPES;
  }

  static async getAllContents(): Promise<ContentItem[]> {
    return (data.MOCK_CONTENTS as ContentItem[]).map(applyScheduledCompletion);
  }

  static async getContentsByCategory(category: Category): Promise<ContentItem[]> {
    return (data.MOCK_CONTENTS as ContentItem[])
      .filter(c => c.category === category)
      .map(applyScheduledCompletion);
  }

  static async getContentById(id: string): Promise<ContentItem | null> {
    const item = (data.MOCK_CONTENTS as ContentItem[]).find(c => c.id === id);
    return item ? applyScheduledCompletion(item) : null;
  }
}
