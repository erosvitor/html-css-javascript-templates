
function formatDatetime(datetime) {
  var year = datetime.getFullYear();
  var month = datetime.getMonth();
  var day = datetime.getDate();
  var hours = datetime.getHours();
  var minutes = datetime.getMinutes();

  month = month < 10 ? '0'+month : month;
  day = day < 10 ? '0'+day : day;
  hours = hours < 10 ? '0'+hours : hours; 
  minutes = minutes < 10 ? '0'+minutes : minutes;

  return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':00';
}

function exportJsonToCsv(data) {
  var json = data;
  var fields = Object.keys(json[0]);  // retrieves field names from the first json object

  var replacer = function(key, value) { return value === null ? '' : value };

  var csvRow = json.map(function(row) {  // run the function for each element of the array of json object
    return fields.map(function(fieldName) {  // run the function for each element of array 'fields'
      var value = row[fieldName];
      if (fieldName === 'datetime') {
        value = formatDatetime(value);   
      }
      return JSON.stringify(value, replacer)  // call the function 'replacer' for the field of json object
    }).join(',')
  });

  // 'join' creates a new string by concatenating all of the elements of the array, separated by commas or a specified separator string.
  // 'unshift' add an element to the beginning of an array
  csvRow.unshift(fields.join(',')); // add header column

  csvRow = csvRow.join('\r\n');

  var csvContent = "data:text/csv;charset=utf-8," + csvRow + '\r\n';

  var link = document.createElement("a");
  link.setAttribute("href", encodeURI(csvContent));
  link.setAttribute("download", 'jsontocsvfile.csv');
  link.click();
}

