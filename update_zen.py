import sys

svg_defs = '''
  <!-- ===== ZEN REUSABLE SVG DEFS ===== -->
  <svg width="0" height="0" style="position:absolute; width:0; height:0; display:none;">
    <symbol id="zen-mascot" viewBox="0 0 120 148" overflow="visible">
      <defs>
        <radialGradient id="zBG" cx="42%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#FFBA7A" />
          <stop offset="100%" stop-color="#E8722E" />
        </radialGradient>
        <radialGradient id="zEye" cx="38%" cy="35%" r="60%">
          <stop offset="0%" stop-color="#3D2200" />
          <stop offset="100%" stop-color="#160800" />
        </radialGradient>
      </defs>
      
      <g class="zen-body-group">
        <!-- Tail -->
        <g class="zen-tail-group">
          <ellipse cx="95" cy="108" rx="35" ry="25" fill="#E8722E" transform="rotate(-25 95 108)" />
          <ellipse cx="108" cy="95" rx="18" ry="12" fill="#FFF2E0" transform="rotate(-25 108 95)" />
        </g>
        <!-- Body & Paws -->
        <ellipse cx="55" cy="112" rx="27" ry="23" fill="url(#zBG)" />
        <ellipse cx="55" cy="117" rx="17" ry="15" fill="#FFF2E0" />
        <ellipse cx="37" cy="132" rx="11" ry="7" fill="#E8722E" />
        <ellipse cx="73" cy="132" rx="11" ry="7" fill="#E8722E" />
      </g>
      
      <g class="zen-head-group">
        <!-- Ears -->
        <g class="zen-ears">
          <g class="zen-ear-left">
            <polygon points="18,40 5,0 43,30" fill="#E8722E" />
            <polygon points="22,38 10,8 40,29" fill="#FFF2E0" />
          </g>
          <g class="zen-ear-right">
            <polygon points="92,40 105,0 67,30" fill="#E8722E" />
            <polygon points="88,38 100,8 70,29" fill="#FFF2E0" />
          </g>
        </g>
        <!-- Head Base -->
        <circle cx="55" cy="58" r="38" fill="url(#zBG)" />
        <ellipse cx="55" cy="68" rx="23" ry="18" fill="#FFF2E0" />
        <!-- Cheeks -->
        <circle cx="31" cy="69" r="8" fill="#FFB3C6" opacity="0.4" />
        <circle cx="79" cy="69" r="8" fill="#FFB3C6" opacity="0.4" />
        
        <!-- Eyes -->
        <g class="zen-eyes-group">
          <g class="zen-eye zen-eye-left">
            <circle cx="41" cy="56" r="10" fill="url(#zEye)" />
            <circle class="zen-pupil" cx="44" cy="52" r="4.5" fill="white" />
            <circle cx="38" cy="60" r="2" fill="#A2D2FF" opacity="0.8" />
          </g>
          <g class="zen-eye zen-eye-right">
            <circle cx="69" cy="56" r="10" fill="url(#zEye)" />
            <circle class="zen-pupil" cx="72" cy="52" r="4.5" fill="white" />
            <circle cx="66" cy="60" r="2" fill="#A2D2FF" opacity="0.8" />
          </g>
        </g>
        <!-- Sleep Eyelids (hidden by default) -->
        <g class="zen-eyelids" opacity="0">
          <path d="M 31 56 Q 41 62 51 56" stroke="#8B5A2B" stroke-width="2.5" fill="none" stroke-linecap="round" />
          <path d="M 59 56 Q 69 62 79 56" stroke="#8B5A2B" stroke-width="2.5" fill="none" stroke-linecap="round" />
        </g>
        <!-- Nose & Mouth -->
        <ellipse cx="55" cy="68" rx="4.5" ry="3" fill="#8B5A2B" />
        <ellipse cx="53.5" cy="67" rx="1.8" ry="1.2" fill="white" opacity="0.6" />
        <path class="zen-mouth" d="M50 74 Q55 79 60 74" stroke="#8B5A2B" stroke-width="2" fill="none" stroke-linecap="round" />
        
        <!-- Scarf -->
        <g class="zen-scarf-group">
          <path d="M22 88 Q55 80 88 88" stroke="#7C3AED" stroke-width="12" stroke-linecap="round" fill="none" />
          <path d="M22 88 Q55 80 88 88" stroke="#A2D2FF" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.5" />
          <circle cx="55" cy="87" r="8" fill="#A2D2FF" />
          <path class="zen-scarf-tail" d="M53 92 Q48 112 45 120" stroke="#7C3AED" stroke-width="8" stroke-linecap="round" fill="none" />
        </g>
      </g>
      
      <!-- Particles -->
      <g class="zen-particles">
        <circle class="zp p1" cx="0" cy="30" r="3" fill="#FCD34D" opacity="0"/>
        <circle class="zp p2" cx="110" cy="15" r="2.5" fill="#A2D2FF" opacity="0"/>
        <circle class="zp p3" cx="0" cy="80" r="2" fill="#F9A8D4" opacity="0"/>
        <circle class="zp p4" cx="115" cy="80" r="2.5" fill="#6EE7B7" opacity="0"/>
      </g>
      
      <!-- Sleep Zzz -->
      <g class="zen-sleep-z" opacity="0">
        <text x="85" y="25" font-family="Nunito" font-weight="800" font-size="14" fill="#A2D2FF" class="zz1">Z</text>
        <text x="100" y="10" font-family="Nunito" font-weight="800" font-size="18" fill="#C4B5FD" class="zz2">Z</text>
      </g>
    </symbol>
  </svg>
'''

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

if '<body>' in html and 'id="zen-mascot"' not in html:
    html = html.replace('<body>', '<body>\n' + svg_defs)

html = html.replace('<span class="zen-emoji">🦊</span>', '<svg class="zen-icon zen-icon-nav"><use href="#zen-mascot"></use></svg>')
html = html.replace('<div class="intro-zen-big">🦊</div>', '<svg class="zen-icon intro-zen-big"><use href="#zen-mascot"></use></svg>')
html = html.replace('<div class="intro-zen-big spin-in">🦊</div>', '<svg class="zen-icon intro-zen-big spin-in"><use href="#zen-mascot"></use></svg>')
html = html.replace('🦊 Zen', '<svg class="zen-icon"><use href="#zen-mascot"></use></svg> Zen')
html = html.replace('🦊 <strong>Zen says:</strong>', '<svg class="zen-icon"><use href="#zen-mascot"></use></svg> <strong>Zen says:</strong>')
html = html.replace('🦊', '<svg class="zen-icon"><use href="#zen-mascot"></use></svg>')

main_zen_raw = svg_defs.replace('<svg width="0" height="0" style="position:absolute; width:0; height:0; display:none;">', '').replace('</svg>', '').replace('<symbol id="zen-mascot" viewBox="0 0 120 148" overflow="visible">', '<svg id="zen-main-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 148" style="overflow:visible;">').replace('</symbol>', '</svg>').strip()

html_parts = html.split('<!-- ===== ZEN FLOATING GUIDE ===== -->')
if len(html_parts) > 1:
    end_parts = html_parts[1].split('<!-- ===== FEEDBACK MODAL ===== -->')
    if len(end_parts) > 1:
        new_guide = '''
  <div class="zen-floating-guide" id="zen-floating-guide">
    <div class="zen-guide-avatar" id="zen-avatar-container" onclick="zenEasterEgg()">
      ''' + main_zen_raw + '''
    </div>
    <div class="zen-guide-text" id="zen-guide-text">Hi! I'm Zen! Let's explore English together!</div>
  </div>
  
  '''
        html = html_parts[0] + '<!-- ===== ZEN FLOATING GUIDE ===== -->\n' + new_guide + '<!-- ===== FEEDBACK MODAL ===== -->' + end_parts[1]

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("index.html updated successfully!")
