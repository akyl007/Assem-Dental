import { useState, useEffect } from 'react';

export interface PricingItem {
  id: string;
  name: string;
  price: string;
}

export interface DoctorItem {
  id: string;
  name: string;
  role: string;
  exp: string;
  img: string;
  desc: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  desc: string;
  action: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  text: string;
}

export interface SiteData {
  phoneRaw: string;
  phoneDisplay: string;
  heroImage: string;
  pricing: PricingItem[];
  doctors: DoctorItem[];
  services: ServiceItem[];
  reviews: ReviewItem[];
}

export const defaultData: SiteData = {
  phoneRaw: '77753041999',
  phoneDisplay: '+7 (775) 304-19-99',
  heroImage: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1000',
  pricing: [
    { id: '1', name: 'Первичная консультация с планом лечения', price: 'от 5 000 ₸' },
    { id: '2', name: 'Лечение кариеса (анестезия + пломба)', price: 'от 15 000 ₸' },
    { id: '3', name: 'Профессиональная гигиена полости рта', price: 'от 18 000 ₸' },
    { id: '4', name: 'Имплантация зубов (имплант + работа)', price: 'от 120 000 ₸' },
    { id: '5', name: 'Профессиональное отбеливание зубов', price: 'от 45 000 ₸' },
  ],
  doctors: [
    { id: '1', name: 'Арман Оспанов', role: 'Главный врач, имплантолог', exp: '15 лет', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400', desc: 'Провел более 3000 успешных операций по имплантации.' },
    { id: '2', name: 'Динара Алиева', role: 'Стоматолог-терапевт, эндодонтист', exp: '12 лет', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400', desc: 'Специалист по ювелирной работе с каналами под микроскопом.' },
    { id: '3', name: 'Тимур Саидов', role: 'Детский стоматолог', exp: '8 лет', img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400', desc: 'Тонкий психолог, находит подход к самым пугливым малышам.' },
  ],
  services: [
    { id: '1', title: 'Терапия', desc: 'Лечение кариеса и пульпита под микроскопом. Спасаем и сохраняем родные зубы даже в самых сложных случаях.', action: 'Подробнее' },
    { id: '2', title: 'Имплантация зубов', desc: 'Восстановление утраченных зубов надежными имплантами с приживаемостью 99%. Быстро и с пожизненной гарантией.', action: 'Записаться' },
    { id: '3', title: 'Ортодонтия', desc: 'Исправление прикуса современными брекет-системами и невидимыми элайнерами. Ровная улыбка в любом возрасте.', action: 'Подробнее' },
    { id: '4', title: 'Эстетическая стоматология', desc: 'Профессиональное отбеливание зубов и установка ультратонких керамических виниров для идеальной улыбки.', action: 'Подробнее' },
    { id: '5', title: 'Детская стоматология', desc: 'Бережное лечение зубов у малышей без слез и стресса. Адаптационный прием, мультфильмы и подарки за смелость.', action: 'Записаться' },
    { id: '6', title: 'Хирургия', desc: 'Атравматичное удаление зубов любой сложности, включая ретинированные зубы мудрости, без боли и отеков.', action: 'Подробнее' },
  ],
  reviews: [
    { id: '1', name: 'Анна, 34 года', text: 'Ужасно боялась стоматологов с детства. В Assem Dental мне удаляли зуб мудрости — я даже не поняла, что все уже закончилось! Никакой боли, врач постоянно спрашивал о самочувствии. Теперь только сюда.' },
    { id: '2', name: 'Руслан, 45 лет', text: 'Делал имплантацию зубов. Все прошло на высшем уровне, от первой консультации до установки коронки. Очень профессиональный подход, современное оборудование и идеальный результат.' },
    { id: '3', name: 'Динара, 29 лет', text: 'Привели дочку (5 лет) на первое лечение зубов. Врач просто волшебница! Заговорила ребенка, включила мультики, вылечили кариес без единой слезинки. Дочь теперь сама спрашивает, когда пойдем снова.' },
  ]
};

export function useSiteData() {
  const [data, setData] = useState<SiteData>(() => {
    const saved = localStorage.getItem('assem_dental_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Merge with defaultData to ensure new fields (like services/reviews) exist
        return { ...defaultData, ...parsed };
      } catch (e) {}
    }
    return defaultData;
  });

  useEffect(() => {
    localStorage.setItem('assem_dental_data', JSON.stringify(data));
  }, [data]);

  return [data, setData] as const;
}
