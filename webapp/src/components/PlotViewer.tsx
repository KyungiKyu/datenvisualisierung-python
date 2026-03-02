import { useState, useEffect } from 'react';
import { Maximize2, Minimize2, ExternalLink } from 'lucide-react';

interface PlotViewerProps {
  title: string;
  source: string;
  type: 'image' | 'html';
  height?: string;
}

export const PlotViewer: React.FC<PlotViewerProps> = ({ title, source, type, height = '400px' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [htmlContent, setHtmlContent] = useState<string | null>(null);

  useEffect(() => {
    // If it's a small HTML file like pandas describe, we can fetch and inline it
    // But for plotly/bokeh, iframe is safer. Here we'll stick to iframe for all HTML to avoid script execution issues
    // Exception: simple HTML tables that don't need scripts
    if (type === 'html' && source.includes('pandas_')) {
      fetch(source)
        .then(res => res.text())
        .then(text => setHtmlContent(text))
        .catch(err => console.error("Error loading HTML content:", err));
    }
  }, [type, source]);

  return (
    <div className={`relative bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden flex flex-col transition-all duration-300 ${isExpanded ? 'fixed inset-4 z-50 shadow-2xl' : 'w-full'}`}>
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100 bg-gray-50">
        <h3 className="font-semibold text-gray-800 truncate">{title}</h3>
        <div className="flex space-x-2">
          {type === 'html' && !source.includes('pandas_') && (
            <a
              href={source}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              title="Open in new tab"
            >
              <ExternalLink size={18} />
            </a>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            title={isExpanded ? "Minimize" : "Maximize"}
          >
            {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>
      </div>

      <div
        className="relative bg-gray-50/50 p-2 flex-grow overflow-auto"
        style={{ height: isExpanded ? 'calc(100% - 53px)' : height }}
      >
        {type === 'image' ? (
          <div className="w-full h-full flex items-center justify-center bg-white rounded shadow-sm overflow-hidden">
             <img
               src={source}
               alt={title}
               className="max-w-full max-h-full object-contain"
             />
          </div>
        ) : htmlContent ? (
          <div className="w-full h-full bg-white rounded shadow-sm overflow-auto p-4" dangerouslySetInnerHTML={{ __html: htmlContent }} />
        ) : (
          <iframe
            src={source}
            title={title}
            className="w-full h-full border-0 bg-white rounded shadow-sm"
            sandbox="allow-scripts allow-same-origin allow-popups"
          />
        )}
      </div>
    </div>
  );
};
