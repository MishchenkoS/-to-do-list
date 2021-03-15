function loadTodo() {
  const DIV_BASIC = document.createElement('div')
  const DIV_HEADER = document.createElement('div');
  const HEADER = document.createElement('h1');
  const DIV_CREATE = document.createElement('div');
  const DIV_UL = document.createElement('div')
  const BUTTON_CREATE = document.createElement('button');
  const BUTTON_CLEAR = document.createElement('button');
  const UL = document.createElement('ul');
  const INPUT_CREATE = document.createElement('input');

  BUTTON_CREATE.innerHTML = 'Create';
  BUTTON_CLEAR.innerHTML = 'Clear';
  HEADER.innerHTML = 'My to-do list';

  document.body.classList.add('body')
  DIV_BASIC.classList.add('div__basic');
  HEADER.classList.add('header');
  DIV_UL.classList.add('div__ul');
  BUTTON_CREATE.classList.add('btn');
  BUTTON_CLEAR.classList.add('btn');
  UL.classList.add('ul__list');
  INPUT_CREATE.classList.add('input');

  document.body.append(DIV_BASIC);
  DIV_BASIC.append(DIV_HEADER)
  DIV_HEADER.append(HEADER);
  DIV_BASIC.append(DIV_CREATE);
  DIV_CREATE.append(INPUT_CREATE);
  DIV_CREATE.append(BUTTON_CREATE);
  DIV_CREATE.append(BUTTON_CLEAR);
  DIV_BASIC.append(DIV_UL);
  DIV_UL.append(UL);

  function loadTodos() {
    const data = localStorage.getItem("todos");
    if (data) {
      UL.innerHTML = data;
    }
  }
 
  function createClick() {
    const LI = document.createElement('li');
    const BUTTON_DELETE = document.createElement('button');
    const BUTTON_CHANGE = document.createElement('button');
    const CHECKBOX = document.createElement('input');

    LI.classList.add('list');
    BUTTON_DELETE.classList.add('button__delete');
    BUTTON_DELETE.classList.add('btn');
    BUTTON_CHANGE.classList.add('button__change');
    BUTTON_CHANGE.classList.add('btn');
    CHECKBOX.classList.add('checkbox');
    
    CHECKBOX.setAttribute('type', 'checkbox');
    BUTTON_DELETE.innerHTML = 'Delete';
    BUTTON_CHANGE.innerHTML = 'Change';

    if(document.querySelector('.div__list')) {
      const DIV_LIST = document.querySelector('.div__list');
      const INPUT_CHANGE = document.querySelector('.input__change');
      LI.innerHTML = `<p>${INPUT_CHANGE.value}</p>`;
      DIV_LIST.remove();
    } else {
      LI.innerHTML = `<p>${INPUT_CREATE.value}</p>`;
      INPUT_CREATE.value = '';
    }

    UL.prepend(LI)
    LI.append(CHECKBOX, BUTTON_CHANGE, BUTTON_DELETE);
    asignAction();
    localStorage.setItem('todos', UL.innerHTML);
  }

  function deleteClick(element) {
    element.onclick = () => {
      element.parentElement.remove();
      localStorage.setItem('todos', UL.innerHTML);
    }
  }

  function changeClick(element, number) {
    element.onclick = () => {
      if(!document.querySelector('.div__list')){
        const BUTTON_SAVE = document.createElement('button');
        const INPUT_CHANGE = document.createElement('input');
        const DIV_LIST = document.createElement('div');

        BUTTON_SAVE.classList.add('button__save');
        BUTTON_SAVE.classList.add('btn')
        DIV_LIST.classList.add('div__list');
        INPUT_CHANGE.classList.add('input__change');
        INPUT_CHANGE.classList.add('input') 

        BUTTON_SAVE.innerHTML = 'Save';
      
        document.querySelectorAll('.list').forEach((element, i) => {
          if(i == number) {
            INPUT_CHANGE.value = element.firstChild.textContent;
            element.parentElement.replaceChild(DIV_LIST, element) ;
            DIV_LIST.append(INPUT_CHANGE, BUTTON_SAVE);
          }
        });

        BUTTON_SAVE.onclick = () => {
          createClick();
        }

        INPUT_CHANGE.addEventListener("keypress", (keyPressed) => {
          const KEY_ENTER = 13;
          if (keyPressed.which == KEY_ENTER) {
            createClick();
          }
        });
      }
    } 
  }

  function checkboxClick(element) {
    element.onclick = () => {
      if(element.checked){
        element.previousElementSibling.style.textDecoration = 'line-through';
      } else {
        element.previousElementSibling.style.textDecoration = 'none';
      }
      localStorage.setItem('todos', UL.innerHTML);
    }
  } 

  function asignAction() {
    document.querySelectorAll('.button__delete').forEach((element) => {
      deleteClick(element);
    });
    document.querySelectorAll('.button__change').forEach((element, i) => {
      changeClick(element, i);
    });
    document.querySelectorAll('.checkbox').forEach((element) => {
      checkboxClick(element);
    });
  }

  function clearClick() {
    document.querySelectorAll('.list').forEach((element) => {
      element.remove();
    })
    document.querySelectorAll('.div__list').forEach((element) => {
      element.remove();
    })
    localStorage.clear();
  }

  loadTodos();
  asignAction();
  BUTTON_CREATE.addEventListener('click', createClick);
  BUTTON_CLEAR.addEventListener('click', clearClick);
  INPUT_CREATE.addEventListener("keypress", (keyPressed) => {
    const KEY_ENTER = 13;
    if (keyPressed.which == KEY_ENTER) {
        createClick();
    }
  });
}

document.addEventListener("DOMContentLoaded", loadTodo);
