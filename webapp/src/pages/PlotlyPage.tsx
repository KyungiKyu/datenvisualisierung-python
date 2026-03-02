
import { PlotViewer } from '../components/PlotViewer';
import { CodeBlock } from '../components/CodeBlock';
import { BusinessContext } from '../components/BusinessContext';

export const PlotlyPage = () => {
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">Plotly</h1>
        <p className="text-xl text-gray-500 max-w-3xl">Das Kraftpaket für interaktive, web-basierte Dashboards und 3D-Visualisierungen. Ideal für Präsentationen und C-Level Dashboards.</p>
      </div>

      <BusinessContext
        title="Warum Plotly für Stakeholder?"
        narrative="Das Management-Team muss Daten aus verschiedenen Blickwinkeln betrachten können. Interaktive 3D-Scatterplots oder Dashboards erlauben Filterung, Zooming und Hovering ohne erneute Berechnung durch einen Data Scientist."
        decisionImpact="Die 3D-Darstellung zeigt deutlich die Cluster von High-Revenue-Tagen. Ein hohes Marketingbudget führt nicht zwingend zu höheren Einnahmen, wenn die Conversion-Rate niedrig ist. Budget-Reallokation erforderlich."
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="space-y-4">
          <PlotViewer title="3D View: Users, Spend, and Revenue" source="/plots/plotly_3d.html" type="html" height="500px" />
          <CodeBlock filename="plotly_3d.py" code={`import plotly.express as px\nimport pandas as pd\n\ndata = pd.read_csv('daily_metrics.csv')\n\nfig_3d = px.scatter_3d(\n    data, x='Daily_Users', y='Marketing_Spend', z='Revenue',\n    color='Conversion_Rate', size='New_Signups', opacity=0.7,\n    title='3D View: Users, Spend, and Revenue'\n)\n\nfig_3d.write_html('plotly_3d.html')`} />
        </div>

        <div className="space-y-4">
          <PlotViewer title="Revenue vs Users over Time (Animation)" source="/plots/plotly_anim.html" type="html" height="500px" />
          <CodeBlock filename="plotly_animation.py" code={`import plotly.express as px\nimport pandas as pd\n\n# Assuming anim_data is pre-processed\nfig_anim = px.scatter(\n    anim_data, x="Daily_Users", y="Revenue", \n    animation_frame="Month", animation_group="Type",\n    size="Marketing_Spend", color="Type", hover_name="Type",\n    log_x=False, size_max=55, range_x=[0, 10000], range_y=[0, 30000],\n    title='Revenue vs Users over Time'\n)\n\nfig_anim.write_html('plotly_anim.html')`} />
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <PlotViewer title="Executive Dashboard Overview" source="/plots/plotly_dashboard.html" type="html" height="600px" />
      </div>
    </div>
  );
};
