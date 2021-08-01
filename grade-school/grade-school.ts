interface IStudent {
  readonly name: string;
  grade: number;
}

class Student implements IStudent {
  readonly name: string;
  grade: number;

  constructor(name: string, grade: number) {
    if (grade <= 0) {
      throw new Error(`invalid grade: ${grade} - must be >0`)
    }
    this.name = name;
    this.grade = grade;
  }
}

class GradeSchool {
  students: Student[];

  constructor() {
    this.students = [];
  }

  studentRoster(): Map<string, string[]> {
    // build Map
    let roster = new Map<string, string[]>();

    for (const stud of this.students) {
      const ix = String(stud.grade);
      let lst = roster.get(ix) || [];
      lst.push(stud.name);
      roster.set(ix, lst);
    }

    // sort it
    roster.forEach((v, k, map) => map.set(k, v.sort()));

    return roster;
  }

  addStudent(name: string, grade: number): void {
    if (grade <= 0) {
      throw new Error(`invalid grade: ${grade} - must be >0`)
    }

    const ix = this.students.findIndex(s => s.name === name);
    if (ix > - 1) {
      // student already in list => update
      this.students[ix].grade = grade
    }
    else {
      // create
      const student = new Student(name, grade);
      this.students.push(student);
    }
  }

  studentsInGrade(grade: number): string[] {
    if (grade <= 0) return [];

    const students = this.students.filter(s => s.grade === grade);
    return students.length === 0 ? [] : students.map(s => s.name).sort();
  }
}

export default GradeSchool;
