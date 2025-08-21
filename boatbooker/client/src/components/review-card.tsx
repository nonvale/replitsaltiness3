import type { Review } from "@shared/schema";

interface ReviewCardProps {
  review: Review;
  index: number;
}

export default function ReviewCard({ review, index }: ReviewCardProps) {
  const getCardStyle = (index: number) => {
    const styles = [
      "bg-ocean-light", // Light blue background
      "bg-white border-2 border-ocean-light", // White with border  
      "bg-gradient-ocean text-white", // Ocean gradient
      "bg-ocean-light", // Light blue background
      "bg-white border-2 border-ocean-light", // White with border
      "bg-ocean-light" // Light blue background
    ];
    return styles[index % styles.length];
  };

  const getGeometricElement = (index: number) => {
    const elements = [
      "w-16 h-16 bg-ocean-blue opacity-10 geometric-circle transform translate-x-8 -translate-y-8",
      "w-12 h-12 bg-ocean-cyan opacity-20 geometric-square transform translate-x-6 -translate-y-6", 
      "w-20 h-20 bg-white opacity-10 geometric-circle transform translate-x-10 -translate-y-10",
      "w-14 h-14 bg-sand opacity-60 geometric-square transform translate-x-7 -translate-y-7",
      "w-10 h-10 bg-ocean-blue opacity-20 geometric-circle transform translate-x-5 -translate-y-5",
      "w-16 h-16 bg-ocean-cyan opacity-10 geometric-circle transform translate-x-8 -translate-y-8"
    ];
    return elements[index % elements.length];
  };

  const getInitialColor = (index: number) => {
    const colors = [
      "bg-ocean-blue",
      "bg-ocean-cyan", 
      "bg-white/20",
      "bg-sand",
      "bg-green-500",
      "bg-purple-500"
    ];
    return colors[index % colors.length];
  };

  const cardStyle = getCardStyle(index);
  const geometricElement = getGeometricElement(index);
  const initialColor = getInitialColor(index);
  const isGradient = cardStyle.includes("gradient");
  const textColor = isGradient ? "text-white" : "text-gray-700";
  const nameColor = isGradient ? "text-white" : "text-ocean-navy";

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('it-IT', {
      month: 'long',
      year: 'numeric'
    }).format(new Date(date));
  };

  const getYachtName = (yachtId?: string) => {
    // This would typically come from yacht data, but we'll use a simple mapping
    const yachtNames: Record<string, string> = {
      "sunseeker-68s": "SunSeeker 68S",
      "gozzo-mimi": "Gozzo Tradizionale", 
      "cranchi-z35": "Cranchi Z35",
      "abacus-62": "Abacus 62",
      "jeanneau-prestige": "Jeanneau Prestige 42",
      "aventura-34": "Tour Personalizzato"
    };
    return yachtId ? yachtNames[yachtId] || "Yacht Experience" : "Tour Personalizzato";
  };

  return (
    <div className={`review-card ${cardStyle} rounded-3xl p-8 relative shapes-card-hover`}>
      {/* Geometric Element */}
      <div className={`absolute top-0 right-0 ${geometricElement}`}></div>
      
      <div className="flex items-center mb-6">
        <div className={`w-12 h-12 ${initialColor} rounded-full flex items-center justify-center ${isGradient ? 'text-white' : 'text-white'} font-bold mr-4`}>
          {review.customerName.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className={`font-semibold ${nameColor}`}>{review.customerName}</div>
          <div className={`text-sm ${isGradient ? 'opacity-90' : 'text-gray-600'}`}>
            {formatDate(review.date)}
          </div>
        </div>
      </div>
      
      <div className="flex items-center mb-4">
        <div className={`flex ${isGradient ? 'text-yellow-300' : 'text-yellow-400'}`}>
          {[...Array(5)].map((_, i) => (
            <i key={i} className={`fas fa-star ${i < review.rating ? '' : 'opacity-30'}`}></i>
          ))}
        </div>
      </div>
      
      <p className={`${textColor} leading-relaxed mb-4 ${isGradient ? 'opacity-95' : ''}`}>
        "{review.comment}"
      </p>
      
      <div className={`text-sm font-semibold ${isGradient ? 'opacity-90' : 'text-ocean-blue'}`}>
        <i className="fas fa-ship mr-1"></i>
        {getYachtName(review.yachtId)}
      </div>
    </div>
  );
}
