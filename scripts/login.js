// UniRotas - Login Logic (Refined for Image Match)
// Handles authentication simulation and UI state management

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const btnLogin = document.getElementById('btn-login');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('toggle-password');

    // Toggle Password Visibility
    if (togglePassword) {
        togglePassword.addEventListener('click', () => {
            const isPassword = passwordInput.getAttribute('type') === 'password';
            passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
            // Overwrite innerHTML with a fresh <i> tag so Lucide renders it
            // isPassword is true -> switching to "text" -> show "eye" (open). 
            // isPassword is false -> switching to "password" -> show "eye-off" (closed).
            togglePassword.innerHTML = `<i data-lucide="${isPassword ? 'eye' : 'eye-off'}"></i>`;
            lucide.createIcons();
        });
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        if (!username || !password) return;

        // Activate loading state
        btnLogin.classList.add('loading');
        btnLogin.disabled = true;

        // Authentication simulation
        setTimeout(() => {
            const validUser = 'admin';
            const validPass = 'unirotas2025';

            if (username === validUser && password === validPass) {
                console.log('Login successful:', username);
                
                // Persistence
                localStorage.setItem('uniRotas_isLoggedIn', 'true');
                localStorage.setItem('uniRotas_user', username);

                // Success Feedback
                const btnText = btnLogin.querySelector('.btn-text');
                if (btnText) btnText.textContent = 'Sucesso!';
                btnLogin.style.background = '#10b981'; 
                
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 800);
            } else {
                showError();
                resetLoginButton();
            }
        }, 1500);
    });

    function showError() {
        const modalError = document.getElementById('modal-error');
        if (modalError) {
            modalError.classList.remove('hidden');
        } else {
            alert('Acesso negado. Verifique suas credenciais.');
        }
    }

    function resetLoginButton() {
        btnLogin.classList.remove('loading');
        btnLogin.disabled = false;
        const btnText = btnLogin.querySelector('.btn-text');
        if (btnText) btnText.textContent = 'Entrar no Sistema';
        btnLogin.style.background = ''; // Reset to CSS default
    }
});

/**
 * Global function to close the error modal
 */
function closeErrorModal() {
    const modalError = document.getElementById('modal-error');
    if (modalError) {
        modalError.classList.add('hidden');
    }
}

// Ensure global availability
window.closeErrorModal = closeErrorModal;
