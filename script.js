document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    const copyButtons = document.querySelectorAll('.copy-btn');

    copyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            if (!textToCopy) return;

            // fallback seguro sin romper layout
            const textarea = document.createElement('textarea');
            textarea.value = textToCopy;

            textarea.setAttribute('readonly', '');
            textarea.style.position = 'absolute';
            textarea.style.left = '-9999px';

            document.body.appendChild(textarea);

            textarea.select();
            textarea.setSelectionRange(0, textarea.value.length);

            try {
                document.execCommand('copy');
                const originalText = btn.innerText;
                btn.innerText = '¡Copiado!';
                setTimeout(() => btn.innerText = originalText, 2000);
            } catch (err) {
                console.error('Error al copiar:', err);
            }

            document.body.removeChild(textarea);
        });
    });
});