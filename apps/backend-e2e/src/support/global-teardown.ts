/* eslint-disable unicorn/prefer-module */
/* eslint-disable unicorn/no-anonymous-default-export */
/* eslint-disable no-console */
module.exports = async function () {
  // Put clean up logic here (e.g. stopping services, docker-compose, etc.).
  // Hint: `globalThis` is shared between setup and teardown.
  console.log(globalThis.__TEARDOWN_MESSAGE__);
};
