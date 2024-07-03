function loadTemplate(elementId, templatePath) {
    fetch(templatePath)
        .then(response => response.text())
        .then(template => {
            const compiledTemplate = Handlebars.compile(template);
            document.getElementById(elementId).innerHTML = compiledTemplate();
        })
        .catch(error => console.error('Error loading template:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    loadTemplate('sidebar', 'components/sidebar/sidebar.hbs');
    loadTemplate('header', 'components/header/header.hbs');
    loadTemplate('navbar', 'components/navbar/navbar.hbs');
    loadTemplate('table', 'components/table/table.hbs');
});