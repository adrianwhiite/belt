# Belt tests

Browser tests that drive the real app in headless Chrome.

```
pip install playwright        # once; uses the system Chrome at /usr/bin/google-chrome (or set CHROME=...)
python3 tests/run.py          # everything, about 5 minutes
python3 tests/run.py stage    # just one: screens, stage, share, timing, flow
```

- A static server starts on port 8765 (set `BELT_PORT` to change it).
- Screenshots land in `tests/out/`. The own-song test makes synthetic audio in `tests/fixtures/` (needs `ffmpeg`). Both folders are ignored by git.
- Outside services (Supabase, LRCLIB, MusicBrainz, the AI functions) are stubbed, so no keys or network are needed.

Run the whole suite before every push.
