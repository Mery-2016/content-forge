import { AppLanguage } from '../types/index.js';

export interface Translations {
  // Top bar
  brandSubtitle: string;
  apiKeyBtn: string;
  historyBtn: string;
  langRu: string;
  langUz: string;

  // Hero header
  heroTitle: string;
  heroSubtitle: string;

  // Command Console
  platformTelegram: string;
  platformYouTube: string;
  platformInstagram: string;
  textareaPlaceholder: string;
  tonePrefix: string;
  charCountSuffix: string;
  refineAngleBtn: string;
  refiningAngleBtn: string;
  textLanguageLabel: string;
  textLanguageOptionRu: string;
  textLanguageOptionUz: string;
  variantsSuffix: string;
  shortcutHint: string;
  stopBtn: string;
  generateBtn: string;

  // Presets
  presetsTitle: string;
  preset1Badge: string;
  preset1Title: string;
  preset1Topic: string;
  preset2Badge: string;
  preset2Title: string;
  preset2Topic: string;
  preset3Badge: string;
  preset3Title: string;
  preset3Topic: string;

  // Results Section
  resultsTitle: string;
  generatingStatus: string;
  viewTabs: string;
  viewFeed: string;
  variantPrefix: string;

  // Post Card
  cardSubHeader: string;
  copyAllBtn: string;
  copiedBtn: string;
  tgChannelName: string;
  tgPostMeta: string;
  ytStudioTitle: string;
  ytStudioMeta: string;
  ytDefaultPreview: string;
  igUsername: string;
  igFollowBtn: string;
  igPostMeta: string;
  hookPlaceholder: string;
  titlePlaceholder: string;
  bodyPlaceholderStream: string;
  bodyPlaceholder: string;
  ctaHeader: string;
  ctaPlaceholderStream: string;
  ctaPlaceholder: string;
  copyTitleTip: string;
  copyBodyTip: string;
  copyCtaTip: string;
  copyTagsTip: string;
  hashtagsLabel: string;
  hashtagsPlaceholder: string;

  // History Drawer
  historyTitle: string;
  clearHistoryConfirm: string;
  clearHistoryTip: string;
  searchPlaceholder: string;
  filterAll: string;
  emptyHistory: string;
  historyVariantsCount: string;
  openRecordBtn: string;
  deleteRecordTip: string;

  // Settings Modal
  settingsTitle: string;
  serverKeyActiveMsg: string;
  modelSelectLabel: string;
  apiKeyInputLabel: string;
  apiKeyInputHint: string;
  apiKeyNotice: string;
  getKeyLink: string;
  cancelBtn: string;
  saveBtn: string;
  savedBtn: string;

  // Error Banner
  errorTitle: string;
  retryBtn: string;
}

export const TRANSLATIONS: Record<AppLanguage, Translations> = {
  ru: {
    brandSubtitle: 'Social AI',
    apiKeyBtn: 'API Ключ',
    historyBtn: 'История',
    langRu: 'Русский',
    langUz: 'O‘zbekcha',

    heroTitle: 'Генератор контента для соцсетей',
    heroSubtitle:
      'Превратите любую мысль или оффер в готовые публикации для Telegram, YouTube и Instagram с чёткой структурой и сильным хуком',

    platformTelegram: 'Telegram',
    platformYouTube: 'YouTube',
    platformInstagram: 'Instagram',
    textareaPlaceholder: 'Опишите вашу идею, продукт, тезисы или тему для публикации...',
    tonePrefix: 'Тон: ',
    charCountSuffix: 'символов',
    refineAngleBtn: 'Уточнить ракурс',
    refiningAngleBtn: 'Анализирую...',
    textLanguageLabel: 'Язык текста:',
    textLanguageOptionRu: 'Русский',
    textLanguageOptionUz: 'O‘zbekcha',
    variantsSuffix: 'варианта',
    shortcutHint: 'Горячая клавиша: ',
    stopBtn: 'Остановить генерацию',
    generateBtn: 'Сгенерировать посты',

    presetsTitle: 'Быстрый старт с готовых тем:',
    preset1Badge: 'Telegram',
    preset1Title: 'Анонс IT-курса без воды',
    preset1Topic:
      'Практический онлайн-курс по современной веб-разработке с помощью ИИ и вайбкодинга. Старт через неделю, разбор реальных рабочих кейсов без занудной теории, формат закрытого чата с код-ревью.',
    preset2Badge: 'Instagram',
    preset2Title: 'Сценарий Reels для сервиса',
    preset2Topic:
      'Новый микро-сервис для автоматического удаления шума и эха из аудиозаписей за 5 секунд. Целевая аудитория — подкастеры, эксперты, создатели контента и преподаватели.',
    preset3Badge: 'YouTube',
    preset3Title: 'Обзор AI-инструментов',
    preset3Topic:
      'Большой обзор и сравнительный тест новых моделей Gemini Flash против других решений в реальных задачах: генерация кода, обработка документов, скорость ответа и точность контекста.',

    resultsTitle: 'Сгенерированные варианты',
    generatingStatus: 'Генерация текста...',
    viewTabs: 'Вкладки',
    viewFeed: 'Лента',
    variantPrefix: 'Вариант',

    cardSubHeader: 'Готовый структурированный пост',
    copyAllBtn: 'Скопировать всё',
    copiedBtn: 'Скопировано ✓',
    tgChannelName: 'Канал «ContentForge»',
    tgPostMeta: '14:32 • Публикация в ленте',
    ytStudioTitle: 'YouTube Studio',
    ytStudioMeta: 'Видео 16:9 • Оптимизировано под поиск и CTR',
    ytDefaultPreview: 'Превью ролика',
    igUsername: 'content_forge',
    igFollowBtn: '• Подписаться',
    igPostMeta: 'Reels & Карусель',
    hookPlaceholder: 'Формирование хука...',
    titlePlaceholder: 'Заголовок...',
    bodyPlaceholderStream: 'Создание основного текста...',
    bodyPlaceholder: 'Основной текст поста...',
    ctaHeader: 'Призыв к действию',
    ctaPlaceholderStream: 'Создание призыва...',
    ctaPlaceholder: 'Призыв к действию...',
    copyTitleTip: 'Скопировать заголовок',
    copyBodyTip: 'Скопировать текст',
    copyCtaTip: 'Скопировать призыв',
    copyTagsTip: 'Скопировать все теги',
    hashtagsLabel: 'Хэштеги (кликните на тег для копирования):',
    hashtagsPlaceholder: '#теги появятся здесь...',

    historyTitle: 'История генераций',
    clearHistoryConfirm: 'Очистить всю историю генераций?',
    clearHistoryTip: 'Очистить историю',
    searchPlaceholder: 'Поиск по теме...',
    filterAll: 'Все',
    emptyHistory: 'История пока пуста. Сгенерируйте первый пост!',
    historyVariantsCount: 'варианта',
    openRecordBtn: 'Открыть',
    deleteRecordTip: 'Удалить запись',

    settingsTitle: 'Настройки Google Gemini API',
    serverKeyActiveMsg: 'Серверный API-ключ Gemini успешно подключен и активен!',
    modelSelectLabel: 'Модель Google Gemini:',
    apiKeyInputLabel: 'Пользовательский API-ключ Gemini:',
    apiKeyInputHint:
      'Ключ безопасно хранится в вашем браузере (localStorage) и используется для прямых запросов.',
    apiKeyNotice:
      'Если ключ не указан, приложение автоматически использует встроенный умный генератор с эмуляцией живого потока токенов.',
    getKeyLink: 'Получить ключ в Google AI Studio',
    cancelBtn: 'Отмена',
    saveBtn: 'Сохранить',
    savedBtn: 'Сохранено ✓',

    errorTitle: 'Ошибка при генерации',
    retryBtn: 'Повторить',
  },

  uz: {
    brandSubtitle: 'Social AI',
    apiKeyBtn: 'API Kalit',
    historyBtn: 'Tarix',
    langRu: 'Русский',
    langUz: 'O‘zbekcha',

    heroTitle: 'Ijtimoiy tarmoqlar uchun kontent generatori',
    heroSubtitle:
      'Har qanday fikr yoki taklifni Telegram, YouTube va Instagram uchun aniq tuzilish va kuchli sarlavhali tayyor postlarga aylantiring',

    platformTelegram: 'Telegram',
    platformYouTube: 'YouTube',
    platformInstagram: 'Instagram',
    textareaPlaceholder: 'G‘oyangiz, mahsulotingiz, tezislaringiz yoki post mavzusini yozing...',
    tonePrefix: 'Ohang: ',
    charCountSuffix: 'belgi',
    refineAngleBtn: 'Yo‘nalishni aniqlash',
    refiningAngleBtn: 'Tahlil qilinmoqda...',
    textLanguageLabel: 'Matn tili:',
    textLanguageOptionRu: 'Ruscha',
    textLanguageOptionUz: 'O‘zbekcha',
    variantsSuffix: 'ta variant',
    shortcutHint: 'Tezkor tugma: ',
    stopBtn: 'Generatsiyani to‘xtatish',
    generateBtn: 'Postlarni yaratish',

    presetsTitle: 'Tayyor mavzulardan tezkor boshlash:',
    preset1Badge: 'Telegram',
    preset1Title: 'IT-kurs e\'loni (aniq va lo‘nda)',
    preset1Topic:
      'Sun\'iy intellekt va zamonaviy web-dasturlash bo‘yicha amaliy onlayn kurs. Bir haftadan so‘ng boshlanadi, zerikarli nazariyasiz real keyslar tahlili, kod-rivyu bilan yopiq chat formati.',
    preset2Badge: 'Instagram',
    preset2Title: 'Xizmat uchun Reels ssenariysi',
    preset2Topic:
      'Audiodan shovqin va aks-sadoni 5 soniyada avtomatik tozalovchi yangi mikro-servis. Maqsadli auditoriya — podkasterlar, ekspertlar, kontent yaratuvchilar va o‘qituvchilar.',
    preset3Badge: 'YouTube',
    preset3Title: 'AI vositalari sharhi',
    preset3Topic:
      'Real vazifalarda Gemini Flash modellarini boshqa yechimlar bilan taqqoslash va katta sharh: kod yaratish, hujjatlar bilan ishlash, javob tezligi va kontekst aniqligi.',

    resultsTitle: 'Yaratilgan variantlar',
    generatingStatus: 'Matn yaratilmoqda...',
    viewTabs: 'Varaqlar',
    viewFeed: 'Lenta',
    variantPrefix: 'Variant',

    cardSubHeader: 'Tayyor tuzilmali post',
    copyAllBtn: 'Hammasini nusxalash',
    copiedBtn: 'Nusxalandi ✓',
    tgChannelName: '«ContentForge» kanali',
    tgPostMeta: '14:32 • Lentadagi post',
    ytStudioTitle: 'YouTube Studio',
    ytStudioMeta: '16:9 video • Qidiruv va CTR uchun moslashtirilgan',
    ytDefaultPreview: 'Video muqovasi',
    igUsername: 'content_forge',
    igFollowBtn: '• Obuna bo‘lish',
    igPostMeta: 'Reels & Karusel',
    hookPlaceholder: 'Huk shakllanmoqda...',
    titlePlaceholder: 'Sarlavha...',
    bodyPlaceholderStream: 'Asosiy matn yozilmoqda...',
    bodyPlaceholder: 'Postning asosiy matni...',
    ctaHeader: 'Harakatga chaqiruv',
    ctaPlaceholderStream: 'Chaqiruv yozilmoqda...',
    ctaPlaceholder: 'Harakatga chaqiruv...',
    copyTitleTip: 'Sarlavhani nusxalash',
    copyBodyTip: 'Matnni nusxalash',
    copyCtaTip: 'Chaqiruvni nusxalash',
    copyTagsTip: 'Barcha teglarni nusxalash',
    hashtagsLabel: 'Xeshteglar (nusxalash uchun ustiga bosing):',
    hashtagsPlaceholder: '#teglar shu yerda paydo bo‘ladi...',

    historyTitle: 'Generatsiyalar tarixi',
    clearHistoryConfirm: 'Barcha generatsiyalar tarixini tozalashni xohlaysizmi?',
    clearHistoryTip: 'Tarixni tozalash',
    searchPlaceholder: 'Mavzu bo‘yicha qidiruv...',
    filterAll: 'Barchasi',
    emptyHistory: 'Tarix hozircha bo‘sh. Birinchi postingizni yarating!',
    historyVariantsCount: 'ta variant',
    openRecordBtn: 'Ochish',
    deleteRecordTip: 'Yozuvni o‘chirish',

    settingsTitle: 'Google Gemini API sozlamalari',
    serverKeyActiveMsg: 'Serverdagi Gemini API-kaliti muvaffaqiyatli ulandi va faol!',
    modelSelectLabel: 'Google Gemini modeli:',
    apiKeyInputLabel: 'Foydalanuvchi Gemini API-kaliti:',
    apiKeyInputHint:
      'Kalit brauzeringizda (localStorage) xavfsiz saqlanadi va to‘g‘ridan-to‘g‘ri so‘rovlar uchun ishlatiladi.',
    apiKeyNotice:
      'Agar kalit ko‘rsatilmasa, ilova jonli tokenlar oqimini taqlid qiluvchi aqlli generatordan avtomatik foydalanadi.',
    getKeyLink: 'Google AI Studio\'dan kalit olish',
    cancelBtn: 'Bekor qilish',
    saveBtn: 'Saqlash',
    savedBtn: 'Saqlandi ✓',

    errorTitle: 'Generatsiya jarayonida xatolik',
    retryBtn: 'Qayta urinish',
  },
};
