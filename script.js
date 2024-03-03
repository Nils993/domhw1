// Необходимо создать веб-страницу с динамическими элементами с расписанием занятий.

// На странице должна быть таблица с расписанием занятий, на основе JSON-данных.
// Каждая строка таблицы должна содержать информацию о занятии, а именно:
// - название занятия
// - время проведения занятия
// - максимальное количество участников
// - текущее количество участников
// - кнопка "записаться"
// - кнопка "отменить запись"

// Если максимальное количество участников достигнуто, либо пользователь уже записан на занятие, сделайте кнопку "записаться" неактивной.
// Кнопка "отменить запись" активна в случае, если пользователь записан на занятие, иначе она должна быть неактивна.

// Пользователь может записаться на один курс только один раз.

// При нажатии на кнопку "записаться" увеличьте количество записанных участников.
// Если пользователь нажимает "отменить запись", уменьшите количество записанных участников.
// Обновляйте состояние кнопок и количество участников в реальном времени.

// Если количество участников уже максимально, то пользователь не может записаться, даже если он не записывался ранее.

// Сохраняйте данные в LocalStorage, чтобы они сохранялись и отображались при перезагрузке страницы.

// Начальные данные (JSON):
const arrObjects = [
  {
    id: 1,
    name: "Йога",
    time: "10:00 - 11:00",
    maxParticipants: 15,
    currentParticipants: 8,
  },
  {
    id: 2,
    name: "Пилатес",
    time: "11:30 - 12:30",
    maxParticipants: 10,
    currentParticipants: 5,
  },
  {
    id: 3,
    name: "Кроссфит",
    time: "13:00 - 14:00",
    maxParticipants: 20,
    currentParticipants: 15,
  },
  {
    id: 4,
    name: "Танцы",
    time: "14:30 - 15:30",
    maxParticipants: 12,
    currentParticipants: 10,
  },
  {
    id: 5,
    name: "Бокс",
    time: "16:00 - 17:00",
    maxParticipants: 8,
    currentParticipants: 8,
  },
];
// Преобразуем массив объектов в JSON-строку что бы его можно было передавать через HTTP
const jsonString = JSON.stringify(arrObjects);
// const schedules =
//   '[{"id":1,"name":"Йога","time":"10:00 - 11:00","maxParticipants":15,"currentParticipants":8},{"id":2,"name":"Пилатес","time":"11:30 - 12:30","maxParticipants":10,"currentParticipants":5},{"id":3,"name":"Кроссфит","time":"13:00 - 14:00","maxParticipants":20,"currentParticipants":15},{"id":4,"name":"Танцы","time":"14:30 - 15:30","maxParticipants":12,"currentParticipants":10},{"id":5,"name":"Бокс","time":"16:00 - 17:00","maxParticipants":8,"currentParticipants":6}]';

// console.log(schedules);

const localKey = "schedules";

// Проверка, что если первоначальные данные в localStorage, если нет, то создаём ключ со lsKey со значением initialJson
if (!localStorage.getItem(localKey)) {
  localStorage.setItem(localKey, jsonString);
}

const schedules = JSON.parse(localStorage.getItem(localKey));

const container = document.querySelector(".container");
container.innerHTML = schedules.map(createScheduleHTML).join("");

// Создаём функцию, которая принимает массив объектов и добавляет их в DOM
function createScheduleHTML(itam) {
  return `    <div id="${itam.id}" class="lesson">
  <h1 class="lesson-title">${itam.name}</h1>
  <p class="time">${itam.time}</p>
  <p class="max-member">${itam.maxParticipants}</p>
  <p class="current-member">${itam.currentParticipants}</p>
  <button class="button-sign">Записаться</button>
  <button class="button-cancel">Отменить запись</button>
</div>`;
}
console.log(schedules);
// updatecurrentParticipants();
// function updatecurrentParticipants(itam) {
//   itam.currentParticipants++;
//   localStorage.setItem(localKey, JSON.stringify(schedules));
// }

container.addEventListener("click", (event) => {
  if (event.target.classList.contains("button-sign")) {
    const liItem = event.target.closest(".lesson");
    const maxParticipant = +liItem.querySelector(".max-member").textContent;
    const currentParticipants = +liItem.querySelector(".current-member")
      .textContent++;
    const schedule = schedules.find(
      (schedule) => schedule.id === +liItem.getAttribute("id")
    );
    schedule.currentParticipants = currentParticipants;
    const buttonSign = liItem.querySelector(".button-sign");
    if (currentParticipants >= maxParticipant - 1) {
      buttonSign.disabled = true;
    } else {
      buttonSign.disabled = false;
    }
  }
  localStorage.setItem(localKey, JSON.stringify(schedules));
});

container.addEventListener("click", (event) => {
  if (event.target.classList.contains("button-cancel")) {
    const liItem = event.target.closest(".lesson");
    const currentParticipants = liItem.querySelector(".current-member")
      .textContent--;
    const schedule = schedules.find(
      (schedule) => schedule.id === +liItem.getAttribute("id")
    );
    schedule.currentParticipants = currentParticipants;
    const buttonCancel = liItem.querySelector(".button-cancel");
    if (currentParticipants <= 1) {
      buttonCancel.disabled = true;
    } else {
      buttonCancel.disabled = false;
    }
  }
  localStorage.setItem(localKey, JSON.stringify(schedules));
});
