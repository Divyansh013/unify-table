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
      function populateTable(data) {
        const rows = table.querySelectorAll('tr');
        rows.forEach((row, index) => {
          if (index >= 0) {
            row.style.display = 'none';
          }
        });
        data.forEach((item, index) => {
          const row = rows[index]; 
          if (row) {
            const cells = row.querySelectorAll('td');
            cells[1].querySelector('div').textContent = item.automation_name;
            cells[2].querySelector('div>span').textContent = item.trigger;

            const images = cells[3].querySelector('.imgcontainer');
            images.innerHTML = '';
            item.applications.forEach(application => {
              const img = document.createElement('img');
              img.src = application;
              img.width = 30;
              img.height = 30;
              img.alt = `${application} icon`;
              img.classList.add('application-icon');
              images.appendChild(img);
            });

            cells[5].querySelector('.flex .flex-col > div:nth-child(1)').textContent = item.created_by.name;
            cells[5].querySelector('.flex .flex-col > div:nth-child(2)').textContent = item.created_by.time;
            cells[6].querySelector('.flex .flex-col > div:nth-child(1)').textContent = item.last_modified_by.name;
            cells[6].querySelector('.flex .flex-col > div:nth-child(2)').textContent = item.last_modified_by.time;

            row.style.display = ''; 
          } else {
            console.error('Not enough rows in the table to display all data.');
          }
        });
      }
      populateTable(jsonData);

      const fuse = new Fuse(jsonData, {
        keys: ['automation_name'],
        minMatchCharLength: 1,
        threshold: 0.5 
      });

      const searchInput = document.querySelector('.search-input');

      searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const results = query ? fuse.search(query) : jsonData.map(item => ({ item }));

        const matchedData = results.map(result => result.item);

        populateTable(matchedData);
      });
    })
    .catch(error => console.error('Error loading JSON:', error));
});
