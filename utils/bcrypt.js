const bcrypt = require("bcrypt");

const password = "password";
const saltRounds = 12;

const makeHash = async (password, saltRounds) => {
    return await bcrypt.hash(password, saltRounds); // (4)
};

const main = async () => {
    const hashedPassword = await makeHash(password, saltRounds);
    console.log(hashedPassword);
};

main();

const checkHash = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

const main1 = async () => {
    const hashedPassword = await makeHash("password", 10);
    const result = await checkHash("password", hashedPassword);
    console.log(result);
};

main1();
