
import { Lightbulb, Target, ArrowRight } from 'lucide-react';

interface BusinessContextProps {
  title: string;
  narrative: string;
  decisionImpact: string;
}

export const BusinessContext: React.FC<BusinessContextProps> = ({ title, narrative, decisionImpact }) => {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-xl p-6 shadow-sm my-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Lightbulb size={120} />
      </div>

      <div className="flex items-center space-x-3 mb-4 relative z-10">
        <div className="p-2 bg-indigo-600 rounded-lg shadow-md">
          <Target className="text-white" size={24} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">{title}</h2>
      </div>

      <div className="space-y-4 text-gray-700 relative z-10">
        <div>
          <h3 className="font-semibold text-indigo-900 mb-1 flex items-center">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span>
            Warum zeigen wir das so?
          </h3>
          <p className="leading-relaxed bg-white/60 p-3 rounded-lg border border-white backdrop-blur-sm">
            {narrative}
          </p>
        </div>

        <div className="bg-indigo-900/5 p-4 rounded-lg border-l-4 border-indigo-500">
          <h3 className="font-semibold text-indigo-900 mb-2 flex items-center">
            <ArrowRight size={16} className="mr-2 text-indigo-600" />
            Strategische Entscheidungsgrundlage
          </h3>
          <p className="font-medium text-gray-800 italic">
            "{decisionImpact}"
          </p>
        </div>
      </div>
    </div>
  );
};
