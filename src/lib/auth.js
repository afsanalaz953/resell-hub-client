
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

if (!global._mongoClient) {
  global._mongoClient = new MongoClient(process.env.MONGO_URI);
  await global._mongoClient.connect();
}

const client = global._mongoClient;
const db = client.db("resellHub");

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  user:{
additionalFields:{
  role:{
    defaultValue:"buyer"
  },
   isBlocked: {
        type: "boolean",
        required: false,
        defaultValue: false,
      },
      status: {
        type: "string",
        required: false,
        defaultValue: "active",
      },
      phone: {
        type: "string",
        required: false,
        // defaultValue: "" // চাইলে দিতে পারেন
      },
  // plan:{
  //   defaultValue: "free"
  // }
}
  },
  // // socialProviders: {
  // //   google: {
  // //     clientId: process.env.GOOGLE_CLIENT_ID,
  // //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  // //   },
  // },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 7 * 24 * 60 * 60,
    },
  },
  plugins: [jwt()],
});