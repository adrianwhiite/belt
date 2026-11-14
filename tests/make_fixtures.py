"""Synthetic audio for the own-song test: a 'singer' and a 'band', 64 s, mono 44.1 kHz.
Made from tones so no recorded music lives in this public repo. Needs ffmpeg for the mp3."""
import os, math, struct, wave, random, subprocess
from common import FIX
SR=44100;DUR=64;N=SR*DUR
LINES=[1,2,3,4,5,6,10,11,12,13,14]          # matches the test lyrics: line i starts at i*4+9.4 s
MEL=[64,62,60,62,64,64,64,62,62,64,67,67]
def tone(buf,t0,d,midi,amp,bright=6,vib=0.0):
    f=440*2**((midi-69)/12);a=int(t0*SR);n=int(d*SR)
    for i in range(n):
        if a+i>=N:break
        t=i/SR;env=min(1,t/.03)*min(1,(d-t)/.06)
        ph=2*math.pi*f*t+vib*math.sin(2*math.pi*5.5*t)
        buf[a+i]+=amp*env*sum(math.sin(k*ph)/k for k in range(1,bright+1))
def write(name,buf):
    peak=max(1e-9,max(abs(x) for x in buf));p=os.path.join(FIX,name)
    with wave.open(p,'wb') as w:
        w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR)
        w.writeframes(b''.join(struct.pack('<h',int(32000*x/peak*.8)) for x in buf))
    return p
def main():
    os.makedirs(FIX,exist_ok=True)
    if all(os.path.exists(os.path.join(FIX,f)) for f in ('vocal9.wav','inst.wav','track.mp3')):return
    random.seed(7);voc=[0.0]*N;inst=[0.0]*N
    for li in LINES:
        t=li*4+9.4
        for k in range(6):tone(voc,t+k*.48,.42,MEL[(li+k)%len(MEL)],.5,bright=8,vib=.6)
    for bar in range(DUR//2):
        root=[48,53,55,48][bar%4]
        for m in (root,root+4,root+7):tone(inst,bar*2,1.95,m,.12,bright=3)
    v=write('vocal9.wav',voc);i=write('inst.wav',inst)
    mix=write('mix.wav',[a+b for a,b in zip(voc,inst)])
    subprocess.run(['ffmpeg','-v','error','-y','-i',mix,'-b:a','64k',os.path.join(FIX,'track.mp3')],check=True);os.remove(mix)
if __name__=='__main__':main()
