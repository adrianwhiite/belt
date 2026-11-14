"""Recording delay: Belt must find the true delay of a take (or leave it alone when it can't tell)."""
import asyncio
from common import *
async def main():
    c=Check('timing');srv=serve()
    async with async_playwright() as pw:
        b=await browser(pw);pg=await page(b,390,844,1);await fresh(pg)
        res=await pg.evaluate("""async()=>{ensureCtx();const out=[];
          for(const song of SONGS.slice(0,2)){const tr=await tracksFor(song),sr=ctx.sampleRate,base=fakeVoice(song,sr),back=tr.back.getChannelData(0);
            for(const [name,bl,amp] of [['headphones',0,1],['speaker',.25,1],['silent',0,0]])for(const ms of [0,150,320]){
              localStorage.removeItem('belt.lags');const sh=Math.round(ms/1000*sr),j=Math.round(.05*sr),v=new Float32Array(base.length);
              for(let i=sh+j;i<v.length;i++)v[i]=amp*(.6*base[i-sh]+.4*base[i-sh-j])+bl*(back[i-sh]||0)+(Math.random()-.5)*.01;
              out.push({song:song.id,name,ms,got:Math.round(voiceLag(v,tr,sr)/sr*1000)});}}
          return out;}""")
        for r in res:
            want=0 if r['name']=='silent' else r['ms']
            c.ok(abs(r['got']-want)<=45,f"{r['song']} {r['name']} {r['ms']} ms -> {r['got']} ms")
        c.ok(not pg.errs,'no page errors '+str(pg.errs[:3]));await b.close()
    if srv:srv.terminate()
    c.done()
asyncio.run(main())
