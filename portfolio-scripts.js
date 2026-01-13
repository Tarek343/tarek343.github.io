/* =================================================== */
/* 1. DOT GRID EFFECT */
/* =================================================== */
.dot-grid-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -10;
    pointer-events: none;
}

/* =================================================== */
/* 2. BENTO GRID LAYOUT & STYLES */
/* =================================================== */
.portfolio-grid {
    display: grid;
    gap: 15px;
    padding: 0;
    max-width: 1200px;
    margin: 0 auto;
}

.magic-bento-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    padding: 1.25em;
    border-radius: 20px;
    border: 1px solid #392e4e;
    background: #141A29;
    overflow: hidden;
    transition: box-shadow 0.3s ease;
    box-shadow: 0 5px 20px rgba(0,0,0,0.3);
    
    /* GSAP Glow Variables */
    --glow-x: 50%;
    --glow-y: 50%;
    --glow-intensity: 0;
    --glow-radius: 200px;
}

.magic-bento-card:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
}

.portfolio-image {
    height: 200px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 3rem;
    border-bottom: 4px solid #4A90E2;
}

.portfolio-content {
    padding: 1.5rem;
}

.portfolio-content h3 {
    margin-bottom: 0.5rem;
    color: #f0f0f0;
}

.portfolio-content p {
    color: #b0b0b0;
    margin-bottom: 1rem;
}

/* توهج الحدود */
.magic-bento-card--border-glow::after {
    content: '';
    position: absolute;
    inset: 0;
    padding: 6px;
    background: radial-gradient(
        var(--glow-radius) circle at var(--glow-x) var(--glow-y),
        rgba(132, 0, 255, calc(var(--glow-intensity) * 0.8)) 0%,
        rgba(132, 0, 255, calc(var(--glow-intensity) * 0.4)) 30%,
        transparent 60%
    );
    border-radius: inherit;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: subtract;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    pointer-events: none;
    transition: opacity 0.3s ease;
    z-index: 1;
    opacity: 0;
}

/* أزرار الداشبورد */
.portfolio-buttons {
    display: flex;
    gap: 10px;
    margin-top: 15px;
}

.portfolio-buttons a {
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
    transition: background 0.3s ease;
}

.view-btn {
    background: #4A90E2;
    color: white;
}

.view-btn:hover {
    background: #3A7CC8;
}

.request-btn {
    background: #50E3C2;
    color: #0D1321;
}

.request-btn:hover {
    background: #3DAA97;
}

/* أزرار Read More/Less */
.toggle-btn {
    background: #4A90E2;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: bold;
    margin-top: 5px;
    margin-bottom: 10px;
    transition: background 0.3s ease;
    display: block;
}

.toggle-btn:hover {
    background: #3A7CC8;
}

/* =================================================== */
/* 3. DOCK (أيقونات التواصل) */
/* =================================================== */
.dock-container {
    display: flex;
    justify-content: center;
    gap: 1rem;
    padding: 1rem 0;
}

.dock-item {
    transition: transform 0.1s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: white;
}

.dock-item:hover {
    color: #50E3C2;
}

/* =================================================== */
/* 4. PROGRESSIVE FORM */
/* =================================================== */
.form-step {
    overflow: hidden;
    opacity: 0;
    max-height: 0;
    margin-bottom: 0;
    transform: translateY(20px);
}

.form-step.active {
    transition: none;
}

/* =================================================== */
/* RESPONSIVE BENTO GRID */
/* =================================================== */
@media (min-width: 600px) {
    .portfolio-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1024px) {
    .portfolio-grid {
        grid-template-columns: repeat(4, 1fr);
    }

    /* المشاريع المميزة تأخذ عرض عمودين */
    .magic-bento-card:nth-child(1) {
        grid-column: 1 / span 2;
        grid-row: 1;
    }

    .magic-bento-card:nth-child(2) {
        grid-column: 3 / span 2;
        grid-row: 1;
    }
}
