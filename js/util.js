

export const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
export const $=id=>document.getElementById(id);
export const pref=(k,d)=>{try{const v=localStorage.getItem('belt.'+k);return v==null?d:v;}catch(e){return d;}};
export const setPref=(k,v)=>{try{localStorage.setItem('belt.'+k,v);}catch(e){}};
export const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
