import { useEffect, useState } from 'react';
import { cn } from './utils/cn';

// Типы данных
interface Project {
  id: number;
  title: string;
  description: string;
  preview: string;
  video?: string;
  embedUrl?: string;
  category: string;
}

interface Skill {
  name: string;
  category: string;
  icon: string;
  desc: string;
}

// Данные проектов
const projects: Project[] = [
  {
    id: 1,
    title: "This Grok AI",
    description: "Короткий моушен ролик про Grok AI",
    preview: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop",
    embedUrl: "https://youtube.com/embed/A1d8UWcVg40",
    category: "Видео"
  },
  {
    id: 2,
    title: "Проект 02",
    description: "Ваше видео для портфолио. Замените этот текст на краткое описание проекта.",
    preview: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=800&h=600&fit=crop",
    embedUrl: "https://www.youtube.com/embed/jBhX2Kdqoyk?start=172",
    category: "Видео"
  },
  {
    id: 3,
    title: "Проект 03",
    description: "Ваше видео для портфолио. Замените этот текст на краткое описание проекта.",
    preview: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=800&h=600&fit=crop",
    embedUrl: "https://www.youtube.com/embed/ntUI-ENXQeM",
    category: "Видео"
  },
  {
    id: 4,
    title: "Проект 04",
    description: "Ваше видео для портфолио. Замените этот текст на краткое описание проекта.",
    preview: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop",
    embedUrl: "https://www.youtube.com/embed/XrAoDZLZZ1g",
    category: "Видео"
  },
  {
    id: 5,
    title: "YouTube-канал бренда",
    description: "Серия образовательных видео для YouTube-канала технологического бренда.",
    preview: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
    category: "Социальные медиа"
  },
  {
    id: 6,
    title: "Фэшн-показ",
    description: "Видео с модного показа с динамичным монтажом и креативными переходами.",
    preview: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop",
    category: "Фэшн"
  }
];

// Данные навыков
const skills: Skill[] = [
  { name: "Adobe Premiere Pro", category: "Монтаж", icon: "🎬", desc: "Профессиональный монтаж любой сложности" },
  { name: "After Effects", category: "VFX & Motion", icon: "✨", desc: "Моушн-дизайн и визуальные эффекты" },
  { name: "DaVinci Resolve", category: "Цветокоррекция", icon: "🎨", desc: "Профессиональная цветокоррекция" }
];

// Компонент навигации
function Navigation({
  activeSection,
  onNavigate,
  theme,
  onToggleTheme
}: {
  activeSection: string;
  onNavigate: (section: string) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Главная' },
    { id: 'portfolio', label: 'Портфолио' },
    { id: 'about', label: 'Обо мне' },
    { id: 'contact', label: 'Контакты' }
  ];

  return (
    <nav
      className={cn(
        "fixed left-0 right-0 top-0 z-40 backdrop-blur-lg shadow-lg",
        theme === 'dark' ? 'bg-[#181822]/85 shadow-black/40 border-b border-white/5' : 'bg-white/80 shadow-slate-200/50'
      )}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 2xl:px-12">
        <div className="flex h-[72px] sm:h-20 items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <div className="flex h-10 w-10 sm:h-11 sm:w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose-400 to-pink-500">
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M10 4v4" />
                <path d="M2 8h20" />
                <path d="M6 4v4" />
              </svg>
            </div>
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={theme === 'dark' ? 'Включить светлую тему' : 'Включить темную тему'}
              title={theme === 'dark' ? 'Светлая тема' : 'Темная тема'}
              className={cn(
                "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl transition-colors",
                theme === 'dark'
                  ? 'bg-slate-800 text-amber-300 hover:bg-slate-700'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              )}
            >
              {theme === 'dark' ? (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M12 3a7 7 0 1 0 9 9 9 9 0 1 1-9-9z" />
                </svg>
              )}
            </button>
            <span className={cn("truncate text-lg sm:text-xl font-bold", theme === 'dark' ? 'text-slate-100' : 'text-slate-900')}>Kosiposhka</span>
          </div>

          {/* Десктопное меню */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  activeSection === item.id
                    ? "bg-slate-900 text-white"
                    : theme === 'dark'
                      ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Мобильная кнопка меню */}
          <button 
            className="md:hidden flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className={cn('h-6 w-6', theme === 'dark' ? 'text-slate-100' : 'text-slate-900')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Мобильное меню */}
        {isMobileMenuOpen && (
          <div className={cn(
            "md:hidden pb-4 pt-2",
            theme === 'dark' ? 'border-t border-white/5' : 'border-t border-slate-200/80'
          )}>
            <div className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={cn(
                  "block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  activeSection === item.id
                    ? "bg-slate-900 text-white"
                    : theme === 'dark'
                      ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                )}
              >
                {item.label}
              </button>
            ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// Главный компонент приложения
export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      setTheme(storedTheme);
    }
  }, []);

  // Отслеживание активной секции при скролле
  useEffect(() => {
    const sections = ['home', 'portfolio', 'about', 'contact'];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-10% 0px -50% 0px'
      }
    );

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  // Отслеживание скролла для показа кнопки "наверх"
  useEffect(() => {
    const handleScroll = () => {
      // Показываем кнопку после прокрутки на 400px
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleTheme = () => {
    setTheme((prevTheme) => {
      const nextTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', nextTheme);
      return nextTheme;
    });
  };

  // Обработка кликов на навигацию
  const handleNavigate = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={cn(
        'min-h-screen transition-colors',
        theme === 'dark' ? 'bg-[#14141c]' : 'bg-gradient-to-br from-rose-50 via-white to-pink-50'
      )}
    >
      <Navigation activeSection={activeSection} onNavigate={handleNavigate} theme={theme} onToggleTheme={handleToggleTheme} />

      {/* Главный экран (Hero Section) */}
      <section id="home" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 pt-24 pb-14 sm:px-6 sm:pt-28 sm:pb-18 lg:px-8 xl:pt-32 xl:pb-24 2xl:min-h-[92vh]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={cn(
            "absolute -top-24 -right-24 h-56 w-56 sm:-top-32 sm:-right-32 sm:h-72 sm:w-72 lg:-top-40 lg:-right-40 lg:h-80 lg:w-80 rounded-full blur-3xl animate-pulse",
            theme === 'dark'
              ? 'bg-[#2a121a] opacity-45'
              : 'bg-rose-200 mix-blend-multiply opacity-30'
          )} />
          <div
            className={cn(
              "absolute -bottom-24 -left-24 h-56 w-56 sm:-bottom-32 sm:-left-32 sm:h-72 sm:w-72 lg:-bottom-40 lg:-left-40 lg:h-80 lg:w-80 rounded-full blur-3xl animate-pulse",
              theme === 'dark'
                ? 'bg-[#2a121f] opacity-45'
                : 'bg-pink-200 mix-blend-multiply opacity-30'
            )}
            style={{ animationDelay: '1s' }}
          />
        </div>

        <div className="relative mx-auto w-full max-w-6xl text-center">
          <div className={cn(
            'mb-6 sm:mb-8 inline-flex max-w-full items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-medium backdrop-blur-sm shadow-sm',
            theme === 'dark' ? 'bg-[#1d1d28]/80 text-slate-300 border border-white/5' : 'bg-white/80 text-slate-600'
          )}>
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="truncate">Доступен для новых проектов</span>
          </div>

          <h1 className={cn('mb-5 sm:mb-6 text-4xl sm:text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl font-bold tracking-tight leading-[0.95]', theme === 'dark' ? 'text-slate-100' : 'text-slate-900')}>
            Привет, я Кирилл
          </h1>
          
          <p className={cn('mb-4 max-w-4xl mx-auto text-lg sm:text-xl lg:text-2xl 2xl:text-[2rem] leading-relaxed', theme === 'dark' ? 'text-slate-300' : 'text-slate-600')}>
            Специализируюсь на <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">видеомонтаже</span>
          </p>

          <p className={cn('mb-8 sm:mb-10 max-w-3xl mx-auto text-base sm:text-lg xl:text-xl leading-relaxed', theme === 'dark' ? 'text-slate-400' : 'text-slate-500')}>
            Создаю визуальные истории с вниманием к деталям. Более одного года опыта работы в индустрии видеопроизводства.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-xl sm:max-w-none mx-auto">
            <button 
              onClick={() => handleNavigate('portfolio')}
              className={cn(
                "group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full px-6 sm:px-8 py-4 text-base sm:text-lg font-semibold text-white transition-all hover:scale-[1.02]",
                theme === 'dark'
                  ? 'bg-gradient-to-r from-[#5a1f35] to-[#7a2347] shadow-lg shadow-black/30 hover:shadow-black/50'
                  : 'bg-gradient-to-r from-rose-500 to-pink-600 shadow-lg shadow-rose-200 hover:shadow-xl hover:shadow-rose-300'
              )}
            >
              Смотреть работы
              <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button 
              onClick={() => handleNavigate('contact')}
              className={cn(
                'inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border-2 px-6 sm:px-8 py-4 text-base sm:text-lg font-semibold transition-all',
                theme === 'dark'
                  ? 'border-white/10 bg-[#181822] text-slate-200 hover:border-[#5a1f35] hover:bg-[#21131a]'
                  : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50'
              )}
            >
              Связаться со мной
            </button>
          </div>

          {/* Статистика */}
          <div className="mt-12 sm:mt-16 grid grid-cols-2 gap-6 sm:gap-8 max-w-sm sm:max-w-xl mx-auto">
            {[
              { value: '50+', label: 'Проектов' },
              { value: '1+', label: 'Год опыта' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                  <div className={cn('text-2xl sm:text-4xl xl:text-5xl font-bold', theme === 'dark' ? 'text-slate-100' : 'text-slate-900')}>{stat.value}</div>
                  <div className={cn('mt-1 text-xs sm:text-sm xl:text-base', theme === 'dark' ? 'text-slate-400' : 'text-slate-500')}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={cn(
            'pointer-events-none absolute bottom-0 left-0 right-0 h-20 sm:h-24',
            theme === 'dark'
              ? 'bg-gradient-to-b from-transparent to-[#151622]'
              : 'bg-gradient-to-b from-transparent to-[#f8f5f7]'
          )}
        />
      </section>

      {/* Портфолио */}
      <section
        id="portfolio"
        className={cn(
          'relative overflow-hidden py-16 sm:py-20 xl:py-24 px-4 sm:px-6 lg:px-8',
          theme === 'dark'
            ? 'bg-gradient-to-b from-[#151622] via-[#171725] to-[#181822]'
            : 'bg-gradient-to-b from-[#f8f5f7] via-white to-[#fcf7fa]'
        )}
      >
        <div
          className={cn(
            'pointer-events-none absolute -top-16 left-0 right-0 h-16',
            theme === 'dark'
              ? 'bg-gradient-to-b from-[#14141c] to-transparent'
              : 'bg-gradient-to-b from-[#fdf7fa] to-transparent'
          )}
        />
        <div className="mx-auto w-full max-w-[1440px] 2xl:max-w-[1600px]">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className={cn('text-3xl sm:text-4xl xl:text-5xl font-bold mb-4', theme === 'dark' ? 'text-slate-100' : 'text-slate-900')}>Избранные проекты</h2>
            <p className={cn('text-base sm:text-lg max-w-2xl mx-auto', theme === 'dark' ? 'text-slate-300' : 'text-slate-600')}>
              Каждый проект — это уникальная история, рассказанная через визуальные образы и эмоции
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6 xl:gap-8">
            {projects.slice(0, 4).map((project) => (
              <div 
                key={project.id}
                className={cn(
                  "group rounded-3xl overflow-hidden transition-all hover:-translate-y-2",
                  theme === 'dark'
                    ? 'bg-[#1b1b25] border border-white/5 shadow-lg shadow-black/30 hover:shadow-black/45'
                    : 'bg-white shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50'
                )}
              >
                <div className={cn("relative aspect-video overflow-hidden", theme === 'dark' ? 'bg-[#111118]' : 'bg-slate-100')}>
                  {project.embedUrl ? (
                    <iframe
                      src={project.embedUrl}
                      title={project.title}
                      className="absolute inset-0 h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <img 
                      src={project.preview} 
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="pointer-events-none absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className={cn(
                      "inline-block rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm",
                      theme === 'dark' ? 'bg-[#24131a]/90 text-rose-100 border border-white/5' : 'bg-white/90 text-slate-700'
                    )}>
                      {project.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className={cn(
                    "text-xl font-bold mb-2 transition-colors",
                    theme === 'dark' ? 'text-slate-100 group-hover:text-rose-300' : 'text-slate-900 group-hover:text-rose-600'
                  )}>
                    {project.title}
                  </h3>
                  <p className={cn('leading-relaxed', theme === 'dark' ? 'text-slate-400' : 'text-slate-600')}>
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Обо мне */}
      <section
        id="about"
        className={cn(
          'relative overflow-hidden py-16 sm:py-20 xl:py-24 px-4 sm:px-6 lg:px-8',
          theme === 'dark' ? 'bg-gradient-to-b from-[#181822] via-[#191926] to-[#181822]' : 'bg-gradient-to-b from-[#fcf7fa] via-white to-[#f9f4f7]'
        )}
      >
        <div
          className={cn(
            'pointer-events-none absolute -top-16 left-0 right-0 h-16',
            theme === 'dark'
              ? 'bg-gradient-to-b from-[#181822] to-transparent'
              : 'bg-gradient-to-b from-[#fcf7fa] to-transparent'
          )}
        />
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 xl:gap-16 items-center">
            <div>
              <h2 className={cn('text-3xl sm:text-4xl xl:text-5xl font-bold mb-6', theme === 'dark' ? 'text-slate-100' : 'text-slate-900')}>
                Обо мне
              </h2>
              <div className={cn('space-y-5 sm:space-y-6 text-base sm:text-lg xl:text-xl leading-relaxed', theme === 'dark' ? 'text-slate-300' : 'text-slate-600')}>
                <p>
                  Привет! Меня зовут Кирилл, и я видеомонтажер с одним и более года опыта работы в индустрии. Моя страсть - превращать сырой материал в захватывающие визуальные истории, которые резонируют с аудиторией.
                </p>
                <p>
                  Я верю, что хороший монтаж - это способность проявить эмоции у зрителя по ту сторону экрана, а также понятно и доступно объяснить суть повествования через грамотный визуал и звук.
                </p>

                <div className="pt-3 sm:pt-4">
                  <div className="flex flex-wrap gap-3">
                    {skills.map((skill, index) => (
                      <div
                        key={index}
                        className={cn(
                          "rounded-2xl px-4 py-3 text-sm sm:text-base font-semibold transition-colors",
                          theme === 'dark'
                            ? 'bg-[#111118] text-slate-200 border border-white/5 shadow-lg shadow-black/20'
                            : 'bg-white text-slate-800 border border-slate-200 shadow-sm'
                        )}
                      >
                        {skill.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <div className={cn(
                "aspect-square rounded-3xl overflow-hidden",
                theme === 'dark' ? 'bg-gradient-to-br from-[#2a121a] to-[#321723] border border-white/5' : 'bg-gradient-to-br from-rose-400 to-pink-500'
              )}>
<img 
  src="https://sun9-31.userapi.com/impg/n2JXT3cCwcIkezcAWUa92X7yS9xB-AqITeQ4oQ/CmrbJiIGB1w.jpg?size=604x604&quality=96&sign=642c191d11dca7a027ced0a630b2b902&type=album"
  alt="Енотик"
  className="h-full w-full object-cover"
/>
              </div>
              <div className={cn(
                "absolute bottom-4 right-4 sm:-bottom-6 sm:-right-6 h-32 w-32 sm:h-40 sm:w-40 xl:h-48 xl:w-48 rounded-3xl p-4 sm:p-5 xl:p-6",
                theme === 'dark' ? 'bg-[#1d1d28] border border-white/5 shadow-xl shadow-black/30' : 'bg-white shadow-xl shadow-slate-200'
              )}>
                <div className="h-full flex flex-col justify-center text-center">
                  <div className="text-2xl sm:text-3xl xl:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">1+</div>
                  <div className={cn('text-[11px] sm:text-xs xl:text-sm font-medium leading-tight', theme === 'dark' ? 'text-slate-300' : 'text-slate-600')}>год опыта работы в видеомонтаже</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Контакты */}
      <section
        id="contact"
        className={cn(
          'relative overflow-hidden py-16 sm:py-20 xl:py-24 px-4 sm:px-6 lg:px-8',
          theme === 'dark' ? 'bg-gradient-to-b from-[#181822] via-[#181a2c] to-[#161a2a]' : 'bg-gradient-to-b from-[#f9f4f7] via-[#f4f1f6] to-[#eeebf3]'
        )}
      >
        <div
          className={cn(
            'pointer-events-none absolute -top-16 left-0 right-0 h-16',
            theme === 'dark'
              ? 'bg-gradient-to-b from-[#181822] to-transparent'
              : 'bg-gradient-to-b from-[#f9f4f7] to-transparent'
          )}
        />
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className={cn('text-3xl sm:text-4xl xl:text-5xl font-bold mb-4', theme === 'dark' ? 'text-white' : 'text-slate-900')}>
              Давайте работать вместе
            </h2>
            <p className={cn('text-base sm:text-lg max-w-2xl mx-auto', theme === 'dark' ? 'text-slate-300' : 'text-slate-600')}>
              Готовы обсудить ваш следующий проект? Свяжитесь со мной — я всегда открыт для новых возможностей.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className={cn(
              "relative isolate overflow-hidden rounded-3xl p-6 sm:p-8 xl:p-12",
              theme === 'dark'
                ? 'border border-white/5 bg-[#1b1b25] shadow-xl shadow-black/25'
                : 'border border-slate-200 bg-white/70 shadow-lg shadow-slate-200/40 backdrop-blur-sm'
            )}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 xl:gap-12">
                <div className="space-y-8">
                  <h3 className={cn('text-2xl font-bold mb-6', theme === 'dark' ? 'text-white' : 'text-slate-900')}>Контакты</h3>
                  
                  <a href="mailto:petrovsivan20@gmail.com" className={cn('relative z-10 flex items-start gap-4 rounded-2xl transition-colors focus:outline-none active:bg-transparent [-webkit-tap-highlight-color:transparent]', theme === 'dark' ? 'text-white hover:text-rose-300' : 'text-slate-800 hover:text-rose-600')}>
                    <div className={cn('flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl', theme === 'dark' ? 'bg-rose-500/20' : 'bg-rose-100')}>
                      <svg className={cn('h-6 w-6', theme === 'dark' ? 'text-rose-400' : 'text-rose-500')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className={cn('text-sm', theme === 'dark' ? 'text-slate-400' : 'text-slate-500')}>Email</p>
                      <p className="font-medium break-all">petrovsivan20@gmail.com</p>
                    </div>
                  </a>

                  <a href="https://t.me/kosiposha32" target="_blank" rel="noopener noreferrer" className={cn('relative z-10 flex items-start gap-4 rounded-2xl transition-colors focus:outline-none active:bg-transparent [-webkit-tap-highlight-color:transparent]', theme === 'dark' ? 'text-white hover:text-rose-300' : 'text-slate-800 hover:text-rose-600')}>
                    <div className={cn('flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl', theme === 'dark' ? 'bg-rose-500/20' : 'bg-rose-100')}>
                      <svg className={cn('h-6 w-6', theme === 'dark' ? 'text-rose-400' : 'text-rose-500')} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.48-1.05-2.4-1.66-.95-.63-.33-1.02.22-1.57.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .24z"/>
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className={cn('text-sm', theme === 'dark' ? 'text-slate-400' : 'text-slate-500')}>Telegram</p>
                      <p className="font-medium break-all">@kosiposha32</p>
                    </div>
                  </a>
                </div>

                <div className="space-y-8">
                  <h3 className={cn('text-2xl font-bold mb-6', theme === 'dark' ? 'text-white' : 'text-slate-900')}>Социальные сети</h3>
                  <div className="flex flex-col gap-6">
                    <a 
                      href="https://x.com/Kosiposha32" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={cn('relative z-10 flex items-start gap-4 rounded-2xl transition-colors focus:outline-none active:bg-transparent [-webkit-tap-highlight-color:transparent]', theme === 'dark' ? 'text-white hover:text-rose-300' : 'text-slate-800 hover:text-rose-600')}
                    >
                      <div className={cn('flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl', theme === 'dark' ? 'bg-white/10' : 'bg-slate-100')}>
                        <svg className={cn('h-6 w-6', theme === 'dark' ? 'text-white' : 'text-slate-700')} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <p className={cn('text-sm', theme === 'dark' ? 'text-slate-400' : 'text-slate-500')}>X (Twitter)</p>
                        <p className="font-medium break-all">@Kosiposha32</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Футер */}
      <footer className={cn(
        'relative overflow-hidden py-10 sm:py-12 px-4 sm:px-6 lg:px-8 border-t',
        theme === 'dark' ? 'bg-[#14141c] border-white/5' : 'bg-slate-900 border-slate-800'
      )}>
        <div
          className={cn(
            'pointer-events-none absolute -top-12 left-0 right-0 h-12',
            theme === 'dark'
              ? 'bg-gradient-to-b from-[#161a2a] to-transparent'
              : 'bg-gradient-to-b from-slate-900/80 to-transparent'
          )}
        />
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-8 text-center lg:text-left">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-400 to-pink-500">
                <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M10 4v4" />
                  <path d="M2 8h20" />
                  <path d="M6 4v4" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">Kosiposhka</span>
            </div>

            <nav className="flex flex-wrap justify-center gap-x-5 gap-y-3 lg:justify-center">
              {[
                { name: 'Главная', id: 'home' },
                { name: 'Портфолио', id: 'portfolio' },
                { name: 'Обо мне', id: 'about' },
                { name: 'Контакты', id: 'contact' }
              ].map((item) => (
                <button 
                  key={item.name}
                  onClick={() => {
                    const el = document.getElementById(item.id);
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  {item.name}
                </button>
              ))}
            </nav>

            <p className="max-w-xs text-slate-500 text-sm text-center lg:text-right">
              © 2026 Kosiposhka. Все права защищены.
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={cn(
          "fixed bottom-8 right-8 z-50 bg-pink-600 text-white p-3 rounded-full shadow-lg hover:bg-pink-700 transition-all duration-500 ease-out",
          showScrollTop ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-10 pointer-events-none"
        )}
        aria-label="Наверх"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
}
