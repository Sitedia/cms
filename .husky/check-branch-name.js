const regex = '^(main)|((fix|feat)/[a-z0-9-]+)$';
const branchName = process.argv[2];

// Validate the branch name
const matcher = new RegExp(regex, 'g');
if (!matcher.test(branchName)) {
  console.error(`Invalid branch name: ${branchName}. Must match: ${regex}`);
  process.exit(1);
}
