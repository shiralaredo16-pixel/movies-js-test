document.addEventListener("DOMContentLoaded", function () {
    const bookingSection = document.getElementById("booking-section");
    const movieNameSpan = document.getElementById("form-movie-name");
    const moviePriceSpan = document.getElementById("form-movie-price");
    const ticketCountInput = document.getElementById("ticket-count");
    const totalSpan = document.getElementById("form-total-price");
    const sendBtn = document.getElementById("send-btn");
    const creditCardInput = document.getElementById("credit-card");
    const expDateInput = document.getElementById("exp-date");

    let currentPrice = 0;

    function updateTotalPrice() {
        let rawValue = ticketCountInput.value;
        let tickets = parseInt(rawValue) || 1;
        
    
        if (tickets > 5) {
            alert("Error: You can buy a maximum of 5 tickets only!");
            ticketCountInput.value = 5;
            tickets = 5;
        } else if (tickets < 1) {
            tickets = 1;
            ticketCountInput.value = 1;
        }

        let total = currentPrice * tickets;
        totalSpan.textContent = total;
    }



    const buyButtons = document.querySelectorAll("button");
    buyButtons.forEach(button => {
        if (button.textContent.trim().toLowerCase() === "buy") {
            button.addEventListener("click", function () {
                const row = this.closest("tr");
                
                const movieName = row.querySelector("td:nth-child(3)").textContent.trim();
                const priceText = row.querySelector(".price-val").textContent.trim();
                currentPrice = parseFloat(priceText) || 0;

                movieNameSpan.textContent = movieName;
                moviePriceSpan.textContent = currentPrice;
                ticketCountInput.value = 1;
                
                updateTotalPrice();

                creditCardInput.value = "";
                expDateInput.value = "";

                bookingSection.style.display = "block";
                bookingSection.scrollIntoView({ behavior: "smooth" });
            });
        }
    });

    ticketCountInput.addEventListener("input", updateTotalPrice);

    sendBtn.addEventListener("click", function () {
        const ccVal = creditCardInput.value.trim();
        const dateVal = expDateInput.value.trim();

        if (ccVal === "" || dateVal === "") {
            alert("Please fill in both Credit Card and Expiration Date!");
            return;
        }

        alert("Order sent successfully! Thank you.");

        creditCardInput.value = "";
        expDateInput.value = "";
        ticketCountInput.value = 1;
        bookingSection.style.display = "none";
    });
});
