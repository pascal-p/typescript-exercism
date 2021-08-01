class Student {
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
  roster: Map<string, string[]>;

  constructor() {
    this.students = [];
    this.roster = new Map<string, string[]>();
  }

  studentRoster(): Map<string, string[]> {
    // make a deepcopy
    let lst: any = [];
    /*
    this.roster.forEach((val, key) => {
      const obj = Object.assign({}, { key: key, val: val })
      lst.push([obj.key, [...obj.val]]);
    });
    */
    this.roster.forEach((val, key) => lst.push([key, [...val]]));
    return new Map<string, string[]>(lst);
  }

  addStudent(name: string, grade: number): void {
    if (grade <= 0) {
      throw new Error(`invalid grade: ${grade} - must be >0`)
    }

    let ix = this.students.findIndex(s => s.name === name);
    if (ix > - 1) {
      // update
      this.updateRoster(name, grade, ix);
      this.students[ix].grade = grade;
    }
    else {
      // create
      const student = new Student(name, grade);
      this.students.push(student);
      ix = this.students.length - 1;
      this.updateRoster(name, grade, ix);
    }
  }

  studentsInGrade(grade: number): string[] {
    if (grade <= 0) return [];
    const str_gr = String(grade);
    // copy
    const lst = this.roster.get(str_gr) || [];
    return [...lst];
  }

  private updateRoster(name: string, grade: number, ix: number): void {
    const stu_gr = String(this.students[ix].grade);

    let lst = this.roster.get(stu_gr) || [];
    const nlst = lst.filter((n: string) => n !== name);
    this.roster.set(stu_gr, nlst);

    const stu_ngr = String(grade);
    lst = this.roster.get(stu_ngr) || [];
    lst.push(name)
    lst.sort();
    this.roster.set(stu_ngr, lst);
  }
}

export default GradeSchool;
