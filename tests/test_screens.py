"""Every screen at phone and desktop size, with no page errors. Screenshots go to tests/out for a look."""
import asyncio
from common import *
async def run(pw,c,w,h,tag):
    b=await browser(pw);pg=await page(b,w,h,1)
    await fresh(pg,prefs={'video':'0'});await shot(pg,f'{tag}_home')
    c.ok(await pg.evaluate("performance.getEntriesByType('resource').some(e=>/\\/js\\/stage\\.js\\?v=/.test(e.name))"),f'{tag}: code files load with their stamps')
    await pg.click('#go');await pg.wait_for_timeout(1000);await shot(pg,f'{tag}_pick')
    await pg.click('#pickGo');await pg.wait_for_selector('#start:not([disabled])',timeout=30000);await shot(pg,f'{tag}_sheet')
    await pg.click('#start');await pg.wait_for_timeout(500);await shot(pg,f'{tag}_ready')
    await pg.click('#readyGo');await pg.wait_for_timeout(3500);await shot(pg,f'{tag}_sing')
    await pg.click('#quit');await pg.wait_for_timeout(300);await pg.evaluate("belt.run.stopT=12");await pg.click('#qFinish')
    await pg.wait_for_selector('#result.on',timeout=60000)
    await pg.evaluate("belt.last.until=null;belt.last.sc.cover=.9;belt.last.sc.acc=.86;belt.showResults()");await pg.wait_for_timeout(1500);await shot(pg,f'{tag}_result')
    await pg.click('#coachBtn');await pg.wait_for_timeout(500);await shot(pg,f'{tag}_breakdown')
    await pg.evaluate("belt.openMine()");await pg.wait_for_timeout(500);await shot(pg,f'{tag}_mine')
    for p in ('privacy','terms'):
        await pg.goto(f'{BASE}/{p}/');await pg.wait_for_timeout(200);await shot(pg,f'{tag}_{p}')
    c.ok(not pg.errs,f'{tag}: every screen opens without errors '+str(pg.errs[:3]));await b.close()
async def main():
    c=Check('screens');srv=serve()
    async with async_playwright() as pw:
        await run(pw,c,390,844,'phone');await run(pw,c,1440,900,'desktop')
    if srv:srv.terminate()
    c.done()
asyncio.run(main())
