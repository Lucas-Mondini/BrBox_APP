/**
 * Converts string type date to js date object
 * @param date string
 * @param hour string
 * @returns Date
 */
export function stringToDate(date: string, hour: string): Date
{
  const formatDate = date.split('/');

  return new Date(`${formatDate[2]}-${formatDate[1]}-${formatDate[0]}T${hour}`);
}

/**
 * Returns a delimited part of a string
 * @param text string
 * @param delimiter number
 * @returns string
 */
export function splitText(text: string, delimiter: number): string
{
  const formattedText = text.substr(0, delimiter).trim() + (text.length > delimiter ? "..." : "");
  return formattedText;
}

/**
 * Get first word of a string sentence
 * @param name string
 * @returns string
 */
export function getFirstName(name: string):string
{
  const firstName = name.split(" ")[0];
  return firstName;
}

/**
 * Removes special characters
 * @param value string
 * @param validChar string
 * @returns string
 */
function clear(value: string, validChar: string): string
{
  let result = "", aux;

  for (let i = 0; i < value.length; i++) {
      aux = validChar.indexOf(value.substring(i, i + 1));

      if (aux >= 0) {
          result += aux;
      }
  }

  return result;
}

/**
 * Formats number to monetary format
 * @param value string
 * @returns string
 */
export function formatMoneyRealTime(value: string): string
{
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

/**
 * Gets max id from object list
 * @param object[]
 * @returns number
 */
export function getMaxId(object: any[]): number
{
  if (object.length == 0) {
    return 0;
  }

  const maxId = object.reduce((item1: any, item2: any) => {
    if (Math.max(item2.id)) {
      return item2
    } else {
      return item1
    }
  });

  return maxId.id + 1;
}

/**
 * Removes object from an object array
 * @param id object identifier
 * @param objects objects array
 * @param setFunction function that sets the object array
 * @returns void
 */
export function removeObjectFromArray(id: number, objects: any[], setFunction: (value: any) => void):void
{
  const objectList = objects.filter(object => object.id !== id);

  setFunction([...objectList]);
}