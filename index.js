const canvas = document.getElementById('bubbleCanvas');
const ctx = canvas.getContext('2d');
const buttonOverlay = document.getElementById('button-overlay');

let bubbles = [];
const decorativeCount = 120;
const stemSubjects = ['BIOLOGY', 'CHEMISTRY', 'CODING', 'PHYSICS', 'ENGINEERING', 'MATH', 'ROBOTICS', 'DESIGN', 'DATA', 'FASHION', 'CREATE', 'SPACE', 'BEAUTY'];
const colors = ['#008080', '#e41e81', '#00cbcb', '#facee2'];

function init() {
    const dpr = window.devicePixelRatio || 1;
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;

    canvas.width = screenW * dpr;
    canvas.height = screenH * dpr;
    ctx.scale(dpr, dpr);

    canvas.style.width = `${screenW}px`;
    canvas.style.height = `${screenH}px`;

    const scaleFactor = Math.min(screenW / 1200, 1);

    bubbles = [];
    buttonOverlay.innerHTML = '';

    
    const mainBtn = document.createElement('a');
    mainBtn.href = 'issues.html';
    mainBtn.className = 'enter-archive-btn';
    mainBtn.innerHTML = `
<span class="code-tag">&lt;h1</span> <span class="code-attr">class</span>=<span class="code-string">"love,RACHEL"</span><span class="code-tag">&gt;</span>
  <span class="code-text">Enter Archive</span>
<span class="code-tag">&lt;/h1&gt;</span>`.trim();

    buttonOverlay.appendChild(mainBtn);

    // Add the button 
    bubbles.push({
        x: screenW / 2,
        y: screenH / 2,
        dx: (Math.random() - 0.5) * 1.5,
        dy: (Math.random() - 0.5) * 1.5,
        radius: 100 * scaleFactor, // Give the box a "hitbox" radius
        isButton: true,
        element: mainBtn
    });

    // 2. Create STEM Subject Bubbles
    stemSubjects.forEach((subject) => {
        const radius = (Math.random() * 20 + 35) * scaleFactor;
        bubbles.push({
            x: Math.random() * (screenW - radius * 2) + radius,
            y: Math.random() * (screenH - radius * 2) + radius,
            dx: (Math.random() - 0.5) * 2,
            dy: (Math.random() - 0.5) * 2,
            radius: radius,
            color: colors[Math.floor(Math.random() * colors.length)],
            label: subject,
            type: 'stem'
        });
    });

    // 3. Create "Flood" (Tiny) Bubbles
    for (let i = 0; i < decorativeCount; i++) {
        const radius = (Math.random() * 8 + 2) * scaleFactor;
        bubbles.push({
            x: Math.random() * screenW,
            y: Math.random() * screenH,
            dx: (Math.random() - 0.5) * 0.8,
            dy: (Math.random() - 0.5) * 0.8,
            radius: radius,
            color: colors[Math.floor(Math.random() * colors.length)],
            opacity: Math.random() * 0.4 + 0.1,
            type: 'deco'
        });
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    const screenW = window.innerWidth;
    const screenH = window.innerHeight;

    bubbles.forEach(b => {
        // Bounce Logic
        if (b.x + b.radius > screenW || b.x - b.radius < 0) b.dx = -b.dx;
        if (b.y + b.radius > screenH || b.y - b.radius < 0) b.dy = -b.dy;

        b.x += b.dx;
        b.y += b.dy;

        if (b.isButton) {
            b.element.style.left = `${b.x}px`;
            b.element.style.top = `${b.y}px`;
        } else if (b.type === 'stem') {
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
            ctx.fillStyle = b.color + '22'; 
            ctx.fill();
            ctx.strokeStyle = b.color + '66';
            ctx.stroke();
            
            ctx.fillStyle = b.color;
            const fontSize = Math.max(7, b.radius * 0.25);
            ctx.font = `bold ${fontSize}px monospace`;
            ctx.textAlign = 'center';
            ctx.fillText(b.label, b.x, b.y + (fontSize/3));
        } else {
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
            const alpha = Math.floor(b.opacity * 255).toString(16).padStart(2, '0');
            ctx.fillStyle = b.color + alpha;
            ctx.fill();
        }
    });
}

window.addEventListener('resize', init);
init();
animate();
