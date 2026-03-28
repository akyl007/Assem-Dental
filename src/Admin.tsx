import React, { useState, useRef } from 'react';
import { SiteData, useSiteData, PricingItem, DoctorItem, ServiceItem, ReviewItem } from './store';
import { 
  Save, Plus, Trash2, ArrowLeft, Settings, Users, 
  DollarSign, Image as ImageIcon, MessageSquare, Briefcase,
  Upload, X
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Admin() {
  const [data, setData] = useSiteData();
  const [formData, setFormData] = useState<SiteData>(data);
  const [activeTab, setActiveTab] = useState('general');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    setData(formData);
    alert('Изменения успешно сохранены!');
  };

  const updateField = (field: keyof SiteData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Pricing Handlers
  const handlePricingChange = (id: string, field: keyof PricingItem, value: string) => {
    const newPricing = formData.pricing.map(p => p.id === id ? { ...p, [field]: value } : p);
    updateField('pricing', newPricing);
  };

  const addPricing = () => {
    const newPricing = [...formData.pricing, { id: Date.now().toString(), name: 'Новая услуга', price: '0 ₸' }];
    updateField('pricing', newPricing);
  };

  const removePricing = (id: string) => {
    updateField('pricing', formData.pricing.filter(p => p.id !== id));
  };

  // Doctor Handlers
  const handleDoctorChange = (id: string, field: keyof DoctorItem, value: string) => {
    const newDocs = formData.doctors.map(d => d.id === id ? { ...d, [field]: value } : d);
    updateField('doctors', newDocs);
  };

  const addDoctor = () => {
    const newDocs = [...formData.doctors, { 
      id: Date.now().toString(), 
      name: 'Новый врач', 
      role: 'Специализация', 
      exp: '0 лет', 
      img: '', 
      desc: 'Описание врача' 
    }];
    updateField('doctors', newDocs);
  };

  const removeDoctor = (id: string) => {
    updateField('doctors', formData.doctors.filter(d => d.id !== id));
  };

  // Service Handlers
  const handleServiceChange = (id: string, field: keyof ServiceItem, value: string) => {
    const newServices = formData.services.map(s => s.id === id ? { ...s, [field]: value } : s);
    updateField('services', newServices);
  };

  const addService = () => {
    const newServices = [...formData.services, { 
      id: Date.now().toString(), 
      title: 'Новая услуга', 
      desc: 'Описание услуги', 
      action: 'Подробнее' 
    }];
    updateField('services', newServices);
  };

  const removeService = (id: string) => {
    updateField('services', formData.services.filter(s => s.id !== id));
  };

  // Review Handlers
  const handleReviewChange = (id: string, field: keyof ReviewItem, value: string) => {
    const newReviews = formData.reviews.map(r => r.id === id ? { ...r, [field]: value } : r);
    updateField('reviews', newReviews);
  };

  const addReview = () => {
    const newReviews = [...formData.reviews, { 
      id: Date.now().toString(), 
      name: 'Имя пациента', 
      text: 'Текст отзыва' 
    }];
    updateField('reviews', newReviews);
  };

  const removeReview = (id: string) => {
    updateField('reviews', formData.reviews.filter(r => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white shadow-md md:min-h-screen flex flex-col sticky top-0 z-40">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">Панель управления</h2>
          <p className="text-xs text-slate-500 mt-1">Assem Dental</p>
        </div>
        <nav className="p-4 space-y-2 flex-1 flex flex-row md:flex-col overflow-x-auto md:overflow-visible">
          <button onClick={() => setActiveTab('general')} className={`flex-shrink-0 md:w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === 'general' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}>
            <Settings className="w-5 h-5 mr-3" /> Общие
          </button>
          <button onClick={() => setActiveTab('services')} className={`flex-shrink-0 md:w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === 'services' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}>
            <Briefcase className="w-5 h-5 mr-3" /> Услуги
          </button>
          <button onClick={() => setActiveTab('pricing')} className={`flex-shrink-0 md:w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === 'pricing' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}>
            <DollarSign className="w-5 h-5 mr-3" /> Цены
          </button>
          <button onClick={() => setActiveTab('doctors')} className={`flex-shrink-0 md:w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === 'doctors' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}>
            <Users className="w-5 h-5 mr-3" /> Врачи
          </button>
          <button onClick={() => setActiveTab('reviews')} className={`flex-shrink-0 md:w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === 'reviews' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}>
            <MessageSquare className="w-5 h-5 mr-3" /> Отзывы
          </button>
        </nav>
        <div className="p-4 border-t border-slate-100 hidden md:block">
          <Link to="/" className="w-full flex items-center p-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-3" /> На сайт
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              {activeTab === 'general' && 'Общие настройки'}
              {activeTab === 'services' && 'Управление услугами (карточки)'}
              {activeTab === 'pricing' && 'Управление ценами (прайс-лист)'}
              {activeTab === 'doctors' && 'Управление врачами'}
              {activeTab === 'reviews' && 'Управление отзывами'}
            </h1>
            <div className="flex gap-3 w-full sm:w-auto">
              <Link to="/" className="md:hidden bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-lg font-semibold flex items-center justify-center flex-1">
                <ArrowLeft className="w-5 h-5 mr-2" /> Назад
              </Link>
              <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold flex items-center justify-center shadow-sm transition-colors flex-1 sm:flex-none">
                <Save className="w-5 h-5 mr-2" /> Сохранить
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 md:p-6">
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Телефон (для ссылок WhatsApp/Звонков)</label>
                    <input type="text" value={formData.phoneRaw} onChange={e => updateField('phoneRaw', e.target.value)} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" placeholder="Например: 77753041999" />
                    <p className="text-xs text-slate-500 mt-1">Только цифры, без плюса и пробелов</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Телефон (для отображения на сайте)</label>
                    <input type="text" value={formData.phoneDisplay} onChange={e => updateField('phoneDisplay', e.target.value)} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" placeholder="Например: +7 (775) 304-19-99" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Главное фото (Hero Section)</label>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors border border-slate-300"
                      >
                        <Upload className="w-4 h-4 mr-2" /> Загрузить фото
                      </button>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*"
                        onChange={e => handleFileUpload(e, (base64) => updateField('heroImage', base64))}
                      />
                      <span className="text-xs text-slate-500">Или вставьте ссылку ниже</span>
                    </div>
                    <input type="text" value={formData.heroImage} onChange={e => updateField('heroImage', e.target.value)} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" placeholder="https://..." />
                  </div>
                  {formData.heroImage && (
                    <div className="mt-4 relative rounded-lg overflow-hidden border border-slate-200 h-48 md:h-64 group">
                      <img src={formData.heroImage} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <button onClick={() => updateField('heroImage', '')} className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-6">
                {formData.services.map((service, index) => (
                  <div key={service.id} className="p-4 md:p-6 bg-slate-50 rounded-lg border border-slate-200 space-y-4 relative">
                    <button onClick={() => removeService(service.id)} className="absolute top-4 right-4 text-red-500 hover:bg-red-50 p-2 rounded-md transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <div className="grid gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Заголовок услуги</label>
                        <input type="text" value={service.title} onChange={e => handleServiceChange(service.id, 'title', e.target.value)} className="w-full p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Описание</label>
                        <textarea value={service.desc} onChange={e => handleServiceChange(service.id, 'desc', e.target.value)} className="w-full p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none resize-y" rows={2}></textarea>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Текст кнопки</label>
                        <input type="text" value={service.action} onChange={e => handleServiceChange(service.id, 'action', e.target.value)} className="w-full p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={addService} className="flex items-center justify-center w-full py-4 border-2 border-dashed border-slate-300 rounded-lg text-blue-600 font-medium hover:bg-blue-50 hover:border-blue-300 transition-colors">
                  <Plus className="w-5 h-5 mr-2" /> Добавить карточку услуги
                </button>
              </div>
            )}

            {activeTab === 'pricing' && (
              <div className="space-y-4">
                {formData.pricing.map((item, index) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-200 text-slate-600 font-bold text-sm shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1 w-full">
                      <input type="text" value={item.name} onChange={e => handlePricingChange(item.id, 'name', e.target.value)} className="w-full p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Название услуги" />
                    </div>
                    <div className="w-full sm:w-48">
                      <input type="text" value={item.price} onChange={e => handlePricingChange(item.id, 'price', e.target.value)} className="w-full p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Цена (например: от 5 000 ₸)" />
                    </div>
                    <button onClick={() => removePricing(item.id)} className="p-2.5 text-red-500 hover:bg-red-50 rounded-md transition-colors border border-transparent hover:border-red-200">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button onClick={addPricing} className="mt-6 flex items-center justify-center w-full py-4 border-2 border-dashed border-slate-300 rounded-lg text-blue-600 font-medium hover:bg-blue-50 hover:border-blue-300 transition-colors">
                  <Plus className="w-5 h-5 mr-2" /> Добавить строку в прайс
                </button>
              </div>
            )}

            {activeTab === 'doctors' && (
              <div className="space-y-8">
                {formData.doctors.map((doc, index) => (
                  <div key={doc.id} className="p-4 md:p-6 bg-slate-50 rounded-lg border border-slate-200 space-y-4 relative">
                    <button onClick={() => removeDoctor(doc.id)} className="absolute top-4 right-4 text-red-500 hover:bg-red-50 p-2 rounded-md transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-slate-700">Врач #{index + 1}</h3>
                    </div>
                    <div className="grid md:grid-cols-12 gap-6">
                      <div className="md:col-span-4 lg:col-span-3">
                        <label className="block text-xs font-medium text-slate-500 mb-1">Фото врача</label>
                        <div className="aspect-[4/5] relative rounded-lg overflow-hidden border border-slate-200 mb-3 bg-slate-100 group">
                          {doc.img ? (
                            <>
                              <img src={doc.img} alt={doc.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              <button onClick={() => handleDoctorChange(doc.id, 'img', '')} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                <X className="w-3 h-3" />
                              </button>
                            </>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                              <ImageIcon className="w-8 h-8" />
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <button 
                            onClick={() => {
                              const input = document.createElement('input');
                              input.type = 'file';
                              input.accept = 'image/*';
                              input.onchange = (e) => handleFileUpload(e as any, (base64) => handleDoctorChange(doc.id, 'img', base64));
                              input.click();
                            }}
                            className="w-full flex items-center justify-center px-3 py-2 bg-white border border-slate-300 rounded-md text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                          >
                            <Upload className="w-3 h-3 mr-2" /> Загрузить
                          </button>
                          <input type="text" value={doc.img} onChange={e => handleDoctorChange(doc.id, 'img', e.target.value)} className="w-full p-2 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Или вставьте URL" />
                        </div>
                      </div>
                      
                      <div className="md:col-span-8 lg:col-span-9 space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Имя врача</label>
                            <input type="text" value={doc.name} onChange={e => handleDoctorChange(doc.id, 'name', e.target.value)} className="w-full p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Специализация</label>
                            <input type="text" value={doc.role} onChange={e => handleDoctorChange(doc.id, 'role', e.target.value)} className="w-full p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-500 mb-1">Стаж работы</label>
                          <input type="text" value={doc.exp} onChange={e => handleDoctorChange(doc.id, 'exp', e.target.value)} className="w-full p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Например: 15 лет" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-500 mb-1">Краткое описание</label>
                          <textarea value={doc.desc} onChange={e => handleDoctorChange(doc.id, 'desc', e.target.value)} className="w-full p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none resize-y" rows={3}></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={addDoctor} className="flex items-center justify-center w-full py-4 border-2 border-dashed border-slate-300 rounded-lg text-blue-600 font-medium hover:bg-blue-50 hover:border-blue-300 transition-colors">
                  <Plus className="w-5 h-5 mr-2" /> Добавить врача
                </button>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {formData.reviews.map((review, index) => (
                  <div key={review.id} className="p-4 md:p-6 bg-slate-50 rounded-lg border border-slate-200 space-y-4 relative">
                    <button onClick={() => removeReview(review.id)} className="absolute top-4 right-4 text-red-500 hover:bg-red-50 p-2 rounded-md transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <div className="grid gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Имя пациента</label>
                        <input type="text" value={review.name} onChange={e => handleReviewChange(review.id, 'name', e.target.value)} className="w-full p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Текст отзыва</label>
                        <textarea value={review.text} onChange={e => handleReviewChange(review.id, 'text', e.target.value)} className="w-full p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none resize-y" rows={3}></textarea>
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={addReview} className="flex items-center justify-center w-full py-4 border-2 border-dashed border-slate-300 rounded-lg text-blue-600 font-medium hover:bg-blue-50 hover:border-blue-300 transition-colors">
                  <Plus className="w-5 h-5 mr-2" /> Добавить отзыв
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
