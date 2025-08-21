import { LOCATIONS } from "@/lib/constants";
import { useLanguage } from "@/contexts/language-context";

interface LocationFilterProps {
  selectedLocation: string;
  onLocationChange: (location: string) => void;
}

export default function LocationFilter({ selectedLocation, onLocationChange }: LocationFilterProps) {
  const { t } = useLanguage();
  
  return (
    <div className="mt-8">
      <p className="text-sm font-semibold text-gray-500 mb-4">{t('hero.choose_destination')}</p>
    </div>
  );
}
