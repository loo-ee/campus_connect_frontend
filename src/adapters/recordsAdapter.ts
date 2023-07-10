import { backendURL } from "../util/globalVars";
import { ISTudentTask } from "../util/types";

// POST REQUESTS

export async function registerStudent(email: string, yearLevel: number) {
  try {
    const res = await fetch(`${backendURL}/records/register-student/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        yearLevel: yearLevel,
      }),
    });

    return res;
  } catch (error) {
    return 404;
  }
}

export async function registerTeacher(email: string, department: string) {
  try {
    const res = await fetch(`${backendURL}/records/register-teacher/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        department: department,
      }),
    });

    return res;
  } catch (error) {
    return 404;
  }
}

// PUT REQUESTS

export async function updateStudentTask(studentTask: ISTudentTask) {
  try {
    const response = await fetch(
      `${backendURL}/records/update-student-task/${studentTask.id}/`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          is_completed: studentTask.is_completed,
          submitted_work: studentTask.submitted_work,
        }),
      }
    );

    if (!response.ok) return 500;

    return 200;
  } catch (error) {
    return 500;
  }
}

// GET REQUESTS

export async function getAllSubjectsParams() {
  try {
    const response = await fetch(
      `${backendURL}/records/get-student-subjects-params/`,
      { cache: "no-store" }
    );

    if (!response.ok) return null;

    return response.json();
  } catch (error) {
    return null;
  }
}

export async function getStudentSubjectsParams(studentEmail: string) {
  try {
    const response = await fetch(
      `${backendURL}/records/get-student-subjects-params/?studentEmail=${studentEmail}`,
      { cache: "no-store" }
    );

    if (!response.ok) return null;

    return response.json();
  } catch (error) {
    return null;
  }
}

export async function getAllSectionsParams() {
  try {
    const response = await fetch(
      `${backendURL}/records/get-all-sections-params/`,
      { cache: "no-store" }
    );

    if (!response.ok) return null;

    return response.json();
  } catch (error) {
    return null;
  }
}

export async function getAllTasksParams() {
  try {
    const response = await fetch(
      `${backendURL}/records/get-all-tasks-params/`,
      { cache: "no-store" }
    );

    if (!response.ok) return null;

    return response.json();
  } catch (error) {
    return null;
  }
}

export async function getStudentSubjects(studentEmail: string) {
  try {
    const response = await fetch(
      `${backendURL}/records/get-student-classes/?studentEmail=${studentEmail}`
    );

    if (!response.ok) return null;

    return response.json();
  } catch (error) {
    return null;
  }
}

export async function getSection(sectionCode: string) {
  try {
    const response = await fetch(
      `${backendURL}/records/get-section/?sectionCode=${sectionCode}`
    );

    if (!response.ok) return null;

    return response.json();
  } catch (error) {
    return null;
  }
}

export async function getStudentClass(
  sectionCode: string,
  studentEmail: string
) {
  try {
    const response = await fetch(
      `${backendURL}/records/get-student-class/?studentEmail=${studentEmail}&sectionCode=${sectionCode}`
    );

    if (!response.ok) return null;

    return response.json();
  } catch (error) {
    return null;
  }
}

export async function getTasks(sectionCode: string) {
  try {
    const response = await fetch(
      `${backendURL}/records/get-tasks/?sectionCode=${sectionCode}`
    );

    if (!response.ok) return null;

    return response.json();
  } catch (error) {
    return null;
  }
}

export async function getSectionMembers(sectionCode: string) {
  try {
    const response = await fetch(
      `${backendURL}/records/get-all-section-members/?sectionCode=${sectionCode}`
    );

    if (!response.ok) return null;

    return response.json();
  } catch (error) {
    return null;
  }
}

export async function getStudentTask(taskTitle: string, studentEmail: string) {
  try {
    const response = await fetch(
      `${backendURL}/records/get-student-task/?studentEmail=${studentEmail}&taskTitle=${taskTitle}`
    );

    if (!response.ok) return null;

    return response.json();
  } catch (error) {
    return null;
  }
}
