import os
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px
import plotly.graph_objects as go
from bokeh.plotting import figure, output_file, save
from bokeh.models import ColumnDataSource, HoverTool
import altair as alt

# Set output directory
OUTPUT_DIR = "webapp/public/plots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# 1. Generate Dataset (E-Commerce/SaaS Analytics)
np.random.seed(42)
dates = pd.date_range(start='2023-01-01', periods=365, freq='D')
n = len(dates)

# Simulated metrics
data = pd.DataFrame({
    'Date': dates,
    'Daily_Users': np.random.normal(5000, 500, n).astype(int),
    'New_Signups': np.random.normal(200, 30, n).astype(int),
    'Marketing_Spend': np.random.uniform(1000, 5000, n),
    'Revenue': np.random.normal(15000, 2000, n),
    'Bounce_Rate': np.random.uniform(30, 60, n),
    'Day_of_Week': dates.day_name()
})

# Add some trend and seasonality
data['Daily_Users'] += (np.sin(np.arange(n) * 2 * np.pi / 365) * 1000).astype(int)
data['Revenue'] += data['Daily_Users'] * 2.5 + np.random.normal(0, 1000, n)
data['Conversion_Rate'] = (data['New_Signups'] / data['Daily_Users']) * 100

# Categorical data for users (e.g. from user db)
user_segments = ['Free', 'Basic', 'Pro', 'Enterprise']
n_users = 1000
user_data = pd.DataFrame({
    'User_ID': range(n_users),
    'Segment': np.random.choice(user_segments, n_users, p=[0.5, 0.3, 0.15, 0.05]),
    'LTV': np.random.exponential(scale=500, size=n_users),
    'Satisfaction_Score': np.random.normal(7.5, 1.5, n_users).clip(1, 10),
    'Device': np.random.choice(['Desktop', 'Mobile', 'Tablet'], n_users, p=[0.6, 0.35, 0.05])
})

data.to_csv(os.path.join(OUTPUT_DIR, 'daily_metrics.csv'), index=False)
user_data.to_csv(os.path.join(OUTPUT_DIR, 'user_data.csv'), index=False)

# ---------------------------------------------------------
# MATPLOTLIB
# ---------------------------------------------------------
plt.style.use('bmh') # Use a nice built-in style

# Line Plot (Users over time)
plt.figure(figsize=(10, 5))
plt.plot(data['Date'], data['Daily_Users'], color='blue', alpha=0.7)
plt.title('Daily Active Users (2023)')
plt.xlabel('Date')
plt.ylabel('Users')
plt.grid(True)
plt.tight_layout()
plt.savefig(os.path.join(OUTPUT_DIR, 'mpl_line.png'))
plt.close()

# Bar Chart (Signups by Day of Week)
plt.figure(figsize=(8, 5))
dow_signups = data.groupby('Day_of_Week')['New_Signups'].mean().reindex(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
dow_signups.plot(kind='bar', color='skyblue')
plt.title('Average Daily Signups by Day of Week')
plt.ylabel('Avg Signups')
plt.tight_layout()
plt.savefig(os.path.join(OUTPUT_DIR, 'mpl_bar.png'))
plt.close()

# Pie Chart (User Segments)
plt.figure(figsize=(6, 6))
segment_counts = user_data['Segment'].value_counts()
plt.pie(segment_counts, labels=segment_counts.index, autopct='%1.1f%%', startangle=140, colors=['#ff9999','#66b3ff','#99ff99','#ffcc99'])
plt.title('Customer Segments Distribution')
plt.tight_layout()
plt.savefig(os.path.join(OUTPUT_DIR, 'mpl_pie.png'))
plt.close()

# Scatter Plot (Marketing Spend vs Revenue)
plt.figure(figsize=(8, 6))
plt.scatter(data['Marketing_Spend'], data['Revenue'], alpha=0.5, color='purple')
plt.title('Marketing Spend vs Revenue')
plt.xlabel('Marketing Spend ($)')
plt.ylabel('Revenue ($)')
plt.grid(True)
plt.tight_layout()
plt.savefig(os.path.join(OUTPUT_DIR, 'mpl_scatter.png'))
plt.close()

# Histogram (Satisfaction Score)
plt.figure(figsize=(8, 5))
plt.hist(user_data['Satisfaction_Score'], bins=20, color='green', edgecolor='black', alpha=0.7)
plt.title('Distribution of Customer Satisfaction Scores')
plt.xlabel('Score (1-10)')
plt.ylabel('Frequency')
plt.tight_layout()
plt.savefig(os.path.join(OUTPUT_DIR, 'mpl_hist.png'))
plt.close()

# Boxplot (LTV by Segment)
plt.figure(figsize=(8, 6))
user_data.boxplot(column='LTV', by='Segment', grid=False, figsize=(8,6))
plt.title('Lifetime Value (LTV) by Segment')
plt.suptitle('') # Remove auto suptitle
plt.ylabel('LTV ($)')
plt.tight_layout()
plt.savefig(os.path.join(OUTPUT_DIR, 'mpl_box.png'))
plt.close()

# Heatmap (Correlation Matrix)
numeric_data = data[['Daily_Users', 'New_Signups', 'Marketing_Spend', 'Revenue', 'Bounce_Rate', 'Conversion_Rate']]
corr = numeric_data.corr()
plt.figure(figsize=(8, 6))
plt.imshow(corr, cmap='coolwarm', interpolation='none', aspect='auto')
plt.colorbar()
plt.xticks(range(len(corr)), corr.columns, rotation=45, ha='right')
plt.yticks(range(len(corr)), corr.columns)
plt.title('Correlation Matrix of Daily Metrics')
plt.tight_layout()
plt.savefig(os.path.join(OUTPUT_DIR, 'mpl_heatmap.png'))
plt.close()

# ---------------------------------------------------------
# SEABORN
# ---------------------------------------------------------
sns.set_theme(style="whitegrid")

# Pairplot
g = sns.pairplot(data[['Daily_Users', 'Marketing_Spend', 'Revenue', 'Conversion_Rate']].sample(100), diag_kind="kde")
g.fig.suptitle("Pairwise Relationships of Key Metrics (Sample)", y=1.02)
g.savefig(os.path.join(OUTPUT_DIR, 'sns_pairplot.png'))
plt.close()

# Violinplot
plt.figure(figsize=(10, 6))
sns.violinplot(x="Segment", y="LTV", hue="Device", data=user_data, split=False, inner="quart", palette="muted")
plt.title('LTV Distribution by Segment and Device')
plt.tight_layout()
plt.savefig(os.path.join(OUTPUT_DIR, 'sns_violin.png'))
plt.close()

# Jointplot
g = sns.jointplot(x="Marketing_Spend", y="Revenue", data=data, kind="reg", color="m", height=7)
g.fig.suptitle("Marketing Spend vs Revenue with Marginal Distributions", y=1.02)
g.savefig(os.path.join(OUTPUT_DIR, 'sns_joint.png'))
plt.close()

# Categorical (Swarmplot + Boxplot)
plt.figure(figsize=(10, 6))
sns.boxplot(x="Device", y="Satisfaction_Score", hue="Device", legend=False, data=user_data, whis=[0, 100], width=.6, palette="vlag")
sns.stripplot(x="Device", y="Satisfaction_Score", data=user_data, size=4, color=".3", linewidth=0)
plt.title('Satisfaction Score by Device')
plt.tight_layout()
plt.savefig(os.path.join(OUTPUT_DIR, 'sns_categorical.png'))
plt.close()

# ---------------------------------------------------------
# PLOTLY
# ---------------------------------------------------------

# Interactive 3D Plot
fig_3d = px.scatter_3d(data, x='Daily_Users', y='Marketing_Spend', z='Revenue',
                       color='Conversion_Rate', size='New_Signups', opacity=0.7,
                       title='3D View: Users, Spend, and Revenue')
fig_3d.write_html(os.path.join(OUTPUT_DIR, 'plotly_3d.html'))

# Dashboard-like layout (Subplots)
from plotly.subplots import make_subplots
fig_dash = make_subplots(rows=2, cols=2, subplot_titles=("Revenue Trend", "Signups vs Spend", "Bounce Rate Dist", "Segment Value"))
fig_dash.add_trace(go.Scatter(x=data['Date'], y=data['Revenue'], name="Revenue"), row=1, col=1)
fig_dash.add_trace(go.Scatter(x=data['Marketing_Spend'], y=data['New_Signups'], mode='markers', name="Signups/Spend"), row=1, col=2)
fig_dash.add_trace(go.Histogram(x=data['Bounce_Rate'], name="Bounce Rate"), row=2, col=1)
fig_dash.add_trace(go.Bar(x=user_data.groupby('Segment')['LTV'].mean().index, y=user_data.groupby('Segment')['LTV'].mean().values, name="Avg LTV"), row=2, col=2)
fig_dash.update_layout(title_text="Executive Dashboard Overview", height=600)
fig_dash.write_html(os.path.join(OUTPUT_DIR, 'plotly_dashboard.html'))

# Animation
# Create a simpler aggregated dataset for animation
monthly_data = data.select_dtypes(include=[np.number]).set_index(data['Date']).resample('ME').mean().reset_index()
monthly_data['Month'] = monthly_data['Date'].dt.strftime('%Y-%m')
# Duplicate some data to simulate categories over time for animation
anim_data = pd.DataFrame()
for segment in ['Free', 'Paid']:
    temp = monthly_data.copy()
    temp['Type'] = segment
    if segment == 'Paid':
        temp['Revenue'] = temp['Revenue'] * 1.5
        temp['Daily_Users'] = temp['Daily_Users'] * 0.4
    anim_data = pd.concat([anim_data, temp])

fig_anim = px.scatter(anim_data, x="Daily_Users", y="Revenue", animation_frame="Month", animation_group="Type",
                      size="Marketing_Spend", color="Type", hover_name="Type",
                      log_x=False, size_max=55, range_x=[0, 10000], range_y=[0, 30000],
                      title='Revenue vs Users over Time')
fig_anim.write_html(os.path.join(OUTPUT_DIR, 'plotly_anim.html'))


# ---------------------------------------------------------
# PANDAS (HTML Output)
# ---------------------------------------------------------
# Describe table
desc_html = data.describe().to_html(classes='min-w-full divide-y divide-gray-200', border=0)
with open(os.path.join(OUTPUT_DIR, 'pandas_describe.html'), 'w') as f:
    f.write(desc_html)

# Pivot table
pivot = pd.pivot_table(user_data, values='LTV', index='Segment', columns='Device', aggfunc='mean').round(2)
pivot_html = pivot.to_html(classes='min-w-full divide-y divide-gray-200', border=0)
with open(os.path.join(OUTPUT_DIR, 'pandas_pivot.html'), 'w') as f:
    f.write(pivot_html)


# ---------------------------------------------------------
# BOKEH
# ---------------------------------------------------------
output_file(os.path.join(OUTPUT_DIR, "bokeh_interactive.html"), title="Bokeh Interactive Plot")
source = ColumnDataSource(data)

p = figure(title="Interactive Revenue & Conversion Analysis", x_axis_label="Date", y_axis_label="Revenue ($)",
           x_axis_type="datetime", width=800, height=400, tools="pan,wheel_zoom,box_zoom,reset,save")

p.line(x='Date', y='Revenue', source=source, legend_label="Revenue", line_width=2, color="blue")
p.circle(x='Date', y='Revenue', source=source, size=5, color="navy", alpha=0.5)

# Add hover tool
hover = HoverTool()
hover.tooltips = [
    ("Date", "@Date{%F}"),
    ("Revenue", "$@Revenue{0,0.00}"),
    ("Conversion", "@Conversion_Rate{0.0}%")
]
hover.formatters = {"@Date": "datetime"}
p.add_tools(hover)

p.legend.location = "top_left"
save(p)


# ---------------------------------------------------------
# ALTAIR
# ---------------------------------------------------------
# Reduce data size for Altair to avoid MaxRowsError
sample_data = data.sample(200)

alt_chart = alt.Chart(sample_data).mark_circle(size=60).encode(
    x=alt.X('Marketing_Spend', title='Marketing Spend'),
    y=alt.Y('Revenue', title='Revenue'),
    color=alt.Color('Bounce_Rate', scale=alt.Scale(scheme='viridis'), title='Bounce Rate'),
    tooltip=['Date', 'Marketing_Spend', 'Revenue', 'Bounce_Rate']
).properties(
    title='Declarative Scatter Plot: Spend vs Revenue',
    width=600,
    height=400
).interactive()

alt_chart.save(os.path.join(OUTPUT_DIR, 'altair_declarative.html'))

print("All assets generated successfully in", OUTPUT_DIR)
