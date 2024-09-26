import { startTimer } from '../src/utils/timer'; 

describe('Employee Page Function', () => {
  let timers = {};

  afterEach(() => {
    // Очистка всех таймеров после каждого теста
    Object.values(timers).forEach(clearInterval);
    timers = {};
  });

  test('startTimer should increment time correctly', (done) => {
    const task = { id: 1, time_spent: '00:00:00' };
    startTimer(task, timers);
    setTimeout(() => {
      expect(task.time_spent).not.toBe('00:00:00');
      done();
    }, 1500); // Ожидание 1.5 секунды для обновления времени
  });
});


