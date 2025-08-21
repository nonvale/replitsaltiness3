import { useLanguage } from '@/contexts/language-context';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center bg-ocean-light rounded-full p-1">
      <button
        onClick={() => setLanguage('it')}
        className={`px-3 py-1 rounded-full text-sm font-semibold transition-all ${
          language === 'it'
            ? 'bg-ocean-blue text-white shadow-sm'
            : 'text-ocean-blue hover:bg-white'
        }`}
      >
        IT
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-full text-sm font-semibold transition-all ${
          language === 'en'
            ? 'bg-ocean-blue text-white shadow-sm'
            : 'text-ocean-blue hover:bg-white'
        }`}
      >
        EN
      </button>
    </div>
  );
}