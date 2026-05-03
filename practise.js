const user = {
  "username": "testuser",
  "email": "testuser@example.com"
}

let email ="testuser@example.com"

const match = ()=> {if(user.email === email)
  return true;  
else return false;
};

console.log(match())