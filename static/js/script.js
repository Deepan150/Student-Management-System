console.log("SCRIPT JS LOADED");

/* =====================================
   LOGIN
===================================== */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const username =
            document.getElementById("username").value;

        const password =
            document.getElementById("password").value;

        const loginError =
            document.getElementById("loginError");

        if (username === "deepan" && password === "1234") {

            localStorage.setItem("isLoggedIn", "true");

            window.location.href = "/dashboard";

        } else {

            loginError.textContent =
                "Invalid username or password.";
        }

    });
}


/* =====================================
   LOGOUT
===================================== */

const logoutBtn =
    document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function(event) {

        event.preventDefault();

        localStorage.removeItem("isLoggedIn");

        window.location.href = "/";

    });

}


/* =====================================
   SEARCH STUDENT
===================================== */

const searchInput =
    document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keyup", function() {

        const searchValue =
            this.value.toLowerCase().trim();

        const rows =
            document.querySelectorAll(
                "#studentTable tbody tr"
            );

        let visibleRows = 0;

        rows.forEach(function(row) {

            const studentName =
                row.cells[1].textContent
                .toLowerCase()
                .trim();

            const studentCourse =
                row.cells[3].textContent
                .toLowerCase()
                .trim();

            if (
                studentName.includes(searchValue) ||
                studentCourse.includes(searchValue)
            ) {

                row.style.display = "";

                visibleRows++;

            } else {

                row.style.display = "none";

            }

        });

        const noStudents =
            document.getElementById("noStudents");

        if (noStudents) {

            if (visibleRows === 0) {

                noStudents.textContent =
                    "No students found.";

                noStudents.style.display = "block";

            } else {

                noStudents.style.display = "none";

            }

        }

    });

}

/* =====================================
   PASSWORD SHOW / HIDE
===================================== */

function showHidePassword() {

    const passwordInput = document.getElementById("password");
    const toggleButton = document.getElementById("togglePassword");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleButton.textContent = "🙈";
    } else {
        passwordInput.type = "password";
        toggleButton.textContent = "👁";
    }
}



const studentForm =
    document.getElementById("studentForm");

if (studentForm) {

    studentForm.addEventListener("submit", function(event) {

        const studentName =
            document.getElementById("studentName").value.trim();

        const studentAge =
            document.getElementById("studentAge").value;

        const formMessage =
            document.getElementById("formMessage");


        // NAME VALIDATION
        if (studentName.length < 3) {

            event.preventDefault();

            formMessage.textContent =
                "Student name must be at least 3 characters.";

            formMessage.style.color = "red";

            return;
        }


        // AGE VALIDATION
        if (studentAge < 18 || studentAge > 60) {

            event.preventDefault();

            formMessage.textContent =
                "Age must be between 18 and 60.";

            formMessage.style.color = "red";

            return;
        }

    });

}
// PHONE VALIDATION
const studentPhone =
    document.getElementById("studentPhone").value.trim();

if (!/^[0-9]{10}$/.test(studentPhone)) {

    event.preventDefault();

    formMessage.textContent =
        "Phone number must be exactly 10 digits.";

    formMessage.style.color = "red";

    return;
}

// EMAIL VALIDATION
const studentEmail =
    document.getElementById("studentEmail").value.trim();

const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailPattern.test(studentEmail)) {

    event.preventDefault();

    formMessage.textContent =
        "Please enter a valid email address.";

    formMessage.style.color = "red";

    return;
}