require('dotenv').config();
const functions = require('@google-cloud/functions-framework');
const axios = require('axios')

const { buyerAnalysis } = require('./buyerAnalysis');
const { supplierAnalysis } = require('./supplierAnalysis');
const { supplierSelectionAnalysis } = require('./supplierSelectionAnalysis')

functions.http('helloHttp', async (req, res) => {

  const body = req.body

  var company_data = JSON.stringify(body.companyData)

  company_data = "" + company_data
  company_data = company_data.toString().replaceAll("\\", "");
  company_data = company_data.toString().replaceAll(",n", ",");
  company_data = company_data.toString().replaceAll(",rn", ",");
  company_data = company_data.toString().replaceAll("{n", ",");
  company_data = company_data.toString().replaceAll("           ", "");

  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  const reportType = body.reportType

  var prompt = ""

  if (reportType == "buyer") {
    prompt = buyerAnalysis(company_data)
  }
  else if (reportType == "supplier") {
    prompt = supplierAnalysis(company_data)
  }
  else if (reportType == "supplierSelection") {
    prompt = supplierSelectionAnalysis(company_data)
  }

  async function fetchHtml() {

    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        "model": "gpt-4o-mini",
        "messages": [
          {
            "role": "system",
            "content": `${prompt}`
          }
        ]
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_KEY}`
        }
      });
  
      if (response.status === 200) {
        const html = response.data.choices[0].message.content;
        return html
      } else {
        console.error('Failed to fetch HTML content');
      }
    } catch (error) {
      console.error('Error fetching HTML content:', error);
    }
  }

  var response = "";

  if (company_data != 'undefined') {
    response = await fetchHtml()
  }

  response = "" + response
  response = response.toString().replace('```html', '')
  response = response.toString().replace('```', '')

  res.send(response)
});