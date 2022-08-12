/* exported data */
let data = {
  view: 'home-page',
  favorites: [],
  nextEntryId: 0
};

const previousTodosJSON = localStorage.getItem('Ajax-Project');
if (previousTodosJSON !== null) {
  data = JSON.parse(previousTodosJSON);
}

window.addEventListener('beforeunload', handleWindows);
function handleWindows(event) {
  const todosJSON = JSON.stringify(data);
  localStorage.setItem('Ajax-Project', todosJSON);
}
