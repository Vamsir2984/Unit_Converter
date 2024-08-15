// Conversion functions
const conlength = (value, fromUnit, toUnit) => {
    const conversionRates = {
        meter: { kilometer: 0.001, centimeter: 100 },
        kilometer: { meter: 1000, centimeter: 100000 },
        centimeter: { meter: 0.01, kilometer: 0.00001 }
    };

    if (!conversionRates[fromUnit] || !conversionRates[toUnit]) {
        throw new Error('Invalid length unit');
    }

    return value * (conversionRates[fromUnit][toUnit] || 1);
};

const convertWeight = (value, fromUnit, toUnit) => {
    const conversionRates = {
        gram: { kilogram: 0.001, pound: 0.00220462 },
        kilogram: { gram: 1000, pound: 2.20462 },
        pound: { gram: 453.592, kilogram: 0.453592 }
    };

    if (!conversionRates[fromUnit] || !conversionRates[toUnit]) {
        throw new Error('Invalid weight unit');
    }

    return value * (conversionRates[fromUnit][toUnit] || 1);
};

const contemp = (value, fromUnit, toUnit) => {
    if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
        return (value * 9/5) + 32;
    } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
        return (value - 32) * 5/9;
    } else if (fromUnit === 'celsius' && toUnit === 'kelvin') {
        return value + 273.15;
    } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
        return value - 273.15;
    } else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') {
        return (value - 32) * 5/9 + 273.15;
    } else if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') {
        return (value - 273.15) * 9/5 + 32;
    } else {
        throw new Error('Invalid temperature unit');
    }
};

// Main converter function
const converter = (req, res) => {
    const { IUnit, FUnit, value } = req.body;
    const {type}=req.query;
    console.log(type);
    let result;

    try {
        switch (type) {
            case 'length':
                result = `Converting ${value} ${IUnit} to ${conlength(parseFloat(value), IUnit, FUnit)} ${FUnit}`;
                break;
            case 'weight':
                result = `Converting ${value} ${IUnit} to ${convertWeight(parseFloat(value), IUnit, FUnit)} ${FUnit}`;
                break;
            case 'temperature':
                result = `Converting ${value} ${IUnit} to ${contemp(parseFloat(value), IUnit, FUnit)} ${FUnit}`;
                break;
            default:
                res.status(400).send("Invalid conversion type");
                return;
        }

        res.send(`
            <html>
                <head>
                    <title>Converter</title>
                </head>
                <body>
                    <div style="text-align: center; padding: 20px;">
                        <h1>Unit Converter</h1>
                        <div style="margin-bottom: 20px;">
                            <a href="/?type=length" style="margin: 0 10px; text-decoration: none; color: blue;">Length</a>
                            <a href="/?type=temperature" style="margin: 0 10px; text-decoration: none; color: blue;">Temperature</a>
                            <a href="/?type=weight" style="margin: 0 10px; text-decoration: none; color: blue;">Weight</a>
                        </div>
                        <p style="font-size: 18px; font-weight: bold;">
                            ${result}
                        </p>
                        <form action="/" method="get" style="margin-top: 20px;">
                            <button type="submit" style="padding: 10px 20px; font-size: 16px; cursor: pointer;">
                                Reset
                            </button>
                        </form>
                    </div>
                </body>
            </html>
        `);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = converter;
