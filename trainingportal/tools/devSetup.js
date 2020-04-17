const db = require("../db");
const util = require("../util");
const auth = require("../auth");
const challengeUtil = require("./challengeUtil");

async function setup(){
    try {
        util.log("Initializing database");
        await db.init();

        util.log("Registering local user 'dojouser' with password: 'SecureCodingDojo'");
        let dojoUserInfo = {accountId:"Local_dojouser",familyName:"User", givenName:"Dojo"};
        await db.getPromise(db.insertUser, dojoUserInfo);
        auth.createUpdateUserInternal("dojouser", dojoUserInfo, "SecureCodingDojo");

        util.log("Unlocking all challenges for 'dojouser'");
        let user = await db.getPromise(db.getUser,"Local_dojouser");
        challengeUtil.passChallenges("blackBelt",user.id);

    } catch (error) {
        console.error(error);
    }

}

setup();