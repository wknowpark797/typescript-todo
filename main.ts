interface Task {
	id: number;
	title: string;
	createdAt: Date;
	complete?: boolean;
}

const form = document.querySelector<HTMLFormElement>('#form');
const input = document.querySelector<HTMLInputElement>('#title');
const list = document.querySelector<HTMLUListElement>('#list');

// JSON의 parse 메서드는 파라미터값으로 문자값만 사용할 수 있다.
// generic으로 타입을 지정할 수 없다.
// 처음 localStorage에 값이 없기 때문에 undefined, null이 저장된다.
// localStorage에 null값이 반환되는 순간 배열을 문자화하여 들어가도록 처리
// parse 메서드 안쪽에는 문자값이 인수로 전달되어 오류를 피할 수 있다.
let tasks: Task[] = JSON.parse(localStorage.getItem('todoList') || '[]');

tasks.map((task) => addListItem(task));

// 처음 스크립트가 로드될 때 아직 DOM이 담기지 않았기 때문에 초기에 undefined가 들어간다.
// form 타입을 HTML 노드 형태로 지정했기 때문에 해당 값이 없을 때 무시하고 넘어가도록 옵셔널 체이닝 처리
form?.addEventListener('submit', (e) => {
	e.preventDefault();

	if (input?.value.trim() === '') return alert('할 일을 입력하세요.');

	const newTask: Task = {
		id: performance.now(),
		title: input?.value || '',
		createdAt: new Date(),
	};
	// input?.value = '';
	// -> 이 구문은 옵셔널 체이닝과 대입연산자를 하나의 표현식으로 처리 불가능
	input && (input.value = '');

	tasks = [newTask, ...tasks]; // 할 일 목록 배열에 추가

	list && (list.innerHTML = '');

	localStorage.setItem('todoList', JSON.stringify(tasks));
	tasks.map((task) => addListItem(task));
});

// 전달되는 파라미터가 객체이므로 해당 객체에 대한 interface 타입 지정
function addListItem(task: Task) {
	const item = document.createElement('li');
	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	checkbox.checked = task.complete ? true : false;
	item.style.textDecoration = task.complete ? 'line-through' : 'none';

	// 동적으로 생성되는 체크박스 요소에 이벤트 핸들러를 연결하여 생성
	// 이벤트 위임을 하지 않아도 동적인 요소에 이벤트를 연결하는 방법
	checkbox.addEventListener('change', () => {
		task.complete = checkbox.checked; // 객체에 complete 속성 추가
		item.style.textDecoration = task.complete ? 'line-through' : 'none';

		localStorage.setItem('todoList', JSON.stringify(tasks));
	});

	item.append(checkbox, task.title);
	list?.append(item);
}
