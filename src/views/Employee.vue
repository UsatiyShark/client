<template>
  <body>
    <header>
      <div class="logo"><b>T</b>ime<b>T</b>rack &#9203;</div>
    </header>
    <main>
    <h2>Задачи сотрудника</h2>
    <ul class="task-list">
      <li v-for="task in tasks" :key="task.id">
        {{ task.task_name }} - Время: {{ task.time_spent }}
        <button @click="toggleTimer(task)">Вкл/Выкл Таймер</button>
      </li>
    </ul>
    </main>
  </body>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { startTimer } from '../utils/timer';

const tasks = ref([]);
const timers = ref({});

const fetchTasks = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/tasks_employee');
    tasks.value = response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};
const toggleTimer = (task) => {
  const taskId = task.id;
  if (timers.value[taskId]) {
    stopTimer(task);
  } else {
    startTimer(task, timers.value);
  }
};

const stopTimer = (task) => {
  const taskId = task.id;
  clearInterval(timers.value[taskId]);
  delete timers.value[taskId];
  console.log('Sending update for task_id:', taskId, 'with time_spent:', task.time_spent);
  axios.post('http://localhost:3000/api/update_time', {
    task_id: taskId,
    time_spent: task.time_spent
  })
      .then(response => console.log('Time updated:', response))
      .catch(error => console.error('Error updating time:', error));
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
  .task-list {
    grid-template-columns: repeat(1, minmax(200px, 1fr)); /* Один столбец на маленьких экранах */
  }
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 10px;
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