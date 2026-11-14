"""Run every test: python3 tests/run.py   (or name some: python3 tests/run.py stage share)"""
import subprocess, sys, os, time
from common import serve, HERE
TESTS=['screens','stage','share','timing','flow']
pick=[t for t in sys.argv[1:]] or TESTS
srv=serve();bad=[]
for t in pick:
    t0=time.time();r=subprocess.run([sys.executable,os.path.join(HERE,f'test_{t}.py')])
    print(f'-- {t} {"passed" if r.returncode==0 else "FAILED"} in {time.time()-t0:.0f}s\n');bad+=[t] if r.returncode else []
if srv:srv.terminate()
print('ALL PASSED' if not bad else 'FAILED: '+', '.join(bad));sys.exit(1 if bad else 0)
