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


document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
      .then(response => response.json())
      .then(jsonData => {
        const table = document.getElementById('data-table');
        table.querySelectorAll('tr').forEach((row, rowIndex) => {
          const data = jsonData[rowIndex];
          const cells = row.querySelectorAll('td');
          cells[1].querySelector('div').textContent = data.automation_name;
          cells[2].querySelector('div>span').textContent = data.trigger;
          
          const images = cells[3].querySelector('.imgcontainer');
          images.innerHTML = '';

    data.applications.forEach(application => {
        const img = document.createElement('img');
        img.src = application; 
        img.width = 30; 
        img.height = 30; 
        img.alt = `${application} icon`; 
        img.classList.add('application-icon'); 
        images.appendChild(img);
    });

          cells[5].querySelector('.flex .flex-col > div:nth-child(1)').textContent=data.created_by.name;
          cells[5].querySelector('.flex .flex-col > div:nth-child(2)').textContent=data.created_by.time;
          cells[6].querySelector('.flex .flex-col > div:nth-child(1)').textContent=data.last_modified_by.name;
          cells[6].querySelector('.flex .flex-col > div:nth-child(2)').textContent=data.last_modified_by.time;
        });
      })
      .catch(error => console.error('Error loading JSON:', error));
  });