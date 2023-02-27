//METODO POST
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    var petName = document.querySelector('#petName').value;
    var specie = document.querySelector('#specie').value;
    var breed = document.querySelector('#breed').value;
    var height = document.querySelector('#height').value;
    var coatType = document.querySelector('#coatType').value;
    var treatment = document.querySelector('#treatment').value;
    var tutorName = document.querySelector('#tutorName').value;
    var tutorTel = document.querySelector('#tutorTel').value;
    const petData = {
        "petName": `${petName}`,
        "specie": `${specie}`,
        "breed": `${breed}`,
        "height": `${height}`,
        "coatType": `${coatType}`,
        "treatment": `${treatment}`,
        "tutorName": `${tutorName}`,
        "tutorCel": `${tutorTel}`
    };
    fetch('http://localhost:8080/orders', {
            method: 'POST',
            body: JSON.stringify(petData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            location.reload();
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
})

fetch('http://localhost:8080/orders')
    .then(response => response.json())
    .then(data => {
        data.forEach(result => {
            const divDecor = document.createElement('div');
            const petList = document.createElement('ul');
            const petNameItem = document.createElement('li');
            const specieItem = document.createElement('li');
            const breedItem = document.createElement('li');
            const heightItem = document.createElement('li');
            const coatTypeItem = document.createElement('li');
            const treatmentItem = document.createElement('li');
            const tutorNameItem = document.createElement('li');
            const tutorCelItem = document.createElement('li');
            const editButton = document.createElement('button')
            const deleteButton = document.createElement('button');

            petNameItem.textContent = `Nome do Pet: ${result.petName}`;
            specieItem.textContent = `Espécie: ${result.specie}`;
            breedItem.textContent = `Raça: ${result.breed}`;
            heightItem.textContent = `Tamanho: ${result.height}`;
            coatTypeItem.textContent = `Tipo de pelagem: ${result.coatType}`;
            treatmentItem.textContent = `Tratamento: ${result.treatment}`;
            tutorNameItem.textContent = `Nome do tutor: ${result.tutorName}`;
            tutorCelItem.textContent = `Telefone do tutor: ${result.tutorCel}`;
            editButton.textContent = 'Editar';
            deleteButton.textContent = 'Deletar';

            petList.appendChild(divDecor);
            petList.appendChild(petNameItem);
            petList.appendChild(specieItem);
            petList.appendChild(breedItem);
            petList.appendChild(heightItem);
            petList.appendChild(coatTypeItem);
            petList.appendChild(treatmentItem);
            petList.appendChild(tutorNameItem);
            petList.appendChild(tutorCelItem);
            petList.appendChild(editButton);
            petList.appendChild(deleteButton);

            document.getElementById('ordens').appendChild(petList);

            editButton.addEventListener('click', () => {
                const petNameInput = document.querySelector('#petName');
                const specieInput = document.querySelector('#specie');
                const breedInput = document.querySelector('#breed');
                const heightInput = document.querySelector('#height');
                const coatTypeInput = document.querySelector('#coatType');
                const treatmentSelect = document.querySelector('#treatment');
                const tutorNameInput = document.querySelector('#tutorName');
                const tutorCelInput = document.querySelector('#tutorTel');
                const submitButton = document.querySelector('button');

                petNameInput.value = result.petName;
                specieInput.value = result.specie;
                breedInput.value = result.breed;
                heightInput.value = result.height;
                coatTypeInput.value = result.coatType;
                tutorNameInput.value = result.tutorName;
                tutorCelInput.value = result.tutorCel;

                submitButton.textContent = 'Salvar';

                submitButton.addEventListener('click', (event) => {
                        event.preventDefault();

                        const updatedPet = {
                            petName: petNameInput.value,
                            specie: specieInput.value,
                            breed: breedInput.value,
                            height: heightInput.value,
                            coatType: coatTypeInput.value,
                            treatment: treatmentSelect.value,
                            tutorName: tutorNameInput.value,
                            tutorCel: tutorCelInput.value
                        };

                        fetch(`http://localhost:8080/orders/edit/${result.id}`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(updatedPet)
                            })
                            .then(response => response.json())
                            .then(data => console.log(data))
                            .catch(error => console.error(error));
                        location.reload();
                    })
                    .catch(error => {
                        console.error(error);
                    });
            });

            deleteButton.addEventListener('click', (event) => {
                event.preventDefault();

                fetch(`http://localhost:8080/orders/delete/${result.id}`, {
                        method: 'DELETE'
                    })
                    .then(response => {
                        if (response.ok) {
                            alert("Ordem deletada!")
                            location.reload();
                        } else {
                            throw new Error('Erro ao excluir o pedido.');
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
            })
        })

    });