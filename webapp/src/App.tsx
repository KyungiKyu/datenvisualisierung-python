
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { LayoutDashboard, BarChart3, PieChart, ScatterChart, TrendingUp, Table as TableIcon, Layers } from 'lucide-react';

import { HomePage } from './pages/HomePage';
import { MatplotlibPage } from './pages/MatplotlibPage';
import { SeabornPage } from './pages/SeabornPage';
import { PlotlyPage } from './pages/PlotlyPage';
import { PandasPage } from './pages/PandasPage';
import { BokehPage } from './pages/BokehPage';
import { AltairPage } from './pages/AltairPage';

const navItems = [
  { path: '/', label: 'Overview', icon: <LayoutDashboard size={20} /> },
  { path: '/matplotlib', label: 'Matplotlib', icon: <BarChart3 size={20} /> },
  { path: '/seaborn', label: 'Seaborn', icon: <PieChart size={20} /> },
  { path: '/plotly', label: 'Plotly', icon: <ScatterChart size={20} /> },
  { path: '/pandas', label: 'Pandas', icon: <TableIcon size={20} /> },
  { path: '/bokeh', label: 'Bokeh', icon: <TrendingUp size={20} /> },
  { path: '/altair', label: 'Altair', icon: <Layers size={20} /> },
];

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden">
        {/* Sidebar Navigation */}
        <nav className="w-64 bg-white border-r border-gray-200 shadow-sm flex-shrink-0 flex-col hidden md:flex">
          <div className="p-6 border-b border-gray-100 bg-gray-50 flex items-center">
            <div className="w-8 h-8 rounded bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center mr-3 shadow-md">
              <span className="text-white font-bold">Py</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800 tracking-tight leading-tight">Dataviz App</h1>
              <p className="text-xs text-gray-500">Python Web Showcase</p>
            </div>
          </div>

          <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold shadow-sm border border-blue-100'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>

          <div className="p-4 border-t border-gray-100 text-xs text-center text-gray-400">
            Export Code on each Page
          </div>
        </nav>

        {/* Mobile Navigation Bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-2 z-50">
            {navItems.slice(0, 5).map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                        `flex flex-col items-center p-2 rounded-lg ${
                            isActive ? 'text-blue-600' : 'text-gray-500'
                        }`
                    }
                >
                    {item.icon}
                    <span className="text-[10px] mt-1">{item.label}</span>
                </NavLink>
            ))}
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50/50 p-6 md:p-10 mb-16 md:mb-0">
          <div className="max-w-6xl mx-auto">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/matplotlib" element={<MatplotlibPage />} />
              <Route path="/seaborn" element={<SeabornPage />} />
              <Route path="/plotly" element={<PlotlyPage />} />
              <Route path="/pandas" element={<PandasPage />} />
              <Route path="/bokeh" element={<BokehPage />} />
              <Route path="/altair" element={<AltairPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
