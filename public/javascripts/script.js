
const convertBtn = document.querySelector('#convert');
const downlowdBtn = document.querySelector('#download');
const inputEle = document.querySelector('#input_temp');
const convertedEle = document.querySelector('#converted');

convertBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let temp = inputEle.value;
    
    if(!temp.match(/^[cfCF]\d+.?\d*$/g)){
        convertedEle.innerText = 'Invalid input. Valid example: c45, f50';
    } else {
        let isCToF = null;
        if(temp.charAt(0).toLowerCase() === 'c') {
            isCToF = true;    
        } else {
            isCToF = false;
        }
        temp = parseFloat(temp.substring(1));
        console.log(temp);

        fetch('/', {
            method: "POST",
            body:JSON.stringify({'temp':temp, 'isCToF':isCToF}),
            headers:{"Content-Type":"application/json"}
        })
        .then(response => {
            if (response.ok) { return response.json()}})
        .then(value => {
            const convertedTemp = value['temp'];
            
            if(isCToF) {
                // celsiusEle.value = celsiusTemp;
                convertedEle.innerText = 'f' + convertedTemp;
            } else {
                convertedEle.innerText = 'c' + convertedTemp;
                // fahrenheitEle.value = fahrenheitTemp;
            }
        });
    }
    
});

    
