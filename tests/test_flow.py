"""Whole app, start to finish: a built-in song, the profile, then adding your own song with stand-in AI services."""
import asyncio, json, os
from common import *
import make_fixtures
lrc="\n".join(f"[{i*4//60:02d}:{i*4%60:02d}.00] Line number {i} is this the real life" for i in list(range(1,7))+list(range(10,15)))
LR=[{"id":2,"trackName":"Test Song","artistName":"Test Artist","albumName":"Tests","duration":61,"instrumental":False,"syncedLyrics":lrc}]
MB={"recordings":[{"title":"Test Song","score":100,"first-release-date":"1975-10-31"}],"artists":[]}
STUB="""()=>{belt.user={id:'u1',email:'a@b.c',created_at:'2026-11-01',user_metadata:{full_name:'Test Singer'}};let sp=0;window.__calls=[];
 const lines=[];for(const i of [1,2,3,4,5,6,10,11,12,13,14]){const t0=i*4+9.4;const ws=('Line number '+i+' is this the real life').split(' ');
  lines.push({text:ws.join(' '),start:t0,end:t0+3,words:ws.map((w,k)=>({text:w,start:+(t0+k*.31).toFixed(2),end:+(t0+k*.31+.25).toFixed(2)}))});}
 belt.sb={auth:{signOut:async()=>{}},from:()=>({select:()=>({order:async()=>({data:[{id:1,song_title:'Jingle Bells',song_id:'jingle',score:91,created_at:'2026-11-10',audio_path:'x'}]})})}),
  functions:{invoke:async(n,{body})=>{__calls.push(body.action);await new Promise(r=>setTimeout(r,150));
   if(body.action==='judge')return {data:{hasLeadVocal:true,matchesGuess:true,goodQuality:true,problems:[]}};
   if(body.action==='split_start')return {data:{id:'s1'}};
   if(body.action==='split_poll')return {data:++sp<2?{status:'processing'}:{status:'completed',parts:['vocals','drums','bass','other']}};
   if(body.action==='fetch_output'){const r=await fetch('https://test.local/'+(body.model==='vocals'?'vocal9.wav':'inst.wav'));return {data:await r.blob()};}
   if(body.action==='words_start')return {data:{id:'w1'}};
   if(body.action==='words_poll')return {data:{status:'completed',data:{segments:lines.map(l=>({text:l.text,start:l.start,end:l.end,words:l.words.map(w=>({word:w.text,start:w.start,end:w.end,score:.9}))}))}}};}},
  storage:{from:()=>({upload:async()=>({}),createSignedUrl:async()=>({data:{signedUrl:'https://x'}}),remove:async()=>({})})}};}"""
async def main():
    make_fixtures.main();c=Check('flow');srv=serve()
    async with async_playwright() as pw:
        b=await browser(pw);pg=await page(b)
        async def j(route,body):await route.fulfill(status=200,content_type='application/json',headers={'access-control-allow-origin':'*'},body=json.dumps(body))
        async def f(route):await route.fulfill(status=200,content_type='audio/wav',headers={'access-control-allow-origin':'*'},body=open(os.path.join(FIX,route.request.url.split('/')[-1]),'rb').read())
        await pg.route('https://lrclib.net/**',lambda r:j(r,LR));await pg.route('https://musicbrainz.org/**',lambda r:j(r,MB));await pg.route('https://test.local/**',f)
        await fresh(pg,prefs={'video':'0'});await shot(pg,'flow_home')
        await pg.click('#go');await pg.wait_for_timeout(600)
        await pg.click('#pickGo');await pg.wait_for_selector('#start:not([disabled])',timeout=30000)
        await pg.click('#start');await pg.wait_for_timeout(400);await pg.click('#readyGo')
        await pg.wait_for_selector('#result.on',timeout=90000);await pg.wait_for_timeout(400);await shot(pg,'flow_result')
        c.ok(await pg.evaluate("!!belt.last&&belt.last.sc.cover>0"),'built-in song finishes and scores')
        await pg.click('#another');await pg.wait_for_timeout(300);await pg.click('#mineBtn');await pg.wait_for_timeout(500)
        c.ok(await pg.evaluate("document.querySelector('.screen.on').id")=='mine','profile opens')
        await pg.evaluate(STUB);await pg.click('#mineBack');await pg.wait_for_timeout(300)
        await pg.click('#ownBtn');await pg.set_input_files('#ownFile',os.path.join(FIX,'track.mp3'))
        await pg.wait_for_selector('#ownGo:not([hidden])',timeout=60000)
        await pg.click('#ownGo');await pg.wait_for_function("belt.current&&belt.current.own&&belt.current.wt",timeout=120000);await pg.wait_for_selector('#start:not([disabled])',timeout=60000)
        info=await pg.evaluate("({notes:belt.current.notes.length,wt:!!belt.current.wt,own:!!belt.current.own})")
        c.ok(info['own'] and info['notes']>10,f"own song set up with notes ({info['notes']})");c.ok(info['wt'],'words timed by listening')
        await pg.click('#start');await pg.wait_for_timeout(300);await pg.click('#readyGo');await pg.wait_for_timeout(12000);await shot(pg,'flow_own_sing')
        await pg.click('#quit');await pg.wait_for_timeout(300);await pg.click('#qFinish')
        await pg.wait_for_selector('#result.on',timeout=60000);c.ok(True,'own song finishes early into results')
        await pg.click('#another');await pg.wait_for_timeout(400)
        c.ok(await pg.evaluate("belt.CATALOG.some(x=>x.song&&x.song.own)"),'own song is in the picker')
        c.ok(not pg.errs,'no page errors '+str(pg.errs[:3]));await b.close()
    if srv:srv.terminate()
    c.done()
asyncio.run(main())
