<template>
   <body>
    <header>
      <div class="logo"><b>T</b>ime<b>T</b>rack &#9203;</div>
      <div class="burger-menu" @click="toggleMenu">
        &#9776;
      </div>
      <nav :class="{ open: isOpen }">
        <router-link to="/add-task" class="nav-link" @click="closeMenu">Задачи</router-link>
        <router-link to="/add-project" class="nav-link" @click="closeMenu">Проекты</router-link>
        <router-link to="/task-stats" class="nav-link" @click="closeMenu">Детальная статистика</router-link>
      </nav>
    </header>
    <main>
      <div>
        <h1>Добавление задачи</h1>
        <input v-model="newTaskName" placeholder="Введите название задачи" />
        <button @click="addTask">Добавить задачу</button>
      </div>
      <h2>Статистика выполнения задач</h2>
      <ul class="task-list">
        <li v-for="task in tasks" :key="task.id">
          {{ task.task_name }} - Время: {{ task.time_spent }}
        </li>
      </ul>
    </main>
  </body>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import axios from 'axios';
const newTaskName = ref('');
const tasks = ref([]);
const isOpen = ref(false);
const addTask = async () => {
  if (newTaskName.value.trim() === '') {
    alert('Пожалуйста, введите название задачи.');
    return;
  }
  try {
    const response = await axios.post('http://localhost:3000/api/add_task', {
      task_name: newTaskName.value
    });
    alert('Задача успешно добавлена!');
    newTaskName.value = ''; // Очистка поля после добавления
    await fetchTasks();
  } catch (error) {
    console.error('Произошла ошибка при добавлении задачи:', error);
    alert('Не удалось добавить задачу. Проверьте консоль для деталей.');
  }
};
const fetchTasks = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/stats');
    tasks.value = response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};
const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};
const closeMenu = () => {
  isOpen.value = false;
};
onMounted(fetchTasks);
</script>

<style scoped>
body {
  width: 100%;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  padding: 10px;
  width: 100%;
  margin: 0; /* Удаление отступов */
  margin-top: -10px;
  margin-left: -10px;
}
.logo {
  color: #fff;
  font-size: 24px;
}
.burger-menu {
  display: none;
  cursor: pointer;
  font-size: 20px;
  color: #fff;
}
.nav-link {
  color: #fff;
  text-decoration: none;
  padding: 10px 20px;
}
.nav-link:hover {
  background-color: #555; /* Цвет фона при наведении */
}
.task-list {
  list-style-type: none; /* Удаление маркеров списка */
  margin: 0;
  padding: 0;  
  display: grid; /* Используем CSS Grid */
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Автоматическая подгонка столбцов */
  gap: 10px; /* Отступы между элементами */
}
.task-list li {
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
}

@media only screen and (max-width: 580px) {
  .burger-menu {
    display: block; /* Показать бургер-меню на маленьких экранах */
  }

  nav {
    display: none; /* Скрыть навигацию по умолчанию */
    flex-direction: column;
    width: 100%;
    background-color: #444; /* Фон для навигации */
  }

  nav.open {
    display: flex; /* Показать навигацию при открытом меню */
    width: auto;
    max-width: calc(100% - 20px); /* Максимальная ширина с отступами */
  }

  .nav-link {
    display: block; /* Показать ссылки в навигации */
    padding: 10px 20px; /* Добавить отступы для ссылок */
    background-color: #444; /* Сделать фон ссылок темнее */
    width: 100%; /* Растянуть ссылки на всю ширину */
    text-align: center; /* Выравнивание текста по центру */
  }
  
  .task-list {
    grid-template-columns: repeat(1, minmax(200px, 1fr)); /* Один столбец на маленьких экранах */
  }
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

input {
  padding: 10px;
  margin-right: 10px;
}
</style>