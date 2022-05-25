// Converts string type date to js date object
export function stringToDate(date: string, hour: string): Date {
  const formatDate = date.split('/');

  return new Date(`${formatDate[2]}-${formatDate[1]}-${formatDate[0]}T${hour}`);
}

// Split string with specif delimiter
export function splitText(text: string, delimiter: number): string {
  const formattedText = text.substr(0, delimiter).trim() + (text.length > delimiter ? "..." : "");
  return formattedText;
}

// Get first word of a string sentence
export function getFirstName(name: string):string {
  const firstName = name.split(" ")[0];
  return firstName;
}

// clear the input value of not allowed characters
function clear(value: string, validChar: string) {
  let result = "", aux;

  for (let i = 0; i < value.length; i++) {
      aux = validChar.indexOf(value.substring(i, i + 1));

      if (aux >= 0) {
          result += aux;
      }
  }

  return result;
}

// Formats number to monetary format
export function formatMoneyRealTime(value: string) {

  const vr = clear(value, "0123456789"),
        size = vr.length,
        dec = 2;

  if (size <= dec) {
      value = vr;
  } else if ((size > dec) && (size <= 5)) {
      value = vr.substr(0, size - 2) + "," + vr.substr(size - dec, size);
  } else if ((size >= 6) && (size <= 8)) {
      value = vr.substr(0, size - 5) + "." + vr.substr(size - 5, 3) + "," + vr.substr(size - dec, size);
  } else if ((size >= 9) && (size <= 11)) {
      value = vr.substr(0, size - 8) + "." + vr.substr(size - 8, 3) + "." + vr.substr(size - 5, 3) +
          "," + vr.substr(size - dec, size);
  } else if ((size >= 12) && (size <= 14)) {
      value = vr.substr(0, size - 11) + "." + vr.substr(size - 11, 3) + "." + vr.substr(size - 8, 3) +
          "." + vr.substr(size - 5, 3) + "," + vr.substr(size - dec, size);
  } else if ((size >= 15) && (size <= 17)) {
      value = vr.substr(0, size - 14) + "." + vr.substr(size - 14, 3) + "." + vr.substr(size - 11, 3) +
          "." + vr.substr(size - 8, 3) + "." + vr.substr(size - 5, 3) + "," + vr.substr(size - 2, size);
  }

  return value;
}