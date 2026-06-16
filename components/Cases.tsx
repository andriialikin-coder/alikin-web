interface Metric {
  label: string;
  before: string;
  after: string;
  unit?: string;
}

interface CaseItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  metrics: Metric[];
  tech: string[];
  accentColor: 'indigo' | 'emerald' | 'violet';
}

const CASES: CaseItem[] = [
  {
    id: 'case-marketplace',
    tag: 'E-commerce',
    title: 'Маркетплейс строительных материалов',
    description:
      'Спроектировал и запустил MVP за 3 месяца. Реализовал мультивендорную корзину, систему расчёта логистики и интеграцию с 1С.',
    metrics: [
      { label: 'Время загрузки', before: '6.2s', after: '1.1s' },
      { label: 'Конверсия корзины', before: '2.1%', after: '6.8%' },
      { label: 'Выручка / месяц', before: '₽800К', after: '₽2.4М', unit: '+200%' },
    ],
    tech: ['Next.js', 'PostgreSQL', 'Redis', '1С-интеграция'],
    accentColor: 'indigo',
  },
  {
    id: 'case-saas',
    tag: 'SaaS',
    title: 'CRM для B2B продаж',
    description:
      'Автоматизировал воронку продаж: лид → сделка → счёт. Команда из 12 человек закрыла ручную рутину на 80%.',
    metrics: [
      { label: 'Время на сделку', before: '4.5 ч', after: '50 мин' },
      { label: 'Обработка лидов', before: '120/мес', after: '600/мес' },
      { label: 'Ручные задачи', before: '100%', after: '20%', unit: '−80%' },
    ],
    tech: ['React', 'Node.js', 'Supabase', 'Telegram Bot'],
    accentColor: 'emerald',
  },
  {
    id: 'case-mobile',
    tag: 'Продукт',
    title: 'Платформа онлайн-обучения',
    description:
      'Разработал систему управления курсами с видео-стримингом, тестами и аналитикой прогресса для 3000+ студентов.',
    metrics: [
      { label: 'Завершаемость курсов', before: '28%', after: '71%' },
      { label: 'NPS студентов', before: '31', after: '78' },
      { label: 'Возврат клиентов', before: '15%', after: '62%', unit: '+4×' },
    ],
    tech: ['Next.js', 'TypeScript', 'S3', 'Stripe'],
    accentColor: 'violet',
  },
];

const ACCENT_STYLES: Record<CaseItem['accentColor'], string> = {
  indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  violet: 'bg-violet-50 text-violet-700 border-violet-200',
};

const ACCENT_BADGE: Record<CaseItem['accentColor'], string> = {
  indigo: 'bg-indigo-100 text-indigo-800',
  emerald: 'bg-emerald-100 text-emerald-800',
  violet: 'bg-violet-100 text-violet-800',
};

const ACCENT_UNIT: Record<CaseItem['accentColor'], string> = {
  indigo: 'text-indigo-600',
  emerald: 'text-emerald-600',
  violet: 'text-violet-600',
};

export default function Cases() {
  return (
    <section id="cases" className="bg-slate-50 py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-4">
            Кейсы
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Результаты, а не обещания
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Каждый кейс — реальные цифры до и после. Без маркетинговых
            округлений.
          </p>
        </div>

        {/* Cases grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CASES.map((item) => (
            <article
              key={item.id}
              id={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col gap-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Tag + title */}
              <div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border mb-3 ${
                    ACCENT_STYLES[item.accentColor]
                  }`}
                >
                  {item.tag}
                </span>
                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>

              {/* Metrics: БЫЛО / СТАЛО */}
              <div className="bg-slate-50 rounded-xl p-4 flex flex-col gap-3">
                <div className="grid grid-cols-3 gap-1 text-xs font-semibold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-200">
                  <span>Показатель</span>
                  <span className="text-center">Было</span>
                  <span className="text-center">Стало</span>
                </div>
                {item.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="grid grid-cols-3 gap-1 items-center text-sm"
                  >
                    <span className="text-slate-500 text-xs leading-tight">
                      {metric.label}
                    </span>
                    <span className="text-center text-slate-400 line-through text-xs">
                      {metric.before}
                    </span>
                    <div className="flex items-center justify-center gap-1">
                      <span className="font-bold text-slate-900 text-sm">
                        {metric.after}
                      </span>
                      {metric.unit && (
                        <span
                          className={`text-xs font-semibold ${
                            ACCENT_UNIT[item.accentColor]
                          }`}
                        >
                          {metric.unit}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tech badges */}
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {item.tech.map((t) => (
                  <span
                    key={t}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                      ACCENT_BADGE[item.accentColor]
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
