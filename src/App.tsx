import React, { useState } from 'react';
import { 
  Phone, MapPin, Clock, ChevronRight, Star, Shield, 
  CheckCircle, Smile, HeartPulse, Activity, Menu, X, 
  ArrowRight, Calendar, Award
} from 'lucide-react';
import { motion } from 'motion/react';
import { useSiteData } from './store';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [data] = useSiteData();

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center cursor-pointer" onClick={() => scrollToSection('home')}>
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Smile className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-slate-900 tracking-tight">Assem<span className="text-blue-600">Dental</span></span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8">
              {['Услуги', 'Врачи', 'Цены', 'Отзывы', 'О клинике', 'Контакты'].map((item, index) => (
                <button 
                  key={index}
                  onClick={() => scrollToSection(item === 'О клинике' ? 'about' : item === 'Цены' ? 'pricing' : item === 'Отзывы' ? 'reviews' : item === 'Врачи' ? 'doctors' : item === 'Услуги' ? 'services' : 'contact')}
                  className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
                >
                  {item}
                </button>
              ))}
            </nav>

            {/* CTA & Phone */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex flex-col items-end">
                <a href={`tel:+${data.phoneRaw}`} className="text-lg font-bold text-slate-900 hover:text-blue-600 flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-blue-600" />
                  {data.phoneDisplay}
                </a>
                <span className="text-xs text-slate-500">Ежедневно 09:00 - 20:00</span>
              </div>
              <a href={`https://wa.me/${data.phoneRaw}`} target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 inline-block">
                Записаться
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600 hover:text-blue-600">
                {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-lg">
            <div className="px-4 pt-2 pb-6 space-y-1">
              {['Услуги', 'Врачи', 'Цены', 'Отзывы', 'О клинике', 'Контакты'].map((item, index) => (
                <button 
                  key={index}
                  onClick={() => scrollToSection(item === 'О клинике' ? 'about' : item === 'Цены' ? 'pricing' : item === 'Отзывы' ? 'reviews' : item === 'Врачи' ? 'doctors' : item === 'Услуги' ? 'services' : 'contact')}
                  className="block w-full text-left px-3 py-4 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                >
                  {item}
                </button>
              ))}
              <div className="pt-4 mt-2 border-t border-slate-100">
                <a href={`tel:+${data.phoneRaw}`} className="flex items-center justify-center w-full px-4 py-3 text-lg font-bold text-slate-900 bg-slate-50 rounded-lg mb-3">
                  <Phone className="w-5 h-5 mr-2 text-blue-600" />
                  {data.phoneDisplay}
                </a>
                <a href={`https://wa.me/${data.phoneRaw}`} target="_blank" rel="noopener noreferrer" className="flex justify-center w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold shadow-md">
                  Записаться на прием
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section id="home" className="pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 text-center lg:text-left"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-6">
                <Shield className="w-4 h-4 mr-2" />
                Гарантия качества и безопасности
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                Современная стоматология <span className="text-blue-600">без боли и страха</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                Возвращаем здоровье и красоту вашей улыбке. Лечение зубов по мировым стандартам с заботой о каждом пациенте.
              </p>
              
              <ul className="space-y-3 mb-10 text-left max-w-md mx-auto lg:mx-0">
                {[
                  'Без боли: лечение во сне и под безопасной анестезией',
                  'Современные технологии: 3D-диагностика и микроскоп',
                  'Опытные врачи: специалисты со стажем от 10 лет'
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href={`https://wa.me/${data.phoneRaw}`} target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center">
                  Записаться на прием
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
                <a href={`tel:+${data.phoneRaw}`} className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-sm flex items-center justify-center">
                  Позвонить нам
                </a>
              </div>
              <p className="mt-4 text-sm text-slate-500 font-medium">
                * Перезвоним в течение 5 минут
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-6 mt-16 lg:mt-0 relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                <img 
                  src={data.heroImage} 
                  alt="Современный стоматологический кабинет" 
                  className="object-cover w-full h-full"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden md:block animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Star className="w-8 h-8 text-green-600 fill-current" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">4.9/5</p>
                    <p className="text-sm text-slate-500 font-medium">На основе 500+ отзывов</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRUST BLOCK */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Почему нам доверяют свое здоровье</h2>
            <p className="text-slate-600 max-w-3xl mx-auto text-lg">
              Мы понимаем, что визит к стоматологу может вызывать тревогу. В Assem Dental мы создали атмосферу спокойствия, где каждый этап лечения проходит максимально комфортно.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Award className="w-8 h-8 text-blue-600" />, title: '15+ лет', desc: 'Успешной практики' },
              { icon: <Smile className="w-8 h-8 text-blue-600" />, title: '10 000+', desc: 'Счастливых пациентов' },
              { icon: <Shield className="w-8 h-8 text-blue-600" />, title: '100%', desc: 'Стерильность (Анти-СПИД)' },
              { icon: <Activity className="w-8 h-8 text-blue-600" />, title: 'Передовое', desc: 'Оборудование из ЕС' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-slate-50 hover:bg-blue-50 transition-colors">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-sm mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{stat.title}</h3>
                <p className="text-slate-600 font-medium">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Наши услуги</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Полный комплекс стоматологических услуг для всей семьи в одном месте.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Терапия', desc: 'Лечение кариеса и пульпита под микроскопом. Спасаем и сохраняем родные зубы даже в самых сложных случаях.', action: 'Подробнее' },
              { title: 'Имплантация зубов', desc: 'Восстановление утраченных зубов надежными имплантами с приживаемостью 99%. Быстро и с пожизненной гарантией.', action: 'Записаться' },
              { title: 'Ортодонтия', desc: 'Исправление прикуса современными брекет-системами и невидимыми элайнерами. Ровная улыбка в любом возрасте.', action: 'Подробнее' },
              { title: 'Эстетическая стоматология', desc: 'Профессиональное отбеливание зубов и установка ультратонких керамических виниров для идеальной улыбки.', action: 'Подробнее' },
              { title: 'Детская стоматология', desc: 'Бережное лечение зубов у малышей без слез и стресса. Адаптационный прием, мультфильмы и подарки за смелость.', action: 'Записаться' },
              { title: 'Хирургия', desc: 'Атравматичное удаление зубов любой сложности, включая ретинированные зубы мудрости, без боли и отеков.', action: 'Подробнее' },
            ].map((service, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow border border-slate-100 group">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                  <HeartPulse className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 mb-6 line-clamp-3">{service.desc}</p>
                <button className="text-blue-600 font-semibold flex items-center hover:text-blue-800 transition-colors">
                  {service.action}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOCTORS */}
      <section id="doctors" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Врачи, которым можно доверять</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Команда экспертов, регулярно повышающих квалификацию в Европе и Южной Корее.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {data.doctors.map((doc, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-[4/5] relative">
                  <img src={doc.img} alt={doc.name} className="object-cover w-full h-full" referrerPolicy="no-referrer" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-slate-900">{doc.name}</h3>
                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">Стаж: {doc.exp}</span>
                  </div>
                  <p className="text-blue-600 font-medium text-sm mb-4">{doc.role}</p>
                  <p className="text-slate-600 text-sm">{doc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">5 шагов к здоровой улыбке</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">Прозрачный и понятный процесс лечения от первого звонка до идеального результата.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-slate-700 z-0"></div>
            
            {[
              { step: '01', title: 'Запись', desc: 'Подбираем удобное для вас время' },
              { step: '02', title: 'Диагностика', desc: 'Точный 3D-снимок и осмотр' },
              { step: '03', title: 'План лечения', desc: 'Понятная смета и варианты' },
              { step: '04', title: 'Лечение', desc: 'Без боли в комфортном кресле' },
              { step: '05', title: 'Результат', desc: 'Здоровая улыбка с гарантией' },
            ].map((item, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-blue-600 border-4 border-slate-900 flex items-center justify-center text-xl font-bold mb-6 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Прозрачные цены без скрытых платежей</h2>
            <p className="text-lg text-slate-600">Мы честно озвучиваем полную стоимость до начала процедур. Цена фиксируется в договоре.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="divide-y divide-slate-100">
              {data.pricing.map((item, i) => (
                <div key={i} className="flex justify-between items-center p-6 hover:bg-slate-50 transition-colors">
                  <span className="text-slate-800 font-medium">{item.name}</span>
                  <span className="text-blue-600 font-bold text-lg whitespace-nowrap ml-4">{item.price}</span>
                </div>
              ))}
            </div>
            <div className="bg-blue-50 p-6 text-center">
              <p className="text-sm text-blue-800 font-medium flex items-center justify-center">
                <Shield className="w-4 h-4 mr-2" />
                Гарантия честной цены: точная смета составляется врачом после детальной диагностики.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Отзывы наших пациентов</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Лучшая награда для нас — ваши искренние улыбки и рекомендации.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Анна, 34 года', text: 'Ужасно боялась стоматологов с детства. В Assem Dental мне удаляли зуб мудрости — я даже не поняла, что все уже закончилось! Никакой боли, врач постоянно спрашивал о самочувствии. Теперь только сюда.' },
              { name: 'Руслан, 45 лет', text: 'Делал имплантацию зубов. Все прошло на высшем уровне, от первой консультации до установки коронки. Очень профессиональный подход, современное оборудование и идеальный результат.' },
              { name: 'Динара, 29 лет', text: 'Привели дочку (5 лет) на первое лечение зубов. Врач просто волшебница! Заговорила ребенка, включила мультики, вылечили кариес без единой слезинки. Дочь теперь сама спрашивает, когда пойдем снова.' },
            ].map((review, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-2xl relative">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-slate-700 mb-6 italic">«{review.text}»</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold text-lg mr-3">
                    {review.name.charAt(0)}
                  </div>
                  <span className="font-bold text-slate-900">{review.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT & CONTACT */}
      <section id="about" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* About */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">О клинике Assem Dental</h2>
              <div className="space-y-6 text-slate-600 text-lg">
                <p>
                  <strong className="text-slate-900">Наша миссия:</strong> Делать качественную стоматологическую помощь доступной, комфортной и абсолютно безопасной для каждого.
                </p>
                <p>
                  <strong className="text-slate-900">Наши ценности:</strong> Честность, эмпатия и непрерывное профессиональное развитие.
                </p>
                <p>
                  <strong className="text-slate-900">Технологии:</strong> Мы используем только сертифицированные материалы мировых брендов, дентальные микроскопы для максимальной точности и многоступенчатые системы стерилизации инструментов.
                </p>
                <p>
                  <strong className="text-slate-900">Забота о пациенте:</strong> Для нас вы — не просто пациент, а желанный гость. Мы заботимся о вашем комфорте с первой минуты пребывания в клинике, предлагая вкусный кофе, уютную зону ожидания и искреннее внимание персонала.
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div id="contact" className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">Ждем вас в Assem Dental</h3>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-slate-900">Адрес</h4>
                    <p className="text-slate-600">г. Актау, клиника Assem Dental</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-slate-900">Телефон / WhatsApp</h4>
                    <a href={`tel:+${data.phoneRaw}`} className="text-slate-600 hover:text-blue-600 transition-colors">{data.phoneDisplay}</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-slate-900">Режим работы</h4>
                    <p className="text-slate-600">Пн-Вс: с 09:00 до 20:00<br/>Без выходных</p>
                  </div>
                </div>
              </div>

              <div className="w-full h-64 bg-slate-200 rounded-xl mb-6 relative overflow-hidden shadow-inner">
                <iframe 
                  src="https://maps.google.com/maps?q=43.67150920666986,51.141679162542175&hl=ru&z=17&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
              </div>

              <a href="https://www.google.com/maps/place/Assem+Dental/@43.6716033,51.1419675,19z/data=!4m6!3m5!1s0x41b4314c05b5936d:0xa2d10b448c973004!8m2!3d43.6715159!4d51.1416901!16s%2Fg%2F11y5rpqm72?entry=ttu" target="_blank" rel="noopener noreferrer" className="w-full bg-slate-900 hover:bg-slate-800 text-white px-6 py-4 rounded-xl font-bold transition-colors flex items-center justify-center">
                <MapPin className="w-5 h-5 mr-2" />
                Построить маршрут
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Готовы к идеальной улыбке?</h2>
          <p className="text-xl text-blue-100 mb-10">
            Не откладывайте здоровье на завтра. Избавьтесь от боли и дискомфорта уже сегодня в руках заботливых профессионалов.
          </p>
          
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-500/20 text-white font-medium text-sm mb-8 border border-red-400/30">
            <Calendar className="w-4 h-4 mr-2" />
            На сегодня осталось 2 свободных окна к специалистам
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`https://wa.me/${data.phoneRaw}`} target="_blank" rel="noopener noreferrer" className="bg-white text-blue-600 hover:bg-slate-50 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 inline-flex items-center justify-center">
              Написать в WhatsApp
            </a>
            <a href={`tel:+${data.phoneRaw}`} className="bg-blue-700 text-white hover:bg-blue-800 border border-blue-500 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 inline-flex items-center justify-center">
              Позвонить
            </a>
          </div>
          <p className="mt-6 text-sm text-blue-200 font-medium">
            Оставьте заявку, и мы перезвоним в течение 5 минут для подтверждения времени.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <Smile className="text-blue-500 w-8 h-8 mr-3" />
              <span className="text-2xl font-bold text-white tracking-tight">Assem<span className="text-blue-500">Dental</span></span>
            </div>
            <div className="text-sm text-center md:text-right">
              <p>&copy; {new Date().getFullYear()} Стоматологическая клиника Assem Dental.</p>
              <p className="mt-1">Все права защищены. Лицензия №123456789</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
