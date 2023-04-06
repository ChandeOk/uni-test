const getData = async (url) => {
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

const searchInput = document.querySelector('.search-input');
getData('https://jsonplaceholder.typicode.com/posts');
let isSearched = false;

searchInput.addEventListener('input', async function (e) {
  const value = e.target.value;
  const tableData = document.querySelectorAll('.table-title ');
  if (value.length < 3) {
    tableData.forEach((td) => td.parentElement.classList.remove('hide'));
    isSearched = false;
    return;
  }
  tableData.forEach((td) => {
    if (!td.textContent.includes(value)) {
      td.parentElement.classList.add('hide');
    } else {
      td.parentElement.classList.remove('hide');
    }
  });
  isSearched = true;
});

const generateTable = async (ascending = true, array) => {
  const arr = array
    ? array
    : await getData('https://jsonplaceholder.typicode.com/posts');

  const table = document.createElement('table');
  const userIdHeader = document.createElement('th');
  userIdHeader.classList.add('user-id-header');
  userIdHeader.textContent = 'User ID';
  const idHeader = document.createElement('th');
  idHeader.classList.add('id-header');
  idHeader.textContent = 'ID';
  const titleHeader = document.createElement('th');
  titleHeader.classList.add('title-header');

  titleHeader.textContent = 'Title';
  const bodyHeader = document.createElement('th');
  bodyHeader.classList.add('body-header');

  bodyHeader.textContent = 'Body';
  const tabelHeader = document.createElement('tr');
  tabelHeader.append(userIdHeader, idHeader, titleHeader, bodyHeader);
  table.append(tabelHeader);

  if (!ascending) {
    arr.sort((a, b) => b.id - a.id);
    userIdHeader.classList.add('descending');
    idHeader.classList.add('descending');
  }
  const data = arr.map((obj) => {
    const row = document.createElement('tr');
    const userId = document.createElement('td');
    const id = document.createElement('td');
    const title = document.createElement('td');
    title.classList.add('table-title');
    const body = document.createElement('td');
    body.classList.add('table-body');
    userId.textContent = obj.userId;
    id.textContent = obj.id;
    title.textContent = obj.title;
    body.textContent = obj.body;
    row.append(userId, id, title, body);
    return row;
  });
  table.append(...data);
  document.body.appendChild(table);
  if (isSearched) {
    const tableData = document.querySelectorAll('td');
    tableData.forEach((td) => {
      if (!td.textContent.includes(searchInput.value)) {
        td.parentElement.classList.add('hide');
      } else {
        td.parentElement.classList.remove('hide');
      }
    });
  }
  return arr;
};

generateTable();

async function handleSort() {
  console.log('click');
  if (!this.classList.contains('descending')) {
    document.querySelector('table').remove();
    generateTable(false);
  } else {
    document.querySelector('table').remove();
    generateTable(true);
  }
}

const observer = new MutationObserver((mutations, observer) => {
  const userIdHeaderElement = document.querySelector('.user-id-header');
  const idHeaderElement = document.querySelector('.id-header');
  if (document.contains(userIdHeaderElement)) {
    userIdHeaderElement.addEventListener('click', handleSort);
    idHeaderElement.addEventListener('click', handleSort);
  }
});

observer.observe(document, {
  attributes: false,
  childList: true,
  characterData: false,
  subtree: true,
});
