
import { PlotViewer } from '../components/PlotViewer';
import { CodeBlock } from '../components/CodeBlock';
import { BusinessContext } from '../components/BusinessContext';

export const SeabornPage = () => {
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">Seaborn</h1>
        <p className="text-xl text-gray-500 max-w-3xl">Statistische Visualisierungen leicht gemacht. Auf Matplotlib aufbauend bietet es schönere Defaults und integriert sich nahtlos in Pandas.</p>
      </div>

      <BusinessContext
        title="Wieso Seaborn für komplexe Datenbeziehungen?"
        narrative="Wir nutzen Seaborn für Explorative Datenanalyse (EDA). Mit nur einer Zeile Code können wir komplexe Beziehungsgeflechte (Pairplots) oder Verteilungen über mehrere Dimensionen (Violinplots) abbilden."
        decisionImpact="Der Violinplot zeigt, dass Desktop-Nutzer im 'Pro'- und 'Enterprise'-Segment einen signifikant höheren Lifetime Value (LTV) aufweisen als Mobile-Nutzer. Die Strategie sollte sich auf Desktop-zentrierte B2B-Sales konzentrieren."
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="space-y-4">
          <PlotViewer title="LTV Distribution by Segment and Device" source="/plots/sns_violin.png" type="image" height="500px" />
          <CodeBlock filename="violinplot.py" code={`import seaborn as sns\nimport matplotlib.pyplot as plt\nimport pandas as pd\n\nsns.set_theme(style="whitegrid")\nuser_data = pd.read_csv('user_data.csv')\n\n# Erstelle einen Violinplot für LTV-Verteilung nach Segment und Gerät\nplt.figure(figsize=(10, 6))\nsns.violinplot(x="Segment", y="LTV", hue="Device", \n               data=user_data, split=False, inner="quart", \n               palette="muted")\n\nplt.title('LTV Distribution by Segment and Device')\nplt.tight_layout()\nplt.savefig('sns_violin.png')`} />
        </div>

        <div className="space-y-4">
          <PlotViewer title="Pairwise Relationships of Key Metrics" source="/plots/sns_pairplot.png" type="image" height="500px" />
          <CodeBlock filename="pairplot.py" code={`import seaborn as sns\nimport matplotlib.pyplot as plt\nimport pandas as pd\n\ndata = pd.read_csv('daily_metrics.csv')\n\n# Reduziere Datenmenge für bessere Performance\nsample_data = data[['Daily_Users', 'Marketing_Spend', \n                    'Revenue', 'Conversion_Rate']].sample(100)\n\n# Erstelle einen Pairplot zur Analyse der paarweisen Beziehungen\ng = sns.pairplot(sample_data, diag_kind="kde")\ng.fig.suptitle("Pairwise Relationships of Key Metrics", y=1.02)\n\ng.savefig('sns_pairplot.png')`} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="space-y-4">
          <PlotViewer title="Marketing Spend vs Revenue" source="/plots/sns_joint.png" type="image" height="400px" />
          <CodeBlock filename="jointplot.py" code={`import seaborn as sns\nimport matplotlib.pyplot as plt\nimport pandas as pd\n\nsns.set_theme(style="whitegrid")\ndata = pd.read_csv('daily_metrics.csv')\n\n# Zeigt Regression und Randverteilungen an\ng = sns.jointplot(x="Marketing_Spend", y="Revenue", \n                  data=data, kind="reg", color="m", height=7)\ng.fig.suptitle("Marketing Spend vs Revenue", y=1.02)\n\ng.savefig('sns_joint.png')`} />
        </div>
        <div className="space-y-4">
          <PlotViewer title="Satisfaction Score by Device" source="/plots/sns_categorical.png" type="image" height="400px" />
          <CodeBlock filename="categorical_plot.py" code={`import seaborn as sns\nimport matplotlib.pyplot as plt\nimport pandas as pd\n\nsns.set_theme(style="whitegrid")\nuser_data = pd.read_csv('user_data.csv')\n\nplt.figure(figsize=(10, 6))\n# Kombiniert Boxplot für die Verteilung\nsns.boxplot(x="Device", y="Satisfaction_Score", data=user_data, \n            whis=[0, 100], width=.6, palette="vlag")\n\n# Und Stripplot für die einzelnen Datenpunkte\nsns.stripplot(x="Device", y="Satisfaction_Score", data=user_data, \n              size=4, color=".3", linewidth=0)\n\nplt.title('Satisfaction Score by Device')\nplt.tight_layout()\nplt.savefig('sns_categorical.png')`} />
        </div>
      </div>
    </div>
  );
};
