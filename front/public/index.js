/* 1. https://jsonplaceholder.typicode.com/todos 로부터 데이터를 불러와서 추가해주는 함수 getTodos() 선언 */
// getTodos()는 추후에 HTML DOM 내용이 완전히 로드되었을 때 실행되어야 합니다.
document.addEventListener("DOMContentLoaded", getTodos);
async function getTodos() {
  const ul = document.querySelector(".todos");
  const li = document.createElement("li");

  fetch("https://jsonplaceholder.typicode.com/todos")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      const todo10 = res.slice(0, 10);
      console.log(todo10);
      // for (i of todo10) {
      //   li.innerText = i;
      // }
      // ul.append(li);
    })
    .catch((err) => {
      console.error(err);
    });
}

/* 
  2. 새로운 입력창의 Todo를 Todo 목록에 추가하고, 입력창을 초기화합니다.
  - 공백이나 빈 문자열의 경우 추가될 수 없습니다.
  - 작성 버튼 클릭 시 addTodo() 함수가 실행됩니다.
  - 입력 창에서 Enter 키 입력시에도 addTodo() 함수가 실행됩니다.
*/
const form = document.getElementById("form");
const ul = document.querySelector(".todos");
form.addEventListener("submit", addTodo);
function addTodo(e) {
  e.preventDefault();

  const inputTodo = document.querySelector(".inputTodo");
  const todo = inputTodo.value.trim();
  if (!todo == "") {
    const li = document.createElement("li");
    const del = document.createElement("button");
    del.innerText = "삭제";
    del.classList.add("del");
    li.innerText = todo;
    ul.append(li);
    li.append(del);
  } else {
    alert("할 일을 입력해주세요");
  }
  inputTodo.value = "";
}

/*  3. x 버튼을 클릭하면 클릭한 버튼을 갖는 Todo 항목이 삭제됩니다. */
// 삭제 함수의 이름 및 모양 변경 가능
const del = document.querySelector(".del");
del.addEventListener("onclick", deleteTodo);
function deleteTodo(item) {
  console.log(del);
  del.parentElement.value = "";
}

/* 
 4. Todo 목록 불러오기,  
 - GET https://jsonplaceholder.typicode.com/todos 요청의 응답 결과에서 맨 처음부터 10개의 원소만 잘라내어 
   투두 목록에 초기 Todo를 표시해야 합니다.
 - HTML 문서의 DOM 내용이 완전히 로드되었을 때 실행됩니다.
 - 따로 함수를 만들어도 좋고, 함수를 만들지 않아도 좋습니다.
*/
