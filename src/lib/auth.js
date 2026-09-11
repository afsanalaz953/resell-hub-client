
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
  database: mongodbAdapter(db, {client}),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  user:{
additionalFields:{
  role:{
    type: "string", 
     required: false,  
    defaultValue:"buyer",
      input: true, 
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
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 7 * 24 * 60 * 60,
    },
  },
  plugins: [jwt()],
 
  // for block user login blocking
  // 🔒 ব্লকড ইউজার চেক করার হুক
  // hooks: {
  //   // before: async ({ event, context }) => {
  //   //   // শুধু সাইনইন ইভেন্টে কাজ করবে
  //   //   console.log("🔥 Hook triggered, event:", event);
    
  //   //   if (event === "signIn") {
  //   //     const { email } = context.body;
  //   //     // ইউজার খুঁজুন
  //   //     const user = await db.collection("user").findOne({ email });
  //   //     // যদি ইউজার ব্লকড থাকে, তাহলে এরর ছুঁড়ুন
  //   //     if (user?.isBlocked === true || user?.status === 'blocked') {
  //   //       throw new Error("Your account has been blocked. Please contact support.");
  //   //     }
  //   //   }
  //   // },
  //   before: async (context) => {
  //     // Better Auth-এর কিছু ভার্সনে event context-এর ভেতর থাকে
  //     const event = context?.event || context?.type;
  //     console.log("🔥 Hook triggered, event:", event);
      
  //     if (event === "signIn") {
  //       const email = context?.email || context?.body?.email || context?.data?.email;
  //       if (!email) return;
  //       const user = await db.collection("user").findOne({ email });
  //       if (user?.isBlocked === true || user?.status === "blocked") {
  //         throw new Error("Your account has been blocked. Please contact support.");
  //       }
  //     }
  //   }
  // },


});