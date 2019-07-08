const PDFDocument = require('pdfkit');
var qrcode=require('qrcode')
var fs=require('fs')
 








async function generatepdf(eventname,token,name,message,fname){

  const doc = new PDFDocument;
  doc.pipe(fs.createWriteStream('./PDFs/'+fname+'MimoticoID.pdf'));

  var qrc=await qrcode.toDataURL(token)


   
 
  doc
  .image('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAABpCAYAAAD4BUeWAAAABHNCSVQICAgIfAhkiAAABSxJREFUeJztndt1pDgQhv/ZBJYMVhvBkMEQgjcDbQaEQAgdgkLoyYDJoCeCZTLAEbAPMuM2fUEIqSTk/ztHL7aR6kKh0tUAIYQQQgghhBBCCInCl4h11wBeADQAKgBf337+CuACYADQAzgDGCPKkRMV3m2iYG3059vvfsLaoYe1yUVcOk80rDMnxzICMLDGKJUKVscR7nYZYG2ZLQr27XRV6J7jX4RlluAF2xy9LD2sbbOixj6lrouWFT0qGmFsMsLaOAtCOrskp2uEtUkWTlcI7+xZOSWmRXgUCrVLj/BKzcWIaREeg3h26cW0WKBXBNtbBilFIjAgrm20lCLX9BuF9ClHJbZdejFN3lA7BXYph5l4uMMF8e2jfAT7w08fNJ7PbaETaCMWnUAbjc9Dvg5Xns+58i/s9OJROcPqEBPl85Cvw2PxCuAfHDtDnzGwurwmluMDOTn8O+xbe+TIXnKG1el7Yjl+k4PD56ie55xLY14jyC7at6ARLhNXopKnRSFcBq8lBa8DCGwkBc4Mg0TDsj0MO4RtpYXNkBb+9hvkxbVjzew/RZmj4WfDTl5Uv9k2RvYtPpGuUggKbItyk0TCY2CQeXTPVHDry488Ly6FS/Y+IIO9f2s7XpIv2h8EhXU7Jt/xMvPM6SVuTIzFCw7g7BmFj33RCGbkPmh8DB6DA3whs3sbD0gUG8Y8ebKXGrcJygX5zbdXuHXOCCaqTigAJzzP/A3y+MQpPB9ODbC6qBTCHYEO7lt7U+cHGttk7VIImSsV/DdEphgBPMqk10qPDMbQqdl7amWErBGrAPJ+2oR29ZBdVVVT0zRT0zTPjNgJynx6JMcsZ1VVLk7/dHMTGivRcDqdpmvGcZzatk0Z5Xeju23baRzHD7KeTieXaNcCMmdBh43OvuaB07WA3HrZbtu2D+V0dHonIHdSVpcClVIPjThH+p3njIDsZtnuMrKXKKVcnF7skrFTdts0zVMjTtM01XW9fG4QkH+4brOu61U5V3KP6yLWp0vtWp2vvIjFXxHrlmjDoLAhWwe3N933kz4J6HDTZqBPepH9+QB3xX2StiQOD5C0SXdLInhtad4wLEvmcGDXsOxeKWJSRsNPedeJl6QOn8uGiZdnRQvoEZ0O/gZwLRJLpjHubFmWLrYSOZwtC4HE2nMR69ulOLwvpI3olOJwRrgjEg6XMFRfSBtFvFQKcRMdSSPFvqxHxVZAIsIHAL8i1m8i1i3Z1i8ITL5I9eEmYt2SV4TEbMtErPs3UtuUFYD/ItT7A+vXVynYJch5FmveVjVc/U0Pa/Drnz2iB/DNUb4t/O3Y/mF4uD1oR9ErbW7dM9c56KEj6HFyaPdw7N0AuCyDQ5udR73Kod4hoB6iGzElx+Gh95KHrOsaJdy2Rn6naYLSYX9UuCZPPnvIXaPtHECPzrGtw2Pgb6QLtn0Ct4ydzYZ6q41172mrCDS29+lbnQ3YxG2IVLeP01Mfk0qKgnu0n+Gf3FSwQ7MzPjp/gB1mtTvrdv28G/BwIYD3sXKP22gwCHtd9zxaCD0l2+D+/ybrYXVTgdsjG+hRyEIFcWOOQp1YDiLA8vRLsSc/yPMTqwNu84cTCjsgkPMdL1vpYKP1gve7YOZ+uoZ19te7Tz7nJ2xCVvRs2BGpEGeB5lNOkhyJBuH/p1onJz7xRWH9RiiXUlQ/XlIf/owaNvJr2Bfh24O/e8V7DnCBnUFj300IIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYSQ4/A/B9OKVqvZkzUAAAAASUVORK5CYII=' , 50, 50, { width: 150 })
  .fillColor("#000000")
  .fontSize(30)
  .text(eventname,300,195)
  .moveDown()
  .fontSize(20)
  .image(qrc,285,250)
  .text('Dear '+name+',',300,550)
  .moveDown()
  .fontSize(15)
  .text(message+' Do not forget to bring this with you! QR is very important',300,600)
  // Finalize PDF file
  doc.end();
}

module.exports.generatepdf=generatepdf;