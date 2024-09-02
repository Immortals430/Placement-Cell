function displayaddStudentForm(){
    let elem = document.getElementById('addStudent')
    if (elem.style.display === 'none') {
        elem.style.display = 'block';
        console.log('block')
    } else {
        elem.style.display = 'none';
        console.log('none')

    }
}