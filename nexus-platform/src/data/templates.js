const T = (s) => s;

export const TEMPLATES = {
  'artist-musician': T(`<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>{{BUSINESS_NAME}} — Musician</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',system-ui,-apple-system,sans-serif;background:{{ACCENT_COLOR}}11;color:#111;line-height:1.6}
.hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:2rem;
  background:linear-gradient(135deg,{{ACCENT_COLOR}}22 0%,{{ACCENT_COLOR}}44 50%,{{ACCENT_COLOR}}11 100%);position:relative;overflow:hidden}
.hero::before{content:'';position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,{{ACCENT_COLOR}}33,transparent 70%);top:-200px;right:-200px;animation:float 8s ease-in-out infinite}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-30px)}}
.hero h1{font-size:clamp(2.5rem,8vw,5rem);font-weight:900;letter-spacing:-0.03em;margin-bottom:0.5rem;background:linear-gradient(135deg,#fff,{{ACCENT_COLOR}});-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero .tagline{font-size:clamp(1rem,3vw,1.5rem);color:rgba(255,255,255,0.8);max-width:600px;margin-bottom:2rem}
.hero .bio{font-size:clamp(0.9rem,2vw,1.1rem);color:rgba(255,255,255,0.6);max-width:500px;line-height:1.8}
.section{padding:4rem 2rem;max-width:900px;margin:0 auto}
.section h2{font-size:2rem;font-weight:800;margin-bottom:2rem;color:{{ACCENT_COLOR}}}
.info-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.5rem}
.info-card{padding:1.5rem;border-radius:16px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1)}
.info-card h3{font-size:0.85rem;text-transform:uppercase;letter-spacing:0.1em;color:{{ACCENT_COLOR}};margin-bottom:0.5rem}
.info-card p{color:rgba(255,255,255,0.7)}
footer{text-align:center;padding:2rem;color:rgba(255,255,255,0.4);font-size:0.85rem;border-top:1px solid rgba(255,255,255,0.06)}
</style></head>
<body>
<div class="hero">
  <h1>{{BUSINESS_NAME}}</h1>
  <div class="tagline">{{TAGLINE}}</div>
  <div class="bio">{{BIO}}</div>
</div>
<div class="section">
  <h2>About</h2>
  <p style="color:rgba(255,255,255,0.7);font-size:1.1rem;line-height:1.8">{{BIO}}</p>
</div>
<div class="section">
  <h2>Details</h2>
  <div class="info-grid">
    <div class="info-card"><h3>Location</h3><p>{{LOCATION}}</p></div>
    <div class="info-card"><h3>Contact</h3><p>{{EMAIL}}</p></div>
    <div class="info-card"><h3>Social</h3><p>{{SOCIAL}}</p></div>
    <div class="info-card"><h3>Category</h3><p>{{CATEGORY}}</p></div>
  </div>
</div>
<div class="section" style="text-align:center">
  <p style="color:rgba(255,255,255,0.5);font-style:italic">{{FEATURES}}</p>
</div>
<footer>Powered by NEXUS Business &copy; 2026</footer>
</body></html>`),

  'dj-producer': T(`<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>{{BUSINESS_NAME}} — DJ / Producer</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',system-ui,-apple-system,sans-serif;background:#0a0a0f;color:#e8edf2;line-height:1.6}
.hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:2rem;
  background:linear-gradient(135deg,#0a0a0f 0%,{{ACCENT_COLOR}}22 60%,#0a0a0f 100%);position:relative;overflow:hidden}
.hero::before{content:'';position:absolute;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,{{ACCENT_COLOR}}22,transparent 60%);top:-300px;left:-200px;animation:pulse 6s ease-in-out infinite}
@keyframes pulse{0%,100%{transform:scale(1);opacity:0.5}50%{transform:scale(1.1);opacity:1}}
.hero h1{font-size:clamp(2.5rem,8vw,5rem);font-weight:900;letter-spacing:-0.03em;margin-bottom:0.5rem;background:linear-gradient(135deg,#e8edf2,{{ACCENT_COLOR}});-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero .tagline{font-size:clamp(1rem,3vw,1.5rem);color:{{ACCENT_COLOR}}aa;max-width:600px;margin-bottom:2rem;letter-spacing:0.05em}
.section{padding:4rem 2rem;max-width:900px;margin:0 auto}
.section h2{font-size:1.5rem;font-weight:800;margin-bottom:2rem;color:{{ACCENT_COLOR}};text-transform:uppercase;letter-spacing:0.15em}
.info-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.5rem}
.info-card{padding:1.5rem;border-radius:12px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06)}
.info-card h3{font-size:0.75rem;text-transform:uppercase;letter-spacing:0.15em;color:{{ACCENT_COLOR}};margin-bottom:0.5rem}
.info-card p{color:rgba(255,255,255,0.6)}
.tag{display:inline-block;padding:0.35rem 1rem;border-radius:20px;background:{{ACCENT_COLOR}}22;color:{{ACCENT_COLOR}};font-size:0.85rem;font-weight:600;margin-top:1rem}
footer{text-align:center;padding:2rem;color:rgba(255,255,255,0.3);font-size:0.85rem;border-top:1px solid rgba(255,255,255,0.06)}
</style></head>
<body>
<div class="hero">
  <h1>{{BUSINESS_NAME}}</h1>
  <div class="tagline">{{TAGLINE}}</div>
  <span class="tag">{{CATEGORY}}</span>
</div>
<div class="section">
  <h2>Bio</h2>
  <p style="color:rgba(255,255,255,0.7);font-size:1.1rem;line-height:1.8">{{BIO}}</p>
</div>
<div class="section">
  <h2>Info</h2>
  <div class="info-grid">
    <div class="info-card"><h3>Location</h3><p>{{LOCATION}}</p></div>
    <div class="info-card"><h3>Contact</h3><p>{{EMAIL}}</p></div>
    <div class="info-card"><h3>Social</h3><p>{{SOCIAL}}</p></div>
  </div>
</div>
<div class="section" style="text-align:center;color:rgba(255,255,255,0.5);font-style:italic">{{FEATURES}}</div>
<footer>Powered by NEXUS Business</footer>
</body></html>`),

  'recording-studio': T(`<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>{{BUSINESS_NAME}} — Recording Studio</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',system-ui,-apple-system,sans-serif;background:#0c0c10;color:#d0d4da;line-height:1.6}
.hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:2rem;
  background:linear-gradient(180deg,#0c0c10 0%,{{ACCENT_COLOR}}18 50%,#0c0c10 100%)}
.hero h1{font-size:clamp(2.5rem,8vw,5rem);font-weight:800;letter-spacing:-0.02em;color:#fff;margin-bottom:0.5rem;text-shadow:0 0 60px {{ACCENT_COLOR}}44}
.hero .tagline{font-size:clamp(1rem,3vw,1.4rem);color:{{ACCENT_COLOR}}aa;max-width:600px;margin-bottom:1.5rem}
.hero .bio{color:rgba(255,255,255,0.5);max-width:500px}
.section{padding:4rem 2rem;max-width:900px;margin:0 auto}
.section h2{font-size:1.25rem;font-weight:700;margin-bottom:2rem;color:{{ACCENT_COLOR}};text-transform:uppercase;letter-spacing:0.1em}
.info-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem}
.info-card{padding:1.25rem;border-radius:10px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06)}
.info-card h3{font-size:0.7rem;text-transform:uppercase;letter-spacing:0.15em;color:{{ACCENT_COLOR}}aa;margin-bottom:0.4rem}
.info-card p{color:rgba(255,255,255,0.5);font-size:0.9rem}
footer{text-align:center;padding:2rem;color:rgba(255,255,255,0.25);font-size:0.8rem;border-top:1px solid rgba(255,255,255,0.04)}
</style></head>
<body>
<div class="hero">
  <h1>{{BUSINESS_NAME}}</h1>
  <div class="tagline">{{TAGLINE}}</div>
  <div class="bio">{{BIO}}</div>
</div>
<div class="section">
  <h2>About</h2>
  <p style="color:rgba(255,255,255,0.55);font-size:1rem;line-height:1.8">{{BIO}}</p>
</div>
<div class="section">
  <h2>Contact & Location</h2>
  <div class="info-grid">
    <div class="info-card"><h3>Location</h3><p>{{LOCATION}}</p></div>
    <div class="info-card"><h3>Email</h3><p>{{EMAIL}}</p></div>
    <div class="info-card"><h3>Social</h3><p>{{SOCIAL}}</p></div>
  </div>
</div>
<div class="section" style="color:rgba(255,255,255,0.4);font-style:italic;text-align:center">{{FEATURES}}</div>
<footer>Powered by NEXUS Business</footer>
</body></html>`),

  'director-filmmaker': T(`<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>{{BUSINESS_NAME}} — Director / Filmmaker</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',system-ui,-apple-system,sans-serif;background:#08080c;color:#ccd0d6;line-height:1.6}
.hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:2rem;
  background:linear-gradient(135deg,#08080c 0%,{{ACCENT_COLOR}}18 50%,#08080c 100%);position:relative}
.hero::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,{{ACCENT_COLOR}},transparent)}
.hero h1{font-size:clamp(2.5rem,8vw,5rem);font-weight:900;letter-spacing:-0.02em;color:#fff;margin-bottom:0.75rem}
.hero .tagline{font-size:clamp(1rem,3vw,1.3rem);color:{{ACCENT_COLOR}}bb;max-width:600px;font-style:italic}
.section{padding:4rem 2rem;max-width:900px;margin:0 auto}
.section h2{font-size:1.1rem;font-weight:700;margin-bottom:2rem;color:{{ACCENT_COLOR}};text-transform:uppercase;letter-spacing:0.2em}
.info-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.25rem}
.info-card{padding:1.5rem;border-radius:8px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-left:3px solid {{ACCENT_COLOR}}}
.info-card h3{font-size:0.7rem;text-transform:uppercase;letter-spacing:0.15em;color:{{ACCENT_COLOR}}aa;margin-bottom:0.5rem}
.info-card p{color:rgba(255,255,255,0.5);font-size:0.9rem}
footer{text-align:center;padding:2rem;color:rgba(255,255,255,0.25);font-size:0.8rem;border-top:1px solid rgba(255,255,255,0.04)}
</style></head>
<body>
<div class="hero">
  <h1>{{BUSINESS_NAME}}</h1>
  <div class="tagline">{{TAGLINE}}</div>
</div>
<div class="section">
  <h2>Bio</h2>
  <p style="color:rgba(255,255,255,0.55);font-size:1rem;line-height:1.8;max-width:700px">{{BIO}}</p>
</div>
<div class="section">
  <h2>Details</h2>
  <div class="info-grid">
    <div class="info-card"><h3>Location</h3><p>{{LOCATION}}</p></div>
    <div class="info-card"><h3>Email</h3><p>{{EMAIL}}</p></div>
    <div class="info-card"><h3>Social</h3><p>{{SOCIAL}}</p></div>
    <div class="info-card"><h3>Category</h3><p>{{CATEGORY}}</p></div>
  </div>
</div>
<div class="section" style="text-align:center;color:rgba(255,255,255,0.4);font-style:italic">{{FEATURES}}</div>
<footer>Powered by NEXUS Business</footer>
</body></html>`),

  'actor-performer': T(`<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>{{BUSINESS_NAME}} — Actor / Performer</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',system-ui,-apple-system,sans-serif;background:#08080c;color:#d0d4dc;line-height:1.6}
.hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:2rem;
  background:radial-gradient(ellipse at 50% 0%,{{ACCENT_COLOR}}22 0%,#08080c 70%);position:relative;overflow:hidden}
.hero h1{font-size:clamp(3rem,10vw,6rem);font-weight:900;letter-spacing:-0.03em;color:#fff;margin-bottom:0.5rem;text-shadow:0 0 80px {{ACCENT_COLOR}}44}
.hero .tagline{font-size:clamp(1.1rem,3vw,1.5rem);color:{{ACCENT_COLOR}}cc;max-width:600px;margin-bottom:1rem}
.hero .bio{color:rgba(255,255,255,0.5);max-width:450px}
.section{padding:4rem 2rem;max-width:900px;margin:0 auto}
.section h2{font-size:1.25rem;font-weight:700;margin-bottom:2rem;color:{{ACCENT_COLOR}};text-transform:uppercase;letter-spacing:0.15em}
.info-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem}
.info-card{padding:1.5rem;border-radius:12px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);text-align:center}
.info-card h3{font-size:0.7rem;text-transform:uppercase;letter-spacing:0.15em;color:{{ACCENT_COLOR}}aa;margin-bottom:0.4rem}
.info-card p{color:rgba(255,255,255,0.5)}
footer{text-align:center;padding:2rem;color:rgba(255,255,255,0.25);font-size:0.8rem;border-top:1px solid rgba(255,255,255,0.04)}
</style></head>
<body>
<div class="hero">
  <h1>{{BUSINESS_NAME}}</h1>
  <div class="tagline">{{TAGLINE}}</div>
  <div class="bio">{{BIO}}</div>
</div>
<div class="section">
  <h2>About</h2>
  <p style="color:rgba(255,255,255,0.55);font-size:1.05rem;line-height:1.8">{{BIO}}</p>
</div>
<div class="section">
  <h2>Info</h2>
  <div class="info-grid">
    <div class="info-card"><h3>Location</h3><p>{{LOCATION}}</p></div>
    <div class="info-card"><h3>Email</h3><p>{{EMAIL}}</p></div>
    <div class="info-card"><h3>Social</h3><p>{{SOCIAL}}</p></div>
    <div class="info-card"><h3>Category</h3><p>{{CATEGORY}}</p></div>
  </div>
</div>
<div class="section" style="text-align:center;color:rgba(255,255,255,0.4);font-style:italic">{{FEATURES}}</div>
<footer>Powered by NEXUS Business</footer>
</body></html>`),

  'music-cafe': T(`<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>{{BUSINESS_NAME}} — Music Cafe</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',system-ui,-apple-system,sans-serif;background:#0c0808;color:#d4ccc8;line-height:1.6}
.hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:2rem;
  background:linear-gradient(180deg,#0c0808 0%,{{ACCENT_COLOR}}15 50%,#0c0808 100%);position:relative}
.hero h1{font-size:clamp(2.5rem,8vw,5rem);font-weight:800;letter-spacing:-0.02em;color:#f0e8e0;margin-bottom:0.5rem}
.hero .tagline{font-size:clamp(1rem,3vw,1.3rem);color:{{ACCENT_COLOR}}bb;max-width:600px;margin-bottom:1.5rem}
.section{padding:4rem 2rem;max-width:900px;margin:0 auto}
.section h2{font-size:1.25rem;font-weight:700;margin-bottom:2rem;color:{{ACCENT_COLOR}};text-transform:uppercase;letter-spacing:0.1em}
.info-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.25rem}
.info-card{padding:1.5rem;border-radius:16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06)}
.info-card h3{font-size:0.7rem;text-transform:uppercase;letter-spacing:0.15em;color:{{ACCENT_COLOR}}aa;margin-bottom:0.4rem}
.info-card p{color:rgba(255,255,255,0.5)}
.badge{display:inline-block;padding:0.3rem 0.8rem;border-radius:20px;background:{{ACCENT_COLOR}}22;color:{{ACCENT_COLOR}};font-size:0.8rem;font-weight:600;margin-top:0.5rem}
footer{text-align:center;padding:2rem;color:rgba(255,255,255,0.25);font-size:0.8rem;border-top:1px solid rgba(255,255,255,0.04)}
</style></head>
<body>
<div class="hero">
  <span class="badge">{{CATEGORY}}</span>
  <h1>{{BUSINESS_NAME}}</h1>
  <div class="tagline">{{TAGLINE}}</div>
</div>
<div class="section">
  <h2>About</h2>
  <p style="color:rgba(255,255,255,0.55);font-size:1rem;line-height:1.8">{{BIO}}</p>
</div>
<div class="section">
  <h2>Find Us</h2>
  <div class="info-grid">
    <div class="info-card"><h3>Location</h3><p>{{LOCATION}}</p></div>
    <div class="info-card"><h3>Contact</h3><p>{{EMAIL}}</p></div>
    <div class="info-card"><h3>Social</h3><p>{{SOCIAL}}</p></div>
  </div>
</div>
<div class="section" style="text-align:center;color:rgba(255,255,255,0.4);font-style:italic">{{FEATURES}}</div>
<footer>Powered by NEXUS Business</footer>
</body></html>`),

  'cinema-theater': T(`<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>{{BUSINESS_NAME}} — Cinema / Theater</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',system-ui,-apple-system,sans-serif;background:#060608;color:#c8c8d0;line-height:1.6}
.hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:2rem;
  background:radial-gradient(ellipse at 50% 30%,{{ACCENT_COLOR}}18 0%,#060608 70%)}
.hero h1{font-size:clamp(2.5rem,8vw,5rem);font-weight:900;letter-spacing:-0.02em;color:#f0f0f4;margin-bottom:0.5rem}
.hero .tagline{font-size:clamp(1rem,3vw,1.3rem);color:{{ACCENT_COLOR}}bb;max-width:600px;margin-bottom:1.5rem;font-style:italic}
.section{padding:4rem 2rem;max-width:900px;margin:0 auto}
.section h2{font-size:1.1rem;font-weight:700;margin-bottom:2rem;color:{{ACCENT_COLOR}};text-transform:uppercase;letter-spacing:0.2em}
.info-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.25rem}
.info-card{padding:1.5rem;border-radius:4px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.04)}
.info-card h3{font-size:0.7rem;text-transform:uppercase;letter-spacing:0.15em;color:{{ACCENT_COLOR}}88;margin-bottom:0.4rem}
.info-card p{color:rgba(255,255,255,0.45)}
footer{text-align:center;padding:2rem;color:rgba(255,255,255,0.2);font-size:0.8rem;border-top:1px solid rgba(255,255,255,0.03)}
</style></head>
<body>
<div class="hero">
  <h1>{{BUSINESS_NAME}}</h1>
  <div class="tagline">{{TAGLINE}}</div>
</div>
<div class="section">
  <h2>About</h2>
  <p style="color:rgba(255,255,255,0.5);font-size:1rem;line-height:1.8">{{BIO}}</p>
</div>
<div class="section">
  <h2>Info</h2>
  <div class="info-grid">
    <div class="info-card"><h3>Location</h3><p>{{LOCATION}}</p></div>
    <div class="info-card"><h3>Email</h3><p>{{EMAIL}}</p></div>
    <div class="info-card"><h3>Social</h3><p>{{SOCIAL}}</p></div>
  </div>
</div>
<div class="section" style="text-align:center;color:rgba(255,255,255,0.35);font-style:italic">{{FEATURES}}</div>
<footer>Powered by NEXUS Business</footer>
</body></html>`),

  'production-house': T(`<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>{{BUSINESS_NAME}} — Production House</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',system-ui,-apple-system,sans-serif;background:#0a0a0e;color:#d0d4da;line-height:1.6}
.hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:2rem;
  background:linear-gradient(135deg,#0a0a0e 0%,{{ACCENT_COLOR}}15 50%,#0a0a0e 100%);position:relative}
.hero h1{font-size:clamp(2.5rem,8vw,5rem);font-weight:900;letter-spacing:-0.02em;color:#f0f0f4;margin-bottom:0.5rem}
.hero .tagline{font-size:clamp(1rem,3vw,1.3rem);color:{{ACCENT_COLOR}}bb;max-width:600px;margin-bottom:1.5rem}
.section{padding:4rem 2rem;max-width:900px;margin:0 auto}
.section h2{font-size:1.25rem;font-weight:700;margin-bottom:2rem;color:{{ACCENT_COLOR}};text-transform:uppercase;letter-spacing:0.1em}
.info-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.25rem}
.info-card{padding:1.5rem;border-radius:8px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-top:2px solid {{ACCENT_COLOR}}}
.info-card h3{font-size:0.7rem;text-transform:uppercase;letter-spacing:0.15em;color:{{ACCENT_COLOR}}aa;margin-bottom:0.4rem}
.info-card p{color:rgba(255,255,255,0.5)}
.badge{display:inline-block;padding:0.3rem 0.8rem;border-radius:4px;background:{{ACCENT_COLOR}}22;color:{{ACCENT_COLOR}};font-size:0.8rem;font-weight:700;margin-top:1rem;letter-spacing:0.05em}
footer{text-align:center;padding:2rem;color:rgba(255,255,255,0.25);font-size:0.8rem;border-top:1px solid rgba(255,255,255,0.04)}
</style></head>
<body>
<div class="hero">
  <span class="badge">{{CATEGORY}}</span>
  <h1>{{BUSINESS_NAME}}</h1>
  <div class="tagline">{{TAGLINE}}</div>
</div>
<div class="section">
  <h2>About</h2>
  <p style="color:rgba(255,255,255,0.55);font-size:1rem;line-height:1.8">{{BIO}}</p>
</div>
<div class="section">
  <h2>Details</h2>
  <div class="info-grid">
    <div class="info-card"><h3>Location</h3><p>{{LOCATION}}</p></div>
    <div class="info-card"><h3>Email</h3><p>{{EMAIL}}</p></div>
    <div class="info-card"><h3>Social</h3><p>{{SOCIAL}}</p></div>
  </div>
</div>
<div class="section" style="text-align:center;color:rgba(255,255,255,0.4);font-style:italic">{{FEATURES}}</div>
<footer>Powered by NEXUS Business</footer>
</body></html>`),

  'designer-stylist': T(`<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>{{BUSINESS_NAME}} — Designer / Stylist</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',system-ui,-apple-system,sans-serif;background:#08080a;color:#d0d0d8;line-height:1.6}
.hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:2rem;
  background:linear-gradient(135deg,#08080a 0%,{{ACCENT_COLOR}}18 50%,#08080a 100%);position:relative}
.hero h1{font-size:clamp(2.5rem,8vw,5rem);font-weight:800;letter-spacing:-0.01em;color:#fff;margin-bottom:0.5rem}
.hero .tagline{font-size:clamp(1rem,3vw,1.3rem);color:{{ACCENT_COLOR}}bb;max-width:600px;margin-bottom:1.5rem}
.section{padding:4rem 2rem;max-width:900px;margin:0 auto}
.section h2{font-size:1rem;font-weight:700;margin-bottom:2rem;color:{{ACCENT_COLOR}};text-transform:uppercase;letter-spacing:0.2em}
.info-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem}
.info-card{padding:1.5rem;border-radius:16px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06)}
.info-card h3{font-size:0.65rem;text-transform:uppercase;letter-spacing:0.15em;color:{{ACCENT_COLOR}}88;margin-bottom:0.4rem}
.info-card p{color:rgba(255,255,255,0.45)}
.tag{display:inline-block;padding:0.3rem 0.8rem;border-radius:20px;background:{{ACCENT_COLOR}}18;color:{{ACCENT_COLOR}};font-size:0.8rem;font-weight:600;margin-top:0.5rem}
footer{text-align:center;padding:2rem;color:rgba(255,255,255,0.25);font-size:0.8rem;border-top:1px solid rgba(255,255,255,0.04)}
</style></head>
<body>
<div class="hero">
  <h1>{{BUSINESS_NAME}}</h1>
  <div class="tagline">{{TAGLINE}}</div>
  <span class="tag">{{CATEGORY}}</span>
</div>
<div class="section">
  <h2>Portfolio</h2>
  <p style="color:rgba(255,255,255,0.55);font-size:1rem;line-height:1.8">{{BIO}}</p>
</div>
<div class="section">
  <h2>Contact</h2>
  <div class="info-grid">
    <div class="info-card"><h3>Location</h3><p>{{LOCATION}}</p></div>
    <div class="info-card"><h3>Email</h3><p>{{EMAIL}}</p></div>
    <div class="info-card"><h3>Social</h3><p>{{SOCIAL}}</p></div>
  </div>
</div>
<div class="section" style="text-align:center;color:rgba(255,255,255,0.4);font-style:italic">{{FEATURES}}</div>
<footer>Powered by NEXUS Business</footer>
</body></html>`),

  'podcaster-critic': T(`<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>{{BUSINESS_NAME}} — Podcaster / Critic</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',system-ui,-apple-system,sans-serif;background:#080a08;color:#d0d4d0;line-height:1.6}
.hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:2rem;
  background:linear-gradient(180deg,#080a08 0%,{{ACCENT_COLOR}}15 50%,#080a08 100%);position:relative}
.hero::before{content:'';position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,{{ACCENT_COLOR}}22,transparent 60%);bottom:-100px;right:-100px}
.hero h1{font-size:clamp(2.5rem,8vw,5rem);font-weight:800;letter-spacing:-0.02em;color:#eef2ee;margin-bottom:0.5rem}
.hero .tagline{font-size:clamp(1rem,3vw,1.3rem);color:{{ACCENT_COLOR}}bb;max-width:600px;margin-bottom:1.5rem}
.section{padding:4rem 2rem;max-width:900px;margin:0 auto}
.section h2{font-size:1.1rem;font-weight:700;margin-bottom:2rem;color:{{ACCENT_COLOR}};text-transform:uppercase;letter-spacing:0.15em}
.info-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.25rem}
.info-card{padding:1.5rem;border-radius:12px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05)}
.info-card h3{font-size:0.7rem;text-transform:uppercase;letter-spacing:0.15em;color:{{ACCENT_COLOR}}aa;margin-bottom:0.4rem}
.info-card p{color:rgba(255,255,255,0.5)}
.badge{display:inline-block;padding:0.3rem 0.8rem;border-radius:4px;background:{{ACCENT_COLOR}}22;color:{{ACCENT_COLOR}};font-size:0.75rem;font-weight:700;letter-spacing:0.1em;margin-top:0.5rem}
footer{text-align:center;padding:2rem;color:rgba(255,255,255,0.25);font-size:0.8rem;border-top:1px solid rgba(255,255,255,0.04)}
</style></head>
<body>
<div class="hero">
  <h1>{{BUSINESS_NAME}}</h1>
  <div class="tagline">{{TAGLINE}}</div>
  <span class="badge">{{CATEGORY}}</span>
</div>
<div class="section">
  <h2>Show Notes</h2>
  <p style="color:rgba(255,255,255,0.55);font-size:1rem;line-height:1.8">{{BIO}}</p>
</div>
<div class="section">
  <h2>Connect</h2>
  <div class="info-grid">
    <div class="info-card"><h3>Location</h3><p>{{LOCATION}}</p></div>
    <div class="info-card"><h3>Email</h3><p>{{EMAIL}}</p></div>
    <div class="info-card"><h3>Social</h3><p>{{SOCIAL}}</p></div>
  </div>
</div>
<div class="section" style="text-align:center;color:rgba(255,255,255,0.4);font-style:italic">{{FEATURES}}</div>
<footer>Powered by NEXUS Business</footer>
</body></html>`),
}

export function generateHTML(business) {
  const template = TEMPLATES[business.templateUsed] || TEMPLATES['artist-musician']
  return template
    .replace(/\{\{BUSINESS_NAME\}\}/g, business.name || 'My Business')
    .replace(/\{\{BIO\}\}/g, business.description || '')
    .replace(/\{\{TAGLINE\}\}/g, business.tagline || business.name || '')
    .replace(/\{\{ACCENT_COLOR\}\}/g, business.color || '#9b5de5')
    .replace(/\{\{SOCIAL\}\}/g, business.social || 'N/A')
    .replace(/\{\{EMAIL\}\}/g, business.email || 'N/A')
    .replace(/\{\{LOCATION\}\}/g, business.location || 'N/A')
    .replace(/\{\{CATEGORY\}\}/g, business.category || 'Business')
    .replace(/\{\{FEATURES\}\}/g, business.features || '')
}

export const CATEGORIES = [
  'Musician', 'DJ', 'Studio', 'Director', 'Actor',
  'Cafe', 'Cinema', 'Producer', 'Designer', 'Podcaster',
]

export const CATEGORY_COLORS = {
  Musician: '#a78bfa',
  DJ: '#39b6ff',
  Studio: '#f97316',
  Director: '#ef4444',
  Actor: '#fbbf24',
  Cafe: '#d97706',
  Cinema: '#ec4899',
  Producer: '#14b8a6',
  Designer: '#8b5cf6',
  Podcaster: '#22c55e',
}
