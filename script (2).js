/* =========================================
   TRAVEL WEBSITE - MAIN JAVASCRIPT FILE
========================================= */

/* =========================================
   HOME PAGE
========================================= */

const homeButton = document.querySelector("button");

if (homeButton) {

    homeButton.addEventListener("click", () => {

        alert("Create Trip Feature Coming Soon!");

    });

}

/* =========================================
   LOGIN PAGE
========================================= */

const loginBtn = document.querySelector("#loginBtn");

if (loginBtn) {

    loginBtn.addEventListener("click", () => {

        const email =
            document.querySelector('input[type="email"]').value;

        const password =
            document.querySelector('input[type="password"]').value;

        // VALIDATION

        if (email === "" || password === "") {

            alert("Please fill all fields");

            return;

        }

        // EMAIL CHECK

        if (!email.includes("@")) {

            alert("Enter valid email");

            return;

        }

        // PASSWORD CHECK

        if (password.length < 6) {

            alert("Password must be at least 6 characters");

            return;

        }

        alert("Login Successful!");

        // SAVE LOGIN

        localStorage.setItem("isLoggedIn", true);

    });

}

/* =========================================
   CREATE TRIP PAGE
========================================= */

const createTripBtn =
    document.querySelector("#createTripBtn");

if (createTripBtn) {

    createTripBtn.addEventListener("click", () => {

        const tripName =
            document.querySelector("#tripName").value;

        const destination =
            document.querySelector("#destination").value;

        const startDate =
            document.querySelector("#startDate").value;

        const endDate =
            document.querySelector("#endDate").value;

        const budget =
            document.querySelector("#budget").value;

        // VALIDATION

        if (
            tripName === "" ||
            destination === "" ||
            startDate === "" ||
            endDate === "" ||
            budget === ""
        ) {

            alert("Please fill all fields");

            return;

        }

        // TRIP OBJECT

        const tripData = {

            tripName,
            destination,
            startDate,
            endDate,
            budget

        };

        // SAVE TO LOCAL STORAGE

        const oldTrips =
            JSON.parse(
                localStorage.getItem("trips")
            ) || [];

        oldTrips.push(tripData);

        localStorage.setItem(
            "trips",
            JSON.stringify(oldTrips)
        );

        alert("Trip Created Successfully!");

        // CLEAR FORM

        document.querySelector("#tripName").value = "";

        document.querySelector("#destination").value = "";

        document.querySelector("#startDate").value = "";

        document.querySelector("#endDate").value = "";

        document.querySelector("#budget").value = "";

    });

}

/* =========================================
   LOAD TRIPS ON DASHBOARD
========================================= */

const tripContainer =
    document.querySelector(".trip-container");

if (tripContainer) {

    const savedTrips =
        JSON.parse(
            localStorage.getItem("trips")
        ) || [];

    savedTrips.forEach((trip) => {

        const card =
            document.createElement("div");

        card.classList.add("trip-card");

        card.innerHTML = `

            <img 
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
            alt="trip">

            <h3>${trip.tripName}</h3>

            <p>${trip.destination}</p>

            <p>
                ${trip.startDate} 
                to 
                ${trip.endDate}
            </p>

            <span>₹${trip.budget}</span>

        `;

        tripContainer.appendChild(card);

    });

}

/* =========================================
   ITINERARY PAGE
========================================= */

const addPlanBtn =
    document.querySelector("#addPlanBtn");

let total = 0;

// LOAD SAVED PLANS

window.addEventListener("DOMContentLoaded", () => {

    const savedPlans =
        JSON.parse(
            localStorage.getItem("plans")
        ) || [];

    savedPlans.forEach(plan => {

        createPlanCard(
            plan.city,
            plan.activity,
            plan.cost
        );

    });

});

// ADD NEW PLAN

if (addPlanBtn) {

    addPlanBtn.addEventListener("click", () => {

        const city =
            document.querySelector("#city").value;

        const activity =
            document.querySelector("#activity").value;

        const cost =
            document.querySelector("#cost").value;

        // VALIDATION

        if (
            city === "" ||
            activity === "" ||
            cost === ""
        ) {

            alert("Please fill all fields");

            return;

        }

        // CREATE CARD

        createPlanCard(
            city,
            activity,
            cost
        );

        // SAVE DATA

        const oldPlans =
            JSON.parse(
                localStorage.getItem("plans")
            ) || [];

        oldPlans.push({
            city,
            activity,
            cost
        });

        localStorage.setItem(
            "plans",
            JSON.stringify(oldPlans)
        );

        // CLEAR INPUTS

        document.querySelector("#city").value = "";

        document.querySelector("#activity").value = "";

        document.querySelector("#cost").value = "";

    });

}

/* =========================================
   CREATE PLAN CARD FUNCTION
========================================= */

function createPlanCard(
    city,
    activity,
    cost
) {

    const card =
        document.createElement("div");

    card.classList.add("plan-card");

    card.innerHTML = `

        <div class="plan-left">

            <h3>${city}</h3>

            <p>${activity}</p>

        </div>

        <h3>₹${cost}</h3>

    `;

    const planList =
        document.querySelector("#planList");

    if (planList) {

        planList.appendChild(card);

    }

    // TOTAL COST

    total += Number(cost);

    const totalCost =
        document.querySelector("#totalCost");

    if (totalCost) {

        totalCost.innerText = total;

    }

}

/* =========================================
   BUDGET ANALYTICS CHART
========================================= */

const chartCanvas =
    document.querySelector("#budgetChart");

if (chartCanvas) {

    new Chart(chartCanvas, {

        type: "bar",

        data: {

            labels: [
                "Transport",
                "Hotels",
                "Food",
                "Activities"
            ],

            datasets: [{

                label: "Expenses",

                data: [
                    20000,
                    35000,
                    15000,
                    10000
                ],

                borderWidth: 1

            }]

        },

        options: {

            responsive: true,

            scales: {

                y: {

                    beginAtZero: true

                }

            }

        }

    });

}

/* =========================================
   LOGOUT FUNCTION
========================================= */

const logoutBtn =
    document.querySelector("#logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        localStorage.removeItem("isLoggedIn");

        alert("Logged Out Successfully");

    });

}

/* =========================================
   DARK MODE
========================================= */

const darkModeBtn =
    document.querySelector("#darkModeBtn");

if (darkModeBtn) {

    darkModeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

    });

}

/* =========================================
   SEARCH TRIP
========================================= */

const searchInput =
    document.querySelector("#searchTrip");

if (searchInput) {

    searchInput.addEventListener("keyup", () => {

        const value =
            searchInput.value.toLowerCase();

        const cards =
            document.querySelectorAll(".trip-card");

        cards.forEach(card => {

            const text =
                card.innerText.toLowerCase();

            if (text.includes(value)) {

                card.style.display = "block";

            }
            else {

                card.style.display = "none";

            }

        });

    });

}