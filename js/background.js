function setBg() {
    let hour = new Date().getHours();

    if (hour < 12) {
        greeting.textContent = 'Good Morning, ';
    } else if (hour < 18) {
        greeting.textContent = 'Good Afternoon, '
    } else {
        greeting.textContent = 'Good Evening, ';
    }

    document.body.style.backgroundImage = `url(images/${Math.floor(Math.random() * 5)}.jpeg)`
}


setBg()