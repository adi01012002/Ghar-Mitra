
import {
    addStudent,
    fetchStudents,
    fetchStudentByIdService,
    deleteStudent,
    updateStudent,
    getStudentProfile,
    getStudentPayments
} from '../../services/studentService';

// Action to add a student
export const addStudentAction = (studentData) => async (dispatch) => {
    dispatch({ type: 'ADD_STUDENT_REQUEST' });

    try {
        const { student } = await addStudent(studentData); // Assuming the service returns { student }
        dispatch({ type: 'ADD_STUDENT_SUCCESS', payload: student });
    } catch (error) {
        console.error("Error adding student:", error);
        dispatch({
            type: 'ADD_STUDENT_FAILURE',
            payload: error.response?.data?.message || error.message,
        });
    }
};

// Action to fetch all students
export const fetchStudentsAction = () => async (dispatch) => {
    dispatch({ type: 'FETCH_STUDENTS_REQUEST' });

    try {
        const students = await fetchStudents(); // Assuming the service returns a list of students
        dispatch({ type: 'FETCH_STUDENTS_SUCCESS', payload: students });
    } catch (error) {
        console.error("Error fetching students:", error);
        dispatch({
            type: 'FETCH_STUDENTS_FAIL',
            payload: error.response?.data?.message || error.message,
        });
    }
};

// Action to fetch a student by ID
export const fetchStudentByIdAction = (id) => async (dispatch) => {
    dispatch({ type: 'FETCH_STUDENT_BY_ID_REQUEST' });

    try {
        const student = await fetchStudentByIdService(id);
        dispatch({ type: 'FETCH_STUDENT_BY_ID_SUCCESS', payload: student });
    } catch (error) {
        console.error(`Error fetching student with ID ${id}:`, error);
        dispatch({
            type: 'FETCH_STUDENT_BY_ID_FAILURE',
            payload: error.response?.data?.message || error.message,
        });
    }
};

// Action to delete a student
export const deleteStudentAction = (id) => async (dispatch) => {
    dispatch({ type: 'DELETE_STUDENT_REQUEST' });

    try {
        await deleteStudent(id); // Assuming the service handles the API call
        dispatch({ type: 'DELETE_STUDENT_SUCCESS', payload: id });
    } catch (error) {
        console.error(`Error deleting student with ID ${id}:`, error);
        dispatch({
            type: 'DELETE_STUDENT_FAILURE',
            payload: error.response?.data?.message || error.message,
        });
    }
};

// Action to update a student
export const updateStudentAction = (id, updatedData) => async (dispatch) => {
    console.log(id,updatedData)
    console.log("dkdkdkkdkdkdkkkdkkddkdkdkdk")
    dispatch({ type: 'UPDATE_STUDENT_REQUEST' });
    try {
        const updatedStudent = await updateStudent(id, updatedData); // Assuming the service returns updated student
        dispatch({ type: 'UPDATE_STUDENT_SUCCESS', payload: updatedStudent });
    } catch (error) {
        console.error(`Error updating student with ID ${id}:`, error);
        dispatch({
            type: 'UPDATE_STUDENT_FAILURE',
            payload: error.response?.data?.message || error.message,
        });
    }
};



export const fetchStudentProfile = (id) => async (dispatch) => {
    dispatch({ type: "FETCH_PROFILE_REQUEST" });
    try {
      const profile = await getStudentProfile(id);
      dispatch({ type: "FETCH_PROFILE_SUCCESS", payload: profile });
    } catch (error) {
      dispatch({
        type: "FETCH_PROFILE_FAILURE",payload: error.response?.data.message || error.message,
      });
    }
  };

  // Fetch Payments
export const fetchStudentPayments = (id) => async (dispatch) => {
    dispatch({ type: 'FETCH_PAYMENTS_REQUEST' });
    try {
      const data = await getStudentPayments(id);
      dispatch({ type: 'FETCH_PAYMENTS_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_PAYMENTS_FAILURE', payload: error.message });
    }
  };