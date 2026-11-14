"""Challenge links, the phone's back button, sharing the score card."""
import asyncio
from common import *
async def main():
    c=Check('share');srv=serve()
    async with async_playwright() as pw:
        b=await browser(pw);pg=await page(b)
        await fresh(pg,'/?c=jingle.86.Adrian',prefs={'video':'0'})
        await pg.goto(BASE+'/?c=jingle.86.Adrian');await pg.wait_for_timeout(600)
        st=lambda:pg.evaluate("({scr:document.querySelector('.screen.on').id,sheet:[...document.querySelectorAll('.sheet.on')].map(x=>x.id).join(','),url:location.search})")
        c.ok('86%' in await pg.evaluate("belt.$('tonightLabel').textContent"),'challenge shows on home');c.ok((await st())['url']=='','address bar is tidied')
        await pg.click('#go');await pg.wait_for_timeout(900);await pg.go_back();await pg.wait_for_timeout(400)
        c.ok((await st())['scr']=='home','back from the picker goes home')
        await pg.click('#go');await pg.wait_for_timeout(900);await pg.click('#pickGo');await pg.wait_for_selector('#start:not([disabled])',timeout=30000)
        await pg.go_back();await pg.wait_for_timeout(300);c.ok((await st())['sheet']=='','back closes the song sheet')
        await pg.click('#pickGo');await pg.wait_for_timeout(300);await pg.click('#start');await pg.wait_for_timeout(500);await pg.click('#readyGo');await pg.wait_for_timeout(2500)
        await pg.go_back();await pg.wait_for_timeout(400);c.ok((await st())['sheet']=='quitSheet','back mid-song pauses')
        await pg.click('#qKeep')
        await pg.evaluate("(()=>{window.__shared=null;navigator.canShare=()=>true;navigator.share=async d=>{window.__shared={text:d.text,url:d.url,files:(d.files||[]).length}};})()")
        await pg.wait_for_selector('#result.on',timeout=90000);await pg.wait_for_timeout(2000)
        c.ok('Adrian' in await pg.evaluate("belt.$('sub').textContent"),'results compare with the challenger')
        await pg.click('#shareScore');await pg.wait_for_timeout(400);sh=await pg.evaluate("window.__shared")
        c.ok(bool(sh) and sh['files']==1 and '?c=jingle.' in sh['text'],'share sends the card and a challenge link')
        c.ok(not pg.errs,'no page errors '+str(pg.errs[:3]));await b.close()
    if srv:srv.terminate()
    c.done()
asyncio.run(main())
