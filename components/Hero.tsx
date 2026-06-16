import Link from 'next/link';
import Image from 'next/image';

const STATS = [
  { value: '5+', label: 'лет в разработке' },
  { value: '30+', label: 'проектов в продакшн' },
  { value: '3×', label: 'средний рост метрик' },
];

const TECH_BADGES = ['Next.js', 'TypeScript', 'React', 'Node.js', 'Supabase', 'PostgreSQL'];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white"
    >
      {/* Decorative background grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(to right, #6366f1 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      {/* Gradient orbs */}
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-60"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-50"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-16">
          
          {/* Photo */}
          <div className="w-48 sm:w-56 lg:w-64 xl:w-72 shrink-0 relative mx-auto lg:mx-0">
            <Image
              src="/me.webp"
              alt="Андрей Аликин"
              width={300}
              height={300}
              priority
              className="w-full h-auto rounded-[2rem] object-cover shadow-xl"
              sizes="(max-width: 1024px) 300px, 300px"
            />
          </div>

          {/* Text content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium mb-6 lg:mb-8 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Открыт для сотрудничества
            </div>

            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 leading-tight tracking-tight mb-6">
              Превращаю идеи{' '}
              <br className="hidden xl:block" />
              <span className="relative">
                <span className="text-indigo-600">в продукт,</span>
              </span>
              <br />
              который{' '}
              <span className="text-emerald-600">зарабатывает</span>
            </h1>

            {/* Subheading / Offer */}
            <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Fullstack-разработчик с фокусом на бизнес-результат. Проектирую
              архитектуру, пишу чистый код и вывожу MVP в продакшн{' '}
              <strong className="text-slate-800 font-semibold">без дорогостоящих переделок</strong>{' '}
              через 6 месяцев.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12 lg:mb-16">
              <Link
                id="hero-cta-primary"
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 text-white font-semibold text-base hover:bg-indigo-700 active:scale-95 transition-all duration-200 shadow-lg shadow-indigo-200"
              >
                Обсудить проект
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <Link
                id="hero-cta-secondary"
                href="#cases"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-slate-700 font-semibold text-base border border-slate-200 hover:border-slate-300 hover:bg-slate-50 active:scale-95 transition-all duration-200"
              >
                Посмотреть кейсы
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto lg:mx-0 mb-10 lg:mb-12">
              {STATS.map((stat) => (
                <div key={stat.value} className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-slate-900">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              {TECH_BADGES.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400">
        <span className="text-xs font-medium tracking-widest uppercase">Прокрутите</span>
        <div className="w-5 h-8 border-2 border-slate-300 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-slate-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
