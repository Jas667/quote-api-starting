const submitEditButton = document.getElementById('submit-edit');
const newQuoteContainer = document.getElementById('edited-quote');

submitEditButton.addEventListener('click', () => {
    const id = document.getElementById('id').value;
    const quote = document.getElementById('quote').value;
    const person = document.getElementById('person').value;
  
    fetch(`/api/quotes/edit?id=${id}&quote=${quote}&person=${person}`, {
      method: 'PUT',
    //   body: JSON.stringify({id: 200})
    })
    .then(response => response.json())
    .then(({quote}) => {
      const editedQuote = document.createElement('div');
      editedQuote.innerHTML = `
      <h3>Congrats, your quote was edited!</h3>
      <div class="quote-text">${quote.quote}</div>
      <div class="attribution">- ${quote.person}</div>
      <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
      `
      newQuoteContainer.appendChild(editedQuote);
    })
    .catch(error => {
      // const errorMess = document.createElement('div');
      // errorMess.innerHTML = `<h3>Please enter a valid id!</h3>`
      // newQuoteContainer.appendChild(errorMess);
      alert(`Please enter a valid id!`);
    });
  });
