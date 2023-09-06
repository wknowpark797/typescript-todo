const form = document.querySelector('#form');
const input = document.querySelector('#title');
const list = document.querySelector('#list');
let tasks = []; // 할 일 목록

form.addEventListener('submit', (e) => {
	e.preventDefault();

	if (input.value.trim() === '') return alert('할 일을 입력하세요.');

	const newTask = {
		id: performance.now(),
		title: input.value,
		createdAt: new Date(),
	};
	input.value = '';

	tasks.push(newTask); // 할 일 목록 배열에 추가
	console.log(tasks);

	list.innerHTML = '';
	tasks.map((task) => addListItem(task)); // 새로운 리스트 생성
});

// 객체를 파라미터로 받아 li 목록을 동적으로 생성해주는 함수
function addListItem(task) {
	const item = document.createElement('li');
	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	item.append(checkbox, task.title);

	list.append(item);
}
