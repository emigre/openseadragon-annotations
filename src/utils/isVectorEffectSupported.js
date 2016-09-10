// checks if we can use vector-effect="non-scaling-stroke" to
// maintain constant the witdh of the SVG strokes during zoom
return default function isVectorEffectSupported() {
  return document.documentElement.style.vectorEffect !== undefined;
}
