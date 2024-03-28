let products = [];

function addProduct() {
  const code = document.getElementById('code').value;
  const article = document.getElementById('article').value;
  const quantity = document.getElementById('quantity').value;
  const unitPrice = document.getElementById('unitPrice').value;

  // Check if any input is empty
  if (code === '' || article === '' || quantity === '' || unitPrice === '') {
    alert('Please fill in all the fields before adding a product.');
    return;
  }

  const amount = quantity * unitPrice;

  const product = {
    code: code,
    article: article,
    quantity: quantity,
    unitPrice: unitPrice,
    amount: amount
  };

  products.push(product);

  // Clear input fields after adding a product
  document.getElementById('code').value = '';
  document.getElementById('article').value = '';
  document.getElementById('quantity').value = '';
  document.getElementById('unitPrice').value = '';
}

function calculateAmount() {
  if (products.length === 0) {
    alert('Please add at least one product before creating the invoice.');
    return;
  }

  let totalAmount = 0;
  let productRows = '';

  products.forEach(product => {
    totalAmount += product.amount;
    productRows += `
      <tr>
        <td class="service">${product.code}</td>
        <td class="desc">${product.article}</td>
        <td>${product.unitPrice}</td>
        <td>${product.quantity}</td>
        <td class="total">${product.amount}</td>
      </tr>
    `;
  });

  const invoiceNumber = generateInvoiceNumber();
  const dateTime = new Date().toLocaleString('fr-FR');

  const invoiceContent = `
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Invoice</title>
      <script src="jspdf.umd.min.js"></script>
      <script src="html2canvas.min.js"></script>
      <style>
      .clearfix:after {
        content: "";
        display: table;
        clear: both;
      }

      a {
        color: #5D6975;
        text-decoration: underline;
      }

      body {
        position: relative;
        width: 21cm;
        height: 29.7cm;
        margin: 0 auto;
        color: #001028;
        background: #FFFFFF;
        font-family: Arial, sans-serif;
        font-size: 12px;
        font-family: Arial;
      }

      header {
        padding: 10px 0;
        margin-bottom: 30px;
      }

      #logo {
        text-align: center;
        margin-bottom: 10px;
        float: left;
        border-radius: 10px;
      }

      #logo img {
        width: 300px;
      }

      #project {
        float: left;
        clear: left;
        border: 1px solid #000;
        padding: 20px;
        border-radius: 10px;
        font-size: 1.2em;
      }

      #project span {
        color: black;
        text-align: right;
        width: 52px;
        margin-right: 30px;
        display: inline-block;
        font-size: 15px;
        font-weight: bold;
      }

      #project div {
        white-space: nowrap;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        border-radius: 10px;
        border: 1px solid #000;
        margin-bottom: 20px;
      }

      table tr:nth-child(2n-1) td {
        background: #F5F5F5;
      }

      table th,
      table td {
        text-align: center;
      }

      table th {
        padding: 5px 20px;
        color: black;
        border-bottom: 1px solid #C1CED9;
        white-space: nowrap;
        font-weight: normal;
      }

      table .service,
      table .desc {
        text-align: left;
      }

      table td {
        padding: 13px;
        text-align: right;
      }

      table td.service,
      table td.desc {
        vertical-align: top;
      }

      table td.unit,
      table td.qty,
      table td.total {
        font-size: 1.2em;
      }

      table td.grand {
        border-top: 1px solid #5D6975;
      }

      #notices .notice {
        color: #5D6975;
        font-size: 1.2em;
      }

      .unit {
        width: 30.633px;
      }

      .qty {
        width: 20px;
      }

      body > main:nth-child(2) > table:nth-child(1) > thead:nth-child(1) > tr:nth-child(1) > th:nth-child(5) {
        padding-right: 10px;
        padding-left: 30px;
      }

      table th, table td {
        border: 1px solid #000;
        padding: 3px;
        text-align: center;
        font-weight: bold;
      }

      .small-box {
        position: absolute;
        top: 94px;
        right: 1px;
        width: 260px;
        height: 100px;
        border: 1px solid #000;
        text-align: center;
        line-height: 30px;
        font-weight: bold;
      }

      #project {
        position: relative;
      }
      </style>
      <script>
        window.jsPDF = window.jspdf.jsPDF;

        function generatePDF() {
          const pdf = new jsPDF();

          const pdfFileName = 'invoice.pdf';

          const element = document.getElementById('invoice-form');

          html2canvas(element, { scale: 2, dpi: 400 })
            .then(canvas => {
              const imgData = canvas.toDataURL('image/png');
              const pdfWidth = pdf.internal.pageSize.getWidth();
              const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

              // Add space around the edges (adjust the values as needed)
              const marginX = 5;
              const marginY = 5;

              pdf.addImage(imgData, 'PNG', marginX, marginY, pdfWidth - 2 * marginX, pdfHeight - 2 * marginY);
              pdf.save(pdfFileName);
            });
        }
      </script>
      </head>
      <body>
        <div id="invoice-form">
          <header class="clearfix">
            <div id="logo">
              <img src='yamo-metal.png'>
            </div>
            <div id="project">
              <div><span>NAME:</span> YAMO METAL</div>
              <div><span>CLIENT:</span> Yassine Chiker</div>
              <div><span>ADDRESS:</span> Casablanca, MA</div>
              <div><span>EMAIL:</span> <a href="mailto:john@example.com">yassinechiker@gmail.com</a></div>
              <div><span>DATE:</span> ${dateTime}</div>
            </div>
            <div class="small-box">AU COMPTANT</div>
            <div><span>DEVIS N°:</span> ${invoiceNumber}</div>
          </header>
          <main>
            <table>
              <thead>
                <tr>
                <th class="service" style="width: 80px;">REFERENCE</th>
                  <th class="desc" style="width: 800px;">DESCRIPTION</th>
                  <th>PRIX</th>
                  <th>QTY</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                ${productRows}
                <tr>
                  <td colspan="4" class="grand total">TOTAL</td>
                  <td class="grand total">${totalAmount} MAD</td>
                </tr>
              </tbody>
            </table>
          </main>
        </div>
        <button onclick="generatePDF()">Generate PDF</button>
      </body>
    </html>
  `;

  const newTab = window.open();
  newTab.document.write(invoiceContent);
}

function generateInvoiceNumber() {
  // Generate a random 7-digit number
  return Math.floor(1000000 + Math.random() * 9000000);
}




//------------------------------------------------------------------------------------------------




function generateRecu() {
  if (products.length === 0) {
    alert('Please add at least one product before generating the invoice.');
    return;
  }

  let productRows = '';

  products.forEach(product => {
    productRows += `
      <tr>
        <td style="text-align: center; border-right: 1px solid #000;">${product.quantity}</td>
        <td style="text-align: left; border-right: 1px solid #000;">${product.article}</td>
        <td style="text-align: right; border-right: 1px solid #000;">${product.unitPrice}</td>
        <td style="text-align: right;">${product.amount}</td>
      </tr>
    `;
  });

  const invoiceNumber = generateInvoiceNumber();

  const invoiceContent = `
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=210mm, height=297mm, initial-scale=1.0">
      <title>Invoice</title>
      <script src="jspdf.umd.min.js"></script>
      <script src="html2canvas.min.js"></script>
      <style>
        body {
          width: 210mm;
          height: 297mm;
          margin: 0 auto;
          padding: 20mm;
          font-weight: bold;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          border-spacing: 0;
          border-radius: 10px;
          border: 1px solid #000;
          margin-bottom: 20px;
        }

        table tr:nth-child(2n-1) td {
          background: #F5F5F5;
        }

        table th,
        table td {
          text-align: center;
          border: 1px solid #000;
        }

        table th {
          padding: 5px 20px;
          color: black;
          border-bottom: 1px solid #C1CED9;
          white-space: nowrap;
          font-weight: bold;
        }

        table td {
          padding: 5px;
          font-weight: bold;
        }

        table td.total {
          font-size: 1.2em;
        }

        table td.qty,
        table td.total {
          font-size: 1.2em;
        }

        .devis {
          position: relative;
          top: 0;
          left: 0;
          font-weight: bold;
        }

        .total-container {
          display: flex;
          width: 50%;
          margin-top: 20px;
          margin-left: 585px;
        }

        .total-label-box,
        .total-amount-box {
          border: 1px solid #000;
          border-radius: 5px;
          padding: 5px;
          text-align: center;
          margin-right: 10px;
        }

        h3 {
          margin-top: 1px;
          color: grey;
        }

        .somme {
          font-size: 15px;
        }
      </style>
      <script>
        window.jsPDF = window.jspdf.jsPDF;

        function generatePDF() {
          const pdf = new jsPDF();

          const pdfFileName = 'invoice.pdf';

          const element = document.getElementById('invoice-form');

          html2canvas(element, { scale: 2, dpi: 300 })
            .then(canvas => {
              const imgData = canvas.toDataURL('image/png');
              const pdfWidth = pdf.internal.pageSize.getWidth();
              const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

              // Add space around the edges (adjust the values as needed)
              const marginX = 5;
              const marginY = 5;

              pdf.addImage(imgData, 'PNG', marginX, marginY, pdfWidth - 2 * marginX, pdfHeight - 2 * marginY);
              pdf.save(pdfFileName);
            });
        }
      </script>
    </head>
    <body>
      <div id="invoice-form">
        <div class="devis">DEVIS N°: ${invoiceNumber}</div>
        <div class="client">CLIENT: [Client Name]</div>
        <div class="date" style="text-align: right;">Date: ${getCurrentDate()}</div>
        <table>
          <thead>
            <tr>
              <th style="text-align: center; border-right: 1px solid #000;">QTE</th>
              <th style="text-align: left; border-right: 1px solid #000;">Désignation</th>
              <th style="text-align: right; border-right: 1px solid #000;">P.U</th>
              <th style="text-align: right;">Montant</th>
            </tr>
          </thead>
          <tbody>
            ${productRows}
          </tbody>
        </table>
        <div class="total-container">
          <div class="total-label-box">
            <div class="total-label">TOTAL</div>
          </div>
          <div class="total-amount-box">
            <div class="total-amount">${calculateTotalAmount()} MAD</div>
          </div>
        </div>
        <div class="somme">
          La Somme en lettre: ### ${convertNumberToFrenchWords(parseFloat(calculateTotalAmount()))}
        </div>
        <h3>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - </h3>
      </div>
      <button onclick="generatePDF()">Generate PDF</button>
    </body>
    </html>
  `;

  const newTab = window.open();
  newTab.document.write(invoiceContent);
}

function getCurrentDate() {
  const today = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return today.toLocaleDateString('en-US', options);
}

function calculateTotalAmount() {
  let totalAmount = 0;
  products.forEach(product => {
    totalAmount += parseFloat(product.amount);
  });
  return totalAmount.toFixed(2);
}



function convertNumberToFrenchWords(number) {
    const units = ['', 'UN', 'DEUX', 'TROIS', 'QUATRE', 'CINQ', 'SIX', 'SEPT', 'HUIT', 'NEUF'];
    const teens = ['DIX', 'ONZE', 'DOUZE', 'TREIZE', 'QUATORZE', 'QUINZE', 'SEIZE', 'DIX-SEPT', 'DIX-HUIT', 'DIX-NEUF'];
    const tens = ['', '', 'VINGT', 'TRENTE', 'QUARANTE', 'CINQUANTE', 'SOIXANTE', 'SOIXANTE-', 'QUATRE-', 'CINQUANTE-'];
    const thousands = ['', 'MILLE', 'MILLION', 'MILLIARD', 'BILLION'];

    if (number === 0) {
        return 'ZÉRO';
    }

    function convertChunk(num) {
        if (num === 0) {
            return '';
        } else if (num < 10) {
            return units[num];
        } else if (num < 20) {
            return teens[num - 10];
        } else if (num < 100) {
            const ten = Math.floor(num / 10);
            const remainder = num % 10;
            return tens[ten] + (remainder !== 0 ? `-${units[remainder]}` : '');
        } else {
            const hundred = Math.floor(num / 100);
            const remainder = num % 100;
            return (hundred === 1 ? '' : units[hundred]) + ' CENT' + (remainder !== 0 ? ` ${convertChunk(remainder)}` : '');
        }
    }

    function convertToWords(num, level) {
        if (num === 0) {
            return '';
        } else if (num < 1000) {
            return `${convertChunk(num)} ${thousands[level]}`;
        } else {
            const chunk = num % 1000;
            const higherChunks = Math.floor(num / 1000);
            return `${convertToWords(higherChunks, level + 1)} ${convertChunk(chunk)}`;
        }
    }

    return convertToWords(number, 0);
}
