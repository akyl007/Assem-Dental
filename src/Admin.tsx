import React, { useState } from 'react';
import { SiteData, useSiteData } from './store';
import { Save, Plus, Trash2, ArrowLeft, Settings, Users, DollarSign, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Admin() {
  const [data, setData] = useSiteData();
  const [formData, setFormData] = useState<SiteData>(data);
  const [activeTab, setActiveTab] = useState('general');

  const handleSave = () => {
    setData(formData);
    alert('Изменения успешно сохранены!');
  };

  const updateField = (field: keyof SiteData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePricingChange = (id: string, field: string, value: string) => {
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

  const handleDoctorChange = (id: string, field: string, value: string) => {
    const newDocs = formData.doctors.map(d => d.id === id ? { ...d, [field]: value } : d);
    updateField('doctors', newDocs);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white shadow-md md:min-h-screen flex flex-col">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">Панель управления</h2>
          <p className="text-xs text-slate-500 mt-1">Assem Dental</p>
        </div>
        <nav className="p-4 space-y-2 flex-1 flex flex-row md:flex-col overflow-x-auto md:overflow-visible">
          <button onClick={() => setActiveTab('general')} className={`flex-shrink-0 md:w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === 'general' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}>
            <Settings className="w-5 h-5 mr-3" /> Общие
          </button>
          <button onClick={() => setActiveTab('pricing')} className={`flex-shrink-0 md:w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === 'pricing' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}>
            <DollarSign className="w-5 h-5 mr-3" /> Цены
          </button>
          <button onClick={() => setActiveTab('doctors')} className={`flex-shrink-0 md:w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === 'doctors' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}>
            <Users className="w-5 h-5 mr-3" /> Врачи
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
              {activeTab === 'pricing' && 'Управление ценами'}
              {activeTab === 'doctors' && 'Управление врачами'}
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
                  <label className="block text-sm font-medium text-slate-700 mb-2">URL главного фото (Hero Section)</label>
                  <input type="text" value={formData.heroImage} onChange={e => updateField('heroImage', e.target.value)} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" placeholder="https://..." />
                  {formData.heroImage && (
                    <div className="mt-4 relative rounded-lg overflow-hidden border border-slate-200 h-48 md:h-64">
                      <img src={formData.heroImage} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  )}
                </div>
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
                      <label className="block text-xs text-slate-500 mb-1 sm:hidden">Название услуги</label>
                      <input type="text" value={item.name} onChange={e => handlePricingChange(item.id, 'name', e.target.value)} className="w-full p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Название услуги" />
                    </div>
                    <div className="w-full sm:w-48">
                      <label className="block text-xs text-slate-500 mb-1 sm:hidden">Цена</label>
                      <input type="text" value={item.price} onChange={e => handlePricingChange(item.id, 'price', e.target.value)} className="w-full p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Цена (например: от 5 000 ₸)" />
                    </div>
                    <button onClick={() => removePricing(item.id)} className="p-2.5 text-red-500 hover:bg-red-50 rounded-md transition-colors self-end sm:self-auto border border-transparent hover:border-red-200">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button onClick={addPricing} className="mt-6 flex items-center justify-center w-full py-4 border-2 border-dashed border-slate-300 rounded-lg text-blue-600 font-medium hover:bg-blue-50 hover:border-blue-300 transition-colors">
                  <Plus className="w-5 h-5 mr-2" /> Добавить новую услугу
                </button>
              </div>
            )}

            {activeTab === 'doctors' && (
              <div className="space-y-8">
                {formData.doctors.map((doc, index) => (
                  <div key={doc.id} className="p-4 md:p-6 bg-slate-50 rounded-lg border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-slate-700">Врач #{index + 1}</h3>
                    </div>
                    <div className="grid md:grid-cols-12 gap-6">
                      <div className="md:col-span-4 lg:col-span-3">
                        <label className="block text-xs font-medium text-slate-500 mb-1">Фото (URL)</label>
                        <div className="aspect-[4/5] relative rounded-lg overflow-hidden border border-slate-200 mb-3 bg-slate-100">
                          {doc.img ? (
                            <img src={doc.img} alt={doc.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                              <ImageIcon className="w-8 h-8" />
                            </div>
                          )}
                        </div>
                        <input type="text" value={doc.img} onChange={e => handleDoctorChange(doc.id, 'img', e.target.value)} className="w-full p-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="https://..." />
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
