import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

/**
 * PedagogicalFormulaTable
 * A structured, clear table for learning formulas, magnitudes, and SI units.
 * Replaces bulleted lists to provide a better visual hierarchy for students.
 */
export const PedagogicalFormulaTable = ({ data = [], title }) => {
  if (!data || data.length === 0) return null;

  const renderMath = (latexStr) => {
    if (!latexStr) return null;
    // Basic text math (like m/s^2) can be converted or left alone, 
    // but we'll try to render it if it looks like latex, else just string
    try {
      const html = katex.renderToString(latexStr, {
        displayMode: false,
        throwOnError: false
      });
      return <span dangerouslySetInnerHTML={{ __html: html }} />;
    } catch (e) {
      return <span>{latexStr}</span>;
    }
  };

  return (
    <div style={{ margin: '1.5rem 0' }}>
      {title && (
        <h4 style={{ 
          marginBottom: '0.75rem', 
          color: 'var(--text-primary)',
          fontSize: '1.1rem',
          fontWeight: '700'
        }}>
          {title}
        </h4>
      )}
      <div className="pedagogical-table-wrapper">
        <table className="pedagogical-table">
          <thead>
            <tr>
              <th style={{ width: '5%' }}>N°</th>
              <th style={{ width: '15%' }}>Magnitud</th>
              <th style={{ width: '25%' }}>Fórmula</th>
              <th style={{ width: '20%' }}>Unidad S.I.</th>
              <th style={{ width: '10%' }}>Símbolo</th>
              <th style={{ width: '25%' }}>Definición / Nota</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td style={{ fontWeight: '700', color: 'var(--accent-color)' }}>{index + 1}</td>
                <td style={{ fontWeight: '600' }}>{row.magnitud}</td>
                <td>
                  <div className="pedagogical-formula-cell">
                    {renderMath(row.formula_latex || row.formula)}
                  </div>
                </td>
                <td>{row.unidad}</td>
                <td style={{ fontWeight: 'bold' }}>{renderMath(row.simbolo_latex || row.simbolo)}</td>
                <td style={{ fontSize: '0.85rem' }}>{row.definicion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PedagogicalFormulaTable;
