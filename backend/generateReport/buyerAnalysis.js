const buyerAnalysis = (company_data) => {
    var buyer_prompt = `
        Role
        -------
        You are a CPA Employed in the Finance Function. You have been tasked with creating a detailed analysis of a company's financial performance
        in the context of their company history and how it relates to their industry.

        Task
        ------

        I will provide you with a number of sources of information you can use to prepare such a financial report on the company.
        If you do not receive this information simply return 'No company data found or provided'.

        I will provide you with a range of information related to the company, including financial data.
        In addition to financial data I might also provide you with financial reports on the company
        or more general sources of information such as excerpts from wikipedia. Here is all the information: 

        ${company_data}
            
        Write a Report based on the preceding financial data, noting any significant movements or trends.
        Evaluate the implications of these movements for the company's financial health and operational efficiency.
        
        From the perspective of a company selling to this company, highlight key risks in increasing sales
        to this customer based on what you have gathered from the financials.

        Decide whether the team need to investigate this customer further for risk backed up the financials.

        Please ensure the quarters are in the correct chronological order and that it makes coherent sense.

        Output
        ------
        Ensure the analysis reflects the specific relevant movements across the quarters,
        highlighting significant changes relevant to their viability as a major customer.
        The output should strictly adhere to the data provided, avoiding assumptions or inferences not directly supported by the numbers.
        Please print the entire report in html with tailwind styling. Please keep a clear white background and make the report
        aesthetically pleasing, yet professional. Below you will find an example of the kind of code I would like you to print out.
        Do not include any currency symbols, use 22.5M USD instead of $22.5M, display figures in millions and use thousand seperators where appropriate ie 23,100M

        Please ensure that all the figures are correctly and centrally aligned in each column of the data for the quarterly data.
        Make sure the html code only ever uses the arial font. No other font is allowed. Please ensure that the data in each
        column of the table is centrally aligned in each column. The actual report text itself should be to the left as default.
        Please also use the google blue colour for the company header. This is the font colour: #4c8bf5
        To include colours please do it like this in the html element: style="color: #4c8bf5;"
        Also it is very important you make sure the image at the top is included exactly as is for every report you generate.
        Here is an example of how I would like you to print the report. Please change this report for each company. Don't copy exactly:

        When returing the code make sure to not put something like \`\`\`tsx at the top or bottom. It is not needed.
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title> { Insert company name here } Financial Analysis</title>
            <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
            <style>
                /* Invert colors for Google logo */
                .google-logo {{
                    filter: brightness(0) invert(1);
                }}

                /* Custom font styles */
                .custom-font {{
                    font-family: Arial, sans-serif;
                }}

                /* Bottom shadow effect */
                .shadow-bottom {{
                    box-shadow: 0 2px 2px -2px gray;
                }}

                /* Slanted background effect */
                .slanted {{
                    position: relative;
                    clip-path: polygon(0 0, 100% 0, calc(100% - 60px) 100%, 0 100%);
                }}

                    /* Slanted background shape */
                    .slanted::after {{
                        content: '';
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        width: 60px;
                        height: 60px;
                        background-color: #1e3a8a; /* navy blue */
                        border-bottom-right-radius: 15px; /* rounded corner */
                        clip-path: polygon(0 0, 100% 0, 100% 100%);
                    }}

                /* Ensure the image takes full width */
                .full-width-image {{
                    width: 100%;
                    height: auto;
                }}
            </style>
        </head>
        <body class="font-sans antialiased" style="font-family: Arial, sans-serif;">
            <!-- Centered content container -->
            <div class="container mx-auto px-4 pb-8">
                <!-- Header section with full-width image -->
                <!-- Main content -->
                <h1 class="text-3xl font-bold mb-4" style="color: #4c8bf5;"> { Insert company name here } ( { Insert company stock ticker here }) Financial Analysis - Q4 2023 to Q1 2024</h1>

                <!-- Executive summary section -->
                <section class="mb-8">
                    <h2 class="text-xl font-bold text-gray-800 mb-2">Executive Summary</h2>
                    <p class="text-gray-700">
                        { Insert company name here } has experienced a significant decline in profitability across fiscal year 2023, culminating in a net loss for the year. While revenue remained relatively stable, substantial increases in the cost of sales, particularly in the Beef and Chicken segments, eroded profitability. The company has undertaken restructuring efforts and plant closures to address these challenges. From the perspective of a supplier, extending additional credit to  { Insert company name here } carries a heightened level of risk due to the company's recent financial performance. Further investigation is warranted to assess the long-term viability of  { Insert company name here } as a major customer.
                    </p>
                </section>

                <!-- Key findings section -->
                <section class="mb-8">
                    <h2 class="text-xl font-bold text-gray-800 mb-2">Key Findings</h2>
                    <ul class="list-disc pl-4 space-y-2">
                        <li class="text-gray-700"><b>Declining Profitability:</b>  { Insert company name here } reported a net loss of 648M USD for fiscal year 2023, a stark contrast to the 3,238M USD profit in 2022. This decline is primarily attributed to a significant increase in the cost of sales, outpacing the relatively stable revenue.</li>
                        <li class="text-gray-700"><b>Rising Cost of Sales:</b> The cost of sales increased by 7.8% from 46,614M USD in 2022 to 50,250M USD in 2023. This increase was driven by higher input costs, particularly live cattle costs in the Beef segment and feed ingredient costs in the Chicken segment.</li>
                        <li class="text-gray-700"><b>Segment Performance:</b> All segments, except Prepared Foods, experienced a decline in operating income. The Beef and Chicken segments were particularly impacted by rising input costs and challenging market conditions.</li>
                        <li class="text-gray-700"><b>Restructuring and Plant Closures:</b>  { Insert company name here } has implemented restructuring programs and closed several plants in the Chicken segment to address operational inefficiencies and reduce costs. These actions have resulted in significant charges in 2023.</li>
                        <li class="text-gray-700"><b>Goodwill Impairment:</b> The company recorded substantial goodwill impairment charges totaling 781M USD in 2023, reflecting the decline in the company's market capitalization and challenges in certain segments.</li>
                        <li class="text-gray-700"><b>Liquidity and Debt:</b> While  { Insert company name here } maintains a reasonable level of liquidity, its debt levels have increased, and the ratio of net debt to EBITDA has risen significantly.</li>
                    </ul>
                </section>

                <!-- Quarterly trends section -->
                <section class="mb-8">
                    <h2 class="text-xl font-bold text-gray-800 mb-2">Quarterly Trends - Significant Movements</h2>
                    <table class="w-full table-auto border border-gray-300 rounded-lg">
                        <thead class="bg-gray-200 text-gray-700">
                            <tr>
                                <th class="px-4 py-2 text-left">Metric (Millions USD)</th>
                                <th class="px-4 py-2 text-center">Q4 2023</th>
                                <th class="px-4 py-2 text-center">Q3 2023</th>
                                <th class="px-4 py-2 text-center">Q2 2023</th>
                                <th class="px-4 py-2 text-center">Q1 2023</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="px-4 py-2 text-left">Total Revenue</td>
                                <td class="px-4 py-2 text-center">13,072</td>
                                <td class="px-4 py-2 text-center">13,319</td>
                                <td class="px-4 py-2 text-center">13,348</td>
                                <td class="px-4 py-2 text-center">13,140</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-2 text-left">Gross Profit</td>
                                <td class="px-4 py-2 text-center">866</td>
                                <td class="px-4 py-2 text-center">823</td>
                                <td class="px-4 py-2 text-center">459</td>
                                <td class="px-4 py-2 text-center">677</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-2 text-left">Operating Income</td>
                                <td class="px-4 py-2 text-center">312</td>
                                <td class="px-4 py-2 text-center">231</td>
                                <td class="px-4 py-2 text-center">(463)</td>
                                <td class="px-4 py-2 text-center">(350)</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-2 text-left">Net Income</td>
                                <td class="px-4 py-2 text-center">145</td>
                                <td class="px-4 py-2 text-center">107</td>
                                <td class="px-4 py-2 text-center">(450)</td>
                                <td class="px-4 py-2 text-center">(417)</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-2 text-left">Cash &amp; Cash Equivalents</td>
                                <td class="px-4 py-2 text-center">2,182</td>
                                <td class="px-4 py-2 text-center">1,484</td>
                                <td class="px-4 py-2 text-center">573</td>
                                <td class="px-4 py-2 text-center">699</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-2 text-left">Current Debt</td>
                                <td class="px-4 py-2 text-center">1,315</td>
                                <td class="px-4 py-2 text-center">1,308</td>
                                <td class="px-4 py-2 text-center">1,895</td>
                                <td class="px-4 py-2 text-center">457</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-2 text-left">Total Debt</td>
                                <td class="px-4 py-2 text-center">19,376</td>
                                <td class="px-4 py-2 text-center">18,596</td>
                                <td class="px-4 py-2 text-center">18,118</td>
                                <td class="px-4 py-2 text-center">17,982</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-2 text-left">Total Shareholder Equity</td>
                                <td class="px-4 py-2 text-center">18,089</td>
                                <td class="px-4 py-2 text-center">18,150</td>
                                <td class="px-4 py-2 text-center">18,133</td>
                                <td class="px-4 py-2 text-center">18,779</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <!-- Key observations section -->
                <section class="mb-8">
                    <h2 class="text-xl font-bold text-gray-800 mb-2">Key Observations</h2>
                    <ul class="list-disc pl-4 space-y-2">
                        <li class="text-gray-700">The significant decline in profitability in Q4 2023 is concerning, particularly considering the relatively stable revenue figures. This suggests a substantial increase in the cost of sales, which requires further investigation.</li>
                        <li class="text-gray-700">The negative operating income and net income in Q2 and Q4 of 2023 highlight the operational challenges faced by  { Insert company name here }. These challenges seem to have persisted into Q1 2024.</li>
                        <li class="text-gray-700">The increasing debt levels and decreasing total shareholder equity indicate a potential weakening of  { Insert company name here }' financial position.</li>
                        <li class="text-gray-700">Further analysis is required to assess the long-term viability of  { Insert company name here } and the potential impact on suppliers like your company.</li>
                    </ul>
                </section>
            </div>
        </body>
        </html>
    `

    return buyer_prompt
}

exports.buyerAnalysis = buyerAnalysis