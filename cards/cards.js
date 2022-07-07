function drawCards(locations) {

  $.each(locations, function(index, location) {
    var html = "";
    html += '<div>';
    html += '  <div class="header">' + location.name + '</div>'; 
    html += '  <div class="cards">';
    
    $.each(location.equipments, function(index, equipment) {
      var color = equipment.status === 'Ativo' ? '#8cc14c' : '#FF0000';
      html += '<div class="card" style="border-color:' + color + '" onclick="alert(111);">';
      html += '  <div class="card-title" style="background-color:' + color + '">'; 
      html += '    <span class="text-with-ellipsis" title="' + equipment.name + '">' + equipment.name + '</span>';
      html += '  </div>';
      html += '  <div class="card-content">';
      html += '    <span>' + equipment.status + '</span>';
      html += '    <span title="Última leitura">' + equipment.lastread + '</span>'; 
      html += '    <span title="ID último registro">' + equipment.lastidregister + '<span>';
      html += '  </div>';
      html += '</div>';
    });

    html += '  </div>';
    html += '</div>';
    html += '<div class="divider"></div>';

    $('#locations').append(html);
  });

}
