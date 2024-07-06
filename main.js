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
        if (rowIndex >= jsonData.length) return; 
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

        cells[5].querySelector('.flex .flex-col > div:nth-child(1)').textContent = data.created_by.name;
        cells[5].querySelector('.flex .flex-col > div:nth-child(2)').textContent = data.created_by.time;
        cells[6].querySelector('.flex .flex-col > div:nth-child(1)').textContent = data.last_modified_by.name;
        cells[6].querySelector('.flex .flex-col > div:nth-child(2)').textContent = data.last_modified_by.time;
      });

      const searchInput = document.querySelector('.search-input');

      searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const rows = table.querySelectorAll('tr');

        rows.forEach((row, rowIndex) => {
          if (rowIndex >= jsonData.length) return; 

          const cellText = jsonData[rowIndex].automation_name.toLowerCase();
          const creatorName = jsonData[rowIndex].created_by.name.toLowerCase();
          console.log(creatorName);
          const modifier = jsonData[rowIndex].last_modified_by.name.toLowerCase();

          if (cellText.includes(query) ) {
            row.style.display = ''; 
          }
          else if(creatorName.includes(query)){
            row.style.display = ''; 
          }
          else if(modifier.includes(query)){
            row.style.display = ''; 
          } else {
            row.style.display = 'none'; 
          }
        });
      });
    })
    .catch(error => console.error('Error loading JSON:', error));
});
