import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./Budget.css";

function Budget() {
  const totalBudget = 25000;

  const [expenses, setExpenses] = useState({
    accommodation: 8000,
    food: 4500,
    transport: 5000,
    activities: 3500,
    shopping: 2000,
    other: 500,
  });

  const expenseItems = [
  {
    key: "accommodation",
    name: "Accommodation",
    icon: "🏨",
    description: "Hotels and stays",
    color: "#0b3d82",
  },
  {
    key: "food",
    name: "Food & Dining",
    icon: "🍽️",
    description: "Meals and restaurants",
    color: "#0b3d82",
  },
  {
    key: "transport",
    name: "Transport",
    icon: "🚗",
    description: "Flights, trains and local travel",
    color: "#0b3d82",
  },
  {
    key: "activities",
    name: "Activities",
    icon: "🎯",
    description: "Tours and experiences",
    color: "#0b3d82",
  },
  {
    key: "shopping",
    name: "Shopping",
    icon: "🛍️",
    description: "Souvenirs and personal shopping",
    color: "#0b3d82",
  },
  {
    key: "other",
    name: "Other",
    icon: "📦",
    description: "Other travel expenses",
    color: "#0b3d82",
  },
];

  // Calculate total spent dynamically
  const spent = useMemo(() => {
    return Object.values(expenses).reduce(
      (total, value) => total + Number(value || 0),
      0
    );
  }, [expenses]);

  const remaining = totalBudget - spent;
  
  // Dynamic percentage calculation
  const rawPercentage = Math.round((spent / totalBudget) * 100);

  // Update expense with 25k limit check and confirmation popup
  const updateExpense = (key, value) => {
    const numericValue = value === "" ? "" : Number(value);
    
    // Calculate what the new total spent would be if this change is applied
    const temporaryExpenses = { ...expenses, [key]: numericValue };
    const newTotalSpent = Object.values(temporaryExpenses).reduce(
      (total, val) => total + Number(val || 0),
      0
    );

    // If new total crosses 25,000, ask for confirmation
    if (newTotalSpent > totalBudget) {
      const confirmExceed = window.confirm(
        `⚠️ Warning: Your total expense (₹${newTotalSpent.toLocaleString()}) is crossing the ₹25,000 budget limit! Do you want to proceed?`
      );

      if (!confirmExceed) {
        // If user clicks Cancel, do not apply the change
        return;
      }
    }

    setExpenses(temporaryExpenses);
  };

  return (
    <div className="page">
      <Navbar />

      <main className="budget-page">
        <div className="container">

          <div className="budget-header">
            <div>
              <span className="label">TRIP FINANCES</span>
              <h1>Travel Budget</h1>
              <p>
                Track your expenses. Exceeding ₹25,000 will prompt a confirmation alert.
              </p>
            </div>

            <Link to="/itinerary" className="btn">
              🗓️ View Itinerary
            </Link>
          </div>

          <div className="budget-overview card">

            <div className="budget-overview-item">
              <span className="budget-overview-icon">💰</span>
              <div>
                <span className="label">TOTAL BUDGET</span>
                <strong>₹{totalBudget.toLocaleString()}</strong>
              </div>
            </div>

            <div className="budget-overview-item">
              <span className="budget-overview-icon">💳</span>
              <div>
                <span className="label">TOTAL SPENT</span>
                <strong style={{ color: spent > totalBudget ? "#dc2626" : "inherit" }}>
                  ₹{spent.toLocaleString()}
                </strong>
              </div>
            </div>

            <div className="budget-overview-item">
              <span className="budget-overview-icon">💵</span>
              <div>
                <span className="label">REMAINING</span>
                <strong className={remaining < 0 ? "over-budget" : ""}>
                  ₹{Math.abs(remaining).toLocaleString()} {remaining < 0 ? "over" : "left"}
                </strong>
              </div>
            </div>

          </div>

          <div className="budget-layout">

            <section className="expenses-section card">

              <div className="section-heading">
                <div>
                  <span className="label">EXPENSE BREAKDOWN</span>
                  <h2>Where your money goes</h2>
                </div>

                <span className="spent-badge" style={{ backgroundColor: rawPercentage > 100 ? "#fee2e2" : "#f1f5f9", color: rawPercentage > 100 ? "#dc2626" : "inherit" }}>
                  {rawPercentage}% used
                </span>
              </div>

              <div className="expense-list">

                {expenseItems.map((item) => (
                  <div className="expense-item" key={item.key}>

                    <div className="expense-info">
                      <span className="expense-icon">
                        {item.icon}
                      </span>

                      <div>
                        
  <h3 style={{ color: "white" }}>{item.name}</h3>
  <p style={{ color: "White" }}>{item.description}</p>
</div>
                      
                    </div>

                    <div className="expense-input-wrapper">
                      <span>₹</span>

                      <input
                        type="number"
                        min="0"
                        value={expenses[item.key]}
                        onChange={(e) =>
                          updateExpense(item.key, e.target.value)
                        }
                      />
                    </div>

                  </div>
                ))}

              </div>

              <div className="expense-total">
                <span>Total Planned Expenses</span>
                <strong style={{ color: spent > totalBudget ? "#dc2626" : "inherit" }}>
                  ₹{spent.toLocaleString()}
                </strong>
              </div>

            </section>

            <aside className="budget-sidebar">

              <div className="budget-chart-card card">

                <span className="label">BUDGET STATUS (LIVE GRAPH)</span>

                {/* LIVE DYNAMIC CIRCULAR GRAPH WITH REMAINING INDICATOR */}
                <div className="budget-circle">
                  <div
                    className="budget-circle-progress"
                    style={{
                      background: `conic-gradient(${
                        spent > totalBudget ? "#dc2626" : "#0b3d82"
                      } ${Math.min(rawPercentage, 100) * 3.6}deg, #14202d 0deg)`,
                    }}
                  >
                    <div className="budget-circle-inner">
                      <strong style={{ color: spent > totalBudget ? "#dc2626" : "inherit" }}>
                        {rawPercentage}%
                      </strong>
                      <span>{spent > totalBudget ? "Over Spent" : "Used"}</span>
                    </div>
                  </div>
                </div>

                <div className="budget-chart-text">
                  {remaining >= 0 ? (
                    <>
                      <strong>
                        ₹{remaining.toLocaleString()} remaining in budget
                      </strong>
                      <p>
                        Your expenses are safely within the ₹25,000 limit.
                      </p>
                    </>
                  ) : (
                    <>
                      <strong className="over-budget">
                        ₹{Math.abs(remaining).toLocaleString()} over budget limit!
                      </strong>
                      <p style={{ color: "#dc2626" }}>
                        You exceeded the target. Check your inputs or reduce expenses.
                      </p>
                    </>
                  )}
                </div>

                <div className="budget-legend">
                  <div>
                    <span className="legend-dot spent" style={{ backgroundColor: spent > totalBudget ? "#dc2626" : "#0b3d82" }}></span>
                    <span>Spent</span>
                    <strong style={{ color: spent > totalBudget ? "#dc2626" : "inherit" }}>
                      ₹{spent.toLocaleString()}
                    </strong>
                  </div>

                  <div>
                    <span className="legend-dot remaining" style={{ backgroundColor: "#10b981" }}></span>
                    <span>Remaining Line</span>
                    <strong style={{ color: remaining < 0 ? "#dc2626" : "#10b981" }}>
                      {remaining >= 0 ? `₹${remaining.toLocaleString()}` : "₹0 (Exceeded)"}
                    </strong>
                  </div>
                </div>

              </div>

              <div className="budget-tip">

                <div className="tip-icon">
                  💡
                </div>

                <div>
                  <span className="label">
                    SMART BUDGET TIP
                  </span>

                  <h3>
                    Keep a small emergency fund
                  </h3>

                  <p>
                    Try keeping 10% of your total budget aside for unexpected travel expenses.
                  </p>
                </div>

              </div>

            </aside>

          </div>

          <div className="budget-actions">
            <Link to="/itinerary" className="btn secondary">
              ← Back to Itinerary
            </Link>

            <button
              className="btn"
              onClick={() =>
                alert("Budget changes saved successfully!")
              }
            >
              ✓ Save Budget
            </button>
          </div>

        </div>
      </main>
      {/* --- Ye raha aapka Footer jo har page par dikhega --- */}
<footer style={{ 
  backgroundColor: "#0f172a", 
  color: "#ffffff", 
  padding: "30px 20px", 
  marginTop: "50px",
  textAlign: "center",
  borderRadius: "12px 12px 0 0"
}}>
  <h3 style={{ marginBottom: "10px", color: "#38bdf8" }}>GlobeTrotter - About Us</h3>
  <p style={{ maxWidth: "600px", margin: "0 auto 20px auto", color: "#94a3b8", fontSize: "14px", lineHeight: "1.5" }}>
    GlobeTrotter is your ultimate travel companion to plan trips, explore cities, manage budgets, and share adventures seamlessly with your loved ones.
  </p>

  <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap", fontSize: "14px" }}>
    <span>📞 Phone: +91 98765 43210</span>
    <span>💬 WhatsApp: GlobeTrotter Support</span>
    <span>📸 Instagram: @globetrotter_official</span>
  </div>

  <div style={{ marginTop: "20px", fontSize: "12px", color: "#64748b" }}>
    © 2026 GlobeTrotter. All rights reserved.
  </div>
</footer>
    </div>
  );
}

export default Budget;