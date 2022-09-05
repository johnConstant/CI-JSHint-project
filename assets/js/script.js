const API_KEY = 'z2k7UPLnCiNPtucury2aNVGd0uo';
const API_URL = 'https://ci-jshint.herokuapp.com/api';
const resultsModal = new bootstrap.Modal(document.getElementById('resultsModal'));

document.getElementById('status').addEventListener('click', (e) => getStatus(e));
document.getElementById('submit').addEventListener('click', (e) => postForm(e));

const getStatus = async () => {
    const res = await fetch(`${API_URL}?api_key=${API_KEY}`)
        const data = await res.json()
        if(res.ok){
            displayStatus(data.expiry)
        }else{
            throw new Error(data.error)
        }
}

const displayStatus = (data) => {
    document.getElementById('resultsModalTitle').innerText = 'API Key Status';
    document.getElementById('results-content').innerText = `Your API key is due to expire on the ${data}`;
    resultsModal.show();
}

const postForm = async () => {
    const form = new FormData(document.getElementById('checksform'));
    const response = await fetch(API_URL, {
                        method: "POST",
                        headers: {
                                    "Authorization": API_KEY,
                                 },
                        body: form
                        })
        const data = await response.json();
        if(response.ok){
            displayErrors(data);
        } else {
            throw new Error(data.error)
        }               
}

const displayErrors = (data) => {
    let results = "";

    let heading = `JSHint Results for ${data.file}`;
    if (data.total_errors === 0) {
        results = `<div class="no_errors">No errors reported!</div>`;
    } else {
        results = `<div>Total Errors: <span class="error_count">${data.total_errors}</span></div>`;
        for (let error of data.error_list) {
            results += `<div>At line <span class="line">${error.line}</span>, `;
            results += `column <span class="column">${error.col}:</span></div>`;
            results += `<div class="error">${error.error}</div>`;
        }
    }

    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;
    resultsModal.show();
}
