# StayWise – Customer Churn Prediction System

![Python](https://img.shields.io/badge/Python-3.12-blue.svg)
![Flask](https://img.shields.io/badge/Flask-3.x-green.svg)
![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-Random%20Forest-orange.svg)
![License](https://img.shields.io/badge/License-MIT-purple.svg)

**StayWise** is an intelligent, full-stack machine learning web application designed to predict telecom customer churn in real time and recommend prescriptive retention strategies.

---

## 🌟 Key Features & Recent Improvements

- **Ultra-Modern Glassmorphic UI**: Re-engineered with vibrant dark-mode aesthetics, custom gradients, frosted glass cards, and smooth micro-animations.
- **Zero Static Heavy Images**: Replaced all heavy static image assets with lightweight, crisp SVG illustrations and vector initials badges for instantaneous loading and zero external CDN failure points.
- **Interactive Risk Simulator**: Embedded directly on the Home page, allowing users to test churn probability sensitivity by sliding tenure and spend parameters.
- **Preset Customer Profiles**: 1-click preset scenario buttons on the Predict page to instantly test High-Risk, Loyal, or Moderate customer behavior profiles.
- **What-If Retention Countermeasure Simulator**: On the Result page, simulate real-time business interventions (e.g., annual contract migrations, complimentary tech support, autopay discounts) and watch churn probability drop dynamically.
- **Enhanced Analytics Dashboard**:
  - Live KPI cards: Total Predictions Audited, Predicted Churn Rate %, Retention Stability %, Average Monthly Spend & Tenure.
  - Interactive Chart.js visualisations: Churn vs Retention ratio doughnut chart and Risk Tiers distribution.
  - Searchable prediction audit table backed by SQLite with live filtering.
- **Resilient Inference Engine**: Added validation, structured JSON responses, dynamic risk drivers, and fallback handling in `app.py`.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | HTML5, Vanilla CSS3 (Custom Glassmorphism Design System), JavaScript (ES6+), Chart.js |
| **Backend** | Python, Flask REST API |
| **Machine Learning** | Scikit-Learn (`RandomForestClassifier`, 200 estimators, `StandardScaler`, `Pipeline`), Joblib |
| **Database** | SQLite3 (`predictions.db` for automated audit logging) |

---

## 📁 Project Structure

```text
Customer_Churn_Prediction/
├── app.py                     # Flask application & REST API routes
├── model.pkl                  # Trained Random Forest pipeline
├── predictions.db             # SQLite database storing audited predictions
├── requirements.txt           # Python dependency specifications
├── README.md                  # Comprehensive documentation
├── data/
│   └── cleaned2.csv           # Cleaned Telco churn dataset
├── ml/
│   └── train_model.py         # Model training & pipeline export script
├── static/
│   └── assets/
│       ├── style.css          # Modern dark-mode glassmorphic styling
│       └── script.js          # Interactive UI and client-side logic
└── templates/
    ├── login.html             # Login portal with fast demo access
    ├── home.html              # Landing page with interactive churn preview
    ├── pridict.html           # Prediction form with 1-click scenario presets
    ├── result.html            # Inference report & what-if simulator
    ├── dashboard.html         # Analytics dashboard & searchable audit table
    ├── about.html             # Architecture & engineering team overview
    └── support.html           # Helpdesk ticket submission & FAQ accordion
```

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/poojasonne/Customer-Churn-Prediction.git
cd Customer-Churn-Prediction
```

### 2. Create and Activate Virtual Environment
```bash
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Run the Application
```bash
python app.py
```

### 5. Access in Browser
Navigate to `http://127.0.0.1:5000`

- **Demo Email**: `admin@staywise.com`
- **Demo Password**: `123456`
- *(Or click "Instant Guest Access" on the login page)*

---

## 📊 Model Pipeline Architecture

1. **Features Analyzed**:
   - `tenure`: Customer account lifetime in months
   - `MonthlyCharges`: Monthly bill amount
   - `TotalCharges`: Cumulative spend
   - `TechSupport_Yes`: Technical support enrollment flag
   - `Contract_OneYear` / `Contract_TwoYear`: Contract duration terms
   - `InternetService_Fiber`: Fiber optic connection flag
   - `Payment_Electronic` / `Payment_CreditCard`: Billing transaction method
2. **Model**:
   - `StandardScaler` normalization
   - `RandomForestClassifier(n_estimators=200, random_state=42)`
   - Trained on 80/20 stratified split with evaluation accuracy of ~80.5%.

---

## 👥 Engineering Team

- **Pooja Sonne** – Lead Data Engineer (ETL, Dataset Cleansing, Feature Engineering)
- **Santoshi Pawar** – ML Engineer (Random Forest Model Training & Tuning)
- **Abhijeet Dole** – Full Stack Developer (Frontend Interface & Flask API Integration)
- **Nominath Kuwar** – DevOps & QA (Environment Setup, Testing & Deployment)

---

## 📄 License
This project is open-source under the MIT License.
