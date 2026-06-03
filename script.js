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
                    // Fade out lines based on distance
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
  <span class="cmd-hl">skills</span>   - List core skills
  <span class="cmd-hl">scan</span>     - Run threat audit & print full resume profile
  <span class="cmd-hl">clear</span>    - Clear screen
    `;

    const aboutCmd = () => `
<span class="text-cyan">[profile//executive_summary]</span>
> Amjad Ali - Cyber Security Analyst
> Automated security tool architecture developer.
> Specialized in network sweeping pipelines, multi-process scripting,
  and vulnerability mapping (Nmap / Nessus / Metasploit).
    `;

    const skillsCmd = () => `
<span class="text-cyan">[technical//capabilities]</span>
* Code/Script:   Python (Concurrencies), Bash Shell, PowerShell, CSS
* SecAuditing:   Nessus, Nmap (NSE), Wireshark, Metasploit, Docker, Git
* Operations:    Subnet Sweep, Vulnerability Map, Log Sanitizer, Regex
    `;

    // Mock scan system function (shows progress loader)
    let isScanning = false;
    function runScan() {
        isScanning = true;
        consoleInput.disabled = true;
        
        let steps = [
            { text: "[*] Initializing audit suite...", delay: 200 },
            { text: "[*] Generating scanning processes...", delay: 400 },
            { text: "[*] Scanning active host ranges: 192.168.1.0/24", delay: 800 },
            { text: "[+] Target sweep active. Found: 1 host (Amjad Ali)", delay: 1100 },
            { text: "[*] Scanning ports and vulnerability vectors...", delay: 1400 },
            { text: "[+] SMB Security Mode: Encrypted [Audit Passed]", delay: 1600 },
            { text: "[+] SSL Ciphers: Secure [Audit Passed]", delay: 1800 },
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
NAME:      Amjad Ali
ROLE:      Cyber Security Analyst & Automation Engineer
EMAIL:     amjhost@gmail.com
GITHUB:    github.com/amjhost
PROJECTS:  - Pentest-Tools (Multi-threaded scanner, 50x speed improvements)
           - Threat Log Sanitizer (IP validation, numerical sorting)
EXPERIENCE: - Open-Source Security Utilities Developer (2024-Present)
            - Subnet Vulnerability Auditing Intern (2023-2024)
TARGETS:    eJPT, CompTIA Security+
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
                } else {
                    response.innerHTML = `Command not recognized: <span class="text-secondary">${val}</span>. Type <span class="cmd-hl">help</span> for commands.`;
                }
                
                consoleScreen.insertBefore(response, promptRow);
            }

            consoleScreen.scrollTop = consoleScreen.scrollHeight;
        }
    });
});
