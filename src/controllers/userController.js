const getUsers = (req, res) => {
    res.json({
        message: "All Users Show"
    }); 
};

const getUser = (req, res) => {
    res.json({
        message: `The user id is: ${req.params.id}`
    })
}

const createUser = (req, res) => {
    const {name, email, phone, gender} = res.body;
    res.status(201).json({
        message: "User create successfully",
        user: {
            name: name,
            email: email,
            phone: phone,
            gender: gender
        },
    });
}

module.exports = {
    getUsers,
    getUser,
    createUser
};