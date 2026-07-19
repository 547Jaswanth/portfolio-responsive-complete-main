/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            const isOpen = nav.classList.toggle('show')
            // set aria-expanded for accessibility
            toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false')
            // toggle body class so header/background can change when menu is open
            document.body.classList.toggle('menu-open', isOpen)
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 600}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 



// Select the button and body element
const themeToggleButton = document.getElementById('theme-toggle');
const body = document.body;

// Check if the theme is already set to dark mode in localStorage
if(localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    themeToggleButton.textContent = '☀️';  // Set text for dark mode (e.g. sun emoji)
} else {
    body.classList.remove('dark-mode');
    themeToggleButton.textContent = '🌙';  // Set text for light mode (e.g. moon emoji)
}

// Add event listener for theme toggle button
themeToggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    // Change the button text based on the theme
    if (body.classList.contains('dark-mode')) {
        themeToggleButton.textContent = '☀️';  // Sun emoji for light mode
        localStorage.setItem('theme', 'dark');  // Save the current theme to localStorage
    } else {
        themeToggleButton.textContent = '🌙';  // Moon emoji for dark mode
        localStorage.removeItem('theme');  // Remove the theme from localStorage to reset
    }
});
sr.reveal('.experience__card', { interval: 200 });

sr.reveal('.experience__card2', { interval: 10 });


// ===== SKILLS GRID: automatic one/two column behavior =====
function updateSkillsGridColumns() {
    const skillsGrid = document.querySelector('.skills-grid');
    if (!skillsGrid) return;

    // Count visible skill-category elements
    const categories = Array.from(skillsGrid.querySelectorAll('.skill-category'))
        .filter(el => el.offsetParent !== null); // only visible

    if (categories.length <= 1) {
        skillsGrid.classList.remove('two-col');
        skillsGrid.classList.add('one-col');
    } else {
        skillsGrid.classList.remove('one-col');
        skillsGrid.classList.add('two-col');
    }
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    updateSkillsGridColumns();

    const emailLink = document.querySelector('.contact__email');
    const emailPopup = document.getElementById('email-popup');
    const copyEmailButton = document.getElementById('copy-email-btn');
    const emailAddress = 'jaswanth.keeramanda@gmail.com';

    if (emailLink && emailPopup && copyEmailButton) {
        let isPinned = false;

        const showEmailPopup = () => emailPopup.classList.add('show');
        const hideEmailPopup = () => emailPopup.classList.remove('show');

        const copyToClipboard = async () => {
            try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(emailAddress);
                } else {
                    const tempInput = document.createElement('textarea');
                    tempInput.value = emailAddress;
                    tempInput.setAttribute('readonly', '');
                    tempInput.style.position = 'fixed';
                    tempInput.style.left = '-9999px';
                    tempInput.style.top = '-9999px';
                    document.body.appendChild(tempInput);
                    tempInput.focus();
                    tempInput.select();
                    document.execCommand('copy');
                    document.body.removeChild(tempInput);
                }
                return true;
            } catch (error) {
                return false;
            }
        };

        const handlePopupVisibility = (shouldShow) => {
            if (isPinned) {
                showEmailPopup();
                return;
            }
            if (shouldShow) {
                showEmailPopup();
            } else {
                hideEmailPopup();
            }
        };

        emailLink.addEventListener('mouseenter', () => handlePopupVisibility(true));
        emailLink.addEventListener('focus', () => handlePopupVisibility(true));
        emailLink.addEventListener('mouseleave', (event) => {
            const relatedTarget = event.relatedTarget;
            if (relatedTarget && emailPopup.contains(relatedTarget)) {
                return;
            }
            handlePopupVisibility(false);
        });
        emailLink.addEventListener('blur', (event) => {
            const relatedTarget = event.relatedTarget;
            if (relatedTarget && emailPopup.contains(relatedTarget)) {
                return;
            }
            handlePopupVisibility(false);
        });
        emailPopup.addEventListener('mouseenter', () => handlePopupVisibility(true));
        emailPopup.addEventListener('mouseleave', () => {
            if (!isPinned) {
                hideEmailPopup();
            }
        });

        emailLink.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            isPinned = true;
            showEmailPopup();
        });

        document.addEventListener('click', (event) => {
            if (!emailLink.contains(event.target) && !emailPopup.contains(event.target)) {
                isPinned = false;
                hideEmailPopup();
            }
        });

        copyEmailButton.addEventListener('click', async (event) => {
            event.preventDefault();
            event.stopPropagation();
            isPinned = true;
            showEmailPopup();

            const copied = await copyToClipboard();
            copyEmailButton.textContent = copied ? 'Copied!' : 'Try again';
            setTimeout(() => {
                copyEmailButton.textContent = 'Copy';
            }, 1600);
        });
    }

    // Observe future changes to the skills grid (cards added/removed)
    const skillsGrid = document.querySelector('.skills-grid');
    if (skillsGrid && window.MutationObserver) {
        const mo = new MutationObserver(() => updateSkillsGridColumns());
        mo.observe(skillsGrid, { childList: true, subtree: false });
    }

    // Also update on window resize just in case
    window.addEventListener('resize', () => updateSkillsGridColumns());

});
