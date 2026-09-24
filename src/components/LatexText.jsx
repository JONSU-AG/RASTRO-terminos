// src/components/LatexText.jsx
import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

export function LatexText({ text, style = {} }) {
  if (!text) return null;
  const hasLatex = text.includes('$') || text.includes('\\');
  if (!hasLatex) {
    return <span style={style}>{text}</span>;
  }

  const parts = text.split(/(\$[^$]+\$)/g);
  return (
    <span style={style}>
      {parts.map((part, i) => {
        if (part.startsWith('$') && part.endsWith('$')) {
          const math = part.slice(1, -1);
          try {
            const html = katex.renderToString(math, { throwOnError: false });
            return <span key={i} dangerouslySetInnerHTML={{ __html: html }} />;
          } catch {
            return <span key={i}>{part}</span>;
          }
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}
