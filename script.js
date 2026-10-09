// 🤖 Zagol Company Functional State System (script.js)

const regForm = document.getElementById('regForm');
const registerSection = document.getElementById('registerSection');
const profileSection = document.getElementById('profileSection');

// Monitors DOM state lifecycle on boot and checks for active student sessions
window.addEventListener('DOMContentLoaded', () => {
    checkUserSession();
});

// Capture registration events and store them inside local storage arrays safely
if (regForm) {
    regForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevents page reload cycles

        const fullName = document.getElementById('fullName').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const grade = document.getElementById('grade').value;
        
        // Dynamically creates a unique identifier code string
        const randomId = "ZGL-" + Math.floor(1000 + Math.random() * 9000); 

        // Compiles data into JSON model representation
        localStorage.setItem('zagolUser', JSON.stringify({
            name: fullName,
            phone: phone,
            grade: grade,
            id: randomId
        }));

        checkUserSession(); // Forces profile layout shift recalculation
        regForm.reset(); // Purges entry boxes
    });
}

// Switches rendering branches based on local session storage statuses
function checkUserSession() {
    const savedUser = localStorage.getItem('zagolUser');
    
    if (savedUser) {
        const user = JSON.parse(savedUser);
        
        // Formats select values into standard Amharic text translations
        let gradeText = "";
        if (user.grade === "9-10") gradeText = "ከ 9ኛ - 10ኛ ክፍል";
        else if (user.grade === "11-12") gradeText = "ከ 11ኛ - 12ኛ ክፍል";
        else if (user.grade === "University") gradeText = "ዩኒቨርሲቲ / ኮሌጅ";

        // Assigns safe innerText mutations into elements securely
        if (document.getElementById('profName')) document.getElementById('profName').innerText = user.name;
        if (document.getElementById('profGrade')) document.getElementById('profGrade').innerText = gradeText;
        if (document.getElementById('profPhone')) document.getElementById('profPhone').innerText = user.phone;
        if (document.getElementById('profId')) document.getElementById('profId').innerText = user.id;

        // Visual layout shifts
        if (registerSection) registerSection.style.display = 'none';
        if (profileSection) profileSection.style.display = 'block';
    } else {
        // Fallback states when data records are vacant
        if (registerSection) registerSection.style.display = 'block';
        if (profileSection) profileSection.style.display = 'none';
    }
}

// Session destruction routine handler (Logout functionality)
function logoutUser() {
    localStorage.removeItem('zagolUser'); // Wipes token arrays
    checkUserSession(); // Shifts visibility nodes back to auth fields
}
