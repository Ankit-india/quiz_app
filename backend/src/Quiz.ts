import { IoManager } from "./managers/IoManager";

interface Problem {
  title: string;
  description: string;
  image: string;
  answer: string;
  option: {
    id: number;
    title: string;
  };
}

export class Quiz {
  private roomId: String;
  private hasStarted: boolean;
  private problems: Problem[];
  private activeProblem: number;

  constructor(roomid: string) {
    this.roomId = roomid;
    this.hasStarted = false;
    this.problems = [];
    this.activeProblem = 0;
  }

  addProblem(problem: Problem) {
    this.problems.push(problem);
  }

  start() {
    this.hasStarted = true;
    const ioManager = IoManager.getIo();
    ioManager.emit("CHANGE_PROBLEM", {
      problem: this.problems[0],
    });
  }
  next() {
    this.activeProblem++;
    const problem = this.problems[this.activeProblem];
    const ioManager = IoManager.getIo();
    if (problem) {
      ioManager.emit("CHANGE_PROBLEM", {
        problem,
      });
    } else {
      ioManager.emit("QUIZ_END", {
        problem,
      });
    }
  }
}
