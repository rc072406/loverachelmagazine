const canvas = document.getElementById('bubbleCanvas');
const ctx = canvas.getContext('2d');
const buttonOverlay = document.getElementById('button-overlay');

let bubbles = [];
// Increased counts for the "flood" effect
const decorativeCount = 120; 
const stemSubjects = ['BIOLOGY', 'CHEMISTRY', 'CODING', 'PHYSICS', 'ENGINEERING', 'MATH', 'ROBOTICS', 'DESIGN', 'DATA', 'FASHION', 'CREATE', 'SPACE', 'BEAUTY'];
const colors = ['#008080', '#e41e81', '#00cbcb', '#facee2'];

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    bubbles = [];
    buttonOverlay.innerHTML = '';

    // 1. The Main Archive Button
    const mainBtn = document.createElement('a');
    mainBtn.href = 'issues.html';
    mainBtn.className = 'enter-archive-btn';
    mainBtn.innerText = 'Enter\nArchive';
    buttonOverlay.appendChild(mainBtn);

    bubbles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        dx: (Math.random() - 0.5) * 1.5,
        dy: (Math.random() - 0.5) * 1.5,
        radius: 80,
        isButton: true,
        element: mainBtn
    });

    // 2. The STEM Subject Bubbles (Middle layer)
    stemSubjects.forEach((subject) => {
        bubbles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            dx: (Math.random() - 0.5) * 2,
            dy: (Math.random() - 0.5) * 2,
            radius: Math.random() * 20 + 35,
            color: colors[Math.floor(Math.random() * colors.length)],
            label: subject,
            type: 'stem'
        });
    });

    // 3. The "Flood" - Tiny Background Bubbles
    for (let i = 0; i < decorativeCount; i++) {
        bubbles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            dx: (Math.random() - 0.5) * 0.8, // Slower movement for depth
            dy: (Math.random() - 0.5) * 0.8,
            radius: Math.random() * 8 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            opacity: Math.random() * 0.4 + 0.1,
            type: 'deco'
        });
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bubbles.forEach(b => {
        // Bounce Logic
        if (b.x + b.radius > canvas.width || b.x - b.radius < 0) b.dx = -b.dx;
        if (b.y + b.radius > canvas.height || b.y - b.radius < 0) b.dy = -b.dy;
        b.x += b.dx;
        b.y += b.dy;

        if (b.isButton) {
            b.element.style.left = `${b.x}px`;
            b.element.style.top = `${b.y}px`;
        } else if (b.type === 'stem') {
            // Draw STEM bubbles
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
            ctx.fillStyle = b.color + '22'; 
            ctx.fill();
            ctx.strokeStyle = b.color + '66';
            ctx.stroke();
            
            ctx.fillStyle = b.color;
            ctx.font = 'bold 9px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(b.label, b.x, b.y + 3);
        } else {
            // Draw tiny "flood" bubbles
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
            ctx.fillStyle = b.color + Math.floor(b.opacity * 255).toString(16).padStart(2, '0');
            ctx.fill();
        }
    });
}

window.addEventListener('resize', init);
init();
animate();
