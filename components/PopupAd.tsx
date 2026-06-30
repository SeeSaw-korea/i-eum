import React, { useState, useEffect } from 'react';

/* ── 옥외광고 안내 팝업 ──
   PC/모바일 모두 화면 크기에 맞춰 표시되며, '오늘 하루 보지 않기'를
   누르면 그날 자정까지 다시 뜨지 않습니다. */

const STORAGE_KEY = 'ieum_popup_ad_hide_until';
const IMAGE_SRC = `${import.meta.env.BASE_URL}popup-ad.jpg`;

const PopupAd: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hideUntil = localStorage.getItem(STORAGE_KEY);
    if (hideUntil && Date.now() < Number(hideUntil)) return;
    setOpen(true);
  }, []);

  if (!open) return null;

  const close = () => setOpen(false);

  const hideForToday = () => {
    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    localStorage.setItem(STORAGE_KEY, String(endOfDay.getTime()));
    setOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 animate-fadeIn"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="안내 팝업"
    >
      <div
        className="relative w-full max-w-[420px] bg-white rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={close}
          aria-label="닫기"
          className="absolute top-2.5 right-2.5 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
        >
          <i className="fa-solid fa-xmark text-base"></i>
        </button>

        {/* 안내 이미지 */}
        <img
          src={IMAGE_SRC}
          alt="옥외광고 안내"
          className="block w-full h-auto max-h-[80vh] object-contain select-none"
          draggable={false}
        />

        {/* 하단 컨트롤 */}
        <div className="flex items-stretch border-t border-ieumBorder text-sm">
          <button
            onClick={hideForToday}
            className="flex-1 py-3.5 text-ieumMuted font-medium hover:bg-ieumCream transition-colors"
          >
            오늘 하루 보지 않기
          </button>
          <button
            onClick={close}
            className="flex-1 py-3.5 text-ieumDark font-bold border-l border-ieumBorder hover:bg-ieumCream transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupAd;
