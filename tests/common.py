"""Shared helpers: serve the repo, open Chrome at phone size, block outside fonts/CDNs, collect page errors."""
import os, sys, json, socket, subprocess, time, contextlib
from playwright.async_api import async_playwright
HERE=os.path.dirname(os.path.abspath(__file__));ROOT=os.path.dirname(HERE)
OUT=os.path.join(HERE,'out');FIX=os.path.join(HERE,'fixtures');os.makedirs(OUT,exist_ok=True)
PORT=int(os.environ.get('BELT_PORT','8765'));BASE=f'http://localhost:{PORT}'
CHROME=os.environ.get('CHROME','/usr/bin/google-chrome')

def serve():
    """Start a static server on the repo root unless one is already listening."""
    with contextlib.closing(socket.socket()) as s:
        if s.connect_ex(('localhost',PORT))==0:return None
    p=subprocess.Popen([sys.executable,'-m','http.server',str(PORT)],cwd=ROOT,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    time.sleep(.8);return p

async def browser(pw,mic=False):
    args=['--autoplay-policy=no-user-gesture-required']
    if mic:args+=['--use-fake-ui-for-media-stream','--use-fake-device-for-media-stream']
    return await pw.chromium.launch(executable_path=CHROME,args=args)

async def page(b,w=390,h=844,scale=2):
    pg=await b.new_page(viewport={'width':w,'height':h},device_scale_factor=scale)
    pg.errs=[];pg.on('pageerror',lambda e:pg.errs.append(str(e)))
    await pg.route('https://fonts.googleapis.com/**',lambda r:r.abort())
    await pg.route('https://cdn.jsdelivr.net/**',lambda r:r.abort())
    return pg

async def fresh(pg,path='/',prefs=None):
    """Open Belt with empty storage (and optional belt.* prefs)."""
    await pg.goto(BASE+path)
    js="indexedDB.deleteDatabase('belt');localStorage.clear();"+''.join(f"localStorage.setItem('belt.{k}',{json.dumps(v)});" for k,v in (prefs or {}).items())
    await pg.evaluate(js);await pg.reload();await pg.wait_for_timeout(600)

def shot(pg,name):return pg.screenshot(path=os.path.join(OUT,name+'.png'))

class Check:
    def __init__(s,name):s.name=name;s.fails=[]
    def ok(s,cond,msg):
        print(('  ok   ' if cond else '  FAIL ')+msg)
        if not cond:s.fails.append(msg)
    def done(s):
        print(f"{s.name}: {'PASS' if not s.fails else 'FAIL ('+str(len(s.fails))+')'}");sys.exit(1 if s.fails else 0)
