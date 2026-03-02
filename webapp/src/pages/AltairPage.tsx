
import { PlotViewer } from '../components/PlotViewer';
import { CodeBlock } from '../components/CodeBlock';
import { BusinessContext } from '../components/BusinessContext';

export const AltairPage = () => {
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">Altair</h1>
        <p className="text-xl text-gray-500 max-w-3xl">Das Juwel der deklarativen Visualisierung. Basierend auf Vega und Vega-Lite verknüpft es visuelle Kanäle konsistent mit Daten anstatt imperativ Plotting-Befehle zu nutzen.</p>
      </div>

      <BusinessContext
        title="Warum ein deklarativer Ansatz?"
        narrative="Altair zwingt uns, strukturiert über das Mapping von Daten auf visuelle Elemente nachzudenken. Wir beschreiben, *was* die Grafik zeigen soll, nicht *wie* sie gezeichnet wird. Das verhindert visuelle 'Lügen' und inkonsistente Farben."
        decisionImpact="Die vierdimensionale Kodierung (x, y, Farbe, Tooltip) erlaubt Analysten schnellere Insights als gestapelte Bar-Charts. Eine Senkung des Bounce-Rates hat bei extrem hohen Marketingausgaben dennoch den stärksten Hebel auf den Umsatz."
      />

      <div className="space-y-4">
        <PlotViewer title="Declarative Scatter Plot (Marketing Spend, Revenue, Bounce Rate)" source="/plots/altair_declarative.html" type="html" height="500px" />
        <CodeBlock filename="altair_plot.py" code={`import altair as alt\nimport pandas as pd\n\ndata = pd.read_csv('daily_metrics.csv').sample(200)\n\n# Deklarativer Aufbau der Visualisierung (Chart -> Markierung -> Encoding)\nalt_chart = alt.Chart(data).mark_circle(size=60).encode(\n    # Mappe Datenfelder auf visuelle Kanäle\n    x=alt.X('Marketing_Spend', title='Marketing Spend'),\n    y=alt.Y('Revenue', title='Revenue'),\n    color=alt.Color('Bounce_Rate', scale=alt.Scale(scheme='viridis')),\n    tooltip=['Date', 'Marketing_Spend', 'Revenue', 'Bounce_Rate']\n).properties(\n    title='Declarative Scatter Plot: Spend vs Revenue',\n    width=600,\n    height=400\n).interactive() # Mache das Chart interaktiv (Zoom/Pan)\n\nalt_chart.save('altair_declarative.html')`} />
      </div>
    </div>
  );
};
