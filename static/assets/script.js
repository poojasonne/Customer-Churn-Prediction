// StayWise - Modern Interactive Client-Side Logic

document.addEventListener("DOMContentLoaded", function () {
    console.log("StayWise v2.0 UI Engine loaded");
});

/* ============================================================ */
/* 1. AUTHENTICATION & LOGIN HELPERS                            */
/* ============================================================ */

function loginUser(e) {
    if (e) e.preventDefault();

    const emailEl = document.getElementById("loginEmail");
    const passEl = document.getElementById("loginPassword");
    const feedbackEl = document.getElementById("loginFeedback");

    if (!emailEl || !passEl) return false;

    const email = emailEl.value.trim();
    const password = passEl.value.trim();

    if (email === "" || password === "") {
        showFeedback(feedbackEl, "Please provide email and password", "error");
        return false;
    }

    // Support standard demo credentials or any valid test email
    if ((email === "admin@staywise.com" && password === "123456") || email.includes("@")) {
        showFeedback(feedbackEl, "Authentication successful! Redirecting...", "success");
        sessionStorage.setItem("staywise_user", email);
        setTimeout(() => {
            window.location.href = "/home";
        }, 600);
    } else {
        showFeedback(feedbackEl, "Invalid credentials. Use demo: admin@staywise.com / 123456", "error");
    }

    return false;
}

function quickFillDemo() {
    const emailEl = document.getElementById("loginEmail");
    const passEl = document.getElementById("loginPassword");
    if (emailEl) emailEl.value = "admin@staywise.com";
    if (passEl) passEl.value = "123456";
}

function instantGuestLogin() {
    sessionStorage.setItem("staywise_user", "guest@staywise.com");
    window.location.href = "/home";
}

function togglePasswordVisibility() {
    const passEl = document.getElementById("loginPassword");
    if (!passEl) return;
    passEl.type = passEl.type === "password" ? "text" : "password";
}

function showFeedback(el, msg, type) {
    if (!el) return;
    el.innerHTML = `<div class="toast-msg ${type}">${msg}</div>`;
}

function logoutUser() {
    sessionStorage.removeItem("staywise_user");
    window.location.href = "/";
}

/* ============================================================ */
/* 2. INTERACTIVE HOME SIMULATOR                                */
/* ============================================================ */

function updateInteractiveSimulator() {
    const slider = document.getElementById("demoTenureSlider");
    if (!slider) return;

    const tenure = parseInt(slider.value, 10);
    const tenureVal = document.getElementById("demoTenureVal");
    const monthlyVal = document.getElementById("demoMonthlyVal");
    const scoreVal = document.getElementById("demoRiskScore");
    const fillEl = document.getElementById("demoProgressFill");
    const badgeEl = document.getElementById("demoRiskBadge");
    const contractEl = document.getElementById("demoContractLabel");
    const actionEl = document.getElementById("demoActionLabel");

    if (tenureVal) tenureVal.innerText = `${tenure} Months`;

    // Estimate probability formula for demo widget
    let monthly = tenure < 12 ? 95 : (tenure < 36 ? 75 : 55);
    if (monthlyVal) monthlyVal.innerText = `$${monthly}/mo`;

    // Risk calculation simulation
    let baseRisk = 88 - (tenure * 1.15);
    if (baseRisk < 12) baseRisk = 12;
    if (baseRisk > 94) baseRisk = 94;
    const risk = baseRisk.toFixed(1);

    if (scoreVal) scoreVal.innerText = `${risk}%`;
    if (fillEl) fillEl.style.width = `${risk}%`;

    if (risk >= 50) {
        if (badgeEl) {
            badgeEl.className = "pill-status churn";
            badgeEl.innerText = "High Risk Alert";
        }
        if (scoreVal) scoreVal.style.color = "#fb7185";
        if (contractEl) contractEl.innerText = tenure < 12 ? "Month-to-Month" : "1-Year Expiring";
        if (actionEl) actionEl.innerText = "Offer Annual Plan";
    } else {
        if (badgeEl) {
            badgeEl.className = "pill-status stay";
            badgeEl.innerText = "Loyal Customer";
        }
        if (scoreVal) scoreVal.style.color = "#34d399";
        if (contractEl) contractEl.innerText = "Two-Year Active";
        if (actionEl) actionEl.innerText = "Account Healthy";
    }
}

/* ============================================================ */
/* 3. PREDICTION FORM HELPERS & PRESETS                         */
/* ============================================================ */

function fillScenario(type) {
    const tenureEl = document.getElementById("tenure");
    const monthlyEl = document.getElementById("monthlyCharges");
    const totalEl = document.getElementById("totalCharges");
    const techEl = document.getElementById("techSupport");
    const contractEl = document.getElementById("contractType");
    const fiberEl = document.getElementById("fiberInternet");
    const paymentEl = document.getElementById("paymentMethod");

    if (type === "high") {
        if (tenureEl) tenureEl.value = 2;
        if (monthlyEl) monthlyEl.value = 94.85;
        if (totalEl) totalEl.value = 189.70;
        if (techEl) techEl.value = "0";
        if (contractEl) contractEl.value = "month";
        if (fiberEl) fiberEl.value = "1";
        if (paymentEl) paymentEl.value = "electronic";
    } else if (type === "stable") {
        if (tenureEl) tenureEl.value = 58;
        if (monthlyEl) monthlyEl.value = 45.20;
        if (totalEl) totalEl.value = 2621.60;
        if (techEl) techEl.value = "1";
        if (contractEl) contractEl.value = "two";
        if (fiberEl) fiberEl.value = "0";
        if (paymentEl) paymentEl.value = "credit";
    } else if (type === "medium") {
        if (tenureEl) tenureEl.value = 14;
        if (monthlyEl) monthlyEl.value = 72.50;
        if (totalEl) totalEl.value = 1015.00;
        if (techEl) techEl.value = "1";
        if (contractEl) contractEl.value = "one";
        if (fiberEl) fiberEl.value = "1";
        if (paymentEl) paymentEl.value = "electronic";
    }
}

function autoCalculateTotal(force = false) {
    const tenureEl = document.getElementById("tenure");
    const monthlyEl = document.getElementById("monthlyCharges");
    const totalEl = document.getElementById("totalCharges");

    if (!tenureEl || !monthlyEl || !totalEl) return;

    const t = parseFloat(tenureEl.value);
    const m = parseFloat(monthlyEl.value);

    if (!isNaN(t) && !isNaN(m) && t > 0 && m > 0) {
        if (force || totalEl.value === "" || parseFloat(totalEl.value) <= 0) {
            totalEl.value = (t * m).toFixed(2);
        }
    }
}

function clearForm() {
    const form = document.querySelector("form");
    if (form) form.reset();
}

async function handlePrediction(e) {
    e.preventDefault();

    const btn = document.getElementById("predictBtn");
    const btnText = document.getElementById("btnText");

    if (btn) btn.disabled = true;
    if (btnText) btnText.innerText = "Analyzing Customer Risk...";

    const payload = {
        tenure: document.getElementById("tenure").value,
        monthlyCharges: document.getElementById("monthlyCharges").value,
        totalCharges: document.getElementById("totalCharges").value,
        techSupport: document.getElementById("techSupport").value,
        contract: document.getElementById("contractType").value,
        fiberInternet: document.getElementById("fiberInternet").value,
        payment: document.getElementById("paymentMethod").value
    };

    try {
        const response = await fetch("/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Server returned status ${response.status}`);
        }

        const result = await response.json();

        // Store comprehensive prediction context for result page
        sessionStorage.setItem("lastPrediction", JSON.stringify({
            probability: result.probability,
            prediction: result.prediction,
            risk_tier: result.risk_tier,
            factors: result.factors || [],
            recommendations: result.recommendations || [],
            input: payload
        }));
        sessionStorage.setItem("predictionScore", (result.probability / 100).toString());

        window.location.href = "/result";
    } catch (err) {
        alert("Failed to calculate prediction: " + err.message);
        if (btn) btn.disabled = false;
        if (btnText) btnText.innerText = "Calculate Churn Probability";
    }

    return false;
}

/* ============================================================ */
/* 4. RESULT PAGE VISUALIZATION & WHAT-IF SIMULATOR             */
/* ============================================================ */

let activeResultChart = null;
let currentProbability = 75.0;
let originalProbability = 75.0;

function initResultPage() {
    let predData = null;
    try {
        const stored = sessionStorage.getItem("lastPrediction");
        if (stored) {
            predData = JSON.parse(stored);
        }
    } catch (e) {
        console.warn("Could not parse stored prediction", e);
    }

    // Default fallback demo data if visited directly
    if (!predData) {
        predData = {
            probability: 76.4,
            prediction: 1,
            risk_tier: "High",
            factors: [
                "Month-to-month contract (+30% risk factor)",
                "Short tenure of 3 months increases vulnerability",
                "Electronic check payment method without autopay discount",
                "High monthly charges with no active Tech Support subscription"
            ],
            recommendations: [
                "Offer a 12-Month Contract with a 15% promotional discount.",
                "Provide a complimentary 3-month Tech Support onboarding package.",
                "Incentivize automated payment methods with a $5 monthly bill credit."
            ],
            input: {
                tenure: 3,
                monthlyCharges: 89.5,
                totalCharges: 268.5,
                contract: "month",
                techSupport: "0"
            }
        };
    }

    currentProbability = parseFloat(predData.probability) || 50.0;
    originalProbability = currentProbability;

    // Update Text Elements
    const centerEl = document.getElementById("centerProbability");
    const titleEl = document.getElementById("resultTitle");
    const descEl = document.getElementById("resultDescription");
    const badgeContainer = document.getElementById("riskBadgeContainer");
    const tenureEl = document.getElementById("summaryTenure");
    const monthlyEl = document.getElementById("summaryMonthly");

    if (centerEl) centerEl.innerText = `${currentProbability.toFixed(1)}%`;
    if (tenureEl && predData.input) tenureEl.innerText = `${predData.input.tenure} Months`;
    if (monthlyEl && predData.input) monthlyEl.innerText = `$${parseFloat(predData.input.monthlyCharges).toFixed(2)}`;

    renderRiskBadges(currentProbability);

    // Factors list
    const factorsList = document.getElementById("factorsList");
    if (factorsList) {
        const factors = predData.factors && predData.factors.length > 0 ? predData.factors : [
            "Month-to-month commitment provides no exit friction",
            "High spend ratio relative to customer lifetime",
            "Lack of dedicated technical support touchpoints"
        ];
        factorsList.innerHTML = factors.map(f => `
            <div style="background:rgba(255,255,255,0.03);border:1px solid var(--border-subtle);border-radius:12px;padding:14px;font-size:13.5px;color:var(--text-secondary);display:flex;align-items:flex-start;gap:10px;">
                <span style="color:#fb7185;font-weight:bold;">&bull;</span>
                <span>${f}</span>
            </div>
        `).join("");
    }

    // Recommendations list
    const recList = document.getElementById("recommendationsList");
    if (recList) {
        const recs = predData.recommendations && predData.recommendations.length > 0 ? predData.recommendations : [
            "Proactively engage customer via account manager check-in call.",
            "Offer 1-year contract migration with exclusive loyalty perks.",
            "Provide free technical support for upcoming 6 billing cycles."
        ];
        recList.innerHTML = recs.map(r => `
            <div class="rec-item">
                <span class="rec-bullet">&check;</span>
                <span>${r}</span>
            </div>
        `).join("");
    }

    // Render Doughnut Chart
    renderGaugeChart(currentProbability);
}

function renderRiskBadges(prob) {
    const badgeContainer = document.getElementById("riskBadgeContainer");
    const titleEl = document.getElementById("resultTitle");
    const descEl = document.getElementById("resultDescription");

    if (prob >= 50) {
        if (badgeContainer) {
            badgeContainer.innerHTML = `<span class="risk-badge critical">&excl; Critical Churn Risk (${prob.toFixed(1)}%)</span>`;
        }
        if (titleEl) titleEl.innerText = "High Probability of Customer Attrition";
        if (descEl) descEl.innerText = "This subscriber shows strong behavioral markers indicating likely churn within the next 30-60 days. Immediate retention countermeasures are recommended.";
    } else {
        if (badgeContainer) {
            badgeContainer.innerHTML = `<span class="risk-badge stable">&check; Healthy Account Stability (${(100 - prob).toFixed(1)}% Retained)</span>`;
        }
        if (titleEl) titleEl.innerText = "Low Churn Risk – Subscriber Stable";
        if (descEl) descEl.innerText = "Customer metrics indicate a resilient relationship with high retention probability. Standard customer success engagement is recommended.";
    }
}

function renderGaugeChart(prob) {
    const ctx = document.getElementById("gaugeChart");
    if (!ctx) return;

    const remain = Math.max(0, 100 - prob);
    const churnColor = prob >= 50 ? "#f43f5e" : "#fb7185";
    const stayColor = "#10b981";

    if (activeResultChart) {
        activeResultChart.destroy();
    }

    activeResultChart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Churn Risk", "Retention"],
            datasets: [{
                data: [prob, remain],
                backgroundColor: [churnColor, stayColor],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            cutout: "75%",
            responsive: true,
            maintainAspectRatio: true,
            animation: {
                animateRotate: true,
                duration: 1200
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return ` ${context.label}: ${context.raw.toFixed(1)}%`;
                        }
                    }
                }
            }
        }
    });
}

function simulateCountermeasure(type) {
    let delta = 0;
    let label = "";

    if (type === "contract") {
        delta = -32;
        label = "1-Year Contract migration applied (-32% risk)";
    } else if (type === "techsupport") {
        delta = -18;
        label = "Complimentary Tech Support enabled (-18% risk)";
    } else if (type === "autopay") {
        delta = -12;
        label = "Autopay & Paperless billing discount activated (-12% risk)";
    }

    currentProbability = Math.max(8.0, currentProbability + delta);

    const centerEl = document.getElementById("centerProbability");
    if (centerEl) centerEl.innerText = `${currentProbability.toFixed(1)}%`;

    renderRiskBadges(currentProbability);
    renderGaugeChart(currentProbability);

    const simFeedback = document.getElementById("simFeedback");
    if (simFeedback) {
        simFeedback.style.display = "block";
        simFeedback.innerHTML = `<span style="color:#34d399;font-weight:600;">&check; Countermeasure Applied:</span> ${label}. New Churn Risk: <strong>${currentProbability.toFixed(1)}%</strong>`;
    }
}

function resetCountermeasure() {
    currentProbability = originalProbability;
    const centerEl = document.getElementById("centerProbability");
    if (centerEl) centerEl.innerText = `${currentProbability.toFixed(1)}%`;

    renderRiskBadges(currentProbability);
    renderGaugeChart(currentProbability);

    const simFeedback = document.getElementById("simFeedback");
    if (simFeedback) {
        simFeedback.style.display = "none";
    }
}

/* ============================================================ */
/* 5. ANALYTICS DASHBOARD ENGINE                                */
/* ============================================================ */

let ratioChartInstance = null;
let tierChartInstance = null;
let cachedHistoryData = [];

async function loadAnalytics() {
    try {
        const res = await fetch("/api/analytics");
        if (!res.ok) throw new Error("Could not fetch analytics data");
        const data = await res.json();

        // Update KPIs
        const total = data.total_predictions || 0;
        const churnCount = data.churn_count || 0;
        const stayCount = data.retained_count || 0;
        const churnRate = data.churn_rate || 0;
        const stayRate = total > 0 ? (100 - churnRate).toFixed(1) : 0;
        const avgMonthly = data.avg_monthly || 0;
        const avgTenure = data.avg_tenure || 0;

        document.getElementById("statTotal").innerText = total;
        document.getElementById("statChurnRate").innerText = `${churnRate}%`;
        document.getElementById("statChurnCount").innerText = churnCount;
        document.getElementById("statStayRate").innerText = `${stayRate}%`;
        document.getElementById("statStayCount").innerText = stayCount;
        document.getElementById("statAvgMonthly").innerText = `$${avgMonthly}`;
        document.getElementById("statAvgTenure").innerText = avgTenure;

        // Render Ratio Chart
        const ratioCtx = document.getElementById("ratioChart");
        if (ratioCtx) {
            if (ratioChartInstance) ratioChartInstance.destroy();
            ratioChartInstance = new Chart(ratioCtx, {
                type: "doughnut",
                data: {
                    labels: ["Churn Risk", "Retained Stable"],
                    datasets: [{
                        data: [churnCount || 1, stayCount || 1],
                        backgroundColor: ["#f43f5e", "#10b981"],
                        borderWidth: 0
                    }]
                },
                options: {
                    cutout: "68%",
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            labels: { color: "#94a3b8", font: { family: "Plus Jakarta Sans" } }
                        }
                    }
                }
            });
        }

        // Render Risk Tiers Chart
        const tierCtx = document.getElementById("tierChart");
        if (tierCtx) {
            if (tierChartInstance) tierChartInstance.destroy();

            const lowRisk = data.risk_tiers ? data.risk_tiers.low : Math.round(stayCount * 0.7);
            const medRisk = data.risk_tiers ? data.risk_tiers.medium : Math.round(total * 0.2);
            const highRisk = data.risk_tiers ? data.risk_tiers.high : churnCount;

            tierChartInstance = new Chart(tierCtx, {
                type: "bar",
                data: {
                    labels: ["Low Risk (<35%)", "Moderate (35-65%)", "Critical (>65%)"],
                    datasets: [{
                        label: "Accounts",
                        data: [lowRisk, medRisk, highRisk],
                        backgroundColor: ["#10b981", "#f59e0b", "#f43f5e"],
                        borderRadius: 8
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { ticks: { color: "#94a3b8" }, grid: { display: false } },
                        y: { ticks: { color: "#94a3b8" }, grid: { color: "rgba(255,255,255,0.06)" } }
                    }
                }
            });
        }

        // Render History Table
        cachedHistoryData = data.recent_history || [];
        renderHistoryTableRows(cachedHistoryData);

    } catch (err) {
        console.error("Dashboard error:", err);
    }
}

function renderHistoryTableRows(rows) {
    const tbody = document.getElementById("historyTableBody");
    if (!tbody) return;

    if (!rows || rows.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center;padding:28px;color:var(--text-muted);">
                    No prediction records found. Run a prediction to see audited logs.
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = rows.map(r => {
        const isChurn = r.result === 1;
        const statusPill = isChurn
            ? `<span class="pill-status churn">Likely Churn</span>`
            : `<span class="pill-status stay">Retained</span>`;
        return `
            <tr>
                <td>${r.time || "Recent"}</td>
                <td><strong>${r.tenure}</strong> mos</td>
                <td>$${parseFloat(r.monthly).toFixed(2)}</td>
                <td>$${parseFloat(r.total).toFixed(2)}</td>
                <td>
                    <div style="display:flex;align-items:center;gap:8px;">
                        <span style="font-weight:700;color:${isChurn ? '#fb7185' : '#34d399'};">${parseFloat(r.probability).toFixed(1)}%</span>
                    </div>
                </td>
                <td>${statusPill}</td>
            </tr>
        `;
    }).join("");
}

function filterHistoryTable() {
    const query = document.getElementById("tableSearchInput").value.toLowerCase();
    if (!cachedHistoryData) return;
    const filtered = cachedHistoryData.filter(r => {
        return (
            (r.tenure && r.tenure.toString().includes(query)) ||
            (r.monthly && r.monthly.toString().includes(query)) ||
            (r.probability && r.probability.toString().includes(query)) ||
            (r.time && r.time.toLowerCase().includes(query))
        );
    });
    renderHistoryTableRows(filtered);
}

async function clearDbHistory() {
    if (!confirm("Are you sure you want to clear all prediction history logs from the database?")) {
        return;
    }

    try {
        const res = await fetch("/api/clear-history", { method: "POST" });
        if (res.ok) {
            loadAnalytics();
        } else {
            alert("Could not clear database.");
        }
    } catch (e) {
        alert("Error: " + e.message);
    }
}

/* ============================================================ */
/* 6. SUPPORT & FAQ ACCORDION                                   */
/* ============================================================ */

function submitSupport(e) {
    e.preventDefault();

    const nameEl = document.getElementById("name");
    const emailEl = document.getElementById("email");
    const subjectEl = document.getElementById("subject");
    const messageEl = document.getElementById("message");
    const msgContainer = document.getElementById("supportMsg");

    if (!nameEl || !emailEl || !subjectEl || !messageEl) return false;

    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const subject = subjectEl.value.trim();
    const message = messageEl.value.trim();

    if (name === "" || email === "" || subject === "" || message === "") {
        if (msgContainer) {
            msgContainer.innerHTML = `<div class="toast-msg error">Please fill in all required fields.</div>`;
        }
        return false;
    }

    const ticketId = "SW-" + Math.floor(10000 + Math.random() * 90000);

    if (msgContainer) {
        msgContainer.innerHTML = `
            <div class="toast-msg success" style="flex-direction:column;align-items:flex-start;">
                <div style="font-weight:700;font-size:15px;margin-bottom:4px;">
                    &check; Ticket #${ticketId} created successfully!
                </div>
                <div style="font-size:13px;opacity:0.9;">
                    Thank you, <strong>${name}</strong>. Our retention engineering team will reply to <strong>${email}</strong> within 2 hours.
                </div>
            </div>
        `;
    }

    document.querySelector("form").reset();
    return false;
}

function toggleFaq(card) {
    const body = card.querySelector(".faq-body");
    const icon = card.querySelector(".faq-icon");
    if (!body) return;

    if (body.style.display === "none" || body.style.display === "") {
        body.style.display = "block";
        if (icon) icon.innerText = "−";
    } else {
        body.style.display = "none";
        if (icon) icon.innerText = "+";
    }
}
