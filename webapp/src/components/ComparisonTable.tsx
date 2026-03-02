
import { Check, X, Info } from 'lucide-react';

const libraries = [
  { name: 'Matplotlib', pros: ['Umfassend', 'Standard in Python', 'Feinkörnige Kontrolle'], cons: ['Komplexe API', 'Statisches Design', 'Viel Code nötig'], useCase: 'Grundlegende statische Publikationsgrafiken' },
  { name: 'Seaborn', pros: ['Schöne Defaults', 'Statistische Plots', 'Weniger Code als Matplotlib'], cons: ['Nicht interaktiv', 'Schwer stark anzupassen', 'Performance bei Big Data'], useCase: 'Statistische Datenexploration' },
  { name: 'Plotly', pros: ['Interaktiv', '3D Plots', 'Dashboards fähig', 'Web-optimiert'], cons: ['Große Dateigrößen', 'Render-Performance im DOM', 'Komplexere Syntax für Customizing'], useCase: 'Interaktive Web-Dashboards' },
  { name: 'Pandas', pros: ['Extrem schnell', 'Eingebaut in DF', 'Tabellarische Ansicht'], cons: ['Sehr limitiert optisch', 'Nur Basic-Plots', 'Keine 3D/Maps'], useCase: 'Schnelle EDA (Exploratory Data Analysis)' },
  { name: 'Bokeh', pros: ['Für Webbrowser gebaut', 'Streaming Data', 'Große Datensätze'], cons: ['Steile Lernkurve', 'Große Outputs', 'Spezifische API'], useCase: 'Interaktive Apps & Streaming' },
  { name: 'Altair', pros: ['Deklarative Syntax', 'Gut für JSON', 'Konsistent'], cons: ['Limitierte Plot-Typen (kein 3D)', 'Daten-Größenlimit (Standard 5000 Rows)', 'Benötigt Vega-Lite'], useCase: 'Konsistente, deklarative Web-Visualisierungen' }
];

export const ComparisonTable: React.FC = () => {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-100 my-8">
      <div className="bg-gray-800 px-6 py-4 flex items-center justify-between">
        <h3 className="text-xl font-bold text-white flex items-center">
          <Info className="mr-3 text-blue-400" /> Python Visualization Ecosystem
        </h3>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Bibliothek</th>
            <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Vorteile (Pros)</th>
            <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Nachteile (Cons)</th>
            <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Idealer Use Case</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {libraries.map((lib, idx) => (
            <tr key={lib.name} className={`hover:bg-blue-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-blue-100 text-blue-800 shadow-sm">
                  {lib.name}
                </span>
              </td>
              <td className="px-6 py-4">
                <ul className="space-y-1">
                  {lib.pros.map(pro => (
                    <li key={pro} className="flex items-start text-sm text-gray-600">
                      <Check size={16} className="mr-1.5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-6 py-4">
                <ul className="space-y-1">
                  {lib.cons.map(con => (
                    <li key={con} className="flex items-start text-sm text-gray-600">
                      <X size={16} className="mr-1.5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-6 py-4 text-sm text-gray-800 font-medium italic border-l border-dashed border-gray-200 bg-gray-50/50">
                {lib.useCase}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
