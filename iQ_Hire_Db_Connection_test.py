import pyodbc

def get_db_connection():
    try:
        conn = pyodbc.connect(
            'DRIVER={ODBC Driver 17 for SQL Server};'
            'SERVER=DESKTOP-BIPREQM\\SQLEXPRESS;'
            'DATABASE=iQ_Hire_test;'
            'Trusted_Connection=yes;'
            
        )
        return conn
    except Exception as e:
        print(f"Database connection failed: {e}")
        return None