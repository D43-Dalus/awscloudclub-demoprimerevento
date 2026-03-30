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
                    navigator.clipboard.writeText(textToCopy).then(() => {
                        const originalText = btn.innerText;
                        btn.innerText = '¡Copiado!';
                        setTimeout(() => {
                            btn.innerText = originalText;
                        }, 2000);
                    }).catch(err => console.error('Error al copiar: ', err));
                });
            });
        });
