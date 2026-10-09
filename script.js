// የዛጎል ኩባንያ የጃቫስክሪፕት መቆጣጠሪያ ፋይል (script.js)

const regForm = document.getElementById('regForm');
const registerSection = document.getElementById('registerSection');
const profileSection = document.getElementById('profileSection');

// ድረ-ገጹ ሲከፈት በቅድሚያ የተቀመጠ ዳታ መኖሩን ያረጋግጣል
window.addEventListener('DOMContentLoaded', () => {
    checkUserSession();
});

// ተማሪው ፎርሙን ሞልቶ ሲያስረክብ (Submit ሲያደርግ)
if (regForm) {
    regForm.addEventListener('submit', (event) => {
        event.preventDefault(); // ገጹ እንዳይደሰክስ (Refresh እንዳይሆን) ይከላከላል

        const fullName = document.getElementById('fullName').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const grade = document.getElementById('grade').value;
        
        // ለእያንዳንዱ ተማሪ የተለየ መለያ ቁጥር (ID) በዘፈቀደ ያመነጫል
        const randomId = "ZGL-" + Math.floor(1000 + Math.random() * 9000); 

        // የተማሪውን መረጃ በብሮውዘሩ LocalStorage ውስጥ በዕቃ (Object) መልክ ያስቀምጣል
        localStorage.setItem('zagolUser', JSON.stringify({
            name: fullName,
            phone: phone,
            grade: grade,
            id: randomId
        }));

        checkUserSession(); // ሴሽኑን ያድሳል (Profile ያሳያል)
        regForm.reset(); // ፎርሙን ባዶ ያደርጋል
    });
}

// የተጠቃሚውን አባልነት ሁኔታ መፈተኛ ፈንክሽን
function checkUserSession() {
    const savedUser = localStorage.getItem('zagolUser');
    
    if (savedUser) {
        const user = JSON.parse(savedUser);
        
        // የመረጠውን የክፍል ኮድ ወደ አማርኛ ጽሑፍ ይቀይራል
        let gradeText = "";
        if (user.grade === "9-10") gradeText = "ከ 9ኛ - 10ኛ ክፍል";
        else if (user.grade === "11-12") gradeText = "ከ 11ኛ - 12ኛ ክፍል";
        else if (user.grade === "University") gradeText = "ዩኒቨርሲቲ / ኮሌጅ";

        // ፕሮፋይሉን በተመዘገበው ተማሪ ዳታ ይሞላል
        if (document.getElementById('profName')) document.getElementById('profName').innerText = user.name;
        if (document.getElementById('profGrade')) document.getElementById('profGrade').innerText = gradeText;
        if (document.getElementById('profPhone')) document.getElementById('profPhone').innerText = user.phone;
        if (document.getElementById('profId')) document.getElementById('profId').innerText = user.id;

        // የምዝገባ ፎርሙን ደብቆ ውቡን ፕሮፋይል ያሳያል
        if (registerSection) registerSection.style.style.display = 'none';
        if (profileSection) profileSection.style.style.display = 'block';
    } else {
        // መረጃ ከሌለ ፕሮፋይሉን ደብቆ የምዝገባ ፎርሙን ያሳያል
        if (registerSection) registerSection.style.style.display = 'block';
        if (profileSection) profileSection.style.style.display = 'none';
    }
}

// ከአባልነት መውጫ (Logout) ፈንክሽን
function logoutUser() {
    localStorage.removeItem('zagolUser'); // ዳታውን ያጠፋል
    checkUserSession(); // ወደ ምዝገባ ፎርም ይመልሰዋል
}
