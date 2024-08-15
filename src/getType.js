const express = require('express');
const router = express.Router();

const loadfunction = (req, res) => {
    const { type = 'length' } = req.query;
    res.send(`
        <!DOCTYPE html>
<html>
    <head>
        <title>Converter</title>
    </head>
    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; text-align: center;">
        <header style="background-color: #f4f4f4; padding: 20px;">
            <h1>Unit Converter</h1>
            <nav style="margin-bottom: 20px;">
                <a href="/?type=length" style="margin: 0 15px; text-decoration: none; color: #007bff;">Length</a>
                <a href="/?type=temperature" style="margin: 0 15px; text-decoration: none; color: #007bff;">Temperature</a>
                <a href="/?type=weight" style="margin: 0 15px; text-decoration: none; color: #007bff;">Weight</a>
            </nav>
        </header>
        
        <main style="padding: 20px;">
            <form action="/convert/?type=${type}" method="post" style="display: inline-block; text-align: left;">
           
                <div style="margin-bottom: 15px;">
                    <label for="type" style="display: block; margin-bottom: 5px;">Enter the ${type} to convert:</label>
                    <input type="text" name="value" id="value" required style="width: 100%; padding: 8px; box-sizing: border-box;">
                </div>
                <div style="margin-bottom: 15px;">
                    <label for="IUnit" style="display: block; margin-bottom: 5px;">Unit to convert from:</label>
                    <input type="text" name="IUnit" id="IUnit" required style="width: 100%; padding: 8px; box-sizing: border-box;">
                </div>
                <div style="margin-bottom: 15px;">
                    <label for="FUnit" style="display: block; margin-bottom: 5px;">Unit to convert to:</label>
                    <input type="text" name="FUnit" id="FUnit" required style="width: 100%; padding: 8px; box-sizing: border-box;">
                </div>
                <div>
                    <button type="submit" style="padding: 10px 20px; font-size: 16px; cursor: pointer; background-color: #007bff; color: white; border: none; border-radius: 4px;">Convert</button>
                </div>
            </form>
        </main>
    </body>
</html>

    `);
};

module.exports = loadfunction;


