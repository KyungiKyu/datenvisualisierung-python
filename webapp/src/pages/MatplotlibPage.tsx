
import { PlotViewer } from '../components/PlotViewer';
import { CodeBlock } from '../components/CodeBlock';
import { BusinessContext } from '../components/BusinessContext';

export const MatplotlibPage = () => {
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">Matplotlib</h1>
        <p className="text-xl text-gray-500 max-w-3xl">Das Schweizer Taschenmesser der Python-Visualisierung. Ideal für präzise Kontrolle über jeden Aspekt eines statischen Graphen.</p>
      </div>

      <BusinessContext
        title="Warum Matplotlib für Basis-Metriken?"
        narrative="Matplotlib ist der Industriestandard. Wir nutzen es für statische Berichte (PDFs/E-Mails), bei denen Interaktivität nicht möglich ist. Die Kontrolle über Layout und Styling garantiert CI/CD konforme Reports."
        decisionImpact="Die Heatmap deckt auf, dass Marketingausgaben stark mit Neuanmeldungen korrelieren, jedoch die Bounce-Rate unabhängig davon bleibt. Strategie: Fokus auf zielgerichtetere Werbung, um Bounce-Rate zu senken."
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="space-y-4">
          <PlotViewer title="Correlation Matrix of Daily Metrics" source="/plots/mpl_heatmap.png" type="image" height="450px" />
          <CodeBlock filename="heatmap.py" code={`import matplotlib.pyplot as plt\nimport pandas as pd\n\ndata = pd.read_csv('daily_metrics.csv')\n\n# Berechne die Korrelationsmatrix für numerische Spalten\nnumeric_data = data[['Daily_Users', 'New_Signups', 'Marketing_Spend', 'Revenue', 'Bounce_Rate', 'Conversion_Rate']]\ncorr = numeric_data.corr()\n\n# Visualisiere die Korrelationen als Heatmap\nplt.figure(figsize=(8, 6))\nplt.imshow(corr, cmap='coolwarm', interpolation='none', aspect='auto')\nplt.colorbar()\nplt.xticks(range(len(corr)), corr.columns, rotation=45, ha='right')\nplt.yticks(range(len(corr)), corr.columns)\nplt.title('Correlation Matrix of Daily Metrics')\nplt.tight_layout()\nplt.savefig('mpl_heatmap.png')`} />
        </div>

        <div className="space-y-4">
          <PlotViewer title="Lifetime Value (LTV) by Segment" source="/plots/mpl_box.png" type="image" height="450px" />
          <CodeBlock filename="boxplot.py" code={`import matplotlib.pyplot as plt\nimport pandas as pd\n\nuser_data = pd.read_csv('user_data.csv')\n\n# Erstelle Boxplots des Lifetime Value gruppiert nach Kundensegment\nplt.figure(figsize=(8, 6))\nuser_data.boxplot(column='LTV', by='Segment', grid=False, figsize=(8,6))\nplt.title('Lifetime Value (LTV) by Segment')\nplt.suptitle('') # Entferne automatischen übergeordneten Titel\nplt.ylabel('LTV ($)')\nplt.tight_layout()\nplt.savefig('mpl_box.png')`} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div className="space-y-4">
          <PlotViewer title="Daily Active Users" source="/plots/mpl_line.png" type="image" height="300px" />
          <CodeBlock filename="line_plot.py" code={`import matplotlib.pyplot as plt\nimport pandas as pd\n\nplt.style.use('bmh')\ndata = pd.read_csv('daily_metrics.csv')\n\n# Erstelle einen Liniengraph für tägliche Nutzer\nplt.figure(figsize=(10, 5))\nplt.plot(data['Date'], data['Daily_Users'], \n         color='blue', alpha=0.7)\nplt.title('Daily Active Users (2023)')\nplt.xlabel('Date')\nplt.ylabel('Users')\nplt.grid(True)\nplt.tight_layout()\nplt.savefig('mpl_line.png')`} />
        </div>
        <div className="space-y-4">
          <PlotViewer title="Average Daily Signups" source="/plots/mpl_bar.png" type="image" height="300px" />
          <CodeBlock filename="bar_chart.py" code={`import matplotlib.pyplot as plt\nimport pandas as pd\n\ndata = pd.read_csv('daily_metrics.csv')\n\n# Gruppiere Signups nach Wochentag\ndow_signups = data.groupby('Day_of_Week')['New_Signups'].mean().reindex(\n    ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']\n)\n\n# Erstelle ein Balkendiagramm\nplt.figure(figsize=(8, 5))\ndow_signups.plot(kind='bar', color='skyblue')\nplt.title('Average Daily Signups by Day of Week')\nplt.ylabel('Avg Signups')\nplt.tight_layout()\nplt.savefig('mpl_bar.png')`} />
        </div>
        <div className="space-y-4">
          <PlotViewer title="Customer Segments" source="/plots/mpl_pie.png" type="image" height="300px" />
          <CodeBlock filename="pie_chart.py" code={`import matplotlib.pyplot as plt\nimport pandas as pd\n\nuser_data = pd.read_csv('user_data.csv')\nsegment_counts = user_data['Segment'].value_counts()\n\n# Erstelle ein Tortendiagramm für Kundensegmente\nplt.figure(figsize=(6, 6))\nplt.pie(segment_counts, labels=segment_counts.index, \n        autopct='%1.1f%%', startangle=140, \n        colors=['#ff9999','#66b3ff','#99ff99','#ffcc99'])\nplt.title('Customer Segments Distribution')\nplt.tight_layout()\nplt.savefig('mpl_pie.png')`} />
        </div>
        <div className="space-y-4">
          <PlotViewer title="Marketing Spend vs Revenue" source="/plots/mpl_scatter.png" type="image" height="300px" />
          <CodeBlock filename="scatter_plot.py" code={`import matplotlib.pyplot as plt\nimport pandas as pd\n\ndata = pd.read_csv('daily_metrics.csv')\n\n# Erstelle ein Streudiagramm für Ausgaben vs. Einnahmen\nplt.figure(figsize=(8, 6))\nplt.scatter(data['Marketing_Spend'], data['Revenue'], \n            alpha=0.5, color='purple')\nplt.title('Marketing Spend vs Revenue')\nplt.xlabel('Marketing Spend ($)')\nplt.ylabel('Revenue ($)')\nplt.grid(True)\nplt.tight_layout()\nplt.savefig('mpl_scatter.png')`} />
        </div>
        <div className="space-y-4">
          <PlotViewer title="Satisfaction Score Distribution" source="/plots/mpl_hist.png" type="image" height="300px" />
          <CodeBlock filename="histogram.py" code={`import matplotlib.pyplot as plt\nimport pandas as pd\n\nuser_data = pd.read_csv('user_data.csv')\n\n# Erstelle ein Histogramm für Zufriedenheitswerte\nplt.figure(figsize=(8, 5))\nplt.hist(user_data['Satisfaction_Score'], bins=20, \n         color='green', edgecolor='black', alpha=0.7)\nplt.title('Distribution of Satisfaction Scores')\nplt.xlabel('Score (1-10)')\nplt.ylabel('Frequency')\nplt.tight_layout()\nplt.savefig('mpl_hist.png')`} />
        </div>
      </div>
    </div>
  );
};
