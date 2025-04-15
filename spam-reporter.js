$(document).ready(function () {
  var abuseIP;

  $("#btnClear").click(function () {
    $('#raw').val('');
    $('#draft').text('');
  });

  $("#btnDraft").click(function () {
    var str = $('#raw').val();

    var emailHeader = '';

    if ((/\n\n/.exec(str)) !== null) {
      emailHeader = str.substring(0, (/\n\n/.exec(str)).index);
    } else {
      emailHeader = str.substring(0, str.length);
    }

    //console.log(emailHeader);

    const regexAbuseIP = /Received: from.*?(?:\[(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\]|\((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\)|(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))/gm;
    const regexAbuseDate = /Date: (.*)/gm;

    var matchesRegexAbuseIP = regexAbuseIP.exec(emailHeader);
    if (matchesRegexAbuseIP !== null) {
      //console.log(matchesRegexAbuseIP);
      abuseIP = matchesRegexAbuseIP[1] || matchesRegexAbuseIP[2] || matchesRegexAbuseIP[3];
    }
    //console.log('Source IP address: ' + abuseIP);

    var abuseDateTime;
    var matchesRegexAbuseDate = regexAbuseDate.exec(emailHeader);
    if (matchesRegexAbuseDate !== null) {
      //console.log(matchesRegexAbuseDate);
      abuseDateTime = matchesRegexAbuseDate[1];
    }
    //console.log('Date and time of abuse: ' + abuseDateTime);

    var draftMessage = 'Source IP address: ' + abuseIP + '\n\n' +
      'Date and time of abuse: ' + abuseDateTime + '\n\n' +
      'Type of abuse: Spam abuse. Recipient did not consent to receiving emails from the sender. No effective unsubscribe mechanisms are provided by the sender. This combination of lack of consent and absent unsubscribe options constitutes a clear violation of anti-spam policies and necessitates prompt action to prevent further abuse.' + '\n\n' +
      'Complete email headers:' + '\n\n' +
      emailHeader;

    $('#draft').text(draftMessage);
  });

  $("#btnCopy").click(function () {
    var copyText = document.getElementById("draft");
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(copyText.value);
    alert("Copied");
  });

  $("#btnWhois").click(function () {
    open('https://bgp.he.net/ip/' + abuseIP + '#_whois', '_blank');
  });
});