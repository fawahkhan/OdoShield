
export function CarIllustration(){
  <svg width="100%" viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#00DC82" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#00DC82" stop-opacity="0.04"/>
    </linearGradient>
    <linearGradient id="glassGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#00DC82" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#00DC82" stop-opacity="0.08"/>
    </linearGradient>
    <linearGradient id="groundGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#00DC82" stop-opacity="0"/>
      <stop offset="30%" stop-color="#00DC82" stop-opacity="0.18"/>
      <stop offset="70%" stop-color="#00DC82" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#00DC82" stop-opacity="0"/>
    </linearGradient>
    <filter id="wheelGlow">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- Ground reflection line -->
  <rect x="60" y="248" width="560" height="1.5" rx="1" fill="url(#groundGrad)" style="stroke:none;color:rgb(255, 255, 255);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <!-- Ground shadow -->
  <ellipse cx="340" cy="256" rx="240" ry="10" fill="#00DC82" fill-opacity="0.05" style="fill:rgb(0, 220, 130);stroke:none;color:rgb(255, 255, 255);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>

  <!-- ── Car body ── -->
  <!-- Main lower body -->
  <rect x="80" y="188" width="520" height="60" rx="10" fill="url(#bodyGrad)" stroke="#00DC82" stroke-width="1.2" stroke-opacity="0.5" style="stroke:rgb(0, 220, 130);color:rgb(255, 255, 255);stroke-width:1.2px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>

  <!-- Upper cabin -->
  <path d="M 200 188 Q 220 140 270 128 L 430 128 Q 480 128 495 155 L 510 188 Z" fill="url(#bodyGrad)" stroke="#00DC82" stroke-width="1.2" stroke-opacity="0.5" style="stroke:rgb(0, 220, 130);color:rgb(255, 255, 255);stroke-width:1.2px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>

  <!-- Windshield -->
  <path d="M 286 188 Q 295 148 320 136 L 390 136 Q 410 140 418 160 L 424 188 Z" fill="url(#glassGrad)" stroke="#00DC82" stroke-width="0.8" stroke-opacity="0.6" style="stroke:rgb(0, 220, 130);color:rgb(255, 255, 255);stroke-width:0.8px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>

  <!-- Rear window -->
  <path d="M 215 188 Q 220 158 238 142 L 286 136 L 286 188 Z" fill="url(#glassGrad)" stroke="#00DC82" stroke-width="0.8" stroke-opacity="0.4" style="stroke:rgb(0, 220, 130);color:rgb(255, 255, 255);stroke-width:0.8px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>

  <!-- Door lines -->
  <line x1="320" y1="188" x2="320" y2="242" stroke="#00DC82" stroke-width="0.6" stroke-opacity="0.3" style="fill:rgb(0, 0, 0);stroke:rgb(0, 220, 130);color:rgb(255, 255, 255);stroke-width:0.6px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <line x1="430" y1="188" x2="430" y2="242" stroke="#00DC82" stroke-width="0.6" stroke-opacity="0.3" style="fill:rgb(0, 0, 0);stroke:rgb(0, 220, 130);color:rgb(255, 255, 255);stroke-width:0.6px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>

  <!-- Door handle left -->
  <rect x="360" y="210" width="28" height="5" rx="2.5" fill="none" stroke="#00DC82" stroke-width="1" stroke-opacity="0.5" style="fill:none;stroke:rgb(0, 220, 130);color:rgb(255, 255, 255);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <!-- Door handle right -->
  <rect x="460" y="210" width="28" height="5" rx="2.5" fill="none" stroke="#00DC82" stroke-width="1" stroke-opacity="0.5" style="fill:none;stroke:rgb(0, 220, 130);color:rgb(255, 255, 255);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>

  <!-- ── Wheels ── -->
  <!-- Rear wheel -->
  <circle cx="185" cy="248" r="38" fill="#050A0F" stroke="#00DC82" stroke-width="1.5" stroke-opacity="0.6" style="fill:rgb(5, 10, 15);stroke:rgb(0, 220, 130);color:rgb(255, 255, 255);stroke-width:1.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <circle cx="185" cy="248" r="26" fill="none" stroke="#00DC82" stroke-width="0.7" stroke-opacity="0.3" style="fill:none;stroke:rgb(0, 220, 130);color:rgb(255, 255, 255);stroke-width:0.7px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <circle cx="185" cy="248" r="14" fill="#00DC82" fill-opacity="0.08" stroke="#00DC82" stroke-width="1" stroke-opacity="0.5" style="fill:rgb(0, 220, 130);stroke:rgb(0, 220, 130);color:rgb(255, 255, 255);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <!-- Rear wheel spokes -->
  <line x1="185" y1="234" x2="185" y2="262" stroke="#00DC82" stroke-width="0.8" stroke-opacity="0.4" style="fill:rgb(0, 0, 0);stroke:rgb(0, 220, 130);color:rgb(255, 255, 255);stroke-width:0.8px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <line x1="171" y1="248" x2="199" y2="248" stroke="#00DC82" stroke-width="0.8" stroke-opacity="0.4" style="fill:rgb(0, 0, 0);stroke:rgb(0, 220, 130);color:rgb(255, 255, 255);stroke-width:0.8px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <line x1="175" y1="238" x2="195" y2="258" stroke="#00DC82" stroke-width="0.8" stroke-opacity="0.4" style="fill:rgb(0, 0, 0);stroke:rgb(0, 220, 130);color:rgb(255, 255, 255);stroke-width:0.8px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <line x1="195" y1="238" x2="175" y2="258" stroke="#00DC82" stroke-width="0.8" stroke-opacity="0.4" style="fill:rgb(0, 0, 0);stroke:rgb(0, 220, 130);color:rgb(255, 255, 255);stroke-width:0.8px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <circle cx="185" cy="248" r="4" fill="#00DC82" fill-opacity="0.6" style="fill:rgb(0, 220, 130);stroke:none;color:rgb(255, 255, 255);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>

  <!-- Front wheel -->
  <circle cx="490" cy="248" r="38" fill="#050A0F" stroke="#00DC82" stroke-width="1.5" stroke-opacity="0.6" style="fill:rgb(5, 10, 15);stroke:rgb(0, 220, 130);color:rgb(255, 255, 255);stroke-width:1.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <circle cx="490" cy="248" r="26" fill="none" stroke="#00DC82" stroke-width="0.7" stroke-opacity="0.3" style="fill:none;stroke:rgb(0, 220, 130);color:rgb(255, 255, 255);stroke-width:0.7px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <circle cx="490" cy="248" r="14" fill="#00DC82" fill-opacity="0.08" stroke="#00DC82" stroke-width="1" stroke-opacity="0.5" style="fill:rgb(0, 220, 130);stroke:rgb(0, 220, 130);color:rgb(255, 255, 255);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <line x1="490" y1="234" x2="490" y2="262" stroke="#00DC82" stroke-width="0.8" stroke-opacity="0.4" style="fill:rgb(0, 0, 0);stroke:rgb(0, 220, 130);color:rgb(255, 255, 255);stroke-width:0.8px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <line x1="476" y1="248" x2="504" y2="248" stroke="#00DC82" stroke-width="0.8" stroke-opacity="0.4" style="fill:rgb(0, 0, 0);stroke:rgb(0, 220, 130);color:rgb(255, 255, 255);stroke-width:0.8px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <line x1="480" y1="238" x2="500" y2="258" stroke="#00DC82" stroke-width="0.8" stroke-opacity="0.4" style="fill:rgb(0, 0, 0);stroke:rgb(0, 220, 130);color:rgb(255, 255, 255);stroke-width:0.8px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <line x1="500" y1="238" x2="480" y2="258" stroke="#00DC82" stroke-width="0.8" stroke-opacity="0.4" style="fill:rgb(0, 0, 0);stroke:rgb(0, 220, 130);color:rgb(255, 255, 255);stroke-width:0.8px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <circle cx="490" cy="248" r="4" fill="#00DC82" fill-opacity="0.6" style="fill:rgb(0, 220, 130);stroke:none;color:rgb(255, 255, 255);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>

  <!-- ── Headlights ── -->
  <rect x="540" y="198" width="38" height="18" rx="4" fill="#00DC82" fill-opacity="0.12" stroke="#00DC82" stroke-width="1" stroke-opacity="0.7" style="fill:rgb(0, 220, 130);stroke:rgb(0, 220, 130);color:rgb(255, 255, 255);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <rect x="544" y="201" width="14" height="12" rx="2" fill="#00DC82" fill-opacity="0.3" style="fill:rgb(0, 220, 130);stroke:none;color:rgb(255, 255, 255);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <!-- Headlight beam -->
  <path d="M 578 204 L 630 192 M 578 210 L 630 215" stroke="#00DC82" stroke-width="0.8" stroke-opacity="0.25" stroke-dasharray="4 3" style="fill:rgb(0, 0, 0);stroke:rgb(0, 220, 130);color:rgb(255, 255, 255);stroke-width:0.8px;stroke-dasharray:4px, 3px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>

  <!-- Tail lights -->
  <rect x="82" y="198" width="28" height="16" rx="3" fill="#FF4757" fill-opacity="0.15" stroke="#FF4757" stroke-width="0.8" stroke-opacity="0.5" style="fill:rgb(255, 71, 87);stroke:rgb(255, 71, 87);color:rgb(255, 255, 255);stroke-width:0.8px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <rect x="85" y="201" width="10" height="10" rx="1.5" fill="#FF4757" fill-opacity="0.25" style="fill:rgb(255, 71, 87);stroke:none;color:rgb(255, 255, 255);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>

  <!-- ── Blockchain anchor dots ── -->
  <!-- Anchor point on roof with pulse -->
  <circle cx="340" cy="128" r="5" fill="#00DC82" fill-opacity="0.9" style="fill:rgb(0, 220, 130);stroke:none;color:rgb(255, 255, 255);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <circle cx="340" cy="128" r="10" fill="none" stroke="#00DC82" stroke-width="0.8" stroke-opacity="0.4" style="fill:none;stroke:rgb(0, 220, 130);color:rgb(255, 255, 255);stroke-width:0.8px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <circle cx="340" cy="128" r="16" fill="none" stroke="#00DC82" stroke-width="0.5" stroke-opacity="0.2" style="fill:none;stroke:rgb(0, 220, 130);color:rgb(255, 255, 255);stroke-width:0.5px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>

  <!-- Hash line going up from roof -->
  <line x1="340" y1="112" x2="340" y2="80" stroke="#00DC82" stroke-width="0.8" stroke-opacity="0.35" stroke-dasharray="3 3" style="fill:rgb(0, 0, 0);stroke:rgb(0, 220, 130);color:rgb(255, 255, 255);stroke-width:0.8px;stroke-dasharray:3px, 3px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>

  <!-- Hash block at top -->
  <rect x="282" y="48" width="116" height="36" rx="6" fill="#00DC82" fill-opacity="0.06" stroke="#00DC82" stroke-width="0.8" stroke-opacity="0.4" style="fill:rgb(0, 220, 130);stroke:rgb(0, 220, 130);color:rgb(255, 255, 255);stroke-width:0.8px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <text x="340" y="61" font-family="'DM Mono', monospace" font-size="8" fill="#00DC82" fill-opacity="0.7" text-anchor="middle" style="fill:rgb(0, 220, 130);stroke:none;color:rgb(255, 255, 255);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;DM Mono&quot;, monospace;font-size:8px;font-weight:400;text-anchor:middle;dominant-baseline:auto">0x4a2f…9b1c</text>
  <text x="340" y="75" font-family="'DM Mono', monospace" font-size="7.5" fill="#00DC82" fill-opacity="0.45" text-anchor="middle" style="fill:rgb(0, 220, 130);stroke:none;color:rgb(255, 255, 255);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;DM Mono&quot;, monospace;font-size:7.5px;font-weight:400;text-anchor:middle;dominant-baseline:auto">Block #42,891,334 ✓</text>

  <!-- Side anchor dots connected to body -->
  <circle cx="165" cy="215" r="3" fill="#00DC82" fill-opacity="0.5" style="fill:rgb(0, 220, 130);stroke:none;color:rgb(255, 255, 255);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <line x1="165" y1="215" x2="148" y2="200" stroke="#00DC82" stroke-width="0.6" stroke-opacity="0.3" stroke-dasharray="2 2" style="fill:rgb(0, 0, 0);stroke:rgb(0, 220, 130);color:rgb(255, 255, 255);stroke-width:0.6px;stroke-dasharray:2px, 2px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>

  <circle cx="510" cy="210" r="3" fill="#00DC82" fill-opacity="0.5" style="fill:rgb(0, 220, 130);stroke:none;color:rgb(255, 255, 255);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <line x1="510" y1="210" x2="528" y2="195" stroke="#00DC82" stroke-width="0.6" stroke-opacity="0.3" stroke-dasharray="2 2" style="fill:rgb(0, 0, 0);stroke:rgb(0, 220, 130);color:rgb(255, 255, 255);stroke-width:0.6px;stroke-dasharray:2px, 2px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>

  <!-- ── Verified badge on windshield area ── -->
  <rect x="330" y="154" width="60" height="18" rx="9" fill="#00DC82" fill-opacity="0.12" stroke="#00DC82" stroke-width="0.8" stroke-opacity="0.5" style="fill:rgb(0, 220, 130);stroke:rgb(0, 220, 130);color:rgb(255, 255, 255);stroke-width:0.8px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <text x="360" y="166" font-family="'DM Mono', monospace" font-size="7.5" fill="#00DC82" fill-opacity="0.8" text-anchor="middle" style="fill:rgb(0, 220, 130);stroke:none;color:rgb(255, 255, 255);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;DM Mono&quot;, monospace;font-size:7.5px;font-weight:400;text-anchor:middle;dominant-baseline:auto">VERIFIED ✓</text>

  <!-- ── VIN label on lower door ── -->
  <text x="378" y="228" font-family="'DM Mono', monospace" font-size="8" fill="#00DC82" fill-opacity="0.35" text-anchor="middle" style="fill:rgb(0, 220, 130);stroke:none;color:rgb(255, 255, 255);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;DM Mono&quot;, monospace;font-size:8px;font-weight:400;text-anchor:middle;dominant-baseline:auto">MH01-AB-4421</text>

  <!-- ── Subtle scan line effect ── -->
  <rect x="80" y="128" width="520" height="1" fill="#00DC82" fill-opacity="0.08" style="fill:rgb(0, 220, 130);stroke:none;color:rgb(255, 255, 255);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
  <rect x="80" y="178" width="520" height="1" fill="#00DC82" fill-opacity="0.06" style="fill:rgb(0, 220, 130);stroke:none;color:rgb(255, 255, 255);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;opacity:1;font-family:&quot;Anthropic Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, sans-serif;font-size:16px;font-weight:400;text-anchor:start;dominant-baseline:auto"/>
</svg>
}