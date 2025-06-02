const catForm = document.querySelector(".catForm");
const catInput = document.querySelector(".catInput");
const p = document.querySelector(".display");
const api = "live_lQXHOtO3Bbtn1IaotlU2dn2YjNylGcccziOWNj8383hANHWeZjQGUAqKTPMG8bq2";

catForm.addEventListener("submit", async event=>{
    event.preventDefault();
    const cat = catInput.value.trim().toLowerCase();
    if (cat){
        try{
            const catInfo = await getCatInfo(cat);
            const imageUrl = await getImage(catInfo.id);
            p.innerHTML = `
            <img src="${imageUrl}"style="max-width: 300px;">
            <p>${catInfo.description}</p>
            `;
        }
        catch(error){
            console.error(error);
            displayError("Not a valid breed");
        }
    }
    else{
        displayError("Please enter a cat breed");
    }
})

async function getCatInfo(breed){
    const response = await fetch("https://api.thecatapi.com/v1/breeds", {
        headers: {
            "x-api-key": api
        }
    });
    console.log(response);
    if (!response.ok){
        throw new Error ("error fetching description");
    }
    const j =  await response.json();
    return j.find(b => b.name.toLowerCase() === breed);
}

async function getImage(breed){
    const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed}`, {
        headers: {
            "x-api-key": api
        }
    });
    console.log(response);
    if (!response.ok){
        throw new Error ("error fetching image");
    }
    const j = await response.json();
    return j[0]?.url;
}

function displayError(message){
    const error = document.createElement("p");
    error.textContent = message;
    error.classList.add("errorDisplay");

    p.textContent="";
    p.style.display="flex";
    p.appendChild(error);
}