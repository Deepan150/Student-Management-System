from flask import Flask, render_template, request, redirect, url_for
import sqlite3

app = Flask(__name__)


# Database connection
def get_db_connection():
    conn = sqlite3.connect("database.db")
    conn.row_factory = sqlite3.Row
    return conn


# Create students table
def create_table():
    conn = get_db_connection()

    conn.execute("""
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            age INTEGER NOT NULL,
            course TEXT NOT NULL,
            phone TEXT NOT NULL,
            email TEXT NOT NULL
        )
    """)

    conn.commit()
    conn.close()


# Login page
@app.route("/")
def home():
    return render_template("login.html")


# Login
@app.route("/login", methods=["POST"])
def login():

    username = request.form["username"]
    password = request.form["password"]

    if username == "deepan" and password == "1234":
        return redirect(url_for("dashboard"))

    return render_template(
        "login.html",
        error="Invalid username or password."
    )


# Dashboard
@app.route("/dashboard")
def dashboard():

    conn = get_db_connection()

    student_count = conn.execute(
        "SELECT COUNT(*) FROM students"
    ).fetchone()[0]

    conn.close()

    return render_template(
        "dashboard.html",
        student_count=student_count
    )


# Student list
@app.route("/students")
def students():

    conn = get_db_connection()

    students_data = conn.execute(
        "SELECT * FROM students ORDER BY id DESC"
    ).fetchall()

    conn.close()

    return render_template(
        "students.html",
        students=students_data
    )


# Add student
@app.route("/add-student", methods=["GET", "POST"])
def add_student():

    if request.method == "POST":

        name = request.form["name"]
        age = request.form["age"]
        course = request.form["course"]
        phone = request.form["phone"]
        email = request.form["email"]

        conn = get_db_connection()

        conn.execute("""
            INSERT INTO students
            (name, age, course, phone, email)
            VALUES (?, ?, ?, ?, ?)
        """, (name, age, course, phone, email))

        conn.commit()
        conn.close()

        return redirect(url_for("students"))

    return render_template("add_student.html")


@app.route("/edit-student/<int:id>", methods=["GET", "POST"])
def edit_student(id):

    conn = get_db_connection()

    if request.method == "POST":

        name = request.form["name"]
        age = request.form["age"]
        course = request.form["course"]
        phone = request.form["phone"]
        email = request.form["email"]

        conn.execute("""
            UPDATE students
            SET name = ?, age = ?, course = ?, phone = ?, email = ?
            WHERE id = ?
        """, (name, age, course, phone, email, id))

        conn.commit()
        conn.close()

        return redirect(url_for("students"))

    student = conn.execute(
        "SELECT * FROM students WHERE id = ?",
        (id,)
    ).fetchone()

    conn.close()

    return render_template(
        "edit_student.html",
        student=student
    )

# Delete student
@app.route("/delete-student/<int:id>")
def delete_student(id):

    conn = get_db_connection()

    conn.execute(
        "DELETE FROM students WHERE id = ?",
        (id,)
    )

    conn.commit()
    conn.close()

    return redirect(url_for("students"))

if __name__ == "__main__":

    create_table()

    app.run(debug=True)