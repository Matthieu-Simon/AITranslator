document.getElementById('translationForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const word = document.getElementById('textInput').value;
    const selectLanguage = document.getElementById('selectLanguage').value;

    try {
        const response = await fetch('/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: word, to: selectLanguage })
        });
        const data = await response.json();
        document.getElementById('translationResult').innerText = data.translation;
    } catch(error) {
        console.error('Error translating text:', error);
    }
});

document.getElementById('resetButton').addEventListener('click', () => {
    document.getElementById('textInput').value = "";
    document.getElementById('translationResult').innerText = "";
});