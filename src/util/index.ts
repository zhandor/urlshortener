// eslint-disable-next-line @typescript-eslint/no-var-requires
const Hashids = require('hashids');

const generateHash = (link: string) => {
	const currentTime = new Date().getTime();
	const hashids = new Hashids(link);

	return hashids.encode(currentTime);
};

export { generateHash };
