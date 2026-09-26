import React from 'react';
import { MorphIcon } from 'morphicons/react';

/**
 * Universal Morphing Stroke-Based Icons powered by morphicons with Spring Physics.
 * Seamless SVG interpolation across states without sudden layout shifts or visual jumps.
 * Designed with Emil Kowalski motion principles & zero emojis.
 */

// Lucide-compatible IconNodes for canonical 24x24 stroke icons
export const MORPH_NODES = {
  play: [
    ['polygon', { points: '6 3 20 12 6 21 6 3' }]
  ],
  pause: [
    ['line', { x1: '10', x2: '10', y1: '4', y2: '20' }],
    ['line', { x1: '14', x2: '14', y1: '4', y2: '20' }]
  ],
  bookmark: [
    ['path', { d: 'M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z' }]
  ],
  check: [
    ['polyline', { points: '20 6 9 17 4 12' }]
  ],
  x: [
    ['line', { x1: '18', x2: '6', y1: '6', y2: '18' }],
    ['line', { x1: '6', x2: '18', y1: '6', y2: '18' }]
  ],
  copy: [
    ['rect', { width: '14', height: '14', x: '8', y: '8', rx: '2', ry: '2' }],
    ['path', { d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' }]
  ],
  volume2: [
    ['polygon', { points: '11 5 6 9 2 9 2 15 6 15 11 19 11 5' }],
    ['path', { d: 'M15.54 8.46a5 5 0 0 1 0 7.07' }],
    ['path', { d: 'M19.07 4.93a10 10 0 0 1 0 14.14' }]
  ],
  volumeX: [
    ['polygon', { points: '11 5 6 9 2 9 2 15 6 15 11 19 11 5' }],
    ['line', { x1: '22', x2: '16', y1: '9', y2: '15' }],
    ['line', { x1: '16', x2: '22', y1: '9', y2: '15' }]
  ],
  chevronDown: [
    ['path', { d: 'm6 9 6 6 6-6' }]
  ],
  chevronUp: [
    ['path', { d: 'm18 15-6-6-6 6' }]
  ]
};

/**
 * Play/Pause spring morphing icon
 */
export const PlayPauseMorph = ({
  isPlaying = false,
  size = 20,
  color = 'currentColor',
  strokeWidth = 2.2,
  spring = 'bouncy',
  className = '',
  style = {}
}) => {
  return (
    <MorphIcon
      icon={isPlaying ? MORPH_NODES.pause : MORPH_NODES.play}
      spring={spring}
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
    />
  );
};

/**
 * Bookmark -> Check spring morphing icon (for saving cards, notes, materials)
 */
export const BookmarkCheckMorph = ({
  isSaved = false,
  size = 18,
  color = 'currentColor',
  strokeWidth = 2,
  spring = 'snappy',
  className = '',
  style = {}
}) => {
  return (
    <MorphIcon
      icon={isSaved ? MORPH_NODES.check : MORPH_NODES.bookmark}
      spring={spring}
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
    />
  );
};

/**
 * Copy -> Check spring morphing icon (for copying links, text, tokens)
 */
export const CopyCheckMorph = ({
  isCopied = false,
  size = 16,
  color = 'currentColor',
  strokeWidth = 2,
  spring = 'bouncy',
  className = '',
  style = {}
}) => {
  return (
    <MorphIcon
      icon={isCopied ? MORPH_NODES.check : MORPH_NODES.copy}
      spring={spring}
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
    />
  );
};

/**
 * Volume2 -> VolumeX spring morphing icon
 */
export const VolumeMorph = ({
  isMuted = false,
  size = 18,
  color = 'currentColor',
  strokeWidth = 2,
  spring = 'smooth',
  className = '',
  style = {}
}) => {
  return (
    <MorphIcon
      icon={isMuted ? MORPH_NODES.volumeX : MORPH_NODES.volume2}
      spring={spring}
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
    />
  );
};

/**
 * ChevronDown -> ChevronUp spring morphing icon
 */
export const ChevronMorph = ({
  isExpanded = false,
  size = 18,
  color = 'currentColor',
  strokeWidth = 2,
  spring = 'snappy',
  className = '',
  style = {}
}) => {
  return (
    <MorphIcon
      icon={isExpanded ? MORPH_NODES.chevronUp : MORPH_NODES.chevronDown}
      spring={spring}
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
    />
  );
};

export { MorphIcon };
export default PlayPauseMorph;
