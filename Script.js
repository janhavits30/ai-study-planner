// AI Study Planner

document
    .getElementById("studyForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();

        // Get user input
        const name = document.getElementById("studentName").value.trim();
        const subjectsInput = document.getElementById("subjects").value;
        const hours = Number(document.getElementById("hours").value);
        const examDate = document.getElementById("examDate").value;
        const goal = document.getElementById("goal").value;

        // Convert subjects into an array
        const subjects = subjectsInput
            .split(",")
            .map(subject => subject.trim())
            .filter(subject => subject !== "");

        // Validate subjects
        if (subjects.length === 0) {
            alert("Please enter at least one subject.");
            return;
        }

        // Calculate days remaining
        const today = new Date();
        const exam = new Date(examDate);

        today.setHours(0, 0, 0, 0);
        exam.setHours(0, 0, 0, 0);

        const difference = exam - today;
        const daysRemaining = Math.ceil(
            difference / (1000 * 60 * 60 * 24)
        );

        if (daysRemaining < 1) {
            alert("Please select a future exam date.");
            return;
        }

        // Calculate study time per subject
        const hoursPerSubject = (
            hours / subjects.length
        ).toFixed(1);

        // Display result section
        const result = document.getElementById("result");
        result.style.display = "block";

        // Welcome message
        document.getElementById("welcomeMessage").innerHTML = `
            <strong>Hello ${name}! 👋</strong>
            <p>
                You have <strong>${daysRemaining} days</strong>
                remaining until your exam.
            </p>
            <p>
                Your daily study time:
                <strong>${hours} hours</strong>
            </p>
        `;

        // Generate study plan
        let planHTML = `
            <h3>📚 Daily Study Plan</h3>
        `;

        subjects.forEach((subject, index) => {

            planHTML += `
                <div class="plan-item">
                    <h3>${index + 1}. ${subject}</h3>
                    <p>
                        Recommended study time:
                        <strong>${hoursPerSubject} hours/day</strong>
                    </p>
                    <p>
                        Focus on concepts, practice questions,
                        and revision.
                    </p>
                </div>
            `;

        });

        // Add revision session
        planHTML += `
            <div class="plan-item">
                <h3>📝 Revision & Practice</h3>
                <p>
                    Spend the last 30 minutes reviewing
                    what you studied today.
                </p>
            </div>
        `;

        document.getElementById("studyPlan").innerHTML = planHTML;

        // Smart recommendations
        let recommendation = "";

        if (goal === "pass") {

            recommendation = `
                <h3>🎯 Your Recommendation</h3>
                <p>
                    Focus first on important concepts and
                    frequently asked questions. Revise
                    regularly to strengthen your preparation.
                </p>
            `;

        } else if (goal === "good") {

            recommendation = `
                <h3>🎯 Your Recommendation</h3>
                <p>
                    Combine concept learning with daily
                    problem-solving. Take a practice test
                    every few days and review your mistakes.
                </p>
            `;

        } else if (goal === "excellent") {

            recommendation = `
                <h3>🎯 Your Recommendation</h3>
               
