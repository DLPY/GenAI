const supplierSelectionAnalysis = (quotes) => {
    var prompt = `

        As a procurement specialist responsible for selecting the best supplier for our client, 
        you have received multiple quotations from various suppliers. Your task is to carefully evaluate these 
        quotations and determine which supplier best meets the client's prioritized requirements, which are cost, 
        distance from ports, and the variety of services provided and provide and a clear recommendation of the 
        best supplier, with a rationale that aligns with the client's needs.

        Don't reproduce the following example exactly. Please just use it as inspiration.
        Only input content where I have put the tag {content} otherwise just reproduce it.
        Here is an example of the kind of output I would like you to produce:

            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Supplier Evaluation</title>
                <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
            </head>
            <body class="font-sans antialiased">
                <div class="container mx-auto px-4 py-8">
                    <h1 class="text-3xl font-bold text-blue-600 mb-6">Evaluation of Suppliers</h1>
                    <p class="text-lg text-gray-700 mb-4">
                        After evaluating the quotations from each supplier, we can summarize their offerings considering the client’s prioritized requirements: cost, distance from ports, and the variety of services provided.
                    </p>

                    <section class="mb-8">
                        <div class="mb-6">
                            <h2 class="text-xl font-semibold text-gray-800 mb-2">Supplier 1</h2>
                            <ul class="list-disc pl-5 space-y-1">
                                <li class="text-gray-700"><strong>Cost:</strong> {content}</li>
                                <li class="text-gray-700"><strong>Distance from Ports:</strong> {content}</li>
                                <li class="text-gray-700"><strong>Services:</strong> {content}</li>
                                <li class="text-gray-700"><strong>Duty Handling:</strong> {content}</li>
                            </ul>
                        </div>

                        <div class="mb-6">
                            <h2 class="text-xl font-semibold text-gray-800 mb-2">Supplier 2</h2>
                            <ul class="list-disc pl-5 space-y-1">
                                <li class="text-gray-700"><strong>Cost:</strong> {content}</li>
                                <li class="text-gray-700"><strong>Distance from Ports:</strong> {content}</li>
                                <li class="text-gray-700"><strong>Services:</strong> {content}</li>
                                <li class="text-gray-700"><strong>Duty Handling:</strong> {content}</li>
                            </ul>
                        </div>

                        <div class="mb-6">
                            <h2 class="text-xl font-semibold text-gray-800 mb-2">Supplier 3</h2>
                            <ul class="list-disc pl-5 space-y-1">
                                <li class="text-gray-700"><strong>Cost:</strong> {content}</li>
                                <li class="text-gray-700"><strong>Distance from Ports:</strong> {content}</li>
                                <li class="text-gray-700"><strong>Services:</strong> {content}</li>
                                <li class="text-gray-700"><strong>Duty Handling:</strong> {content}</li>
                            </ul>
                        </div>

                        <div class="mb-6">
                            <h2 class="text-xl font-semibold text-gray-800 mb-2">Supplier 4</h2>
                            <ul class="list-disc pl-5 space-y-1">
                                <li class="text-gray-700"><strong>Cost:</strong> {content}</li>
                                <li class="text-gray-700"><strong>Distance from Ports:</strong> {content}</li>
                                <li class="text-gray-700"><strong>Services:</strong> {content}</li>
                                <li class="text-gray-700"><strong>Duty Handling:</strong> {content}</li>
                            </ul>
                        </div>

                        <div class="mb-6">
                            <h2 class="text-xl font-semibold text-gray-800 mb-2">Supplier 5</h2>
                            <ul class="list-disc pl-5 space-y-1">
                                <li class="text-gray-700"><strong>Cost:</strong> {content}</li>
                                <li class="text-gray-700"><strong>Distance from Ports:</strong> {content}</li>
                                <li class="text-gray-700"><strong>Services:</strong> {content}</li>
                                <li class="text-gray-700"><strong>Duty Handling:</strong> {content}</li>
                            </ul>
                        </div>
                    </section>

                    <section class="mt-8">
                        <h2 class="text-xl font-semibold text-gray-800 mb-4">Recommendations</h2>
                        <h3 class="text-lg font-bold text-blue-500">Best Supplier: Supplier {content}</h3>
                        <p class="text-gray-700 mt-2">
                            <strong>Rationale:</strong>
                        </p>
                        <ul class="list-disc pl-5 space-y-2">
                            <li class="text-gray-700"><strong>Cost Efficiency:</strong> {content}</li>
                            <li class="text-gray-700"><strong>Proximity to Ports:</strong> {content}</li>
                            <li class="text-gray-700"><strong>Variety of Services:</strong> {content}</li>
                            <li class="text-gray-700"><strong>Duty Handling:</strong> {content}</li>
                        </ul>
                        <p class="text-gray-700 mt-4">
                            In conclusion, {content}
                        </p>
                    </section>
                </div>
            </body>
            </html>

        Here are the quotes to analyse: ${quotes}
    
    `

    return prompt
}

exports.supplierSelectionAnalysis = supplierSelectionAnalysis