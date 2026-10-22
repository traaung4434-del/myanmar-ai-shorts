import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

function App() {
  const [topic, setTopic] = useState("မိုးရွာတဲ့ညမှာ အိမ်ပြန်လာတဲ့ ကြောင်လေးအကြောင်း");
  const [style, setStyle] = useState("cinematic");
  const [duration, setDuration] = useState("30");
  const [script, setScript] = useState("");
  const [voice, setVoice] = useState("my");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [scenes, setScenes] = useState([]);

  function makeScript() {
    const s = `ခေါင်းစဉ် — ${topic}\n\n[အစပိုင်း]\nဒီနေ့ ပြောပြမယ့်အကြောင်းအရာကတော့ ${topic} ပါ။\n\n[အလယ်ပိုင်း]\nဇာတ်လမ်းကို စိတ်ဝင်စားစရာကောင်းအောင် ကြည့်ကြရအောင်။ အရေးကြီးတဲ့အချက်တွေကို သတိထားကြည့်ပါ။\n\n[အဆုံးသတ်]\nဒီဗီဒီယိုကို ကြိုက်တယ်ဆိုရင် Like လုပ်ပြီး နောက်ထပ်ဗီဒီယိုတွေအတွက် Follow လုပ်ထားနော်။`;
    setScript(s);
    setStatus("ဇာတ်ညွှန်း နမူနာဖန်တီးပြီးပါပြီ။");
    const count = Math.max(3, Math.min(6, Math.ceil(Number(duration)/8)));
    setScenes(Array.from({length: count}, (_,i)=>({
      title: `အပိုင်း ${i+1}`,
      prompt: `${topic}, ${style} visual, vertical 9:16 composition, scene ${i+1} of ${count}, no text, high quality`
    })));
  }

  function speakScript() {
    if (!script.trim()) { setStatus("အသံဖတ်ဖို့ ဇာတ်ညွှန်း အရင်ထည့်ပါ။"); return; }
    if (!("speechSynthesis" in window)) { setStatus("ဒီ Browser မှာ Text-to-Speech မရနိုင်ပါ။"); return; }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(script);
    utterance.lang = voice === "my" ? "my-MM" : "en-US";
    utterance.rate = 0.92;
    window.speechSynthesis.speak(utterance);
    setStatus("Browser အသံဖတ်စနစ်ကို စတင်ထားပါတယ်။ မြန်မာအသံ ရရှိမှုက စက်ပေါ်မူတည်ပါတယ်။");
  }

  function exportPlan() {
    const data = { topic, style, duration, script, scenes, note: "ဒီဖိုင်က video production plan ဖြစ်ပြီး render လုပ်ပြီးသား MP4 မဟုတ်ပါ။" };
    const blob = new Blob([JSON.stringify(data, null, 2)], {type:"application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href=url; a.download="ai-short-video-plan.json"; a.click();
    URL.revokeObjectURL(url);
    setStatus("Video အစီအစဉ်ဖိုင်ကို သိမ်းပြီးပါပြီ။");
  }

  return <main className="shell">
    <header className="topbar"><div className="brand"><span className="logo">▶</span><span>Shorts<span className="accent">AI</span></span></div><span className="pill">BETA · အခမဲ့နမူနာ</span></header>
    <section className="hero"><div className="eyebrow">AI CREATOR STUDIO</div><h1>စိတ်ကူးကနေ <span className="gradient">Short Video</span> ဆီ</h1><p>မြန်မာလို ဇာတ်ညွှန်းရေး၊ အသံဖတ်ပြီး 9:16 Short Video အတွက် အစီအစဉ်ဖန်တီးပါ။</p></section>
    <div className="layout">
      <section className="panel">
        <div className="section-heading"><span className="step">01</span><div><h2>ဗီဒီယို စိတ်ကူး</h2><p>ဘာအကြောင်းအရာ ဖန်တီးချင်လဲ?</p></div></div>
        <label>အကြောင်းအရာ</label><textarea value={topic} onChange={e=>setTopic(e.target.value)} rows="3" placeholder="ဥပမာ - အာကာသထဲက စိတ်ဝင်စားဖွယ် အချက် ၅ ချက်"/>
        <div className="two-col"><div><label>ဗီဒီယိုပုံစံ</label><select value={style} onChange={e=>setStyle(e.target.value)}><option value="cinematic">🎬 ရုပ်ရှင်ဆန်ဆန်</option><option value="anime">🌸 Anime</option><option value="documentary">🌍 မှတ်တမ်းရုပ်ရှင်</option><option value="cartoon">🎨 ကာတွန်း</option><option value="realistic">📷 လက်တွေ့ဆန်ဆန်</option></select></div><div><label>ကြာချိန်</label><select value={duration} onChange={e=>setDuration(e.target.value)}><option value="15">15 စက္ကန့်</option><option value="30">30 စက္ကန့်</option><option value="45">45 စက္ကန့်</option><option value="60">60 စက္ကန့်</option></select></div></div>
        <button className="primary" onClick={makeScript}>✦ ဇာတ်ညွှန်းနဲ့ Scene Plan ဖန်တီးမယ်</button>
        <div className="divider"></div>
        <div className="section-heading"><span className="step">02</span><div><h2>ဇာတ်ညွှန်းနဲ့ အသံ</h2><p>စာသားကို ပြင်ဆင်ပြီး အသံဖတ်ကြည့်ပါ။</p></div></div>
        <label>ဇာတ်ညွှန်း</label><textarea value={script} onChange={e=>setScript(e.target.value)} rows="8" placeholder="ဖန်တီးထားတဲ့ ဇာတ်ညွှန်း ဒီနေရာမှာ ပေါ်လာမယ်..."/>
        <div className="two-col"><div><label>အသံဘာသာစကား</label><select value={voice} onChange={e=>setVoice(e.target.value)}><option value="my">မြန်မာ (စက်ပေါ်မူတည်)</option><option value="en">အင်္ဂလိပ်</option></select></div><div className="voice-button"><label>အသံနမူနာ</label><button className="secondary" onClick={speakScript}>🔊 အသံဖတ်မယ်</button></div></div>
      </section>
      <aside className="preview">
        <div className="section-heading"><span className="step">03</span><div><h2>Shorts Preview</h2><p>9:16 ဒေါင်လိုက်ဖွဲ့စည်းပုံ</p></div></div>
        <div className="phone"><div className="phone-top"><span>● ● ●</span><span>SHORTS</span></div><div className="visual"><div className="orb"></div><div className="play">▶</div><div className="preview-copy"><span className="tag">AI STORY</span><h3>{topic || "သင့်ရဲ့ စိတ်ကူး"}</h3><p>{script ? script.slice(0,95)+"…" : "ဇာတ်ညွှန်းဖန်တီးလိုက်ရင် ဒီနေရာမှာ ပြပါမယ်။"}</p></div></div><div className="phone-bottom"><span>♡ 12.4K</span><span>💬 348</span><span>↗ Share</span></div></div>
        <div className="format-row"><span>📱 9:16 Vertical</span><span>⏱ {duration}s</span></div>
        <button className="primary" onClick={exportPlan}>↓ Video Plan သိမ်းမယ်</button>
        <p className="notice">သတိပြုရန် — ဒီနမူနာက ဇာတ်ညွှန်းနဲ့ Scene Plan ဖန်တီးပေးပြီး Browser ရဲ့ အသံဖတ်စနစ်ကို သုံးပါတယ်။ MP4 ဗီဒီယိုအမှန် ဖန်တီးရန် Video Generation API နှင့် video rendering backend ချိတ်ဆက်ရန် လိုပါတယ်။</p>
      </aside>
    </div>
    <section className="scenes"><div className="section-heading"><span className="step">04</span><div><h2>Scene Plan</h2><p>AI Video Generator ထဲ ထည့်သုံးနိုင်တဲ့ visual prompt များ</p></div></div>
      {scenes.length ? <div className="scene-grid">{scenes.map((s,i)=><article className="scene" key={i}><span className="scene-num">SCENE 0{i+1}</span><h3>{s.title}</h3><p>{s.prompt}</p><button className="text-button" onClick={()=>{navigator.clipboard?.writeText(s.prompt);setStatus("Scene prompt ကို copy လုပ်ဖို့ ကြိုးစားပြီးပါပြီ။")}}>Prompt Copy ↗</button></article>)}</div> : <div className="empty">စိတ်ကူးတစ်ခုရေးပြီး “ဇာတ်ညွှန်းနဲ့ Scene Plan ဖန်တီးမယ်” ကို နှိပ်ပါ။</div>}
    </section>
    {status && <div className="status" role="status">{status}</div>}
    <footer>ShortsAI · Prototype for creators <span>မြန်မာဖန်တီးသူများအတွက် 💜</span></footer>
  </main>
}
createRoot(document.getElementById("root")).render(<App/>);
