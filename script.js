document.addEventListener("DOMContentLoaded", function () {
    const subjects = ["bangladesh", "social", "mass", "interpersonal", "ict"];
    
    // Initialize progress bars
    subjects.forEach(subject => {
        updateProgress(subject);
    });

    // Toggle topics visibility
    document.querySelectorAll(".subject-header").forEach(header => {
        header.addEventListener("click", function() {
            const topics = this.parentElement.querySelector(".topics");
            if (getComputedStyle(topics).display === "none") {
                topics.style.display = "block";
            } else {
                topics.style.display = "none";
            }
        });
    });
    

    // Handle checkbox changes
    document.querySelectorAll(".topic-checkbox").forEach(checkbox => {
        checkbox.addEventListener("change", function() {
            const subject = this.dataset.subject;
            saveProgress(subject);
            updateProgress(subject);
        });

        // Load saved state
        const subject = checkbox.dataset.subject;
        const topicText = checkbox.parentElement.textContent.trim();
        if (localStorage.getItem(`${subject}-${topicText}`) === "true") {
            checkbox.checked = true;
        }
    });
});


function saveProgress(subject) {
    document.querySelectorAll(`.topic-checkbox[data-subject="${subject}"]`).forEach(checkbox => {
        const topicText = checkbox.parentElement.textContent.trim();
        localStorage.setItem(`${subject}-${topicText}`, checkbox.checked);
    });
}

function updateProgress(subject) {
    const checkboxes = document.querySelectorAll(`.topic-checkbox[data-subject="${subject}"]`);
    const checkedCount = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
    const progress = (checkedCount / checkboxes.length) * 100;
    document.getElementById(`progress-${subject}`).style.width = `${progress}%`;
}