function doPost(e) {
  try {
    var ss = SpreadsheetApp.openById("1kqDyR-yA8fDWGRLKasRk0zzkjF-emD9kH-nKtL3uDrw");
    var sheet = ss.getSheetByName("Map Leads");

    if (!sheet) {
      sheet = ss.insertSheet("Map Leads");
      sheet.appendRow([
        "Timestamp",
        "Contact Name",
        "Business Name",
        "Email",
        "Phone",
        "Website",
        "Ad Size",
        "Payment Plan",
        "Map Location",
        "Invoice Number",
        "Invoice Date",
        "Notes",
        "Signature",
        "Signature Date",
        "Email Copy",
        "Inventory Acknowledgment",
        "Timeline Acknowledgment",
        "Terms Acknowledgment",
        "Package Details",
        "Payment Link",
        "Source"
      ]);
    }

    var p = (e && e.parameter) ? e.parameter : {};
    Logger.log("LIVE WEBSITE SUBMISSION");
    Logger.log(JSON.stringify(p));

    sheet.appendRow([
      new Date(),
      p.contactName || "",
      p.businessName || "",
      p.email || "",
      p.phone || "",
      p.website || "",
      p.adSize || "",
      p.paymentPlan || "",
      p.mapLocation || "No",
      p.invoiceNumber || "",
      p.invoiceDate || "",
      p.notes || "",
      p.signature || "",
      p.signatureDate || "",
      p.emailCopy || "",
      p.inventoryAcknowledgment || "",
      p.timelineAcknowledgment || "",
      p.termsAcknowledgment || "",
      p.packageDetails || "",
      p.paymentLink || "",
      p.source || ""
    ]);

    var subject = "Plateau Map Agreement - " + (p.businessName || "Advertiser");
    var body = [
      "PLATEAU MAP ADVERTISING AGREEMENT SUMMARY",
      "=========================================",
      "",
      "Business Name: " + (p.businessName || ""),
      "Contact Name: " + (p.contactName || ""),
      "Email: " + (p.email || ""),
      "Phone: " + (p.phone || ""),
      "Website: " + (p.website || ""),
      "",
      "Selected Package: " + (p.packageDetails || ""),
      "Payment Link: " + (p.paymentLink || ""),
      "",
      "Invoice Number: " + (p.invoiceNumber || ""),
      "Invoice Date: " + (p.invoiceDate || ""),
      "",
      "Ad Materials and Design Instructions:",
      (p.notes || ""),
      "",
      "Signed By: " + (p.signature || ""),
      "Signature Date: " + (p.signatureDate || ""),
      "",
      "Payment secures placement. Space is limited and production may begin early if the edition sells out."
    ].join("\n");

    GmailApp.sendEmail(
      "hello@theplateaupublishingco.com",
      subject,
      body,
      {
        replyTo: "hello@theplateaupublishingco.com",
        name: "The Plateau Publishing Co."
      }
    );

    if ((p.emailCopy || "").toLowerCase() === "yes" && p.email) {
      GmailApp.sendEmail(
        p.email,
        "Your Plateau Map Agreement Summary",
        body,
        {
          replyTo: "hello@theplateaupublishingco.com",
          name: "The Plateau Publishing Co."
        }
      );
    }

    return HtmlService.createHtmlOutput("OK");
  } catch (err) {
    Logger.log("ERROR: " + err.message);
    return HtmlService.createHtmlOutput("ERROR: " + err.message);
  }
}

function testDoPost() {
  const fakeEvent = {
    parameter: {
      contactName: "Casey Morris",
      businessName: "Test Business",
      email: "hello@theplateaupublishingco.com",
      phone: "253-000-0000",
      website: "https://theplateaupublishingco.com",
      adSize: "Single Ad",
      paymentPlan: "50% Down",
      mapLocation: "Yes",
      invoiceNumber: "TEST-1001",
      invoiceDate: "2026-03-26",
      notes: "Test ad instructions",
      signature: "Casey Morris",
      signatureDate: "2026-03-26",
      emailCopy: "Yes",
      inventoryAcknowledgment: "Yes",
      timelineAcknowledgment: "Yes",
      termsAcknowledgment: "Yes",
      packageDetails: "Single Ad + Map Add-On - 50% Down",
      paymentLink: "https://example.com",
      source: "Test Function"
    }
  };

  return doPost(fakeEvent);
}
