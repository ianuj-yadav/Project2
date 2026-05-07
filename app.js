/**
 * Smooth Transitions and Interactive Animations
 * This script handles parallax eye-tracking, state-based animations,
 * and button-triggered interactions for the character. -form
 */

document.addEventListener('DOMContentLoaded', () => {
    const character = document.getElementById('character');
    const head = document.getElementById('head');
    const eyes = document.querySelectorAll('.eye');
    const mouth = document.getElementById('mouth');
    const buttons = document.querySelectorAll('.emote-btn');

    // --- 1. PARALLAX EYE TRACKING ---
    // Make the eyes follow the cursor for a "living" feel
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        
        eyes.forEach(eye => {
            const rect = eye.getBoundingClientRect();
            const eyeX = rect.left + rect.width / 2;
            const eyeY = rect.top + rect.height / 2;
            
            // Calculate angle and distance
            const angle = Math.atan2(clientY - eyeY, clientX - eyeX);
            const distance = Math.min(6, Math.hypot(clientX - eyeX, clientY - eyeY) / 40);
            
            // Apply smooth translation
            const moveX = Math.cos(angle) * distance;
            const moveY = Math.sin(angle) * distance;
            
            eye.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });

    // --- 2. SMOOTH EMOTE SYSTEM ---
    // Handle button clicks to trigger specific CSS animations
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const emote = btn.getAttribute('data-emote');
            
            // Reset existing classes to allow re-triggering
            character.className = 'human'; 
            // Small timeout to ensure the browser registers the removal
            setTimeout(() => {
                if (emote !== 'reset') {
                    character.classList.add(`anim-${emote}`);
                }
            }, 10);

            // Button feedback
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // --- 3. INTERACTIVE MOUTH ---
    // Simple click interaction on the face
    mouth.addEventListener('click', () => {
        mouth.style.height = '30px';
        mouth.style.borderRadius = '0 0 100px 100px';
        
        setTimeout(() => {
            mouth.style.height = '';
            mouth.style.borderRadius = '';
        }, 1000);
    });

    // --- 4. ENTRANCE ANIMATION ---
    // Use Intersection Observer for a smooth fade-in reveal
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const stage = document.getElementById('stage');
    stage.style.opacity = '0';
    stage.style.transform = 'translateY(30px)';
    stage.style.transition = 'opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1), transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)';
    
    observer.observe(stage);
});
