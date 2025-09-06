window.onload = () => {
    render()
}

function trans(key, parameters) {
    const lang = document.documentElement.lang || 'en'
    let text = window.translations[lang][key] || key 
    for (const [p, v] of Object.entries(parameters)) {
        text = text.replace(`{${p}}`, v)
    }
    return text
}

function render() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n 
        const params = {}
        for (const [name, value] of Object.entries(el.dataset)) {
            if (name.startsWith('i18nParam')) {
                const paramName = name.replace('i18nParam', '').toLowerCase()
                params[paramName] = value 
            }
        }
        el.textContent = trans(el.dataset.i18n, params)
    })
}

