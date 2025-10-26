document.addEventListener('DOMContentLoaded', () => {
    const categorySelect = document.getElementById('categorySelect');
    const focusSelect = document.getElementById('focusSelect');
    const proceedButton = document.getElementById('proceedButton');

    const focusAreas = {
        SoftwareEngineering: [
            "Frontend Development (React/Vue)",
            "Backend Engineering (Node/Java)",
            "Full-Stack Development",
            "DevOps / Cloud",
            "Mobile (iOS/Android)"
        ],
        DataScience: [
            "Machine Learning Engineer",
            "Data Analyst",
            "Data Engineering",
            "Statistical Modeling"
        ],
        Marketing: [
            "Digital Marketing Strategy",
            "Content Marketing",
            "SEO/SEM",
            "Product Marketing"
        ],
        ProductManagement: [
            "Technical PM",
            "Growth PM",
            "Behavioral & Strategy",
            "Product Design Focus"
        ]
    };

    function updateFocusAreas() {
        const selectedCategory = categorySelect.value;
        focusSelect.innerHTML = '<option value="" disabled selected>-- Select a Focus Area --</option>';

        if (selectedCategory) {
            focusSelect.disabled = false;
            const areas = focusAreas[selectedCategory];

            areas.forEach(area => {
                const option = document.createElement('option');
                option.value = area;
                option.textContent = area;
                focusSelect.appendChild(option);
            });
        } else {
            focusSelect.disabled = true;
        }
        checkProceedButtonStatus();
    }

    function checkProceedButtonStatus() {
        const categorySelected = categorySelect.value !== "";
        const focusSelected = focusSelect.value !== "";
        proceedButton.disabled = !(categorySelected && focusSelected);
    }

    categorySelect.addEventListener('change', updateFocusAreas);
    focusSelect.addEventListener('change', checkProceedButtonStatus);

    proceedButton.addEventListener('click', () => {
        const category = categorySelect.value;
        const focus = focusSelect.value;
        
        
        window.location.href = `setup.html?category=${encodeURIComponent(category)}&focus=${encodeURIComponent(focus)}`;
    });
});