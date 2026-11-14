#!/usr/bin/env python3
"""Stamps every CSS and JS file in index.html with a hash of its contents.

Phones keep old copies of files. A new stamp means a new address, so a changed file is always
fetched fresh and an unchanged one stays cached. Run after editing anything in css/ or js/:

    python3 tools/stamp.py          # rewrite index.html
    python3 tools/stamp.py --check  # exit 1 if a stamp is stale (the tests run this)
"""
import hashlib, json, pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
INDEX = ROOT / 'index.html'


def h(p):
    return hashlib.sha256(p.read_bytes()).hexdigest()[:10]


def stamped(html):
    css = ROOT / 'css/app.css'
    html = re.sub(r'href="/css/app\.css(\?v=[^"]*)?"', f'href="/css/app.css?v={h(css)}"', html)
    js = sorted((ROOT / 'js').glob('*.js'))
    imports = {f'/js/{p.name}': f'/js/{p.name}?v={h(p)}' for p in js if p.name != 'main.js'}
    block = ('<script type="importmap">' + json.dumps({'imports': imports}, indent=1) + '</script>\n'
             f'<script type="module" src="/js/main.js?v={h(ROOT / "js/main.js")}"></script>')
    return re.sub(r'(<script type="importmap">.*?</script>\n)?<script type="module" src="/js/main\.js[^"]*"></script>',
                  lambda m: block, html, count=1, flags=re.S)


if __name__ == '__main__':
    old = INDEX.read_text()
    new = stamped(old)
    if '--check' in sys.argv:
        if new != old:
            print('stamps are stale: run python3 tools/stamp.py'); sys.exit(1)
        print('stamps are current')
    elif new != old:
        INDEX.write_text(new); print('index.html stamped')
    else:
        print('already current')
