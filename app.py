from flask import Flask, request, jsonify, render_template
import joblib
import pandas as pd
import sqlite3
from datetime import datetime

app = Flask(__name__)

model = joblib.load("model.pkl")

FEATURES = [
    "tenure",
    "MonthlyCharges",
    "TotalCharges",
    "TechSupport_Yes",
    "Contract_OneYear",
    "Contract_TwoYear",
    "InternetService_Fiber",
    "Payment_Electronic",
    "Payment_CreditCard"
]

# ================= DATABASE =================

def init_db():
    conn = sqlite3.connect("predictions.db")
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS predictions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tenure REAL,
        monthly REAL,
        total REAL,
        probability REAL,
        result INTEGER,
        created_at TEXT
    )
    """)

    conn.commit()
    conn.close()

init_db()

# ================= ROUTES =================

@app.route("/")
def login():
    return render_template("login.html")

@app.route("/home")
def home():
    return render_template("home.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/predict-page")
def predict_page():
    return render_template("pridict.html")

@app.route("/result")
def result():
    return render_template("result.html")

@app.route("/support")
def support():
    return render_template("support.html")

# ================= HISTORY API =================

@app.route("/history")
def history():

    conn = sqlite3.connect("predictions.db")
    cursor = conn.cursor()

    cursor.execute("SELECT tenure, monthly, total, probability, result, created_at FROM predictions ORDER BY id DESC LIMIT 10")

    rows = cursor.fetchall()

    conn.close()

    history_data = []

    for r in rows:
        history_data.append({
            "tenure": r[0],
            "monthly": r[1],
            "total": r[2],
            "probability": r[3],
            "result": r[4],
            "time": r[5]
        })

    return jsonify(history_data)

# ================= PREDICT =================

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    contract = data["contract"]
    payment = data["payment"]

    input_data = {
        "tenure": float(data["tenure"]),
        "MonthlyCharges": float(data["monthlyCharges"]),
        "TotalCharges": float(data["totalCharges"]),
        "TechSupport_Yes": int(data["techSupport"]),
        "Contract_OneYear": 1 if contract == "one" else 0,
        "Contract_TwoYear": 1 if contract == "two" else 0,
        "InternetService_Fiber": int(data["fiberInternet"]),
        "Payment_Electronic": 1 if payment == "electronic" else 0,
        "Payment_CreditCard": 1 if payment == "credit" else 0
    }

    df = pd.DataFrame([input_data], columns=FEATURES)

    probability = model.predict_proba(df)[0][1]
    result = 1 if probability >= 0.5 else 0

    prob_percent = round(float(probability) * 100, 2)

    # SAVE TO DATABASE

    conn = sqlite3.connect("predictions.db")
    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO predictions
    (tenure, monthly, total, probability, result, created_at)
    VALUES (?,?,?,?,?,?)
    """,(
        data["tenure"],
        data["monthlyCharges"],
        data["totalCharges"],
        prob_percent,
        result,
        datetime.now().strftime("%Y-%m-%d %H:%M")
    ))

    conn.commit()
    conn.close()

    return jsonify({
        "probability": prob_percent,
        "prediction": result
    })

@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")



if __name__ == "__main__":
    app.run(debug=True)