const catForm = document.querySelector(".catForm");
const catInput = document.querySelector(".catInput");
const p = document.querySelector(".display");
const api = "live_lQXHOtO3Bbtn1IaotlU2dn2YjNylGcccziOWNj8383hANHWeZjQGUAqKTPMG8bq2";

catForm.addEventListener("submit", async event => {
    event.preventDefault();
    const cat = catInput.value.trim().toLowerCase();
    if (cat) {
        try {
            const catInfo = await getCatInfo(cat);
            if (!catInfo) {
                throw new Error("Breed not found");
            }
            const imageUrl = await getImage(catInfo.id);
            p.innerHTML = `
                <img src="${imageUrl}" style="max-width: 300px;">
                <p>${catInfo.description}</p>
            `;
        } catch (error) {
            console.error(error);
            displayError("Not a valid breed");
        }
    } else {
        displayError("Please enter a cat breed");
    }
});

async function getCatInfo(breed) {
    const response = await fetch("https://api.thecatapi.com/v1/breeds", {
        headers: {
            "x-api-key": api
        }
    });

    if (!response.ok) {
        throw new Error("Error fetching description");
    }

    const data = await response.json();
    return data.find(b => b.name.toLowerCase() === breed);
}

async function getImage(breedId) {
    const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`, {
        headers: {
            "x-api-key": api
        }
    });

    if (!response.ok) {
        throw new Error("Error fetching image");
    }

    const data = await response.json();
    return data[0]?.url;
}

function displayError(message) {
    const error = document.createElement("p");
    error.textContent = message;
    error.classList.add("errorDisplay");

    p.textContent = "";
    p.style.display = "flex";
    p.appendChild(error);
}
