const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (error, data) => {
      if (error) reject('I could not find that file 😢');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (error) => {
      if (error) reject('I could not write that file 😢');
      resolve('Success!');
    });
  });
};

// async - await

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    await writeFilePro(`dog-img.txt`, res.body.message);
    console.log('Random dog image saved to a file!');
  } catch (error) {
    console.log(error);

    throw error;
  }

  return '2: READY 🐕';
};

(async () => {
  try {
    console.log('1: Will get dog pics!');
    const dogPic = await getDogPic();
    console.log(dogPic);
    console.log('3: Done getting dog pics!');
  } catch (error) {
    console.log('💥 ERROR 💥');
  }
})();

/*
console.log('1: Will get dog pics!');

getDogPic()
  .then((data) => {
    console.log(data);
    console.log('3: Done getting dog pics!');
  })
  .catch((error) => {
    console.log('💥 ERROR 💥');
  });
*/

// Promises
/*
readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro(`dog-img.txt`, res.body.message);
  })
  .then(() => {
    console.log('Random dog image saved to a file!');
  })
  .catch((error) => {
    console.log(error);
  });
*/
