const pool = require('../config/database');

const getUsers = async (req, res, next) => {
    try {
        const [result] = await pool.query("select * from users")
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const getUser = (req, res) => {
    res.json({
        message: `The user id is: ${req.params.id}`
    })
}

const createUser = async (req, res, next) => {
    try {
        const {name, email, password, role} = req.body;
        const [result] = await pool.query(
            `
                insert into users (
                    name,
                    email,
                    password,
                    role
                )
                values (?, ?, ?, ?)
            `,
            [
                name,
                email,
                password,
                role || "customer"
            ]
        );
        console.log(result);
        return res.status(201).json({
            message: "User create successfully",
            user: {
                id: result.insertId,
                name: name,
                email: email,
                role: role,
            },
        });
    } catch (error) {
        next(error)
    }
}

const updateUser = (req, res) => {
    const {id} = req.params;
    const {name, email} = req.body;
    res.status(201).json({
        message: "User update successfully",
        user: {
            id: id,
            name: name,
            email: email
        }
    })
};

const updateStatus = (req, res) => {
    const {id} = req.params;
    const {status} = req.body;
    res.status(200).json({
        message: "Status update successfully",
        user: {
            id: id,
            status: status
        }
    })
}

const deleteUser = (req, res) => {
    const {id} = req.params;
    res.status(200).json({
        message: `${id} this user deleted`
    })

}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    updateStatus,
    deleteUser
};