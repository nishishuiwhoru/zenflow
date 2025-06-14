document.addEventListener('DOMContentLoaded', () => {
    // Get the current language from localStorage or default to English
    let currentLang = localStorage.getItem('language') || 'en';
    
    // Update the current language button text
    updateLanguageButton(currentLang);
    
    // Apply translations for the current language
    applyTranslations(currentLang);
    
    // Add click event listeners to language switcher links
    document.querySelectorAll('.language-dropdown a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const newLang = e.target.getAttribute('data-lang');
            changeLanguage(newLang);
        });
    });
});

function changeLanguage(lang) {
    // Save the selected language to localStorage
    localStorage.setItem('language', lang);
    
    // Update the current language button text
    updateLanguageButton(lang);
    
    // Apply translations
    applyTranslations(lang);
    
    // Update the HTML lang attribute
    document.documentElement.lang = lang;
}

function updateLanguageButton(lang) {
    const button = document.querySelector('.current-lang');
    button.textContent = lang.toUpperCase();
}

function applyTranslations(lang) {
    // Get all elements with data-lang attribute
    const elements = document.querySelectorAll('[data-lang]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[lang] && translations[lang][key]) {
            // Handle different types of elements
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.value = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
} 