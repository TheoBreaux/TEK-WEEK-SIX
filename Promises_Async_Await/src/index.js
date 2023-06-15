// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

async function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };

  const databaseIdentifier = await central(id); // "db2"

  const [basicInfo, personalInfo] = await Promise.all([
    dbs[databaseIdentifier](id),
    vault(id),
  ]);

  const user = {
    id,
    name: personalInfo.name,
    username: basicInfo.username,
    email: personalInfo.email,
    address: personalInfo.address,
    phone: personalInfo.phone,
    website: basicInfo.website,
    company: basicInfo.company,
  };

  return user;
}

getUserData(7)
  .then((user) => {
    console.log(user);
  })
  .catch((error) => {
    console.log(error);
  });
