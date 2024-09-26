export const startTimer = (task, timers) => {
    const taskId = task.id;
    timers[taskId] = setInterval(() => {
      let [hours, minutes, seconds] = task.time_spent.split(':').map(Number);
      seconds++;
      if (seconds >= 60) {
        minutes++;
        seconds = 0;
      }
      if (minutes >= 60) {
        hours++;
        minutes = 0;
      }
      task.time_spent = [hours, minutes, seconds].map(v => v.toString().padStart(2, '0')).join(':');
    }, 1000);
};