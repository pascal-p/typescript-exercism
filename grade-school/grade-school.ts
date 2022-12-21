type Pair = [string, string[]]

class Student {
  readonly _name: string;
  _grade: number;

  constructor(name: string, grade: number) {
    if (grade <= 0) {
      throw new Error(`invalid grade: ${grade} - must be >0`)
    }
    this._name = name;
    this._grade = grade;
  }
}

class GradeSchool {
  _students: Student[];
  _roster: Map<string, string[]>;

  constructor() {
    this._students = [];
    this._roster = new Map<string, string[]>();
  }

  studentRoster(): Map<string, string[]> {
    const lst = this.deepClone()
    return new Map<string, string[]>(lst);
  }

  addStudent(name: string, grade: number): void {
    if (grade <= 0) {
      throw new Error(`invalid grade: ${grade} - must be >0`)
    }

    const ix = this._students.findIndex(s => s._name === name);
    if (ix > -1) {
      // update
      this.updateRoster(name, grade, ix);
      this._students[ix]._grade = grade;
      return;
    }
    // create
    this._students = [
      ...this._students,
      new Student(name, grade)
    ]
    this.updateRoster(name, grade, this._students.length - 1);
  }

  studentsInGrade(grade: number): string[] {
    if (grade <= 0) return [];
    const strGr = String(grade);
    // copy
    return [
      ...(this._roster.get(strGr) ?? [])
    ];
  }

  private updateRoster(name: string, grade: number, ix: number): void {
    const stuGr = String(this._students[ix]._grade);
    const lst = this._roster.get(stuGr) ?? [];
    this._roster.set(stuGr, lst.filter((n: string) => n !== name));

    const stuNgr = String(grade);
    const nlst = [
      ...lst,
      name
    ].sort();
    this._roster.set(stuNgr, nlst);
  }

  private deepClone() {
    return [...this._roster]
      .reduce((al: Pair[], [key, val]) => {
        al.push([key, [...val]]);
        return al
      }, []);
  }
}

export default GradeSchool;
