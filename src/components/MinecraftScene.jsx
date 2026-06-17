import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import './MinecraftScene.css';

export default function MinecraftScene() {
  const { isDark } = useTheme();
  const sceneRef = useRef(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    isDark ? scene.classList.add('night') : scene.classList.remove('night');
  }, [isDark]);

  useEffect(() => {
    buildStars();
    moveCelestial();
    buildTree();
    buildSteve();
    buildZombies();
  }, []);

  return (
    <div className="mc-outer">
      <div className="mc-hd">
        <div className="mc-ey">Easter egg ⛏️</div>
        <div className="mc-tt">
          Quan's <span>Minecraft</span> world
        </div>
        <div className="mc-hint">Toggle dark mode to see what happens at night 👀</div>
      </div>

      <div className="mc-scene" ref={sceneRef} id="mc-scene">
        <div className="mc-stars" id="mc-stars" />
        <div className="mc-cel" id="mc-cel" />
        <div className="mc-moon" id="mc-moon">
          <div className="mc-moon-shape" />
        </div>
        <div className="mc-cloud mc-c1" />
        <div className="mc-cloud mc-c2" />
        <div className="mc-night-overlay" />

        <div className="mc-px" id="mc-tree" style={{bottom:'62px', left:'50px'}} />
        <div className="mc-px" id="mc-steve" style={{bottom:'62px', left:'210px'}} />

        <div className="mc-zw mc-zw1" id="mc-z1" />
        <div className="mc-zw mc-zw2" id="mc-z2" />
        <div className="mc-zw mc-zw3" id="mc-z3" />

        <div className="mc-ground">
          <div className="mc-dirt" />
        </div>

        <div className="mc-lbl">⛏️ Quan's Minecraft world</div>
      </div>
    </div>
  );
}

function buildStars() {
  const el = document.getElementById('mc-stars');
  if (!el || el.children.length > 0) return;
  for (let i = 0; i < 55; i++) {
    const s = document.createElement('div');
    s.className = 'mc-star';
    const sz = Math.random() < 0.25 ? 3 : 2;
    s.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*60}%;width:${sz}px;height:${sz}px;animation-delay:${Math.random()*3}s;animation-duration:${1.5+Math.random()*2}s`;
    el.appendChild(s);
  }
}

let celAngle = 25;
function moveCelestial() {
  celAngle = (celAngle + 0.1) % 180;
  const scene = document.getElementById('mc-scene');
  const cel = document.getElementById('mc-cel');
  const moon = document.getElementById('mc-moon');
  if (!scene || !cel || !moon) return;
  const W = scene.offsetWidth || 700;
  const x = W * 0.06 + W * 0.88 * (celAngle / 180) - 22;
  const y = Math.max(8, 14 + Math.sin(celAngle * Math.PI / 180) * -65 + 65);
  cel.style.left = x + 'px'; cel.style.top = y + 'px';
  moon.style.left = x + 'px'; moon.style.top = y + 'px';
  requestAnimationFrame(moveCelestial);
}

function makeSprite(rows, pal, sz) {
  const cols = rows[0].length;
  const el = document.createElement('div');
  el.style.cssText = `display:grid;grid-template-columns:repeat(${cols},${sz}px);gap:0;image-rendering:pixelated;`;
  rows.forEach(row => row.forEach(c => {
    const p = document.createElement('div');
    p.style.cssText = `width:${sz}px;height:${sz}px;background:${c && pal[c] ? pal[c] : 'transparent'};`;
    el.appendChild(p);
  }));
  return el;
}

function buildTree() {
  const el = document.getElementById('mc-tree');
  if (!el || el.children.length > 0) return;
  const tP = {
    L:'#5a7c1e', l:'#6fa825', G:'#7ec91e', g:'#4a6b10',
    T:'#6b3a2a', t:'#8b4a36'
  };
  const px = [
    [0,0,0,'L','G','G','L','L',0,0,0],
    [0,0,'L','G','G','G','G','L','L',0,0],
    [0,'L','G','G','l','G','G','l','G','L',0],
    ['L','G','G','l','G','G','G','l','G','G','L'],
    ['L','G','l','G','G','G','G','G','l','G','L'],
    [0,'L','G','G','G','G','G','G','G','L',0],
    [0,0,'L','G','G','l','G','G','L',0,0],
    [0,0,0,'L','G','G','G','L',0,0,0],
    [0,0,0,0,'T','t','T',0,0,0,0],
    [0,0,0,0,'T','t','T',0,0,0,0],
    [0,0,0,0,'T','t','T',0,0,0,0],
    [0,0,0,0,'T','t','T',0,0,0,0],
    [0,0,0,0,'T','t','T',0,0,0,0],
    [0,0,0,0,'T','t','T',0,0,0,0],
  ];
  el.appendChild(makeSprite(px, tP, 14));
}

function buildSteve() {
  const el = document.getElementById('mc-steve');
  if (!el || el.children.length > 0) return;
  const sP = {
    K:'#704214', k:'#8b5a2b',
    S:'#c8a076', s:'#b08060',
    e:'#3d2b1a', W:'#f5f5f5',
    B:'#4a7bc8', b:'#3a6ab8',
    G:'#5b6877', g:'#3f4f5e',
    F:'#4a3018',
  };
  const px = [
    [0,'K','K','K','K','K','K',0],
    ['K','k','K','K','K','K','k','K'],
    ['K','K','K','K','K','K','K','K'],
    ['S','e','S','S','S','S','e','S'],
    ['S','S','S','s','s','S','S','S'],
    ['S','s','W','S','S','W','s','S'],
    ['S','S','S','S','S','S','S','S'],
    ['B','B','B','B','B','B','B','B'],
    ['B','b','B','B','B','B','b','B'],
    ['b','B','B','b','b','B','B','b'],
    ['B','B','B','B','B','B','B','B'],
    [0,'G','G',0,0,'G','G',0],
    [0,'g','G',0,0,'G','g',0],
    [0,'G','G',0,0,'G','G',0],
    [0,'F','F',0,0,'F','F',0],
  ];
  el.appendChild(makeSprite(px, sP, 6));
}

function buildZombies() {
  const zP = {
    G:'#4a7c59', g:'#3d6b4a', D:'#2d5438',
    e:'#dd0000', m:'#3d6b4a',
    T:'#2d6b6b', t:'#1a5050',
    P:'#1a3d6b', p:'#102d5a',
    F:'#1a2d40',
  };
  const px = [
    [0,'G','G','G','G',0],
    ['G','g','G','G','g','G'],
    ['G','e','G','G','e','G'],
    ['G','G','m','m','G','G'],
    ['G','g','G','G','g','G'],
    [0,'D','G','G','D',0],
    ['T','T','T','T','T','T'],
    ['t','T','t','t','T','t'],
    ['T','T','T','T','T','T'],
    [0,'P','p',0,'p','P',0],
    [0,'P','P',0,'P','P',0],
    [0,'F',0,0,0,'F',0],
  ];
  ['mc-z1','mc-z2','mc-z3'].forEach(id => {
    const el = document.getElementById(id);
    if (!el || el.children.length > 0) return;
    el.appendChild(makeSprite(px, zP, 6));
  });
}
