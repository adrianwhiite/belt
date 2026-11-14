"""The stage: mic meter, skip intro, pause, keep singing, start over."""
import asyncio
from common import *
async def main():
    c=Check('stage');srv=serve()
    async with async_playwright() as pw:
        b=await browser(pw,mic=True);pg=await page(b)
        await fresh(pg,prefs={'video':'0'})
        await pg.click('#go');await pg.wait_for_timeout(800);await pg.click('#pickGo');await pg.wait_for_selector('#start:not([disabled])',timeout=30000)
        await pg.click('#start');await pg.wait_for_timeout(700);c.ok(not await pg.evaluate("demo"),'fake mic is used')
        await pg.click('#readyGo');await pg.wait_for_timeout(3000);await shot(pg,'stage_sing')
        c.ok(await pg.evaluate("[...$('micMeter').children].some(i=>i.style.opacity==='1')"),'mic meter lights up')
        r=await pg.evaluate("""async()=>{const L=run.song.lines[0],o=L.start;L.start=songTime()+20;await new Promise(r=>setTimeout(r,250));const shown=!$('skipIntro').hidden;
          $('skipIntro').click();await new Promise(r=>setTimeout(r,300));const t=songTime(),goal=L.start-4;L.start=o;return {shown,err:Math.abs(t-goal)}}""")
        c.ok(r['shown'],'Skip intro appears for a long intro');c.ok(r['err']<1,'Skip intro jumps to just before the words')
        await pg.click('#quit');await pg.wait_for_timeout(400);c.ok(await pg.evaluate("ctx.state")=='suspended','pause stops the music');await shot(pg,'stage_paused')
        await pg.click('#qKeep');await pg.wait_for_timeout(400);c.ok(await pg.evaluate("ctx.state")=='running','keep singing resumes')
        await pg.click('#quit');await pg.wait_for_timeout(300);await pg.click('#qAgain');await pg.wait_for_timeout(800)
        c.ok(await pg.evaluate("!run&&!!document.querySelector('#readyGo')"),'start over returns to the ready screen')
        c.ok(not pg.errs,'no page errors '+str(pg.errs[:3]));await b.close()
    if srv:srv.terminate()
    c.done()
asyncio.run(main())
