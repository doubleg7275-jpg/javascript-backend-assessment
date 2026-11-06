const subjectIds = ['mathematics', 'english', 'chemistry', 'physics', 'biology'];

function getScores() {
    const scores = subjectIds.map((id) => {
        const input = document.getElementById(id);
        const score = Number(input.value);

        if (input.value.trim() === '' || !Number.isFinite(score) || score < 0 || score > 100) {
            throw new Error(`Enter a score from 0 to 100 for ${id}.`);
        }

        return score;
    });

    return scores;
}

function clearResults() {
    document.getElementById('studentName').textContent = '';
    document.getElementById('grade').textContent = '';
    document.getElementById('totalScore').textContent = '';
    document.getElementById('average').textContent = '';
}

function calculateTotalScore() {
    clearResults();
    const totalScoreDiv = document.getElementById('totalScore');

    try {
        const total = getScores().reduce((sum, score) => sum + score, 0);
        totalScoreDiv.textContent = `Total score: ${total}`;
        return total;
    } catch (error) {
        totalScoreDiv.textContent = error.message;
        return null;
    }
}

function calculateAverage() {
    clearResults();
    const averageDiv = document.getElementById('average');

    try {
        const scores = getScores();
        const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
        averageDiv.textContent = `Average: ${average.toFixed(2)}`;
        return average;
    } catch (error) {
        averageDiv.textContent = error.message;
        return null;
    }
}

function calculateGrade() {
    clearResults();
    const gradeDiv = document.getElementById('grade');

    try {
        const scores = getScores();
        const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;

        let grade;
        if (average >= 70) {
            grade = 'A';
        } else if (average >= 60) {
            grade = 'B';
        } else if (average >= 50) {
            grade = 'C';
        } else if (average >= 45) {
            grade = 'D';
        } else if (average >= 40) {
            grade = 'E';
        } else {
            grade = 'F';
        }

        gradeDiv.textContent = `Grade: ${grade}`;
    } catch (error) {
        gradeDiv.textContent = error.message;
    }
}

function displayAll() {
    clearResults();
    const name = document.getElementById('name').value.trim();
    const studentNameDiv = document.getElementById('studentName');
    const gradeDiv = document.getElementById('grade');
    const totalScoreDiv = document.getElementById('totalScore');
    const averageDiv = document.getElementById('average');

    if (name === '') {
        studentNameDiv.textContent = 'Please enter the student name.';
        gradeDiv.textContent = '';
        totalScoreDiv.textContent = '';
        averageDiv.textContent = '';
        return;
    }

    try {
        const scores = getScores();
        const total = scores.reduce((sum, score) => sum + score, 0);
        const average = total / scores.length;
        let grade;

        if (average >= 70) {
            grade = 'A';
        } else if (average >= 60) {
            grade = 'B';
        } else if (average >= 50) {
            grade = 'C';
        } else if (average >= 45) {
            grade = 'D';
        } else if (average >= 40) {
            grade = 'E';
        } else {
            grade = 'F';
        }

        studentNameDiv.textContent = `Student name: ${name}`;
        totalScoreDiv.textContent = `Total score: ${total}`;
        averageDiv.textContent = `Average: ${average.toFixed(2)}`;
        gradeDiv.textContent = `Grade: ${grade}`;
    } catch (error) {
        studentNameDiv.textContent = '';
        totalScoreDiv.textContent = '';
        averageDiv.textContent = '';
        gradeDiv.textContent = error.message;
    }
}
