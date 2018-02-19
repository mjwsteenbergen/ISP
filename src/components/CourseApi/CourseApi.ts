import { ExampleData } from './ExampleData';

/* tslint:disable */

// import fetch from 'cross-fetch';

export class CourseApi {
  debug: boolean = true;

  startUrl: string = /*'http://localhost:56985/' + */ '/api';

  getMyCourses(): SimpleCourse[] {
    let mycourses: SimpleCourse[] = [];
    let storage = window.localStorage;
    let news = storage.getItem('courses');
    if (news !== null) {
      console.log(news);
      mycourses = JSON.parse(news) as SimpleCourse[];
    }
    return mycourses;
  }

  addCourse(arg: Course) {
    let mycourses: SimpleCourse[] = [];
    let storage = window.localStorage;
    let news = storage.getItem('courses');
    if (news !== null) {
      console.log(news);
      mycourses = JSON.parse(news) as SimpleCourse[];
    }
    mycourses.push({
      code: arg.courseCode,
      year: arg.courseYear
    });
    storage.setItem('courses', JSON.stringify(mycourses));
  }

  /**
   * getCourses
   */
  public async getCourses(): Promise<Course[]> {
    //this.startUrl +
    if (this.debug) {
      return JSON.parse(new ExampleData().Courses()) as Course[];
    }
    var s = await fetch(this.startUrl + '/course');
    let results: Course[] = await s.json();
    return results;
  }

  public async getTags(): Promise<Tag[]> {
    if (this.debug) {
      return JSON.parse(new ExampleData().Tags());
    }
    //this.startUrl +
    var s = await fetch(this.startUrl + '/tags');
    let results: Tag[] = await s.json();
    return results;
  }

  public async getCourse(
    courseCode: string,
    courseYear: string
  ): Promise<Course> {
    if (this.debug) {
      let data = new ExampleData().SingleCourse();
      let course: Course = JSON.parse(data);
      course.courseYear = courseYear;
      return course;
    }

    var s = await fetch(this.startUrl + '/course/' + courseCode);
    let results: Course = await s.json();
    return results;
  }

  public async getPerson(email: string): Promise<Person> {
    if (this.debug) {
      return JSON.parse(new ExampleData().Person());
    }

    var s = await fetch(this.startUrl + '/person/' + email);
    let results: Person = await s.json();
    return results;
  }
}

export interface SimpleCourse {
  code: string;
  year: string;
}

export interface Course {
  courseName: string;
  courseCode: string;
  ects: number;
  quarterStart: number;
  quarterLength: number;
  examPeriod: number;
  educationPeriod: number;
  contactHours?: string | null;
  contents?: string | null;
  studyGoals?: string | null;
  assessment?: string | null;
  educationMethod?: string | null;
  courseYear: string;
  responsibleInstructor?: Instructor[] | null;
  otherInstructors?: Instructor[] | null;
  tags: Tag[];
  lang?: string | null;
}

export interface Instructor {
  email: string;
}

export interface Tag {
  tagName: string;
  courses?: null;
}

export interface Person {
  fullName: string;
  faculty?: string | null;
  email: string;
  telephone?: null;
  room?: null;
  imageUrl?: null;
}
