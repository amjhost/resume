document.addEventListener("DOMContentLoaded", () => {
    // -----------------------------------------------------------------
    // 1. CARDS MOUSE GLOW TRACKING (Blackbox border glow effect)
    // -----------------------------------------------------------------
    const cards = document.querySelectorAll("[data-glow]");
    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        });
    });

    // -----------------------------------------------------------------
    // 2. CYBER GRID CANVAS BACKGROUND (Node link network)
    // -----------------------------------------------------------------
    const canvas = document.getElementById("cyber-grid");
    const ctx = canvas.getContext("2d");
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 45;
    
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.radius = Math.random() * 1.5 + 0.5;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(0, 255, 204, 0.4)";
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animateGrid() {
        ctx.clearRect(0, 0, width, height);

        // Update & draw particles
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        // Draw connecting lines
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    const alpha = (1 - dist / 120) * 0.08;
                    ctx.strokeStyle = `rgba(0, 255, 204, ${alpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animateGrid);
    }
    animateGrid();

    // -----------------------------------------------------------------
    // 3. ADVANCED TERMINAL SCANNER (Blackbox interactive console)
    // -----------------------------------------------------------------
    const consoleScreen = document.getElementById("console-screen");
    const consoleInput = document.getElementById("console-input");
    const promptRow = document.getElementById("prompt-row");

    // Terminal Commands Library
    const helpCmd = () => `
Available commands:
  <span class="cmd-hl">about</span>    - Executive profile description
  <span class="cmd-hl">skills</span>   - List technical competencies & arsenal
  <span class="cmd-hl">scan</span>     - Run threat audit & print full resume profile
  <span class="cmd-hl">contact</span>  - Connect nodes (mobile, email, github)
  <span class="cmd-hl">clear</span>    - Clear screen
    `;

    const aboutCmd = () => `
<span class="text-cyan">[profile//executive_summary]</span>
> Amjad Ali - Cybersecurity Analyst & Systems Automation Engineer.
> Possesses practical knowledge of Linux Systems, Docker, cPanel web hosting,
  CI/CD pipeline implementation, vulnerability assessment, and end-user support.
> Dedicated to optimizing security operational workflows and infrastructure health.
    `;

    const skillsCmd = () => `
<span class="text-cyan">[technical//capabilities]</span>
* SysAdmin:     Linux, Windows Server, Desktop Support, Network Protocols
* DevOps/Web:   Docker & Portainer, Jenkins CI/CD, Ansible Playbooks, cPanel Hosting
* Security:     Web App Security Testing (OWASP), Vulnerability Auditing
* Office/Ops:   MS Excel/Word, Data Entry, Digital Documentation & Archives
    `;

    const contactCmd = () => `
<span class="text-cyan">[contact//identity_nodes]</span>
- Email:    <span class="term-highlight"><a href="mailto:amjhost@gmail.com" class="term-highlight">amjhost@gmail.com</a></span>
- Mobile:   <span class="term-highlight">+91 9061231767</span>
- Location: Trivandrum, Kerala, India (Relocation: Ready)
- GitHub:   <span class="term-highlight"><a href="https://github.com/amjhost" target="_blank" class="term-highlight">github.com/amjhost</a></span>
    `;

    // Mock scan system function (shows progress loader)
    let isScanning = false;
    function runScan() {
        isScanning = true;
        consoleInput.disabled = true;
        
        let steps = [
            { text: "[*] Initializing audit suite...", delay: 200 },
            { text: "[*] Checking local host environment...", delay: 400 },
            { text: "[*] Scanning core competency arrays...", delay: 800 },
            { text: "[+] Found credentials: Amjad Ali (Systems Automation & Security)", delay: 1100 },
            { text: "[*] Auditing training & certification records...", delay: 1400 },
            { text: "[+] CEH: CEH_TRAINED [OK] | CPENT: CPENT_TRAINED [OK]", delay: 1600 },
            { text: "[+] RHCSA, CCNA, MCSE training profiles verified [OK]", delay: 1800 },
            { text: "[*] Fetching threat intelligence resume...", delay: 2000 }
        ];

        // Print steps sequentially
        steps.forEach(step => {
            setTimeout(() => {
                const line = document.createElement("div");
                line.className = "term-line text-secondary";
                line.innerHTML = step.text;
                consoleScreen.insertBefore(line, promptRow);
                consoleScreen.scrollTop = consoleScreen.scrollHeight;
            }, step.delay);
        });

        // Print progress bar
        setTimeout(() => {
            const progressContainer = document.createElement("div");
            progressContainer.className = "term-line text-glow-cyan";
            consoleScreen.insertBefore(progressContainer, promptRow);

            let progress = 0;
            const interval = setInterval(() => {
                progress += 10;
                const bars = "█".repeat(progress / 10) + "░".repeat(10 - progress / 10);
                progressContainer.innerHTML = `[${bars}] ${progress}% LOADED`;
                consoleScreen.scrollTop = consoleScreen.scrollHeight;

                if (progress >= 100) {
                    clearInterval(interval);
                    printFullScanResults();
                }
            }, 80);
        }, 2200);
    }

    function printFullScanResults() {
        const resultLine = document.createElement("div");
        resultLine.className = "term-line";
        resultLine.innerHTML = `
<span class="welcome-txt">========= AMJAD ALI // THREAT ASSESSMENT PROFILE =========</span>
NAME:         Amjad Ali
ROLE:         Cybersecurity Analyst & Systems Automation Engineer
MOBILE:       +91 9061231767
EMAIL:        amjhost@gmail.com
LOCATION:     Trivandrum, Kerala, India
EXPERIENCE:
  - Security Analyst @ Tuxcentrix Consultancy (2022-2023)
    * Conducted web app assessments & documented findings.
    * Authored technical threat reports & remediation guidance.
  - Cybersecurity Intern @ Tuxcentrix Consultancy (2022)
    * Supported vulnerability sweeps & compliance logs.
  - Computer Operator/IT Support @ Win at IT (2017-2020)
    * Managed daily office operations, backups & support for 20+ users.
PROJECTS:
  - CI/CD Pipeline Automation (Jenkins, GitHub, Docker, Portainer)
  - Web Hosting Administration (cPanel Domain & Mail configurations)
TRAININGS/CERTS:
  - Certified Ethical Hacker (CEH) - Expired
  - CPENT Training (Technovalley Consulting)
  - RHCSA, CCNA, MCSE Trainings (Blueshell Securities)
EDUCATION:
  - Higher Secondary (+2 Computer Science) - CBSE Completed 2020
LANGUAGES:    English, Malayalam, Hindi, Tamil
PERSONAL:     D.O.B: 22 Sep 2002 | Nationality: Indian | Relocatable: Yes
<span class="welcome-txt">===========================================================</span>
        `;
        consoleScreen.insertBefore(resultLine, promptRow);
        consoleScreen.scrollTop = consoleScreen.scrollHeight;
        
        isScanning = false;
        consoleInput.disabled = false;
        consoleInput.focus();
    }

    // Input listeners
    consoleScreen.addEventListener("click", () => {
        if (!isScanning) consoleInput.focus();
    });

    consoleInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const val = consoleInput.value.trim().toLowerCase();
            consoleInput.value = "";

            // Echo input
            const echo = document.createElement("div");
            echo.className = "term-line";
            echo.innerHTML = `<span class="console-prompt">amjhost@sec-node:~$</span> ${val}`;
            consoleScreen.insertBefore(echo, promptRow);

            if (val === "clear") {
                const lines = consoleScreen.querySelectorAll(".term-line");
                lines.forEach(l => l.remove());
            } else if (val === "scan") {
                runScan();
            } else if (val) {
                const response = document.createElement("div");
                response.className = "term-line";
                
                if (val === "help") {
                    response.innerHTML = helpCmd();
                } else if (val === "about") {
                    response.innerHTML = aboutCmd();
                } else if (val === "skills") {
                    response.innerHTML = skillsCmd();
                } else if (val === "contact") {
                    response.innerHTML = contactCmd();
                } else {
                    response.innerHTML = `Command not recognized: <span class="text-secondary">${val}</span>. Type <span class="cmd-hl">help</span> for commands.`;
                }
                
                consoleScreen.insertBefore(response, promptRow);
            }

            consoleScreen.scrollTop = consoleScreen.scrollHeight;
        }
    });
});
