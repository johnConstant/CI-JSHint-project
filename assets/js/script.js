const API_KEY = 'z2k7UPLnCiNPtucury2aNVGd0uo';
const API_URL = 'https://ci-jshint.herokuapp.com/api';
const resultsModal = new bootstrap.Modal(document.getElementById('resultsModal'));

document.getElementById('status').addEventListener('click', (e) => getStatus(e));

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
