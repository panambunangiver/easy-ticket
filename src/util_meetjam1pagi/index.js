//unused
export const lerp = (start, end, percentage) =>
  start + (end - start) * percentage;

//unused
export const easeIn = time => time * time * time * time * time;

//unused
export const flip = x => 1 - x;

//unused
export const easeOut = time => flip(easeIn(flip(time)));

/*
* numberWithCommas
*
* a function that takes a number input, and outputs a
* string containing number with comma separated zeroes
*
* Example Usage:
*
* numberWithCommas(1000000) = '1.000.000'
* */
export const numberWithCommas = x => {
  if (!x)
    return "";

  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

/*
* datesToFormattedString
*
* a function that takes array of sequential dates in a week, and outputs a string
* containing the dates in a human-readable format
*
* Example Usage:
*
* datesToFormattedString([
 new Date(2018, 0, 1),
 new Date(2018, 0, 2),
 new Date(2018, 0, 4),
 new Date(2018, 0, 5)
]) = 'Senin - Selasa, Kamis - Jumat'
* */
export const datesToFormattedString = dates => {
  //if dates is null or dates length is less than 1, return empty string
  if (!dates || dates.length < 1) return "";

  //create array of days
  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

  let result = "";
  let i = 0;
  while (i < dates.length) {
    //create temp variable to store days array index
    const temp = days[dates[i]];

    //if the next element is consecutive to the current element
    if (i + 1 < dates.length && dates[i + 1] - dates[i] === 1) {
      //create comboBreaker variable that checks if the next element breaks the consecutive
      let comboBreaker = i + 1;

      //while the next element is consecutive to the current element
      while (comboBreaker + 1 < dates.length && dates[comboBreaker + 1] - dates[comboBreaker] === 1) {
        //incrementing comboBreaker means that the next element is consecutive
        comboBreaker++;
      }

      //add the consecutive days to the result
      result += `${temp} - ${days[dates[comboBreaker]]}, `;
      //move the i pointer to where the consecutive days end
      i = comboBreaker + 1;
      //if the next element is not consecutive to the current element
    } else {
      //add the current element to the result
      result += `${temp}, `;
      //incrementing i means that the next element is not consecutive
      i++;
    }
  }

  return result.slice(0, -2);
};

/*
* postedologic
*
* a function that automatically wraps API request data with correct header,
* method, and accessToken if any
*
* Example Usage:
*
* postedologic({
*   city: 'Manado'
* }, 'insert access token string here') =
* {
*  method: 'POST',
*  headers: {
*   'Content-Type': 'application/json',
*   'access-token': 'insert access token string here'
*  },
*  body: "{\"city\":\"Manado\"}"
* }
* */
export const postedologic = (data, accessToken = null) => {
  let headers;

  if (accessToken)
    headers = {
      "Content-Type": "application/json",
      "access-token": accessToken,
    };
  else
    headers = {
      "Content-Type": "application/json",
    };

  return ({
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
};
