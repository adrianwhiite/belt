"""Party: two phones in one room (a stand-in room relays messages between two tabs), one round, a winner."""
import asyncio,sys,os
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from common import *
ROOM="""()=>{belt.sb={channel:t=>{const bc=new BroadcastChannel(t);let cb;return {_bc:bc,on(a,b,f){cb=f;return this},subscribe(f){bc.onmessage=e=>cb&&cb({payload:e.data});setTimeout(()=>f('SUBSCRIBED'),20);return this},send(m){bc.postMessage(m.payload);return Promise.resolve('ok')}}},removeChannel(c){c._bc.close()}};}"""
async def turn(pg):
    await pg.click('#pSing');await pg.wait_for_timeout(700);await pg.click('#pickGo');await pg.wait_for_selector('#start:not([disabled])',timeout=30000)
    await pg.click('#start');await pg.wait_for_timeout(400);await pg.click('#readyGo');await pg.wait_for_timeout(9000)
async def main():
    srv=serve();c=Check('party')
    async with async_playwright() as pw:
        b=await browser(pw);ctx=await b.new_context(viewport={'width':390,'height':844},device_scale_factor=2)
        pgs=[]
        for i in range(2):
            pg=await ctx.new_page();pg.errs=[];pg.on('pageerror',lambda e,pg=pg:pg.errs.append(str(e)))
            await pg.route('https://fonts.googleapis.com/**',lambda r:r.abort());await pg.route('https://cdn.jsdelivr.net/**',lambda r:r.abort())
            await pg.goto(BASE+'/')
            if i==0:await pg.evaluate("indexedDB.deleteDatabase('belt');localStorage.clear();localStorage.setItem('belt.video','0');localStorage.setItem('belt.pvOff','1')");await pg.reload()
            await pg.wait_for_timeout(600);await pg.evaluate(ROOM);pgs.append(pg)
        h,g=pgs
        c.ok(await h.locator('#modes [data-mode=party]').count()==1,'home shows a Party tile')
        await h.click('#modes [data-mode=party]');await h.fill('#pName','Hana');await h.fill('#pPw','duck');await h.click('#pGo');await h.wait_for_selector('.p-code b')
        code=await h.inner_text('.p-code b');c.ok(len(code)==6,f'host gets a 6-letter code ({code})')
        # wrong password can't find the room
        await g.click('#modes [data-mode=party]');await g.click('[data-tab=join]');await g.fill('#pName','Gus');await g.fill('#pCode',code);await g.fill('#pPw','goose');await g.click('#pGo')
        await g.wait_for_selector('.p-err',timeout=12000);c.ok('find' in await g.inner_text('.p-err'),'wrong password does not get in')
        await g.fill('#pPw','duck');await g.click('#pGo');await g.wait_for_selector('.p-code b',timeout=8000)
        await h.wait_for_timeout(500);c.ok(await h.locator('.p-row').count()==2 and await g.locator('.p-row').count()==2,'both see two singers in the lobby')
        await shot(h,'party_lobby')
        await h.click('[data-rounds="1"]');await h.click('#pStart');await g.wait_for_timeout(600)
        c.ok('picking' in await g.inner_text('.p-stage h3'),'guest sees the host picking a song')
        await turn(h)
        c.ok('is singing' in await g.inner_text('.p-stage h3'),'guest sees who is singing and what');await shot(g,'party_watch')
        c.ok(await g.inner_text('#pLine')!='' ,'guest sees the lyric line live')
        await g.click('[data-cheer="1"]');await h.wait_for_timeout(500);c.ok('Gus' in await h.inner_text('#toast'),'cheers reach the singer')
        await h.click('#quit');await h.wait_for_timeout(300);await h.click('#qFinish');await g.wait_for_selector('#pSing',timeout=30000)
        c.ok(await h.evaluate("document.getElementById('party').classList.contains('on')"),'singer lands back in the party, not on the results page')
        await turn(g);await g.click('#quit');await g.wait_for_timeout(300);await g.click('#qFinish')
        await h.wait_for_selector('#pAgain',timeout=30000);await g.wait_for_selector('#pLeave',timeout=10000);await shot(h,'party_final')
        st=await h.evaluate("belt.party.state");c.ok(st['phase']=='final' and len(st['order'])==2,'the party ends with a final scoreboard')
        c.ok('wins' in await g.inner_text('.p-stage h3') or 'tie' in await g.inner_text('.p-stage h3'),'guest sees the winner')
        await g.click('#pLeave');await h.wait_for_timeout(600)
        for pg in pgs:c.ok(not pg.errs,f'no page errors {pg.errs[:2]}')
        await b.close()
    if srv:srv.terminate()
    return c.done()
if __name__=='__main__':sys.exit(asyncio.run(main()))
