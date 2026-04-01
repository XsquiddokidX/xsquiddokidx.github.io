import { useState, useEffect } from "react";

export default function App() {
  const [dark, setDark] = useState(true);
  const [motion, setMotion] = useState(true);
  const [repos, setRepos] = useState([]);
  const [secret, setSecret] = useState(false);

  // Set body class for dark/light
  useEffect(() => {
    document.body.className = dark ? "dark" : "light";
  }, [dark]);

  // Fetch GitHub repos
  useEffect(() => {
    fetch("https://api.github.com/users/XsquiddokidX/repos")
      .then(res => res.json())
      .then(data => setRepos(data.slice(0, 6)));
  }, []);

  // Easter Egg: Konami Code
  useEffect(() => {
    const sequence = [
      "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
      "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"
    ];
    let input = [];
    const handler = (e) => {
      input.push(e.key);
      if (input.length > sequence.length) input.shift();
      if (JSON.stringify(input) === JSON.stringify(sequence)) {
        setSecret(true);
        document.body.classList.add("secret-mode");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const art = ["/art/art1.png","/art/art2.png","/art/art3.png"];

  return (
    <main className={motion ? "motion-on" : "motion-off"}>
      <header>
        <h1 onClick={() => document.body.classList.toggle("chaos")}>
          XsquiddokidX
        </h1>
        <div className="toggles" role="group" aria-label="Theme and motion controls">
          <button onClick={() => setDark(!dark)} aria-label="Toggle dark or light theme">
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>
          <button onClick={() => setMotion(!motion)} aria-label="Toggle motion effects">
            {motion ? "🚫 Animations" : "✨ Animations"}
          </button>
        </div>
      </header>

      <section className="hero">
        <h2>I build weird, creative, and useful things.</h2>
        <p>Developer + artist experimenting with code and ideas.</p>
      </section>

      <section>
        <h3>Cute Things I Made</h3>
        <div className="art-grid">
          {art.map((img, i) => <img key={i} src={img} className="art-item" />)}
        </div>
      </section>

      <section>
        <h3>Stuff I've Built</h3>
        <div className="repo-grid">
          {repos.map(repo => (
            <a key={repo.id} href={repo.html_url} target="_blank" className="repo-card">
              <h4>{repo.name}</h4>
              <p>{repo.description || "No description yet..."}</p>
            </a>
          ))}
        </div>
      </section>

      <section>
        <h3>What I Do</h3>
        <p>I work with C#, frontend web, and Linux systems. I like building experimental tools, games, and creative tech.</p>
      </section>

      <section>
        <h3>Who I Help</h3>
        <p>Nonprofits, startups, and students working on interesting ideas.</p>
      </section>

      <section>
        <h3>Things I Like</h3>
        <ul>
          <li>Java game dev</li>
          <li>AI experiments</li>
          <li>Creative coding</li>
          <li>Open-source</li>
        </ul>
      </section>

      <section>
        <h3>Elsewhere</h3>
        <div className="socials">
          <a href="https://github.com/XsquiddokidX" target="_blank">
            <img src="/github.svg" alt="GitHub" /> GitHub
          </a>
          <a href="https://huggingface.co/XsquiddokidX" target="_blank">
            <img src="/huggingface.svg" alt="HuggingFace" /> Hugging Face
          </a>
        </div>
      </section>

      <section className="note">
        <p>I don’t advertise availability. I just build things.</p>
      </section>

      <footer>
        <p>© XsquiddokidX</p>
      </footer>
    </main>
  );
}