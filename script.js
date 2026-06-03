document.addEventListener("DOMContentLoaded", () => {
    const terminal = document.getElementById("terminal");
    const terminalInput = document.getElementById("terminal-input");
    const promptLine = document.getElementById("prompt-line");

    // Command replies dictionary
    const commands = {
        help: () => {
            return `
Available commands:
  <span class="term-highlight">about</span>      - Executive profile summary
  <span class="term-highlight">skills</span>     - Security arsenal & scripting proficiencies
  <span class="term-highlight">projects</span>   - Highlighted cybersecurity projects
  <span class="term-highlight">contact</span>    - Connect with me
  <span class="term-highlight">clear</span>      - Clear terminal window
            `;
        },
        about: () => {
            return `
<span class="term-green">[Profile Summary]</span>
Detail-oriented and proactive Cyber Security Analyst.
Experienced in:
  - Network Vulnerability Assessments (Nmap, Nessus, Wireshark)
  - Security Scripting & Automation (Python, Bash, PowerShell)
  - Custom tool building (Multiprocessed sweeps, parallel scans)
            `;
        },
        skills: () => {
            return `
<span class="term-green">[Technical Skill Matrix]</span>
- <span class="term-purple">Auditing:</span> Vulnerability Scan, Port Scan, Host Sweeps, AD Auditing
- <span class="term-purple">Scripting:</span> Python (Concurrent/Async), Bash, PowerShell
- <span class="term-purple">Platforms:</span> Linux (Debian, Kali, Ubuntu), Windows Server
- <span class="term-purple">Toolsets:</span> Nmap NSE, Nessus Professional, Wireshark, Git, Docker
            `;
        },
        projects: () => {
            return `
<span class="term-green">[Core Projects]</span>
1. <span class="term-highlight">Pentest-Tools Suite</span>
   - Interactive CLI menu managing range sweepers and NSE scripts.
   - Built concurrent python processing modules (up to 50x faster).
2. <span class="term-highlight">Threat Data Sanitizer</span>
   - Regex tool extracting, validating (IPv4), and sorting targets.
            `;
        },
        contact: () => {
            return `
<span class="term-green">[Connect Nodes]</span>
- Email:  <span class="term-highlight"><a href="mailto:amjhost@gmail.com" class="term-highlight">amjhost@gmail.com</a></span>
- GitHub: <span class="term-highlight"><a href="https://github.com/amjhost" target="_blank" class="term-highlight">github.com/amjhost</a></span>
- Status: Available for Projects / Audits
            `;
        }
    };

    // Auto-focus input when clicking terminal body
    terminal.addEventListener("click", () => {
        terminalInput.focus();
    });

    terminalInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const inputVal = terminalInput.value.trim().toLowerCase();
            terminalInput.value = "";

            // Create command echo line
            const echoLine = document.createElement("div");
            echoLine.className = "line";
            echoLine.innerHTML = `<span class="prompt">amjhost@security-node:~$</span> ${inputVal}`;
            terminal.insertBefore(echoLine, promptLine);

            if (inputVal === "clear") {
                // Clear all except prompt
                const lines = terminal.querySelectorAll(".line");
                lines.forEach(line => line.remove());
            } else if (inputVal) {
                const responseLine = document.createElement("div");
                responseLine.className = "line";
                
                if (commands[inputVal]) {
                    responseLine.innerHTML = commands[inputVal]();
                } else {
                    responseLine.innerHTML = `Command not found: <span class="term-sec">${inputVal}</span>. Type <span class="term-highlight">help</span> for commands.`;
                }
                
                terminal.insertBefore(responseLine, promptLine);
            }

            // Scroll to bottom
            terminal.scrollTop = terminal.scrollHeight;
        }
    });
});
