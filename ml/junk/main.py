import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

data = pd.read_csv("C:/Users/Admin/Dktop/CODE/PROJECTS/COLLAGEPROJECT/machinelearning/cleaned2.csv")

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

data = data.dropna(subset=["Churn"])
data = data.dropna(subset=features)

X = data[features]
y = data["Churn"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier()
model.fit(X_train, y_train)

while True:
    try:
        print("\nEnter customer details")

        months = int(input("How many months customer is using service: "))
        monthly_bill = float(input("Monthly bill amount: "))
        total_bill = float(input("Total amount paid till now: "))

        tech = input("Does customer have tech support (yes/no): ").lower()
        contract = input("Contract type (month / one year / two year): ").lower()
        fiber = input("Using fiber internet (yes/no): ").lower()
        payment = input("Payment method (electronic / credit): ").lower()

        if tech not in ["yes", "no"]:
            raise ValueError("Invalid tech support input")

        if contract not in ["month", "one year", "two year"]:
            raise ValueError("Invalid contract type")

        if fiber not in ["yes", "no"]:
            raise ValueError("Invalid internet service input")

        if payment not in ["electronic", "credit", "cash"]:
            raise ValueError("Invalid payment method")

        TechSupport_Yes = 1 if tech == "yes" else 0
        InternetService_Fiber = 1 if fiber == "yes" else 0

        Contract_OneYear = 1 if contract == "one year" else 0
        Contract_TwoYear = 1 if contract == "two year" else 0

        Payment_Electronic = 1 if payment == "electronic" else 0
        Payment_CreditCard = 1 if payment == "credit" else 0

        user_data = pd.DataFrame([{
            "tenure": months,
            "MonthlyCharges": monthly_bill,
            "TotalCharges": total_bill,
            "TechSupport_Yes": TechSupport_Yes,
            "Contract_OneYear": Contract_OneYear,
            "Contract_TwoYear": Contract_TwoYear,
            "InternetService_Fiber": InternetService_Fiber,
            "Payment_Electronic": Payment_Electronic,
            "Payment_CreditCard": Payment_CreditCard
        }])

        probability = model.predict_proba(user_data)[0][1]
        prediction = 1 if probability >= 0.5 else 0

        print("Churn probability:", round(probability * 100, 2), "%")

        if prediction == 1:
            print("Result: Customer WILL churn")
            print("Actions:")
            print("1. Give 20% discount on next bill")
            print("2. Make personal support call")
            print("3. Offer long-term contract plan")
        else:
            print("Result: Customer will NOT churn")
            print("Customer is stable. Normal engagement is enough.")

    except:
        print("\nInvalid input detected.")
        print("Please enter data in correct format.")
        retry = input("Do you want to try again? (yes/no): ").lower()
        if retry != "yes":
            break
        continue

    again = input("\nCheck another customer? (yes/no): ").lower()
    if again != "yes":
        break
