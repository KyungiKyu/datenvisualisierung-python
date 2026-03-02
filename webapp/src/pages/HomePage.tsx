
import { ComparisonTable } from '../components/ComparisonTable';
import { ArrowRight, BarChart2, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <div className="space-y-12 animate-fade-in pb-12">
      <div className="bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-900 rounded-2xl p-8 md:p-12 text-white shadow-xl overflow-hidden relative">
        <div className="absolute -top-24 -right-24 opacity-10">
          <BarChart2 size={300} />
        </div>

        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Python Visualisierungs-<br/>Ökosystem
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
            Ein praktischer Leitfaden zur Auswahl des richtigen Werkzeugs für deine Daten. Erkunde echte Business-Szenarien anhand von simulierten E-Commerce/SaaS-Metriken.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/matplotlib" className="bg-white text-blue-900 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors flex items-center shadow-md">
              Start Exploring <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Das Datenset (SaaS & E-Commerce)</h2>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-600 mb-4 text-lg">
            Um realistische Vergleiche zu ziehen, generierten wir ein <strong>Synthetisches Business-Datenset</strong>, das ein Jahr (2023) an täglichen Metriken abbildet:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {['Daily Active Users & Signups', 'Marketing Spend ($)', 'Revenue ($) & Conversion Rate', 'Bounce Rate (%)', 'Customer Segments (Free, Pro, ...)', 'Lifetime Value (LTV) & Device Type'].map(metric => (
              <div key={metric} className="flex items-center space-x-2 bg-blue-50/50 p-3 rounded border border-blue-100">
                <CheckCircle size={18} className="text-blue-500 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-700">{metric}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Technologie-Vergleich</h2>
        <p className="text-gray-500 mb-6 text-lg">Eine schnelle Übersicht, welches Paket für welchen Zweck geeignet ist.</p>
        <ComparisonTable />
      </div>
    </div>
  );
};
