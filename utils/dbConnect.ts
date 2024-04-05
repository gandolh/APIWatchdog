import { load } from "https://deno.land/std@0.221.0/dotenv/mod.ts";
import moongoose from "npm:mongoose@^6.7";

const dbConnect = async () => {
	const env = await load();

	const username = encodeURIComponent(env["MONGO_USERNAME"]);
	const password = encodeURIComponent(env["MONGO_PASSWORD"]);

	try {
		await moongoose.connect(
			`mongodb+srv://${username}:${password}@api-watchdog.uu8kdwm.mongodb.net/?retryWrites=true&w=majority&appName=API-Watchdog`
		);

		console.log("Connected to database");
	} catch (error) {
		console.log(error);
	}
};

export default dbConnect;
