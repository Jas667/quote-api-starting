const submitDeleteButton = document.getElementById('submit-delete');
const deleteStatusContainer = document.getElementById('deleted-div');

submitDeleteButton.addEventListener('click', () => {
    const id = document.getElementById('id-delete').value;

    fetch(`/api/quotes/delete?id=${id}`, {
        method: 'DELETE',
    })
    //check response and throw error if there is a problem or id doesn't exist
    .then(response  => {
        if (!response.ok) {
            throw new Error(response.status);
        } else {
            return response;
        }
    })
    //if quote deleted, display success message on page
    .then(() => {
        const deletedQuote = document.createElement('div');
        deletedQuote.innerHTML = '<h3>Quote deleted successfully!</h3>';
        deleteStatusContainer.appendChild(deletedQuote);
    })
    //how to handle error if invalid id is entered
    .catch(error => {
        console.log(error)
        alert('Please enter a valid id to delete');
    })
});