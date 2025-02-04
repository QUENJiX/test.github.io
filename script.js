document.addEventListener("DOMContentLoaded", function () {
    const subjects = ["bangladesh", "social", "mass"];
    
    subjects.forEach(subject => {
        updateProgress(subject);
    });

    document.querySelectorAll(".subject-header").forEach(header => {
        header.addEventListener("click", function () {
            this.nextElementSibling.classList.toggle("topics");
        });
    });

    document.querySelectorAll(".topic-checkbox").forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            const subject = this.dataset.subject;
            saveProgress(subject);
            updateProgress(subject);
        });

        const subject = checkbox.dataset.subject;
        if (localStorage.getItem(`${subject}-${checkbox.nextSibling.textContent.trim()}`) === "true") {
            checkbox.checked = true;
        }
    });
});

function saveProgress(subject) {
    document.querySelectorAll(`.topic-checkbox[data-subject="${subject}"]`).forEach(checkbox => {
        localStorage.setItem(`${subject}-${checkbox.nextSibling.textContent.trim()}`, checkbox.checked);
    });
}

function updateProgress(subject) {
    const checkboxes = document.querySelectorAll(`.topic-checkbox[data-subject="${subject}"]`);
    const checkedCount = [...checkboxes].filter(checkbox => checkbox.checked).length;
    const progress = (checkedCount / checkboxes.length) * 100;
    document.getElementById(`progress-${subject}`).style.width = `${progress}%`;
}