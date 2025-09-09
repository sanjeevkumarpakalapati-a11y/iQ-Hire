from flask import Flask, render_template, request, redirect, url_for, send_from_directory, session, flash
import pyodbc
import os
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'
app.config['UPLOAD_FOLDER'] = os.path.join('static', 'uploads')

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])


# ---------------------------
# Database connection
# ---------------------------
def get_db_connection():
    try:
        conn = MySQLdb.connect(
            host="Sanjeevkumar616.mysql.pythonanywhere-services.com",  # PythonAnywhere MySQL host
            user="Sanjeevkumar616",                                    # your PythonAnywhere username
            passwd="Sanjeev@123",                               # your MySQL password
            db="Sanjeevkumar616$iq_hire_test",                         # your database name
            charset='utf8mb4'
        )
        return conn
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        return None

# ---------------------------
# Serve uploaded files
# ---------------------------
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


# ---------------------------
# Index route
# ---------------------------
@app.route('/')
def home():
    return render_template('Landingpage.html')  # Login page


# ---------------------------



    
    
# Login route
# ---------------------------
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        # Show login page
        return render_template('iQ_Hire_login_test.html')

    # POST: validate login
    username = request.form['username']
    password = request.form['password']

    conn = get_db_connection()
    if not conn:
        flash("Database connection error", "error")
        return redirect(url_for('home'))

    cursor = conn.cursor()
    query = """
        SELECT id, username, password, role 
        FROM Users 
        WHERE username = ?
    """
    cursor.execute(query, (username,))
    user = cursor.fetchone()

    if user and password == user.password:   # ⚠️ plain text for now
        session['user_id'] = user.id
        session['username'] = user.username
        session['role'] = user.role

        update_query = "UPDATE Users SET last_login = ? WHERE id = ?"
        cursor.execute(update_query, (datetime.now(), user.id))
        conn.commit()

        flash("✅ Login successful!", "success")
        
        # for now → always go to one dashboard
        return redirect(url_for('dashboard'))

        # later:
        # if user.role == "admin":
        #     return redirect(url_for('admin_dashboard'))
        # elif user.role == "recruiter":
        #     return redirect(url_for('recruiter_dashboard'))
        # else:
        #     return redirect(url_for('employee_dashboard'))
    else:
        flash("❌ Invalid username or password", "error")
        return redirect(url_for('login'))


# ---------------------------
# Dashboard (simple for now)
# ---------------------------
@app.route('/dashboard')
def dashboard():
    if 'user_id' not in session:
        flash("Please log in first", "warning")
        return redirect(url_for('home'))

    return render_template('Dashboard.html', username=session['username'], role=session['role'])

    
    
@app.route('/jobs')
def jobs():
    return render_template('jobs.html')
    
@app.route('/interviews')
def interviews():
    return render_template('interviews.html')
    
    
@app.route('/analytics')
def analytics():
    return render_template('analytics.html')
    

    
    
@app.route('/candidates')
def candidates():
    return render_template('candidates.html')



# ---------------------------
# Logout
# ---------------------------
@app.route('/logout')
def logout():
    session.clear()
    flash("You have been logged out", "info")
    return redirect(url_for('home'))


# ---------------------------
# Run server
# ---------------------------
if __name__ == '__main__':
    app.run(debug=True)
