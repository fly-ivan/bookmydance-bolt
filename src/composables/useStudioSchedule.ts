import { ref, computed } from 'vue';
import type { DanceLesson, Instructor, TimeSlot, WeekDay, DailyStats } from '../types/Event';

export function useStudioSchedule() {
  const currentWeekStart = ref(new Date());
  
  // Set to start of week (Monday)
  const setToStartOfWeek = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  currentWeekStart.value = setToStartOfWeek(new Date());

  const instructors = ref<Instructor[]>([
    {
      id: '1',
      name: 'Ivan',
      specialties: ['waltz', 'tango', 'foxtrot'],
      hourlyRate: 80
    },
    {
      id: '2', 
      name: 'Maria',
      specialties: ['rumba', 'cha-cha', 'samba'],
      hourlyRate: 75
    },
    {
      id: '3',
      name: 'Carlos',
      specialties: ['salsa', 'bachata', 'swing'],
      hourlyRate: 70
    }
  ]);

  const selectedInstructor = ref(instructors.value[0]);

  // Helper function to get Tuesday's date string (for lessons)
  const getTuesdayDateString = () => {
    const today = new Date();
    const tuesday = new Date(today);
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -5 : 2); // adjust to get Tuesday
    tuesday.setDate(diff);
    return tuesday.toISOString().split('T')[0];
  };

  const lessons = ref<DanceLesson[]>([
    {
      id: '1',
      studentNames: 'Stephanie & Carlo', 
      instructorId: '1',
      startTime: '14:30',
      endTime: '15:10',
      date: getTuesdayDateString(),
      danceStyle: 'waltz',
      lessonType: 'group',
      price: 80,
      duration: 40,
      notes: 'Beginner level'
    },
    {
      id: '2',
      studentNames: 'Kate Schwitz',
      instructorId: '1',
      startTime: '15:15',
      endTime: '15:55',
      date: getTuesdayDateString(),
      danceStyle: 'rumba',
      lessonType: 'wedding',
      price: 80,
      duration: 40,
      notes: 'Wedding preparation'
    },
    {
      id: '3',
      studentNames: 'Debbie & Bryan',
      instructorId: '1',
      startTime: '16:00',
      endTime: '16:40',
      date: getTuesdayDateString(),
      danceStyle: 'waltz',
      lessonType: 'private',
      price: 75,
      duration: 40,
      notes: 'Introduction level'
    },
    {
      id: '4',
      studentNames: 'Emily & Johnny',
      instructorId: '1',
      startTime: '16:45',
      endTime: '17:25',
      date: getTuesdayDateString(),
      danceStyle: 'foxtrot',
      lessonType: 'private',
      price: 75,
      duration: 40,
      notes: 'Introduction level'
    },
    {
      id: '5',
      studentNames: 'Lourdes Rivera',
      instructorId: '1',
      startTime: '17:30',
      endTime: '18:10',
      date: getTuesdayDateString(),
      danceStyle: 'cha-cha',
      lessonType: 'group',
      price: 100,
      duration: 40,
      notes: 'Advanced level'
    },
    {
      id: '6',
      studentNames: 'Carolin and John',
      instructorId: '1',
      startTime: '18:15',
      endTime: '18:55',
      date: getTuesdayDateString(),
      danceStyle: 'tango',
      lessonType: 'private',
      price: 75,
      duration: 40,
      notes: 'Introduction level'
    },
    {
      id: '7',
      studentNames: 'Sharon Bricker',
      instructorId: '1',
      startTime: '19:00',
      endTime: '19:40',
      date: getTuesdayDateString(),
      danceStyle: 'cha-cha',
      lessonType: 'group',
      price: 90,
      duration: 40,
      notes: 'Advanced level'
    },
    {
      id: '8',
      studentNames: 'Kate Schwitz',
      instructorId: '1',
      startTime: '19:45',
      endTime: '20:25',
      date: getTuesdayDateString(),
      danceStyle: 'rumba',
      lessonType: 'wedding',
      price: 80,
      duration: 40,
      notes: 'Wedding preparation'
    }
  ]);

  const timeSlots = computed<TimeSlot[]>(() => [
    { time: '13:00', displayTime: '1:00', endTime: '1:40' },
    { time: '13:45', displayTime: '1:45', endTime: '2:25' },
    { time: '14:30', displayTime: '2:30', endTime: '3:10' },
    { time: '15:15', displayTime: '3:15', endTime: '3:55' },
    { time: '16:00', displayTime: '4:00', endTime: '4:40' },
    { time: '16:45', displayTime: '4:45', endTime: '5:25' },
    { time: '17:30', displayTime: '5:30', endTime: '6:10' },
    { time: '18:15', displayTime: '6:15', endTime: '6:55' },
    { time: '19:00', displayTime: '7:00', endTime: '7:40' },
    { time: '19:45', displayTime: '7:45', endTime: '8:25' }
  ]);

  const weekDays = computed<WeekDay[]>(() => {
    const days: WeekDay[] = [];
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    
    for (let i = 0; i < 5; i++) {
      const date = new Date(currentWeekStart.value);
      date.setDate(currentWeekStart.value.getDate() + i);
      
      const dayLessons = lessons.value.filter(lesson => 
        lesson.date === date.toISOString().split('T')[0] &&
        lesson.instructorId === selectedInstructor.value.id
      );
      
      days.push({
        date,
        dayName: dayNames[i],
        dayNumber: date.getDate(),
        month: date.getMonth() + 1,
        lessons: dayLessons
      });
    }
    
    return days;
  });

  const currentWeekDisplay = computed(() => {
    const start = new Date(currentWeekStart.value);
    const end = new Date(start);
    end.setDate(start.getDate() + 4);
    
    const startMonth = start.toLocaleDateString('en-US', { month: 'long' });
    const endMonth = end.toLocaleDateString('en-US', { month: 'long' });
    const year = start.getFullYear();
    
    if (startMonth === endMonth) {
      return `${startMonth} ${start.getDate()}-${end.getDate()}, ${year}`;
    } else {
      return `${startMonth} ${start.getDate()} - ${endMonth} ${end.getDate()}, ${year}`;
    }
  });

  const dailyStats = computed<DailyStats[]>(() => {
    return weekDays.value.map(day => ({
      lessonCount: day.lessons.length,
      revenue: day.lessons.reduce((sum, lesson) => sum + lesson.price, 0)
    }));
  });

  const previousWeek = () => {
    const newDate = new Date(currentWeekStart.value);
    newDate.setDate(newDate.getDate() - 7);
    currentWeekStart.value = newDate;
  };

  const nextWeek = () => {
    const newDate = new Date(currentWeekStart.value);
    newDate.setDate(newDate.getDate() + 7);
    currentWeekStart.value = newDate;
  };

  const addLesson = (lesson: Omit<DanceLesson, 'id'>) => {
    const newLesson: DanceLesson = {
      ...lesson,
      id: Date.now().toString()
    };
    lessons.value.push(newLesson);
  };

  const updateLesson = (lessonId: string, updatedLesson: Omit<DanceLesson, 'id'>) => {
    const index = lessons.value.findIndex(l => l.id === lessonId);
    if (index !== -1) {
      lessons.value[index] = { ...updatedLesson, id: lessonId };
    }
  };

  const deleteLesson = (lessonId: string) => {
    lessons.value = lessons.value.filter(l => l.id !== lessonId);
  };

  const getLessonByTimeAndDate = (time: string, date: string) => {
    return lessons.value.find(lesson => 
      lesson.startTime === time && 
      lesson.date === date &&
      lesson.instructorId === selectedInstructor.value.id
    );
  };

  return {
    currentWeekStart,
    currentWeekDisplay,
    instructors,
    selectedInstructor,
    lessons,
    timeSlots,
    weekDays,
    dailyStats,
    previousWeek,
    nextWeek,
    addLesson,
    updateLesson,
    deleteLesson,
    getLessonByTimeAndDate
  };
}