export function validateEmail(users, email) {
  var re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (re.test(email) === false) {
    return 'Please enter a valid email address';
  } else if (users.find((item) => item.email === email)) {
    return 'Email already exists';
  } else {
    return undefined;
  }
}

export function validatePhone(users, phone) {
  var re = /([+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/;
  if (re.test(phone) === false) {
    return 'Please enter a valid phone';
  } else if (users.find((item) => item.phoneNumber === phone)) {
    return 'Phone already exists';
  } else {
    return undefined;
  }
}

export function validateUsername(users, username) {
  var re = /^[a-zA-Z0-9]+$/;
  if (re.test(username) === false) {
    return 'Username can only enter characters A-Z a-z 0-9';
  } else if (users.find((item) => item.username === username)) {
    return 'Username already exists';
  } else {
    return undefined;
  }
}

export function validateFullname(fullname) {
  var re = /^[a-zA-Z0-9]+$/;
  if (re.test(fullname) === false) {
    return 'Fullname can only enter characters A-Z a-z 0-9';
  } else {
    return undefined;
  }
}

export function validateRequired(value) {
  value = typeof value === 'string' ? value.trim() : value;
  return value === '' || value === undefined ? 'Field is required' : undefined;
}

export function validateEmailType(email) {
  var re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return re.test(email) ? undefined : 'Please enter a valid email address';
}

export function validatePhoneType(phone) {
  var re = /^[a-zA-Z0-9]+$/;
  return re.test(phone) ? undefined : 'Please enter a valid phone';
}

export function validateMinLength(value, length = 8) {
  return value.length < length ? `Minimum password length is ${length} characters` : undefined;
}

export function validateUnique(collection, value, field, exceptSelf = false) {
  // only Data of field
  let fieldData = collection.reduce((accumulator, item) => accumulator.concat(item[field]), []);
  // for update mode
  exceptSelf && fieldData.splice(fieldData.indexOf(value), 1);

  return fieldData.find((item) => item === value) ? `${field} already exists` : undefined;
}
