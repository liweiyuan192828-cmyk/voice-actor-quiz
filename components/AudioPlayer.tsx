"use client";
import { useRef, useState } from "react";
export function AudioPlayer({ src, onUnlocked }: { src: string; onUnlocked: () => void }) {
  const audio = useRef<HTMLAudioElement>(null); const [playing, setPlaying] = useState(false); const [progress, setProgress] = useState(0);
  const toggle = async () => { const a = audio.current; if (!a) return; if (a.paused) { await a.play(); setPlaying(true); onUnlocked(); } else { a.pause(); setPlaying(false); } };
  return <div className="glass rounded-3xl p-5"><audio ref={audio} src={src} onEnded={() => setPlaying(false)} onTimeUpdate={() => { const a = audio.current; if (a?.duration) setProgress(a.currentTime / a.duration * 100); }} />
    <div className="flex items-center gap-4"><button onClick={toggle} className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-cyan text-xl text-ink transition active:scale-90">{playing ? "Ⅱ" : "▶"}</button><div className="min-w-0 flex-1"><p className="mb-2 text-xs tracking-[.22em] text-slate-400">AUDIO SIGNAL</p><div className="flex h-8 items-center gap-1 overflow-hidden">{Array.from({ length: 31 }).map((_, i) => <i key={i} className={playing ? "pulse-bar" : ""} style={{ height: `${18 + (i * 17 % 78)}%`, animationDelay: `${i * 35}ms` }} />)}</div><div className="mt-2 h-1 overflow-hidden rounded bg-slate-700"><div className="h-full bg-cyan transition-all" style={{ width: `${progress}%` }} /></div></div></div></div>;
}
