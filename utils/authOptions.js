import GoogleProvider from 'next-auth/providers/google'
import connectDB from "../config/database";
import UserProfile from "../models/UserProfile";

    export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: 'select_account',
                    access_type: 'offline',
                    response_type: 'code'
                }
            }
        })
    ],
        callbacks: {
            async signIn({profile}) {
             //1. Connect to the database
                await connectDB();
                //2. Check if the user exists
                const userExists = await UserProfile.findOne({email: profile.email});
                //3. If user not exists, create a new user
                if(!userExists) {
                    await UserProfile.create({
                        email: profile.email,
                        name: profile.name,
                        image: profile.picture
                    });
                }
                //4. Return true if user is authenticated
                return true;
            },
            //Session callback function that modifies the session object
            async session({session}) {
                //1. Get the user object from the database
                const user = await UserProfile.findOne({email: session.user.email});
                //2. Assign user id from the session
                session.user.id = user._id.toString();
                //3. Return the session object
                return session;
            },
        }
    }