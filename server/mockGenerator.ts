import { SocialPlatform, PostVariant, SectionType, AppLanguage } from '../src/types/index.js';

interface MockTemplate {
  title: string;
  body: string;
  cta: string;
  hashtags: string[];
}

export function generateMockVariants(
  topic: string,
  platform: SocialPlatform,
  count: number,
  angles: string[],
  textLanguage: AppLanguage = 'ru'
): PostVariant[] {
  const isUz = textLanguage === 'uz';
  const cleanTopic = topic.trim() || (isUz ? 'Yangi raqamli mahsulot taqdimoti' : 'Запуск нового цифрового продукта');

  const templatesRu: Record<SocialPlatform, MockTemplate[]> = {
    telegram: [
      {
        title: `Как выжать максимум из «${cleanTopic}»: разбор без воды`,
        body: `Большинство авторов совершают одну и ту же ошибку — пытаются объять необъятное и теряют фокус.\n\nВот 3 правила, которые работают прямо сейчас:\n\n1. Формулируйте одну мысль на один абзац — читатель скроллит на бегу и должен уловить суть за 3 секунды.\n2. Убирайте вводные конструкции — каждое предложение обязано нести либо факт, либо неочевидный инсайт.\n3. Давайте сразу готовый шаблон решения, а не абстрактную теорию.\n\nПроверено на десятках запусков: чем плотнее фактура, тем выше вовлеченность аудитории.`,
        cta: `Какой пункт из списка вызывает у вас больше всего споров? Напишите в комментариях — разберем детали.`,
        hashtags: ['#telegram', '#smm', '#продуктивность', '#контент'],
      },
      {
        title: `Личный опыт: почему мы пересмотрели подход к «${cleanTopic}»`,
        body: `Еще полгода назад мы делали все по классическим учебникам маркетинга. Тратили недели на согласования и вылизывали каждый драфт.\n\nРезультат? Охваты падали, а конверсия стояла на месте.\n\nЧто мы изменили:\n— Сократили длину постов в 2 раза;\n— Стали публиковать реальные рабочие ошибки вместо глянцевых побед;\n— Заменили общие советы на конкретные цифры и скриншоты.\n\nВ итоге: рост вовлеченности на 47% за первые 30 дней без платного трафика.`,
        cta: `Если тема актуальна, ставьте реакцию 🔥 — выложу вторую часть с подробными метриками.`,
        hashtags: ['#кейсы', '#маркетинг', '#инсайты'],
      },
      {
        title: `90% людей неправильно понимают «${cleanTopic}». И вот почему`,
        body: `Сложился устойчивый миф, будто для результата нужны месяцы подготовки и огромный бюджет.\n\nНа самом деле всё упирается в системность:\n\n• Шаг 1: Четко зафиксировать ключевую боль целевой аудитории.\n• Шаг 2: Собрать минимальный рабочий прототип за один вечер.\n• Шаг 3: Протестировать гипотезу на первых 10 пользователях.\n\nВсё остальное — лишний шум, который только тормозит релиз.`,
        cta: `Перешлите этот пост коллеге, который всё ещё откладывает запуск.`,
        hashtags: ['#развитие', '#стартап', '#стратегия'],
      },
    ],
    instagram: [
      {
        title: `Секрет «${cleanTopic}», о котором молчат эксперты 🤫`,
        body: `Сохраняй, чтобы не потерять этот чек-лист! 📌\n\nКогда ты начинаешь работать с этой темой, кажется, что нужно делать миллион действий одновременно.\n\nНо на самом деле решают всего 3 вещи:\n\n🔹 Четкий алгоритм без лишних отвлечений\n🔹 Ежедневные микро-шаги вместо редких спринтов\n🔹 Фокус на реальной пользе для людей, а не на алгоритмах соцсетей\n\nЛистай карусель 👉 там подробная схема внедрения за 48 часов!`,
        cta: `Напиши кодовое слово «СТАРТ» в Директ, и я пришлю тебе готовый PDF-гайд прямо сейчас! 📩`,
        hashtags: ['#инстаграм', '#продвижение', '#рилс', '#контентплан', '#лайфхаки', '#бизнесонлайн'],
      },
      {
        title: `Я потратил 3 года, чтобы понять одну простую истину о «${cleanTopic}»`,
        body: `И если бы мне сказали это в самом начале, я бы сэкономил сотни тысяч рублей и кучу нервов. ⚡️\n\nВот что действительно имеет значение:\n\n1️⃣ Упрощай всё, что можно упростить.\n2️⃣ Говори на языке проблем своей аудитории, а не на профессиональном сленге.\n3️⃣ Качество взаимодействия всегда важнее количества подписчиков.`,
        cta: `Отправь этот Reels тому, кто сейчас на этапе масштабирования! 🚀`,
        hashtags: ['#мотивация', '#развитие', '#опыт', '#карьера', '#рилсы', '#бизнес'],
      },
      {
        title: `Перестань делать ЭТО, если хочешь результат в «${cleanTopic}» ❌`,
        body: `Главная ошибка — слепо копировать чужие тренды, не понимая логики.\n\nЧто нужно делать вместо этого:\n\n✨ Создавать свой уникальный формат подачи\n✨ Тестировать нестандартные хуки в первые 2 секунды\n✨ Работать с аудиторией через интерактивные опросы`,
        cta: `Жми «Сохранить» ⭐️ и ставь «+» в комментариях, чтобы получить шаблон сценария!`,
        hashtags: ['#smmспециалист', '#тренд', '#эксперт', '#вовлечение'],
      },
    ],
    youtube: [
      {
        title: `«${cleanTopic}»: Полный разбор от А до Я за 12 минут [2026]`,
        body: `В этом видео мы детально разберем все нюансы темы «${cleanTopic}» и покажем пошаговый план действий, который вы сможете применить уже сегодня.\n\nТАЙМКОДЫ К ВИДЕО:\n00:00 — Вступление: почему это важно в 2026 году\n01:32 — Главная ошибка, которая сжигает 80% бюджета\n04:15 — Пошаговая инструкция и рабочие инструменты\n07:50 — Разбор реального кейса\n10:45 — Бонус: секретный лайфхак для ускорения\n11:40 — Заключение и ответы на вопросы`,
        cta: `Поставьте лайк 👍, если видео было полезным, подпишитесь на канал и нажмите на колокольчик! Ссылка на полезные материалы — в закрепленном комментарии ⬇️`,
        hashtags: ['#youtube', '#гайд', '#обучение', '#видеоурок', '#пошаговыйплан', '#2026'],
      },
      {
        title: `НЕ НАЧИНАЙТЕ делать «${cleanTopic}», пока не посмотрите это видео! 🔥`,
        body: `Если вы планируете погружаться в эту тему, остановитесь на 10 минут. В этом ролике я честно рассказываю обо всех подводных камнях.\n\nТАЙМКОДЫ:\n00:00 — С чего всё начиналось\n02:10 — Почему старые методы больше не работают\n05:30 — Новая стратегия: разбор на живых примерах\n08:20 — Как автоматизировать рутину с помощью ИИ\n10:15 — Чек-лист готовности к запуску`,
        cta: `Напишите в комментариях свой опыт по теме — на самые интересные вопросы отвечу в отдельном ролике! Не забудьте оформить подписку на канал 🔔`,
        hashtags: ['#инсайты', '#обзор', '#лайфхаки', '#инструкция'],
      },
      {
        title: `Как сделать «${cleanTopic}» в 3 раза быстрее: Секретный воркфлоу ⚡️`,
        body: `Пошаговый мастер-класс по оптимизации процесса. Забудьте про многочасовую рутину — показываю настроенный пайплайн, экономящий до 20 часов в неделю.\n\nТАЙМКОДЫ:\n00:00 — О чем выпуск\n01:10 — Подготовка рабочего пространства\n03:45 — Демонстрация процесса в реальном времени\n06:50 — Сравнение ДО и ПОСЛЕ\n09:15 — Финальные рекомендации и ссылки`,
        cta: `Жмите кнопку «ПОДПИСАТЬСЯ» и делитесь этим роликом в своих соцсетях! Ссылки ждут вас в первом комментарии 👇`,
        hashtags: ['#воркфлоу', '#продуктивность', '#автоматизация'],
      },
    ],
  };

  const templatesUz: Record<SocialPlatform, MockTemplate[]> = {
    telegram: [
      {
        title: `«${cleanTopic}» bo‘yicha maksimal natijaga erishish siri: ortiqcha gapi yo‘q tahlil`,
        body: `Aksariyat mualliflar bir xil xatoga yo‘l qo‘yadilar — hamma narsani birdan qamrab olishga urinib, asosiy diqqatni yo‘qotadilar.\n\nBugungi kunda a'lo darajada ishlaydigan 3 ta qoida:\n\n1. Har bir xatboshida faqat bitta aniq fikrni bering — o‘quvchi postni tezda ko‘zdan kechiradi va mohiyatni 3 soniyada tushunishi kerak.\n2. Ortiqcha so‘zlarni olib tashlang — har bir jumla yo aniq fakt, yo qimmatli insayt berishi lozim.\n3. Mavhum nazariya o‘rniga amaliy yechim shablonini ko‘rsating.\n\nO‘nlab loyihalarda sinovdan o‘tgan: faktlar qanchalik aniq bo‘lsa, auditoriya jalb qilinishi shunchalik yuqori bo‘ladi.`,
        cta: `Ushbu qoidalardan qaysi biri sizda ko‘proq qiziqish uyg‘otdi? Izohlarda yozib qoldiring — batafsil muhokama qilamiz!`,
        hashtags: ['#telegram', '#smm', '#biznes', '#foydali', '#uzbekistan'],
      },
      {
        title: `Shaxsiy tajriba: nima uchun biz «${cleanTopic}»ga yondashuvni tubdan o‘zgartirdik?`,
        body: `Olti oy oldin biz klassik marketing darsliklari bo‘yicha ish qilardik. Har bir loyihani haftalab tasdiqlashga vaqt ketardi.\n\nNatija nima bo‘ldi? Qamrov tushib ketdi, sotuvlar esa bir joyda to‘xtab qoldi.\n\nBiz nimalarni o‘zgartirdik:\n— Postlar hajmini 2 barobarga qisqartirdik;\n— Yaltiroq g‘alabalar o‘rniga real xatolarni ochiq ko‘rsata boshladik;\n— Umumiy maslahatlar o‘rniga aniq raqamlar va skrinshotlarni ulashdik.\n\nNatijada: pullik reklamasiz dastlabki 30 kunda jalb qilinish 47% ga oshdi!`,
        cta: `Mavzu siz uchun dolzarb bo‘lsa, 🔥 reaksiyasini qoldiring — ikkinchi qismda batafsil metrikalarni ulashaman!`,
        hashtags: ['#keys', '#marketing', '#tajriba', '#natija'],
      },
      {
        title: `Odamlarning 90% qismi «${cleanTopic}»ni noto‘g‘ri tushunadi. Buning sababi oddiy`,
        body: `Go‘yoki natijaga erishish uchun bir necha oylab tayyorgarlik va katta byudjet kerakdek tuyuladi.\n\nAslida esa hamma narsa tizimlilikka bog‘liq:\n\n• 1-qadam: Maqsadli auditoriyaning asosiy muammosini aniq belgilab oling.\n• 2-qadam: Bir oqshomda minimal ishchi prototipni yarating.\n• 3-qadam: G‘oyani dastlabki 10 ta mijozda sinab ko‘ring.\n\nQolgan barcha narsalar shunchaki vaqtni cho‘zadigan ortiqcha shovqindir.`,
        cta: `Ushbu postni loyiha boshlashni hamon ortga surayotgan do‘stingizga yuboring!`,
        hashtags: ['#rivojlanish', '#startap', '#strategiya', '#muvaffaqiyat'],
      },
    ],
    instagram: [
      {
        title: `«${cleanTopic}» haqida ekspertlar aytmaydigan sir 🤫`,
        body: `Yo‘qotib qo‘ymaslik uchun ushbu postni saqlab qo‘ying! 📌\n\nBu sohada ish boshlaganda, bir vaqtning o‘zida yuzlab ishlarni qilish kerakdek ko‘rinadi.\n\nBiroq aslida hal qiluvchi 3 ta jihat bor:\n\n🔹 Ortiqcha chalg‘ishlarsiz aniq algoritm\n🔹 Katta sakrashlar o‘rniga har kungi kichik qadamlar\n🔹 Ijtimoiy tarmoq algoritmlariga emas, insonlarga beriladigan haqiqiy foydaga diqqat qaratish\n\nKaruselni suring 👉 u yerda 48 soatlik to‘liq qo‘llanma bor!`,
        cta: `Direct'ga «START» so‘zini yozing, va men sizga tayyor PDF-qo‘llanmani yuboraman! 📩`,
        hashtags: ['#instagram', '#reels', '#biznesuz', '#tadbirkor', '#layfxak', '#onlaynbiznes'],
      },
      {
        title: `«${cleanTopic}» bo‘yicha oddiy haqiqatni tushunish uchun 3 yil vaqtim ketdi`,
        body: `Agar buni boshida bilganimda, yuzlab soat vaqt va asablarimni tejab qolgan bo‘lardim. ⚡️\n\nAslida nimalar muhim:\n\n1️⃣ Murakkablashtirmang — imkon boricha soddalashtiring.\n2️⃣ Kasbiy qiyin so‘zlarda emas, auditoriyangiz muammosi tilida gapiring.\n3️⃣ Obunachilar sonidan ko‘ra ular bilan o‘zaro munosabat sifati doimo muhimroq.`,
        cta: `Ushbu Reels'ni hozir o‘z faoliyatini kengaytirayotgan do‘stingizga jo‘nating! 🚀`,
        hashtags: ['#motivatsiya', '#tajriba', '#karyera', '#maqsad', '#reelsuzb'],
      },
      {
        title: `Agar «${cleanTopic}»da natija xohlasangiz, BUNI qilishni to‘xtating ❌`,
        body: `Eng katta xato — mantiqni tushunmasdan birovlarning trendlarini ko‘r-ko‘rona takrorlash.\n\nBuning o‘rniga nima qilish kerak:\n\n✨ O‘zingizning takrorlanmas yetkazish uslubingizni yarating\n✨ Dastlabki 2 soniyada nostandart ilmoq jumlalarni sinang\n✨ Auditoriya bilan jonli savol-javoblar orqali muloqot qiling`,
        cta: `«Saqlash» tugmasini bosing ⭐️ va izohlarda «+» qoldiring, tayyor shablonni yuboraman!`,
        hashtags: ['#smmuz', '#trend', '#ekspert', '#foydali'],
      },
    ],
    youtube: [
      {
        title: `«${cleanTopic}»: 12 daqiqada noldan boshlab to‘liq tahlil [2026]`,
        body: `Ushbu videoda biz «${cleanTopic}» mavzusining barcha jihatlarini batafsil ko‘rib chiqamiz va darhol qo‘llashingiz mumkin bo‘lgan aniq harakatlar rejasini taqdim etamiz.\n\nVIDEOGA TAYMKODLAR:\n00:00 — Kirish: 2026-yilda bu nega muhim?\n01:32 — Byudjetning 80 foizini kuydiradigan asosiy xato\n04:15 — Bosqichma-bosqich qo‘llanma va asboblar\n07:50 — Real keys tahlili\n10:45 — Bonus: jarayonni 2 barobar tezlashtirish usuli\n11:40 — Xulosa va savollarga javoblar`,
        cta: `Video foydali bo‘lgan bo‘lsa, layk bosing 👍, kanalga obuna bo‘ling va qo‘ng‘iroqchani yoqing! Foydali materiallar havolasi — mahkamlangan izohda ⬇️`,
        hashtags: ['#youtubeuz', '#qollanma', '#video', '#darslik', '#2026'],
      },
      {
        title: `Ushbu videoni ko‘rmasdan turib «${cleanTopic}»ni BOSHLAMANG! 🔥`,
        body: `Agar bu mavzuga kirishmoqchi bo‘lsangiz, 10 daqiqa to‘xtab turing. Ushbu videoda men pullik kurslarda odatda aytilmaydigan barcha muhim nuqtalarni ochiq aytib beraman.\n\nTAYMKODLAR:\n00:00 — Barchasi qanday boshlangan edi?\n02:10 — Nega eski usullar endi ishlamayapti?\n05:30 — Yangi strategiya: jonli misollar bilan\n08:20 — Sun'iy intellekt orqali ishlarni avtomatlashtirish\n10:15 — Boshlashga tayyorgarlik chek-listi`,
        cta: `Mavzu bo‘yicha o‘z fikringizni izohlarda yozing! Kanalga obuna bo‘lishni unutmang 🔔`,
        hashtags: ['#insayt', '#sharh', '#layfxak', '#darslik'],
      },
      {
        title: `«${cleanTopic}»ni 3 barobar tezroq bajarish siri: Maxsus metodika ⚡️`,
        body: `Jarayonni optimallashtirish bo‘yicha amaliy mahorat darsi. Ko‘p soatlik zerikarli ishlarni unuting — haftasiga 20 soat vaqtingizni tejaydigan sozlangan tizimni ko‘rsataman.\n\nTAYMKODLAR:\n00:00 — Bugungi mavzu haqida\n01:10 — Ish maydonini tayyorlash\n03:45 — Jarayonni jonli ko‘rsatish\n06:50 — OLDIN va KEYIN solishtirish\n09:15 — Yakuniy tavsiyalar va havolalar`,
        cta: `«OBUNA BO‘LISH» tugmasini bosing va ushbu videoni do‘stlaringiz bilan ulashing! Barcha havolalar birinchi izohda 👇`,
        hashtags: ['#samaradorlik', '#avtomatlashtirish', '#maslahatlar'],
      },
    ],
  };

  const templates = isUz ? templatesUz : templatesRu;
  const list = templates[platform] || templates.telegram;
  const result: PostVariant[] = [];

  for (let i = 0; i < count; i++) {
    const template = list[i % list.length];
    const angle = angles[i] || (isUz ? `Variant 0${i + 1}` : `Вариант 0${i + 1}`);
    result.push({
      id: `mock-variant-${Date.now()}-${i}`,
      angleTitle: angle,
      title: template.title,
      body: template.body,
      cta: template.cta,
      hashtags: template.hashtags,
    });
  }

  return result;
}

export function generateMockPregenerate(topic: string, platform: SocialPlatform, textLanguage: AppLanguage = 'ru') {
  const isUz = textLanguage === 'uz';
  const clean = topic.trim() || (isUz ? 'Loyihani rivojlantirish' : 'Развитие проекта');

  if (isUz) {
    return {
      suggestedAngles: [
        `«${clean.slice(0, 30)}» bo‘yicha noaniq stereotiplar tahlili va real haqiqat`,
        `Shaxsiy keys: g‘oyani 48 soatda sinab ko‘rib dastlabki natijalarga qanday erishdik?`,
        `Aniq va ochiq taklif: asosiy afzalliklar va nega hozir boshlash zarur?`,
      ],
      detectedTone:
        platform === 'telegram'
          ? 'Aniq, ekspertcha, ortiqcha gapi yo‘q'
          : platform === 'instagram'
          ? 'Dinamik, jalb qiluvchi, vizual'
          : 'Qiziqarli, tizimli, yuqori CTR',
    };
  }

  return {
    suggestedAngles: [
      `Разбор неочевидного мифа: почему в «${clean.slice(0, 30)}» всё устроено иначе`,
      `Личный кейс: как мы протестировали гипотезу за 48 часов и получили первые результаты`,
      `Прямой и честный оффер: ключевые преимущества и почему стоит действовать прямо сейчас`,
    ],
    detectedTone:
      platform === 'telegram'
        ? 'Плотный, экспертный, без воды'
        : platform === 'instagram'
        ? 'Динамичный, вовлекающий, визуальный'
        : 'Интригующий, структурированный, высокий CTR',
  };
}
