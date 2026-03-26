
function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Map Agreements') || ss.insertSheet('Map Agreements');

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp','Invoice Number','Invoice Date','Due Date','Contact Name','Business Name','Email','Phone','Website','Billing Address',
        'Map Edition','Ad Size','Category','Total Amount','Deposit Amount','Balance Amount','Package Details','Advertiser Signature','Signature Date',
        'Plateau Representative','Admin Email','Notes','Consent'
      ]);
    }

    var data = e.parameter;
    var invoiceNumber = data.invoiceNumber || ('PPC-' + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd-HHmmss'));
    var adminEmail = data.adminEmail || 'katiemorris@bestversionmedia.com';

    sheet.appendRow([
      new Date(),
      invoiceNumber,
      data.invoiceDate || '',
      data.dueDate || '',
      data.contactName || '',
      data.businessName || '',
      data.email || '',
      data.phone || '',
      data.website || '',
      data.billingAddress || '',
      data.mapEdition || '',
      data.adSize || '',
      data.category || '',
      data.totalAmount || '',
      data.depositAmount || '',
      data.balanceAmount || '',
      data.packageDetails || '',
      data.advertiserSignature || '',
      data.signatureDate || '',
      data.plateauRep || '',
      adminEmail,
      data.notes || '',
      data.consent || ''
    ]);

    var subject = 'Plateau Map Advertising Agreement - ' + (data.businessName || 'New Submission');
    var html = buildAgreementHtml_(invoiceNumber, data);
    var text = buildAgreementText_(invoiceNumber, data);

    if (data.email) {
      MailApp.sendEmail({
        to: data.email,
        cc: adminEmail,
        subject: subject,
        body: text,
        htmlBody: html
      });
    } else {
      MailApp.sendEmail({
        to: adminEmail,
        subject: subject,
        body: text,
        htmlBody: html
      });
    }

    return ContentService
      .createTextOutput(JSON.stringify({status:'success', invoiceNumber:invoiceNumber}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({status:'error', message:error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({status:'ok', message:'Plateau agreement endpoint is live'}))
    .setMimeType(ContentService.MimeType.JSON);
}

function buildAgreementHtml_(invoiceNumber, data) {
  function money(v) {
    return v ? '$' + Number(v).toFixed(2) : '$0.00';
  }
  return '<div style="font-family:Arial,sans-serif;line-height:1.5;color:#222">' +
    '<h2>Plateau Map Advertising Agreement</h2>' +
    '<p>Thank you. This email confirms the agreement submission.</p>' +
    '<table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:820px">' +
    '<tr><td><strong>Invoice Number</strong></td><td>' + invoiceNumber + '</td></tr>' +
    '<tr><td><strong>Invoice Date</strong></td><td>' + (data.invoiceDate || '') + '</td></tr>' +
    '<tr><td><strong>Due Date</strong></td><td>' + (data.dueDate || '') + '</td></tr>' +
    '<tr><td><strong>Business</strong></td><td>' + (data.businessName || '') + '</td></tr>' +
    '<tr><td><strong>Contact</strong></td><td>' + (data.contactName || '') + '</td></tr>' +
    '<tr><td><strong>Email</strong></td><td>' + (data.email || '') + '</td></tr>' +
    '<tr><td><strong>Phone</strong></td><td>' + (data.phone || '') + '</td></tr>' +
    '<tr><td><strong>Map / Edition</strong></td><td>' + (data.mapEdition || '') + '</td></tr>' +
    '<tr><td><strong>Ad Size</strong></td><td>' + (data.adSize || '') + '</td></tr>' +
    '<tr><td><strong>Package Details</strong></td><td>' + (data.packageDetails || '') + '</td></tr>' +
    '<tr><td><strong>Total Amount</strong></td><td>' + money(data.totalAmount) + '</td></tr>' +
    '<tr><td><strong>Deposit Due Now</strong></td><td>' + money(data.depositAmount) + '</td></tr>' +
    '<tr><td><strong>Balance Remaining</strong></td><td>' + money(data.balanceAmount) + '</td></tr>' +
    '<tr><td><strong>Advertiser Signature</strong></td><td>' + (data.advertiserSignature || '') + ' on ' + (data.signatureDate || '') + '</td></tr>' +
    '<tr><td><strong>Plateau Representative</strong></td><td>' + (data.plateauRep || '') + '</td></tr>' +
    '</table>' +
    '<p style="margin-top:18px"><strong>Notes / Special Terms:</strong><br>' + (data.notes || '') + '</p>' +
    '<p>This typed signature is intended to serve as an electronic acknowledgment of the agreement terms submitted online.</p>' +
    '</div>';
}

function buildAgreementText_(invoiceNumber, data) {
  return [
    'Plateau Map Advertising Agreement',
    '',
    'Invoice Number: ' + invoiceNumber,
    'Invoice Date: ' + (data.invoiceDate || ''),
    'Due Date: ' + (data.dueDate || ''),
    'Business: ' + (data.businessName || ''),
    'Contact: ' + (data.contactName || ''),
    'Email: ' + (data.email || ''),
    'Phone: ' + (data.phone || ''),
    'Map / Edition: ' + (data.mapEdition || ''),
    'Ad Size: ' + (data.adSize || ''),
    'Package Details: ' + (data.packageDetails || ''),
    'Total Amount: $' + (data.totalAmount || '0.00'),
    'Deposit Due Now: $' + (data.depositAmount || '0.00'),
    'Balance Remaining: $' + (data.balanceAmount || '0.00'),
    'Advertiser Signature: ' + (data.advertiserSignature || '') + ' on ' + (data.signatureDate || ''),
    'Plateau Representative: ' + (data.plateauRep || ''),
    'Notes: ' + (data.notes || '')
  ].join('
');
}
