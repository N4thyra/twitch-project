$(() => {

  const STREAMERS = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "zlapped", 'streamerhouse', 'dotatv247'],
        URL       = 'https://wind-bow.glitch.me/twitch-api/streams/';

  let on  = '',
      off = '';

  STREAMERS.forEach(streamer => {
    $.getJSON(URL+streamer, (data) => {
      if (data.stream === null || data.stream === undefined) {
        $("#offline").append(output(streamer));
      } else {
        const logo   = data.stream.channel.logo,
          channelURL = data.stream.channel.url,
          status = data.stream.channel.status;
        $("#online").append(output(streamer, logo, channelURL, status));
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
  function output(streamer, logo="https://maxcdn.icons8.com/Share/icon/Messaging//offline1600.png", url=null, status=null){
    const onOrOff = status ? 'online' : 'offline';
    const imageSection = `<img src="${logo}" alt="${streamer}">`;
    const avatarSection = {
      online: `<a href="${url}" target="_blank">${imageSection}</a>`,
      offline: imageSection
    };
    const contentSection = {
      online: `<a href="${url}" target="_blank"><em>${streamer}</em> - <span class="info">${status}</span></a>`,
      offline:`${streamer}`
    };
    const statusIcon = {
      online: "https://phpfoxexpert.com/products/uploads/824_1.png",
      offline: "https://images-na.ssl-images-amazon.com/images/I/719zM3RmAxL.png"
    };
    return  `
         <div class="col-xs-12 item">
            <div class="row center middle item-size">
              <div class="col-xs-4 avatar">${avatarSection[onOrOff]}</div>
              <div class="col-xs-6 content">${contentSection[onOrOff]}</div>
              <div class="col-xs-2 del"><img class="icon-${onOrOff}" src="${statusIcon[onOrOff]}"></div>
            </div>
          </div>    
    `;
  }


});