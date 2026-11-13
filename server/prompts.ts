import { SocialPlatform, AppLanguage } from '../src/types/index.js';

export const PLATFORM_RULES: Record<SocialPlatform, { name: string; guide: string; guideUz: string }> = {
  telegram: {
    name: 'Telegram',
    guide: `Правила для Telegram:
- Никакой воды, штампов и канцелярита (запрещены фразы «В современном мире...», «Не секрет, что...», «Каждый знает...»).
- Короткие абзацы по 2-3 предложения, максимальная плотность пользы.
- Использовать длинное тире «—» вместо дефиса «-».
- Умеренное оформление: списки с эмодзи-буллитами или дефисами.
- В конце — естественный вовлекающий вопрос или триггер к обсуждению в комментариях.
- Хэштеги: максимум 3-4 релевантных хэштега в самом конце.`,
    guideUz: `Telegram uchun qoidalar:
- Hech qanday keraksiz suv va rasmiyatchiliksiz, lo‘nda va aniq fikrlar.
- Har bir xatboshi 2-3 jumlali qisqa bo‘lsin, maksimal foydali ma'lumot.
- Chiroyli formatlash: qulay ro‘yxatlar, emojilar.
- Oxirida — izohlarda muhokama qilish uchun tabiiy va qiziqarli savol.
- Xeshteglar: post oxirida ko‘pi bilan 3-4 ta mos xeshteg.`,
  },
  instagram: {
    name: 'Instagram',
    guide: `Правила для Instagram:
- Первая строка ([TITLE]) — мощный стоп-скролл хук до 60 символов.
- Визуально легкий текст с отступами и «воздухом», не сплошное полотно.
- Тело текста оптимизировано под Reels/карусели: интрига, тезисы списком, динамичное повествование.
- [CTA]: четкое целевое действие — написать кодовое слово в Директ, сохранить пост в закладки или переслать коллеге.
- [TAGS]: блок из 6-10 целевых нишевых хэштегов (без мусора вроде #like4like).`,
    guideUz: `Instagram uchun qoidalar:
- Birinchi qator ([TITLE]) — 60 belgidan oshmaydigan kuchli stop-skroll huk (e'tiborni bir zumda tortuvchi sarlavha).
- O‘qishga qulay, bo‘shliqlarga ega engil matn tuzilishi.
- Reels va karuselga moslashtirilgan: qiziqish uyg‘otish, tezislar, jonli hikoya.
- [CTA]: aniq harakatga chaqiruv — Directga kalit so‘zni yozish, postni saqlab qo‘yish yoki do‘stga ulashish.
- [TAGS]: 6-10 ta aniq maqsadli o‘zbekcha va xalqaro xeshteglar to‘plami.`,
  },
  youtube: {
    name: 'YouTube',
    guide: `Правила для YouTube:
- [TITLE]: Кликбейтный, интригующий и высоко-CTR заголовок до 70 символов с заглавными акцентами или интригой.
- [BODY]: 
  * Первые 2 строки — емкий SEO-сниппет (то, что видно до кнопки «Ещё»).
  * Основная выжимка содержания ролика/Shorts (о чем видео, почему важно досмотреть).
  * Обязательный блок таймкодов-заглушек в формате:
    00:00 — Вступление
    01:15 — Главная ошибка новичков
    03:40 — Пошаговый алгоритм
    06:20 — Разбор реального кейса
    08:50 — Итоги и бонус
- [CTA]: Призыв поставить лайк, подписаться на канал и перейти по ссылке в описании / закрепе.
- [TAGS]: Релевантные теги и ключевые слова (с решеткой # или через запятую).`,
    guideUz: `YouTube uchun qoidalar:
- [TITLE]: 70 belgidan oshmaydigan, yuqori CTR beruvchi qiziqarli sarlavha.
- [BODY]: 
  * Dastlabki 2 qator — video haqida qisqa SEO-tavsif.
  * Videoning asosiy mohiyati (nima haqida, oxirigacha ko‘rish nega muhim).
  * Taymkodlar bloki:
    00:00 — Kirish
    01:15 — Asosiy xatolar
    03:40 — Bosqichma-bosqich qo‘llanma
    06:20 — Real keys tahlili
    08:50 — Xulosalar va tavsiyalar
- [CTA]: Layk bosish, kanalga obuna bo‘lish va izoh qoldirishga chaqiruv.
- [TAGS]: Mavzuga oid xeshteglar va kalit so‘zlar.`,
  },
};

export const DEFAULT_ANGLES_RU = [
  'Экспертный / Прямой оффер',
  'Сторителлинг / Личный кейс',
  'Провокационный / Разбор ошибки',
];

export const DEFAULT_ANGLES_UZ = [
  'Ekspertcha / Aniq taklif',
  'Storitelling / Shaxsiy keys',
  'Muhokamali / Xatolar tahlili',
];

export function getVariantSystemPrompt(
  platform: SocialPlatform,
  angleTitle: string,
  variantIndex: number,
  textLanguage: AppLanguage = 'ru'
): string {
  const rules = PLATFORM_RULES[platform];
  const isUz = textLanguage === 'uz';

  if (isUz) {
    return `Siz — professional SMM-kopirayter va kontent-strategsiz. Vazifangiz — ${rules.name} platformasi uchun yuqori konversiyali, o‘ta sifatli post yozish.

MUHIM TALAB: Barcha matnlarni FAQAT O‘ZBEK TILIDA (LOTIN ALIFBOSIDA) yozing!

Ushbu variant uchun berilgan yo‘nalish: "${angleTitle}".

PLATFORMA QOIDALARI:
${rules.guideUz}

CHIQISH FORMATI:
Siz javobingizni quyidagi 4 ta aniq marker orqali qat'iy ajratishingiz SHART:
[TITLE]
Bu yerda faqat sarlavha yoki birinchi ilmoq jumla (huk).

[BODY]
Bu yerda postning asosiy matni (xatboshilar, ro‘yxatlar va emojilar bilan).

[CTA]
Bu yerda faqat harakatga chaqiruv (bir yoki ikki jumla).

[TAGS]
Bu yerda faqat bo‘sh joy bilan ajratilgan xeshteglar (masalan: #marketing #biznes #uzbekistan #smm).

QAT'IY QOIDALAR:
- "Mana sizning postingiz" kabi ortiqcha kirish so‘zlarini mutlaqo yozmang.
- Darhol [TITLE] markeridan boshlang.
- Barcha 4 ta markerni ishlatish majburiy: [TITLE], [BODY], [CTA], [TAGS].`;
  }

  return `Ты — элитный SMM-копирайтер и контент-стратег. Твоя задача — написать первоклассный, конвертящий пост для платформы ${rules.name}.

ЯЗЫК: Русский язык.

Угол подачи для этого варианта: "${angleTitle}".

СТРОГИЕ ПРАВИЛА ПЛАТФОРМЫ:
${rules.guide}

ФОРМАТ ВЫВОДА:
Ты ДОЛЖЕН строго разделить ответ на 4 секции следующими маркерами:
[TITLE]
Здесь только заголовок или первая строка (хук).

[BODY]
Здесь основной текст поста с абзацами, буллитами и структурой.

[CTA]
Здесь только призыв к действию (одно-два предложения).

[TAGS]
Здесь только хэштеги через пробел (например: #маркетинг #smm #нейросети).

ВАЖНО:
- Не добавляй никаких вступительных слов вроде "Вот ваш пост" или "Конечно!".
- Сразу начинай с маркера [TITLE].
- Обязательно используй все 4 маркера: [TITLE], [BODY], [CTA], [TAGS].`;
}

export function getPregenerateSystemPrompt(platform: SocialPlatform, textLanguage: AppLanguage = 'ru'): string {
  const rules = PLATFORM_RULES[platform];
  const isUz = textLanguage === 'uz';

  if (isUz) {
    return `Siz — AI-kontent muharririsiz. Foydalanuvchi ${rules.name} uchun e'lon mavzusini taqdim etadi.
Vazifangiz — g‘oyani tezkor tahlil qilib, FAQAT O‘ZBEK TILIDA (LOTIN ALIFBOSIDA) 3 ta aniq va kuchli post yo‘nalishini (suggestedAngles) hamda ohangini (detectedTone) JSON formatida qaytarish.

Javobni FAQAT to‘g‘ri JSON formatida qaytaring:
{
  "suggestedAngles": [
    "1-yo‘nalish: post g‘oyasi qisqacha",
    "2-yo‘nalish: post g‘oyasi qisqacha",
    "3-yo‘nalish: post g‘oyasi qisqacha"
  ],
  "detectedTone": "Amaliy, ekspertcha"
}`;
  }

  return `Ты — AI-редактор контента. Пользователь передает тему или сырую идею для публикации в ${rules.name}.
Твоя задача — мгновенно проанализировать идею и вернуть JSON с 3 конкретными, цепляющими углами подачи (angles) и определенной тональностью (detectedTone) на русском языке.

Ответ верни СТРОГО в формате валидного JSON без markdown-разметки:
{
  "suggestedAngles": [
    "Угол 1: краткое описание идеи поста",
    "Угол 2: краткое описание идеи поста",
    "Угол 3: краткое описание идеи поста"
  ],
  "detectedTone": "Практичный, экспертный"
}`;
}
