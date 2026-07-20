from app.database import get_connection

conn = get_connection()
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS test_runs (

    run_id INTEGER PRIMARY KEY AUTOINCREMENT,

    created_at DATETIME DEFAULT (datetime('now', '+5 hours', '+30 minutes'))

    api_url TEXT NOT NULL,

    method TEXT NOT NULL,

    headers TEXT,

    request_body TEXT,

    generated_tests TEXT,

    test_results TEXT,

    total_tests INTEGER,

    passed INTEGER,

    failed INTEGER,

    average_latency REAL,

    ai_summary TEXT,

    pdf_path TEXT

)
""")

conn.commit()
conn.close()

print("Database initialized successfully.")