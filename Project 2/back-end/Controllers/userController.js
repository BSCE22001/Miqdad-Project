const userData = require("../Schema/userData");
const userDetails = require("../Schema/Details");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SALT = 10

const Registration = async (req, res) => {
    console.log("starting")
    const { userName, userEmail, userPassword } = req.body;

    const data = new userData({
        schemaName: userName,
        schemaPassword: await bcrypt.hash(userPassword, SALT),
        schemaEmail: userEmail,
    });
    console.log("Ho bhi kya rha he yaar");
    await userData.findOne({ schemaEmail: userEmail }).then(async user => {
        if (user)
            res.status(404).json({ message: "There is already an account assosiated with this email" });
        else {
            console.log("kya main andr aagya hoon");
            await data.save().then(() => {
                console.log("Status ja ra he ???")
                res.status(200).json({ message: "Data saved" });
            }).catch(err => {
                console.error(err);
                res.status(404).json({ message: "There was a problem while registering the user" });
            })
        }
    }).catch(err => {
        console.error(err);
        res.status(404).json({ message: "Some problem occured" });
    })
}

const login = async (req, res) => {
    // encodeURIComponent() use this in the front end
    console.log('starting login');
    const { userEmail, userPassword } = req.body;
    console.log(userEmail, userPassword);

    userData.findOne({ schemaEmail: userEmail }).then(async user => {
        if (user && await bcrypt.compare(userPassword, user.schemaPassword)) {
            const token = jwt.sign({ ID: user._id, userName: user.schemaName }, process.env.SECRET_KEY)
            res.status(200).json({ message: "Nigga you back? Eat my shit", token });
        }
        else if (!user)
            res.status(403).json({ message: "There aint no nigga like that" });
        else
            res.status(403).json({ message: "You typing password incorrecctly nigga" });
    }).catch(
        err => {
            console.error(err);
            res.status(404).json("You playing with me nigga, there aint no data like this here ya black ass bitch");
        }
    );
}

const getDetails = async (req, res) => {
    console.log("starting get details");
    const payload = req.user;

    userDetails.findOne({ _id: payload.ID }).then(async user => {
        if (user)
            res.status(200).json(user);
        else
            res.status(403).json("Nigaa you playing with me here");
    }).catch(err => {
        res.status(404).json("Some problem with the data base");
    })
}

const setDetails = async (req, res) => {
    console.log("starting set details");
    const { userFirstName, userLastName, userAge, userGender, userProfession } = req.body;

    const data = userDetails({
        schemaFirstName: userFirstName,
        schemaLastName: userLastName,
        schemaAge: userAge,
        schemaGender: userGender,
        schemaProfession: userProfession,
        _id: req.user.ID
    })


    await data.save().then(() => {
        res.status(200).json({ message: "Details were saved" });
    }).catch(err => {
        res.status(404).json(err);
    })
}

const updateDetails = async (req, res) => {
    console.log("starting update details");
    const { userFirstName, userLastName, userAge, userGender, userProfession } = req.body;
    const temp = {}

    userFirstName ? temp['schemaFirstName'] = userFirstName : null
    userLastName ? temp['schemaLastName'] = userLastName : null;
    userAge ? temp['schemaAge'] = userAge : null;
    userGender ? temp['schemaGender'] = userGender : null;
    userProfession ? temp['schemaProfession'] = userProfession : null;

    userDetails.findOneAndUpdate({ _id: req.user.ID }, temp).then(user => {
        if (user)
            res.status(200).json({ message: "User data updated" });

        else
            res.status(404).json("User not found");
    }).catch(error => {
        console.log(error);
        res.status(404).json("Some problem with the database");
    })
}

const deleteUser = async (req, res) => {
    console.log("starting delete user");
    const ID = req.user.ID;
    userData.findOneAndDelete({_id: ID}).then(user=>{
        if(user)
        {
            userDetails.findOneAndDelete({_id: ID}).then(details=>{
                if(details)
                    res.status(200).json("User was successfully deleted");
            }).catch(error=>{
                console.log(error);
                res.status(404).json("Some problem with the database");
            });
        }
    }).catch(error=>{
        console.log(error);
        res.status(404).json("Some problem with the database");
    });
}

module.exports = { Registration, login, getDetails, setDetails, updateDetails, deleteUser }