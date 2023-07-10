export interface IAcessToken {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: string;
  username: string;
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  avatar: string;
  lastLogin: string;
  isTeacher: boolean;
}

export interface IUserCreation {
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  email: string;
}

export interface IStudent extends IUser {
  user: IUser;
  yearLevel: number;
}

export interface ITeacher extends IUser {
  user: IUser;
  department: string;
}

export interface IStudentClass {
  id: number;
  student: IStudent | number;
  teacher: ITeacher;
  subject: ISubject;
  section_code: string;
}

export interface ISection {
  id: number;
  sectin_code: string;
  teacher: ITeacher;
  subject: ISubject;
  student_classes: number[];
}

export interface ISubject {
  id: number;
  code: string;
  name: string;
  description: string;
  image: string;
}

export interface IGrade {
  id: number;
  value: number;
}

export interface IGradeBook {
  id: number;
  student: IStudent;
  grades: IGrade[];
}

export interface IAnnouncement {
  id: number;
  course: ISubject;
  title: string;
  body: string;
  pubDate: string;
}

export interface IToken {
  access: string;
  refresh: string;
}

export interface ITask {
  id: number;
  section: string;
  task_title: string;
  description: string;
  deadline: Date;
  created_at: Date;
  prompt: string;
}

export interface ISTudentTask {
  id: number;
  task: ITask;
  student_class: IStudentClass;
  is_completed: boolean;
  grade: IGrade;
  submitted_work: string;
}
