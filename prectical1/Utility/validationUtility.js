function validEmail(email){
    const emailExpression =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailExpression.test(email)
}

function validName(name){
    const nameExpression=/^[A-Za-z\s]{2,50}$/;
    return nameExpression.test(name);
}

function validRno(rno){
    const numberExpression=/^\d+$/;
    return numberExpression.test(rno);
}

function validPhno(phno){
    const phnoExpression=/^[0-9]{10}$/;
    return phnoExpression.test(phno);
}

function validCity(city){
    const cityExpression=/^[A-Za-z\s]{2,50}$/;
    return cityExpression.test(city);
}

function validDob(dob){
    const dobExpression=/^\d{4}-\d{2}-\d{2}$/;
    return dobExpression.test(dob)
}

module.exports={validEmail,validName,validRno,validPhno,validCity,validDob}