export interface DanceLesson {
  id: string;
  studentNames: string;
  instructorId: string;
  startTime: string;
  endTime: string;
  date: string;
  danceStyle: DanceStyle;
  lessonType: LessonType;
  price: number;
  duration: number; // in minutes
  notes?: string;
}

export type DanceStyle = 'waltz' | 'tango' | 'foxtrot' | 'quickstep' | 'viennese-waltz' | 'rumba' | 'cha-cha' | 'samba' | 'jive' | 'paso-doble' | 'salsa' | 'bachata' | 'swing' | 'argentine-tango';

export type LessonType = 'private' | 'group' | 'wedding' | 'competition';

export interface Instructor {
  id: string;
  name: string;
  avatar?: string;
  specialties: DanceStyle[];
  hourlyRate: number;
}

export interface TimeSlot {
  time: string;
  displayTime: string;
  endTime: string;
}

export interface WeekDay {
  date: Date;
  dayName: string;
  dayNumber: number;
  month: number;
  lessons: DanceLesson[];
}

export interface DailyStats {
  lessonCount: number;
  revenue: number;
}