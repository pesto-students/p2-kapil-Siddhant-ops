const getFirstName = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Ranchoddas");
        }, 500);
    });
};
const getMiddleName = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Shamaldas");
        }, 1000);
    });
};
const getLastName = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Chanchad");
        }, 1500);
    });
};
async function* getName(getFirstName, getMiddleName, getLastName) {
    yield await getFirstName();
    yield await getMiddleName();
    yield await getLastName();
}
const _name = getName(getFirstName, getMiddleName, getLastName);
_name.next().then((val) => console.log("First Name is :", val.value));
_name.next().then((val) => console.log("Middle Name is :", val.value));
_name.next().then((val) => console.log("Last Name is :", val.value));
