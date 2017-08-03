$(() => {

  const STREAMERS = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "zlapped", 'streamerhouse', 'dotatv247'],
        URL       = 'https://wind-bow.glitch.me/twitch-api/streams/';

  let on  = '',
      off = '';

  STREAMERS.forEach(streamer => {
    $.getJSON(URL+streamer, (data) => {
      if(data.stream === null || data.stream === undefined) {
        off = offline(streamer);

        $('#offline').append(off);
      } else {
        const logo   = data.stream.channel.logo,
          channelURL = data.stream.channel.url,
          status     = data.stream.channel.status;
        on = online(streamer, logo, channelURL, status);

        console.log(data);

        $('#online').append(on);
      }
    });

  });

  $('#buttons-group a').on('click', function() {
    if($(this).text() === 'All'){
      console.log('All');
      $('#offline').show();
      $('#online').show();
    }
    else if($(this).text() === 'Online'){
      console.log('Online')
      $('#online').show();
      $('#offline').hide();
    }
    else {
      console.log('Offline');
      $('#online').hide();
      $('#offline').show();
    }
  });

  // make HTML out of strings
  function offline(streamer){
    let output = `
    <div class="col-xs-12 item">
        <div class="row center middle item-size">
          <div class="col-xs-4 avatar"><img src="https://maxcdn.icons8.com/Share/icon/Messaging//offline1600.png" alt="${streamer}"></div>
          <div class="col-xs-4 content">${streamer}</div>
          <div class="col-xs-4 del"><img class="icon-offline" src="https://images-na.ssl-images-amazon.com/images/I/719zM3RmAxL.png"></div>
        </div>
      </div>`;
    return output;
  }

  function online(streamer, logo, url, status){
    let output = `
         <div class="col-xs-12 item">
            <div class="row center middle item-size">
              <div class="col-xs-4 avatar"><a href="${url}" target="_blank"><img src="${logo}" alt="${streamer}"></a></div>
              <div class="col-xs-4 content"><a href="${url}" target="_blank"><em>${streamer}</em> - <span class="info">${status}</span></a></div>
              <div class="col-xs-4 del"><img class="icon-online" src="https://phpfoxexpert.com/products/uploads/824_1.png"></div>
            </div>
          </div>`;
    return output;
  }

});