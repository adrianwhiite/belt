// Belt starts here. Each file is one part of the app, loaded in this order:
//   util       tiny helpers ($, prefs) everything uses
//   songs      the built-in songs and music helpers
//   audio      backing tracks, pitch detection, the mic
//   picker     singer avatars, home, the song wheel, previews
//   stage      getting ready and singing
//   results    scores, the take player, the breakdown
//   account    Google sign-in, saved takes, My songs
//   own        your own track: analysis, lyrics timing, melody
//   own-setup  recognising the song, the library, the upload flow
//   ai         the belt-ai server function (separation, word timing)
//   nav        challenge links and the back button
//   state      values several parts change (S.current, S.run, S.last, S.user...)
import './util.js';
import './songs.js';
import './audio.js';
import './picker.js';
import './stage.js';
import './results.js';
import './account.js';
import './own.js';
import './own-setup.js';
import './ai.js';
import './nav.js';
import {S} from './state.js';
import {$} from './util.js';
import {SONGS} from './songs.js';
import {ctx,ensureCtx,fakeVoice} from './audio.js';
import {CATALOG} from './picker.js';
import {songTime,tracksFor,voiceLag} from './stage.js';
import {showResults} from './results.js';
import {openMine} from './account.js';

/* ---------- Debug handle for the console and the tests: belt.current, belt.showResults() ---------- */
window.belt={
  get current(){return S.current},get last(){return S.last},get run(){return S.run},get ctx(){return ctx},get demo(){return S.demo},
  get user(){return S.user},set user(v){S.user=v},get sb(){return S.sb},set sb(v){S.sb=v},
  $,SONGS,CATALOG,ensureCtx,songTime,tracksFor,fakeVoice,voiceLag,showResults,openMine,
};
