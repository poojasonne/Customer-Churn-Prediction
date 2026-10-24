import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score, classification_report

# ==============================
# 1. Load Dataset
# ==============================

data = pd.read_csv("../data/cleaned2.csv")

features = [
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

# Remove missing values
data = data.dropna(subset=["Churn"])
data = data.dropna(subset=features)

X = data[features]
y = data["Churn"]

# ==============================
# 2. Train-Test Split
# ==============================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# ==============================
# 3. Create ML Pipeline
# ==============================

pipeline = Pipeline([
    ("scaler", StandardScaler()),
    ("model", RandomForestClassifier(
        n_estimators=200,
        random_state=42
    ))
])

# ==============================
# 4. Train Model
# ==============================

pipeline.fit(X_train, y_train)

# ==============================
# 5. Evaluate Model
# ==============================

y_pred = pipeline.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

print("\nModel Accuracy:", round(accuracy * 100, 2), "%\n")
print("Classification Report:\n")
print(classification_report(y_test, y_pred))

# ==============================
# 6. Save Model
# ==============================

joblib.dump(pipeline, "../model.pkl")

print("Model saved successfully as model.pkl")
