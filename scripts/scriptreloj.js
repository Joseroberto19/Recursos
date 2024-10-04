function updateTime() {
    const selectedOption = document.getElementById('country-select').options[document.getElementById('country-select').selectedIndex];
    const selectedCountry = selectedOption.value;
    const selectedImage = selectedOption.getAttribute('data-image');
    const backgroundImageContainer = document.querySelector('.background-image');
  
    // Eliminar la clase 'show' para desencadenar la animación nuevamente
    backgroundImageContainer.classList.remove('show');
  
    fetch(`https://worldtimeapi.org/api/timezone/${selectedCountry}`)
        .then(response => response.json())
        .then(data => {
            const utcTime = new Date(data.utc_datetime);
            const localTime = new Date(utcTime.toLocaleString("en-US", { timeZone: selectedCountry }));
  
            const formattedTime = localTime.toLocaleTimeString('en-US', {
                hour12: true,
                hour: 'numeric',
                minute: '2-digit',
                second: '2-digit'
            });
            document.getElementById('time').textContent = formattedTime;
  
            // Agregar clase 'show' después de un breve retraso para permitir la animación
            setTimeout(() => {
                backgroundImageContainer.classList.add('show');
                // Cambiar la imagen de fondo después de agregar la clase 'show'
                backgroundImageContainer.style.backgroundImage = `url(${selectedImage})`;
            }, 100);
        })
        .catch(error => {
            console.error('Error fetching time:', error);
            document.getElementById('time').textContent = 'Error fetching time';
        });
  }
  
  // Llama a updateTime cuando se cambia la selección de país
  document.getElementById('country-select').addEventListener('change', updateTime);
  
  // Llama a updateTime al cargar la página
  updateTime();