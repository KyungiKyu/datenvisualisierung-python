
import { PlotViewer } from '../components/PlotViewer';
import { CodeBlock } from '../components/CodeBlock';
import { BusinessContext } from '../components/BusinessContext';

export const PandasPage = () => {
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">Pandas</h1>
        <p className="text-xl text-gray-500 max-w-3xl">Das Arbeitstier der Datenmanipulation. Während Visualisierung nicht der primäre Fokus ist, sind schnelle HTML-Tabellen für Reports essenziell.</p>
      </div>

      <BusinessContext
        title="Tabellen als 'Sicht' auf Daten?"
        narrative="Manchmal benötigt das Accounting-Team oder der Vorstand harte Zahlen anstatt bunter Graphen. Die Pandas `.describe()`-Methode und Pivot-Tabellen generieren perfekte, bereinigte HTML-Summaries direkt in Reports."
        decisionImpact="Die Tabellen zeigen eine exakte Aufschlüsselung des durchschnittlichen Umsatzes. Die Diskrepanz zwischen Free- und Enterprise-Kunden rechtfertigt höhere Investitionen ins Account-Management."
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="space-y-4">
          <PlotViewer title="DataFrame Description (Summary Statistics)" source="/plots/pandas_describe.html" type="html" height="400px" />
          <CodeBlock filename="describe.py" code={`import pandas as pd\n\ndata = pd.read_csv('daily_metrics.csv')\n\n# Generate HTML string with Tailwind classes\ndesc_html = data.describe().to_html(\n    classes='min-w-full divide-y divide-gray-200', \n    border=0\n)\n\nwith open('pandas_describe.html', 'w') as f:\n    f.write(desc_html)`} />
        </div>

        <div className="space-y-4">
          <PlotViewer title="Average LTV Pivot Table (Segment vs Device)" source="/plots/pandas_pivot.html" type="html" height="400px" />
          <CodeBlock filename="pivot.py" code={`import pandas as pd\n\nuser_data = pd.read_csv('user_data.csv')\n\npivot = pd.pivot_table(\n    user_data, values='LTV', \n    index='Segment', columns='Device', \n    aggfunc='mean'\n).round(2)\n\npivot_html = pivot.to_html(\n    classes='min-w-full divide-y divide-gray-200', \n    border=0\n)\n\nwith open('pandas_pivot.html', 'w') as f:\n    f.write(pivot_html)`} />
        </div>
      </div>
    </div>
  );
};
