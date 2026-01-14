const express = require('express');
const os = require('os');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let tasks = [
    { id: 1, title: "Apprendre Docker", done: true },
    { id: 2, title: "Reussir l'examen", done: false }
];

// Endpoint Santé (Healthcheck) - Affiche le hostname pour prouver le scaling
app.get('/health', (req, res) => {
    res.json({ 
        status: 'UP', 
        timestamp: new Date(), 
        hostname: os.hostname() 
    });
});

app.get('/tasks', (req, res) => res.json(tasks));

app.post('/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title || "Nouvelle tâche",
        done: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`SuperTask API running on port ${port}`);
    });
}
module.exports = app;
