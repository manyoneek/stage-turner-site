'use strict';
// Face paths copied unchanged from Stage Turner's production feedback.ts.
const faces={headTurn:'<path d="M21 42 C7 39 6 27 10 20 C12 3 32 3 34 16 L34 20 L40 26 L34 28 L34 33 Q34 38 25 37 L25 42 M28 19 L30 19 M30 32 L34 32"/>',wink:'<ellipse cx="24" cy="24" rx="16" ry="19"/><path d="M17 19 L17 21 M27 21 Q30.5 17 34 21 M18 31 Q24 37 30 31 M24 24 L23 27"/>',mouthSideways:'<ellipse cx="24" cy="24" rx="16" ry="19"/><path d="M17 19 L17 21 M30 19 L30 21 M24 32 Q30 35 35 29 M24 24 L23 27"/>'};
const icon=type=>`<svg viewBox="0 0 48 48" aria-hidden="true">${faces[type]}</svg>`;
document.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon));
// Original illustrative tablature, not a licensed song or a camera simulation.
document.querySelectorAll('[data-score]').forEach((el,block)=>{for(let row=0;row<6;row++){const line=document.createElement('div');line.className='tab-row';line.innerHTML=`<b>${['Cmaj7','Am7','Dm7','G7','Fmaj7','C'][row]}</b>`;for(let n=0;n<9;n++){const note=document.createElement('span');note.className='tab-note';note.style.left=`${7+n*10}%`;note.style.top=`${((n+row+block)%6)*12}px`;note.textContent=[0,2,3,0,5,3,2,0,2][n];line.append(note)}el.append(line)}});
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let elapsed=0,last=0,gesture='wink';
const isPaused=()=>reduced.matches;
function motionState(){document.body.classList.toggle('motion-paused',isPaused());const video=document.querySelector('.reader-recording');if(video){if(isPaused())video.pause();else video.play().catch(()=>{});}}
reduced.addEventListener('change',motionState);
const labels={wink:'Wink',mouthSideways:'Move your mouth',headTurn:'Turn your head'};
document.querySelectorAll('[data-pick]').forEach(button=>button.addEventListener('click',()=>{gesture=button.dataset.pick;elapsed=0;document.querySelectorAll('.demo').forEach(d=>d.dataset.gesture=gesture);document.querySelectorAll('[data-pick]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.querySelector('#gesture-description').textContent=`${labels[gesture]} right to scroll down. ${labels[gesture]} left to scroll up.`;render(0)}));
function render(time){const phase=time%8000;const down=phase<4000;let offset=0;if(phase>=1000&&phase<1800)offset=(phase-1000)/800*180;else if(phase>=1800&&phase<5000)offset=180;else if(phase>=5000&&phase<5800)offset=180-(phase-5000)/800*180;const showing=(phase>=950&&phase<2400)||(phase>=4950&&phase<6400);document.querySelectorAll('.demo').forEach(demo=>{const paper=demo.querySelector('.score-paper,.web-paper');paper.style.transform=`translateY(${-offset}px)`;const feedback=demo.querySelector('.feedback');feedback.classList.toggle('on',showing);feedback.classList.toggle('left',!down);feedback.innerHTML=icon('wink')+`<span>${down?'→':'←'}</span><span>${down?'Next':'Previous'}</span>`});}
function frame(now){if(last&&!isPaused()&&!document.hidden)elapsed+=Math.min(100,now-last);last=now;render(elapsed);requestAnimationFrame(frame)}
motionState();render(0);requestAnimationFrame(frame);
