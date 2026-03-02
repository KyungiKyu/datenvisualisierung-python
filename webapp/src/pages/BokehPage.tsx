
import { PlotViewer } from '../components/PlotViewer';
import { CodeBlock } from '../components/CodeBlock';
import { BusinessContext } from '../components/BusinessContext';

export const BokehPage = () => {
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">Bokeh</h1>
        <p className="text-xl text-gray-500 max-w-3xl">Gedacht für das Web, von Grund auf. Bokeh zielt auf elegante, interaktive Grafiken für moderne Webbrowser bei gigantischen Datensätzen ab.</p>
      </div>

      <BusinessContext
        title="Wann nutzt man Bokeh statt Plotly?"
        narrative="Bokeh entfaltet sein Potenzial bei extrem großen Datenmengen, da es Server-Streaming nativ unterstützt. Zudem bietet die Custom-Javascript-Integration Möglichkeiten, die andere Pakete vermissen lassen."
        decisionImpact="Das feingranulare Reinzoomen in spezielle Wochen-Verläufe offenbart Mikrotrends in der Conversion-Rate, die beim monatlichen Aggregat untergingen."
      />

      <div className="space-y-4">
        <PlotViewer title="Interactive Revenue Analysis (Zoom, Pan, Hover)" source="/plots/bokeh_interactive.html" type="html" height="500px" />
        <CodeBlock filename="bokeh_plot.py" code={`from bokeh.plotting import figure, output_file, save\nfrom bokeh.models import ColumnDataSource, HoverTool\nimport pandas as pd\n\ndata = pd.read_csv('daily_metrics.csv')\ndata['Date'] = pd.to_datetime(data['Date'])\n\noutput_file("bokeh_interactive.html")\n# Datenquelle für interaktive Verknüpfungen (Hover, etc.)\nsource = ColumnDataSource(data)\n\n# Basis-Figure mit Tools definieren\np = figure(title="Revenue & Conversion Analysis", x_axis_type="datetime", \n           width=800, height=400, tools="pan,wheel_zoom,box_zoom,reset,save")\n\np.line(x='Date', y='Revenue', source=source, color="blue")\np.scatter(x='Date', y='Revenue', source=source, size=5, color="navy", alpha=0.5)\n\n# Hover-Tool für Data-Exploration hinzufügen\nhover = HoverTool(tooltips=[\n    ("Date", "@Date{%F}"),\n    ("Revenue", "$@Revenue{0,0.00}"),\n    ("Conversion", "@Conversion_Rate{0.0}%")\n], formatters={"@Date": "datetime"})\n\np.add_tools(hover)\nsave(p)`} />
      </div>
    </div>
  );
};
