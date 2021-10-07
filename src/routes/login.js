const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const privateKey = process.env.ACCESS_TOKEN_SECRET;

const users = [
    {
        email: 'sistemas@enfermerosrosario.com',
        password: '$2b$10$nzQp/Ei0GZLIEEtKcXK72.I5tH0m.VcUOvEzCQW2vppJ1S2dAzQE.',
    },
    {
        email: 'noeliascalerandi@gmail.com',
        password: '$2b$10$FNpTalGUn6FEYpZ/iLwG/ekLExr8Il43FEmYN4dG.n7o/IFHK/8oO',
    },
];

const login = {
    createUser: async (req, res) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password.toString(), 10);
            const user = { email: req.body.email, password: hashedPassword };
            res.status(201).json(user);
        } catch (err) {
            console.log(err);
            res.status(500).send();
        }
    },
    loginUser: async (req, res) => {
        const user = users.find(user => user.email === req.body.email);
        if (user == null) {
            return res.status(400).send('Cannot find user');
        }
        try {
            if (await bcrypt.compare(req.body.password, user.password)) {
                jwt.sign(user, privateKey, (err, token) => {
                    res.json({
                        token,
                    });
                });
            } else {
                res.send('Not Allowed');
            }
        } catch (err) {
            console.log(err);
            res.status(500).send();
        }
    },
    authToken: (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) return res.sendStatus(401);

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            console.log(err);
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    },
};

module.exports = login;
