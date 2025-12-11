let topics = [];
const FILE_PATH = path.join(__dirname, 'topics.json');

try {
  topics = JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));
} catch (err) {
  if (err.code === 'ENOENT') {
    console.log('topics.json not found. Creating an empty file...');
    fs.writeFileSync(FILE_PATH, '[]', 'utf-8');
    topics = [];
  } else {
    console.error('Error reading topics.json:', err);
    topics = [];
  }
}

exports.getRandomTopic = function () {
  if (!topics.length) {
    return 'AI role in modern technologies';
  }

  const index = Math.floor(Math.random() * topics.length);
  return topics[index];
};
